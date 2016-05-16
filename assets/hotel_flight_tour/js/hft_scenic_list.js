/**
 * Created byon 2016/5/5.
 */
(function() {
	var webkit = this;
	var core = function() {
		var url = "";
		var themeId = "";
		//获取附近城市列表
		//获取景点列表
		var ScenicList = function() {
			var destCityCode = JSON.parse(localStorage.getItem("searchInfo")).FromCity;
			var departCityCode = JSON.parse(localStorage.getItem("searchInfo")).ToCity;
			var SParameter = {
				"Parameters" : {
					"departCityCode" : destCityCode,
					"destCityCode" : departCityCode
				},
				"ForeEndType" : 3,
				"Code" : "60100002"
			};
			console.log(JSON.stringify(SParameter));
			vlm.loadJson(url, JSON.stringify(SParameter), callback);
		};
		var callback = function(data) {
			vlm.init();
			if (data.success) {
				var localStoragedata = JSON.parse(localStorage.getItem("searchInfo"));
				console.log(data);
				var htmlt = $("#timeDetile").html();
				var htmlT = ejs.render(htmlt, localStoragedata);
				$("#TimeList").html(htmlT);
				var htmlp = $("#scenicDetile").html();
				var html = ejs.render(htmlp, data.data);
				$("#scenicList").html(html);
				var htmlc = $("#CityDetile").html();
				var htmlC = ejs.render(htmlc, data.data);
				$("#CityList").html(htmlC);
				var htmls = $("#SortDetile").html();
				var htmlS = ejs.render(htmls, data.data);
				$("#SortList").html(htmlS);
				var htmlf = $("#FilterDetile").html();
				var htmlF = ejs.render(htmlf, data.data);
				$("#FilterList").html(htmlF);
				PWidth(data);
				var packageid = $(".scenic-detile_list").attr("data-packageid");
				console.log(packageid);
				var scenicItem = {
					packageid : packageid
				};
				localStorage.setItem('scenicItem', JSON.stringify(scenicItem));
				$(".scenic-detile_list").on("click", function() {
					var packageid = $(this).attr("data-packageid");
					window.location.href = 'hft_choose.html?type=2&packageId=' + packageid;
				});
				// 添加底部筛选
				var f_data = {
					sortTypes : {
						title : "推荐排序",
						c : "foot_sort",
						type : 1,
						key : 'sortTypes',
						listData : data.data.sortTypes
					},
					themes : {
						title : "筛选",
						c : "foot_screen",
						type : 2,
						key : 'themes',
						listData : data.data.themes
					}
				}, menu_call = function() {
					alert("js request json.");
				};
				if (footer) {
					footer.data = f_data;
					footer.callback = menu_call;
				}
				footer.filters.init();
			} else {
				alert(data.message, "提示");
			}
		};
		//城市列表父宽
		var PWidth = function(data) {
			var sum = 0, ride = 0;
			for (var i = 0; i <= data.data.recommendCities.length; i++) {
				sum += i;
			}
			ride = sum * 2;
			$(".city_list ul").css({
				'width' : ride + 'rem'
			});
		};
		//价格排序调数据
		var priceSort = function(sortType) {
			var destCityCode = vlm.getpara("destCityCode");
			var departCityCode = vlm.getpara("departCityCode");
			//var sortType=vlm.getpara("sortType");
			var PParamenter = {
				"Parameters" : {
					"destCityCode" : destCityCode,
					"departCityCode" : departCityCode,
					"sortType" : sortType
				},
				"ForeEndType" : 3,
				"Code" : "60100002"
			};
			vlm.loadJson("", JSON.stringify(PParamenter), function(data) {
				if (data.success) {
					var htmlp = $("#scenicDetile").html();
					var html = ejs.render(htmlp, data.data);
					$("#scenicList").html(html);
					if (themeId != "") {
						PParamenter.Parameters.ThemeID = themeId;
					}
				} else {
					console.log(data);
					jAlert(data.message, "提示");
				}
			});
		};
		//根据主题筛选调数据
		var filterTheme = function(themeId) {
			var destCityCode = vlm.getpara("departCityCode");
			var Tparameter = {
				"Parameters" : {
					"destCityCode" : destCityCode,
					"themeID" : themeId
				},
				"foreEndType" : 3,
				"code" : "60100002"
			};
			console.log(JSON.stringify(Tparameter));
			vlm.loadJson("", JSON.stringify(Tparameter), function(data) {
				if (data.success) {
					var htmlp = $("#scenicDetile").html();
					var html = ejs.render(htmlp, data.data);
					$("#scenicList").html(html);
					if (themes.length == 0) {
						jAlert("抱歉暂时没有数据", "提示");
					}
				} else {
				}
			});
		};
		return {
			ScenicList : ScenicList
		};
	}();
	webkit.vlm = webkit.vlm || {};
	webkit.vlm.load = function() {
		core.ScenicList();
	};
})();
vlm.load();
//城市返回记录已访问过
$('#g_back').click(function() {
	var isInit = window.location.search;
	window.location.href = 'index.html' + isInit;
});
