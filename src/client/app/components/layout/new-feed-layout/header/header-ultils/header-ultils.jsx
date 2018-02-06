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
    handleClickOut=(eClass=[])=>{
        if(!eClass.length || eClass.split(" ").indexOf("toggle-profile")===-1)
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
                        <div className="col-3 p-0 profile toggle-profile"
                             onClick={()=>{
                                 console.log("sth");
                                 this.setState({showProfile:!showProfile})
                             }}
                        >
                            <img src="/image/001-avatar.png"
                                 alt="Your profile"
                                 className="toggle-profile"
                            />
                            <TransitionGroup>
                                {showProfile &&
                                <Slide
                                    className="pv-slide"
                                    timeout={300}
                                >
                                    <ClickOutside onClickout={(eClass)=>this.handleClickOut(eClass)}>
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