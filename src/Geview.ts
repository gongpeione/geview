///<reference path="ComManager.ts"/>
/**
 * Created by geeku on 27/03/2017.
 */
import {defProp, emptyFun, merge, proxy, randomString, toElement, warn} from "./utils";
import {GeviewOptions} from "./interface";
import {Observer} from "./Observer";
import {ComManager} from "./ComManager";
import {Parser} from "./Parser";
import {Watcher, WatcherTarget} from "./Watcher";
import {Publisher} from "./Publisher";

const defaultOptions = {
    _isComponent: false,
    data: {}
};
const comManager = new ComManager();
let uid = 0;
class Geview {
    public el: Element;
    public $options: GeviewOptions;
    public $data: any;
    public name: string;
    public _isComponent: boolean;
    public _uid: number;
    public $comManager: ComManager;
    public $methods = {};
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
            this.$comManager = comManager;
        }

        if (this.$options.name) {
            this.name = this.$options.name
        }

        if (isComponent) {
            this._isComponent = true;
        }

        this._uid = uid++;
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
                        return computedFun;
                    },
                    set: emptyFun
                });
            });
        }

        const methods = this.$options.methods;
        if (methods) {
            const keys = Object.keys(methods);
            keys.forEach(key => {
                this.$methods[key] = methods[key].bind(this);
            });
        }

        this.el && new Parser(this.el, this);
    }

    static component (name: string, options: GeviewOptions) {
        if (!name) {
            warn('Component name is required');
            return;
        }
        const newCom = new Geview(Object.assign({ _isComponent: true, name: name }, options));
        comManager.addCom(newCom);

        return newCom;
    }
}

export default Geview;