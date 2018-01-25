var StringUtil = require("../../../utils/string-util.js").StringUtil;

module.exports = (value) => {
    if (StringUtil.isEmpty(value)) {
        return true;
    } else if (value.length != 10) {
        return false;
    } else {
        return /^\d+$/.test(value);
    }
};