import React from "react";

export class PostAction extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {close,disabled}=this.props;
        return(
            <div className="post-action row justify-content-end">
                <div className="col-3">
                    <button
                        className="btn btn-block close-post"
                        onClick={()=>close()}

                    >
                        Cancel
                    </button>
                </div>

                <div className="col-3">
                    <button className="btn btn-block post-article"
                            type="submit"
                            form="upload-post"
                            disabled={disabled}
                    >
                        Post
                    </button>
                </div>
            </div>
        );
    }
}