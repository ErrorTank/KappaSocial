import React from "react";
import {Switch} from "../switch/switch";
import {formValidator} from "../../../services/validate-form";
import {userServices} from "../../../services/user-info";
import {customHistory} from "../../../main-routes";
import {Warning} from "../warning/warning";
import {LoginInput} from "../register-input/register-input";
import {TransitionGroup} from "react-transition-group";
import {Slide} from "../../../common/animation/slide";
import {Loading} from "../../../common/loading/loading";

let warningMsg="";

export class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            rePass: "",
            showWarning:false,
            loading:false
        };
    };

    registedUser = () => {
        let {name, email, pass} = this.state;
        let user = {name, email, pass};
        userServices.saveUser(user).then(() => {
            userServices.regularLogin(user).then(() => {
                customHistory.push("/home");
            })
        }).catch((err) => {
            warningMsg="This email has already existed. Try again!";
            this.setState({showWarning: true});
        });
    };

    render() {
        let {name, email, pass, rePass, showWarning,loading} = this.state;
        let {switchForm} = this.props;
        let {isPassword, isEmail, isName} = formValidator;
        let validCount = [isEmail(email), isName(name), isPassword(pass), pass === rePass].filter(element => !!element);
        return (
            <div className="signup-form">
                <TransitionGroup>
                    <Slide key="signup-warning" className="warning-slide" timeout={300}>
                        {showWarning && <Warning msg={warningMsg}/>}
                    </Slide>
                </TransitionGroup>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.registedUser();
                }}
                >
                    <LoginInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(val) => this.setState({email: val})}
                        suggest=""
                        valid={isEmail(email)}
                        icon={true}
                    />
                    <LoginInput
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(val) => this.setState({name: val})}
                        suggest="* 5 to 15 characters"
                        valid={isName(name)}
                        icon={true}
                    />
                    <LoginInput
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={(val) => this.setState({pass: val})}
                        suggest="* 6 to 20 characters includes alphabetical and number"
                        valid={isPassword(pass)}
                        icon={true}
                    />
                    <LoginInput
                        type="password"
                        placeholder="Re-type password"
                        value={rePass}
                        onChange={(val) => this.setState({rePass: val})}
                        suggest=""
                        valid={rePass === pass && isPassword(pass)}
                        icon={true}
                    />
                    <div className="submit-btn-wrap">
                        <button type="submit"
                                className="btn btn-block btn-success submit-btn"
                                disabled={validCount.length !== 4 || loading}
                        >
                            Sign up
                            {loading && <Loading size="small"/>}
                        </button>
                    </div>
                </form>
                <Switch
                    switchForm={() => switchForm()}
                    quote="Do have an account"
                    type="Login"
                />
            </div>
        );
    }
}