/**
 * Created by changlv on 2016/1/13.
 */
var infoJson;
var MemberId;
var u_phone;
var u_email;
var u_realname;
function u_perInfo(){
    var menu = $("#menu")[0];
    menu.style.display = "none";
    var email = sessionStorage.email;
    var phone = sessionStorage.phone;
    var oPassword = sessionStorage.password;
    var memberid = sessionStorage.memberid;


    var Parameters= {
        //"Parameters": "{\"CultureName\":\"\",\"Email\":\""+email+"\",\"Password\":\""+oPassword+"\",\"Mobile\":\""+phone+"\",\"Code\":\"380998\"}",
        //"ForeEndType": 3,
        //"Code": "0052"
        "Parameters": "{\"MemberId\":\""+memberid+"\"}",
        "ForeEndType": 3,
        "Code": "0053"

    }

    //console.log(Parameters);
    c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

    var close_page = $("#close_page")[0];
    var amend_info = $("#amend_info")[0];
    var title = $("#title")[0];
    var info_content = $("#info_content")[0];
    var a_nick = $("#a_nick")[0];
    var a_name = $("#a_name")[0];
    var a_phone = $("#a_phone")[0];
    var a_email = $("#a_email")[0];
    var a_key = $("#a_key")[0];
    var changename = $("#changename")[0];
    var fillname = $("#fillname")[0];
    var phoneverify = $("#phoneverify")[0];
    var useremail = $("#useremail")[0];
    var amendkey = $("#amendkey")[0];
    var sex = $("#sex")[0];
    var block = $("#block")[0];
    var ifshowkey = $("#ifshowkey")[0];
    var array = title.innerHTML;
    var head = array.split("/");

    function clearname(){
        var name = document.getElementById("name");
        name.value = "";
    }
    function closeAmend(obj){
        obj.onclick = function(){
            amend_info.style.display = "none";
        }
    }
    closeAmend(close_page);
    //  是否显示密码
    function ifShowkey(obj){
        obj.onclick = function(){
            var b = ifshowkey.firstElementChild;
            var input;
            if(b.className == "icon show-keys"){
                b.className = "icon show-key";
                input = document.getElementById("keyForm").getElementsByTagName("input");
                for(var i = 0;i < input.length;i++){
                    input[i].type = "text";
                }
            }else{
                b.className = "icon show-keys";
                input = document.getElementById("keyForm").getElementsByTagName("input");
                for(var j = 0;j < input.length;j++){
                    input[j].type = "password";
                }
            }
        }
    }
    ifShowkey(ifshowkey);
    //  点击链接页面跳转
    function amendInfo(obj1,obj2,obj3){
        obj1.onclick = function(){
            changename.style.display = "none";
            fillname.style.display = "none";
            phoneverify.style.display = "none";
            useremail.style.display = "none";
            amendkey.style.display = "none";
            if(obj1 == a_nick || obj1 == a_key){
                amend_btn.style.display = "none";
            }else{
                amend_btn.style.display = "block";
            }
            title.innerHTML = obj2;
            obj3.style.display = "block";
            amend_info.style.display = "block";
        }
    }
    amendInfo(a_nick,head[0],changename);
    amendInfo(a_name,head[1],fillname);
    amendInfo(a_phone,head[2],phoneverify);
    amendInfo(a_email,head[3],useremail);
    amendInfo(a_key,head[4],amendkey);
    //  性别选择
    function changeSex(obj){
        obj.onclick = function() {
            if(sex.className != "info-sex-on"){
                sex.className="info-sex-on";
                block.innerHTML = "女";
            }else{
                sex.className="info-sex";
                block.innerHTML = "男"
            }
        };
    }
    changeSex(sex);
    //  修改昵称
    var nick_btn = $("#nick_btn")[0];
    MemberId=sessionStorage.memberid;
    function amendNick(obj){
        obj.onclick = function() {
            var input = document.getElementById("nickForm").getElementsByTagName("input");
            var Parameters = {
                "Parameters": "{\"MemberId\":\""+MemberId+"\",\"NickName\":\""+input[0].value+"\"}",
                "ForeEndType": 3,
                "Code": "0059"
            };
            //console.log(Parameters);
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_nick);
        }
    }
    amendNick(nick_btn);
    //  验证输入
    var check = function (type,num){
        if(type == "tel"){
            return c.Utils.validate.mobileNo(num);
        }
        if(type == "email"){
            return c.Utils.validate.email(num);
        }
        if(type == "pass"){
            return c.Utils.validate.password(num);
        }
    };
    //   修改信息
    var amend_btn = $("#amend_btn")[0];
    function changeInfo(obj){
        obj.onclick = function(){
            var input = document.getElementById("infoForm").getElementsByTagName("input");
            var UserSex;
            if(sex.className="info-sex-on"){
                UserSex = "26";
            }else{
                UserSex = "27";
            }
            var news = sessionStorage.news;
            var promotion = sessionStorage.promotion;
            for(var i= 0;i < input.length;i++){
                if(input[i].type !="button" && input[i].value !="") {
                    console.log(input[i].getAttribute('data-type'));
                    if(input[i].getAttribute('data-type') !="code") {
                        if (!check(input[i].getAttribute('data-type'), input[i].value)) {
                            alert("输入不正确");
                            return;
                        }
                    }
                    if(sessionStorage.phone != ""){
                        if(input[1].value != phone){
                            alert("用户已绑定信息不能修改");
                            return;
                        }
                    }else{
                        if(input[3].value != email){
                            alert("用户已绑定信息不能修改");
                            return;
                        }
                    }
                }
            }
            u_email = input[3].value;
            u_realname = input[0].value;
            u_phone = input[1].value;
            //var Parameters={
            //    "Parameters": "{\"CultureName\":\"\",\"Email\":\""+input[3].value+"\",\"FirstName\":\""+input[0].value+"\",\"DOB\":\"1982-10-22\",\"Address\":\"beijingshi\",\"City\":\"beijingshi\",\"Postcode\":\"471023\",\"Country\":\"china\",\"Nationality\":\"\",\"Mobile\":\""+input[1].value+"\",\"Phone\":\""+input[1].value+"\",\"NewsLetter\":"+news+",\"Promotion\":"+promotion+",\"Salutation\":\""+UserSex+"\"}",
            //        "ForeEndType": 3,
            //        "Code": "0056"
            //};
            var Parameters={
                "Parameters": "{\"MemberId\":\""+MemberId+"\",\"CultureName\":\"\",\"Email\":\"\",\"FirstName\":\""+u_realname+"\",\"LastName\":\"yuan\",\"DOB\":\"1982-10-22\",\"Address\":\"beijingshi\",\"City\":\"beijingshi\",\"Postcode\":\"471023\",\"Country\":\"china\",\"Nationality\":\"\",\"Mobile\":\""+u_phone+"\",\"Phone\":\"\",\"NewsLetter\":true,\"Promotion\":true,\"Salutation\":\"\"}",
                "ForeEndType": 3,
                "Code": "0056"
            };
            console.log(Parameters);
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);
        }
    }
    changeInfo(amend_btn);
     //  获取手机绑定验证码
    var r_phone=$('#phone');
    var phone_ver = $("#phone_ver")[0];
    function phone_veri(obj){
        obj.onclick = function(){
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":4}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_phoneVeri);
        }
    }
    phone_veri(phone_ver);
    //  修改密码
    var newkey_btn = $("#newkey_btn")[0];
    function changeKey(obj){
        obj.onclick = function(){
            var input = document.getElementById("keyForm").getElementsByTagName("input");
            for(var i= 0;i < input.length;i++){
                if(input[i].type !="button" && input[i].value !="") {
                    if (!check(input[i].getAttribute('data-type'), input[i].value)) {
                        alert("输入不正确");
                        return;
                    }
                    if(input[1].value != input[2].value){
                        alert("输入不正确");
                        return;
                    }
                }
            }
            //var Parameters= {
            //    "Parameters": "{\"CultureName\":\"\",\"Email\":\"\",\"Mobile\":\""+input[0].value+"\",\"NewPassword\":\""+input[1].value+"\"}",
            //    "ForeEndType": 3,
            //    "Code": "0054"
            //};
            var Parameters= {
                "Parameters": "{\"CultureName\":492189,\"MemberID\":\""+MemberId+"\",\"NewPassword\":\""+input[1].value+"\"}",
                "ForeEndType": 3,
                "Code": "0054"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_newKey);
        }
    }
    changeKey(newkey_btn);
    ////  修改密码获取验证
    //var newkey_ver = $("#newkey_ver")[0];
    //function key_veri(obj){
    //    obj.onclick = function(){
    //        var Parameters = {
    //            "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":3}",
    //            "ForeEndType": 3,
    //            "Code": "0058"
    //        };
    //        c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_keyVeri);
    //    }
    //}
    //key_veri(newkey_ver);
}
function mycallback(ret){
    infoJson = eval('('+ret+')');
    console.log(infoJson);
    var nickname = $("#nickname")[0];
    var name = $("#name")[0];
    var user_email = $("#email")[0];
    var user_phone = $("#phone")[0];
    var realName = $("#realName")[0];
    var sex = $("#sex")[0];
    var block = $("#block")[0];
    var userIcon = $("#userIcon")[0];
    nickname.innerHTML = infoJson.data[0].nickName;
    name.value = infoJson.data[0].nickName;
    if(sessionStorage.phone != ""){
        user_phone.value = sessionStorage.phone;
    }else{
        user_email.value = sessionStorage.email;
    }
    realName.value = sessionStorage.realname;
    MemberId = sessionStorage.memberid;
    //MemberId = infoJson.Data[0].MemberId;
    //sessionStorage.MemberId = MemberId;
    if(infoJson.data[0].salutation == 0){
        sex.className="info-sex";
        block.innerHTML = "男";
        userIcon.src = "../images/ui/photo-man.png";
    }else{
        sex.className="info-sex-on";
        block.innerHTML = "女";
        userIcon.src = "../images/ui/photo-woman.png";
    }
}
function mycallback_nick(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success) {
        window.location.href = "user-perInfo.html";
        document.getElementById("nickForm").submit();
    }else{
        alert(myJson.message);
    }
}
function mycallback_info(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        sessionStorage.realname = u_realname;
        sessionStorage.email = u_email;
        sessionStorage.phone = u_phone;
         document.getElementById("infoForm").submit();
    }else{
        alert(myJson.message);
    }
}
function mycallback_phoneVeri(ret){
    var phone_ver = $("#phone_ver")[0];
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        vlm.Utils.sendMobileCode(phone_ver.value);
    }else{
        alert(myJson.message);
    }
}
function mycallback_newKey(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        document.getElementById("keyForm").submit();
    }else{
        alert(myJson.message);
    }
}
//function mycallback_keyVeri(ret){
//    var c = new vlm();
//    var phone_ver = $("#phone_ver")[0];
//    console.log(ret);
//    var myJson = eval('('+ret+')');
//    console.log(myJson);
//    if(myJson.Success){
//        c.Utils.sendMobileCode(phone_ver.value);
//    }else{
//        alert(myJson.Message);
//    }
//}