import React from "react";
import {LoginInput} from "../register-input/register-input";
import {Switch} from "../switch/switch";
import {userServices} from "../../../services/user-info";
import {customHistory} from "../../../main-routes";
import {Warning} from "../warning/warning";
import {formValidator} from "../../../services/validate-form";
import {Loading} from "../../../common/loading/loading";
import {TransitionGroup} from "react-transition-group";
import {Slide} from "../../../common/animation/slide";

let warningMsg="";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            loading: false,
            showWarning: false
        };
    };

    loginUser = () => {
        let {email, pass} = this.state;
        let user = {email, pass};
        userServices.regularLogin(user).then((msg = null) => {
            if (!msg) {
                customHistory.push("/home");
            } else {
                warningMsg = msg === "Wrong pass" ? "Invalid password. Try again!" : "Invalid email. Try again!";
                this.setState({showWarning: true});
            }
        }).catch((err) => {

        });
    };

    render() {
        let {email, pass, loading, showWarning} = this.state;
        let {switchForm} = this.props;
        let {isEmail, isPassword} = formValidator;
        let validCount = [isEmail(email), isPassword(pass)].filter(element => !!element);
        return (
            <div className="login-form">
                <button onClick={()=>this.setState({showWarning:!this.state.showWarning})}>dasd</button>
                <TransitionGroup>
                    <Slide key="warning-login"
                           className="warning-slide"
                           timeout={300}
                           onEntering={() => console.log("iam enter")}
                           onExiting={() => console.log("exit")}
                    >
                        {showWarning && <Warning msg={warningMsg}/>}
                    </Slide>
                </TransitionGroup>


                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.loginUser();
                    }}
                >
                    <LoginInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(val) => this.setState({email: val})}
                    />
                    <LoginInput
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(val) => this.setState({pass: val})}
                    />
                    <div className="submit-btn-wrap">
                        <button type="submit"
                                className="btn btn-block submit-btn"
                                disabled={validCount.length !== 2 || loading}
                        >
                            Sign in
                            {loading && <Loading size="small"/>}
                        </button>
                    </div>
                </form>
                <Switch
                    switchForm={() => switchForm()}
                    quote="Don't have an account"
                    type="Sign up"
                />
            </div>
        );
    }
}