import React from "react";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            showLoading:false
        };
    };

    render() {
        let {content,showLoading} = this.state;
        let showUndo=!!content;
        return (
            <div className="search-bar col p-0 align-items-center justify-content-center row">
                <div className="user-search col-8 p-0 row">
                    <span className="search-icon">
                        <i className="fas fa-search"/>
                    </span>
                    {showUndo &&
                        <span className="undo-icon"
                              onClick={()=>this.setState({content:""},()=>{
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
                           value={content}
                           onChange={(e) => this.setState({content: e.target.value})}
                           ref={search=>this.searchBar=search}
                    />
                </div>
            </div>
        );
    }
}