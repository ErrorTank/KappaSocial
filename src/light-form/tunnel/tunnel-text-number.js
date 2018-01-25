const {StringUtil} = require("../../utils/string-util");

module.exports = {
    // reformat: (vv) => {
    //     if (StringUtil.isEmpty(vv)) {
    //         return vv;
    //     }
    //     if (!/^\d{3}$/.test(vv)) {
    //         return vv;
    //     }
    //
    //     return `${vv.substring(0, 2)}/${vv.substring(2)}`;
    // },
    format: (mv) => {
        if (mv == null) {
            return null;
        }
        return "" + mv;
    },
    parse: (vv) => {
        if (StringUtil.isEmpty(vv)) {
            return null;
        }

        if (isNaN(vv)) {
            throw "Invalid format";
        }

        return +vv;
    }
};