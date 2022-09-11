import React from "react";

class Loading extends React.Component {

    componentWillUnmount() {
        console.log("Will Unmount");
    }

    render() {
        return (
            <p>Cargando...</p>
        );
    }

}

export { Loading };