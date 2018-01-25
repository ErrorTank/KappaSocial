function addSpaces(vv) {

    let result = vv;
    if (result.length >= 5) {
        result = result.substring(0, 4) + " " + result.substring(4, result.length);

        if(vv.length >= 9) {
            result = result.substring(0, 9) + " " + result.substring(9, result.length);
        }

        if(vv.length >= 13) {
            result = result.substring(0,14) + " " + result.substring(14, result.length);
        }
    }
    return result;
}

module.exports = {
    reformat: (vv) => {
        if (vv == null) {
            return null;
        }

        vv = vv.replace(/\s/g, "");

        return addSpaces(vv);
    },
    format: (mv) => {
        if (mv == null) {
            return null;
        }

        return addSpaces(mv);
    },
    parse: (vv) => {
        if (vv == null) {
            return null;
        }
        return vv.replace(/\s/g, "");
    }
};