const {match} = require("../../dom-mod/match.js");
const {CacheUtil} = require("../../utils/cache-util.js");


function extractRenderAttrs(compProps, getEntryStamp) {
    let attrs = {};

    let getPathStamp = CacheUtil.cache0(() => getEntryStamp() || {});
    for (var k in compProps) {
        if (compProps.hasOwnProperty(k) && k.startsWith("lf-attr-")) {
            attrs[k.substring("lf-attr-".length)] = compProps[k](getPathStamp());
        }
    }
    return attrs;
}

const lfAttr = (form) => match("[lf-attr-*]", (props) => {
    let path = props["lf-path"];

    if (typeof path != "string") {
        throw `lf-path is ${typeof path}, expected string. Forgot a dom mod step?`;
    }

    let {entry} = form.getEntry(path);

    // Should separate into different directive?
    let renderAttrs = extractRenderAttrs(props, () => entry.getStamp());

    return ({
        // setProps:
        setProps: renderAttrs,
    });
});

exports.lfAttr = lfAttr;