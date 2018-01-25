const {childrenDataLevel} = require("../children-hier-data-level.js");
const {KeyedHierDataUtil} = require("../../utils/keyed-hier-data-util/keyed-hier-data-util.js");
const {O} = require("../../utils/object-util");

function getNodeDataError(pathNode) {
    return pathNode && pathNode.validators && pathNode.validators.find(
            (validator) =>
                (validator.condition == null || validator.condition()) &&
                !validator.validate()
    );
}
function getNodeEntryError(pathNode) {
    return pathNode && O.findKeep(pathNode.entries, (entry) => entry.getError() && ({entry, error: entry.getError()}));
}
function getEntryBoundingRecUp(node) {

    for (;;) {
        let entry = O.single(node.entries);
        if (entry != null) {
            let boundingClientRect = entry.getBoundingClientRect();
            if (boundingClientRect) {
                return boundingClientRect;
            }
        }

        let parentNode = node.getParentNode();
        if (parentNode == null) {
            return null;
        }

        node = parentNode;

    }
}
function createFormView(formNode, flush) {
    // console.log(formNode);
    let getNode = function (aPath) {
        return KeyedHierDataUtil.getPath(aPath, formNode, () => childrenDataLevel);
    };
    let getNodeF = function (aPath) {
        let node = getNode(aPath);
        if (node == null) {
            KeyedHierDataUtil.mutatePath(
                aPath,
                formNode,
                (currentNode) => {
                    node = currentNode;
                },
                () => childrenDataLevel,
                (parent, key) => parent.createChildNode(key)
            );
        }
        return node;
    };

    function getEntry(pathWithFace) {
        let [path, face] = (pathWithFace == "@" ? "" : pathWithFace).split("!");
        let aPath = O.pathToAp(path);
        let pathNode = getNodeF(aPath);
        let entry = pathNode.getEntry(face);
        return {node: pathNode, entry};
    }

    function findError(fn) {
        return KeyedHierDataUtil.scan(formNode, childrenDataLevel, (node, pathArr) => {
            let nodeDataError = getNodeDataError(node);
            let nodeEntryError = getNodeEntryError(node);
            if (nodeDataError || nodeEntryError) {
                let found = fn(pathArr, nodeDataError, nodeEntryError, node);
                if (found) {
                    return {found};
                }
            }
        });
    }
    function isValid() {
        return !findError((pathArr, dataError, entryError) => {
            return dataError || entryError;
        });
    }

    return {
        _getNode: (pathStr) => getNode(O.pathToAp(pathStr)),
        getData() {
            return formNode.getData();
        },
        submitData(newData) {
            formNode.setData(newData);
            return flush && flush();
        },
        updateData(changes) {
            formNode.setData(O.update(formNode.getData(), changes));
            return flush && flush();
        },
        getInvalidPaths() {
            let paths = [];
            findError((pathArr, dataError, entryError) => {
                if (dataError || entryError) {
                    paths.push(O.joinPaths(...pathArr));
                }
            });
            return paths;
        },
        isValid,
        isInvalid() {
            return !isValid();
        },
        getPathDataError(pathWithFace) {
            pathWithFace = pathWithFace == "@" ? "" : pathWithFace;
            let [path] = pathWithFace.split("!");
            let aPath = O.pathToAp(path);
            let pathNode = getNode(aPath);
            return pathNode && getNodeDataError(pathNode);
        },
        getPathData(pathStr) {
            return O.get(formNode.getData(), pathStr);
        },
        submitPathData(pathStr, newData) {
            let aPath = O.pathToAp(pathStr);
            let pathNode = getNodeF(aPath);

            pathNode.setData(newData);

            return flush && flush();
        },
        changePathData(pathStr, fn) {
            let aPath = O.pathToAp(pathStr);
            let pathNode = getNodeF(aPath);

            pathNode.setData(fn(pathNode.getData()));

            return flush && flush();
        },
        getPathEntryError(pathWithFace) {
            return getEntry(pathWithFace).entry.getError();
        },
        subForm(path) {
            return createFormView(getNodeF(O.pathToAp(path)), flush);
        },
        toFormList(path) {
            let pathNode = getNodeF(O.pathToAp(path == "@" ? "" : path));
            let childrenNodes = pathNode && pathNode.children;
            return childrenNodes == null ? [] : childrenNodes.map((childNode) => createFormView(childNode, flush));
        },
        getEntry,
        focusInvalidField() {
            findError((pathArr, nodeDataError, nodeEntryError, node) => {
                if (nodeEntryError && nodeEntryError.entry.focusInput()) {
                    return true;
                }
                if (nodeDataError == null) {
                    return;
                }
                let entry = O.single(node.entries);
                if (entry == null) {
                    return false;
                }

                return entry.focusInput();
            });
        },
        getInvalidFieldBoundingRect() {
            return findError((pathArr, nodeDataError, nodeEntryError, node) => {
                if (nodeEntryError && nodeEntryError.entry.getBoundingClientRect()) {
                    return nodeEntryError.entry.getBoundingClientRect();
                }
                if (nodeDataError == null) {
                    return;
                }

                return getEntryBoundingRecUp(node);

            });
        }
    };
}


const FormView = {
    createFormView,
};

exports.FormView = FormView;
