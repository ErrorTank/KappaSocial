import React from "react";
import {Router, Route,Switch} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import {RegistedRoute} from "./components/registed/registed-route";
import {NewFeedRoute} from "./components/new-feed/new-feed-route";
import {Fade} from "./common/animation/fade";
import {TransitionGroup} from "react-transition-group";
import {ModalsRegistry} from "./common/modal/modals";
import {clientSocket} from "../api/client-socket";

export const customHistory = createBrowserHistory();

const FadeRoute=({path,component:Comp,...rest})=>{
    return (
        <TransitionGroup>
            <Fade
                key={path}
                timeout={1000}
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
    componentWillMount(){
        clientSocket.connect().then(()=>{
            console.log("connect to socket success");
        });
        this.props.redirect();
    };
    render(){
        return(
            <div>
                <ModalsRegistry/>
                <Router history={customHistory}>
                    <Switch>
                        <FadeRoute path="/" component={NewFeedRoute} exact/>
                        <FadeRoute path="/login" component={RegistedRoute}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}