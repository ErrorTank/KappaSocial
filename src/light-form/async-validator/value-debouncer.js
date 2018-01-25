function createValueDebouncer(delay, promiseFn) {
    let activeValue = undefined;
    let clearDelay;

    return {
        status() {
            return activeValue === undefined ? "inactive" : clearDelay ? "delay" : "running";
        },
        submit(value, v2) {
            if (activeValue !== value) {
                clearDelay && clearDelay();
                activeValue = value;

                let delayTimeout = setTimeout(() => {
                    clearDelay = null;

                    let checkingValue = activeValue;
                    let isStillValid = () => activeValue === checkingValue;
                    let invalidate = () => activeValue = undefined;

                    promiseFn(checkingValue, isStillValid, invalidate, v2).then(() => {
                        activeValue = undefined;
                    });

                }, delay);
                clearDelay = () => clearTimeout(delayTimeout);
            }
        }
    };
}

exports.createValueDebouncer = createValueDebouncer;