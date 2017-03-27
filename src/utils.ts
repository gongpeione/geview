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