/**
 * Created by changlv on 2016/1/13.
 */
"use strict";
var UserInfo ={
  redPageSize : 10,
  redPageIndex : 1
};

function init() {

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
  var Parameters = {
    "Parameters": "{\"CultureName\":\"\",\"MemberId\":\"" + memberid + "\",\"Email\":\"" + email + "\",\"Mobile\":\"" + phone + "\"}",
    "ForeEndType": 3,
    "Code": "0053"
  };
  var redBagParameters = {
    "Parameters": "{\"MemberId\":\"" + memberid + "\",\"PageIndex\":\"" + UserInfo.redPageIndex + "\",\"PageSize\":\"" + UserInfo.redPageSize + "\"}",
    "ForeEndType": 3,
    "Code": "70100032"
  }

  //console.log(Parameters);
  //  点击链接页面跳转
  var link_page = $("#link_page")[0];
  var shade = $("#shade")[0];
  var verifyName = $("#verifyName")[0];
  var noSignal = $("noSignal")[0];
  var u_setting = $("#u_setting")[0];
  var contactus = $("#contactus")[0];
  var close_page = $("#close_page")[0];
  var title = $("#title")[0];
  var array = title.innerHTML;
  var head = array.split("/");

  function link(obj1, obj2, obj3) {
    obj1.onclick = function () {
      link_page.style.display = "block";
      shade.style.display = "none";
      contactus.style.display = "none";
      title.innerHTML = obj2;
      obj3.style.display = "block";
    }
  }

  link(verifyName, head[1], contactus);
  function close(obj) {
    obj.onclick = function () {
      link_page.style.display = "none";
      shade.style.display = "block";
    };
  }

  close(close_page);


  if (localStorage.getItem('login') != 1) {
    return;
  }
  vlm.checkUser();
  vlm.loadJson("", JSON.stringify(Parameters), mycallback);
  vlm.loadJson("", JSON.stringify(redBagParameters), redBagCallback);
}

//查看更多红包回调函数
function moreRedCallback(result){
  if (result.success) {
    var data = result.data[0];
    var allCouponList = data.allCouponList;
    var couponLenght = allCouponList.length;
    if(couponLenght == 0){
      $(".red_bag_wrap .more").html("没有更多数据了");
      return;
    }
    //预处理数据
    var status = "";
    for (var i = 0; i < couponLenght; i++) {
      switch (allCouponList[i].productCategory) {
        case 1:
          allCouponList[i].title = "酒店现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站酒店订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站酒店订单立减" + allCouponList[i].amount;
          }
          break;
        case 2:
          allCouponList[i].title = "景点现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站景点订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站景点订单立减" + allCouponList[i].amount;
          }
          break;
      }
      switch (allCouponList[i].status) {
        case 1:
          status = "为激活";
          break;
        case 2:
          status = "";
          break;
        case 3:
          //status = "已锁定";
          status = "已使用";
          break;
        case 4:
          status = "已使用";
          break;
        case 5:
          status = "已过期";
          break;
        case 6:
          status = "已作废";
          break;
      }
      allCouponList[i].endDate = allCouponList[i].endDate.split("T")[0] + " " + status;
    }
    var str = $("#redItemTemplate").html();
    var output1 = ejs.render(str, {
      data: data,
      allCouponList: allCouponList
    });
    $(".red_List_wrap .red_list").append(output1);
  }
}
//首次加载红包回调函数
function redBagCallback(result) {
  if (result.success) {
    var data = result.data[0];
    $("#myRed").show();
    var str = $("#redTemplate").html();
    //预处理数据
    var allCouponList = data.allCouponList;
    var status = "";
    for (var i = 0; i < allCouponList.length; i++) {
      switch (allCouponList[i].productCategory) {
        case 1:
          allCouponList[i].title = "酒店现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站酒店订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站酒店订单立减" + allCouponList[i].amount;
          }
          break;
        case 2:
          allCouponList[i].title = "景点现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站景点订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站景点订单立减" + allCouponList[i].amount;
          }
          break;
      }
      switch (allCouponList[i].status) {
        case 1:
          status = "为激活";
          break;
        case 2:
          status = "";
          break;
        case 3:
          //status = "已锁定";
          status = "已使用";
          break;
        case 4:
          status = "已使用";
          break;
        case 5:
          status = "已过期";
          break;
        case 6:
          status = "已作废";
          break;
      }
      allCouponList[i].endDate = allCouponList[i].endDate.split("T")[0] + " " + status;
    }
    var output1 = ejs.render(str, {
      data: data,
      allCouponList: allCouponList
    });
    $("#link_redBag").html(output1);
    $("#myRed .useable .money").html('¥ ' + data.canUseAmount);



    //加载更多红包
    $(".red_bag_wrap .more").on("click",function(event){
      UserInfo.redPageIndex = UserInfo.redPageIndex + 1;
      var memberid = localStorage.memberid;
      var redBagParameters = {
        "Parameters": "{\"MemberId\":\"" + memberid + "\",\"PageIndex\":\"" + UserInfo.redPageIndex + "\",\"PageSize\":\"" + UserInfo.redPageSize + "\"}",
        "ForeEndType": 3,
        "Code": "70100032"
      }

      vlm.loadJson("", JSON.stringify(redBagParameters), moreRedCallback,"","",true);
    });
  }
}

