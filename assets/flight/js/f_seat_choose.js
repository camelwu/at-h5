var fSeatChoose = {
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

  getMinutes:function (arg1, arg2) {
    var time1 = Date.parse(arg1.replace(/-/g, "/").replace(/T/," ")), time2 = Date.parse(arg2.replace(/-/g, "/").replace(/T/," ")), dayCount;
    return dayCount = (Math.abs(time2 - time1)) / 1000 / 60;
  },

  eventHandler:function(){
    var forBottom = document.querySelector('.for_bottom'),that = fSeatChoose;
    this.addHandler(forBottom, "click", function(e){
      var e = e || window.event, target = e.target || e.srcElement;
        if(target.className == "explain"){
      //退改签说明
        }else if(target.tagName == "BUTTON"){
          that.testLogin();
        }
    })
  },
  createTags:function(){
    var data = arguments[0];
    var tempString="", outputString="", that = fSeatChoose;
    tempString = $("#template_seat_choose").html();
    console.log(data)
    outputString = ejs.render(tempString, data);
    $(".all_elements").eq(0).html(outputString);
    return this;
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

  testLogin:function(){
     window.top.location.href='../flight/f_order.html'
  },

  returnDay: function () {
    var array = [], arg = arguments[0];
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
  },

  init: function () {
    var flightData = {}, storage = window.sessionStorage;
    flightData = JSON.parse(storage.getItem('currentFlight'));
    console.log(flightData)
    this.fadeHandler().createTags({flightInfo:flightData}).eventHandler();

  }
};
fSeatChoose.init();

