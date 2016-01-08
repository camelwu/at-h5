/**
 * Created by changlv on 2015/12/14.
 */
var array = [];
function init(){
    var ul = document.getElementById("p-ul1");
    array = ul.getElementsByTagName("b");
}
function selectThis(){
    var obj = window.event.srcElement;
    var cname = obj.className;
    if(cname == "p-icon2"){
        for(var j=0;j<array.length;j++){
            if(array[j].className == "p-icon1"){
                array[j].className = "p-icon2";
            }
        }
        obj.className = "p-icon1";
    }else{
        obj.className = "p-icon2";
    }
}

//lsf 刘少飞的js
function addBind(obj,sEv,fn){
    return obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
}
;(function(){
    //返回按钮
    var jp_back=document.getElementById('jp_back');
    addBind(jp_back,'click',function(){
        window.history.go(-1);
    });

    var myData=JSON.parse(localStorage.getItem('user_order_storage12345'));
    console.log(myData);
    var jp_price_sum=document.getElementById('jp_price_sum');
    var jp_hotel_name=document.getElementById('jp_hotel_name');
    var jp_date=document.getElementById('jp_date');
    var jp_house_type=document.getElementById('jp_house_type');
    var oBtn=document.getElementById('p-but');
    var jp_bank=document.getElementById('jp_bank');
    var jp_guest_name=document.getElementById('jp_guest_name');
    var jp_limit_time=document.getElementById('jp_limit_time');
    var jp_safe_code=document.getElementById('jp_safe_code');
    var jp_bank_name=document.getElementById('jp_bank_name');
    var jp_bank_country=document.getElementById('jp_bank_country');
    jp_price_sum.innerHTML='订单总价：SGD'+myData.TotalPriceCNY;
    jp_hotel_name.innerHTML=myData.HotelGenInfo.HotelName;
    jp_date.innerHTML=myData.dateInfo.CheckInDate.split('-')[0]+'年'+myData.dateInfo.CheckInDate.split('-')[1]+'月'+myData.dateInfo.CheckInDate.split('-')[2]+'日'+' - '+myData.dateInfo.CheckOutDate.split('-')[0]+'年'+myData.dateInfo.CheckOutDate.split('-')[1]+'月'+myData.dateInfo.CheckOutDate.split('-')[2]+'日'+' 共'+myData.dateInfo.totalNight+'晚（当地时间为准）';
    jp_house_type.innerHTML='房型：'+myData.RoomTypeName+' 房间数：'+myData.NumOfRoom+'间';
    addBind(oBtn,'click',function(){
        //信用卡验证
        if(!jp_bank.value){
            alert('请输入信用卡卡号');
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(jp_bank.value)){
                alert('信用卡卡号必须是数字');
                return;
            }else{
                if(jp_bank.value.length==16){
                    myData.CreditCardNumber=jp_bank.value;
                }else{
                    alert('信用卡卡号位数不对');
                    return;
                }
            }
        }
        //姓名验证
        if(!jp_guest_name.value){
            alert('请输入持卡人姓名');
            return;
        }else{
            myData.CardHolderName=jp_guest_name.value;
        }
        //有效期验证
        if(!jp_limit_time.value){
            alert('请输入有效期');
            return;
        }else{
            myData.CreditCardExpiryDate=jp_limit_time.value;
        }
        //安全码验证
        if(!jp_safe_code.value){
            alert('请输入信用卡安全码');
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(jp_safe_code.value)){
                alert('信用卡安全码必须是数字');
                return;
            }else{
                if(jp_safe_code.value.length==3){
                    myData.CardSecurityCode=jp_safe_code.value;
                }else{
                    alert('信用卡安全码必须是3位数字');
                    return;
                }
            }
        }
        myData.BankName=jp_bank_name.value;
        myData.CardIssuanceCountry=jp_bank_country.value;
        localStorage.setItem('user_order_storage12345',JSON.stringify(myData));
        //window.location.href='trade_details.html';

        /*//  交互部分
        function M(json){
            var c=new vcm();
            var data={
                "Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\"8016\",\"RoomCode\":56625,\"CheckInDate\":\"2016-01-25T00:00:00\",\"CheckOutDate\":\"2016-01-26T00:00:00\",\"NumOfRoom\":1,\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\",\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\"12345\",\"GuestEmail\":\"thomas.gunawan@asiatravel.com\",\"TotalPrice\":120,\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0,\"CardHolderName\":\"Test\",\"CreditCardNumber\":\"4544152000000004\",\"CreditCardType\":21,\"CreditCardExpiryDate\":\"2020-01-01T00:00:00\",\"CardSecurityCode\":\"123\",\"BankName\":\"CitiBank\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"SG\",\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\"SG\",\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\"}",
                "ForeEndType": 3,
                "Code": "0012"
            };
            return c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
        }
        //数据展示部分
        function V(){

        }
        M(myData);
        function mycallback(str){
            var data_json=eval('('+str+')');
            console.log(data_json);
        }*/
        var c=new vcm();
        var data={
            "Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\"8016\",\"RoomCode\":56625,\"CheckInDate\":\"2016-01-25T00:00:00\",\"CheckOutDate\":\"2016-01-26T00:00:00\",\"NumOfRoom\":1,\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\",\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\"12345\",\"GuestEmail\":\"thomas.gunawan@asiatravel.com\",\"TotalPrice\":120,\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0,\"CardHolderName\":\"Test\",\"CreditCardNumber\":\"4544152000000004\",\"CreditCardType\":21,\"CreditCardExpiryDate\":\"2020-01-01T00:00:00\",\"CardSecurityCode\":\"123\",\"BankName\":\"CitiBank\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"SG\",\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\"SG\",\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\"}",
            "ForeEndType": 3,
            "Code": "0012"
        }
        c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
        function mycallback(str){
            alert(str);
        };
    });
})();