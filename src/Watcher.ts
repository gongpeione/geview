/**
 * Created by geeku on 28/03/2017.
 */

export class Watcher {
    public vm;
    public exp: string;
    public callback;
    constructor (vm, exp, callback, options?) {
        this.vm = vm;
        this.exp = exp;
        this.callback = callback;

        this._get(this.exp);
        // if (!options.lazy) {
        //
        // }
    }

    _get (exp) {
        const propChain = exp.split('.');
        try {
            if (propChain.length === 1) {
                return this.vm[propChain[0]];
            }
            return propChain.reduce((x, y) => {
                return this.vm[x][y];
            });
        } catch (e) {
            return '';
        }
    }
}