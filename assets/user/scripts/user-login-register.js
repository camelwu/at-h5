/**
 * Created by changlv on 2016/1/7.
 */
var phone_verify = $('#find_verify')[0],
  phone_reg = $('#get_code')[0],
  login_activeBflag = false,
  regBflag_t = false,
  Bflag_forget = false,
  urlobj = vlm.parseUrlPara(window.location.href, true),
  get_code_login = $('#cellCodefind_verify')[0],
  timer_fogot,
  timer_register,
  timer_active;
  vlm.init();
window.onload = function () {
  var phone_login = $("#phone_login")[0],
    cellCode_login = $("#cellCode_login")[0],
    phone = $("#phone")[0],
    change_cellCode = $("#change_cellCode")[0],
    header_phone = $("#header_phone")[0],
    phone_register = $("#phone_register")[0],
    register = $("#register")[0],
    close_register = $("#close_register")[0],
    register_btn = $("#register_btn")[0],
    login_btn = $("#login_btn")[0],
    find_title = $("#find_title")[0],
    cha_phone = $("#cha_phone")[0],
    phone_find = $("#phone_find")[0],
    p_password = $("#p_password")[0],
    e_password = $("#e_password")[0],
    r_phone = $("#r_phone")[0],
    r_p_password = $("#r_p_password")[0],
    r_e_password = $("#r_e_password")[0],
    r_email = $("#r_email")[0],
    verify = $("#verify")[0],
    get_code = $("#get_code")[0],
    findkey_btn = $("#findkey_btn")[0];
  ;

  //图片验证码点击图片时更新
  function clickGetCaptcha() {
    //动态登录
    $('.captcha_img').on("click", function (event) {
      if (login_activeBflag) {
        return;
      }
      var target = $(event.target);
      getCaptchaCode(function (result) {
        if (result.success) {
          var imageNo = result.data.imageNo;
          var imageUrl = result.data.imageUrl;
          target.attr("data-imageno", imageNo);
          target.attr("src", imageUrl);
        }
      });
    });

    //注册
    $('.captcha_img_reg').on("click", function (event) {
      console.log(regBflag_t);
      if (regBflag_t) {
        return;
      }
      var target = $(event.target);
      getCaptchaCode(function (result) {
        if (result.success) {
          var imageNo = result.data.imageNo;
          var imageUrl = result.data.imageUrl;
          target.attr("data-imageno", imageNo);
          target.attr("src", imageUrl);
        }
      });
    });

    //忘记密码
    $('.fk_captcha').on("click", function (event) {
      var target = $(event.target);
      getCaptchaCode(function (result) {
        if (result.success) {
          var imageNo = result.data.imageNo;
          var imageUrl = result.data.imageUrl;
          target.attr("data-imageno", imageNo);
          target.attr("src", imageUrl);
        }
      });
    });
  }

  clickGetCaptcha();

  //亚程账户动态码登录切换
  $('.login_tab_wrap >div').click(function () {
    if ($(this).find('span').attr('id') == 'change_cellCode') {
      if ($(this).hasClass('active')) {
        return;
      }
      if($('#cellCode_phone_veri').val() == ''){
        $('#login_btn').css({
          backgroundColor: 'transparent',
          color: '#fff'
        });
      }else{
        $('#login_btn').css({
          backgroundColor: '#fff',
          color: '#666'
        });
      }
      getCaptchaCode(function (result) {
        var imgEle = $("#cellCode_login img");
        if (result.success) {
          var imageUrl = result.data.imageUrl;
          var imageNo = result.data.imageNo;
          imgEle.attr('src', imageUrl);
          imgEle.attr('data-imageno', imageNo);
        }
      });
    }else{
      if($('#p_password').val() == ''){
        $('#login_btn').css({
          backgroundColor: 'transparent',
          color: '#fff'
        });
      }else{
        $('#login_btn').css({
          backgroundColor: '#fff',
          color: '#666'
        });
      }
    }
    $(this).addClass('active').siblings('div').removeClass('active');
    $('.login_tab_content >div').eq($(this).index()).show().siblings().hide();
  });

  //打开注册页面
  $('#register').click(function () {
    $("#register_page").show();
    $("#login_page").hide();
    getCaptchaCode(function (result) {
      var imgEle = $("#phone_register img");
      if (result.success) {
        var imageUrl = result.data.imageUrl;
        var imageNo = result.data.imageNo;
        imgEle.attr('src', imageUrl);
        imgEle.attr('data-imageno', imageNo);
      }
    });
  });

  //关闭注册页面
  $('#close_register').click(function () {
    $("#register_page").hide();
    $("#login_page").show();
    clearInterval(timer_register);
    $('#get_code').html('获取验证码').css('color', '#fff');
  });

  //验证input内容
  function check(type, num) {
    switch (type) {
      case "tel":
        return vlm.Utils.validate.mobileNo(num);
        break;
      case "email":
        return vlm.Utils.validate.email(num);
        break;
      case "pass":
        return vlm.Utils.validate.password(num);
        break;
      case "code":
        return vlm.Utils.validate.code(num);
        break;
      case "imgcode":
        return vlm.Utils.validate.imgcode(num);
        break;
      default:
        ;
    }
  };

  // 会员注册
  function user_register(obj) {
    obj.onclick = function () {
      var password = r_p_password, input = phone_register.getElementsByTagName('input');
      var phoneRegisterCaptcha = $("#phone_register .captcha"), phoneRegisterCaptchaImg = $("#phone_register img");
      if (!check(input[0].getAttribute('data-type'), input[0].value)) {
        jAlert("请输入有效手机号");
        return;
      }
      //图形验证码
      if (!check(input[1].getAttribute('data-type'), input[1].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (!check(input[2].getAttribute('data-type'), input[2].value)) {
        jAlert("请输入有效验证码");
        return;
      }
      if (!check(input[3].getAttribute('data-type'), input[3].value)) {
        jAlert("请输入6-18位密码");
        return;
      }
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"Password\":\"" + password.value + "\",\"Code\":\"" + verify.value + "\"}",
        "ForeEndType": 3,
        "Code": "0051"
      };
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_register);

    };
  }

  user_register(register_btn);

  // 会员登录
  function user_login(obj) {
    obj.onclick = function () {
      //账号密码登录
      var input;
      if ($("#yc_login").parent().hasClass('active')) {
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
        var Parameters = {
          "Parameters": "{\"CultureName\":\"\",\"Password\":\"" + login_pass.value + "\",\"Mobile\":\"" + phone.value + "\"}",
          "ForeEndType": 3,
          "Code": "0052"

        };
        //console.log(Parameters);
        vlm.loadJson("", JSON.stringify(Parameters), mycallback_login);

      } else {
        //动态密码登录
        login_pass = e_password;
        input = cellCode_login.getElementsByTagName('input');
        if (!check(input[0].getAttribute('data-type'), input[0].value)) {
          jAlert("请输入有效手机号");
          return;
        }
        //图形验证码
        if (!check(input[1].getAttribute('data-type'), input[1].value)) {
          jAlert("请输入正确的图形验证码");
          return;
        }
        if (!check(input[2].getAttribute('data-type'), input[2].value)) {
          jAlert("请输入正确的验证码");
          return;
        }
        var Parameters = {
          "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + input[0].value + "\",\"VerificationCode\":\"" + input[2].value + "\"}",
          "ForeEndType": 3,
          "Code": "70100020"
        };
        console.log(Parameters);
        vlm.loadJson("", JSON.stringify(Parameters), mycallback_login);
      }

    };
  }

  user_login(login_btn);

  //找回密码
  function findkey(obj) {
    obj.onclick = function () {
      var find_phone = $("#find_phone")[0], input = phone_find.getElementsByTagName('input');
      if (!check(input[0].getAttribute('data-type'), input[0].value)) {
        jAlert('请输入有效的手机号');
        return;
      }
      //图形验证码
      if (!check(input[1].getAttribute('data-type'), input[1].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (!check(input[2].getAttribute('data-type'), input[2].value)) {
        jAlert("请输入有效验证码");
        return;
      }
      if (!check(input[3].getAttribute('data-type'), input[3].value)) {
        jAlert("请输入6-18位密码");
        return;
      }
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + find_phone.value + "\",\"NewPassword\":\"" + input[3].value + "\",\"Code\":\"" + input[2].value + "\"}",
        "ForeEndType": 3,
        "Code": "0055"
      };
      console.log(Parameters);
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_findkey);
    };
  }

  findkey(findkey_btn);

  //获取动态登录验证码
  function get_verify_login(obj) {
    obj.onclick = function () {
      var r_phone = $("#cellCode_phone")[0];
      var phoneLoginCaptcha = $("#cellCode_login .captcha_img_text"), phoneLoginCaptchaImg = $("#cellCode_login img");
      if (!check(r_phone.getAttribute('data-type'), r_phone.value)) {
        jAlert("请输入有效的手机号");
        return;
      }
      //图形验证码
      if (!check($('.captcha_img_text')[0].getAttribute('data-type'), $('.captcha_img_text')[0].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (login_activeBflag) {
        return;
      }
      login_activeBflag = true;
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":5,\"ImageNo\":\"" + phoneLoginCaptchaImg.attr('data-imageno') + "\",\"InputCode\":\"" + phoneLoginCaptcha.val() + "\"}",
        "ForeEndType": 3,
        "Code": "0058"
      };
      console.log(Parameters);
      get_code_login.innerHTML = '60秒重发';
      get_code_login.style.color = '#ccc';
      timedown_login(60);
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_active_login, true, false, true);
    };
  }

  get_verify_login(get_code_login);

  //获取注册验证码
  function get_verify(obj) {
    obj.onclick = function () {
      var r_phone = $("#r_phone")[0];
      var phoneRegisterCaptcha = $("#phone_register .captcha"), phoneRegisterCaptchaImg = $("#phone_register img");
      if (!check(r_phone.getAttribute('data-type'), r_phone.value)) {
        jAlert("请输入有效的手机号");
        return;
      }
      //图形验证码
      if (!check($('#phone_register .captcha')[0].getAttribute('data-type'), $('#phone_register .captcha')[0].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (regBflag_t) {
        return;
      }
      regBflag_t = true;
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":1,\"ImageNo\":\"" + phoneRegisterCaptchaImg.attr('data-imageno') + "\",\"InputCode\":\"" + phoneRegisterCaptcha.val() + "\"}",
        "ForeEndType": 3,
        "Code": "0058"
      };
      console.log(Parameters);
      phone_reg.innerHTML = '60秒重发';
      phone_reg.style.color = '#ccc';
      timedown_reg(60);
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_verify,true,false,true);

    };
  }

  get_verify(get_code);


  //忘记密码获取验证码
  function get_fver(obj) {
    obj.onclick = function () {
      var find_phone = $("#find_phone")[0];
      var findPhoneCaptchaInput = $("#phone_find .captcha");
      var findPhoneCaptchaImg = $("#phone_find .fk_captcha");
      if (!check(find_phone.getAttribute('data-type'), find_phone.value)) {
        jAlert("请输入有效的手机号");
        return;
      }
      //图形验证码
      if (!check($('#phone_find .captcha')[0].getAttribute('data-type'), $('#phone_find .captcha')[0].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (Bflag_forget) {
        return;
      }
      Bflag_forget = true;
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + find_phone.value + "\",\"VerificationCodeType\":2,\"ImageNo\":\"" + findPhoneCaptchaImg.attr('data-imageno') + "\",\"InputCode\":\"" + findPhoneCaptchaInput.val() + "\"}",
        "ForeEndType": 3,
        "Code": "0058"
      };
      console.log(Parameters);
      phone_verify.innerHTML = '60秒重发';
      timedown_forget(60);
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_findver,true,false,true);
    };
  }

  get_fver(phone_verify);

};

