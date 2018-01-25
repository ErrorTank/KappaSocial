const {createFormEntry} = require("../entries/form-entry.js");
const {childrenDataLevel} = require("../children-hier-data-level.js");
const {KeyedHierDataUtil} = require("../../utils/keyed-hier-data-util/keyed-hier-data-util.js");
const {O} = require("../../utils/object-util");

function createNode({getData, getParentData, getParentNode, onDataChanged, onDataValidityChanged, onEntryStateChanged}) {
    let node = null;

    function clearEntriesErrors() {
        O.forEach(node.entries, (entry) => {
            entry.reset(node.getData());
        });
    }

    function resetAll() {
        // reset all sub tree
        KeyedHierDataUtil.mutateAll(
            node,
            (node) => node.reset(),
            () => childrenDataLevel
        );
    }

    return node = {
        getData,
        getParentData,
        getParentNode: getParentNode || (() => null),
        setData(newData) {
            onDataChanged(newData);
            resetAll();
        },
        createChildNode(key) { // Use when traverse deeper (form view, form tree)
            return createNode({
                getData: () => O.get(getData(), key),
                getParentData: (level) => level == 1 ? getData() : getParentData(level-1),
                getParentNode: () => node,
                onDataChanged: (newChildData) => {
                    let newData = O.update(getData(), {[key]: newChildData});
                    onDataChanged(newData);

                    clearEntriesErrors();
                },
                onDataValidityChanged, onEntryStateChanged,
            });
        },
        reset: clearEntriesErrors, // Use by parent node
        resetAll, // Used when init form tree
        getEntry(face) { // Used in form view
            if (node.entries == null) {
                node.entries = {};
            }

            let entry = node.entries[face];
            if (entry === undefined) {
                entry = createFormEntry({onEntryStateChanged});
                node.entries[face] = entry;
            }

            return entry;
        }
    };
}


const FormNode = {
    createNode,
};

exports.FormNode = FormNode;
