import React from "react";
import {CSSTransition} from "react-transition-group";

const Fade = ({children,className,timeout,...props}) => {
    return (
        <CSSTransition
            {...props}
            timeout={timeout}
            classNames={className}
        >
            {children}
        </CSSTransition>
    );
};

export {Fade};