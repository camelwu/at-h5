/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
function callback(){}function M(){document.querySelector(".credit-det-cont"),getCardInfo();if(!vlm.Utils.validate.isNoEmpty($(".CardHolderName").val()))return jAlert("持卡人姓名不能为空！","",null,"确认"),!1;if(!vlm.Utils.validate.engName($(".CardHolderName").val()))return jAlert("持卡人姓名必须为英文！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardNumber").val()))return jAlert("信用卡不能为空！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardSecurityCode").val()))return jAlert("安全码不能为空！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardExpiryDate").val()))return jAlert("有效期不能为空！","",null,"确认"),!1;if(!vlm.Utils.validate.bankAccountNo($(".CardNumber").val()))return jAlert("信用卡卡号错误！","",null,"确认"),!1;if(!vlm.Utils.validate.safecode($(".CardSecurityCode").val()))return jAlert("安全码3位数字！","",null,"确认"),!1;if(!vlm.Utils.validate.dataValid($(".CardExpiryDate").val()))return jAlert("有效期格式不正确！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardContactNumber2").val()))return jAlert("手机号不能为空！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardCity").val()))return jAlert("账单城市不能不空！","",null,"确认"),!1;if(!vlm.Utils.validate.isNoEmpty($(".CardAddress").val()))return jAlert("账单地址不能不空！","",null,"确认"),!1;var a={Parameters:{CardInfo:{CardType:"Visa",CardHolderName:$(".CardHolderName").val(),BankName:$(".BankName").val(),CardCountryCode:$(".CardCountryCode").attr("data-code"),CardNumber:$(".CardNumber").val(),CardSecurityCode:$(".CardSecurityCode").val(),CardExpiryDate:$(".CardExpiryDate").attr("data-expire"),CardContactNumber:$(".CardContactNumber2").val()+$(".CardContactNumber2").val(),CardAddress:$(".CardAddress").val(),CardAddressPostalCode:$(".CardAddressPostalCode").val(),CardAddressCity:$(".CardCity").val(),CardAddressCountryCode:$(".CardAddressCountryCode").attr("data-code"),CountryNumber:"86"},BookingRefNo:bookingRefNo,CurrencyCode:"CNY",TotalFlightPrice:$(".totalFlightPrice").html(),PaymentMode:"CreditCard"},ForeEndType:3,Code:"3004"},b=new paymentObj(a,mycallback);b.handlePayment()}function V(a){if(a.success){var b=a.data.paymentRedirectURL;self.location.href=b}else alert(a.message)}function mycallback(a){V(a)}function getCardInfo(){var a={CardType:"Visa",CardHolderName:$(".CardHolderName").val(),BankName:$(".BankName").val(),CardCountryCode:$(".CardCountryCode").attr("data-code"),CardNumber:$(".CardNumber").val(),CardSecurityCode:$(".CardSecurityCode").val(),CardExpiryDate:"2018-12-31",CardContactNumber:$(".CardContactNumber2").val()+$(".CardContactNumber2").val(),CardAddress:$(".CardAddress").val(),CardAddressPostalCode:"1234",CardAddressCountryCode:$(".CardAddressCountryCode").attr("data-code")};return a}var bookingRefNo=vlm.getpara("bookingRefNo"),getCoin={CNY:"￥",USD:"$"},getSex={MS:"男",MRS:"女",MR:"女"},getCardType={1:"身份证",2:"护照"};$(document).ready(function(){$(".tel-icon").on("click",function(){$(".jpop_box_tic").show()}),$(".jpop_box_tic span,.jpop_box_tic a").click(function(){$(".jpop_box_tic").hide()});var a=(new Scroller({id:"CardExpiryDate",type:"cardExpirationDate",cont:"cardExpirationDate1234",callback:function(){var a=document.getElementById("CardExpiryDate"),b=a.getAttribute("data-expire"),c=(new Date).getTime();b=new Date(b).getTime(),c>b&&$.alerts.alert("有效期应大于当前日期，请重新选择!",null,null,"确定")}}),{Parameters:{BookingRefNo:bookingRefNo},ForeEndType:3,Code:"3006"});vlm.loadJson("",JSON.stringify(a),function(a){if(a.success){var b=template("payDetail",a.data);$("#payDetail").html(b),$(".passenger-detail").on("click",function(){$(".passenger").toggle(),$(this).toggleClass("opened")}),vlm.init()}});var b={requestUrl:"",addHandler:function(a,b,c){document.addEventListener?this.addHandler=function(a,b,c){a.addEventListener(b,c,!1)}:document.attachEvent?this.addHandler=function(a,b,c){a.attachEvent("on"+b,function(){c.call(a)})}:this.addHandler=function(a,b,c){a["on"+b]=c},this.addHandler(a,b,c)},tAjax:function(a,b,c,d,e){var f={Parameters:JSON.stringify(b),ForeEndType:d,Code:c},g=new vcm;g.loadJson(a,JSON.stringify(f),e)},sliderOption:function(){$(".custom-select").each(function(){var a=$(this).attr("class"),b=($(this).attr("id"),$(this).attr("name"),'<div class="'+a+'">');b+='<span class="custom-select-trigger">'+$(this).attr("placeholder")+"</span>",b+='<div class="custom-options">',$(this).find("option").each(function(){b+='<span class="custom-option '+$(this).attr("class")+'" data-value="'+$(this).attr("value")+'">'+$(this).html()+"</span>"}),b+="</div></div>",$(this).wrap('<div class="custom-select-wrapper"></div>'),$(this).hide(),$(this).after(b)}),$(".custom-option:first-of-type").hover(function(){$(this).parents(".custom-options").addClass("option-hover")},function(){$(this).parents(".custom-options").removeClass("option-hover")}),$(".custom-select-trigger").on("click",function(){$(this).parents(".custom-select").toggleClass("opened")}),$(".custom-option").on("click",function(){$(this).parents(".custom-select-wrapper").find("select").val($(this).data("value")),$(this).parents(".custom-options").find(".custom-option").removeClass("selection"),$(this).addClass("selection"),$(this).parents(".custom-select").removeClass("opened"),$(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text())})},cardAction:function(){var a=document.getElementById("credit-card"),b=[];b=a.getElementsByTagName("b");for(var c=0;c<b.length;c++)b[c].onclick=function(){var a=window.event.srcElement;if("p-icon2"==a.className){for(var c=0;c<b.length;c++)b[c].className="p-icon2";a.className="p-icon1"}else a.className="p-icon2"}},resultFunction:function(a){document.location.href="pay_fail.html"},addEvent:function(){var a=document.querySelector(".air-ticket-pay-btn");this.addHandler(a,"click",function(){M()})},init:function(){this.addEvent(),this.sliderOption(),this.cardAction()}};b.init()});