var AsyncValidator = require("./async-validator/async-validator.js").AsyncValidator;

const required          = require("./data-validator/validate/validate-required");
const colNotEmpty       = require("./data-validator/validate/validate-col-not-empty");
const textEmailList     = require("./data-validator/validate/validate-text-email-list");
const email             = require("./data-validator/validate/validate-email");
const genericName       = require("./data-validator/validate/validate-generic-name");
const humanName         = require("./data-validator/validate/validate-human-name");
const birthDate         = require("./data-validator/validate/validate-birth-date");
const dateTimeObject    = require("./data-validator/validate/validate-date-time-object");
const phone             = require("./data-validator/validate/validate-phone");

const minLength         = require("./data-validator/validate/validate-min-length");
const maxLength         = require("./data-validator/validate/validate-max-length");
const startsWith        = require("./data-validator/validate/validate-starts-with");
const equals            = require("./data-validator/validate/validate-equals");
const number            = require("./data-validator/validate/validate-number");
const positiveNumber    = require("./data-validator/validate/validate-positive-number");
const gt                = require("./data-validator/validate/validate-gt");
const ge                = require("./data-validator/validate/validate-ge");
const le                = require("./data-validator/validate/validate-le");

function simple(name, validate, props) {
    return Object.assign({}, props, {name, validate});
}
function async(name, options, validateAsync) {
    if (validateAsync === undefined) {
        validateAsync = options;
        options= {delay: 500};
    }

    let cache = {};

    return {
        name,
        cache,
        validateAsync,
        asyncOptions: options,
    };
}

exports.required        = simple("required"         , required);
exports.colNotEmpty     = simple("col-not-empty"    , colNotEmpty);
exports.textEmailList   = simple("text-email-list"  , textEmailList);
exports.email           = simple("email"            , email);
exports.genericName     = simple("generic-name"     , genericName);
exports.humanName       = simple("human-name"       , humanName);
exports.birthDate       = simple("birth-date"       , birthDate);
exports.dateTimeObject  = simple("date-time-object" , dateTimeObject);
exports.phone           = simple("phone"            , phone);
exports.number          = simple("number"           , number);
exports.positiveNumber  = simple("positiveNumber"   , positiveNumber);

exports.gt          = (numb)     => simple("gt" , gt(numb), {numb});
exports.ge          = (numb)     => simple("ge" , ge(numb), {numb});
exports.le          = (numb)     => simple("le" , le(numb), {numb});
exports.minLength   = (length)   => simple("min-length" , minLength(length), {length});
exports.maxLength   = (length)   => simple("max-length" , maxLength(length), {length});
exports.startsWith  = (str)      => simple("starts-with", startsWith(str), {str});
exports.equals      = (val)      => simple("equals"     , equals(val), {val});

// For custom validations
exports.simple      = simple;
exports.async      = async;