var LightForm = require("../light-form/light-form.js").LightForm;

function bindCom(validationSchema, {
    flush,
    component,
    data,
    onDataChanged,
}) {

    if (component && !flush) {
        flush = (cb) => component.forceUpdate(cb);
    }

    let flush1 = () => new Promise((resolve, reject) => {
        flush(resolve);
    });

    return LightForm.createLightForm({
        validationSchema,
        data,
        flush: flush1,
        onDataChanged,
        onDataValidityChanged: flush1,
        onEntryStateChanged: flush1,
    });
}

exports.bindCom = bindCom;