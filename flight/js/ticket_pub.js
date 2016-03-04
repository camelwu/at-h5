//日期函数及修改函数
function TicketDate(argument){
    Calender.call(this,argument)
}
TicketDate.prototype = new Calender();

TicketDate.prototype.linkColor=function(type,date){
    var that = this, links = _CalF.$('.live',this.dd), startIndex,endIndex;
    if(type == 'Return'&&date==undefined){
        for(var st = 0;st < links.length;st++) {
            if(links[st].querySelector('.live_txt')&&links[st].querySelector('.live_txt').innerHTML=='去程'){
                startIndex=st;
            }
            if(links[st].querySelector('.live_txt')&&links[st].querySelector('.live_txt').innerHTML=='返程'){
                endIndex=st;
            }
        }
        for(var t = startIndex; t < endIndex;t++){
            _CalF.addClass("yellow",links[t]);
        }
    }else{
        for(var sn = 0;sn < links.length;sn++) {
            var temStr = /(\d{1,2})/g.exec(links[sn].innerHTML);
            if(links[sn].getAttribute('data-day') == date){
                links[sn].innerHTML = '<span class="live_circle">'+temStr[0];
            }else{
                if(temStr){
                    links[sn].innerHTML =temStr[0]!=null?temStr[0]:'';
                }
            }
        }
    }
    return false;
};

TicketDate.prototype._word = {h:['入住','离店'],f:['去程','返程']};

TicketDate.prototype.initialize =function (options) {
    this.type = options.type;
    this.id = options.id;
    this.num = options.num;
    this.sClass1=options.sClass1;
    this.id2=options.id2;
    this.fn = options.fn;
    this.time = options.time;
    this.op = 0;
    this.input = _CalF.$('#'+ this.id);
    this.inputEvent();
    this.outClick();
};

TicketDate.prototype.createContainer = function(odate){
    // 如果存在，则移除整个日期层Container
    var odiv = _CalF.$('#'+ this.id + '-date');
    if(!!odiv) odiv.parentNode.removeChild(odiv);
    var container = this.container = document.createElement('div');
    container.id = this.id + '-date';
    container.style.position = "absolute";
    container.style.zIndex = 98;
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
        this.type=='Oneway'?header.style.height = "45px":void(0);
        header.innerHTML = this.type=='Oneway'?'<a href="javascript:void(0);" class="icons header-back"></a><h3>选择日期</h3>':'<a href="javascript:void(0);" class="icons header-back"></a><h3>选择日期</h3><p class="choose-week-tip">选择日期为出发地日期</p>';
        document.body.appendChild(header);

        var weeker = document.createElement('div');
        weeker.className = 'calendar';
        weeker.style.marginTop=this.type=='Oneway'? '4.5rem':'6.8rem';
        weeker.innerHTML = this._tempweek.join('');
        container.appendChild(weeker);

        var tiper = this.tiper = document.createElement('div');
        tiper.id = this.id + '-tiper';
        tiper.className = 'tipers';

        tiper.innerHTML = "请选择去程日期";
        this.type=='Oneway'?void(0):container.appendChild(tiper);
    }
    document.body.appendChild(container);
};

TicketDate.prototype.drawDate = function (odate) {
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
                    if(tims[year+'-'+m+'-'+d]&&this.type=="Return"){
                        pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span><span class="live_txt">'+ tims[year+'-'+m+'-'+d] +'</span></a>';
                    }else if(tims[year+'-'+m+'-'+d]&&this.type=="Oneway"){
                        pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span></a>';
                    }else{
                        pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>';
                    }
                    i == nowdate?ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">今天</a>'):ddHtml.push(pstr);
                }
            } else if (month == nowmonth + 2) {
                m=month<10?'0'+month:month;
                d=i<10?'0'+i:i;
                if(tims[year+'-'+m+'-'+d]&&this.type=="Return"){
                    pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span><span class="live_txt">'+tims[year+'-'+m+'-'+d] +'</span></a>';
                }else if(tims[year+'-'+m+'-'+d]&&this.type=="Oneway"){
                    pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span></a>';
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
    var ie6  = !!window.ActiveXObject && !window.XMLHttpRequest;
    if(ie6) dateWarp.appendChild(this.createIframe());
    this.linkOn();
};

TicketDate.prototype.linkOn = function(){
    var links = _CalF.$('.live',this.dd),i,l=links.length,that=this;
    for(i = 0;i<l;i++){
        links[i].index = i;
        links[i].onclick = function(event){
            if(that.input.tagName === 'input'){
                $(this).css("border","1px solid #ff6a2f").css("z-index","9999999");
                $(this).siblings().css("border","").css("z-index","");
            }else{
                if(!(this.className.indexOf("disabled")>-1)){
                    if(that.type == 'Oneway'){
                        that.linkOver(event);
                    }else{
                        if(that.op==0){
                            that.tiper.innerHTML = '请选择'+that._word.f[1]+'日期';
                            that.linkReset(this.index);
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.f[that.op]+'</span>');
                            that.op++;
                            that.cache = this.getAttribute('data-day');
                        }else if(that.op==1&&this.getAttribute('data-day')!=that.cache){
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.f[that.op]+'</span>');that.op>=1?that.op=0:null;
                            that.tiper.style.display = 'none';
                            that.linkOver();
                            that.linkColor('Return');
                        }else if(that.op==1&&this.getAttribute('data-day')==that.cache){
                            that.tiper.innerHTML = '返程日期需大于去程日期';
                        }
                    }
                }
            }
        };
    }
    this.linkColor('Return')
};

