import React from "react";
import {Header} from "./header/header";

export class NewFeedLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
        document.title="InstaKappa";
    };
    render(){
        let {children}=this.props;
        return(
            <div className="new-feed-layout">
                <Header/>
                {children}
            </div>
        );
    }
}