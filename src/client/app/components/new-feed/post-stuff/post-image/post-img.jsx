import React from "react";
import {ImgContain} from "./image-contain/image-contain";
import {getBase64} from "../../../../../../utils/components-utils";
import {uploadError} from "../../../../services/upload-error";

export class PostImage extends React.Component {

    deleteImg = (pos) => {
        let {onChange,files} = this.props;
        files.splice(pos,1);
        onChange(files);
    };


    handleFile(files) {
        let {onChange} = this.props;
        let filesSubmit = [...this.props.files];
        if(files.length+filesSubmit.length>8){
            uploadError.setError(`Can't upload ${files.length} images. Maximum is 8 images.`);
            return ;
        }
        uploadError.removeErr();
        let promise=[];
        for (let i = 0; i < files.length; i++) {
            promise.push(getBase64(files[i]));
        }
        Promise.all(promise).then((data)=>{
            onChange(filesSubmit.concat(data));
        });

    }

    render() {
        let {files} = this.props;
        return (
            <div className="post-image">
                <div className="img-post-contain row">
                    {files.map((file, i) =>
                        <div className="each-img p-0 col-3" key={i}>
                            <ImgContain
                                file={file}
                                onDelete={() => this.deleteImg(i)}
                            />
                        </div>
                    )}
                    {files.length < 8 &&
                    <div className="img-holder p-0 col-3">
                        <div className="inside-img-holder"
                             onClick={() => {
                                 this.upload.click();
                             }}
                        >
                            <span className="icon-container-middle add-img-icon">
                                <i className="fas fa-plus"/>
                            </span>
                            <input type="file"
                                   className="img-upload"
                                   multiple={true}
                                   accept=".jpg, .jpeg"
                                   ref={upload => this.upload = upload}
                                   onChange={(e) => this.handleFile(e.target.files)}
                                   name="uploadImg"
                            />
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}