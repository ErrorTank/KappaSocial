const validateEmail = require("./validate-email");
const {StringUtil} = require("../../../utils/string-util");

module.exports = (val) => {
    if (StringUtil.isBlank(val)) {
        return true;
    }

    if (val.length > 0) {
        let emails = val.split(/\s*[,;]\s*/);
        for (var i = 0; i < emails.length; i++) {
            let emailStr = emails[i];
            if (emailStr.length > 0 && !validateEmail(emailStr)) {
                return false;
            }
        }
    }
    return true;
};