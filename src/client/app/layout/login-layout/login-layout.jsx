import React from "react";
import {Login} from "../../components/login/login";

export class LoginLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
        document.title="Kappa"
    };
    render(){
        return(
            <div className="login-layout">
                <Login/>
            </div>
        );
    }
}