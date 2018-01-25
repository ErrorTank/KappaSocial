var createLfDebug = require("./dom-mods/lf-debug.js").createLfDebug;
var createLfErrMsg = require("./dom-mods/lf-err-msg.js").createLfErrMsg;
var lfAttr = require("./dom-mods/lf-attr.js").lfAttr;
var lfFg = require("./dom-mods/lf-fg.js").lfFg;
const {createLfBindAction} = require("./dom-mods/lf-bind/lf-bind");
const {createLfPathStateAction} = require("./dom-mods/lf-path-state.js");
const {Fs} = require("../utils/common-utils");
const {match} = require("../dom-mod/match");

let extraDirectives = [];

exports.bindDomConfig = {
    addExtraDirective(directive) {
        extraDirectives.push(directive);
    }
};

const removeLfDirectives = match("[lf-*]", (props) => ({
    deleteProps: ["lf-*"],
}));

exports.bindDom = (form) => {
    return Fs.chain([
        lfFg,
        createLfPathStateAction(form),
        lfAttr(form),
        createLfErrMsg(form),
        createLfBindAction(form),
        createLfDebug(form),
        Fs.chain(extraDirectives.map((dir) => dir(form))),
        removeLfDirectives,
    ]);
};