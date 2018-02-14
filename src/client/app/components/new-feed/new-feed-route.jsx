import React from "react";
import {NewFeedLayout} from "../layout/new-feed-layout/new-feed-layout";
import {PostStuff} from "./post-stuff/post-stuff";
import {modals} from "../../common/modal/modals";
let modal;

export class NewFeedRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            expand:false
        };


    };
    expandPost=()=>{
      this.setState({expand:true});
    };

    render(){
        let {expand}=this.state;

        if(expand){
            modal = modals.openModal({
                content: (
                    <PostStuff
                        expand={expand}
                        close={()=>modal.close()}
                        expandPost={()=>this.expandPost()}
                    />
                ),
                className: "what-ever"
            });
            modal.result.then(()=>{
                this.setState({expand:false});
            });
        }
        return(
            <NewFeedLayout>
                <div className="new-feed-route row justify-content-center">
                    <div className="new-feed col-xl-6 col-lg-7 col-md-8 col-sm-10">

                        {!expand &&
                            <PostStuff
                                expand={expand}
                                expandPost={()=>this.expandPost()}
                            />
                        }
                    </div>
                </div>
            </NewFeedLayout>
        );
    }
}