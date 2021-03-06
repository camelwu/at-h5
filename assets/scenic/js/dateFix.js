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
                links[sn].innerHTML = '<span class="live_circle">'+temStr[0]+'</span>';
            }else{
                if(temStr){
                    links[sn].innerHTML =temStr[0]!=null?temStr[0]:'';
                }
            }
        }
    }
    return false;
};

TicketDate.prototype.linkRange=function(type,date){
    var that = this, links = _CalF.$('.live',this.dd), startRange,endRange;
    if(!this.range.length){
        return;
    }
    startRange =new Date(this.range[0].replace("-","/"));
    endRange = new Date(this.range[1].replace("-","/"));
      for(var st = 0;st < links.length;st++) {
           if(links[st].getAttribute('data-day')!=null){
               if(new Date((links[st].getAttribute('data-day')).replace("-","/"))<startRange ||new Date((links[st].getAttribute('data-day')).replace("-","/"))>endRange){
                  links[st].className = links[st].className+" disabled"
               }
           }
      }
};

TicketDate.prototype.initialize =function (options) {
    this.type = options.type;
    this.id = options.id;
    this._word = options._word;
    this.num = options.num;
    this.sClass1=options.sClass1;
    this.id2=options.id2;
    this.fn = options.fn;
    this.fn2 = options.fn2;
    this.time = options.time;
    this.range = options.range;
    this.op = 0;
    this.input = _CalF.$('#'+ this.id);
    this.inputEvent();
    this.outClick();
};

TicketDate.prototype.createContainer = function(odate){
    // 如果存在，则移除整个日期层Container
    var odiv = _CalF.$('#'+ this.id + '-date'),that=this;
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
        var header = this.header = document.createElement('div');
        header.id = this.id+"-header";
        header.className = 'header';
        header.style.top = 0;
        this.type=='Oneway'?header.style.height = "45px":void(0);
        header.innerHTML = this.type=='Oneway'?'<a id=\"close_list\" href=\"javascript:void(0);\" class=\"header-back\"><i class=\"icons go-back\"></i></a><h3>选择日期</h3>':'<a href="javascript:void(0);" class="icons header-back"></a><h3>选择日期</h3><p class="choose-week-tip">选择日期为出发地日期</p>';
        document.body.appendChild(header);

        var weeker = document.createElement('div');
        weeker.className = 'calendar';
        weeker.style.marginTop=this.type=='Oneway'? '3.68rem':'3.68rem';
        weeker.innerHTML = this._tempweek.join('');
        container.appendChild(weeker);

        var tiper = this.tiper = document.createElement('div');
        tiper.id = this.id + '-tiper';
        tiper.className = 'tipers';

        tiper.innerHTML = "请选择"+that._word.tip[0]+"日期";
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
                }
                else{
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
            }else {
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
    this.linkRange();
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
                            that.tiper.innerHTML = '请选择'+that._word.tip[1]+'日期';
                            that.linkReset(this.index);
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.tip[that.op]+'</span>');
                            that.op++;
                            that.cache = this.getAttribute('data-day');
                        }else if(that.op==1&&this.getAttribute('data-day')!=that.cache){
                            $(this).html('<span class="live_circle">'+(this.innerHTML)+'</span><span class="live_txt">'+that._word.tip[that.op]+'</span>');that.op>=1?that.op=0:null;
                            that.tiper.style.display = 'none';
                            that.linkOver();
                            that.linkColor('Return');
                        }else if(that.op==1&&this.getAttribute('data-day')==that.cache){
                            that.tiper.innerHTML =that._word.tip[1]+'日期需大于'+that._word.tip[0]+'日期';
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
        if(document.querySelector('#'+this.id)) {
            out = _CalF.$('.' + this.sClass1, document.querySelector('#' + this.id));
        }else{
            out = _CalF.$('.' + this.sClass1, document);
        }

    }

    if(this.type != 'Oneway'){
        var tal = _CalF.$('#'+this.id2,that.input), outObj = {};
        if(out[0].tagName=='INPUT'){

            arr.push(sels[0].parentNode.getAttribute("data-day"));
            arr.push(sels[1].parentNode.getAttribute("data-day"));
            outObj['start'] = sels[0].parentNode.getAttribute("data-day");
            if(out[1]){
                outObj['end'] = sels[1].parentNode.getAttribute("data-day");
            }
            if(typeof that.fn2 == 'function'){ that.fn2(outObj)}
        }else{
            arr.push(sels[0].parentNode.getAttribute("data-day"));
            arr.push(sels[1].parentNode.getAttribute("data-day"));
            outObj['start'] = sels[0].parentNode.getAttribute("data-day");
            out[0].innerHTML=sels[0].parentNode.getAttribute("data-day");
            if(out[1]){out[1].innerHTML=sels[1].parentNode.getAttribute("data-day");
                outObj['end'] = sels[1].parentNode.getAttribute("data-day");
            }
        }
        if(tal){
           tal.innerHTML = (Math.round((new Date(arr[1])-new Date(arr[0]))/(1000*60*60*24)));
        }
    }else{
        var event = event || window.event ,outObj_ = {};
        var target = event.target || event.srcElement,dateSTr='';
        if(target.tagName == 'A'){
            dateSTr = target.getAttribute('data-day');
            that.linkColor('Oneway',dateSTr);
            outObj_['start'] = target.getAttribute('data-day');
            out[0].innerHTML=dateSTr;
        }else if(target.tagName == 'SPAN'){
            dateSTr = target.parentNode.getAttribute('data-day');
            outObj_['start'] = target.parentNode.getAttribute('data-day');
            that.linkColor('Oneway',dateSTr);
            out[0].innerHTML=dateSTr;
        }
        if(typeof that.fn2 == 'function'){ that.fn2(outObj_)}
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
    },100);

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