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
    var tempString1 = "", outputString1 = "",resultArray = {},that = this , outer = document.createElement('div');
    outer.className = "country-cho-wrap all_elements";
    arrCountry.forEach(function(itemValue){  //country-cho-wrap all_elements
      resultArray[itemValue.CountryEN.substring(0,1).toUpperCase()] = [];
    });
    arrCountry.forEach(function(itemValue) {
      for (var temp in  resultArray) {
        if (itemValue.CountryEN.substring(0, 1).toUpperCase() == temp) {
          resultArray[temp].push(itemValue);
        }
      }
    });
    tempString1 = $("#template_country_summary").html();
    outputString1 = ejs.render(tempString1, {resultArray: resultArray});
    outer.innerHTML = outputString1;
    $(".shadow").eq(0).after(outputString1);
    this.addCountryCodeHandler();
    return this
  },
  addCountryCodeHandler:function(){
    var countryTrigger = document.querySelector('.country-trigger'),that = this, wrapEle = document.querySelector('.country-cho-wrap');
    var  cityInputZone = document.querySelector('#country-input-zone');
    wrapEle.onclick = function(e){
     var e = e ||window.event, target = e.target || e.srcElement;
     if(target.getAttribute('date-country-code') || target.parentNode.getAttribute('date-country-code')){
       countryTrigger.innerHTML = target.getAttribute('date-country-code')!=null?target.getAttribute('date-country-code'):target.parentNode.getAttribute('date-country-code');
       wrapEle.style.display = "none";
     }
     };
    countryTrigger.onclick = function () {
      if (that.getCurrentStyle(wrapEle).display == "block") {
        wrapEle.style.display = "none"
      }else{
        wrapEle.style.display = "block"
      }

    };

    var searchHandler=function(){
      var countryInputZone = document.querySelector('#country-input-zone');
      var cityListSearched = document.querySelector('.country-list-searched-order');
      var searchResult = [],reg = /[A-Za-z]{2,}|[\u4e00-\u9fa5]{1,}/, valueStr = countryInputZone.value, resultStr='';
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
      if(reg.test(valueStr)){
        var mb = String(valueStr).toLowerCase();
        for(var p = 0; p < arrCountry.length; p++){
          var ma =String(arrCountry[p]['CountryEN']).toLowerCase();
          if(ma.indexOf(mb)>-1||arrCountry[p]['CountryName'].indexOf(valueStr)>-1){
            searchResult.push(arrCountry[p]);
          }
        }
        }
      searchResult = searchResult.distinct();
      if(!searchResult.length){
        resultStr +='<li>无搜索结果</li>';
        cityListSearched.style.display = 'none';
      }else{
        for(var l = 0;l<searchResult.length;l++){
          resultStr += '<li class="country_lists" date-country-code="'+searchResult[l].TelCode+'"><i>'+searchResult[l].CountryName+'</i><span>'+searchResult[l].TelCode+'</span></li>'
        }
        cityListSearched.innerHTML = resultStr;
        cityListSearched.style.display = 'block';
      }

    };
    if(cityInputZone.addEventListener){
      cityInputZone.addEventListener('input',searchHandler,false)
    }else{
      cityInputZone.attachEvent('onpropertychange',searchHandler)
    }

  },

  eventHandler: function () {
    var bottomPrice = document.querySelector('.bottomPrice'), that = fOrder, searchInfo = JSON.parse(window.sessionStorage.getItem('fIndexInfo')).data;
    var postPara = {}, temObject = {},that=this;
    var priceDetailInfo = document.querySelector('.priceDetailInfo'), shadow = document.querySelector('.shadow'), tag = "", detailFare = document.querySelector('.detail_fare');
    priceDetailInfo.style.transition = 'all 400ms ease-in';
    priceDetailInfo.style.webkitTransition = 'all 400ms linear';
    postPara.wapOrder = {};
    postPara.travellerInfo = [];
    postPara.contactDetail = {};
    postPara.currencyCode = "CNY";
    postPara.totalPrice = this.priceData.priceTotal;
    postPara.track = {browserType: "", deviceID: vlm.getDeviceID()};
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
        //乘客人数核对
        var  tempAdult = 0, tempChild = 0;
        for (var dd = 0; dd < storageInfo.length; dd++) {
          if (storageInfo[dd].PassengerType == 'ADULT') {
            tempAdult++;
          }
          if (storageInfo[dd].PassengerType == 'CHILD') {
            tempChild++;
          }
        }
        if (tempAdult != searchInfo.numofAdult || tempChild != searchInfo.numofChild) {
          jAlert('请选择' + searchInfo.numofAdult + '名成人,' + searchInfo.numofChild + '名儿童!', '提示');
          return;
        }

        postPara.travellerInfo = storageInfo;
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
        contactInfoCache.countryNumber = document.querySelector('.nation_code_value').innerHTML;
        if (contactInfoCache.firstName == ""&&contactInfoCache.lastName == "") {
          jAlert('请完善联系人信息!', '提示');
          return;
        }

        if (contactInfoCache.mobilePhone == "") {
          jAlert('请输入手机号!', '提示');
          return;
        } else if (!/^1\d{10}$/.test(contactInfoCache.mobilePhone)) {
          jAlert('请输入正确格式手机号!', '提示');
          return;
        }

        if (contactInfoCache.email == "") {
          jAlert('请输入邮箱!', '提示');
          return;
        } else if (!/^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactInfoCache.email)) {
          jAlert('请输入正确格式邮箱!', '提示');
          return;
        }
        for (var tv in contactInfoCache) {
          contactInfo[tv] = contactInfoCache[tv];
        }
        window['localStorage']['contact_selected'] = JSON.stringify(contactInfo);
        postPara.contactDetail = contactInfo;
        /*this.fadeHandler("show");*/
        that.postPara = postPara;
        that.tAjax(vlm.apiWithDeviceID, that.postPara, "3002", 3, function () {
          var that = fOrder, orderResultTip = document.querySelector('.order-result-tip');
          var result = arguments[0];
          that.fadeHandler();
          if (result.success && result.code == 200) {
            var orderResultInfo = {}, that =fOrder;
            orderResultInfo['orderTime'] = new Date();
            orderResultInfo['totalPrice'] = that.priceData['totalPrice'];
            orderResultInfo['currencyCode'] = that.postPara['currencyCode'];
            orderResultInfo['numofAdult'] = that.postPara['wapOrder']['numofAdult'];
            orderResultInfo['numofChild'] = that.postPara['wapOrder']['numofChild'];
            orderResultInfo['routeType'] = that.postPara['wapOrder']['routeType'];
            orderResultInfo['flightInfo'] = that.curFlightData;
            orderResultInfo['travellerInfo'] = storageInfo;
            orderResultInfo['contactDetail'] = contactInfo;
            orderResultInfo['bookingID'] = result['data']['bookingID'];
            orderResultInfo['bookingRefNo'] = result['data']['bookingRefNo'];
            window.localStorage.setItem('orderResultInfo', JSON.stringify(orderResultInfo));
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
                 jAlert(result.message)
            }
          }
        });
      } else if (target.className == "tot_tips_rmb" || target.className == "money_number" || target.className.indexOf('detail_fare') > -1) {
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
    //this.addHandler(passengerOuter, 'click', function (e){
    //  var e = e || window.event, target = e.target || e.srcElement;
    //    if(target.className == 'minus_person'){
    //      var tem = target.parentNode.parentNode;
    //      this.removeChild(tem);
    //    }
    //})
    this.addHandler(document.body, 'click', function (e){
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.className == 'shadow'){
        target.style.display = "none";
        detailFare.className = "detail_fare open";
        priceDetailInfo.style.bottom = '-126%';
       }else if(target.className.indexOf('country_header')>-1){
             document.querySelector('.country-cho-wrap').style.display ="none";
      }
    })

    deletePassager=function(obj){
      $(obj).parent().parent().remove();

      var id=$(obj).parent().find(".itemId").val();
      var list= JSON.parse(sessionStorage.getItem("choiceAir_select_passenger-list"));
      var temp={};
      for(var key in list){
          if(key !=id){
            temp[key]=list[key];
          }
      }
      sessionStorage.setItem('choiceAir_select_passenger-list',JSON.stringify(temp));
    }
    editPassager=function(obj){
      var id=$(obj).find("input").eq(0).val();

      var numofAdult=JSON.parse(sessionStorage.getItem('fIndexInfo')).data.numofAdult;
      var numofChild= JSON.parse(sessionStorage.getItem('fIndexInfo')).data.numofChild;
      vlm.f_choice('passenger-list','f','traver','',true,true,numofAdult,numofChild,id);
    }

  },

  createTags: function () {
    var data = arguments[0];
    var tempString1 = "", outputString1 = "", tempString2 = "", outputString2 = "", that = fOrder;
    tempString1 = $("#template_flight_summary").html();
    outputString1 = ejs.render(tempString1, {flightInfo: data});
    tempString2 = $("#template_flight_cost_seat").html();
    outputString2 = ejs.render(tempString2,  {flightInfo: data});
    $(".date-week-port").eq(0).html(outputString1);
    $(".seat-price-cost").eq(0).html(outputString2);
    return this;
  },

  priceTags: function () {
    var data = arguments[0], tempString1 = "", outputString1 = "", that = fOrder, moneyNumber = document.querySelector('.money_number');
    tempString1 = $("#template_flight_price").html();
    outputString1 = ejs.render(tempString1, {flightInfo: data});
    $(".priceDetailInfo").eq(0).html(outputString1);
    moneyNumber.innerHTML = data.priceTotal;
    return this;
  },
  isInternationalTrip:function(){
       var data = JSON.parse(window.sessionStorage.getItem('fIndexInfo'));
       if(data.data.internationalOrDomestic == "international"){
              return false;
        }
        return true;
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
    this.innitData().countrySlider().fadeHandler().eventHandler()
  }
};
fOrder.init();
