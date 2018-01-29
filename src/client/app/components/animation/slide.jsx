import React from "react";
import {CSSTransition} from "react-transition-group";

const Slide = ({children,className,timeout,...props}) => (
    <CSSTransition
        {...props}
        timeout={timeout}
        classNames={className+"-slide"}
    >
        <div>
            {children}
        </div>
    </CSSTransition>
);

export {Slide};