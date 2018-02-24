import React from "react";
import {Avatar} from "../../../common/avatar/avatar";
import {userServices} from "../../../services/user-info";

export class TogglePostModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {onClick}=this.props;
        let {avatarURL} = userServices.getInfo();
        return(
            <div className="new-feed-block post-stuff t-p-modal">
                <div className="post-article row">
                    <div className="col-3 p-0 post-avatar">
                        <Avatar avatarURL={avatarURL}
                                size="md"
                        />
                    </div>

                    <input
                        type="text"
                        className="post-input col-9 p-0 clear"
                        placeholder="Post something..."
                        onClick={()=>onClick()}
                    />
                </div>
            </div>
        );
    }
}