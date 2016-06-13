window.onload = function() {
	var val = vlm.parseUrlPara(window.location.href), hotelMessage = window.localStorage.getItem('hotelDetailData'), hotelCode = val.HotelID ? val.HotelID : JSON.parse(hotelMessage).data.hotel[0].hotelGenInfo.hotelCode, data = {
		"Parameters" : "{\"HotelID\":" + hotelCode + ",\"CultureName\":\"ZH-CN\" }",
		"ForeEndType" : 3,
		"Code" : "0009"
	};
	vlm.loadJson("", JSON.stringify(data), function(result) {
		if (result.success) {
			var hoteFeatureDesc = result.data;
			if (!hotelMessage) {
				return false;
			} else {
				document.body.removeChild(document.getElementById('preloader'));
				addContent(hotelMessage);
				function addContent(hotelMessage) {
					var hotelDesc = document.querySelector('.s-content1'), scenicSpot = document.querySelectorAll('.s-ul1')[0], scenicSpot = document.querySelectorAll('.s-ul1')[0], hotelFeature = document.querySelectorAll('.s-ul2')[0];
					hotelMessage = JSON.parse(hotelMessage).data.hotel[0].hotelGenInfo;
					hotelDesc.innerText = hotelMessage.hotelDesc;
					hotelFeature.innerHTML = getFeature(hoteFeatureDesc);
					/*
					 function getAllSpot(arg) {
					 var str = '';
					 if (arg.scenicSpotData) {
					 for (var i = 0; i < arg.scenicSpotData.length; i++) {
					 str += '<li class="ul1-li"><p class="f-l">' + arg.scenicSpotData[i].a + '</p><p class="f-r">' + arg.scenicSpotData[i].b + '</p></li>';
					 }
					 } else {
					 str += '<li class="ul1-li"><p class="f-l">暂无附近景点信息</p></li>';
					 }
					 return str;
					 }
					 */
					function getFeature(arg) {
						var str = '';
						if (arg.length) {
							for (var i = 0; i < arg.length; i++) {
								str += '<li class="ul2-li"><b class="s-icon3 hotel_feature_li_icon" style="margin-bottom:0px"></b><p class="s-p4 hotel_feature_li_p">' + arg[i].featureDesc + '</p></li>';
							}
						} else {
							str += '<li class="ul2-li"><p class="s-p4 hotel_feature_li_p">暂无酒店特色信息</p></li>';
						}
						return str;
					}

				}

			}
		} else {
			vlm.init();
			$(".content").html("暂无酒店特色信息");
		}
	});
};
