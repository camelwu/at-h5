var oldInfo= JSON.parse(localStorage.getItem('info'));
console.log(oldInfo)
var newPara = {
	"StarRating": "",
	"Location": "",
	"SortType": 1,
	"PackageID": oldInfo.packageID,
	"CheckinDate": oldInfo.CheckInDate,
	"CheckoutDate": oldInfo.CheckOutDate,
	"RoomDetails":oldInfo.roomDetails,
	"Tours":oldInfo.tours
};
var hotelList = {

	CultureName : "zh-CN",

	requestUrl : "http://10.2.22.239:8888/api/GetServiceApiResult",

	eventHandler : function(target, eventType, handle) {
		if (document.addEventListener) {
			this.addHandler = function(target, eventType, handle) {
				target.addEventListener(eventType, handle, false);
			}
		} else if (document.attachEvent) {
			this.addHandler = function(target, eventType, handle) {
				target.attachEvent('on' + eventType, function() {
					handle.call(target);
				});
			}
		} else {
			this.addHandler = function(target, eventType, handle) {
				target['on' + eventType] = handle;
			}
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
		questUrl = questUrl ? questUrl :"";
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
		return this;
	},

	callBack : function(arg) {
		console.log(arg)

		var tpl2 =
			'<li class="s_li1"> 不限 </li>'+
			'<% for(var i=0;i < starRatingList.length;i++){ %>'+
			'<li class="s_li"><%= starRatingList[i] %></li>'+
			'<% } %>';
		var tpl3 =
			'<li class="l-li">不限 <b class="l_icon1"></b></li>'+
			'<% for(var i=0;i < locationList.length;i++){ %>'+
			'<li class="l-li"><%=locationList[i]%><b class="l_icon"></b></li>'+
			'<% } %>';

		var resultData = arg.data, that = hotelList;
		console.log(resultData)
		console.log(resultData.hotels)

		//筛选星级处理
		function starChoose(resultData){
			console.log(resultData)
			var starArr =[];
			var starJson = {};
			var star = resultData.starRatingList;
			for(var i=0;i<star.length;i++){
				starJson = {
					"filterText": star[i],
					"filterValue": star[i]
				}
				starArr.push(starJson)
			}
			console.log(starArr);
			return starArr
		}
		if(arg.success){
			if (resultData.hotels.length == 0) {
				jAlert("抱歉暂时没有数据", "提示");
			} else {

				that.packageID = resultData.packageID;
				that.bookingFormInfo = resultData.bookingFormInfo;
				//var hotels = resultData.hotels;
				var tpl_getStar = ejs.render(tpl2,resultData);
				var tpl_getLocation = ejs.render(tpl3,resultData);
				$("#preloader").fadeOut();
				list(resultData);
				$('#h-level').html(tpl_getStar);
				$('#l-ul').html(tpl_getLocation);
				function list(resultData){
					console.log(resultData.data);
					if(resultData.data){
						resultData = resultData.data;
					}
					var tpl1 = $('#hotel_list').html();
					var tpl_GetList = ejs.render(tpl1, resultData);
					$('#lsf_list').html(tpl_GetList);
					$('#lsf_list>li').on('click',function(){
						$(this).addClass('cur').siblings().removeClass('cur');
						var hotelId = $(this).attr('data-id');
						document.location.href = 'room-upgrade.html?' + 'hotelID=' + hotelId + '&travelersInput=' + that.bookingFormInfo.travelersInput + '&airportTransferType=' + that.bookingFormInfo.airportTransferType;
					})
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
						s:1,
						type :1,
						key : 'sortTypes',
						listData : [{sortText:"推荐排序",sortValue:0},{sortText:"价格升序",sortValue:1},{sortText: "价格降序",sortValue:2}]
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
							item: starChoose(resultData)
						}]
					},
					hotelPosition : {
						title : "位置",
						c : "foot_position",
						s:2,//select
						type : 2,
						key : 'locationList',
						listData :resultData.locationList
					}
				}, menu_call = function(data) {
					//入参位置重构
					var toString ="";
					toString= data.locationList;
					console.log(toString)
					var locationList = toString.join("$");
					console.log(locationList)

					//筛选入参重构
					var arrNum = data.filters[0].FilterValues,filter ="";
					for(var i=0;i<arrNum.length;i++){
						filter = filter + arrNum[i]+'$';
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
				//footer  end


				//  恢复上次选中的酒店星级
				if(newPara.StarRating != ''){
					var li = document.getElementById('h-level').getElementsByTagName('li');
					var star = newPara.StarRating.split('$');
					for(var i = 0;i < li.length;i++){
						for(var j = 0;j < star.length-1;j++){
							if(li[i].innerHTML == star[j]){
								li[0].className = 's_li';
								li[i].className = 's_li1';
							}
						}
					}
				}
				// 恢复上次选中的酒店位置
				var oldLocation = newPara.Location.replace('$', '');
				oldLocation = oldLocation ? oldLocation : '不限';
				$('#l-ul .l-li').find('b').removeClass('l_icon1').addClass('l_icon');
				$('#l-ul .l-li').each(function (index, item) {
					var $item = $(item);
					if($item.text().trim() === oldLocation){
						$item.find('b').addClass('l_icon1').removeClass('l_icon');
						return;
					}
				});

				that.delayLoadImage().addEvent()
			}
		}else{
			jAlert(arg.message, "提示");
		}
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
		for (var i = 0, len = arguments[0].length; i < len; i++) {
			var temp = arguments[0][i]['starRating'];
			data[i]['starRating'] = starWord(temp)
		}
		return data;
	},
	addEvent : function() {
		var hotelUl = document.querySelector('#lsf_list'), that = this;
		//, nextButton = document.querySelector('.hs-next');
		var allPic = hotelUl.querySelectorAll('.h-choose');

		//$('#lsf_list>li').on('click',function(){
		//	$(this).addClass('cur').siblings().removeClass('cur');
		//	var hotelId = $(this).attr('data-id');
		//	document.location.href = 'room-upgrade.html?' + 'hotelID=' + hotelId + '&travelersInput=' + that.bookingFormInfo.travelersInput + '&airportTransferType=' + that.bookingFormInfo.airportTransferType;
		//})

		return this;
	},

	delayLoadImage : function(item) {
		var images = document.getElementsByClassName('ho_img');
		for (var i = 0; i < images.length; i++) {
			(function() {
				var temp = i;
				var re_url = images[temp].getAttribute('real-src');
				var loadImage = function(url, callback) {
					var img = new Image();
					img.src = url;
					img.onload = function() {
						img.onload = null;
						callback(temp);
					};
				};
				loadImage(re_url, function(i) {
					images[temp].setAttribute('src', re_url);
				});
			})(i)
		}
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
	initRender : function() {
		var that = this;
		var paraObj = JSON.parse(window.localStorage.info);
		var hotelResultData = JSON.parse(localStorage.getItem('hotelResultData')), initObj={};
		oldInfo = JSON.parse(localStorage.getItem('info'));
		//console.log(oldInfo);
		//this.oldInfo = paraObj;
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
//列表星级格式化
function starList(hotel){
	switch (hotel){
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
//把url字符串变成json
function url2json(url) {
	if (!url)
		return;
	var json = {};
	var arr = url.split('?');
	var arr2 = arr[1].split('&');
	for (var i = 0; i < arr2.length; i++) {
		var arr3 = arr2[i].split('=');
		json[arr3[0]] = arr3[1];
	}
	return json;
}
//解决位置搜索部分确定按钮太靠下的问题
//(function(){
////		var inst = document.getElementById("fo_lo");
////		var submit = document.getElementById("l_but");
//	$("#fo_lo").on("click",function(){
//		$("#l_but").addClass("s-but-checked");
//		$("#s_but1").addClass("s-but-checked");
//		//console.log("111");
//	});
//	$("#l_but").on("click",function(){
//		$("#l_but").removeClass("s-but-checked");
//		$("#s_but1").removeClass("s-but-checked");
//	});
//
//})();
(function() {
	function h_l_s() {
		var rli = [], sli1 = [], sli2 = [], lb = [],lli = [];
		var mb;
		function _(s) {
			return document.getElementById(s);
		}

		var rank = _("rank");
		var screen = _("screen");
		var location = _("location");
		var fo_ra = _("fo_ra");
		var fo_sc = _("fo_sc");
		var fo_lo = _("fo_lo");
		var s_but = _("s_but");
		var l_but = _("l_but");
		function show(obj) {
			mb = document.getElementById("r-mb");
			mb.style.display = "block";
			obj.style.bottom = "0.98rem";
			obj.style.transition = "all 350ms";
		}

		function close(obj) {
			var windowHeight = window.innerHeight;
			mb = document.getElementById("r-mb");
			mb.style.display = "none";
			obj.style.bottom = -windowHeight+ 'px';
			obj.style.transition = "all 350ms";
		}

		function mb_close() {
			var windowHeight = window.innerHeight;
			mb = document.getElementById("r-mb");
			mb = document.getElementById("r-mb");
			mb.style.display = "none";
			if (rank.style.display == "" || rank.style.display == "block") {
				rank.style.bottom = -windowHeight + 'px';
				rank.style.transition = "all 350ms";
				$("#l_but").removeClass("s-but-checked");
				$("#s_but1").removeClass("s-but-checked");
			}
			if (screen.style.display == "" || screen.style.display == "block") {
				screen.style.bottom = -windowHeight + 'px';
				screen.style.transition = "all 350ms";
				$("#l_but").removeClass("s-but-checked");
				$("#s_but1").removeClass("s-but-checked");
			}
			if (location.style.display == "" || location.style.display == "block") {
				location.style.bottom = -windowHeight + 'px';
				location.style.transition = "all 350ms";
				$("#l_but").removeClass("s-but-checked");
				$("#s_but1").removeClass("s-but-checked");
			}
		}

		/*   酒店筛选  */

		//function selectLevel() {
		//	var obj = window.event.srcElement;
		//	var oName = obj.className;
		//	var array = [];
		//	var selected = [];
		//	if (obj.innerText == "不限") {
		//		array = document.getElementById("h-level").childNodes;
		//		for (var i = 1; i < array.length; i++) {
		//			array[i].className = "s_li";
		//		}
		//	}
		//	if (obj.innerText != "不限") {
		//		document.getElementById("h-level").firstElementChild.className = "s_li";
		//	}
		//	if (oName == "s_li") {
		//		obj.className = "s_li1";
		//	} else {
		//		obj.className = "s_li";
		//	}
		//	//如果一个都没有选中的情况，显示不限；
		//	array = document.getElementById("h-level").childNodes;
		//	for(var j=0,len=array.length;j<len;j++){
		//		if(array[j].className == "s_li1"){
		//			selected.push(array[j].innerText);
		//		}
		//	}
		//	if(selected.length == 0){
		//		document.getElementById("h-level").firstElementChild.className = "s_li1";
		//	}
		//}
        //
		//function openClick(obj1, obj2) {
		//	obj1.onclick = function() {
		//		show(obj2);
		//		mb.addEventListener("click", mb_close);
		//		sli1 = document.getElementById("h-level").childNodes;
		//		for (var j = 0; j < sli1.length; j++) {
		//			sli1[j].addEventListener("click", selectLevel);
		//		}
		//		rli = document.getElementsByClassName("r-li");
		//		for (var i = 0; i < rli.length; i++) {
		//			rli[i].addEventListener("click", selectRank);
		//		}
        //
		//		$('#l-ul').off('click');
		//		$('#l-ul').on('click', '.l-li', selectLocation);
        //
		//	}
		//}
        //
		//function closeClick(obj1, obj2) {
		//	obj1.onclick = function() {
		//		var li;
		//		if(obj1 == s_but){
		//			newPara.StarRating = '';
		//			li = document.getElementById('h-level').getElementsByTagName('li');
		//			if(li[0].className == 's_li1'){
		//				newPara.StarRating = '';
		//			}
		//			for(var j = 1;j < li.length;j++){
		//				if(li[j].className == 's_li1'){
		//					newPara.StarRating += li[j].innerHTML + '$';
		//				}
		//			}
        //
		//		}
		//		if(obj1 == l_but){
		//			newPara.Location = '';
		//			li = document.getElementById('l-ul').getElementsByTagName('li');
		//			if(li[0].firstElementChild.className == 'l_icon1'){
		//				newPara.Location = '';
		//			}
		//			for(var n = 1;n < li.length;n++){
		//				if(li[n].firstElementChild.className == 'l_icon1'){
		//					console.log(li[n].innerText);
		//					newPara.Location += li[n].innerText + '$';
		//				}
		//			}
		//		}
		//		console.log(newPara);
		//		hotelList.tAjax('',newPara,'0208',3,hotelList.callBack);
		//		close(obj2);
		//	}
		//}
        //
        //
		//this.init = function(s) {
		//	//insert
		//	//sli1 = document.getElementById("h-level").childNodes;
		//	//for (var j = 0; j < sli1.length; j++) {
		//	//	sli1[j].addEventListener("click", selectLevel);
		//	//}
		//	//for (var k = 0; k < sli2.length; k++) {
		//	//	sli2[k].addEventListener("click", selectType);
		//	//}
		//	//rli = document.getElementsByClassName("r-li");
		//	//for (var i = 0; i < rli.length; i++) {
		//	//	rli[i].addEventListener("click", selectRank);
		//	//}
		//	//lli = document.getElementsByClassName("l-li");
		//	// for(var r=0;r < lli.length;r++){
		//	// lli[r].addEventListener("click",selectLocation);
		//	// }
		//};
		//init();
		//openClick(fo_ra, rank);
		//openClick(fo_sc, screen);
		//openClick(fo_lo, location);
		//closeClick(s_but, screen);
		//closeClick(l_but, location);
		///*   排序筛选   */
		//function selectRank() {
		//	var obj = window.event.srcElement;
		//	var rank = document.getElementById("rank");
		//	var mb = document.getElementById("r-mb");
		//	var color = obj.style.color;
		//	if($(this).index() == 0){
		//		delete newPara.SortType;
		//	}else if($(this).index() == 1){
		//		newPara.SortType = 1;
		//	}else{
		//		newPara.SortType = 2;
		//	}
		//	if (color == "rgb(252, 148, 100)") {
		//		mb.style.display = "none";
		//		rank.style.bottom = -550 + 'px';
		//		rank.style.transition = "all 350ms";
		//	} else {
		//		for (var i = 0; i < rli.length; i++) {
		//			if (rli[i].style.color == "rgb(252, 148, 100)") {
		//				var bb = rli[i].getElementsByTagName("b")[0];
		//				rli[i].removeChild(bb);
		//			}
		//			rli[i].style.color = "#b3b2b4";
		//		}
		//		obj.style.color = "#fc9464";
		//		var b = document.createElement("b");
		//		b.className = "hl-icon5";
		//		obj.appendChild(b);
		//		mb.style.display = "none";
		//		rank.style.bottom = -550 + 'px';
		//		rank.style.transition = "all 350ms";
		//	}
		//	console.log(newPara);
		//	hotelList.tAjax('',newPara,'0208',3,hotelList.callBack);
        //
		//}
        //
		///*   位置筛选  */
        //
		//function selectLocation(e) {
		//	var $this = $(this);
		//	var b = $this.find('b');
		//	var selected = b.hasClass('l_icon1');
		//	if (!selected) {
		//		b.removeClass('l_icon').addClass('l_icon1');
		//		$this.siblings().find('b').addClass('l_icon').removeClass('l_icon1');
		//	}
		//}

	}
	h_l_s();
	//页面没有展示前页面展示的页面
})();
