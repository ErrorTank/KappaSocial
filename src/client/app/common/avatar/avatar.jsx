import React from "react";

export class Avatar extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {avatarURL,size}=this.props;
        if(!avatarURL) avatarURL="/image/user.png";
        return(
            <div className={`img-contain-circle img-${size}`}>
                <img
                    src={avatarURL}
                />
            </div>
        );
    }
}