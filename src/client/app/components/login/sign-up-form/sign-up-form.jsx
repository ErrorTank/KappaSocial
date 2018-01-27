import React from "react";
import {FancyInput} from "./fancy-input/fancy-input";
import {Switch} from "../switch/switch";
import {formValidator} from "../../../../services/validate-form";

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
        let {switchForm}=this.props;
        let {isPassword,isEmail,isName}=formValidator;
        return(
            <div className="signup-form">
                <form>
                    <FancyInput
                        type="email"
                        fakeHolder="Email"
                        value={email}
                        onChange={(val)=>this.setState({email:val})}
                        suggest=""
                        valid={isEmail(email)}
                    />
                    <FancyInput
                        type="text"
                        fakeHolder="Username"
                        value={name}
                        onChange={(val)=> this.setState({name:val})}
                        suggest="* 5 to 15 characters"
                        valid={isName(name)}
                    />
                    <FancyInput
                        type="password"
                        fakeHolder="Password"
                        value={pass}
                        onChange={(val)=> this.setState({pass:val})}
                        suggest="* 6 to 20 characters includes alphabetical and number"
                        valid={isPassword(pass)}
                    />
                    <FancyInput
                        type="password"
                        fakeHolder="Re-type password"
                        value={rePass}
                        onChange={(val)=>this.setState({rePass:val})}
                        suggest=""
                        valid={rePass===pass}
                    />
                    <div className="submit-btn-wrap">
                        <button type="submit" className="btn btn-block btn-success submit-btn">
                            Sign up
                        </button>
                    </div>
                </form>
                <Switch
                    switchForm={()=>switchForm()}
                    quote="Do have an account"
                    type="Login"
                />
            </div>
        );
    }
}