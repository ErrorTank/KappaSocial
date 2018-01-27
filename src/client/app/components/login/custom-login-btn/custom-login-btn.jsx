import React from "react";

export class CustomLoginBtn extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {type,onClick,title}=this.props;
        return(
            <div className="custom-btn"
                 onClick={()=>onClick()}
            >
                <button className={`${type} btn btn-block`}>
                    <i className="fa fa-facebook-official" aria-hidden="true"/>
                    <span className="btn-title">{title}</span>
                </button>
            </div>
        );
    }
}