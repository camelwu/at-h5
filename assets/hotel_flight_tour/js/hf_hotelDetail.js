var data2 = '', roomdata = '';
(function() {
	var temObj = JSON.parse(sessionStorage.getItem("hftHotelDetailPara"));
	var urlIf = window.location.search;
	var ulrRoomId = urlIf.substring(23) - 0;
	var departDate = temObj.departDate.substring(0, 10);
	var enterDate = temObj.returnDate.substring(0, 10);
	temObj.departDate = departDate;
	temObj.returnDate = enterDate;
	if (!ulrRoomId) {
		delete temObj.selectedRoomID
	}
	//data中入住离店时间必须去掉时分秒
	var data = {
		"Code" : "50100009",
		"ForeEndType" : 2,
		"Parameters" : temObj
	};
  console.log(data)
	var departDateHtml = temObj.departDate.substring(5);
	var enterDateHtml = temObj.returnDate.substring(5);
	$('.jhf-mes span.departDate').html(departDateHtml);
	$('.jhf-mes span.returnDate').html(enterDateHtml);

	//getDayNum计算天数
	$('#nightNum').html(getDayNum(departDate, enterDate))
	function getDayNum(arg1, arg2) {
		var time1 = Date.parse(arg1.replace(/-/g, "/")), time2 = Date.parse(arg2.replace(/-/g, "/")), dayCount;
		return dayCount = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
	}


	vlm.loadJson('', JSON.stringify(data), dataCallBack);
	//url统一改vlm中的，此处可以为空
	function dataCallBack(result) {
		console.log(result)
		$("#preloader").hide();
		if (result.success && result.data.hotelInfo.hotelID) {
			var flightHotelAllData = JSON.parse(window.sessionStorage.getItem('hftFlightHotelTourInfo'));
				flightHotelAllData.hotelInfo = result.data.hotelInfo;
				window.sessionStorage.setItem('hftFlightHotelTourInfo', JSON.stringify(flightHotelAllData));
			data2 = result.data;
			console.log(data2);
			roomdata = data2.hotelInfo.rooms;
			nav();
			banner();
			adress();
			room();
			star();
			//map begin
			var latitude = data2.hotelInfo.latitude - 0;
			var longitude = data2.hotelInfo.longitude - 0;
			at.map.createMap(latitude, longitude);
			at.map.markHotel(latitude, longitude, "");
			at.map.moveCenterToHotelLocation(latitude, longitude);
			sessionStorage.setItem('latitude', latitude);
			sessionStorage.setItem('longitude', longitude);
			// 增加参数
		    var dataObj = {
		        HotelName: data2.hotelInfo.hotelNameLocale +"("+data2.hotelInfo.hotelName+") "+data2.hotelInfo.hotelAddress,
		        Latitude: latitude,
		        Longitude: longitude
		    },paramStr = "";
		    for (var attr in dataObj) {
		        paramStr += "&" + attr + "=" + dataObj[attr];
		    }
		    paramStr = paramStr.slice(1);
		    // 参数拼接结束
			$('#map').on('click', function() {
				window.location.href = '../hotel/hotel_map.html?' + paramStr;
			});
			// 如有评分，可跳转
			if(parseInt(data2.hotelInfo.hotelReviewCount)>0){
				$('#h_reviews').on('click', function() {
					window.location.href = '../hotel/hotel_reviews.html?HotelID='+data2.hotelInfo.hotelID+'&TAAvgRating='+data2.hotelInfo.hotelReviewScore+'&TAReviewCount='+data2.hotelInfo.hotelReviewCount;
				});
			}
			// 酒店情况
			$('#h_star').on('click', function() {
				window.location.href = '../hotel/hotel_summary.html?HotelID='+data2.hotelInfo.hotelID;
			});
			//map end
			$('.jhf-date').show();
			vlm.init();
		} else {
			jAlert('暂无酒店详细数据,请稍后再试', "提示");
		}
	}

	//nav标题部分
	function nav() {
		$('.header h3').html(data2.hotelInfo.hotelNameLocale);
	}

	//banner
	function banner() {
		var str = $('#banner').html();
		var banner = ejs.render(str, data2.hotelInfo);
		$('.jhf-banner').html(banner);
	}

	//地址 星级 wifi
	function adress() {
		var str = $('#jhf_score').html();
		var jhf_score = ejs.render(str, data2.hotelInfo);
		$('.jhf_score').html(jhf_score);
	}

	function star() {
		var str = $('#jhf_star').html();
		var jhf_star = ejs.render(str, data2.hotelInfo);
		$('.jhf_star').html(jhf_star);
	}

	//客房部分
	function room() {
		var str = $('#jhf_room').html();
		var jhf_room = ejs.render(str, data2.hotelInfo);
		$('.jhf-mes').append(jhf_room);
		console.log(roomdata[0].roomID)
		$('.jhf-mes li.showh .slide').each(function(i) {
			if (ulrRoomId == roomdata[i].roomID) {
				console.log('true')
				$('.jhf-mes li.showh .slide').eq(i).find('b').addClass('cur');
			}

			$('.jhf-mes li.showh .slide').eq(i).click(function() {
				$(this).find('b').addClass('cur').parents('li.showh').siblings().find('b').removeClass('cur');
				var roomID = roomdata[i].roomID;
				window.location.href = 'hft_choose.html?type=1&selectedRoomId=' + roomID;
			})
		});
	}

})();

