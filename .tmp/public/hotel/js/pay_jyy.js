/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
function init(){var a=document.getElementById("p-ul1");array=a.getElementsByTagName("b")}function strlen(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);d>=1&&126>=d||d>=65376&&65439>=d?b++:b+=2}return b}var array=[],lsf_myweb={getbyid:function(a){return document.getElementById(a)},getbytag:function(a,b){return a.getElementsByTagName(b)},getbyclass:function(a,b){if(a.getElementsByClassName)return a.getElementsByClassName(b);for(var c=[],d=a.getElementsByTagName("*"),e=new RegExp("\\b"+b+"\\b","g"),f=0;f<d.length;f++)-1!=d[f].className.search(e)&&c.push(d[f]);return c},bind:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},stopPropagation:function(a){var b=ev||a;b.stopPropagation?b.stopPropagation():b.cancelBubble=!0},addClass:function(a,b){if(a.className){var c=new RegExp("\\b"+b+"\\b","g");-1==a.className.search(c)&&(a.className+=" "+b)}else a.className=b},removeClass:function(a,b){if(a.className){var c=new RegExp("\\b"+b+"\\b","g");-1!=a.className.search(c)&&(a.className=a.className.replace(c,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," "),a.className||a.removeAttribute("class"))}},styleChange:function(a,b){var c=document.getElementById(a);c.onfocus=function(){this.value==b&&(this.value="",this.style.color="#484848")},c.onblur=function(){this.value||(this.value=b,this.style.color="#d1d1d1")}}};!function(){function a(a){for(var d=document.getElementById(a),e=d.children,f=d.getElementsByTagName("b"),g=0;g<e.length;g++)lsf_myweb.bind(e[g],"click",function(){for(var a=this.getElementsByTagName("b")[0],d=this.getElementsByTagName("span")[0],e=0;e<f.length;e++)f[e].className="p-icon2";a.className="p-icon1","维萨信用卡"==d.innerHTML?c=1:"万事达卡"==d.innerHTML&&(c=20),b.CreditCardType=c})}$(window).load(function(){$("#status-h").fadeOut(),$("#preloader").delay(400).fadeOut("medium")});var b=JSON.parse(localStorage.getItem("user_order_storage12345")),c=1,d=(new Scroller({id:"jp_limit_time",type:"cardExpirationDate",cont:"cardExpirationDate1",callback:function(){var a=document.getElementById("jp_limit_time"),b=a.getAttribute("data-expire"),c=(new Date).getTime();b=new Date(b).getTime(),c>b&&$.alerts.alert("有效期应大于当前日期，请重新选择!",null,null,"确定")}}),document.getElementById("jp_back"));lsf_myweb.bind(d,"click",function(){window.history.go(-1)});var e=document.getElementById("jp_price_sum"),f=document.getElementById("jp_hotel_name"),g=document.getElementById("jp_date"),h=document.getElementById("jp_house_type"),i=document.getElementById("p-but"),j=document.getElementById("jp_bank"),k=document.getElementById("jp_guest_name"),l=document.getElementById("jp_limit_time"),m=document.getElementById("jp_safe_code"),n=document.getElementById("jp_bank_name"),o=document.getElementById("jp_bank_country");"1"==b.paymentModeID?e.innerHTML="订单总价：￥"+b.calcuTotalPriceCNY:(e.innerHTML="本预订需要您提供您的信用卡作为担保。<br/>该产品不可变更且不可取消，如未入住，扣除全额房费",$("#jp_price_sum").css("font-size","1.1rem")),f.innerHTML=b.HotelGenInfo.hotelName,g.innerHTML=b.dateInfo.CheckInDate.split("-")[0]+"年"+b.dateInfo.CheckInDate.split("-")[1]+"月"+b.dateInfo.CheckInDate.split("-")[2]+"日 - "+b.dateInfo.CheckOutDate.split("-")[0]+"年"+b.dateInfo.CheckOutDate.split("-")[1]+"月"+b.dateInfo.CheckOutDate.split("-")[2]+"日 共"+b.dateInfo.totalNight+"晚（当地时间为准）",h.innerHTML="房型："+b.RoomTypeName+" 房间数："+b.NumOfRoom+"间",a("p-ul1"),lsf_myweb.bind(i,"click",function(){function a(a){var b=vlm.getpara("bookingRefNo"),c={};if(null==b){for(var d=[],f=0;f<=a.guestName.length-1;f++){var g={};g.guestFirstName=a.guestName[f].GuestFirstName,g.guestLastName=a.guestName[f].GuestLastName,d.push(g)}c.Parameters={availability:!0,bankName:a.BankName,browserType:"",cardBillingAddress:"werty",cardHolderName:a.CardHolderName,cardIssuanceCountry:a.CardIssuanceCountry,cardSecurityCode:a.CardSecurityCode,cashVoucherDetails:"",checkInDate:a.dateInfo.CheckInDate+"T00:00:00",checkOutDate:a.dateInfo.CheckOutDate+"T00:00:00",cookieID:1,creditCardExpiryDate:a.CreditCardExpiryDate,creditCardNumber:a.CreditCardNumber,creditCardType:a.CreditCardType,guestContactNo:a.GuestContactNo,guestEmail:a.GuestEmail,guestNameList:d,guestRequest:"",guestTitle:"Mr",hotelCode:a.HotelGenInfo.hotelCode,hotelName:a.HotelGenInfo.hotelName,iPAddress:"",memberId:localStorage.memberid,nationlityCode:"",numOfChild:0,numOfGuest:a.NumOfRoom,numOfRoom:a.NumOfRoom,residenceCode:"",roomCode:a.roomCode,roomName:a.roomName,roomTypeCode:a.RoomTypeCode,roomTypeName:a.RoomTypeName,sessionID:"",totalPrice:a.totalPriceCNY,trck:""},c.ForeEndType=3,c.Code="0012"}else c.Parameters={bankName:a.BankName,bookingReferenceNo:b,cardBillingAddress:"",cardHolderName:a.CardHolderName,cardIssuanceCountry:a.CardIssuanceCountry,cardSecurityCode:a.CardSecurityCode,cashVoucherDetails:"",creditCardExpiryDate:a.CreditCardExpiryDate,creditCardNumber:a.CreditCardNumber,creditCardType:a.CreditCardType,paymentGatewayID:"0"},c.ForeEndType=3,c.Code="0014";var h=new paymentObj(c,e);h.handlePayment(),vlm.init()}function d(a){if(a.success)if("1"==b.paymentModeID)if(a.data.length>=1){var c=a.data[0].paymentRedirectURL;self.location.href=c}else{var c=a.data.paymentRedirectURL;self.location.href=c}else self.location.href="trade_details.html?bookingRefNo="+a.data[0].referenceNo;else $("#status-h").fadeOut(),$("#preloader").fadeOut("medium"),jAlert(a.message,"",null,"确认")}function e(a){d(a)}if(0==c)return void alert("请选择支付类型");if(b.CreditCardType=c,""==j.value)return void $.alerts.alert("请输入信用卡卡号",null,null,"确定");var f=/^\d+$/g;if(!f.test(j.value))return void $.alerts.alert("信用卡卡号必须是数字",null,null,"确定");if(b.CreditCardNumber=j.value,""==k.value)return void $.alerts.alert("请输入持卡人姓名");if(strlen(k.value)>20)return void $.alerts.alert("超出最大字符!",null,null,"确定");if(b.CardHolderName=k.value,!vlm.Utils.validate.engName(k.value))return jAlert("持卡人姓名必须为英文！","",null,null,"确认"),!1;if(""==n.value)return void $.alerts.alert("请输入发卡银行",null,null,"确定");if(b.BankName=n.value,""==o.value)return void $.alerts.alert("请输入发卡国家",null,null,"确定");if(b.CardIssuanceCountry=o.value,""==l.value)return void $.alerts.alert("请输入有效期",null,null,"确定");if(b.CreditCardExpiryDate=l.getAttribute("data-expire"),!vlm.Utils.validate.dataValid(l.value))return jAlert("有效期格式不正确！","",null,"确认"),!1;if(""==m.value)return void $.alerts.alert("请输入信用卡安全码",null,null,"确定");var f=/^\d+$/g;return f.test(m.value)?3!=m.value.length?void $.alerts.alert("信用卡安全码必须是3位数字",null,null,"确定"):(b.CardSecurityCode=m.value,localStorage.setItem("user_order_storage12345",JSON.stringify(b)),void a(b)):void $.alerts.alert("信用卡安全码必须是数字",null,null,"确定")})}();