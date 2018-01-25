// If no value -> ok

module.exports = (leNumb) => (value) => {
    if (value == null || value == "") {
        return true;
    }
    if (typeof value === 'string')
        return leNumb >= value.length;
    return leNumb >= value;
};