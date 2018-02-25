import React from "react";
import {uploadError} from "../../../../services/upload-error";

export class PostAction extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };

    };
    render(){
        let {close,disabled}=this.props;
        uploadError.onError(()=>this.forceUpdate());
        let err=uploadError.getError();
        return(
            <div className="post-action row justify-content-end">
                <div className="col-6 error-notify p-0">
                    {err && err}
                </div>
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