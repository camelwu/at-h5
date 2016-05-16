/**
 * Created by Venson on 2016/5/9.
 */
var val = vlm.parseUrlPara(window.location.href);
var changeFlightInfo,oldFlightInfo;
var flightList = {
	requestUrl : "",
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
		var flightListBack = function(ret) {
			var json = ret, that = flightList;
			console.log(json);
			var data = json.data;
			var str1 = $("#tplFlightList").html();
			var flight_list = ejs.render(str1, data);
			document.getElementById('fligtList').innerHTML = flight_list;
			bottom(data);
			$.each($('.seat_detail'), function(i, item) {
				if ($(this).attr('data-setID') == oldFlightInfo.flightSetID) {
					$(this).find('b').addClass('cho_gou').siblings().find('b').removeClass('cho_gou');
				}
			});
			var airway = document.getElementsByClassName('airway');
			for (var i = 0; i < airway.length; i++) {
				if (airway[i].getAttribute('data-airwaySetID') == changeFlightInfo.flightSetID) {
					airway[i].getElementsByClassName('hft_icon')[0].className = 'hft_icon cho_gou';
				}
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
		};
    var bottom = function(d){
      var menu_data = {
        hotelPosition : {
          title : "航空公司",
          c : "flight_company",
          type : 3,
          s:1,
          key : 'airways',
          listData : d.airways
        },
        hotelSort : {
          title : "快速排序",
          c : "foot_sort",
          type : 1,
          s:1,
          key : 'sortTypes',
          listData : d.sortTypes
        },
        hotelScreen : {
          title : "筛选",
          c : "foot_screen",
          type : 2,
          s:2,
          key : 'filters',
          listData : d.filters
        }
      };
      var menu_call = function(back) {
        console.log(back);
        changeFlightInfo.flightSetID = back.airways.airwaySetID;
        changeFlightInfo.flightCacheID = back.airways.airwayCacheID;
        changeFlightInfo.sortFields = back.sortTypes;
        changeFlightInfo.filterFields = back.filters;
        console.log(changeFlightInfo);
        that.tAjax("",changeFlightInfo,"60100005","2",flightListBack);
      };
      if (footer) {
        footer.data = menu_data;
        footer.callback = menu_call;
      }
      footer.filters.init();
    };
		this.tAjax("", oldFlightInfo, "60100005", "2", flightListBack);


  },
  //bottom:function(d){
  //  var that = this;
  //  var menu_data = {
  //      hotelPosition : {
  //        title : "航空公司",
  //        c : "flight_company",
  //        type : 3,
  //        s:1,
  //        key : 'airways',
  //        listData : d.airways
  //      },
  //      hotelSort : {
  //        title : "快速排序",
  //        c : "foot_sort",
  //        type : 1,
  //        s:1,
  //        key : 'sortTypes',
  //        listData : d.sortTypes
  //      },
  //      hotelScreen : {
  //        title : "筛选",
  //        c : "foot_screen",
  //        type : 2,
  //        s:2,
  //        key : 'filters',
  //        listData : d.filters
  //      }
  //    },
  //    menu_call = function(back) {
  //      console.log(back);
  //      changeFlightInfo.flightSetID = back.airwaySetID;
  //      changeFlightInfo.flightCacheID = back.airwayCacheID;
  //      changeFlightInfo.sortFields = back.sortTypes;
  //      changeFlightInfo.filterFields = back.filters;
  //      console.log(changeFlightInfo);
  //      console.log(that.getFlightList.flightListBack);
  //      that.tAjax("",changeFlightInfo,"60100005","2",that.getFlightList.flightListBack);
  //    };
  //
	//	if (footer) {
	//		footer.data = menu_data;
	//		footer.callback = menu_call;
	//	}
	//	footer.filters.init();
	//},
	tAjax : function(questUrl, data, Code, ForeEndType, Callback) {
		var that = this, dataObj = {
			Parameters : data,
			ForeEndType : ForeEndType,
			Code : Code
		};
		questUrl = questUrl || that.requestUrl;
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
	},
	init : function() {
		changeFlightInfo = JSON.parse(sessionStorage.hftChangeFlightPara);
		console.log(changeFlightInfo);
		oldFlightInfo = JSON.parse(sessionStorage.hftChangeFlightPara);
		this.getFlightList();
	}
};
flightList.init();
