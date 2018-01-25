const {WildcardMatcher} = require("./wildcard-matcher.js");
const {ReactUtil} = require("../utils/react-util.js");
const {DomMatcher} = require("./dom-matcher.js");
const {Fs} = require("../utils/common-utils");
import React from "react";


function deleteProps(targetProps, props, deleteds) {
    let matchs = deleteds.map(WildcardMatcher.createWildcardMatcher);

    let changed = false;
    for (let attr in props) {
        if (props.hasOwnProperty(attr) && matchs.find((m) => m(attr))) {
            targetProps[attr] = undefined;
            // console.log(`Matched ${attr}`);
            changed = true;
        }
    }
    return changed;
}

const match = (domSelector, actionFn) => {
    let domMatcher = DomMatcher.createDomMatcher(domSelector);

    return (vdom) =>
        ReactUtil.recursiveMap(vdom, (vdom) => {

            if (!domMatcher(vdom)) {
                return null;
            }

            let action = actionFn(Object.assign({}, vdom.props), vdom.type);

            let updateProps = {};
            let updatedProps = false;
            if (action.deleteProps) {
                let deletedProps = deleteProps(updateProps, vdom.props, action.deleteProps);
                if (deletedProps) {
                    updatedProps = true;
                }
            }
            if (action.setProps) {
                updateProps = {...updateProps, ...action.setProps};
                updatedProps = true;
            }

            let children = vdom.props.children;
            if (action.children) {
                children = React.Children.map(vdom.props.children, (child) => Fs.invokeChain(child, action.children));
            } else if (action.setChildren) {
                children = action.setChildren;
            }

            return {
                deleteNode: action.deleteNode,
                updateProps: !updatedProps ? undefined : updateProps,
                wrappedBy: action.wrappedBy,
                children: children === vdom.props.children ? undefined : children,
            };
        })
    ;
};

exports.match = match;