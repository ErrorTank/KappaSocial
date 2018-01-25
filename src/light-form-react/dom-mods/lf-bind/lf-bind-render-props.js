const {Cols} = require("../../../utils/cols");

function reformat(vv, tunnel) {
    if (Cols.isEmpty(tunnel) ||
        tunnel[0].reformat === undefined
    ) {
        return vv;
    }

    return tunnel[0].reformat(vv);
}

function parseViewValue(vv, tunnel, getData) {
    let mv = vv;
    if (tunnel == null) {
        return {success: true, mv};
    }
    for (let i = 0; i < tunnel.length; i++) {
        let {parse, name} = tunnel[i];

        if (parse) {
            try {
                mv = parse(mv, getData);
            } catch (errorMessage) {
                return {success: false, error: {tunnelName: name, errorMessage}};
            }
        }
    }
    return {success: true, mv};
}


function formatModelValue(mv, tunnel) {
    let vv = mv;

    if (tunnel == null) {
        return vv;
    }

    for (let i = tunnel.length - 1; i > -1; i--) {
        let {format} = tunnel[i];

        if (format) {
            vv = format(vv);
        }
    }

    return vv;
}

function formatData(mv, tunnel) {
    return reformat(formatModelValue(mv, tunnel), tunnel);
}

function getRenderProps(formEntry, renderComponentProps, getData, setData) {

    let viewValue = (()=> {
        let tunnel = renderComponentProps["lf-tunnel"];
        if (!formEntry.isPopulated()) {
            let data = getData();
            formEntry.populate(formatData(data, tunnel), data);
        }
        return formEntry.getViewValue();
    })();

    function submitViewValue(viewValue) {

        let tunnel = renderComponentProps["lf-tunnel"];

        let submit = {
            viewValue,
            stamp: {dirty: true},
        };

        let {success, error, mv} = parseViewValue(viewValue, tunnel, getData);

        if (success) {
            formEntry.setState({
                ... submit,
                error: null,
            }, mv);
            setData(mv);
        } else {
            formEntry.setState({
                ... submit,
                error: {
                    tunnel: error.tunnelName,
                    message: error.errorMessage,
                },
            });
        }
    }

    let checkReformat = function (viewValue) {
        let tunnel = renderComponentProps["lf-tunnel"];

        let reformattedViewValue = reformat(viewValue, tunnel);
        if (reformattedViewValue !== viewValue) {
            viewValue = reformattedViewValue;

            formEntry.onReformattedViewValue();
        }
        return viewValue;
    };

    let changePackage = renderComponentProps["lf-submit-on"] == "blur" ? ({
        onChange: (viewValue) => {
            formEntry.setState({viewValue: checkReformat(viewValue)});
        },
        onBlur: () => {
            formEntry.setState({
                stamp: {focused: false},
            });

            submitViewValue(viewValue);
        },
    }) : ({
        onChange: (viewValue) => {
            submitViewValue(checkReformat(viewValue));
        },
        onBlur: () => {
            formEntry.setState({
                stamp: {
                    ... formEntry.getStamp(),
                    focused: false
                },
            });
        },
    });

    return {
        ...changePackage,
        value: viewValue,
        ref: (renderedInput) => formEntry.setRenderedInput(renderedInput),
        onFocus: () => {

            formEntry.setState({
                stamp: {
                    ... formEntry.getStamp(),
                    touched: true,
                    focused: true,
                },
            });
        },
    };
}

exports.getRenderProps = getRenderProps;