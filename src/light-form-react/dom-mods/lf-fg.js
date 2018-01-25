const {match} = require("../../dom-mod/match.js");

const lfFg = match("[lf-fg]", (props1) => {
    let path = props1["lf-fg"];
    return ({
        setProps: {"lf-path-state": true, "lf-path": path},
        children: [match("[lf-*]", (props) => ({
            setProps: {"lf-path": path},
        }))]
    });
});

exports.lfFg = lfFg;