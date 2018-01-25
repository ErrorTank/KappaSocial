const {O} = require("../utils/object-util");
const {Cols} = require("../utils/cols");

function toArray(children) {
    let ret = [];
    ret.length = children.length;
    children.forEach((child) => ret[child.key] = child.data);
    return ret;
}

const childrenDataLevel = {
    // TODO this is inefficient for stress use
    getChildren: (data) => O.mapValuesToList(data.children, (data, key) => ({data, key})),
    addChild: (newChild, data) => {
        data.children = data.children || {};
        data.children[newChild.key] = newChild.data;
    },
    reconstruct: (children, oldData) => Object.assign({}, oldData, {
        children: (
            Array.isArray(oldData.children) ? (
                toArray(children)
            ) : (
                Cols.mapToMap(children, ({key, data}) => ({key, value: data}))
            )
        )
    }),
};

exports.childrenDataLevel = childrenDataLevel;