/**
 * Created by chaimeili  2016/04/20.
 * 支付成功（酒店，机票，酒+景，机+X）
 */
(function(){
    /*全局变量声明*/
    var type/*业务类型 */,
        bookingRefNo/*订单号 */;
    var payment=function(){
        /*支付模块（酒店，机票，景点，酒+景，机+酒）*/
        var _bussinessType= {
            "Hotle":{id: 1, name: "酒店", detailCode: "0013", payMentCode: "0012"},
            "Flight":{id: 2, name: "机票", detailCode: "3006", payMentCode: "3004"},
            "Scenic":{id: 3, name: "景点", detailCode: "0095", payMentCode: "0093"},
            "Tour":{id: 4, name: "酒+景", detailCode: "0095", payMentCode: "0203"},
            "FlightHotle":{id: 5, name: "机+酒", detailCode: "50100007", payMentCode: "50100005"}
        };
        /*页面初始化*/
        var _init={

            //页面事件绑定
            bindPaymentTypeEvent:function(){
                //选择支付方式
                $(".p-pay li").on("click",function(){

                    paymentMode=$(this).attr("data-paymentmode") //获取选择支付类型
                    cardType=$(this).attr("data-cardtype")//获取选择卡类型类型

                    //如果在线支付（银联Or支付宝）
                    if(cardType=="undefined" || cardType==undefined){
                        _paymentEvent();
                    }else{
                        $(".paymentype-session").hide();
                        $(".credit-session").show();
                    }
                })
                //回退按钮
                $(".credit-session .go-back").on("click",function(){
                    $(".paymentype-session").show();
                    $(".credit-session").hide();

                })
                //800电话按钮
                $(".tel-icon").on("click", function () {
                    $(".jpop_box_tic").show();
                })
                $('.jpop_box_tic span,.jpop_box_tic a').click(function(){
                    $('.jpop_box_tic').hide();
                })

                //支付按钮
                $(".p-but").on("click",function(){
                    _paymentEvent();
                })
            }
        }
        /*获取订单详情数据*/
        var _getOrderData=function(bussinessType,bookingRefNo,foreEndType,callback){
            var Parameters;
            //Todo 酒店特殊处理（目前为不影响酒店支付流程，暂时单独处理，后期等后台接口重构去掉）
            if(bussinessType.id==1){
                Parameters={
                    "CultureName":"en-US",
                    "BookingReferenceNo": bookingRefNo
                }
            }
            else{
                Parameters={
                    "BookingRefNo": bookingRefNo
                }
            }
            var Parameters={
                "Parameters": Parameters,
                "ForeEndType":foreEndType,
                "Code": bussinessType.detailCode
            }
            console.log(JSON.stringify(Parameters));
            vlm.loadJson("", JSON.stringify(Parameters),callback);
        };
        /*支付Modle实体*/
        var _get_modle=function(){
            return {
                "cardAddressPostalCode":$(".cardAddressPostalCode").val(),
                "bankName":$(".bankName").val(),
                "countryNumber":"CN",
                "cardAddressCity":$(".cardAddressCity").val(),
                "cardHolderName":$(".cardHolderName").val(),
                "cardExpiryDate":"2018-12-31",
                "cardNumber":$(".cardNumber").val(),
                "MobilePhone":$(".MobilePhone").val(),
                "cardType":cardType,
                "cardSecurityCode":$(".cardSecurityCode").val(),
                "cardCountryCode":"CN",
                "cardAddressCountryCode":$(".CardAddressCountryCode").val(),
                "cardAddress":$(".cardAddress").val()
            }
        };
        /*支付方法  paymentType(支付宝，信用卡)，bussinessType（机票，酒店....）*/
        var _paymentEvent=function() {
            var parameters
            //Todo 酒店支付特殊处理（目前为不影响酒店支付流程，暂时单独处理，后期等后台接口重构去掉）
            if (type.id == 1){
                //验证modle；
                _check_modle();
                var json=JSON.parse(localStorage.getItem('user_order_storage12345'));
                var model=_get_modle();
                var guestNameList = [];
                for (var i = 0; i <= myData.guestName.length - 1; i++) {
                    var guestInfo = {};
                    guestInfo.guestFirstName = json.guestName[i].GuestFirstName;
                    guestInfo.guestLastName = json.guestName[i].GuestLastName;
                    guestNameList.push(guestInfo);
                }
                //支付模式为信用卡
                if (paymentMode == "CreditCard" && (bookingRefNo == null || bookingRefNo==undefined )) {
                    var flag= _check_modle();
                    if(!flag){
                        return;
                    }
                    Parameters = {
                        "availability": true,
                        "bankName": json.BankName,
                        "browserType": "",
                        "cardBillingAddress": "werty",
                        "cardHolderName": json.CardHolderName,
                        "cardIssuanceCountry": json.CardIssuanceCountry,
                        "cardSecurityCode":  model.cardSecurityCode,
                        "cashVoucherDetails": "",
                        "checkInDate": json.dateInfo.CheckInDate + "T00:00:00",
                        "checkOutDate": json.dateInfo.CheckOutDate + "T00:00:00",
                        "cookieID": 1,
                        "creditCardExpiryDate": model.cardExpiryDate,
                        "creditCardNumber":  model.cardNumber,
                        "creditCardType": cardType,
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
                        "numOfChild": 0,
                        "numOfGuest": json.NumOfRoom,
                        "numOfRoom": json.NumOfRoom,
                        "residenceCode": "",
                        "roomCode": json.roomCode,
                        "roomName": json.roomName,
                        "roomTypeCode": json.RoomTypeCode,
                        "roomTypeName": json.RoomTypeName,
                        "sessionID": "",
                        "totalPrice": json.totalPriceCNY,
                        "trck": ""
                    }
                }
                else{
                    Parameters = {
                        "bankName": json.BankName,
                        "bookingReferenceNo":bookingRefNo,
                        "cardBillingAddress":"",
                        "cardHolderName": json.CardHolderName,
                        "cardIssuanceCountry": json.CardIssuanceCountry,
                        "cardSecurityCode": model.cardSecurityCode,
                        "cashVoucherDetails":"",
                        "creditCardExpiryDate": model.cardExpiryDate,
                        "creditCardNumber":  model.cardNumber,
                        "creditCardType": cardType,
                        "paymentGatewayID":"0"
                    }
                }
                var param = {
                    "Code": type.payMentCode,
                    "Parameters": Parameters,
                    "ForeEndType": 3
                }
            }
            else {
                //支付模式为在线支付
                if (paymentMode == "CreditCard") {
                    var flag= _check_modle();
                    if(!flag){
                        return;
                    }
                    parameters = {
                        "cardInfo": _get_modle(),
                        "bookingRefNo": bookingRefNo,
                        "currencyCode": "CNY",
                        "totalPrice":  $(".total_price").html(),
                        "paymentMode": paymentMode
                    }
                } else {
                    parameters = {
                        "cardInfo": {},
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
            vlm.loadJson("", JSON.stringify(param), function(data){
                if (data.success) {
                    location.href=data.url;
                }
                else{
                    alert(data.message);
                }
            });

        };
        /*生成订单详情HTML片段*/
        var _generateHtml=function(type,data){
            //机+酒详情tpl
            if(type.id==5){
                var html = template("tpl_flighthotel_detail", data.data);
                $(".p-home").append(html);
            }
            //酒店详情tpl
            else if(type.id==1){
                data.data.totalPrice=data.data.totalFlightPrice;
                var html = template("tpl_hotel_detail", data.data);
                $(".p-home").append(html);
            }
            //机票详情tpl
            else if(type.id==2){
                data.data.totalPrice=data.data.totalFlightPrice;
                var html = template("tpl_flight_detail", data.data);
                $(".p-home").append(html);
            }
            //景点详情tpl
            else if(type.id==3){
                var totalPrice=0;
                for (var i = 0;i<data.data.chargeDetails.length;i++){
                    totalPrice+=data.data.chargeDetails[i].totalAmount;
                }
                data.data.totalPrice=totalPrice;
                var html = template("tpl_scenic_detail", data.data);
                $(".p-home").append(html);
            }
            //酒+景详情tpl
            else if(type.id==4){
                var totalPrice=0;
                for (var i = 0;i<data.data.chargeDetails.length;i++){
                    totalPrice+=data.data.chargeDetails[i].totalAmount;
                }
                data.data.totalPrice=totalPrice;
                var html = template("tpl_tour_detail", data.data);
                $(".p-home").append(html);
            }

            //获取详情价格
            var price=$(html).find(".order-price i").html();
            $(".total_price").html(price)
        }

        /*页面初始化方法*/
        var _initPage=function(){

            //获取Url参数
            type=_bussinessType[vlm.getpara("type")];//业务类型（1酒店，2机票，3景点，4酒+景，5机+景）
            bookingRefNo=vlm.getpara("bookingRefNo");//订单code

            //绑定页面事件
            _init.bindPaymentTypeEvent();

            //获取订单详情数据
            _getOrderData(type,bookingRefNo,3,function(data){
                vlm.init();
                if (data.success) {
                    _generateHtml(type,data);
                }
                else{
                    jAlert("网络请求错误！");
                }
            });
        };
        /*接口*/
        return{
            InitPage:_initPage()
        }
    }()

})()

