/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
function throttle(){var a,b=arguments[0];if("boolean"==typeof b)a=arguments[1],a.__throttleID&&clearTimeout(a.__throttleID);else{a=b,param=arguments[1];var c=extend({context:null,args:[],time:300},param);arguments.callee(!0,a),a.__throttleID=setTimeout(function(){a.apply(c.context,c.args)},c.time)}}function lazyLoad(a){a&&(this.container=document.getElementById(a),this.box=this.container.parentNode,this.imgs=this.getImgs(),this.init())}var extend=function(a,b){for(var c in b)a[c]=b[c];return a};lazyLoad.prototype={init:function(){this.update(),this.bindEvent()},getImgs:function(){for(var a=[],b=this.container.getElementsByTagName("img"),c=0,d=b.length;d>c;c++)a.push(b[c]);return a},update:function(){if(this.imgs.length){var a=this.imgs.length,b="";for(--a;a>=0;a--)this.shouldShow(a)&&(b=this.imgs[a].getAttribute("data-src"),b.indexOf("http://")>-1?this.imgs[a].src=b:this.imgs[a].src=this.container.getAttribute("data-no-img"),this.imgs.splice(a,1))}},shouldShow:function(a){var b=this.imgs[a];if(this.container.parentNode.offsetHeight==document.documentElement.clientHeight){var c=this.container.parentNode.scrollTop,d=c+this.container.parentNode.clientHeight,e=this.pageY(b),f=e+b.offsetHeight;return f>c&&d>f||e>c&&d>e}var c=document.documentElement.scrollTop||document.body.scrollTop,d=c+document.documentElement.clientHeight,e=this.pageY(b),f=e+b.offsetHeight;return f>c&&d>f||e>c&&d>e},pageY:function(a){return a.offsetParent?a.offsetTop+this.pageY(a.offsetParent):a.offsetTop},on:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},bindEvent:function(){var a=this;this.on(window,"resize",function(){throttle(a.update,{context:a})}),this.on(window,"scroll",function(){throttle(a.update,{context:a})}),a.on(this.box,"scroll",function(){throttle(a.update,{context:a})})}};