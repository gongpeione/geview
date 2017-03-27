/**
 * Created by geeku on 27/03/2017.
 */
import {warn} from "./utils";

class Geview {
    public el: Element;
    constructor (selector: string | Element) {
        if (!(this instanceof Geview)) {
            warn('Please use new Geview(selector)');
        }
        this.el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }
}

export default Geview;