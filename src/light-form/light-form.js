var FormTree = require("./form-node/form-tree.js").FormTree;
var FormView = require("./form-view/form-view.js").FormView;

const LightForm = {
    createLightForm({data, validationSchema, flush, onDataChanged, onDataValidityChanged, onEntryStateChanged}) {
        let dataChangeListeners = [onDataChanged];

        let rootFormNode = FormTree.createTree({
            validationSchema,
            getData: () => data,
            onDataChanged: (newData) => {
                data = newData;
                dataChangeListeners.forEach((l) => l&&l(data));
            },
            onDataValidityChanged, onEntryStateChanged
        });

        return Object.assign({}, FormView.createFormView(rootFormNode, flush), {
            addDataChangedListener(listener) {
                dataChangeListeners.push(listener);

                return () => Cols.remove1Mutate(dataChangeListeners, listener);
            }
        });
    },
    validate(data, validationSchema) {
        let rootFormNode = FormTree.createTree({
            validationSchema,
            getData: () => data,
        });

        return FormView.createFormView(rootFormNode).isValid();
    }
};

exports.LightForm = LightForm;
