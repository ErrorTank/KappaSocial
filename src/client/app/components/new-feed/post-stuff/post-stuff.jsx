import React from "react";
import {PostNav} from "./post-nav/post-nav";
import {PostAction} from "./post-action/post-action";
import {PostArticle} from "./post-article/post-article";
import {PostImage} from "./post-image/post-img";
import {TransitionGroup} from "react-transition-group";
import {Fade} from "../../../common/animation/fade";
import {postApi} from "../../../../api/ultils-api/post-api";
import {userServices} from "../../../services/user-info";


export class PostStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            type: "article",
            files: []
        }
    };


    handleSubmit = () => {
        let {files, value} = this.state;
        let {onSubmit,close}=this.props;
        files=files.map((f)=>f.file);
        let promise = [];
        for (let i = 0; i < files.length; i++) {
            promise.push(postApi.uploadPost(files[i]));
        }
        Promise.all(promise).then((data) => {
            let {name,avatarURL}=userServices.getInfo();
            let postObj={imgList: data, content:value,name,avatarURL,time:new Date().getTime()};
            postApi.savePost(postObj).then(() => {
                onSubmit(postObj);
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