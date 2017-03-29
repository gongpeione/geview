import {CONST, regex} from "./utils";
import {Watcher} from "./Watcher";
/**
 * Created by geeku on 28/03/2017.
 */

export function parser (el: Element, context) {
    const fragment = document.createDocumentFragment();
    let child;
    console.log(this);
    while (child = el.firstChild) {
        parseNode(child, context);
        fragment.appendChild(child);
    }
}

export function parseNode (node: Element, context) {
    const tag = node.tagName;
    console.log(node);
    if (false/*context.comManager.hasCom(tag)*/) {
        // TODO
    } else {
        switch (node.nodeType) {
            case CONST.NODE_TYPE.element: parseElement(node); break;
            case CONST.NODE_TYPE.text: parseText(node); break;
        }
        node.childNodes && Array.from(node.childNodes, parseNode);
    }
}

function parseElement (el: Element) {
    const attrs = Array.from(el.attributes);
    console.log(attrs);
}

function parseText (node) {
    const txt = node.textContent;
    const txtReg = regex.text;
    if (!txtReg.test(txt)) {
        return;
    }
    const exps: [string] = txt.match(new RegExp(txtReg, 'g')).map(match => match.replace(/[{}]/g, '').trim());

    console.log(exps);
    exps.forEach(exp => {
        new Watcher(this, exp, (oldVal, newVal) => {
            node.textContent = node.textContent.replace(oldVal, newVal);
        });
    })
}