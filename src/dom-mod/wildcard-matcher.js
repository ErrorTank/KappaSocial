const WildcardMatcher = {
    createWildcardMatcher(wildcard) {
        let ptn = `^${wildcard.replace(/\*/g, ".*")}$`;
        let regexp = new RegExp(ptn);

        return (str) => regexp.test(str);
    }
};

exports.WildcardMatcher = WildcardMatcher;