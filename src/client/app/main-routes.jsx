import React from "react";
import {Router, Route,Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {RegistedRoute} from "./components/registed/registed-route";
import {NewFeedRoute} from "./components/new-feed/new-feed-route";
import {Fade} from "./common/animation/fade";
import {TransitionGroup} from "react-transition-group";

export const customHistory = createBrowserHistory();

const FadeRoute=({path,component:Comp,...rest})=>{
    return (
        <TransitionGroup>
            <Fade
                key={path}
                timeout={300}
                className="main-route-fade"
            >
                <Route
                    path={path}
                    component={Comp}
                    {...rest}
                />
            </Fade>
        </TransitionGroup>
    );
};

export class MainRoutes extends React.Component{
    render(){
        return(
            <div>
                <Router history={customHistory}>
                    <Switch>
                        <FadeRoute path="/" component={NewFeedRoute} exact/>
                        <FadeRoute path="/login" component={RegistedRoute}/>
                    </Switch>
                </Router>
                {/*<ModalRegistry/>*/}
            </div>
        );
    }
}