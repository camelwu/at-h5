/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
var ticketOrderDetail={CultureName:"zh-CN",requestUrl:"",addHandler:function(a,b,c){document.addEventListener?this.addHandler=function(a,b,c){}:document.attachEvent?this.addHandler=function(a,b,c){a.attachEvent("on"+b,function(){c.call(a)})}:this.addHandler=function(a,b,c){a["on"+b]=c},this.addHandler(a,b,c)},tAjax:function(a,b,c,d,e){var f={Parameters:JSON.stringify(b),ForeEndType:d,Code:c},g=new vcm;g.loadJson(a,JSON.stringify(f),e)},addEvent:function(){var a=document.querySelector(".contact-service"),b=document.querySelector(".tel-icon"),c=document.querySelector(".mb"),d=document.querySelector(".contact-wrap"),e=document.querySelector(".cancel"),f=document.querySelector(".call"),g=(document.querySelector(".contact-wrap-outer"),document.querySelector(".pay-button"));this.addHandler(b,"click",function(){c.style.display="block",d.style.display="block"}),this.addHandler(g,"click",function(){document.location.href="pay_fail.html"}),this.addHandler(a,"click",function(){var a=document.createElement("div"),b='<div class="contact-wrap-outer">          <div class="clearfix"><i class="fl close-concat"></i>               <span>联系客服</span>           </div>          <div class="enter-contact-text">             <textarea maxlength="200" rows="8" placeholder="输入申请内容" autofocus="" required=""></textarea>          </div>          <div class="tip-button-para">            <button type="button" class="contact-button">发送</button>          <p class="contact-para">                感谢您对我们的信任，我们会在一个工作日内联系您，请耐心等待！          </p>          </div>          </div>';a.className="contact-wrap-outer",a.innerHTML=b,document.body.insertBefore(a,d)}),this.addHandler(e,"click",function(){c.style.display="none",d.style.display="none"}),this.addHandler(f,"click",function(){c.style.display="none",d.style.display="none"}),this.addHandler(document.body,"click",function(){var a=a||window.event,b=a.target||a.srcElement,c=ticketOrderDetail,d={};"fl close-concat"==b.className?0!=Boolean(document.querySelector(".contact-wrap-outer"))?document.body.removeChild(document.querySelector(".contact-wrap-outer")):void 0:"contact-button"==b.className&&(document.body.querySelector("textarea").value?(d.orderNumber="12345678",d.contactText=document.body.querySelector("textarea").value,c.tAjax(c.requestUrl,c.backParaObj,"3001",3,function(){0!=Boolean(document.querySelector(".contact-wrap-outer"))?document.body.removeChild(document.querySelector(".contact-wrap-outer")):void 0})):jAlert("请输入申请内容再发送!","",function(){}))})},init:function(){this.addEvent()}};ticketOrderDetail.init();