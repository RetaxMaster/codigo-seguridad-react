import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialSate);

    // Action Creators
    const onConfirm = () => {
        dispatch({
            type: actionTypes.CONFIRM
        });
    };

    const onError = () => {
        dispatch({
            type: actionTypes.ERROR
        });
    }

    const onWrite = ({ target: { value } }) => {
        dispatch({
            type: actionTypes.WRITE,
            payload: value
        });
    }

    const onCheck = () => {
        dispatch({
            type: actionTypes.CHECK
        });
    }

    const onReset = () => {
        dispatch({
            type: actionTypes.RESET
        });
    }

    const onDelete = () => {
        dispatch({
            type: actionTypes.DELETE
        });
    }

    // -> Action Creators

    const { value, error, loading, deleted, confirmed } = state;

    React.useEffect(() => {

        console.log("Empezando el efecto...");

        if (!!loading) {
            setTimeout(() => {

                console.log("Haciendo la validación");
                
                if (value === SECURITY_CODE)
                    onConfirm();
                else
                    onError();
                
                console.log("Terminando la validación");

            }, 3000);
        }

        console.log("Terminando el efecto...");

    }, [loading]);

    if (!deleted && !confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor escribe el código de seguridad.</p>
    
                {(error && !loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
    
                {loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    placeholder="Código de seguridad"
                    value={value}
                    onChange={onWrite}
                />
    
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    }
    else if(!!confirmed && !deleted) {
        return (
            <React.Fragment>

                <p>Pedimos confirmación. ¿Tas seguro?</p>

                <button onClick={onDelete}>
                    Sí, eliminar.
                </button>

                <button onClick={onReset}>
                    Nop, me arrepentí.
                </button>

            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >Resetear, volver atrás.</button>
            </React.Fragment>
        );
    }
}

const initialSate = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    CONFIRM: "CONFIRM",
    ERROR: "ERROR",
    WRITE: "WRITE",
    CHECK: "CHECK",
    DELETE: "DELETE",
    RESET: "RESET",
}

const reducerObject = (state, payload) => ({
    [actionTypes.CONFIRM]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    [actionTypes.DELETE]: {
        ...state,
        confirmed: false,
        deleted: true,
    },
    [actionTypes.RESET]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: "",
    }
});

const reducer = (state, action) => {
    return reducerObject(state, action.payload)[action.type] ?? state;
}

export { UseReducer };