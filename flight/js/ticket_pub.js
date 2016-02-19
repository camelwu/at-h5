//日期函数及修改函数
function TicketDate(argument){
    Calender.call(this,argument)
}
TicketDate.prototype = new Calender();

TicketDate.prototype.linkColor=function(){
    var that = this,
        links = _CalF.$('.live',this.dd),
        startIndex,endIndex;
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
        this.type=='single'?header.style.height = "45px":void(0);
        header.innerHTML = this.type=='single'?'<a href="javascript:void(0);" class="icons header-back"></a><h3>选择日期</h3>':'<a href="javascript:void(0);" class="icons header-back"></a><h3>选择日期</h3><p class="choose-week-tip">选择日期为出发地日期</p>';
        document.body.appendChild(header);

        var weeker = document.createElement('div');
        weeker.className = 'calendar';
        weeker.style.marginTop = '45px';
        weeker.innerHTML = this._tempweek.join('');
        container.appendChild(weeker);

        var tiper = this.tiper = document.createElement('div');
        tiper.id = this.id + '-tiper';
        tiper.className = 'tipers';

        tiper.innerHTML = "请选择去程日期";
        this.type=='single'?void(0):container.appendChild(tiper);
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
                    if(tims[year+'-'+m+'-'+d]){
                        pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'"><span class="live_circle">' + i + '</span><span class="live_txt">'+ tims[year+'-'+m+'-'+d] +'</span></a>';
                    }else{
                        pstr = '<a class="live" data-day="'+year+'-'+month+'-'+i+'">' + i + '</a>';
                    }
                    i == nowdate?ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">今天</a>'):ddHtml.push(pstr);
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
                    if(that.type == 'single'){
                        that.linkOver(event);
                    }else{
                        if(that.op==0){
                            that.tiper.innerHTML = '请选择'+that._word.f[1]+'日期';
                            that.linkReset(this.index);
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.f[that.op]+'</span>');
                            that.op++;
                        }else{
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.f[that.op]+'</span>');that.op>=1?that.op=0:null;
                            that.tiper.style.display = 'none';
                            that.linkOver();
                            that.linkColor();
                        }
                    }
                }
            }
        };
    }
    this.linkColor()
};

