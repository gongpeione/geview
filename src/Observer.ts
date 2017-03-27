/**
 * Created by geeku on 27/03/2017.
 */
import {defProp, isObject, warn} from "./utils";

export class Observer {
    public data;
    constructor (data) {
        if (!isObject(data)) {
            warn('Observed data must be an object');
            return;
        }
        defProp(data, '__ob__', {
            enumerable: false,
            configurable: true,
            get: function () {
                return this;
            }
        });
        Observer.traverse(data);
    }
    static traverse (data) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            initPorperty(data, key, data[key]);
        });
    }
}

export function initPorperty (obj, key, val) {
    if (isObject(val)) {
        new Observer(val);
    }
    defProp(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (isObject(newVal)) {
                new Observer(newVal);
            }
            val = newVal;
        }
    });
}