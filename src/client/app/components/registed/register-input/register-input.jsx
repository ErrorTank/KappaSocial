import React from "react";
import {ValidateIcon} from "../../validate-icon/validate-icon";

//TODO: gop 2 component lam 1
export class RegisterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            showIcon:false
        };
    };

    toggleFocus = () => {
        let {isFocus} = this.state;
        let {value} = this.props;
        this.setState({isFocus: value ? true : !isFocus});
    };

    render(){
        let {isFocus,showIcon}=this.state;
        let {type,placeholder,onChange,value,suggest,valid,icon=false}=this.props;
        return(
            <div className={`fg-wrapper ${showIcon ? valid ? "valid" :"in-valid" : ""}`}>
                <div className={`form-group fi-wrapper`}>
                    <p className={`${isFocus ? "on-focus" : ""} fake-holder`}>{placeholder}</p>
                    <input type={type}
                           className={`form-control ${isFocus ? "i-focus" :""}`}
                           onFocus={()=>this.toggleFocus()}
                           onBlur={()=>this.toggleFocus()}
                           value={value}
                           onChange={(e)=>{
                               onChange(e.target.value);
                               if(icon)
                                this.setState({showIcon:true});
                           }}
                    />
                    {showIcon && <ValidateIcon valid={valid}/>}
                </div>
                {<p className="validate-msg">{(!showIcon || !valid) && suggest}</p>}
            </div>
        );
    }
}