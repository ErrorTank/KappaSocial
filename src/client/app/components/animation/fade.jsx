import React from "react";
import {CSSTransition} from "react-transition-group";

const Fade = ({children,className,timeout,...props}) => (
    <CSSTransition
        {...props}
        timeout={timeout}
        classNames={className+"-fade"}
    >
        <div>
            {children}
        </div>
    </CSSTransition>
);

export {Fade};