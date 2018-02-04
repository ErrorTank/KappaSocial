import React from "react";
import {LoginInput, RegisterInput} from "../register-input/register-input";
import {Switch} from "../switch/switch";
import {userServices} from "../../../services/user-info";
import {customHistory} from "../../../main-routes";
import {Warning} from "../warning/warning";
import {formValidator} from "../../../services/validate-form";
import {Loading} from "../../../common/loading/loading";
import {Transition, TransitionGroup} from "react-transition-group";
import {Slide} from "../../../common/animation/slide";

let warningMsg = "";

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
        this.setState({loading:true});
        let {email, pass} = this.state;
        let user = {email, pass};
        userServices.regularLogin(user).then((msg = null) => {
            setTimeout(()=>{
                this.setState({loading:false},()=>{
                    if (!msg) {
                        customHistory.push("/");
                    } else {
                        warningMsg = msg === "Wrong pass" ? "Invalid password. Try again!" : "Invalid email. Try again!";
                        this.setState({showWarning: true});
                    }
                });
            },2000);

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

                <TransitionGroup>
                    {showWarning && (
                        <Slide
                            className="warning-slide"
                            timeout={300}
                        >
                            <Warning msg={warningMsg}/>
                        </Slide>
                    )}

                </TransitionGroup>


                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.loginUser();
                    }}
                >
                    <RegisterInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(val) => this.setState({email: val})}
                    />
                    <RegisterInput
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