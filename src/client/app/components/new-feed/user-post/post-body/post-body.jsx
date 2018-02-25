import React from "react";
import {ImageDisplay} from "./image-display/image-display";

export class PostBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        let {list, content} = this.props;
        return (
            <div className="post-body row">
                <div className="col-2 p-0">

                </div>
                <div className="content-contain col-10 p-0">
                    {content}
                </div>
                {list && (
                    <ImageDisplay
                        list={list}
                    />
                )}
            </div>
        );
    }
}