import React from "react"
import ReactDOM from "react-dom";
import "./styl/styles.styl";
import {privateLoader} from "./api/secure/private-loader";
import {MainRoutes} from "./app/main-routes";

privateLoader.init().then((redirect)=>{
    ReactDOM.render(<MainRoutes/>,$("#wrapper")[0],()=>{
        redirect();
    });
});

