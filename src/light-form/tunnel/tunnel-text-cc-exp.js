function addSlash(vv) {
    let result = vv;
    if (result.length >= 3) {
        result = result.substring(0, 2) + "/" + result.substring(2, result.length);
    }
    return result;
}

module.exports = {
    reformat: (vv) => {
        if (vv == null) {
            return null;
        }

        vv = vv.replace(/\D/g, "");

        return addSlash(vv);
    },
    format: (mv) => {
        if (mv == null) {
            return null;
        }

        return addSlash(mv);
    },
    parse: (vv) => {
        if (vv == null) {
            return null;
        }
        return vv.replace(/\D/g, "");
    }
};