/**
 * Created by changlv on 2016/1/13.
 */
var data;

function u_logined(){
    var email = sessionStorage.email;
    var phone = sessionStorage.phone;
    var password = sessionStorage.password;
    var u_info = $("#u_info")[0];
    var c = new vcm();
    var Parameters= {
        "Parameters": "{\"CultureName\":\"\",\"Email\":\""+email+"\",\"Mobile\":\""+phone+"\"}",
        "ForeEndType": 3,
        "Code": "0053"
    };
    c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);
    // 会员详情
    //function user_info(obj){
    //    obj.onclick = function(){
    //        var Parameters= {
    //            "Parameters": "{\"CultureName\":\"\",\"Email\":\""+email+"\",\"Password\":\""+password+"\",\"Mobile\":\""+phone+"\"}",
    //            "ForeEndType": 3,
    //            "Code": "0053"
    //        };
    //        c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);
    //    }
    //}
    //user_info(u_info);
}

function mycallback(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    var user_name = $("#user_name")[0];
    var user_sex = $("#user_sex")[0];
    user_name.innerHTML = myJson.Data[0].NickName;
    if(myJson.Data[0].Salutation == "26"){
        user_sex.className = "icon open-sexm";
    }else{
        user_sex.className = "icon open-sexw";
    }
}
//function mycallback_info(ret){
//    console.log(ret);
//    var myJson = eval('('+ret+')');
//    console.log(myJson);
//    window.location.href = "user-perInfo.html";
//    sessionStorage.email = email;
//    sessionStorage.phone = phone;
//    sessionStorage.phone = password;
//    //sessionStorage.data = JSON.stringify(myJson);
//}