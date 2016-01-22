// JavaScript Document

require.config({
    baseUrl: 'js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        jquery: 'jquery',
        vcm: 'vcm',
        vlm: 'vlm',
        plugins: 'plugins',
        custom: 'custom'
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
    	'custom':{
    		deps: ['jquery','plugins']
    	},
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

require(['jquery','custom','vcm','vlm'], function($,custom,vcm,vlm) {
	console.log($);
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
    $(".sel-time").bind("scrollstart",function(e){
    	
    });
    $(".sel-time").bind("scrollstop",function(e){
		var that = this,obj=$(this),
		posY = this.scrollTop,
		p = parseInt(posY/39),
		h = posY/39 - p <=0.5?p*39:(p+1)*39;
		if(posY/39 - p >0.5){
			p++;
		}
		console.log(posY+","+p+","+h+"=="+(posY/39 - p)+"="+(posY/39 - p<=0.5));
		$(this).animate({scrollTop:h} ,300);
		$(this).children("span").removeAttr("style");
		$(this).children("span").eq((p+2)).css({"color":"#484848","font-size":"2.0rem"});
	});
});
//define

//AMD CMD