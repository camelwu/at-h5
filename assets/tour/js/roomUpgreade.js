var hotelID;
var roomUpGrade = {
	CultureName : "zh-CN",
	eventHandler : function(target, eventType, handle) {
		if (document.addEventListener) {
			this.addHandler = function(target, eventType, handle) {
				target.addEventListener(eventType, handle, false);
			};
		} else if (document.attachEvent) {
			this.addHandler = function(target, eventType, handle) {
				target.attachEvent('on' + eventType, function() {
					handle.call(target);
				});
			};
		} else {
			this.addHandler = function(target, eventType, handle) {
				target['on' + eventType] = handle;
			};
		}
		this.addHandler(target, eventType, handle);
		return this;
	},
	tAjax : function(questUrl, data, Code, ForeEndType, Callback) {
		var that = this, dataObj = {
			Parameters : data,
			ForeEndType : ForeEndType,
			Code : Code
		};
		vlm.loadJson('', JSON.stringify(dataObj), Callback);
		return this;
	},
	resetData : function() {
		var data = arguments[0];
		var starWord = function(arg) {
			var star = "";
			switch(arg[0]) {
			case "0":
				star = "";
				break;
			case "1":
				star = "一";
				break;
			case "2":
				star = "二";
				break;
			case "3":
				star = "三";
				break;
			case "4":
				star = "四";
				break;
			case "5":
				star = "五";
				break;
			case "6":
				star = "六";
				break;
			default :
				star = "";
			}
			return star;
		};
		var temp = arguments[0]['starRating'];
		data['starRating'] = starWord(temp);
		return data;
	},
	dateDeal : function() {
		var reg = /\d{4}[/-](\d{1,2})[/-](\d{1,2}).*/;
		var dateD1 = reg.exec(this.curParaObj.CheckInDate);
		var dateD2 = reg.exec(this.curParaObj.CheckOutDate);
		var inStr = dateD1[1] + '-' + dateD1[2];
		var outStr = dateD2[1] + '-' + dateD2[2];
		var time1 = new Date(dateD1[0].replace('-', '/').replace('-', '/').replace('T00:00:00', '')), time2 = new Date(dateD2[0].replace('-', '/').replace('-', '/').replace('T00:00:00', ''));
		var dayNum = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
		document.querySelector('.date-in').innerHTML = '<span>'+inStr.replace('-', '月') + '日</span>入住';
		document.querySelector('.date-out').innerHTML ='<span>'+ outStr.replace('-', '月') + '日</span>离店';
		document.querySelector('.day-number').innerHTML = "共" +'<span>'+  dayNum + "</span>晚";
		return this;
	},
	addEvent : function(travelersInput) {
		$('.hotelPic').click(function() {
			$('.gallery').hide(0);
			$('.portfolio-wide').hide(0);
		});
		$(".swipebox").swipebox({
            useCSS : true,
            hideBarsDelay : 0
        });
		/*var nextPage = document.querySelector('.hs-next'), that = roomUpGrade;
		 this.eventHandler(nextPage, 'click', function(){
		 var roomid='', totalPrice=0;
		 var li = document.getElementsByClassName('hd-hotel');
		 for(var i = 0;i < li.length;i++) {
		 if (li[i].style.backgroundColor == 'rgb(223, 223, 221)') {
		 roomid = li[i].getAttribute('data-roomId');
		 break;
		 }
		 }
		 for(var s=0;s<that.roomsData.length;s++){
		 if(that.roomsData[s].roomID==roomid){
		 totalPrice = that.roomsData[s].totailPrice;
		 break;
		 }
		 }
		 document.location.href = 'fill-in-order-new.html'+document.location.search+'&totailPrice='+totalPrice+'&roomID='+roomid+'&travelersInput='+travelersInput;
		 });*/
	},
	callBack : function() {
		var that = roomUpGrade;

		var resultData = arguments[0], that = roomUpGrade;
		if (resultData.success) {
			if (resultData.data.hotels.length == 0) {
				jAlert("抱歉暂时没有数据", "提示");
			} else {
				console.log(resultData.data);
				var rooms = resultData.data.hotels[0].rooms;
				var tpl1 = $('#tpl1').html();
				var tpl12 = $('#tpl12').html();
				var tpl13 = $('#tpl13').html();
				var tpl2 = $('#tpl2').html();
				var tpl_GetList = ejs.render(tpl1, resultData.data);
				var tpl_GetList12 = ejs.render(tpl12, resultData.data);
				var tpl_GetList13 = ejs.render(tpl13, resultData.data);
				var tpl_GetRooms = ejs.render(tpl2,resultData.data.hotels[0]);
				that.dataInfo = resultData.data;
				that.roomsData = rooms;
				$("#preloader").fadeOut();
				$('.hotel_detail_banner').html(tpl_GetList);
				$('.hdl_up').html(tpl_GetList12);
				$('.hdl_down').html(tpl_GetList13);
				$('#room-list').html(tpl_GetRooms);
				var travelersInput = resultData.data.bookingFormInfo.travelersInput;
        hotelID = resultData.data.hotels[0].hotelID;
        window.localStorage.hotelDetailData = JSON.stringify(resultData);
				that.chooseRoom(travelersInput);
				that.dateDeal().delayLoadImage().addEvent(travelersInput);
				//map
				var dataMap = resultData.data.hotels[0].hotelGenInfo;
				console.log(dataMap);
				latitude = dataMap.latitude-0;
				longitude = dataMap.longitude-0;
				at.map.createMap(latitude,longitude);
				at.map.markHotel(latitude,longitude,"");
				at.map.moveCenterToHotelLocation(latitude,longitude);
				$('#map, li.map_address').on('click',function(){
					window.location.href = 'hotel_detail_map.html?latitude='+latitude+'&longitude='+longitude;
				})
			}
		} else {
			$("#preloader").fadeOut();
			jAlert(resultData.message, "提示");
		}
	},
	delayLoadImage : function(item) {
		var image = document.getElementsByClassName('hotelPic')[0];
		var re_url = image.getAttribute('real-src');
		loadImage(re_url, function() {
			image.setAttribute('src', re_url);
		});
		function loadImage(url, callback) {
			var img = new Image();
			img.src = url;
			img.onload = function() {
				img.onload = null;
				callback();
			};
		}
		return this;
	},
	chooseRoom : function(travelersInput) {
		var li = document.getElementsByClassName('hd-hotel'), img = document.getElementsByClassName('hd-choose'), that = roomUpGrade;
		for (var j = 0; j < li.length; j++) { {( function(index) {
						li[j].onclick = function() {
							/*for (var i = 0; i < li.length; i++) {
							 li[i].style.backgroundColor = "#ffffff";
							 img[i].className = 'hd-choose';
							 }
							 li[index].style.backgroundColor = "#dfdfdd";
							 img[index].className = 'hd-choose cho-active';*/
							var roomid = this.getAttribute('data-roomId'), totalPrice = 0;
							for (var s = 0; s < that.roomsData.length; s++) {
								if (that.roomsData[s].roomID == roomid) {
									totalPrice = that.roomsData[s].totailPrice;
									break;
								}
							}
							document.location.href = 'fill-in-order-new.html' + document.location.search + '&totailPrice=' + totalPrice + '&roomID=' + roomid + '&travelersInput=' + travelersInput;
						};
					}(j));
			}
		}
		return this;
	},
	createTags : function() {
		var that = this;
		var paraObj = JSON.parse(window.localStorage.getItem('info'));
		var hotelIDStr = document.location.search.substring(0, document.location.search.indexOf('&')).replace(/\?/, '');
		paraObj.hotelID = hotelIDStr.substring(hotelIDStr.indexOf('=') + 1);
		that.curParaObj = paraObj;
		that.tAjax(that.requestUrl, paraObj, '0208', 3, that.callBack);
		return this;
	},
	init : function() {
		this.createTags();
	}
};
roomUpGrade.init();
//星级格式化
function star(stars){
	switch (stars){
		case "2 stars":
			stars = "二星级";
			break;
		case "3 stars":
			stars = "三星级";
			break;
		case "4 stars":
			stars = "四星级";
			break;
		case "5 stars":
			stars = "五星级";
			break;
	}
	return stars;
}
function showHotelInfo(){
  window.location.href = 'hotel_summary.html?HotelID='+hotelID+'';
}

