var WildcardMatcher = require("./wildcard-matcher.js").WildcardMatcher;
const DomMatcher = {
    createDomMatcher(ptn) {
        let matchProp = WildcardMatcher.createWildcardMatcher(ptn.substring(1, ptn.length - 1));
        return (vdom) => {
            for (var attr in vdom.props) {
                if (matchProp(attr)) {
                    return true;
                }
            }
            return false;
        };
    }
};

exports.DomMatcher = DomMatcher;