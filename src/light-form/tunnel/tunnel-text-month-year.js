import moment from "moment";
const {StringUtil} = require("../../utils/string-util");

function goodFormat(val) {
    return /^(?:\d+|\d+\/\d+)$/.test(val);
}


module.exports = {
    reformat: (vv) => {
        if (StringUtil.isEmpty(vv)) {
            return vv;
        }
        if (!/^\d{3}$/.test(vv)) {
            return vv;
        }

        return `${vv.substring(0, 2)}/${vv.substring(2)}`;
    },
    format: (mv) => {
        if (mv == null) {
            return null;
        }
        return `${StringUtil.padding(mv.month, 2)}/${StringUtil.padding(mv.year, 2)}`;
    },
    parse: (vv) => {
        if (StringUtil.isEmpty(vv)) {
            return null;
        }

        if (vv.indexOf("/") == -1 ? vv.length < 6 : vv.length < 7) {
            throw "too short";
        }

        if (!goodFormat(vv)) {
            throw "Invalid format";
        }

        let m, y;

        if (vv.indexOf("/") == -1) {
            m = vv.substring(0, 2);
            y = vv.substring(2);
        } else {
            let [m1, y1] = vv.split("/");
            m = m1;
            y = y1;
        }

        const momentDate = moment({
            month: +m - 1,
            year: +y - 1,
        });

        if (!momentDate.isValid()) {
            throw "Not valid month year";
        }
        return {
            month: momentDate.toObject().months + 1,
            year: momentDate.toObject().years + 1,
        }
    }
};