/**
 * Created by Venson on 2016/4/18.
 */
var changeFlightInfo;
var oldFlightInfo;
var flight_list = {
    requestUrl:"http://10.6.11.28:1337/api/GetServiceApiResult",
    getById:function(obj){
        return document.getElementById(obj);
    },
    getByClass:function(obj){
        return document.getElementsByClassName(obj);
    },
    getWeekDay:function(date){
        var final_date = date.substr(0,10).replace(/-/g,'/');
        var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
        return week;
    },//格式化日期,
    formatDate:function(date,format) {
        if(date.indexOf('T')  > -1){
            date = date.replace("T"," ");
            if(date.indexOf("-") > -1){
                date = date.replace(/-/g,"/");
            }
            date = new Date(date);
        }

        var paddNum = function (num) {
            num += "";
            return num.replace(/^(\d)$/, "0$1");
        };
        //指定格式字符
        var cfg = {
            yyyy: date.getFullYear() //年 : 4位
            , yy: date.getFullYear().toString().substring(2)//年 : 2位
            , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
            , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
            , d: date.getDay()   //日 : 如果1位的时候不补0
            , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
            , hh: paddNum(date.getHours())  //时
            , mm: paddNum(date.getMinutes()) //分
            , ss: paddNum(date.getSeconds()) //秒
        };
        //console.log(cfg);
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    },
    getweekly:function(date){
        week = ["日","一","二","三","四","五","六"];
        return week[date];
    },
    replaceElement:function(array,element,ch){
        for(var i = 0;i < array.length;i++){
            if(array[i] == element){
                array[i] = ch;
            }
        }
        return array;
    },
    //      页面加载机票数据
    getTicketList:function(){
        var that = this;
        var sendData = changeFlightInfo.data;

        $('#departData').html(that.formatDate(sendData.DepartDate,"MM-dd"));
        $('#returnData').html(that.formatDate(sendData.ReturnDate,"MM-dd"));
        $('#departWeek').html("周"+that.getweekly(that.formatDate(sendData.DepartDate,"d")));
        $('#returnWeek').html("周"+that.getweekly(that.formatDate(sendData.ReturnDate,"d")));
        var tpl1 = [
            '{% for(var i=0;i < flightInfoListGroup.length;i++){ %}',
            '<div class="price-up">以下航班需加<span>￥{%=flightInfoListGroup[i].additionalPrice%}</span></div>',
            '<ul class="js-air-list air-tickets-detail air-tickets-detail-wrapper">',
            '{% for(var j=0;j < flightInfoListGroup[i].flightInfoList.length;j++){ %}',
            '<li class="js-air-item air-tickets-detail seat-detail" data-setID="{%=flightInfoListGroup[i].flightInfoList[j].setID%}" data-cacheID="{%=flightInfoListGroup[i].flightInfoList[j].cacheID%}">',
            '<div class="time-airport">',
            '<div class="go">',
            '<div class="go-info">',
            '<div class="start-time-info start-time-info-double">',
            '<span class="start-icon"></span>',
            '<span class="leave-start-time time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveStartDate.substr(11,5)%}</span>',
            '<span class="leave-start-airport air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].airportNameFrom%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].termDepart%}</span>',
            '</div>',
            '<div class="total-time-info">',
            '<span class="leave-totaltime time-hour-minute">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeaveTotalTravelTimeString%}</span>',
            '<span class="arrow-time"></span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].directFlight==1){ %}',
            '<span class="air-port-word">转',
            '{% for(var n=0;n < flightInfoListGroup[i].flightInfoList[j].transferListLeave.length;n++){ %}',
            '{%=flightInfoListGroup[i].flightInfoList[j].transferListLeave[n]%} ',
            '{% } %}',
            '</span>',
            '{% } %}',
            '</div>',
            '<div class="end-time-info">',
            '<span class="leave-end-time time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveEndDate.substr(11,5)%}</span>',
            '<span class="leave-end-airport air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[flightInfoListGroup[i].flightInfoList[j].segmentsLeave.length-1].airportNameTo%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[flightInfoListGroup[i].flightInfoList[j].segmentsLeave.length-1].termArrive%}</span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].flightLeaveSpacingDay !=0){ %}',
            '<span class="tip-add-days">+{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveSpacingDay%}天</span>',
            '{% } %}',
            '</div>',
            '</div>',
            '<p class="small-info-double ">',
            '<span class="leave-airway">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].operatingCarrierName%} | </span>',
            '<span class="leave-planetype">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].planeType%} | </span>',
            '<span class="leave-planename">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].planeName%} | </span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].cabinClass==0){ %}',
            '<span class="leave-space">经济舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==1){ %}',
            '<span class="leave-space">头等舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==2){ %}',
            '<span class="leave-space">商务舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==3){ %}',
            '<span class="leave-space">超级经济舱舱</span>',
            '{% } %}',
            '{% if(flightInfoListGroup[i].flightInfoList[j].isLeaveShareFlight){ %}',
            '<span>&nbsp;|&nbsp;</span>',
            '<span class="green-tip">共享</span>',
            '{% } %}',
            '</p>',
            '</div>',
            '<div class="go">',
            '<div class="go-info">',
            '<div class="start-time-info start-time-info-double">',
            '<span class="end-icon"></span>',
            '<span class="return-start-time time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightReturnStartDate.substr(11,5)%}</span>',
            '<span class="return-start-airport air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].airportNameFrom%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].termDepart%}</span>',
            '</div>',
            '<div class="total-time-info">',
            '<span class="return-totaltime time-hour-minute">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturnTotalTravelTimeString%}</span>',
            '<span class="arrow-time"></span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].directFlight==1){ %}',
            '<span class="air-port-word">转',
            '{% for(var m=0;m < flightInfoListGroup[i].flightInfoList[j].transferListReturn.length;m++){ %}',
            '{%=flightInfoListGroup[i].flightInfoList[j].transferListReturn[m]%} ',
            '{% } %}',
            '</span>',
            '{% } %}',
            '</div>',
            '<div class="end-time-info">',
            '{% if(flightInfoListGroup[i].flightInfoList[j].flightReturnSpacingDay !=0){ %}',
            '<span class="tip-add-days">+{%=flightInfoListGroup[i].flightInfoList[j].flightReturnSpacingDay%}天</span>',
            '{% } %}',
            '<span class="return-end-time time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightReturnEndDate.substr(11,5)%}</span>',
            '<span class="return-start-airport air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[flightInfoListGroup[i].flightInfoList[j].segmentsReturn.length-1].airportNameTo%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[flightInfoListGroup[i].flightInfoList[j].segmentsReturn.length-1].termArrive%}</span>',
            '</div>',
            '</div>',
            '<p class="small-info-double ">',
            '<span class="return-airway">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].operatingCarrierName%} | </span>',
            '<span class="return-planetype">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].planeType%} | </span>',
            '<span class="return-planename">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].planeName%} | </span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].cabinClass==0){ %}',
            '<span class="return-space">经济舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==1){ %}',
            '<span class="return-space">头等舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==2){ %}',
            '<span class="return-space">商务舱</span>',
            '{% }else if(flightInfoListGroup[i].flightInfoList[j].cabinClass==3){ %}',
            '<span class="return-space">超级经济舱舱</span>',
            '{% } %}',

            '{% if(flightInfoListGroup[i].flightInfoList[j].isReturnShareFlight){ %}',
            '<span>&nbsp;|&nbsp;</span>',
            '<span class="green-tip">共享</span>',
            '{% } %}',
            '</p>',
            '</div>',
            '</div>',
            '{% if(i==0&&j==0){ %}',
            '<b class="hf-icon hf-gou cho-gou"></b>',
            '{% }else{ %}',
            '<b class="hf-icon hf-gou"></b>',
            '{% } %}',
            '</li>',
            '{% } %}',
            '</ul>',
            '{% } %}'
        ].join('');
        var tpl2 = [
          '{% for(var i = 0;i < airways.length;i++){ %}',
          '<li class="airway" data-airwaySetID="{%=airways[i].airwaySetID%}" data-airwayCacheID="{%=airways[i].airwayCacheID%}" data-type="{%=i%}">',
          '<div>',
          '<img src="{%=airways[i].airwayLogo%}" />',
          '</div>',
          '<span class="airway-name">{%=airways[i].chineseName%}</span>',
          '<div class="aw-price">',
          '<apan>+￥</apan><apnn >{%=airways[i].additionalPrice%}</apnn>',
          '</div>',
          '<b class="hf-icon"></b>',
          '</li>',
          '{% } %}'
        ].join('');
        var ticketList_callback = function(ret){
            var json = ret, that=flight_list;
            var data = json.data;
            //json = {}
            if(json.success && json.code == '200'&&data.flightInfoListGroup.length>0){
                $('.set-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameFrom);
                $('.to-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameTo);
                var html_c = template(tpl1,data);
                $('#content').html(html_c);
                var html_aw = template(tpl2,data);
                $('#airway_list').html(html_aw);
              //   选中的航空公司
              var airway = document.getElementsByClassName('airway');
              for(var i = 0;i < airway.length;i++){
                var aw_setid = airway[i].getAttribute('data-airwaySetID');
                if(aw_setid == oldFlightInfo.data.AirwaySetID){
                  var b = airway[i].getElementsByTagName('b')[0];
                  b.className = 'hf-icon cho-gou';
                }
              }
                //}
                //  页面跳转
                $(".js-air-item").click(function(){
                    $(this).find('.hf-gou').addClass('cho-gou').parents().siblings().find('.hf-gou').removeClass('cho-gou');
                    var flightHotelAllData = JSON.parse(sessionStorage.flightHotelAllData);
                    var setid = $(this).attr('data-setID');
                    for(var i = 0;i < data.flightInfoListGroup.length;i++) {
                        for (var j = 0; j < data.flightInfoListGroup[i].flightInfoList.length; j++) {
                            if (data.flightInfoListGroup[i].flightInfoList[j].setID == setid) {
                                flightHotelAllData.data.flightInfo = data.flightInfoListGroup[i].flightInfoList[j];
                                flightHotelAllData.data.airwaySetID = data.flightInfoListGroup[i].flightInfoList[j].setID;
                                flightHotelAllData.data.airwayCacheID =data.flightInfoListGroup[i].flightInfoList[j].cacheID;
                            }
                        }
                    }
                    sessionStorage.flightHotelAllData = JSON.stringify(flightHotelAllData);
                    flightHotelAllData = JSON.parse(sessionStorage.flightHotelAllData);
                    window.location.href = 'ticket_hotel_choose.html?init';
                });
                //  选择航空公司，页面跳转
                $('.airway').click(function(){
                  //var that = this;
                  $(this).find('b.hf-icon').addClass('cho-gou').parents().siblings().find('b.hf-icon').removeClass('cho-gou');
                  var airwaySetID = $(this).attr('data-airwaySetID');
                  var airwayCacheID = $(this).attr('data-airwayCacheID');
                  // var flightHotelAllData = JSON.parse(sessionStorage.flightHotelAllData);
                  /*先不用*/
                  //flightHotelAllData.data.airwayCacheID = airwayCacheID;
                  //flightHotelAllData.data.airwaySetID = airwaySetID;
                  //sessionStorage.flightHotelAllData = JSON.stringify(flightHotelAllData);
                  changeFlightInfo.data.AirwayCacheID = airwayCacheID;
                  changeFlightInfo.data.AirwaySetID = airwaySetID;
                  localStorage.changeFlightParaObj = JSON.stringify(changeFlightInfo);
                  if(changeFlightInfo != oldFlightInfo){
                    flight_list.tAjax("",changeFlightInfo.data,"50100002","3",ticketList_callback);
                  }
                  $('#aw_content').hide();
                });
                $('#aw_back').click(function(){
                  $('#aw_content').hide();
                  $('#aw_back').hide();
                  $('#list_back').show();
                });
                vlm.init();
            }else{
                that.noResult();
            }
        };
        this.tAjax("",sendData,"50100002","3",ticketList_callback);

    },
    noResult :function(){
        var ele = document.createElement('div'), eventEle, flight_hotel_no_result;
        ele.className = "flight-hotel-no-result";
        ele.innerHTML = '<div class="header header-wrap"><a href="javascript:void(0)" class="header-back"><i class="icons go-back"></i></a><span>机票酒店选择</span></div><div class="no-result-search"><p>没有找到符合条件的产品</p></div> </div>';
        document.body.appendChild(ele);
        eventEle = document.querySelector('.header-wrap a');
        flight_hotel_no_result = document.querySelector('.flight-hotel-no-result');
        eventEle.onclick = function(){
            document.body.removeChild(flight_hotel_no_result);
            window.history.go(-1);
        }
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
    getElementIndex:function(array){

    },
    //  排序or筛选开始
    createTags:function(callback){
        var fn = this.fn;
        var backShadow = document.createElement('div');
        backShadow.className = 'r-shadow';
        backShadow.id = 'r-shadow';
        var oDiv = document.createElement('div');
        oDiv.className = "filter-wrap";

        var baseTitle =  document.createElement('div');
        baseTitle.className = "hl-bottom";

        var rightModal =  document.createElement('div');
        rightModal.className = "reset-action";
        rightModal.id = "filter-modal";

        var middleModal =  document.createElement('ul');
        middleModal.id = "time-modal";

        baseTitle.innerHTML = '<div class="fo-div" id="fo_aw"><b class="hf-icon ic-aw"></b><i class="red-tip"></i>' +
            '<span class="filter-select">航空公司</span>'+
            '</div>'+
            '<div class="fo-div" id="fo_ra"><b class="jd-icon s-rank"></b><i class="red-tip"></i>' +
            '<span class="filter-select">快速排序</span>'+
            '</div>'+
            '<div class="fo-div" id="fo_scr"><b class="hl-icon3 filter"></b><i id="red_scr"></i>' +
            '<span class="filter-select">筛选</span>'+   // /*点击价格弹出框（含税与不含税，前端计算）/
            '</div>';
        rightModal.innerHTML = '    <div class="reset-action-wrap">'+
            '<div class="reset-action-item hot">取消</div>'+
            '<div class="reset-action-item">清空筛选</div>'+
            '<div class="reset-action-item">确定</div>'+
            '</div>'+
            '<div class="reaction-detail" id="reaction-detail">'+
            '<ul class="filter-bottom" id="filter-bottom">'+
            '<li class="filter-title clear-background" data-info="df">直飞</li>'+
            '<li class="filter-title" data-info="sh">共享</li>'+
            '<li class="filter-title" data-info="se">起飞时间</li>'+
            '</ul>'+
            '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
            '<ul class="add only-direct-fly" id="only-direct-fly">'+
            '<li class="tag-item active" data-i="false">不限<b></b></li>'+
            '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
            '</ul>'+
            '<ul class="add filter-share" id="filter-share" style="display: none">'+
            '<li class="tag-item active" data-i="false">不限<b></b></li>'+
            '<li class="tag-item" data-i="true">隐藏共享<b class=""></b></li>'+
            '</ul>'+
            '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
            '<li class="tag-item" data-i="false">不限<b class=""></b></li>'+
            '<li class="tag-item" data-i="1">0点到6点<b class=""></b></li>'+
            '<li class="tag-item" data-i="2">6点到12点<b class=""></b></li>'+
            '<li class="tag-item" data-i="3">12点到18点<b class=""></b></li>'+
            '<li class="tag-item" data-i="4">18点到24点<b class=""></b></li>'+
            '</ul>'+
            '</div>'+
            '</div>';
        middleModal.innerHTML =
            '<li class="time-modal-item" data-i="0"><b></b>不限</li>'+
            '<li class="time-modal-item" data-i="1"><b></b>价格从低到高</li>'+
            '<li class="time-modal-item" data-i="2"><b></b>价格从高到低</li>'+
            '<li class="time-modal-item" data-i="3"><b></b>出发时间从早到晚</li>'+
            '<li class="time-modal-item" data-i="4"><b></b>出发时间从晚到早</li>'+
            '<li class="time-modal-item" data-i="5"><b></b>直飞优先</li>'+
            '<li class="time-modal-item" data-i="6"><b></b>耗时最短</li>';
        oDiv.appendChild(baseTitle);
        oDiv.appendChild(middleModal);
        oDiv.appendChild(rightModal);
        document.body.appendChild(backShadow);
        document.body.appendChild(oDiv);
      var filter = document.getElementById('only-direct-fly').getElementsByClassName('tag-item');
      var share = document.getElementById('filter-share').getElementsByClassName('tag-item');
      var time = document.getElementById('seat-condition').getElementsByClassName('tag-item');
      var rankLi = document.getElementsByClassName('time-modal-item');
      for(var i = 0;i < rankLi.length;i++) {
        switch (changeFlightInfo.data.SortFields[0]) {
          case 0:
            if (rankLi[i].getAttribute('data-i') == '0') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 1:
            if (rankLi[i].getAttribute('data-i') == '5') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 3:
            if (rankLi[i].getAttribute('data-i') == '6') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 5:
            if (rankLi[i].getAttribute('data-i') == '3') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 6:
            if (rankLi[i].getAttribute('data-i') == '4') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 7:
            if (rankLi[i].getAttribute('data-i') == '1') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          case 8:
            if (rankLi[i].getAttribute('data-i') == '2') {
              rankLi[i].className = 'time-modal-item active';
            }
            break;
          default :
            void(0);
        }
      }
      if(changeFlightInfo.data.ScreenFields.length == 1&&changeFlightInfo.data.ScreenFields[0] == 0){
        filter[0].className = 'tag-item active';
        share[0].className = 'tag-item active';
        time[0].className = 'tag-item active';
      }else{
        for(var j = 0;j < changeFlightInfo.data.ScreenFields.length;j++) {
          if (changeFlightInfo.data.ScreenFields[j] == 1) {
            filter[1].className = 'tag-item active';
            filter[0].className = 'tag-item';
          }
          if(changeFlightInfo.data.ScreenFields[j] == 2){
            share[1].className = 'tag-item active';
            share[0].className = 'tag-item';
          }
          if(changeFlightInfo.data.ScreenFields[j] == 3){
            for(var k = 0;k < time.length;k++){
              switch (changeFlightInfo.data.flightStartTime){
                case 0:
                  if(time[k].getAttribute('data-i') == 'false'){
                    time[k].className = 'tag-item active';
                  }
                  break;
                case 1:
                  if(time[k].getAttribute('data-i') == '1'){
                    time[k].className = 'tag-item active';
                  }
                  break;
                case 2:
                  if(time[k].getAttribute('data-i') == '2'){
                    time[k].className = 'tag-item active';
                  }
                  break;
                case 3:
                  if(time[k].getAttribute('data-i') == '3'){
                    time[k].className = 'tag-item active';
                  }
                  break;
                case 4:
                  if(time[k].getAttribute('data-i') == '4'){
                    time[k].className = 'tag-item active';
                  }
                  break;
                default :
                  void(0);
              }
            }
          }
        }
      }
        return this;
    },
    addEvent:function(){
        var titleWrap = document.querySelector('.hl-bottom'), that = this;
        var shadowEle = document.querySelector('#r-shadow');
        titleWrap.onclick = function(event){
            var event = event || window.event;
            var target =target||event.srcElement, lineEle;
            var rightModalHandle =function(){
                var rightModal = document.querySelector('#filter-modal');
                rightModal.style.transition = 'all 300ms ease-in';
                rightModal.style.webkitTransition = 'all 300ms linear';
                rightModal.style.bottom = 0;
            };
            //var leftModalHandle =function(){
            //    var leftModal = document.querySelector('#filter-modal');
            //    leftModal.style.transition = 'all 300ms ease-in';
            //    leftModal.style.webkitTransition = 'all 300ms linear';
            //    leftModal.style.bottom = 0;
            //};
            var  middleModalHandle =function (arg) {
                shadowEle.style.display = 'block';
                var middleModal4 = document.querySelector('#time-modal');
                var middleCock4 = document.querySelector('#fo_ra');
                middleModal4.style.transition = 'all 300ms ease-in';
                middleModal4.style.webkitTransition = 'all 300ms linear';
                middleModal4.style.bottom = 0;
                $('.time-modal-item').click(function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    var rankIndex = $(this).attr('data-i');
                    if($(this).index()==0){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(0);
                    }else if($(this).index()==1){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(7);
                    }else if($(this).index()==2){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(8);
                    }else if($(this).index()==3){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(5);
                    }else if($(this).index()==4){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(6);
                    }else if($(this).index()==5){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(1);
                    }else if($(this).index()==6){
                        changeFlightInfo.data.SortFields = [];
                        changeFlightInfo.data.SortFields.push(3);
                    }
                    localStorage.changeFlightParaObj = JSON.stringify(changeFlightInfo);
                    middleModal4.style.transition = 'all 300ms ease-in';
                    middleModal4.style.webkitTransition = 'all 300ms linear';
                    middleModal4.style.bottom = "-126%";
                    shadowEle.style.display = 'none';
                    window.location.href = 'ticket-list.html';
                });
            };
            if(target.tagName == 'B'||target.tagName == 'SPAN'){
                lineEle = target.parentNode;
            }else if(target.className == 'fo-div'){
                lineEle = target;
            }
            $('#fo_aw').click(function(e){
                $('#aw_content').show();
                $('#list_back').hide();
                $('#aw_back').show();
                e.stopPropagation();
            });
            switch (lineEle.id){
                case 'fo_ra':
                    middleModalHandle(lineEle);
                    break;
                case 'fo_scr':
                    shadowEle.style.display = 'block';
                    rightModalHandle();
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
                        //that.stateEvent('set');
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                        //shadowBox.style.display = 'none';
                    };
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
                        changeFlightInfo.data.ScreenFields = [0];
                        changeFlightInfo.data.flightStartTime = 0;
                    };
                    var confirmFunction=function(){
                        var directFly = document.getElementById('only-direct-fly').getElementsByTagName('li');
                        for(var i = 0;i < directFly.length;i++){
                            if(directFly[i].className == 'tag-item active'){
                                var direct_type = directFly[i].getAttribute('data-i');
                                switch (direct_type){
                                    case "false" :
                                        changeFlightInfo.data.ScreenFields = flight_list.replaceElement(changeFlightInfo.data.ScreenFields,1,0);
                                        break;
                                    case "true" :
                                      console.log(changeFlightInfo.data);
                                        changeFlightInfo.data.ScreenFields.push(1);
                                        break;
                                    default :void(0);
                                }
                            }
                        }
                        var filterShare = document.getElementById('filter-share').getElementsByTagName('li');
                        for(var j = 0;j < filterShare.length;j++){
                            if(filterShare[j].className == 'tag-item active'){
                                var share_type = filterShare[j].getAttribute('data-i');
                                switch (share_type){
                                    case "false" :
                                        changeFlightInfo.data.ScreenFields = flight_list.replaceElement(changeFlightInfo.data.ScreenFields,2,0);
                                        break;
                                    case "true" :
                                        changeFlightInfo.data.ScreenFields.push(2);
                                        break;
                                    default :void(0);
                                }
                            }
                        }
                        var startTime = document.getElementById('seat-condition').getElementsByTagName('li');
                        for(var k = 0;k < startTime.length;k++){
                            if(startTime[k].className == 'tag-item active'){
                                var time_type = startTime[k].getAttribute('data-i');
                                switch (time_type){
                                    case "false" :
                                        changeFlightInfo.data.ScreenFields = flight_list.replaceElement(changeFlightInfo.data.ScreenFields,3,0);
                                        changeFlightInfo.data.flightStartTime = 0;
                                        break;
                                    case "1" :
                                        changeFlightInfo.data.ScreenFields.push(3);
                                        changeFlightInfo.data.flightStartTime = 1;
                                        break;
                                    case "2" :
                                        changeFlightInfo.data.ScreenFields.push(3);
                                        changeFlightInfo.data.flightStartTime = 2;
                                        break;
                                    case "3" :
                                        changeFlightInfo.data.ScreenFields.push(3);
                                        changeFlightInfo.data.flightStartTime = 3;
                                        break;
                                    case "4" :
                                        changeFlightInfo.data.ScreenFields.push(3);
                                        changeFlightInfo.data.flightStartTime = 4;
                                        break;
                                    default :void(0);
                                }
                            }
                        }
                        localStorage.changeFlightParaObj = JSON.stringify(changeFlightInfo);
                        $('#red_scr').addClass('red-tip');
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                        window.location.href = 'ticket-list.html';
                    };

                    switch (target.innerHTML){
                        case "取消" :
                            cancelFunction();
                            shadowEle.style.display = 'none';
                            break;
                        case "清空筛选" :
                            resetFunction();
                            break;
                        case "确定" :
                            confirmFunction();
                            shadowEle.style.display = 'none';
                            break;
                        default :void(0);
                    }
                }
            };
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
                    }
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
            shadowEle.onclick = function(event) {
                var event = event || window.event;
                var target = target || event.srcElement, lineEle, that=flight_list;
                var leftModal = document.querySelector('#filter-modal');
                var timeModal = document.querySelector('#time-modal');
                //var priceModal = document.querySelector('#price-modal');
                if (target.className.indexOf('r-shadow') > -1) {
                    leftModal.style.transition = 'all 300ms ease-in';
                    leftModal.style.webkitTransition = 'all 300ms linear';
                    leftModal.style.bottom = '-126%';
                    this.style.display = 'none';
                    timeModal.style.transition = 'all 300ms ease-in';
                    timeModal.style.webkitTransition = 'all 300ms linear';
                    timeModal.style.bottom = '-126%';
                }
            }
        };
        return this;
    },

    //  排序or筛选结束
    init:function(){
        changeFlightInfo =  JSON.parse(localStorage.changeFlightParaObj);
        oldFlightInfo =  JSON.parse(localStorage.changeFlightParaObj);
        this.getTicketList();
        this.createTags().addEvent();
    }
};
flight_list.init();
