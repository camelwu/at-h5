/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
function show_keypage(){var a=$("#fkey_page")[0];a.style.display="block","none"==$("#email_login").css("display")?($("#phone_find").show(),$("#email_find").hide(),$("#cha_email").show().html("邮箱找回"),$("#cha_phone").hide(),$("#find_title").html("手机找回")):($("#email_find").show(),$("#phone_find").hide(),$("#cha_phone").show().html("手机找回"),$("#cha_email").hide(),$("#find_title").html("邮箱找回"))}function close_keypage(){var a=$("#fkey_page")[0];a.style.display="none"}function mycallback_register(a){var b=a;b.success?jAlert("注册成功","",cb_register):jAlert(b.message)}function cb_register(){var a=$("#r_email")[0],b=$("#r_phone")[0];if("none"==$("#phone_register").css("display"))var c=$("#r_e_password")[0];else var c=$("#r_p_password")[0];var d={Parameters:'{"CultureName":"","Email":"'+a.value+'","Password":"'+c.value+'","Mobile":"'+b.value+'"}',ForeEndType:3,Code:"0052"};vlm.loadJson("",JSON.stringify(d),mycallback_login)}function mycallback_login(a){if(a.success)if(vlm.init(),localStorage.email=a.data[0].email,localStorage.phone=a.data[0].mobile,localStorage.memberid=a.data[0].memberID,localStorage.setItem("login",1),self!=top){if(urlobj.returnURL){var b=vlm.getpara("returnURL"),c=new RegExp("[*]","g");b.indexOf("*")&&(b=b.replace(c,"&")),b=b.replace("@","?"),window.top.location.href=b}else{var d=urlobj.callback;d.replace("#",""),window.parent.eval(d+"()")}var e=window.parent.document.getElementById("choiceAir");e.parentNode.removeChild(e)}else urlobj.returnURL?window.top.location.href=urlobj.returnURL:"?oftenInfo"==window.location.search?window.location.href="user-oftenInfo.html":"?allorder"==window.location.search?window.location.href="user-allorder.html":window.location.href="user-perInfo.html";else"Invalid password"==a.message?jAlert("密码错误，请重新输入"):"Invalid username or password."==a.message?jAlert("用户名或密码错误"):"无此用户的相关信息"==a.message?jAlert("未注册用户"):jAlert(a.message)}function mycallback_verify(a){var b=$("#verify")[0],c=a;c.success?vlm.Utils.sendMobileCode(b.value):jAlert(c.message)}function mycallback_findkey(a){var b=a;b.success?jAlert("重置密码成功","",call_pass):jAlert("修改密码失败，请重试")}function mycallback_findkey_email(a){var b=a;b.success?jAlert("已将重置密码的邮件发送到您的邮箱，请查收","",call_pass):jAlert(b.message)}function call_pass(){window.location.href="user-login.html"}function mycallback_findver(a){var b=$("#find_veri")[0],c=a;c.success?vlm.Utils.sendMobileCode(b.value):jAlert(c.message)}function clearValue(a){$(a).on("input propertychange focus",function(){""==$(a).val()?$(this).parent().find(".login-clear").hide():$(this).parent().find(".login-clear").show()}),$(a).parent().find(".login-clear").click(function(){$(this).hide(),$(a).val("")})}function timedown_forget(a){var b,c=new Date,d=setInterval(function(){if(a--,Math.abs(new Date-c)>=3e3){if(b=new Date,Math.ceil(120-(b-c)/1e3)<1)return phone_verify.innerHTML="发送验证码",phone_verify.style.color="#ffb413",clearInterval(d),void(Bflag_forget=!1);phone_verify.innerHTML=Math.ceil(120-(b-c)/1e3)+"秒重新发送",phone_verify.style.color="rgb(204,204,204)"}else phone_verify.innerHTML=a+"秒重新发送",phone_verify.style.color="rgb(204,204,204)"},1e3)}function timedown_reg(a){var b,c=new Date,d=setInterval(function(){if(a--,Math.abs(new Date-c)>=3e3){if(b=new Date,Math.ceil(120-(b-c)/1e3)<1)return phone_reg.innerHTML="发送验证码",phone_reg.style.color="#fff",clearInterval(d),void(regBflag_t=!1);phone_reg.innerHTML=Math.ceil(120-(b-c)/1e3)+"秒重新发送",phone_reg.style.color="rgb(204,204,204)"}else phone_reg.innerHTML=a+"秒重新发送",phone_reg.style.color="rgb(204,204,204)"},1e3)}var newkey,phone_verify=$("#find_verify")[0],phone_reg=$("#get_code")[0],regBflag_t=!1,Bflag_forget=!1,urlobj=vlm.parseUrlPara(window.location.href,!0);vlm.init(),window.onload=function(){function a(a,b,c){a.onclick=function(){b.style.display="none",c.style.display="block"}}function b(a,b,c){a.onclick=function(){b.style.display="none",c.style.display="block"}}function c(a,b,c,d){a.onclick=function(){a.style.display="none",b.style.display="block",c.style.display="none",d.style.display="block"}}function d(a){a.onclick=function(){"邮箱找回"==z.innerHTML?(z.innerHTML="手机找回",A.style.display="block",A.innerHTML="邮箱找回",B.style.display="none",C.style.display="block",D.style.display="none"):"手机找回"==z.innerHTML&&(z.innerHTML="邮箱找回",A.style.display="none",B.style.display="block",B.innerHTML="手机找回",C.style.display="none",D.style.display="block")}}function e(a){a.onclick=function(){var a,b;if("none"==p.style.display){if(a=I,b=s.getElementsByTagName("input"),!M(b[0].getAttribute("data-type"),b[0].value))return void jAlert("请输入有效邮箱");if(!M(b[1].getAttribute("data-type"),b[1].value))return void jAlert("请输入6-18位密码");if(""==b[2].value)return void jAlert("请输入确认密码");if($("#rs_e_password").val()!==$("#r_e_password").val())return void jAlert("两次输入的密码不一致！");var c={Parameters:'{"CultureName":"","Email":"'+J.value+'","Password":"'+a.value+'"}',ForeEndType:3,Code:"0051"};vlm.loadJson("",JSON.stringify(c),mycallback_register)}else{if(a=H,b=r.getElementsByTagName("input"),!M(b[0].getAttribute("data-type"),b[0].value))return void jAlert("请输入有效手机号");if(!M(b[1].getAttribute("data-type"),b[1].value))return void jAlert("请输入有效验证码");if(!M(b[2].getAttribute("data-type"),b[0].value))return void jAlert("请输入6-18位密码");var c={Parameters:'{"CultureName":"","Mobile":"'+G.value+'","Password":"'+a.value+'","Code":"'+K.value+'"}',ForeEndType:3,Code:"0051"};vlm.loadJson("",JSON.stringify(c),mycallback_register)}}}function f(a){a.onclick=function(){var a=$("#r_phone")[0];if(!M(a.getAttribute("data-type"),a.value))return void jAlert("请输入有效的手机号");if(!regBflag_t){regBflag_t=!0;var b={Parameters:'{"CultureName":"","Mobile":"'+a.value+'","VerificationCodeType":1}',ForeEndType:3,Code:"0058"};phone_reg.innerHTML='<span style="color: rgb(204,204,204)">120秒重新发送</span>',timedown_reg(120),vlm.loadJson("",JSON.stringify(b),mycallback_verify)}}}function g(a){a.onclick=function(){var a;if("none"==o.style.display){if(login_pass=F,a=k.getElementsByTagName("input"),!M(a[0].getAttribute("data-type"),a[0].value))return void jAlert("请输入有效邮箱");if(!M(a[1].getAttribute("data-type"),a[1].value))return void jAlert("请输入6-18位密码");var b={Parameters:'{"CultureName":"","Email":"'+m.value+'","Password":"'+login_pass.value+'"}',ForeEndType:3,Code:"0052"};vlm.loadJson("",JSON.stringify(b),mycallback_login)}else{if(login_pass=E,a=j.getElementsByTagName("input"),!M(a[0].getAttribute("data-type"),a[0].value))return void jAlert("请输入有效手机号");if(!M(a[1].getAttribute("data-type"),a[1].value))return void jAlert("请输入6-18位密码");var b={Parameters:'{"CultureName":"","Password":"'+login_pass.value+'","Mobile":"'+l.value+'"}',ForeEndType:3,Code:"0052"};vlm.loadJson("",JSON.stringify(b),mycallback_login)}}}function h(a){a.onclick=function(){var a=$("#find_phone")[0];$("#find_email")[0];if("none"==D.style.display){var b=C.getElementsByTagName("input");if(!M(b[0].getAttribute("data-type"),b[0].value))return void jAlert("请输入有效的手机号");if(""==b[1].value)return void jAlert("请输入验证码");if(""==b[2].value)return void jAlert("请输入新密码");var c={Parameters:'{"CultureName":"","Email":"","Mobile":"'+a.value+'","NewPassword":"'+b[2].value+'","Code":"'+b[1].value+'"}',ForeEndType:3,Code:"0055"};vlm.loadJson("",JSON.stringify(c),mycallback_findkey)}else{var b=D.getElementsByTagName("input")[0];if(!M(b.getAttribute("data-type"),b.value))return void jAlert("请输入有效的邮箱");var c={Parameters:'{"CultureName":"","Email":"'+b.value+'"}',ForeEndType:3,Code:"0055"};vlm.loadJson("",JSON.stringify(c),mycallback_findkey_email)}}}function i(a){a.onclick=function(){var a=$("#find_phone")[0];if(!M(a.getAttribute("data-type"),a.value))return void jAlert("请输入有效的手机号");if(!Bflag_forget){Bflag_forget=!0;var b={Parameters:'{"CultureName":"","Mobile":"'+a.value+'","VerificationCodeType":3}',ForeEndType:3,Code:"0058"};phone_verify.innerHTML='<span style="color: rgb(204,204,204)">120秒重新发送</span>',timedown_forget(120),vlm.loadJson("",JSON.stringify(b),mycallback_findver)}}}var j=$("#phone_login")[0],k=$("#email_login")[0],l=$("#phone")[0],m=$("#email")[0],n=$("#change_phone")[0],o=$("#change_email")[0],p=$("#header_email")[0],q=$("#header_phone")[0],r=$("#phone_register")[0],s=$("#email_register")[0],t=$("#register")[0],u=$("#register_page")[0],v=$("#login_page")[0],w=$("#close_register")[0],x=$("#register_btn")[0],y=$("#login_btn")[0],z=$("#find_title")[0],A=$("#cha_email")[0],B=$("#cha_phone")[0],C=$("#phone_find")[0],D=$("#email_find")[0];k.style.display="none",n.style.display="none",a(t,v,u),b(w,u,v),c(o,n,j,k),c(n,o,k,j),c(p,q,r,s),c(q,p,s,r),d(A),d(B);var E=$("#p_password")[0],F=$("#e_password")[0],G=$("#r_phone")[0],H=$("#r_p_password")[0],I=$("#r_e_password")[0],J=$("#r_email")[0],K=$("#verify")[0],L=$("#get_code")[0],M=function(a,b){return"tel"==a?vlm.Utils.validate.mobileNo(b):"email"==a?vlm.Utils.validate.email(b):"pass"==a?vlm.Utils.validate.password(b):"code"==a?vlm.Utils.validate.code(b):void 0};e(x),f(L),g(y);var N=$("#findkey_btn")[0];h(N),i(phone_verify)};var loginRegShut=document.querySelector("#login-reg-shut");loginRegShut.onclick=function(){if(self!=top){var a=window.parent.document.getElementById("choiceAir");a.parentNode.removeChild(a)}else urlobj.returnURL?window.top.location.href=urlobj.returnURL:window.location.href="user.html"},clearValue("#phone"),clearValue("#p_password"),clearValue("#email"),clearValue("#e_password"),clearValue("#r_phone"),clearValue("#verify"),clearValue("#r_p_password"),clearValue("#r_email"),clearValue("#rs_e_password"),clearValue("#r_e_password");