import React from "react";
import {Router, Route, Redirect,Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {Login} from "../components/login/login";
import {HomeLayout} from "../layout/home-layout/home-layout";

export const customHistory = createBrowserHistory();


export class MainRoutes extends React.Component{
    render(){
        return(
            <Router history={customHistory}>
                <Switch>
                    <Route path="/login" component={Login} exact/>
                    <Route path="/home" component={HomeLayout} exact/>
                    <Route component={Login}/>
                </Switch>
            </Router>
        );
    }
}