var ticketHotel = {

    requestUrl: 'http://10.6.11.20:8888/GetService',

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
        questUrl = questUrl ? questUrl :"";
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
        var roomOuter = document.querySelector('.room-ul-outer'), reBack = document.querySelector('.edit-button'), hotelDetail = document.querySelector('.hotel-info-outer');
        var toFlightDetail = document.querySelector('.flight-detail'), checkMore = document.querySelector('.check-more-room');
        var backEle = document.querySelector('.header-back');

        var hide = function(){ detailLine.style.bottom = "-50px";
            shadowEle.style.display = 'none';
            icon.className="icon-arrow arrow-down";};
        var show = function(){ detailLine.style.bottom = "50px";
            shadowEle.style.display = 'block';
            icon.className="icon-arrow arrow-up";};
        this.addHandler(reBack, 'click', function (){
            window.sessionStorage.removeItem('flightHotelAllData');
            window.location.href = 'index.html?isInit=1';
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
            if(!that.cacheRoomId){
                jAlert('请先选择房间', "提示");
            }else{
               that.storageUtil.set('local','hotelDetailInfo', paraObject);
               window.location.href = 'hotel_detail.html?selectedRooId='+that.cacheRoomId;
            }
        });

        this.addHandler(backEle, 'click', function (){
            window.sessionStorage.removeItem('flightHotelAllData')
            window.location.href = 'index.html?isInit=1';
        });
        this.addHandler(toFlightDetail, 'click', function (){
            window.location.href = 'ticket-detail.html';
        });

        this.addHandler(detailEle, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            if(!that.cacheRoomId){
                jAlert('请先选择房间', "提示");
            }else{
                event.stopPropagation();
                event.cancelable = true;
                if(target.className=='detail'||target.className.indexOf('icon-arrow')>-1){
                    detailLine.style.webkitTransition = "all 300ms";
                    shadowEle.style.display=='block'?hide():show();
                }else if(target.id=='confirm-button'){
                }
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

        this.addHandler(checkMore, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement,moreStr='',innerStr, length=0;
            var tempEle= $(".room-ul-outer").eq(0);
            var tplRoom = [
                '<li class="has-chosen" data-room-id="{%=roomID%}">',
                '<div class="room-name-detail">',
                '<h4>{%=roomName%}</h4>',
                '<p>',
                '{% if(data["includedBreakfast"]){ %}<span>含早</span>{% } %}',
                '{% if(data["plusBed"]){ %}<span>可加床</span>{% } %}',
                '{% if(data["isFreeWiFi"]){ %}<span>免费wifi</span>{% } %}',
                '</p>',
                '</div>',
                '<div class="palss-price-button">',
                '<span>+￥</span><span>{%=addtionalPrice%}</span>',
                '<button class="no-choose-button">选择</button>',
                '</div>',
                '</li>'].join('');
            if($(".check-more-room").eq(0).text().indexOf('查')>-1){
                moreStr = template(tplRoom, that.temBackRoom);
                tempEle.html(tempEle.html() + moreStr) + moreStr;
                innerStr = '收起更多房型<span class="check-more-down"></span>';
                $(".check-more-room").eq(0).html(innerStr).show();
            }else{
                moreStr = template(tplRoom, that.temSmallRoom);
                tempEle.html( moreStr);

                length = that.temBackRoom.length;
                innerStr = '查看更多房型<span>('+length+')</span><span class="check-more-down"></span>';
                $(".check-more-room").eq(0).html(innerStr).show();
            }
            that.selectedRoomHandler();
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
                        that.cacheRoomName=roomData[k].roomName;
                        that.cachePriceDetailInfo=roomData[k];
                        break;
                    }
                }
                priceDetail = template(detailPrice, tem);
                for(var p= 0,len_=tem.length;p<len_;p++){
                    totalPackagePrice+=tem[p].totalAmount;
                }
                $('.summary-cost-modal').eq(0).html(priceDetail);
                orderTotalFare.innerHTML = totalPackagePrice;
            }
        });
    },

    loadingFade:function(){
        $(window).load(function () {
            $("#status-f").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    },
    selectedRoomHandler:function(){
        var that = ticketHotel;
        var allButton = document.querySelectorAll('.room-ul-outer button');
        var allLi = document.querySelectorAll('.room-ul-outer li');
        var orderTotalFare = document.querySelector('.order-total-fare');
        var detailPrice = [
            '{% if(data["category"]==1){ %}<p>成人费用 x <span>{%=quantity%}</span> <span> ￥{%=totalAmount%}</span></p>{% } %}',
            '{% if(data["category"]==2){ %}<p>儿童费用 x <span>{%=quantity%}</span> <span> ￥{%=totalAmount%}</span></p>{% } %}'
        ].join('');
        for(var h= 0, len= allLi.length;h<len;h++) {
            var roomIdTem = allLi[h].getAttribute('data-room-id'), tem, priceDetail, totalPackagePrice=0;
            if (that.cacheRoomId) {
                if (that.cacheRoomId == roomIdTem) {
                    var button = allLi[h].querySelector('button');
                    button.className = 'has-choose-button';
                    button.innerHTML = '已选择';
                }
            }else{
                allButton[0].className = 'has-choose-button';
                allButton[0].innerHTML = '已选择';
                that.cacheRoomId = allButton[0].parentNode.parentNode.getAttribute('data-room-id');
            }
        }
        var roomData = that.cacheRoomData;
        for(var k = 0, leng =roomData.length;k<leng;k++){
            if(roomData[k]['roomID']==that.cacheRoomId){
                tem = roomData[k].prices;
                that.cachePriceDetailInfo=roomData[k];
                that.cacheRoomName=roomData[k].roomName;
                break;
            }
        }
        priceDetail = template(detailPrice, tem);
        for(var p= 0,len_=tem.length;p<len_;p++){
            totalPackagePrice+=tem[p].totalAmount;
        }
        $('.summary-cost-modal').eq(0).html(priceDetail);
        orderTotalFare.innerHTML = totalPackagePrice;
    },
    changeHandler:function(){
        var changeFlight = document.querySelector('.change-flight-action'), changeHotel = document.querySelector('.change-hotel-action');
        var confirmButton =  document.querySelector('#confirm-button');
        this.addHandler(changeFlight, 'click', function (event){
            var that = ticketHotel;
            var paraObj = that.initParaObj;
                paraObj.AirwayCacheID = that.cacheData.airwayCacheID;
                paraObj.AirwaySetID = that.cacheData.airwaySetID;
                paraObj.FlightCacheID = that.cacheData.airwayCacheID;
                paraObj.FlightSetID = that.cacheData.airwaySetID;
                paraObj.SortFields = [0];
                paraObj.ScreenFields=[0];
                paraObj.DepartDate = that.initParaObj.DepartDate;
                paraObj.ReturnDate = that.initParaObj.ReturnDate;
                that.storageUtil.set('local', 'changeFlightParaObj',paraObj);
        });
        this.addHandler(changeHotel, 'click', function (){
            var that = ticketHotel;
            var paraObj = that.initParaObj;
            var resetNum =function(arg){
                var num = 0;
                switch (arg){
                    case "一" :
                        num=1;
                        break;
                    case "二" :
                        num=1;
                        break;
                    case "三" :
                        num=2;
                        break;
                    case "四" :
                        num=4;
                        break;
                    case "五" :
                        num=8;
                        break;
                    default :num=0;
                }
                return num;
            };
            paraObj.DepartDate=paraObj.DepartDate.replace(/T.*/,'');
            paraObj.ReturnDate=paraObj.ReturnDate.replace(/T.*/,'');
            paraObj.SelectedHotelID = that.cacheData.hotelInfo.hotelID || "";
            paraObj.Location = that.cacheData.hotelInfo.location || "";
            paraObj.StarRating = resetNum(that.cacheData.hotelInfo.starRating);
            paraObj.SelectedRoomID = that.cacheRoomId || "";
            paraObj.FlightCacheID = that.cacheData.flightInfo.cacheID || "";
            paraObj.FlightSetID = that.cacheData.flightInfo.setID || "";
            paraObj.SortFields = [0] || [];
            paraObj.PageNo = 1 ;
            paraObj.PageSize = 20;
            that.storageUtil.set('local','changeHotelParaObj',paraObj);
        });
        this.addHandler(confirmButton, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            event.stopPropagation();
            var that = ticketHotel, orderPara={};
            orderPara.SetID=that.cacheData.flightInfo.setID;
            orderPara.CacheID= that.cacheData.flightInfo.cacheID;
            orderPara.CityCodeFrom=that.cacheData.flightInfo.cityCodeFrom;
            orderPara.CityCodeTo=that.cacheData.flightInfo.cityCodeTo;
            orderPara.cabinClass=that.cacheData.flightInfo.cabinClass;
            orderPara.DepartDate=that.initParaObj.DepartDate.replace(/T.*/,'');
            orderPara.ReturnDate=that.initParaObj.ReturnDate.replace(/T.*/,'');
            orderPara.HotelID=that.cacheData.hotelInfo.hotelID;
            orderPara.Name=that.cacheData.hotelInfo.hotelName;
            orderPara.RoomID=that.cacheRoomId;
            orderPara.RoomName=that.cacheRoomName;
            orderPara.RoomDetails=that.initParaObj.RoomDetails;
            orderPara.priceDetail=that.cachePriceDetailInfo;
            orderPara.CurrencyCode=that.cacheData.hotelInfo.currencyCode;
            that.storageUtil.set('local','createOrderParaPart', orderPara);
            that.timerq = setTimeout(function(){
                window.clearTimeout(that.timerq);
                that.timerq = null;
                that.testLogin();
            },500);

        });
    },
    testLogin:function(){
        if(vlm.checkLogin('ticketHotel.testLogin')){
            window.top.location.href='../hotel_flight/user_order.html';
        }
    },
    renderHandler:function(arg){
        var resultData = arg, that = ticketHotel, originAirIds={};
        if(!resultData)return;
        if (resultData.success && resultData.code == '200') {
            if (resultData.data == null) {
                window.location.href = 'no_result.html';
            } else {
                that.loadingFade();
                that.cacheData = resultData.data;
                originAirIds.AirwayCacheID = resultData.data.airwayCacheID;
                originAirIds.AirwaySetID = resultData.data.airwaySetID;
                window.localStorage.setItem('originAirIds',JSON.stringify(originAirIds));
                if(resultData.data.hotelInfo){
                    that.cacheRoomData = resultData.data.hotelInfo.rooms;
                }
                that.storageUtil.set('session','flightHotelAllData', resultData.data);
                that.storageUtil.set('local','curFlightHotelInfo', resultData.data);
                that.storageUtil.set('local','curFlightDetailInfo', resultData.data.flightInfo);
                var temp_flightInfo = [
                    '<div class="trip-go">',
                    '<div class="title-date-address">',
                    '<span class="icon go-icon"></span>',
                    '<span class="go-date"> {%=flightLeaveStartDate_md%}</span>',
                    '<span class="go-week"> {%=flightLeaveStartDate_week%}</span>',
                    '<span class="go-set-city"> {%=flightLeaveStartCityNameFrom%}</span>', //cityNameFrom
                    ' -',
                    '<span class="go-off-city"> {%=flightLeaveStartCityNameTo%}</span>',   //cityNameTo
                    '</div>',
                    '<div class="time-port-day">',
                    '<div class="left">',
                    '<span class="start-time">{%=flightLeaveStartDate_clock%}</span>',
                    '<span class="start-port">{%=flightLeaveStartAirportNameFrom%}{%=flightLeaveStartTermDepart%}</span>',
                    '</div>',
                    '<div class="middle">',
                    '<div class="time-cost">{%=segmentsLeaveTotalTravelTimeString%}</div>',
                    '<div class="to-arrow"></div>',
                    '<div class="transfer-city">{%=flightLeaveTransercity%}</div>',
                    '</div>',
                    '<div class="right">',
                    '<span class="arrive-time">{%=flightLeaveEndtDate_clock%}</span>' +
                    '{% if(data["flightLeaveSpacingDay"]){ %}<span class="tip">+{%=flightLeaveSpacingDay%}天</span>{% } %}',
                    '<span class="arrive-port">{%=flightLeaveStartAirportNameTo%}{%=flightLeaveStartTermArrive%}</span>',
                    '</div>',
                    '<p><span>{%=flightLeaveStartOperatingCarrierName%}</span><span> | {%=flightLeaveStartAirCorpCode%}{%=flightLeaveStartFlightNo%}</span><span> | {%=flightLeaveStartPlaneName%}</span></p>',
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
                    '<span class="back-set-city"> {%=flightReturnStartCityNameFrom%}</span>',
                    ' -',
                    '<span class="back-off-city"> {%=flightReturnStartCityNameTo%}</span>',
                    '</div>',
                    '<div class="time-port-day">',
                    '<div class="left">',
                    '<span class="start-time">{%=flightReturnStartDate_clock%}</span>',
                    '<span class="start-port">{%=flightReturnStartAirportNameFrom%}{%=flightReturnStartTermDepart%}</span>',
                    '</div>',
                    '<div class="middle">',
                    '<div class="time-cost">{%=segmentsReturnTotalTravelTimeString%}</div>',
                    '<div class="to-arrow"></div>',
                    '<div class="transfer-city">{%=flightReturnTransercity%}</div>',
                    '</div>',
                    '<div class="right">',
                    '<span class="arrive-time">{%=flightReturnEndDate_clock%}</span>' +
                    '{% if(data["flightReturnSpacingDay"]){ %}<span class="tip">+{%=flightReturnSpacingDay%}天</span>{% } %}',
                    '<span class="arrive-port">{%=flightReturnStartAirportNameTo%}{%=flightReturnStartTermArrive%}</span>',
                    '</div>',
                    '<p><span>{%=flightReturnStartOperatingCarrierName%}</span><span> | {%=flightReturnStartAirCorpCode%}{%=flightReturnStartFlightNo%}</span></span><span> | {%=flightReturnStartPlaneName%}</span></span></p>',
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
                    '<span class="set-date-off">{%=DepartDate%}</span> - <span class="set-date-stop">{%=ReturnDate%}<span class="total-night-number">共<span>{%=DayNum%}</span>晚</span></span>',
                    '</div>',
                    '<div class="score-person-number">',
                    '{% if(data["score"]){ %}<span class="score-value">{%=score%}</span>分{% } %}',
                    '{% if(data["commentPersonNUmber"]){ %} / <span class="person-number-value">{%=commentPersonNUmber%}</span>人点评{% } %}',
                    '</div>',
                    '<p class="star-class">',
                    '<span class="star-text">{%=starRating%}星级</span>',
                    '{% if(data["isFreeWiFi"]){ %}<span class="wifi-icon"></span>{% } %}',
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
                         '{% if(data["isFreeWiFi"]){ %}<span>免费wifi</span>{% } %}',
                          '</p>',
                       '</div>',
                       '<div class="palss-price-button">',
                       '<span>+￥</span><span>{%=addtionalPrice%}</span>',
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
                var roomInfo = resultData.data.hotelInfo.rooms, temSmallRoom = [], temBackRoom = [], length= 0, roomInfoTags;
                if(resultData.data.hotelInfo.rooms){
                      if(resultData.data.hotelInfo.rooms.length<=2){
                          temSmallRoom = resultData.data.hotelInfo.rooms;
                          roomInfoTags=template(roomStr, temSmallRoom);
                          $(".check-more-room").eq(0).html(innerStr).hide();
                      }else{
                          length = resultData.data.hotelInfo.rooms.length-2;
                          var innerStr = '查看更多房型<span>('+length+')</span><span class="check-more-down"></span>';
                          $(".check-more-room").eq(0).html(innerStr).show();
                          temSmallRoom=resultData.data.hotelInfo.rooms.slice(0,2);
                          temBackRoom = resultData.data.hotelInfo.rooms.slice(2);
                          that.temSmallRoom = temSmallRoom;
                          that.temBackRoom = temBackRoom;
                          roomInfoTags=template(roomStr, temSmallRoom);
                    }
                }
                var flightDataHandler = function(arg){
                    var result = {}, cabin='';
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
                    switch(arg.cabinClass){
                        case 0 :
                            cabin = '经济舱';
                            break;
                        case 1 :
                            cabin = '头等舱';
                            break;
                        case 2 :
                            cabin = '商务舱';
                            break;
                        case 3 :
                            cabin = '超级经济舱';
                            break;
                        default :void(0);
                    }
                    result.cabinClass = cabin;
                    result.flightLeaveStartCityNameFrom  = arg.cityNameFrom;
                    result.flightLeaveStartCityNameTo  = arg.cityNameTo;
                    result.flightLeaveStartAirportNameFrom  = arg.segmentsLeave[0].airportNameFrom;
                    result.flightLeaveStartTermDepart  = arg.segmentsLeave[0].termDepart;
                    result.flightLeaveStartAirportNameTo  = arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameTo;
                    result.flightLeaveStartTermArrive  = arg.segmentsLeave[arg.segmentsLeave.length-1].termArrive;
                    result.flightLeaveStartAirCorpCode = arg.segmentsLeave[arg.segmentsLeave.length-1].airCorpCode;
                    result.flightLeaveStartFlightNo = arg.segmentsLeave[arg.segmentsLeave.length-1].flightNo;
                    result.flightLeaveStartOperatingCarrierName = arg.segmentsLeave[arg.segmentsLeave.length-1].operatingCarrierName;
                    result.flightLeaveStartPlaneType = arg.segmentsLeave[arg.segmentsLeave.length-1].planeType;
                    result.flightLeaveStartPlaneName = arg.segmentsLeave[arg.segmentsLeave.length-1].planeName;
                    if(arg.transferListLeave){
                        if(arg.transferListLeave.length==1){
                            result.flightLeaveTransercity = '转'+arg.transferListLeave[0]
                        }else if(arg.transferListLeave.length>1){
                            result.flightLeaveTransercity = '转'+arg.transferListLeave.length+"次";
                        }
                    }else{
                        result.flightLeaveTransercity = ''
                    }

                    if(arg.transferListReturn){
                        if(arg.transferListReturn.length==1){
                            result.flightReturnTransercity = '转'+arg.transferListReturn[0]
                        }else if(arg.transferListReturn.length>1){
                            result.flightReturnTransercity = '转'+arg.transferListReturn.length+"次";
                        }
                    }else{
                        result.flightReturnTransercity = ''
                    }
                    result.flightReturnStartCityNameFrom  = arg.cityNameTo;
                    result.flightReturnStartCityNameTo  = arg.cityNameFrom;
                    result.flightReturnStartAirportNameFrom  = arg.segmentsReturn[0].airportNameFrom;
                    result.flightReturnStartTermDepart  = arg.segmentsReturn[0].termDepart;
                    result.flightReturnStartAirportNameTo  = arg.segmentsReturn[arg.segmentsReturn.length-1].airportNameTo;
                    result.flightReturnStartTermArrive  = arg.segmentsReturn[arg.segmentsLeave.length-1].termArrive;
                    result.flightReturnStartAirCorpCode = arg.segmentsReturn[arg.segmentsReturn.length-1].airCorpCode;
                    result.flightReturnStartFlightNo = arg.segmentsReturn[arg.segmentsReturn.length-1].flightNo;
                    result.flightReturnStartOperatingCarrierName = arg.segmentsReturn[arg.segmentsReturn.length-1].operatingCarrierName;
                    result.flightReturnStartPlaneType = arg.segmentsReturn[arg.segmentsReturn.length-1].planeType;
                    result.flightReturnStartPlaneName = arg.segmentsReturn[arg.segmentsReturn.length-1].planeName;
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

                var returnDay=function(g){
                    var week,array;
                    array = g.split('-');
                    array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
                    array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
                    return array[1]+'月'+array[2]+'日';
                };
                var getDayNum=function(arg1, arg2) {
                    var time1 = Date.parse(arg1.replace(/-/g, "/")), time2 = Date.parse(arg2.replace(/-/g, "/")), dayCount;
                    return dayCount = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
                },
                flightInfo = flightDataHandler(flightInfo);
                hotelInfo = hotelDateHandler(hotelInfo);
                hotelInfo.DepartDate = returnDay(that.initParaObj.DepartDate);
                hotelInfo.ReturnDate =returnDay(that.initParaObj.ReturnDate);
                hotelInfo.DayNum =getDayNum(that.initParaObj.DepartDate.replace(/T.*/,''), that.initParaObj.ReturnDate.replace(/T.*/,''));
                var flightInfoTags = template(temp_flightInfo, flightInfo);
                var hotelInfoTags = template(temp_hotelInfo, hotelInfo);
                $('.flight-summary-info').eq(0).html(flightInfoTags);
                $('.hotel-summary-info').eq(0).html(hotelInfoTags);
                $('.room-ul-outer').eq(0).html(roomInfoTags);
                that.eventHandler();
                that.selectedRoomHandler();
                that.changeHandler();
            }
        }else{
             window.location.href='no_result.html';
        }
    },
    initTop:function(arg){
        var startEle = document.querySelector('.set-date');
        var endEle = document.querySelector('.arrive-date');
        var adult = document.querySelector('.adult-ft');
        var child = document.querySelector('.child-ft');
        var startP = document.querySelector('.origin');
        var arriveP = document.querySelector('.destination');
        var returnWeek=function(g){
                var week,array;
                array = g.split('-');
                array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
                array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
                return array[1]+'月'+array[2]+'日';
            };
        startEle.innerHTML= '出发:'+returnWeek(arg.DepartDate.replace(/T.*/,''));
        endEle.innerHTML= '返程:'+returnWeek(arg.ReturnDate.replace(/T.*/,''));
        adult.innerHTML= arg.AdultNum+'成人';
        child.innerHTML= arg.ChildNum+'儿童';
        startP.innerHTML= arg.FromCityNameCN;
        arriveP.innerHTML= arg.ToCityNameCN;
    },
    init:function () {
        var storagePara = JSON.parse(window.localStorage.getItem('searchInfo')), initParaObj={},roomSelectedId = '';
        var temFlightHotelData = window.sessionStorage.getItem('flightHotelAllData');
        var temRoomIdStr = window.location.search;
        initParaObj.CityCodeFrom = storagePara.FromCity;
        initParaObj.CityCodeTo = storagePara.ToCity;
        initParaObj.DepartDate = storagePara.DepartDate;
        initParaObj.ReturnDate = storagePara.ReturnDate;
        initParaObj.RoomDetails = storagePara.RoomInfo;
        initParaObj.flightStartTime = 0;
        this.initTop(storagePara);
        if(temRoomIdStr&&temRoomIdStr!="?init"){
            this.cacheRoomId = temRoomIdStr.slice(temRoomIdStr.indexOf('=')+1)
        }else{
            this.cacheRoomId = '';
        }
        this.initParaObj = initParaObj;
        if(!temFlightHotelData){
            $("#status-f").show();
            $("#preloader").show();
            this.tAjax(this.requestUrl, initParaObj, "50100001", 3, this.renderHandler);
        }else {
            var flightHotelData = JSON.parse(temFlightHotelData), temObj = {};
            var originAirIds = JSON.parse(window.localStorage.getItem('originAirIds'));
            if (window.location.search.indexOf('init') > -1) {
                if (flightHotelData.data.airwaySetID !== originAirIds.AirwaySetID || flightHotelData.data.airwayCacheID !== originAirIds.AirwayCacheID) {
                    this.initParaObj.AirwayCacheID = flightHotelData.data.airwayCacheID;
                    this.initParaObj.AirwaySetID = flightHotelData.data.airwaySetID;
                } else {
                    this.initParaObj.AirwayCacheID = originAirIds.AirwayCacheID;
                    this.initParaObj.AirwaySetID = originAirIds.AirwaySetID;
                }
                $("#status-f").show();
                $("#preloader").show();
                this.tAjax(this.requestUrl, this.initParaObj, "50100001", 3, this.renderHandler);
            } else{
                temObj.success = true;
                temObj.code = 200;
                temObj.data = {};
                temObj.data.airwayCacheID = flightHotelData.data.airwayCacheID;
                temObj.data.airwayCacheID = flightHotelData.data.airwaySetID;
                temObj.data.flightInfo = flightHotelData.data.flightInfo;
                temObj.data.hotelInfo = flightHotelData.data.hotelInfo;
                this.renderHandler(temObj);
            }
        }
    }
};
ticketHotel.init();
