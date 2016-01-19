/**
 * Created by changlv on 2016/1/13.
 */
function init(){
    var email = sessionStorage.email;
    var phone = sessionStorage.phone;
    var password = sessionStorage.password;
    var u_info = $("#u_info")[0];
    //var user_order = $("user_order")[0];
    var li = document.getElementById("user_order").getElementsByTagName("li");
    function order(obj){
        obj.onclick = function(){
            window.location.href = "user-allorder.html";
        }
    }
    order(li[0]);
    order(li[1]);
    order(li[2]);
    order(li[3]);
    var c = new vcm();
    var Parameters= {
        "Parameters": "{\"CultureName\":\"\",\"Email\":\""+email+"\",\"Mobile\":\""+phone+"\"}",
        "ForeEndType": 3,
        "Code": "0053"
    };
    c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

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
