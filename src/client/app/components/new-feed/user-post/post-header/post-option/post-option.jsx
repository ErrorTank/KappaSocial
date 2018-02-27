import React from "react";

export class PostOption extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return(
            <div className="options-wrapper">
                <div className="edit-post">
                    <span><i className="fas fa-pencil-alt"/></span>
                    <span> Edit post</span>
                </div>
                <div className="hide-post">
                    <span><i className="fas fa-minus-square"/></span>
                    <span> Hide post</span>
                </div>
                <div className="delete-post">
                    <span><i className="fas fa-eraser"/></span>
                    <span> Delete post</span>
                </div>
            </div>
        );
    }
}