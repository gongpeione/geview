import {isObject, warn} from "./utils";
/**
 * Created by geeku on 27/03/2017.
 */

export class Observer {
    public data;
    constructor (data) {
        if (!isObject(data)) {
            warn('Observed data must be an object');
            return;
        }
        this.data = data;
        this.data.__ob__ = this;
    }
    traverse () {

    }
}

export function initPorperty (obj, key, val) {

}