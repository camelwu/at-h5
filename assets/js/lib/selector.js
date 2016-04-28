/*
 *	selector.js version 1.0.0
 *
 * 	仿jquery编写
 * 	Author:camelwu
 * 	Date:2016-1-04
 * */~ (function(window) {"use strict";
	var S = function(selector, context) {
		if ( typeof selector == 'function') {
			S(window).on('load', selector);
		} else {
			return new S.fn.init(selector, context);
		}
	};
	S.fn = S.prototype = {
		constructor : S,
		init : function(selector, context) {
			if ( typeof selector === 'object') {
				this[0] = selector;
				this.length = 1;
				return this;
			};
			this.length = 0, context = document.getElementById(context) || document;
			if (~selector.indexOf('#')) {
				this[0] = document.getElementById(selector.slice(1));
				this.length = 1;
			} else if (~selector.indexOf('.')) {
				var doms = [], className = selector.slice(1);
				if (context.getElementsByClassName) {
					doms = context.getElementsByClassName(className);
				} else {
					doms = context.getElementsByTagName('*');
				}
				for (var i = 0, len = doms.length; i < len; i++) {
					if (doms[i].className && !!~doms[i].className.indexOf(className)) {
						this[this.length] = doms[i];
						this.length++;
					}
				}
			} else {
				var doms = context.getElementsByTagName(selector), i = 0, len = doms.length;
				for (; i < len; i++) {
					this[i] = doms[i];
				}
				this.length = len;
			}
			this.context = context;
			this.selector = selector;
			return this;
		},
		//元素长度
		length : 0,
		push : [].push,
		splice : [].splice
	};
	//设置构造函数原型
	S.fn.init.prototype = S.fn;
	S.extend = S.fn.extend = function() {
		var i = 1, key, args = [].slice.call(arguments), //对象转数组
		ride = typeof args[args.length - 1] == "undifened" ? args.pop() : true;
		if (args.length === 1) {
			target = !this.window ? this : {};
			i = 0;
		}
		//遍历
		while ((source == args[i++])) {
			//允许对象糅杂，用户保证都是对象
			for (var p in source) {
				//copy 2
				if (ride || !( p in target))
					target[p] = source[p];
			}
		}
		return target;
	};
	S.extend({
		/*
		 * name:将横线式命名字符串转换为驼峰式
		 * eg:'test-demo' -> 'testDemo'
		 */
		camelCase : function(str) {
			return str.replace(/\-(\w)/g, function(match, letter) {
				return letter.toUpperCase();
			});
		},
		/*
		 * name:去除两端空格
		 * eg:' test-demo ' -> 'test-demo'
		 */
		trim : function(str) {
			return str.replace(/^\s+|\s+$/g, '');
		},
		/*
		 * name:创建一个元素并包装为对象
		 * param:type	元素类型
		 * param:value	元素属性对象
		 */
		create : function(type, value) {
			var dom = document.createElement(type);
			return S(dom).attr(value);
		},
		/*
		 * name:格式化模板
		 * param:str	模板字符串
		 * param:data	渲染数据
		 * eg:'<div>{#value#}</div> + {value:text}' -> '<div>text</div>'
		 */
		formateString : function(str, data) {
			var html = '';
			if ( data instanceof Array) {
				for (var i = 0, len = data.length; i < len; i++) {
					html += arguments.callee(str, data[i]);
				}
				return html;
			} else {
				return str.replace(/\{#(\w+)#}/g, function(match, key) {
					return typeof data === 'string' ? data : ( typeof data[key] === 'undefined' ? '' : data[key]);
				});
			}
		}
	});
	//事件绑定
	var _on = (function() {
		//标准浏览器
		if (document.addEventListener) {
			return function(dom, type, fn, data) {
				dom.addEventListener(type, function(e) {
					fn.call(dom, e, data);
				}, false);
			};
			//IE
		} else if (document.attachEvent) {
			return function(dom, type, fn, data) {
				dom.attachEvent('on' + type, function(e) {
					fn.call(dom, e, data);
				});
			};
			//老版本Browser
		} else {
			return function(dom, type, fn, data) {
				dom['on' + type] = function(e) {
					fn.call(dom, e, data);
				};
			};
		}
	})();
	//
	S.fn.extend({
		//添加事件
		on : function(type, fn, data) {
			var i = this.length;
			for (; --i >= 0; ) {
				//通过上面的闭包实现对变量i的保存
				_on(this[i], type, fn, data);
			}
			return this;
		},
		//设置or获取样式
		css : function() {
			var args = [].slice.call(arguments), len = args.length;
			//无元素立即返回
			if (this.lenght < 1) {
				return this;
			}
			//1个参数
			if (len === 1) {
				//参数是字符串，返回获取到的第一个元素样式
				if ( typeof args[0] === "string") {
					//ie
					if (this[0].currentStyle) {
						return this[0].currentStyle[name];
					} else {
						return getComputedStyle(this[0],false)[name];
					}
				} else if ( typeof args[0] === "object") {
					for (var i in args[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].style[S.camelCase(i)] = args[0][i];
						}
					}
				}
				//2个参数
			} else if (len === 2) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].style[S.camelCase(args[0])] = args[1];
				}
			}
			return this;
		},
		//设置or获取元素属性
		attr : function() {
			var args = [].slice.call(arguments), len = args.length;
			//无元素立即返回
			if (this.lenght < 1) {
				return this;
			}
			//1个参数
			if (len === 1) {
				//参数是字符串，返回获取到的第一个元素属性值
				if ( typeof args[0] === "string") {
					return this[0].getAttribute(args[0]);
				} else if ( typeof args[0] === "object") {
					for (var i in args[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].setAttribute(i, args[0][i]);
						}
					}
				}
				//2个参数
			} else if (len === 2) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].setAttribute(args[0], args[1]);
				}
			}
			return this;
		},
		//设置or获取元素内容
		html : function() {
			var args = [].slice.call(arguments), len = args.length;
			//无元素立即返回
			if (this.lenght < 1) {
				return this;
			}
			//1个参数
			if (len === 0) {
				//参数是字符串，返回获取到的第一个元素样式
				return this[0].innerHTML;
			} else if ( len === 1) {
				for (var i in args[0]) {
					this[j].style[S.camelCase(i)] = args[0][i];
				}
				//2个参数
			} else if (len === 2) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].style[S.camelCase(args[0])] = args[1];
				}
			}
			return this;
		},
	    // 获取元素位置
	    getPos:function () {
	        var args = [].slice.call(arguments), len = args.length;
	        //无元素立即返回
			if (this.lenght < 1) {
				return this;
			}
	        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
	                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
	        pos = this[0].getBoundingClientRect();
	        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
	    },
	    // 添加样式名
	    addClass:function(c,node){
	        node.className = node.className + ' ' + c;
	    },
	    // 移除样式名
	    removeClass:function(c,node){
	        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)","g");
	        node.className = node.className.replace(reg, '');
	    },
	    // 阻止冒泡
	    stopPropagation:function(event){
	        event = event || window.event;
	        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    }
	});
	S.fn.extend({});
	S.noConflict = function(lib){
		if(lib){
			window.$ = lib;
		}else{
			window.$ = null;
			delete window.$;
		}
		return S;
	}
	window.$ = window.S = S;
})(window);
