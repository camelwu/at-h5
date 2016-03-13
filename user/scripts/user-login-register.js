/**
 * Created by changlv on 2016/1/7.
 */
var newkey;
var phone_verify=$('#find_verify')[0];
var phone_reg=$('#get_code')[0];
var regBflag_t=false;
var Bflag_forget=false;
window.onload = function(){
    var menu = $("#menu")[0];
    menu.style.display = "none";
    var phone_login = $("#phone_login")[0];
    var email_login = $("#email_login")[0];
    var phone = $("#phone")[0];
    var email = $("#email")[0];
    //var p_clear = $("#p_clear")[0];
    //var e_clear = $("#e_clear")[0];
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
    //function inputting(obj1,obj2){
    //    obj1.onkeydown = function(){
    //        obj2.style.display = "block";
    //    }
    //}
    //inputting(phone,p_clear);
    //inputting(email,e_clear);
    //function clear(obj1,obj2){
    //    obj1.onclick = function(){
    //        obj2.value = "";
    //    }
    //}
    //clear(p_clear,phone);
    //clear(e_clear,email);
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

    function changeFind(obj1){
        obj1.onclick = function(){
            if(find_title.innerHTML == '邮箱找回')
            {
                find_title.innerHTML = '手机找回';
                cha_email.style.display='block';
                cha_email.innerHTML='邮箱找回';
                cha_phone.style.display='none';
                phone_find.style.display='block';
                email_find.style.display='none';
            }
            else if(find_title.innerHTML == '手机找回')
            {
                find_title.innerHTML = '邮箱找回';
                cha_email.style.display='none';
                cha_phone.style.display='block';
                cha_phone.innerHTML = '手机找回';
                phone_find.style.display='none';
                email_find.style.display='block';
            }

        }
    }
    //更换找回密码方式
    changeFind(cha_email);
    changeFind(cha_phone);
    
    var p_password = $("#p_password")[0];
    var e_password = $("#e_password")[0];
    var r_phone = $("#r_phone")[0];
    var r_p_password = $("#r_p_password")[0];
    var r_e_password = $("#r_e_password")[0];
    var r_email = $("#r_email")[0];
    var verify = $("#verify")[0];
    var get_code = $("#get_code")[0];
    //var wrapper = $("#r_e_password")[0];

    var check = function (type,num){
        if(type == "tel"){
           return vlm.Utils.validate.mobileNo(num);
        }
        if(type == "email"){
           return vlm.Utils.validate.email(num);
        }
        if(type == "pass"){
           return vlm.Utils.validate.password(num);
        }
        if(type == "code"){
            return vlm.Utils.validate.code(num);
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

                if (!check(input[0].getAttribute('data-type'), input[0].value)) {
                    jAlert("请输入有效邮箱");
                    return;
                }

                if (!check(input[1].getAttribute('data-type'), input[1].value)) {
                    jAlert("请输入6-18位密码");
                    return;
                }
                if(input[2].value == '')
                {
                    jAlert("请输入确认密码");
                    return;
                }
                if($('#rs_e_password').val() !== $('#r_e_password').val())
                {
                    jAlert('两次输入的密码不一致！');
                    return;
                }
            }else{
                password = r_p_password;
                input = phone_register.getElementsByTagName('input');

                if (!check(input[0].getAttribute('data-type'), input[0].value)) {
                    jAlert("请输入有效手机号");
                    return;
                }
                if (!check(input[1].getAttribute('data-type'), input[1].value)) {
                    jAlert("请输入有效验证码");
                    return;
                }
                if (!check(input[2].getAttribute('data-type'), input[0].value)) {
                    jAlert("请输入6-18位密码");
                    return;
                }
            }

            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\""+r_email.value+"\",\"Password\":\""+password.value+"\",\"Mobile\":\""+r_phone.value+"\",\"Code\":\""+verify.value+"\"}",
                "ForeEndType": 3,
                "Code": "0051"
            };
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_register);
        }
    }
    user_register(register_btn);
    //  获取注册验证码
    function get_verify(obj){
        obj.onclick = function() {
            var r_phone = $("#r_phone")[0];
            if(r_phone.value !="") {
                if (!check(r_phone.getAttribute('data-type'), r_phone.value)) {
                    jAlert("请输入有效的手机号");
                    return;
                }
            }
            else
            {
                jAlert('请输入手机号');
                return;
            }
            if(regBflag_t)
            {
                return;
            }
            regBflag_t=true;
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":1}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            console.log(Parameters.Parameters);
            phone_reg.innerHTML='<span style="color: rgb(204,204,204)">120秒重新发送</span>';
            vlm.Utils.timeCountDown('120', time_reciprocals_t, phone_timeout_t);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_verify);
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
                if (!check(input[0].getAttribute('data-type'), input[0].value)) {
                    jAlert("请输入有效邮箱");
                    return;
                }
                if (!check(input[1].getAttribute('data-type'), input[1].value)) {
                    jAlert("请输入6-18位密码");
                    return;
                }

            } else {
                login_pass = p_password;
                input = phone_login.getElementsByTagName('input');

                if (!check(input[0].getAttribute('data-type'), input[0].value)) {
                    jAlert("请输入有效手机号");
                    return;
                }
                if (!check(input[1].getAttribute('data-type'), input[1].value)) {
                    jAlert("请输入6-18位密码");
                    return;
                }
            }

            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\""+email.value+"\",\"Password\":\""+login_pass.value+"\",\"Mobile\":\""+phone.value+"\"}",
                "ForeEndType": 3,
                "Code": "0052"

            };

            console.log(Parameters);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_login);
        }
    }
    user_login(login_btn);
    //找回密码
    var findkey_btn = $("#findkey_btn")[0];
    function findkey(obj){
        obj.onclick = function(){

            var find_phone = $("#find_phone")[0];
            var find_email = $("#find_email")[0];

            if(email_find.style.display == 'none'){
                var input = phone_find.getElementsByTagName('input');
                for(var i= 0;i < input.length;i++){
                    if(input[i].value !="") {
                        if(input[i].getAttribute('data-type') !="code") {
                            if (!check(input[i].getAttribute('data-type'), input[i].value)) {
                                jAlert("请输入有效的手机号");
                                return;
                            }
                        }
                    }

                }
                if(input[0].value == '')
                {
                    jAlert('请输入手机号');
                    return;
                }
                if(input[1].value == '')
                {
                    jAlert('请输入验证码');
                    return;
                }
                if(input[2].value == '')
                {
                    jAlert('请输入新密码');
                    return;
                }
                var Parameters= {
                    "Parameters": "{\"CultureName\":\"\",\"Email\":\"\",\"Mobile\":\""+find_phone.value+"\",\"NewPassword\":\""+input[2].value+"\",\"Code\":\""+input[1].value+"\"}",
                    "ForeEndType": 3,
                    "Code": "0055"
                };
                console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findkey);
            }
            else{
                var input = email_find.getElementsByTagName('input')[0];
                if(input.value !="") {
                    if (!check(input.getAttribute('data-type'), input.value)) {
                        jAlert("请输入有效的邮箱");
                        return;
                    }
                }
                else
                {
                    jAlert('请输入邮箱');
                    return;
                }
                var Parameters= {
                    "Parameters": "{\"CultureName\":\"\",\"Email\":\""+input.value+"\"}",
                    "ForeEndType": 3,
                    "Code": "0055"
                };
                console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findkey_email);
            }
        }
    }
    findkey(findkey_btn);
    //找回密码获取手机验证码
    var find_verify = $("#find_verify")[0];
    function get_fver(obj){
        obj.onclick = function(){
            var find_phone = $("#find_phone")[0];

            if(find_phone.value !="") {
                if(find_phone.getAttribute('data-type') !="code") {
                    if (!check(find_phone.getAttribute('data-type'), find_phone.value)) {
                        jAlert("请输入有效的手机号");
                        return;
                    }
                }
            }
            else
            {
                jAlert('请输入手机号');
                return;
            }
            if(Bflag_forget)
            {
                return;
            }
            Bflag_forget=true;
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + find_phone.value + "\",\"VerificationCodeType\":3}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            phone_verify.innerHTML='<span style="color: rgb(204,204,204)">120秒重新发送</span>';
            vlm.Utils.timeCountDown('120', time_reciprocals, phone_timeout);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findver);
        }
    }
    get_fver(find_verify);


    //获取机器码后再发请求
   function mycallback_forgotpass(ret){
       var myJson=ret;
       if(myJson.success)
       {
           var Parameters={
               "Parameters": "{\"SerialNumber\":\"B0A90DEE-3A74-463E-9A31-94BD8AA30036\",\"NewPassword\":\"11111\"}",
               "ForeEndType": 3,
               "Code": "0061"
           }
           vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_findkey);
       }
       else
       {
           jAlert(myJson.message);
       }

   }

};
function show_keypage(){
    var fkey_page = $("#fkey_page")[0];
    fkey_page.style.display = "block";
    if($('#email_login').css('display') == 'none' )
    {

        $('#phone_find').show();
        $('#email_find').hide();
        $('#cha_email').show().html('邮箱找回');
        $('#cha_phone').hide()
        $("#find_title").html('手机找回');

    }
    else
    {
        $('#email_find').show();
        $('#phone_find').hide();
        $('#cha_phone').show().html('手机找回');
        $('#cha_email').hide();
        $("#find_title").html('邮箱找回');
    }
}
function close_keypage(){
    var fkey_page = $("#fkey_page")[0];
    fkey_page.style.display = "none";
}
function mycallback_register(ret){
    var myJson = ret;
    if(myJson.success){
        jAlert('注册成功','',cb_register);
    }else{
        jAlert(myJson.message);
    }
}

