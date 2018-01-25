import React from "react"
import ReactDOM from "react-dom";
import "./styl/styles.styl";
import {MainRoutes} from "./app/routes/main-routes";

// privateLoader.init().then((redirect)=>{
//     ReactDOM.render(<MainRoutes/>,$("#wrapper")[0],()=>{
//         redirect();
//     });
// });
ReactDOM.render(<MainRoutes/>,$("#wrapper")[0],()=>{

});

