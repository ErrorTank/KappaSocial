const {match} = require("../../dom-mod/match.js");

const createLfDebug = (form) => match("[lf-debug]", (props) => {
    let path = props["lf-debug"];
    if (path === true) {
        path = props["lf-path"];
    }

    if (typeof path != "string") {
        throw `[lf-debug]: lf-path is ${typeof path}, expected string. Forgot a dom mod step?`;
    }

    return ({
        setChildren: "" + JSON.stringify(form.getPathData(path)),
    });
});

exports.createLfDebug = createLfDebug;