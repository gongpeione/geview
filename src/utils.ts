/**
 * Created by geeku on 27/03/2017.
 */
export function warn (msg) {
    console.warn('[Geview]: ' + msg);
}

export function toElement (el: string | Element): Element {
    return typeof el === 'string' ? document.querySelector(el) : el;
}

export function isObject (obj): boolean {
    return obj !== null && typeof obj === 'object'
}

export function merge (options, defaultOptions): Object {
    const keys: Array<string> = Object.keys(options).concat(Object.keys(defaultOptions));
    const keyLength = keys.length;

    for (let i = 0; i < keyLength; i++) {
        const key = keys[i];
        let defaultCur = defaultOptions[key];
        let optionsCur = options[key];

        if (defaultCur === optionsCur) {
            continue;
        }

        if (!optionsCur) {
            options[key] = isObject(defaultCur) ? Object.create(defaultCur) : defaultCur;
        } else if (isObject(defaultCur) && isObject(optionsCur)) {
            merge(optionsCur, defaultCur);
        }
    }

    return options;
}

export function proxy (target, source) {
    const keys = Object.keys(source);
    keys.forEach(key => {
        let targetKey = key;
        if (target.hasOwnProperty(key)) {
            targetKey += '_var';
        }
        defProp(target, targetKey, {
            get: function () {
                return source[key];
            },
            set: function (newVal) {
                source[key] = newVal;
            }
        })
    });
}

export function emptyFun (): void {}

interface descriptor {
    enumerable?: boolean,
    configurable?: boolean,
    get?: any,
    set?: any
}
export function defProp (obj, key: string, descriptor: descriptor) {
    const getter = descriptor.get || emptyFun();
    const setter = descriptor.set || emptyFun();
    const enume = descriptor.enumerable;
    const config = descriptor.configurable;
    Object.defineProperty(obj, key, {
        enumerable: enume === undefined ? true : !!enume,
        configurable: config === undefined ? true : !!config,
        get: getter,
        set: setter
    })
}

export function randomString (length = 5) {
    const charList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charListLength = charList.length;
    return Array.from(new Array(length)).map(_ => charList[~~(Math.random() * charListLength)]).join('');
}