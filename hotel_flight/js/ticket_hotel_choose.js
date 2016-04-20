var ticketHotel = {
    requestUrl: 'http://10.6.11.20:8888/ ',

    isStop: true,

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

    tAjax: function (questUrl, data, Code, ForeEndType, Callback, loadMoreSign) {
        var that = this, dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl ? questUrl : that.requestUrl;
        if (loadMoreSign) {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback, false, false, loadMoreSign);
        } else {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        }
    },

    storageUtil: {
        set: function (type, key,  v) {
            var storageOr = type=='local'?window.localStorage:window.sessionStorage;
            storageOr.setItem(key, JSON.stringify({data: v}))
        },
        get: function (type, key) {
            var storageOr = type=='local'?window.localStorage:window.sessionStorage, data = storageOr.getItem(key), dataObj = JSON.parse(data);
            if(dataObj){
                return JSON.stringify(dataObj.data);
            }
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

    eventHandler: function () {
        var detailEle = document.querySelector('.detail-text-arrow'), that = ticketHotel, shadowEle= document.querySelector('.shadow');
        var detailLine = document.querySelector('.summary-cost-modal'), icon=document.querySelector('.icon-arrow');
        var roomOuter = document.querySelector('.room-ul-outer'), reBack = document.querySelector('.edit-button'), hotelDetail = document.querySelector('.hotel-info-data-item');
        var toFlightDetail = document.querySelector('.flight-detail');

        var hide = function(){ detailLine.style.bottom = "-50px";
            shadowEle.style.display = 'none';
            icon.className="icon-arrow arrow-down";};
        var show = function(){ detailLine.style.bottom = "50px";
            shadowEle.style.display = 'block';
            icon.className="icon-arrow arrow-up";};
        this.addHandler(reBack, 'click', function (){
           window.location.href = 'index.html';
        });

        this.addHandler(hotelDetail, 'click', function (){
            var paraObject = {};
            paraObject.HotelID = that.cacheData.hotelInfo.hotelID;
            paraObject.SelectedRoomID = that.cacheRoomId;
            paraObject.FlightCacheID =that.cacheData.flightInfo.cacheID;
            paraObject.FlightSetID =that.cacheData.flightInfo.setID;
            paraObject.CityCodeFrom =that.cacheData.flightInfo.cityCodeFrom;
            paraObject.CityCodeTo =that.cacheData.flightInfo.cityCodeTo;
            paraObject.DepartDate =that.cacheData.flightInfo.flightLeaveStartDate;
            paraObject.ReturnDate =that.cacheData.flightInfo.flightReturnStartDate;
            paraObject.RoomDetails =that.initParaObj.RoomDetails;
            console.log(paraObject)
            that.storageUtil.set('hotelDetailInfo', paraObject);
            if(that.cacheRoomId){
                alert('请选择房间！')
            }else{
                window.location.href = 'hotel_detail.html';
            }
           /* var testPara= { //最终参数形式
                    "HotelID": "11911",
                    "SelectedRoomID": 173151,
                    "FlightCacheID": "1013219",
                    "FlightSetID": "1003003",
                    "CityCodeFrom": "SIN",
                    "CityCodeTo": "BKK",
                    "DepartDate": "2016-05-07",
                    "ReturnDate": "2016-05-08",
                    "RoomDetails": [{"Adult": 2}]
            }*/
        });

        this.addHandler(toFlightDetail, 'click', function (){
            window.location.href = 'ticket-detail.html';
        });

        this.addHandler(detailEle, 'click', function (){
            alert(1)
            var event = event || window.event;
            var target =target||event.srcElement;
            event.stopPropagation();
            event.cancelable = true;
            if(target.className=='detail'){
                alert(2)
                detailLine.style.webkitTransition = "all 300ms";
                shadowEle.style.display=='block'?hide():show();
            }else if(target.id=='confirm-button'){

            }
        });

        this.addHandler(document, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            if(target.className=='shadow'){
                detailLine.style.webkitTransition = "all 300ms";
                shadowEle.style.display=='block'?hide():show();
            }
        });

        this.addHandler(roomOuter, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            var ele,allButton,roomId,tem=null, roomData = that.cacheRoomData, priceDetail, totalPackagePrice= 0, orderTotalFare = document.querySelector('.order-total-fare');
            var detailPrice = [
                '{% if(data["category"]==1){ %}<p>成人费用 x <span>{%=quantity%}</span> <span> ￥{%=totalAmount%}</span></p>{% } %}',
                '{% if(data["category"]==2){ %}<p>儿童费用 x <span>{%=quantity%}</span> <span> ￥{%=totalAmount%}</span></p>{% } %}'
            ].join('');
            if(target.className=='no-choose-button'){
                ele = target.parentNode.parentNode;
                allButton = ele.parentNode.querySelectorAll('button');
                for(var t = 0, length =allButton.length;t<length;t++){
                    if(allButton[t]==target){
                        allButton[t].className='has-choose-button';
                        allButton[t].innerHTML='已选择';
                    }else{
                        allButton[t].className='no-choose-button';
                        allButton[t].innerHTML='选择';
                    }
                }
                roomId= ele.getAttribute('data-room-id');
                for(var k = 0, len =roomData.length;k<len;k++){
                    if(roomData[k]['roomID']==roomId){
                        tem = roomData[k].prices;
                        that.cacheRoomId=roomId;
                        break;
                    }
                }
                priceDetail = template(detailPrice, tem);
                for(var p= 0,len_=tem.length;p<len_;p++){
                    totalPackagePrice+=tem[p].totalAmount;
                }
               // totalPackagePrice='￥'+tem[p].totalAmount;
                $('.summary-cost-modal').eq(0).html(priceDetail);
                orderTotalFare.innerHTML = totalPackagePrice;
            }
        });
    },
    changeHandler:function(){
        var changeFlight = document.querySelector('.change-flight-action'), changeHotel = document.querySelector('.change-hotel-action');
        this.addHandler(changeFlight, 'click', function (event){
            var that = ticketHotel, tag=that.isStop;
            var paraObj = that.initParaObj;
            /* paraObj = {//最终格式
             CityCodeFrom: "SIN",
             CityCodeTo: "BKK",
             DepartDate: "2016-05-10T00:00:00",
             ReturnDate: "2016-05-15T00:00:00",
             RoomDetails: [{Adult: "2", ChildWithoutBed: [6]}],
             AirwayCacheID: "13752",
             AirwaySetID: "1002001",
             SortFields: [0],
             ScreenFields":[1]
             };*/
            if(tag){
                event.preventDefault();
                alert('稍后再试');
            }else{
                paraObj.AirwayCacheID = that.cacheData.airwayCacheID;
                paraObj.AirwaySetID = that.cacheData.airwaySetID;
                paraObj.SortFields = [0];
                paraObj.ScreenFields=[1];
                that.storageUtil.set('local', 'changeFlightParaObj',paraObj);
            }
        });

        this.addHandler(changeHotel, 'click', function (){
            var that = ticketHotel, tag=that.isStop;
            var paraObj = that.initParaObj;
             /*paraObj = {//最终格式
                     "SelectedHotelID": "1005455",
                     "FlightCacheID": "13767",
                     "FlightSetID": "1002001",
                     "CityCodeFrom": "SIN",
                     "CityCodeTo": "BKK",
                     "DepartDate": "2016-05-07",
                     "ReturnDate": "2016-05-08",
                     "SortFields": [1, 3],
                     "PageNo": 1,
                     "PageSize": 20,
                     "RoomDetails": [{"Adult": 2}]
                 }*/
            if(tag){
                event.preventDefault();
                alert('稍后再试');
            }else{
                paraObj.SelectedHotelID = that.cacheData.hotelInfo.hotelID;
                paraObj.FlightCacheID = that.cacheData.flightInfo.cacheID;
                paraObj.FlightSetID = that.cacheData.flightInfo.setID;
                paraObj.SortFields = [1, 3];
                paraObj.PageNo = 1;
                paraObj.PageSize = 20;
                that.storageUtil.set('local','changeHotelParaObj',paraObj);
            }
        });

    },
    renderHandler:function(arg){
        var resultData = arg, that = ticketHotel;
        if(!resultData)return;
        if (resultData.success) {
            if (resultData.data == null) {
                window.location.href = 'no_result.html';
            } else {
                //document.querySelector('#preloader').style.display='none';
                that.cacheData = resultData.data;
                console.log(resultData.data)
                that.cacheRoomData = resultData.data.hotelInfo.rooms;
                that.storageUtil.set('session','flightHotelAllData', resultData.data);
                that.storageUtil.set('local','curFlightHotelInfo', resultData.data);
                that.storageUtil.set('local','curFlightDetailInfo', resultData.data.flightInfo);
                var temp_flightInfo = [
                    '<div class="trip-go">',
                    '<div class="title-date-address">',
                    '<span class="icon go-icon"></span>',
                    '<span class="go-date"> {%=flightLeaveStartDate_md%}</span>',
                    '<span class="go-week"> {%=flightLeaveStartDate_week%}</span>',
                    '<span class="go-set-city"> {%=flightLeaveStartAirportNameFrom%}</span>',
                    ' -',
                    '<span class="go-off-city"> {%=flightLeaveStartAirportNameTo%}</span>',
                    '</div>',
                    '<div class="time-port-day">',
                    '<div class="left">',
                    '<span class="start-time">{%=flightLeaveStartDate_clock%}</span>',
                    '<span class="start-port">{%=flightLeaveStartAirportNameFrom%}</span>',
                    '</div>',
                    '<div class="middle">',
                    '<div class="time-cost">{%=segmentsReturnTotalTravelTimeString%}</div>',
                    '<div class="to-arrow"></div>',
                    '<div class="transfer-city">{%=flightLeaveTransercity%}</div>',
                    '</div>',
                    '<div class="right">',
                    '<span class="arrive-time">{%=flightLeaveEndtDate_clock%}</span>' +
                    '{% if(data["flightLeaveSpacingDay"]){ %}<span class="tip">+{%=flightLeaveSpacingDay%}天</span>{% } %}',
                    '<span class="arrive-port">{%=flightLeaveStartAirportNameTo%}</span>',
                    '</div>',
                    '<p><span>{%=flightLeaveStartOperatingCarrierName%}</span><span> | {%=flightLeaveStartPlaneType%}</span><span> | {%=flightLeaveStartPlaneName%}</span></p>',
                    '</div>',
                    '</div>',
                    '<div class="spend-line">',
                    '<hr><span class="flight-detail"></span>',
                    '</div>',
                    '<div class="trip-back">',
                    '<div class="title-date-address">',
                    '<span class="icon back-icon"></span>',
                    '<span class="back-date"> {%=flightReturnStartDate_md%}</span>',
                    '<span class="back-week"> {%=flightReturnStartDate_week%}</span>',
                    '<span class="back-set-city"> {%=flightReturnStartAirportNameFrom%}</span>',
                    ' -',
                    '<span class="back-off-city"> {%=flightReturnStartAirportNameTo%}</span>',
                    '</div>',
                    '<div class="time-port-day">',
                    '<div class="left">',
                    '<span class="start-time">{%=flightReturnStartDate_clock%}</span>',
                    '<span class="start-port">{%=flightReturnStartOperatingCarrierName%}</span>',
                    '</div>',
                    '<div class="middle">',
                    '<div class="time-cost">{%=segmentsReturnTotalTravelTimeString%}</div>',
                    '<div class="to-arrow"></div>',
                    '<div class="transfer-city">{%=hotelPictureURL%}</div>',
                    '</div>',
                    '<div class="right">',
                    '<span class="arrive-time">{%=flightReturnEndDate_clock%}</span>' +
                    '{% if(data["flightReturnSpacingDay"]){ %}<span class="tip">+{%=flightReturnSpacingDay%}天</span>{% } %}',
                    '<span class="arrive-port">{%=flightReturnStartAirportNameTo%}</span>',
                    '</div>',
                    '<p><span>{%=flightReturnStartOperatingCarrierName%}</span><span> | {%=flightReturnStartPlaneType%}</span><span> | {%=flightReturnStartPlaneName%}</span></p>',
                    '</div>',
                    '</div>'].join('');

                var temp_hotelInfo = [
                    '<h4 class="hotel-name">{%=hotelName%}</h4>',
                    '<div class="hotel-info-outer">',
                    '<div class="ho_pic">',
                    '<img src="{%=hotelPictureURL%}" class="ho_img">',
                    '</div>',
                    '<div class="hotel-info-data-item">',
                    '<div class="date-date">',
                    '<span class="set-date-off">11月25日</span> - <span class="set-date-stop">11月26日<span class="total-night-number">共<span>7</span>晚</span></span>',
                    '</div>',
                    '<div class="score-person-number">',
                    '{% if(data["score"]){ %}<span class="score-value">{%=score%}</span>分{% } %}',
                    '{% if(data["commentPersonNUmber"]){ %} / <span class="person-number-value">{%=commentPersonNUmber%}</span>人点评{% } %}',
                    '</div>',
                    '<p class="star-class">',
                    '<span class="star-text">{%=starRating%}星级</span>',
                    '{% if(data["freeWifi"]){ %}<span class="wifi-icon"></span>{% } %}',
                    '{% if(data["freeBus"]){ %}<span class="car-icon"></span>{% } %}',
                    '</p>',
                    '</div>',
                    '<div class="arrow-icon"></div>',
                    '</div>'].join('');
                var roomStr =[
                    '<li class="has-chosen" data-room-id="{%=roomID%}">',
                       '<div class="room-name-detail">',
                        '<h4>{%=roomName%}</h4>',
                          '<p>',
                         '{% if(data["includedBreakfast"]){ %}<span>含早</span>{% } %}',
                         '{% if(data["plusBed"]){ %}<span>可加床</span>{% } %}',
                         '{% if(data["freeWifi"]){ %}<span>免费wifi</span>{% } %}',
                          '</p>',
                       '</div>',
                       '<div class="palss-price-button">',
                       '<span>+￥</span><span>{%=totalAmount%}</span>',
                       '<button class="no-choose-button">选择</button>',
                      '</div>',
                '</li>'].join('');
                var returnWeek = function(arg){
                    var arg = arg.replace(/T.*/,'');
                    var index = new Date(arg.replace(/-/g,'/')).getDay(), week='';
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
                        default :void(0)
                    }
                    return week;
                };
                var flightInfo =resultData.data.flightInfo;
                var hotelInfo = resultData.data.hotelInfo;
                var roomInfo = resultData.data.hotelInfo.rooms;
                var flightDataHandler = function(arg){
                    var result = {};
                    result.flightLeaveStartDate_md = arg.flightLeaveStartDate.substr(5,5);
                    result.flightLeaveStartDate_clock = arg.flightLeaveStartDate.substr(11,5);
                    result.flightLeaveStartDate_week = returnWeek(arg.flightLeaveStartDate);
                    result.flightLeaveEndDate_md = arg.flightLeaveEndDate.substr(5,5);
                    result.flightLeaveEndtDate_clock = arg.flightLeaveEndDate.substr(11,5);
                    result.flightLeaveEndtDate_week = returnWeek(arg.flightLeaveEndDate);
                    result.flightReturnStartDate_md = arg.flightReturnStartDate.substr(5,5);
                    result.flightReturnStartDate_clock = arg.flightReturnStartDate.substr(11,5);
                    result.flightReturnStartDate_week = returnWeek(arg.flightReturnStartDate);
                    result.flightReturnEndDate_md = arg.flightReturnEndDate.substr(5,5);
                    result.flightReturnEndDate_clock = arg.flightReturnEndDate.substr(11,5);
                    result.flightReturnEndDate_week = returnWeek(arg.flightReturnEndDate);
                    result.segmentsLeaveTotalTravelTimeString = arg.segmentsLeaveTotalTravelTimeString;
                    result.segmentsReturnTotalTravelTimeString = arg.segmentsReturnTotalTravelTimeString;
                    result.flightLeaveSpacingDay = arg.flightLeaveSpacingDay;
                    result.flightReturnSpacingDay = arg.flightReturnSpacingDay;
                    if(arg.segmentsLeave.length==1){
                        result.flightLeaveStartAirportNameFrom  = arg.segmentsLeave[0].airportNameFrom;
                        result.flightLeaveStartAirportNameTo  = arg.segmentsLeave[0].airportNameTo;
                        result.flightLeaveStartOperatingCarrierName = arg.segmentsLeave[0].operatingCarrierName;
                        result.flightLeaveStartPlaneType = arg.segmentsLeave[0].planeType;
                        result.flightLeaveStartPlaneName = arg.segmentsLeave[0].planeName;
                        result.flightLeaveTransercity = "";
                    }else if(arg.segmentsLeave.length==2){
                        result.flightLeaveStartAirportNameFrom  = arg.segmentsLeave[0].airportNameFrom;
                        result.flightLeaveStartAirportNameTo  = arg.segmentsLeave[1].airportNameTo;
                        result.flightLeaveStartOperatingCarrierName = arg.segmentsLeave[1].operatingCarrierName;
                        result.flightLeaveStartPlaneType = arg.segmentsLeave[1].planeType;
                        result.flightLeaveStartPlaneName = arg.segmentsLeave[1].planeName;
                        result.flightLeaveTransercity = arg.segmentsLeave[0].airportNameFrom;
                    }else if(arg.segmentsLeave.length>2){
                        result.flightLeaveStartAirportNameFrom  = arg.segmentsLeave[0].airportNameFrom;
                        result.flightLeaveStartAirportNameTo  = arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameTo;
                        result.flightLeaveStartOperatingCarrierName = arg.segmentsLeave[arg.segmentsLeave.length-1].operatingCarrierName;
                        result.flightLeaveStartPlaneType = arg.segmentsLeave[arg.segmentsLeave.length-1].planeType;
                        result.flightLeaveStartPlaneName = arg.segmentsLeave[arg.segmentsLeave.length-1].planeName;
                        result.flightLeaveTransercity = (arg.segmentsLeave.length-1)+"次"
                    }

                    if(arg.segmentsReturn.length==1){
                        result.flightReturnStartAirportNameFrom  = arg.segmentsReturn[0].airportNameFrom;
                        result.flightReturnStartAirportNameTo  = arg.segmentsReturn[0].airportNameTo;
                        result.flightReturnStartOperatingCarrierName = arg.segmentsReturn[0].operatingCarrierName;
                        result.flightReturnStartPlaneType = arg.segmentsReturn[0].planeType;
                        result.flightReturnStartPlaneName = arg.segmentsReturn[0].planeName;
                        result.flightReturnTransercity = "";
                    }else if(arg.segmentsReturn.length==2){
                        result.flightReturnStartAirportNameFrom  = arg.segmentsReturn[0].airportNameFrom;
                        result.flightReturnStartAirportNameTo  = arg.segmentsReturn[1].airportNameTo;
                        result.flightReturnStartOperatingCarrierName = arg.segmentsReturn[1].operatingCarrierName;
                        result.flightReturnStartPlaneType = arg.segmentsReturn[1].planeType;
                        result.flightReturnStartPlaneName = arg.segmentsReturn[1].planeName;
                        result.flightReturnTransercity = arg.segmentsReturn[0].airportNameFrom;
                    }else if(arg.segmentsLeave.length>2){
                        result.flightReturnStartAirportNameFrom  = arg.segmentsReturn[0].airportNameFrom;
                        result.flightReturnStartAirportNameTo  = arg.segmentsReturn[arg.segmentsReturn.length-1].airportNameTo;
                        result.flightReturnStartOperatingCarrierName = arg.segmentsReturn[arg.segmentsReturn.length-1].operatingCarrierName;
                        result.flightReturnStartPlaneType = arg.segmentsReturn[arg.segmentsReturn.length-1].planeType;
                        result.flightReturnStartPlaneName = arg.segmentsReturn[arg.segmentsReturn.length-1].planeName;
                        result.flightReturnTransercity = (arg.segmentsReturn.length-1)+"次"
                    }
                    return result;
                };
                var hotelDateHandler = function(arg){
                    var result = arg;
                    var star = arg.starRating;
                    var StarRatingHandler = function(starStr) {
                        switch (starStr.charCodeAt(0)) {
                            case 49:
                                return '一';
                                break;
                            case 50:
                                return '二';
                                break;
                            case 51:
                                return '三';
                                break;
                            case 52:
                                return '四';
                                break;
                            case 53:
                                return '五';
                                break;
                            case 54:
                                return '六';
                                break;
                            case 55:
                                return '七';
                                break;
                            default:
                                return '五';
                                break;
                        }
                    };
                    result.starRating = StarRatingHandler(star);
                    return result;
                };
                flightInfo = flightDataHandler(flightInfo);
                hotelInfo = hotelDateHandler(hotelInfo);
                var flightInfoTags = template(temp_flightInfo, flightInfo);
                var hotelInfoTags = template(temp_hotelInfo, hotelInfo);
                var roomInfoTags = template(roomStr, roomInfo);
                $('.flight-summary-info').eq(0).html(flightInfoTags);
                $('.hotel-summary-info').eq(0).html(hotelInfoTags);
                $('.room-ul-outer').eq(0).html(roomInfoTags);
                that.eventHandler();
                that.isStop = false;
            }
        }else {
            $("#preloader").fadeOut();
            jAlert(resultData.message, "提示");
        }
    },
    init:function () {
        var storagePara = JSON.parse(window.localStorage.getItem('searchInfo')), initParaObj={};
        var flightHotelData = this.storageUtil.get('session','flightHotelAllData');
        console.log(flightHotelData)
        this.cacheRoomId = '';
        initParaObj.CityCodeFrom = storagePara.FromCity;
        initParaObj.CityCodeTo = storagePara.ToCity;
        initParaObj.DepartDate = storagePara.DepartDate;
        initParaObj.ReturnDate = storagePara.ReturnDate;
        initParaObj.RoomDetails = storagePara.RoomInfo;
        this.initParaObj = initParaObj;
        if(!flightHotelData){
            var initParaObj = {
                CityCodeFrom: "SIN",
                CityCodeTo: "BKK",
                DepartDate: "2016-05-17T00:00:00",
                ReturnDate: "2016-05-25T00:00:00",
                RoomDetails: [{Adult: "2", ChildWithoutBed: [6]}]
            };
            this.initParaObj = initParaObj;
            this.tAjax(this.requestUrl, initParaObj, "50100001", 3, this.renderHandler);
        }else{
            var temObj = {};
            temObj.success = true;
            temObj.data = flightHotelData;
            this.renderHandler(temObj);
        }
        this.changeHandler();
    }
};
ticketHotel.init();