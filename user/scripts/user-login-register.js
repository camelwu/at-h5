/**
 * Created by changlv on 2016/1/7.
 */
var newkey;
window.onload = function(){
    var menu = $("#menu")[0];
    menu.style.display = "none";
    var phone_login = $("#phone_login")[0];
    var email_login = $("#email_login")[0];
    var phone = $("#phone")[0];
    var email = $("#email")[0];
    var p_clear = $("#p_clear")[0];
    var e_clear = $("#e_clear")[0];
    var change_phone = $("#change_phone")[0];
    var change_email = $("#change_email")[0];
    var header_email = $("#header_email")[0];
    var header_phone = $("#header_phone")[0];
    var phone_register = $("#phone_register")[0];
    var email_register = $("#email_register")[0];
    var register = $("#register")[0];
    var register_page = $("#register_page")[0];
    var login_page = $("#login_page")[0];
    var close_register = $("#close_register")[0];
    var register_btn = $("#register_btn")[0];
    var login_btn = $("#login_btn")[0];
    var find_title = $("#find_title")[0];
    var cha_email = $("#cha_email")[0];
    var cha_phone = $("#cha_phone")[0];
    var phone_find = $("#phone_find")[0];
    var email_find = $("#email_find")[0];
    email_login.style.display = "none";
    change_phone.style.display = "none";
    function showRegister(obj1,obj2,obj3){
        obj1.onclick = function(){
            obj2.style.display = "none";
            obj3.style.display = "block";
        }
    }
    showRegister(register,login_page,register_page);
    function closeRegister(obj1,obj2,obj3){
        obj1.onclick = function(){
            obj2.style.display = "none";
            obj3.style.display = "block";
        }
    }
    closeRegister(close_register,register_page,login_page);
    function inputting(obj1,obj2){
        obj1.onkeydown = function(){
            obj2.style.display = "block";
        }
    }
    inputting(phone,p_clear);
    inputting(email,e_clear);
    function clear(obj1,obj2){
        obj1.onclick = function(){
            obj2.value = "";
        }
    }
    clear(p_clear,phone);
    clear(e_clear,email);
    function changeWay(obj1,obj2,obj3,obj4){
        obj1.onclick = function(){
            obj1.style.display = "none";
            obj2.style.display = "block";
            obj3.style.display = "none";
            obj4.style.display = "block";
        }
    }
    //更换登录方式
    changeWay(change_email,change_phone,phone_login,email_login);
    changeWay(change_phone,change_email,email_login,phone_login);
    //更换注册方式
    changeWay(header_email,header_phone,phone_register,email_register);
    changeWay(header_phone,header_email,email_register,phone_register);
    function changeFind(obj1,obj2,obj3,obj4){
        obj1.onclick = function(){
            phone_find.style.display = "none";
            email_find.style.display = "none";
            obj1.style.display = "none";
            obj2.style.display = "block";
            find_title.innerHTML = obj3;
            obj4.style.display = "block";
        }
    }
    //更换找回密码方式
    changeFind(cha_email,cha_phone,"邮箱找回",email_find);
    changeFind(cha_phone,cha_email,"手机找回",phone_find);
    var p_password = $("#p_password")[0];
    var e_password = $("#e_password")[0];
    var r_phone = $("#r_phone")[0];
    var r_p_password = $("#r_p_password")[0];
    var r_e_password = $("#r_e_password")[0];
    var r_email = $("#r_email")[0];
    var verify = $("#verify")[0];
    var get_code = $("#get_code")[0];
    //var wrapper = $("#r_e_password")[0];
    var c = new vlm();
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
    // 会员注册
    function user_register(obj){
        obj.onclick = function(){
            var password;
            var input;
            if(header_email.style.display == "none"){
                password = r_e_password;
                input = email_register.getElementsByTagName('input');
            }else{
                password = r_p_password;
                input = phone_register.getElementsByTagName('input');
            }
            for(var i= 0;i < input.length;i++){
                if(input[i].style.display!=="none" && input[i].value !="") {
                    console.log(input[i].getAttribute('data-type'));
                    if(input[i].getAttribute('data-type') !="code") {
                        if (!check(input[i].getAttribute('data-type'), input[i].value)) {
                            alert("输入不正确");
                            return;
                        }
                    }
                }
            }
            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\""+r_email.value+"\",\"Password\":\""+password.value+"\",\"Mobile\":\""+r_phone.value+"\",\"Code\":\""+verify.value+"\"}",
                "ForeEndType": 3,
                "Code": "0051"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_register);
        }
    }
    user_register(register_btn);
    //  获取注册验证码
    function get_verify(obj){
        obj.onclick = function() {
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":1}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_verify);
        }
    }
    get_verify(get_code);
    // 会员登录
    function user_login(obj) {
        obj.onclick = function () {
            var input;
            if (change_email.style.display == "none") {
                login_pass = e_password;
                input = email_login.getElementsByTagName('input');
            } else {
                login_pass = p_password;
                input = phone_login.getElementsByTagName('input');
            }

            for (var i = 0; i < input.length; i++) {
                if (input[i].style.display != "none" && input[i].value != "") {
                    console.log(input[i].getAttribute('data-type'));
                    if(!check(input[i].getAttribute('data-type'),input[i].value)){
                        alert("输入不正确");
                        return;
                    }
                }
            }
            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\"" + email.value + "\",\"Password\":\"" + login_pass.value + "\",\"Mobile\":\"" + phone.value + "\"}",
                "ForeEndType": 3,
                "Code": "0052"
            };
            console.log(Parameters);
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_login);
        }
    }
    user_login(login_btn);
    //找回密码
    var findkey_btn = $("#findkey_btn")[0];
    function findkey(obj){
        obj.onclick = function(){
            //debugger;
            var input;
            var find_phone = $("#find_phone")[0];
            var find_email = $("#find_email")[0];
            if(find_title.innerHTML = "手机找回"){
                input = phone_find.getElementsByTagName('input');
            }else{
                input = email_find.getElementsByTagName('input');
            }
            for(var i= 0;i < input.length;i++){
                if(input[i].value !="") {

                    console.log(input[i].getAttribute('data-type'));
                    if(input[i].getAttribute('data-type') !="code") {
                        if (!check(input[i].getAttribute('data-type'), input[i].value)) {
                            alert("输入不正确");
                            return;
                        }
                    }
                }
            }
            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\""+find_email.value+"\",\"Mobile\":\""+find_phone.value+"\",\"NewPassword\":\""+input[2].value+"\",\"Code\":\""+input[1].value+"\"}",
                "ForeEndType": 3,
                "Code": "0055"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findkey);
        }
    }
    findkey(findkey_btn);
    //找回密码获取手机验证码
    var find_verify = $("#find_verify")[0];
    function get_fver(obj){
        obj.onclick = function(){
            var find_phone = $("#find_phone")[0];
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + find_phone.value + "\",\"VerificationCodeType\":3}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findver);
        }
    }
    get_fver(find_verify);

    //邮箱找回密码

    var findkey_btn = $("#findkey_btn")[0];
    function findkeybyemail(obj){
        obj.onclick = function(){
            //debugger;
            var input;
            var find_email = $("#find_email")[0];
            input = email_find.getElementsByTagName('input')[0];
            if(input.value !="") {
                console.log(input.getAttribute('data-type'));
                if(input.getAttribute('data-type') !="code") {
                    if (!check(input.getAttribute('data-type'), input.value)) {
                        alert("输入不正确");
                        return;
                    }
                }
            }
            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\"1136328136@qq.com\",\"Mobile\":\"\",\"NewPassword\":\"22222\",\"Code\":\"284665\"}",
                "ForeEndType": 3,
                "Code": "0055"
            }

            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_forgotpass);
        }
    }
    findkeybyemail(findkey_btn);

    //获取机器码后再发请求
   function mycallback_forgotpass(ret){
       var myJson=eval('('+ret+')');
       if(myJson.success)
       {
           var Parameters={
               "Parameters": "{\"SerialNumber\":\"B0A90DEE-3A74-463E-9A31-94BD8AA30036\",\"NewPassword\":\"11111\"}",
               "ForeEndType": 3,
               "Code": "0061"
           }
           c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findkey);
       }
       else
       {
           alert(myJson.Message);
       }

   }




};
function show_keypage(){
    var fkey_page = $("#fkey_page")[0];
    fkey_page.style.display = "block";
}
function close_keypage(){
    var fkey_page = $("#fkey_page")[0];
    fkey_page.style.display = "none";
}
function mycallback_register(ret){
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        document.getElementById("register_page").style.display = "none";
        document.getElementById("login_page").style.display = "block";
    }else{
        alert(myJson.Message);
    }
}
function mycallback_login(ret) {
    console.log(ret);
    var myJson = eval('(' + ret + ')');
    console.log(myJson);
    if (myJson.success) {
        sessionStorage.email = myJson.data[0].email;
        sessionStorage.phone = myJson.data[0].mobile;
        sessionStorage.password = myJson.data[0].password;
        sessionStorage.memberid = myJson.data[0].memberID;
        localStorage.setItem('login',1);
        window.location.href = "user-logined.html";
    } else {
        alert(myJson.Message);
    }
}
//注册验证码回调
function mycallback_verify(ret){
    var c = new vlm();
    var verify = $("#verify")[0];
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        c.Utils.sendMobileCode(verify.value);
    }else{
        alert(myJson.Message);
    }
}
function mycallback_findkey(ret){
    var myJson = eval('(' + ret + ')');
    if(myJson.success){
        window.location.href = "../user-login.html";

    }else{
        alert(myJson.Message);
    }
}
//找回密码验证码回调
function mycallback_findver(ret){
    var c = new vlm();
    var find_veri = $("#find_veri")[0];
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        c.Utils.sendMobileCode(find_veri.value);
    }else{
        alert(myJson.Message);
    }
}