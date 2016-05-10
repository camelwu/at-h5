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

  addEvent: function () {
    var backI = document.querySelector('.top_info i'), changeFlight = document.querySelector('.moreFlight'), that = this;
    var flightDetailI = document.querySelector('.flightDetailArrow i'), hotelDetailI = document.querySelector('.hotelImgInfo i');
    var priceTotal = document.querySelector('.priceTotal i'), preserve = document.querySelector('.preserve'), iconBack = document.querySelector('.icon_back');
    var tourOuter = document.querySelector('.tourOuter'), chooseDateOuter = document.querySelector('.chooseDate'), priceDetailInfo = document.querySelector('.priceDetailInfo');
    var roomUl = document.querySelector('.roomUl'), checkMoreData = document.querySelector('.check-more-room'), shadowEle = document.querySelector('.shadow');;
    var getCurrentStyle = function (node) {
      var style = null;
      if (window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
      } else {
        style = node.currentStyle;
      }
      return style;
    };
    if(getCurrentStyle(checkMoreData).display =="block"){
      this.addHandler(checkMoreData, 'click', function () {
              var text = this.innerText, te = {}, tempStr='', output='', temNum=0;
                tempStr = $("#template_room").html();
                te.hotelInfo ={};
        if(text.indexOf('查看')>-1){
                te.hotelInfo.rooms = that.curData.hotelInfo.rooms;
                output = ejs.render(tempStr, te);
                $(".roomUl").eq(0).html(output);
                this.innerHTML = '收起更多房型<span class="check-more-down"></span>';
              }else if(text.indexOf('收起')>-1){
                te.hotelInfo.rooms = that.curData.hotelInfo.rooms.slice(0,2);
                output = ejs.render(tempStr, te);
                $(".roomUl").eq(0).html(output);
                temNum = that.curData.hotelInfo.rooms.length-2;
                this.innerHTML = '查看更多房型<span>('+temNum+')</span><span class="check-more-down"></span>';
              }
      });
    }
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
      if (target.tagName == "I") {
        chooseDateOuter.style.transition = 'all 400ms ease-in';
        chooseDateOuter.style.webkitTransition = 'all 400ms linear';
        shadowEle.style.display = "block";
        chooseDateOuter.style.bottom = ".90rem";
        var temSession = [],temDates=[], tempString='',outputString='', tours = that.curData.tours, tarRooId= target.parentNode.parentNode.getAttribute('data-tour-id'), resultEnd=[];
        Array.prototype.distinct=function(){
          var sameObj=function(a,b){
            var tag = true;
            if(!a||!b)return false;
            for(var x in a){
              if(!b[x])
                return false;
              if(typeof(a[x])==='object'){
                tag=sameObj(a[x],b[x]);
              }else{
                if(a[x]!==b[x])
                  return false;
              }
            }
            return tag;
          };
          var newArr=[],obj={};
          for(var i=0,len=this.length;i<len;i++){
            if(!sameObj(obj[typeof(this[i])+this[i]],this[i])){
              newArr.push(this[i]);
              obj[typeof(this[i])+this[i]]=this[i];
            }
          }
          return newArr;
        };
        var classification = function(){
          var dat = arguments[0],resultTitle = [], stander='', result=[], result_=[];
          arguments[0].forEach(function(array, item){
                    result.push(array.substring(0,7));
                    result=result.distinct();});
          result.forEach(function(ar){
            var temp = {name:ar}, temArray =[];
            temp["values"] = [];
            result_.push(temp);
          });
          console.log(result_)
          result_.forEach(function(ar){
                    dat.forEach(function(arg){
                          if(arg.substring(0,7)==ar['name']){
                            ar['values'].push(arg)
                          }
                    });
          });
          return result_;
      };
        for(var i=0;i<tours.length;i++){
            if(tours[i]['tourID']==tarRooId){
              temSession = tours[i]['tourSessions'];
              temDates = tours[i]['travelDates'];
              break;
            }
        }
        resultEnd=classification(temDates);
        tempString = $("#template_date_session").html();
        outputString = ejs.render(tempString, {data:resultEnd});
        $(".chooseDate").eq(0).html(outputString);
        console.log(resultEnd)
        console.log(temDates)
      }
    });
    this.addHandler(chooseDateOuter, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      if (target.innerHTML == "取消") {
      } else if (target.innerHTML == "确定") {
      }
      chooseDateOuter.style.transition = 'all 400ms ease-in';
      chooseDateOuter.style.webkitTransition = 'all 400ms linear';
      shadowEle.style.display = "none";
      chooseDateOuter.style.bottom = '-126%';
    });
    this.addHandler(priceTotal, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, tem;
      if (target.tagName == "I") {
        tem = getCurrentStyle(shadowEle)['display'];
        priceDetailInfo.style.transition = 'all 400ms ease-in';
        priceDetailInfo.style.webkitTransition = 'all 400ms linear';
        if (tem == "block") {
          shadowEle.style.display = "none";
          priceDetailInfo.style.bottom = '-126%';
        } else {
          shadowEle.style.display = "block";
          priceDetailInfo.style.bottom = ".90rem";
        }
      }
    });

    this.addHandler(roomUl, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, temRoomId;
      if (target.tagName == "BUTTON") {
        var allButton = this.querySelectorAll('button');
        temRoomId = target.parentNode.parentNode.getAttribute('data-room-id');
        that.createPriceEle(temRoomId);
        for (var i = 0; i < allButton.length; i++) {
          allButton[i].innerHTML = allButton[i] == target ? "已选择" : "选择";
          allButton[i].className = allButton[i] == target ? "hasChooseButton" : "noChooseButton";
        }
      }
    });
  },

  renderHandler: function () {
    var resultJSON = arguments[0], that = hftChoose, resultData = null, storage = window.sessionStorage;
    console.log(resultJSON)
    if (resultJSON.success == 1 && resultJSON.code == "200") {
      resultData = resultJSON.data;
      that.curData = resultData;
      storage.setItem('hftFlightHotelTourInfo', JSON.stringify(resultData));
      that.createTags(resultData).createPriceEle().addEvent();
    } else {
      //jAlert("没有数据")
    }
  },

  createPriceEle: function () {
    var selectedRoomId = window.location.search.substring(1) || arguments[0], priceRoom = null, that = hftChoose, temEle = null, str = '';
    var priceE = document.querySelector('.priceTotal span'), priceOuter = document.querySelector('.priceDetailInfo');
    var priceTemp = ' <p>成人<span class="price-num-price">￥<span>56X2</span></span></p><p>儿童<span class="price-num-price">￥<span>56X2</span></span></p>'
    temEle = that.curData.hotelInfo.rooms;
    if (selectedRoomId) {
      temEle.forEach(function (arr, item) {
        if (arr['roomID'] == selectedRoomId) {
          priceRoom = arr;
          return;
        }
      })
    } else {
      priceRoom = temEle[0];
    }
    priceRoom.prices.forEach(function (a, ii) {
      if (a['category'] == 1) {
        str += '<p>成人<span class="price-num-price">￥<span>' + a['amount'] + 'X' + a['quantity'] + '</span></span></p>';
      } else if (a['category'] == 2) {
        str += '<p>儿童<span class="price-num-price">￥<span>' + a['amount'] + 'X' + a['quantity'] + '</span></span></p>';
      }
    });
    priceE.innerHTML = priceRoom.totalAmount;
    priceOuter.innerHTML = str;
    return that;
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

  setChineseStar: function () {
    var strNumber = arguments[0].substr(0, 1), resultNum = '';
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

  createTags: function () {
    var data = arguments[0], that = hftChoose, tempStr = "", outputStr = "";
    tempStr = $("#template").html();
    outputStr = ejs.render(tempStr, data);
    $(".all_elements").eq(0).html(outputStr);
    return that;
  },

  dateHandler:function(){
    var myTime = new Calender({
      id: "timeClickWrap",
      time: {
        "2016-05-17": "checkinTime",
        "2016-05-19": "checkoutTime"
      },
      checkInTimeOptId: 'checkInTime',
      checkOutTimeOptId: 'checkOutTime',
      callback: function(result) {
        console.info(result);
      }
    });
  },
  init: function () {
    this.renderHandler(data);
  }
};
hftChoose.init();
