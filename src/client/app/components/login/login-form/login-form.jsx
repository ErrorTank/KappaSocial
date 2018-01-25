import React from "react";
import {FancyInput} from "./fancy-input/fancy-input";

export class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            pass:""
        };
    };
    render(){
        let {name,pass}=this.state;
        let {switchForm}=this.props;
        return(
            <div className="login-form">
                <form>
                    <FancyInput
                        type="username"
                        fakeHolder="Username"
                        value={name}
                        onChange={(val)=>this.setState({name:val})}
                    />
                    <FancyInput
                        type="password"
                        fakeHolder="Password"
                        value={pass}
                        onChange={(val)=>this.setState({pass:val})}
                    />
                    <div className="submit-btn-wrap">
                        <button type="submit" className="btn btn-block submit-btn">
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="toggle-signup">
                    <p className="t-sub">Don't have an account</p>
                    <p className="switch-signup"

                    >
                        Sign up
                    </p>
                </div>
            </div>
        );
    }
}