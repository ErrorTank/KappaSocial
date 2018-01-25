var bindCom = require("../../light-form-react/bind-com.js").bindCom;
var {simple, required, async} = require("../../light-form/validates.js");

const asyncValidate = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name == "qq");
        }, 1000);
    });
};

let validation = {
    paths: {
        name: [required, async("name-async", asyncValidate)],
    },
};
let form = bindCom(validation, {
    flush: () => console.log("flush"),
    data: { name: "qq"},
});


console.log(form.isValid());

setTimeout(() => {
    console.log(form.isValid());
}, 1600);

