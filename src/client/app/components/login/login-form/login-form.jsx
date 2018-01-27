import React from "react";
import {LoginInput} from "./login-input/login-input";
import {Switch} from "../switch/switch";

export class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            pass:""
        };
    };
    render(){
        let {email,pass}=this.state;
        let {switchForm}=this.props;
        return(
            <div className="login-form">
                <form>
                    <LoginInput
                        type="email"
                        fakeHolder="Email"
                        value={email}
                        onChange={(val)=>this.setState({email:val})}
                    />
                    <LoginInput
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
                <Switch
                    switchForm={()=>switchForm()}
                    quote="Don't have an account"
                    type="Sign up"
                />
            </div>
        );
    }
}