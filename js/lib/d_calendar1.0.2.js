/**
 * @namespace _CalF
 * 日历控件所用便捷函数
 * */
_CalF = {
    // 选择元素
    $:function(arg,context){
        var tagAll,n,eles=[],i,sub = arg.substring(1);
        context = context||document;
        if(typeof arg =='string'){
            switch(arg.charAt(0)){
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if(context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = _CalF.$('*',context);
                    n = tagAll.length;
                    for(i = 0;i<n;i++){
                        if(tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
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
    bind:function(node,type,handler){
        node.addEventListener?node.addEventListener(type, handler, false):node.attachEvent('on'+ type, handler);
    },
    // 获取元素位置
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        pos = node.getBoundingClientRect();
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
};
/**
 * @name Calender
 * @constructor
 * @created by wusong
 * */
function Calender() {
	if(!arguments.length)return;
    this.initialize.apply(this, arguments);
	this.result=[];
}
Calender.prototype = {
    constructor:Calender,
    // 文字数组
    _word :{
    	h:['入住','离店'],
    	f:['去程','回程']
    },
    _tempmonth:[
        '<span class="prevmonth">prevmonth</span>',
        '<span class="nextmonth">nextmonth</span>',
    ],
    _tempweek:[
        '<dl class="ca_week">',
        '<dt class="date_title">日</dt>',
        '<dt class="date_title">一</dt>',
        '<dt class="date_title">二</dt>',
        '<dt class="date_title">三</dt>',
        '<dt class="date_title">四</dt>',
        '<dt class="date_title">五</dt>',
        '<dt class="date_title">六</dt>',
        '</dl>'
    ],
    // 模板数组
    _template :[
        '<dl>',
        '<dt class="title-date">',
        '</dt>',
        '<dd></dd>',
        '</dl>'],
    // 初始化对象
    initialize :function (options) {
        this.id = options.id; // input的ID
        this.num = options.num;//显示数量
        this.sClass1=options.sClass1;
        this.id2=options.id2;
        this.fn = options.fn;
        this.time = options.time;//已有时间
        this.op = 0;//已操作次数
        this.input = _CalF.$('#'+ this.id); // 获取INPUT元素
		this.inputEvent(); // input的事件绑定，获取焦点事件
        this.outClick(); // 区域外事件绑定
    },
    // 创建日期最外层盒子，并设置盒子的绝对定位
    createContainer:function(odate){
        // 如果存在，则移除整个日期层Container
        var odiv = _CalF.$('#'+ this.id + '-date');
        if(!!odiv) odiv.parentNode.removeChild(odiv);
        var container = this.container = document.createElement('div');
        container.id = this.id + '-date';
        container.style.position = "absolute";
        container.style.zIndex = 100;
        if(this.input.tagName === 'input'){
	        //PC输入框
	        var inputPos = _CalF.getPos(this.input);
	        // 根据input的位置设置container高度
	        container.style.left = inputPos.left + 'px';
	        container.style.top = inputPos.bottom - 1 + 'px';
        	// 设置日期层上的单击事件，仅供阻止冒泡，用途在日期层外单击关闭日期层
        	_CalF.bind(container, 'click', this.stopPropagation);
        	
        }else{
			//M站层
			container.style.background = "#f5f4f9";
	        container.style.overflow = 'auto';
	        container.style.width = container.style.height = '100%';
	        container.style.left = '0';
	        container.style.top = '0';
			container.style.paddingBottom = '118px';
	        //
	        var header = this.header = document.createElement('div');
	        header.id = this.id+"-header";
	        header.className = 'header';
            header.style.zIndex = 101;
	        header.innerHTML = '<a href="javascript:void(0);" class="header-back"><i class="icons go-back"></i></a><h3>选择日期</h3>';
	        document.body.appendChild(header);
	        
	        var weeker = document.createElement('div');
        	weeker.className = 'calendar';
        	weeker.style.marginTop = '45px';
        	weeker.innerHTML = this._tempweek.join('');
	        container.appendChild(weeker);
	        
	        var tiper = this.tiper = document.createElement('div');
	        tiper.id = this.id + '-tiper';
	        tiper.className = 'tipers';
	        tiper.innerHTML = "请选择入住日期";
	        container.appendChild(tiper);
        }
        document.body.appendChild(container);
    },
    // 渲染日期
    drawDate:function (odate) { // 参数 odate 为日期对象格式
        var dateWarp, titleDate, dd, year, month, date, days, weekStart,i,l,ddHtml=[],textNode;
        var nowDate = new Date(),nowyear = nowDate.getFullYear(),nowmonth = nowDate.getMonth(),nowdate = nowDate.getDate();
        this.dateWarp = dateWarp = document.createElement('div');
        dateWarp.className = 'calendar';
        dateWarp.innerHTML = this._template.join('');
        this.year = year = odate.getFullYear();
        this.month = month = odate.getMonth()+1;
        this.date = date = odate.getDate();
        this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
		tims = this.time;
		textNode = document.createTextNode(year + '年' + month + '月');
		titleDate.appendChild(textNode);
		//this.btnEvent();

        // 获取模板中唯一的DD元素
        dd = _CalF.$('dd',dateWarp)[0];
        // 获取本月天数
        days = new Date(year, month, 0).getDate();
        // 获取本月第一天是星期几
        weekStart = new Date(year, month-1,1).getDay();
        // 开头显示空白段
        for (i = 0; i < weekStart; i++) {
            ddHtml.push('<a>&nbsp;</a>');
        }
        // 循环显示日期
        for (i = 1; i <= days; i++) {
            if (year < nowyear) {
                ddHtml.push('<a class="disabled">' + i + '</a>');
            } else if (year == nowyear) {
                if (month < nowmonth + 1) {
                    ddHtml.push('<a class="live disabled">' + i + '</a>');
                } else if (month == nowmonth + 1) {
                    if (i < nowdate){
                    	ddHtml.push('<a class="live disabled">' + i + '</a>');
                    }else{
						m=month<10?'0'+month:month;
						d=i<10?'0'+i:i;
						if(tims[year+'-'+m+'-'+d]){
                            if(i == nowdate){
                                pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">今天</span><span class="live_txt"><span class="live_txt">'+ tims[year+'-'+m+'-'+d] +'</span></a>';
                            }else{
                                pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span><span class="live_txt">'+ tims[year+'-'+m+'-'+d] +'</span></a>';
                            }
						}else{
                            if(i == nowdate){
                                pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'">今天</a>';
                            }else{
                                pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>';
                            }
						}
						//i == nowdate?ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">今天</a>'):ddHtml.push(pstr);
                        ddHtml.push(pstr);
					}
                } else if (month == nowmonth + 2) {
					m=month<10?'0'+month:month;
					d=i<10?'0'+i:i;
					if(tims[year+'-'+m+'-'+d]){
						pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span><span class="live_txt">'+tims[year+'-'+m+'-'+d] +'</span></a>';
					}else{
						pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>';
					}
					ddHtml.push(pstr);
				} else {
                    ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>');
                }
            } else if (year > nowyear) {
                ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>');
            }
        }
        dd.innerHTML = ddHtml.join('');
        
        // 添加
        this.container.appendChild(dateWarp);
        //IE6 select遮罩
        var ie6  = !!window.ActiveXObject && !window.XMLHttpRequest;
        if(ie6) dateWarp.appendChild(this.createIframe());
        // A link事件绑定
        this.linkOn();
    },
    drawLastDate:function (odate) { // 参数 odate 为日期对象格式
        var dateWarp, titleDate, dd, year, month, date, days, weekStart,i,l,ddHtml=[],textNode;
        var nowDate = new Date(),nowyear = nowDate.getFullYear(),nowmonth = nowDate.getMonth(),nowdate = nowDate.getDate();
        this.dateWarp = dateWarp = document.createElement('div');
        dateWarp.className = 'calendar';
        dateWarp.innerHTML = this._template.join('');
        this.year = year = odate.getFullYear();
        this.month = month = odate.getMonth()+1;
        this.date = date = odate.getDate();
        this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
        tims = this.time;
        textNode = document.createTextNode(year + '年' + month + '月');
        titleDate.appendChild(textNode);
        //this.btnEvent();

        // 获取模板中唯一的DD元素
        dd = _CalF.$('dd',dateWarp)[0];
        // 获取本月天数
        days = new Date(year, month, 0).getDate();
        // 获取本月第一天是星期几
        weekStart = new Date(year, month-1,1).getDay();
        // 开头显示空白段
        for (i = 0; i < weekStart; i++) {
            ddHtml.push('<a>&nbsp;</a>');
        }
        // 循环显示日期
        for (i = 1; i <= days; i++) {
            if(i<=nowdate){
                ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>');
            }else{
                ddHtml.push('<a class="disabled">' + i + '</a>');
            }
        }
        dd.innerHTML = ddHtml.join('');

        // 添加
        this.container.appendChild(dateWarp);
        //IE6 select遮罩
        var ie6  = !!window.ActiveXObject && !window.XMLHttpRequest;
        if(ie6) dateWarp.appendChild(this.createIframe());
        // A link事件绑定
        this.linkOn();
    },
    createIframe:function(){
        var myIframe =  document.createElement('iframe');
        myIframe.src = 'about:blank';
        myIframe.style.position = 'absolute';
        myIframe.style.zIndex = '-1';
        myIframe.style.left = '-1px';
        myIframe.style.top = 0;
        myIframe.style.border = 0;
        myIframe.style.filter = 'alpha(opacity= 0 )';
        myIframe.style.width = this.container.offsetWidth + 'px';
        myIframe.style.height = this.container.offsetHeight + 'px';
        return myIframe;
    },
    // 移除日期DIV.calendar
    removeDate:function(){
        var that=this;
        var ov = _CalF.$('#'+ this.id + '-header');
        if(!!ov) ov.parentNode.removeChild(ov);
        var odiv = _CalF.$('#'+ this.id + '-date');
        if(!!odiv) odiv.parentNode.removeChild(odiv);
    },
    // 上一月，下一月按钮事件
    btnEvent:function(){
        var that = this,
        prevmonth = _CalF.$('.prevmonth',this.dateWarp)[0],
		nextmonth = _CalF.$('.nextmonth',this.dateWarp)[0];
        prevmonth.onclick = function(){
            var idate = new Date(that.year, that.month-2,that.date);
            that.drawDate(idate);
        };
        nextmonth.onclick = function(){
            var idate = new Date(that.year , that.month, that.date);
            that.drawDate(idate);
        };
    },
    // A 的事件
    linkOn:function(){
        var links = _CalF.$('.live',this.dd),i,l=links.length,that=this;
        for(i = 0;i<l;i++){
            links[i].index = i;
            // links[i].onmouseover = function(){
                // $(this).addClass("on");
            // };
            // links[i].onmouseout = function(){
                // $(this).removeClass("on");
            // };
            links[i].onclick = function(){
                if(that.input.tagName === 'input'){
                	$(this).css("border","1px solid #ff6a2f").css("z-index","9999999");
					$(this).siblings().css("border","").css("z-index","");
				}else{
					if(!(this.className.indexOf("disabled")>-1)){
						if(that.op==0){
							that.tiper.innerHTML = '请选择'+that._word.h[1]+'日期';
							that.linkReset(this.index);
							$(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.h[that.op]+'</span>');
                            $(this).addClass("disabled");
							that.op++;
						}else{
							$(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.h[that.op]+'</span>');that.op>=1?that.op=0:null;
							that.linkOver();
						}
					}
				}
           };
        }
    },
    linkOver:function(){
    	var sels = $('#'+ this.id +'-date .live_circle'),i,l=sels.length,that=this,arr=[];
		var out = _CalF.$('input',that.input);
        if(!out.length){
            out=_CalF.$('.'+this.sClass1,that.input);
        }
		var tal = _CalF.$('#'+this.id2,that.input);
        if(out[0].tagName=='INPUT'){
            for(i = 0;i<2;i++){
                arr.push(sels[i].parentNode.getAttribute("data-day"));
                out[i].value = sels[i].parentNode.getAttribute("data-day");
            }
        }else{
            arr.push(sels[0].parentNode.getAttribute("data-day"));
            arr.push(sels[1].parentNode.getAttribute("data-day"));
            out[0].innerHTML=sels[0].parentNode.getAttribute("data-day");
            out[1].innerHTML=sels[1].parentNode.getAttribute("data-day");
        }
        console.log(out[0]+':'+out[1]);
        var live_y=arr[0].split('-')[0];
        var live_m=arr[0].split('-')[1]-1;
        var live_d=arr[0].split('-')[2];
        var leave_y=arr[1].split('-')[0];
        var leave_m=arr[1].split('-')[1]-1;
        var leave_d=arr[1].split('-')[2];
        if(tal){
            tal.innerHTML = (Math.round((new Date(leave_y,leave_m,leave_d)-new Date(live_y,live_m,live_d))/(1000*60*60*24)));
        }
    	that.removeDate();
    	//that.header.parentNode.removeChild(that.header);
        if(typeof that.fn==='function'){
            that.fn();
        }
    },
	linkReset:function(ele){
		var that = this,
		ospan = $('.live_circle'),
		l=ospan.length,
		links = _CalF.$('.live',this.dd),
		len=links.length;
		//console.log(ospan[1].parentNode.outerHTML+ospan.length);
		if(that.op==0){
			for(var i=0;i<l;i++){
				var v = ospan[i].parentNode.getAttribute("data-day");
                //alert(v);
				var a = v.split("-");
				ospan[i].parentNode.innerHTML = a[a.length-1];
			}
			for(i=0;i<ele;i++){
				_CalF.addClass("disabled",links[i]);
			}
			for(i=ele+30;i<len;i++){
				_CalF.addClass("disabled",links[i]);
			}
			return false;
		}
	},
    // 表单的事件
    inputEvent:function(){
        var that = this;
        var date = new Date();
        var nowY = date.getFullYear();
        var nowM = date.getMonth();
        var nowD = date.getDate();
		_CalF.bind(this.input, 'click',function(){
            that.createContainer();
	        for(var i=0;i<that.num;i++){
                if(i==(that.num-1)){
                    var idate=new Date(nowY, nowM+i ,01);
                    that.drawLastDate(idate);
                }else{
                    var idate = new Date(nowY , nowM+i, 01);
                    that.drawDate(idate);
                }
	        }
		});
    },
    // 鼠标在对象区域外点击，移除日期层
    outClick:function(){
        var that = this;
        _CalF.bind(document, 'click',function(event){
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.className.indexOf("header-back")>-1){
            	that.removeDate();
            }
        });
    }
};

// var myDate1 = new Calender({id:'j_Date1'});