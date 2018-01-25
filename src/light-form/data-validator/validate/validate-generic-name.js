module.exports = (val) => {
    if (val == null || val == "") {
        return true;
    }

    return !/[~`!@#$%^&*()_+\[\]{};':",\/<>?]/.test(val);
};
