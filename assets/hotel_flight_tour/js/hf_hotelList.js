(function() {
	//获取资源选择页传过来的数据
	var parametersStorage = JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {};
	console.log(parametersStorage)
	//获取资源选择页的url保存下来，再传过去
	var chooseUrl = window.location.search;
	sessionStorage.setItem("hftHotelChooseUrl", chooseUrl);
	console.log(chooseUrl)
	//传数据
	var dataPull = {
		"parameters" : parametersStorage,
		"foreEndType" : 2,
		"code" : "50100003"
	};
	var currentPage;//页码
	//接数据
	vlm.loadJson('', JSON.stringify(dataPull), dataCallBack);

	//footer插件方法必须写
	function tAjax(questUrl, data, Code, ForeEndType, Callback) {
		var that = this, dataObj = {
			Parameters : data,
			ForeEndType : ForeEndType,
			Code : Code
		};
		questUrl = questUrl || that.requestUrl||"";
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
	};

	function dataCallBack(result) {
		if (result.success && result.code == '200') {
			console.log(result)
			var data = result.data;
			title(data);
			list(result);
			//点击加载更多
			$('#loadMore').on("click", function () {
				console.log('111')
				loadMore();
			})
			clickMore(data);
			//footer  begin
			//处理一下星级筛选
			var menu_data = {
				hotelSort : {
					title : "推荐排序",
					c : "foot_sort",
					s:1,
					type : 1,
					key : 'sortTypes',
					listData : [{sortText:"价格从高至低",sortValue: 4},{sortText:"价格从低至高",sortValue:3},{sortText: "星级从高到低",sortValue:2}, {sortText:"星级从低到高",sortValue:1}]
				},
				hotelScreen : {
					title : "筛选",
					c : "foot_screen",
					s:2,
					type : 2,
					key : 'filters',
					listData : [{
						title: "星级",
						filterType: 1,
						item: starChoose(data)
					}]
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
				//位置重构
				var toString = [];
				toString= data.locationList;
				var locationList = toString.join(",");

				//筛选重构
				var arrNum = data.filters,filter = 0;
				for(var i=0;i<arrNum.length;i++){
					filter += arrNum[i].FilterValues[0]-0;
				}
				//排序入参重置
				var sortArr = [];
				var sortFilter = data.sortTypes[0]-0;
				sortArr.push(sortFilter);
				console.log(sortArr)
				parametersStorage.sortFields = sortArr;
				parametersStorage.Location = locationList;
				parametersStorage.StarRating = filter;
				//加loading
				$('.status').fadeIn('fast');
				tAjax("", parametersStorage, "50100003", "2", list);
			};
			if (footer) {
				footer.data = menu_data;
				footer.callback = menu_call;
			}
			footer.filters.init();
			//footer  end
			vlm.init();
		} else {
			vlm.init();
			showNodata();
			return;
			//jAlert('暂无酒店数据,请稍后再试', "提示");
		}
	}
	//处理一下筛选中的星级
	function starChoose(data){
		var starArr =[];
		var starJson = {};
		var star = data.starRatingList;
		for(var i=0;i<star.length;i++){
			switch (star[i].starRatingName){
				case "1":
					star[i].starRatingName = '不限';
					break;
				case "2":
					star[i].starRatingName = '二星以下';
					break;
				case "3":
					star[i].starRatingName = '三星级';
					break;
				case "4":
					star[i].starRatingName = '四星级';
					break;
				case "5":
					star[i].starRatingName = '五星级';
					break;
			}
			starJson = {
				"filterText": star[i].starRatingName,
				"filterValue": star[i].starRatingValue
			}
			starArr.push(starJson)
		}
		console.log(starArr);
		return starArr
	}

	//根据模板需要提前处理好data
	function handleData(result) {
		var star = result.data.hotels;
		for (var i = 0; i < star.length; i++) {
			switch (star[i].starRating) {
			case "1":
				star[i].starRating = '一星级';
				break;
			case "2":
				star[i].starRating = '二星级';
				break;
			case "3":
				star[i].starRating = '三星级';
				break;
			case "4":
				star[i].starRating = '四星级';
				break;
			case "5":
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
		$('.hotel_list').append(hotels);
		//去掉loading
		$('.status').fadeOut('fast');
		$('.hotel_list li').on('click', function() {
			$(this).addClass('cur').siblings().removeClass('cur');
			var hotelID = $(this).attr("data-hotelId");

			//跳转到详情页用
			console.log(hotelID);
			parametersStorage.hotelID = hotelID;
			sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(parametersStorage));
			window.location.href = 'hf_hotel_detail.html';
		});
	}

	//加载更多
	function loadMore() {
		//设置参数
		var loadMoreBtn = $("#loadMore");
		if (loadMoreBtn.attr("data-more") == "no") {
			return;
		}
		loadMoreBtn.attr("data-more", "yes");
		dataPull.parameters.pageNo = currentPage + 1;

		$("#loadMore").html("正在加载...");
		vlm.loadJson('', JSON.stringify(dataPull), dataCallBack);
		//vlm.loadJson("", data, dataCallBack, false, false, true);
	}

	//点击加载更多
	function clickMore(data){
		currentPage = data.pageNo;
		if (data.hotels.length>0 && data.pageNo < data.pageCount) {
			$("#loadMore").attr("data-more", "").html("点击加载更多").show();
		} else if (data.pageNo >= data.pageCount) {
			$("#loadMore").attr("data-more", "no").html("没有更多数据了！").show();
		} else {
			$("#loadMore").attr("data-more", "").html("点击加载更多").hide();
		}
	}

	//没有数据或者异常提示
	function showNodata(){
		$("#loadMore,.status").hide();
		var oLi = document.createElement('li');
		oLi.innerHTML = '<div><img src="../images/hotelListNo.jpg" /><p class="hotelConSorry1">非常抱歉，无符合要求的酒店。</p><p class="hotelConSorry2">建议您扩大搜索范围</p></div>';
		oLi.className = 'hotelConNo';
		$("#hj_jList").empty().append(oLi).css({
			width: '100%',
			height: '100%'
		});
	}

})();
