import React from "react";
import {PostNav} from "./post-nav/post-nav";
import {PostAction} from "./post-action/post-action";
import {PostArticle} from "./post-article/post-article";
import {PostImage} from "./post-image/post-img";
import {TransitionGroup} from "react-transition-group";
import {Fade} from "../../../common/animation/fade";

export class PostStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            type:"article",
            imgList:[]
        }
    };
    loadImage=(files)=>{

        if(FileReader && files && files.length){
            let fr=new FileReader();
            fr.onload =  ()=> {
                let current=this.state.imgList;
                this.setState({imgList:current.concat([fr.result])});
            };
            fr.readAsDataURL(files[0]);
        }
    };
    render() {

        let {value,type,imgList} = this.state;
        console.log(imgList);
        let {expand,expandPost,close}=this.props;
        let postType=type==="article"?
            (
                <PostArticle
                    onChange={(val) => this.setState({value: val})}
                    value={value}
                    expandPost={()=>expandPost()}
                    expand={expand}
                />
            ) :
            (
                <PostImage
                    list={imgList}
                    loadImage={(files)=>this.loadImage(files)}
                />
            );
        return (
            <div className="new-feed-block post-stuff">
                {expand &&

                    <PostNav
                        current={type}
                        onSwitch={(type)=>this.setState({type})}
                    />
                }
                <div className="post-type">
                    <TransitionGroup>
                        <Fade key={type}
                              timeout={200}
                              className="post-type-fade"

                        >
                            {postType}
                        </Fade>
                    </TransitionGroup>
                </div>

                {expand &&
                <PostAction
                    disabled={!value}
                    close={close}
                />}
            </div>
        );
    }
}