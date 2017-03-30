import {pathToData} from "./utils";
/**
 * Created by geeku on 28/03/2017.
 */
export let WatcherTarget = null;
export class Watcher {
    public vm;
    public exp: string;
    public callback;
    constructor (vm, exp, callback, options?) {
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;

        WatcherTarget = this;
        this._get(this.exp);
        WatcherTarget = null;
        // if (!options.lazy) {
        //
        // }
    }

    _get (exp) {
        return pathToData(this.vm, exp);
    }

    update (oldVal, newVal) {
        this.callback(oldVal, newVal);
    }
}