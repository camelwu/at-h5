/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
function u_perInfo(){function a(a){a.onclick=function(){p.style.display="none"}}function b(a){a.onclick=function(){var a,b=D.firstElementChild;if("show-key"==b.className){b.className="show-keys",a=document.getElementById("keyForm").getElementsByTagName("input");for(var c=0;c<a.length;c++)a[c].type="text"}else{b.className="show-key",a=document.getElementById("keyForm").getElementsByTagName("input");for(var d=0;d<a.length;d++)a[d].type="password"}}}function c(a,b,c){a.onclick=function(){w.style.display="none",x.style.display="none",y.style.display="none",z.style.display="none",A.style.display="none",a==r||a==v?I.style.display="none":I.style.display="block",q.innerHTML=b,c.style.display="block",p.style.display="block"}}function d(a){a.onclick=function(){if("info-sex-on"!=B.className){B.className="info-sex-on",C.innerHTML="女",UserSex=26;var a={Parameters:'{"MemberId":"'+m+'","Salutation":"'+UserSex+'"}',ForeEndType:3,Code:"0056"};vlm.loadJson("",JSON.stringify(a),mycallback_sex)}else{B.className="info-sex",C.innerHTML="男",UserSex=27;var a={Parameters:'{"MemberId":"'+m+'","Salutation":"'+UserSex+'"}',ForeEndType:3,Code:"0056"};vlm.loadJson("",JSON.stringify(a),mycallback_sex)}}}function e(a){a.onclick=function(){var a=document.getElementById("nickForm").getElementsByTagName("input");a[0].value=a[0].value.replace(/^\s*/,"");var b=a[0].value;if(vlm.Utils.validate.nickName(b)){var c={Parameters:'{"MemberId":"'+m+'","NickName":"'+a[0].value+'"}',ForeEndType:3,Code:"0059"};vlm.loadJson("",JSON.stringify(c),mycallback_nick)}else jAlert('昵称需要由4-20个字符，可由中英文字母，数字、"_"组成，不能以"_"开头')}}function f(a){a.onclick=function(){var a=document.getElementById("realName");if(a.value=a.value.replace(/^\s*/,""),u_realname=a.value,vlm.Utils.validate.chiName(u_realname)){var b={Parameters:'{"MemberId":"'+m+'","CultureName":"","FirstName":"'+u_realname+'"}',ForeEndType:3,Code:"0056"};vlm.loadJson("",JSON.stringify(b),mycallback_info)}else jAlert("请输入正确的姓名")}}function g(a){a.onclick=function(){var a=document.getElementById("infoForm").getElementsByClassName("mob-cell")[0],b=document.getElementById("infoForm").getElementsByClassName("mob-code")[0];if(u_phone=a.value,!H(a.getAttribute("data-type"),a.value))return void jAlert("输入不正确");if(""!=localStorage.phone&&a.value==l)return void jAlert("用户已绑定信息不能修改");if(""==b.value)jAlert("请输入验证码");else{var c={Parameters:'{"MemberId":"'+m+'","Mobile":"'+u_phone+'"}',ForeEndType:3,Code:"0056"};vlm.loadJson("",JSON.stringify(c),mycallback_info)}}}function h(a){a.onclick=function(){var a=document.getElementById("infoForm").getElementsByTagName("input")[3];if(u_email=a.value,""!=a.value){if("code"!=a.getAttribute("data-type")&&!H(a.getAttribute("data-type"),a.value))return void jAlert("输入不正确");if(""!=localStorage.email&&a.value==k)return void jAlert("用户已绑定信息不能修改");var b={Parameters:'{"MemberId":"'+m+'","Email":"'+u_email+'"}',ForeEndType:3,Code:"0056"};$("#preloader").remove(),vlm.loadJson("",JSON.stringify(b),mycallback_infoemail)}}}function i(a){a.onclick=function(){var a=document.getElementById("infoForm").getElementsByClassName("mob-cell")[0];document.getElementById("infoForm").getElementsByClassName("mob-code")[0];if(!H(a.getAttribute("data-type"),a.value))return void jAlert("输入不正确");if(""!=localStorage.phone&&a.value==l)return void jAlert("用户已绑定信息不能修改");if(!phoneBflag){phoneBflag=!0;var b={Parameters:'{"CultureName":"","Mobile":"'+r_phone.value+'","VerificationCodeType":4}',ForeEndType:3,Code:"0058"};$("#preloader").remove(),phone_verify.innerHTML='<span style="color: rgb(204,204,204)">120秒重新发送</span>',timedown_regcy(120),vlm.loadJson("",JSON.stringify(b),mycallback_phoneVeri)}}}function j(a){a.onclick=function(){for(var a=document.getElementById("keyForm").getElementsByTagName("input"),b=0;b<a.length;b++)if("button"!=a[b].type&&""!=a[b].value){if(!H(a[b].getAttribute("data-type"),a[b].value))return void jAlert("输入不正确");if(a[1].value!=a[2].value)return void jAlert("两次密码输入不一致");if(a[0].value==a[1].value&&a[0].value==a[2].value)return void jAlert("新密码与旧密码相同")}var c={Parameters:'{"CultureName":492189,"MemberID":"'+m+'","NewPassword":"'+a[1].value+'","Password":"'+a[0].value+'"}',ForeEndType:3,Code:"0054"};vlm.loadJson("",JSON.stringify(c),mycallback_newKey)}}var k=localStorage.email,l=localStorage.phone,m=localStorage.memberid,n={Parameters:'{"MemberId":"'+m+'"}',ForeEndType:3,Code:"0053"};vlm.loadJson("",JSON.stringify(n),mycallback);var o=$("#close_page")[0],p=$("#amend_info")[0],q=$("#title")[0],r=($("#info_content")[0],$("#a_nick")[0]),s=$("#a_name")[0],t=$("#a_phone")[0],u=$("#a_email")[0],v=$("#a_key")[0],w=$("#changename")[0],x=$("#fillname")[0],y=$("#phoneverify")[0],z=$("#useremail")[0],A=$("#amendkey")[0],B=$("#sex")[0],C=$("#block")[0],D=$("#ifshowkey")[0],E=q.innerHTML,F=E.split("/");a(o),b(D),c(r,F[0],w),c(s,F[1],x),c(t,F[2],y),c(u,F[3],z),c(v,F[4],A),$("#a_nick").click(function(){$("#amend_btn_0").hide(),$("#amend_btn_1").hide(),$("#amend_btn_2").hide()}),$("#a_name").click(function(){$("#amend_btn_0").show().siblings("input").hide()}),$("#a_phone").click(function(){$("#amend_btn_1").show().siblings("input").hide()}),$("#a_email").click(function(){$("#amend_btn_2").show().siblings("input").hide()}),$("#a_key").click(function(){$("#amend_btn_2").hide(),$("#amend_btn_1").hide()}),d(B);var G=$("#nick_btn")[0];e(G);var H=function(a,b){return"tel"==a?vlm.Utils.validate.mobileNo(b):"email"==a?vlm.Utils.validate.email(b):"pass"==a?vlm.Utils.validate.password(b):void 0},I=$("#amend_btn_0")[0],J=$("#amend_btn_1")[0],K=$("#amend_btn_2")[0];f(I),g(J),h(K);var L=$("#phone_ver")[0];i(L);var M=$("#newkey_btn")[0];j(M)}function mycallback_birth(a){var b=a;b.success?jAlert("修改成功"):jAlert("修改失败")}function mycallback(a){infoJson=a;var b=$("#nickname")[0],c=$("#name")[0],d=$("#realName")[0],e=$("#email")[0],f=$("#phone")[0],g=$("#sex")[0],h=$("#block")[0],i=$("#userIcon")[0],j=$("#birth-cont-per")[0];if(null==infoJson.data)b.innerHTML="",c.value="";else{var k=infoJson.data[0].dateOfBirth.substring(0,10),l=k.split("-");k=0==l[1].charAt(0)&&0==l[2].charAt(0)?l[0]+"年-"+l[1].charAt(1)+"月-"+l[2].charAt(1)+"日":0==l[1].charAt(0)&&0!=l[2].charAt(0)?l[0]+"年-"+l[1].charAt(1)+"月-"+l[2]+"日":0!=l[1].charAt(0)&&0==l[2].charAt(0)?l[0]+"年-"+l[1]+"月-"+l[2].charAt(1)+"日":l[0]+"年-"+l[1]+"月-"+l[2]+"日",c.value=b.innerHTML=infoJson.data[0].nickName,$("#hostname")[0].innerHTML=d.value=infoJson.data[0].firstName,j.innerHTML=infoJson.data[0].dateOfBirth.substring(0,10),j.setAttribute("data-cache",k),$("#hostmobile")[0].innerHTML=f.value=infoJson.data[0].mobileNo,$("#hostemail")[0].innerHTML=infoJson.data[0].emailAddress,26==infoJson.data[0].salutation?(g.className="info-sex-on",h.innerHTML="女",i.src="../images/ui/photo-man.png"):(g.className="info-sex",h.innerHTML="男",i.src="../images/ui/photo-woman.png")}e.value=localStorage.email,memberid=localStorage.memberid}function mycallback_nick(a){var b=a;b.success?(window.location.href="user-perInfo.html",document.getElementById("nickForm").submit()):jAlert(b.message)}function mycallback_info(a){var b=a;b.success?(localStorage.realname=u_realname,localStorage.phone=u_phone,document.getElementById("infoForm").submit()):jAlert(b.message)}function mycallback_infoemail(a){var b=a;b.success?(localStorage.email=u_email,document.getElementById("infoForm").submit()):jAlert(b.message)}function mycallback_sex(a){var b=a;b.success?(26==b.data[0].salutation?$("#userIcon").attr("src","../images/ui/photo-man.png"):$("#userIcon").attr("src","../images/ui/photo-woman.png"),jAlert("修改成功")):jAlert("修改失败")}function mycallback_phoneVeri(a){var b=$("#phone_ver")[0],c=a;c.success?vlm.Utils.sendMobileCode(b.value):jAlert(c.message)}function mycallback_newKey(a){var b=a;b.success?jAlert("修改成功","",cb_modify):jAlert(b.message)}function cb_modify(){document.getElementById("keyForm").submit()}function timedown_regcy(a){var b,c=new Date,d=setInterval(function(){if(a--,Math.abs(new Date-c)>=3e3){if(b=new Date,Math.ceil(120-(b-c)/1e3)<1)return phone_verify.innerHTML="发送验证码",phone_verify.style.color="#ffb413",clearInterval(d),void(phoneBflag=!1);phone_verify.innerHTML=Math.ceil(120-(b-c)/1e3)+"秒重新发送",phone_verify.style.color="rgb(204,204,204)"}else phone_verify.innerHTML=a+"秒重新发送",phone_verify.style.color="rgb(204,204,204)"},1e3)}function clearname(){var a=document.getElementById("name");a.value=""}var infoJson,u_phone,u_email,u_realname,phoneBflag=!1,r_phone=$("#phone")[0],UserSex=localStorage.salutation,phone_verify=$("#phone_ver")[0];$("#birth-cont-per").click(function(){setTimeout(function(){function a(a){a.on("click",b)}function b(){var a=$(".sel-time .date-selected"),b=0,c=a.length,d=document.getElementById("opeater"),e=[];for(document.getElementById(""+d.getAttribute("data-id"));c>b;b++)e.push(a[b].innerHTML);var f=e.join("").replace("年","-").replace("月","-").replace("号","").replace("日","");if(!vlm.Utils.compareBirth(f))return void jAlert("您选择的出生日期大于当前日期");var g={Parameters:'{"MemberId":"'+memberid+'","DOB":"'+f+'"}',ForeEndType:3,Code:"0056"};vlm.loadJson("",JSON.stringify(g),mycallback_birth)}var c=$(".cabin-sure");a(c)},1e3)}),$(".info-quit").click(function(){function a(a){a&&(localStorage.removeItem("memberid"),localStorage.removeItem("login"),localStorage.removeItem("email"),localStorage.removeItem("phone"),window.location.href="user.html")}jConfirm("确认退出当前帐号?","",a)});