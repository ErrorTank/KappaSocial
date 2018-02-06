import React from "react";

export class What extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {children}=this.props;
        console.log(children);
        return React.Children.only(children);


    }
}