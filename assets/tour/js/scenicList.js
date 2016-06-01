/*景点 目标城市列表页MT*/
(function() {
	var webkit = this, page = 1, apiurl = "", themeId = 0, ThemeIDSpecified = 0;
	var val = vlm.parseUrlPara(window.location.href);
	var initdata = {
		Parameters : {
			DestCityCode : val.DestCityCode,
			ThemeID : 0,
			ThemeIDSpecified : 0,
			PriceSortType : "",
			PageIndex : 1,
			PageSize : 10
		},
		ForeEndType : 3,
		Code : "0207"
	};
	function ChgPara(k, v) {
		var para = initdata["Parameters"];
		para[k] = v;
		initdata["Parameters"] = para;
	}


	(function(p) {
		var that = arguments.callee, filerCallBack = function(obj) {
			if (obj.sortTypes && obj.sortTypes.length > 0) {
				ChgPara("PriceSortType", obj.sortTypes[0]);
			}
			if (obj.filters && obj.filters.length > 0) {
				ChgPara("ThemeID", obj.filters[0].FilterValues[0]);
				ChgPara("ThemeIDSpecified", 1);
				ChgPara("PageIndex", 1);
			}
			that();
		};
		if (p) {
			if (page != p) {
				ChgPara("PageIndex", p);
			}
		}
		vlm.loadJson(apiurl, JSON.stringify(initdata), function(data) {
			var json = data, tpl_page = '<div id="loadMore">点击查看更多...</div>', tpl_end = '<div id="loadMore">没有更多...</div>';
			if (json.success && json.success.data) {
				var data = json.data, items = [], themes = data.themes, fts = {
					allowMultiSelect : 0,
					filterType : 5,
					sortNumber : 0,
					item : [],
					title : "主题"
				};
				for (var i = 0; i < themes.length; i++) {
					items.push({
						filterText : themes[i].themeName,
						filterValue : themes[i].themeID,
					});
				}
				fts.item = items;
				var f_data = {
					PriceSortType : {
						title : "价格排序",
						c : "foot_sort",
						type : 1,
						s : 1,
						key : 'sortTypes', //PriceSortType
						listData : [{
							sortText : "按价格从低到高",
							sortValue : "LowToHigh"
						}, {
							sortText : "按价格从高到低",
							sortValue : "HighToLow"
						}]
					},
					themes : {
						title : "过滤",
						c : "foot_screen",
						s : 1,
						type : 2,
						key : 'filters',
						listData : [fts]
					}
				};
				var str1 = $('#tpl_SearchAvailableToursAttractions').html(), str2 = $('#tpl_Localtxt').html();
				if (data.lists.length == 0) {
					$('#loadMore').html("没有更多……");
					$('#loadMore').unbind("click");
				} else {
					var tpl_l = ejs.render(str1, data), tpl_c = ejs.render(str2, data);
					page = p;
					if(document.getElementById("loadMore")){
						$("#loadMore").before(tpl_l);
					}else{
						$("#scenicListCont").html(tpl_l + tpl_page);
						$("#loadMore").click(function() {
							that(page + 1);
						});
					}
					$("#Localtxt").html(tpl_c);
					vlm.init();
					if (footer) {
						footer.data = f_data;
						footer.callback = filerCallBack;
					}
					footer.filters.init();
				}
			} else {
				$('.amy_error_box').show();
				//jAlert(json.message, "提示");
			}
		});
	}).call(this, 1);
})();

//城市返回记录已访问过
$('#city-back-tip').click(function() {
	var cityvisited = window.location.search;
	window.location.href = 'index.html' + cityvisited;
});
