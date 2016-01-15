/**
 * Created by changlv on 2016/1/7.
 */
var login_pass;
window.onload = function(){
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

    var p_password = $("#p_password")[0];
    var e_password = $("#e_password")[0];
    var r_phone = $("#r_phone")[0];
    var r_p_password = $("#r_p_password")[0];
    var r_e_password = $("#r_e_password")[0];
    var r_email = $("#r_email")[0];
    var verify = $("#verify")[0];
    var get_code = $("#get_code")[0];
    //var wrapper = $("#r_e_password")[0];
    var c = new vcm();
    var check = function (type,num){
        if(type == "tel"){
            c.Utils.validate.mobileNo(num);
        }
        if(type == "email"){
            c.Utils.validate.email(num);
        }
        if(type == "pass"){
            c.Utils.validate.password(num);
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
                        if (check(input[i].getAttribute('data-type'), input[i].value)) {
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
                    if(check(input[i].getAttribute('data-type'),input[i].value)){
                        alert("输入不正确");
                        return;
                    }
                }
            }
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\"" + email.value + "\",\"Password\":\"" + login_pass.value + "\",\"Mobile\":\"" + phone.value + "\"}",
                "ForeEndType": 3,
                "Code": "0052"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_login);
        }
    }
    user_login(login_btn);
};
function mycallback_register(ret){
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.Success){
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
    var phone = $("#phone")[0];
    var email = $("#email")[0];
    if (myJson.Success) {
        window.location.href = "user-logined.html";
        sessionStorage.email = email.value;
        sessionStorage.phone = phone.value;
        sessionStorage.password = login_pass.value;
    } else {
        alert(myJson.Message);
    }
}
function mycallback_verify(ret){
    var c = new vcm();
    var verify = $("#verify")[0];
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.Success){
        c.Utils.sendMobileCode(verify.value);
    }else{
        alert(myJson.Message);
    }
}
