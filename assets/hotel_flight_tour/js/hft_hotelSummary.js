window.onload = function() {
	var data = JSON.parse(sessionStorage.getItem("fhtHotelCharacteristic"));
	console.log(data)
	var hotelDuse = data.hotelDesc;
	$('.hotel_content1').html(hotelDuse);
	//获取参数
	vlm.loadJson("", JSON.stringify(data), dataCallBack);
	function dataCallBack(result){
		console.log(result)
		if (result.success && result.code==200) {
			var data = result.data;

			var ulHtml = "";
			for(var i=0;i<data.length;i++){
				ulHtml += '<li class="li2"><b class="s-icon3 hotel_feature_li_icon" style="margin-bottom:0px"></b><p class="s-p4 hotel_feature_li_p">'+data[i].featureDesc+'</p></li>';
			}
			console.log(ulHtml)
			$('.hotel_feature').html(ulHtml);


			vlm.init();
		} else {
			vlm.init();
			$(".content").html("暂无酒店特色信息");
		}
	};
};
