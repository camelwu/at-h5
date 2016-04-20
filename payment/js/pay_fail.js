/**
 * Created by chaimeili  2016/04/20.
 * ֧���ɹ����Ƶ꣬��Ʊ����+������+X��
 */
(function(){
    /*ȫ�ֱ�������*/
    var type/*ҵ������ */,
        bookingRefNo/*������ */;
    var payment=function(){
        /*֧��ģ�飨�Ƶ꣬��Ʊ�����㣬��+������+�ƣ�*/
        var _bussinessType= {
            "Hotle":{id: 1, name: "�Ƶ�", detailCode: "0013", payMentCode: "0012"},
            "Flight":{id: 2, name: "��Ʊ", detailCode: "3006", payMentCode: "3004"},
            "Scenic":{id: 3, name: "����", detailCode: "0095", payMentCode: "0093"},
            "Tour":{id: 4, name: "��+��", detailCode: "0095", payMentCode: "0203"},
            "FlightHotle":{id: 5, name: "��+��", detailCode: "50100007", payMentCode: "50100005"}
        };
        /*ҳ���ʼ��*/
        var _init={

            //ҳ���¼���
            bindPaymentTypeEvent:function(){
                //ѡ��֧����ʽ
                $(".p-pay li").on("click",function(){

                    paymentMode=$(this).attr("data-paymentmode") //��ȡѡ��֧������
                    cardType=$(this).attr("data-cardtype")//��ȡѡ����������

                    //�������֧��������Or֧������
                    if(cardType=="undefined" || cardType==undefined){
                        _paymentEvent();
                    }else{
                        $(".paymentype-session").hide();
                        $(".credit-session").show();
                    }
                })
                //���˰�ť
                $(".credit-session .go-back").on("click",function(){
                    $(".paymentype-session").show();
                    $(".credit-session").hide();

                })
                //800�绰��ť
                $(".tel-icon").on("click", function () {
                    $(".jpop_box_tic").show();
                })
                $('.jpop_box_tic span,.jpop_box_tic a').click(function(){
                    $('.jpop_box_tic').hide();
                })

                //֧����ť
                $(".p-but").on("click",function(){
                    _paymentEvent();
                })
            }
        }
        /*��ȡ������������*/
        var _getOrderData=function(bussinessType,bookingRefNo,foreEndType,callback){
            var Parameters;
            //Todo �Ƶ����⴦��ĿǰΪ��Ӱ��Ƶ�֧�����̣���ʱ�����������ڵȺ�̨�ӿ��ع�ȥ����
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
        /*֧��Modleʵ��*/
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
        /*֧������  paymentType(֧���������ÿ�)��bussinessType����Ʊ���Ƶ�....��*/
        var _paymentEvent=function() {
            var parameters
            //Todo �Ƶ�֧�����⴦��ĿǰΪ��Ӱ��Ƶ�֧�����̣���ʱ�����������ڵȺ�̨�ӿ��ع�ȥ����
            if (type.id == 1){
                //��֤modle��
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
                //֧��ģʽΪ���ÿ�
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
                //֧��ģʽΪ����֧��
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

            //$.jAlert.confirm("֧�����ǰ���벻Ҫ�رմ�֧����֤���� </br> ֧����ɺ��������֧��������������İ�ť��","����֧����ʾ",null,"֧�����","֧����������");
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
        /*���ɶ�������HTMLƬ��*/
        var _generateHtml=function(type,data){
            //��+������tpl
            if(type.id==5){
                var html = template("tpl_flighthotel_detail", data.data);
                $(".p-home").append(html);
            }
            //�Ƶ�����tpl
            else if(type.id==1){
                data.data.totalPrice=data.data.totalFlightPrice;
                var html = template("tpl_hotel_detail", data.data);
                $(".p-home").append(html);
            }
            //��Ʊ����tpl
            else if(type.id==2){
                data.data.totalPrice=data.data.totalFlightPrice;
                var html = template("tpl_flight_detail", data.data);
                $(".p-home").append(html);
            }
            //��������tpl
            else if(type.id==3){
                var totalPrice=0;
                for (var i = 0;i<data.data.chargeDetails.length;i++){
                    totalPrice+=data.data.chargeDetails[i].totalAmount;
                }
                data.data.totalPrice=totalPrice;
                var html = template("tpl_scenic_detail", data.data);
                $(".p-home").append(html);
            }
            //��+������tpl
            else if(type.id==4){
                var totalPrice=0;
                for (var i = 0;i<data.data.chargeDetails.length;i++){
                    totalPrice+=data.data.chargeDetails[i].totalAmount;
                }
                data.data.totalPrice=totalPrice;
                var html = template("tpl_tour_detail", data.data);
                $(".p-home").append(html);
            }

            //��ȡ����۸�
            var price=$(html).find(".order-price i").html();
            $(".total_price").html(price)
        }

        /*ҳ���ʼ������*/
        var _initPage=function(){

            //��ȡUrl����
            type=_bussinessType[vlm.getpara("type")];//ҵ�����ͣ�1�Ƶ꣬2��Ʊ��3���㣬4��+����5��+����
            bookingRefNo=vlm.getpara("bookingRefNo");//����code

            //��ҳ���¼�
            _init.bindPaymentTypeEvent();

            //��ȡ������������
            _getOrderData(type,bookingRefNo,3,function(data){
                vlm.init();
                if (data.success) {
                    _generateHtml(type,data);
                }
                else{
                    jAlert("�����������");
                }
            });
        };
        /*�ӿ�*/
        return{
            InitPage:_initPage()
        }
    }()

})()

