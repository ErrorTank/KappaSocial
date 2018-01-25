module.exports = {
    reformat: (vv) => {
        if (vv == null) {
            return null;
        }

        vv =  vv.replace(/-/g, "");

        if (vv.length >= 4) {
            vv = vv.substring(0, 3) + "-" + vv.substring(3, vv.length);
            if (vv.length >= 8) {
                vv = vv.substring(0, 7) + "-" + vv.substring(7, vv.length );
            }
        }
        return vv;
    },
    parse: (vv) => {
        if (vv == null) {
            return null;
        }
        return vv.replace(/-/g, "");
    }
};