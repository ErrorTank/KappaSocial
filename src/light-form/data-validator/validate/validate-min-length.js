// If no value -> ok

module.exports = (length) => (value) => {
    if (value == null || value == "") {
        return true;
    }
    return value.length >= length;
};