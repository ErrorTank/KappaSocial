import React from "react"
import ReactDOM from "react-dom";
import "./styl/styles.styl";
import {MainRoutes} from "./app/main-routes";
import {privateLoader} from "./api/secure/private-loader";

privateLoader.init().then((redirect)=>{
    ReactDOM.render(<MainRoutes/>,$("#wrapper")[0],()=>{
        redirect();
    });
});

