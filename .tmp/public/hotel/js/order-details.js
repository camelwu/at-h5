/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
!function(){var a={getbyid:function(a){return document.getElementById(a)},getbytag:function(a,b){return a.getElementsByTagName(b)},getbyclass:function(a,b){if(a.getElementsByClassName)return a.getElementsByClassName(b);for(var c=[],d=a.getElementsByTagName("*"),e=new RegExp("\\b"+b+"\\b","g"),f=0;f<d.length;f++)-1!=d[f].className.search(e)&&c.push(d[f]);return c},bind:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},stopPropagation:function(a){var b=ev||a;b.stopPropagation?b.stopPropagation():b.cancelBubble=!0},addClass:function(a,b){if(a.className){var c=new RegExp("\\b"+b+"\\b","g");-1==a.className.search(c)&&(a.className+=" "+b)}else a.className=b},removeClass:function(a,b){if(a.className){var c=new RegExp("\\b"+b+"\\b","g");-1!=a.className.search(c)&&(a.className=a.className.replace(c,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," "),a.className||a.removeAttribute("class"))}}},b=document.getElementById("td_back");a.bind(b,"click",function(){window.history.go(-1)})}();