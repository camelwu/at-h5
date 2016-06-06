var changeFlightInfo;
var oldFlightInfo;
var filterSign = false;
var flight_list = {
	requestUrl : "",
	getById : function(obj) {
		return document.getElementById(obj);
	},
	getByClass : function(obj) {
		return document.getElementsByClassName(obj);
	},
	getWeekDay : function(date) {
		var final_date = date.substr(0, 10).replace(/-/g, '/');
		var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
		return week;
	},
	//格式化日期,
	formatDate : function(date, format) {
		if (date.indexOf('T') > -1) {
			date = date.replace("T", " ");
			if (date.indexOf("-") > -1) {
				date = date.replace(/-/g, "/");
			}
			date = new Date(date);
		}
		var paddNum = function(num) {
			num += "";
			return num.replace(/^(\d)$/, "0$1");
		};
		//指定格式字符
		var cfg = {
			yyyy : date.getFullYear()//年 : 4位
			,
			yy : date.getFullYear().toString().substring(2)//年 : 2位
			,
			M : date.getMonth() + 1//月 : 如果1位的时候不补0
			,
			MM : paddNum(date.getMonth() + 1)//月 : 如果1位的时候补0
			,
			d : date.getDay()//日 : 如果1位的时候不补0
			,
			dd : paddNum(date.getDate())//日 : 如果1位的时候补0
			,
			hh : paddNum(date.getHours())//时
			,
			mm : paddNum(date.getMinutes())//分
			,
			ss : paddNum(date.getSeconds()) //秒
		};
		format || ( format = "yyyy-MM-dd hh:mm:ss");
		return format.replace(/([a-z])(\1)*/ig, function(m) {
			return cfg[m];
		});
	},
	//   替换数组元素
	replaceElement : function(array, element, ch) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == element) {
				array[i] = ch;
			}
		}
		return array;
	},
	getFlightList : function() {
		var that = this;
		$('#departData').html(that.formatDate(oldFlightInfo.departDate, "MM-dd"));
		$('#returnData').html(that.formatDate(oldFlightInfo.returnDate, "MM-dd"));
		$('#departWeek').html(that.getWeekDay(that.formatDate(oldFlightInfo.departDate, "d")));
		$('#returnWeek').html(that.getWeekDay(that.formatDate(oldFlightInfo.returnDate, "d")));
		var flightListBack = function(ret) {
			var json = ret;
			console.log(json);
			var data = json.data;
			if (json.success && json.code == '200' && data.flightInfoListGroup.length > 0) {
				// 数据过滤，research情况下，selectedFlight字段有可能不存在
				data.selectedFlight = data.selectedFlight ? data.selectedFlight : false;
				// 增加打包产品默认选中的航空公司
				var newL = data.selectedAirway?data.airways.unshift(data.selectedAirway):null;
				$('.go_place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameFrom);
				$('.to_place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameTo);
				var str1 = $("#tplFlightList").html();
				var flightList = ejs.render(str1, data);
				document.getElementById('fligtList').innerHTML = flightList;
				if (!filterSign) {
					filterSign = true;
					bottom(data);
				}
				//  页面跳转
				$(".seat_detail").click(function() {
					$(this).find('b').addClass('cho_gou').parents().siblings().find('b').removeClass('cho_gou');
					var hftFlightHotelTourInfo = JSON.parse(sessionStorage.hftFlightHotelTourInfo);
					var setid = $(this).attr('data-setID');
					for (var i = 0; i < data.flightInfoListGroup.length; i++) {
						for (var j = 0; j < data.flightInfoListGroup[i].flightInfoList.length; j++) {
							if (data.flightInfoListGroup[i].flightInfoList[j].setID == setid) {
								hftFlightHotelTourInfo.flightInfo = data.flightInfoListGroup[i].flightInfoList[j];
								hftFlightHotelTourInfo.airwaySetID = data.flightInfoListGroup[i].flightInfoList[j].setID;
								hftFlightHotelTourInfo.airwayCacheID = data.flightInfoListGroup[i].flightInfoList[j].cacheID;
							}
						}
					}
					sessionStorage.hftFlightHotelTourInfo = JSON.stringify(hftFlightHotelTourInfo);
					hftFlightHotelTourInfo = JSON.parse(sessionStorage.hftFlightHotelTourInfo);
					window.location.href = 'hft_choose.html' + window.location.search;
				});
				//$('.flight_company ul li').eq(0).addClass('cur');
			} else {
				that.noResult();
			}
		};
		var bottom = function(d) {
			var menu_data = {
				hotelPosition : {
					title : "航空公司",
					c : "flight_company",
					type : 3,
					s : 1,
					key : 'airways',
					listData : d.airways
				},
				hotelSort : {
					title : "快速排序",
					c : "foot_sort",
					type : 1,
					s : 1,
					key : 'sortTypes',
					listData : [{
						sortText : "不排序",
						sortValue : 0
					}, {
						sortText : " 直飞在前",
						sortValue : 1
					}, {
						sortText : " 直飞在后",
						sortValue : 2
					}, {
						sortText : "耗时升序",
						sortValue : 3
					}, {
						sortText : "耗时升序",
						sortValue : 4
					}, {
						sortText : "起飞时间升序",
						sortValue : 5
					}, {
						sortText : "起飞时间降序",
						sortValue : 6
					}, {
						sortText : "差价升序",
						sortValue : 7
					}, {
						sortText : "差价降序",
						sortValue : 8
					}]
				},
				hotelScreen : {
					title : "筛选",
					c : "foot_screen",
					type : 2,
					s : 2,
					key : 'filters',
					listData : [{
						title : "直飞",
						filterType : 2,
						item : [{
							filterText : "不限",
							filterValue : "0"
						}, {
							filterText : "只选直飞",
							filterValue : "1"
						}]
					}, {
						title : "共享",
						filterType : 3,
						item : [{
							filterText : "不限",
							filterValue : "0"
						}, {
							filterText : "不选共享航班",
							filterValue : "1"
						}]
					}, {
						title : "起飞时段",
						filterType : 4,
						item : [{
							filterText : "不限",
							filterValue : "0"
						}, {
							filterText : "0点到6点",
							filterValue : "1"
						}, {
							filterText : "6点到12点",
							filterValue : "2"
						}, {
							filterText : "12点到18点",
							filterValue : "3"
						}, {
							filterText : "18点到24点",
							filterValue : "4"
						}]
					}]
				}
			};
			var menu_call = function(back) {
				var filter = [], n = 0, startTime;
				for (var i = 0; i < back.filters.length; i++) {
					if (back.filters[i].FilterValues[0] == '0') {
						n++;
					}
				}
				if (n == 3) {
					filter = [];
					filter.push(0);
				} else {
					if (back.filters[0].FilterValues[0] != '0') {
						filter.push(1)
					}
					if (back.filters[1].FilterValues[0] != '0') {
						filter.push(2)
					}
					if (back.filters[2].FilterValues[0] != '0') {
						filter.push(3);
						switch(back.filters[2].FilterValues[0]) {
						case '1':
							startTime = 1;
							break;
						case '2':
							startTime = 2;
							break;
						case '3':
							startTime = 3;
							break;
						case '4':
							startTime = 4;
							break;
						default :
							void (0);
						}
					}
				}
				console.log(back);
				changeFlightInfo.airwaySetID = back.airways.airwaySetID;
				changeFlightInfo.airwayCacheID = back.airways.airwayCacheID;
				changeFlightInfo.SortFields = back.sortTypes;
				changeFlightInfo.ScreenFields = filter;
				changeFlightInfo.FlightStartTime = startTime;
				console.log(changeFlightInfo);
				that.tAjax("", changeFlightInfo, "50100002", "3", flightListBack);
			};
			if (footer) {
				footer.data = menu_data;
				footer.callback = menu_call;
			}
			footer.filters.init();
		};
		this.tAjax("", oldFlightInfo, "50100002", "3", flightListBack);

	},
	noResult : function() {
		var ele = document.createElement('div'), eventEle, flight_hotel_no_result;
		ele.className = "flight_hotel_no_result";
		ele.innerHTML = '<div class="header" style="box-shadow: none;"><a id="pageBack" href="javascript:window.history.go(-1);" class="header_back"><i class="icon_back"></i></a><h3>自由行</h3></div><div class="no_result_search"><p>没有找到符合条件的产品</p></div> </div>';
		document.body.appendChild(ele);
		flight_hotel_no_result = document.querySelector('.flight_hotel_no_result');
	},
	tAjax : function(questUrl, data, Code, ForeEndType, Callback) {
		var that = this, dataObj = {
			Parameters : data,
			ForeEndType : ForeEndType,
			Code : Code
		};
		questUrl = questUrl || that.requestUrl;
		//questUrl = questUrl?questUrl:that.requestUrl;
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
	},

	//  排序or筛选结束
	init : function() {
		changeFlightInfo = JSON.parse(sessionStorage.hftChangeFlightPara);
		delete changeFlightInfo.filterFields;
		delete changeFlightInfo.tours;
		delete changeFlightInfo.packageID;
		oldFlightInfo = changeFlightInfo;
		console.log(oldFlightInfo);
		this.getFlightList();
	}
};
flight_list.init();
