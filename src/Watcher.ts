import {pathToData} from "./utils";
/**
 * Created by geeku on 28/03/2017.
 */
export let WatcherTarget = null;
export class Watcher {
    public vm;
    public exp: string;
    public callback;
    public value;
    private _isFunc;
    private _computedValCache;
    constructor (vm, exp, callback, options?) {
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;

        WatcherTarget = this;
        this.value = this._get(this.exp);
        if (typeof this.value === 'function') {
            this._computedValCache = this.value();
            this._isFunc = true;
        }
        WatcherTarget = null;
        // if (!options.lazy) {
        //
        // }
    }

    _get (exp) {
        return pathToData(this.vm, exp);
    }

    update (oldVal, newVal) {
        if (this._isFunc) {
            newVal = this.value();
            this.callback(this._computedValCache, newVal);
            this._computedValCache = newVal;
        } else {
            this.callback(oldVal, newVal);
        }
    }
}