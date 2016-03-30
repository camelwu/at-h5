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
		/*card : ['<span data-code="2">护照</span>', '<span data-code="1">身份证</span>', '<span data-code="4">出生证明</span>', '<span data-code="5">港澳通行证</span>', '<span data-code="6">军官证</span>', '<span data-code="7">驾驶证</span>', '<span data-code="8">台胞证</span>', '<span data-code="3">回乡证</span>', '<span data-code="9">其他</span>'],*/
        card : ['<span data-code="2">护照</span>', '<span data-code="1">身份证</span>'],
		date : ['年', '月', '日'],
		time : ['<span>上午</span>', '<span>下午</span>'],
		comp : ['<span>&nbsp;</span>', '<span>&nbsp;</span>'],
		comp1 : ['<span>&nbsp;</span>'],
		seat:  ['<span>经济舱</span>','<span>超级经济舱</span>','<span>商务舱</span>','<span>头等舱</span>'],
        cardExpirationDate : ['年','月']
        
	},
	_time : ['birth', 'validity',"cardExpirationDate"],
	days : [29, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	// 初始化对象
	init : function(options) {
		this.id = options.id;
		this.type = options.type;
		this.cont = options.cont;
		this.cache[options.id] = "";
		this.inputEvent(options.id, options.type,options.cont);
		this.outClick();
		// 区域外事件绑定
	},
	// 创建最外层盒子，并设置盒子的样式&定位，绑定头部按钮事件
	createContainer : function(t) {
		var that = this, odiv = document.getElementById("selbox");
		document.body.style.overflowY='hidden';
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
			document.body.style.overflowY='hidden';
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
		var that = this, Warper, dataNode, lineNode, opeater;
		function setTime(t, s) {
			var Y = [];
			if (s == "年") {
				if (that.type == that._time[0]) {
					t = 0;
				}
				if (that.type == that._time[1] || that.type == that._time[2]) {
					t = 1;
				}
				var years = new Date().getFullYear();
				if (t <= 0) {//生日
					var i = years, l =1900 ;
					for (; i >= l; i--) {
						Y.push("<span>" + i + s + "</span>");
					}
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
				for (var i = 1; i <= that.days[1]; i++) {
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
						var str = that._template['comp'].join('') + that._template['card'].join('') + that._template['comp1'].join('');
						Creatwaprer(str);
						break;
					case 'seat':
						var str = that._template['comp'].join('') + that._template['seat'].join('') + that._template['comp1'].join('');
						Creatwaprer(str);
						break;
					case 'time':

						break;
                    case 'cardExpirationDate':
                        for (var i = 0, d = that._template['cardExpirationDate'], len = d.length; i < len; i++) {
							var str = setTime(i, d[i]);
							Creatwaprer(that._template['comp'].join('') + str + that._template['comp1'].join(''));
						}
                        break;
					default:
						//time
						for (var i = 0, d = that._template['date'], len = d.length; i < len; i++) {
							var str = setTime(i, d[i]);
							Creatwaprer(that._template['comp'].join('') + str + that._template['comp1'].join(''));
						}
						break;
				}
			}
			dataNode = $('.sel-time');
			// 默认选中
		 	for (var j = 0, length = dataNode.length; j < length; j++) {
				var _s = dataNode[j].childNodes, tem = false;
				for(var g = 0, lengt = _s.length; g < lengt ;g++){
                       if(_s[g]&&_s[g].className == 'date-selected'){
						   tem = true;
						   break;
					   }
				}
                if(!tem){
					_s[2].className = "date-selected";
				}
			}
		} else {
			opeater.innerHTML = that.selGetC(id);
			dataNode = $('.date-selected');
			// 默认选中
			for (var j = 0, len = dataNode.length; j < len; j++) {
				var pNode=dataNode[j].parentNode,pos = dataNode[j].offsetTop-50*2;
				$(pNode).scrollTop(pos);
			}
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
		var that = this, masker = document.getElementById("overlay"), container = document.getElementById("selbox");
		if (!that.masker) {
			that.masker = masker;
		}
		if (!that.container) {
			that.container = container;
		}
		if (s) {
			that.masker.style.display = 'block';
			that.container.style.bottom = 0;
			document.body.style.overflowY='hidden';
		} else {
			that.masker.style.display = 'none';
			that.container.setAttribute("style", "");
			setTimeout(function(){
				$('#selbox').remove();
				$('#overlay').remove();
			},200)
			document.body.style.overflowY='auto';
		}
	},
	// 重置
	selResetDay : function() {
		var that = this;
	},
	//选择结束
	selOver : function() {
		var that=this;
		var box = $('.sel-time .date-selected'), i = 0, len = box.length, opeater = document.getElementById("opeater"), arr = [];
		var ele = document.getElementById('' + opeater.getAttribute("data-id"));
		for (; i < len; i++) {
			arr.push(box[i].innerHTML);
		}
		if (/^(textarea|input|div)$/i.test(ele.nodeName)) {
			if(that.type == "birth"){
				var birthstr=arr.join("").replace('年','-').replace('月','-').replace('号','').replace('日','');
				if( ! vlm.Utils.compareBirth(birthstr))
				{
					jAlert('您选择的出生日期大于当前日期');
					return;
				}
				arr[0]=arr[0].replace('年','');
				arr[1]=that.addZero(parseInt(arr[1]));
				arr[2]=that.addZero(parseInt(arr[2]));
				if(ele.nodeName == 'DIV')
				{
					ele.innerHTML = arr.join("-");
				}
				ele.value = arr.join("-");

			}else if(that.type == "validity"){

				arr[0]=arr[0].replace('年','');
				arr[1]=that.addZero(parseInt(arr[1]));
				arr[2]=that.addZero(parseInt(arr[2]));
				if(ele.nodeName == 'DIV')
				{
					ele.innerHTML = arr.join("-");
				}
				ele.value = arr.join("-");
			}else if(that.type == 'cardExpirationDate'){
                ele.setAttribute("data-expire",arr[0].replace('年','')+"-"+that.addZero(parseInt(arr[1]))+"-01");
				var sYear=arr[0];
                arr[0]=that.addZero(parseInt(arr[1]));
                arr[1]=parseInt(sYear.substring(2));

				if(ele.nodeName == 'DIV')
				{
					ele.innerHTML = arr.join("-");
				}
                ele.value = arr.join("/");
            }else{
				$(ele).attr("data-code",$(box).attr("data-code")) //添加data-code属性
				ele.innerHTML = arr.join("");
			}

		}else{
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
		var sels = $('.sel-time'), i = 0, l = sels.length, that = this, m = 1;
		$(".sel-time").bind("scrollstart", function() {

		});
		//绑定滑动
		$(".sel-time").bind("scrollstop", function() {
			var obj = $(this), Nodes = this.childNodes, posY = this.scrollTop, p = parseInt(posY / 50), h = posY / 50 - p <= 0.5 ? p * 50 : (p + 1) * 50;
			if (posY / 50 - p > 0.5) {
				p++;
			}
			$(this).animate({
				scrollTop : h
			}, 300);
			for (var i = 0, l = Nodes.length; i < l; i++) {
				//console.log(i);
				if (Nodes[i])
					Nodes[i].className = i == p + 2 ? "date-selected" : "";
			}
			// 类型为时间，进行闰年闰月判定
			if (that.type == "birth" || that.type == "time") {
				//年滑动时
				if (obj.parent().index() == 0) {
					var oYear = parseInt(obj.children('span').eq((p + 2)).html());
					var oMonth = sels.eq(1).scrollTop() == 0 ? 1 : parseInt(sels.eq(1).children(".date-selected").html());
					var oDay = sels.eq(2).scrollTop() == 0 ? 1 : parseInt(sels.eq(2).children(".date-selected").html());
					// 闰年
					if ((oYear % 4 == 0 && oYear % 100 != 0) || oYear % 400 == 0) {
						m = 0;
					}
					if (oMonth == 2 && m == 0)
						ResetDay(that.days[0]);
					else
						ResetDay(that.days[oMonth]);
				}
				//月滑动时
				else if (obj.parent().index() == 1) {
					var oMonth = parseInt(obj.children("span").eq(p + 2).html());
					if (oMonth == 2 && m == 0)
						ResetDay(that.days[0]);
					else
						ResetDay(that.days[oMonth]);
				}
			}
		});
		//
		function ResetDay(day) {
			var oLiDay = sels.eq(2), pos = oLiDay.scrollTop(), page = parseInt(pos / 50), arr3 = [];
			for (var i = 1; i < day + 1; i++) {
				arr3.push('<span>' + i + '号</span>');
			}
			oLiDay.html(that._template['comp'].join('') + arr3.join('') + that._template['comp'].join(''));
			if (pos / 50 - page > 0.5) {
				page += 3;
			} else {
				page += 2;
			}
			oLiDay.children("span").eq(page).toggleClass('date-selected');
		}

	},
	// 确认和取消按钮事件
	btnEvent : function() {
		var that = this;
		$('.cabin-cancel').on("click", function() {
			that.selShow(0);
			$(document.body).css('overflowY','auto');
		});
		$('.cabin-sure').on("click", function() {
			that.selOver();
			if($('#popup_overlay'))
			{
				$(document.body).css('overflowY','hidden');
			}
			$(document.body).css('overflowY','auto');
		});
	},
	// 绑定操作对象的事件
	inputEvent : function(id, t, cid) {
		var that = this,cont;
		if(document.getElementById(cid)){
			cont = cid;
		}else{
			cont = id;
		}
		$("#" + cont).bind('click', function() {
			that.createContainer(id, t);
			that.drawData(id, t);
			that.type = t;
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
	},


	//补零
	addZero :function(n){
		return n<10 ? '0'+n:''+n;
	}
};
