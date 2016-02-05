// JavaScript Document

require.config({
    baseUrl: '../js/lib',
    paths: {
        jquery: 'jquery',
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
    	}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','custom','vlm'], function($,custom,vlm) {
	(function($){
		$(window).load(function() {
			vlm.init();
		});
    }(jQuery));
});
