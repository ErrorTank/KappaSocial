import React from "react";
import {ProgressLoading} from "../../../../../common/progress-loading/progress-loading";


export class ImgContain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null
        };

        this.getBase64(props.file);
    };
    getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({imgSrc: reader.result})
        };
    }


    render() {
        let {onDelete} = this.props;
        let {imgSrc} = this.state;

        return (
            <div className="img-contain">

                {!imgSrc ?
                    <div className="loading-bar">
                        {/*<ProgressLoading/>*/}

                        Loadung....
                    </div>
                    :
                    <div>
                        <img src={imgSrc}/>
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