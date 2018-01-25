// If no value -> ok

module.exports = (str) => (value) => {
    if (value == null || value == "") {
        return true;
    }
    return value.startsWith(str);
};