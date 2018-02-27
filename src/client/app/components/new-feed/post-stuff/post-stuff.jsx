import React from "react";
import {PostNav} from "./post-nav/post-nav";
import {PostAction} from "./post-action/post-action";
import {PostArticle} from "./post-article/post-article";
import {PostImage} from "./post-image/post-img";
import {TransitionGroup} from "react-transition-group";
import {Fade} from "../../../common/animation/fade";
import {postApi} from "../../../../api/ultils-api/post-api";
import {userServices} from "../../../services/user-info";
import {uploadError} from "../../../services/upload-error";


export class PostStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            type: "article",
            files: []
        }
    };
    componentWillUpdate(){
        uploadError.removeErr();
    };

    handleSubmit = () => {
        let {files, value} = this.state;
        let {onSubmit, close} = this.props;
        let getFiles = files.map((f) => f.file);
        let promise = [];
        for (let i = 0; i < getFiles.length; i++) {
            promise.push(postApi.uploadPost(getFiles[i]));
        }
        Promise.all(promise).then((data) => {
            let {name, avatarURL} = userServices.getInfo();
            console.log(data);
            let postObj = {imgList: data, content: value, name, avatarURL, time: new Date().getTime()};
            postApi.savePost(postObj).then(() => {
                let srcObj={imgList: files.map(f => f.src)};
                onSubmit(Object.assign({}, postObj,srcObj));
                close();

            });
        });
    };

    render() {

        let {value, type, files} = this.state;

        let {close} = this.props;
        let postType = type === "article" ?
            (
                <PostArticle
                    onChange={(val) => this.setState({value: val})}
                    value={value}
                />
            ) :
            (
                <PostImage
                    files={files}
                    onChange={(files) => {
                        this.setState({files})
                    }}

                />
            );
        return (
            <div className="new-feed-block post-stuff">

                <PostNav
                    current={type}
                    onSwitch={(type) => this.setState({type})}
                />

                <div className="post-type">
                    <form encType="multipart/form-data"
                          id="upload-post"
                          method="POST"
                          onSubmit={(e) => {
                              e.preventDefault();
                              if(value.length>200){

                              }
                              this.handleSubmit(e)
                          }}
                    >
                        <TransitionGroup>
                            <Fade key={type}
                                  timeout={200}
                                  className="post-type-fade"

                            >
                                {postType}
                            </Fade>
                        </TransitionGroup>
                    </form>

                </div>
                <PostAction
                    disabled={!value && !files.length}
                    close={close}
                />
            </div>
        );
    }
}