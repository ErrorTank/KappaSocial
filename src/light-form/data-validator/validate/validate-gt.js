// If no value -> ok

module.exports = (gtNumber) => (value) => {
    if (value == null || value == "") {
        return true;
    }
    if (typeof value === 'string')
        return gtNumber < value.length;
    return gtNumber < value;
};