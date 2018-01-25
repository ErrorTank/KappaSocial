import moment from "moment";
const {O} = require("../../utils/object-util");

module.exports = {
    format: (mv) => {
        return mv
    },
    parse: (vv, getOldData) => {
        if(vv == null) {
            return null;
        }

        let oldData = getOldData();
        let newData = {
            ...(oldData && O.omit(oldData, ["date", "month", "year"])),
            ...O.omit(vv, ["hour", "minute"])
        };
        return newData;
    }
};