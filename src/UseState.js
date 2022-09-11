import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const { value, error, loading, deleted, confirmed } = state;

    console.log(value);

    React.useEffect(() => {

        console.log("Empezando el efecto...");

        if (!!loading) {
            setTimeout(() => {

                console.log("Haciendo la validación");
                
                if (value === SECURITY_CODE) {
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true
                    });
                }
                else {
                    setState({
                        ...state,
                        error: true,
                        loading: false,
                    });
                }
                
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
                        setState({
                            ...state,
                            value: event.target.value,
                        });
                    }}
                />
    
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            loading: true,
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
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: true,
                        });
                    }}
                >Sí, eliminar.</button>

                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: "",
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
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: "",
                        });
                    }}
                >Resetear, volver atrás.</button>
            </React.Fragment>
        );
    }
}

export { UseState };