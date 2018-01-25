// deprecated, use lf-err-msg instead
let errorMessages = {
    "required"      : (name) => `${name} is required`,
    "col-not-empty" : (name) => `${name} can not be empty`,
    "human-name": (name) => `Invalid character`,
    "phone": (name) => `Invalid phone number`,
    "zip-code": (name) => `Zip is not correct`,
    "cc-number": (name) => `Card number is not correct`,
    "cc-exp": (name) => `Expiration date is not correct`,
    "cc-cvv": (name) => `CVV is not correct`,
};

function translate(errorCode, name) {
    let messageF = errorMessages[errorCode];
    if (messageF == null) {
        return `${name}: error [${errorCode}]`;
    }

    return messageF(name);
}

const ErrorMessages = {
    translate,
};

exports.ErrorMessages = ErrorMessages;