/*输入密码登录按钮变化*/
function changeLoginButton(id1, id2) {

  $(id1).on('input propertychange', function () {
    if ($(id1).val() != '') {
      $(id2).css({
        backgroundColor: '#fff',
        color: '#666'
      });
    } else {
      $(id2).css({
        backgroundColor: 'transparent',
        color: '#fff'
      });
    }

  });
}

changeLoginButton('#p_password', '#login_btn');
changeLoginButton('#cellCode_phone_veri', '#login_btn');


//手机找回密码页面
$('.forgotkey').click(function () {
  $("#fkey_page").show();
  //获取图形验证码
  getCaptchaCode(function (result) {
    var phoneFindCaptcha = $("#fkey_page .fk_captcha");
    if (result.success) {
      var imageUrl = result.data.imageUrl;
      var imageNo = result.data.imageNo;
      phoneFindCaptcha.attr('src', imageUrl);
      phoneFindCaptcha.attr('data-imageno', imageNo);
    }
  });
});

//关闭手机找回密码页面
$('#findpass_close_btn').click(function () {
  $("#fkey_page").hide();
  clearInterval(timer_fogot)
  $('#find_verify').html('获取验证码');
});

function mycallback_register(ret) {
  var myJson = ret;
  if (myJson.success) {
    jAlert('注册成功', '', cb_register);
  } else {
    jAlert(myJson.message);
    clearInterval(timer_register);
    $('#get_code').html('获取验证码').css({'color': '#fff'});
    regBflag_t = false;
    $('.captcha').val('');
    $('#verify').val('');
    $('#r_p_password').val('');
    getCaptchaCode(function (result) {
      var imgEle = $(".captcha_img_reg");
      if (result.success) {
        var imageUrl = result.data.imageUrl;
        var imageNo = result.data.imageNo;
        imgEle.attr('src', imageUrl);
        imgEle.attr('data-imageno', imageNo);
      }
    });

  }
}

