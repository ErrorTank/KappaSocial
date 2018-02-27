import React from "react";


export class ImagePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curPos: null
        }

    };

    convertImage = (target) => {
        let l = $(target).width();
        let parentL = $(target).parents(".preview-container").width();
        if (l > parentL) {
            $(target).addClass("big-img");
        } else {
            $(target).removeClass("big-img");
        }
    };
    nextImg = () => {

        let {curPos} = this.state;
        let {focusPos, list} = this.props;
        let next;
        next = curPos === null ? focusPos + 1 : curPos + 1;
        this.setState({curPos: next === list.length ? 0 : next});
    };
    prevImg = () => {

        let {curPos} = this.state;
        let {focusPos, list} = this.props;
        let next;
        next = curPos === null ? focusPos - 1 : curPos - 1;
        this.setState({curPos: next === -1 ? list.length - 1 : next});
    };

    render() {
        let {focusPos, list, close} = this.props;
        let {curPos} = this.state;
        let srcPos = curPos === null ? focusPos : curPos;
        return (
            <div className="preview-container">
                <div className="p-header">
                </div>
                <span className={`prev-img side ${list.length === 1 ? "disabled disabled-event" : ""}`}
                      onClick={() => this.prevImg()}
                >
                    <i className="fas fa-chevron-left"/>
                </span>
                <span className={`next-img side ${list.length === 1 ? "disabled disabled-event" : ""}`}
                      onClick={() => this.nextImg()}
                >
                    <i className="fas fa-chevron-right"/>
                </span>
                <img src={list[srcPos]}
                     id="slide-img"
                     onLoad={(e) => {
                         this.convertImage(e.target);
                     }}
                />
            </div>
        );
    }
}