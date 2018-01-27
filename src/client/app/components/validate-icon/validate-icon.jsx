import React from "react";

export class ValidateIcon extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        let {valid}=this.props;
        return(
            <span className="validate-icon">
                {
                    valid ?
                        <i className="fa fa-check-circle" aria-hidden="true"/>
                        :
                        <i className="fa fa-times-circle" aria-hidden="true"/>
                }
            </span>
        );
    }
}