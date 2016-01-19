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

require(['jquery','vcm','vlm'], function($,vcm,vlm) {
	//console.log("dataReady="+vlm);
	var viewer = new vlm();
	viewer._init();

});
//define