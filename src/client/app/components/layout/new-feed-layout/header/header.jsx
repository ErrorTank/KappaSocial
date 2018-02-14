import React from "react";
import {SearchBar} from "./search-bar/search-bar";
import {HeaderUltils} from "./header-ultils/header-ultils";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="app-header row">
                <div className="brand col p-0 align-items-center row">
                    <div className="col">
                        <a href="/" className="brand-item-wrapper">
                            <div className="logo brand-item">
                                <img src="/image/dragon-toy.png"/>
                            </div>
                            <div className="brand-title brand-item">
                                InstaKappa
                            </div>
                        </a>
                    </div>

                </div>

                <SearchBar/>

                <HeaderUltils/>
            </div>
        );
    }
}