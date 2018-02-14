import React from "react";
import {Avatar} from "../../../../common/avatar/avatar";
import {userServices} from "../../../../services/user-info";

export class PostArticle extends React.Component{
    constructor(props){
        super(props);

    };
    render(){
        let {avatarURL} = userServices.getInfo();
        let {onChange,value,expandPost,expand}=this.props;
        if(!avatarURL) avatarURL="/image/user.png";
        return(
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
                    value={value}
                    onChange={e=>onChange(e.target.value)}
                    onFocus={()=>!expand && expandPost()}
                    autoFocus={expand}
                />
            </div>
        );
    }
}