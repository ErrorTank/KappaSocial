import React from "react";
import {CustomLoginBtn} from "../../components/login/custom-login-btn/custom-login-btn";
import {LoginForm} from "../../components/login/login-form/login-form";
import {SignUpForm} from "../../components/login/sign-up-form/sign-up-form";
import {TransitionGroup,CSSTransition,Transition} from  "react-transition-group";

export class LoginFormLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentForm:"login"
        };
    };
    render(){
        let {currentForm}=this.state;
        let form=currentForm==="login" ? (<LoginForm switchForm={()=>this.setState({currentForm:"signup"})}/>) : (<SignUpForm/>);
        const Fade=({children,...props})=>(
            <CSSTransition
                {...props}
                timeout={300}
                classNames="form-fade"
            >
                {children}
            </CSSTransition>
        );
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
                <TransitionGroup>
                    <Fade key={currentForm}>
                        {form}
                    </Fade>
                </TransitionGroup>
            </div>
        );
    }
}