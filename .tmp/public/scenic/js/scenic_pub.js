/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
!function(){var a=this,b=function(){var a="http://10.6.11.20:8888/api/GetServiceApiResult",b=[],c=[{city:{inland:{hotcity:0,citylist:0},oversea:{hotcity:"0096",citylist:"0086"}}},{city:{inland:{hotcity:0,citylist:0},oversea:{hotcity:"0096",citylist:"0086"}}}],d=function(){return localStorage.getItem("XCache")},e=function(a,b){return{CallbackCity:c[a],CallbackUrl:b}},f=function(a,b){var c=a.replace(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})T(\d{1,2})[:](\d{1,2})[:](\d{1,2})/g,function(){b=void 0!=b&&""!=b?b:"-";var a=[];return a=[].slice.call(arguments),a=a.slice(1,4),a[0]+b+a[1]+b+a[2]});return c},g=function(a){if(a){var b,c=new Date(a.replace(/-/g,"/")).getDay();switch(c){case 0:b="周日";break;case 1:b="周一";break;case 2:b="周二";break;case 3:b="周三";break;case 4:b="周四";break;case 5:b="周五";break;case 6:b="周六"}return b}},h=function(a){var b=new RegExp("(^|&)"+a+"=([^]*)(&|$)"),c=window.location.search.substr(1).match(b);return null!=c?decodeURI(c[2]):null},i=function(a){var a=a||location.search,b=[];if(-1!=a.indexOf("?")){var c=a.substr(a.indexOf("?")+1,a.len);strs=c.split("&");for(var d=0;d<strs.length;d++)b[d]=strs[d]}return b},j=function(){l()},k=function(){$(".gui-tab-mod li").click(function(){switch($key=$(this).attr("data-key"),$key){case"1":l();break;case"2":m()}})},l=function(){$("[data-key = 2]").removeClass("gui-tab-current cp"),$("[data-key = 1]").addClass("gui-tab-current cp"),$(".gui-tab-scrollbar").animate({left:0},"slow"),$("#js_oversea").show(),$("#js_inland").hide()},m=function(){$("[data-key = 1]").removeClass("gui-tab-current cp"),$("[data-key = 2]").addClass("gui-tab-current cp"),$(".gui-tab-scrollbar").animate({left:$(".gui-tab-scrollbar").css("width")},"slow"),$("#js_oversea").hide(),$("#js_inland").show()},n=function(a,b){return a.cityNamePY.substr(0,1).toUpperCase().charCodeAt(0)-b.cityNamePY.substr(0,1).toUpperCase().charCodeAt(0)},o=function(a){for(var b,c,d=a,e=[],f=0,g=0;g<d.length-1;g++)b=d[g].cityNamePY.substr(0,1).toUpperCase().charCodeAt(0),c=d[g+1].cityNamePY.substr(0,1).toUpperCase().charCodeAt(0),b!=c&&(e.push(d.slice(f,g+1)),f=g+1);return e},p=function(a){b=a},q=function(a){b.push(a)},r=function(){return b.shift()},s=function(){return b[0]},t=function(){return 0==b.length},u=function(){b=[]},v=function(){return b.length},w=function(){return b},x=function(){var a=$('<div id="preloader"><div id="status"><p class="center-text"><br><em></em></p></div></div>');return a},y=function(){$("[id=preloader]").length<1&&$("body").after(x()),$("[id=preloader]").show()},z=function(){$("[id=preloader]").fadeOut()},A=function(){$("[id=preloader]").length<1&&$("body").after(x()),$("#preloader").ajaxStart(function(){$(this).show()})},B=function(){$("#preloader").ajaxStop(function(){$(this).delay(400).fadeOut()})},C=function(b,c,d,e,f,g,h){void 0!=e&&""!=e&&e(),void 0!=g&&1==g&&$.ajaxSetup({async:!1}),a=b||a,$.ajax({type:"post",url:a+"?rnd="+Math.random(),data:c,contentType:"application/json;charset=utf-8",beforeSend:function(a){if(void 0!=h&&1==h){md5("zhangfengming"),md5("");a.setRequestHeader("uid",user)}},success:function(a){d(a)}}),void 0!=f&&""!=f&&f(),$.ajaxSetup({async:!0})};return{MTtabInit:j,MTtab:k,CLoadJson:C,AnimIn:y,AnimOut:z,CAnimIn:A,CAnimOut:B,SplitCitiesArray:o,ByCities:n,getCity:e,GetQueryString:h,GetRequestUrl:i,getYMD:f,getWeek:g,enqueue:q,dequeue:r,front:s,isEmpty:t,clear:u,size:v,showrender:w,setItems:p,XCache:d}}();a.MT=a.MT||{},a.MT.XCache=function(){return b.XCache()},a.MT.QsetItems=function(a){b.setItems(a)},a.MT.Qenqueue=function(a){b.enqueue(a)},a.MT.Qdequeue=function(){return b.dequeue()},a.MT.Qfront=function(){return b.front()},a.MT.QisEmpty=function(){return b.isEmpty()},a.MT.Qclear=function(){b.clear()},a.MT.Qsize=function(){return b.size()},a.MT.Qshowrender=function(){return b.showrender()},a.MT.tabScroll=function(){b.MTtabInit(),b.MTtab()},a.MT.AnimIn=function(){b.AnimIn()},a.MT.AnimOut=function(){b.AnimOut()},a.MT.ajaxAnimIn=function(){b.CAnimIn()},a.MT.ajaxAnimOut=function(){b.CAnimOut()},a.MT.ajaxJson=function(a,c,d,e,f,g,h){b.CLoadJson(a,c,d,e,f,g,h)},a.MT.ByCities=function(a,c){return b.ByCities(a,c)},a.MT.getCity=function(a,c){return b.getCity(a,c)},a.MT.GetQueryString=function(a){return b.GetQueryString(a)},a.MT.GetRequestUrl=function(a){return b.GetRequestUrl(a)},a.MT.SplitCitiesArray=function(a){return b.SplitCitiesArray(a)},a.MT.getYMD=function(a,c){return b.getYMD(a,c)},a.MT.getWeek=function(a){return b.getWeek(a)}}();