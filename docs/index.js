webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	console.log('Start');
	
	var NODE_TYPE = {
	    element: 1,
	    text: 3,
	    comment: 8
	};
	var DIRECTIVES = ['bind'];
	
	var vm = {
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
	    if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
	        return;
	    }
	
	    Object.keys(data).forEach(function (key) {
	        defineReactive(data, key, data[key]);
	    });
	}
	
	function defineReactive(data, key, val) {
	    observe(val);
	
	    Object.defineProperty(data, key, {
	        enumerable: true,
	        configurable: false,
	        get: function get() {
	            return val;
	        },
	        set: function set(newVal) {
	            console.log('value changed', val, newVal);
	            val = newVal;
	        }
	    });
	}
	
	var Dep = function () {
	    function Dep() {
	        _classCallCheck(this, Dep);
	
	        this.subs = [];
	    }
	
	    _createClass(Dep, [{
	        key: 'addSub',
	        value: function addSub(sub) {
	            this.subs.push(sub);
	        }
	    }, {
	        key: 'notify',
	        value: function notify() {
	            this.subs.forEach(function (sub) {
	                sub.update();
	            });
	        }
	    }]);
	
	    return Dep;
	}();
	
	function compile(node, vm) {
	    var regMoustache = /\{\{(.*?)\}\}/;
	    var regDirectives = /g-([\s\S]+)/;
	    var nodeType = node.nodeType;
	
	    if (nodeType == NODE_TYPE.element) {
	        var attrs = node.attributes;
	
	        Array.from(attrs, function (attr) {
	            var nodeName = attr.nodeName;
	
	            if (regDirectives.test(nodeName)) {
	                var directives = RegExp.$1;
	
	                if (directives === 'bind') {
	                    (function () {
	                        var valueName = attr.nodeValue;
	                        node.value = vm.data[valueName];
	                        node.removeAttribute(nodeName);
	
	                        node.addEventListener('input', function (e) {
	                            vm.data[valueName] = e.target.value;
	
	                            console.log(vm);
	                        });
	                    })();
	                }
	            }
	        });
	    }
	
	    if (nodeType == NODE_TYPE.text) {
	        if (regMoustache.test(node.nodeValue)) {
	            var value = RegExp.$1.trim();
	            node.nodeValue = vm.data[value];
	        }
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
	
	var wrap = document.querySelector('.wrap');
	var node = node2fragment(wrap);
	console.log(node);
	wrap.appendChild(node);

/***/ }
]);
//# sourceMappingURL=index.js.map