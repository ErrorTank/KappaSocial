
// If no value -> ok

module.exports = (value) => {
    if (value == null) {
        return true;
    }
    let {month, year} = value;

    if (parseInt(month) > 12 || year.toString().length != 4) {
        return false;
    }

    let dateO = new Date( year, month - 1);

    if (dateO == "Invalid Date") {
        return false;
    }

    if (dateO.getYear() > new Date().getYear() + 20) {
        return false;
    }
    if (dateO.getYear() < new Date().getYear() - 150) {
        return false;
    }
    return true;
};

