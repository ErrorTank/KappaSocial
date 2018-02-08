import React from "react";
import {highLight} from "../../../../../../../../../utils/components-utils";
import {Loading} from "../../../../../../../common/loading/loading";
import {userApi} from "../../../../../../../../api/ultils-api/user-api";
import {userServices} from "../../../../../../../services/user-info";

let follow=false;

export class Result extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        };

    };
    render(){
        let {loading}=this.state;
        let {user, keyword}=this.props;
        let {name,avatarURL,email,id,followed}=user;
        if(!avatarURL) avatarURL="/image/user.png";
        return(
            <div className="user-result row">
                <div className="col-2 ava">
                    <div className="img-contain">
                        <img src={avatarURL}/>
                    </div>
                </div>

                    <p className="col-7 pl-3 result-name">
                        {highLight(keyword, name)}
                    </p>
                    <div className="r-ultils col-3 p-0">
                        {(!loading && !followed) &&
                        <span className="add-friend r-u-items"
                              onClick={()=>{
                                  this.setState({loading:true});
                                  let {myID,myEmail}=userServices.getInfo();
                                  userApi.followUser({email,id},{myID,myEmail}).then(()=>{
                                     this.setState({loading:false});
                                  });
                              }}
                        >
                            <i className="fas fa-user-plus"/>
                        </span>}
                        {loading && <Loading size="small"/>}
                        {followed &&
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


