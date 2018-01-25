module.exports = {
    format: (mv) => {
        if (mv == null) {
            return null;
        }
        return mv*100;
    },
    parse: (vv) => {
        if (vv == null || vv == "") {
            return null;
        }

        if (isNaN(vv)) {
            throw "Invalid format";
        }

        return vv/100;
    }
};