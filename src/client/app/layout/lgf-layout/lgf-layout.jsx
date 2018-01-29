import React from "react";
import {CustomLoginBtn} from "../../components/login/custom-login-btn/custom-login-btn";
import {LoginForm} from "../../components/login/login-form/login-form";
import {SignUpForm} from "../../components/login/sign-up-form/sign-up-form";
import {TransitionGroup, CSSTransition, Transition} from "react-transition-group";
import {userServices} from "../../../services/user-info";
import {customHistory} from "../../routes/main-routes";
import {Fade} from "../../components/animation/fade";

export class LoginFormLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm: "signup"
        };
    };

    loginByFacebook = () => {
        FB.login(() => {
            FB.api('/me', 'GET', {"fields": "id,name,email"}, (response) => {
                if (response.error) console.log("Please login to continue");
                else {
                    let {id, name, email} = response;
                    let avatarURL = `https://graph.facebook.com/${id}/picture?type=large&w‌​idth=480&height=480`;
                    let player = {id, name, avatarURL, email};
                    userServices.loginByFB(player).then(() => {
                        customHistory.push("/home");
                    });
                }
            });
        }, {scope: 'public_profile,email'});
    };

    render() {
        let {currentForm} = this.state;


        let form = currentForm === "login" ?
            (<LoginForm
                    switchForm={() => this.setState({currentForm: "signup"})}
                />
            ) :
            (<SignUpForm
                switchForm={() => this.setState({currentForm: "login"})}
            />);

        return (
            <div className="lgf-layout col-xl-3 col-lg-5 col-md-8 col-sm-10">
                <h1 className="app-tile">
                    Kappa
                </h1>
                <CustomLoginBtn
                    type="facebook"
                    onClick={() => this.loginByFacebook()}
                    title="Login with Facebook"
                />
                <div className="row separate">
                    <div className="col-5 p-0"/>
                    <p className="col-2 p-0 s-sub">
                        OR
                    </p>
                    <div className="col-5 p-0"/>
                </div>
                <div className={`${currentForm==="login" ? "login-form-wrapper" : "signup-form-wrapper"}`}>
                    <TransitionGroup>
                        <Fade key={currentForm} timeout={300} className="form">
                            {form}
                        </Fade>)
                    </TransitionGroup>
                </div>
                {/*{form}*/}
            </div>
        );
    }
}