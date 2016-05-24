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

  eventHandler: function () {
    var content = document.querySelector('.content'), that = this, paraObj = {}, storage = window.sessionStorage;
    var singleWrap = document.querySelector('#timeSingleWrap'), doubleWrap = document.querySelector('#timeDoubleWrap');
    that.deg = 0;
    this.addHandler(content, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      var temTitle = null;
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
  eventHandler: function () {
    var getPrice = document.querySelector('.preserve'), that = fOrder, searchInfo = JSON.parse(window.sessionStorage.getItem('fIndexInfo')).data;
    var postPara = {}, contactWrap = document.querySelector('.contact_wrap'), temObject = {};
    console.log(searchInfo)
    postPara.wapOrder = {};
    postPara.travellerInfo = [];
    postPara.contactDetail = {};
    postPara.currencyCode = "CNY";
    postPara.totalPrice = 4875;
    postPara.track = {browserType: "", deviceID: ""/*vlm.getDeviceID()*/};
    postPara.wapOrder.setID = that.curFlightData.setID;
    postPara.wapOrder.cacheID = that.curFlightData.cacheID;
    postPara.wapOrder.cityCodeFrom = searchInfo.cityCodeFrom;
    postPara.wapOrder.cityCodeTo = searchInfo.cityCodeTo;
    postPara.wapOrder.numofAdult = searchInfo.numofAdult;
    postPara.wapOrder.numofChild = searchInfo.numofChild;
    postPara.wapOrder.routeType = searchInfo.routeType;
    postPara.wapOrder.cabinClass = searchInfo.cabinClass;
    postPara.wapOrder.sourceType = "H5";
    this.addHandler(getPrice,'click', function(e){
      var e = e || window.event;
      var target =e.target || e.srcElement;
      var that = fOrder,contactInfo={};
      var selectTravellerList=window['localStorage']['travellerInfo_selected'];
      if(!window['localStorage']['travellerInfo_selected']){
        jAlert('请选择'+searchInfo.numofAdult+'名成人,'+searchInfo.numofChild+'名儿童!', '提示');
        return;
      }else{
        var storageInfo = JSON.parse(window['localStorage']['travellerInfo_selected']),contactInfoCache = {};
      }
      //乘客信息核对
      var passengerLis = document.querySelectorAll('.passenger_outer li'), realPara=[], tempAdult= 0, tempChild=0;
      if(passengerLis){
        for(var li=0; li<passengerLis.length;li++){
          var passPortNumber = passengerLis[li].querySelector('.passportValue').value;
          for(var ki=0;ki<storageInfo.length;ki++){
            if(storageInfo[ki].CertificateInfo.IdNumber == passPortNumber){
              realPara.push(storageInfo[ki])
            }
          }
        }
      }
      for(var dd=0;dd<realPara.length;dd++){
        if(realPara[dd].passengerType == 'ADULT'){
          tempAdult++;
        }
        if(realPara[dd].passengerType == 'CHILD'){
          tempChild++;
        }
      }
      if(tempAdult!=searchInfo.numofAdult||tempChild!=searchInfo.numofChild){
        jAlert('请选择'+searchInfo.numofAdult+'名成人,'+searchInfo.numofChild+'名儿童!', '提示');
        return;
      }

      postPara.travellerInfo =realPara;

      if(window['localStorage']['contact_selected']){
        contactInfo =JSON.parse(window['localStorage']['contact_selected']);
      }else{
        contactInfo={
          contactNumber: "",
          countryNumber: "",
          email: "",
          firstName: "",
          lastName: "",
          mobilePhone: "",
          sexCode: "Mr"}
      }
      contactInfoCache.firstName = document.querySelector('#first-name').value;
      contactInfoCache.lastName = document.querySelector('#last-name').value;
      contactInfoCache.email =document.querySelector('#email-label').value;
      contactInfoCache.mobilePhone = document.querySelector('#tel-num').value;
      contactInfoCache.countryNumber = document.querySelector('#country-code').innerHTML;
      if(contactInfoCache.firstName==""){
        jAlert('请输入姓!', '提示');
        return;
      }
      if(contactInfoCache.lastName==""){
        jAlert('请输入名!', '提示');
        return;
      }

      if(contactInfoCache.email==""){
        jAlert('请输入邮箱!', '提示');
        return;
      }
      if(contactInfoCache.email==""){
        jAlert('请输入邮箱!', '提示');
        return;
      }else if(!/^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactInfoCache.Email)){
        jAlert('请输入正确格式邮箱!', '提示');
        return;
      }
      if(contactInfoCache.mobilePhone==""){
        jAlert('请输入手机号!', '提示');
        return;
      }else if(!/^1\d{10}$/.test(contactInfoCache.mobilePhone)){
        jAlert('请输入正确格式手机号!', '提示');
        return;
      }
      for(var tv in contactInfoCache){
        contactInfo[tv] = contactInfoCache[tv];
      }
      window['localStorage']['contact_selected'] = JSON.stringify(contactInfo);
      postPara.contactDetail =contactInfo;
      this.fadeHandler("show");
      this.postPara = postPara;
      console.log(postPara);
      that.tAjax("", this.postPara, "3002", 3, function(arg){
        this.fadeHandler();
        var that = fOrder,orderResultTip = document.querySelector('.order-result-tip');
        var arg = arg;
        if(arg.success&&arg.code==200){
          var orderResultInfo = {};
          orderResultInfo['orderTime'] = new Date();
          orderResultInfo['totalPrice'] = that.curFlightData.totalFareAmountExc;
          orderResultInfo['currencyCode'] = that.postPara['currencyCode'];
          orderResultInfo['numofAdult'] = that.postPara['wapOrder']['numofAdult'];
          orderResultInfo['numofChild'] = that.postPara['wapOrder']['numofChild'];
          orderResultInfo['routeType'] = that.postPara['wapOrder']['routeType'];
          orderResultInfo['flightInfo'] = that.curFlightData;
          orderResultInfo['travellerInfo'] = realPara;
          orderResultInfo['contactDetail'] = contactInfo;
          orderResultInfo['bookingID'] = arg['data']['bookingID'];
          orderResultInfo['bookingRefNo'] = arg['data']['bookingRefNo'];
          that.storageUtil.set('orderResultInfo',orderResultInfo);
          console.log(orderResultInfo)
           document.location.href = '../payment/payment.html?bookingRefNo='+orderResultInfo.bookingRefNo+"&type=Flight";
        }else{
          if(arg.message.indexOf('失败')>-1&&arg.message.indexOf('重新')>-1){
            jConfirm('预订失败,需要重新预订?', '提示', function(status){
              if(status == true){
                window.history.go(-2);
              }
            }, '确定', '取消');
          }else if(arg.message.indexOf('过期')>-1){
            jConfirm('航班信息过期,需要重新预订?', '提示', function(status){
              if(status == true){
                window.history.go(-2);
              }
            }, '确定','取消');
          }else{
            orderResultTip.innerHTML = arg.message;
            orderResultTip.style.display = 'block';
            that.timer7 = window.setTimeout(function(){
              orderResultTip.style.display = 'none';
              window.clearTimeout(that.timer7);
              that.timer7 = null;
            },3000);
          }
        }
      });
    });



/*    that.postObj = {
        "WapOrder": {
          "SetID": 30000107,
          "CacheID": 3013513,
          "CityCodeFrom": "BJS",
          "CityCodeTo": "SIN",
          "NumofAdult": "1",
          "NumofChild": "0",
          "RouteType": "Return",
          "CabinClass": "Economy",
          "SourceType": "H5"
        },
        "TravellerInfo": [{
          "PassengerType": "ADULT",
          "Id": 2296,
          "SexCode": "Mr",
          "FirstName": "kng",
          "LastName": "amy",
          "DateOfBirth": "1990-01-09T00:00:00",
          "email": "12422532@qq.com",
          "mobile": "13601107741",
          "CertificateInfo": {
            "IdType": 1,
            "IdCountry": "CN",
            "IdNumber": "110226199878659090",
            "IdActivatedDate": "2018-01-01T00:00:00"
          },
          "BaggageCode": "",
          "CountryCode": "CN"
        }],
        "ContactDetail": {
          "SexCode": "Ms",
          "FirstName": "shen",
          "LastName": "dongjie",
          "Email": "vvv@qq.com",
          "CountryNumber": "86",
          "ContactNumber": "5689",
          "MobilePhone": "15123957486"
        },
        "CurrencyCode": "CNY",
        "TotalPrice": 4875,
        "track": {"browserType": "", "deviceID": ""}
    };*/
    this.tAjax("", that.postObj, "3002", 3, function (arg) {
      console.log(arg)

      /* var that = ticketOrder,orderResultTip = document.querySelector('.order-result-tip');
       var arg = arg;
       if(arg.success&&arg.code==200){
       var orderResultInfo = {};
       orderResultInfo['orderTime'] = new Date();
       orderResultInfo['TotalPrice'] = that.reverseInformation['TotalPrice'];
       orderResultInfo['CurrencyCode'] = that.reverseInformation['CurrencyCode'];
       orderResultInfo['NumofAdult'] = that.reverseInformation['WapOrder']['NumofAdult'];
       orderResultInfo['NumofChild'] = that.reverseInformation['WapOrder']['NumofChild'];
       orderResultInfo['RouteType'] = that.reverseInformation['WapOrder']['RouteType'];
       orderResultInfo['flightInfo'] = that.orderFlightData;
       orderResultInfo['TravellerInfo'] = realPara;
       orderResultInfo['ContactDetail'] = contactInfo;
       orderResultInfo['bookingID'] = arg['data']['bookingID'];
       orderResultInfo['bookingRefNo'] = arg['data']['bookingRefNo'];
       that.storageUtil.set('orderResultInfo',orderResultInfo);
       document.location.href = '../payment/payment.html?bookingRefNo='+orderResultInfo.bookingRefNo+"&type=Flight";

       }*/


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

  innitData: function () {
    var flightData = {}, storage = window.sessionStorage;
    flightData = JSON.parse(storage.getItem('currentFlight'));
    this.curFlightData = flightData;
    this.createTags(flightData);
    return this;
  },

  init: function () {
    this.innitData().fadeHandler().eventHandler()
  }
};
fOrder.init();
