/**
 * Created by changlv on 2015/12/11.
 */
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
    				Snap:Snap
    			}
    		}
    	},
    	'vlm':{
    		deps: ['jquery'],
    		//exports: 'vlm'
    	}
	},
	urlArgs: "bust=" +  (new Date()).getTime()
});
require(['jquery','vlm','mvc','plugins'], function($,vlm,mvc) {
	
	function showRank(){
	    var rank=document.getElementById("rank");
	    var mb=document.getElementById("r-mb");
	    mb.style.display="block";
	    rank.style.bottom="0";
	    rank.style.transition="all 2s";
	}
	function hiddenRank(){
	    var rank=document.getElementById("rank");
	    var mb=document.getElementById("r-mb");
	    mb.style.display="none";
	    rank.style.bottom=-350+'px';
	    rank.style.transition="all 3s";
	}
	function showScreen(){
	    var rank=document.getElementById("screen");
	    var mb=document.getElementById("s-mb");
	    mb.style.display="block";
	    rank.style.bottom="0";
	    rank.style.transition="all 2s";
	}
	function hiddenScreen(){
	    var rank=document.getElementById("screen");
	    var mb=document.getElementById("s-mb");
	    mb.style.display="none";
	    rank.style.bottom=-350+'px';
	    rank.style.transition="all 3s";
	}
	function showLocation(){
	    var rank=document.getElementById("location");
	    var mb=document.getElementById("l-mb");
	    mb.style.display="block";
	    rank.style.bottom="0";
	    rank.style.transition="all 2s";
	}
	function hiddenLocation(){
	    var rank=document.getElementById("location");
	    var mb=document.getElementById("l-mb");
	    mb.style.display="none";
	    rank.style.bottom=-350+'px';
	    rank.style.transition="all 3s";
	}
////////////////////////

var is = function(obj, type) {
				return (type === "Null" && obj === null) || (type === "Undefined" && obj ===
				void 0 ) || (type === "Number" && isFinite(obj)) || Object.prototype.toString.call(obj).slice(8, -1) === type;
			};
			// 初始化MVC对象
			var MVC = MVC ||
			function() {
				if (!arguments.length)
					return;
				this.ctrl.apply(this, arguments);
			};
			MVC.prototype = {
				constructor : MVC,
				// 初始化MVC数据模型
				model : function() {
					//内部对象
					var M = {};
					//服务器端获取数据，通常Ajax方式并存储，直接作为同步数据并写在页面中，减少服务器端异步请求操作
					M.data = {
						hotelList : {
							"success" : true,
							"message" : "",
							"data" : [{
								"hotelList" : [{
									"hotelCode" : "8016",
									"hotelName" : "Grand mid rest",
									"hotelNameLocale" : "Hotel Grand Chancellor",
									"starRating" : "3 stars",
									"location" : "Little India",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "32.91",
									"avgPriceCNY" : 168.0,
									"priority" : "7",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/8016/8016facade.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "52",
									"hotelReviewScore" : "3.7",
									"isFreeTransfer" : false,
									"isFreeCityTour" : true,
									"isFreeWifi" : false,
									"category" : "酒店"
								}, {
									"hotelCode" : "8830",
									"hotelName" : "haibo test hotel",
									"hotelNameLocale" : "距离圣费尔南多镇5公里，定期航班线路由马尼拉直飞圣费尔南多国际机场，卡胡纳海滩度假酒店提供机场接送服务。",
									"starRating" : "4 stars",
									"location" : "Chinatown",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "81.27",
									"avgPriceCNY" : 416.0,
									"priority" : "1",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/8830/facade-kahuna.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "0",
									"hotelReviewScore" : "0",
									"isFreeTransfer" : false,
									"isFreeCityTour" : true,
									"isFreeWifi" : false,
									"category" : "酒店"
								}, {
									"hotelCode" : "3283",
									"hotelName" : "Fragrance Hotel Selegie",
									"hotelNameLocale" : "新加坡飞龙酒店-实利基",
									"starRating" : "2 stars",
									"location" : "city",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "116.21",
									"avgPriceCNY" : 595.0,
									"priority" : "78",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/3283/3283front.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "7",
									"hotelReviewScore" : "3.2",
									"isFreeTransfer" : false,
									"isFreeCityTour" : true,
									"isFreeWifi" : false,
									"category" : "酒店"
								}, {
									"hotelCode" : "25",
									"hotelName" : "Hotel Grand Central",
									"hotelNameLocale" : "新加坡大中酒店",
									"starRating" : "3 stars",
									"location" : "city",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "162.54",
									"avgPriceCNY" : 832.0,
									"priority" : "30",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/25/25exterior.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "20",
									"hotelReviewScore" : "3.4",
									"isFreeTransfer" : false,
									"isFreeCityTour" : false,
									"isFreeWifi" : false,
									"category" : "酒店"
								}, {
									"hotelCode" : "30",
									"hotelName" : "Gallery Hotel",
									"hotelNameLocale" : "Gallery Hotel",
									"starRating" : "4 stars",
									"location" : "River Valley",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "162.54",
									"avgPriceCNY" : 832.0,
									"priority" : "80",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/30/30facade.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "8",
									"hotelReviewScore" : "3.4",
									"isFreeTransfer" : false,
									"isFreeCityTour" : false,
									"isFreeWifi" : false,
									"category" : "酒店"
								}, {
									"hotelCode" : "50",
									"hotelName" : "Orchard Hotel",
									"hotelNameLocale" : "新加坡乌节大酒店",
									"starRating" : "4 stars",
									"location" : "Orchard",
									"city" : "新加坡",
									"currency" : "SGD",
									"avgPrice" : "162.54",
									"avgPriceCNY" : 832.0,
									"priority" : "117",
									"frontPgImage" : "http://images.asiatravel.com/Hotel/50/50new_facade.jpg",
									"isCashRebate" : true,
									"isCashReward" : true,
									"hotelReviewCount" : "4",
									"hotelReviewScore" : "3.8",
									"isFreeTransfer" : false,
									"isFreeCityTour" : false,
									"isFreeWifi" : false,
									"category" : "酒店"
								}],
								"locationList" : ["Chinatown", "Little India", "city", "River Valley", "Orchard"]
							}]
						}
					};
					//配置数据，页面加载时即提供
					M.conf = {};
					//返回操作方法
					return {
						getData : function(m) {
							return M.data[m];
						},
						getConf : function(c) {
							return M.conf[c];
						},
						setData : function(m, v) {
							M.data[m] = v;
							return this;
						},
						setConf : function(c, v) {
							M.conf[c] = v;
							return this;
						}
					};
				},
				// 初始化MVC视图层
				view : function() {
					//模型数据层对象操作方法引用
					var M = this.model();
					//内部视图创建方法对象
					var V = {
						getTemplate : function() {
							console.log(M.getConf("id"));
							var container = document.getElementById(M.getConf("id"));
							var tp = container.innerHTML;
							console.log(tp);
						},
						formateString : function(str, data) {
							var html = '';
							if ( data instanceof Array) {
								for (var i = 0, len = data.length; i < len; i++) {
									html += arguments.callee(str, data[i]);
								}
								return html;
							} else {
								return str.replace(/\{#(\w+)#}/g, function(match, key) {
									return typeof data === 'string' ? data : ( typeof data[key] === 'undefined' ? '' : data[key]);
								});
							}
						}
					};
					//获取视图接口方法
					return function(v) {
						//根据视图名称返回视图，
						V[v]();
					};
				},
				// 初始化MVC控制器
				ctrl : function() {
					//模型数据层对象操作方法引用
					var M = this.model(),
					//视图数据层对象操作方法引用
					V = this.view(),
					//获取参数
					options = arguments[0];
					//初始化
					if (is(options,"Array")) {
						console.log('数组');
					}else{
						//设置数据
						for (var i in options) {
							M.setConf(i, options[i]);
						}
	
						console.log(M.getConf("id"));
					
						//控制器创建方法对象
						var C = {};
						//vlm.loadJson(JSON.stringify(options.request), function(data){console.log(data);});
						V("getTemplate");
					}
				}
			};

			var vlm = new vlm(), json = function() {
				var oDate = new Date();
				//把url字符串变成json
				var json = {}, url = window.location.href, arr = url.split('?'), arr2 = arr[1].split('&');
				for (var i = 0; i < arr2.length; i++) {
					var arr3 = arr2[i].split('=');
					json[arr3[0]] = arr3[1];
				}
				//添加额外json数据
				json.rank = json.rank || 'priceasc';
				json.CityName = json.CityName || 'Singapore';
				json.NumRoom = json.NumRoom || '1';
				json.NumChild = json.NumChild || '1';
				json.NumAdult = json.NumAdult || '1';
				json.Category = json.Category || '';
				json.StarRating = json.StarRating || '';
				json.LocationList = json.LocationList || '';
				if(vlm.Utils.compareTime(json.InterCheckInDate)){
					json.InterCheckInDate = json.InterCheckInDate;
					json.InterCheckOutDate = json.InterCheckOutDate;
				}else{
					//oDate.setDate(oDate.getDate()+1);console.log(oDate.toLocaleString());
					json.InterCheckInDate = vlm.Utils.format_date(oDate.setDate(oDate.getDate()+1),"Ymd");
					json.InterCheckOutDate = vlm.Utils.format_date(oDate.setDate(oDate.getDate()+2),"Ymd");
				}
				
				
				
				return json;
			}();

			
			//
			var obj = {
				"name" : "hotelList",
				"id" : "issue",
				"request" : {
					Parameters : "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\"SG\",\"CityName\":\"" + json.InterCityName + "\",\"CheckInDate\":\"" + json.InterCheckInDate + "T00:00:00\",\"CheckOutDate\":\"" + json.InterCheckOutDate + "T00:00:00\",\"NumRoom\":" + json.NumRoom + ",\"NumAdult\":" + json.NumAdult + ",\"NumChild\":" + json.NumChild + ",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\"" + json.rank + "\",\"Category\":\"" + json.Category + "\",\"StarRating\":\"" + json.StarRating + "\",\"LocationList\":\"" + json.LocationList + "\"}",
					Code : "0007",
					ForeEndType : 3
				},
				"operater" : {
					bind : function() {
						alert(12);
					}
				}
			}, d = new MVC(obj);
			
			
});

