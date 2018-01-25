import * as moment from "moment";
const {O} = require("../../utils/object-util");

module.exports = {
    format: (mv) => {
    // && moment(mv).format("HH:mm");
        return mv
    },
    parse: (vv, getOldData) => {
        if (vv == null) {
            return null;
        }

        let oldData = getOldData();
        let oldDataYMD = (oldData && O.omit(oldData, ["hour", "minute"]));
        let newData = {
            ...oldDataYMD,
            ...O.omit(vv, ["day", "month", "year"])
        };
        return newData;
    }
};