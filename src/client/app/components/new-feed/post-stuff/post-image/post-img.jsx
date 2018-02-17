import React from "react";
import {ImgContain} from "./image-contain/image-contain";

export class PostImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    render(){
        let {list,loadImage}=this.props;
        let allowAdd=list.length<4;
        let eachImgHeight=`${$(".each-img").width()}px`;
        let imgHolderHeight=`${$(".img-holder").width()}px`;
        return(
            <div className="post-image">
                <div className="img-post-contain row">
                    {list.map((url,i)=>
                        <div className="each-img p-0 col-3" key={i} style={{height:eachImgHeight}}>
                            <ImgContain
                                url={url}
                            />
                        </div>
                    )}
                    {allowAdd &&
                    <div className="img-holder p-0 col-3" style={{height:imgHolderHeight}}>
                        <div className="inside-img-holder"
                             onClick={()=>{
                                 this.upload.click();
                             }}
                        >
                            <span className="icon-container-middle add-img-icon">
                                <i className="fas fa-plus"/>
                            </span>
                            <input type="file"
                                   className="img-upload"
                                   accept=".jpg, .jpeg"
                                   ref={upload=>this.upload=upload}
                                   onChange={(e)=>loadImage(e.target.files)}
                            />

                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}