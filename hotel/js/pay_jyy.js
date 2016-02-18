/**
 * Created by changlv on 2015/12/14.
 */
var array = [];
function init(){
    var ul = document.getElementById("p-ul1");
    array = ul.getElementsByTagName("b");
}
/*
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
*/
//lsf 刘少飞的js

var lsf_myweb={
    "getbyid":function(id){
        return document.getElementById(id);
    },
    "getbytag":function(obj,tag){
        return obj.getElementsByTagName(tag);
    },
    "getbyclass":function(obj,sClass){
        if(obj.getElementsByClassName){
            return obj.getElementsByClassName(sClass);
        }else{
            var aResult=[];
            var aEle=obj.getElementsByTagName('*');
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            for(var i=0;i<aEle.length;i++){
                if(aEle[i].className.search(reg)!=-1){
                    aResult.push(aEle[i]);
                }
            }
            return aResult;
        }
    },
    "bind":function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
    },
    "stopPropagation":function(event){
        var oEvent=ev||event;
        oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    },
    "addClass":function(obj,sClass){
        if(obj.className){
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            if(obj.className.search(reg)==-1){
                obj.className+=' '+sClass;
            }
        }else{
            obj.className=sClass;
        }
    },
    "removeClass":function(obj,sClass){
        if(obj.className){
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            if(obj.className.search(reg)!=-1){
                obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
                if(!obj.className){
                    obj.removeAttribute('class');
                }
            }
        }
    },
    "styleChange":function(id,mytext){
        var oInp=document.getElementById(id);
        oInp.onfocus=function(){
            if(this.value==mytext){
                this.value='';
                this.style.color='#484848';
            }
        };
        oInp.onblur=function(){
            if(!this.value){
                this.value=mytext;
                this.style.color='#d1d1d1';
            }
        };
    }
};
;(function(){
    //预加载的图片
    $(window).load(function () {
        $("#status").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    });
    //从上一页得到的数据
    var myData=JSON.parse(localStorage.getItem('user_order_storage12345'));
    console.log(myData);
    console.log('上面是从localStorage上面得到的数据');
    //支付类型：1-Visa, 20-MasterCard(万事达卡), 21-Paypal
    var myPayType=0;

    //输入框
    lsf_myweb.styleChange('jp_bank','输入银行卡号');
    lsf_myweb.styleChange('jp_guest_name','姓名');
    lsf_myweb.styleChange('jp_limit_time','月/年，如：09/12');
    lsf_myweb.styleChange('jp_safe_code','签名栏末尾最后3位');

    //返回按钮
    var jp_back=document.getElementById('jp_back');
    lsf_myweb.bind(jp_back,'click',function(){
        window.history.go(-1);
    });
    var jp_price_sum=document.getElementById('jp_price_sum');
    var jp_hotel_name=document.getElementById('jp_hotel_name');
    var jp_date=document.getElementById('jp_date');
    var jp_house_type=document.getElementById('jp_house_type');
    var oBtn=document.getElementById('p-but');
    var jp_bank=document.getElementById('jp_bank');
    var jp_guest_name=document.getElementById('jp_guest_name');
    var jp_limit_time=document.getElementById('jp_limit_time');
    var jp_safe_code=document.getElementById('jp_safe_code');
    var jpBankName=document.getElementById('jp_bank_name');
    var jpBankCountry=document.getElementById('jp_bank_country');
    if(myData.paymentModeID=='1'){
        jp_price_sum.innerHTML='订单总价：￥'+myData.calcuTotalPriceCNY;
    }else{
        jp_price_sum.innerHTML='担保：SGD'+myData.calcuTotalPrice+'<span>约￥'+myData.calcuTotalPriceCNY+'</span>';
    }
    jp_hotel_name.innerHTML=myData.HotelGenInfo.hotelName;
    jp_date.innerHTML=myData.dateInfo.CheckInDate.split('-')[0]+'年'+myData.dateInfo.CheckInDate.split('-')[1]+'月'+myData.dateInfo.CheckInDate.split('-')[2]+'日'+' - '+myData.dateInfo.CheckOutDate.split('-')[0]+'年'+myData.dateInfo.CheckOutDate.split('-')[1]+'月'+myData.dateInfo.CheckOutDate.split('-')[2]+'日'+' 共'+myData.dateInfo.totalNight+'晚（当地时间为准）';
    jp_house_type.innerHTML='房型：'+myData.RoomTypeName+' 房间数：'+myData.NumOfRoom+'间';

    //付款方式点击事件
    function payType(id){
        var oBox=document.getElementById(id);
        var oBoxChildren=oBox.children;
        var aB=oBox.getElementsByTagName('b');
        for(var i=0;i<oBoxChildren.length;i++){
            lsf_myweb.bind(oBoxChildren[i],'click',function(){
                var oB=this.getElementsByTagName('b')[0];
                var oSpan=this.getElementsByTagName('span')[0];
                for(var i=0;i<aB.length;i++){
                    aB[i].className='p-icon2';
                }
                oB.className='p-icon1';
                if(oSpan.innerHTML=='维萨信用卡'){
                    myPayType=1;
                }else if(oSpan.innerHTML=='万事达卡'){
                    myPayType=20;
                }
                //alert(myPayType)
                myData.CreditCardType=myPayType;
            });
        }
    }
    payType('p-ul1');
    lsf_myweb.bind(oBtn,'click',function(){

        if(myPayType==0){
            alert('请选择支付类型');
            return;
        }
        //信用卡验证
        if(jp_bank.value=='输入银行卡号'){
            alert('请输入信用卡卡号');
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(jp_bank.value)){
                alert('信用卡卡号必须是数字');
                return;
            }else{
                myData.CreditCardNumber=jp_bank.value;
            }
        }
        //姓名验证
        if(jp_guest_name.value=='姓名'){
            alert('请输入持卡人姓名');
            return;
        }else{
            myData.CardHolderName=jp_guest_name.value;
        }
        //有效期验证
        if(jp_limit_time.value=='月/年，如：09/12'){
            alert('请输入有效期');
            return;
        }else{
            myData.CreditCardExpiryDate=jp_limit_time.value;
        }
        //安全码验证
        if(jp_safe_code.value=='签名栏末尾最后3位'){
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

        myData.BankName=jpBankName.innerHTML;
        myData.CardIssuanceCountry=jp_bank_country.innerHTML;
        localStorage.setItem('user_order_storage12345',JSON.stringify(myData));
        console.log(myData);
        console.log('以上是更新的localStorage的数据');
        //window.location.href='trade_details.html';

        //  交互部分
        function M(json){
            console.log(json);
            var data={
                "Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\""+json.HotelGenInfo.hotelCode+"\",\"RoomCode\":"+json.roomCode+",\"HotelName\":\""+json.HotelGenInfo.hotelName+"\",   \"RoomTypeCode\": "+json.RoomTypeCode+", \"RoomTypeName\":\""+json.RoomTypeName+"\",\"RoomName\": \""+json.roomName+"\",\"CheckInDate\":\""+json.dateInfo.CheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.dateInfo.CheckOutDate+"T00:00:00\",\"NumOfRoom\":"+json.NumOfRoom+",\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\",\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\""+json.GuestContactNo+"\",\"GuestEmail\":\"thomas.gunawan@asiatravel.com\",\"TotalPrice\":120,\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0,\"CardHolderName\":\""+json.CardHolderName+"\",\"CreditCardNumber\":\""+json.CreditCardNumber+"\",\"CreditCardType\":"+json.CreditCardType+",\"CreditCardExpiryDate\":\""+json.CreditCardExpiryDate+"T00:00:00\",\"CardSecurityCode\":\""+json.CardSecurityCode+"\",\"BankName\":\""+json.BankName+"\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"SG\",\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\""+json.CardIssuanceCountry+"\",\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\",\"GuestNameList\":[{\"GuestLastName\":\"yu\",\"GuestFirstName\":\"xiang\"}]}",
                "ForeEndType": 3,
                "Code": "0012"
            };
            console.log(data);
            /*
            var data={
                "Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\"8016\",\"RoomCode\":56625,\"HotelName\":\"Hotel Grand Chancellor (Hotel Grand Chancellor)\",   \"RoomTypeCode\": 31647, \"RoomTypeName\":\"Standard (Podium Block)\",\"RoomName\": \"高级房\",\"CheckInDate\":\"2016-01-23T00:00:00\",\"CheckOutDate\":\"2016-01-24T00:00:00\",\"NumOfRoom\":1,\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\",\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\"12345\",\"GuestEmail\":\"thomas.gunawan@asiatravel.com\",\"TotalPrice\":120,\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0,\"CardHolderName\":\"Test\",\"CreditCardNumber\":\"4544152000000004\",\"CreditCardType\":21,\"CreditCardExpiryDate\":\"2020-01-01T00:00:00\",\"CardSecurityCode\":\"123\",\"BankName\":\"CitiBank\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"SG\",\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\"SG\",\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\"}",
                "ForeEndType": 3,
                "Code": "0012"
            };
            */
            var payment=new paymentObj(data,mycallback);
            payment.handlePayment();
            //return vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
        }
        //数据展示部分
        function V(data){
            if(data.success){
                window.location.href='trade_details.html';
            }else{
                alert(data.message);
            }
        }
        M(myData);
        function mycallback(str){
            console.log(str);
            var data_json=eval('('+str+')');
            V(data_json);
        }
    });
})();