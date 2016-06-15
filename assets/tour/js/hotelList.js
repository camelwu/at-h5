//列表星级格式化
function starList(hotel) {
	switch (hotel) {
	case "2 星级":
		hotel = "二星级";
		break;
	case "3 星级":
		hotel = "三星级";
		break;
	case "4 星级":
		hotel = "四星级";
		break;
	case "5 星级":
		hotel = "五星级";
		break;
	}
	return hotel;
}

$(function() {
	"use strict";
	//获取数据
	var oldInfo = JSON.parse(localStorage.getItem('info'));
	console.log(oldInfo);
	//传数据
	var dataPull = {
		"parameters" : oldInfo,
		"foreEndType" : 3,
		"code" : "40100008"
	};
	//vlm.loadJson('', JSON.stringify(dataPull), callBack);
	var hotelList = {
		callBack : function(arg) {
			var resultData = arg.data, that = hotelList;
			//筛选星级处理
			function starChoose(resultData) {
				var starArr = [];
				var star = resultData.starRatingList;
				for (var i = 0; i < star.length; i++) {
					starArr.push({
						"filterText" : star[i],
						"filterValue" : star[i]
					});
				}
				return starArr;
			}
			if (arg.success) {
				if (resultData.hotels.length == 0) {
					jAlert("抱歉暂时没有数据", "提示");
				} else {

					that.packageID = resultData.packageID;
					that.bookingFormInfo = resultData.bookingFormInfo;

					$("#preloader").fadeOut();
					list(resultData);
					function list(resultData) {
						console.log(resultData.data);
						if (resultData.data) {
							resultData = resultData.data;
						}
						var tpl1 = $('#hotel_list').html();
						var tpl_GetList = ejs.render(tpl1, resultData);
						$('#h_list').html(tpl_GetList);
						$('#h_list>li').on('click', function() {
							$(this).addClass('cur').siblings().removeClass('cur');
							var hotelId = $(this).attr('data-id');
							document.location.href = 'room-upgrade.html?' + 'hotelID=' + hotelId + '&travelersInput=' + that.bookingFormInfo.travelersInput + '&airportTransferType=' + that.bookingFormInfo.airportTransferType;
						});
					}

					//footer插件方法必须写
					function tAjax(questUrl, data, Code, ForeEndType, Callback) {
						var that = this, dataObj = {
							Parameters : data,
							ForeEndType : ForeEndType,
							Code : Code
						};
						questUrl = questUrl || that.requestUrl || "";
						vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
					};
					//footer  begin
					var menu_data = {
						hotelSort : {
							title : "推荐排序",
							c : "foot_sort",
							s : 1,
							type : 1,
							key : 'sortTypes',
							listData : [{
								sortText : "推荐排序",
								sortValue : 0
							}, {
								sortText : "价格升序",
								sortValue : 1
							}, {
								sortText : "价格降序",
								sortValue : 2
							}]
						},
						hotelScreen : {
							title : "筛选",
							c : "foot_screen",
							s : 2,
							type : 2,
							key : 'filters',
							listData : [{
								title : "星级",
								filterType : 1,
								item : starChoose(resultData)
							}]
						},
						hotelPosition : {
							title : "位置",
							c : "foot_position",
							s : 2, //select
							type : 2,
							key : 'locationList',
							listData : resultData.locationList
						}
					}, menu_call = function(data) {
						//入参位置重构
						var toString = "";
						toString = data.locationList;
						console.log(toString)
						var locationList = toString.join("$");
						console.log(locationList)

						//筛选入参重构
						var arrNum = data.filters[0].FilterValues, filter = "";
						for (var i = 0; i < arrNum.length; i++) {
							filter = filter + arrNum[i] + '$';
						}
						//排序获取当前点击事件
						oldInfo.SortType = data.sortTypes[0];
						oldInfo.Location = locationList;
						oldInfo.StarRating = filter;

						tAjax("", oldInfo, "40100008", "3", list);
					};
					if (footer) {
						footer.data = menu_data;
						footer.callback = menu_call;
					}
					footer.filters.init();

					new lazyLoad('h_list');
					//that.delayLoadImage().addEvent()
				}
			} else {
				jAlert(arg.message, "提示");
			}
		},
		addEvent : function() {
			var hotelUl = document.querySelector('#h_list'), that = this;
			var allPic = hotelUl.querySelectorAll('.h-choose');
			return this;
		},
		initRender : function() {
			var that = this;
			var paraObj = JSON.parse(window.localStorage.info);
			var hotelResultData = JSON.parse(localStorage.getItem('hotelResultData')), initObj = {};
			oldInfo = JSON.parse(localStorage.getItem('info'));
			that.hasChoosed = false;
			console.log(hotelResultData);
			initObj.data = hotelResultData;
			initObj.success = true;
			that.callBack(initObj);
			return this;
		},
		createTags : function() {
			return this;
		},
		init : function() {
			this.createTags().initRender();
		}
	};
	hotelList.init();
	$('.hotel_list li').eq(0).addClass('cur');
});

