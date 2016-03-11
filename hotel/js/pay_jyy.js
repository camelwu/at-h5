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
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

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
        $("#status-h").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    });
    //从上一页得到的数据
    var myData=JSON.parse(localStorage.getItem('user_order_storage12345'));
    console.log(myData);
    console.log('上面是从localStorage上面得到的数据');
    //支付类型：1-Visa, 20-MasterCard(万事达卡), 21-Paypal
    var myPayType=1;

    //输入框
    lsf_myweb.styleChange('jp_bank','输入银行卡号');
    lsf_myweb.styleChange('jp_guest_name','姓名');
    lsf_myweb.styleChange('jp_limit_time','月/年，如：09/12');
    lsf_myweb.styleChange('jp_safe_code','签名栏末尾最后3位');
    lsf_myweb.styleChange('jp_bank_name','发卡银行');
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
        else{
            myData.CreditCardType=myPayType;
        }
        //信用卡验证
        if(jp_bank.value=='输入银行卡号'){
            $.alerts.alert('请输入信用卡卡号',null,"确定");
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(jp_bank.value)){
                $.alerts.alert('信用卡卡号必须是数字',null,"确定");
                return;
            }else{
                myData.CreditCardNumber=jp_bank.value;
            }
        }
        //姓名验证
        if(jp_guest_name.value=='姓名'){
            $.alerts.alert('请输入持卡人姓名');
            return;
        }else{
            if(strlen(jp_guest_name.value)>20)
            {
                $.alerts.alert('超出最大字符!',null,"确定");
                return;
            }
            myData.CardHolderName=jp_guest_name.value;
        }

        //发卡银行验证
        if(jpBankName.value=='发卡银行'){
            $.alerts.alert('请输入发卡银行',null,"确定");
            return;
        }else{
            myData.BankName=jpBankName.value;
        }
        //有效期验证
        if(jp_limit_time.value=='月/年，如：09/12'){
            $.alerts.alert('请输入有效期',null,"确定");
            return;
        }else{
            myData.CreditCardExpiryDate=jp_limit_time.value;
        }
        //安全码验证
        if(jp_safe_code.value=='签名栏末尾最后3位'){
            $.alerts.alert('请输入信用卡安全码',null,"确定");
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(jp_safe_code.value)){
                $.alerts.alert('信用卡安全码必须是数字',null,"确定");
                return;
            }else{
                if(jp_safe_code.value.length==3){
                    myData.CardSecurityCode=jp_safe_code.value;
                }else{
                    $.alerts.alert('信用卡安全码必须是3位数字',null,"确定");
                    return;
                }
            }
        }
        myData.CardIssuanceCountry=$("#jp_bank_country").attr("data-code");
        localStorage.setItem('user_order_storage12345',JSON.stringify(myData));
        console.log(myData);
        console.log('以上是更新的localStorage的数据');
        //window.location.href='trade_details.html';

        //  交互部分
        function M(json){
            debugger;
            console.log(json.totalPriceCNY);
            //var data={
            //    "Parameters": "{\"CultureName\":\"en-US\",\"PartnerCode\":\"1000\",\"HotelCode\":\""+json.HotelGenInfo.hotelCode+"\"," +
            //    "\"RoomCode\":"+json.roomCode+",\"HotelName\":\""+json.HotelGenInfo.hotelName+"\"," +
            //    "\"RoomTypeCode\": "+json.RoomTypeCode+", \"RoomTypeName\":\""+json.RoomTypeName+"\"," +
            //    "\"RoomName\": \""+json.roomName+"\",\"CheckInDate\":\""+json.dateInfo.CheckInDate+"T00:00:00\"," +
            //    "\"CheckOutDate\":\""+json.dateInfo.CheckOutDate+"T00:00:00\",\"NumOfRoom\":"+json.NumOfRoom+"," +
            //    "\"NumOfGuest\":2,\"NumOfChild\":0,\"GuestTitle\":\"Mr\",\"GuestLastName\":\"Testing\"," +
            //    "\"GuestFirstName\":\"Tester\",\"GuestContactNo\":\""+json.GuestContactNo+"\"," +
            //    "\"GuestEmail\":\"thomas.gunawan@asiatravel.com\"," +
            //    "\"TotalPrice\":\""+json.totalPriceCNY+"\",\"Availability\":true,\"GuestRequest\":\"test\",\"MemberId\":0," +
            //    "\"CardHolderName\":\""+json.CardHolderName+"\"," +
            //    "\"CreditCardNumber\":\""+json.CreditCardNumber+"\",\"CreditCardType\":"+json.CreditCardType+"," +
            //    "\"CreditCardExpiryDate\":\""+json.CreditCardExpiryDate+"\",\"CardSecurityCode\":\""+json.CardSecurityCode+"\"," +
            //    "\"BankName\":\""+json.BankName+"\",\"ResidenceCode\":\"SIN\",\"NationlityCode\":\"CN\"," +
            //    "\"CardBillingAddress\":\"Toa Pa Yoh\",\"CardIssuanceCountry\":\""+json.CardIssuanceCountry+"\"," +
            //    "\"CashVoucherDetails\":\"\",\"Trck\":\"\",\"IPAddress\":\"\",\"CookieID\":1,\"BrowserType\":\"\",\"SessionID\":\"\"," +
            //    "\"GuestNameList\":[{\"GuestLastName\":\"yu\",\"GuestFirstName\":\"xiang\"}]}",
            //    "ForeEndType": 3,
            //    "Code": "0012"
            //};
            var data={};
            var guestNameList=[];
            for(var i=0;i<=json.guestName.length-1;i++){
                var guestInfo={};
                guestInfo.guestFirstName=json.guestName[i].GuestFirstName;
                guestInfo.guestLastName=json.guestName[i].GuestLastName;
                guestNameList.push(guestInfo);
            }

            data.Parameters={
                "availability":true,
                "bankName":"qwertyu",
                "browserType":"",
                "cardBillingAddress":"werty",
                "cardHolderName":json.CardHolderName,
                "cardIssuanceCountry":json.CardIssuanceCountry,
                "cardSecurityCode":json.CardSecurityCode,
                "cashVoucherDetails":"",
                "checkInDate":json.dateInfo.CheckInDate+"T00:00:00",
                "checkOutDate":json.dateInfo.CheckOutDate+"T00:00:00",
                "cookieID":1,
                "creditCardExpiryDate":json.CreditCardExpiryDate,
                "creditCardNumber":json.CreditCardNumber,
                "creditCardType":json.CreditCardType,
                "guestContactNo":json.GuestContactNo,
                "guestEmail":json.GuestEmail,
                 guestNameList:guestNameList,
                "guestRequest":"",
                "guestTitle":"Mr",
                "hotelCode":json.HotelGenInfo.hotelCode,
                "hotelName":json.HotelGenInfo.hotelName,
                "iPAddress":"",
                "memberId":localStorage.memberid,
                "nationlityCode":"",
                "numOfChild":0,
                "numOfGuest":json.NumOfRoom,
                "numOfRoom":json.NumOfRoom,
                "residenceCode":"",
                "roomCode":json.roomCode,
                "roomName":json.roomName,
                "roomTypeCode":json.RoomTypeCode,
                "roomTypeName":json.RoomTypeName,
                "sessionID":"",
                "totalPrice":json.totalPriceCNY,
                "trck":""
            };
            data.ForeEndType=3;
            data.Code="0012";

            console.log(data);
            console.log(JSON.stringify(data))

            var payment=new paymentObj(data,mycallback);
            payment.handlePayment();
            vlm.init();
            //return vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
        }
        //数据展示部分
        function V(data){

            if(data.success){
                debugger;
                if(data.data.length>=1) {
                    window.location.href=data.data[0].paymentRedirectURL;
                    //window.open(data.data[0].paymentRedirectURL,"第三方支付","fullscreen=1");
                }
            }else{
                $("#status-h").fadeOut();
                $("#preloader").fadeOut("medium");
                $.alerts.alert(data.message);
            }
        }
        M(myData);
        function mycallback(data_json){
            V(data_json);
        }
    });
})();