const {bindCom} = require("../light-form-react/bind-com.js");
const {orgIntegrationsLf} = require("../../../manage/js/main-routes/admin-routes/organization/form/integrations/org-integrations-lf.js");
const {required, email, textEmailList, simple} = require("./validates");

// let form = bindCom(orgIntegrationsLf, {
//     flush: () => console.log("flush"),
//     data: {},
// });
//
// console.log(form.getErrors());

// let loginForm = bindCom({
//     paths: {
//         // "aa.email": [required, email],
//         "password": [required],
//     }
// }, {
//     flush: () => console.log("flush"),
//     data: {
//         aa: {email: "qq"},
//         // password: "dwa",
//     },
// });

// console.log(loginForm._getNode("aa"));
// console.log(loginForm._getNode("aa.email"));
// console.log(loginForm._getNode("aa.email").getData());
// console.log(loginForm._getNode("password").getData());
// console.log(loginForm._getNode());
// loginForm.getEntry("password")
// loginForm.getEntry("password!hehe")
// console.log(loginForm.getEntry("password"));
// console.log(loginForm._getNode().children.password);
// console.log(loginForm.getEntry("password"));
// console.log(loginForm.getPathDataError("password"));
// console.log(loginForm.isValid());

// let questionsForm = bindCom({
//     iterates: {
//         "arr": {paths: {
//             "text": [required],
//             "additional_notification": [textEmailList],
//         }}
//     }
// }, {
//     flush: () => console.log("flush"),
//     data: {
//         arr: [
//             {text: ""}
//         ]
//     },
// });
//
// console.log(questionsForm._getNode());
// questionsForm.submitData([{},{}]);
// questionsForm.submitData([]);
// console.log(questionsForm._getNode());
// console.log(questionsForm.isValid());

let conditionForm = bindCom({
    paths: {
        name: [required],
    },
    groups: [
        {
            condition: (data) => data.name != "nopass",
            paths: {
                password: [required],
                "aa.confirm": [required, simple("confirm-password", (confirm, getRelativeData) => confirm == getRelativeData("password"))]
            }
        }
    ]
}, {
    flush: () => console.log("flush"),
    data: {
        // name: "nopass",
        name: "he he",
        password: "he he",
        confirm: "he hae",
    },
});

console.log(conditionForm.isValid());
console.log(conditionForm.getInvalidPaths());

// console.log(questionsForm._getNode());
// questionsForm.submitData([{},{}]);
// questionsForm.submitData([]);
// console.log(questionsForm._getNode());
// console.log(questionsForm.isValid());
