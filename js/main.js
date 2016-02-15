// JavaScript Document

require.config({
    baseUrl: 'js/lib',
    paths: {
        plugins: 'plugins'
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

require(['jquery','vlm','custom'], function($,vlm) {

	vlm.init();
});
