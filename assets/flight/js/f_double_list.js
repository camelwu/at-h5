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

  eventHandler: function () {
    var content = document.querySelector('.content'), that = this, paraObj = {}, storage = window.sessionStorage;
    that.deg = 0;
    this.addHandler(content, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      var temTitle = null;
      if (target.innerHTML == "单程") {
        that.type = "oneWay";
        target.className = "singleTrip light-title";
        target.nextSibling.nextSibling.className = "doubleTrip grey-title";
        document.querySelector('.dateInfo').className = "dateInfo white single_date";
      } else if (target.innerHTML == "往返") {
        that.type = "return";
        target.className = "doubleTrip light-title";
        target.previousSibling.previousSibling.className = "singleTrip grey-title";
        document.querySelector('.dateInfo').className = "dateInfo white";
      } else if (target.className == "iconTip" || target.parentNode.className == "iconTip" || target.className == "span-target") {
        var oSpan = this.querySelector('.span-target'), cityName = document.querySelectorAll('.citySearch'), tem = "", temCode = "";
        oSpan.style.transition = '0.7s all ease';
        oSpan.style.webkitTransition = '0.7s all ease';
        that.deg += 180;
        oSpan.style.transform = 'rotate(' + that.deg + 'deg)';
        oSpan.style.webkitTransform = 'rotate(' + that.deg + 'deg)';
        tem = cityName[0].innerHTML, temCode = cityName[0].getAttribute('data-city-code');
        cityName[0].innerHTML = cityName[1].innerHTML;
        cityName[0].setAttribute('data-city-code', cityName[1].getAttribute('data-city-code'));
        cityName[1].innerHTML = tem;
        cityName[0].setAttribute('data-city-code', temCode);
      } else if (target.className == "citySearch") {
        //打开城市列表复层


      } else if (target.className.indexOf("minus") > -1 || target.className.indexOf("plus") > -1) {
        var adultNumEle = document.querySelector('.adultNumber'), childNumEle = document.querySelector('.childNumber'), adultNum = Number(adultNumEle.innerHTML), childNum = Number(childNumEle.innerHTML);
        var adultIs = document.querySelectorAll(".adult i"), childIs = document.querySelectorAll(".child i");
        if (target.className == "adu plus") {
          if (adultNum + childNum < 9) {
            adultNum++;
            adultNumEle.innerHTML = adultNum;
            adultIs[1].className = adultNum + childNum < 9 ? "adu plus" : "adu plus plus_grey";
            childIs[1].className = adultNum / childNum > 1 / 2 && adultNum + childNum < 9 ? "chi plus" : "chi plus plus_grey";
            adultIs[0].className = adultNum > 2 ? "adu minus" : "adu minus minus_grey";
            childIs[0].className = childNum > 0 ? "chi minus" : "chi minus minus_grey";
          }
        } else if (target.className == "chi plus") {
          if (adultNum + childNum < 9) {
            if (adultNum / childNum > 1 / 2) {
              childNum++;
              childNumEle.innerHTML = childNum;
              adultIs[1].className = adultNum + childNum < 9 ? "adu plus" : "adu plus plus_grey";
              childIs[1].className = adultNum / childNum > 1 / 2 && adultNum + childNum < 9 ? "chi plus" : "chi plus plus_grey";
              adultIs[0].className = adultNum > 2 ? "adu minus" : "adu minus minus_grey";
              childIs[0].className = childNum > 0 ? "chi minus" : "chi minus minus_grey";
            }
          }
        } else if (target.className == "adu minus") {
          if (adultNum >= 3) {
            adultNum--;
            adultNumEle.innerHTML = adultNum;
            adultIs[1].className = adultNum + childNum < 9 ? "adu plus" : "adu plus plus_grey";
            childIs[1].className = adultNum / childNum > 1 / 2 && adultNum + childNum < 9 ? "chi plus" : "chi plus plus_grey";
            adultIs[0].className = adultNum > 2 ? "adu minus" : "adu minus minus_grey";
            childIs[0].className = childNum > 0 ? "chi minus" : "chi minus minus_grey";
            childNumEle.innerHTML = adultNum / childNum < 1 / 2 ? adultNum * 2 : childNum;
          }
        } else if (target.className == "chi minus") {
          if (childNum >= 1) {
            childNum--;
            childNumEle.innerHTML = childNum;
            adultIs[1].className = adultNum + childNum < 9 ? "adu plus" : "adu plus plus_grey";
            childIs[1].className = adultNum / childNum > 1 / 2 && adultNum + childNum < 9 ? "chi plus" : "chi plus plus_grey";
            adultIs[0].className = adultNum > 2 ? "adu minus" : "adu minus minus_grey";
            childIs[0].className = childNum > 0 ? "chi minus" : "chi minus minus_grey";
          }
        }
      } else if (target.id == "ticket-search-button") {
        var urlStr = "", paraObj = {}, cityEles = document.querySelectorAll('.citySearch'), dateEles = document.querySelectorAll('.month-day');
        var adultValue = document.querySelector('.adultNumber').innerHTML, childValue = document.querySelector('.childNumber').innerHTML, seatValue = document.querySelector('#seats').innerHTML;
        var reFixedSeat = function (arg) {
          var cabinStr = "";
          switch (arg) {
            case "经济舱":
              cabinStr = "economy";
              break;
            case "商务舱":
              cabinStr = "business";
              break;
            case "头等舱":
              cabinStr = "first";
              break;
            case "豪华经济舱":
              cabinStr = "economyPremium";
              break;
            default :
              void (0);
          }
          return cabinStr;
        };
        if (that.type == "oneWay") { /*单程*/
          paraObj = {
            "CityCodeFrom": cityEles[0].getAttribute('data-city-code'),
            "CityCodeTo": cityEles[1].getAttribute('data-city-code'),
            "DepartDate": dateEles[0].getAttribute('date-full-value'),
            "CabinClass": reFixedSeat(seatValue),
            "RouteType": that.type,
            "IsHideSharedFlight": "false",
            "IsDirectFlight": "false",
            "NumofAdult": adultValue,
            "NumofChild": childValue,
            "DepartStartHour": "00",
            "DepartEndHour": "24",
            "PriorityRule": 0,
            "IsDesc": "false",
            "pageNo": 1,
            "pageSize": 10,
            "interNationalOrDomestic": "international", /*国际或者国内*/
            "hasTax": "true",
            "fromCity": cityEles[0].innerHTML,
            "toCity": cityEles[1].innerHTML
          };
          storage.setItem('fIndexInfo', JSON.stringify(paraObj));
          for (var att_ in paraObj) {
            urlStr += "&" + att_ + "=" + paraObj[att_];
          }
          document.location.href = 'ticket_single_list.html?' + urlStr;
        } else {   /*往返*/
          paraObj = {
            "CityCodeFrom": cityEles[0].getAttribute('data-city-code'),
            "CityCodeTo": cityEles[1].getAttribute('data-city-code'),
            "DepartDate": dateEles[0].getAttribute('date-full-value'),
            "ReturnDate": dateEles[1].getAttribute('date-full-value'),
            "CabinClass": reFixedSeat(seatValue),
            "RouteType": that.type,
            "IsHideSharedFlight": "false",
            "IsDirectFlight": "false",
            "NumofAdult": adultValue,
            "NumofChild": childValue,
            "DepartStartHour": "00",
            "DepartEndHour": "24",
            "PriorityRule": 0,
            "pageNo": 1,
            "pageSize": 10,
            "interNationalOrDomestic": "international",/*国际或者国内*/
            "hasTax": "true",
            "IsDesc": "false",
            "fromCity": cityEles[0].innerHTML,
            "toCity": cityEles[1].innerHTML
          };
          storage.setItem('fIndexInfo', JSON.stringify(paraObj));
          for (var att_ in paraObj) {
            urlStr += "&" + att_ + "=" + paraObj[att_];
          }
          document.location.href = 'ticket_double_list.html?' + urlStr;
        }
      }
    })
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

  init: function () {

  }
};
fDoubleList.init();
