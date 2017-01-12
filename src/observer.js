function defineReactive(data, key, val) {
    observe(val);

    const dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: () => {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: newVal => {
            console.log('value changed', val, newVal);
            val = newVal;

            dep.notify();
        }
    });
}

export function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}