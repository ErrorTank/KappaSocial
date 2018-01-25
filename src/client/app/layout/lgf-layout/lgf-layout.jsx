import React from "react";
import {CustomLoginBtn} from "../../components/login/custom-login-btn/custom-login-btn";
import {LoginForm} from "../../components/login/login-form/login-form";

export class LoginFormLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentForm:"login"
        };
    };
    render(){
        return(
            <div className="lgf-layout col-lg-3 col-md-5 col-sm-8">
                <h1 className="app-tile">
                    Kappa
                </h1>
                <CustomLoginBtn
                    type="facebook"
                />
                <div className="row separate">
                    <div className="col-5 p-0"/>
                    <p className="col-2 p-0 s-sub">
                        OR
                    </p>
                    <div className="col-5 p-0"/>
                </div>
                <LoginForm/>
            </div>
        );
    }
}