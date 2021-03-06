/**
 * Created by zhouwei on 2016/3/31.
 * 支付页面（酒店，机票，酒+景，机+X）
 */
(function () {
  /*Globle变量声明*/
  var type /*业务类型 */,
    bookingRefNo /*订单号 */,
    paymentMode /*支付模式（10 - CreditCard; 20 - UnionPay; 21 - UnionPayCNY; 30 - AliPay; 31 - AlipayCNY; 40 - PayPal） */,
    cardType /*卡类型（101 - Visa; 102 - Master; 103 - Amex; 104 - JCB; 105 - Diner） */;

  var payment = function () {

    /*支付类型*/
    var paymentType = {
      "Visa": {
        id: 1,
        name: "Visa信用卡"
      },
      "Master": {
        id: 20,
        name: "万事达信用卡"
      },
      "Paypal": {
        id: 21,
        name: "万事达信用卡"
      },
      "UnionPayCNY": {
        id: 28,
        name: "万事达信用卡"
      },
      "AliPayCNY": {
        id: 27,
        name: "万事达信用卡"
      },
    };

    /*支付模块（酒店，机票，景点，酒+景，机+酒）*/
    var _bussinessType = {
      "Hotle": {
        id: 1,
        name: "酒店",
        detailCode: "0013",
        payMentCode: "0012"
      },
      "Flight": {
        id: 2,
        name: "机票",
        detailCode: "3006",
        payMentCode: "3004"
      },
      "Scenic": {
        id: 3,
        name: "景点",
        detailCode: "0095",
        payMentCode: "0093"
      },
      "Tour": {
        id: 4,
        name: "酒+景",
        detailCode: "0095",
        payMentCode: "0203"
      },
      "FlightHotle": {
        id: 5,
        name: "机+酒",
        detailCode: "50100007",
        payMentCode: "50100005"
      },
      "FlightHotelTour": {
        id: 6,
        name: "机+酒+景",
        detailCode: "60100013",
        payMentCode: "60100011"
      }
    };
    /*页面初始化*/
    var _init = {
      //页面事件绑定
      bindPaymentTypeEvent: function () {
        //选择支付方式
        $(".p-pay li").on("click", function () {
          paymentMode = $(this).attr("data-paymentmode") //获取选择支付类型
          cardType = $(this).attr("data-cardtype") //获取选择卡类型类型

          //如果在线支付（银联Or支付宝）
          if (paymentMode == "CreditCard") {
            $(".paymentype-session").hide();
            $(".credit-session").show();
            $(".p-but").show();
          } else {
            _paymentEvent();
          }
          //清除input值
          $(".credit-session input").attr("value", "");
        })
        //回退按钮
        $(".credit-session .icon_back").on("click", function () {
          $(".paymentype-session").show();
          $(".credit-session").hide();
          $(".p-but").hide();

        })
        //800电话按钮
        $(".tel_tip").on("click", function () {
          $(".jpop_box_tic").show();
        })
        $('.jpop_box_tic span,.jpop_box_tic a').click(function () {
          $('.jpop_box_tic').hide();
        })

        //支付按钮
        $(".p-but").on("click", function () {
          _paymentEvent();
        })
      },
      //有效期下拉控件
      expityDateInit: function () {
        var fullYear = new Date().getFullYear() + "年";
        var month = new Date().getMonth();
        month = (month + 2) + "月";

        var expityDate = new ATplugins.Picker({
          input: "#jp_limit_time",
          value: [fullYear, month], //默认选中
          type: "cardExpirationDate",
          cont: "cardExpirationDate1",
          callback: function () {
            var jp_limit_time = document.getElementById('jp_limit_time');
            var selectTime = jp_limit_time.getAttribute("data-expire");
            var nowTime = new Date().getTime();
            selectTime = new Date(selectTime).getTime();
            if (nowTime > selectTime) {
              $.alerts.alert('有效期应大于当前日期，请重新选择!', null, null, "确定");
            } else {
              $(".cardExpiryDate").css("color", "#000000");
            }
          }
        });

      }

    }
    /*获取订单详情数据*/
    var _getOrderData = function (bussinessType, bookingRefNo, foreEndType, callback) {
      var Parameters;
      //Todo 酒店特殊处理（目前为不影响酒店支付流程，暂时单独处理，后期等后台接口重构去掉）
      if (bookingRefNo != null && bookingRefNo != undefined && bookingRefNo !== "undefined") {
        if (bussinessType.id == 1) {
          Parameters = {
            "CultureName": "en-US",
            "BookingReferenceNo": bookingRefNo
          }
        }
        else {
          Parameters = {
            "BookingRefNo": bookingRefNo
          }
        }
        var Parameters = {
          "Parameters": Parameters,
          "ForeEndType": foreEndType,
          "Code": bussinessType.detailCode
        }
        console.log(JSON.stringify(Parameters));
        vlm.loadJson("", JSON.stringify(Parameters), callback);
      }
      else {
        var json = JSON.parse(localStorage.getItem('user_order_storage12345'));
        vlm.init();
        var data = {data: json};
        console.log(json);
        _generateHtml(type, data);
      }
    };
    /*支付Modle实体*/
    var _get_modle = function () {
      return {
        "cardAddressPostalCode": $(".cardAddressPostalCode").val(),
        "bankName": $(".bankName").val(),
        "countryNumber": $(".phone_pre ").attr("data-code"),
        "cardAddressCity": $(".cardAddressCity").val(),
        "cardHolderName": $(".cardHolderName").val(),
        "cardExpiryDate": $(".cardExpiryDate").attr("data-expire"),
        "cardNumber": $(".cardNumber").val(),
        "MobilePhone": $(".MobilePhone").val(),
        "cardType": cardType,
        "cardSecurityCode": $(".cardSecurityCode").val(),
        "cardCountryCode": $(".CardCountryCode ").attr("data-code"),
        "cardAddressCountryCode": $(".CardIssuanceCountryCode").attr("data-code"),
        "cardAddress": $(".cardAddress").val()
      }
    };
    var _check_modle = function () {
      var model = _get_modle();
      if (!vlm.Utils.validate["isNoEmpty"](model.cardHolderName)) {
        jAlert("持卡人姓名不能为空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.countryNumber)) {
        jAlert("信用卡不能为空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.cardSecurityCode)) {
        jAlert("安全码不能为空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.cardExpiryDate)) {
        jAlert("有效期不能为空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["bankAccountNo"](model.cardNumber)) {
        jAlert("信用卡卡号错误！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["safecode"](model.cardSecurityCode)) {
        jAlert("安全码3位数字！", "", null, "确认");
        return false;
      }
      //if(!vlm.Utils.validate["dataValid"](model.cardExpiryDate)){
      //    jAlert("有效期格式不正确！","",null,"确认");
      //    return false;
      //}


      if (!vlm.Utils.validate["isNoEmpty"](model.cardAddressCity)) {
        jAlert("账单城市不能不空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.cardAddress)) {
        jAlert("账单地址不能不空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.cardAddressPostalCode)) {
        jAlert("邮政编码不能为空！", "", null, "确认");
        return false;
      }
      if (!vlm.Utils.validate["isNoEmpty"](model.bankName)) {
        jAlert("发卡银行不能为空！", "", null, "确认");
        return false;
      }


      if (!vlm.Utils.validate["isNoEmpty"](model.MobilePhone)) {
        jAlert("手机号不能为空！", "", null, "确认");
        return false;
      }
      return true
    }
    /*支付方法  paymentType(支付宝，信用卡)，bussinessType（机票，酒店....）*/
    var _paymentEvent = function () {
      var parameters, url = ""
      //Todo 酒店支付特殊处理（目前为不影响酒店支付流程，暂时单独处理，后期等后台接口重构去掉）
      if (type.id == 1) {
        url = vlm.apiWithDeviceID;
        var model = _get_modle();
        var guestNameList = [];
        //酒店订单未生成
        if (bookingRefNo == null || bookingRefNo == undefined) {
          if (paymentMode == "CreditCard") {
            var flag = _check_modle();
            if (!flag) {
              return;
            }
          }
          var json = JSON.parse(localStorage.getItem('user_order_storage12345'));
          for (var i = 0; i <= json.guestName.length - 1; i++) {
            var guestInfo = {};
            guestInfo.guestFirstName = json.guestName[i].GuestFirstName;
            guestInfo.guestLastName = json.guestName[i].GuestLastName;
            guestNameList.push(guestInfo);
          }
          var param;

          var hotelStorage = sessionStorage.getItem('hotelStorage12345');
          hotelStorage = hotelStorage ? JSON.parse(hotelStorage) : {
            "NumChild": 0,
            "NumAdult": 1,
            "NumRoom": 1
          };
          Parameters = {
            "availability": true,
            "bankName": model.bankName,
            "browserType": "",
            "cardBillingAddress": "werty",
            "cardHolderName": model.cardHolderName,
            "creditCardExpiryDate": model.cardExpiryDate,
            "cardIssuanceCountry": model.cardCountryCode,
            "cardSecurityCode": model.cardSecurityCode,
            "creditCardNumber": model.cardNumber,
            "cardBillingAddress": model.cardAddress,
            "countryNumber": model.countryNumber,
            "MobilePhone": model.MobilePhone,
            "cardAddressCity": model.cardAddressCity,
            "cardAddressPostalCode": model.cardAddressPostalCode,
            "cardCountryCode": model.cardCountryCode,
            "creditCardType": paymentType[cardType].id,
            "cashVoucherDetails": "",
            "checkInDate": json.dateInfo.CheckInDate + "T00:00:00",
            "checkOutDate": json.dateInfo.CheckOutDate + "T00:00:00",
            "cookieID": 1,
            "guestContactNo": json.GuestContactNo,
            "guestEmail": json.GuestEmail,
            guestNameList: guestNameList,
            "guestRequest": "",
            "guestTitle": "Mr",
            "hotelCode": json.HotelGenInfo.hotelCode,
            "hotelName": json.HotelGenInfo.hotelName,
            "iPAddress": "",
            "memberId": localStorage.memberid,
            "nationlityCode": "",

            "numofChild": hotelStorage.NumChild,
            "numOfGuest": hotelStorage.NumAdult,
            "numOfRoom": hotelStorage.NumRoom,

            "residenceCode": "",
            "roomCode": json.roomCode,
            "roomName": json.roomName,
            "roomTypeCode": json.RoomTypeCode,
            "roomTypeName": json.RoomTypeName,
            "sessionID": "",
            "totalPrice": json.totalPrice * parseInt(json.NumOfRoom),
            "totalPriceCNY": json.totalPriceCNY * parseInt(json.NumOfRoom),
            "trck": "",
            "browserType": "",
            "deviceID": vlm.getDeviceID(),
            "Vouchers": json.Vouchers ? json.Vouchers.code : ""   //array
          }
          param = {
            "Code": type.payMentCode,
            "Parameters": Parameters,
            "ForeEndType": 3
          }
        } else {
          Parameters = {
            "bankName": model.bankName,
            "bookingReferenceNo": bookingRefNo,
            "cardBillingAddress": "",
            "cardHolderName": model.cardHolderName,
            "cardIssuanceCountry": model.cardIssuanceCountry,
            "cardSecurityCode": model.cardSecurityCode,
            "cashVoucherDetails": "",
            "creditCardExpiryDate": model.cardExpiryDate,
            "creditCardNumber": model.cardNumber,
            "creditCardType": cardType,
            "paymentGatewayID": "0",
            "CardIssuanceCountry": $(".CardIssuanceCountryCode").attr("data-code")
          }
          param = {
            "Code": "0014",
            "Parameters": Parameters,
            "ForeEndType": 3
          }
        }

      }
      else {

        //支付模式为在线支付
        if (paymentMode == "CreditCard") {
          var flag = _check_modle();
          if (!flag) {
            return;
          }
          parameters = {
            "cardInfo": _get_modle(),
            "bookingRefNo": bookingRefNo,
            "currencyCode": "CNY",
            "totalPrice": $(".total_price").html(),
            "paymentMode": paymentMode
          }
        } else {
          parameters = {
            "bookingRefNo": bookingRefNo,
            "currencyCode": "CNY",
            "totalPrice": $(".total_price").html(),
            "paymentMode": paymentMode
          }
        }
        var param = {
          "Code": type.payMentCode,
          "Parameters": parameters,
          "ForeEndType": 3
        }
      }

      //$.jAlert.confirm("支付完成前，请不要关闭此支付验证窗口 </br> 支付完成后，请根据你支付的情况点击下面的按钮。","网上支付提示",null,"支付完成","支付出现问题");
      console.log(JSON.stringify(param));
      vlm.loading();

      /**
       * 传入'nothing'，自由控制loading
       * ajaxStart显示loading
       * ajaxSuccess继续显示loading，直到跳转
       * ajaxFail or ajaxError隐藏loading
       */
      $(window).ajaxStart(function () {
        vlm.loading();
      });
      vlm.loadJson(url, JSON.stringify(param), function (data) {
        if (data.success) {
          if (type.id == 1) {
            vlm.loading();
            if (data.data[0] == undefined) {
              location.href = data.data.paymentRedirectURL
            } else {
              location.href = data.data[0].paymentRedirectURL
            }
          } else {
            location.href = data.data.paymentRedirectURL;
          }
        } else {
          jAlert(data.message);
          $("#status").fadeOut();
          $("#preloader").delay(400).fadeOut("medium");
        }
      }, null, null, 'nothing');

    };
    /*生成订单详情HTML片段*/
    var _generateHtml = function (type, data) {
      //var tplD=template("pd_list",data);
      //$("#pd_list").html(tplD)

      //机+酒详情tpl
      if (type.id == 5) {
        //var numofAdult=0;
        //var numofChild=0;
        //for (var i = 0;i<data.data.chargeDetails.length;i++){
        //  if(data.data.chargeDetails[i].category=="ADULT"){
        //    numofAdult+=1
        //    totalPrice+=data.data.chargeDetails[i].totalAmount;
        //  }else if(data.data.chargeDetails[i].category=="CHILD"){
        //    numofChild+=1;
        //    totalPrice+=data.data.chargeDetails[i].totalAmount;
        //  }
        //}
        //data.data.numofAdult=numofAdult;
        //data.data.numofChild=numofChild;
        var html = template("tpl_flighthotel_detail", data.data);
        $(".payment-type-list").append(html);
      }
      //酒店详情tpl
      else if (type.id == 1) {
        //data.data.totalPrice=data.data.totalFlightPrice;
        if (bookingRefNo == null) {
          //如果有使用红包,显示金额需要减去红包金额
          data.data.totalPrice = data.data.payAmount ? data.data.payAmount : (data.data.Vouchers ? data.data.calcuTotalPrice - data.data.Vouchers.amount[0] : data.data.calcuTotalPrice);
          data.data.totalPriceCNY = data.data.calcuTotalPriceCNY * data.data.NumOfRoom;
          data.data.hotelName = data.data.HotelGenInfo.hotelNameLocale;
          data.data.roomType = data.data.RoomTypeName;
          data.data.noOfRooms = data.data.NumOfRoom;
          data.data.checkInDate = data.data.dateInfo.CheckInDate;
          data.data.checkOutDate = data.data.dateInfo.CheckOutDate
          data.data.totalNight = data.data.dateInfo.totalNight;

        }
        else {
          data.data[0].hotelName = data.data[0].hotelName;
          data.data[0].totalNight = 1;
          data.data[0].totalPrice = data.data[0].payAmount;

        }
        var html = template("tpl_hotel_detail", data.data);
        $(".payment-type-list").append(html);
        if (data.data.paymentModeID == 2) {
          $(".paymentype-session .header h3").html("订单担保");
          $(".credit-session .header h3").html("担保");

        }
      }
      //机票详情tpl
      else if (type.id == 2) {
        data.data.totalPrice = data.data.totalFlightPrice;
        var html = template("tpl_flight_detail", data.data);
        $(".payment-type-list").append(html);
      }
      //景点详情tpl
      else if (type.id == 3) {
        var totalPrice = 0;
        var numofAdult = 0;
        var numofChild = 0;
        for (var i = 0; i < data.data.chargeDetails.length; i++) {
          if (data.data.chargeDetails[i].category == "ADULT") {
            numofAdult += parseInt(data.data.chargeDetails[i].quantity);
            totalPrice += data.data.chargeDetails[i].totalAmount;
          } else if (data.data.chargeDetails[i].category == "CHILD") {
            numofChild += parseInt(data.data.chargeDetails[i].quantity);
            totalPrice += data.data.chargeDetails[i].totalAmount;
          }
        }
        data.data.totalFlightPrice = data.data.payAmount; // 新增订单总额字段 如果使用了优惠券 金额已经扣除
        //data.data.totalFlightPrice=totalPrice;
        data.data.numofAdult = numofAdult;
        data.data.numofChild = numofChild;
        var html = template("tpl_scenic_detail", data.data);
        $(".payment-type-list").append(html);
      }
      //酒+景详情tpl
      else if (type.id == 4) {
        var totalPrice = 0;

        var numofAdult = 0;
        var numofChild = 0;
        for (var i = 0; i < data.data.chargeDetails.length; i++) {
          if (data.data.chargeDetails[i].category == "ADULT") {
            numofAdult = data.data.chargeDetails[i].quantity;
            totalPrice += data.data.chargeDetails[i].totalAmount;
          } else if (data.data.chargeDetails[i].category == "CHILD") {
            numofChild = data.data.chargeDetails[i].quantity;
            totalPrice += data.data.chargeDetails[i].totalAmount;
          }
        }
        data.data.totalPrice = totalPrice;
        data.data.totalFlightPrice = totalPrice;

        data.data.numofAdult = numofAdult;
        data.data.numofChild = numofChild;

        var html = template("tpl_tour_detail", data.data);
        $(".payment-type-list").append(html);
      }
      else if (type.id == 6) {
        var numofAdult = 0;
        var numofChild = 0;
        var numofRoom = 0;
        for (var i = 0; i < data.data.chargeDetails.length; i++) {
          if (data.data.chargeDetails[i].category == "ADULT") {
            numofAdult += parseInt(data.data.chargeDetails[i].quantity)
          } else if (data.data.chargeDetails[i].category == "CHILD") {
            numofChild += parseInt(data.data.chargeDetails[i].quantity);
          }
        }
        data.data.numofAdult = numofAdult;
        data.data.numofChild = numofChild;
        data.data.numofRoom = data.data.hotelDetails.roomDetails.numRoom;
        var html = template("tpl_flighthoteltour_detail", data.data);
        $(".payment-type-list").append(html);
      }

      //获取详情价格
      var tplOrderPriee = template("order_pay_price", data.data);
      $("#order_pay_price").html(tplOrderPriee);

      //var price=$(html).find(".order-price i").html();
      //var coin_type=$(html).find(".coin_type").html();
      //$(".p-price .coin_type").html(coin_type);
      //$(".p-price .total_price").html(price);

      _init.bindPaymentTypeEvent();
    }

    /*页面初始化方法*/
    var _initPage = function () {

      //获取Url参数
      type = _bussinessType[vlm.getpara("type")]; //业务类型（1酒店，2机票，3景点，4酒+景，5机+景）
      bookingRefNo = vlm.getpara("bookingRefNo"); //订单code

      //获取订单详情数据
      _getOrderData(type, bookingRefNo, 3, function (data) {
        vlm.init();
        if (data.success) {
          _generateHtml(type, data);
        } else {
          jAlert("网络请求错误！");
        }
      });

      //绑定页面事件
      _init.expityDateInit();
    };
    /*接口*/
    return {
      InitPage: _initPage()
    }
  }();

  //国籍和发证国家和手机区号
  var oCountry1 = new CountryList({
    id: '#oCountry1',
    telCode: false
  });
  var oCountry2 = new CountryList({
    id: '#oCountry2',
    telCode: false
  });
  var oCountryCellAdd = new CountryList({
    id: '#oCountryCellAdd',
    telCode: true
  });

})()
