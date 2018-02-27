import React, {Fragment} from "react";
import {TransitionGroup} from "react-transition-group";
import {Fade} from "../../../../common/animation/fade";
import {PostOption} from "./post-option/post-option";
import {ClickOutside} from "../../../../common/click-outside/click-outside";

export class PostHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false
        }
    };


    render() {
        let {showOptions} = this.state;
        let {time, name, avatarURL} = this.props;
        avatarURL = avatarURL || "/image/user.png";

        return (
            <div className="post-header row justify-content-center">
                <div className="col-2 p-0">
                    <div className="avatar-contain">
                        <img className="avatar" src={avatarURL}/>
                    </div>
                </div>
                <div className="col-9 p-0 header-info">
                    <div className="user-name-contain">
                        <p className="user-name">{name}</p>
                    </div>

                    <div>
                        <p className="time-to-now">{time}</p>
                    </div>


                </div>

                <div className="col-1 p-0 post-option">
                    <ClickOutside onClickout={() => this.setState({showOptions: false})}>
                        <Fragment>
                            <span className="option-toggle"
                                  onClick={() => this.setState({showOptions: !showOptions})}

                            >
                                <i className="fas fa-ellipsis-v"/>
                            </span>

                            <TransitionGroup>
                                {showOptions &&
                                (
                                    <Fade timeout={200} className="p-options">

                                        <PostOption/>
                                    </Fade>
                                )}
                            </TransitionGroup>
                        </Fragment>


                    </ClickOutside>
                </div>


            </div>
        );
    }
}