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
    var content = document.querySelector('.content'), that = this, paraObj = {}, storage = window.sessionStorage;
    var singleWrap = document.querySelector('#timeSingleWrap'), doubleWrap = document.querySelector('#timeDoubleWrap');
    that.deg = 0;
    this.addHandler(content, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      var temTitle = null;
      var js_origin = "",js_destination = "";
      if (target.innerHTML == "单程") {
        that.type = "oneWay";
        target.className = "singleTrip light-title";
        target.nextSibling.nextSibling.className = "doubleTrip grey-title";
        singleWrap.style.display = "block";
        doubleWrap.style.display = "none";
        document.querySelector('.dateInfo').className = "dateInfo white single_date";
        js_origin = document.querySelector(".js_origin");
        js_origin.setAttribute("id","f_inori");
        js_destination = document.querySelector(".js_destination");
        js_destination.setAttribute("id","f_indes");

        $("#f_inori").attr("data-bind","type:'setCityBox',data:'f_inori',returnId:'#f_inori'");
        $("#f_indes").attr("data-bind","type:'setCityBox',data:'f_indes',returnId:'#f_indes'");
        $("#f_inori").bind('click',fIndexModal.f_inoriFunc);
        $("#f_indes").bind('click',fIndexModal.f_indesFunc);

      } else if (target.innerHTML == "往返") {
        that.type = "return";
        target.className = "doubleTrip light-title";
        target.previousSibling.previousSibling.className = "singleTrip grey-title";
        singleWrap.style.display = "none";
        doubleWrap.style.display = "block";
        document.querySelector('.dateInfo').className = "dateInfo white";

        js_origin = document.querySelector(".js_origin");
        js_origin.setAttribute("id","f_outori");
        js_destination = document.querySelector(".js_destination");
        js_destination.setAttribute("id","f_outdes");

        $("#f_outori").attr("data-bind","type:'setCityBox',data:'f_outori',returnId:'#f_outori'");
        $("#f_outdes").attr("data-bind","type:'setCityBox',data:'f_outdes',returnId:'#f_outdes'");
        $("#f_outori").bind('click',fIndexModal.f_outoriFunc);
        $("#f_outdes").bind('click',fIndexModal.f_outdesFunc);
      } else if (target.className == "iconTip" || target.parentNode.className == "iconTip" || target.className == "span-target") {
        var oSpan = this.querySelector('.span-target'), cityName = document.querySelectorAll('.citySearch'), tem = "", temCode = "";
        oSpan.style.transition = '0.7s all ease';
        oSpan.style.webkitTransition = '0.7s all ease';
        that.deg += 180;
        oSpan.style.transform = 'rotate(' + that.deg + 'deg)';
        oSpan.style.webkitTransform = 'rotate(' + that.deg + 'deg)';
        tem = cityName[0].innerHTML, temCode = cityName[0].getAttribute('data-code');
        cityName[0].innerHTML = cityName[1].innerHTML;
        cityName[0].setAttribute('data-code', cityName[1].getAttribute('data-code'));
        cityName[1].innerHTML = tem;
        cityName[0].setAttribute('data-code', temCode);
      }else if (target.className.indexOf("minus") > -1 || target.className.indexOf("plus") > -1) {
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
        var urlStr = "", paraObj = {}, cityEles = document.querySelectorAll('.citySearch'), singleDateSet = document.querySelector('#setOffDateSingle'), doubleDateSet = document.querySelector('#setOffDate'), doubleDateArrive = document.querySelector('#arriveDate');
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
        paraObj = {
          "cityCodeFrom": cityEles[0].getAttribute('data-code'),
          "cityCodeTo": cityEles[1].getAttribute('data-code'),
          "cabinClass": reFixedSeat(seatValue),
          "routeType": that.type,
          "isHideSharedFlight": "false",
          "isDirectFlight": "false",
          "numofAdult": adultValue,
          "numofChild": childValue,
          "departStartHour": "00",
          "departEndHour": "24",
          "priorityRule": 0,
          "isDesc": "false",
          "pageNo": 1,
          "pageSize": 10,
          "interNationalOrDomestic": "international", /*国际或者国内*/
          "hasTax": "true",
          "fromCity": cityEles[0].innerHTML,
          "toCity": cityEles[1].innerHTML
        };
        if (that.type == "oneWay") { /*单程*/
          paraObj.departDate = singleDateSet.getAttribute('date-full-value');
          paraObj.interNationalOrDomestic = "international" /*国际或者国内*/
          storage.setItem('fIndexInfo', JSON.stringify({type: "oneWay", data: paraObj}));
          for (var att_ in paraObj) {
            urlStr += "&" + att_ + "=" + paraObj[att_];
          }
          document.location.href = 'f_single_list.html?' + urlStr;
        } else {   /*往返*/
          paraObj.departDate = doubleDateSet.getAttribute('date-full-value');
          paraObj.returnDate = doubleDateArrive.getAttribute('date-full-value');
          paraObj.interNationalOrDomestic = "international" /*国际或者国内*/
          storage.setItem('fIndexInfo', JSON.stringify({type: "return", data: paraObj}));
          for (var att_ in paraObj) {
            urlStr += "&" + att_ + "=" + paraObj[att_];
          }
          document.location.href = 'f_double_list.html?' + urlStr;
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

  createDefaultDate: function () {
    var d = arguments[0] ? new Date(arguments[0].replace(/-/g, '/')) : new Date(), s = arguments[0] ? new Date(d.setDate(d.getDate())) : new Date(d.setDate(d.getDate() + 1)), r = new Date(d.setDate(d.getDate() + 2)),
      startDay, endDay, startStrMonth = '', startStrDate = '', endStrMonth = '', endStrDate = '';
    startStrMonth = parseInt(s.getMonth() + 1) >= 10 ? parseInt(s.getMonth() + 1) : '0' + parseInt(s.getMonth() + 1);
    startStrDate = parseInt(s.getDate()) >= 10 ? parseInt(s.getDate()) : '0' + parseInt(s.getDate());
    endStrMonth = parseInt(r.getMonth() + 1) >= 10 ? parseInt(r.getMonth() + 1) : '0' + parseInt(r.getMonth() + 1);
    endStrDate = parseInt(r.getDate()) >= 10 ? parseInt(r.getDate()) : '0' + parseInt(r.getDate());
    startDay = s.getFullYear() + "-" + startStrMonth + "-" + startStrDate;
    endDay = r.getFullYear() + "-" + endStrMonth + "-" + endStrDate;
    return {startDay: startDay, endDay: endDay};
  },

  initShowInfo: function () {
    var data = arguments[0], tripTitles = document.querySelectorAll('.hTab div'),
      weeks = document.querySelectorAll('.weekWord'), adultValue = document.querySelector('.adultNumber'),
      childValue = document.querySelector('.childNumber'),
      seatValue = document.querySelector('#seats'), timeClickWrap = document.querySelector('#timeClickWrap'),
      singleDateSet = document.querySelector('#setOffDateSingle'), doubleDateSet = document.querySelector('#setOffDate'),
      doubleDateArrive = document.querySelector('#arriveDate'), singleWrap = document.querySelector('#timeSingleWrap'),
      doubleWrap = document.querySelector('#timeDoubleWrap'), defaultDate = {},
      reSeat = function (arg) {
        var cabinStr = "";
        switch (arg) {
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
    defaultDate = this.createDefaultDate(data.departDate);
    if (this.type == "oneWay") {
      tripTitles[0].className = "singleTrip light-title";
      tripTitles[1].className = "doubleTrip grey-title";
      singleWrap.style.display = "block";
      doubleWrap.style.display = "none";
    } else {
      defaultDate.endDay = data.returnDate;
      tripTitles[0].className = "singleTrip grey-title";
      tripTitles[1].className = "doubleTrip light-title";
      singleWrap.style.display = "none";
      doubleWrap.style.display = "block";
    }
    singleDateSet.innerHTML = this.returnDay(defaultDate.startDay);
    singleDateSet.setAttribute('date-full-value', defaultDate.startDay);
    weeks[0].innerHTML = this.setWeekItems(defaultDate.startDay);
    doubleDateSet.innerHTML = this.returnDay(defaultDate.startDay);
    doubleDateSet.setAttribute('date-full-value', defaultDate.startDay);
    weeks[1].innerHTML = this.setWeekItems(defaultDate.startDay);
    doubleDateArrive.innerHTML = this.returnDay(defaultDate.endDay);
    doubleDateArrive.setAttribute('date-full-value', defaultDate.endDay);
    weeks[2].innerHTML = this.setWeekItems(defaultDate.endDay);
    adultValue.innerHTML = data.numofAdult;
    childValue.innerHTML = data.numofChild;
    seatValue.innerHTML = reSeat(data.cabinClass)
  },

  initDate: function () {
    var singleDateSet = document.querySelector('#setOffDateSingle'), doubleDateSet = document.querySelector('#setOffDate'),
      doubleDateArrive = document.querySelector('#arriveDate'), weeks = document.querySelectorAll('.weekWord'), defaultDate = {};
    defaultDate = this.createDefaultDate();
    singleDateSet.setAttribute('date-full-value', defaultDate.startDay);
    singleDateSet.innerHTML = this.returnDay(defaultDate.startDay);
    doubleDateSet.setAttribute('date-full-value', defaultDate.startDay);
    doubleDateSet.innerHTML = this.returnDay(defaultDate.startDay);
    weeks[0].innerHTML = this.setWeekItems(defaultDate.startDay);
    weeks[1].innerHTML = this.setWeekItems(defaultDate.startDay);
    doubleDateArrive.setAttribute('date-full-value', defaultDate.endDay);
    doubleDateArrive.innerHTML = this.returnDay(defaultDate.endDay);
    weeks[2].innerHTML = this.setWeekItems(defaultDate.endDay);
  },

  initHandler: function () {
    var storage = window.sessionStorage, fIndexInfoObj = {}, dateInfoObj = {}, dateInfo = document.querySelectorAll('.month-day');
    var singleWrap = document.querySelector('#timeSingleWrap'), doubleWrap = document.querySelector('#timeDoubleWrap');
    fIndexInfoObj = JSON.parse(storage.getItem('fIndexInfo'));
    this.type = "oneWay";
    this.time1 = {};
    this.time2 = {};
    if (fIndexInfoObj) {
      this.type = fIndexInfoObj.type;
      this.initShowInfo(fIndexInfoObj.data);
      if (new Date(fIndexInfoObj.data.departDate.replace(/-/g, '/')) < new Date()) {
        this.initDate();
      }
    } else {
      this.initDate()
    }
    if (this.type == "oneWay") {
      singleWrap.style.display = "block";
      doubleWrap.style.display = "none";
    } else {
      singleWrap.style.display = "none";
      doubleWrap.style.display = "block";
    }
    dateInfoObj.start = dateInfo[0].getAttribute('date-full-value');
    dateInfoObj.end = dateInfo[1].getAttribute('date-full-value');
    this.time1[dateInfoObj.start] = "checkinTime";
    this.time2[dateInfoObj.start] = "checkinTime";
    this.time2[dateInfoObj.end] = "checkoutTime";
    var myTime2 = new ATplugins.Calender({
      id: "timeSingleWrap",
      selectTime: 1,
      time: this.time1,
      checkInTimeOptId: 'setOffDateSingle',
      callback: function () {
        var dates = document.querySelectorAll('#timeSingleWrap .month-day'), weeks = document.querySelectorAll('#timeSingleWrap .weekWord'), dateSource = arguments[0], that = fIndexModal;
        dateSource.forEach(function (array, index) {
          dates[index].setAttribute('date-full-value', array);
          dates[index].innerHTML = that.returnDay(array);
          weeks[index].innerHTML = that.setWeekItems(array);
        });
      }
    });
    var myTime1 = new ATplugins.Calender({
      id: "timeDoubleWrap",
      time: this.time2,
      checkInTimeOptId: 'setOffDate',
      checkOutTimeOptId: 'arriveDate',
      callback: function () {
        var dates = document.querySelectorAll('#timeDoubleWrap .month-day'), weeks = document.querySelectorAll('#timeDoubleWrap .weekWord'), dateSource = arguments[0], that = fIndexModal;
        dateSource.forEach(function (array, index) {
          dates[index].setAttribute('date-full-value', array);
          dates[index].innerHTML = that.returnDay(array);
          weeks[index].innerHTML = that.setWeekItems(array);
        });
      }
    });
    var mySeat = new Scroller({
      id: "seats",
      type: "seat",
      cont: "uuun1"
    });
    return this;
  },
  cityInit:function(){
    var js_origin ="",js_destination = "";
    if(this.type == 'oneWay' ){
      js_origin = document.querySelector(".js_origin");
      js_origin.setAttribute("id","f_inori");
      js_destination = document.querySelector(".js_destination");
      js_destination.setAttribute("id","f_indes");
      $("#f_inori").attr("data-bind","type:'setCityBox',data:'f_inori',returnId:'#f_inori'");
      $("#f_indes").attr("data-bind","type:'setCityBox',data:'f_indes',returnId:'#f_indes'");
      $("#f_inori").bind('click',fIndexModal.f_inoriFunc);
      $("#f_indes").bind('click',fIndexModal.f_indesFunc);
    }else{
      js_origin = document.querySelector(".js_origin");
      js_origin.setAttribute("id","f_outori");
      js_destination = document.querySelector(".js_destination");
      js_destination.setAttribute("id","f_outdes");
      $("#f_outori").attr("data-bind","type:'setCityBox',data:'f_outori',returnId:'#f_outori'");
      $("#f_outdes").attr("data-bind","type:'setCityBox',data:'f_outdes',returnId:'#f_outdes'");
      $("#f_outori").bind('click',fIndexModal.f_outoriFunc);
      $("#f_outdes").bind('click',fIndexModal.f_outdesFunc);
    }
    return this;
  },
  f_inoriFunc:function(){
    if(fIndexModal.type != 'oneWay')return;
    VM.Load("f_inori");
  },
  f_indesFunc:function(){
    if(fIndexModal.type != 'oneWay')return;
    VM.Load("f_indes");
  },
  f_outoriFunc:function(){
    if(fIndexModal.type == 'oneWay')return;
    VM.Load("f_outori");
  },
  f_outdesFunc:function(){
    if(fIndexModal.type == 'oneWay')return;
    VM.Load("f_outdes");
  },
  init: function () {
    this.fadeHandler().initHandler().cityInit().eventHandler();
  }
};
fIndexModal.init();
