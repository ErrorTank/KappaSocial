import React from "react";
import {Result} from "./result/result";

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let {rList, keyword} = this.props;
        return (
            <div className="search-result">
                {rList.length ?
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