function TicketDate(argument){
    Calender.call(this,argument)
}
TicketDate.prototype = new Calender();

TicketDate.prototype.linkColor=function(type,date){
    var that = this, links = _CalF.$('.live',this.dd), startIndex,endIndex;
    if(type == 'Return'&&date==undefined){
        for(var st = 0;st < links.length;st++) {
            if(links[st].querySelector('.live_txt')&&links[st].querySelector('.live_txt').innerHTML=='ȥ��'){
                startIndex=st;
            }
            if(links[st].querySelector('.live_txt')&&links[st].querySelector('.live_txt').innerHTML=='����'){
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

TicketDate.prototype._word = {h:['��ס','���'],f:['ȥ��','����']};

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
    // ������ڣ����Ƴ��������ڲ�Container
    var odiv = _CalF.$('#'+ this.id + '-date');
    if(!!odiv) odiv.parentNode.removeChild(odiv);
    var container = this.container = document.createElement('div');
    container.id = this.id + '-date';
    container.style.position = "absolute";
    container.style.zIndex = 98;
    if(this.input.tagName === 'input'){
        //PC�����
        var inputPos = _CalF.getPos(this.input);
        // ����input��λ������container�߶�
        container.style.left = inputPos.left + 'px';
        container.style.top = inputPos.bottom - 1 + 'px';
        // �������ڲ��ϵĵ����¼���������ֹð�ݣ���;�����ڲ��ⵥ���ر����ڲ�
        _CalF.bind(container, 'click', this.stopPropagation);

    }else{
        //Mվ��
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
        header.innerHTML = this.type=='Oneway'?'<a href="javascript:void(0);" class="icons header-back"></a><h3>ѡ������</h3>':'<a href="javascript:void(0);" class="icons header-back"></a><h3>ѡ������</h3><p class="choose-week-tip">ѡ������Ϊ����������</p>';
        document.body.appendChild(header);

        var weeker = document.createElement('div');
        weeker.className = 'calendar';
        weeker.style.marginTop=this.type=='Oneway'? '4.5rem':'6.8rem';
        weeker.innerHTML = this._tempweek.join('');
        container.appendChild(weeker);

        var tiper = this.tiper = document.createElement('div');
        tiper.id = this.id + '-tiper';
        tiper.className = 'tipers';

        tiper.innerHTML = "��ѡ��ȥ������";
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
    textNode = document.createTextNode(year + '��' + month + '��');
    titleDate.appendChild(textNode);

    // ��ȡģ����Ψһ��DDԪ��
    dd = _CalF.$('dd',dateWarp)[0];
    // ��ȡ��������
    days = new Date(year, month, 0).getDate();
    // ��ȡ���µ�һ�������ڼ�
    weekStart = new Date(year, month-1,1).getDay();
    // ��ͷ��ʾ�հ׶�
    for (i = 0; i < weekStart; i++) {
        ddHtml.push('<a>&nbsp;</a>');
    }
    // ѭ����ʾ����
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
                    i == nowdate?ddHtml.push('<a class="live" data-day="'+year+'-'+month+'-'+i+'">����</a>'):ddHtml.push(pstr);
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

    // ���
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
                            that.tiper.innerHTML = '��ѡ��'+that._word.f[1]+'����';
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
                            that.tiper.innerHTML = '�������������ȥ������';
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
                    week = '����';
                    break;
                case 1 :
                    week = '��һ';
                    break;
                case 2 :
                    week = '�ܶ�';
                    break;
                case 3 :
                    week = '����';
                    break;
                case 4 :
                    week = '����';
                    break;
                case 5 :
                    week = '����';
                    break;
                case 6 :
                    week = '����';
                    break;
                default :
                    void(0);
            }
            array = arg.split('-');
            array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
            array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
            return '<span class="dateNumber">'+array[1]+'��'+array[2]+'��'+'</span>'+' '+'<span>'+week+'</span>';
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

/*

//�÷���������d_calendar1.0.2.js,��������ļ�����дһЩ������

var dateInitObj = {};

//��������
var myDate= new TicketDate({
    id: 'chooseDate-single',  //�������ڵ�����ı�ǩ��id
    num: 13,                  //�������ڵ������ֵ��·���
    time: dateInitObj,        //�������ڣ�����֮ǰ�Ȱ�ֵ����Ϊ����  dateInitObj['2016-02-30'] = 'ȥ��';��ʽ
    sClass1: 'enterDate',     //ѡ�����ں�ֵ����Ԫ��
    type:'Oneway'             //�������ͣ�Return ���������̣�Oneway��������ʾ�������ϵĵ��
});


//˫������
dateInitObj['2016-04-08'] = 'ȥ��';
dateInitObj['2016-04-12'] = '����';
var myDate= new TicketDate({
    id: 'ori-des-Date',
    num: 13,
    time: dateInitObj,
    sClass1: 'double-date',
    type:'Return'
});
*/


