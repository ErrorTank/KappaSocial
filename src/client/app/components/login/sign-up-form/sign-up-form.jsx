import React from "react";
import {FancyInput} from "../login-form/fancy-input/fancy-input";

export class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            pass:"",
            rePass:""
        };
    };
    render(){
        let {name,email,pass,rePass}=this.state;
        return(
            <div className="signup-form">
                <form>
                    <FancyInput
                        type="email"
                        fakeHolder="Email"
                        value={email}
                        onChange={(val)=>this.setState({email:val})}
                    />
                    <FancyInput
                        type="text"
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
                    <FancyInput
                        type="password"
                        fakeHolder="Re-type password"
                        value={rePass}
                        onChange={(val)=>this.setState({rePass:val})}
                    />
                    <div className="submit-btn-wrap">
                        <button type="submit" className="btn btn-block btn-success submit-btn">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}