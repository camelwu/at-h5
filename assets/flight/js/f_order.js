var fOrder = {

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

  getCurrentStyle: function (node) {
    var style = null;
    if (window.getComputedStyle) {
      style = window.getComputedStyle(node, null);
    } else {
      style = node.currentStyle;
    }
    return style;
  },

  countrySlider: function () {
    var countryTrigger = document.querySelector('.country-trigger'), that = this;
    countryTrigger.onclick = function () {
      var div = document.createElement('div');
      var searchHandler = function () {
        var countryInputZone = document.querySelector('#country-input-zone');
        var cityListSearched = document.querySelector('.country-list-searched-order');
        var countryListInitShow = document.querySelector('.country-list-init-show');
        var searchResult = [], reg = /[A-Za-z]{2,}|[\u4e00-\u9fa5]{1,}/, valueStr = countryInputZone.value, resultStr = '';
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

        if (reg.test(valueStr)) {
          console.log(22)
          var mb = String(valueStr).toLowerCase();
          for (var p = 0; p < arrCountry.length; p++) {
            var ma = String(arrCountry[p]['CountryEN']).toLowerCase();
            if (ma.indexOf(mb) > -1 || arrCountry[p]['CountryName'].indexOf(valueStr) > -1) {
              searchResult.push(arrCountry[p]);
            }
          }
          searchResult = searchResult.distinct();
          if (!searchResult.length) {
            resultStr += '<li>无搜索结果</li>';
            cityListSearched.style.display = 'none';
          } else {
            for (var l = 0; l < searchResult.length; l++) {
              resultStr += '<li data-tel-code="' + searchResult[l].TelCode + '" data-Country-code="' + searchResult[l].CountryCode + '">' + searchResult[l].CountryName + '</li>'
            }
            cityListSearched.innerHTML = resultStr;
            cityListSearched.style.display = 'block';
          }
        }
      };
      div.className = 'all-elements country-cho-wrap-order';
      div.innerHTML = '<div class="header country-list-header">' +
        '<a href="javascript:void(0)" class="icons header-back country-hidden"></a>' +
        '<div class="cl_search">' +
        '<input type="text" placeholder="中国/China/zhongguo" id="country-input-zone"/>' +
        '<i></i>' +
        '</div>' +
        '</div>' +
        '<ul class="country-list-searched country-list-searched-order"></ul>' +
        '<div class="snap-content country-list country-list-init-show" style="padding-top: 45px">' +
        '<div class="country-wrap" id="country-wrap">' +
        '<ul class="country-list counter-list-to-order">' +
        '</ul>' +
        '</div>' +
        '</div>';
      document.body.appendChild(div);

      var cityInputZone = document.querySelector('#country-input-zone');
      var countryHidden = document.querySelector('.country-hidden');
      var ulLi = document.querySelector('.counter-list-to-order'), liStr = '';
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
      arrCountry = arrCountry.distinct();
      for (var ji = 0, len = arrCountry.length; ji < len; ji++) {
        liStr += '<li data-tel-code="' + arrCountry[ji].TelCode + '" data-code="' + arrCountry[ji].CountryCode + '">' + arrCountry[ji].CountryName + '</li>'
      }
      ulLi.innerHTML = liStr;
      if (cityInputZone.addEventListener) {
        cityInputZone.addEventListener('input', searchHandler, false)
      } else {
        cityInputZone.attachEvent('onpropertychange', searchHandler)
      }
      countryHidden.onclick = function () {
        if (document.querySelector('.country-cho-wrap-order')) {
          document.body.removeChild(document.querySelector('.country-cho-wrap-order'));
        }
      };
      that.addCountryCodeHandler();
    };
  },

  eventHandler: function () {
    var bottomPrice = document.querySelector('.bottomPrice'), that = fOrder, searchInfo = JSON.parse(window.sessionStorage.getItem('fIndexInfo')).data;
    var postPara = {}, temObject = {};
    postPara.wapOrder = {};
    postPara.travellerInfo = [];
    postPara.contactDetail = {};
    postPara.currencyCode = "CNY";
    postPara.totalPrice = this.priceData.priceTotal;
    postPara.track = {browserType: "", deviceID: ""/*vlm.getDeviceID()*/};
    postPara.wapOrder.memberId = window.localStorage.memberid;
    postPara.wapOrder.setID = that.curFlightData.setID;
    postPara.wapOrder.cacheID = that.curFlightData.cacheID;
    postPara.wapOrder.cityCodeFrom = searchInfo.cityCodeFrom;
    postPara.wapOrder.cityCodeTo = searchInfo.cityCodeTo;
    postPara.wapOrder.numofAdult = searchInfo.numofAdult;
    postPara.wapOrder.numofChild = searchInfo.numofChild;
    postPara.wapOrder.routeType = searchInfo.routeType;
    postPara.wapOrder.cabinClass = searchInfo.cabinClass;
    postPara.wapOrder.sourceType = "H5";
    this.addHandler(bottomPrice, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, contactInfo = {}, selectTravellerList = window['localStorage']['travellerInfo_selected'];
      if (target.className == "preserve") {
        if (!window['localStorage']['travellerInfo_selected']) {
          jAlert('请选择' + searchInfo.numofAdult + '名成人,' + searchInfo.numofChild + '名儿童!', '提示');
          return;
        } else {
          var storageInfo = JSON.parse(window['localStorage']['travellerInfo_selected']), contactInfoCache = {};
        }
        //乘客信息核对
        var passengerLis = document.querySelectorAll('.passenger_outer li'), realPara = [], tempAdult = 0, tempChild = 0;
        if (passengerLis) {
          for (var li = 0; li < passengerLis.length; li++) {
            var passPortNumber = passengerLis[li].querySelector('.passportValue').value;
            for (var ki = 0; ki < storageInfo.length; ki++) {
              if (storageInfo[ki].CertificateInfo.IdNumber == passPortNumber) {
                realPara.push(storageInfo[ki])
              }
            }
          }
        }
        for (var dd = 0; dd < realPara.length; dd++) {
          if (realPara[dd].PassengerType == 'ADULT') {
            tempAdult++;
          }
          if (realPara[dd].PassengerType == 'CHILD') {
            tempChild++;
          }
        }
        if (tempAdult != searchInfo.numofAdult || tempChild != searchInfo.numofChild) {
          jAlert('请选择' + searchInfo.numofAdult + '名成人,' + searchInfo.numofChild + '名儿童!', '提示');
          return;
        }

        postPara.travellerInfo = realPara;

        if (window['localStorage']['contact_selected']) {
          contactInfo = JSON.parse(window['localStorage']['contact_selected']);
        } else {
          contactInfo = {
            contactNumber: "",
            countryNumber: "",
            email: "",
            firstName: "",
            lastName: "",
            mobilePhone: "",
            sexCode: "Mr"
          }
        }
        contactInfoCache.firstName = document.querySelector('#first-name').value;
        contactInfoCache.lastName = document.querySelector('#last-name').value;
        contactInfoCache.email = document.querySelector('#email-label').value;
        contactInfoCache.mobilePhone = document.querySelector('#tel-num').value;
        contactInfoCache.countryNumber = document.querySelector('#country-code').innerHTML;
        if (contactInfoCache.firstName == "") {
          jAlert('请输入姓!', '提示');
          return;
        }
        if (contactInfoCache.lastName == "") {
          jAlert('请输入名!', '提示');
          return;
        }

        if (contactInfoCache.email == "") {
          jAlert('请输入邮箱!', '提示');
          return;
        }
        if (contactInfoCache.email == "") {
          jAlert('请输入邮箱!', '提示');
          return;
        } else if (!/^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactInfoCache.Email)) {
          jAlert('请输入正确格式邮箱!', '提示');
          return;
        }
        if (contactInfoCache.mobilePhone == "") {
          jAlert('请输入手机号!', '提示');
          return;
        } else if (!/^1\d{10}$/.test(contactInfoCache.mobilePhone)) {
          jAlert('请输入正确格式手机号!', '提示');
          return;
        }
        for (var tv in contactInfoCache) {
          contactInfo[tv] = contactInfoCache[tv];
        }
        window['localStorage']['contact_selected'] = JSON.stringify(contactInfo);
        postPara.contactDetail = contactInfo;
        this.fadeHandler("show");
        this.postPara = postPara;
        console.log(postPara);
        /* this.postPara = { 成单参数格式
         "WapOrder": {
         "SetID": 30000025,
         "CacheID": 3514054,
         "CityCodeFrom": "BJS",
         "CityCodeTo": "SIN",
         "NumofAdult": "1",
         "NumofChild": "0",
         "RouteType": "Return",
         "CabinClass": "Economy",
         "SourceType": "H5",
         "MemberId": "84738"
         },
         "TravellerInfo": [{
         "PassengerType": "ADULT",
         "Id": 2419,
         "SexCode": "Ms",
         "FirstName": "Chang",
         "LastName": "Liu",
         "DateOfBirth": "1990-01-09T00:00:00",
         "email": "undefined",
         "mobile": "undefined",
         "CertificateInfo": {
         "IdType": 1,
         "IdCountry": "CN",
         "IdNumber": "111111111111111111",
         "IdActivatedDate": "2018-01-01T00:00:00"
         },
         "BaggageCode": "",
         "CountryCode": "CN"
         }],
         "ContactDetail": {
         "SexCode": "Ms",
         "FirstName": "Liu",
         "LastName": "San",
         "Email": "11111111111@qq.com",
         "CountryNumber": "86",
         "ContactNumber": "5689",
         "MobilePhone": "11111111111"
         },
         "CurrencyCode": "CNY",
         "TotalPrice": 2377,
         "track": {"browserType": "", "deviceID": ""}
         };*/
        that.tAjax("", this.postPara, "3002", 3, function () {
          var that = fOrder, orderResultTip = document.querySelector('.order-result-tip');
          var result = arguments[0];
          that.fadeHandler();
          if (result.success && result.code == 200) {
            var orderResultInfo = {};
            orderResultInfo['orderTime'] = new Date();
            orderResultInfo['totalPrice'] = that.postPara['totalPrice'];
            orderResultInfo['currencyCode'] = that.postPara['currencyCode'];
            orderResultInfo['numofAdult'] = that.postPara['wapOrder']['numofAdult'];
            orderResultInfo['numofChild'] = that.postPara['wapOrder']['numofChild'];
            orderResultInfo['routeType'] = that.postPara['wapOrder']['routeType'];
            orderResultInfo['flightInfo'] = that.curFlightData;
            orderResultInfo['travellerInfo'] = realPara;
            orderResultInfo['contactDetail'] = contactInfo;
            orderResultInfo['bookingID'] = result['data']['bookingID'];
            orderResultInfo['bookingRefNo'] = result['data']['bookingRefNo'];
            /* that.storageUtil.set('orderResultInfo',orderResultInfo);*/
            window.localStorage.setItem('orderResultInfo', JSON.stringify(orderResultInfo));
            console.log(orderResultInfo)
            document.location.href = '../payment/payment.html?bookingRefNo=' + orderResultInfo.bookingRefNo + "&type=Flight";
          } else {
            if (result.message.indexOf('失败') > -1 && result.message.indexOf('重新') > -1) {
              jConfirm('预订失败,需要重新预订?', '提示', function (status) {
                if (status == true) {
                  window.history.go(-2);
                }
              }, '确定', '取消');
            } else if (result.message.indexOf('过期') > -1) {
              jConfirm('航班信息过期,需要重新预订?', '提示', function (status) {
                if (status == true) {
                  window.history.go(-2);
                }
              }, '确定', '取消');
            } else {
              orderResultTip.innerHTML = result.message;
              orderResultTip.style.display = 'block';
              that.timer7 = window.setTimeout(function () {
                orderResultTip.style.display = 'none';
                window.clearTimeout(that.timer7);
                that.timer7 = null;
              }, 3000);
            }
          }
        });
      } else if (target.className == "tot_tips_rmb" || target.className == "money_number" || target.className.indexOf('detail_fare') > -1) {
        var priceDetailInfo = document.querySelector('.priceDetailInfo'), shadow = document.querySelector('.shadow'), tag = "", detailFare = document.querySelector('.detail_fare');
        priceDetailInfo.style.transition = 'all 400ms ease-in';
        priceDetailInfo.style.webkitTransition = 'all 400ms linear';
        tag = that.getCurrentStyle(shadow).display;
        if (tag == "block") {
          shadow.style.display = "none";
          detailFare.className = "detail_fare open";
          priceDetailInfo.style.bottom = '-126%';
        } else {
          shadow.style.display = "block";
          detailFare.className = "detail_fare";
          priceDetailInfo.style.bottom = ".89rem";
        }
      }
    });
  },

  createTags: function () {
    var data = arguments[0];
    console.log(data);
    var tempString1 = "", outputString1 = "", tempString2 = "", outputString2 = "", that = fOrder;
    tempString1 = $("#template_flight_summary").html();
    outputString1 = ejs.render(tempString1, data);
    tempString2 = $("#template_flight_cost_seat").html();
    outputString2 = ejs.render(tempString2, data);
    $(".date-week-port").eq(0).html(outputString1);
    $(".seat-price-cost").eq(0).html(outputString2);
    return this;
  },

  priceTags: function () {
    var data = arguments[0], tempString1 = "", outputString1 = "", that = fOrder, moneyNumber = document.querySelector('.money_number');
    tempString1 = $("#template_flight_price").html();
    outputString1 = ejs.render(tempString1, data);
    $(".priceDetailInfo").eq(0).html(outputString1);
    moneyNumber.innerHTML = data.priceTotal;
    return this;
  },

  innitData: function () {
    var flightData = {}, fIndexInfo = {}, storage = window.sessionStorage, priceTotal = "", priceData = {};
    flightData = JSON.parse(storage.getItem('currentFlight'));
    fIndexInfo = JSON.parse(storage.getItem("fIndexInfo")).data;
    priceData.numofAdult = fIndexInfo.numofAdult;
    priceData.numofChild = fIndexInfo.numofChild;
    priceData.totalFareAmountADT = flightData.totalFareAmountADT;
    priceData.totalTaxAmountADT = flightData.totalTaxAmountADT;
    priceData.totalFareAmountExc = flightData.totalFareAmountExc;
    if (flightData.totalFareAmountCHD) {
      priceData.totalFareAmountCHD = flightData.totalFareAmountCHD;
      priceData.totalTaxAmountCHD = flightData.totalTaxAmountCHD;
      priceData.totalFareAmountExc = Number(flightData.totalFareAmountCHD) + Number(flightData.totalTaxAmountCHD);
      priceData.priceTotal = flightData.totalFareAmountExc * Number(fIndexInfo.numofAdult) + (flightData.totalFareAmountCHD + flightData.totalTaxAmountCHD) * Number(fIndexInfo.numofChild);
    } else {
      priceData.priceTotal = flightData.totalFareAmountExc * Number(fIndexInfo.numofAdult)
    }
    this.curFlightData = flightData;
    this.fIndexInfo = fIndexInfo;
    this.priceData = priceData;
    this.createTags(flightData).priceTags(priceData);
    return this;
  },

  init: function () {
    this.innitData().fadeHandler().eventHandler()
  }
};
fOrder.init();