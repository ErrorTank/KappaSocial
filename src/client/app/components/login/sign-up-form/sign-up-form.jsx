import React from "react";
import {FancyInput} from "./fancy-input/fancy-input";
import {Switch} from "../switch/switch";
import {formValidator} from "../../../../services/validate-form";
import {userServices} from "../../../../services/user-info";
import {customHistory} from "../../../routes/main-routes";
import {Warning} from "../../warning/warning";

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
    registerUser=()=> {
        let {name,email,pass}=this.state;
        let user = {name,email,pass};
        userServices.regularLogin(user).then(()=>{
            customHistory.push("/home");
        }).catch((err)=>{
           this.msgBox.show();
        });
    };
    render(){
        let {name,email,pass,rePass}=this.state;
        let {switchForm}=this.props;
        let {isPassword,isEmail,isName}=formValidator;
        let validCount=[isEmail(email),isName(name),isPassword(pass),pass===rePass].filter(element=>!!element);
        return(
            <div className="signup-form">
                <Warning
                    ref={warning=>this.msgBox=warning}
                    msg="This email has already existed. Try again!"
                />
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    this.registerUser();
                }}
                >
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
                        <button type="submit"
                                className="btn btn-block btn-success submit-btn"
                                disabled={validCount.length!==4}
                        >
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