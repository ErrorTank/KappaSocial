import React from "react";
import {debounce} from "../../../../../../../utils/components-utils";
import {SearchResult} from "./search-result/search-result";
import {userApi} from "../../../../../../api/ultils-api/user-api";
import {userServices} from "../../../../../services/user-info";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            showLoading:false,
            follow:[],
            unfollow:[],
            isFocus:true
        };
    };

    showResult= debounce((val)=>{
        let {id,email}=userServices.getInfo();
        let key=id || email;
        userApi.searchUser(val,key).then((data)=>{
            console.log(data);
            let {follow,unfollow}=data;
            this.setState({showLoading:false,follow,unfollow});
        });

    }, 1000);

    searchingUser=(val)=>{
        this.setState({keyword:val},()=>{
            val ? this.showResult(val) : this.setState({showLoading:false});
        });

    };

    render() {
        let {keyword,showLoading,follow,unfollow,isFocus} = this.state;
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
                {(keyword && isFocus) &&
                <SearchResult
                    keyword={keyword}
                    follow={follow}
                    unfollow={unfollow}
                />}
            </div>
        );
    }
}