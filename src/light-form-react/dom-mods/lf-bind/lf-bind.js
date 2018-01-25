const {inputPropsMod} = require("../../field-render-comp-props-mod/input-props-mod.js");
const {getRenderProps} = require("./lf-bind-render-props.js");
const {match} = require("../../../dom-mod/match.js");
const {Fs} = require("../../../utils/fs");

let propsMods = [
    {type: "input", mod: inputPropsMod},
    {type: "textarea", mod: inputPropsMod},
    {type: "select", mod: inputPropsMod},
];

function getRenderPropsMod(compType) {
    let propsMod = propsMods.find((pm) => pm.type == compType);
    if (propsMod) {
        return propsMod.mod;
    }

    return Fs.noop;
}
const createLfBindAction = (formView) => {
    return match("[lf-bind]", (props, compType) => {
        let pathWithFace = props["lf-bind"];
        if (pathWithFace === true) {
            pathWithFace = props["lf-path"];
        }

        if (typeof pathWithFace != "string") {
            throw `No path found. Missing lf-path?`;
        }

        let {node, entry} = formView.getEntry(pathWithFace);

        return ({
            setProps: Fs.invokeChain(getRenderProps(
                entry, props,
                node.getData,
                node.setData
            ), [
                getRenderPropsMod(compType),
                combineOriEventHandlers(props),
            ]),
        });
    });
};

function combineOriEventHandlers(oriProps) {
    return ({onChange, onFocus, onBlur, ...newPropsOthers}) => ({
        ...newPropsOthers,
        onChange: Fs.sequence([oriProps.onChange, onChange]),
        onFocus : Fs.sequence([oriProps.onFocus , onFocus]),
        onBlur  : Fs.sequence([oriProps.onBlur  , onBlur]),
    });
}

exports.lfBindConfig = {
    addRenderType: (type, mod) => {
        propsMods.push({type, mod});
    }
};

exports.createLfBindAction = createLfBindAction;