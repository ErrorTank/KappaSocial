import React from "react";

export class RefreshBtn extends React.Component{
    constructor(props){
        super(props);

    };
    render(){
        let {refreshing,disabled}=this.props;
        return(
            <div className="refresh-new-feed">
                <button
                    className="btn btn-outline-primary refresh-btn"
                    onClick={()=>refreshing()}
                    disabled={disabled}
                >
                    <span><i className="fas fa-sync-alt"/></span> Refresh
                </button>
            </div>
        );
    }
}