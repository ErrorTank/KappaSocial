const {O} = require("../../utils/object-util");

const ValidationGroups = {
    parseValidationSchema(validationSchema) {
        if (Array.isArray(validationSchema)) {
            return {groups: validationSchema};
        } else if (O.isNotEmpty(validationSchema) &&
            !validationSchema.hasOwnProperty("paths") &&
            !validationSchema.hasOwnProperty("iterates") &&
            !validationSchema.hasOwnProperty("groups")
        ) {
            return {groups: [{paths: validationSchema}]};
        } else {
            let groups = [];
            if (validationSchema.paths) {
                groups.push({paths: validationSchema.paths});
            }
            if (validationSchema.groups) {
                groups = groups.concat(validationSchema.groups);
            }
            return {groups, iterates: validationSchema.iterates};
        }
    }
};

exports.ValidationGroups = ValidationGroups;
