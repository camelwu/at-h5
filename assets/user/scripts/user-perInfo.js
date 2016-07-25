/**
 * Created by changlv on 2016/1/13.
 */

(function () {
  var infoJson,
    u_phone,
    u_email,
    u_realname,
    Bflag_modify = false,
    timer_modify=null,
    r_phone = $('#phone_num')[0],
    UserSex = localStorage.salutation,
    phone_verify = $('#phone_ver')[0];

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

  //图片验证码点击图片时更新
  function clickGetCaptcha() {
    //修改密码图片验证码
    $('.fk_captcha_modify').on("click", function (event) {
      if(Bflag_modify){
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
  }

  clickGetCaptcha();

  function u_perInfo() {
    var email = localStorage.email;
    var phone = localStorage.phone;
    var memberid = localStorage.memberid;

    var Parameters = {
      "Parameters": "{\"MemberId\":\"" + memberid + "\"}",
      "ForeEndType": 3,
      "Code": "0053"
    }
    console.log(Parameters);
    vlm.loadJson("", JSON.stringify(Parameters), mycallback);

    var close_page = $("#close_page")[0];
    var amend_info = $("#amend_info")[0];
    var title = $("#title")[0];
    var info_content = $("#info_content")[0];
    var a_nick = $("#a_nick")[0];
    var a_name = $("#a_name")[0];
    var modify_password = $("#modify_password")[0];
    var a_email = $("#a_email")[0];
    var a_key = $("#a_key")[0];
    var changename = $("#changename")[0];
    var fillname = $("#fillname")[0];
    var modify_pass = $("#modify_pass")[0];
    var useremail = $("#useremail")[0];
    var sex = $("#sex")[0];
    var ifshowkey = $("#ifshowkey")[0];
    var array = title.innerHTML;
    var head = array.split("/");
    var header = $("#header")[0];

    function closeAmend(obj) {
      obj.onclick = function () {
        amend_info.style.display = "none";
        header.style.display = "block";
      }
    }

    closeAmend(close_page);

    //  点击链接页面跳转
    function amendInfo(obj1, obj2, obj3) {
      obj1.onclick = function () {
        changename.style.display = "none";
        fillname.style.display = "none";
        modify_pass.style.display = "none";
        useremail.style.display = "none";
        header.style.display = "none";
        if (obj1 == a_nick || obj1 == a_key) {
          amend_btn.style.display = "none";
        } else {
          amend_btn.style.display = "block";
        }
        title.innerHTML = obj2;
        obj3.style.display = "block";
        amend_info.style.display = "block";
      }
    }

    amendInfo(a_nick, head[0], changename);
    amendInfo(a_name, head[1], fillname);
    amendInfo(modify_password, head[2], modify_pass);
    amendInfo(a_email, head[3], useremail);

    $('#a_nick').click(function () {
      $('#amend_btn_0').hide();
      $('#amend_btn_1').hide();
      $('#amend_btn_2').hide();
    });

    $('#a_name').click(function () {
      $('#amend_btn_0').show().siblings('.f_btns').hide();
    });

    $('#modify_password').click(function () {
      $('#amend_btn_1').show().siblings('.f_btns').hide();
      getCaptchaCode(function (result) {
        var imgEle = $("#modify_pass img");
        if (result.success) {
          var imageUrl = result.data.imageUrl;
          var imageNo = result.data.imageNo;
          imgEle.attr('src', imageUrl);
          imgEle.attr('data-imageno', imageNo);
        }
      });
    });

    $('#a_email').click(function () {
      $('#amend_btn_2').show().siblings('.f_btns').hide();
    });

    //  性别选择
    function changeSex(obj) {
      obj.click(function (e) {
        if (e.target.getAttribute('id') == "man" && e.target.className == "per_man") {
          oSex.children().eq(0).addClass('sex_act');
          oSex.children().eq(1).removeClass('sex_act');
          UserSex = 26;
          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"Salutation\":\"" + UserSex + "\"}",
            "ForeEndType": 3,
            "Code": "0056"
          };
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_sex);
        } else if (e.target.getAttribute('id') == "woman" && e.target.className == "per_man") {
          oSex.children().eq(0).removeClass('sex_act');
          oSex.children().eq(1).addClass('sex_act');
          UserSex = 27;
          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"Salutation\":\"" + UserSex + "\"}",
            "ForeEndType": 3,
            "Code": "0056"
          };
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_sex);
        }
      });
    }

    var oSex = $('#sex');
    changeSex(oSex);
    //  修改昵称
    var nick_btn = $("#nick_btn")[0];

    function amendNick(obj) {
      obj.onclick = function () {
        var input = document.getElementById("nickForm").getElementsByTagName("input");
        input[0].value = input[0].value.replace(/^\s*/, '');
        var oNickname = input[0].value;
        console.log(oNickname);
        if (vlm.Utils.validate.nickName(oNickname)) {
          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"NickName\":\"" + input[0].value + "\"}",
            "ForeEndType": 3,
            "Code": "0059"
          };
          console.log(Parameters);
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_nick);
        }
        else {
          jAlert('昵称需要由4-20个字符，可由中英文字母，数字、"_"组成，不能以"_"开头');
        }
      }
    }

    amendNick(nick_btn);

    //修改信息
    var amend_btn = $("#amend_btn_0")[0];
    var amend_btn_1 = $("#amend_btn_1")[0];
    var amend_btn_2 = $("#amend_btn_2")[0];
    //修改姓名
    function changeInfo_name(obj) {
      obj.onclick = function () {
        var oInputName = document.getElementById("realName");
        oInputName.value = oInputName.value.replace(/^\s*/, '');
        u_realname = oInputName.value;
        if (vlm.Utils.validate.chiName(u_realname)) {
          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"CultureName\":\"\",\"FirstName\":\"" + u_realname + "\",\"Salutation\":\"" + UserSex + "\"}",
            "ForeEndType": 3,
            "Code": "0056"
          };
          console.log(Parameters);
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_info);
        }
        else {
          jAlert('请输入正确的姓名');
        }
      }
    }

    changeInfo_name(amend_btn);

    //修改邮箱
    function changeInfo_email(obj) {
      obj.onclick = function () {
        var oInputEmail = document.querySelector("#infoForm").querySelector('#email');
        u_email = oInputEmail.value;
        if (oInputEmail.value != "") {
          if (oInputEmail.getAttribute('data-type') != "code") {
            if (!check(oInputEmail.getAttribute('data-type'), oInputEmail.value)) {
              jAlert("输入不正确");
              return;
            }
          }
          if (localStorage.email != "") {
            if (oInputEmail.value == email) {
              jAlert("用户已绑定信息不能修改");
              return;
            }
          }

          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"Email\":\"" + u_email + "\"}",
            "ForeEndType": 3,
            "Code": "0056"
          };
          //console.log(Parameters);
          $('#preloader').remove();
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_infoemail);
        };
      }
    }

    changeInfo_email(amend_btn_2);

    //  修改密码
    var modify_pass_btn = $("#amend_btn_1")[0];

    function changeKey(obj) {
      obj.onclick = function () {
        var input = document.getElementById("modify_pass").getElementsByTagName("input");
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
          "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + input[0].value + "\",\"NewPassword\":\"" + input[3].value + "\",\"Code\":\"" + input[2].value + "\"}",
          "ForeEndType": 3,
          "Code": "0054"
        };

        console.log(Parameters);
        vlm.loadJson("", JSON.stringify(Parameters), mycallback_newKey);
      }
    }

    changeKey(modify_pass_btn);

  }

  u_perInfo();

  function birthVerify() {
    var box = $('.picker_items_col_wrapper .picker_selected'), i = 0, len = box.length, opeater = document.getElementById("opeater"), arr = [];
    for (; i < len; i++) {
      arr.push(box[i].innerHTML);
    }
    var birthstr = arr.join("").replace('年', '-').replace('月', '-').replace('号', '').replace('日', '');
    if (!vlm.Utils.compareBirth(birthstr)) {
      jAlert('您选择的出生日期大于当前日期');
      return;
    }
    var Parameters = {
      "Parameters": "{\"MemberId\":\"" + memberid + "\",\"DOB\":\"" + birthstr + "\"}",
      "ForeEndType": 3,
      "Code": "0056"
    };
    console.log(Parameters);
    vlm.loadJson("", JSON.stringify(Parameters), mycallback_birth);
  }

  //修改密码获取验证码
  function modify_pass(obj) {
    obj.onclick = function () {
      var phone_num = $("#phone_num")[0];
      var findPhoneCaptchaInput = $(".captcha_modify");
      var findPhoneCaptchaImg = $(".fk_captcha_modify");
      if (!check(phone_num.getAttribute('data-type'), phone_num.value)) {
        jAlert("请输入有效的手机号");
        return;
      }
      //图形验证码
      if (!check($('.captcha_modify')[0].getAttribute('data-type'), $('.captcha_modify')[0].value)) {
        jAlert("请输入正确的图形验证码");
        return;
      }
      if (Bflag_modify) {
        return;
      }
      Bflag_modify = true;
      var Parameters = {
        "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + phone_num.value + "\",\"VerificationCodeType\":3,\"ImageNo\":\"" + findPhoneCaptchaImg.attr('data-imageno') + "\",\"InputCode\":\"" + findPhoneCaptchaInput.val() + "\"}",
        "ForeEndType": 3,
        "Code": "0058"
      };
      console.log(Parameters);
      phone_verify.innerHTML = '60秒重发';
      timedown_modify(60);
      vlm.loadJson("", JSON.stringify(Parameters), mycallback_modify_code);
    };
  }

  modify_pass(phone_verify);

  //找回密码验证码回调
  function mycallback_modify_code(ret) {
    var find_modify = $(".captcha_modify")[0];
    var myJson = ret;
    if (myJson.success) {
      vlm.Utils.sendMobileCode(find_modify.value);
    } else {
      jAlert(myJson.message);
      clearInterval(timer_modify);
      $('#phone_ver').html('获取验证码').css({'color': '#fff'});
      Bflag_modify = false;
      $('.captcha_modify').val('');
      $('.mob_code').val('');
      $('#phone_pass_new').val('');
      getCaptchaCode(function (result) {
        var imgEle = $(".fk_captcha_modify");
        if (result.success) {
          var imageUrl = result.data.imageUrl;
          var imageNo = result.data.imageNo;
          imgEle.attr('src', imageUrl);
          imgEle.attr('data-imageno', imageNo);
        }
      });
    }
  }

  //修改密码倒计时
  function timedown_modify(seconds) {
    var lasttime = new Date();
    var newtime;
    timer_modify = setInterval(function () {
      seconds--;
      if (Math.abs(new Date() - lasttime) >= 3000) {
        newtime = new Date();
        if (Math.ceil(60 - (newtime - lasttime) / 1000) < 1) {
          phone_verify.innerHTML = '获取验证码';
          clearInterval(timer_modify);
          Bflag_modify = false;
          return;
        }
        phone_verify.innerHTML = Math.ceil(60 - (newtime - lasttime) / 1000) + '秒重发';
      } else {
        phone_verify.innerHTML = seconds + '秒重发';
      }
    }, 1000);
  }

  //修改出生日期回调
  function mycallback_birth(ret) {
    var myJson = ret;
    //console.log(myJson.data[0].dateOfBirth);
    if (myJson.success) {
      jAlert('修改成功');
    } else {
      jAlert('修改失败');
    }
  }

  function mycallback(ret) {
    infoJson = ret;
    console.log(infoJson);
    var nickname = $("#nickname")[0];
    var name = $("#name")[0];
    var realName = $("#realName")[0];
    var user_email = $("#email")[0];
    var user_phone = $("#phone_num")[0];
    var sex = $("#sex")[0];
    var userIcon = $("#userIcon")[0];
    var birthCont = $('#birth-cont-per')[0];
    if (infoJson.success) {
      if (infoJson.data == null) {
        nickname.innerHTML = '';
        name.value = '';
      } else {
        var datecache = infoJson.data[0].dateOfBirth.substring(0, 10);
        var datearr = datecache.split('-');
        //console.log(datearr);
        if (datearr[1].charAt(0) == 0 && datearr[2].charAt(0) == 0) {

          datecache = datearr[0] + '年,' + datearr[1].charAt(1) + '月,' + datearr[2].charAt(1) + '日';
        } else if (datearr[1].charAt(0) == 0 && datearr[2].charAt(0) != 0) {

          datecache = datearr[0] + '年,' + datearr[1].charAt(1) + '月,' + datearr[2] + '日';
        } else if (datearr[1].charAt(0) != 0 && datearr[2].charAt(0) == 0) {

          datecache = datearr[0] + '年,' + datearr[1] + '月,' + datearr[2].charAt(1) + '日';
        } else {
          datecache = datearr[0] + '年,' + datearr[1] + '月,' + datearr[2] + '日';
        }

        if (infoJson.data[0].nickName != " ") {
          name.value = nickname.innerHTML = infoJson.data[0].nickName;
        }

        if (infoJson.data[0].firstName != " ") {
          $('#hostname')[0].innerHTML = realName.value = infoJson.data[0].firstName;
        }

        birthCont.innerHTML = infoJson.data[0].dateOfBirth.substring(0, 10);
        birthCont.setAttribute('data-selected', datecache);
        $('#hostmobile')[0].innerHTML = user_phone.value = infoJson.data[0].mobileNo;
        if (infoJson.data[0].salutation == 26) {
          $('#sex').children().eq(0).attr('class', 'per_man sex_act');
          $('#sex').children().eq(1).attr('class', 'per_man');
        } else {
          $('#sex').children().eq(0).attr('class', 'per_man');
          $('#sex').children().eq(1).attr('class', 'per_man sex_act');
        }
      }
      memberid = localStorage.memberid;
    } else {
      jAlert(infoJson.message);
    }
  }

  function mycallback_nick(ret) {
    var myJson = ret;
    //console.log(myJson);
    if (myJson.success) {
      window.location.href = "user-perInfo.html";
      document.getElementById("nickForm").submit();
    } else {
      jAlert(myJson.message);
    }
  }

  function mycallback_info(ret) {
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
      localStorage.realname = u_realname;
      localStorage.phone = u_phone;
      //console.log(localStorage);
      document.getElementById("infoForm").submit();
    } else {
      jAlert(myJson.message);
    }
  }

  function mycallback_infoemail(ret) {
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
      localStorage.email = u_email;
      document.getElementById("infoForm").submit();
    } else {
      jAlert(myJson.message);
    }
  }

  //性别回调
  function mycallback_sex(ret) {
    var myJson = ret;
    console.log(myJson.data[0].salutation);
    if (myJson.success) {
      if (myJson.data[0].salutation == 26) {
        $('#userIcon').attr('src', '../images/user/photo-man.png');
      } else {
        $('#userIcon').attr('src', '../images/user/photo-man.png');
      }
      jAlert('修改成功');
    } else {
      jAlert('修改失败');
    }
  }

  function mycallback_phoneVeri(ret) {
    var phone_ver = $("#phone_ver")[0];
    console.log(ret);
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
      vlm.Utils.sendMobileCode(phone_ver.value);
    } else {
      jAlert(myJson.message);
    }
  }

  function mycallback_newKey(ret) {
    var myJson = ret;
    console.log(myJson);
    if (myJson.success) {
      jAlert('修改成功', '', cb_modify);
    } else {
      jAlert(myJson.message);
    }
  }

  function cb_modify() {
    document.getElementById("keyForm").submit();
  }

  /*退出账户清除localStorage*/
  $('.info_quit').click(function () {
    jConfirm("确认退出当前帐号?", "", logout);
    function logout(arg) {
      if (arg) {
        localStorage.removeItem('memberid');
        localStorage.removeItem('login');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        window.location.href = 'user.html';
      }

    }
  });

  //清除昵称输入内容
  function clearValue(id) {
    $(id).on('input propertychange focus', function () {
      if ($(id).val() == '') {
        $(this).parent().find('.name_close').hide();
      } else {
        $(this).parent().find('.name_close').show();
      }
    })

    $(id).parent().find('.name_close').click(function () {
      $(this).hide();
      $(id).val('');
    });
  }

  clearValue('#name');
  clearValue('#realName');

  //个人信息修改页生日
  var myDate = new ATplugins.Picker({
    input: "#birth-cont-per",
    type: "date",
    value: ['1990年', '1月', '1日'],
    cont: "ppp",
    callback: birthVerify
  });

  //获取图形验证码
  function getCaptchaCode(callback) {
    var Parameters = {
      "Parameters": "{}",
      "ForeEndType": 3,
      "Code": "70100022"
    };
    console.log(Parameters);
    vlm.loadJson("", JSON.stringify(Parameters), callback, true, false, true);
  }

//解决safari放回页面错误问题
//  $("#header").on("click",function(){
//    window.location.href = 'user.html';
//  })
})();

