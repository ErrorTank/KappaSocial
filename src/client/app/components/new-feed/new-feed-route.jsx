import React from "react";
import {NewFeedLayout} from "../layout/new-feed-layout/new-feed-layout";
import {PostStuff} from "./post-stuff/post-stuff";
import {modals} from "../../common/modal/modals";
import {UserPost} from "./user-post/user-post";
import {postApi} from "../../../api/ultils-api/post-api";


export class NewFeedRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            posts: []
        };
        postApi.getPost().then((posts) => {
            this.setState({posts}, () => {
                console.log(this.state.posts);
            });
        });

    };

    render() {
        let {expand, posts} = this.state;
        if (expand) {
            const modal = modals.openModal({
                content: (
                    <PostStuff
                        expand={expand}
                        close={() => modal.close()}
                        expandPost={() => this.setState({expand: true})}
                    />
                ),
                className: "what-ever"
            });

            modal.result.then(() => {
                this.setState({expand: false})
            })

        }
        return (
            <NewFeedLayout>
                <div className="new-feed-route row justify-content-center">
                    <div className="new-feed col-xl-6 col-lg-7 col-md-8 col-sm-10">

                        { !expand && (
                            <PostStuff
                                expand={expand}
                                expandPost={() => this.setState({expand: true})}
                            />
                        )}

                        <div className="new-feed-post">
                            { posts.map((p, i) => (
                                <UserPost
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </NewFeedLayout>
        );
    }
}