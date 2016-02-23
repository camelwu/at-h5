var ticketDouble = {

    CultureName: "zh-CN",

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    dateInit:function(arg){
        var spans = document.querySelectorAll('.ticket-double-date');
        var dateInitObj = {};
        console.log(arg)
        spans[0].innerHTML = ticketDouble.returnWeek(arg.DepartDate);
        spans[1].innerHTML = ticketDouble.returnWeek(arg.ReturnDate);
        dateInitObj[arg.DepartDate] = '去程';
        dateInitObj[arg.ReturnDate] = '返程';
        var myDate= new TicketDate({
            id: 'dateIcon',
            num: 13,
            time: dateInitObj,
            sClass1: 'date-wrap-double',
            type:'double',
            fn:this.dateChangeRender
        });
    },

    returnWeek:function(arg){
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
           void(0)
    }
    array = arg.split('-');
    array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
    array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
    return '<span>'+array[1]+'-'+array[2]+'</span>'+' '+'<span>'+week+'</span>';
},

    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var that=this,dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl?questUrl:that.requestUrl;
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },

    addHandler: function (target, eventType, handle) {

        if (document.addEventListener) {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        ticketDouble.addHandler(target, eventType, handle);
    },

    reDate:function(arg){
        var reg = /(\d{1,2})月(\d{1,2})日/g,tStr = reg.exec(arg);
          var returnWeek  = function(){
            var index = new Date(new Date().getFullYear()+'/'+tStr[1]+'/'+tStr[2]).getDay(),week;
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
                    void(0)
            }
            return week
        };
        tStr[1] = parseInt(tStr[1]) < 10?'0'+parseInt(tStr[1]):parseInt(tStr[1]);
        tStr[2] = parseInt(tStr[2]) < 10?'0'+parseInt(tStr[2]):parseInt(tStr[2]);
        return '<span>'+tStr[1]+'-'+tStr[2]+'</span>&nbsp;<span>'+returnWeek()+'</span>';
    },
    dateChangeRender:function(){

        var that = ticketDouble,dateEle =document.querySelectorAll('.date-wrap-double');
        var start = dateEle[0].querySelector('.dateNumber').innerHTML,end = dateEle[1].querySelector('.dateNumber').innerHTML;
        document.querySelector('.start-date').innerHTML = that.reDate(start);
        document.querySelector('.end-date').innerHTML = that.reDate(end);
        that.backParaObj.DepartDate =new Date().getFullYear()+'-'+ document.querySelector('.start-date').querySelectorAll('span')[0].innerHTML;
        that.backParaObj.ReturnDate =new Date().getFullYear()+'-'+ document.querySelector('.end-date').querySelectorAll('span')[0].innerHTML;
        document.querySelector('#preloader').style.display='block';
        that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
    },


    parseUrlPara: function (url, isEncode) {
        var isEncode = isEncode || false;
        var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
        url.replace(reg, function () {
            var arg = arguments;
            obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
        });
        return obj;
    },

    checkTip:function(){
        var lis = document.querySelectorAll('.detail-list li'),temArray='';
        var tLis = document.querySelectorAll('#time-modal li'),tTemArray='';
        var pLis = document.querySelectorAll('#price-modal li'),pTemArray='';
        for(var i = 0;i < lis.length;i++){
            if(lis[i].className.indexOf('active')>-1){
                temArray+= i ;
            }
        }

        for(var j = 0;j < tLis.length;j++){
            if(tLis[j].className.indexOf('active')>-1){
                tTemArray+= j ;
            }
        }
        for(var k = 0;k < pLis.length;k++){
            if( pLis[k].className.indexOf('active')>-1){
                pTemArray+= k ;
            }
        }
        return {left:temArray,middle:tTemArray,right:pTemArray};
    },

    eventHandler:function(){
        var oLis =  document.querySelectorAll('.seat-detail'),that = ticketDouble,shadowBox = document.querySelector('#r-shadow'),
            filterModal=document.querySelector('#filter-modal'),timeModal = document.querySelector('#time-modal'),priceModal = document.querySelector('#price-modal');
        for(var i = 0 ;i < oLis.length; i ++){
            this.addHandler(oLis[i], 'click', function(){
                document.location.href ='ticket_seat_choose.html?setId='+this.getAttribute('data-set-id')+'&RouteType='+that.backParaObj.RouteType+
                '&CabinClass='+that.backParaObj.CabinClass+'&NumofAdult='+that.backParaObj.NumofAdult+'&NumofChild='+that.backParaObj.NumofChild;
            })
        }
        this.addHandler(shadowBox, 'click', function(){
            if(filterModal.style.bottom == '0px'){
                filterModal.style.transition = 'all 300ms ease-in';
                filterModal.style.webkitTransition = 'all 300ms linear';
                filterModal.style.bottom = '-126%';
            }else if(timeModal.style.bottom == '0px'){
                timeModal.style.transition = 'all 300ms ease-in';
                timeModal.style.webkitTransition = 'all 300ms linear';
                timeModal.style.bottom = '-126%';
            }else if(priceModal.style.bottom == '0px'){
                priceModal.style.transition = 'all 300ms ease-in';
                priceModal.style.webkitTransition = 'all 300ms linear';
                priceModal.style.bottom = '-126%';
            }
            this.style.display = 'none';
        })
    },
    timeCut:function(arg){
        var reg = /\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}/g,result = reg.exec(arg);
        return result[1]+':'+result[2];
    },

    alertNoFlightNotice:function(citys,type){
        var div = document.createElement('div'),allEleWrap = document.querySelector('.all-elements'),backButton,that = ticketDouble;
        var arrowIcon = type =='single'?'direction-single':'direction-double';
        div.className = 'no-flight-notice';
        div.innerHTML = '<header class="big-title"><i class="fl close-no-flight"></i>'+
        '<span class="set-place">'+citys.fromCity+'</span>'+
        '<i class="'+arrowIcon+'"></i>'+
        '<span class="to-place">'+citys.toCity+'</span>'+
        '</header>'+
        '<div class="tip-button-para">'+
        '<p class="no-flight-word">没有找到符合条件的航班！ </p></div>'
        allEleWrap.appendChild(div);
        backButton = document.querySelector('.close-no-flight');
        console.log(that)
        that.addHandler(backButton,"click",function(){
            allEleWrap.removeChild(div)
        })

    },

    returnTransferCity:function(arg){
        var str = '';
        if(arg.length<=2){
            str = '<span class="air-port-word">转'+arg[0].cityNameTo+'</span>'
        }else if(arg.length>=3){
            str = '<span class="air-port-word">中转'+(arg.length-1)+'次</span>'
        }
        return str;
    },

    returnTransferCity:function(arg){
        var str = '';
        if(arg.length<2){
            str = ''
        }else if(arg.length=2){
            str = '<span class="air-port-word">转'+arg[0].cityNameTo+'</span>'
        }else if(arg.length>=3){
            str = '<span class="air-port-word">中转'+(arg.length-1)+'次</span>'
        }
        return str;
    },

    taxDeal:function(arg){
        var taxData = [],freeTaxData = [],priceDesc=[],priceAsic=[];
        for(var i = 0;i<arg.length;i++){
            arg[i].totalTaxAmountADT == 0?freeTaxData.push(arg[i]):taxData.push(arg[i])
        }
        priceDesc = arg.sort(function(a,b){
            return parseFloat(a.totalFareAmountExc)-parseFloat(b.totalFareAmountExc)
        });
        priceAsic = priceDesc.reverse();
        this.cacheTypeData = {
            taxData:taxData,
            freeTaxData:freeTaxData,
            priceDesc:priceDesc,
            priceAsic:priceAsic
        }
    },

    taxHandler:function(){
        var priceModal = document.querySelector('#price-modal');
        this.addHandler(priceModal, 'click', function(event){
            var shadowBox = document.querySelector('#r-shadow'),that = ticketDouble;
            var event = event || window.event;
            var target =target||event.srcElement;
            var sibLis =target.parentNode.querySelectorAll('li'),temParaObject={data:{flightInfos:[]}};

            if(target.getAttribute('data-i')=='noTax'){
                if(that.cacheTypeData.freeTaxData.length==0){
                    jAlert('当前航班均含税，换种条件试试!', '', function(){})
                }else{
                    temParaObject.data.flightInfos = that.cacheTypeData.freeTaxData;
                    that.changeFlightList( temParaObject);
                    for(var l= 0,length=sibLis.length;l<length;l++){
                        sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                    }
                }
            }else if(target.getAttribute('data-i')=='hasTax'){
                temParaObject.data.flightInfos = that.cacheTypeData.taxData;
                that.changeFlightList( temParaObject);
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                }
            }else if(target.getAttribute('data-i')=='priceHighToLow'){
                temParaObject.data.flightInfos = that.cacheTypeData.priceDesc;
                that.changeFlightList( temParaObject);
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                }
            }else if(target.getAttribute('data-i')=='priceLowToHigh'){
                temParaObject.data.flightInfos = that.cacheTypeData.priceAsic;
                that.changeFlightList( temParaObject);
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                }
            }

            this.style.transition = 'all 300ms ease-in';
            this.style.webkitTransition = 'all 300ms linear';
            this.style.bottom = '-126%';
            shadowBox.style.display = 'none';
        });
    },

    changeFlightList:function(arg){
        var that = this;
        var ticketDetailUl = document.querySelector('.air-tickets-detail-wrapper'),ticketListStr = '',li;
        ticketDetailUl.innerHTML = that.isClearAll==true?"":ticketDetailUl.innerHTML;
        for(var i = 0; i<arg.data.flightInfos.length;i++ ){
            ticketListStr = '';
            li = document.createElement('li');
            li.className = "air-tickets-detail seat-detail";
            li.setAttribute("data-set-id",arg.data.flightInfos[i].setID);
            ticketListStr += '<div class="time-airport">'+goTrip(arg) + backTrip(arg) +'</div>' + rightPrice(arg.data.flightInfos[i]);
            li.innerHTML = ticketListStr;
            ticketDetailUl.insertBefore(li, ticketDetailUl.childNodes[0]);
            myScroll.refresh();
        }
        that.eventHandler();
        return;
        function goTrip(arg){
            var  data = arg.data.flightInfos[i].segmentsLeave;
            var  transferCity = that.returnTransferCity(arg.data.flightInfos[i].segmentsLeave);
            var  tipDay = arg.data.flightInfos[i].flightLeaveSpacingDay>1?arg.data.flightInfos[i].flightLeaveSpacingDay+'天':'';
            var  str = '';
            var isStrop = arg.data.flightInfos[i].isLeaveStop == true?'&nbsp;|&nbsp;<span class="green-tip">经停</span>':'';
            var isShareFlight = arg.data.flightInfos[i].isReturnShareFlight == true?'&nbsp;|&nbsp;<span class="green-tip">共享</span>':'';
            str+='<div class="go">'+
            '<div class="go-info">'+
            '<div class="start-time-info start-time-info-double">'+
            '<span class="start-icon"></span>'+
            '<span class="time-number">'+that.timeCut(data[0].departDate)+'</span>'+
            '<span class="air-port-word">'+data[0].airportNameFrom+data[0].termDepart+'</span>'+
            '</div>'+
            '<div class="total-time-info">'+
            '<span class="time-hour-minute">'+parseInt(arg.data.flightInfos[i].segmentsLeaveTotalTravelTime/60)+'h'+arg.data.flightInfos[i].segmentsLeaveTotalTravelTime%60+'m</span>'+
            '<span class="arrow-time"></span>'+
            '<span class="air-port-word">'+transferCity+'</span>'+
            '</div>'+
            '<div class="end-time-info">'+
            '<span class="tip-add-days">'+tipDay+'</span>'+
            '<span class="time-number">'+that.timeCut(data[data.length-1].arriveDate)+'</span>'+
            '<span class="air-port-word">'+data[data.length-1].airportNameTo+data[data.length-1].termArrive+'</span>'+
            '</div>'+
            '</div>'+
            '<p class="small-info-double ">'+data[0].operatingCarrierName+data[0].airCorpCode+data[0].planeName+'<span>&nbsp;|&nbsp;</span>'+data[0].cabinClassName+isStrop+isShareFlight+
            '</p>'+
            '</div>';
            return str;
        }
        function backTrip(arg){
            var data = arg.data.flightInfos[i].segmentsReturn;
            var transferCity = that.returnTransferCity(arg.data.flightInfos[i].segmentsReturn);
            var  tipDay = arg.data.flightInfos[i].flightReturnSpacingDay>1?arg.data.flightInfos[i].flightReturnSpacingDay+'天':'';
            var str = '';
            var isStrop = arg.data.flightInfos[i].isLeaveStop == true?'&nbsp;|&nbsp;<span class="green-tip">经停</span>':'';
            var isShareFlight = arg.data.flightInfos[i].isReturnShareFlight == true?'&nbsp;|&nbsp;<span class="green-tip">共享</span>':'';
            str+='<div class="go">'+
            '<div class="go-info">'+
            '<div class="start-time-info start-time-info-double">'+
            '<span class="end-icon"></span>'+
            '<span class="time-number">'+that.timeCut(data[0].departDate)+'</span>'+
            '<span class="air-port-word">'+data[0].airportNameFrom+data[0].termDepart+'</span>'+
            '</div>'+

            '<div class="total-time-info">'+
            '<span class="time-hour-minute">'+parseInt(arg.data.flightInfos[i].segmentsReturnTotalTravelTime/60)+'h'+arg.data.flightInfos[i].segmentsReturnTotalTravelTime%60+'m</span>'+
            '<span class="arrow-time"></span>'+
            '<span class="air-port-word">'+transferCity+'</span>'+

            '</div>'+
            '<div class="end-time-info">'+
            '<span class="tip-add-days">'+tipDay+'</span>'+
            '<span class="time-number">'+that.timeCut(data[data.length-1].arriveDate)+'</span>'+
            '<span class="air-port-word">'+data[data.length-1].airportNameTo+data[data.length-1].termArrive+'</span>'+
            '</div>'+
            '</div>'+
            '<p class="small-info-double ">'+data[0].operatingCarrierName+data[0].airCorpCode+data[0].planeName+'<span>&nbsp;|&nbsp;</span>'+data[0].cabinClassName+isStrop+isShareFlight+
            '</p>'+
            '</div>';
            return str;
        }
        function rightPrice(arg){
            var str = '';
            str +='<div class="price-tax">'+
            '    <div class="price-info"><span class="price-icon">￥</span><span class="price-num">'+parseInt(arg.totalFareAmountExc)+'</span><span class="word-tip">往返</span><br></div>'+
            '    <div class="price-tax-info"><span class="tax-word">税</span>￥'+arg.totalTaxAmountADT+'</div>'+
            '        </div>';
            return str;
        }
    } ,
    callRender:function(arg){
        console.log(arg)
            var paraObj = {},that = ticketDouble;
            paraObj.IsDirectFlight = arg.directFly == 'unlimitedPlane'?'false':'true';
            paraObj.IsShareFlight = arg.shareFlight == 'hideShareFlight'?'false':'true';
            paraObj.DepartStartHour = arg.filterTime.substr(0,2);
            paraObj.DepartEndHour = arg.filterTime.substr(2,2);
            paraObj.CabinClass = arg.CabinClass;
            paraObj.pageNo = 1;
            paraObj.pageSize = 10;
            switch(arg.paraMiddle){
                case "directFirst":
                    paraObj.PriorityRule = 1;break;
                case"lowPriceFirst":
                    paraObj.PriorityRule = 2;break;
                case "shortTimeFirst":
                    paraObj.PriorityRule = 3;break;
                default :
                    paraObj.PriorityRule = 0;
            }
            paraObj.HasTax = arg.paraRight=='hasTax'?"true":"false";
            /*  if(paraObj!=that.bottomInfoData){*/
            for(var tem in paraObj){
                that.backParaObj[tem] = paraObj[tem]
            }
            console.log(that.backParaObj)
            document.querySelector('#preloader').style.display='block';
            that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
            var temObj = that.checkTip();
            that.initLeftState.left!=temObj.left?document.querySelector('#fo_sc i').className='red-tip':document.querySelector('#fo_sc i').className='';
            that.initLeftState.middle!=temObj.middle?document.querySelector('#fo_ra i').className='red-tip':document.querySelector('#fo_ra i').className='';
            that.initLeftState.right!=temObj.right?document.querySelector('#fo_lo i').className='red-tip':document.querySelector('#fo_lo i').className='';
            /* }*/
        },

    toSeatDetail:function(){
        var oLis =  document.querySelectorAll('.seat-detail'),that = ticketDouble;
        for(var i = 0 ;i < oLis.length; i ++){
            this.addHandler(oLis[i], 'click', function(){
                document.location.href ='ticket_seat_choose.html?setId='+this.getAttribute('data-set-id')+'&RouteType='+that.backParaObj.RouteType+
                '&CabinClass='+that.backParaObj.CabinClass+'&NumofAdult='+that.backParaObj.NumofAdult+'&NumofChild='+that.backParaObj.NumofChild;
            })

        }
    },
    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage,data = localStorage.getItem(key),dataObj = JSON.parse(data);
            return JSON.stringify(dataObj.data);
        }
    },
    renderHandler:function(arg){
        var that = ticketDouble;
        arg = JSON.parse(arg);
        console.log(arg)
        document.querySelector('#preloader').style.display='none';
        if(arg.success&&arg.code==200&&arg.data.flightInfos.length > 0){
            that.flightResultArray.push(arg["data"])
            that.storageUtil.set('flightListData',that.flightResultArray);
            that.pageNo = arg.data.pageNo;
            that.pageCount = arg.data.pageCount;
            that.changeFlightList(arg);
            that.taxDeal(arg.data.flightInfos);
        }else{
            document.querySelector('#preloader').style.display='none';
            that.alertNoFlightNotice(that.backParaObj,'single')
        }
    },
    pullDownAction:function(){
        var  that = ticketDouble;
        if(that.pageNo >= that.pageCount){
            console.log(11)
            myScroll.refresh()
            jAlert('没有更多航班信息了','',function(){})
        }else if(that.pageNo < that.pageCount){
            console.log(22)
            that.isClearAll = false;
            that.backParaObj["pageNo"] ++;
            console.log(that.backParaObj)
            that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
        }
    },
    pullUpAction:function(){
        var  that = ticketDouble;
        if(that.pageNo >= that.pageCount){
            console.log(33)
            myScroll.refresh()
            jAlert('没有更多航班信息了','',function(){})
        }else if(that.pageNo < that.pageCount){
            console.log(44)
            that.isClearAll = false;
            that.backParaObj["pageNo"] ++;
            console.log(that.backParaObj)
            that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
        }
    },
    loaded:function(){
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        myScroll = new iScroll('wrapper', {
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                if (pullDownEl.className.match('loading')) {
                    console.log(111)
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                } else if (pullUpEl.className.match('loading')) {
                    console.log(222)
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                }
            },
            onScrollMove: function () {
                console.log(55)
                if (this.y > 5 && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                    pullDownEl.className = '';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -pullDownOffset;
                } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
                if (pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    console.log(66)
                    ticketDouble.pullDownAction();
                } else if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                    console.log(77)
                    ticketDouble.pullUpAction();
                }
            }
        });
        /*}*/
    },
    init:function(){
        var backParaObj = this.parseUrlPara(document.location.search, true),that = ticketDouble;
        document.querySelector('.set-place').innerHTML =backParaObj.fromCity;
        document.querySelector('.to-place').innerHTML =backParaObj.toCity;
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        document.addEventListener('DOMContentLoaded', function () { setTimeout(that.loaded, 200); }, false);
        this.tripType = "international"; //international backParaObj.tripType ,domestic
        backParaObj.NumofAdult = parseInt(backParaObj.NumofAdult);
        backParaObj.NumofChild = parseInt(backParaObj.NumofChild);
        backParaObj.PriorityRule = parseInt(backParaObj.PriorityRule);
        backParaObj.pageNo = parseInt(backParaObj.pageNo);
        backParaObj.pageSize = parseInt(backParaObj.pageSize);
        this.backParaObj = backParaObj;
        this.dateInit(backParaObj);
        this.toSeatDetail();
        this.tAjax(this.requestUrl, backParaObj, "3001", 3, this.renderHandler);
        if($.browser.webkit && !window.chrome){
            document.querySelector('#wrapper').style.top = '88px';
        }
        bottomModal.init('all-elements',this.tripType,"double",this.callRender);
        this.taxHandler();
        this.isClearAll = true;
        this.flightResultArray = [];
        this.initLeftState = this.checkTip();
    }
};

ticketDouble.init();