TicketDate.prototype.linkOver = function(event){
    var sels = $('#'+ this.id +'-date .live_circle'),i,l=sels.length,that=this,arr=[];
    var out = _CalF.$('input',that.input);
    if(!out.length){
        out=_CalF.$('.'+this.sClass1,document);
    }

    if(this.type != 'Oneway'){
        var tal = _CalF.$('#'+this.id2,that.input);
        if(out[0].tagName=='INPUT'){
            for(i = 0;i<2;i++){
                arr.push(sels[i].parentNode.getAttribute("data-day"));
                out[i].value = sels[i].parentNode.getAttribute("data-day");
            }
        }else{
            arr.push(sels[0].parentNode.getAttribute("data-day"));
            arr.push(sels[1].parentNode.getAttribute("data-day"));
            out[0].innerHTML=returnWeek(sels[0].parentNode.getAttribute("data-day"));
            if(out[1]){out[1].innerHTML=returnWeek(sels[1].parentNode.getAttribute("data-day"));}
        }
        if(tal){
            tal.innerHTML = (Math.round((new Date(arr[1])-new Date(arr[0]))/(1000*60*60*24)));
        }
    }else{
        var event = event || window.event;
        var target = event.target || event.srcElement,dateSTr='';
        if(target.tagName == 'A'){
            dateSTr = target.getAttribute('data-day');
            that.linkColor('Oneway',dateSTr);
            out[0].innerHTML=returnWeek(dateSTr);
        }else if(target.tagName == 'SPAN'){
            dateSTr = target.parentNode.getAttribute('data-day');
            that.linkColor('Oneway',dateSTr);
            out[0].innerHTML=returnWeek(dateSTr);
        }
    }
    that.timer = window.setTimeout(function(){
        that.removeDate();
        if(that.header.parentNode){
            that.header.parentNode.removeChild(that.header);
        }
        if(typeof that.fn==='function'){
            that.fn();
            window.clearTimeout(that.timer);
            that.timer = null;
        }
    },1000);

    function returnWeek(arg){
        if(arg){
            var week,array,index = new Date(arg.replace(/-/g, "/")).getDay();
            switch (index){
                case 0 :
                    week = '周日';
                    break;
                case 1 :
                    week = '周一';
                    break;
                case 2 :
                    week = '周二';
                    break;
                case 3 :
                    week = '周三';
                    break;
                case 4 :
                    week = '周四';
                    break;
                case 5 :
                    week = '周五';
                    break;
                case 6 :
                    week = '周六';
                    break;
                default :
                    void(0);
            }
            array = arg.split('-');
            array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
            array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
            return '<span class="dateNumber">'+array[1]+'月'+array[2]+'日'+'</span>'+' '+'<span>'+week+'</span>';
        }
    }
};

