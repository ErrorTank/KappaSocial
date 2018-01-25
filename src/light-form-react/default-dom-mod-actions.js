const {createLfBindAction} = require("./dom-mods/lf-bind/lf-bind");
const {lfPathStateAction} = require("./dom-mods/lf-path-state.js");

const DefaultDomModActions = {
    createDefaultDomModActions(propsMod) {
        return [
            createLfBindAction(propsMod),

            lfPathStateAction
        ];
    },
};

exports.DefaultDomModActions = DefaultDomModActions;