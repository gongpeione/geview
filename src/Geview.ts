/**
 * Created by geeku on 27/03/2017.
 */
import {merge, toElement, warn} from "./utils";
import {GeviewOptions} from "./interface";

const defaultOptions = {
    _isComponent: false,
    data: {}
};
class Geview {
    public el: Element;
    public $options: GeviewOptions;
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
    }

    static component (name: string, options: GeviewOptions) {

    }
}

export default Geview;