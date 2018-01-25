module.exports = (val) => {
    return val != null && Array.isArray(val) && val.length > 0;
};