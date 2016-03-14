;
(function(window, document) {
	var hotelDetail = {
		CultureName : "zh-CN",
		tempCurLeft : 0,
		tempStart : 0,
		isAnimation : false,
        currentIndex : 0,
		requestUrl : "http://10.2.22.239:8888/api/GetServiceApiResult",

		myData : {
			"getByUrl" : {},
			"createAllback" : {}
		},
		$Id : function(id) {
			return document.getElementById(id);
		},

		$CN : function(className) {
			return document.getElementsByClassName(className)
		},

		storageUtil : {
			set : function(key, v) {
				var curTime = new Date().getTime();
				var localStorage = window.localStorage;
				localStorage.setItem(key, JSON.stringify({
					data : v,
					time : curTime
				}))
			},
			get : function(key, exp) {
				var localStorage = window.localStorage;
				var data = localStorage.getItem(key);
				var dataObj = JSON.parse(data);
				exp = exp || 1;
				if (new Date().getTime() - dataObj.time > exp * 86400000) {
					return "sorry,what you are lookuping is expired!";
					//expired
				} else {
					return dataObj.data;
				}
			}
		},

		CookieUtil : {
			get : function(name) {
				var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie.indexOf(cookieName), cookieValue = null;
				if (cookieStart > -1) {
					var cookieEnd = document.cookie.indexOf(";", cookieStart);
					if (cookieEnd == -1) {
						cookieEnd = document.cookie.length;
					}
					cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
				}
				return cookieValue;
			},
			set : function(name, value, expires, path, domain, secure) {
				var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
				if ( expires instanceof Date) {
					cookieText += "; expires=" + expires.toGMTString();
				}
				if (path) {
					cookieText += "; path=" + path;
				}
				if (domain) {
					cookieText += "; domain=" + domain;
				}
				if (secure) {
					cookieText += "; secure=" + secure;
				}
				document.cookie = cookieText;
			},
			clear : function(name, path, domain, secure) {
				this.set(name, "", new Date(0), path, domain, secure);
			}
		},

		sTools : {
			hotelName : function(arg) {
				return arg.indexOf('(') != -1 ? '<p class="d-p1">' + arg.slice(0, arg.indexOf(' (')) + '<br/>' + arg.slice(arg.indexOf(' (') + 1) + '</p>' : '<p class="d-p1" style="line-height: 44px">' + arg + '</p>';
			},
			frontImage : function(arg) {
				for (var temp in arg) {
					if (arg[temp]["referenceType"] == 'Front Image') {
						return arg[temp]["imageFileName"]
					}
					;
				}
			},
			imageNum : function(arg) {
				return (arg && arg.length) ? arg.length : 0;
			},
			getImages : function(arg) {
				if (arg == "") {
					return '<li class="noImage">暂无图片</li>';
				}
				var str = "";
				for (var i = 0; i < arg.length; i++) {
					str += '<li class="imageLi"><img class="freeImage" data-error="../images/hotelDetailerrorpic.png" src="../images/loading-hotel.gif" real-src="' + arg[i].imageFileName + '"/></li>'
				}

				return str;

			},
			StarRatingName : function(starStr) {
				switch (starStr.charCodeAt(0)) {
					case 49:
						return '一';
						break;
					case 50:
						return '二';
						break;
					case 51:
						return '三';
						break;
					case 52:
						return '四';
						break;
					case 53:
						return '五';
						break;
					case 54:
						return '六';
						break;
					case 55:
						return '七';
						break;
					default:
						return '五';
						break;
				}
			},

			getDates : function(arg) {
				return /^\d{4}\-(\d{1,2})\-(\d{1,2})/g.exec(arg)[1] + '-' + /^\d{4}\-(\d{1,2})\-(\d{1,2})/g.exec(arg)[2]
			},

			getTotalNights : function(end, start) {
                var live_y=start.split('-')[0];
                var live_m=start.split('-')[1]-1;
                var live_d=start.split('-')[2];
                var leave_y=end.split('-')[0];
                var leave_m=end.split('-')[1]-1;
                var leave_d=end.split('-')[2];
				return (Math.round((new Date(leave_y,leave_m,leave_d)-new Date(live_y,live_m,live_d))/(1000*60*60*24)));
			},
            //just for wifi icon
            getServiceList : function(hotelRoomList){
                var serverListHtml = "";
                var sign = false;
                var roomList = null;
                for(var i=0,len=hotelRoomList.length;i<len;i++){
                    roomList = hotelRoomList[i].roomList;
                    for(var j=0,l=roomList.length;j<l;j++){
                        if(roomList[j].isFreeWifi){
                            serverListHtml += "<span class='wifi-icon'></span>";
                            sign = true;
                            break;
                        }
                    }
                    if(sign){
                        break;
                    }
                        
                }
                return serverListHtml;
            }
		},

		parseUrlPara : function(url, isEncode) {
			var isEncode = isEncode || false;
			var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
			url.replace(reg, function() {
				var arg = arguments;
				obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
			});
			return obj;
		},

		addHandler : function(target, eventType, handle) {

			if (document.addEventListener) {
				Event.addEvent = function(target, eventType, handle) {
					target.addEventListener(eventType, handle, false);
				}
			} else if (document.attachEvent) {
				Event.addEvent = function(target, eventType, handle) {
					target.attachEvent('on' + eventType, function() {
						handle.call(target);
					});
				}
			} else {
				Event.addEvent = function(target, eventType, handle) {
					target['on' + eventType] = handle;
				}
			}
			Event.addEvent(target, eventType, handle);
		},

		preventDefault : function(event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},

		stopPropagation : function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},

		jAjax : function(questUrl, data, Code, ForeEndType, Callback) {
			var dataObj = {
				Parameters : JSON.stringify(data),
				Code : Code,
				ForeEndType : ForeEndType
			};
			vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
		},

		showImages : function(result) {
			var picOuter = document.createElement('div');
			picOuter.id = "imageContainer";
			picOuter.innerHTML = '<h5 class="indexShow">123</h5><div class="showZone"><ul class="imgUl" style="left:0px;width:100%">' + this.sTools.getImages(result.data[0].hotelImagesList) + '</ul></div>';
			this.$Id('content').insertBefore(picOuter, this.$CN('top')[0]);
		},

		showRoomList : function(result) {
			var str = '';
			var tempArray = result.data[0].hotelRoomsList;
			for (var i = 0; i < tempArray.length; i++) {
				str += '<li class="d-li1 super">' + '<div class="d-div3 roomEvent" style="max-width: 60%" room-type-code=' + tempArray[i].roomTypeCode + '> ' + '<div class="d-p5">' + tempArray[i].roomTypeName + '</div><b class="d-icon3"></b><div class="d-p6">32-38㎡ 大/双床</div></div><div class="showListTrigger"><div class="priceNum"><span class="money">￥</span><span class="moneyNum">' + tempArray[i].minAvgPrice + '<span>起</span></span></div><a href="javascript:void(0)" class="at d-icon5"></a></div>' + hotelDetail.subRoomList(tempArray[i].roomList) + '</li>';
			}
			return str;
		},

		subRoomListNoService : function(arg) {

			var str = arg.listNum ? '<li class="d-li1" style="border-bottom: 1px solid #ffffff"><div class="roomName subRoomEvent" room-code="' + arg.roomCode + '"><div class="d-p5">' + arg.roomName + '(标准价)</div><div class="d-p6"><span class="breakfast">无早</span><span class="big-bed">大床</span><span class="no-cancel">不可取消</span><span class="only-num">' + arg.listNum + '间</span></div></div><div class="moneyTip"><span class="money">￥<span class="moneyNum">' + arg.avgPriceCNY + '</span></span><span class="TaxChange">另付税费￥' + arg.taxChargesCNY + '</span></div> <div class="reserve" room-code="' + arg.roomCode + '"><span>预订</span><span>在线付</span></div></li>' : '<li class="d-li1" style="border-bottom: 1px solid #ffffff"><div class="roomName subRoomEvent" room-code="' + arg.roomCode + '"><div class="d-p5">' + arg.roomName + '(标准价)</div><div class="d-p6"><span class="breakfast">无早</span><span class="big-bed">大床</span><span class="no-cancel">不可取消</span></div></div><div class="moneyTip"><span class="money">￥<span class="moneyNum">' + arg.avgPriceCNY + '</span></span><span class="TaxChange">另付税费￥' + arg.taxChargesCNY + '</span></div> <div class="reserve" room-code="' + arg.roomCode + '"><span>预订</span><span>在线付</span></div></li>';

			return str;
		},

		subRoomListHasService : function(arg) {

			var str = '<li class="d-li1"><div class="roomName subRoomEvent" room-code="' + arg.roomCode + '"><div class="d-p5">';
			str += arg.isabd ? arg.roomName + '(含早)</div><div class="d-p6"><span class="breakfast">双早</span><span class="big-bed">大床</span><span class="no-cancel">免费取消</span></div></div>' : arg.roomName + '(无早)</div><div class="d-p6"><span class="breakfast">无早</span><span class="big-bed">大床</span><span class="no-cancel">免费取消</span></div></div>';
			str += '<div class="moneyTip"><span class="money">￥<span class="moneyNum">' + arg.totalPriceCNY + '</span></span><span class="TaxChange">另付税费￥' + arg.taxChargesCNY + '</span></div> <div class="reserve" room-code="' + arg.roomCode + '"><span>预订</span><span>在线付</span></div></li>';
			return str;

		},

		subRoomList : function(arg) {
			var str = '<ul class="roomDetailList">';
			console.log("arg=");
			arg.sort(getSortFun('asc',"avgPriceCNY"));
			console.log(arg);
			for (var i = 0; i < arg.length; i++) {
				str += hotelDetail.subRoomListNoService(arg[i]);// + hotelDetail.subRoomListHasService(arg[i]);
			}
			str += '</ul>';
			return str;
		},

		showName : function(result) {
			var htmlStr = this.sTools.hotelName(result.data[0].hotelGenInfo.hotelName)
			$(".header h3").html(htmlStr);

		},

		eventHandle : function() {

			var totalNum = this.$CN('totalNum')[0];
			var toHotelDetail = this.$CN('toHotelDetail')[0];
			var reserves = this.$CN('reserve');
			var imageContainer = this.$Id('imageContainer');
			var showListTrigger = this.$CN('showListTrigger');
			var subRooms = this.$CN('subRoomEvent');
			var Rooms = this.$CN('roomEvent');
			//地图暂时不用
			//var toMap = this.$Id('toMap');

			toHotelDetail.onclick = function() {
				document.location.href = 'hotel_summary.html';
			};

			totalNum.onclick = function() {
				hotelDetail.$Id('imageContainer').style.display = 'block';
			};

            //事件冒泡处理
            hotelDetail.addHandler(imageContainer,"click",function(){
                //点击图片关闭大图显示
                
                var event = event || window.event;
				var target = event.target || event.srcElement;
                if(target.nodeName.toLowerCase() == "img"){
                      imageContainer.style.display = 'none';                
                }
            });
			//地图暂时不用
			/*
			 toMap.onclick = function () {

			 var dataObj = {
			 HotelName: hotelDetail.sourceData.data[0].hotelGenInfo.hotelName,
			 Latitude: hotelDetail.sourceData.data[0].hotelGenInfo.latitude,
			 Longitude: hotelDetail.sourceData.data[0].hotelGenInfo.longitude
			 }
			 var paramStr = "";
			 for (var attr in dataObj) {
			 paramStr += "&" + attr + "=" + dataObj[attr];
			 }
			 paramStr = paramStr.slice(1);
			 document.location.href = 'jyy_hd_map.html?' + paramStr;
			 };
			 */

			for (var i = 0; i < showListTrigger.length; i++) {
				showListTrigger[i].onclick = function() {
					hotelDetail.toggleSlider.call(this);
				}
			}

			for (var j = 0; j < Rooms.length; j++) {
				Rooms[j].onclick = function() {
					hotelDetail.toggleRoomModals.call(this, hotelDetail.gdataInfo)
				}
			}

			for (var k = 0; k < subRooms.length; k++) {
				hotelDetail.addHandler(subRooms[k], 'click', hotelDetail.toggleSubModals);
			}

			for (var l = 0; l < reserves.length; l++) {
				hotelDetail.addHandler(reserves[l], 'click', hotelDetail.reserveHandler);
			}

			hotelDetail.addHandler(window, 'resize', function() {
				hotelDetail.widthCorrecting(hotelDetail.sourceData);
			});
            
            hotelDetail.addHandler(window, 'orientationchange', function() {
				hotelDetail.orientationchange();
			});
		},

		reserveHandler : function(event) {
			var code = this.getAttribute("room-code");

            try{
                var sign = vlm.checkLogin(torder);
                if(sign){
                    torder();
                }
            }catch(e){
                console.info(e);
            }
            
			function torder() {
				document.location.href = 'user_order.html?' + 'roomCode=' + code;
			}
		},

		toggleSlider : function() {
			/*$(this.parentNode.parentNode).find('ul.roomDetailList').hide();
			 $(this.parentNode.parentNode).find('a.at').each(function () {
			 $(this).attr('class', 'at d-icon5');
			 });*/

			if (this.isOpen) {
				$(this.parentNode).find('ul.roomDetailList').slideUp("400");
				$(this).find('a.at').attr('class', 'at d-icon5');
				this.isOpen = false;
			} else {
				$(this.parentNode).find('ul.roomDetailList').slideDown("400");
				$(this).find('a.at').attr('class', 'at d-icon4');
				this.isOpen = true;
			}
		},

		imageHandler : function(result) {
			hotelDetail.widthCorrecting(result);
			hotelDetail.imageTouchEvent();
			hotelDetail.eventHandle();
			//图片处理完后绑定事件
		},

		widthCorrecting : function(result) {
            var imgUlContainer = document.querySelectorAll('.imgUl')[0];
			var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
			imgUlContainer.style.width = result.data[0].hotelImagesList.length != 0 ? (100 * result.data[0].hotelImagesList.length) + "%" : "100%";
            imgUlContainer.style.left = - innerWidth * this.currentIndex + "px";
            //重设已经滑动的距离
            hotelDetail.tempCurLeft = - innerWidth * this.currentIndex;
			if (document.querySelectorAll('.imageLi').length) {
				for (var m = 0, Lis = document.querySelectorAll('.imageLi'); m < Lis.length; m++) {
					Lis[m].style.width = innerWidth + "px";
				}
			}
		},
        
        orientationchange : function(event){
            var showZone = document.getElementsByClassName("showZone")[0];
            var indexShow = document.getElementsByClassName("indexShow")[0];
            //竖屏状态
            if(window.orientation && window.orientation==180||window.orientation==0){ 
                showZone.style.height = "38.5%";
                showZone.style.top = "28%";
                indexShow.style.zIndex = "0";
                indexShow.style.top = '21%';
            } 
            //横屏状态
            if(window.orientation && window.orientation==90||window.orientation==-90){ 
                showZone.style.height = "100%";
                showZone.style.top = "0px";
                indexShow.style.zIndex = "99";
                indexShow.style.top = '0px';
            } 
        },

		createAll : function(result) {
			//result = JSON.parse(result);
			console.log('callback函数得到的数据');
			hotelDetail.myData.createAllback = result;
			console.log(hotelDetail.myData);
			if (result.success == true) {
				hotelDetail.$Id('preloader') ? document.body.removeChild(hotelDetail.$Id('preloader')) : '';
			} else {
				alert(result.message);
				return;
				//return false;
			}

			if (document.getElementsByClassName('enterDate')[0] && document.getElementsByClassName('enterDate')[0].innerHTML != '') {
				hotelDetail.initDate(result) //解决日期滞后问题
			}

			var allStr = '', headerStr = '', frontImgStr = '', imgContainer = '', firstUl = '', secondUl = '', contentStr = '', footer = '', iDiv;

			hotelDetail.sourceData = result;
			console.log(hotelDetail.sourceData);
			headerStr += '<div class="header detailHeader" id="vlm-h-1"><a href="javascript:window.history.go(-1);" class="icons header-back" style="z-index: 4"></a><h3>' + hotelDetail.sTools.hotelName(result.data[0].hotelGenInfo.hotelName) + '</h3></div>';

			frontImgStr += '<div class="d-div1 faceImg"><img class="hotelPic" src="' + hotelDetail.sTools.frontImage(result.data[0].hotelImagesList) + '" /> <div class="d-div2 totalNum"><div class="d-p4">' + hotelDetail.sTools.imageNum(result.data[0].hotelImagesList) + '张</div></div></div>';

			firstUl += '<ul class="d-ul1"><li  onclick="hotelDetail.h_reviews()"><span class="rateScore">' + result.data[0].hotelGenInfo.hotelReviewScore.toFixed(1) + '</span>分/' + result.data[0].hotelGenInfo.hotelReviewCount + '人点评<b class="icons open-arg"></b></li>' + '<li id="toMap"><span class="address-text">' + result.data[0].hotelGenInfo.hotelAddress + '</span></li>' + '<li class="toHotelDetail">' + hotelDetail.sTools.StarRatingName(result.data[0].hotelGenInfo.starRatingName) + '星级<b class="CrazyRate"></b><b class="icons open-arg"></b>'+hotelDetail.sTools.getServiceList(result.data[0].hotelRoomsList)+'</li></ul>';

			secondUl += '<ul class="d-ul2">' + '<li id="chooseDate"><span class="enterDate">' + hotelDetail.gdataInfo.CheckInDate + '</span>入住<span class="enterDate" style="margin-left: 5px;">' + hotelDetail.gdataInfo.CheckOutDate + '</span>离店<em>共<span id="nightNum">' + hotelDetail.sTools.getTotalNights(hotelDetail.gdataInfo.CheckOutDate, hotelDetail.gdataInfo.CheckInDate) + '</span>晚</em><b class="icons open-arg"></b></li>' + hotelDetail.showRoomList(result) + '</ul>';

			footer += '<div class="footer"><span>版权所有@2015Asiatravel 控股有限公司.保留所有权利.</span></div>';

			contentStr += '<div id="content" class="snap-content" style="padding-top: 45px;">' + frontImgStr + firstUl + secondUl + footer + '</div>';

			allStr += headerStr + contentStr;

			hotelDetail.$CN('all-elements')[0].innerHTML = '';

			hotelDetail.$Id('imageContainer') ? document.body.removeChild(hotelDetail.$Id('imageContainer')) : "";
			hotelDetail.$CN('all-elements')[0].innerHTML = allStr;

			//图片单独生成
			iDiv = document.createElement('div');
			iDiv.id = "imageContainer";
			iDiv.innerHTML = '<h5 class="indexShow">1/' + result.data[0].hotelImagesList.length + '</h5><div class="showZone">' + '<ul class="imgUl" style="left: 0px; width: 100%;">' + hotelDetail.sTools.getImages(result.data[0].hotelImagesList) + '</ul></div>'

			document.body.appendChild(iDiv);

			hotelDetail.imageHandler(result);

			hotelDetail.initDate(result);
			//初始化日期

		},

		//点评点击事件
		h_reviews : function() {

			window.location.href = 'hotel_reviews.html?' + 'HotelID=' + hotelDetail.gdataInfo.HotelID + '&' + 'TAAvgRating=' + hotelDetail.sourceData.data[0].hotelGenInfo.hotelReviewScore + '&' + 'TAReviewCount=' + hotelDetail.sourceData.data[0].hotelGenInfo.hotelReviewCount;
		},

		upDateContent : function() {

			hotelDetail.gdataInfo.CheckInDate = document.getElementsByClassName('enterDate')[0].innerHTML;
			hotelDetail.gdataInfo.CheckOutDate = document.getElementsByClassName('enterDate')[1].innerHTML;
			hotelDetail.init(hotelDetail.gdataInfo);

		},

		initDate : function(result) {
			hotelDetail.gdataInfo.CheckInDate = document.getElementsByClassName('enterDate')[0].innerHTML;
			hotelDetail.gdataInfo.CheckOutDate = document.getElementsByClassName('enterDate')[1].innerHTML;
			var dateInitObj = new Object();
			dateInitObj[hotelDetail.gdataInfo.CheckInDate] = '入住';
			dateInitObj[hotelDetail.gdataInfo.CheckOutDate] = '离店';
			var myDate2 = new Calender({
				id : 'chooseDate',
				num : 13,
				time : dateInitObj,
				sClass1 : 'enterDate',
				id2 : 'nightNum',
				fn : hotelDetail.upDateContent
			});

			result.data[0].dateInfo = {
				CheckInDate : hotelDetail.gdataInfo.CheckInDate,
				CheckOutDate : hotelDetail.gdataInfo.CheckOutDate,
				totalNight : Math.abs(hotelDetail.$Id('nightNum').innerHTML)
			};

			hotelDetail.storageUtil.set("hotelDetailData", result);
		},

		imageTouchEvent : function() {
			var outerDiv = document.getElementById('imageContainer');
			var innerDiv = document.getElementsByClassName('showZone')[0];
			var totalNum = document.getElementsByClassName('totalNum')[0];
			var faceImg = document.getElementsByClassName('faceImg')[0];

			outerDiv.onclick = function(event) {
				var e = event || window.event;
				var tar = event.target || event.srcElement;
				if (tar.id == 'imageContainer') {
					tar.style.display = 'none'
				}
			};
            
			faceImg.onclick = function(event) {
				document.getElementById('imageContainer').style.display = 'block';
				//默认先加载两张图片
				hotelDetail.preLoadImage();
			};

			hotelDetail.addHandler(innerDiv, 'touchstart', hotelDetail.startHandler)
			hotelDetail.addHandler(innerDiv, 'touchmove', hotelDetail.moveHandler)
			hotelDetail.addHandler(innerDiv, 'touchend', hotelDetail.endHandler)
		},

		startHandler : function(e) {
			//hotelDetail.preventDefault(e);
			//hotelDetail.stopPropagation(e);
			if (!hotelDetail.isAnimation) {
				hotelDetail.tempStart = e.targetTouches[0].pageX;
			} else {
				hotelDetail.isAnimation = true;
			}
		},

		moveHandler : function(e) {
			//hotelDetail.preventDefault(e);
			//hotelDetail.stopPropagation(e);
			var imgUl = document.getElementsByClassName('imgUl')[0];
			imgUl.style.left = parseFloat(imgUl.style.left) + e.targetTouches[0].pageX - hotelDetail.tempStart + 'px';
			hotelDetail.tempStart = e.targetTouches[0].pageX;

		},

		endHandler : function(e) {
			//hotelDetail.preventDefault(e);
			//hotelDetail.stopPropagation(e);
			var minLeftValue = (document.querySelectorAll('.imageLi').length - 1) * window.innerWidth;
			var endLeftValue = parseFloat(document.getElementsByClassName('imgUl')[0].style.left);
			var distance = endLeftValue - hotelDetail.tempCurLeft, time = 1000, targetLeft, indexNUm;
           
			if (distance < 0 && Math.abs(distance) >= window.innerWidth / 4) {
                 //向左滑动
				targetLeft = hotelDetail.tempCurLeft - window.innerWidth;
			} else if (distance > 0 && Math.abs(distance) >= window.innerWidth / 4) {
                //向右滑动
				targetLeft = hotelDetail.tempCurLeft + window.innerWidth;
			} else {
				targetLeft = hotelDetail.tempCurLeft;
			}

			if (targetLeft >= 0) {//过界判断
				targetLeft = 0;
			} else if (targetLeft <= -minLeftValue) {
				targetLeft = -minLeftValue;
			}
			indexNUm = Math.abs(Math.floor(targetLeft / window.innerWidth)) + 1;
            hotelDetail.currentIndex = indexNUm;  //记下当前页面
			time = Math.abs((targetLeft - parseFloat(document.getElementsByClassName('imgUl')[0].style.left)) / window.innerWidth) * time;
            
			hotelDetail.tempCurLeft = targetLeft;
			$('.imgUl').animate({
				'left' : targetLeft
			}, time);
			hotelDetail.indexEvent(hotelDetail.sourceData, indexNUm);
			hotelDetail.delayLoadImage(indexNUm);
			hotelDetail.isAnimation = false;
		},

		indexEvent : function(result, item) {
			if (!result.data[0].hotelImagesList.length > 0) {
				document.querySelectorAll('.indexShow')[0].innerHTML = "";
			} else {
				document.querySelectorAll('.indexShow')[0].innerHTML = item + "/" + result.data[0].hotelImagesList.length;
			}
		},
		preLoadImage : function(){
			//默认至少加载两张图片
			var images = document.getElementsByClassName('freeImage');
			function loadImage(url,error_url, index, callback,errorFunc) {
				var img = new Image();
				img.src = url;
				img.onload = function() {
					img.onload = null;
					callback(index);
				};
                img.onerror = function(){
                    img.onerror = null;
                    errorFunc();
                }
			}
			for(var i=0;i<2;i++){
				if(!images[i]){return;}
				var re_url = images[i].getAttribute('real-src');
                var error_url = images[i].getAttribute('data-error');
				(function(i,re_url){
					loadImage(re_url,error_url, i, function(i) {
						images[i].setAttribute('src', re_url);
					},function(){
                        images[i].setAttribute('src', error_url);
                    });
				})(i,re_url)
			}
		},
		delayLoadImage : function(item) {
			var images = document.getElementsByClassName('freeImage');
			//默认正常显示两张图片，滑动第一张时加载第三张
			var re_url = images[item] ? images[item].getAttribute('real-src') : "";
            var error_url = images[item] ? images[item].getAttribute('data-error') : "";
			loadImage(re_url,error_url, function() {
				images[item].setAttribute('src', re_url);
			},function(){
                images[item].setAttribute('src', error_url);
            });
			function loadImage(url, error_url,callback,errorFunc) {
				var img = new Image();
				img.src = url;
				img.onload = function() {
					img.onload = null;
					callback();
				};
                img.onerror = function(){
                    img.onerror = null;
                    errorFunc();
                }
			}

		},

		updateSubRoomModal : function(arg) {
			console.log(arg);
			console.log(1);
			var modalStr = '';
			//oDiv.className = "roomAll";
			//oDiv.id = "infoAll";
			modalStr += '<div class="info-div"><ul class="ro-info">';
			modalStr += arg.roomSize ? '<li class="ro-info-item"><span class="item-name">房屋面积</span><span class="item-content">' + arg.roomSize + '</span></li>' : '';
			modalStr += arg.bedType ? '<li class="ro-info-item"><span class="item-name">床型</span><span class="item-content">' + arg.bedType + '</span></li>' : '';
			modalStr += arg.isFreeWifi ? '<li class="ro-info-item"><span class="item-name">wifi</span><span class="item-content">有</span></li>' : '';
			modalStr += arg.isFreeTransfer ? '<li class="ro-info-item"><span class="item-name">免费接送</span><span class="item-content">有</span></li>' : '';
			modalStr += arg.isFreeCityTour ? '<li class="ro-info-item"><span class="item-name">免费观光</span><span class="item-content">有</span></li>' : '';
			modalStr += arg.maxOccupancy ? '<li class="ro-info-item"><span class="item-name">最多居住人数</span><span class="item-content">' + arg.maxOccupancy + '人</span></li>' : '';
			modalStr += arg.maxChildOccupancy ? '<li class="ro-info-item"><span class="item-name">最多孩子数</span><span class="item-content">' + arg.maxChildOccupancy + '人</span></li>' : '';
			modalStr += arg.minNight ? '<li class="ro-info-item"><span class="item-name">最少居住晚数</span><span class="item-content">' + arg.minNight + '晚</span></li>' : '';
			modalStr += arg.isCashRebate ? '</div><div class="info-div"><div class="rate-rule">优惠政策</div><p class="info-text"><span>现金奖励</span>优惠政策内容</p></div>' : '';
			modalStr += arg.cancelWord ? '<div class="info-div"> <div class="rate-rule">取消说明</div><p class="info-text">取消说明规则</p></div>' : '<div class="info-div"> <div class="rate-rule">取消说明</div><p class="info-text"><span class="infoTxtCan">暂无取消说明内容</span></p></div>';
			// modalStr += arg.isabd ? '<header class="r-top"><p class="r-p1">' + arg.roomName + '(含早)</p><b class="r-icon1 closeTag"></b></header>' : '<header class="r-top"><p class="r-p1">' + arg.roomName + '</p><b class="r-icon1 closeTag"></b></header>';          oDiv.innerHTML = modalStr;
			//document.body.appendChild(oDiv);
			//hotelDetail.$Id('r-mb').style.display = 'block';
			//document.getElementById('r-mb').onclick =hotelDetail.$CN('closeTag')[0].onclick = function (event) {
			//   document.body.removeChild(hotelDetail.$Id('infoAll'))
			//   hotelDetail.$Id('r-mb').style.display = 'none';
			//};
			var title = arg.isabd ? arg.roomName + '(含早)' : arg.roomName;
			jLayer(modalStr, title);
		},

		toggleSubModals : function() {
			var info = this.getAttribute('room-code'), tempInfo;
			var compareData = hotelDetail.sourceData.data[0].hotelRoomsList;
			for (var i = 0; i < compareData.length; i++) {
				for (var j = 0, teList = compareData[i].roomList; j < teList.length; j++) {
					if (teList[j].roomCode == info) {
						tempInfo = teList[j];
						break;
					}
				}
			}
			hotelDetail.updateSubRoomModal(tempInfo);
		},

		showRoomModals : function(result) {
			var oDiv = document.createElement('div');
			function showDesc(arr, num) {
				if (num) {

				} else {
					if (!arr.length)
						return '暂无描述';
					if (!arr.imageDesc) {
						return '暂无描述';
					}
				}
			}

			//房间设施数据处理
			function showFeature(arr) {
				var str = '';
				if (!arr.length)
					return '暂无房间设施描述';
				for (var i = 0; i < arr.length; i++) {
					str += '<li class="r-li"><b class="r-icon2"></b> <p class="r-p3">' + arr[i].featureDesc + '</p></li>';
				}
				return str;
			}

			//图片数据处理
			function showPic(arr) {
				var oSrc = '';
				if (!arr.length) {
					oSrc = '<div class="hdItem"><img class="hotelPic2" src="../images/hotelDetailerrorpic.png"></div>';
				} else {
					for (var i = 0; i < arr.length; i++) {
						oSrc += '<div class="hdItem"><img class="hotelPic2" src="' + arr[i].imageFileName + '"></div>';
					}
				};
				return oSrc;
			}

			/*oDiv.className = 'roomAll';
			 oDiv.id = 'roomAll';
			 oDiv.innerHTML = '<div class="room" id="room"> <div class="owl-carousel">'+showPic(result.data[0].hotelRoomFeaturesList)+'</div> <article class="r-ar">最多 2成人<br>儿童10岁或以上按照成人算。  10岁以下的儿童按照酒店的具体规定一般免费（但不提供早餐和加床）。婴儿（1岁以下）如果使用现有的床铺可免费入住。请注意，如果您需要一个婴儿床可能有额外收费 </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间描述</p> <article class="r-ar" id="hdRoomDesc">'+showDesc(result.data[0].hotelRoomFeaturesList)+' </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间设施</p> <ul class="r-ul">'+showFeature(result.data[0].hotelRoomAmenitiesList)+'</ul> </div><header class="r-top"><p class="r-p1">高级客房</p><b class="r-icon1 closeTagAgain"></b></header>';
			 document.body.appendChild(oDiv);
			 hotelDetail.$Id('r-mb').style.display = 'block';
			 document.getElementById('r-mb').onclick = hotelDetail.$CN('closeTagAgain')[0].onclick = function (event) {
			 document.body.removeChild(hotelDetail.$Id('roomAll'))
			 hotelDetail.$Id('r-mb').style.display = 'none';
			 };*/
			var message = '<div class="owl-carousel">' + showPic(result.data[0].hotelRoomFeaturesList) + '</div> <article class="r-ar">最多 2成人<br>儿童10岁或以上按照成人算。  10岁以下的儿童按照酒店的具体规定一般免费（但不提供早餐和加床）。婴儿（1岁以下）如果使用现有的床铺可免费入住。请注意，如果您需要一个婴儿床可能有额外收费 </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间描述</p> <article class="r-ar" id="hdRoomDesc">' + showDesc(result.data[0].hotelRoomFeaturesList) + ' </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间设施</p> <ul class="r-ul">' + showFeature(result.data[0].hotelRoomAmenitiesList) + '</ul>';
			jLayer(message, "房间信息");
			//如果图片没有加载出来就显示默认图片
			var aImg = oDiv.getElementsByTagName('img');
			var hdRoomDesc = document.getElementById('hdRoomDesc');
			for (var i = 0; i < aImg.length; i++) {
				aImg[i].onerror = function() {
					this.src = '../images/hotelDetailerrorpic.png';
				};
			}
			//实现图片滑动
			var owl = $('.owl-carousel');
			owl.owlCarousel({
				items : 1,
				dots : false
			});
			owl.on('changed.owl.carousel', function(ev) {
				console.log(ev);
				if (result.data[0].hotelRoomFeaturesList[ev.item.index]) {
					hdRoomDesc.innerHTML = result.data[0].hotelRoomFeaturesList[ev.item.index];
				} else {
					hdRoomDesc.innerHTML = '暂无描述'
				}
			});
		},

		toggleRoomModals : function(gInfo) {

			var roomTypeCode = this.getAttribute('room-type-code');
			var roomInfo = {
				HotelID : gInfo.HotelID,
				CultureName : hotelDetail.CultureName,
				RoomTypeCode : roomTypeCode
			};
			hotelDetail.jAjax(hotelDetail.requestUrl, roomInfo, "0010", 3, hotelDetail.showRoomModals);
		},

		init : function(arg) {

			var dataObj = arg || this.parseUrlPara(document.location.search, true);
			this.gdataInfo = dataObj;
			this.myData.getByUrl = dataObj;
			console.log(this.myData);
			console.log('url得到的数据');
			console.log(this.gdataInfo);
			this.jAjax(this.requestUrl, dataObj, "0008", 3, this.createAll);

			window.hotelDetail = hotelDetail;
		}
	};

	hotelDetail.init();
	function getSortFun(order, sortBy) {
		var ordAlpah = (order == 'asc') ? '>' : '<';
		var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
		return sortFun;
	}

})(window, document);
