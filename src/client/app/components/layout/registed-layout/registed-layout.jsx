
import React from "react";

export class RegistedLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
        document.title="Kappa Login"
    };
    render(){
        let {children}=this.props;
        return(
            <div className="r-layout">
                <div className="r-header fixed-top">
                    <a href="http://localhost:2000/" className="brand-wrapper">
                        <div className="brand">
                            Kappa
                            <p className="brand-sub">
                                SocialHub
                            </p>
                        </div>
                    </a>
                </div>
                <div className="lgf-wrapper row justify-content-center">
                    {children}
                </div>
            </div>
        );
    }
}