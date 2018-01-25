const classnames = require("classnames");
const {match} = require("../../dom-mod/match");

let errorMessages = {
    "required": (name) => `${name} is required`,
    "col-not-empty" : (name) => `${name} can not be empty`,
    "email": (name) => `${name} is not in correct email format`,
    "human-name": (name) => `Invalid character in name`,
    "min-length": (name, validator) => `${name} needs to have at least ${validator.length} characters`,
    "phone": (name) => `Invalid phone number`,
};

const createLfErrMsg = (form) => {
    return match("[lf-err-msg]", (props) => {

        let path = props["lf-path"];
        let name = props["lf-err-msg"];

        let pathDataError = form.getPathDataError(path);
        // let pathEntryError = form.getPathEntryError(path);

        if (pathDataError == null) {
            return ({
                deleteNode: true,
            });
        } else {
            let validator = pathDataError;
            let errorMessageFn = errorMessages[validator.name];

            let displayName = name !== true ? name : path;
            if (validator.getAsyncDataStatus != null && validator.getAsyncDataStatus() != "inactive") {
                // let asyncDataStatus = validator.getAsyncDataStatus();
                return ({
                    deleteNode: true,
                    // setChildren: asyncDataStatus == "delay" ? "Typing..." : `Checking ${displayName}`,
                });
            }
            return ({
                setChildren: errorMessageFn ? errorMessageFn(displayName, validator) : `Invalid ${validator.name}`,
            });
        }
    });
};
exports.createLfErrMsg = createLfErrMsg;
