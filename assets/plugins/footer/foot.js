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
	// 遮罩容器
	var masker,
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
				returnVal = target.getAttribute("data-type");
				while ( target = target.previousSibling) {
					if (target.nodeType == 1)
						index++;
				}
				that.showItems(index, returnVal);
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
							var sel = parseInt(src.getAttribute("data-sel")), theme = parseInt(src.getAttribute("data-theme"));
							switch(sel) {
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
								if (src.firstChild.innerHTML == "不限") {//不限互斥
									if (target == src.firstChild) {
										for (var i = 0; i < cur.length; i++) {
											if (cur[i].className == "cur") {
												cur[i].className = "";
												// break;
											}
										}
										target.className = "cur";
									} else {
										target.className = target.className == "cur" ? "" : "cur";
									}
								} else {
									target.className = target.className == "cur" ? "" : "cur";
								}
								break;
							default:
								//单击
								break;
							}
							if (theme == 1 || theme == 3) {// 显示类型确认操作
								that.request();
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
					if (masker.style.display == "none" && sec.style.display != "none") {
						that.remove();
					}
				}
				if (target == masker || target == sec) {
					that.remove();
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
				this.createSec(data[p].s, data[p].c, data[p].type, data[p].key, data[p].listData);
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
				sec.style.position = "fixed";
				sec.style.zIndex = 110;
				sec.style.width = '100%';
				sec.style.left = 0;
				sec.style.bottom = 0;
				document.body.appendChild(sec);
			} else {
				return sec;
			}
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
				return masker;
			}
		},
		// section
		createSec : function(s, c, t, k, d) {
			var str = '', ulstr = '', listr = '', i = 0, l = d.length, css = '', s = s ? s : 1, cache = [],
			// 容器
			wrapper = ['<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k + '">', '</ul>'],
			// 左侧容器
			left = ['<ul class="screen_lf">', '</ul>'],
			// 右侧容器
			right = ['<div class="screen_rg">', '</div>'],
			// 列表容器
			ulstr = '',
			// 新建section
			mysec = document.createElement('section');
			c ? mysec.className = c : null;
			switch(k) {
			case "airways":
				// 航空公司
				for (; i < l; i++) {
					css = i == 0 ? ' class="cur"' : '';
					listr += '<li' + css + ' data-val="' + d[i].airwayCacheID + '" airwayCacheID="' + d[i].airwayCacheID + '" airwaySetID="' + d[i].airwaySetID + '"><div><img src="' + d[i].airwayLogo + '"></div><span class="airway_name">' + d[i].chineseName + '</span><div class="aw_price"><span>+￥</span><span>' + d[i].additionalPrice + '</span></div><b class="hft_icon"></b></li>';
				}
				ulstr = wrapper[0] + listr + wrapper[1];
				break;
			case "filters":
				// 筛选
				for (; i < l; i++) {
					var a = d[i], item = a.item, li = '';
					css = i == 0 ? ' class="cur"' : '';
					cache.push('<li' + css + ' data-filterType="' + a.filterType + '">' + a.title + '</li>');
					s = a.allowMultiSelect == 1 || a.allowMultiSelect == "1" ? 2 : 1;
					wrapper[0] = '<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k + '" data-type="' + k + '">';
					for (var j = 0; j < item.length; j++) {
						var o = item[j];
						li += '<li data-val="' + o.filterValue + '">' + o.filterText + '<i></i></li>';
					}
					ulstr += wrapper[0] + li + wrapper[1];
				}
				break;
			case "locationList":
				// 位置
				for (; i < l; i++) {
					listr += '<li data-val="' + i + '">' + d[i] + '<i></i></li>';
				}
				ulstr = wrapper[0] + listr + wrapper[1];
				break;
			case "sortTypes":
				// 排序
				for (; i < l; i++) {
					listr += '<li data-val="' + d[i].sortValue + '">' + d[i].sortText + '<i></i></li>';
				}
				ulstr = wrapper[0] + listr + wrapper[1];
				break;
			case "themes":
				// 主题
				for (; i < l; i++) {
					listr += '<li data-val="' + d[i].themeID + '">' + d[i].themeName + '</li>';
				}
				ulstr = wrapper[0] + listr + wrapper[1];
				break;
			default:
				// 默认，按普通数组处理
				for (; i < l; i++) {
					listr += '<li data-val="' + i + '">' + d[i] + '</li>';
				}
				/*for(var key in d){
				 listr += '<li data-val="' + key + '">' + d[key] + '</li>';
				 }*/
				ulstr = wrapper[0] + listr + wrapper[1];
				break;
			}
			// 根据type判断显示类型
			switch(t) {
			case 1:
				str = ulstr;
				break;
			case 2:
				str = '<div class="foot_screen_btn"><p class="cancel">取消</p><p class="clears">清空筛选</p><p class="sure">确定</p></div>';
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
				// 航空公司列表，单选
				str = ulstr;
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
		},

		current : function() {
			if (sec) {
				return sec.getElementsByClassName("cur");
			} else {
				return document.getElementsByClassName("cur");
			}
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
			var node = sec.getElementsByTagName("section");
			for (var i = 0; i < node.length; i++) {
				node[i].style.bottom = "";
			}
			// return this;
		},
		request : function() {
			// 选中的属性
			var node = sec.getElementsByTagName("ul"), obj = {};
			for (var i = 0; i < node.length; i++) {
				if (node[i].getAttribute("data-key")) {
					var cache = [], chk = node[i].getElementsByClassName("cur"), mykey = node[i].getAttribute("data-key");
					for (var j = 0; j < chk.length; j++) {
						cache.push(chk[j].getAttribute("data-val"));
					}
					if (mykey == "airways") {// 航空公司处理
						obj.airways = {
							airwaySetID:chk[0].getAttribute("airwayCacheID"),
							airwaySetID:chk[0].getAttribute("airwayCacheID")
						};
					} else if (mykey == "filters") {// 过滤处理
						if(obj[node[i].getAttribute("data-key")]){
							obj[node[i].getAttribute("data-key")].push([node[i].getAttribute("data-type"), cache]);
						}else{
							obj[node[i].getAttribute("data-key")]=[];
							obj[node[i].getAttribute("data-key")].push([node[i].getAttribute("data-type"), cache]);
						}
					} else {
						obj[node[i].getAttribute("data-key")] = cache;
					}
				}
			}
			footer.result = obj;
			console.log(obj);
			this.remove();
			if (footer.callback) {
				footer.callback(obj);
			}
		},
		// 重置选中的属性，回归到1
		resec : function() {
			var cur = sec.getElementsByClassName("cur");
			for (var i = 0; i < cur.length; i++) {
				cur[i].className = '';
			}
			var ul = sec.getElementsByTagName("ul");
			for ( i = 0; i < ul.length; i++) {
				ul[i].firstChild.className = 'cur';
			}
		},
		showItems : function(n, t) {
			console.log(n + "," + t + "," + sec.childNodes.length);
			if (t == 0) {
				that.request();
				return;
			}
			// 显示要筛选的列表内容
			if (sec) {
				if (t == 3) {
					// 航空公司
					masker.style.display = "none";
					console.log("3333");
					if (sec.firstChild.style.bottom == "0.98rem") {
						sec.firstChild.style.bottom = "";
					} else {
						sec.firstChild.style.bottom = "0.98rem";
					}
				} else {
					if (masker.style.display == "none") {
						masker.style.display = "block";
						sec.childNodes[n].style.bottom = "0.98rem";
					} else {
						if (sec.childNodes[n].style.bottom == "0.98rem") {
							this.remove();
						} else {
							for (var i = 0; i < sec.childNodes.length; i++) {
								if (sec.childNodes[i].style.bottom == "0.98rem") {
									sec.childNodes[i].style.bottom = "";
									//break;
								}
							}
							sec.childNodes[n].style.bottom = "0.98rem";
						}
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