//注册成功，alert之后的回调函数
function cb_register() {
  var r_phone = $("#r_phone")[0], login_pass = $("#r_p_password")[0];
  var Parameters = {
    "Parameters": "{\"CultureName\":\"\",\"Password\":\"" + login_pass.value + "\",\"Mobile\":\"" + r_phone.value + "\"}",
    "ForeEndType": 3,
    "Code": "0052"
  };
  console.log(Parameters);
  vlm.loadJson("", JSON.stringify(Parameters), mycallback_login);
}

//登录回调函数
function mycallback_login(myJson) {
  if (myJson.success) {
    vlm.init();
    localStorage.email = myJson.data[0].email;
    localStorage.phone = myJson.data[0].mobile;
    localStorage.memberid = myJson.data[0].memberID;
    localStorage.setItem('login', 1);
    if (self != top) {
      if (urlobj["returnURL"]) {
        var str = vlm.getpara("returnURL"), pattern = new RegExp("[*]", "g");
        if (str.indexOf("*")) {
          str = str.replace(pattern, "&");
        }
        str = str.replace("@", "?");
        window.top.location.href = str;
      } else {
        var c = urlobj["callback"];
        c.replace("#", '');
        window.parent.eval(c + "()");
      }
      var ifrCilent = window.parent.document.getElementById("choiceAir");
      ifrCilent.parentNode.removeChild(ifrCilent);
    } else if (urlobj["returnURL"]) {
      window.top.location.href = urlobj["returnURL"];
    } else if (window.location.search == '?oftenInfo') {
      window.location.href = "user-oftenInfo.html";
    } else if (window.location.search == '?allorder') {
      window.location.href = "user-allorder.html";
    } else {
      window.location.href = "user-perInfo.html";
    }

  } else {
    if (myJson.message == 'Invalid password') {
      jAlert('密码错误，请重新输入');
    } else if (myJson.message == 'Invalid username or password.') {
      jAlert('用户名或密码错误');
    } else if (myJson.message == '无此用户的相关信息') {
      jAlert('未注册用户');
    } else {
      jAlert(myJson.message);
    }
    if (timer_active) {
      clearInterval(timer_active);
      $('#cellCodefind_verify').html('获取验证码').css({'color': '#fff'});
      login_activeBflag = false;
      $('.captcha_img_text').val('');
      $('#cellCode_phone_veri').val('');
      getCaptchaCode(function (result) {
        var imgEle = $("#cellCode_login img");
        if (result.success) {
          var imageUrl = result.data.imageUrl;
          var imageNo = result.data.imageNo;
          imgEle.attr('src', imageUrl);
          imgEle.attr('data-imageno', imageNo);
        }
      });
    }
  }
}

