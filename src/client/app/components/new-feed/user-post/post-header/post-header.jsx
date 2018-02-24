import React from "react";

export class PostHeader extends React.Component {
    constructor(props) {
        super(props);
    };


    render() {
        let {time, name, avatarURL} = this.props;
        avatarURL = avatarURL || "/image/user.png";

        return (
            <div className="post-header row justify-content-center">
                <div className="col-2 p-0">
                    <div className="avatar-contain">
                        <img className="avatar" src={avatarURL}/>
                    </div>
                </div>
                <div className="col-10 p-0 header-info">
                    <div className="user-name-contain">
                        <p className="user-name">{name}</p>
                    </div>

                    <div>
                        <p className="time-to-now">{time}</p>
                    </div>


                </div>

            </div>
        );
    }
}