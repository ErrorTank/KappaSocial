import React, {Fragment} from "react";
import {PostHeader} from "./post-header/post-header";
import {formatTime} from "../../../../../utils/components-utils";
import {PostBody} from "./post-body/post-body";
import {PostFooter} from "./post-footer/post-footer";
import {clientSocket} from "../../../../api/client-socket";
import {userServices} from "../../../services/user-info";
import {postApi} from "../../../../api/ultils-api/post-api";

export class UserPost extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tempLike:false
        };
        let {time}=props.postInfo;
        let {id,email}=userServices.getInfo();
        let userID=id || "",userEmail=id ? "" : email;
        postApi.getLikeStatus({userID,userEmail,postKey:time}).then((data)=>{
            this.setState({tempLike:!!data.length});
        });

    };

    componentWillUnmount(){
        let socket=clientSocket.getSocket();
        socket.removeAllListeners();
    };
    toggleLike=()=>{
      let {tempLike}=this.state;
      let {toggleLike}=this.props;
      toggleLike(tempLike);
      this.setState({tempLike:!tempLike});
    };

    render() {
        let {time, name, content, imgList,avatarURL} = this.props.postInfo;
        let {tempLike}=this.state;
        let like=tempLike;
        let fTime=formatTime(new Date(Number(time)));
        return (
            <div className="user-post">

                <PostHeader
                    time={fTime}
                    name={name}
                    avatarURL={avatarURL}
                />
                <PostBody
                    content={content}
                    list={imgList}
                />
                <PostFooter
                    toggleLike={()=>this.toggleLike()}
                    like={like}
                />
            </div>

        );
    }
}