//获取图形验证码
function getCaptchaCode(callback) {
  var Parameters = {
    "Parameters": "{}",
    "ForeEndType": 3,
    "Code": "70100022"
  };
  console.log(Parameters);
  vlm.loadJson("", JSON.stringify(Parameters), callback, false, false, true);
}

//头部关闭
$('#login-reg-shut').click(function () {
  if (self != top) {
    var ifrCilent = window.parent.document.getElementById("choiceAir");
    ifrCilent.parentNode.removeChild(ifrCilent);
  } else if (urlobj["returnURL"]) {
    window.top.location.href = urlobj["returnURL"];
  } else {
    window.location.href = "user.html";
  }
});

//动态登录验证码回调
function mycallback_active_login(ret) {
  var verify_active = $("#cellCode_phone_veri")[0];
  var myJson = ret;
  console.log(myJson);
  if (myJson.success) {
    vlm.Utils.sendMobileCode(verify_active.value);
  } else {
    jAlert(myJson.message);
    clearInterval(timer_active);
    $('#cellCodefind_verify').html('获取验证码').css({'color': '#fff'});
    login_activeBflag = false;
  }
}

//注册验证码回调
function mycallback_verify(ret) {
  var verify = $("#verify")[0];
  var myJson = ret;
  console.log(myJson);
  if (myJson.success) {
    vlm.Utils.sendMobileCode(verify.value);
  } else {
    jAlert(myJson.message);
    clearInterval(timer_register);
    $('#get_code').html('获取验证码').css({'color': '#fff'});
    regBflag_t = false;
  }
}

