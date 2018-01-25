import React from "react";

export class FancyInput extends React.Component{
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
            <div>
                <div className="form-group">
                    <p className={`${isFocus ? "on-focus" : ""} fake-holder`}>{fakeHolder}</p>
                    <input type="text"
                           className={`form-control ${isFocus ? "i-focus" :""}`}
                           id={type}
                           onFocus={()=>this.toggleFocus()}
                           onBlur={()=>this.toggleFocus()}
                           value={value}
                           onChange={(e)=>onChange(e.target.value)}
                    />
                </div>
            </div>
        );
    }
}