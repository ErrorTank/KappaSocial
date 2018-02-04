import React from "react";


export class Warning extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let {msg} = this.props;
        return (
            <div className="warning row justify-content-center align-items-center">
                <span className="col-2"><i className="fa fa-exclamation-circle" aria-hidden="true"/></span>
                <p className="warning-content col-10">{msg}</p>
            </div>
        )

    }
}