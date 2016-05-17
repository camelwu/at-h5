(function() {
	//获取资源选择页传过来的数据
	var parametersStorage = JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {};
	console.log( typeof parametersStorage);
	//获取资源选择页的url保存下来，再传过去
	var chooseUrl = window.location.search;
	sessionStorage.setItem("hftHotelChooseUrl", chooseUrl);
	//传数据
	var dataPull = {
		"parameters" : parametersStorage,
		"foreEndType" : 3,
		"code" : "60100007"
	};
	//接数据
	vlm.loadJson('', JSON.stringify(dataPull), dataCallBack);
	function tAjax(questUrl, data, Code, ForeEndType, Callback) {
		var that = this, dataObj = {
			Parameters : data,
			ForeEndType : ForeEndType,
			Code : Code
		};
		questUrl = questUrl || that.requestUrl;
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
	};

	function dataCallBack(result) {
		if (result.success && result.code == '200') {
			console.log(result)
			var data = result.data;
			title(data);
			list(result);
			clickMore(data);
			//footer  begin
			var menu_data = {
				hotelSort : {
					title : "推荐排序",
					c : "foot_sort",
					s:1,
					type : 1,
					key : 'sortTypes',
					listData : data.sortTypes
				},
				hotelScreen : {
					title : "筛选",
					c : "foot_screen",
					s:2,
					type : 2,
					key : 'filters',
					listData : data.filters
				},
				hotelPosition : {
					title : "位置",
					c : "foot_position",
					s:2,//select
					type : 2,
					key : 'locationList',
					listData : data.locationList
				}
			}, menu_call = function(data) {
				console.log(data);
				console.log(parametersStorage)
				parametersStorage.sortFields = data.sortTypes;
				parametersStorage.location = data.locationList;
				parametersStorage.filterFields = data.filters;
				console.log(parametersStorage);
				console.log(result.data.hotels.length)
				tAjax("", parametersStorage, "60100007", "2", list);
			};
			if (footer) {
				footer.data = menu_data;
				footer.callback = menu_call;
			}
			footer.filters.init();
			//footer  end

			console.log(data);
			vlm.init();
		} else {
			vlm.init();
			jAlert('暂无酒店数据,请稍后再试', "提示");
		}
	}

	//根据模板需要提前处理好data
	function handleData(result) {
		console.log(result.data)
		var star = result.data.hotels;
		for (var i = 0; i < star.length; i++) {
			switch (star[i].starRating) {
			case "1 星级":
				star[i].starRating = '一星级';
				break;
			case "2 星级":
				star[i].starRating = '二星级';
				break;
			case "3 星级":
				star[i].starRating = '三星级';
				break;
			case "4 星级":
				star[i].starRating = '四星级';
				break;
			case "5 星级":
				star[i].starRating = '五星级';
				break;
			}
		}
		return result;
	}

	//title
	function title(data) {
		var str = $('#title').html();
		var title = ejs.render(str, data);
		$('.header h3 span').html(title);
	}

	//数据加载部分
	function list(result) {
		var str = $('#templateList').html();
		var hotels = ejs.render(str, handleData(result));
		$('.hotel_list').html(hotels);
		$('.hotel_list li').on('click', function() {
			$(this).addClass('cur').siblings().removeClass('cur');
			var hotelID = $(this).attr("data-hotelId");

			//跳转到详情页用
			console.log(hotelID);
			parametersStorage.hotelID = hotelID;
			sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(parametersStorage));
			window.location.href = 'hft_hotel_detail.html';
		});
	}

	//点击加载更多
	function clickMore(data){
		if (data.pageNo < data.pageCount) {
			$("#loadMore").attr("data-more", "").html("点击加载更多").show();
		} else if (data.pageNo >= data.pageCount) {
			$("#loadMore").attr("data-more", "no").html("没有更多数据了！").show();
		} else {
			$("#loadMore").attr("data-more", "").html("点击加载更多").hide();
		}
	}

})();
