
var ticketSeatChoose = {

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    addHandler: function (target, eventType, handle) {
        if (document.addEventListener) {
            ticketSeatChoose.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            ticketSeatChoose.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            ticketSeatChoose.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        ticketSeatChoose.addHandler(target, eventType, handle);
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

    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage,data = localStorage.getItem(key),dataObj = JSON.parse(data);
            if(dataObj!=null){
                return dataObj.data;
            }
        }
    },

    test:function(arg){
        console.log(arg)
    },
    loadingFade:function(){
        $(window).load(function () {
            $("#status-f").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    },
    addEvent:function(){
        var reserveButton = document.querySelector('#reserve-button');
        var changeExplain = document.querySelector('#change-explain');
        var ticketShadow = document.querySelector('.ticket-shadow');
        var detailWord = document.querySelector('.detail-word');
        var that = this;

        this.addHandler(reserveButton,'click', function(){
            var that = ticketSeatChoose;
            var login;
            var totalCountCost = that.curFlightListData.totalTaxAmountADT ==0?that.curFlightListData.totalFareAmountExc*parseInt(that.assistInfo.NumofAdult):
            that.curFlightListData.totalFareAmountExc*parseInt(that.assistInfo.NumofAdult) + (that.curFlightListData.totalFareAmountCHD+that.curFlightListData.totalTaxAmountCHD)*parseInt(that.assistInfo.NumofChild);
            var reverseInformationCache = {
                WapOrder:{
                    SetID:that.currentFlightData.setID,
                    CacheID:that.currentFlightData.cacheID,
                    CityCodeFrom: that.currentFlightData.cityCodeFrom,
                    CityCodeTo: that.currentFlightData.cityCodeTo,
                    NumofAdult: that.assistInfo.NumofAdult,
                    NumofChild: that.curFlightListData.totalTaxAmountADT ==0?0:that.assistInfo.NumofChild,
                    RouteType: that.assistInfo.RouteType,
                    CabinClass: that.assistInfo.CabinClass,
                    IP: "",   //非必需
                    DeviceID: "", //非必需
                    SourceType:"H5", //非必需
                    Version: "" //非必需
                },
                TravellerInfo:[],
                ContactDetail:{},
                CurrencyCode: "CNY",
                TotalFlightPrice: totalCountCost
            };
            var loginResult = function(arg){
                reverseInformationCache["WapOrder"]["MemberId"] = window.localStorage.memberid;
                that.storageUtil.set('reverseInformationCache',reverseInformationCache);
                document.location.href = 'ticket_order.html';
            };
            vlm.checkLogin(loginResult)
        });
        this.addHandler(changeExplain,'click', function(event){
            var event = event || window.event;
            if (document.all) {
                event.cancelBubble = true;
            } else {
                event.stopPropagation();
            }

            jLayer('<p style="padding-left: 15px">退改签规则，以航司为准!</p>','退改签说明',function(){})
        });

        this.addHandler(detailWord,'click', function(event){
            console.log(22222222)
            $("#preloader").show();
            $("#status-f").show();
            $("#status-f").delay(400).fadeOut("medium");
            $("#preloader").delay(400).fadeOut("medium");
            ticketShadow.style.display = 'block';
            document.querySelector('.ticket-detail-modal').style.display = 'block';
        });
        this.addHandler(ticketShadow,'click', function(event){
            var event = event || window.event;
            var target =event.target || event.srcElement;
            if(target.className == 'ticket-shadow'){
                ticketShadow.style.display = 'none';
                document.querySelector('.ticket-detail-modal').style.display = 'none';
            }
        });
      /*  this.addHandler(document,'click', function(event){
            var event = event || window.event;
            var target =event.target || event.srcElement;
            if(target.id == 'popup_overlay')
                    document.body.removeChild(document.querySelector('#popup_overlay'));
                    if(document.querySelector('#popup_container')){
                    document.body.removeChild(document.querySelector('#popup_container'));
            }
        });*/
    },

    returnDate:function(arg){
        var argArray = /(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}/.exec(arg);
        var transferData = argArray[1]+'-'+argArray[2]+'-'+argArray[3];
        var index = new Date(transferData.replace(/-/g,'/')).getDay(),week='';
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
                return ''
        }
        array = arg.split('-');
        array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
        array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
        return '<span class="month-day">'+array[1]+'-'+array[2]+'</span>'+'<span class="week-day-item">'+week+'</span>';

    },
    timeCut:function(arg){
        var reg = /\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}/g,result = reg.exec(arg);
        return result[1]+':'+result[2];
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

    createGoTripHtml:function(arg){
        var that = ticketSeatChoose;
        var tipDay = arg.flightLeaveSpacingDay>1?arg.flightLeaveSpacingDay+'天':'',str='';
        if(arg.segmentsReturn == null)
        {
            str = '<div class="go-trip">' +
                '<div class="top-line top-pad-no"">' +
                '</span>'+that.returnDate(arg.flightLeaveStartDate)+
                '<span class="start">'+arg.cityNameFrom+'</span>'+
                '<span class="line">-</span><span class="end">'+arg.cityNameTo+'</span>' +
                '<span class="detail-word">详情<i></i></span></div>' +
                '<div class="time-airport-info"><div class="start-time-info">' +
                '<span class="time-number">'+that.timeCut(arg.flightLeaveStartDate)+'</span>' +
                '<span class="air-port-word">'+arg.segmentsLeave[0].airportNameFrom+arg.segmentsLeave[0].termDepart+'</span></div>' +
                '<div class="total-time-info"><span class="time-hour-minute">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span>'+
                '<span class="arrow-time"></span>'+that.returnTransferCity(arg.segmentsLeave)+'</div>'+
                '<div class="end-time-info">'+
                ' <span class="tip-add-days-seat">'+tipDay+'</span>'+
                '<span class="time-number">'+that.timeCut(arg.flightLeaveEndDate)+'</span>'+
                '<span class="air-port-word-right">'+arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameTo+arg.segmentsLeave[arg.segmentsLeave.length-1].termArrive+'</span>'+
                '</div>'+
                '</div>'+
                '<div class="bottom-word">'+
                '<span>'+arg.segmentsLeave[0].airCorpName+'</span>'+
                '<span>|</span>'+
                '<span>'+arg.segmentsLeave[0].airCorpCode+arg.segmentsLeave[0].flightNo+'</span>'+
                '<span>|</span>'+
                '<span>'+arg.segmentsLeave[0].planeName+'</span></span>'+
                '</div>'+
                '</div>';
        }
        else
        {
            str = '<div class="go-trip">' +
                '<div class="top-line">' +
                '<span class="icon-go"></span>'+that.returnDate(arg.flightLeaveStartDate)+
                '<span class="start">'+arg.cityNameFrom+'</span>'+
                '<span class="line">-</span><span class="end">'+arg.cityNameTo+'</span>' +
                '<span class="detail-word">详情<i></i></span></div>' +
                '<div class="time-airport-info"><div class="start-time-info">' +
                '<span class="time-number">'+that.timeCut(arg.flightLeaveStartDate)+'</span>' +
                '<span class="air-port-word">'+arg.segmentsLeave[0].airportNameFrom+arg.segmentsLeave[0].termDepart+'</span></div>' +
                '<div class="total-time-info"><span class="time-hour-minute">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span>'+
                '<span class="arrow-time"></span>'+that.returnTransferCity(arg.segmentsLeave)+'</div>'+
                '<div class="end-time-info">'+
                ' <span class="tip-add-days-seat">'+tipDay+'</span>'+
                '<span class="time-number">'+that.timeCut(arg.flightLeaveEndDate)+'</span>'+
                '<span class="air-port-word-right">'+arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameTo+arg.segmentsLeave[arg.segmentsLeave.length-1].termArrive+'</span>'+
                '</div>'+
                '</div>'+
                '<div class="bottom-word">'+
                '<span>'+arg.segmentsLeave[0].airCorpName+'</span>'+
                '<span>|</span>'+
                '<span>'+arg.segmentsLeave[0].airCorpCode+arg.segmentsLeave[0].flightNo+'</span>'+
                '<span>|</span>'+
                '<span>'+arg.segmentsLeave[0].planeName+'</span></span>'+
                '</div>'+
                '</div>';
        }
        return str
    },
    createBackTripHtml:function(arg){
        if(arg.segmentsReturn){
            console.log(arg.segmentsReturn)
            var tipDay = arg.flightReturnSpacingDay>1?arg.flightReturnSpacingDay+'天':'',str='',that =this;
            str='<div class="back-trip">'+
            '<div class="top-line">'+
            '<span class="icon-back"></span>'+that.returnDate(arg.flightReturnStartDate)+
            '<span class="start">'+arg.cityNameTo+'</span>'+
            '<span class="line">-</span>'+
            '<span class="end">'+arg.cityNameFrom+'</span>'+
            '</div>'+
            '<div class="time-airport-info">'+
            '<div class="start-time-info">'+
            '<span class="time-number">'+that.timeCut(arg.flightReturnStartDate)+'</span>'+
            '<span class="air-port-word">'+arg.segmentsReturn[0].airportNameFrom+arg.segmentsReturn[0].termDepart+'</span>'+
            '</div>'+
            '<div class="total-time-info">'+
            '<span class="time-hour-minute">'+parseInt(arg.segmentsReturnTotalTravelTime/60)+'h'+arg.segmentsReturnTotalTravelTime%60+'m</span>'+
            '<span class="arrow-time"></span>'+
            '<span class="air-port-word">'+that.returnTransferCity(arg.segmentsReturn)+'</span>'+
            '</div>'+
            '<div class="end-time-info">'+
            '<span class="tip-add-days-seat">'+tipDay+'</span>'+
            '<span class="time-number">'+that.timeCut(arg.flightReturnEndDate)+'</span>'+
            '<span class="air-port-word-right">'+arg.segmentsReturn[arg.segmentsReturn.length-1].airportNameTo+arg.segmentsReturn[arg.segmentsReturn.length-1].termArrive+'</span>'+
            '</div>'+
            '</div>'+
            '<div class="bottom-word">'+
            '<div class="left">'+
            '<span>'+arg.segmentsReturn[0].operatingCarrierName+'</span>'+
            '<span> | </span>'+
            '<span>'+arg.segmentsReturn[0].operatingCarrierCode+arg.segmentsReturn[0].flightNo+'</span>'+
            '<span> | </span>'+
            '<span>'+arg.segmentsReturn[0].planeName+arg.segmentsReturn[0].planeType+'</span></span>'+
            '</div>'+
            '<div class="right">'+
            '<span>实际乘坐</span>'+
            '<span>'+arg.segmentsReturn[0].operatingCarrierName+'</span>'+
            '<span>'+arg.segmentsReturn[0].planeName+'</span>'+
            '</div>'+
            '</div>'+
            '</div>'
        }else{
            str=''
        }
        return str;
    },
    createDetailModal:function(arg){
        var that = ticketSeatChoose;
        var strModal='<div class="ticket-detail-modal" style="display: none;"><ul class="detail-outer">'+detailGo(arg)+detailBack(arg)+'</ul></div>';
        return strModal;
        function detailGo(arg){
            var str = '';
            if(arg.segmentsReturn == null)
            {
                str += '<li class="detail-start">' +
                    '<div class="top-line top-pad-no">'+that.returnDate(arg.flightLeaveStartDate)+'<span class="start">'+arg.cityNameFrom+'</span><span class="line">-</span><span class="end">'+arg.cityNameTo+'</span>' +
                    '<span class="detail-hour">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span></div>'+createFlightUnit(arg.segmentsLeave)+'</li>';
            }
            else
            {
                str += '<li class="detail-start">' +
                    '<div class="top-line"><span class="icon-go"></span>'+that.returnDate(arg.flightLeaveStartDate)+'<span class="start">'+arg.cityNameFrom+'</span><span class="line">-</span><span class="end">'+arg.cityNameTo+'</span>' +
                    '<span class="detail-hour">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span></div>'+createFlightUnit(arg.segmentsLeave)+'</li>';
            }
            return str;

        }
        function detailBack(arg){
            var str = '';
            if(arg.segmentsReturn){
                str += '<li class="detail-start">' +
                '<div class="top-line"><span class="icon-back"></span>'+that.returnDate(arg.flightReturnStartDate)+'<span class="start">'+arg.cityNameTo+'</span><span class="line">-</span><span class="end">'+arg.cityNameFrom+'</span>' +
                '<span class="detail-hour">'+parseInt(arg.segmentsReturnTotalTravelTime/60)+'h'+arg.segmentsReturnTotalTravelTime%60+'m</span></div>'+createFlightUnit(arg.segmentsReturn)+'</li>';
            }
            return str;
            }
        function createFlightUnit(arg){

               var str = '',transferStr='',dayStr='',that = ticketSeatChoose;
            if(arg){
                for(var j = 0;j<arg.length;j++){
                    console.log(arg[j])
                    transferStr= arg[j+1]!=undefined?'<div class="transit-city-hour">中转'+arg[j].cityNameTo+'</div>':'';
                    dayStr= Math.floor((new Date(arg[j].arriveDate) - new Date(arg[j].departDate))/1000/60/60/24)>=1?Math.floor((new Date(arg[j].arriveDate) - new Date(arg[j].departDate))/1000/60/60/24)+'天':'';
                    str+='<div class="go-trip start">' +
                    '<div class="time-airport-info">'+
                    '<div class="start-time-info">'+
                    '<span class="time-number">'+that.timeCut(arg[j].departDate)+'</span>'+
                    '<span class="air-port-word">'+arg[j].airportNameFrom+arg[j].termDepart+'</span>'+
                    '</div>'+
                    '<div class="total-time-info">'+
                    '<span class="time-hour-minute"></span>'+
                    '<span class="arrow-time"></span>'+
                    '</div>'+
                    '<div class="end-time-info">'+
                    '<span class="tip-add-days-seat">'+dayStr+'</span>'+
                    '<span class="time-number">'+that.timeCut(arg[j].arriveDate)+'</span>'+
                    '<span class="air-port-word-right">'+arg[j].airportNameTo+arg[j].termArrive+'</span>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bottom-word">'+
                    '<span>'+arg[j].airCorpName+'</span>'+
                    '<span>|</span>'+
                    '<span>'+arg[j].airCorpCode+arg[j].flightNo+'</span>'+
                    '<span>|</span>'+
                    '<span>'+arg[j].planeName+'</span>'+
                    '</div>'+
                    '</div>'+transferStr;
                }
            }
               return str;
           }
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
    createHtml:function(){
        var dataPools = this.storageUtil.get('flightListData'), resultData = {},that = this,setID = this.assistInfo.setId,summaryHtml='';
        var myFixed = function(arg){
            if(String(arg).indexOf('.')>-1){
                if(String(arg).substring(String(arg).indexOf('.')).length ==2){
                    return String(arg)+'0';
                }
                return String(arg).substring(0,String(arg).indexOf('.')+3)
            }else{
                return String(arg)+'.00';
            }
        };

        var allEle = document.querySelector('.all-elements'),itemObj={},backMeal ='';
             dataPools.forEach(function(obj){
                 obj["flightInfos"].forEach(function(obj_){
                     if(obj_.setID == setID){
                         resultData = obj_;
                         return;
                     }
                 })
        });
        itemObj = resultData;

        this.curFlightListData = itemObj;
        console.log(this.curFlightListData)
        this.storageUtil.set('curFlightListData',itemObj);
        this.currentFlightData = itemObj;
        var classNameStr = this.assistInfo.RouteType == 'Return'?'direction-double':'direction-single',childOrderStr = this.curFlightListData.totalFareAmountCHD==0?'<span>儿童不可定</span>':'';
        var headerHtml ='<header class="big-title"><i class="fl" onclick="window.history.go(-1)"></i><span class="set-place">'+itemObj.cityNameFrom+'</span><i class="'+classNameStr+'"></i><span class="to-place">'+itemObj.cityNameTo+'</span></header>'
        var contentHtml ='<div class="air_content" style="background:#f5f4f9;">' +
            '<ul class="air-tickets-detail berths"><li class="air-tickets-detail-berths">'+that.createGoTripHtml(itemObj)+that.createBackTripHtml(itemObj)+'</li></ul>'+
            '<div class="price-important">' +
            '<div class="left-part"><h4>'+itemObj.segmentsLeave[0].cabinClassName+'</h4>' +
            '<p><span class="change" id="change-explain">退改签说明</span>'+childOrderStr+'</p>' +
            '</div>'+
            '<div class="money-show-data"><span class="tag-one"> ￥</span><span class="money-number">'+myFixed(itemObj.totalFareAmountExc)+'</span> <p>税费￥'+myFixed(itemObj.totalTaxAmountADT)+'</p>' +
            '</div><button type="button" id="reserve-button">预订</button></div>' +
            '<div class="bottom-word-more">买单程票须持留学生转签证、移民签证，一年以上工作签证等证件类型，请您确认后购买，以免无法办理乘机和入境。'+
            '</div></div>';
        backMeal ='<div class="ticket-shadow" style="display: none"></div><div class="buy-ticket-notice back-meal" style="display: none;">' +
        '<div class="header back-meal-close"><span>退改签说明</span><span><i></i></span></div><div class="content-notice ">' +
        '<p>退改签规则，以航司为准!</p>' +
        '</div>' +
        '</div>';
        allEle.innerHTML = headerHtml + contentHtml + backMeal + this.createDetailModal(itemObj);
    },

    init:function(){
        this.assistInfo = this.parseUrlPara(document.location.search, true);
        this.createHtml();
        this.loadingFade();
        this.addEvent();
    }
};

ticketSeatChoose.init();