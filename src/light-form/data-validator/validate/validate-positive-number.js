module.exports = (value) => {
    if (isNaN(value) || value < 0) {
        return false;
    }
    return true;
};