import React from "react";


export class PostFooter extends React.Component{
    constructor(props){
        super(props);

    };



    render(){
        let {toggleLike,like}=this.props;
        return(
            <div>
                <div className="post-footer">
                    <div className="row footer-btn-wrapper">
                        <div className={`p-0 col kappa-post ${like ? "is-like" : ""}`}
                             onClick={()=>toggleLike()}
                        >
                            <span><i className="fab fa-optin-monster"/></span>
                            <span> Kappa</span>
                        </div>
                        <div className="p-0 col comment-toggle">
                            <span><i className="fas fa-comment-alt"/></span>
                            <span> Comment</span>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}