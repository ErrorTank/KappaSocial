import React from "react";

export class LoginInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFocus:false
        };
    };
    toggleFocus=()=>{
        let {isFocus}=this.state;
        let {value}=this.props;
        this.setState({isFocus:value ? true : !isFocus},()=>console.log(this.state.isFocus));
    };
    render(){
        let {isFocus}=this.state;
        let {type,fakeHolder,onChange,value}=this.props;
        return(
            <div className={`fg-wrapper`}>
                <div className={`form-group lf-wrapper`}>
                    <p className={`${isFocus ? "on-focus" : ""} fake-holder`}>{fakeHolder}</p>
                    <input type={type}
                           className={`form-control ${isFocus ? "i-focus" :""}`}
                           onFocus={()=>this.toggleFocus()}
                           onBlur={()=>this.toggleFocus()}
                           value={value}
                           onChange={(e)=>{
                               onChange(e.target.value);
                           }}
                    />
                </div>
            </div>
        );
    }
}