TicketDate.prototype.linkReset =function(ele){
    var that = this,
        ospan = $('.live_circle'),
        links = _CalF.$('.live',this.dd),
        startIndex,endIndex;

    if(that.op==0){
        for(var i=0;i<ospan.length;i++){

            var v = ospan[i].parentNode.getAttribute("data-day");
            var a = v.split("-");
            ospan[i].parentNode.innerHTML = a[a.length-1];
        }
        for(i=0;i<ele;i++){
            _CalF.addClass("disabled",links[i]);
        }
        for(i=ele+30;i<links.length;i++){
            _CalF.addClass("disabled",links[i]);
        }
        return false;
    }
};
var  conditionalFiltering = {

    addHandler: function (target, eventType, handle) {
        if (document.addEventListener) {
            this.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            this.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            this.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        this.addHandler(target, eventType, handle);
    },
    createTags:function(tripType, sinOrDou, callback){
        var tripType = this.tripType, sinOrDou = this.sinOrDou, fn = this.fn;
        //生成标签

        var backShadow = document.createElement('div');
        backShadow.className = 'r-shadow';
        backShadow.id = 'r-shadow';

        var oDiv = document.createElement('div');  //最大的外城div
        oDiv.className = "filter-wrap";

        var baseTitle =  document.createElement('div');  //底部横显标题
        baseTitle.className = "hl-bottom";

        var leftModal =  document.createElement('div');  //最左测的弹出框
        leftModal.className = "reset-action";
        leftModal.id = "filter-modal";

        var middleModal =  document.createElement('ul');  //中间的弹出框
        middleModal.id = "time-modal";

        var rightModal =  document.createElement('ul');  //右侧的弹出框
        rightModal.id = "price-modal";

        if(tripType =='domestic'){  //国内
            if(sinOrDou == 'Oneway'){  //国内单程
                baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i>' +
                '<span class="filter-select">筛选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class=""></i><span'+
                '  class="filter-select">优选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_lo" data-price-type="domestic"><b class="hl-icon3 filter-price"></b><i class=""></i><span'+
                ' class="filter-select">价格</span>'+  /*点击价格没有弹出框，直接变化价格展示*/
                '</div>';

                leftModal.innerHTML = '    <div class="reset-action-wrap">'+
                '<div class="reset-action-item hot">取消</div>'+
                '<div class="reset-action-item">重置</div>'+
                '<div class="reset-action-item">确定</div>'+
                '</div>'+

                '<div class="reaction-detail" id="reaction-detail">'+
                '<ul class="filter-bottom" id="filter-bottom">'+
                '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
                '<li class="filter-title" data-info="sh">共享航班</li>'+
                '<li class="filter-title" data-info="du">起飞时段</li>'+
                '<li class="filter-title" data-info="se">舱位</li>'+
                '</ul>'+
                '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
                '<ul class="add only-direct-fly" id="only-direct-fly">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add filter-share" id="filter-share" style="display: none">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">隐藏共享航班<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add set-time-duration" id="set-time-duration" style="display: none">'+
                '<li class="tag-item active" data-i="0024">不限<b></b></li>'+
                '<li class="tag-item" data-i="0006">00:00-06:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="0612">06:00-12:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="1218">12:00-18:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="1824">18:00-24:00<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
                '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="Business">公务舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
                '</ul>'+
                '</div>'+
                '</div>';
                middleModal.innerHTML =
                    '<li class="time-modal-item active" data-i="false"><b></b>从早到晚</li>'+
                    '<li class="time-modal-item" data-i="true"><b></b>从晚到早</li>'
                rightModal.innerHTML =''

            }else{                   //国内往返
                baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i>' +
                '<span class="filter-select">筛选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class=""></i>' +
                '<span class="filter-select">优选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_lo" data-price-type="domestic"><b class="hl-icon3 filter-price"></b><i class=""></i><span'+
                ' class="filter-select">价格</span>'+   // /*点击价格弹出框（含税与不含税，前端计算）/
                '</div>';

                leftModal.innerHTML = '    <div class="reset-action-wrap">'+
                '<div class="reset-action-item hot">取消</div>'+
                '<div class="reset-action-item">重置</div>'+
                '<div class="reset-action-item">确定</div>'+
                '</div>'+

                '<div class="reaction-detail" id="reaction-detail">'+
                '<ul class="filter-bottom" id="filter-bottom">'+
                '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
                '<li class="filter-title" data-info="sh">共享航班</li>'+
                '<li class="filter-title" data-info="se">舱位</li>'+
                '</ul>'+
                '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
                '<ul class="add only-direct-fly" id="only-direct-fly">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add filter-share" id="filter-share" style="display: none">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">隐藏共享航班<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
                '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="Business">公务舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
                '</ul>'+
                '</div>'+
                '</div>';
                middleModal.innerHTML =
                    '    <li class="time-modal-item active" data-i="0"><b></b>不限</li>'+
                    '    <li class="time-modal-item" data-i="1"><b></b>直飞优先</li>'+
                    '    <li class="time-modal-item" data-i="2"><b></b>低价优先</li>'+
                    '    <li class="time-modal-item" data-i="3"><b></b>耗时短优先</li>'
                rightModal.innerHTML =''
            }
        }else{              //国际
            if(sinOrDou == 'Oneway'){  //国际单程

                baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i><span'+
                ' class="filter-select">筛选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class=""></i><span'+
                ' class="filter-select">优选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_lo" data-info="openShadow"><b class="hl-icon3 filter-price"></b><i class=""></i><span'+
                ' class="filter-select">价格</span>'+  /*点击价格有弹出框，包含含税与不含税*/
                '</div>';
                leftModal.innerHTML = '    <div class="reset-action-wrap">'+
                '<div class="reset-action-item hot">取消</div>'+
                '<div class="reset-action-item">重置</div>'+
                '<div class="reset-action-item">确定</div>'+
                '</div>'+
                '<div class="reaction-detail" id="reaction-detail">'+
                '<ul class="filter-bottom" id="filter-bottom">'+
                '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
                '<li class="filter-title" data-info="sh">共享航班</li>'+
                '<li class="filter-title" data-info="du">起飞时段</li>'+
                '<li class="filter-title" data-info="se">舱位</li>'+
                '</ul>'+
                '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
                '<ul class="add only-direct-fly" id="only-direct-fly">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add filter-share" id="filter-share" style="display: none">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">隐藏共享航班<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add set-time-duration" id="set-time-duration" style="display: none">'+
                '<li class="tag-item active" data-i="0024">不限<b></b></li>'+
                '<li class="tag-item" data-i="0006">00:00-06:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="0612">06:00-12:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="1218">12:00-18:00<b class=""></b></li>'+
                '<li class="tag-item" data-i="1824">18:00-24:00<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
                '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="Business">公务舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
                '</ul>'+
                '</div>'+
                '</div>';
                middleModal.innerHTML =
                    '    <li class="time-modal-item active" data-i="1"><b></b>直飞优先</li>'+
                    '    <li class="time-modal-item" data-i="2"><b></b>低价优先</li>'+
                    '    <li class="time-modal-item" data-i="3"><b></b>耗时短优先</li>'+
                    '    <li class="time-modal-item" data-i="isDesc_false"><b></b>起飞早到晚</li>'+
                    '    <li class="time-modal-item" data-i="isDesc_true"><b></b>起飞晚到早</li>'
                rightModal.innerHTML =
                    '<li class="price-modal-item active" data-i="true"><b></b>含税价</li>'+
                    '<li class="price-modal-item" data-i="false"><b></b>不含税</li>'
            }else{

                baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i><span'+
                ' class="filter-select">筛选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class=""></i><span'+
                ' class="filter-select">优选</span>'+
                '</div>'+
                '<div class="fo-div" id="fo_lo" data-info="openShadow"><b class="hl-icon3 filter-price"></b><i class=""></i><span'+
                ' class="filter-select">价格</span>'+  /*点击价格有弹出框，包含含税与不含税*/'</div>';
                leftModal.innerHTML = '    <div class="reset-action-wrap">'+
                '<div class="reset-action-item hot">取消</div>'+
                '<div class="reset-action-item">重置</div>'+
                '<div class="reset-action-item">确定</div>'+
                '</div>'+

                '<div class="reaction-detail" id="reaction-detail">'+
                '<ul class="filter-bottom" id="filter-bottom">'+
                '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
                '<li class="filter-title" data-info="sh">共享航班</li>'+
                '<li class="filter-title" data-info="se">舱位</li>'+
                '</ul>'+
                '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
                '<ul class="add only-direct-fly" id="only-direct-fly">'+
                '<li class="tag-item active" data-i="true">不限<b></b></li>'+
                '<li class="tag-item" data-i="false">仅看直飞<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add filter-share" id="filter-share" style="display: none">'+
                '<li class="tag-item active" data-i="false">不限<b></b></li>'+
                '<li class="tag-item" data-i="true">隐藏共享航班<b class=""></b></li>'+
                '</ul>'+
                '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
                '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="Business">公务舱<b class=""></b></li>'+
                '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
                '</ul>'+
                '</div>'+
                '</div>';
                middleModal.innerHTML =
                    '    <li class="time-modal-item active" data-i="0"><b></b>不限</li>'+
                    '    <li class="time-modal-item" data-i="1"><b></b>直飞优先</li>'+
                    '    <li class="time-modal-item" data-i="2"><b></b>低价优先</li>'+
                    '    <li class="time-modal-item" data-i="3"><b></b>耗时短优先</li>'
                rightModal.innerHTML =
                    '<li class="price-modal-item active" data-i="true"><b></b>含税价</li>'+
                    '<li class="price-modal-item" data-i="false"><b></b>不含税</li>'
            }
        }
        oDiv.appendChild(baseTitle);
        oDiv.appendChild(leftModal);
        oDiv.appendChild(middleModal);
        oDiv.appendChild(rightModal);
        document.body.appendChild(backShadow);
        document.body.appendChild(oDiv);
        return this;
    },
    addEvent:function(){
        var titleWrap = document.querySelector('.hl-bottom'), that = this;
        var shadowEle = document.querySelector('#r-shadow');
        titleWrap.onclick = function(event){
            var event = event || window.event;
            var target =target||event.srcElement, lineEle;
            var leftModalHandle =function(){
                var leftModal = document.querySelector('#filter-modal');
                leftModal.style.transition = 'all 300ms ease-in';
                leftModal.style.webkitTransition = 'all 300ms linear';
                leftModal.style.bottom = 0;
            };
            var  middleModalHandle =function (){
                var middleModal = document.querySelector('#time-modal');
                middleModal.style.transition = 'all 300ms ease-in';
                middleModal.style.webkitTransition = 'all 300ms linear';
                middleModal.style.bottom = 0;
            };
            var  rightModalHandle = function(arg){
                if(arg.getAttribute('data-price-type')=="domestic"){
                    if(arg.querySelector('.filter-select').innerHTML=='从低到高'){
                        arg.querySelector('.filter-select').innerHTML='价格';
                        that.tempStates.PriorityRule = '0'
                    }else{
                        arg.querySelector('.filter-select').innerHTML='从低到高';
                        that.tempStates.PriorityRule = '2';
                    }
                    that.fn(that.tempStates);
                    that.checkRedTip();
                }else{
                    var rightModal = document.querySelector('#price-modal');
                    rightModal.style.transition = 'all 300ms ease-in';
                    rightModal.style.webkitTransition = 'all 300ms linear';
                    rightModal.style.bottom = 0;
                    rightModal.onclick = function(){
                        var event = event || window.event;
                        var target =target||event.srcElement, lineEle;
                        if(target.tagName == 'LI'){
                            var twoEles = target.parentNode.querySelectorAll('li');
                            for(var s = 0;s < twoEles.length;s++){
                                twoEles[s].className = 'tag-item';
                            }
                            target.className = 'tag-item active';
                        }
                        that.stateEvent('get');
                        that.fn_(that.tempStates);
                        that.checkRedTip();
                        this.style.transition = 'all 300ms ease-in';
                        this.style.webkitTransition = 'all 300ms linear';
                        this.style.bottom = "-126%";
                    }
                }
            };

            if(target.tagName == 'B'||target.tagName == 'SPAN'){
                lineEle = target.parentNode;
            }else if(target.className == 'fo-div'){
                lineEle = target;
            }
            switch (lineEle.id){
                case 'fo_sc':
                    shadowEle.style.display = 'block';
                    leftModalHandle();
                    break;
                case 'fo_ra':
                    shadowEle.style.display = 'block';
                    middleModalHandle();
                    break;
                case 'fo_lo':
                    if(lineEle.getAttribute('data-info')=='openShadow'){
                        shadowEle.style.display = 'block';
                    }
                    rightModalHandle(lineEle);
                    break;
                default :
                    void(0);
            };

            var moreOptions = document.querySelector('.reset-action-wrap'), leftWrap = document.querySelector('#filter-modal');
            moreOptions.onclick = function(event){
                var event = event || window.event;
                var target =target||event.srcElement, lineEle;
                if(target.className.indexOf('reset-action-item')>-1){
                    var threeEle = target.parentNode.querySelectorAll('.reset-action-item');
                    for(var m = 0;m < threeEle.length;m++){
                        threeEle[m].className = 'reset-action-item';
                    }
                    target.className = 'reset-action-item hot';
                    var  cancelFunction = function(){
                        that.stateEvent('set');
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                        //shadowBox.style.display = 'none';
                    }
                    var resetFunction=function(){
                        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
                        var filterShareLis = document.querySelectorAll('.filter-share li');
                        var setTimeDurationLis = document.querySelectorAll('.set-time-duration li');
                        var seatConditionLis = document.querySelectorAll('.seat-condition li');
                        for (var i = 0; i < directFlyLis.length; i++) {
                            directFlyLis[i].className = (i == 0)?"tag-item active" :"tag-item";
                        }

                        for (var j = 0; j < filterShareLis.length; j++) {
                            filterShareLis[j].className = (j == 0)?"tag-item active" :"tag-item";
                        }

                        for (var n = 0; n < setTimeDurationLis.length; n++) {
                            setTimeDurationLis[n].className = (n == 0)?"tag-item active" :"tag-item";
                        }

                        for (var l = 0; l < seatConditionLis.length; l++) {
                            seatConditionLis[l].className =(l == 0)?"tag-item active" :"tag-item";
                        }
                    }
                    var confirmFunction=function(){
                        that.stateEvent('get');
                        that.fn(that.tempStates);
                        that.checkRedTip();
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                    };

                    switch (target.innerHTML){
                        case "取消" :
                            cancelFunction();
                            shadowEle.style.display = 'none';
                            break;
                        case "重置" :
                            resetFunction();
                            break;
                        case "确定" :
                            confirmFunction();
                            shadowEle.style.display = 'none';
                            break;
                        default :void(0);
                    }
                };
            }
            //左边弹出框的相应
            var reactionDetail = document.querySelector('#reaction-detail');
            reactionDetail.onclick = function(event){
                var event = event || window.event;
                var target =target||event.srcElement, lineEle;
                if(target.className.indexOf('filter-title')>-1){
                    var allLeLi = target.parentNode.querySelectorAll('li'),operRation;
                    for(var i = 0; i< allLeLi.length; i++){
                        allLeLi[i].className = allLeLi[i]==target?"filter-title clear-background":"filter-title"
                    }
                    var tipLetter = target.getAttribute('data-info'), that =this,allUl = this.querySelectorAll('.add');
                    switch (tipLetter){
                        case 'df':
                            operRation = document.querySelector('#only-direct-fly');
                            break;
                        case 'sh':
                            operRation = document.querySelector('#filter-share');
                            break;
                        case 'du':
                            operRation = document.querySelector('#set-time-duration');
                            break;
                        case 'se':
                            operRation = document.querySelector('#seat-condition');
                            break;
                        default :
                            void(0);
                    };
                    for(var j = 0;j < allUl.length;j++){
                        allUl[j].style.display = 'none';
                    }
                    operRation.style.display = 'block';
                }else if(target.className.indexOf('tag-item')>-1){
                    var allLi =  target.parentNode.querySelectorAll('li');
                    for(var n = 0; n< allLi.length; n++){
                        allLi[n].className = allLi[n]==target?"tag-item active":"tag-item"}
                }
            };
            var timeModal = document.querySelector('#time-modal');
            timeModal.onclick = function(event){
                var event = event || window.event;
                var target =target||event.srcElement, lineEle;
                if( target.className.indexOf('tag-item')>-1){
                    var allLi =  target.parentNode.querySelectorAll('li');
                    for(var n = 0; n< allLi.length; n++){
                        allLi[n].className = allLi[n]==target?"tag-item active":"tag-item"
                    }
                }
                that.stateEvent('get');
                that.fn(that.tempStates);
                that.checkRedTip();
                this.style.transition = 'all 300ms ease-in';
                this.style.webkitTransition = 'all 300ms linear';
                this.style.bottom = '-126%';
                shadowEle.style.display = 'none';
            }
            shadowEle.onclick = function(event) {
                var event = event || window.event;
                var target = target || event.srcElement, lineEle;
                var leftModal = document.querySelector('#filter-modal');
                var timeModal = document.querySelector('#time-modal');
                var priceModal = document.querySelector('#price-modal');
                if (target.className.indexOf('r-shadow') > -1) {
                    leftModal.style.transition = 'all 300ms ease-in';
                    leftModal.style.webkitTransition = 'all 300ms linear';
                    leftModal.style.bottom = '-126%';
                    timeModal.style.transition = 'all 300ms ease-in';
                    timeModal.style.webkitTransition = 'all 300ms linear';
                    timeModal.style.bottom = '-126%';
                    priceModal.style.transition = 'all 300ms ease-in';
                    priceModal.style.webkitTransition = 'all 300ms linear';
                    priceModal.style.bottom = '-126%';
                    this.style.display = 'none';
                }
            }
        };
        return this;
    },

    stateEvent:function(type){
        if(this.tripType=="domestic"){
            if(this.sinOrDou == "Return") {  //国内往返
                var directFlyLis = document.querySelectorAll('.only-direct-fly li');
                var filterShareLis = document.querySelectorAll('.filter-share li');
                var seatConditionLis = document.querySelectorAll('#seat-condition li');
                var timeMiddleLis = document.querySelectorAll('#time-modal li');
                var priceModalEle = document.querySelector('#fo_lo');
                for (var i = 0; i < directFlyLis.length; i++) {
                    if(type=="set"){
                        directFlyLis[i].className = directFlyLis[i].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(directFlyLis[i].className == "tag-item active"){
                            this.tempStates.IsDirectFlight = directFlyLis[i].getAttribute('data-i');
                            break;
                        }
                    }
                }

                for (var j = 0; j < filterShareLis.length; j++) {
                    if(type=="set"){
                        filterShareLis[j].className = filterShareLis[j].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(filterShareLis[j].className == "tag-item active"){
                            this.tempStates.IsHideSharedFlight =filterShareLis[j].getAttribute('data-i');
                            break;
                        }
                    }  }

                for (var x = 0; x < seatConditionLis.length; x++) {
                    if(type=="set"){
                        seatConditionLis[x].className = seatConditionLis[x].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(seatConditionLis[x].className == "tag-item active"){
                            this.tempStates.CabinClass = seatConditionLis[x].getAttribute('data-i');
                            break;
                        }
                    } }

                for(var m = 0; m < timeMiddleLis.length; m++) {
                    if(type=="set"){
                        timeMiddleLis[m].className = timeMiddleLis[m].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(timeMiddleLis[m].className == "tag-item active"){
                            this.tempStates.PriorityRule =timeMiddleLis[m].getAttribute('data-i');
                            break;
                        }
                    }
                }
                (this.tempStates.IsDesc == true) ? priceModalEle.querySelector('.filter-select').innerHTML = '价格' : priceModalEle.querySelector('.filter-select').innerHTML = '从低到高';
            }else{ //国内单程

                var directFlyLis__ = document.querySelectorAll('.only-direct-fly li');
                var filterShareLis__ = document.querySelectorAll('.filter-share li');
                var setTimeDurationLis__ = document.querySelectorAll('.set-time-duration li');
                var seatConditionLis__ = document.querySelectorAll('#seat-condition li');
                var timeMiddleLis__ = document.querySelectorAll('#time-modal li');
                var priceModalEle__ = document.querySelector('#fo_lo');
                for (var bn = 0; bn < directFlyLis__.length; bn++) {
                    if(type=="set"){
                        directFlyLis__[bn].className = directFlyLis__[bn].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(directFlyLis__[bn].className == "tag-item active"){
                            this.tempStates.IsDirectFlight = directFlyLis__[bn].getAttribute('data-i');
                            break;
                        }
                    }
                }

                for (var js = 0; js < filterShareLis__.length; js++) {
                    if(type=="set"){
                        filterShareLis__[js].className = filterShareLis__[js].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(filterShareLis__[js].className == "tag-item active"){
                            this.tempStates.IsHideSharedFlight =filterShareLis__[js].getAttribute('data-i');
                            break;
                        }
                    }  }

                for (var jp = 0; jp < setTimeDurationLis__.length; jp++) {
                    if(type=="set"){
                        setTimeDurationLis__[jp].className = setTimeDurationLis__[jp].getAttribute('data-i') == (''+this.tempStates.DepartStartHour+this.tempStates.DepartEndHour)? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(setTimeDurationLis__[jp].className == "tag-item active"){
                            this.tempStates.DepartStartHour =setTimeDurationLis__[jp].getAttribute('data-i').substring(0,2);
                            this.tempStates.DepartEndHour =setTimeDurationLis__[jp].getAttribute('data-i').substring(2);
                            break;
                        }
                    }  }
                for (var xv = 0; xv < seatConditionLis__.length; xv++) {
                    if(type=="set"){
                        seatConditionLis__[xv].className = seatConditionLis__[xv].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(seatConditionLis__[xv].className == "tag-item active"){
                            this.tempStates.CabinClass = seatConditionLis__[xv].getAttribute('data-i');
                            break;
                        }
                    } }

                for(var mm = 0; mm < timeMiddleLis__.length; mm++) {
                    if(type=="set"){
                        timeMiddleLis__[mm].className = timeMiddleLis__[mm].getAttribute('data-i') == this.tempStates.IsDesc ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(timeMiddleLis__[mm].className == "tag-item active"){
                            this.tempStates.IsDesc =timeMiddleLis__[mm].getAttribute('data-i');
                            break;
                        }
                    }
                }
            }
        }else{
            if(this.sinOrDou == "Return"){ //国际往返
                var directFlyLis_ = document.querySelectorAll('.only-direct-fly li');
                var filterShareLis_ = document.querySelectorAll('.filter-share li');
                var seatConditionLis_ = document.querySelectorAll('#seat-condition li');
                var timeMiddleLis_ = document.querySelectorAll('#time-modal li');
                var priceModalLis_ = document.querySelectorAll('#price-modal li');
                for (var q = 0; q < directFlyLis_.length; q++) {
                    if(type=="set"){
                        directFlyLis_[q].className = directFlyLis_[q].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(directFlyLis_[q].className == "tag-item active"){
                            this.tempStates.IsDirectFlight = directFlyLis_[q].getAttribute('data-i');
                            break;
                        }
                    }
                }

                for (var jz = 0; jz < filterShareLis_.length; jz++) {
                    if(type=="set"){
                        filterShareLis_[jz].className = filterShareLis_[jz].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(filterShareLis_[jz].className == "tag-item active"){
                            this.tempStates.IsHideSharedFlight =filterShareLis_[jz].getAttribute('data-i');
                            break;
                        }
                    }  }

                for (var xa = 0; xa < seatConditionLis_.length; xa++) {
                    if(type=="set"){
                        seatConditionLis_[xa].className = seatConditionLis_[xa].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(seatConditionLis_[xa].className == "tag-item active"){
                            this.tempStates.CabinClass = seatConditionLis_[xa].getAttribute('data-i');
                            break;
                        }
                    } }

                for(var mb = 0; mb < timeMiddleLis_.length; mb++) {
                    if(type=="set"){
                        timeMiddleLis_[mb].className = timeMiddleLis_[mb].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(timeMiddleLis_[mb].className == "tag-item active"){
                            this.tempStates.PriorityRule =timeMiddleLis_[mb].getAttribute('data-i');
                            break;
                        }
                    }
                }
                for(var mv = 0; mv < priceModalLis_.length; mv++) { //如果后台允许多个无用参数，可以保留含税与不含税
                    if(type=="set"){
                        priceModalLis_[mv].className =  priceModalLis_[mv].getAttribute('data-i') == this.tempStates.hasTax ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if( priceModalLis_[mv].className == "tag-item active"){
                            this.tempStates.hasTax = priceModalLis_[mv].getAttribute('data-i');
                            break;
                        }
                    }
                }


            }else{   //国际单程

                var directFlyLis_is = document.querySelectorAll('.only-direct-fly li');
                var filterShareLis_is = document.querySelectorAll('.filter-share li');
                var setTimeDurationLis_is = document.querySelectorAll('.set-time-duration li');
                var seatConditionLis_is = document.querySelectorAll('#seat-condition li');
                var timeMiddleLis_is = document.querySelectorAll('#time-modal li');
                var priceModalLis_is = document.querySelectorAll('#price-modal li');
                for (var qq = 0; qq < directFlyLis_is.length; qq++) {
                    if(type=="set"){
                        directFlyLis_is[qq].className = directFlyLis_is[qq].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(directFlyLis_is[qq].className == "tag-item active"){
                            this.tempStates.IsDirectFlight = directFlyLis_is[qq].getAttribute('data-i');
                            break;
                        }
                    }
                }

                for (var jl = 0; jl < filterShareLis_is.length; jl++) {
                    if(type=="set"){
                        filterShareLis_is[jl].className = filterShareLis_is[jl].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(filterShareLis_is[jl].className == "tag-item active"){
                            this.tempStates.IsHideSharedFlight =filterShareLis_is[jl].getAttribute('data-i');
                            break;
                        }
                    }  }

                for (var cv = 0; cv < setTimeDurationLis_is.length; cv++) {
                    if(type=="set"){
                        setTimeDurationLis_is[cv].className = setTimeDurationLis_is[cv].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(setTimeDurationLis_is[cv].className == "tag-item active"){
                            this.tempStates.IsHideSharedFlight =setTimeDurationLis_is[cv].getAttribute('data-i');
                            break;
                        }
                    }  }

                for (var hy = 0; hy < seatConditionLis_is.length; hy++) {
                    if(type=="set"){
                        seatConditionLis_is[hy].className = seatConditionLis_is[hy].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(seatConditionLis_is[hy].className == "tag-item active"){
                            this.tempStates.CabinClass = seatConditionLis_is[hy].getAttribute('data-i');
                            break;
                        }
                    } }


                for(var ty = 0; ty < timeMiddleLis_is.length; ty++) {
                    if(type=="set"){
                        if(timeMiddleLis_is[ty].getAttribute('data-i').indexOf('isDesc')>-1){
                            timeMiddleLis_is[ty].className = timeMiddleLis_is[ty].getAttribute('data-i').substring(7) == this.tempStates.IsDesc ? "tag-item active" : "tag-item";
                        }else{
                            timeMiddleLis_is[ty].className = timeMiddleLis_is[ty].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
                        }
                    }else if(type =='get'){
                        if(timeMiddleLis_is[ty].className == "tag-item active"){
                            if(timeMiddleLis_is[ty].getAttribute('data-i').indexOf('isDesc')>-1){
                                this.tempStates.IsDesc =timeMiddleLis_is[ty].getAttribute('data-i').substring(7);
                            }else{
                                this.tempStates.PriorityRule =timeMiddleLis_is[ty].getAttribute('data-i');
                            }
                            break;
                        }
                    }
                }

                for(var io = 0; io < priceModalLis_is.length; io++) { //如果后台允许多个无用参数，可以保留含税与不含税
                    if(type=="set"){
                        priceModalLis_is[io].className = priceModalLis_is[io].getAttribute('data-i') == this.tempStates.hasTax ? "tag-item active" : "tag-item";
                    }else if(type =='get'){
                        if(priceModalLis_is[io].className == "tag-item active"){
                            this.tempStates.hasTax =priceModalLis_is[io].getAttribute('data-i');
                            break;
                        }
                    }
                }

            }
        }
    },
    checkRedTip:function(){
        var leftEle = document.querySelector('#fo_sc'),middleEle = document.querySelector('#fo_ra'),rightEle = document.querySelector('#fo_lo');
        if( this.tripType == 'international'){
             if(this.sinOrDou == 'Oneway'){ //单程国际
                 if(this.tempStates['IsDirectFlight']!= this.originInfo['IsDirectFlight']||
                     this.tempStates['IsHideSharedFlight']!= this.originInfo['IsHideSharedFlight']||
                     this.tempStates['DepartStartHour']!= this.originInfo['DepartStartHour']||
                     this.tempStates['DepartEndHour']!= this.originInfo['DepartEndHour']||
                     this.tempStates['CabinClass']!= this.originInfo['CabinClass']){
                     leftEle.querySelector('i').className = 'red-tip'
                 }else{
                     leftEle.querySelector('i').className = ''
                 };
                 if(this.tempStates['PriorityRule']!= this.originInfo['PriorityRule']||this.tempStates['isDesc']!= this.originInfo['isDesc']){
                     middleEle.querySelector('i').className = 'red-tip'
                 }else{
                     middleEle.querySelector('i').className = ''
                 };
                 if(this.tempStates['hasTax']!= this.originInfo['hasTax']){
                     rightEle.querySelector('i').className = 'red-tip'
                 }else{
                     rightEle.querySelector('i').className = ''
                 }

             }else{  //双程国际
                 if(this.tempStates['IsDirectFlight']!= this.originInfo['IsDirectFlight']||
                     this.tempStates['IsHideSharedFlight']!= this.originInfo['IsHideSharedFlight']||
                     this.tempStates['CabinClass']!= this.originInfo['CabinClass']){
                     leftEle.querySelector('i').className = 'red-tip';
                 }else{
                     leftEle.querySelector('i').className = ''
                 };
                 if(this.tempStates['PriorityRule']!= this.originInfo['PriorityRule']){
                     middleEle.querySelector('i').className = 'red-tip'
                 }else{
                     middleEle.querySelector('i').className = ''
                 };
                 if(this.tempStates['hasTax']!= this.originInfo['hasTax']){
                     rightEle.querySelector('i').className = 'red-tip'
                 }else{
                     rightEle.querySelector('i').className = ''
                 }
             }
        }else{
            if(this.sinOrDou == 'Oneway'){
                if(this.tempStates['IsDirectFlight']!= this.originInfo['IsDirectFlight']||
                    this.tempStates['IsHideSharedFlight']!= this.originInfo['IsHideSharedFlight']||
                    this.tempStates['CabinClass']!= this.originInfo['CabinClass']){
                    leftEle.querySelector('i').className = 'red-tip'
                }else{
                    leftEle.querySelector('i').className = ''
                };
                if(this.tempStates['PriorityRule']!= this.originInfo['PriorityRule']){
                    middleEle.querySelector('i').className = 'red-tip'
                }else{
                    middleEle.querySelector('i').className = ''
                };
                if(this.tempStates['hasTax']!= this.originInfo['hasTax']){
                    rightEle.querySelector('i').className = 'red-tip'
                }else{
                    rightEle.querySelector('i').className = ''
                }
            }else{
                if(this.tempStates['IsDirectFlight']!= this.originInfo['IsDirectFlight']||
                    this.tempStates['IsHideSharedFlight']!= this.originInfo['IsHideSharedFlight']||
                    this.tempStates['CabinClass']!= this.originInfo['CabinClass']){
                    leftEle.querySelector('i').className = 'red-tip'
                }else{
                    leftEle.querySelector('i').className = ''
                };
                if(this.tempStates['PriorityRule']!= this.originInfo['PriorityRule']){
                    middleEle.querySelector('i').className = 'red-tip'
                }else{
                    middleEle.querySelector('i').className = ''
                };
                if(this.tempStates['hasTax']!= this.originInfo['hasTax']){
                    rightEle.querySelector('i').className = 'red-tip'
                }else{
                    rightEle.querySelector('i').className = ''
                }
            }

        }
    },
    init:function(tripType,sinOrDou, infoObj, callback1, callback2){
        this.tripType = tripType;
        this.sinOrDou = sinOrDou;
        this.tempStates = infoObj;
        this.originInfo = new Object();
        for(var tem in infoObj){
            this.originInfo[tem] = infoObj[tem]
        }

        this.fn = callback1;
        this.fn_ = callback2;
        this.createTags().addEvent().stateEvent('set');
    }
};