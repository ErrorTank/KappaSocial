const inputPropsMod = ({onChange, value, ...otherProps}) => ({
    ... otherProps,
    value: value == null ? "" : value,
    onChange: (e) => {
        return onChange(e.target.value);
    },
});

exports.inputPropsMod = inputPropsMod;