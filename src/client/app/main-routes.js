import React from "react";
import {Router, Route,Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {HomeLayout} from "./components/layout/home-layout/home-layout";
import {RegistedRoute} from "./components/registed/registed-route";

export const customHistory = createBrowserHistory();


export class MainRoutes extends React.Component{
    render(){
        return(
            <div>
                <Router history={customHistory}>
                    <Switch>
                        <Route path="/login" component={RegistedRoute} exact/>
                        <Route path="/home" component={HomeLayout} exact/>
                    </Switch>
                </Router>
                {/*<ModalRegistry/>*/}
            </div>
        );
    }
}