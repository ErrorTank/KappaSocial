import React from "react";
import {ProgressLoading} from "../../../../../common/progress-loading/progress-loading";


export class ImgContain extends React.Component {
    constructor(props) {
        super(props);

    };



    render() {
        let {onDelete,file} = this.props;
        let {src} = file;

        return (
            <div className="img-contain">

                {!src ?
                    <div className="loading-bar">
                        {/*<ProgressLoading/>*/}

                        Loading....
                    </div>
                    :
                    <div>
                        <img src={src}/>
                        <span className="del-upload"
                              onClick={() => onDelete()}
                        >
                            <i className="fas fa-times"/>
                        </span>
                    </div>
                }


            </div>
        );
    }
}