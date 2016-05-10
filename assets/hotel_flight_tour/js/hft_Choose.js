"use strict";

 var hftChoose = {

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

  tAjax: function (questUrl, data, Code, ForeEndType, callBack, loadMoreSign) {
    var that = this, dataObj =
    {
      Parameters: data,
      ForeEndType: ForeEndType,
      Code: Code
    };
    questUrl = questUrl ? questUrl : that.requestUrl;
    if (loadMoreSign) {
      vlm.loadJson(questUrl, JSON.stringify(dataObj), callBack, false, false, loadMoreSign);
    } else {
      vlm.loadJson(questUrl, JSON.stringify(dataObj), callBack);
    }
  },

  addEvent:function(){
       var backI = document.querySelector('.top_info i'), changeFlight =  document.querySelector('.moreFlight'), that = this;
       var flightDetailI = document.querySelector('.flightDetailArrow i'), hotelDetailI =  document.querySelector('.hotelImgInfo i');
       var priceTotal = document.querySelector('.priceTotal i'), preserve =  document.querySelector('.preserve'),iconBack =  document.querySelector('.icon_back');
       var tourOuter = document.querySelector('.tourOuter'), chooseDateOuter=document.querySelector('.chooseDate'),priceDetailInfo=document.querySelector('.priceDetailInfo');
    this.addHandler(backI, 'click', function () {
      window.location.href = "index.html";
    });
    this.addHandler(iconBack, 'click', function () {
      window.history.go(-1);
    });
    /*this.addHandler(changeFlight, 'click', function () {
      window.location.href = "hft_flight_list.html";
    });*/

    this.addHandler(flightDetailI, 'click', function () {
      window.location.href = "hft_flightDetail.html";
    });

    this.addHandler(hotelDetailI, 'click', function () {
      window.location.href = "hft_hotel_detail.html";
    });

    this.addHandler(preserve, 'click', function () {
      window.location.href = "hft_order.html";
    });
    this.addHandler(tourOuter, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.tagName == "SPAN"){
        chooseDateOuter.style.display = "block";
      }
    });
    this.addHandler(chooseDateOuter, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.innerHTML == "取消"){
        this.style.display = "none";
      }else if(target.innerHTML == "确定"){
        this.style.display = "none";
      }
    });
    this.addHandler(priceTotal, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, tem, shadowEle;
      var getCurrentStyle=function(node){
        var style = null;
        if(window.getComputedStyle) {
          style = window.getComputedStyle(node, null);
        }else{
          style = node.currentStyle;
        }
           return style;
      };
      if(target.tagName=="I"){
        shadowEle = document.querySelector('.shadow');
        tem = getCurrentStyle(shadowEle)['display'];
        priceDetailInfo.style.transition = 'all 400ms ease-in';
        priceDetailInfo.style.webkitTransition = 'all 400ms linear';
        if(tem=="block"){
          shadowEle.style.display = "none";
          priceDetailInfo.style.bottom = '-126%';
        }else{
          shadowEle.style.display = "block";
          priceDetailInfo.style.bottom = ".90rem";
        }
      }
    });
  },

  renderHandler:function(){
    var resultJSON = arguments[0], that = hftChoose, resultData = null, storage = window.sessionStorage;
    console.log(resultJSON)
    if(resultJSON.success==1&&resultJSON.code=="200"){
       resultData = resultJSON.data;
       storage.setItem('hftFlightHotelTourInfo', JSON.stringify(resultData));
       that.createTags(resultData).addEvent();
    }else{
      //jAlert("没有数据")
    }
  },

   setWeekItems:function(){
     var arg = arguments[0].replace(/T.*/,''), index = new Date(arg.replace(/-/g,'/')).getDay(), week='';
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
   },

   setChineseStar:function(){
     var strNumber = arguments[0].substr(0,1), resultNum='';
         switch (strNumber.charCodeAt(0)) {
           case 49:
             resultNum = '一星级';
             break;
           case 50:
             resultNum = '二星级';
             break;
           case 51:
             resultNum = '三星级';
             break;
           case 52:
             resultNum = '四星级';
             break;
           case 53:
             resultNum = '五星级';
             break;
           case 54:
             resultNum = '六星级';
             break;
           case 55:
             resultNum = '七星级';
             break;
           default:
            void (0);
         }
     return resultNum;

   },

   createTags:function(){
     var data = arguments[0], that = hftChoose, tempStr="", outputStr="";
      tempStr = $("#template").html();
      outputStr = ejs.render(tempStr,data);
      $(".all_elements").eq(0).html(outputStr);
      return that;
  },

  init:function(){
    this.renderHandler(data);
  }
};

hftChoose.init();
