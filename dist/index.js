webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _var = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var vm = {
	    data: {
	        test: 'test',
	        test2: 'test2',
	        content: 'content'
	    }
	};
	
	vm.data.test = 'notest';
	vm.data.test2 = 'hhh';
	
	function observe(data) {
	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	        return;
	    }
	
	    Object.keys(data).forEach(function (key) {
	        defineReactive(data, key, data[key]);
	    });
	}
	
	function defineReactive(data, key, val) {
	    observe(val);
	
	    var dep = new Dep();
	
	    Object.defineProperty(data, key, {
	        enumerable: true,
	        configurable: false,
	        get: function get() {
	            if (Dep.target) {
	                dep.addSub(Dep.target);
	            }
	            return val;
	        },
	        set: function set(newVal) {
	            console.log('value changed', val, newVal);
	            val = newVal;
	
	            dep.notify();
	        }
	    });
	}
	
	var Dep = function () {
	    function Dep() {
	        _classCallCheck(this, Dep);
	
	        this.subs = [];
	        this.target = null;
	    }
	
	    _createClass(Dep, [{
	        key: 'addSub',
	        value: function addSub(sub) {
	            console.log('sub:', this.subs);
	            this.subs.push(sub);
	        }
	    }, {
	        key: 'notify',
	        value: function notify() {
	            console.log('notify');
	            this.subs.forEach(function (sub) {
	                console.log(sub);
	                sub.update();
	            });
	        }
	    }]);
	
	    return Dep;
	}();
	
	Dep.target = null;
	
	var Watcher = function () {
	    function Watcher(vm, node, name) {
	        _classCallCheck(this, Watcher);
	
	        Dep.target = this;
	
	        this.vm = vm;
	        this.node = node;
	        this.name = name;
	        this.update();
	        Dep.target = null;
	    }
	
	    _createClass(Watcher, [{
	        key: 'update',
	        value: function update() {
	            this.get();
	            this.node.nodeValue ? this.node.nodeValue = this.value : this.node.value = this.value;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            this.value = this.vm.data[this.name];
	        }
	    }]);
	
	    return Watcher;
	}();
	
	function compile(node, vm) {
	    var regMoustache = /\{\{(.*?)\}\}/;
	    var regDirectives = /g-([\s\S]+)/;
	    var nodeType = node.nodeType;
	
	    if (nodeType == _var.NODE_TYPE.element) {
	        var attrs = node.attributes;
	
	        Array.from(attrs, function (attr) {
	            var nodeName = attr.nodeName;
	
	            if (!regDirectives.test(nodeName)) {
	                return;
	            }
	
	            var directives = RegExp.$1;
	
	            if (directives === 'bind') {
	                (function () {
	                    var name = attr.nodeValue;
	                    node.value = vm.data[name];
	                    node.removeAttribute(nodeName);
	
	                    node.addEventListener('input', function (e) {
	                        vm.data[name] = e.target.value;
	
	                        console.log(vm);
	                    });
	
	                    new Watcher(vm, node, name);
	                })();
	            }
	        });
	    }
	
	    if (nodeType == _var.NODE_TYPE.text) {
	        if (!regMoustache.test(node.nodeValue)) {
	            return;
	        }
	
	        var name = RegExp.$1.trim();
	
	
	        new Watcher(vm, node, name);
	    }
	}
	
	function node2fragment(node) {
	    var fragment = document.createDocumentFragment();
	    var child = void 0;
	
	    while (child = node.firstChild) {
	        compile(child, vm);
	        fragment.append(child);
	    }
	
	    return fragment;
	}
	
	observe(vm);
	var wrap = document.querySelector('.wrap');
	var node = node2fragment(wrap);
	console.log(node);
	wrap.appendChild(node);
	
	document.querySelector('input[value=change]').addEventListener('click', function () {
	    vm.data.content = 'change';
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var NODE_TYPE = exports.NODE_TYPE = {
	    element: 1,
	    text: 3,
	    comment: 8
	};
	
	var DIRECTIVES = exports.DIRECTIVES = ['bind'];

/***/ }
]);
//# sourceMappingURL=index.js.map