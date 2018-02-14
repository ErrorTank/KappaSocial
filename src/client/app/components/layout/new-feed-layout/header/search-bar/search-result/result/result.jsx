import React from "react";
import {highLight} from "../../../../../../../../../utils/components-utils";
import {Loading} from "../../../../../../../common/loading/loading";
import {userApi} from "../../../../../../../../api/ultils-api/user-api";
import {userServices} from "../../../../../../../services/user-info";
import {Avatar} from "../../../../../../../common/avatar/avatar";



export class Result extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            tempCheck:false
        };

    };

    followUser=()=>{
        let {user}=this.props;
        this.setState({loading: true});
        let {email,userID}=user;
        let {id:myID,email:myEmail}=userServices.getInfo();
        userApi.followUser({email,userID},{myID,myEmail}).then(()=> {
            this.setState({loading: false,tempCheck:true});
        });
    };

    render(){
        let {loading,tempCheck}=this.state;
        let {user, keyword}=this.props;
        let {name,avatarURL,followed}=user;
        let followedIcon=tempCheck || followed;
        if(!avatarURL) avatarURL="/image/user.png";
        return(
            <div className="user-result row">
                <div className="col-2 ava">
                    <Avatar avatarURL={avatarURL}
                            size="sm"
                    />
                </div>

                    <p className="col-7 pl-3 result-name">
                        {highLight(keyword, name)}
                    </p>
                    <div className="r-ultils col-3 p-0">
                        {(!loading && !followedIcon) &&
                        <span className="add-friend r-u-items"
                              onClick={(e)=>{
                                  e.stopPropagation();
                                  this.followUser();
                              }}
                        >
                            <i className="fas fa-user-plus"/>
                        </span>}
                        {loading && <Loading size="small"/>}
                        {followedIcon &&
                            <span className="followed-notice r-u-items">
                                <span>
                                    <i className="fas fa-check"/>
                                </span>
                                <span>Followed</span>
                            </span>
                        }
                    </div>

            </div>
        );
    }
}


