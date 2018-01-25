const textMonthYear = require("./tunnel/tunnel-text-month-year");
const textPhone     = require("./tunnel/tunnel-text-phone");
const textCcNumber  = require("./tunnel/tunnel-text-cc-number");
const textCcExp     = require("./tunnel/tunnel-text-cc-exp");
const textNumber    = require("./tunnel/tunnel-text-number");
const negate        = require("./tunnel/tunnel-negate");
const percentage    = require("./tunnel/tunnel-percentage");
const preserveTime        = require("./tunnel/tunnel-preserve-time");
const preserveDate        = require("./tunnel/tunnel-preserve-date");

export function simple(name, tunnel) {
    return { ...tunnel, name };
}

exports.textMonthYear   = simple("text-month-year" , textMonthYear);
exports.textPhone       = simple("text-phone"      , textPhone);
exports.textCcNumber    = simple("text-cc-number"  , textCcNumber);
exports.textCcExp       = simple("text-cc-exp"     , textCcExp);
exports.textNumber      = simple("text-number"     , textNumber);
exports.negate          = simple("negate"          , negate);
exports.preserveTime    = simple("preserve-time"   , preserveTime);
exports.preserveDate    = simple("preserve-date"   , preserveDate);
exports.percentage      = simple("percentage", percentage);