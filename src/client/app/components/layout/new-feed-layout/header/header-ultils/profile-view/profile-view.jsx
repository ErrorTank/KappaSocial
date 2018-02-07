import React from "react";
import {userServices} from "../../../../../../services/user-info";


export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    };

    render() {
        let {name,avatarURL}=userServices.getInfo();
        if(!avatarURL) avatarURL="/image/user.png";
        return (

            <div className="profile-view"
                 onClick={(e) => e.stopPropagation()}
            >
                <div className="avatar">
                    <div className="img-contain-circle">
                        <img
                            src={avatarURL}
                            ref={ava => this.userAvar = ava}
                        />
                    </div>
                </div>
                <p className="user-name">{name}</p>
                <div className="profile-view-ultils">
                    <div className="pv-option row">
                        <span className="pv-icon col-3 p-0">
                            <i className="fas fa-user"/>
                        </span>
                        <p className="option-title col-9">Profile</p>
                    </div>
                    <div className="pv-option row">
                        <span className="pv-icon col-3 p-0">
                            <i className="fas fa-cog"/>
                        </span>
                        <p className="option-title col-9">Settings</p>
                    </div>
                    <div className="pv-option row">
                        <span className="pv-icon col-3 p-0">
                            <i className="fas fa-sign-out-alt"/>
                        </span>
                        <p className="option-title col-9">Sign out</p>
                    </div>
                </div>
            </div>


        );
    }
}