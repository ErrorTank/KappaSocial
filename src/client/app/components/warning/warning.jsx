import React from "react";
import {Slide} from "../animation/slide";
import {TransitionGroup} from "react-transition-group";

export class Warning extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        };
    };
    show=()=>{
        this.setState({show:true},()=>{
            // setTimeout(this.setState({show:false}),5000);
        });
    };
    render(){
        let {msg}=this.props;
        let {show}=this.state;
        return show ? (
            <TransitionGroup>
                <Slide key={msg} className="warning" timeout={5000}>
                    <div className="warning row justify-content-center align-items-center">
                        <span className="col-2"><i className="fa fa-exclamation-circle" aria-hidden="true"/></span>
                        <p className="warning-content col-10">{msg}</p>
                    </div>
                </Slide>
            </TransitionGroup>
        ) : (
            <div className="margin"/>
        );
    }
}