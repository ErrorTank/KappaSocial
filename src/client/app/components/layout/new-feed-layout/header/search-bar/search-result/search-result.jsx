import React from "react";
import {Result} from "./result/result";

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let {follow,unfollow, keyword} = this.props;
        let length=follow.length+unfollow.length;
        follow.forEach((u)=>u.followed=true);
        unfollow.forEach((u)=>u.followed=false);
        let rList=[...follow,...unfollow];
        return (
            <div className="search-result">
                {length ?
                    rList.map((user, i) => (
                    <Result
                        keyword={keyword}
                        key={i}
                        user={user}
                    />
                )) :
                    <p className="result-notice">No result!</p>
                }
            </div>
        );
    }
}