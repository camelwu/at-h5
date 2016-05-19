var fIndexModal = {

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
    var content = document.querySelector('.content'), that = this, storage = window.localStorage, paraObj = {}, storage = window.sessionStorage;
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
        var oSpan = this.querySelector('.span-target'), cityName = document.querySelectorAll('.citySearch'), tem = "", temCode="";
        oSpan.style.transition = '0.7s all ease';
        oSpan.style.webkitTransition = '0.7s all ease';
        that.deg += 180;
        oSpan.style.transform = 'rotate(' + that.deg + 'deg)';
        oSpan.style.webkitTransform = 'rotate(' + that.deg + 'deg)';
        tem = cityName[0].innerHTML, temCode = cityName[0].getAttribute('data-city-code');
        cityName[0].innerHTML = cityName[1].innerHTML;
        cityName[0].setAttribute('data-city-code',cityName[1].getAttribute('data-city-code'));
        cityName[1].innerHTML = tem;
        cityName[0].setAttribute('data-city-code',temCode);
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
        if (that.type == "oneWay") {
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
        } else {
          /*往返国际*/
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
            "interNationalOrDomestic": "international", /*国际或者国内*/
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

  initShowInfo:function(){
    var data = arguments[0], tripTitles = document.querySelectorAll('.hTab div'),
      dates = document.querySelectorAll('.month-day'), weeks = document.querySelectorAll('.weekWord'),
      adultValue = document.querySelector('.adultNumber'), childValue = document.querySelector('.childNumber'),
      seatValue = document.querySelector('#seats'), timeClickWrap = document.querySelector('#timeClickWrap');
      var reSeat = function(arg){
          var cabinStr="";
            switch(arg){
              case "economy":
                cabinStr = "经济舱";
                break;
              case "business":
                cabinStr = "商务舱";
                break;
              case "first":
                cabinStr = "头等舱";
                break;
              case "economyPremium":
                cabinStr = "豪华经济舱";
                break;
              default :
                void (0);
            }
                return cabinStr;
          };
        dates[0].innerHTML = this.returnDay(data.DepartDate);
        dates[0].setAttribute('date-full-value', data.DepartDate);
        if(this.type == "oneWay"){
              tripTitles[0].className = "singleTrip light-title";
              tripTitles[1].className = "doubleTrip grey-title";
              timeClickWrap.className = "dateInfo white single_date";
          }else{
              tripTitles[0].className = "singleTrip grey-title";
              tripTitles[1].className = "doubleTrip light-title";
              timeClickWrap.className = "dateInfo white";
              dates[1].innerHTML = this.returnDay(data.ReturnDate);
              dates[1].setAttribute('date-full-value', data.ReturnDate);
        }
       adultValue.innerHTML = data.NumofAdult;
       childValue.innerHTML = data.NumofChild;
       seatValue.innerHTML = reSeat(data.CabinClass)
  },
  initDate:function(){
    var d = new Date(), s = new Date(d.setDate(d.getDate() + 1)), r =new Date( d.setDate(d.getDate() + 2)),
      startDay,endDay,startStrMonth = '',startStrDate = '',endStrMonth = '',endStrDate = '',
      dates = document.querySelectorAll('.month-day'), weeks = document.querySelectorAll('.weekWord');
      startStrMonth = parseInt(s.getMonth() +1) >= 10 ?parseInt(s.getMonth() +1):'0'+parseInt(s.getMonth() +1);
      startStrDate = parseInt(s.getDate()) >= 10 ?parseInt(s.getDate()):'0'+parseInt(s.getDate());
      endStrMonth = parseInt(r.getMonth() +1) >= 10 ?parseInt(r.getMonth() +1):'0'+parseInt(r.getMonth() +1);
      endStrDate = parseInt(r.getDate()) >= 10 ?parseInt(r.getDate()):'0'+parseInt(r.getDate());
      startDay = s.getFullYear()+"-"+startStrMonth+"-"+startStrDate;
      endDay = r.getFullYear()+"-"+endStrMonth+"-"+endStrDate;
      dates[0].setAttribute('date-full-value', startDay);
      dates[0].innerHTML = this.returnDay(startDay);
      weeks[0].innerHTML = this.setWeekItems(startDay);
      dates[1].setAttribute('date-full-value', endDay);
      dates[1].innerHTML = this.returnDay(endDay);
      weeks[1].innerHTML = this.setWeekItems(endDay);
  },
  init: function () {
    $("#status").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");
    var storage = window.sessionStorage, fIndexInfo={},dateInfoObj = {}, dateInfo = document.querySelectorAll('.month-day');
    this.type = "oneWay"; this.time = {};
    if(window.location.search){
      this.type = window.location.search.substring(6);
      fIndexInfo = JSON.parse(storage.getItem('fIndexInfo'));
      this.initShowInfo(fIndexInfo);
      if(new Date(fIndexInfo.DepartDate.replace(/-/g,'/'))<new Date()){
        this.initDate();
      }
    }else{
      this.initDate()
    }
    dateInfoObj.start = dateInfo[0].getAttribute('date-full-value');
    dateInfoObj.end = dateInfo[1].getAttribute('date-full-value');
    this.time[dateInfoObj.start] = "checkinTime";
    if(this.type == "return"){
      this.time[dateInfoObj.end] = "checkoutTime"
    }
    var mySeat = new Scroller({
      id: "seats",
      type: "seat",
      cont: "uuun1"
    });
    var myTime = new Calender({
      id: "timeClickWrap",
      time: this.time,
      checkInTimeOptId: 'setOffDate',
      checkOutTimeOptId: 'arriveDate',
      callback: function () {
        var dates = document.querySelectorAll('.month-day'), weeks = document.querySelectorAll('.weekWord'), dateSource = arguments[0], that = fIndexModal;
        dateSource.forEach(function (array, index) {
          dates[index].setAttribute('date-full-value', array);
          dates[index].innerHTML = that.returnDay(array);
          weeks[index].innerHTML = that.setWeekItems(array);
        });

      }
    });

    this.eventHandler()
  }
};
fIndexModal.init();
