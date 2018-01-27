import React from "react";

export class Switch extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        let {switchForm,quote,type}=this.props;
        return(
            <div className="toggle">
                <p className="t-sub">{quote}</p>
                <p className="switch"
                   onClick={()=>switchForm()}
                >
                    {type}
                </p>
            </div>
        );
    }
}