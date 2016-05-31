/**
 * Created by changlv on 2016/1/13.
 */
  "use strict";

  function init(){

    //加载动画

    $("#status").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");

    vlm.init();

    var email = localStorage.email;
    var phone = localStorage.phone;
    var password = localStorage.password;
    var memberid = localStorage.memberid;
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
    vlm.checkUser();
    vlm.loadJson("", JSON.stringify(Parameters), mycallback);
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
      if(myJson.data[0].bigHeadImageUrl){
        userIcon.src = myJson.data[0].bigHeadImageUrl;
      }else{
        userIcon.src = "../images/user/photo-man.png";
      }
      if(myJson.data[0].nickName == ''){
        user_name.innerHTML='点击头像设置个人资料';
      }else{
        if (myJson.data[0].salutation == "26") {
          user_sex.className = "icon_person open-sexm";
        } else {
          user_sex.className = "icon_person open-sexw";
        }
      }
    }
  }

  //登录之后点击全部订单的链接会改变
  (function(){
    document.querySelector('.my-order').onclick=function(){
      //去除登录
      //if(localStorage.getItem('login') == 1)
      //{
      //    this.href='user-allorder.html';
      //}else{
      //    this.href="user-login.html?allorder";
      //}
      this.href='user-allorder.html';
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
        this.href='user-perInfo.html';
      }
    };


  })();

  $('#about_at').click(function(){
    $('#link_about_us').show();
    $('#close_page_aboutus').click(function(){
      $('#link_about_us').hide();
    });
  });
  //设置里的消息开关
  function ifOpen(){
    var b = window.event.srcElement;
    if(b.className == "icon set_chose1"){
      b.className = "icon set_chose2";
    }else{
      b.className = "icon set_chose1";
    }
  }

  //电话
  $('.service_tel').click(function(){
    $('.jpop_box_tic').show();
  });
  $('.jpop_box_tic span,.jpop_box_tic a').click(function(){
    $('.jpop_box_tic').hide();
  })

  //关于亚洲旅游
  $('#atIntroduce').click(function(){
    $('#link_at').show();
    $('#close_page_at').click(function(){
      $('#link_at').hide();
    });
  });

  //协议及声明
  $('#atDeclaration').click(function(){
    $('#link_declaration').show();
    $('#close_page_de').click(function(){
      $('#link_declaration').hide();
    });
  });


