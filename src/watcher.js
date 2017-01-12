export class Watcher {
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