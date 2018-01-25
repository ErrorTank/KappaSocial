import React from "react";

export class CustomLoginBtn extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {type}=this.props;
        return(
            <div className="custom-btn">
                <button className={`${type} btn btn-block`}>
                    <i className="fa fa-facebook-official" aria-hidden="true"/>
                    <span className="btn-title">Login with Facebook</span>
                </button>
            </div>
        );
    }
}