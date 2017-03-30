/**
 * Created by geeku on 28/03/2017.
 */
import {CONST, pathToData, regex} from "./utils";
import {Watcher} from "./Watcher";

const directives = [['bind', ':'], 'model', 'html', 'text', 'class', 'show', 'if', ['on', '@']];
const prefix = 'g-';
const dirHandlers = {
    'bind': function (val) {
        console.log(val);
    }
};

export class Parser {
    private context;
    private _curElement: Element;
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
        const attrs: string[][] = Array.from(el.attributes, attr => [attr.name, attr.nodeValue]);
        this._curElement = el;
        attrs.forEach(attr => {
            const dirRegex = new RegExp('^\w+$', 'i');
            const attrName = attr[0];
            const attrVal = attr[1];
            if (dirRegex.test(attrName)) {
                return;
            }

            directives.forEach(dir => {
                let dirRegex;
                if (Array.isArray(dir)) {
                    dirRegex = new RegExp(`(?:${prefix + dir[0]})?(${dir[1]})(\\w+)`, 'i');
                } else {
                    dirRegex = new RegExp(`(${prefix + dir})`, 'i');
                }
                // console.log(dirRegex);
                if (!dirRegex.test(attrName)) {
                    return;
                }

                this.processDir(el, attrName, RegExp.$1, RegExp.$2, attrVal); //$1: directive name; $2: native value name, if have
            })
        })
    }

    processDir (el, attrName, dir, dirVal, val) {
        // console.log(dir, dirVal);
        const args = [el, attrName, dirVal, val];
        dir === ':' && (dir = 'bind');
        dir === '@' && (dir = 'on');
        dir.split('-').length > 1 && (dir = dir.split('-')[1]);

        el.removeAttribute(attrName);
        const methodName = 'dir' + (dir[0].toUpperCase() + dir.slice(1));
        this[methodName](el, dirVal, val);
    }

    dirBind (el, dirVal, val) {
        el.setAttribute(dirVal, pathToData(this.context, val));
        new Watcher(this.context, val, (oldVal, newVal) => {
            el.setAttribute(dirVal, newVal);
        });
    }

    dirModel (el: HTMLInputElement, dirVal, val) {
        this.dirBind(el, 'value', val);
        el.addEventListener('keyup', e => {
            pathToData(this.context, val, el.value);
        });
    }

    dirOn (el: Element, dirVal, val) {
        el.addEventListener(dirVal, this.context.$methods[val]);
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

