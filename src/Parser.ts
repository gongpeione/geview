import {CONST, pathToData, regex} from "./utils";
import {Watcher} from "./Watcher";
/**
 * Created by geeku on 28/03/2017.
 */

export class Parser {
    private context;
    constructor (el: Element, context) {
        this.context = context;
        if (!(this instanceof Parser)) {
            return new Parser(el, context);
        }
        const fragment = document.createDocumentFragment();
        let child;
        // console.log(this);
        while (child = el.firstChild) {
            this.parseNode(child);
            fragment.appendChild(child);
        }
        el.appendChild(fragment);
    }

    parseNode (node: Element) {
        const tag = node.tagName;
        // console.log(node);
        if (false/*context.comManager.hasCom(tag)*/) {
            // TODO
        } else {
            switch (node.nodeType) {
                case CONST.NODE_TYPE.element: this.parseElement(node); break;
                case CONST.NODE_TYPE.text: this.parseText(node); break;
            }
            node.childNodes && Array.from(node.childNodes, this.parseNode.bind(this));
        }
    }

    parseElement (el: Element) {
        const attrs = Array.from(el.attributes);
        // console.log(attrs);
    }

    parseText (node) {
        const txt = node.textContent;
        const txtReg = regex.text;
        if (!txtReg.test(txt)) {
            return;
        }
        // '{{ content }} {{ content2 }}' =>  [['content', '{{ content }}'], ['content2', '{{ content2 }}']]
        const exps = txt.match(new RegExp(txtReg, 'g')).map(match => [match.replace(/[{}]/g, '').trim(), match]);

        const ctx = this.context;
        exps.forEach(exp => {
            // first time replace content
            node.textContent = node.textContent.replace(exp[1], pathToData(ctx, exp[0]));
            new Watcher(ctx, exp[0], (oldVal, newVal) => {
                node.textContent = node.textContent.replace(oldVal, newVal);
            });
        })
    }
}