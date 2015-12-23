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
        vlm: 'vlm',
        controller: 'controller',
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
    	},
    	'module':{
    		deps: ['jquery'],
    		exports: 'module'
    	},
    	'controller':{
    		deps: ['jquery','module'],
    		exports: 'controller'
    	},
    	'jqueryui': {//定义必须先加载jquery,再加载easyui,否则会出错。
			deps: ['jquery']
		}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','custom','vlm'], function($,custom,vlm) {
	//console.log("dataReady="+vlm);
	var viewer = new vlm();
    viewer._init();
    
});



function sub_frm(frm){
	ss.val==""
	
}
