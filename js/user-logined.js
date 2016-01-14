/**
 * Created by changlv on 2016/1/13.
 */
function u_logined(){
    var email = sessionStorage.email;
    var phone = sessionStorage.phone;
    var password = sessionStorage.password;
    var u_info = $("#u_info")[0];
    var c = new vcm();
    // 会员详情
    function user_info(obj){
        obj.onclick = function(){
            var Parameters= {
                "Parameters": "{\"CultureName\":\"\",\"Email\":\""+email+"\",\"Password\":\""+password+"\",\"Mobile\":\""+phone+"\"}",
                "ForeEndType": 3,
                "Code": "0053"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_info);
        }
    }
    user_info(u_info);
}
function mycallback_info(ret){
    console.log(ret);
    var myJson = eval('('+ret+')');
    console.log(myJson);
    alert(1);
    window.location.href = "user-perInfo.html";
    sessionStorage.data = JSON.stringify(myJson);
}