function mycallback(ret) {
  var myJson = ret;
  console.log(myJson);
  if (myJson.success) {
    var user_name = $("#user_name")[0];
    var user_sex = $("#user_sex")[0];
    var userIcon = $("#userIcon")[0];
    user_name.innerHTML = myJson.data[0].nickName;
    localStorage.sex = myJson.data[0].salutation;
    localStorage.email = myJson.data[0].emailAddress;
    if (myJson.data[0].bigHeadImageUrl) {
      userIcon.src = myJson.data[0].bigHeadImageUrl;
    } else {
      userIcon.src = "../images/user/photo-man.png";
    }
    if (myJson.data[0].nickName == '') {
      user_name.innerHTML = '点击头像设置个人资料';
    } else {
      if (myJson.data[0].salutation == "26") {
        user_sex.className = "icon_person open-sexm";
      } else {
        user_sex.className = "icon_person open-sexw";
      }
    }
  }
}

//登录之后点击全部订单的链接会改变
(function () {
  document.querySelector('.my-order').onclick = function () {
    //去除登录
    //if(localStorage.getItem('login') == 1)
    //{
    //    this.href='user-allorder.html';
    //}else{
    //    this.href="user-login.html?allorder";
    //}
    this.href = 'user-allorder.html';
  };


  document.querySelector('#common-msg').onclick = function () {

    if (localStorage.getItem('login') == 1) {
      this.href = 'user-oftenInfo.html';
    } else {
      this.href = "user-login.html?oftenInfo";
    }
  };

  document.querySelector('#unloginShow').onclick = function () {
    if (localStorage.getItem('login') == 1) {
      this.href = 'user-perInfo.html';
    }
  };


})();

$('#about_at').click(function () {
  $('#link_about_us').show();
  $("#shade")[0].style.display = "none";
  $('#close_page_aboutus').click(function () {
    $('#link_about_us').hide();
    $("#shade")[0].style.display = "block";
  });
});
//设置里的消息开关
//function ifOpen(){
//  var b = window.event.srcElement;
//  if(b.className == "icon set_chose1"){
//    b.className = "icon set_chose2";
//  }else{
//    b.className = "icon set_chose1";
//  }
//}

//电话
$('.service_tel').click(function () {
  $('.jpop_box_tic').show();
});
$('.jpop_box_tic span,.jpop_box_tic a').click(function () {
  $('.jpop_box_tic').hide();
})

//关于亚程旅游
$('#atIntroduce').click(function () {
  $('#link_at').show();
  $("#shade")[0].style.display = "none";
  $('#close_page_at').click(function () {
    $('#link_at').hide();
  });
});

//协议及声明
$('#atDeclaration').click(function () {
  $('#link_declaration').show();
  $("#shade")[0].style.display = "none";
  $('#close_page_de').click(function () {
    $('#link_declaration').hide();
  });
});

//红包
$('#myRed').click(function () {
  $('#link_redBag').show();
  $("#shade").hide();
  $('#link_redBag .header_back').click(function () {
    $('#link_redBag').hide();
    $("#shade").show();
  });
});