//注册成功，alert之后的回调函数
function  cb_register(){
    var r_email = $("#r_email")[0];
    var r_phone = $("#r_phone")[0];
    if($('#phone_register').css('display') == 'none')
    {
        var login_pass = $("#r_e_password")[0];
    }
    else{
        var login_pass =$("#r_p_password")[0];
    }

    var Parameters= {
        "Parameters": "{\"CultureName\":\"\",\"Email\":\""+r_email.value+"\",\"Password\":\""+login_pass.value+"\",\"Mobile\":\""+r_phone.value+"\"}",
        "ForeEndType": 3,
        "Code": "0052"

    };

    console.log(Parameters);
    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_login);
}

function mycallback_login(ret) {
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
        localStorage.email = myJson.data[0].email;
        localStorage.phone = myJson.data[0].mobile;
        localStorage.memberid = myJson.data[0].memberID;
        localStorage.setItem('login',1);
        var url=vlm.getpara("returnUrl");

        if(url=="" || url==null) {
            window.location.href = "user.html";
        }else{
            window.location.href =unescape(url);
        }
    } else {

        if(myJson.message == 'Invalid password')
        {
            jAlert('密码错误，请重新输入');
        }
        else if(myJson.message == '无此用户的相关信息')
        {
            jAlert('未注册用户');
        }
        else
        {
            jAlert(myJson.message);
        }
    }
}
//注册验证码回调
function mycallback_verify(ret){
    var verify = $("#verify")[0];
    var myJson = ret;
     console.log(myJson);
    if(myJson.success){
        vlm.Utils.sendMobileCode(verify.value);
    }else{
        jAlert(myJson.message);
    }
}
function mycallback_findkey(ret){
    var myJson = ret;
    //console.log(myJson);
    if(myJson.success){
        jAlert('重置密码成功','',call_pass);
    }else{
        jAlert('修改密码失败，请重试');
    }
}

