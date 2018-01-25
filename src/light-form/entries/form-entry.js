function createFormEntry({onEntryStateChanged}) {
    let populated = false;
    let populatedData = null;

    let state = {
        stamp: {touched: false, dirty: false, focused: false},
        viewValue: null,
        error: null,
    };
    let renderedInput = null;

    function reset(data) {
        if (populated && populatedData != data) {
            // console.log(`Cleared ${state.viewValue}`);
            populated = false;
            state.viewValue = null;
            state.error = null;
        }
    }

    let bounding;

    return {
        isPopulated: () => populated,
        populate(viewValue, data) {
            state.viewValue = viewValue;
            state.error = null;
            populated = true;
            populatedData = data;
        },
        getStamp: () => state.stamp,
        getViewValue: () => state.viewValue,
        getError: () => state.error,
        setState({viewValue, error, stamp}, mv) {
            if (viewValue !== undefined) {
                state.viewValue = viewValue;
            }
            if (error !== undefined) {
                state.error = error;
            }
            if (stamp !== undefined) {
                Object.assign(state.stamp, stamp);
            }
            if (mv !== undefined) {
                populatedData = mv;
            }

            onEntryStateChanged && onEntryStateChanged();
        },
        reset,
        setBounding(bounding1) {
            bounding = bounding1;
        },
        getBoundingClientRect() {
            if (bounding) {
                return bounding;
            }
            if (renderedInput && renderedInput.getBoundingClientRect) {
                return renderedInput.getBoundingClientRect();
            }
            return null;
        },
        focusInput() {
            if (renderedInput && renderedInput.focus) {
                renderedInput.focus();
                return true;
            }
            return false;
        },
        onReformattedViewValue() {
            setImmediate(() => {
                if (renderedInput && renderedInput.value) {
                    let length = renderedInput.value.length;
                    renderedInput.setSelectionRange(length + 1, length + 1);
                }
            });
        },
        setRenderedInput(renderedInput1) {
            renderedInput = renderedInput1;
            if (renderedInput1 == null && state.error) {
                setImmediate(() => {
                    if (renderedInput == null && state.error) {
                        reset();
                        onEntryStateChanged();
                    }
                });
            }
        },
    };
}

exports.createFormEntry = createFormEntry;