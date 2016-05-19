var oldInfo= JSON.parse(localStorage.getItem('info'));
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
		var tpl1 = ['<li class="ho_list" data-id="{%=hotelID%}">', '<img class="h-choose" src="../images/ui/choose.png">', '<div class="ho_pic">', '<img src="../images/hotelDetailerrorpic.png" real-src="{%=hotelPictureURL%}" class="ho_img" />', '</div>', '<div class="ho_infor">', '<p class="hname">{%=hotelName%}</p>', '{% if(data["score"]||data["comments"]){ %}<div class="h-score">{% if(data["score"]){ %}<span style="color:#8ed1cc;font-size:1.5rem;font-weight: 600;">{%=score%}</span>{% } %} {% if(data["comments"]){ %}<span style="color:#999999;font-size:0.8rem;">分/{%=comments%}人点评</span>{% } %}</div> {% }else{ %}{% } %}', '<div class="h-grade">', '<span style="color:#999999;font-size:1rem;">{%=starRating%}星级</span>', '{% if(data["freeWifi"]){ %}<b class="hl-icon1"></b>{% } %}', '{% if(data["freeBus"]){ %}<b class="hl-icon2"></b>{% } %}', '<p class="h-address">{%=location%}</p>', '</div>', '</div>', '<div class="l-price">', '<span style="font-size:0.8em;color:#fe4716;">{% if(currencyCode=="CNY"){ %}￥ {% }else{ %} $ {% } %}</span>', '<span class="price-num">{%=avgRatePerPaxInCNY%}</span><span style="font-size:0.8em;color:#fe4716;">起/人</span>', '</div>', '</li>'].join('');
		var tpl2 = [
			'<li class="s-li1"> 不限 </li>',
			'{% for(var i=0;i < starRatingList.length;i++){ %}',
			'<li class="s-li">{%=starRatingList[i]%}</li>',
			'{% } %}'
		].join('');
		var tpl3 = [
			'<li class="l-li">不限 <b class="l-icon1"></b></li>',
			'{% for(var i=0;i < locationList.length;i++){ %}',
			'<li class="l-li">{%=locationList[i]%}<b class="l-icon"></b></li>',
			'{% } %}'
		].join('');
		var resultData = arg.data, that = hotelList;
		if(arg.success){
			if (resultData.hotels.length == 0) {
				jAlert("抱歉暂时没有数据", "提示");
			} else {
				console.log(resultData);
				that.packageID = resultData.packageID;
				that.bookingFormInfo = resultData.bookingFormInfo;
				var hotels = resultData.hotels;
				hotels = that.resetData(hotels);
				var tpl_GetList = template(tpl1, hotels);
				var tpl_getStar = template(tpl2,resultData);
				var tpl_getLocation = template(tpl3,resultData);
				$("#preloader").fadeOut();
				$('#lsf_list').html(tpl_GetList);
				$('#h-level').html(tpl_getStar);
				$('#l-ul').html(tpl_getLocation);

        //  恢复上次选中的酒店星级
        if(newPara.StarRating != ''){
          var li = document.getElementById('h-level').getElementsByTagName('li');
          var star = newPara.StarRating.split('$');
          for(var i = 0;i < li.length;i++){
            for(var j = 0;j < star.length-1;j++){
              if(li[i].innerHTML == star[j]){
                li[0].className = 's-li';
                li[i].className = 's-li1';
              }
            }
          }
        }
        // 恢复上次选中的酒店位置
        var oldLocation = newPara.Location.replace('$', '');
          oldLocation = oldLocation ? oldLocation : '不限';
          $('#l-ul .l-li').find('b').removeClass('l-icon1').addClass('l-icon');
          $('#l-ul .l-li').each(function (index, item) {
            var $item = $(item);
            if($item.text().trim() === oldLocation){
              $item.find('b').addClass('l-icon1').removeClass('l-icon');
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
		that.eventHandler(hotelUl, 'click', function(event) {
			var e = event || window.event;
			var target = e.target || e.srcElement;
			var lastEle = target, choose;
			for (var i = 0; i < allPic.length; i++) {
				allPic[i].style.display = 'none';
			}
			while (lastEle.className != "ho_list") {
				lastEle = lastEle.parentNode;
			}
			choose = lastEle.querySelector('.h-choose');
			choose.style.display = (choose.style.display == 'block') ? 'none' : 'block';
			var hotelId = lastEle.getAttribute("data-id").toString();
			document.location.href = 'room-upgrade.html?' + 'hotelID=' + hotelId + '&travelersInput=' + that.bookingFormInfo.travelersInput + '&airportTransferType=' + that.bookingFormInfo.airportTransferType;
		});
		/*that.eventHandler(nextButton,'click',function(event){
		 var e = event || window.event,that = hotelList;
		 var target = e.target || e.srcElement, allChoosePic = hotelUl.querySelectorAll('.h-choose'),hotelId='';
		 var tipBox = document.querySelector('#show-result-tip');
		 for(var i = 0; i<allChoosePic.length;i++ ){
		 (allChoosePic[i].style.display == 'block')?hotelId=allChoosePic[i].parentNode.getAttribute('data-id'):void(0);
		 }
		 if(hotelId) {
		 document.location.href='room-upgrade.html?'+'hotelID='+hotelId+'&travelersInput='+that.bookingFormInfo.travelersInput+'&airportTransferType='+that.bookingFormInfo.airportTransferType;
		 }else{
		 tipBox.innerHTML = '请选择酒店！';
		 tipBox.style.display = 'block';
		 that.timer = window.setTimeout(function(){
		 tipBox.style.display = 'none';
		 window.clearTimeout(that.timer);
		 that.timer = null;
		 },3000);
		 }
		 });*/
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
		console.log(oldInfo);
		this.oldInfo = paraObj;
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
(function(){
//		var inst = document.getElementById("fo_lo");
//		var submit = document.getElementById("l_but");
	$("#fo_lo").on("click",function(){
		$("#l_but").addClass("s-but-checked");
		$("#s_but1").addClass("s-but-checked");
		//console.log("111");
	});
	$("#l_but").on("click",function(){
		$("#l_but").removeClass("s-but-checked");
		$("#s_but1").removeClass("s-but-checked");
	});

})();
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
			obj.style.bottom = "0";
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

		function selectLevel() {
			var obj = window.event.srcElement;
			var oName = obj.className;
			var array = [];
			var selected = [];
			if (obj.innerText == "不限") {
				array = document.getElementById("h-level").childNodes;
				for (var i = 1; i < array.length; i++) {
					array[i].className = "s-li";
				}
			}
			if (obj.innerText != "不限") {
				document.getElementById("h-level").firstElementChild.className = "s-li";
			}
			if (oName == "s-li") {
				obj.className = "s-li1";
			} else {
				obj.className = "s-li";
			}
			//如果一个都没有选中的情况，显示不限；
			array = document.getElementById("h-level").childNodes;
			for(var j=0,len=array.length;j<len;j++){
				if(array[j].className == "s-li1"){
					selected.push(array[j].innerText);
				}
			}
			if(selected.length == 0){
				document.getElementById("h-level").firstElementChild.className = "s-li1";
			}
		}

		function openClick(obj1, obj2) {
			obj1.onclick = function() {
				show(obj2);
				mb.addEventListener("click", mb_close);
				sli1 = document.getElementById("h-level").childNodes;
				for (var j = 0; j < sli1.length; j++) {
					sli1[j].addEventListener("click", selectLevel);
				}
				rli = document.getElementsByClassName("r-li");
				for (var i = 0; i < rli.length; i++) {
					rli[i].addEventListener("click", selectRank);
				}

        $('#l-ul').off('click');
        $('#l-ul').on('click', '.l-li', selectLocation);

			}
		}

		function closeClick(obj1, obj2) {
			obj1.onclick = function() {
				var li;
				if(obj1 == s_but){
					newPara.StarRating = '';
					li = document.getElementById('h-level').getElementsByTagName('li');
					if(li[0].className == 's-li1'){
						newPara.StarRating = '';
					}
					for(var j = 1;j < li.length;j++){
						if(li[j].className == 's-li1'){
							newPara.StarRating += li[j].innerHTML + '$';
						}
					}

				}
				if(obj1 == l_but){
					newPara.Location = '';
					li = document.getElementById('l-ul').getElementsByTagName('li');
					if(li[0].firstElementChild.className == 'l-icon1'){
						newPara.Location = '';
					}
					for(var n = 1;n < li.length;n++){
						if(li[n].firstElementChild.className == 'l-icon1'){
							console.log(li[n].innerText);
							newPara.Location += li[n].innerText + '$';
						}
					}
				}
				console.log(newPara);
				hotelList.tAjax('',newPara,'0208',3,hotelList.callBack);
				close(obj2);
			}
		}


		this.init = function(s) {
			//insert
			//sli1 = document.getElementById("h-level").childNodes;
			//for (var j = 0; j < sli1.length; j++) {
			//	sli1[j].addEventListener("click", selectLevel);
			//}
			//for (var k = 0; k < sli2.length; k++) {
			//	sli2[k].addEventListener("click", selectType);
			//}
			//rli = document.getElementsByClassName("r-li");
			//for (var i = 0; i < rli.length; i++) {
			//	rli[i].addEventListener("click", selectRank);
			//}
			//lli = document.getElementsByClassName("l-li");
			// for(var r=0;r < lli.length;r++){
			// lli[r].addEventListener("click",selectLocation);
			// }
		};
		init();
		openClick(fo_ra, rank);
		openClick(fo_sc, screen);
		openClick(fo_lo, location);
		closeClick(s_but, screen);
		closeClick(l_but, location);
		/*   排序筛选   */
		function selectRank() {
			var obj = window.event.srcElement;
			var rank = document.getElementById("rank");
			var mb = document.getElementById("r-mb");
			var color = obj.style.color;
			if($(this).index() == 0){
				delete newPara.SortType;
			}else if($(this).index() == 1){
				newPara.SortType = 1;
			}else{
				newPara.SortType = 2;
			}
			if (color == "rgb(252, 148, 100)") {
				mb.style.display = "none";
				rank.style.bottom = -550 + 'px';
				rank.style.transition = "all 350ms";
			} else {
				for (var i = 0; i < rli.length; i++) {
					if (rli[i].style.color == "rgb(252, 148, 100)") {
						var bb = rli[i].getElementsByTagName("b")[0];
						rli[i].removeChild(bb);
					}
					rli[i].style.color = "#b3b2b4";
				}
				obj.style.color = "#fc9464";
				var b = document.createElement("b");
				b.className = "hl-icon5";
				obj.appendChild(b);
				mb.style.display = "none";
				rank.style.bottom = -550 + 'px';
				rank.style.transition = "all 350ms";
			}
			console.log(newPara);
			hotelList.tAjax('',newPara,'0208',3,hotelList.callBack);

		}

		/*   位置筛选  */

    function selectLocation(e) {
      var $this = $(this);
      var b = $this.find('b');
      var selected = b.hasClass('l-icon1');
      if (!selected) {
        b.removeClass('l-icon').addClass('l-icon1');
        $this.siblings().find('b').addClass('l-icon').removeClass('l-icon1');
      }
    }

	}
	h_l_s();
	//页面没有展示前页面展示的页面

})();
