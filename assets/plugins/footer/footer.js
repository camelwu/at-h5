/*
 * 底部菜单
 * 创建底部菜单，id,class会有不同,每个页面只有一个底部，多个筛选条件
 * [
 *  "hotelSort":{title:"推荐排序",class:"t",type:0,key:,listData:[]},
 *  "hotelSect":{title:"推荐排序",class:"t",type:0,key:,listData:[]}
 * ]
 */
var footer = (function() {
	"use strict";
	// 定义全局cache，随时替换
	var node,
	// 遮罩
	masker,
	// 菜单盒子
	box,
	// 盒子中选择
	sec,
	// 实例
	instance,
	// 已选择的内容cache
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
			that.on(box, 'click', function(event) {
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
			// masker层里的各种点击：取消，确定按钮
			that.on(masker, 'click', function() {
				event = event || window.event;
				var target = event.target || event.srcElement, src, index, cur;
				src = target.parentNode;
				if (target == masker) {
					that.remove();
				} else if (target.className == "cancel") {
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
							// 单选
							var cur = src.getElementsByClassName("cur");
							for (var i = 0; i < cur.length; i++) {
								if (cur[i].className == "cur") {
									cur[i].className = "";
									break;
								}
							}
							target.className = "cur";
							// 多选
							/*
							 *target.className = target.className == "cur"?"":"cur";
							 */
						}
					}
				}

			});
			// 遮罩层点击，隐藏

		},
		// 新建筛选：列表&菜单
		create : function() {
			//overlay
			this.createMask("hotelPop", "footer_filter");
			//create menu
			box = document.createElement('footer');
			box.className = 'footer_filter_btn ';
			if (!1) {
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
				ca.push('<dl class=' + data[p].c + ' id=' + p + '><dt></dt><dd>' + data[p].title + '</dd></dl>');
				this.createSec(data[p].c, data[p].listData, data[p].type);
			}
			box.innerHTML = ca.join('');
			document.body.appendChild(box);
			this.bindEvent();
			return this;
		},
		// masker
		createMask : function(id, c) {
			if (!masker) {
				masker = document.createElement('div');
				id ? masker.id = id : null;
				c ? masker.className = c : null;
				masker.style.display = "none";
				if (!id && !c) {
					masker.style.position = 'fixed';
					masker.style.left = 0;
					masker.style.top = 0;
					masker.style.width = '100%';
					masker.style.height = '100%';
					masker.style.background = 'rgba(0,0,0,0.6)';
					masker.style.zIndex = 20;
				}
				document.body.appendChild(masker);
				return this;
			} else {
				return false;
			}
		},
		// section
		createSec : function(c, d, t) {
			var str = '', mysec = document.createElement('section'), i = 0, l = d.length;
			c ? mysec.className = c : null;
			if (t == 2) {
				str = '<div class="screen_btn"><p class="cancel">取消</p><p class="clears">清空筛选</p><p class="sure">确定</p></div>';
			}

			if ( typeof d[0] == "string") {// 普通数组
				str += '<ul>' + ilist(d) + '</ul>';
			} else {// json对象
				var left, right, css, s = 0;
				str += '<div class="screen_box">';
				// 左侧菜单
				left = '<ul class="screen_lf" id="screenLeft">';
				right = '<div class="screen_rg">';
				for (; i < l; i++) {
					right += '<ul>';
					for (var k in d[i]) {
						right += ilist(d[i][k]);
						css = s == 0 ? ' class="cur"' : '';
						left += '<li' + css + '>' + k + '</li>';
						s++;
					}
					right += '</ul>';
				}
				left += '</ul>';
				str += left + right + '</div>';
			}

			mysec.innerHTML = str;
			if (masker) {
				masker.appendChild(mysec);
			} else {
				document.body.appendChild(mysec);
			}
			return this;
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
		},

		on : function(node, type, handler) {
			node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
		},
		remove : function() {
			masker.style.display = "none";
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
      var cur = masker.getElementsByClassName("cur");
      var ul = masker.getElementsByTagName("ul");
      for ( var i = 1; i < ul.length; i++) {
        var uls = ul[i+1];
        var li = uls.getElementsByTagName("li");
        for(var k=0; k < li.length;k++){
          li[k].className = '';
        }
        li[0].className = 'cur';
      }
      return this;
    },
		showItems : function(n) {
			// 显示要筛选的列表内容
			if (masker) {
				sec = masker.getElementsByTagName("section");
				if (masker.style.display == "none") {
					masker.style.display = "block";
					masker.children[n].style.bottom = "0.98rem";
				} else {
					if (masker.children[n].style.bottom == "0.98rem") {
						masker.children[n].style.bottom = "";
						this.remove();
					} else {
						for (var i = 0; i < sec.length; i++) {
							if (sec[i].style.bottom == "0.98rem") {
								sec[i].style.bottom = "";
								break;
							}
						}
						masker.children[n].style.bottom = "0.98rem";
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
/* 显示数据
 * id作为键值
 * title：显示中文
 * c：className
 * type：0底部按钮直接点击，1按钮触发列表显示 点击列表直接查询回调，2同1，但为多选，点击确认按钮进行查询
 */
//var menu_data = {
//	hotelSort : {
//		title : "推荐排序",
//		c : "footer_filter_hotel_sort",
//		type : 1,
//		key : 'sort',
//		listData : ["价格从高到低", "价格从低到高", "评分从高到低", "星级从高到低", "星级从低到高"]
//	},
//	hotelScreen : {
//		title : "筛选",
//		c : "footer_filter_hotel_screen",
//		type : 2,
//		key : 'starRatingList',
//		listData : [{
//			"星级档次" : ["二星", "三星", "四星"]
//		}, {
//			"酒店类型" : ["商务", "度假"]
//		}]
//	},
//	hotelPosition : {
//		title : "位置",
//		c : "footer_filter_hotel_position",
//		type :2,
//		key : 0,
//		listData : ["Sentosa Island", "Bugis", "Orchard Vicinity", "Marina", "Geylang", "City Hall", "Chinatown", "Orchard"]
//	}
//},
////
//menu_call = function() {
//	alert("js request json.");
//};
//;
//
//if (footer) {
//	footer.data = menu_data;
//	footer.callback = menu_call;
//}
//footer.filters.init();
