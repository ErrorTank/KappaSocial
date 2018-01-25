
module.exports = (ge) => (value) => {
    if (value == null || value == "") {
        return true;
    }
    if (typeof value === 'string')
        return ge <= value.length;
    return ge <= value;
};