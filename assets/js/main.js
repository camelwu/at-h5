﻿// JavaScript Document

require.config({
    baseUrl: '../js/lib',

    paths: {
        baseCss:"../../styles",
        plugins: 'plugins',
        pluginsCss:"../../css/plugins"

    },
    waitSeconds: 0,
    $:['jquery'],
    shim: {
    	'plugins':{
    		deps: [
          'jquery'
        ],
    		init:function(){
    			return{
    				WOW:WOW,
    				FastClick:FastClick,
    				owlCarousel:owlCarousel,
    				countdown:countdown,
    				swipebox:swipebox,
    				ScrollIt:ScrollIt,
    				Snap:Snap,
            ChoiceUser:choiceuser
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
	//vlm.checkLogin();
});