function mycallback_findkey(ret) {
  var myJson = ret;
  //console.log(myJson);
  if (myJson.success) {
    jAlert('重置密码成功', '', call_pass);
  } else {
    jAlert('修改密码失败，请重试');
  }
}

function call_pass() {
  window.location.href = "user-login.html";
}

//忘记密码验证码回调
function mycallback_findver(ret) {
  var find_veri = $("#find_veri")[0];
  var myJson = ret;
  if (myJson.success) {
    vlm.Utils.sendMobileCode(find_veri.value);
  } else {
    jAlert(myJson.message);
  }
}

//登录和注册清除内容图标
function clearValue(id) {
  $(id).on('input propertychange focus', function () {
    if ($(id).val() == '') {
      $(this).parent().find('.login_clear').hide();
    } else {
      $(this).parent().find('.login_clear').show();
    }
  })

  $(id).parent().find('.login_clear').click(function () {
    $(this).hide();
    $(id).val('');
  });
}

clearValue('#phone');
clearValue('#p_password');
clearValue('#r_phone');
clearValue('#verify');
clearValue('#r_p_password');
clearValue('#cellCode_phone');
clearValue('#img_active_text');
clearValue('#cellCode_phone_veri');
clearValue('#reg_capture');

//忘记密码倒计时
function timedown_forget(seconds) {
  var lasttime = new Date();
  var newtime;
  timer_fogot = setInterval(function () {
    seconds--;
    if (Math.abs(new Date() - lasttime) >= 3000) {
      newtime = new Date();
      if (Math.ceil(60 - (newtime - lasttime) / 1000) < 1) {
        phone_verify.innerHTML = '获取验证码';
        clearInterval(timer_fogot);
        Bflag_forget = false;
        return;
      }
      phone_verify.innerHTML = Math.ceil(60 - (newtime - lasttime) / 1000) + '秒重发';
    } else {
      phone_verify.innerHTML = seconds + '秒重发';
    }
  }, 1000);
}

//注册倒计时
function timedown_reg(seconds) {
  var lasttime = new Date();
  var newtime;
  timer_register = setInterval(function () {
    seconds--;
    if (Math.abs(new Date() - lasttime) >= 3000) {
      newtime = new Date();
      if (Math.ceil(60 - (newtime - lasttime) / 1000) < 1) {
        phone_reg.innerHTML = '获取验证码';
        phone_reg.style.color = '#fff';
        clearInterval(timer_register);
        regBflag_t = false;
        return;
      }
      phone_reg.innerHTML = Math.ceil(60 - (newtime - lasttime) / 1000) + '秒重发';
      phone_reg.style.color = 'rgb(204,204,204)';
    } else {
      phone_reg.innerHTML = seconds + '秒重发';
      phone_reg.style.color = 'rgb(204,204,204)';
    }
  }, 1000);
}

//动态登录倒计时
function timedown_login(seconds) {
  var lasttime = new Date();
  var newtime;
  timer_active = setInterval(function () {
    seconds--;
    if (Math.abs(new Date() - lasttime) >= 3000) {
      newtime = new Date();
      if (Math.ceil(60 - (newtime - lasttime) / 1000) < 1) {
        get_code_login.innerHTML = '获取验证码';
        get_code_login.style.color = '#fff';
        clearInterval(timer_active);
        regBflag_t = false;
        return;
      }
      get_code_login.innerHTML = Math.ceil(60 - (newtime - lasttime) / 1000) + '秒重发';
      get_code_login.style.color = 'rgb(204,204,204)';
    } else {
      get_code_login.innerHTML = seconds + '秒重发';
      get_code_login.style.color = 'rgb(204,204,204)';
    }
  }, 1000);
}

