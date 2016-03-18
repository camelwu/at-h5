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
		questUrl = questUrl ? questUrl : that.requestUrl;
		vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
		return this;
	},

	callBack : function() {
		var tpl = ['<li class="ho_list">', '<img class="h-choose" src="../images/ui/choose.png">', '<div class="ho_pic">', '<img src="{%=hotelPictureURL%}" >', '</div>'].join('');
		var tpl1 = ['<li class="ho_list" data-id="{%=hotelID%}">', '<img class="h-choose" src="../images/ui/choose.png">', '<div class="ho_pic">', '<img src="../images/hotelDetailerrorpic.png" real-src="{%=hotelPictureURL%}" class="ho_img" />', '</div>', '<div class="ho_infor">', '<p class="hname">{%=hotelName%}</p>', '{% if(data["score"]||data["comments"]){ %}<div class="h-score">{% if(data["score"]){ %}<span style="color:#8ed1cc;font-size:1.5rem;font-weight: 600;">{%=score%}</span>{% } %} {% if(data["comments"]){ %}<span style="color:#999999;font-size:0.8rem;">分/{%=comments%}人点评</span>{% } %}</div> {% }else{ %}{% } %}', '<div class="h-grade">', '<span style="color:#999999;font-size:1rem;">{%=starRating%}星级</span>', '{% if(data["freeWifi"]){ %}<b class="hl-icon1"></b>{% } %}', '{% if(data["freeBus"]){ %}<b class="hl-icon2"></b>{% } %}', '<p class="h-address">{%=location%}</p>', '</div>', '</div>', '<div class="l-price">', '<span style="font-size:0.8em;color:#fe4716;">{% if(currencyCode=="CNY"){ %}￥ {% }else{ %} $ {% } %}</span>', '<span class="price-num">{%=avgRatePerPaxInCNY%}</span>', '</div>', '</li>'].join('');
		var resultData = arguments[0], that = hotelList;
		if (resultData.hotels.length == 0) {
			jAlert("抱歉暂时没有数据", "提示");
		} else {
			console.log(resultData);
			that.packageID = resultData.packageID;
			that.bookingFormInfo = resultData.bookingFormInfo;
			var hotels = resultData.hotels;
			hotels = that.resetData(hotels);
			var tpl_GetList = template(tpl1, hotels);
			$("#preloader").fadeOut();
			$('#lsf_list').html(tpl_GetList);
			that.delayLoadImage().addEvent()
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
		var hotelResultData = JSON.parse(localStorage.getItem('hotelResultData'));
		this.paraInfo = paraObj;
		that.hasChoosed = false;
		that.callBack(hotelResultData)
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

