console.log('Start');

const NODE_TYPE = {
    element: 1,
    text: 3,
    comment: 8
};
const DIRECTIVES = [
    'bind'
];

const vm = {
    data: {
        test: 'test',
        test2: 'test2',
        content: 'content'
    }
};

observe(vm.data);

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

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: () => {
            return val;
        },
        set: newVal => {
            console.log('value changed', val, newVal);
            val = newVal;
        }
    });
}

class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach(sub => {
            sub.update();
        });
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

            if (regDirectives.test(nodeName)) {
                // const directives = nodeName.match(regDirectives);
                const directives = RegExp.$1;

                if (directives === 'bind') {
                    const valueName = attr.nodeValue;
                    node.value = vm.data[valueName];
                    node.removeAttribute(nodeName);

                    node.addEventListener('input', e => {
                        vm.data[valueName] = e.target.value;

                        console.log(vm);
                    });
                }
            }
        });
    }

    if (nodeType == NODE_TYPE.text) {
        // console.log(node);
        if (regMoustache.test(node.nodeValue)) {
            const value = (RegExp.$1).trim();
            node.nodeValue = vm.data[value];
        }
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

const wrap = document.querySelector('.wrap');
const node = node2fragment(wrap);
console.log(node);
wrap.appendChild(node);
