localStorage.setItem('flight_order_storage12345',JSON.stringify({BookingID:11111111}));
var myData=JSON.parse(localStorage.getItem('flight_order_storage12345'));
console.log(myData);
console.log('上面是从localStorage上面得到的数据');

console.log(myData);

var userFlightInformation=localStorage.getItem('orderResultInfo');
var tpl=template("payDetail",JSON.parse(userFlightInformation).data);
console.log(tpl);
$("#payDetail").html(tpl);


var ticketPayDetail = {

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

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

    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var dataObj =
        {
            Parameters: JSON.stringify(data),
            ForeEndType: ForeEndType,
            Code: Code
        };
        var c = new vcm();
        c.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },

    //timeCount:function(){
    //    var oSpan=document.getElementById('cou-down');
    //    var n=1800, m, s;
    //    tick();
    //    var timer=setInterval(tick,1000);
    //    function tick(){
    //        n--;
    //        m=parseInt(n/60)<10?'0'+parseInt(n/60):parseInt(n/60);
    //        s=n%60<10?'0'+n%60:n%60;
    //        oSpan.innerHTML=m+'分钟'+s+'秒';
    //        if(n<0)
    //        {
    //            clearInterval(timer);
    //            oSpan.innerHTML='结束';
    //        }
    //    }
    //},

    sliderOption:function(){
        $(".custom-select").each(function() {
            var classes = $(this).attr("class"),
                id = $(this).attr("id"),
                name = $(this).attr("name");
            var template = '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
            template += '<div class="custom-options">';
            $(this).find("option").each(function() {
                template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
            template += '</div></div>';

            $(this).wrap('<div class="custom-select-wrapper"></div>');
            $(this).hide();
            $(this).after(template);
        });
        $(".custom-option:first-of-type").hover(function() {
            $(this).parents(".custom-options").addClass("option-hover");

        }, function() {
            $(this).parents(".custom-options").removeClass("option-hover");
        });
        $(".custom-select-trigger").on("click", function() {
            $(this).parents(".custom-select").toggleClass("opened");
        });
        $(".custom-option").on("click", function() {
            $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
            $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
            $(this).addClass("selection");
            $(this).parents(".custom-select").removeClass("opened");
            $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        });
    },
    cardAction:function(){
        var oCre=document.getElementById('credit-card');
        var arr=[];
        arr=oCre.getElementsByTagName('b');
        for(var i=0;i<arr.length; i++)
        {
            arr[i].onclick=function(){
                var obj=window.event.srcElement;

                if(obj.className == 'p-icon2')
                {
                    for(var i=0;i<arr.length; i++)
                    {
                        arr[i].className='p-icon2';
                    }
                    obj.className='p-icon1';
                }
                else
                {
                    obj.className='p-icon2';
                }
            }
        }
    },

    resultFunction:function(arg){
        console.log(arg)
        document.location.href = 'pay_fail.html';
    },

    addEvent:function(){
        var payButton = document.querySelector('.air-ticket-pay-btn'),that = ticketPayDetail;
        this.addHandler(payButton,'click', function(){
            $.alerts.confirm("支付完成前，请不要关闭此支付验证窗口 </br> 支付完成后，请根据你支付的情况点击下面的按钮。","网上支付提示",callback,"支付完成","支付出现问题");
            M(myData);


        });
    },
    init:function(){
        this.addEvent();
        //this.timeCount();
        this.sliderOption();
        this.cardAction();
    }
};
//
function callback(){


};




//  交互部分
function M(json){
    console.log(json);
    var creditName = document.querySelector('.credit-det-cont');
    console.log(creditName);
    var cardInfo=getCardInfo();
    console.log(cardInfo);
    var data= {
        //"Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\""+json.HotelGenInfo.hotelCode+"\",\"RoomCode\":"+json.roomCode+",\"HotelName\":\""+json.HotelGenInfo.hotelName+"\",   \"RoomTypeCode\": "+json.RoomTypeCode+", \"RoomTypeName\":\""+json.RoomTypeName+"\",\"RoomName\": \""+json.roomName+"\",\"CheckInDate\":\""+json.dateInfo.CheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.dateInfo.CheckOutDate+"T00:00:00\",\"NumOfRoom\":"+json.NumOfRoom+",\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\",\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\""+json.GuestContactNo+"\",\"GuestEmail\":\"thomas.gunawan@asiatravel.com\",\"TotalPrice\":120,\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0,\"CardHolderName\":\""+json.CardHolderName+"\",\"CreditCardNumber\":\""+json.CreditCardNumber+"\",\"CreditCardType\":"+json.CreditCardType+",\"CreditCardExpiryDate\":\""+json.CreditCardExpiryDate+"T00:00:00\",\"CardSecurityCode\":\""+json.CardSecurityCode+"\",\"BankName\":\""+json.BankName+"\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"SG\",\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\""+json.CardIssuanceCountry+"\",\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\",\"GuestNameList\":[{\"GuestLastName\":\"yu\",\"GuestFirstName\":\"xiang\"}]}",
        //"Parameters": {"CardInfo": cardInfo, "BookingRefNo":"SGSINFT0012951"},
        "Parameters": {
            "CardInfo": {
                "CardType": "Visa",
                "CardHolderName": $(".CardHolderName").val(),
                "BankName": $(".BankName").val(),
                "CardCountryCode": $(".CardCountryCode").attr("data-code"),
                "CardNumber":  $(".CardNumber").val(),
                "CardSecurityCode": $(".CardSecurityCode").val(),
                "CardExpiryDate":"2018-12-31",
                "CardContactNumber": $(".CardContactNumber2").val()+$(".CardContactNumber2").val(),
                "CardAddress": $(".CardAddress").val(),
                "CardAddressPostalCode": "1234",
                "CardAddressCity":"北京",
                "CardAddressCountryCode":  $(".CardAddressCountryCode").attr("data-code")
            },
            "BookingRefNo":"CNBJSFT0001557",
            "CurrencyCode":"CNY",
            "TotalFlightPrice":"3190.00",
            "PaymentMode":"CreditCard"
        },
        "ForeEndType": 3,
        "Code": "3004"
    };
    console.log(data);
    var payment=new paymentObj(data,mycallback);
    payment.handlePayment();
    //return vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
}
//数据展示部分
function V(d){
    if(d.success){
        console.log(d.data.redirectURL);
        var url=d.data.redirectURL;
        window.open(url);
    }else{
        alert(d.message);
    }
}
function mycallback(str){
    console.log(str);
    var data_json=eval('('+str+')');
    V(data_json);
}
ticketPayDetail.init();

$(".passenger-detail").on("click",function(){
    $(".passenger").toggle();
})

function getCardInfo(){
    //"Parameters": {"CardInfo": { "CardType": "Visa","CardHolderName": "sss","BankName": "sds","CardCountryCode": "SG","CardNumber": "4544152000000004","CardSecurityCode": "123","CardExpiryDate":"2018-12-31","CardContactNumber": "45345","CardAddress": "SDSS","CardAddressPostalCode": "1234", "CardAddressCountryCode": "BKK"},"BookingRefNo":"SGSINFT0012951"},
    var carInfo={
        "CardType": "Visa",
        "CardHolderName": $(".CardHolderName").val(),
        "BankName": $(".BankName").val(),
        "CardCountryCode": $(".CardCountryCode").attr("data-code"),
        "CardNumber":  $(".CardNumber").val(),
        "CardSecurityCode": $(".CardSecurityCode").val(),
        "CardExpiryDate":"2018-12-31",
        "CardContactNumber": $(".CardContactNumber2").val()+$(".CardContactNumber2").val(),
        "CardAddress": $(".CardAddress").val(),
        "CardAddressPostalCode": "1234",
        "CardAddressCountryCode":  $(".CardAddressCountryCode").attr("data-code"),
    }
    return carInfo;
}