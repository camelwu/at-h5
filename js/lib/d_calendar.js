/**
 * @namespace _CalF
 * 日历控件所用便捷函数
 * */
_CalF = {
	// 选择元素
	$ : function(arg, context) {
		var tagAll, n, eles = [], i, sub = arg.substring(1);
		context = context || document;
		if ( typeof arg == 'string') {
			switch(arg.charAt(0)) {
			case '#':
				return document.getElementById(sub);
				break;
			case '.':
				if (context.getElementsByClassName)
					return context.getElementsByClassName(sub);
				tagAll = _CalF.$('*', context);
				n = tagAll.length;
				for ( i = 0; i < n; i++) {
					if (tagAll[i].className.indexOf(sub) > -1)
						eles.push(tagAll[i]);
				}
				return eles;
				break;
			default:
				return context.getElementsByTagName(arg);
				break;
			}
		}
	},
	// 绑定事件
	bind : function(node, type, handler) {
		node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
	},
	// 获取元素位置
	getPos : function(node) {
		var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft, scrollt = document.documentElement.scrollTop || document.body.scrollTop;
		pos = node.getBoundingClientRect();
		return {
			top : pos.top + scrollt,
			right : pos.right + scrollx,
			bottom : pos.bottom + scrollt,
			left : pos.left + scrollx
		};
	},
	// 添加样式名
	addClass : function(c, node) {
		node.className = node.className + ' ' + c;
	},
	// 移除样式名
	removeClass : function(c, node) {
		var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
		node.className = node.className.replace(reg, '');
	},
	// 阻止冒泡
	stopPropagation : function(event) {
		event = event || window.event;
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	}
};
/**
 * @name Calender
 * @constructor
 * @created by wusong
 * @parameter :id[]||'',num:Number,time[timestamp]||timestring,type:h||f||t,fn:callback
 * */
function Calender() {
	if (!arguments.length)
		return;
	this.initialize.apply(this, arguments);
}

