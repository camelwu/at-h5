/**
 * Created by changlv on 2016/1/13.
 */
function init(){
    var email = sessionStorage.email;
    var phone = sessionStorage.phone;
    var password = sessionStorage.password;
    var memberid = sessionStorage.memberid;
    sessionStorage.news = "true";
    sessionStorage.promotion = "true";
    var c = new vcm();
    var Parameters={
        "Parameters": "{\"CultureName\":\"\",\"MemberId\":\"492189\",\"Email\":\"\",\"Mobile\":\"15210091056\"}",
        "ForeEndType": 3,
        "Code": "0053"
    };
     //console.log("1111"+Parameters['Parameters'])
    c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);
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
    //  点击链接页面跳转
    var link_page = $("#link_page")[0];
    var setting = $("#setting")[0];
    var verifyName = $("#verifyName")[0];
    var noSignal = $("noSignal")[0];
    var u_setting = $("#u_setting")[0];
    var contactus = $("#contactus")[0];
    var close_page = $("#close_page")[0];
    var title = $("#title")[0];
    var array = title.innerHTML;
    var head = array.split("/");
    function link(obj1,obj2,obj3){
        obj1.onclick = function(){
            link_page.style.display = "block";
            u_setting.style.display = "none";
            contactus.style.display = "none";
            title.innerHTML = obj2;
            obj3.style.display = "block";
        }
    }
    link(setting,head[0],u_setting);
    link(verifyName,head[1],contactus);
    function close(obj){
        obj.onclick = function(){
            link_page.style.display = "none";
        }
    }
    close(close_page);
}
function ifOpen(){
    var b = window.event.srcElement;
    var newsLetter = $("#newsLetter")[0];
    var rcvPromotion = $("#rcvPromotion")[0];
    if(b.className == "icon set-chose1"){
        b.className = "icon set-chose2";
    }else{
        b.className = "icon set-chose1";
    }
    if(newsLetter.className == "icon set-chose2"){
        sessionStorage.news = "false";
    }
    if(rcvPromotion.className == "icon set-chose2"){
        sessionStorage.promotion = "false";
    }
}
function mycallback(ret) {
    var myJson = eval('(' + ret + ')');
    console.log(myJson);
    if (myJson.success) {
        var user_name = $("#user_name")[0];
        var user_sex = $("#user_sex")[0];
        var userIcon = $("#userIcon")[0];
        user_name.innerHTML = myJson.data[0].NickName;
        if (myJson.data[0].Salutation == "26") {
            user_sex.className = "icon open-sexm";
            userIcon.src = "../images/ui/photo-man.png";
        } else {
            user_sex.className = "icon open-sexw";
            userIcon.src = "../images/ui/photo-woman.png";
        }
    }else{
        alert(myJson.Message);
    }
}
