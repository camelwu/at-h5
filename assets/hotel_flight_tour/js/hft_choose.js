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

  tAjax: function (questUrl, data, Code, ForeEndType, callBack) {
    var that = this, dataObj =
    {
      Parameters: data,
      ForeEndType: ForeEndType,
      Code: Code
    };
    vlm.loadJson("", JSON.stringify(dataObj), callBack);
  },

  testLogin: function () {
    /* if (vlm.checkLogin('hftChoose.testLogin')) {*/
    var storage = window.sessionStorage, that = hftChoose;
    that.createOrderPara.memberID = window.localStorage.getItem('memberid');
    storage.setItem('hftCreateOrderPara', JSON.stringify(that.createOrderPara));
    window.localStorage.setItem('hftCreateOrderPara', JSON.stringify(that.createOrderPara));
    that.timer0 = setTimeout(function () {
      window.clearTimeout(that.timer0);
      that.timer0 = null;
      window.location.href = that.type == 2 ? "hft_order.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID + "&selectedRoomId=" + that.roomPriceInfo.roomID : "hft_order.html?type=" + that.type + "&selectedRoomId=" + that.roomPriceInfo.roomID;
    }, 500);
    /*  }*/
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
    var priceTotal = document.querySelector('.priceTotal'), preserve = document.querySelector('.preserve'), iconBack = document.querySelector('.header_back');
    var tourOuter = null, chooseDateOuter = null, priceDetailInfo = document.querySelector('.priceDetailInfo'),temArray = [];
    var roomUl = document.querySelector('.roomUl'), checkMoreData = document.querySelector('.check-more-room'), shadowEle = document.querySelector('.shadow'), storage = window.sessionStorage;
    if (that.type == 2) {
      tourOuter = document.querySelector('.tourOuter');
      chooseDateOuter = document.querySelector('.chooseDate');
      this.addHandler(tourOuter, 'click', function (e) {
        var e = e || window.event, target = e.target || e.srcElement;
        if (target.tagName == "I") {
          chooseDateOuter.style.transition = 'all 400ms ease-in';
          chooseDateOuter.style.webkitTransition = 'all 400ms linear';
          shadowEle.style.display = "block";
          chooseDateOuter.style.bottom = ".90rem";
          that.dateWrap = target.parentNode;
          var temSession = [], temDates = [], tempString = '', outputString = '', tours = that.curData.tours,
            highLightDate = target.parentNode.querySelector('span').getAttribute('data-date'),
            tarRooId = target.parentNode.parentNode.getAttribute('data-tour-id'), resultEnd = [];
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
          console.log(resultEnd)
          console.log(highLightDate)
          tempString = $("#template_date_session").html();
          outputString = ejs.render(tempString, {data: {dataArray:resultEnd,chooseDate:highLightDate}});
          $(".chooseDate").eq(0).html(outputString);
          that.dateArrayShow(highLightDate);
        } else if (target.tagName == "BUTTON") {
          var buttons = target.parentNode.querySelectorAll('button');
          for(var k = 0;k<buttons.length;k++){
            if(buttons[k] == target){
              buttons[k].className = "active";
            }else{
              buttons[k].className = ""
            }
          }
        }else if(target.className == "tour-list-title"){
          document.location.href = "../hotel_flight_tour/hft_scenic_content.html?tourId=" + target.parentNode.getAttribute('data-tour-id') + "&packageId=" + that.initParaObj.packageID;
        }
      });
      this.addHandler(chooseDateOuter, 'click', function (e){
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
          that.dateWrap.innerHTML = '<span data-date="' + that.curChooseDate + '">' + that.returnDay(that.curChooseDate) + '</span><i></i>';
          shadowEle.style.display = "none";
          chooseDateOuter.style.bottom = '-126%';
          var tempTours = that.curData.tours, toursArray = [], chooseDTour = "";
          chooseDTour = that.dateWrap.parentNode.getAttribute('data-tour-id');
          tempTours.forEach(function (array) {
            var temObj = {};
            temObj['tourID'] = array['tourID'];
            temObj['tourType'] = array['tourType'];
            temObj['optionCode'] = array['selectOptionCode'];
            temObj['travelDateSpecified'] = array['travelDateMandatory'];
            if (chooseDTour == array['tourID']) {
              temObj['travelDate'] = that.curChooseDate;
            } else {
              temObj['travelDate'] = array['selectTravelDate'];
            }
            toursArray.push(temObj);
          });
          sessionStorage.setItem('tempChooseTourDate', JSON.stringify(toursArray));
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
        } else if (target.tagName == "SPAN" && target.getAttribute('data-date')){
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
          var text = this.innerText, te = {}, temNum = 0, roomUl = document.querySelector('.roomUl');
          te.hotelInfo = {};
          if (text.indexOf('查看') > -1) {
            roomUl.className = "roomUl";
            this.innerHTML = '收起更多房型<span class="check-more-up"></span>';
          } else if (text.indexOf('收起') > -1) {
            roomUl.className = "roomUl cut";
            temNum = that.curData.hotelInfo.rooms.length - 2;
            this.innerHTML = '查看更多房型<span class="letter-space">(' + temNum + ')</span><span class="check-more-down"></span>';
          }
        });
      }
    }
    this.addHandler(backI, 'click', function () {
      window.location.href = "index.html?type=" + that.type;
    });
    this.addHandler(iconBack, 'click', function () {
      window.location.href = that.type == 1 ? "index.html?type=" + that.type : "hft_scenic_list.html?type=" + that.type;
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
        "flightSetID":that.curData.flightInfo.setID,
        "selectedHotelID":that.curData.hotelInfo.hotelID
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
        hftChangeFlightPara.airwaySetID = that.curData.airwaySetID;
        hftChangeFlightPara.airwayCacheID = that.curData.airwayCacheID;
        hftChangeFlightPara.SortFields = [0];
        hftChangeFlightPara.ScreenFields = [0];
        hftChangeFlightPara.FlightStartTime = 0;
      }
      storage.setItem('hftChangeFlightPara', JSON.stringify(hftChangeFlightPara));
      that.timer1 = setTimeout(function () {
        window.clearTimeout(that.timer1);
        that.timer1 = null;
        window.location.href = that.type == 2 ? "hft_flight_list.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID+"&selectedRoomId=" + that.roomPriceInfo.roomID : "hf_flight_list.html?type=" + that.type+"&selectedRoomId=" + that.roomPriceInfo.roomID;
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
      storage.setItem('hftChangeHotelPara', JSON.stringify(hftChangeHotelPara));
      that.timer2 = setTimeout(function () {
        window.clearTimeout(that.timer2);
        that.timer2 = null;
        window.location.href = that.type == 2 ? "hft_hotel_list.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID +"&selectedRoomId=" + that.roomPriceInfo.roomID : "hf_hotel_list.html?type=" + that.type +"&selectedRoomId=" + that.roomPriceInfo.roomID;
      }, 500);
    });
    this.addHandler(flightDetailI, 'click', function () {
      window.location.href = that.type == 2 ? "hft_flightDetail.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID : "hft_flightDetail.html?type=" + that.type;
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
        "roomDetails": that.initParaObj.roomDetails,
        "flightCacheID":that.curData.flightInfo.cacheID,
        "flightSetID":that.curData.flightInfo.setID,
        "hotelAdditionalPrice":JSON.parse(window.sessionStorage.getItem('hotelAdditionalPrice'))||0
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
        hftHotelDetailPara.tours = toursArray;
        hftHotelDetailPara.packageID = that.initParaObj.packageID;
      }
      storage.setItem('hftHotelDetailPara', JSON.stringify(hftHotelDetailPara));
      that.timer3 = setTimeout(function () {
        window.clearTimeout(that.timer3);
        that.timer3 = null;
        window.location.href = that.type == 2 ? "hft_hotel_detail.html?type=" + that.type + "&packageId=" + that.initParaObj.packageID + "&selectedRoomId=" + that.roomPriceInfo.roomID : "hf_hotel_detail.html?type=" + that.type + "&selectedRoomId=" + that.roomPriceInfo.roomID;
      }, 500);
    });
    this.addHandler(preserve, 'click', function () {
      var tempTours = null, hftCreateOrder = {}, toursArray = [], tourLis = [];
      hftCreateOrder = {
        "cityCodeFrom": that.initParaObj.cityCodeFrom,
        "cityCodeTo": that.initParaObj.cityCodeTo,
        "departDate": that.initParaObj.departDate,
        "returnDate": that.initParaObj.returnDate,
        "setID": that.curData.flightInfo.setID,
        "cacheID": that.curData.flightInfo.cacheID,
        "hotelID": that.curData.hotelInfo.hotelID,
        "roomID": that.selectedRoomId,
        "roomDetails": that.initParaObj.roomDetails,
        "currencyCode": "CNY",
        "totalPrice": that.roomPriceInfo.totalAmount,
        "memberID": "",
        "priceRoomInfo":that.selectedRoom,
        "track": {
          "browserType": "",
          "deviceID": vlm.getDeviceID()
        }
      };
      if (that.type == 2){
        tempTours = that.curData.tours;
        tourLis = document.querySelectorAll('.tourOuter li');
        tourLis = [].slice.call(tourLis);
        tourLis.forEach(function(item){
          var tourName =item.querySelector('h3').innerHTML, button = null, travelDate = null,temOuterObj = {};
          temOuterObj.tourID = item.getAttribute('data-tour-id');
          temOuterObj.tourName = tourName;
          temOuterObj.tourType = item.getAttribute('data-tour-type');
          if(item.className =="tourList"){
            button = item.querySelectorAll('button');
            travelDate = item.querySelector('span').getAttribute('data-date');
            temOuterObj.travelDate = travelDate;
            button = [].slice.call(button);
            button.forEach(function(item_){
              if(item_.className == "active"){
                temOuterObj.enumvalue =  item_.getAttribute('data-enumvalue');
              }
            });
          }
          temArray.push(temOuterObj)
        });
        console.log(temArray);
        hftCreateOrder.tours = temArray;
        hftCreateOrder.packageID = that.initParaObj.packageID;
      }
      that.createOrderPara = hftCreateOrder;
      that.testLogin();
    });

    this.addHandler(priceTotal, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, tem;
      var priceTotalI = document.querySelector('.priceTotal i');
      tem = that.getCurrentStyle(shadowEle)['display'];
      priceDetailInfo.style.transition = 'all 400ms ease-in';
      priceDetailInfo.style.webkitTransition = 'all 400ms linear';
      if (tem == "block") {
        shadowEle.style.display = "none";
        priceTotalI.className = 'detail_fare';
        priceDetailInfo.style.bottom = '-126%';
      } else {
        shadowEle.style.display = "block";
        priceTotalI.className = 'detail_fare open';
        priceDetailInfo.style.bottom = ".89rem";
      }
    });

    this.addHandler(roomUl, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, temRoomId,tempStringRoom = "",outputStrRoom="";
      if (target.tagName == "BUTTON") {
        temRoomId = target.parentNode.parentNode.getAttribute('data-room-id');
        that.selectedRoomId = temRoomId;
        that.createPriceEle(temRoomId);
        tempStringRoom = $("#template_roomList").html();
        outputStrRoom = ejs.render(tempStringRoom, that.fixRoomOrder(temRoomId));
        $(".roomUl").eq(0).html(outputStrRoom);
      }
    });

    this.addHandler(shadowEle, "click", function(){
      var priceTotalI = document.querySelector('.priceTotal i');
      priceDetailInfo.style.transition = 'all 400ms ease-in';
      priceDetailInfo.style.webkitTransition = 'all 400ms linear';
      shadowEle.style.display = "none";
      priceTotalI.className = 'detail_fare';
      priceDetailInfo.style.bottom = '-126%';
      if(that.type == 2){
        chooseDateOuter = document.querySelector('.chooseDate');
        chooseDateOuter.style.transition = 'all 400ms ease-in';
        chooseDateOuter.style.webkitTransition = 'all 400ms linear';
        chooseDateOuter.style.bottom = '-126%';
      }
    });
  },

  dateArrayShow: function () {
    var monthTitle = document.querySelectorAll('.month-title'),highLightDate= arguments[0],storage = window.sessionStorage, monthsDate = document.querySelectorAll('.monthsDate'), spans, that = hftChoose;
    for (var i = 0; i < monthTitle.length; i++) {
      monthTitle[i].className = highLightDate.substring(0,7)== monthTitle[i].getAttribute('data-m') ? "month-title active" : "month-title";
    }
    for (var j = 0; j < monthsDate.length; j++) {
      if (monthsDate[j].getAttribute('data-md') == highLightDate.substring(0,7)) {
        monthsDate[j].className = "monthsDate show";
        spans = monthsDate[j].querySelectorAll('span');
      } else {
        monthsDate[j].className = "monthsDate"
      }
    }
    for (var k = 0; k < spans.length; k++){
        spans[k].className =  spans[k].getAttribute('data-date') ==highLightDate?"active":""
    }
  },

  selectedRoomHandler:function(){
    var data = arguments[0], that = this;
    this.curData = data;
    if(that.urlParseObj&&that.urlParseObj.selectedRoomId){
      that.selectedRoomId = that.urlParseObj.selectedRoomId;
      data.hotelInfo.rooms.forEach(function(item, array){
        if(item.roomID == that.selectedRoomId){
          that.selectedRoom = item;
          return false
        }
      })
    }else if(that.getNewPricePara.selectedHotelID&&that.getNewPricePara.selectedRoomID){
      var tempObj = null;
      that.selectedRoomId = that.getNewPricePara.selectedRoomID;
      data.hotelInfo.rooms.forEach(function(item, array){
        if(item.roomID == that.selectedRoomId){
          tempObj = item;
          return false
        }
      });
      if(tempObj){
        that.selectedRoom =tempObj;
      }else{
        that.selectedRoom = data.hotelInfo.rooms[0];
        that.selectedRoomId = data.hotelInfo.rooms[0].roomID
      }
    }else{
      that.selectedRoom = data.hotelInfo.rooms[0];
      that.selectedRoomId = data.hotelInfo.rooms[0].roomID
    }
    return this
  },

  renderHandler: function () {
    var resultJSON = arguments[0], that = hftChoose, resultData = null, storage = window.sessionStorage, originAirIds = {}, tempStrc = "", outputStrc = "";
    if (resultJSON.success == 1 && resultJSON.code == "200") {
      resultData = resultJSON.data;
      var hftCreateOrderParaInfo = JSON.parse(storage.getItem('hftCreateOrderPara')), tempChooseTourDate = JSON.parse(storage.getItem('tempChooseTourDate'));
      if(hftCreateOrderParaInfo){
        that.hftCreateOrderParaInfo = hftCreateOrderParaInfo.tours;
      }
      if(tempChooseTourDate){
        that.tempChooseTourDate = tempChooseTourDate;
      }
      originAirIds.airwayCacheID = resultData.airwayCacheID;
      originAirIds.airwaySetID = resultData.airwaySetID;
      originAirIds.flightSetID = resultData.flightInfo.setID;
      originAirIds.flightCacheID = resultData.flightInfo.cacheID;
      storage.setItem('hftFlightHotelTourInfo', JSON.stringify(resultData));
      window.localStorage.setItem('hftFlightHotelTourInfo', JSON.stringify(resultData));
      storage.setItem('originAirIds', JSON.stringify(originAirIds));
      resultData.hotelInfo.starRating = hftChoose.starRatingStorage(resultData.hotelInfo.starRating);
      that.operationData = resultData;
      that.selectedRoomHandler(resultData).createTags(resultData).delayLoadImage().createPriceEle(that.selectedRoomId,that.selectedRoom).addEvent();
      $("#status").fadeOut(resultData);
      $("#preloader").delay(400).fadeOut("medium");
    } else {
      that.noResult();
      jAlert(resultJSON.message);
    }
  },

  renderHandler_: function () {
    var result = arguments[0], that = hftChoose;
    if (result.code == 200 && result.success == 1) {
      var priceNum = result.data.totalAmount, tourTem = [];
      tourTem = that.curData.tours;
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
    var template_header = $("#template_header").html(), header = ejs.render(template_header,{});
    $('#header').html(header);
    $("#status").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");
    var backFun = function () {
      var backEle = document.querySelector('.header_back');
      that.addHandler(backEle, 'click', function () {
        if(that.type == 1) {
          window.location.href = "index.html?type=" + that.type
        }else{
          window.location.href = "hft_scenic_list.html?type=" + that.type
        }
      });
    }, tempStrc="", outputStrc="", that = hftChoose;
    tempStrc = $("#template_no_result").html();
    outputStrc = ejs.render(tempStrc, {});
    $(".all_elements").eq(0).html(outputStrc);
    backFun();
  },

  createPriceEle: function () {
    var selectedRoomId = arguments[0], priceRoom = arguments[1]||null, that = hftChoose, temEle = null, str = '';
    var priceE = document.querySelector('.priceTotal span'), priceOuter = document.querySelector('.priceDetailInfo');
    var priceTemp = ' <p>成人<span class="price-num-price">￥<span></span></span></p><p>儿童<span class="price-num-price">￥<span></span></span></p>';
    temEle = that.curData.hotelInfo.rooms;
    if (!priceRoom) {
      temEle.forEach(function (arr, item){
        if (arr['roomID'] == selectedRoomId) {
          priceRoom = arr;
          return false;
        }
      })
    }
    that.roomPriceInfo = priceRoom;
    priceRoom.prices.forEach(function (a, ii){
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
    if(!arg){return ""}
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
  },
  airCompanyHandler: function () {
    var data = arguments[0], tag = 0, tem = [], that = hftChoose;
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
    data.forEach(function (array) {
      tem.push(array.airCorpCode);
    });
    tem = tem.distinct();
    return tem.length > 1 ? 1 : 0
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
  starRatingStorage: function (starStr) {
    var star = {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '一星级': 1,
      '二星级': 2,
      '三星级': 3,
      '四星级': 4,
      '五星级': 5,
      '1 星级': 1,
      '2 星级': 2,
      '3 星级': 3,
      '4 星级': 4,
      '5 星级': 5,
      '1 stars': 1,
      '2 stars': 2,
      '3 stars': 3,
      '4 stars': 4,
      '5 stars': 5
    }
    return star[starStr];
  },
  setChineseStar: function (starRating) {
    var resultNum;
    switch (starRating) {
      case 1:
        resultNum = '一星级';
        break;
      case 2:
        resultNum = '二星级';
        break;
      case 3:
        resultNum = '三星级';
        break;
      case 4:
        resultNum = '四星级';
        break;
      case 5:
        resultNum = '五星级';
        break;
      case 6:
        resultNum = '六星级';
        break;
      case 7:
        resultNum = '七星级';
        break;
      default:
        void (0);
    }
    return resultNum;
  },

  fixRoomOrder:function(){
    var that = this,allInfoData = that.operationData,roomsData = [], temp = {},selectedRoomId = arguments[0]||allInfoData.hotelInfo.rooms[0].roomID;
    roomsData = allInfoData.hotelInfo.rooms;
    for(var i = 0;i<roomsData.length;i++){
      if(roomsData[i].roomID == selectedRoomId){
        temp = roomsData[i];
        roomsData.splice(i,1)
      }
    }
    roomsData.unshift(temp);
    that.operationData.rooms = roomsData;
    return that.operationData;
  },

  createTags: function () {
    var data = arguments[0], that = hftChoose, tempStr = "", outputStr = "", _tempStr = "", _outputStr = "", tempStringRoom = "",outputStrRoom = "";
    //头部数据
    var template_header = $("#template_header").html();
    var header = ejs.render(template_header,data);
    $('#header').html(header);
    //底部价钱部分
    var template_footer = $('#template_footer').html();
    var footer = ejs.render(template_footer,data);
    $('.bottomPrice').html(footer);
  //template部分
    tempStr = $("#template").html();
    outputStr = ejs.render(tempStr, data);
    $(".all_elements").eq(0).html(outputStr);
    /*房间数据*/
    tempStringRoom = $("#template_roomList").html();
    outputStrRoom = ejs.render(tempStringRoom, that.fixRoomOrder(that.selectedRoomId));
    $(".roomUl").eq(0).html(outputStrRoom);
    /*景点数据*/
    if (that.type == 2) {
      _tempStr = $("#template_tour_").html();
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

  reSeat:function (arg) {
    var cabinStr = "";
    switch (String(arg)) {
      case "0":
        cabinStr = "经济舱";
        break;
      case "1":
        cabinStr = "超级经济舱";
        break;
      case "2":
        cabinStr = "商务舱";
        break;
      case "3":
        cabinStr = "头等舱";
        break;
      default :
        void (0);
    }
    return cabinStr;
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
      cityNameTo: temObj['ToCityNameCN'],
      roomNumber:temObj['RoomInfo'].length
    };
    if (originAirIds && hftFlightHotelTourInfo){
      if (originAirIds.airwaySetID != hftFlightHotelTourInfo.airwaySetID||
        originAirIds.airwayCacheID != hftFlightHotelTourInfo.airwayCacheID||
        originAirIds.flightSetID != hftFlightHotelTourInfo.flightInfo.setID||
        originAirIds.flightCacheID != hftFlightHotelTourInfo.flightInfo.cacheID) {
        this.initParaObj.selectedHotelID = hftFlightHotelTourInfo['hotelInfo']['hotelID'];
        if (this.type == "2") {
          this.initParaObj.flightSetID = hftFlightHotelTourInfo.flightInfo.setID;
          this.initParaObj.flightCacheID = hftFlightHotelTourInfo.flightInfo.cacheID;
          this.initParaObj.tours = this.tourParaObjHandler(hftFlightHotelTourInfo);
          this.initParaObj.packageID = urlParseObj['packageId'];
          this.getNewPricePara.packageID = this.initParaObj.packageID;
          delete this.getNewPricePara.selectedHotelID;
          delete this.getNewPricePara.selectedRoomID;
          this.tAjax("", this.initParaObj, "60100006", 3, this.renderHandler_f);
        } else if (this.type == "1") {
          this.initParaObj.airwaySetID = hftFlightHotelTourInfo.flightInfo.setID;
          this.initParaObj.airwayCacheID = hftFlightHotelTourInfo.flightInfo.cacheID;
          this.initParaObj.flightSetID = hftFlightHotelTourInfo.flightInfo.setID;
          this.initParaObj.flightCacheID = hftFlightHotelTourInfo.flightInfo.cacheID;
          delete this.initParaObj.packageID;
          this.tAjax("", this.initParaObj, "50100001", 3, this.renderHandler);
        }
      } else {
        if (this.type == "2") {
          this.initParaObj.packageID = urlParseObj['packageId'];
          this.getNewPricePara.packageID = this.initParaObj.packageID;
          delete this.getNewPricePara.selectedHotelID;
          delete this.getNewPricePara.selectedRoomID;
        }
        this.renderHandler({code: 200, success: 1, data: hftFlightHotelTourInfo})
      }
    } else {
      if (this.type == "2") {
        this.initParaObj.packageID = urlParseObj['packageId'];
        this.getNewPricePara.packageID = this.initParaObj.packageID;
        delete this.getNewPricePara.selectedHotelID;
        delete this.getNewPricePara.selectedRoomID;
        this.tAjax("", this.initParaObj, "60100004", 3, this.renderHandler);
      } else if (this.type == "1") {
        delete this.initParaObj.packageID;
        this.tAjax("", this.initParaObj, "50100001", 3, this.renderHandler);
      }
    }
  }
};
hftChoose.init();
