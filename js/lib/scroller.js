/**
 * @name Slider Widget
 * @constructor
 * @created by wusong
 * */
function Scroller() {
	if (!arguments.length)
		return;
	if (jQuery) {
		this.init.apply(this, arguments);
	} else {
		alert("需要jQuery!");
	}
}

Scroller.prototype = {
	constructor : Scroller,
	// 缓存
	cache : {},
	// 按钮数组
	_btn : ['<span class="fl cabin-cancel" style="margin-left: 10px;color:#999;">取消</span>', '<span class="fr cabin-sure" style="margin-right: 10px;color: #ffb413;">确定</span>'],
	// 模板数组
	_template : {
		card : ['<span>身份证</span>', '<span>护照</span>', '<span>港澳通行证</span>', '<span>军官证</span>', '<span>驾驶证</span>', '<span>台胞证</span>', '<span>回乡证</span>', '<span>户口本</span>', '<span>出生证明</span>', '<span>其他</span>'],
		date : ['年', '月', '日'],
		time : ['<span>上午</span>', '<span>下午</span>'],
		comp : ['<span>&nbsp;</span>', '<span>&nbsp;</span>']
	},
	// 初始化对象
	init : function(options) {
		this.id = options.id;
		this.type = options.type;
		//显示类型
		this.cont = options.cont;
		//需要插入的数据
		this.cache[options.id] = "";
		this.inputEvent(options.id, options.type);
		// input的事件绑定，获取焦点事件
		this.outClick();
		// 区域外事件绑定
	},
	// 创建最外层盒子，并设置盒子的样式&定位，绑定头部按钮事件
	createContainer : function(t) {
		var that = this, odiv = document.getElementById("selbox");
		if (!!odiv) {
			this.masker = document.getElementById("overlay");
			this.container = odiv;
			this.opeater = document.getElementById("opeater");
		} else {//不存在
			//新增遮罩层并设定样式
			var masker = this.masker = document.createElement('div');
			masker.id = "overlay";
			masker.className = "mask";
			masker.style.top = '0';
			document.body.appendChild(masker);
			//新增容器层并设定样式、属性
			var container = this.container = document.createElement('div');
			container.id = "selbox";
			container.className = "selbox-footer";
			//新增头部按钮层并设定样式
			var header = document.createElement('div');
			header.id = "header";
			header.innerHTML = that._btn.join('');
			container.appendChild(header);
			//新增选择框并设定样式
			var opeater = this.opeater = document.createElement('ul');
			opeater.id = "opeater";
			opeater.className = 'selbox-ul';
			opeater.setAttribute("data-id", t);
			opeater.setAttribute("data-type", that.type);
			//自定义属性
			container.appendChild(opeater);
			document.body.appendChild(container);
			//头部按钮绑定
			this.btnEvent();
		}
	},
	// 渲染内容
	drawData : function(id, t) {
		var that = this, Warper, dataNode, lineNode, days = [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], opeater;
		function setTime(t, s) {
			var Y = [];
			if (s == "年") {
				var years = new Date().getFullYear();
				if (t <= 0) {//生日
					var i = 1900, l = years;
				} else if (t == 1) {//有效期
					var i = years, l = years + 30;
				} else {//游玩时间
					var i = years, l = years + 1;
				}
				for (; i <= l; i++) {
					Y.push("<span>" + i + s + "</span>");
				}
			} else if (s == "月") {
				for (var i = 1; i <= 12; i++) {
					Y.push("<span>" + i + s + "</span>");
				}
			} else {
				var m = new Date().getMonth(), d = new Date().getDate();
				for (var i = 1; i <= 31; i++) {
					Y.push("<span>" + i + s + "</span>");
				}
			}
			return Y.join('');

		}

		function Creatwaprer(str) {
			Warper = document.createElement('li');
			// 添加内容
			dataNode = document.createElement('div');
			dataNode.className = 'sel-time';
			dataNode.innerHTML = str;
			Warper.appendChild(dataNode);
			// 添加横线
			lineNode = document.createElement('div');
			lineNode.className = 'sel-box';
			Warper.appendChild(lineNode);
			that.opeater.appendChild(Warper);
		}

		opeater = document.getElementById("opeater");
		if (opeater.getAttribute("data-id") != id && opeater.innerHTML != "") {//类型不同需缓存
			this.selCache(id);
		}
		if (that.selGetC(id) == "") {
			if (opeater.innerHTML == "") {
				switch(t) {
					case 'card':
						var str = that._template['comp'].join('') + that._template['card'].join('') + that._template['comp'].join('');
						Creatwaprer(str);
						break;
					case 'time':

						break;
					default:
						//time
						for (var i = 0, d = that._template['date'], len = d.length; i < len; i++) {
							var str = setTime(i, d[i]);
							Creatwaprer(that._template['comp'].join('') + str + that._template['comp'].join(''));
						}
						break;
				}
			}
			//dataNode = that._template['comp'].join('') + str + that._template['comp'].join('');
			//补全
		} else {
			opeater.innerHTML = that.selGetC(id);
		}
		// 事件绑定
		this.scrollOn();
		//内容更新完毕，重定义属性
		opeater.setAttribute("data-id", id);
		opeater.setAttribute("data-type", t);
		this.selShow(1);
	},
	selCache : function(t) {
		var that = this, opeater = document.getElementById("opeater");
		if (opeater.innerHTML != "") {//原来有内容需缓存
			that.cache[opeater.getAttribute("data-id")] = opeater.innerHTML;
			opeater.innerHTML = "";
		}
	},
	// 显示隐藏
	selShow : function(s) {
		var that = this,masker = document.getElementById("overlay");
		if(!that.masker){that.masker = masker;}
		if (s) {
			that.masker.style.display = 'block';
			that.container.style.bottom = 0;
		} else {
			that.masker.style.display = 'none';
			that.container.setAttribute("style", "");
		}
	},
	// 重置
	selReset : function() {
		var that = this;
	},
	//选择结束
	selOver : function() {
		var box = $('.sel-time .date-selected'), i = 0, len = box.length, opeater = document.getElementById("opeater"), arr = [];
		var ele = document.getElementById('' + opeater.getAttribute("data-id"));
		for (; i < len; i++) {
			arr.push(box[i].innerHTML);
		}
		if (/^(textarea|input)$/i.test(ele.nodeName)) {
			ele.value = arr.join("");
		} else {
			ele.innerHTML = arr.join("");
		}

		this.selShow(0);
	},
	//选择重置
	selGetC : function(t) {
		var that = this, str = '';
		for (var i in that.cache) {
			if (i == t) {
				str = that.cache[i];
				break;
			}
		}
		return str;
	},
	// 滑动事件
	scrollOn : function() {
		var sels = $('.sel-time'), i = 0, l = sels.length, that = this;
		//for(;i<l;i++){
		$(".sel-time").bind("scrollstop", function() {
			var obj = $(this), posY = this.scrollTop, p = parseInt(posY / 39), h = posY / 39 - p <= 0.5 ? p * 39 : (p + 1) * 39;
			if (posY / 39 - p > 0.5) {
				p++;
			}
			console.log(posY + "," + p + "," + h + "==" + (posY / 39 - p) + "=" + (posY / 39 - p <= 0.5));
			$(this).animate({
				scrollTop : h
			}, 300);
			$(this).children("span").removeClass('date-selected');
			$(this).children("span").eq((p + 2)).addClass('date-selected');

			//年滑动时
			if (obj.parent().index() == 0) {
				var oNewYear = parseInt(obj.children('span').eq((p + 2)).html());
				var month = parseInt($('#mon').children(".date-selected").html());
				//showday(month, p);
			}
			//月滑动时
			else if (obj.parent().index() == 1) {
				var month = parseInt(obj.children("span").eq(p + 2).html());
				//showday(month, p);
			}
		});
		//}
	},
	// 确认和取消按钮事件
	btnEvent : function() {
		var that = this;
		$('.cabin-cancel').on("click", function() {
			that.selShow(0);
		});
		$('.cabin-sure').on("click", function() {
			that.selOver();
		});
	},
	// 绑定操作对象的事件
	inputEvent : function(id, t) {
		var that = this;
		$("#" + that.id).bind('click', function() {
			that.createContainer(id, t);
			that.drawData(id, t);
		});
	},
	// 对象区域外点击，隐藏
	outClick : function() {
		var that = this;
		$(document).bind('click', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			if (target.className.indexOf("mask") > -1) {
				that.selShow(0);
			}
		});
	}
};
