/*
 * 底部菜单
 * 创建底部菜单，id,class会有不同,每个页面只有一个底部，多个筛选条件
 * menu：根据页面url地址进行判断
 * filters：根据传入的json对象显示和判断
 * 传入参数说明：
 *
 {
 hotelSort : {//键值既是传入也是返回结果
 title : "推荐排序",//中文名称
 c : "sort bg_color", //底部菜单样式
 type : 1,//类型：0底部按钮直接点击，1按钮触发列表显示 点击列表直接查询回调，2同1，多条件筛选，点击确认按钮进行查询
 listData : [
 {
 key : ["价格从高到低", "价格从低到高", "评分从高到低", "星级从高到低", "星级从低到高"],
 title : "中文",
 type : 0|1 选择：单选，多选
 }
 ]//统一为数组，内里为对象key返回的对象名，内容
 }
 }
 *
 */
var footer = (function() {
	"use strict";
	// 定义全局cache，随时替换
	var node,
	// 遮罩
	masker,
	// 菜单容器
	box,
	// 选择容器
	sec,
	// 实例
	instance,
	// 返回结果
	results = {},
	// 对象长度
	size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key))
				size++;
		}
		return size;
	},
	// 数字转换英文
	numToEn = function(n) {
		var en = new Array(" ", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine");
		n = isNaN(parseInt(n)) ? 0 : parseInt(n);
		return en[n];
	},
	// 添加样式
	addClass = function(c, node) {
		node.className = node.className + ' ' + c;
	},
	// 移除样式名
	removeClass = function(c, node) {
		var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
		node.className = node.className.replace(reg, '');
	},
	// 绑定事件
	on = function(node, type, handler) {
		node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
	},
	//菜单
	menu = function() {
		var basePath = basePath == undefined ? "http://" + window.location.host : basePath, hrefstr = window.location.href, _k, menus = {
			home : ['首页', basePath],
			user : ['我的', basePath + '/user/user.html']
		};
		if (hrefstr == "http://" + basePath + "/index.html" || hrefstr == "http://" + basePath + "/") {
			_k = "home";
		} else {
			var _s = hrefstr.substr(basePath.length + 1);
			if (_s == "" || _s == "index.html") {
				_k = "home";
			} else if (_s == "scenic/index.html") {
				_k = "find";
			} else if (_s == "user/user.html") {
				_k = "user";
			} else if (_s == "building.html") {
				_k = "find";
			}
		}
		if (menus.hasOwnProperty(_k)) {
			if (document.getElementById("menu")) {
				var menuer = document.getElementById("menu");
				menuer.className = "footer-menu-three-icons footer-menu";
			} else {
				var menuer = document.createElement('div');
				menuer.id = "menu";
				menuer.className = "footer-menu-three-icons footer-menu";
				document.body.appendChild(menuer);
			}
			var _str = "";
			for (var k in menus) {
				var cn = k == _k ? "foot-" + k + "s" : "foot-" + k;
				_str += "<a href='" + menus[k][1] + "' class='" + cn + "'><i></i>" + menus[k][0] + "</a>";
			}
			menuer.innerHTML = _str;
		}
		//return this;
	},
	// 筛选
	filters = {
		bindEvent : function() {
			var that = this;
			//底部三按钮
			on(box, 'click', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement, src, index, returnVal;
				src = target.parentNode;
				//当前dom元素等于事件绑定的dom元素的时候，停止“冒泡”
				while (src && src !== box) {
					target = src;
					src = src.parentNode;
				}
				index = 0;
				while ( target = target.previousSibling) {
					if (target.nodeType == 1)
						index++;
				}
				that.showItems(index);
			});
			// 容器里的各种点击：取消，确定按钮
			on(sec, 'click', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement, src, index, cur;
				src = target.parentNode;
				if (target.className == "cancel") {
					that.remove();
				} else if (target.className == "clears") {
					that.resec();
				} else if (target.className == "sure") {
					that.request();
				} else {
					if (target.tagName == "LI") {
						if (src.className == "screen_lf") {
							var cur = src.getElementsByClassName("cur");
							for (var i = 0; i < cur.length; i++) {
								if (cur[i].className == "cur") {
									cur[i].className = "";
									break;
								}
							}
							target.className = "cur";
							index = 0;
							while ( target = target.previousSibling) {
								if (target.nodeType == 1)
									index++;
							}
							// 右侧显示隐藏
							var sRight = src.nextSibling, ul = sRight.getElementsByTagName("ul");
							for (var i = 0; i < ul.length; i++) {
								//if (ul[i].style.display == "block") {
								ul[i].style.display = "none";
								//break;
								//}
							}
							ul[index].style.display = "block";
						} else {
							var theme = src.getAttribute("data-theme");
							switch(theme) {
							case 1:
								//单选
								var cur = src.getElementsByClassName("cur");
								for (var i = 0; i < cur.length; i++) {
									if (cur[i].className == "cur") {
										cur[i].className = "";
										break;
									}
								}
								target.className = "cur";
								break;
							case 2:
								//多选
								target.className = target.className == "cur" ? "" : "cur";
								break;
							default:
								//单击
								that.request();
								break;
							}
						}
					}
				}

			});
			// 遮罩层|返回按钮点击，包括隐藏
			on(document, 'click', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement, src = target.parentNode;
				if (target.className.indexOf("header_back") > -1 || src.className.indexOf("header_back") > -1) {
					if (masker.style.display == "none") {
						that.removeDate();
					}
				}
				if (target == masker) {
					that.removeDate();
				}
			});
		},
		// 新建筛选：列表&菜单
		create : function() {
			console.log(size("filter number=" + footer.data));
			//overlay
			this.createMask();
			//container
			this.createContainer();
			//menu
			box = document.createElement('footer');
			box.className = 'footer_' + numToEn(size(footer.data));
			//addClass('footer_filter_btn',box);
			if (1) {
				box.style.position = 'fixed';
				box.style.left = 0;
				box.style.bottom = 0;
				box.style.width = '100%';
				box.style.height = '0.98rem';
				box.style.background = '#4a4a4a';
				box.style.zIndex = 130;
				box.style.fontSize = '0.24rem';
			}
			var data = footer.data, ca = [];
			for (var p in data) {
				ca.push('<dl class=' + data[p].c + ' id=' + p + ' data-type=' + data[p].type + '><dt></dt><dd>' + data[p].title + '</dd></dl>');
				this.createSec(data[p].c, data[p].listData, data[p].type);
			}
			box.innerHTML = ca.join('');
			document.body.appendChild(box);
			this.bindEvent();
			return this;
		},
		// container
		createContainer : function() {
			if (!sec) {
				sec = document.createElement('span');
				sec.style.display = "inline";
				sec.style.position = "fixed";
				sec.style.zIndex = 110;
				sec.style.left = 0;
				sec.style.top = 0;
				sec.style.right = 0;
				sec.style.bottom = 0;
				document.body.appendChild(sec);
			} else {
				return false;
			}
			return this;
		},
		// masker
		createMask : function() {
			if (!masker) {
				masker = document.createElement('div');
				masker.style.display = "none";
				masker.style.position = 'fixed';
				masker.style.left = 0;
				masker.style.top = 0;
				masker.style.width = '100%';
				masker.style.height = '100%';
				masker.style.background = 'rgba(0,0,0,0.6)';
				masker.style.zIndex = 100;
				document.body.appendChild(masker);
			} else {
				return false;
			}
			return this;
		},
		// section
		createSec : function(c, d, t) {
			var str = '', ulstr = '', i = 0, l = d.length, css = '', s = 0, cache = [],
			// 类型2容器
			wrapper = '',
			// 左侧容器
			left = ['<ul class="screen_lf">', '</ul>'],
			// 右侧容器
			right = ['<div class="screen_rg">', '</div>'],
			// 新建section
			mysec = document.createElement('section');
			c ? mysec.className = c : null;
			for (; i < l; i++) {
				var obj = d[i];
				ulstr += '<ul data-theme=' + obj.type + ' data-key=' + obj.key + '>' + ilist(obj.val) + '</ul>';
				if (obj.title) {
					css = s == 0 ? ' class="cur"' : '';
					cache.push('<li' + css + '>' + obj.title + '</li>');
					s++;
				}
			}
			switch(t) {
			case 1:
				str = ulstr;
				break;
			case 2:
				str = '<div class="screen_btn"><p class="cancel">取消</p><p class="clears">清空筛选</p><p class="sure">确定</p></div>';
				if (cache.length > 0) {
					str += '<div class="screen_box">';
					str += left[0] + cache.join('') + left[1];
					str += right[0] + ulstr + right[1];
					str += '</div>';
				} else {
					str += ulstr;
				}
				break;
			case 3:
				// 航空公司列表
			//<section class="flight_company" style="bottom: 0.98rem;">
			//	<ul>
			//	<li class="cur">
			//	<div>
			//	<img src="../images/flights.png"/>
			//	</div>
			//	<span class="airway_name">中国航空</span>
			//	<div class="aw_price">
			//	<span>+￥</span><span>100</span>
			//</div>
			//<b class="hft_icon"></b>
			//	</li>
			//	<li>
			//	<div>
			//	<img src="../images/flights.png"/>
			//	</div>
			//	<span class="airway_name">中国航空</span>
			//	<div class="aw_price">
			//	<span>+￥</span><span>100</span>
			//</div>
			//<b class="hft_icon"></b>
			//	</li>
			//	<li>
			//	<div>
			//	<img src="../images/flights.png"/>
			//	</div>
			//	<span class="airway_name">中国航空</span>
			//	<div class="aw_price">
			//	<span>+￥</span><span>100</span>
			//</div>
			//<b class="hft_icon"></b>
			//	</li>
			//	</ul>
			//	</section>
				break;
			default:
				// 非单击类型
				str = '';
				break;
			}
			mysec.innerHTML = str;
			if (sec) {
				sec.appendChild(mysec);
			} else {
				this.createContainer();
				sec.appendChild(mysec);
			}
			return this;
			// 数组获取值
			function ilist(arg) {
				// 默认第一个选中？
				var li = t == 2 ? '<li class="cur">不限<i></i></li>' : '<li class="cur">' + arg[0] + '<i></i></li>';
				for (var j = 1; j < arg.length; j++) {
					li += '<li>' + arg[j] + '<i></i></li>';
				}
				return li;
			}
		},

		current : function() {
			return instance;
		},
		init : function() {
			var i = 1, key, args = [].slice.call(arguments);
			if (args.length > 0) {
				box = document.querySelector(args[0]);
			} else {
				this.create();
			}
			//缓存数据&导入
		},

		remove : function() {
			if (masker.style.display != "none") {
				masker.style.display = "none";
			}
			for (var i = 0; i < sec.length; i++) {
				if (sec[i].style.bottom == "0.98rem") {
					sec[i].style.bottom == "";
					break;
				}
			}
			return this;
		},
		request : function() {
			instance = document.getElementsByClassName("cur");
			// 选中的属性？
			footer.result = {};
			if (footer.callback) {
				footer.callback();
			}
		},
		// 重置选中的属性，回归到1
		resec : function() {
			var cur = masker.getElementsByClassName("cur"), l = cur.length;
			for (var i = 0; i < cur.length; i++) {
				cur[i].className = '';
			}
			var ul = masker.getElementsByTagName("ul");
			for ( i = 0; i < ul.length; i++) {
				ul[i].firstChild.className = 'cur';
			}
			return this;
		},
		showItems : function(n, t) {
			if (t == 0) {
				//that.request();
			}// 显示要筛选的列表内容
			if (sec) {
				//sec = masker.getElementsByTagName("section");
				if (masker.style.display == "none") {
					masker.style.display = "block";
					sec.children[n].style.bottom = "0.98rem";
				} else {
					if (sec.children[n].style.bottom == "0.98rem") {
						sec.children[n].style.bottom = "";
						this.remove();
					} else {
						for (var i = 0; i < sec.length; i++) {
							if (sec[i].style.bottom == "0.98rem") {
								sec[i].style.bottom = "";
								break;
							}
						}
						sec.children[n].style.bottom = "0.98rem";
					}
				}

			} else {
				return "没找到section。";
			}
		},
	};

	return {
		menu : menu,
		filters : filters,
		results : results
	};
})();

