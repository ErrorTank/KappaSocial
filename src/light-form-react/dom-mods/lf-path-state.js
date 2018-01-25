const classnames = require("classnames");
const {match} = require("../../dom-mod/match");

let classes = {
    errorClass: (error) => error ? "lf-invalid" : "lf-valid",
};

const lfPathStateConfig = {
    setErrorClass(cla) {
        classes.errorClass = cla;
    }
};
exports.lfPathStateConfig = lfPathStateConfig;

const createLfPathStateAction = (form) => {
    return match("[lf-path-state]", (props) => {

        let path = props["lf-path-state"];
        if (path === true) {
            path = props["lf-path"];
        }

        let pathDataError  = form.getPathDataError(path);
        let pathEntryError = form.getPathEntryError(path);
        let pathEntryStamp = form.getEntry(path).entry.getStamp();

        return ({
            setProps: {
                className: classnames(
                    props.className,

                    classes.errorClass(pathEntryError || pathDataError),

                    pathDataError && `lf-invalid-${pathDataError.name}`,

                    pathDataError && pathDataError.getAsyncDataStatus && `lf-async-${pathDataError.getAsyncDataStatus()}`,

                    pathEntryError && `lf-invalid-parse lf-invalid-parse-${pathEntryError.tunnel}`,

                    pathEntryStamp.touched ? "lf-touched" : "lf-untouched",
                    pathEntryStamp.dirty ? "lf-dirty" : "lf-pristine",
                    pathEntryStamp.focused ? "lf-focused" : "lf-blurred",
                )
            },
        });
    });
};
exports.createLfPathStateAction = createLfPathStateAction;
