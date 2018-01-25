var ValidationGroups = require("./validation-groups.js").ValidationGroups;
const {FormNode} = require("./form-node.js");
const {AsyncValidator} = require("../async-validator/async-validator.js");
const {Fs} = require("../../utils/fs");
const {childrenDataLevel} = require("../children-hier-data-level.js");
const {KeyedHierDataUtil} = require("../../utils/keyed-hier-data-util/keyed-hier-data-util.js");
const {O} = require("../../utils/object-util");

function addIterNode(iterValidationSchema, path, rootNode, onDataValidityChanged) {
    let pathArr = path == "@" ? [] : O.pathToAp(path);

    KeyedHierDataUtil.mutatePath(
        pathArr,
        rootNode,
        (node) => {
            let oldCreateChildNode = node.createChildNode;

            function createChildNode(index) {
                let childNode = oldCreateChildNode(index);

                initTree(iterValidationSchema, childNode, onDataValidityChanged);

                return childNode;
            }

            let oldReset = node.reset;
            function reset() {
                oldReset();
                let listData = node.getData();
                let length = listData == null ? 0 : listData.length;
                for (; node.children.length < length;) {
                    node.children.push(createChildNode(node.children.length));
                }
                node.children.length = length;
            }

            Object.assign(node, {
                children: [],
                createChildNode,
                reset,
            });
        },
        () => childrenDataLevel,
        (parent, key) => parent.createChildNode(key)
    );
}

function mapCondition(validator, condition, getData, getParentData) {
    return condition == null ? validator : Object.assign({}, validator, {
        condition: () => condition(getData(), getParentData),
    });
}
function mapValidate(validator, getData, pathArr) {
    return Object.assign({}, validator, {
        validate: validator.validate && (() => validator.validate(O.getAP(getData(), pathArr), (path) => path=="^" ? getData(1) : path=="^^" ? getData(2) : O.get(getData(), path))),
    });
}
function mapAsync(validator, onDataValidityChanged) {
    return validator.validateAsync == null ?
        validator :
        AsyncValidator.createAsyncValidator(validator.name, validator.validateAsync, validator.asyncOptions, validator.cache, onDataValidityChanged)
        ;
}
function addVGroup(group, node, onDataValidityChanged) {

    const mapValidator = (pathArr) => Fs.chain([
        (_) => onDataValidityChanged == null ? _ : mapAsync(_, onDataValidityChanged),
        (_) => mapValidate(_, (parentLevel) => O.get(parentLevel == 0 || parentLevel==null ? node.getData() : node.getParentData(parentLevel), group.relative), pathArr),
        (_) => mapCondition(_, group.condition, node.getData, node.getParentData)
    ]);

    O.forEach(group.paths, (validatorList, path) => {
        let relPathArr = path == "@" ? [] : O.pathToAp(path);
        let absPathArr = O.pathToAp(group.relative).concat(relPathArr);

        KeyedHierDataUtil.mutatePath(
            absPathArr,
            node,
            (currentData) => {
                Object.assign(currentData, {
                    validators: (currentData.validators || []).concat(validatorList.map(mapValidator(relPathArr))),
                });
            },
            () => childrenDataLevel,
            (parent, key) => parent.createChildNode(key)
        );
    });
}

let initTree = function (validationSchema, node, onDataValidityChanged) {
    validationSchema = ValidationGroups.parseValidationSchema(validationSchema);

    // Add iter nodes
    if (validationSchema.iterates) {
        O.forEach(validationSchema.iterates, (iterValidationSchema, path) => {
            addIterNode(iterValidationSchema, path, node, onDataValidityChanged);
        });
    }

    // Add group nodes
    validationSchema.groups.forEach(
        (group) => addVGroup(group, node, onDataValidityChanged)
    );

    // Sync
    node.resetAll();
};

function createTree({validationSchema, getData, onDataChanged, onDataValidityChanged, onEntryStateChanged}) {

    let node = FormNode.createNode({
        getData,
        getParentData: () => null,
        onDataChanged,
        onDataValidityChanged, onEntryStateChanged
    });

    initTree(validationSchema, node, onDataValidityChanged);

    return node;
}


const FormTree = {
    createTree,
};

exports.FormTree = FormTree;