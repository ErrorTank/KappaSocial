var createValueDebouncer = require("./value-debouncer.js").createValueDebouncer;
const AsyncValidator = {
    createAsyncValidator(name, asyncValidate, options, cache, onChanged) {

        let valueDebouncer = createValueDebouncer(options.delay, (value, isActive, invalidate, getRelativeData) => {

            onChanged();

            return asyncValidate(value, getRelativeData).then((ok) => {
                cache[value] = ok;

                if (isActive()) {
                    invalidate();
                    onChanged();
                }
            });
        });

        return {
            name,
            validate: (value, getRelativeData) => {
                if (cache.hasOwnProperty(value)) {
                    return cache[value];
                }

                valueDebouncer.submit(value, getRelativeData);

                return false;
            },
            getAsyncDataStatus() {
                return valueDebouncer.status();
            },
        }
    }
};

exports.AsyncValidator = AsyncValidator;