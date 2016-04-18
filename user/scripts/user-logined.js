/**
 * Created by changlv on 2016/1/13.
 */
function init(){
    var email = localStorage.email||sessionStorage.email;
    var phone = localStorage.phone||sessionStorage.phone;
    var password = localStorage.password||sessionStorage.password;
    var memberid = localStorage.memberid||sessionStorage.memberid;
    localStorage.news = "true";
    localStorage.promotion = "true";
    var Parameters={
        "Parameters": "{\"CultureName\":\"\",\"MemberId\":\""+memberid+"\",\"Email\":\""+email+"\",\"Mobile\":\""+phone+"\"}",
        "ForeEndType": 3,
        "Code": "0053"
    };

    //console.log(Parameters);
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
        };
    }
    close(close_page);


    if(localStorage.getItem('login') != 1)
    {
        return;
    }
    vlm.checkUser(mycallback);
    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);
    var li = document.getElementById("user_order").getElementsByTagName("li");
    //function order(obj){
    //    obj.onclick = function(){
    //        window.location.href = "user-allorder.html";
    //    }
    //}
    //order(li[0]);
    //order(li[1]);
    //order(li[2]);
    //order(li[3]);

}


function mycallback(ret) {
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
        var user_name = $("#user_name")[0];
        var user_sex = $("#user_sex")[0];
        var userIcon = $("#userIcon")[0];
        user_name.innerHTML = myJson.data[0].nickName;
        localStorage.sex=myJson.data[0].salutation;
        localStorage.email=myJson.data[0].emailAddress;
        if (myJson.data[0].salutation == "26") {
            user_sex.className = "icon open-sexm";
            userIcon.src = "../images/ui/photo-man.png";
        } else {
            user_sex.className = "icon open-sexw";
            userIcon.src = "../images/ui/photo-woman.png";
        }
    }
}

//登录之后点击全部订单的链接会改变
(function(){
    var oOrder=document.querySelector('#user_order');
    var aBtn=oOrder.children;

    aBtn[0].querySelector('a').onclick=function(){
        if(localStorage.getItem('login') == 1)
        {
            this.href='user-allorder.html'
        }else{
            this.href="user-login.html?allorder";
        }
    };


    document.querySelector('#common-msg').onclick=function(){

        if(localStorage.getItem('login') == 1)
        {
            this.href='user-oftenInfo.html';
        }else{
            this.href="user-login.html?oftenInfo";
        }
    };

    document.querySelector('#unloginShow').onclick=function(){
        if(localStorage.getItem('login') == 1)
        {
            this.href='user-perInfo.html'
        }
    };


})();

//设置里的消息开关
function ifOpen(){
    var b = window.event.srcElement;
    if(b.className == "icon set-chose1"){
        b.className = "icon set-chose2";
    }else{
        b.className = "icon set-chose1";
    }
}

















