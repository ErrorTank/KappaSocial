module.exports = (val) => {
    if (val == null || val == "") {
        return true;
    }

    return !/[0-9~`!@#$%^&*()_+\[\]{};':",<>?]/.test(val);
};