//邮箱找回密码回调
function mycallback_findkey_email(ret){
    var myJson = ret;
    //console.log(myJson);
    if(myJson.success){
        jAlert('已将重置密码的邮件发送到您的邮箱，请查收','',call_pass);

    }else{
        jAlert(myJson.message);
    }
}


function call_pass(){
    window.location.href = "user-login.html";
}
//找回密码验证码回调
function mycallback_findver(ret){
    var find_veri = $("#find_veri")[0];
    var myJson = ret;
    if(myJson.success){
        vlm.Utils.sendMobileCode(find_veri.value);
    }else{
        jAlert(myJson.Message);
    }
}

//时间倒计时结束后
function phone_timeout(obj){
    console.log(phone_verify);
    this.innerHTML='发送验证码';
    this.style.color='#ffb413';
    Bflag_forget=false;
}

//时间倒计过程中
function time_reciprocals(sec){
    phone_verify.innerHTML=sec+'秒重新发送';
    phone_verify.style.color='#ccc';
}

//时间倒计时结束后
function phone_timeout_t(){
    phone_reg.innerHTML='发送验证码';
    regBflag_t=false;
}

//时间倒计过程中
function time_reciprocals_t(sec){
    phone_reg.innerHTML=sec+'秒重新发送';
    phone_reg.style.color='#ccc';
}