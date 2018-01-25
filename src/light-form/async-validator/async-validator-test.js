var AsyncValidator = require("./async-validator.js").AsyncValidator;

const asyncValidate = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name == "qq");
        }, 1000);
    });
};

let validator = AsyncValidator.createAsyncValidator("check-name", asyncValidate, 400, () => { console.log("changed");});

console.log(validator.validate("q"));
console.log(validator.validate("q"));
console.log(validator.validate("qq"));

// setTimeout(() => {
//     console.log(validator.validate("q"));
// }, 600);
setTimeout(() => {
    console.log(validator.validate("qq"));
}, 1600);