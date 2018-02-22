import React from "react";
import ReactDOM from "react-dom";

export class ProgressLoading extends React.Component{
    constructor(props){
        super(props);

    };

    componentDidMount(){
        let $dis=$(ReactDOM.findDOMNode(this));
        console.log($dis);
        $dis.find(".load-bar").animate({"width":"100%"},1000);
    };

    render(){


        return(
            <div className="progress-loading">
                <div className="load-bar"/>
            </div>
        );
    }
}