/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
function h_l_s(){function a(a){return document.getElementById(a)}function b(a){j=document.getElementById("r-mb"),j.style.display="block",a.style.bottom="0",a.style.transition="all 350ms"}function c(a){j=document.getElementById("r-mb"),j.style.display="none",a.style.bottom="-550px",a.style.transition="all 350ms"}function d(){j=document.getElementById("r-mb"),j.style.display="none",""!=n.style.display&&"block"!=n.style.display||(n.style.bottom="-550px",n.style.transition="all 350ms"),""!=o.style.display&&"block"!=o.style.display||(o.style.bottom="-550px",o.style.transition="all 350ms"),""!=p.style.display&&"block"!=p.style.display||(p.style.bottom="-550px",p.style.transition="all 350ms")}function e(){var a=window.event.srcElement,b=a.className,c=[];if("不限"==a.innerHTML){c=document.getElementById("h-type").childNodes;for(var d=1;d<c.length;d++)c[d].className="s-li"}"不限"!=a.innerHTML&&(document.getElementById("h-type").firstElementChild.className="s-li"),"s-li"==b?a.className="s-li1":a.className="s-li"}function f(){var a=window.event.srcElement,b=a.className,c=[];if("不限"==a.innerHTML){c=document.getElementById("h-level").childNodes;for(var d=1;d<c.length;d++)c[d].className="s-li"}"不限"!=a.innerHTML&&(document.getElementById("h-level").firstElementChild.className="s-li"),"s-li"==b?a.className="s-li1":a.className="s-li"}function g(a,c){a.onclick=function(){b(c),j.addEventListener("click",d)}}function h(a,b){a.onclick=function(){c(b)}}function i(){var a=window.event.srcElement,b=document.getElementById("rank"),c=document.getElementById("r-mb"),d=a.style.color;if("rgb(252, 148, 100)"==d)c.style.display="none",b.style.bottom="-550px",b.style.transition="all 350ms";else{for(var e=0;e<k.length;e++){if("rgb(252, 148, 100)"==k[e].style.color){var f=k[e].getElementsByTagName("b")[0];k[e].removeChild(f)}k[e].style.color="#b3b2b4"}a.style.color="#fc9464";var g=document.createElement("b");g.className="hl-icon5",a.appendChild(g),c.style.display="none",b.style.bottom="-550px",b.style.transition="all 350ms"}}var j,k=[],l=[],m=[],n=a("rank"),o=a("screen"),p=a("location"),q=a("fo_ra"),r=a("fo_sc"),s=a("fo_lo"),t=a("s_but"),u=a("l_but");this.init=function(a){l=document.getElementById("h-level").childNodes;for(var b=0;b<l.length;b++)l[b].addEventListener("click",f);m=document.getElementById("h-type").childNodes;for(var c=0;c<m.length;c++)m[c].addEventListener("click",e);k=document.getElementsByClassName("r-li");for(var d=0;d<k.length;d++)k[d].addEventListener("click",i)},init(),g(q,n),g(r,o),g(s,p),h(t,o),h(u,p),function(a){a(document).ready(function(){window.addEventListener("load",function(){FastClick.attach(document.body)},!1)})}(jQuery)}