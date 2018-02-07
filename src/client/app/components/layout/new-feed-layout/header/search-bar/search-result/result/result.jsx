import React from "react";
import {highLight} from "../../../../../../../../../utils/components-utils";

export class Result extends React.Component{
    constructor(props){
        super(props);

    };
    render(){
        let {user, keyword}=this.props;
        let {name,avatarURL}=user;
        console.log(name);
        if(!avatarURL) avatarURL="/image/user.png";
        return(
            <div className="user-result row">
                <div className="col-2 ava">
                    <div className="img-contain">
                        <img src={avatarURL}/>
                    </div>
                </div>

                    <p className="col-8 pl-3 result-name">
                        {highLight(keyword, name)}
                    </p>
                    <div className="r-ultils col-2">
                        <span className="add-friend r-u-items">
                            <i className="fas fa-user-plus"/>
                        </span>
                    </div>

            </div>
        );
    }
}


