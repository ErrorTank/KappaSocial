import React from "react";

export class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {size}=this.props;
        return(
            <span className={`loading-${size}`}>
                <i className="fa fa-spinner" aria-hidden="true"/>
            </span>
        );
    }
}