Calender.prototype = {
	constructor : Calender,
	_word : {
		h : ['入住', '离店'],
		f : ['去程', '回程'],
		t : '游玩'
	},
	_tempmonth : ['<span class="prevmonth">prevmonth</span>', '<span class="nextmonth">nextmonth</span>'],
	_tempweek : ['<dt class="date_title">日</dt>', '<dt class="date_title">一</dt>', '<dt class="date_title">二</dt>', '<dt class="date_title">三</dt>', '<dt class="date_title">四</dt>', '<dt class="date_title">五</dt>', '<dt class="date_title">六</dt>'],
	_template : ['<dt class="title-date">', '</dt><dd>', '</dd>'],
	initialize : function(options) {
		this.num = options.num;
		this.time = options.time;
		this.type = options.type;
		this.range = options.range;
		this.fn = options.fn;
		this.id = options.id;
		this.input = document.getElementById("" + this.id);
		this.output = _CalF.$(options.output);
		this.op = 0;
		if ( typeof options.time === "string") {
			this.ops = 1;
		} else {
			if ( typeof options.time === "object") {
				var arr = Object.keys(options.time);
				this.ops = arr.length;
			}
		}
		this.inputEvent();
		this.outClick();
		function isArray(obj) {
			return Object.prototype.toString.call(obj) === '[object Array]';
		}

	},
	createContainer : function() {
		// 如果存在，则移除整个日期层Container
		var that = this, odiv = _CalF.$('#' + this.id + '-date'), intime = this.output, timobj = {}, date = new Date(), nowY = date.getFullYear(), nowM = date.getMonth(), nowD = date.getDate();
		for (var i = 0; i < intime.length; i++) {
			timobj[intime[i].innerHTML] = that.type != "t" ? that._word[that.type][i] : that._word[that.type];
		}
		that.time = timobj;
		if (!!odiv)
			odiv.parentNode.removeChild(odiv);
		//头部
		var header = this.header = document.createElement('div');
		header.id = this.id + "-header";
		header.className = 'header';
		header.innerHTML = '<a href="javascript:void(0);" class="header-back"><i class="icons go-back"></i></a><h3>选择日期</h3>';
		document.body.appendChild(header);
		var container = this.container = document.createElement('div');
		container.id = this.id + '-date';
		container.style.position = "absolute";
		container.style.zIndex = 98;
		container.style.background = "#f5f4f9";
		_CalF.bind(container, 'click', this.stopPropagation);
		//整体容器
		container.style.overflow = 'auto';
		container.style.width = container.style.height = '100%';
		container.style.left = '0';
		container.style.top = '0';
		container.style.paddingBottom = '118px';
		//提示
		var tiper = this.tiper = document.createElement('div');
		tiper.id = this.id + '-tiper';
		tiper.className = 'tipers';
		tiper.innerHTML = "请选择" + that._word[that.type] + "日期";
		container.appendChild(tiper);
		//内容
		var calendar = document.createElement('div');
		calendar.className = 'calendar';
		calendar.style.marginTop = '45px';
		container.appendChild(calendar);
		//星期
		var dl = document.createElement('dl');
		dl.innerHTML = this._tempweek.join('');
		calendar.appendChild(dl);
		if (that.range) {
			if (Object.prototype.toString.call(that.range) === '[object Array]') {
				var d = new Date(that.range[1]);
				var ly = d.getFullYear(), lm = d.getMonth();
				if (ly == nowY) {
					nums = lm - nowM + 1;
				} else if (ly > nowY) {
					nums = 13 - nowM + lm;
					nums = nums > 13 ? 13 : nums;
				}
			}
			that.num = nums;
		} else {
			nums = that.num;
		}
		for ( i = 0; i < nums; i++) {
			var d = new Date(nowY, nowM + i, 01), year = d.getFullYear(), month = d.getMonth() + 1;
			dl.innerHTML += this._template[0] + year + '年' + month + '月' + this._template[1] + '' + this._template[2];
		}
		//
		document.body.appendChild(container);
	},
	// 渲染日期
	drawDate : function() {
		var that = this, date = new Date(), nowY = date.getFullYear(), nowM = date.getMonth(), nowD = date.getDate(), dateWarp, titleDate, dd, year, month, days, weekStart, tims = this.time;
		dateWarp = this.dateWarp = _CalF.$('dl', that.container)[0];
		titleDate = _CalF.$('.title-date', dateWarp);
		dd = _CalF.$('dd', dateWarp);
		for (var j = 0; j < titleDate.length; j++) {
			console.log(titleDate[j].innerHTML.replace(/年/,"-").replace(/月/, "-") + "01");
			var tmp = titleDate[j].innerHTML.replace(/年/,"/").replace(/月/, "/") + "01";
			var od = new Date(tmp);
			year = od.getFullYear();
			month = od.getMonth() + 1;
			days = new Date(year, month, 0).getDate();
			weekStart = new Date(year, month - 1, 1).getDay();

			console.log(days);
			var ddHtml = [];
			for (var i = 0; i < weekStart; i++) {
				console.log(1);
				ddHtml.push('<a>&nbsp;</a>');
			}
			for ( i = 1; i <= days; i++) {
				if (year < nowY) {
					ddHtml.push('<a class="disabled">' + i + '</a>');
				} else if (year == nowY) {
					if (month < nowM + 1) {
						ddHtml.push('<a class="live disabled">' + i + '</a>');
					} else if (month == nowM + 1) {
						if (i < nowD) {
							ddHtml.push('<a class="live disabled">' + i + '</a>');
						} else {
							m = month < 10 ? '0' + month : month;
							d = i < 10 ? '0' + i : i;
							var istr = i == nowD ? '今天' : i;

							if (tims[year + '-' + m + '-' + d] || tims[year + '-' + month + '-' + i]) {
								var strs = tims[year + '-' + m + '-' + d] ? tims[year + '-' + m + '-' + d] : tims[year + '-' + month + '-' + i];
								pstr = '<a class="live" data-day="' + year + '-' + month + '-' + i + '"><span class="live_circle">' + istr + '</span><span class="live_txt">' + strs + '</span></a>';
							} else {
								pstr = '<a class="live" data-day="' + year + '-' + month + '-' + i + '">' + istr + '</a>';
							}
							ddHtml.push(pstr);
						}
					} else {
						m = month < 10 ? '0' + month : month;
						d = i < 10 ? '0' + i : i;
						if (tims[year + '-' + m + '-' + d] || tims[year + '-' + month + '-' + i]) {
							var strs = tims[year + '-' + m + '-' + d] ? tims[year + '-' + m + '-' + d] : tims[year + '-' + month + '-' + i];
							pstr = '<a class="live" data-day="' + year + '-' + month + '-' + i + '"><span class="live_circle">' + i + '</span><span class="live_txt">' + strs + '</span></a>';
						} else {
							pstr = '<a class="live" data-day="' + year + '-' + month + '-' + i + '">' + i + '</a>';
						}
						ddHtml.push(pstr);
					}
				} else {
					ddHtml.push('<a class="live" data-day="' + year + '-' + month + '-' + i + '">' + i + '</a>');
				}
			}
			//console.log(ddHtml);
			dd[j].innerHTML = ddHtml.join('');
		}
		// A link事件绑定
		this.linkOn();
	},
	// 移除日期DIV.calendar
	removeDate : function() {
		var that = this, odiv = _CalF.$('#' + that.id + '-date');
		if (!!that.header)
			that.header.parentNode.removeChild(that.header);
		if (!!odiv)
			odiv.parentNode.removeChild(odiv);
	},
	// A 的事件
	linkOn : function() {
		var links = _CalF.$('.live', this.dateWarp), i, l = links.length, that = this, ary = that._word[that.type];
		for ( i = 0; i < l; i++) {
			links[i].index = i;
			links[i].onclick = function() {
				if (that.input.tagName === 'input') {
					$(this).css("border", "1px solid #ff6a2f").css("z-index", "9999999");
					$(this).siblings().css("border", "").css("z-index", "");
				} else {
					if (!(this.className.indexOf("disabled") > -1)) {
						if (that.op < that.ops) {
							that.tiper.innerHTML = '请选择' + that._word.h[1] + '日期';
							that.linkReset(this.index);
							var cache = this.innerHTML, word = ( typeof ary === "string") ? ary : ary[that.op];
							$(this).html('<span class="live_circle">' + cache + '</span><span class="live_txt">' + word + '</span>');
							that.op++;
							that.op == that.ops ? that.linkOver() :
							void (0);
						} else {
							var cache = this.innerHTML, word = ( typeof ary === "string") ? ary : ary[that.op];
							$(this).html('<span class="live_circle">' + cache + '</span><span class="live_txt">' + word + '</span>');
							that.linkOver();
						}
					}
				}
			};
		}
	},
	linkOver : function() {
		var sels = $('#' + this.id + '-date .live_circle'), i, l = sels.length, that = this, arr = [];
		that.op == that.ops ? that.op = 0 : null;
		var out = that.output ? that.output : _CalF.$('input', that.input);
		var tal = _CalF.$('#total_day', that.input) ? _CalF.$('#total_day', that.input) : _CalF.$('#total_day', that.output);
		for ( i = 0; i < l; i++) {
			arr.push(sels[i].parentNode.getAttribute("data-day"));
			out[i].tagName === 'input' ? out[i].value = sels[i].parentNode.getAttribute("data-day") : out[i].innerHTML = sels[i].parentNode.getAttribute("data-day");
		}
		that.removeDate();
		if (that.fn) {
			that.fn(true);
		} else {
			tal ? tal.innerHTML = (Math.round((new Date(arr[1]) - new Date(arr[0])) / (1000 * 60 * 60 * 24))) :
			void (0);
		}
	},
	linkReset : function(ele) {
		var that = this, ospan = $('.live_circle'), l = ospan.length, links = _CalF.$('.live', this.dd), len = links.length;
		if (that.op == 0) {
			for (var i = 0; i < l; i++) {
				var v = ospan[i].parentNode.getAttribute("data-day");
				var a = v.split("-");
				ospan[i].parentNode.innerHTML = a[a.length - 1];
			}
			for ( i = 0; i < ele; i++) {
				_CalF.addClass("disabled", links[i]);
			}
			for ( i = ele + 30; i < len; i++) {
				_CalF.addClass("disabled", links[i]);
			}
			return false;
		}
	},
	inputEvent : function() {
		var that = this;
		_CalF.bind(this.input, 'click', function() {
			that.createContainer();
			that.drawDate();
		});
	},
	outClick : function() {
		var that = this;
		_CalF.bind(document, 'click', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			if (target.className.indexOf("header-back") > -1) {
				that.removeDate();
			}
		});
	}
};
