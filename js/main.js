// JavaScript Document

require.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery-1.10.2.min',
        vlm: 'vlm',
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
    			}
    		}
    	},
    	'vlm':{
    		deps: ['jquery'],
    		//exports: 'vlm'
    	}
	},
	//urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','vlm','mvc','plugins'], function($,vlm,mvc) {
	var viewer = new vlm();
    viewer.init();mvc.model.setData("list",[1,2,3,4,6]);
	console.log(mvc.model.getData("list"));
	var json=json||function(){
		var oDate=new Date(),y=oDate.getFullYear(),m=oDate.getMonth()+1,d=oDate.getDate(),
		//把url字符串变成json
			json={},url=window.location.href,arr=url.split('?'),arr2=arr[1].split('&');
	    for(var i=0;i<arr2.length;i++){
	        var arr3=arr2[i].split('=');
	        json[arr3[0]]=arr3[1];
	    }
	    //添加额外json数据
        json.rank=json.rank||'priceasc';
        json.CityName=json.CityName||'Singapore';
        json.NumRoom=json.NumRoom||'1';
        json.NumChild=json.NumChild||'1';
        json.NumAdult=json.NumAdult||'1';
        json.Category=json.Category||'';
        json.StarRating=json.StarRating||'';
        json.LocationList=json.LocationList||'';
        json.InterCheckInDate=json.InterCheckInDate||y+'-'+m+'-'+d;
        json.InterCheckOutDate=json.InterCheckOutDate||y+'-'+m+'-'+(d+1);
        //
	    return json;
	};
	//c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
	var obj={
		api:"http://10.2.22.239:8888/api/GetServiceApiResult",
		conf:{
			name:"hotelList",
			id:"issue",
			data:{
            "Parameters": "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\"SG\",\"CityName\":\""+json.InterCityName+"\",\"CheckInDate\":\""+json.InterCheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.InterCheckOutDate+"T00:00:00\",\"NumRoom\":"+json.NumRoom+",\"NumAdult\":"+json.NumAdult+",\"NumChild\":"+json.NumChild+",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\""+json.rank+"\",\"Category\":\""+json.Category+"\",\"StarRating\":\""+json.StarRating+"\",\"LocationList\":\""+json.LocationList+"\"}",
            "Code": "0007",
            "ForeEndType": 3
        	},
        	operater:"c.loadJson"
        }
	}
	$(document).ready(function() {

		window.addEventListener('load', function() {
			FastClick.attach(document.body);
		}, false);


		$('.swipebox').click(function() {
			$('.gallery').hide(0);
			$('.portfolio-wide').hide(0);
		});

		

		//Countdown timer

		var endDate = "June 7, 2015 15:03:25";

		$('.countdown').countdown({
			date : endDate,
			render : function(data) {
				$(this.el).html("<div class='countdown-box box-years'><div class='countdown-years'>" + this.leadingZeros(data.years, 2) + "</div><span>years</span></div><div class='countdown-box box-days'><div class='countdown-days'>" + this.leadingZeros(data.days, 2) + "</div><span>days</span></div><div class='countdown-box box-hours'><div class='countdown-hours'>" + this.leadingZeros(data.hours, 2) + "</div><span>hours</span></div><div class='countdown-box box-minutes'><div class='countdown-minutes'>" + this.leadingZeros(data.min, 2) + "</div><span>min</span></div><div class='countdown-box box-seconds'><div class='countdown-seconds'>" + this.leadingZeros(data.sec, 2) + "</div><span>sec</span></div>");
			}
		});

		//Animate.css scroll to begin animation //

		var wow = new WOW({
			boxClass : 'animate', // animated element css class (default is wow)
			animateClass : 'animated', // animation css class (default is animated)
			offset : 0, // distance to the element when triggering the animation (default is 0)
			mobile : true,           // trigger animations on mobile devices (true is default)
		});
		wow.init();

		//Go up

		$('.footer-up').click(function() {
			$('#content').animate({
				scrollTop : 0
			}, 800, 'easeInOutQuad');
			return false;
		});

		//Check box
		$('.checkbox-one').click(function() {
			$(this).toggleClass('checkbox-one-checked');
			return false;
		});
		$('.checkbox-two').click(function() {
			$(this).toggleClass('checkbox-two-checked');
			return false;
		});
		$('.checkbox-three').click(function() {
			$(this).toggleClass('checkbox-three-checked');
			return false;
		});
		$('.radio-one').click(function() {
			$(this).toggleClass('radio-one-checked');
			return false;
		});
		$('.radio-two').click(function() {
			$(this).toggleClass('radio-two-checked');
			return false;
		});


		/////////////////////////////////////////////////////////////////////////////////////////////
		//Detect user agent for known mobile devices and show hide elements for each specific element
		/////////////////////////////////////////////////////////////////////////////////////////////

		var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
		var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
		var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
		var isiAndroid = navigator.userAgent.toLowerCase().indexOf("android");

		if (isiPhone > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').hide();
			$('.iphone-detected').show();
			$('.android-detected').hide();
		}
		if (isiPad > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').show();
			$('.iphone-detected').hide();
			$('.android-detected').hide();
		}
		if (isiPod > -1) {
			$('.ipod-detected').show();
			$('.ipad-detected').hide();
			$('.iphone-detected').hide();
			$('.android-detected').hide();
		}
		if (isiAndroid > -1) {
			$('.ipod-detected').hide();
			$('.ipad-detected').hide();
			$('.iphone-detected').hide();
			$('.android-detected').show();
		}

		//Detect if iOS WebApp Engaged and permit navigation without deploying Safari
		(function(a, b, c) {
			if ( c in b && b[c]) {
				var d, e = a.location, f = /^(a|html)$/i;
				a.addEventListener("click", function(a) {
					d = a.target;
					while (!f.test(d.nodeName))
					d = d.parentNode;
					"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
				}, !1)
			}
		})(document, window.navigator, "standalone")

		/////////////////
		//Image Gallery//
		/////////////////
		$(".swipebox").swipebox({
			useCSS : true, // false will force the use of jQuery for animations
			hideBarsDelay : 3000 // 0 to always show caption and action bar
		});

		$(".wide-gallery-item").swipebox({
			useCSS : true, // false will force the use of jQuery for animations
			hideBarsDelay : 3000 // 0 to always show caption and action bar
		});

		var time = 7;
		// time in seconds

		var $progressBar, $bar, $elem, isPause, tick, percentTime;

		//Init the carousel
		$(".homepage-slider").owlCarousel({
			slideSpeed : 500,
			paginationSpeed : 500,
			lazyLoad : true,
			singleItem : true,
			afterInit : progressBar,
			afterMove : moved,
			startDragging : pauseOnDragging
		});

		//Init progressBar where elem is $("#owl-demo")
		function progressBar(elem) {
			$elem = elem;
			//build progress bar elements
			buildProgressBar();
			//start counting
			start();
		}

		//create div#progressBar and div#bar then prepend to $("#owl-demo")
		function buildProgressBar() {
			$progressBar = $("<div>", {
				id : "progressBar"
			});
			$bar = $("<div>", {
				id : "bar"
			});
			$progressBar.append($bar).prependTo($elem);
		}

		function start() {
			//reset timer
			percentTime = 0;
			isPause = false;
			//run interval every 0.01 second
			tick = setInterval(interval, 10);
		};

		function interval() {
			if (isPause === false) {
				percentTime += 1 / time;
				$bar.css({
					width : percentTime + "%"
				});
				//if percentTime is equal or greater than 100
				if (percentTime >= 100) {
					//slide to next item
					$elem.trigger('owl.next')
				}
			}
		}

		//pause while dragging
		function pauseOnDragging() {
			isPause = true;
		}

		//moved callback
		function moved() {
			//clear interval
			clearTimeout(tick);
			//start again
			start();
		}

		// Custom Navigation Events
		$(".next-home").click(function() {
			$(".homepage-slider").trigger('owl.next');
			return false;
		});
		$(".prev-home").click(function() {
			$(".homepage-slider").trigger('owl.prev');
			return false;
		});

		//Coverpage Height 100%//

		var coverpage_height = 0;

		function initiate_coverpages() {
			coverpage_height = $(window).height();
			$('.coverpage').css({
				height : coverpage_height + 1
			});
		};

		initiate_coverpages();

		$(window).resize(function() {
			initiate_coverpages();
		});

		$.scrollIt();

		//Generate Fullscreen Elemeents

		var screen_width = 0;
		var screen_height = 0;
		function resize_coverpage() {
			screen_width = $(window).width();
			screen_height = $(window).height();

			$('.coverpage-image').css({
				height : screen_height - 60,
				width : screen_width
			});
			$('.landing-page').css({
				height : screen_height - 1,
				width : screen_width
			});

			$('.slider-image').css({
				height : screen_height - 60,
				width : screen_width
			});
		};
		resize_coverpage();
		$(window).resize(resize_coverpage);

		$(".coverpage-slider").owlCarousel({
			slideSpeed : 500,
			paginationSpeed : 500,
			singleItem : true,
			pagination : true,
			afterInit : progressBar,
			afterMove : moved,
			startDragging : pauseOnDragging
		});

	});

});

