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
			if (obj.sortTypes) {
				console.log(obj.sortTypes[0]);
				ChgPara("PriceSortType", obj.sortTypes[0]);
			}
			if (obj.themes && obj.themes.length > 0) {
				ChgPara("ThemeID", obj.themes[0]);
				ChgPara("ThemeIDSpecified", 1);
				ChgPara("PageIndex", 1);
			}
			that();
		};
		if (p) {
			page != p ? ChgPara("PageIndex", p) : null;
		}
		vlm.loadJson(apiurl, JSON.stringify(initdata), function(data) {
			var json = data;
			if (json.success) {
				var data = json.data, f_data = {
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
						c : "foot_t_filter",
						type : 1,
						s : 1,
						key : 'themes', //ThemeID
						listData : data.themes
					}
				};
				var str1 = $('#tpl_SearchAvailableToursAttractions').html();

				if (data.lists.length == 0) {
					jAlert("抱歉暂时没有数据", "提示");
				} else {
					var tpl_SearchAvailableToursAttractions = ejs.render(str1, data);
					$("#scenicListCont").html(tpl_SearchAvailableToursAttractions);
					vlm.init();
					if (footer) {
						footer.data = f_data;
						footer.callback = filerCallBack;
					}
					footer.filters.init();
				}
			} else {
				jAlert(json.message, "提示");
			}
		});
	}).call(this,1);
})();

//城市返回记录已访问过
$('#city-back-tip').click(function() {
	var cityvisited = window.location.search;
	window.location.href = 'index.html' + cityvisited;
}); 