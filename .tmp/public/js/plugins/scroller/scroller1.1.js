/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
function Scroller(){arguments.length&&(jQuery?this.init.apply(this,arguments):alert("需要jQuery!"))}Scroller.prototype={constructor:Scroller,cache:{},_btn:['<span class="fl cabin-cancel" style="margin-left: 10px;color:#999;">取消</span>','<span class="fr cabin-sure" style="margin-right: 10px;color: #ffb413;">确定</span>'],_template:{dateTime:["date","h","m"],card:['<span data-code="2">护照</span>','<span data-code="1">身份证</span>'],date:["年","月","日"],time:["<span>上午</span>","<span>下午</span>"],comp:["<span>&nbsp;</span>","<span>&nbsp;</span>"],comp1:["<span>&nbsp;</span>"],seat:["<span>经济舱</span>","<span>超级经济舱</span>","<span>商务舱</span>","<span>头等舱</span>"],cardExpirationDate:["年","月"]},_time:["birth","validity","cardExpirationDate","dateTime"],days:[29,31,28,31,30,31,30,31,31,30,31,30,31],week:["周日","周一","周二","周三","周四","周五","周六"],init:function(a){this.id=a.id,this.type=a.type,this.cont=a.cont,this.cache[a.id]="",this.num=a.num||100,this.startDate=a.startDate,this.callback=a.callback,this.inputEvent(a.id,a.type,a.cont),this.outClick()},createContainer:function(a){var b=this,c=document.getElementById("selbox");if(document.body.style.overflowY="hidden",c)this.masker=document.getElementById("overlay"),this.container=c,this.opeater=document.getElementById("opeater");else{var d=this.masker=document.createElement("div");d.id="overlay",d.className="mask",d.style.top="0",document.body.appendChild(d),document.body.style.overflowY="hidden";var e=this.container=document.createElement("div");e.id="selbox",e.className="selbox-footer";var f=document.createElement("div");f.id="header",f.innerHTML=b._btn.join(""),e.appendChild(f);var g=this.opeater=document.createElement("ul");g.id="opeater",g.className="selbox-ul",g.setAttribute("data-id",a),g.setAttribute("data-type",b.type),e.appendChild(g),document.body.appendChild(e),this.btnEvent(),this.stopEvent()}},stopEvent:function(){$("#overlay").on("touchstart",function(a){a.preventDefault(),a.stopPropagation()})},drawData:function(a,b){function c(a,b){var c=[];(new Date).getMonth(),(new Date).getDate();if("年"==b){j.type==j._time[0]&&(a=0),j.type!=j._time[1]&&j.type!=j._time[2]||(a=1);var d=(new Date).getFullYear();if(0>=a)for(var e=1900,f=d;f>=e;e++)c.push("<span>"+e+b+"</span>");else if(1==a)var e=d,f=d+30;else var e=d,f=d+1;for(;f>=e;e++)c.push("<span>"+e+b+"</span>")}else if("月"==b)for(var e=1;12>=e;e++)c.push("<span>"+e+b+"</span>");else for(var e=1;e<=j.days[1];e++)c.push("<span>"+e+b+"</span>");return c.join("")}function d(a,b){var c=[],d=j.num,e=j.startDate?j.startDate:new Date,f=e.getFullYear(),g=e.getMonth(),h=e.getDate(),i=["00","10","20","30","40","50"];switch(b){case"date":for(var k=0;d>k;k++){var l=new Date(f,g,h+k),m=l.getFullYear(),n=l.getMonth()+1,o=l.getDate(),p=10>n?"0"+n:n,q=10>o?"0"+o:o,r=l.getDay();c.push("<span data-temp="+m+"-"+p+"-"+q+">"+n+"月"+o+"日"+j.week[r]+"</span>")}break;case"h":for(var k=0;24>k;k++){var s=10>k?"0"+k:k;c.push("<span data-temp="+s+">"+s+"时</span>")}break;case"m":for(var k=0;k<i.length;k++)c.push("<span data-temp="+i[k]+">"+i[k]+"分</span>")}return c.join("")}function e(a){f=document.createElement("li"),g=document.createElement("div"),g.className="sel-time",g.innerHTML=a,f.appendChild(g),h=document.createElement("div"),h.className="sel-box",f.appendChild(h),j.opeater.appendChild(f)}var f,g,h,i,j=this;if(i=document.getElementById("opeater"),i.getAttribute("data-id")!=a&&""!=i.innerHTML&&this.selCache(a),""==j.selGetC(a)){if(""==i.innerHTML)switch(b){case"card":var k=j._template.comp.join("")+j._template.card.join("")+j._template.comp1.join("");e(k);break;case"seat":var k=j._template.comp.join("")+j._template.seat.join("")+j._template.comp1.join("");e(k);break;case"dateTime":for(var l=0,m=j._template.dateTime,n=m.length;n>l;l++){var k=d(l,m[l]);e(j._template.comp.join("")+k+j._template.comp1.join(""))}break;case"cardExpirationDate":for(var l=0,m=j._template.cardExpirationDate,n=m.length;n>l;l++){var k=c(l,m[l]);e(j._template.comp.join("")+k+j._template.comp1.join(""))}break;default:for(var l=0,m=j._template.date,n=m.length;n>l;l++){var k=c(l,m[l]);e(j._template.comp.join("")+k+j._template.comp1.join(""))}}g=$(".sel-time");for(var o=0,p=g.length;p>o;o++){for(var q=g[o].childNodes,r=!1,s=0,t=q.length;t>s;s++)if(q[s]&&"date-selected"==q[s].className){r=!0;break}r||(q[2].className="date-selected")}}else{i.innerHTML=j.selGetC(a),g=$(".date-selected");for(var o=0,n=g.length;n>o;o++){var u=g[o].parentNode,v=g[o].offsetTop-98;$(u).scrollTop(v)}}this.scrollOn(),i.setAttribute("data-id",a),i.setAttribute("data-type",b),this.selShow(1)},selCache:function(a){var b=this,c=document.getElementById("opeater");""!=c.innerHTML&&(b.cache[c.getAttribute("data-id")]=c.innerHTML,c.innerHTML="")},selShow:function(a){var b=this,c=document.getElementById("overlay"),d=document.getElementById("selbox");b.masker||(b.masker=c),b.container||(b.container=d),a?(b.masker.style.display="block",b.container.style.bottom=0,document.body.style.overflowY="hidden"):(b.masker.style.display="none",b.container.setAttribute("style",""),setTimeout(function(){$("#selbox").remove(),$("#overlay").remove()},200),document.body.style.overflowY="auto")},selResetDay:function(){},selOver:function(){for(var a=this,b=$(".sel-time .date-selected"),c=0,d=b.length,e=document.getElementById("opeater"),f=[],g=document.getElementById(""+e.getAttribute("data-id"));d>c;c++)f.push(b[c].innerHTML);if(g.setAttribute("data-cache",f.join("-")),g.innerHTML=f.join("-"),/^(textarea|input|div)$/i.test(g.nodeName))if("birth"==a.type){f.join("").replace("年","-").replace("月","-").replace("号","").replace("日","");f[0]=f[0].replace("年",""),f[1]=a.addZero(parseInt(f[1])),f[2]=a.addZero(parseInt(f[2])),"DIV"==g.nodeName?g.innerHTML=f.join("-"):"INPUT"==g.nodeName&&(g.value=f.join("-"))}else if("validity"==a.type)f[0]=f[0].replace("年",""),f[1]=a.addZero(parseInt(f[1])),f[2]=a.addZero(parseInt(f[2])),"DIV"==g.nodeName?g.innerHTML=f.join("-"):"INPUT"==g.nodeName&&(g.value=f.join("-"));else if("cardExpirationDate"==a.type){g.setAttribute("data-expire",f[0].replace("年","")+"-"+a.addZero(parseInt(f[1]))+"-01");var h=f[0];f[0]=a.addZero(parseInt(f[1])),f[1]=parseInt(h.substring(2)),"DIV"==g.nodeName?g.innerHTML=f.join("/"):"INPUT"==g.nodeName&&(g.value=f.join("/"))}else if("dateTime"==a.type){for(var i=[],j=0;d>j;j++)i.push(b[j].getAttribute("data-temp"));"DIV"==g.nodeName?g.innerHTML=i.join("/"):"INPUT"==g.nodeName&&(g.value=i.join("-"))}else $(g).attr("data-code",$(b).attr("data-code")),g.innerHTML=f.join("");a.callback&&"function"==typeof a.callback&&a.callback(),this.selShow(0)},selGetC:function(a){var b=this,c="";for(var d in b.cache)if(d==a){c=b.cache[d];break}return c},scrollTo:function(){var a=document.getElementById("opeater"),b=document.getElementById(""+a.getAttribute("data-id")).getAttribute("data-cache");if(b)for(var c=b.split("-"),d=c[0],e=c[1],f=c.length>2?c[2]:"",g=$(".sel-time"),h=0;h<g.length;h++)for(var i=g[h].childNodes,j=0;j<i.length;j++){var k=49*(j-2);switch(i[j].innerText){case d:$(g[0]).animate({scrollTop:k});break;case e:$(g[1]).animate({scrollTop:k});break;case f:2==h&&$(g[2]).animate({scrollTop:k})}}},scrollOn:function(){function a(a){for(var d=b.eq(2),e=d.scrollTop(),f=parseInt(e/49),g=[],h=1;a+1>h;h++)g.push("<span>"+h+"日</span>");d.html(c._template.comp.join("")+g.join("")+c._template.comp.join("")),f+=e/49-f>.5?3:2,d.children("span").eq(f).toggleClass("date-selected")}var b=$(".sel-time"),c=(b.length,this),d=1;$(".sel-time").bind("scrollstart",function(){}),$(".sel-time").bind("scrollstop",function(){var e=$(this),f=this.childNodes,g=this.scrollTop,h=parseInt(g/49),i=.5>=g/49-h?49*h:49*(h+1);g/49-h>.5&&h++,$(this).animate({scrollTop:i},300);for(var j=0,k=f.length;k>j;j++)f[j]&&(f[j].className=j==h+2?"date-selected":"");if("birth"==c.type||"time"==c.type)if(0==e.parent().index()){var l=parseInt(e.children("span").eq(h+2).html()),m=0==b.eq(1).scrollTop()?1:parseInt(b.eq(1).children(".date-selected").html());0==b.eq(2).scrollTop()?1:parseInt(b.eq(2).children(".date-selected").html());(l%4==0&&l%100!=0||l%400==0)&&(d=0),a(2==m&&0==d?c.days[0]:c.days[m])}else if(1==e.parent().index()){var m=parseInt(e.children("span").eq(h+2).html());a(2==m&&0==d?c.days[0]:c.days[m])}})},btnEvent:function(){var a=this;$(".cabin-cancel").on("click",function(){a.selShow(0),$(document.body).css("overflowY","auto")}),$(".cabin-sure").on("click",function(){a.selOver(),$("#popup_overlay")&&$(document.body).css("overflowY","hidden"),$(document.body).css("overflowY","auto")})},inputEvent:function(a,b,c){var d,e=this;d=document.getElementById(c)?c:a,$("#"+d).bind("click",function(){e.createContainer(a,b),e.drawData(a,b),e.type=b,e.scrollTo()})},outClick:function(){var a=this;$(document).bind("click",function(b){b=b||window.event;var c=b.target||b.srcElement;c.className.indexOf("mask")>-1&&a.selShow(0)})},addZero:function(a){return 10>a?"0"+a:""+a}};