var fSingleList = {

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

  eventHandler: function () {
    var content = document.querySelector('.content'), searchZone = document.querySelector('.searchZone'),lis = document.querySelectorAll('.flight_ul li'),  that = this, tem = {}, storage = window.sessionStorage;
    for (var i = 0, len = lis.length; i < len; i++) {
      this.addHandler(lis[i], 'click', function () {
        var setId = this.getAttribute('data-set-id');
        that.currrentFlightList.flightInfos.forEach(function(item, index){
          if(item.setID == setId){
            tem = item;
            return false;
          }
        });
        storage.setItem('currentFlight', JSON.stringify(tem));
        window.location.href = "f_seat_choose.html";
      })
    }
    this.addHandler(searchZone, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, temDate = "", lineMaxDate = "", newUrl = "";
      var tem = "", plusOne = "", minusOne = "", monthNum= "", dateNum= "";
      temDate = document.querySelector('#setOffDateSingle').getAttribute('date-full-value');
      if(target.className == "previousDay"){
          lineMaxDate = new Date().getFullYear() + 1 + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
          tem = new Date(temDate.replace(/-/g, "/"));
          minusOne = new Date(tem.setDate(tem.getDate() - 1));
          monthNum = (minusOne.getMonth() + 1) < 10 ? "0" + parseInt((minusOne.getMonth() + 1)) : minusOne.getMonth() + 1;
          dateNum = (minusOne.getDate()) < 10 ? "0" + parseInt(minusOne.getDate()) : minusOne.getDate();
          minusOne = minusOne.getFullYear() + '-' + monthNum + '-' + dateNum;
         if (new Date(minusOne.replace(/-/g, "/") + ' 23:59:59') >= new Date()) {
           newUrl = vlm.setUrlPara("", "departDate", minusOne);
           newUrl = vlm.setUrlPara(newUrl, "pageNo", 1);
           newUrl = vlm.setUrlPara(newUrl, "pageSize", 10);
           window.location.href = newUrl;
        }
      }else if(target.className == "nextDay"){
        lineMaxDate = new Date().getFullYear() + 1 + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
        tem = new Date(temDate.replace(/-/g, "/"));
        plusOne = new Date(tem.setDate(tem.getDate() + 1));
        monthNum = (plusOne.getMonth() + 1) < 10 ? "0" + parseInt((plusOne.getMonth() + 1)) : plusOne.getMonth() + 1;
        dateNum = (plusOne.getDate()) < 10 ? "0" + parseInt(plusOne.getDate()) : plusOne.getDate();
        plusOne = plusOne.getFullYear() + '-' + monthNum + '-' + dateNum;
        if (new Date(plusOne.replace(/-/g, "/") + ' 00:00:00') > new Date() && new Date(plusOne.replace(/-/g, "/")) < new Date(lineMaxDate + ' 00:00:00')) {
            newUrl = vlm.setUrlPara("", "departDate", plusOne);
            newUrl = vlm.setUrlPara(newUrl, "pageNo", 1);
            newUrl = vlm.setUrlPara(newUrl, "pageSize", 10);
            window.location.href = newUrl;
        }
      }
    });
    return this;
  },

  createTags:function(){
    var data = arguments[0];
    var tempString="", outputString="", that = fSingleList;
    tempString = $("#template_flight_single_list").html();
    outputString = this.isClear == 1? ejs.render(tempString, data): $(".flight_ul").eq(0).html()+ejs.render(tempString, data);
    $(".flight_ul").eq(0).html(outputString);
    return this;
  },

  renderHandler:function(){
    var result = arguments[0],that = fSingleList, storage = window.sessionStorage;
    console.log(result);
    if(result.success&&result.code == "200"){
         that.currrentFlightList = result.data;
         show_filter(result.data.airCorpCodeList);
         that.createTags(that.currrentFlightList).fadeHandler().eventHandler().loadMoreHandler().dateCalender();
    }
  },

  dateCalender: function(){
    var tem = {start:this.postObj.departDate}, timeObj = {},fIndexInfoObj = {}, storage = window.sessionStorage;
    fIndexInfoObj = JSON.parse(storage.getItem('fIndexInfo'));
    timeObj[tem.start] = tem.start;
    var dates = document.querySelectorAll('#timeSingle .monthDay'), weeks = document.querySelectorAll('#timeSingle .weekWord');
    var myTime2 = new ATplugins.Calender({
      id: "timeSingle",
      selectTime: 1,
      time: timeObj,
      checkInTimeOptId: 'setOffDateSingle',
      callback: function () {
        var  dateSource = arguments[0], that = fSingleList;
        fIndexInfoObj.data.departDate = dateSource[0];
        storage.setItem('fIndexInfo', JSON.stringify(fIndexInfoObj));
        var newUrl = vlm.setUrlPara("", "departDate", dateSource);
        window.location.href = newUrl;
      }
    });
    dates[0].setAttribute('date-full-value', this.postObj.departDate);
    dates[0].innerHTML = this.returnDay(this.postObj.departDate);
    weeks[0].innerHTML = this.setWeekItems(this.postObj.departDate);
  },

  loadMoreHandler:function(){
    var loadMore = document.querySelector("#loadMore"), that = fSingleList;
    if(this.currrentFlightList.pageNo >= this.currrentFlightList.pageCount){
      $('#loadMore').html("没有更多信息了!").fadeOut(3000);
    }else{
      loadMore.innerHTML = "点击查看更多...";
      this.addHandler(loadMore, 'click', function () {
        that.loadMoreData();
      });
    }
    return this;
  },

  loadMoreData: function () {
    var loadMore = document.querySelector("#loadMore"), storage = window.sessionStorage;
    if (this.currrentFlightList.pageNo >= this.currrentFlightList.pageCount) {
      $('#loadMore').html("没有更多信息了!").fadeOut(3000);
    } else {
      this.postObj.pageNo++;
      loadMore.innerHTML = "正在加载...";
      storage.setItem('fIndexInfo', JSON.stringify({type:"return", data:this.postObj}));
      this.isClear = 0;
      this.tAjax("", this.postObj, "3001", 3, this.renderHandler);
    }
  },


  setWeekItems: function () {
    var arg = arguments[0].replace(/T.*/, ''), index = new Date(arg.replace(/-/g, '/')).getDay(), week = '';
    switch (index) {
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
    return week;
  },

  returnDay: function () {
    var array = [], arg = arguments[0];
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
  },

  fadeHandler: function () {
    var tag = arguments[0] || "hide";
    if (tag == "show") {
      $("#preloader").fadeIn();
      $("#status").delay(400).fadeIn("medium");
    } else {
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
    }
    return this;
  },

  parseUrlHandler: function (url, isEncode) {
    var isEncode = isEncode || false, reg = /([^=&?]+)=([^=&?]+)/g, obj = {}, url =url;
    url.replace(reg, function () {
      var arg = arguments;
      obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
    });
    return obj;
  },

  init: function () {
      var postObj = this.parseUrlHandler(window.location.href,true);
         /* postObj={
              "cityCodeFrom": "BJS",
              "cityCodeTo": "SIN",
              "departDate": "2016-06-18",
             /!* "returnDate": "2016-06-17",*!/
              "cabinClass": "economy",
              "routeType": "oneWay",
              "isHideSharedFlight": "false", /!*是否隐藏共享航班*!/
              "isDirectFlight": "false",
              "numofAdult": 2,
              "numofChild": 0,
              "departStartHour": "00",
              "departEndHour": "24",
              "priorityRule": 0, /!*	0 - 无优先规则，1 - 直飞优先，2 - 低价优先，3 - 总耗时优先*!/
              "pageNo": 1,
              "pageSize": 10,
              "hasTax": "true",
              "isDesc": "false", /!*是否降序，默认升序*!/
              /!* "AirCorpCode":"MH",*!//!*航空公司赛选参数，不传不限航空公司*!/
              "fromCity": "北京",
              "toCity": "新加坡",
              "interNationalOrDomestic": "international"
          };
*/
      this.postObj = postObj;
      this.isClear = 1;
      this.tAjax("", this.postObj, "3001", 3, this.renderHandler);
  }

};
fSingleList.init();
