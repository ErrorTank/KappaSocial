import React from "react";
import {modals} from "../../../../../common/modal/modals";
import {ImagePreview} from "../../../../../common/image-preview/image-preview";

export class ImageDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    openImagePreviewModal= (pos) => {
        const modal = modals.openModal({
            content: (
                <ImagePreview
                    close={value => modal.close(value)}
                    list={this.props.list}
                    focusPos={pos}
                />
            ),
            className: "img-preview"
        });

        return modal.result;
    };

    render() {
        let {list} = this.props;
        let l = list.length;
        return (
            <div className="img-display row col-12">
                {list.map((src, i) => {
                        if (i < 4) return (
                            <div
                                className={`img-preview ${(l === 1 || (i === 2 && l === 3)) ? "col-12 big-image" : "col-6 small-image"} p-0 `}
                                key={i}
                                onClick={()=>this.openImagePreviewModal(i)}
                            >
                                <img src={src}/>
                                {(i === 3 && l > 4) && (
                                    <div className="more-notice">
                                        <p>{l - 4} +</p>
                                    </div>
                                )}
                            </div>
                        )

                    }
                )}
            </div>
        );
    }
}