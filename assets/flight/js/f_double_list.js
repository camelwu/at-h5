var fDoubleList = {

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
    var lis = document.querySelectorAll('.flight_ul li'), that = this, tem = {}, storage = window.sessionStorage,loadMore = document.querySelector("#loadMore");;
    console.log(lis)
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
    return this;
  },

  createTags:function(){
    var data = arguments[0];
    var tempString="", outputString="", that = fDoubleList;
    tempString = $("#template_flight_double_list").html();
    outputString = this.isClear == 1?ejs.render(tempString, data):$(".flight_ul").eq(0).html()+ejs.render(tempString, data);
    $(".flight_ul").eq(0).html(outputString);
    return this;
  },

  renderHandler:function(){
    var result = arguments[0],that = fDoubleList, storage = window.sessionStorage;
    console.log(result)
    if(result.success&&result.code == "200"){
      that.currrentFlightList = result.data;
      that.createTags(that.currrentFlightList).fadeHandler().eventHandler().loadMoreHandler().dateCalender();
    }
  },

  dateCalender: function(){
    var tem = {start:this.postObj.departDate, end:this.postObj.returnDate}, timeObj = {}, fIndexInfoObj = {}, storage = window.sessionStorage;
    fIndexInfoObj = JSON.parse(storage.getItem('fIndexInfo'));
    timeObj[tem.start] = tem.start;
    timeObj[tem.end] = tem.end;
    var dates = document.querySelectorAll('.month-day'), weeks = document.querySelectorAll('.weekWord');
    var myTime1 = new ATplugins.Calender({
      id: "date_top",
      time: timeObj,
      checkInTimeOptId: 'setOffDate',
      checkOutTimeOptId: 'arriveDate',
      callback: function () {
        var  dateSource = arguments[0], that = fDoubleList;
        fIndexInfoObj.data.departDate = dateSource[0];
        fIndexInfoObj.data.returnDate = dateSource[1];
        storage.setItem('fIndexInfo', JSON.stringify(fIndexInfoObj));
        var newUrl = vlm.setUrlPara("", "departDate", dateSource[0]);
            newUrl = vlm.setUrlPara(newUrl, "returnDate", dateSource[1]);
            window.location.href = newUrl;
      }
    });
    dates[0].setAttribute('date-full-value', this.postObj.departDate);
    dates[0].innerHTML = this.returnDay(this.postObj.departDate);
    weeks[0].innerHTML = this.setWeekItems(this.postObj.departDate);
    dates[1].setAttribute('date-full-value', this.postObj.returnDate);
    dates[1].innerHTML = this.returnDay(this.postObj.returnDate);
    weeks[1].innerHTML = this.setWeekItems(this.postObj.returnDate);
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

  loadMoreHandler:function(){
    var loadMore = document.querySelector("#loadMore"), that = fDoubleList;
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
    console.log(postObj)
    this.postObj = postObj;
    this.isClear = 1;
    this.tAjax("", this.postObj, "3001", 3, this.renderHandler);
  }

};
fDoubleList.init();
