import React from "react";
import {CSSTransition} from "react-transition-group";

export const Fade = ({children,className,timeout,...props}) => {
    console.log(children)
    return (
        <CSSTransition
            {...props}
            timeout={timeout}
            classNames={className}
        >
            <div>
                {children}
            </div>

        </CSSTransition>
    );
};

