!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,n){"use strict";function r(e){console.warn("[Geview]: "+e)}function o(e){return"string"==typeof e?document.querySelector(e):e}function i(e){return null!==e&&"object"===(void 0===e?"undefined":h(e))}function a(e,t){for(var n=Object.keys(e).concat(Object.keys(t)),r=n.length,o=0;o<r;o++){var u=n[o],c=t[u],s=e[u];c!==s&&(s?i(c)&&i(s)&&a(s,c):e[u]=i(c)?Object.create(c):c)}return e}function u(e,t){Object.keys(t).forEach(function(n){var r=n;e.hasOwnProperty(n)&&(r+="_var"),s(e,r,{get:function(){return t[n]},set:function(e){t[n]=e}})})}function c(){}function s(e,t,n){var r=n.get||c(),o=n.set||c(),i=n.enumerable,a=n.configurable;Object.defineProperty(e,t,{enumerable:void 0===i||!!i,configurable:void 0===a||!!a,get:r,set:o})}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",n=t.length;return Array.from(new Array(e)).map(function(e){return t[~~(Math.random()*n)]}).join("")}function l(e,t){var n=t.split(".");try{return 1===n.length?e[n[0]]:n.reduce(function(t,n){return e[t][n]})}catch(e){return r(e),""}}Object.defineProperty(t,"__esModule",{value:!0});var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.warn=r,t.toElement=o,t.isObject=i,t.merge=a,t.proxy=u,t.emptyFun=c,t.defProp=s,t.randomString=f,t.pathToData=l;var p={0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,UP:38,DOWN:40,LEFT:37,RIGHT:39,BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,SPACE:32,DELETE:46,a:97,b:98,c:99,d:100,e:101,f:102,g:103,h:104,i:105,j:106,k:107,l:108,m:109,n:110,o:111,p:112,q:113,r:114,s:115,t:116,u:117,v:118,w:119,x:120,y:121,z:122,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123};t.CONST={USE_CAPTURE:{BUBBLING:!1,CAPTURE:!0},KEY_CODE:p,NODE_TYPE:{element:1,text:3,comment:8}},t.regex={text:/{{\s*(.*?)\s*}}/}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Watcher=t.WatcherTarget=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=t.WatcherTarget=null;t.Watcher=function(){function e(n,o,i,u){r(this,e),this.vm=n,this.exp=o,this.callback=i,t.WatcherTarget=a=this,this.value=this._get(this.exp),"function"==typeof this.value&&(this._computedValCache=this.value(),this._isFunc=!0),t.WatcherTarget=a=null}return o(e,[{key:"_get",value:function(e){return(0,i.pathToData)(this.vm,e)}},{key:"update",value:function(e,t){this._isFunc?(t=this.value(),this.callback(this._computedValCache,t),this._computedValCache=t):this.callback(e,t)}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=n(4),u=n(3),c=n(5),s={_isComponent:!1,data:{}},f=new u.ComManager,l=0,h=function(){function e(t){if(r(this,e),!(this instanceof e))return new e(t);this._init(t)}return o(e,[{key:"_init",value:function(e){var t=this;this.$options=(0,i.merge)(e,s);var n=this.$options.el,r=this.$options._isComponent;n&&!r&&(this.el=(0,i.toElement)(n),this.$comManager=f),this.$options.name&&(this.name=this.$options.name),r&&(this._isComponent=!0),this._uid=l++,new a.Observer(this.$options.data),(0,i.proxy)(this,this.$options.data);var o=this.$options.computed;if(o){Object.keys(o).forEach(function(e){var n=o[e].bind(t);(0,i.defProp)(t,e,{enumerable:!0,configurable:!0,get:function(){return n},set:i.emptyFun})})}this.el&&new c.Parser(this.el,this)}}],[{key:"component",value:function(t,n){if(!t)return void(0,i.warn)("Component name is required");var r=new e(Object.assign({_isComponent:!0,name:t},n));return f.addCom(r),r}}]),e}();t.default=h},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.ComManager=function(){function e(){r(this,e),this.components={}}return o(e,[{key:"addCom",value:function(e){this.components[e.name]=e}},{key:"hasCom",value:function(e){return e in this.components}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t,n){(0,a.isObject)(n)&&new s(n);var r=new u.Publisher;(0,a.defProp)(e,t,{enumerable:!0,configurable:!0,get:function(){return null!==c.WatcherTarget&&r.addWatcher(c.WatcherTarget),n},set:function(e){if(n!==e){(0,a.isObject)(e)&&new s(e);var t=n;n=e,r.notify(t,e),console.log(r)}}})}Object.defineProperty(t,"__esModule",{value:!0}),t.Observer=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.initPorperty=o;var a=n(0),u=n(6),c=n(1),s=t.Observer=function(){function e(t){if(r(this,e),!(0,a.isObject)(t))return void(0,a.warn)("Observed data must be an object");(0,a.defProp)(t,"__ob__",{enumerable:!1,configurable:!0,get:function(){return this}}),e.traverse(t)}return i(e,null,[{key:"traverse",value:function(e){Object.keys(e).forEach(function(t){o(e,t,e[t])})}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Parser=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=n(1);t.Parser=function(){function e(t,n){if(r(this,e),this.context=n,!(this instanceof e))return new e(t,n);for(var o=document.createDocumentFragment(),i=void 0;i=t.firstChild;)this.parseNode(i),o.appendChild(i);t.appendChild(o)}return o(e,[{key:"parseNode",value:function(e){e.tagName;switch(e.nodeType){case i.CONST.NODE_TYPE.element:this.parseElement(e);break;case i.CONST.NODE_TYPE.text:this.parseText(e)}e.childNodes&&Array.from(e.childNodes,this.parseNode.bind(this))}},{key:"parseElement",value:function(e){Array.from(e.attributes)}},{key:"parseText",value:function(e){var t=e.textContent,n=i.regex.text;if(n.test(t)){var r=t.match(new RegExp(n,"g")).map(function(e){return[e.replace(/[{}]/g,"").trim(),e]}),o=this.context;r.forEach(function(t){e.textContent=e.textContent.replace(t[1],(0,i.pathToData)(o,t[0])),new a.Watcher(o,t[0],function(t,n){e.textContent=e.textContent.replace(t,n)})})}}}]),e}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.Publisher=function(){function e(){r(this,e),this.watcherList=[]}return o(e,[{key:"addWatcher",value:function(e){this.watcherList.push(e)}},{key:"notify",value:function(e,t){this.watcherList.forEach(function(n){n.update(e,t)})}}]),e}()},function(e,t,n){"use strict";var r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r);window.Geview=o.default}]);
//# sourceMappingURL=index.js.map