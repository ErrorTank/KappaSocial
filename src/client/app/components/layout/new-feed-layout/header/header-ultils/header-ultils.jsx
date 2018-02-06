import React from "react";
import ReactDOM from "react-dom";
import {ProfileView} from "./profile-view/profile-view";
import {TransitionGroup} from "react-transition-group";
import {Slide} from "../../../../../common/animation/slide";
import {ClickOutside} from "../../../../../common/click-outside/click-outside";

export class HeaderUltils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfile: false
        };

    };
    handleClickOut=()=>{
        this.setState({showProfile:false});
    };
    render() {

        let {showProfile} = this.state;
        return (
            <div className="header-ultils col p-0 row">
                <div className="header-ultils-wrapper col justify-content-end row">
                    <div className="col-3 p-0 notification">
                        <img src="/image/002-notification.png" alt="Notification"/>
                    </div>
                        <div className="col-3 p-0 profile"
                             id="toggle-profile"
                        >
                            <img src="/image/001-avatar.png" alt="Your profile"/>
                            <TransitionGroup>
                                {showProfile &&
                                <Slide
                                    className="pv-slide"
                                    timeout={300}
                                >
                                    <ClickOutside onClickout={()=>this.handleClickOut()}>
                                        <ProfileView/>
                                    </ClickOutside>
                                </Slide>

                                }
                            </TransitionGroup>

                        </div>
                </div>

            </div>
        );
    }
}