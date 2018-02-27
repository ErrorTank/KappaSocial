import React from "react";
import {NewFeedLayout} from "../layout/new-feed-layout/new-feed-layout";
import {PostStuff} from "./post-stuff/post-stuff";
import {modals} from "../../common/modal/modals";
import {UserPost} from "./user-post/user-post";
import {postApi} from "../../../api/ultils-api/post-api";
import {PostLoading} from "../../common/post-loading/post-loading";
import {RefreshBtn} from "./refresh-btn/refresh-btn";
import {TogglePostModal} from "./toggle-post-modal/toggle-post-modal";
import {userServices} from "../../services/user-info";


export class NewFeedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            posts: [],
            loading: true
        };
        this.updatePost();

    };

    updatePost = () => {

        postApi.getPost().then((posts) => {
            setTimeout(() => {
                this.setState({loading: false, posts});
            }, 1000);
        });


    };

    appendPost = (p) => {
        let {posts} = this.state;
        posts.unshift(p);
        this.setState({posts});
    };

    openPostModal = () => {
        this.setState({expand: true});
        const modal = modals.openModal({
            content: (
                <PostStuff
                    close={value => modal.close(value)}
                    onSubmit={p => this.appendPost(p)}
                />
            ),
            className: "what-ever"
        });

        return modal.result;
    };

    toggleLike=(pos,isLike)=>{
        let {id,email}=userServices.getInfo();
        let {posts}=this.state;
        let userEmail="",userID="";
        if(id) userID=id;
        else{
            userEmail=email;
        }
        let info={userID,userEmail,postKey:posts[pos].time};
        if(!isLike){
            postApi.likePost(info).then(()=>{

            });
        }else{
            postApi.dislikePost(info).then(()=>{

            });
        }

    };



    render() {
        let {expand, posts, loading} = this.state;
        console.log(posts);

        return (
            <NewFeedLayout>
                <div className="new-feed-route row justify-content-center">
                    <div className="new-feed col-xl-6 col-lg-7 col-md-8 col-sm-10">

                        <div>

                        </div>
                        {!expand && (
                            <TogglePostModal
                                onClick={() => this.openPostModal().then(value => this.setState({expand: false}))}
                            />
                        )}
                        <RefreshBtn
                            disabled={loading}
                            refreshing={() => this.setState({loading: true}, () => this.updatePost())}
                        />
                        {loading ?
                            <PostLoading/>

                            :
                            posts.length === 0 ? (
                                    <p className="empty-notice">No post has found!</p>) :
                                (
                                    <div className="new-feed-post">
                                        {posts.map((p, i) => (
                                            <UserPost
                                                key={i}
                                                postInfo={p}
                                                toggleLike={(isLike)=>this.toggleLike(i,isLike)}
                                            />
                                        ))}
                                    </div>
                                )

                        }


                    </div>
                </div>
            </NewFeedLayout>
        );
    }
}