/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
!function(a){"use strct";function b(){arguments.length&&(this.initialize.apply(this,arguments),this.result=[])}var c={$:function(a,b){var d,e,f,g=[],h=a.substring(1);if(b=b||document,"string"==typeof a)switch(a.charAt(0)){case"#":return document.getElementById(h);case".":if(b.getElementsByClassName)return b.getElementsByClassName(h);for(d=c.$("*",b),e=d.length,f=0;e>f;f++)d[f].className.indexOf(h)>-1&&g.push(d[f]);return g;default:return b.getElementsByTagName(a)}},bind:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},getPos:function(a){var b=document.documentElement.scrollLeft||document.body.scrollLeft,c=document.documentElement.scrollTop||document.body.scrollTop;return pos=a.getBoundingClientRect(),{top:pos.top+c,right:pos.right+b,bottom:pos.bottom+c,left:pos.left+b}},addClass:function(a,b){b.className=b.className+" "+a},removeClass:function(a,b){var c=new RegExp("(^|\\s+)"+a+"(\\s+|$)","g");b.className=b.className.replace(c,"")},stopPropagation:function(a){a=a||window.event,a.stopPropagation?a.stopPropagation():a.cancelBubble=!0}};b.prototype={constructor:b,_word:{hotel:["入住","离店"],flight:["去程","回程"]},_tempmonth:['<span class="prevmonth">prevmonth</span>','<span class="nextmonth">nextmonth</span>'],_tempweek:['<dl class="ca_week">','<dt class="date_title">日</dt>','<dt class="date_title">一</dt>','<dt class="date_title">二</dt>','<dt class="date_title">三</dt>','<dt class="date_title">四</dt>','<dt class="date_title">五</dt>','<dt class="date_title">六</dt>',"</dl>"],_flightTemptiper:'<div class="first_select tiper"><i class="icon_go"></i><span id="electedTime0"></span><i class="icon_close"></i></div><div class="second_select tiper"><i class="icon_back"></i><span id="electedTime1"></span><i class="icon_close"></i></div><p class="info">点击日期选择出发日期</p><p class="info second_info">请选择返回日期</p>',_template:['<dl class="ca_month">','<dt class="title-date">',"</dt>","<dd></dd>","</dl>"],initialize:function(a){this.type=a.type||"flight",this.selectTime=a.selectTime||2,this.format=a.format||"yyyy-mm-dd",this.id=a.id,this.num=a.num||13,this.sClass1=a.sClass1,this.id2=a.id2,this.callback=a.callback,this.time=a.time||{},this.prefix=a.prefix||"calendar",this.op=0,this.checkInTimeOptId=a.checkInTimeOptId,this.checkOutTimeOptId=a.checkOutTimeOptId,this.input=c.$("#"+this.id),this.eventBind()},createContainer:function(a){var b=c.$("#calendarWrap");b&&b.parentNode.removeChild(b);var d=document.createElement("div");d.id="calendarWrap",d.className="calendar_Wrap",d.style.position="absolute",d.style.zIndex=100,d.style.width="100%",d.style.height="100%",d.style.backgroundColor="#fff";var e=this.container=document.createElement("div");if(e.id=this.id+"Date",e.className="calendar_date",e.style.position="absolute",e.style.zIndex=100,"input"===this.input.tagName){var f=c.getPos(this.input);e.style.left=f.left+"px",e.style.top=f.bottom-1+"px",c.bind(e,"click",this.stopPropagation)}else{e.style.background="#fff",e.style.overflow="auto",e.style.width=e.style.height="100%",e.style.left="0",e.style.top="2.68rem",e.style.paddingBottom="1.18rem";var g=this.header=document.createElement("div");if(g.id=this.id+"Header",g.className=this.prefix+"_header",g.style.zIndex=100,g.innerHTML='<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><h3>选择日期</h3>',d.appendChild(g),2===this.selectTime){var h=document.createElement("div");h.className="calendar_tiper",h.innerHTML=this._flightTemptiper,e.appendChild(h)}var i=document.createElement("div");i.className="calendar_week",i.innerHTML=this._tempweek.join(""),e.appendChild(i);var j=this.tiper=document.createElement("div");j.id="comfirmBtn",j.className="calendar_comfirm",j.innerHTML="<span class='btn'>确定</span>",e.appendChild(j)}d.appendChild(e),document.body.appendChild(d)},drawDate:function(a){var b,e,f,g,h,i,j,k,l,n,o=[],p=new Date,q=(p.getFullYear(),p.getMonth()),r=p.getDate();for(this.dateWarp=b=document.createElement("div"),b.className="calendar",b.innerHTML=this._template.join(""),this.year=g=a.getFullYear(),this.month=h=a.getMonth()+1,this.date=i=a.getDate(),this.titleDate=e=c.$(".title-date",b)[0],tims=this.time,n=document.createTextNode(g+"年"+h+"月"),e.appendChild(n),f=c.$("dd",b)[0],j=new Date(g,h,0).getDate(),k=new Date(g,h-1,1).getDay(),l=0;k>l;l++)o.push("<a>&nbsp;</a>");for(l=1;j>=l;l++)m=10>h?"0"+h:h,d=10>l?"0"+l:l,tims[g+"-"+m+"-"+d]?l==r&&h==q+1?pstr='<a class="live selected" data-day="'+g+"-"+m+"-"+d+'"><span class="live_circle">今天</span></a>':pstr='<a class="live selected" data-day="'+g+"-"+m+"-"+d+'"><span class="live_circle">'+l+"</span></a>":l==r&&h==q+1?pstr='<a class="live" data-day="'+g+"-"+m+"-"+d+'">今天</a>':h==q+1&&r>l?pstr='<a class="live disabled">'+l+"</a>":pstr='<a class="live" data-day="'+g+"-"+m+"-"+d+'">'+l+"</a>",o.push(pstr);f.innerHTML=o.join(""),this.container.appendChild(b);var s=!!window.ActiveXObject&&!window.XMLHttpRequest;s&&b.appendChild(this.createIframe())},drawLastDate:function(a){var b,d,e,f,g,h,i,j,k,l,m=[],n=new Date,o=(n.getFullYear(),n.getMonth(),n.getDate());this.dateWarp=b=document.createElement("div"),b.className="calendar",b.innerHTML=this._template.join(""),this.year=f=a.getFullYear(),this.month=g=a.getMonth()+1,this.date=h=a.getDate(),this.titleDate=d=c.$(".title-date",b)[0],tims=this.time,this.result.length=0;for(var p in tims)this.result.push(p);for(l=document.createTextNode(f+"年"+g+"月"),d.appendChild(l),e=c.$("dd",b)[0],i=new Date(f,g,0).getDate(),j=new Date(f,g-1,1).getDay(),k=0;j>k;k++)m.push("<a>&nbsp;</a>");for(k=1;i>=k;k++)o>=k?m.push('<a class="live" data-day="'+f+"-"+g+"-"+k+'">'+k+"</a>"):m.push('<a class="disabled">'+k+"</a>");e.innerHTML=m.join(""),this.container.appendChild(b);var q=!!window.ActiveXObject&&!window.XMLHttpRequest;q&&b.appendChild(this.createIframe())},createIframe:function(){var a=document.createElement("iframe");return a.src="about:blank",a.style.position="absolute",a.style.zIndex="-1",a.style.left="-1px",a.style.top=0,a.style.border=0,a.style.filter="alpha(opacity= 0 )",a.style.width=this.container.offsetWidth+"px",a.style.height=this.container.offsetHeight+"px",a},removeDate:function(){var a=c.$("#calendarWrap");a&&a.parentNode.removeChild(a)},btnEvent:function(){var a=this,b=c.$(".prevmonth",this.dateWarp)[0],d=c.$(".nextmonth",this.dateWarp)[0];b.onclick=function(){var b=new Date(a.year,a.month-2,a.date);a.drawDate(b)},d.onclick=function(){var b=new Date(a.year,a.month,a.date);a.drawDate(b)}},linkOn:function(){var a=this,b=c.$("#"+this.id+"Date");c.bind(b,"click",function(b){var c=b.target||b.srcElement;"A"!=c.tagName||c.className.indexOf("disabled")>-1||(c.innerHTML='<span class="live_circle">'+c.innerHTML+"</span>",c.classList.add("disabled"),c.classList.add("selected"),a.linkOver(c))})},resetSelected:function(){var a=$(".calendar .selected"),b=this.result,c="",d=!1,e=!1;a.each(function(a,d){c=$(d).attr("data-day"),1===b.length?c===b[0]||$(d).html($(d).children().eq(0).html()).removeClass("disabled").removeClass("selected"):c===b[0]||c===b[1]||$(d).html($(d).children().eq(0).html()).removeClass("disabled").removeClass("selected")}),a=$(".calendar .selected"),2===a.length?(a.each(function(a,b){if(!d){if(0===a)for(var c=b.nextSibling;c&&-1===c.className.indexOf("selected")&&(e=!0,c.className=c.className+" through",c=c.nextSibling,null!=c);)if(c.className.indexOf("selected")>-1){d=!0;break}if(1===a)for(var f=b.previousSibling;f&&-1===f.className.indexOf("selected")&&f.className.indexOf("live")>-1&&(e=!0,f.className=f.className+" through",f=f.previousSibling,null!=f););e&&(0===a?$(b).addClass("selectStart"):$(b).addClass("selectEnd"))}}),e&&(a.eq(0).addClass("selectStart"),a.eq(1).addClass("selectEnd"))):($(".calendar .through").removeClass("through"),$(".calendar .selectStart").removeClass("selectStart"),$(".calendar .selectEnd").removeClass("selectEnd"))},showSelected:function(){for(var a=this.result,b=$("#"+this.id+"Date #electedTime0"),c=$("#"+this.id+"Date #electedTime1"),d=$("#"+this.id+"Date .info"),e=$("#"+this.id+"Date .second_info"),f=0;f<a.length;f++)$("#"+this.id+"Date #electedTime"+f).html(a[f]).parent().show();1===a.length?(c.parent().hide(),d.hide(),e.show()):0===a.length?(b.parent().hide(),c.parent().hide(),d.show(),e.hide()):(d.hide(),e.hide())},showComfirmBtn:function(a){var b=c.$("#comfirmBtn");a?b.style.display="block":b.style.display="none"},linkOver:function(a){var b=a.getAttribute("data-day");if(0===this.result.length||2===this.result.length)this.result=[],this.result.push(b),this.showComfirmBtn(0);else{var c=new Date(this.result[0]),d=new Date(b);d>c?(this.result.push(b),this.showComfirmBtn(1)):this.result[0]=b}this.resetSelected(),this.showSelected()},linkReset:function(a){var b=this,d=$(".live_circle"),e=d.length,f=c.$(".live",this.dd),g=f.length;if(0==b.op){for(var h=0;e>h;h++){var i=d[h].parentNode.getAttribute("data-day"),j=i.split("-");d[h].parentNode.innerHTML=j[j.length-1]}for(h=0;a>h;h++)c.addClass("disabled",f[h]);for(h=a+30;g>h;h++)c.addClass("disabled",f[h]);return!1}},eventBind:function(){this.inputEvent(),this.outClick()},comfirmClick:function(){var a=this,b=c.$("#comfirmBtn"),d={};c.bind(b,"click",function(b){$("#"+a.checkInTimeOptId).length>0&&$("#"+a.checkOutTimeOptId).length>0&&(c.$("#"+a.checkInTimeOptId).innerHTML=a.result[0],c.$("#"+a.checkOutTimeOptId).innerHTML=a.result[1]);var e=[a.result[0],a.result[1]];c.$("#"+a.id).setAttribute("data-selectedTime",e),d[a.result[0]]=a._word[a.type][0],d[a.result[1]]=a._word[a.type][1],a.time=d,a.removeDate(),"function"==typeof a.callback&&a.callback(a.result),a.result=[]})},formatTime:function(a,b){var c={"M+":b.getMonth()+1,"d+":b.getDate(),"h+":b.getHours(),"m+":b.getMinutes(),"s+":b.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:b.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(b.getFullYear()+"").substr(4-RegExp.$1.length)));for(var d in c)new RegExp("("+d+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return a},formatDisplayTime:function(a,b){},clearClick:function(){var a=this;$(".calendar_tiper").on("click",".icon_close",function(b){0===$(this).parent().index()?a.result.length=0:a.result.length=1,a.resetSelected(),a.showSelected(),a.showComfirmBtn(0)})},inputEvent:function(){var a=this,b=new Date,d=b.getFullYear(),e=b.getMonth();b.getDate();c.bind(this.input,"click",function(){a.createContainer();for(var b=0;b<a.num;b++)if(b==a.num-1){var c=new Date(d,e+b,1);a.drawLastDate(c)}else{var c=new Date(d,e+b,1);a.drawDate(c)}a.linkOn(),a.comfirmClick(),a.clearClick(),a.resetSelected(),a.showSelected()})},outClick:function(){var a=this;c.bind(document,"click",function(b){b=b||window.event;var c=b.target||b.srcElement;(c.className.indexOf("header_back")>-1||c.className.indexOf("go_back")>-1)&&a.removeDate()})}},a.Calender=b}("undefined"==typeof exports?this:exports);