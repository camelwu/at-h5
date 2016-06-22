"use strict";

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

  tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
    var that = this, dataObj =
    {
      Parameters: data,
      ForeEndType: ForeEndType,
      Code: Code
    };
    questUrl = questUrl ? questUrl : "";
    vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
  },

  getMinutes: function (arg1, arg2) {
    var time1 = Date.parse(arg1.replace(/-/g, "/").replace(/T/, " ")), time2 = Date.parse(arg2.replace(/-/g, "/").replace(/T/, " ")), dayCount;
    return dayCount = (Math.abs(time2 - time1)) / 1000 / 60;
  },

  eventHandler: function () {
    var that = fSeatChoose,shadow = document.querySelector('.shadow'), changeTip = document.querySelector('.change_tip') ;
    $("body").children().click(function () {});
    this.addHandler(document, 'click', function (e){
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.className == 'shadow'){
        shadow.style.zIndex ="99";
        shadow.style.display ="none";
        changeTip.style.display = "none"
      }else if(target.tagName == "BUTTON"){
        that.testLogin();
      }else if(target.className == "explain"){
        shadow.style.zIndex ="1000";
        shadow.style.display ="block";
        changeTip.style.display = "block"
      }else if(target.className == "close_explain"){
        shadow.style.zIndex ="99";
        shadow.style.display ="none";
        changeTip.style.display = "none"
      }
    });
  },
  createTags: function () {
    var data = arguments[0];
    var tempString = "", outputString = "", that = fSeatChoose;
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
  delayLoadImage : function() {
    var images = document.getElementsByTagName('img');
    var  loadImage = function(url, error_url,callback,errorFunc) {
      var img = new Image();
      img.src = url;
      img.onload = function() {
        img.onload = null;
        callback();
      };
      img.onerror = function(){
        img.onerror = null;
        errorFunc();
      }
    };
    images = Array.prototype.slice.call(images)
    images.forEach(function(array){
      var re_url = array.getAttribute('data-src'), error_url = "../images/loading_def_big.png";
      loadImage(re_url,error_url, function() {
        array.setAttribute('src', re_url);
      },function(){
        array.setAttribute('src', error_url);
      });
    });
    return this
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

  testLogin: function () {
    window.top.location.href = '../flight/f_order.html'
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
    this.fadeHandler().createTags({flightInfo: flightData}).delayLoadImage().eventHandler();

  }
};
fSeatChoose.init();

