import React from "react";
import {debounce} from "../../../../../../../utils/components-utils";
import {SearchResult} from "./search-result/search-result";
import {userApi} from "../../../../../../api/ultils-api/user-api";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            showLoading:false,
            rList:[],
            isFocus:true
        };
    };

    showResult= debounce((val)=>{
        userApi.searchUser(val).then((data)=>{
            this.setState({showLoading:false,rList:data});
        });

    }, 1000);

    searchingUser=(val)=>{
        this.setState({keyword:val},()=>{
            val && this.showResult(val);
        });

    };

    render() {
        let {keyword,showLoading,rList,isFocus} = this.state;
        let showUndo = !!keyword && !showLoading;
        return (
            <div className="search-bar col p-0 align-items-center justify-keyword-center row">
                <div className="user-search col-8 p-0 row">
                    <span className="search-icon">
                        <i className="fas fa-search"/>
                    </span>
                    {showUndo &&
                        <span className="undo-icon"
                              onClick={()=>this.setState({keyword:""},()=>{
                                  this.searchBar.focus();
                              })}
                        >
                            <i className="fas fa-undo"/>
                        </span>
                    }
                    {showLoading &&
                        <span className="loading-icon">
                            <i className="fas fa-spinner"/>
                        </span>
                    }
                    <input type="text"
                           className="search col-12"
                           placeholder="Search kappas"
                           value={keyword}
                           onChange={(e) => {this.setState({showLoading:true}); this.searchingUser(e.target.value)}}
                           onBlur={()=>this.setState({isFocus:false})}
                           onFocus={()=>this.setState({isFocus:true})}
                           ref={sb=>this.searchBar=sb}
                    />


                </div>
                {(keyword && isFocus) && <SearchResult
                    keyword={keyword}
                    rList={rList}/>}
            </div>
        );
    }
}