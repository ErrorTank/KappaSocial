import React from "react";

export class NewFeedLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {children}=this.props;
        return(
            <div className="new-feed-layout">
                {children}
            </div>
        );
    }
}