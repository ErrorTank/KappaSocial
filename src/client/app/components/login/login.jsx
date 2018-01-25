import React from "react";
import {LoginFormLayout} from "../../layout/lgf-layout/lgf-layout";

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        return(
            <div className="login-page">
                <div className="login-header fixed-top">
                    <a href="http://localhost:2000/" className="brand-wrapper">
                        <div className="brand">
                            Kappa
                            <p className="brand-sub">
                                SocialHub
                            </p>
                        </div>
                    </a>
                </div>
                <div className="lgf-wrapper row justify-content-center">
                    <LoginFormLayout/>
                </div>
            </div>
        );
    }
}