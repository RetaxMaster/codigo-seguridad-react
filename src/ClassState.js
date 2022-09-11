import React from "react";

class ClassState extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            error: false
        }

    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escribe el código de seguridad.</p>

                {this.state.error && (
                    <p>Error: El código es incorrecto</p>
                )}

                <input placeholder="Código de seguridad" />
                <button
                    onClick={() => this.setState({
                        error: !this.state.error
                    })}
                >Comprobar</button>
            </div>
        );
    }

}

export { ClassState };