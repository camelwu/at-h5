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

  testLogin: function () {
    if (vlm.checkLogin('hftChoose.testLogin')) {
      var storage = window.sessionStorage, that = hftChoose;
      that.createOrderPara.memberID = window.localStorage.getItem('memberid');
      storage.setItem('hftCreateOrderPara', JSON.stringify(that.createOrderPara));
      that.timer0 = setTimeout(function () {
        window.clearTimeout(that.timer0);
        that.timer0 = null;
        window.location.href = "../hotel_flight_tour/hft_order.html?type=" + that.type;
      }, 500);
    }
  },

  getCurrentStyle: function (node) {
    var style = null;
    if (window.getComputedStyle) {
      style = window.getComputedStyle(node, null);
    } else {
      style = node.currentStyle;
    }
    return style;
  },

  addEvent: function () {
    var backI = document.querySelector('.top_info i'), changeFlight = document.querySelector('.moreFlight'), moreHotel = document.querySelector('.moreHotel'), that = this;
    var flightDetailI = document.querySelector('.flightOuter'), hotelDetail = document.querySelector('.hotelImgInfo');
    var priceTotal = document.querySelector('.priceTotal i'), preserve = document.querySelector('.preserve'), iconBack = document.querySelector('.header_back');
    var tourOuter = null, chooseDateOuter = null, priceDetailInfo = document.querySelector('.priceDetailInfo');
    var roomUl = document.querySelector('.roomUl'), checkMoreData = document.querySelector('.check-more-room'), shadowEle = document.querySelector('.shadow'), storage = window.sessionStorage;
    that.curChosenTourInfo = {tourId:'', chosenDate:''};
    if (that.type == 2) {
      tourOuter = document.querySelector('.tourOuter');
      chooseDateOuter = document.querySelector('.chooseDate')
      this.addHandler(tourOuter, 'click', function (e) {
        var e = e || window.event, target = e.target || e.srcElement;
        if (target.tagName == "I") {
          that.curChosenTourInfo.tourId = target.parentNode.parentNode.getAttribute('data-tour-id');
          chooseDateOuter.style.transition = 'all 400ms ease-in';
          chooseDateOuter.style.webkitTransition = 'all 400ms linear';
          shadowEle.style.display = "block";
          chooseDateOuter.style.bottom = ".90rem";
          that.dateWrap = target.parentNode;
          var temSession = [], temDates = [], tempString = '', outputString = '', tours = that.curData.tours, tarRooId = target.parentNode.parentNode.getAttribute('data-tour-id'), resultEnd = [];
          Array.prototype.distinct = function () {
            var sameObj = function (a, b) {
              var tag = true;
              if (!a || !b)return false;
              for (var x in a) {
                if (!b[x])
                  return false;
                if (typeof(a[x]) === 'object') {
                  tag = sameObj(a[x], b[x]);
                } else {
                  if (a[x] !== b[x])
                    return false;
                }
              }
              return tag;
            };
            var newArr = [], obj = {};
            for (var i = 0, len = this.length; i < len; i++) {
              if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
                newArr.push(this[i]);
                obj[typeof(this[i]) + this[i]] = this[i];
              }
            }
            return newArr;
          };
          var classification = function () {
            var dat = arguments[0], resultTitle = [], stander = '', result = [], result_ = [];
            arguments[0].forEach(function (array, item) {
              result.push(array.substring(0, 7));
              result = result.distinct();
            });
            result.forEach(function (ar) {
              var temp = {name: ar}, temArray = [];
              temp["values"] = [];
              result_.push(temp);
            });
            result_.forEach(function (ar) {
              dat.forEach(function (arg) {
                if (arg.substring(0, 7) == ar['name']) {
                  ar['values'].push(arg)
                }
              });
            });
            return result_;
          };
          for (var i = 0; i < tours.length; i++) {
            if (tours[i]['tourID'] == tarRooId) {
              temSession = tours[i]['tourSessions'];
              temDates = tours[i]['travelDates'];
              break;
            }
          }
          resultEnd = classification(temDates);
          tempString = $("#template_date_session").html();
          outputString = ejs.render(tempString, {data: resultEnd});
          $(".chooseDate").eq(0).html(outputString);
          that.dateArrayShow();
        } else if (target.className == "tour-list-title") {
          document.location.href = "../hotel_flight_tour/hft_scenic_content.html?tourId=" + target.parentNode.getAttribute('data-tour-id') + "&packageId=" + that.initParaObj.packageID;
        }
      });

      this.addHandler(chooseDateOuter, 'click', function (e) {
        var e = e || window.event, target = e.target || e.srcElement, temEles, allMdouter, allSpan_, spans_;
        allMdouter = document.querySelectorAll('.monthsDate');
        chooseDateOuter.style.transition = 'all 400ms ease-in';
        chooseDateOuter.style.webkitTransition = 'all 400ms linear';
        if (target.innerHTML == "取消") {
          shadowEle.style.display = "none";
          chooseDateOuter.style.bottom = '-126%';
        } else if (target.innerHTML == "确定") {
          for (var m = 0; m < allMdouter.length; m++) {
            if (that.getCurrentStyle(allMdouter[m]).display == "block") {
              allSpan_ = allMdouter[m].querySelectorAll('span');
              break;
            }
          }
          for (var f = 0; f < allSpan_.length; f++) {
            if (allSpan_[f].className == 'active') {
              that.curChooseDate = allSpan_[f].getAttribute('data-date');
              break;
            }
          }
          that.curChosenTourInfo.chosenDate = that.curChooseDate;
          storage.setItem('tourChosenInfo', JSON.stringify(that.curChosenTourInfo));
          that.dateWrap.innerHTML = '<span data-date="' + that.curChooseDate + '">' + that.returnDay(that.curChooseDate) + '</span><i></i>';
          shadowEle.style.display = "none";
          chooseDateOuter.style.bottom = '-126%';
          var tempTours = that.curData.tours, toursArray = [], chooseDTour = "";
          chooseDTour = that.dateWrap.parentNode.getAttribute('data-tour-id');
          tempTours.forEach(function (array) {
            var temObj = {};
            temObj['tourID'] = array['tourID'];
            temObj['optionCode'] = array['selectOptionCode'];
            temObj['travelDateSpecified'] = array['travelDateMandatory'];
            if (chooseDTour == array['tourID']) {
              temObj['travelDate'] = that.curChooseDate;
            } else {
              temObj['travelDate'] = array['selectTravelDate'];
            }
            toursArray.push(temObj);
          });
          that.getNewPricePara.tours = toursArray;
          that.getNewPricePara.flightCacheID = that.curData.flightInfo.cacheID;
          that.getNewPricePara.flightSetID = that.curData.flightInfo.setID;
          that.getNewPricePara.selectedHotelID = that.curData.hotelInfo.hotelID;
          that.getNewPricePara.selectedRoomID = that.roomPriceInfo.roomID;
          that.tAjax("", that.getNewPricePara, "60100009", 3, that.renderHandler_);//重新计价
        } else if (target.tagName == "SPAN" && target.getAttribute('data-m')) {
          temEles = target.parentNode.querySelectorAll('.month-title');
          for (var h = 0; h < temEles.length; h++) {
            temEles[h].className = temEles[h] == target ? 'month-title active' : 'month-title';
          }
          for (var v = 0; v < allMdouter.length; v++) {
            if (allMdouter[v].getAttribute('data-md') == target.getAttribute('data-m')) {
              allMdouter[v].className = 'monthsDate show';
              spans_ = allMdouter[v].querySelectorAll('span');
            } else {
              allMdouter[v].className = 'monthsDate';
            }
          }
          for (var u = 0; u < spans_.length; u++) {
            spans_[u].className = u == 0 ? "active" : "";
          }


        } else if (target.tagName == "SPAN" && target.getAttribute('data-date')) {
          that.curChooseDate = target.getAttribute('data-date');
          temEles = target.parentNode.querySelectorAll('span');
          for (var j = 0; j < temEles.length; j++) {
            temEles[j].className = temEles[j] == target ? 'active' : '';
          }
        }
      });
    }
    if (checkMoreData) {
      if (that.getCurrentStyle(checkMoreData).display == "block") {
        this.addHandler(checkMoreData, 'click', function () {
          var text = this.innerText, te = {}, tempStr = '', output = '', temNum = 0;
          tempStr = $("#template_room").html();
          te.hotelInfo = {};
          if (text.indexOf('查看') > -1) {
            te.hotelInfo.rooms = that.curData.hotelInfo.rooms;
            output = ejs.render(tempStr, te);
            $(".roomUl").eq(0).html(output);
            this.innerHTML = '收起更多房型<span class="check-more-down"></span>';
          } else if (text.indexOf('收起') > -1) {
            te.hotelInfo.rooms = that.curData.hotelInfo.rooms.slice(0, 2);
            output = ejs.render(tempStr, te);
            $(".roomUl").eq(0).html(output);
            temNum = that.curData.hotelInfo.rooms.length - 2;
            this.innerHTML = '查看更多房型<span>(' + temNum + ')</span><span class="check-more-down"></span>';
          }
        });
      }
    }
    this.addHandler(backI, 'click', function () {
      window.sessionStorage.removeItem('hftFlightHotelTourInfo');
      window.location.href = that.type == 1 ? "index.html?type=" + that.type : "hft_scenic_list.html?=" + that.type;
    });
    this.addHandler(iconBack, 'click', function () {
      window.sessionStorage.removeItem('hftFlightHotelTourInfo');
      window.location.href = that.type == 1 ? "index.html?type=" + that.type : "hft_scenic_list.html?=" + that.type;
    });
    this.addHandler(changeFlight, 'click', function () {
      var tempTours = that.curData.tours, hftChangeFlightPara = {}, toursArray = [];
      hftChangeFlightPara = {
        "cityCodeFrom": that.initParaObj.cityCodeFrom,
        "cityCodeTo": that.initParaObj.cityCodeTo,
        "departDate": that.initParaObj.departDate,
        "returnDate": that.initParaObj.returnDate,
        "roomDetails": that.initParaObj.roomDetails,
        "flightCacheID":that.curData.flightInfo.cacheID,
        "flightSetID":that.curData.flightInfo.setID
      };
      if (that.type == 2) {
        tempTours.forEach(function (array) {
          var temObj = {};
          temObj['tourID'] = array['tourID'];
          temObj['travelDate'] = array['selectTravelDate'];
          temObj['optionCode'] = array['selectOptionCode'];
          temObj['travelDateSpecified'] = array['travelDateMandatory'];
          toursArray.push(temObj);
        });
        hftChangeFlightPara.tours = toursArray;
        hftChangeFlightPara.packageID = that.initParaObj.packageID;
      } else {
        hftChangeFlightPara.airwaySetID = that.curData.flightInfo.setID;
        hftChangeFlightPara.airwayCacheID = that.curData.flightInfo.cacheID;
        hftChangeFlightPara.SortFields = [0];
        hftChangeFlightPara.ScreenFields = [1];
        hftChangeFlightPara.FlightStartTime = 0;
      }
      storage.setItem('hftChangeFlightPara', JSON.stringify(hftChangeFlightPara));
      that.timer1 = setTimeout(function () {
        window.clearTimeout(that.timer1);
        that.timer1 = null;
        window.location.href = that.type == 2 ? "hft_flight_list.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID : "hf_flight_list.html?type=" + that.type;
      }, 500);
    });
    /*更换酒店*/
    this.addHandler(moreHotel, 'click', function () {
      var tempTours = that.curData.tours, hftChangeHotelPara = {}, toursArray = [];
      hftChangeHotelPara = {
        "flightCacheID": that.curData.flightInfo.cacheID,
        "flightSetID": that.curData.flightInfo.setID,
        "cityCodeFrom": that.initParaObj.cityCodeFrom,
        "cityCodeTo": that.initParaObj.cityCodeTo,
        "departDate": that.initParaObj.departDate,
        "returnDate": that.initParaObj.returnDate,
        "roomDetails": that.initParaObj.roomDetails,
        "selectedHotelID": that.curData.hotelInfo.hotelID,
        "selectedRoomID": that.roomPriceInfo.roomID,
        "sortFields": [0],
        "pageNo": 1,
        "pageSize": 20
      };
      if (that.type == 2) {
        tempTours.forEach(function (array) {
          var temObj = {};
          temObj['tourID'] = array['tourID'];
          temObj['travelDate'] = array['selectTravelDate'];
          temObj['optionCode'] = array['selectOptionCode'];
          temObj['travelDateSpecified'] = array['travelDateMandatory'];
          toursArray.push(temObj);
        });
        hftChangeHotelPara.packageID = that.initParaObj.packageID;
        hftChangeHotelPara.tours = toursArray;
      }
      ;
      storage.setItem('hftChangeHotelPara', JSON.stringify(hftChangeHotelPara));
      that.timer2 = setTimeout(function () {
        window.clearTimeout(that.timer2);
        that.timer2 = null;
        window.location.href = that.type == 2 ? "hft_hotel_list.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID : "hf_hotel_list.html?type=" + that.type;
      }, 500);
    });
    this.addHandler(flightDetailI, 'click', function () {
      window.location.href = "hft_flightDetail.html?type=" + that.type;
    });

    this.addHandler(hotelDetail, 'click', function () {
      var hftHotelDetailPara = {}, tempTours = that.curData.tours, toursArray = [];
      hftHotelDetailPara = {
        "cityCodeFrom": that.initParaObj.cityCodeFrom,
        "cityCodeTo": that.initParaObj.cityCodeTo,
        "departDate": that.initParaObj.departDate,
        "returnDate": that.initParaObj.returnDate,
        "selectedHotelID": that.curData.hotelInfo.hotelID,
        "selectedRoomID": that.roomPriceInfo.roomID,
        "hotelID": that.curData.hotelInfo.hotelID,
        "roomDetails": that.initParaObj.roomDetails
      };
      if (that.type == 2) {
        tempTours.forEach(function (array) {
          var temObj = {};
          temObj['tourID'] = array['tourID'];
          temObj['travelDate'] = array['selectTravelDate'];
          temObj['optionCode'] = array['selectOptionCode'];
          temObj['travelDateSpecified'] = array['travelDateMandatory'];
          toursArray.push(temObj);
        });
        hftHotelDetailPara.flightCacheID = that.curData.flightInfo.cacheID;
        hftHotelDetailPara.flightSetID = that.curData.flightInfo.setID;
        hftHotelDetailPara.tours = toursArray;
        hftHotelDetailPara.packageID = that.initParaObj.packageID;
      } else {
        hftHotelDetailPara.hotelAdditionalPrice = that.roomPriceInfo.addtionalPrice;
      }
      storage.setItem('hftHotelDetailPara', JSON.stringify(hftHotelDetailPara));
      that.timer3 = setTimeout(function () {
        window.clearTimeout(that.timer3);
        that.timer3 = null;
        window.location.href = that.type == 2 ? "hft_hotel_detail.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID + "&selectedRoomId=" + that.roomPriceInfo.roomID : "hf_hotel_detail.html?type=" + that.type + "&selectedRoomId=" + that.roomPriceInfo.roomID;
      }, 500);
    });
    this.addHandler(preserve, 'click', function () {
      var tempTours = null, hftCreateOrder = {}, toursArray = [];
      hftCreateOrder = {
        "cityCodeFrom": that.initParaObj.cityCodeFrom,
        "cityCodeTo": that.initParaObj.cityCodeTo,
        "departDate": that.initParaObj.departDate,
        "returnDate": that.initParaObj.returnDate,
        "setID": that.curData.flightInfo.setID,
        "cacheID": that.curData.flightInfo.cacheID,
        "hotelID": that.curData.hotelInfo.hotelID,
        "roomID": that['roomPriceInfo']['roomID'],
        "roomDetails": that.initParaObj.roomDetails,
        "currencyCode": "CNY",
        "totalPrice": that['roomPriceInfo']['totalAmount'],
        "memberID": "",
        "priceRoomInfo": that.roomPriceInfo,
        "track": {
          "browserType": "",
          "deviceID": ""
        }
      };
      if (that.type == 2) {
        tempTours = that.curData.tours;
        tempTours.forEach(function (array) {
          var temObj = {};
          temObj['tourID'] = array['tourID'];
          temObj['travelDate'] = array['selectTravelDate'];
          temObj['tourSession'] = array['tourSessions'];
          toursArray.push(temObj);
        });
        hftCreateOrder.tours = toursArray;
        hftCreateOrder.packageID = that.initParaObj.packageID;
      }
      that.createOrderPara = hftCreateOrder;
      that.testLogin();
    });

    this.addHandler(priceTotal, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, tem;
      if (target.tagName == "I") {
        tem = that.getCurrentStyle(shadowEle)['display'];
        priceDetailInfo.style.transition = 'all 400ms ease-in';
        priceDetailInfo.style.webkitTransition = 'all 400ms linear';
        if (tem == "block") {
          shadowEle.style.display = "none";
          target.className = 'detail_fare';
          priceDetailInfo.style.bottom = '-126%';

        } else {
          shadowEle.style.display = "block";
          target.className = 'detail_fare open';
          priceDetailInfo.style.bottom = ".89rem";
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

  dateArrayShow: function () {
    var monthTitle = document.querySelectorAll('.month-title'), monthsDate = document.querySelectorAll('.monthsDate'), spans;
    for (var i = 0; i < monthTitle.length; i++) {
      monthTitle[i].className = i == 0 ? "month-title active" : "month-title";
    }
    for (var j = 0; j < monthsDate.length; j++) {
      if (monthsDate[j].getAttribute('data-md') == monthTitle[0].getAttribute('data-m')) {
        monthsDate[j].className = "monthsDate show";
        spans = monthsDate[j].querySelectorAll('span');
      } else {
        monthsDate[j].className = "monthsDate"
      }
    }
    for (var k = 0; k < spans.length; k++) {
      spans[k].className = k == 0 ? "active" : "";
    }

  },

  renderHandler: function () {
    var resultJSON = arguments[0], that = hftChoose, resultData = null, storage = window.sessionStorage, originAirIds = {}, tempStrc = "", outputStrc = "";
    console.log(resultJSON)
    if (resultJSON.success == 1 && resultJSON.code == "200") {
      resultData = resultJSON.data;
      originAirIds.airwayCacheID = resultData.airwayCacheID;
      originAirIds.airwaySetID = resultData.airwaySetID;
      that.curData = resultData;
      storage.setItem('hftFlightHotelTourInfo', JSON.stringify(resultData));
      storage.setItem('originAirIds', JSON.stringify(originAirIds));
      that.createTags(resultData).createPriceEle().addEvent();
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
    } else {
      that.noResult();
      jAlert(resultJSON.message);
    }
  },
  renderHandler_: function () {
    var result = arguments[0], that = hftChoose;
    if (result.code == 200 && result.success == 1) {
      console.log(result)
      var priceNum = result.data.totalAmount, tourTem = [],tourChosenInfo = JSON.parse(window.sessionStorage.getItem('tourChosenInfo'));
      tourTem = that.curData.tours;
      if(tourChosenInfo){
        tourTem.forEach(function(arrayItem){
                if(arrayItem['tourID'] == tourChosenInfo["tourId"]){
                  arrayItem['selectTravelDate'] = tourChosenInfo["chosenDate"];
                }
      })
      }
      that.curData.tours = tourTem;
      that.roomPriceInfo = result.data.prices;
      that.curData.hotelInfo.rooms = result.data.roomsPrice;
      that.renderHandler({success: 1, code: 200, data: that.curData})
    } else {
      that.noResult();
      jAlert(result.message);
    }
  },

  renderHandler_f: function () {
    var result = arguments[0], that = hftChoose;
    if (result.code == 200 && result.success == 1) {
      that.curData.hotelInfo =result.data.hotelInfo;
      that.curData.flightInfo =result.data.flightInfo;
      that.curData.airwayCacheID =result.data.airwayCacheID;
      that.curData.airwaySetID =result.data.airwaySetID;
      that.renderHandler({success:1, code:200, data:that.curData})
    } else {
      that.noResult();
      jAlert(result.message);
    }
  },

   noResult:function(){
     $("#status").fadeOut();
     $("#preloader").delay(400).fadeOut("medium");
     var backFun = function () {
       var backEle = document.querySelector('.header_back');
       that.addHandler(backEle, 'click', function () {
         window.location.href = that.type == 1 ? "index.html?type=" + that.type : "hft_scenic_list.html?type=" + that.type;
       });
     }, tempStrc="", outputStrc="", that = hftChoose;
     tempStrc = $("#template_no_result").html();
     outputStrc = ejs.render(tempStrc, {});
     $(".all_elements").eq(0).html(outputStrc);
     backFun();
   },

   createPriceEle: function () {
    var selectedRoomId = "", priceRoom = null, that = hftChoose, temEle = null, str = '';
    var priceE = document.querySelector('.priceTotal span'), priceOuter = document.querySelector('.priceDetailInfo');
    var priceTemp = ' <p>成人<span class="price-num-price">￥<span></span></span></p><p>儿童<span class="price-num-price">￥<span></span></span></p>';
    selectedRoomId = this.urlParseObj["selectedRoomId"] || arguments[0];
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
    that.roomPriceInfo = priceRoom;
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

  returnDay: function () {
    var array = [], arg = arguments[0];
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
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
    var data = arguments[0], that = hftChoose, tempStr = "", outputStr = "", _tempStr = "", _outputStr = "";
    tempStr = $("#template").html();
    outputStr = ejs.render(tempStr, data);
    $(".all_elements").eq(0).html(outputStr);
    if (that.type == 2) {
      _tempStr = $("#template_tour").html();
      _outputStr = ejs.render(_tempStr, data);
      $(_outputStr).insertAfter("#hotel");
    }
    return that;
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
  tourParaObjHandler: function () {
    var tourPaObj = [], data = arguments[0];
    data.tours.forEach(function (array) {
      var temObj = {};
      temObj['tourID'] = array['tourID'];
      temObj['travelDate'] = array['selectTravelDate'];
      temObj['optionCode'] = "";
      temObj['travelDateSpecified'] = array['travelDateMandatory'];
      tourPaObj.push(temObj);
    });
    return tourPaObj;
  },
  init: function () {
    var temObj = JSON.parse(window.localStorage.getItem('searchInfo')), newPrice = {}, urlParseObj = {}, storage = window.sessionStorage, originAirIds = {}, hftFlightHotelTourInfo = {};
    originAirIds = JSON.parse(storage.getItem('originAirIds'));
    hftFlightHotelTourInfo = JSON.parse(storage.getItem('hftFlightHotelTourInfo'));
    urlParseObj = this.parseUrlPara(document.location.search, true);
    var paraObj = {
      "cityCodeFrom": temObj['FromCity'],
      "cityCodeTo": temObj['ToCity'],
      "departDate": temObj['DepartDate'],
      "returnDate": temObj['ReturnDate'],
      "roomDetails": temObj['RoomInfo']
    };
    for (var tem in paraObj) {
      newPrice[tem] = paraObj[tem];
    }
    this.getNewPricePara = newPrice;
    this.initParaObj = paraObj;
    this.urlParseObj = urlParseObj;
    this.type = urlParseObj.type;
    this.curData = hftFlightHotelTourInfo;
    this.cacheOtherInfo = {
      adult: temObj['AdultNum'],
      child: temObj['ChildNum'],
      cityNameForm: temObj['FromCityNameCN'],
      cityNameTo: temObj['ToCityNameCN']
    };
    if (originAirIds && hftFlightHotelTourInfo) {
      if (originAirIds['airwaySetID'] != hftFlightHotelTourInfo['airwaySetID'] || originAirIds['airwayCacheID'] != hftFlightHotelTourInfo['airwayCacheID']) {
        this.initParaObj.flightSetID = hftFlightHotelTourInfo['airwaySetID'];
        this.initParaObj.flightCacheID = hftFlightHotelTourInfo['airwayCacheID'];
        if (this.type == "2") {
          this.initParaObj.tours = this.tourParaObjHandler(hftFlightHotelTourInfo);
          this.initParaObj.packageID = urlParseObj['packageId'];
          this.getNewPricePara.packageID = this.initParaObj.packageID;
          this.tAjax("", this.initParaObj, "60100006", 3, this.renderHandler_f);
        } else if (this.type == "1") {
          delete this.initParaObj.packageID;
          this.tAjax("", this.initParaObj, "50100001", 3, this.renderHandler);
        }
      } else {
        if (this.type == "2") {
          this.initParaObj.packageID = urlParseObj['packageId'];
          this.getNewPricePara.packageID = this.initParaObj.packageID;
        }
        this.renderHandler({code: 200, success: 1, data: hftFlightHotelTourInfo})
      }
    } else {
      if (this.type == "2") {
        this.initParaObj.packageID = urlParseObj['packageId'];
        this.getNewPricePara.packageID = this.initParaObj.packageID;
        this.tAjax("", this.initParaObj, "60100004", 3, this.renderHandler);
      } else if (this.type == "1") {
        delete this.initParaObj.packageID;
        this.tAjax("", this.initParaObj, "50100001", 3, this.renderHandler);
      }
    }
    //this.renderHandler(result)
  }
};
hftChoose.init();
