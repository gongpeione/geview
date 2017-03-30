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

const key = {
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39,
    "BACKSPACE": 8,
    "TAB": 9,
    "ENTER": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "SPACE": 32,
    "DELETE": 46,
    "a": 97,
    "b": 98,
    "c": 99,
    "d": 100,
    "e": 101,
    "f": 102,
    "g": 103,
    "h": 104,
    "i": 105,
    "j": 106,
    "k": 107,
    "l": 108,
    "m": 109,
    "n": 110,
    "o": 111,
    "p": 112,
    "q": 113,
    "r": 114,
    "s": 115,
    "t": 116,
    "u": 117,
    "v": 118,
    "w": 119,
    "x": 120,
    "y": 121,
    "z": 122,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123
};
// Array.from(letters, letter => {
//     key[letter] = letter.charCodeAt(0);
// });
// Array(12).fill().forEach((val, index) => {
//     key['F' + (index + 1)] = F1_KEYCODE + index;
// });
export const CONST = {
    USE_CAPTURE: {
        BUBBLING: false,
        CAPTURE: true
    },
    KEY_CODE: key,
    NODE_TYPE: {
        element: 1,
        text: 3,
        comment: 8
    }
};

export const regex = {
    text: /{{\s*(.*?)\s*}}/
}

export function pathToData (context, path, newVal?) {
    const propChain: string[] = path.split('.');
    const isSet = newVal !== undefined;
    try {
        if (propChain.length === 1) {
            if (isSet) {
                context[propChain[0]] = newVal;
                return true;
            }
            return context[propChain[0]];
        }
        if (isSet) {
            let val;
            propChain.forEach((prop, index) => {
                if (index < propChain.length - 1) {
                    val = val[prop];
                } else {
                    val[prop] = newVal;
                }
            })
        }
        return propChain.reduce((x, y) => {
            return context[x][y];
        });
    } catch (e) {
        warn(e);
        return '';
    }
}