/**
 * Created by changlv on 2016/1/13.
 */


(function () {
  var infoJson;
  var u_phone;
  var u_email;
  var u_realname;
  var phoneBflag = false;
  var r_phone = $('#phone_num')[0];
  var UserSex = localStorage.salutation;
  var phone_verify = $('#phone_ver')[0];

  //获取图形验证码
  function getCaptchaCode(callback) {
    var Parameters = {
      "Parameters": "{}",
      "ForeEndType": 3,
      "Code": "70100022"
    };

    console.log(Parameters);
    vlm.loadJson("", JSON.stringify(Parameters), callback,true,false,true);
  }

  function updateCaptchaCode(targetImgeSelector){
    var imageEle = targetImgeSelector ? $(targetImgeSelector) : $("#phoneverify .fk_captcha");
    getCaptchaCode(function(result){
      if(result.success){
        var imageNo = result.data.imageNo;
        var imageUrl = result.data.imageUrl;
        imageEle.attr("src",imageUrl).attr("data-imageno",imageNo);
      }
    });
  }

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
    var a_phone = $("#a_phone")[0];
    var a_email = $("#a_email")[0];
    var a_key = $("#a_key")[0];
    var changename = $("#changename")[0];
    var fillname = $("#fillname")[0];
    var phoneverify = $("#phoneverify")[0];
    var useremail = $("#useremail")[0];
    var amendkey = $("#amendkey")[0];
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
    //  是否显示密码
    function ifShowkey(obj) {
      obj.click(function () {
        var input;
        if (obj.find('b').attr('class') == "show_key") {
          obj.find('b').attr('class', 'show_keys');
          input = document.getElementById("keyForm").getElementsByTagName("input");
          for (var i = 0; i < input.length; i++) {
            input[i].type = "text";
          }
        } else {
          obj.find('b').attr('class', 'show_key');
          input = document.getElementById("keyForm").getElementsByTagName("input");
          for (var j = 0; j < input.length; j++) {
            input[j].type = "password";
          }
        }
      });
    }

    var showkey = $('.showkey_tab');
    ifShowkey(showkey);
    //  点击链接页面跳转
    function amendInfo(obj1, obj2, obj3) {
      obj1.onclick = function () {
        changename.style.display = "none";
        fillname.style.display = "none";
        phoneverify.style.display = "none";
        useremail.style.display = "none";
        amendkey.style.display = "none";
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
    amendInfo(a_phone, head[2], phoneverify);
    amendInfo(a_email, head[3], useremail);
    amendInfo(a_key, head[4], amendkey);

    $('#a_nick').click(function () {
      $('#amend_btn_0').hide();
      $('#amend_btn_1').hide();
      $('#amend_btn_2').hide();
    });

    $('#a_name').click(function () {
      $('#amend_btn_0').show().siblings('.f_btn').hide();
    });

    $('#a_phone').click(function () {
      $('#amend_btn_1').show().siblings('.f_btn').hide();
      getCaptchaCode(function(result){
        if(result.success){
          var imageNo = result.data.imageNo;
          var imageUrl = result.data.imageUrl;
          $("#phoneverify .fk_captcha").attr("src",imageUrl).attr("data-imageno",imageNo);
        }

      });

    });

    $('#a_email').click(function () {
      $('#amend_btn_2').show().siblings('.f_btn').hide();
    });

    $('#a_key').click(function () {
      $('#amend_btn_2').hide();
      $('#amend_btn_1').hide();
    });

    $("#phoneverify .fk_captcha").click(function(){
      updateCaptchaCode();
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
    //  验证输入
    var check = function (type, num) {
      if (type == "tel") {
        return vlm.Utils.validate.mobileNo(num);
      }
      if (type == "email") {
        return vlm.Utils.validate.email(num);
      }
      if (type == "pass") {
        return vlm.Utils.validate.password(num);
      }
    };
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

    //绑定新手机号
    function changeInfo_mobile(obj) {
      obj.onclick = function () {
        var oInputMobile = document.getElementById("infoForm").getElementsByClassName("mob_cell")[0];
        var oInputCode = document.getElementById("infoForm").getElementsByClassName("mob_code")[0];
        u_phone = oInputMobile.value;
        if (!check(oInputMobile.getAttribute('data-type'), oInputMobile.value)) {
          jAlert("输入不正确");
          return;
        }

        if (localStorage.phone != "") {
          if (oInputMobile.value == phone) {
            jAlert("用户已绑定信息不能修改");
            return;
          }
        }
        if (oInputCode.value == '') {
          jAlert('请输入验证码');
        }
        else {
          var Parameters = {
            "Parameters": "{\"MemberId\":\"" + memberid + "\",\"Mobile\":\"" + u_phone + "\"}",
            "ForeEndType": 3,
            "Code": "0056"
          };
          //console.log(Parameters);
          vlm.loadJson("", JSON.stringify(Parameters), mycallback_info);
        }
      }
    }

    changeInfo_mobile(amend_btn_1);

    //修改邮箱
    function changeInfo_email(obj) {
      obj.onclick = function () {

        var oInputEmail = document.getElementById("infoForm").getElementsByTagName("input")[3];
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

        }
        ;

      }
    }

    changeInfo_email(amend_btn_2);

    //  获取手机绑定验证码
    var phone_ver = $("#phone_ver")[0];

    function phone_veri(obj) {
      obj.onclick = function () {
        var oInputMobile = document.getElementById("infoForm").getElementsByClassName("mob_cell")[0];
        var oInputCode = document.getElementById("infoForm").getElementsByClassName("mob_code")[0];
        var verifyPhoneCaptchaImg = $('#phoneverify .fk_captcha');
        var verifyPhoneCaptchaInput = $('#phoneverify .captcha');
        if (!check(oInputMobile.getAttribute('data-type'), oInputMobile.value)) {
          jAlert("输入正确的手机号");
          return;
        }
        if(!verifyPhoneCaptchaInput.val()){
          jAlert("请输入图形验证码");
          return;
        }
        if (localStorage.phone != "") {
          if (oInputMobile.value == phone) {
            jAlert("用户已绑定信息不能修改");
            return;
          }
        }
        if (phoneBflag) {
          return;
        }

        var Parameters = {
          "Parameters": "{\"CultureName\":\"\",\"Mobile\":\"" + r_phone.value + "\",\"VerificationCodeType\":4,\"ImageNo\":\"" + verifyPhoneCaptchaImg.attr('data-imageno') + "\",\"InputCode\":\"" + verifyPhoneCaptchaInput.val() + "\"}",
          "ForeEndType": 3,
          "Code": "0058"
        };
        console.log(Parameters.Parameters);
        $('#preloader').remove();

        vlm.loadJson("", JSON.stringify(Parameters), mycallback_phoneVeri);
      }
    }

    phone_veri(phone_ver);

    //  修改密码
    var newkey_btn = $("#newkey_btn")[0];

    function changeKey(obj) {
      obj.onclick = function () {
        var input = document.getElementById("keyForm").getElementsByTagName("input");
        for (var i = 0; i < input.length; i++) {
          if (input[i].type != "button" && input[i].value != "") {
            if (!check(input[i].getAttribute('data-type'), input[i].value)) {
              jAlert("输入不正确");
              return;
            }
            if (input[1].value != input[2].value) {
              jAlert("两次密码输入不一致");
              return;
            } else if (input[0].value == input[1].value && input[0].value == input[2].value) {
              jAlert("新密码与旧密码相同");
              return;
            }
          }
        }

        var Parameters = {
          "Parameters": "{\"CultureName\":492189,\"MemberID\":\"" + memberid + "\",\"NewPassword\":\"" + input[1].value + "\",\"Password\":\"" + input[0].value + "\"}",
          "ForeEndType": 3,
          "Code": "0054"
        };

        console.log(Parameters);
        vlm.loadJson("", JSON.stringify(Parameters), mycallback_newKey);
      }
    }

    changeKey(newkey_btn);

  }

  u_perInfo();
  //修改出生日期
  $('#birth-cont-per').click(function () {
    setTimeout(function () {
      var oPerBack = $('.cabin-sure');

      function selDate(obj) {
        obj.on('click', show)
      }

      function show() {
        var box = $('.sel-time .date-selected'), i = 0, len = box.length, opeater = document.getElementById("opeater"), arr = [];
        var ele = document.getElementById('' + opeater.getAttribute("data-id"));
        for (; i < len; i++) {
          arr.push(box[i].innerHTML);
        }
        var birthstr = arr.join("").replace('年', '-').replace('月', '-').replace('号', '').replace('日', '');
        //console.log(birthstr);
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

      selDate(oPerBack);
    }, 1000)

  })

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
    if (infoJson.data == null) {
      nickname.innerHTML = '';
      name.value = '';
    }
    else {
      var datecache = infoJson.data[0].dateOfBirth.substring(0, 10);
      var datearr = datecache.split('-');
      //console.log(datearr);
      if (datearr[1].charAt(0) == 0 && datearr[2].charAt(0) == 0) {

        datecache = datearr[0] + '年-' + datearr[1].charAt(1) + '月-' + datearr[2].charAt(1) + '日';
      } else if (datearr[1].charAt(0) == 0 && datearr[2].charAt(0) != 0) {

        datecache = datearr[0] + '年-' + datearr[1].charAt(1) + '月-' + datearr[2] + '日';
      } else if (datearr[1].charAt(0) != 0 && datearr[2].charAt(0) == 0) {

        datecache = datearr[0] + '年-' + datearr[1] + '月-' + datearr[2].charAt(1) + '日';
      } else {
        datecache = datearr[0] + '年-' + datearr[1] + '月-' + datearr[2] + '日';
      }
      name.value = nickname.innerHTML = infoJson.data[0].nickName;
      $('#hostname')[0].innerHTML = realName.value = infoJson.data[0].firstName;
      birthCont.innerHTML = infoJson.data[0].dateOfBirth.substring(0, 10);
      birthCont.setAttribute('data-cache', datecache);
      $('#hostmobile')[0].innerHTML = user_phone.value = infoJson.data[0].mobileNo;
      $('#hostemail')[0].innerHTML = infoJson.data[0].emailAddress;
      if (infoJson.data[0].salutation == 26) {
        $('#sex').children().eq(0).attr('class', 'per_man sex_act');
        $('#sex').children().eq(1).attr('class', 'per_man');
      } else {
        $('#sex').children().eq(0).attr('class', 'per_man');
        $('#sex').children().eq(1).attr('class', 'per_man sex_act');
      }
    }

    user_email.value = localStorage.email;
    memberid = localStorage.memberid;
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
      updateCaptchaCode();
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
      phoneBflag = true;
      phone_verify.style.width = '2.4rem';
      phone_verify.innerHTML = '<span style="color: rgb(204,204,204)">60秒重新发送</span>';
      timedown_regcy(60);
      vlm.Utils.sendMobileCode(phone_ver.value);
    } else {
      updateCaptchaCode();
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


  //时间倒计时结束后
  function timedown_regcy(seconds) {
    var lasttime = new Date();
    var newtime;
    var timer = setInterval(function () {
      seconds--;
      if (Math.abs(new Date() - lasttime) >= 3000) {
        newtime = new Date();
        if (Math.ceil(seconds - (newtime - lasttime) / 1000) < 1) {
          phone_verify.innerHTML = '发送验证码';
          clearInterval(timer);
          phoneBflag = false;
          return;
        }
        phone_verify.innerHTML = Math.ceil(seconds - (newtime - lasttime) / 1000) + '秒重新发送';
      } else {
        phone_verify.innerHTML = seconds + '秒重新发送';
      }
    }, 1000);
  }


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
  new Scroller({id: "birth-cont-per", type: "birth", cont: "ppp"});
//解决safari放回页面错误问题
//  $("#header").on("click",function(){
//    window.location.href = 'user.html';
//  })
})();

