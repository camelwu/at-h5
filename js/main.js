// JavaScript Document

require.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery',
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
    	'vlm':{
    		deps: ['jquery'],
    		exports: 'vlm'
    	}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','custom','vlm'], function($,custom,vlm) {
	//console.log("dataReady="+vlm);
	var viewer = new vlm();
    viewer.init();
    
});
