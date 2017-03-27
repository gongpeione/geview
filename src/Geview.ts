/**
 * Created by geeku on 27/03/2017.
 */
import {merge, proxy, toElement, warn} from "./utils";
import {GeviewOptions} from "./interface";
import {Observer} from "./Observer";

const defaultOptions = {
    _isComponent: false,
    data: {}
};
class Geview {
    public el: Element;
    public $options: GeviewOptions;
    public $data: any;
    constructor (options: GeviewOptions) {
        if (!(this instanceof Geview)) {
            return new Geview(options);
            // warn('Please use new Geview(selector)');
        }

        this.$options = merge(options, defaultOptions);

        const el = this.$options.el;
        const isComponent = this.$options._isComponent;
        if (el && !isComponent) {
            this.el = toElement(el);
        }
        new Observer(this.$options.data);

        proxy(this, this.$options.data);
    }

    static component (name: string, options: GeviewOptions) {

    }
}

export default Geview;