TicketDate.prototype.linkOver = function(event){
    var sels = $('#'+ this.id +'-date .live_circle'),i,l=sels.length,that=this,arr=[];
    var out = _CalF.$('input',that.input);
    if(!out.length){
        out=_CalF.$('.'+this.sClass1,document);
    }

    if(this.type != 'single'){
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
        var target = event.target || event.srcElement;
        out[0].innerHTML=returnWeek(target.getAttribute("data-day"));
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

var bottomModal = {

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

    createFilterEle:function(className,tripType,sinOrDou){
        var oDiv = document.createElement('div'),filterStr='',timerFilterStr='',priceFilterStr='',slPortFilterStr='';
        var allDiv = document.querySelector('.'+className);
        oDiv.className = 'filter-wrap';
        if(sinOrDou == 'single'){
            slPortFilterStr = '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
            '    <li class="filter-title" data-info="sh">共享航班</li>'+
            '    <li class="filter-title" data-info="du">起飞时段</li>'+
            '    <li class="filter-title" data-info="se">舱位</li>';

            timerFilterStr = tripType=='domestic'?'<li class="time-modal-item active" data-i="earlyAsLate"><b></b>从早到晚</li>'+
            '    <li class="time-modal-item" data-i="lateAsEarly"><b></b>从晚到早</li>':'<li class="time-modal-item active" data-i="directFirst"><b></b>直飞优先</li>'+
            '    <li class="time-modal-item" data-i="lowPriceFirst"><b></b>低价优先</li>'+
            '    <li class="time-modal-item" data-i="shortTimeFirst"><b></b>耗时短优先</li>'+
            '    <li class="time-modal-item" data-i="setEarlyToLate active"><b></b>起飞早到晚</li>'+
            '    <li class="time-modal-item" data-i="setLateToEarly"><b></b>起飞晚到早</li>';

            if(tripType=='domestic'){
                priceFilterStr = '';
            }else{
                priceFilterStr = '<li class="price-modal-item active" data-i="hasTax"><b></b>含税价</li>'+
                '<li class="price-modal-item" data-i="noTax"><b></b>不含税</li>';
            }
        }else{
            slPortFilterStr = '<li class="filter-title clear-background" data-info="df">直飞/中转</li>'+
            '    <li class="filter-title" data-info="sh">共享航班</li>'+
            '    <li class="filter-title" data-info="se">舱位</li>';

            timerFilterStr = '<li class="time-modal-item active" data-i="directFirst"><b></b>不限</li>'+
            '    <li class="time-modal-item" data-i="directFirst"><b></b>直飞优先</li>'+
            '    <li class="time-modal-item" data-i="lowPriceFirst"><b></b>低价优先</li>'+
            '    <li class="time-modal-item" data-i="shortTimeFirst"><b></b>耗时短优先</li>';
            if(tripType=='domestic'){
                priceFilterStr = '';
            }else{
                priceFilterStr = '<li class="price-modal-item active" data-i="hasTax"><b></b>含税价</li>'+
                '<li class="price-modal-item" data-i="noTax"><b></b>不含税</li>'
            }
        }
        filterStr+=''+
        '<div class="hl-bottom">'+
        '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i><span>筛选</span></div>'+
        '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class=""></i><span>时间</span></div>'+
        '<div class="fo-div" id="fo_lo"><b class="hl-icon3 filter-price"></b><i class=""></i><span>价格</span></div></div>'+

        '<div class="reset-action" id="filter-modal">'+
        '<div class="reset-action-wrap">'+
        '<div class="reset-action-item hot">取消</div>'+
        '<div class="reset-action-item">重置</div>'+
        '<div class="reset-action-item"">确定</div>'+
        '</div>'+
        '<div class="reaction-detail" id="reaction-detail" style="color: rgb(102, 102, 102);">'+
        '<ul class="filter-bottom" id="filter-bottom">'+slPortFilterStr+'</ul>'+

        '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
        '<ul class="add only-direct-fly" id="only-direct-fly">'+
        '    <li class="tag-item active" data-i="unlimitedPlane">不限<b></b></li>'+
        '    <li class="tag-item" data-i="directFlight">仅看直飞<b class=""></b></li>'+
        '</ul>'+

        '<ul class="add filter-share" id="filter-share" style="display: none">'+
        '    <li class="tag-item active" data-i="unlimitedFlight">不限<b></b></li>'+
        '    <li class="tag-item" data-i="hideShareFlight">隐藏共享航班<b class=""></b></li>'+
        '</ul>'+

        '<ul class="add set-time-duration" id="set-time-duration" style="display: none">'+
        '    <li class="tag-item active" data-i="0024">不限<b></b></li>'+
        '    <li class="tag-item" data-i="0006">00:00-06:00<b class=""></b></li>'+
        '    <li class="tag-item" data-i="0612">06:00-12:00<b class=""></b></li>'+
        '    <li class="tag-item" data-i="1218">12:00-18:00<b class=""></b></li>'+
        '    <li class="tag-item" data-i="1824">18:00-24:00<b class=""></b></li>'+
        ' </ul>'+

        '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
        '    <li class="tag-item active" data-i="All">不限<b></b></li>'+
        '    <li class="tag-item" data-i="Economy">经济舱<b class=""></b></li>'+
        '    <li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
        '    <li class="tag-item" data-i="Business">公务舱<b class=""></b></li>'+
        '    <li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
        '</ul>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<ul id="time-modal">'+ timerFilterStr+'</ul>'+
        '<ul id="price-modal">'+ priceFilterStr+'</ul>';
        oDiv.innerHTML = filterStr;
        allDiv.appendChild(oDiv);
        this.changeWordTip(sinOrDou,tripType)
    },

    changeWordTip:function(sinOrDou,desOrInt){
        var priceSpan = document.querySelectorAll('#fo_lo span')[0];
        if(sinOrDou == 'single'){

        }else{
            if(desOrInt=='domestic'){
                priceSpan.innerHTML = '从低到高'
            }else{

            }
        }
    },

    filterEvent:function(){
        var that = bottomModal;
        var filterButtons = document.querySelectorAll('.fo-div');
        var rightUl = document.querySelectorAll('.add');
        var shadowBox = document.querySelector('#r-shadow');
        var filterBottom = document.querySelector('#filter-bottom');
        var detailListWrap = document.querySelector('.detail-list');
        var timeModal = document.querySelector('#time-modal');
        var filterWrap = document.querySelector('.filter-wrap');

        var filterModal = document.querySelector('#filter-modal');

        var resetActionWrap =document.querySelector('.reset-action-wrap');

        this.addHandler(filterWrap, 'click', function(event){
            var that = bottomModal;
            var event = event || window.event;
            var target = event.target||event.srcElement;
             if(target.parentNode.id =='time-modal'){
                 that.fn(that.returnState());
                 closeFilterModal();
             }
        });

        this.addHandler(resetActionWrap, 'click', function(event){
            var that = bottomModal;
            var event = event || window.event;
            var target = event.target||event.srcElement;
            var oDivs = target.parentNode.querySelectorAll('div.reset-action-item');
            for(var n = 0; n <oDivs .length; n++){
                oDivs[n].className = oDivs[n]==target?"reset-action-item hot":"reset-action-item";
            }
            var tempInfo = that.returnState();
            switch (target.innerHTML){
                case "取消" :
                    cancelFunction(tempInfo);break;
                case "重置" :
                    resetFunction(tempInfo);break;
                case "确定" :
                    confirmFunction(tempInfo);break;
                default :void(0);
            }
             closeFilterModal()
        });

        function cancelFunction(){
            that.cancelSetStyle(that.chooseInfo);
        }
        function resetFunction(){
            that.resetStyle();
            //that.fn(that.chooseInfo)
        }
        function confirmFunction(tempInfo){
            that.chooseInfo = tempInfo
            that.fn(that.chooseInfo)
        }
        function closeFilterModal(){
            filterModal.style.transition = 'all 300ms ease-in';
            filterModal.style.webkitTransition = 'all 300ms linear';
            filterModal.style.bottom = '-126%';
            shadowBox.style.display = 'none';
        }

        if(filterButtons&&rightUl&&shadowBox&&filterBottom&&detailListWrap&&timeModal){
            that.addHandler(detailListWrap, 'click', function(event){
                var event = event || window.event;
                var target =target||event.srcElement;

                if(target.tagName=='LI'){
                        var lis = target.parentNode.querySelectorAll('li');
                        for(var m = 0,cd = lis.length;m<cd; m++){
                            lis[m].className = lis[m]==target?"tag-item active":"tag-item";
                        }
                }else if(target.tagName=='B'){
                    var lis_ = target.parentNode.parentNode.querySelectorAll('li');
                    for(var j = 0,length = lis_.length;j<length; j++){
                        lis_[j].className = lis_[j].querySelector('b')==target?"tag-item active":"tag-item";
                    }
                }
            });

            that.addHandler(filterBottom, 'click', function(event){
                var event = event || window.event;
                var target =target||event.srcElement;
                var info =target.getAttribute('data-info');
                var sibLis =target.parentNode.querySelectorAll('li');
                for(var i= 0,len=sibLis.length;i<len;i++){
                    sibLis[i].className =sibLis[i]==target?"filter-title clear-background":"filter-title";
                }
                //显示右侧
                rightModalHandler(event,info);
            });

            that.addHandler(timeModal, 'click', function(event){
                var event = event || window.event;
                var target =target||event.srcElement;
                var sibLis =target.parentNode.querySelectorAll('li');
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"time-modal-item active":"time-modal-item";
                }
                this.style.transition = 'all 300ms ease-in';
                this.style.webkitTransition = 'all 300ms linear';
                this.style.bottom = '-126%';
                shadowBox.style.display = 'none';
            });

            for(var i = 0;i<filterButtons.length;i++){
                that.addHandler(filterButtons[i], 'click', statusHandle);
            }
        }

        function rightModalHandler(event,info){
            for(var i= 0,len=rightUl.length;i<len;i++){
                rightUl[i].style.display = 'none';
            }
            switch (info){
                case 'df':
                    document.querySelector('#only-direct-fly').style.display = 'block';
                    break;
                case 'sh':
                    document.querySelector('#filter-share').style.display = 'block';
                    break;
                case 'du':
                    document.querySelector('#set-time-duration').style.display = 'block';
                    break;
                case 'se':
                    document.querySelector('#seat-condition').style.display = 'block';
                    break;
                default :
                    void(0);
            }
        }
        function statusHandle(event){

            var target =target||event.srcElement;
            if(target.tagName=='DIV'){
                switch (target.id){
                    case 'fo_sc':
                        filterHandler();
                        break;
                    case 'fo_ra':
                        dereFlyHandler();
                        break;
                    case 'fo_lo':
                        TaxHandler();
                        break;
                    default :
                        void(0);
                }
            }else if(target.tagName=='B'){
                switch (target.parentNode.id){
                    case 'fo_sc':
                        filterHandler();
                        break;
                    case 'fo_ra':
                        dereFlyHandler();
                        break;
                    case 'fo_lo':
                        TaxHandler();
                        break;
                    default :
                        void(0);
                }
            }
            shadowBox.style.display = 'block';
        }
        function filterHandler(){
            var filterModal = document.querySelector('#filter-modal');
            filterModal.style.transition = 'all 300ms ease-in';
            filterModal.style.webkitTransition = 'all 300ms linear';
            filterModal.style.bottom = 0;
        }
        function dereFlyHandler(){
            var timeModal = document.querySelector('#time-modal');
            timeModal.style.transition = 'all 300ms ease-in';
            timeModal.style.webkitTransition = 'all 300ms linear';
            timeModal.style.bottom = 0;
        }
        function TaxHandler(){
            var priceModal = document.querySelector('#price-modal');
            priceModal.style.transition = 'all 300ms ease-in';
            priceModal.style.webkitTransition = 'all 300ms linear';
            priceModal.style.bottom = 0;
        }
    },

    cancelSetStyle :function(arg){
        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
        var filterShareLis = document.querySelectorAll('.filter-share li');
        var setTimeDurationLis = document.querySelectorAll('.set-time-duration li');
        var seatConditionLis = document.querySelectorAll('.seat-condition li');
            for (var i = 0; i < directFlyLis.length; i++) {
                directFlyLis[i].className = directFlyLis[i].getAttribute('data-i')==arg.directFly?"tag-item active" :"tag-item";
            }

            for (var j = 0; j < filterShareLis.length; j++) {
                filterShareLis[j].className = filterShareLis[j].getAttribute('data-i')==arg.shareFlight?"tag-item active" :"tag-item";
            }

            for (var n = 0; n < setTimeDurationLis.length; n++) {
                setTimeDurationLis[n].className = setTimeDurationLis[n].getAttribute('data-i')==arg.filterTime?"tag-item active" :"tag-item";
            }

            for (var l = 0; l < seatConditionLis.length; l++) {
                seatConditionLis[l].className =seatConditionLis[l].getAttribute('data-i')==arg.CabinClass?"tag-item active" :"tag-item";
            }
    },

    resetStyle :function(){
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
    },

    returnState:function(){
        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
        var filterShareLis = document.querySelectorAll('.filter-share li');
        var setTimeDurationLis = document.querySelectorAll('.set-time-duration li');
        var seatConditionLis = document.querySelectorAll('#seat-condition li');
        var timeMiddleLis = document.querySelectorAll('#time-modal li');
        var priceModalLis = document.querySelectorAll('#price-modal li');
        var tempObj = {};
            for(var i = 0; i< directFlyLis.length; i++){
                if(directFlyLis[i].className.indexOf('active')>-1){
                    tempObj.directFly = directFlyLis[i].getAttribute('data-i');
                    break;
                }else{
                    tempObj.directFly = directFlyLis[0].getAttribute('data-i');
                }
            }

            for(var j = 0; j< filterShareLis.length; j++){
                if(filterShareLis[j].className.indexOf('active')>-1){
                    tempObj.shareFlight=filterShareLis[j].getAttribute('data-i');
                    break;
                }else{
                    tempObj.shareFlight= filterShareLis[0].getAttribute('data-i');
                }
            }

            for(var x = 0; x< seatConditionLis.length; x++){
                if(seatConditionLis[x].className.indexOf('active')>-1){
                    tempObj.CabinClass=seatConditionLis[x].getAttribute('data-i');
                    break;
                }else{
                    tempObj.CabinClass=seatConditionLis[x].getAttribute('data-i');
                }
            }

            for(var m = 0; m< timeMiddleLis.length; m++){
                if(timeMiddleLis[m].className.indexOf('active')>-1){
                    tempObj.paraMiddle=timeMiddleLis[m].getAttribute('data-i');
                    break;
                }else{
                    tempObj.paraMiddle=timeMiddleLis[0].getAttribute('data-i');
                }

            }
            for(var h = 0; h< setTimeDurationLis.length; h++){
                  if(setTimeDurationLis[h].className.indexOf('active')>-1){
                      tempObj.filterTime = setTimeDurationLis[h].getAttribute('data-i');
                      break;
                  }else{
                      tempObj.filterTime = setTimeDurationLis[h].getAttribute('data-i');
                  }
            }

            for(var z = 0; z< priceModalLis.length; z++){
                if(priceModalLis[z].className.indexOf('active')>-1){
                    tempObj.paraRight = priceModalLis[z].getAttribute('data-i');
                    break;
                }else{
                    tempObj.paraRight = priceModalLis[0].getAttribute('data-i');
            }
        }
        return tempObj;
    },

    init:function(className,tripType,sinOrDou,fn){
        this.tripType = tripType;
        this.fn = fn;
        this.createFilterEle(className,tripType,sinOrDou);
        this.filterEvent();
        this.chooseInfo =  this.returnState()
    }
};