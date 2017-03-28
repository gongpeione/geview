///<reference path="ComManager.ts"/>
/**
 * Created by geeku on 27/03/2017.
 */
import {defProp, emptyFun, merge, proxy, randomString, toElement, warn} from "./utils";
import {GeviewOptions} from "./interface";
import {Observer} from "./Observer";
import {ComManager} from "./ComManager";
import {compiler} from "./Compiler";

const defaultOptions = {
    _isComponent: false,
    data: {}
};
const comManager = new ComManager();
class Geview {
    public el: Element;
    public $options: GeviewOptions;
    public $data: any;
    public name: string;
    public _isComponent: boolean;
    constructor (options: GeviewOptions) {
        if (!(this instanceof Geview)) {
            return new Geview(options);
        }

        this._init(options);
    }

    _init (options) {
        this.$options = merge(options, defaultOptions);

        const el = this.$options.el;
        const isComponent = this.$options._isComponent;
        if (el && !isComponent) {
            this.el = toElement(el);
        }

        if (this.$options.name) {
            this.name = this.$options.name
        }

        if (isComponent) {
            this._isComponent = true;
        }

        // observe data
        new Observer(this.$options.data);
        // proxy data to Geview's instance
        proxy(this, this.$options.data);

        const computed = this.$options.computed;
        if (computed) {
            const keys = Object.keys(computed);
            keys.forEach(key => {
                const computedFun = computed[key].bind(this);
                defProp(this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        return computedFun();
                    },
                    set: emptyFun
                })
            });
        }

        !this._isComponent && compiler(this.el);
    }

    static component (name: string, options: GeviewOptions) {
        name = name ? name : randomString();
        const newCom = new Geview(Object.assign({ _isComponent: true, name: name }, options));
        comManager.addCom(newCom);

        return newCom;
    }
}

export default Geview;