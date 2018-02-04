import React from "react";

export class HomeLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {children}=this.props;
        return(
            <div className="home-layout">
                {children}
            </div>
        );
    }
}