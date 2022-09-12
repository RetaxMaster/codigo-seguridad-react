import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialSate);

    const { value, error, loading, deleted, confirmed } = state;

    React.useEffect(() => {

        console.log("Empezando el efecto...");

        if (!!loading) {
            setTimeout(() => {

                console.log("Haciendo la validación");
                
                if (value === SECURITY_CODE)
                    dispatch({
                        type: 'CONFIRM'
                    });
                else
                    dispatch({
                        type: 'ERROR'
                    });
                
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
                    onChange={(event) => {
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value
                        });
                        //onWrite(event.target.value);
                    }}
                />
    
                <button
                    onClick={() => {
                        dispatch({
                            type: 'CHECK'
                        });
                    }}
                >Comprobar</button>
            </div>
        );
    }
    else if(!!confirmed && !deleted) {
        return (
            <React.Fragment>

                <p>Pedimos confirmación. ¿Tas seguro?</p>

                <button
                    onClick={() => {
                        dispatch({
                            type: 'DELETE'
                        });
                    }}
                >Sí, eliminar.</button>

                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
                >Nop, me arrepentí.</button>

            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET'
                        });
                    }}
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

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': {
        ...state,
        confirmed: false,
        deleted: true,
    },
    'RESET': {
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