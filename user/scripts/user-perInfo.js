/**
 * Created by changlv on 2016/1/13.
 */
var infoJson;
var MemberId;
var u_phone;
var u_email;
var u_realname;
var phoneBflag=false;
var r_phone=$('#phone')[0];
var UserSex=sessionStorage.salutation;
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

    console.log(Parameters);
    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

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

    $('#a_nick').click(function(){
        $('#amend_btn_0').hide();
        $('#amend_btn_1').hide();
        $('#amend_btn_2').hide();
    });

    $('#a_name').click(function(){
        $('#amend_btn_0').show().siblings('input').hide();
    });

    $('#a_phone').click(function(){
        $('#amend_btn_1').show().siblings('input').hide();
    });

    $('#a_email').click(function(){
        $('#amend_btn_2').show().siblings('input').hide();
    });

    $('#a_key').click(function(){
        $('#amend_btn_2').hide();
        $('#amend_btn_1').hide();
    });
    //  性别选择
    function changeSex(obj){

        obj.onclick = function() {
            if(sex.className != "info-sex-on"){
                sex.className="info-sex-on";
                block.innerHTML = "女";
                UserSex=26;
            }else{
                sex.className="info-sex";
                block.innerHTML = "男";
                UserSex=27;
            }

        };

        //返回按钮保存性别
        var oPerBack=$('#per-back')[0];
        function closeSex(obj){
            obj.onclick = function(){
                var Parameters={
                    "Parameters": "{\"MemberId\":\""+MemberId+"\",\"Salutation\":\""+UserSex+"\"}",
                    "ForeEndType": 3,
                    "Code": "0056"
                };
                console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_sex);
            }
        }
        closeSex(oPerBack);
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
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_nick);
        }
    }
    amendNick(nick_btn);
    //  验证输入
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
    };
    //修改信息
    var amend_btn = $("#amend_btn_0")[0];
    var amend_btn_1 = $("#amend_btn_1")[0];
    var amend_btn_2 = $("#amend_btn_2")[0];
    //修改姓名
    function changeInfo_name(obj){
        obj.onclick = function(){

            var oInputName = document.getElementById("infoForm").getElementsByTagName("input")[0];
            u_realname = oInputName.value;
            var Parameters={
                "Parameters": "{\"MemberId\":\""+MemberId+"\",\"CultureName\":\"\",\"FirstName\":\""+u_realname+"\"}",
                "ForeEndType": 3,
                "Code": "0056"
            };
            //console.log(Parameters);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);
        }
    }
    changeInfo_name(amend_btn);

    //修改出生日期
    var oPerBack=$('#per-back')[0];
    function selDate(obj){
        obj.onclick = function(){
            var birthstr=$('#birth-cont')[0].value.replace('年','-').replace('月','-').replace('号','');
            var Parameters={
                "Parameters": "{\"MemberId\":\""+MemberId+"\",\"DOB\":\""+birthstr+"\"}",
                "ForeEndType": 3,
                "Code": "0056"
            };
            console.log(Parameters);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters),mycallback_birth);
        }
    }
    selDate(oPerBack);


    //绑定新手机号
    function changeInfo_mobile(obj){
        obj.onclick = function(){

            var oInputMobile = document.getElementById("infoForm").getElementsByTagName("input")[1];
            u_phone = oInputMobile.value;
            if(oInputMobile.value !="") {
                if(oInputMobile.getAttribute('data-type') !="code") {
                    if (!check(oInputMobile.getAttribute('data-type'), oInputMobile.value)) {
                        alert("输入不正确");
                        return;
                    }
                }
                if(sessionStorage.phone != ""){
                    if(oInputMobile.value == phone){
                        alert("用户已绑定信息不能修改");
                        return;
                    }
                }

                var Parameters={
                    "Parameters": "{\"MemberId\":\""+MemberId+"\",\"Mobile\":\""+u_phone+"\"}",
                    "ForeEndType": 3,
                    "Code": "0056"
                };
                //console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);

            }
        }
    }
    changeInfo_mobile(amend_btn_1);

    //修改邮箱
    function changeInfo_email(obj){
        obj.onclick = function(){

            var oInputEmail = document.getElementById("infoForm").getElementsByTagName("input")[3];
            u_email = oInputEmail.value;

            if(oInputEmail.value !="") {
                if(oInputEmail.getAttribute('data-type') !="code") {
                    if (!check(oInputEmail.getAttribute('data-type'), oInputEmail.value)) {
                        alert("输入不正确");
                        return;
                    }
                }
                if(sessionStorage.email != ""){
                    if(oInputEmail.value == email){
                        alert("用户已绑定信息不能修改");
                        return;
                    }
                }

                var Parameters={
                    "Parameters": "{\"MemberId\":\""+MemberId+"\",\"Email\":\""+u_email+"\"}",
                    "ForeEndType": 3,
                    "Code": "0056"
                };
                //console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);

            };

        }
    }
    changeInfo_email(amend_btn_2);

     //  获取手机绑定验证码
    var phone_ver = $("#phone_ver")[0];
    function phone_veri(obj){
        obj.onclick = function(){
            if(phoneBflag)
            {
                return;
            }
            phoneBflag=true;
            var Parameters = {
                "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":4}",
                "ForeEndType": 3,
                "Code": "0058"
            };
            console.log(Parameters.Parameters);
            vlm.Utils.timeCountDown('120', time_reciprocals, phone_timeout);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_phoneVeri);
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

            var Parameters= {
                "Parameters": "{\"CultureName\":492189,\"MemberID\":\""+MemberId+"\",\"NewPassword\":\""+input[1].value+"\",\"Password\":\""+input[0].value+"\"}",
                "ForeEndType": 3,
                "Code": "0054"
            };

            console.log(Parameters);
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_newKey);
        }
    }
    changeKey(newkey_btn);

}

//保存出生日期回调
function mycallback_birth(ret){
    var myJson=eval('('+ret+')');
    console.log(myJson);
    if(myJson.success)
    {
        window.location.href="user.html"
    }
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
    var birthCont=$('#birth-cont')[0];
    if(infoJson.data == null)
    {
        nickname.innerHTML ='';
        name.value ='';
    }
    else
    {
        nickname.innerHTML = infoJson.data[0].nickName;
        name.value = infoJson.data[0].nickName;
        birthCont.value=infoJson.data[0].dateOfBirth.substring(0,10).replace('-','年').replace('-','月')+'号';
        if(infoJson.data[0].salutation == 26){
            sex.className="info-sex-on";
            block.innerHTML = "女";
            userIcon.src = "../images/ui/photo-man.png";
        }else{
            sex.className="info-sex";
            block.innerHTML = "男";
            userIcon.src = "../images/ui/photo-woman.png";
        }
    }
    if(sessionStorage.phone != ""){
        user_phone.value = sessionStorage.phone;
    }else{
        user_email.value = sessionStorage.email;
    }
    realName.value = sessionStorage.realname;
    MemberId = sessionStorage.memberid;
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

//性别回调
function mycallback_sex(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.success){
        sessionStorage.sex=UserSex;
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

/*退出账户清除localStorage*/
$('.info-quit').click(function(){
    localStorage.removeItem('login');
    var ldata = {unlogin:true,name:"点击登录，体验更多"};
    var lstr = template("user-info",ldata);
    $("#user-info").html(lstr);
});






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