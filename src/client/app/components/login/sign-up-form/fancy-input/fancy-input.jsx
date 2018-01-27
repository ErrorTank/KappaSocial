import React from "react";
import {ValidateIcon} from "../../../validate-icon/validate-icon";

export class FancyInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFocus:false,
            showIcon:false
        };
    };
    toggleFocus=()=>{
        let {isFocus}=this.state;
        let {value}=this.props;
        this.setState({isFocus:value ? true : !isFocus},()=>console.log(this.state.isFocus));
    };
    render(){
        let {isFocus,showIcon}=this.state;
        let {type,fakeHolder,onChange,value,suggest,valid}=this.props;
        return(
            <div className={`fg-wrapper ${showIcon ? valid ? "valid" :"in-valid" : ""}`}>
                <div className={`form-group fi-wrapper`}>
                    <p className={`${isFocus ? "on-focus" : ""} fake-holder`}>{fakeHolder}</p>
                    <input type={type}
                           className={`form-control ${isFocus ? "i-focus" :""}`}
                           onFocus={()=>this.toggleFocus()}
                           onBlur={()=>this.toggleFocus()}
                           value={value}
                           onChange={(e)=>{
                               onChange(e.target.value);
                               this.setState({showIcon:true});
                           }}
                    />
                    {showIcon && <ValidateIcon valid={valid}/>}
                </div>
                <p className="validate-msg">{(!showIcon || !valid) && suggest}</p>
            </div>
        );
    }
}