// JavaScript Document

require.config({
    baseUrl: '../js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // jsb/jquery-1.9.0.js, relative to
        jquery: 'jquery',
        vcm: 'vcm',
        vlm: 'vlm',
        plugins: 'plugins',
        //custom: 'custom'
    },
    $:['jquery'],
    shim: {
    	'plugins':{
    		deps: ['jquery'],
    		init:function(){
    			return{
    				WOW:WOW,
    				FastClick:FastClick,
    				owlCarousel:owlCarousel,
    				countdown:countdown,
    				swipebox:swipebox,
    				ScrollIt:ScrollIt,
    				Snap:Snap
    			}
    		}
    	},
    	//'custom':{
    	//	deps: ['jquery','plugins']
    	//},
    	'vcm':{
    		deps: ['jquery'],
    		exports: 'vcm'
        },
        'vlm':{
    		deps: ['jquery'],
    		exports: 'vlm'
        }//,
        //'controller':{
    		//deps: ['jquery','module'],
    		//exports: 'controller'
        //},
        //'jqueryui': {//定义必须先加载jquery,再加载easyui,否则会出错。
		//	deps: ['jquery']
		//}
	},
	//urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','vlm'], function($,vlm) {
	//console.log("dataReady="+vlm);
	var viewer = new vlm();
	viewer._init();
	var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function() {
 
            var timer,
                handler =  function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
 
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid1, handler);
 
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };
 
    special.scrollstop = {
        latency: 300,
        setup: function() {
 
            var timer,
                    handler = function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    }
 
                    timer = setTimeout( function(){
 
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);
 
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll', handler).data(uid2, handler);
 
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };

    //初始插入年

    crateYear(setYears());

    $(".sel-time").bind("scrollstart",function(){

    });

    $(".sel-time").bind("scrollstop",function(){

		var obj=$(this),
            posY = this.scrollTop,
            p = parseInt(posY/39),
            h = posY/39 - p <=0.5?p*39:(p+1)*39;
        if(posY/39 - p >0.5){
            p++;
        }
		console.log(posY+","+p+","+h+"=="+(posY/39 - p)+"="+(posY/39 - p<=0.5));
		$(this).animate({scrollTop:h} ,300);
		$(this).children("span").removeClass('date-selected');
		$(this).children("span").eq((p+2)).addClass('date-selected');

        //年滑动时
        if(obj.parent().index() == 0) {

            var oNewYear= parseInt(obj.children('span').eq((p+2)).html());
            var month = parseInt($('#mon').children(".date-selected").html());
            showday(month,p);
        }
        //月滑动时
        else if(obj.parent().index() == 1) {
            var month = parseInt(obj.children("span").eq(p+2).html());
            showday(month,p);
        }
  });


});

//根据月份判断天数
    function showday(mon, p){
        switch (mon) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            createDay(31);
            tab_correct($('#day'));
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            createDay(30);
            tab_correct($('#day'));
            break;
        case 2:
            var oNewYear = parseInt($('#year').children().eq((p + 2)).html());

            if (getYearmsg(oNewYear)) {
                createDay(29);
                tab_correct($('#day'));
            } else {
                createDay(28);
                tab_correct($('#day'));
            }
            break;
        default:;
    }
}


//判断闰年
    function getYearmsg(year)
    {
        if((year%4==0 && year%100!=0) || year%400==0)
        {
            //是闰年;
            return true;
        }
        else {
            //不是闰年;
            return false;
        }
    }


//插入天数
    function createDay(day){
        var oLiDay=document.querySelector('#mt-day'),arr3=[];
        for(var i=1;i<day+1; i++)
        {
            arr3.push('<span>'+i+'号</span>');
        }
        var str=arr3.join(' ');
        oLiDay.innerHTML='<div class="sel-time" id="day"><span>&nbsp;</span><span>&nbsp;</span>'+str+'<span>&nbsp;</span><span>&nbsp;</span></div><div class="sel-box d"></div>';
        oLiDay.children[0].children[2].className='date-selected';
    }


//绑定偏移矫正函数
function tab_correct(obj1){
    $(obj1).bind("scrollstop",function() {

        var that = this, obj = $(this),
            posY = this.scrollTop,
            p = parseInt(posY / 39),
            h = posY / 39 - p <= 0.5 ? p * 39 : (p + 1) * 39;
        if (posY / 39 - p > 0.5) {
            p++;
        }
        //console.log(posY+","+p+","+h+"=="+(posY/39 - p)+"="+(posY/39 - p<=0.5));
        $(this).animate({scrollTop: h}, 300);
        $(this).children("span").removeAttr("style").removeClass('date-selected');
        $(this).children("span").eq((p+2)).css({"color":"#484848","font-size":"1.9rem"}).addClass('date-selected');
    });
}

//初始插入年份
function setYears(){
    var Y= [],years= new Date().getFullYear();
    for(var i=1900;i<=years;i++){
        Y.push(i);
    }
    return Y.length;

}

function crateYear(year){
    var oLi=document.querySelector('#mt-year'),arr2=[];
    for(var i=(year+1899);i>1900; i--)
    {
        arr2.push('<span>'+i+'年</span>');
    }
    var str=arr2.join(' ');
    if(oLi)
    {
        oLi.innerHTML='<div class="sel-time" id="year"><span>&nbsp;</span><span>&nbsp;</span>'+str+'<span>&nbsp;</span><span>&nbsp;</span></div><div class="sel-box y"></div>';
        oLi.children[0].children[2].className='date-selected';
    }


}
//define
