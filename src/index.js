import { NODE_TYPE, DIRECTIVES } from './var';

const vm = {
    data: {
        test: 'test',
        test2: 'test2',
        content: 'content'
    }
};

vm.data.test = 'notest';
vm.data.test2 = 'hhh';

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
}

function defineReactive(data, key, val) {
    observe(val);

    const dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: () => {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: newVal => {
            console.log('value changed', val, newVal);
            val = newVal;

            dep.notify();
        }
    });
}

class Dep {
    constructor () {
        this.subs = [];
        this.target = null;
    }

    addSub (sub) {
        console.log('sub:', this.subs);
        this.subs.push(sub);
    }

    notify () {
        console.log('notify');
        this.subs.forEach(sub => {
            console.log(sub);
            sub.update();
        });
    }
}
Dep.target = null;

class Watcher {
    constructor (vm, node, name) {
        Dep.target = this;
        // console.log(Dep.target);
        this.vm = vm;
        this.node = node;
        this.name = name;
        this.update();
        Dep.target = null;
    }

    update () {
        this.get();
        this.node.nodeValue ? 
            this.node.nodeValue = this.value : 
            this.node.value = this.value;
    }

    get () {
        // console.log('vm', this.vm);
        this.value = this.vm.data[this.name];
    }
}

function compile (node, vm) {
    const regMoustache = /\{\{(.*?)\}\}/;
    const regDirectives = /g-([\s\S]+)/;
    const nodeType = node.nodeType;
    // console.log(nodeType);
    if (nodeType == NODE_TYPE.element) {
        // console.log(node);
        const attrs = node.attributes;

        Array.from(attrs, attr => {
            const nodeName = attr.nodeName;

            if (!regDirectives.test(nodeName)) {
                return;
            }

            const directives = RegExp.$1;

            if (directives === 'bind') {
                const name = attr.nodeValue;
                node.value = vm.data[name];
                node.removeAttribute(nodeName);

                node.addEventListener('input', e => {
                    vm.data[name] = e.target.value;

                    console.log(vm);
                });

                new Watcher(vm, node, name);
            }
        });
        
    }

    if (nodeType == NODE_TYPE.text) {
        // console.log(node);
        if (!regMoustache.test(node.nodeValue)) {
            return;
        }

        const name = (RegExp.$1).trim();
        // node.nodeValue = vm.data[name];

        new Watcher(vm, node, name);
    }
}

function node2fragment (node) {
    const fragment = document.createDocumentFragment();
    let child;

    while (child = node.firstChild) {
        compile(child, vm);
        fragment.append(child);
    }

    return fragment;
}

observe(vm);
const wrap = document.querySelector('.wrap');
const node = node2fragment(wrap);
console.log(node);
wrap.appendChild(node);

document.querySelector('input[value=change]').addEventListener('click', () => {
    vm.data.content = 'change';
});