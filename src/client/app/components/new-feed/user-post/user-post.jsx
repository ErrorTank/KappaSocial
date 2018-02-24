import React, {Fragment} from "react";
import {PostHeader} from "./post-header/post-header";
import {formatTime} from "../../../../../utils/components-utils";
import {PostBody} from "./post-body/post-body";

export class UserPost extends React.Component {
    constructor(props) {
        super(props);

    };

    render() {
        let {time, name, content, imgList,avatarURL} = this.props.postInfo;
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
            </div>

        );
    }
}