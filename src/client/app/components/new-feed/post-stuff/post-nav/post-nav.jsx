import React from "react";

export class PostNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {onSwitch,current}=this.props;
        return(
            <div className="post-nav row">
                <div className={`col p-0 ${current === "article" ? "post-active" : ""} p-nav-item`}
                     onClick={()=>onSwitch("article")}
                >
                    <span className="nav-icon">
                        <i className="fas fa-pen-square"/>
                    </span>
                    <span>Article</span>
                </div>
                <div className={`col p-0 ${current === "image" ? "post-active" : ""} p-nav-item`}
                     onClick={()=>onSwitch("image")}
                >
                    <span className="nav-icon">
                        <i className="fas fa-image"/>
                    </span>
                    <span>Image</span>
                </div>
            </div>
        );
    }
}