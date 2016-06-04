var day_ary = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//儿童年龄纯数字
setAge = function(obj) {
	obj.value = obj.value.replace(/\D/ig, '');
},
//时间差，两时间的 月|天 差
getDayNum = function(d1, d2, t) {
	var time1 = Date.parse(d1.replace(/-/g, "/")), time2 = Date.parse(d2.replace(/-/g, "/")), Count;
	if (t == "m") {
		d2 = new Date(d2);
		d1 = new Date(d1);
		Count = (d2.getFullYear() - d1.getFullYear()) * 12;
		Count -= d1.getMonth() + 1;
		Count += d2.getMonth();
		Count = Count <= 0 ? 1 : Count;
		Count = Count > 12 ? 12 : Count;
	} else {
		Count = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
	}
	return Count;
};
// 立即执行
(function() {
	"use strict";
	// 定义全局，打包产品基础信息
	var packageID = localStorage.packageID, minPaxType = 0, minPax = 0, maxAdult = 0, onlyForAdult = false, childAgeMin = 2, childAgeMax = 12, roomMinNum = 1, roomMaxNum = 5,
	// 时间相关参数
	day_Num, day_start, calendar_end, day_weekday, tourData, noon = [],
	// 定义方法，日历
	initCalendar = function(obj, obj2) {
		console.log("initCalendar");
		// 酒店时间
		var myDate1 = new ATplugins.Calender({
			id : "date-range",
			num : 13, //getDayNum(,,"m");
			time : obj,
			id2 : "total_day",
			fn : function(date) {
				//选择日期后的回调事件
				//@param ['2016-06-01','2016-06-02']
				var startDate = date[0], endDate = date[1];
				$('#week_span1').html(vlm.Utils.getWeek(startDate, "Ymd"));
				$('#week_span2').html(vlm.Utils.getWeek(endDate, "Ymd"));
			}
		});
		// 景点日历，能否多个日历调用同一个方法
		/*var domestic_calender = new Calender({
			id : "tourTime",
			num : 1,
			time : obj2,
			id2 : "domeTotalDay"
		});*/
	},
	// 定义点击事件
	initEvent = function() {
		// 提交预订
		$("#order_btn").submit(function() {
			sendInfo();
		});
		// 加按钮
		$(".up_btn").on("click", function(event) {
			var target = $(event.target);
			// cur 可用高亮
			if (!target.hasClass('cur')) {
				return;
			}
			var inputEle = target.siblings("i");
			var minusEle = target.siblings(".down_btn");
			var maxValue = parseInt(inputEle.attr("data-max"))?parseInt(inputEle.attr("data-max")):3;
			var inputValue = inputEle.val();
			var atferValue = parseInt(inputValue) + 1;

			inputEle.val(atferValue <= maxValue ? atferValue : inputValue);
			var roomNemEle = $("#count1");
			var roomValue = parseInt(roomNemEle.val());
			var adultNumEle = $("#count2");
			var adultValue = parseInt(adultNumEle.val());

			if (atferValue >= maxValue) {
				target.addClass("disable");
			}
			if (target.hasClass("hotel_people_right_adult_add") && atferValue <= roomValue) {
				minusEle.removeClass("able").addClass("disable");
			} else if (atferValue < maxValue && !minusEle.hasClass('able')) {
				minusEle.removeClass("disable").addClass("able");
			}
			if (target.hasClass("hotel_roomNum_add") && atferValue > adultValue) {
				$("#ho_i7").trigger("click");
			}
		});
		// 减按钮
		$(".down_btn").on("click", function(event) {
			var target = $(event.target);
			// cur 可用高亮
			if (!target.hasClass('cur')) {
				return;
			}
			var inputEle = target.siblings("i");
			var addEle = target.siblings(".up_btn");
			var minValue = parseInt(inputEle.attr("data-min"));
			var maxValue = parseInt(inputEle.attr("data-max"))?parseInt(inputEle.attr("data-max")):3;
			var inputValue = inputEle.val();
			var atferValue = parseInt(inputValue) - 1;
			inputEle.val(atferValue >= minValue ? atferValue : inputValue);
			var roomNemEle = $("#count1");
			var roomValue = parseInt(roomNemEle.val());
			var adultNumEle = $("#count2");
			var adultValue = parseInt(adultNumEle.val());
			if (atferValue > minValue && !target.hasClass('able')) {
				target.removeClass('disable').addClass("able");
			} else if (atferValue <= minValue) {
				target.removeClass('able').addClass("disable");
			}
			if (atferValue < maxValue) {
				addEle.removeClass('disable').addClass("able");
			} else {
				addEle.removeClass('able').addClass("disable");
			}
			if (target.hasClass("hotel_roomNum_reduce") && atferValue < adultValue) {
				$(".hotel_people_right_adult_minus").removeClass('disable').addClass("able");
			}
			if (target.hasClass("hotel_people_right_adult_minus") && atferValue <= roomValue) {
				target.removeClass("able").addClass("disable");
			}
		});
	},
	// 房间
	initRoom = function() {
		var parent = document.getElementById('content'), hotelInfo = document.querySelector('.hotelInfo_numb_room'), roomNum = document.getElementById('roomNum'),
		// 要操作的对象
		section, nums = Math.ceil(minPax / 3),
		// 插入的成人
		ary_a = ['<div class="numbList"><span class="n_tit">成人</span><div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">','</i><span class="up_btn"></span></div></div>'],
		// 儿童
		ary_c = ['<div class="numbList"><span class="n_tit">儿童</span><span class="child-age">(' + childAgeMin + '-' + childAgeMax + ')</span>','<i class="com_icon child_age_state"></i><div class="age_state_box"><div class="state_text">儿童年龄限制为大于等于' + childAgeMin + '周岁，小于' + childAgeMax + '周岁</div><div></div></div>','<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn"></span></div></div>'];
		//  默认房间数为1人，如有最少起订人数，则更换
		roomNum.innerHTML = nums;
		for (var i = 0; i < nums; i++) {
			var n = minPax-3*(i+1)>=0?3:minPax-3*i, initStr = '<span class="title">房间' + (i + 1) + '</span>';
			initStr += ary_a[0]+ n + ary_a[1];
			if (!onlyForAdult) {
				initStr += ary_c.join('');
				//initStr += '<div class="numbList"><span class="n_tit">儿童</span><span class="child-age">(' + childAgeMin + '-' + childAgeMax + ')</span><i class="com_icon child_age_state"></i><div class="age_state_box"><div class="state_text">儿童年龄限制为大于等于2周岁，小于12周岁的儿童</div><div></div></div>' + '<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(' + childAgeMin + '-' + childAgeMax + ')" onkeyup="this.value=this.value.replace(/\D/gi,\"\")"><i class="child-sui">岁</i>' + '</div>';
				//initStr += '<div class="numbList"><span class="n_tit">儿童</span><span class="child-age">(' + childAgeMin + '-' + childAgeMax + ')</span>' + '<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(' + childAgeMin + '-' + childAgeMax + ')" onkeyup="this.value=this.value.replace(/\D/gi,\"\")"><i class="child-sui">岁</i>' + '</div>';
			}
			section = document.createElement('section');
			section.innerHTML = initStr;
			section.className = 'hotelInfo_numb_people init-hotel-room-detail';
			parent.insertBefore(section, hotelInfo.nextSibling);
		}
		initEvent();
	};
	// 原来就有的，不知道干嘛用
	localStorage.setItem('init', '0');
	// 获取详情
	vlm.loadJson("", JSON.stringify({
		Parameters : {
			PackageID : packageID
		},
		ForeEndType : 3,
		Code : "40100002"
	}), function(json) {
		if (json.success) {
			var data = json.data, total_day = document.querySelector('#total_day');
			console.log(data);
			day_start = data.defaultDepartStartDate.substring(0, 10).replace(/-/g, "/");
			calendar_end = data.departValidTo.substring(0, 10).replace(/-/g, "/");
			day_Num = parseInt(data.minDuration ? data.minDuration : data.packageName.substr(2, 1));
			minPaxType = parseInt(data.minPaxType);
			minPax = parseInt(data.minPax);
			maxAdult = parseInt(data.maxAdult);
			onlyForAdult = data.onlyForAdult;
			//儿童年龄限制
			childAgeMin = parseInt(data.childAgeMin);
			childAgeMax = parseInt(data.childAgeMax);
			// 酒店，默认开始时间
			document.getElementById("CheckInDate").value = vlm.Utils.format_date(day_start, 'md');
			document.getElementById("week_span1").innerHTML = day_ary[new Date(day_start).getDay()];
			// 共几晚
			total_day.innerHTML = day_Num - 1;
			// 计算离店
			var dd = new Date(day_start), etim;
			dd.setDate(dd.getDate() + day_Num - 1);
			etim = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
			// 插入离店
			document.getElementById("CheckOutDate").value = vlm.Utils.format_date(etim, 'md');
			document.getElementById("week_span2").innerHTML = day_ary[dd.getDay()];
			// 房间
			initRoom();
			// 景点
			// var tpl_g = $("tpl_GetTour").html(), tpl_GetTour = ejs.render(tpl_g, data);
			var tpl_GetTour = template("tpl_GetTour", data);
			$('#tourTime').html(tpl_GetTour);
			// 日历date-range
			initCalendar();
			// loadend
			vlm.init();
			if (localStorage.getItem('init') != '1') {
				localStorage.setItem('init') = '1';
			}
		} else {
			$('.amy_error_box').show();
			$('.all_elements').hide();
		}
	});
	// 模板更新之后，可能出现Dom无法找到或绑定失效，写的晚一点，防止报错
	var getSpot = function() {

		vlm.loadJson("", JSON.stringify(tmp), function(json) {
			if (json.success) {
				console.log(json);
				var data = json.data, total_day = document.querySelector('#total_day');
				tourData = data;
				dateHandler.dataInfomation = json.data;
				day_start = data.defaultDepartStartDate.substring(0, 10);
				calendar_end = data.departValidTo.substring(0, 10);
				day_Num = parseInt(data.minDuration ? data.minDuration : data.packageName.substr(2, 1));
				minPaxType = parseInt(data.minPaxType);
				minPax = parseInt(data.minPax);
				maxAdult = parseInt(data.maxAdult);
				onlyForAdult = data.onlyForAdult;
				packageID = data.packageID;
				childAgeMin = parseInt(data.childAgeMin);
				childAgeMax = parseInt(data.childAgeMax);
				dateHandler.dateInfomation = {
					minDuration : parseInt(data.minDuration) - 1,
					maxExtensionNight : parseInt(data.maxExtensionNight),
					departValidFrom : /(.*)(T.*)/g.exec(data.departValidFrom)[1],
					departValidTo : /(.*)(T.*)/g.exec(data.departValidTo)[1]
				};
				total_day.innerHTML = day_Num - 1;
				tagAndEvent();
				for (var i = 0; i < data.tours.length; i++) {
					if (data.tours[i].tourSession[0] == 0) {
						noon.push('上午');
					} else if (data.tours[i].tourSession[0] == 1) {
						noon.push('下午');
					} else if (data.tours[i].tourSession[0] == 2) {
						noon.push('晚上');
					} else if (data.tours[i].tourSession[0] == 3) {
						noon.push('');
					} else if (data.tours[i].tourSession[0] == 4) {
						noon.push('');
					}
				}
				var tpl_g = $("tpl_GetTour").html(), tpl_GetTour = ejs.render(tpl_g, data);

				if (localStorage.getItem('init') != '1') {
					dateHandler.init();
				}
				$('#tourTime').html(tpl_GetTour);
				// 景点选择上下午，晚上
				$('.tourSelect').click(function(e) {
					e.stopPropagation();
					$(this).addClass('tourcho').siblings().removeClass('tourcho');
				});
				// 向景点增加时间
				$(".content3_CheckInDate").val(day_start);
				var index = day_ary[new Date(day_start.replace(/-/g, "/")).getDay()];
				$(".week-tour").html(index);
				if (!onlyForAdult) {
					initAgeRange();
				}
				if (data.length == 0) {
					jAlert("抱歉暂时没有数据", "提示");
				}

				//初始时景点时间可选
				function chooseScenicDate() {
					var inputs = document.querySelectorAll('.CheckInDateI');
					console.log(inputs.length);
					var total_day = document.querySelector('#total_day');
					var tourLi = document.querySelector('.tourTime'), allDivs;
					allDivs = tourLi.querySelectorAll('.nav2-tour');
					for (var i = 0; i < allDivs.length; i++) {

						var inputClassName = '', span = '', id = '', input = allDivs[i].querySelector('input'), spanWeek = allDivs[i].querySelector('.week-tour');
						if (input) {

							input.value = inputs[0].value;
							var returnWeek = function(arg1) {
								if (arg1) {
									var week, array, index = new Date(arg1.replace(/-/g, "/")).getDay();
									week = day_ary[index];
									return week;
								}
							};
							spanWeek.innerHTML = returnWeek(inputs[0].value);
							id = allDivs[i].id;
							inputClassName = input.className;
							span = allDivs[i].querySelectorAll('span')[0].className;
							dateHandler.chooseDate(allDivs[i], id, inputClassName, span, inputs[0].value, inputs[1].value);
						}

					}
				}

				// 6.1添加
				$('.child_age_state').click(function(e) {
					e.stopPropagation();
					$('.age_state_box').toggle();
				});
				$('body').click(function(e) {
					//e.stopPropagation();
					var age_state_box = document.getElementsByClassName('age_state_box')[0];
					if (age_state_box.style.display != 'none') {
						age_state_box.style.display = 'none';
					}
				});

				chooseScenicDate();
			} else {
				jAlert(json.message, "提示");
			}
		});
	},
	// 进行校验，准备向后传递数据
	sendInfo = function() {
		var CheckInDate = document.getElementById('CheckInDate').value + 'T00:00:00';
		var CheckOutDate = document.getElementById('CheckOutDate').value + 'T00:00:00';
		var roomNum = parseInt(document.getElementById('roomNum').innerHTML);
		var roomDetails = [], tours = [];
		var roomDetailSection = document.querySelectorAll('.hotelInfo_numb_people');
		var tourEle = document.querySelectorAll('.tour-out-div');
		for (var hn = 0, len = roomDetailSection.length; hn < len; hn++) {
			var temEle = roomDetailSection[hn], temObj = {}, childWithOutBed = [], childWithBed = [];
			var temAdultNum = parseInt(temEle.querySelector('#adult-people-number').innerHTML);
			if (!onlyForAdult) {
				var temChildNum = parseInt(temEle.querySelector('.child-number').innerHTML);
				var extraChild = temEle.querySelector('.extraChild');
				var childChooseParent = extraChild.querySelectorAll('.numbList');
				if (temAdultNum == 1 && temChildNum == 1) {
					childWithBed.push(temEle.querySelector('input').value);
				} else if (temAdultNum == 1 && temChildNum == 2) {
					childWithBed.push(temEle.querySelectorAll('input')[0].value);
					childWithOutBed.push(temEle.querySelectorAll('input')[1].value);
				}
				if (temAdultNum == 2 || temAdultNum == 3) {
					for (var s = 0; s < childChooseParent.length; s++) {
						var ty = childChooseParent[s];
						var tt = ty.querySelector('.icon.noselect');
						if (temChildNum == 1) {
							if (tt.className.indexOf('ico_select') > -1) {
								childWithBed.push(ty.parentNode.querySelector('input').value);
							} else {
								childWithOutBed.push(ty.parentNode.querySelector('input').value);
							}
						} else if (temChildNum == 2) {
							childWithBed.push(temEle.querySelectorAll('input')[0].value);
							childWithOutBed.push(temEle.querySelectorAll('input')[1].value);
						}
					}
				}
				childWithBed.length > 0 ? temObj.childWithBed = childWithBed :
				void (0);
				childWithOutBed.length > 0 ? temObj.childWithOutBed = childWithOutBed :
				void (0);
			}
			temObj.adult = temAdultNum;
			roomDetails.push(temObj);
		}
		for (var fg = 0; fg < tourEle.length; fg++) {
			var id = tourEle[fg].getAttribute('data-tour-id'), dateStr = '', temp = {};
			if (tourEle[fg].querySelector('.content3_CheckInDate')) {
				dateStr = tourEle[fg].querySelector('.content3_CheckInDate').value + 'T00:00:00';
				temp.tourID = id;
				temp.travelDate = dateStr;
				tours.push(temp);
			} else {
				temp.tourID = id;
				tours.push(temp);
			}
		}
		var allNum = 0, adultNum = 0, childNum = 0;
		for (var kl = 0; kl < roomNum; kl++) {
			adultNum = adultNum + roomDetails[kl].adult;
			if (roomDetails[kl]['childWithBed']) {
				childNum = childNum + roomDetails[kl]['childWithBed'].length;
			}
			if (roomDetails[kl]['childWithOutBed']) {
				childNum = childNum + roomDetails[kl]['childWithOutBed'].length;
			}
		}
		//   tourSession存取
		noon = [];
		var weekday = [];
		var weekinfo;
		for (var i = 0; i < tourData.tours.length; i++) {
			if (tourData.tours[i].tourSession.length == 1) {
				if (tourData.tours[i].tourSession[0] == 0) {
					noon.push('上午');
				} else if (tourData.tours[i].tourSession[0] == 1) {
					noon.push('下午');
				} else if (tourData.tours[i].tourSession[0] == 2) {
					noon.push('晚上');
				} else if (tourData.tours[i].tourSession[0] == 3) {
					noon.push(' ');
				} else if (tourData.tours[i].tourSession[0] == 4) {
					noon.push(' ');
				}
			} else {
				var tournoon = tourEle[i].getElementsByClassName('tourSelect');
				for (var n = 0; n < tournoon.length; n++) {
					if (tournoon[n].className == 'tourSelect tourcho') {
						noon.push(tournoon[n].innerHTML);
					}
				}
			}
			if (tourData.tours[i].travelDateMandatory) {
				weekinfo = tourEle[i].querySelector('.week-tour');
				weekday.push(weekinfo.innerHTML);
			} else {
				weekday.push('');
			}
		}
		localStorage.noon = JSON.stringify(noon);
		localStorage.week = JSON.stringify(weekday);
		//   判断页面能否跳转
		var tipBox = document.querySelector('#show-result-tip');
		var InfoData = {};
		var nightnum = document.getElementById('total_day').innerHTML;
		if (onlyForAdult) {
			allNum = adultNum;
			if (adultNum > maxAdult && maxAdult != -1) {
				jAlert('最多选择' + maxAdult + '名成人!');
			} else if (adultNum < minPax) {
				jAlert(minPax + '人起订，请添加更多出行人!');
			} else {
				var paraObj = {
					packageID : localStorage.packageID,
					CheckInDate : CheckInDate,
					CheckOutDate : CheckOutDate,
					nightNum : nightnum,
					roomDetails : roomDetails,
					tours : tours
				};
				localStorage.setItem('info', JSON.stringify(paraObj));
				//获得数据
				var getHotel = function() {
					var minMaxTime = /.*(\d)天(\d).*/.exec(dateHandler.dataInfomation.packageName);
					$("#preloader").show();
					$("#status").show();
					var tmp = {
						Parameters : paraObj,
						ForeEndType : 3,
						Code : "40100008"
					};
					console.log(tmp);
					vlm.loadJson("", JSON.stringify(tmp), function(json) {
						localStorage.setItem('init', '1');
						console.log(json);
						if (json.success) {
							localStorage.setItem('info', JSON.stringify(paraObj));
							localStorage.setItem('hotelResultData', JSON.stringify(json.data));
							window.location.href = "hotel_list.html";
						} else {
							console.log(json);
							jAlert(json.message, "提示");
						}
					});
				};
				getHotel();
			}
		} else {
			var exaddChild = document.getElementsByClassName('extraChild');
			for (var v = 0; v < exaddChild.length; v++) {
				if (exaddChild[v].style.display != 'none') {
					var input = exaddChild[v].getElementsByClassName("inp-cage");
					for (var w = 0; w < input.length; w++) {
						if (input[w].value == '') {
							jAlert('请输入儿童年龄!');
							return;
						} else if (input[w].value < childAgeMin || input[w].value > childAgeMax) {
							jAlert('儿童年龄不符合标准!');
							return;
						}
					}
				}
			}
			allNum = adultNum + childNum;
			if (adultNum > maxAdult && maxAdult != -1) {
				jAlert('最多选择' + maxAdult + '名成人!', "提示");
			} else if (allNum < minPax) {
				jAlert(minPax + '人起订，请添加更多出行人!', "提示");
			} else if (minPax > 1 && adultNum == 1 && childNum == 0) {
				jAlert('人数太少，不能预订!', "提示");
			} else {
				var paraObj = {
					"StarRating" : "",
					"Location" : "",
					"SortType" : 1,
					packageID : localStorage.packageID,
					CheckInDate : CheckInDate,
					CheckOutDate : CheckOutDate,
					nightNum : nightnum,
					roomDetails : roomDetails,
					adultNum : adultNum,
					childNum : childNum,
					tours : tours
				};
				//获得数据
				var getHotel = function() {
					var minMaxTime = /.*(\d)天(\d).*/.exec(dateHandler.dataInfomation.packageName);
					$("#preloader").show();
					$("#status").show();
					var tmp = {
						Parameters : paraObj,
						ForeEndType : 3,
						Code : "40100008"
					};
					console.log(tmp);
					vlm.loadJson("", JSON.stringify(tmp), function(ret) {
						localStorage.setItem('init', '1');
						var json = ret;
						if (json.success) {
							localStorage.setItem('info', JSON.stringify(paraObj));
							localStorage.setItem('hotelResultData', JSON.stringify(json.data));
							window.location.href = "hotel_list.html";
						} else {
							$("#preloader").fadeOut("medium");
							jAlert(json.message, "提示");
						}
					});
				};
				getHotel();
			}
		}
	};

	var tagAndEvent = function() {
		initRooms();
		if (localStorage.getItem('init') != '1') {
			dateHandler.init();
		}
		function toUp(m, n, n_1) {
			var _type = n.parentNode.getAttribute("data-type");
			var str = '', temAll = 0, roomEle = '';
			n.onclick = function() {
				roomEle = n.parentNode.parentNode.parentNode;
				if (_type == "extraChild") {
					str = m.innerHTML;
					str = Number(str);
					str = str + 1;
					temAll = Number(roomEle.querySelector('.adult-people-number').innerHTML) + str;
					if (temAll > roomMaxNum) {
						jAlert('单个房间最多人数不能超过' + roomMaxNum + '人!', '提示');
						return;
						// n.style.backgroundPosition = '-.48rem .04rem';
					} else if (str > 2) {
						jAlert('单个房间儿童数不能超过2人!', '提示');
						return;
					} else {
						m.innerHTML = str;
					}
					extraChild(n.parentNode.parentNode, str);
				} else if (_type == "extraRoom") {
					str = m.innerHTML;
					str = Number(str);
					str = str + 1;
					if (str > 5) {
						jAlert('最多选择5个房间!', '提示');
					} else {
						m.innerHTML = str;
						extraRoom(n.parentNode.parentNode, str);
					}
				} else if (_type == "adult") {
					var adultdown = n.parentNode.getElementsByClassName('down_btn')[0];
					adultdown.style.backgroundPosition = '-.48rem .04rem';
					if (onlyForAdult) {
						str = m.innerHTML;
						str = Number(str);
						str = str + 1;
						temAll = str;
						if (temAll > roomMaxNum) {
							jAlert('单个房间最多人数不能超过' + roomMaxNum + '人!', '提示');
							return;
							// n.style.backgroundPosition = '-.48rem .04rem';
						} else if (temAll > 3) {
							jAlert('单个房间成人数不能超过3人!', '提示');
							return;
						} else {
							m.innerHTML = str;
						}
					} else {
						str = m.innerHTML;
						str = Number(str);
						str = str + 1;
						temAll = Number(roomEle.querySelector('.child-number').innerHTML) + str;
						if (temAll > roomMaxNum) {
							jAlert('单个房间最多人数不能超过' + roomMaxNum + '人!', '提示');
							return;
							//n.style.backgroundPosition = '-.48rem .04rem';
						} else if (str > 3) {
							jAlert('单个房间成人数不能超过3人!', '提示');
							return;
						} else {
							m.innerHTML = str;
						}
						var parent = n.parentNode.parentNode.parentNode;
						var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
						changeChildTemp(parent, str, ChildNum);
					}
				}
			};
		}

		function toDown(m, n) {
			var _type = n.parentNode.getAttribute("data-type");
			n.onclick = function() {
				var str = m.innerHTML;
				str = Number(str);
				if (n.id == 'room_downb') {
					if (str <= 1) {
						m.innerHTML = 1;
					} else {
						str = str - 1;
						m.innerHTML = str;
					}
					str == 1 ? n.style.backgroundPosition = '-.48rem .04rem' : n.style.backgroundPosition = '-.48rem .04rem';
				} else if (n.id == 'adult-down') {
					if (str <= 1) {
						m.innerHTML = 1;
					} else {
						str = str - 1;
						m.innerHTML = str;
					}
					str == 1 ? n.style.backgroundPosition = '-.48rem .04rem' : n.style.backgroundPosition = '-.48rem .04rem';
					var parent = n.parentNode.parentNode.parentNode;
					var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
					changeChildTemp(parent, str, ChildNum);
				} else {
					if (str <= 0) {
						m.innerHTML = 0;
					} else {
						str = str - 1;
						m.innerHTML = str;
					}
					str == 0 ? n.style.backgroundPosition = '-.48rem .04rem' : n.style.backgroundPosition = '-.48rem .04rem';
				}
				_type == "extraChild" && extraChild(n.parentNode.parentNode, str);
				_type == "extraRoom" && extraRoom(n.parentNode.parentNode, str);
			};
		}

		//  实现加减
		function add_subtract() {
			var oNum = document.getElementsByClassName('change_num'), _plus_btn = document.getElementsByClassName('up_btn'), _cut_down_btn = document.getElementsByClassName('down_btn');
			for (var i = 0; i < oNum.length; i++) {
				toUp(oNum[i], _plus_btn[i], _cut_down_btn[i]);
				toDown(oNum[i], _cut_down_btn[i]);
				var str = parseInt(oNum[i].innerHTML);
				if (i == 0) {
					str == 1 ? _cut_down_btn[i].style.backgroundPosition = '-.48rem .04rem' : _cut_down_btn[i].style.backgroundPosition = '-.48rem .04rem';
				} else {
					str == 0 ? _cut_down_btn[i].style.backgroundPosition = '-.48rem .04rem' : _cut_down_btn[i].style.backgroundPosition = '-.48rem .04rem';
				}
			}
			addbed();
		}

		function addbed() {
			var addBed = document.getElementsByClassName('icon noselect');
			for (var j = 0; j < addBed.length; j++) { {( function(index) {
							addBed[j].onclick = function() {
								var c_name = addBed[index].className;
								if (c_name == 'icon noselect') {
									this.className = 'icon noselect ico_select';
								} else {
									this.className = 'icon noselect';
								}
							};
						}(j));
				}
			}
		}

		add_subtract();
		//   加减儿童
		function extraChild(dom, numb) {
			var _bedBox = dom.parentNode.getElementsByClassName('extraChild'), _html = '';
			var adultPeople = parseInt(dom.parentNode.getElementsByClassName('adult-people-number')[0].innerHTML);
			if (numb == 0 && _bedBox.length == 1) {
				_bedBox[0].style.display = 'none';
			} else {
				var _listHtml;
				_bedBox[0].style.display = 'block';
				_listHtml = extraChildTemp(numb, adultPeople);
				//'';
				/*for (var i = 1; i <= numb; i++) {
				 _listHtml += extraChildTemp(i);
				 }*/
				if (_bedBox.length == 0) {
					_html = '<div class="extraChild">';
					domAfter(dom, _html + _listHtml + '</div>');
					_listHtml = extraChildTemp(numb, adultPeople);
				} else {
					_bedBox[0].innerHTML = _listHtml;
					_listHtml = extraChildTemp(numb, adultPeople);
				}
			}
			add_subtract();
		}

		//    加减房间
		function extraRoom(dom, numb) {
			var roomBox_first = dom.parentNode.childNodes[7];
			var roomBox = document.getElementsByClassName('hotelInfo_numb_people');
			var _html = '';
			if (numb < roomBox.length) {
				roomBox_first.parentNode.removeChild(roomBox[roomBox.length - 1]);
			} else if (numb == roomBox.length) {
				return;
			} else {
				var section = document.createElement("section");
				section.className = "hotelInfo_numb_people";
				for (var i = 1; i <= numb; i++) {
					_html = extraRoomTemp(i);
					var rb_l = roomBox.length;
					var lastIndex = rb_l - 1;
					section.innerHTML = _html;
					roomBox_first.parentNode.insertBefore(section, roomBox[lastIndex].nextElementSibling);
				}
			}
			add_subtract();
		}

		function extraChildTemp(i, n) {
			if (n == 1) {
				if (i == 2) {
					return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '"><i class="child-sui">岁</i>' + '</div>';
				} else {
					return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>';
				}
			} else if (i == 1) {
				return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
			} else if (i == 2) {
				return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
			}
			addbed();
		}

		//    儿童信息随成人信息更变
		function changeChildTemp(box, n, i) {
			var listStr = box.querySelector('.extraChild');
			if (n == 1) {
				if (i == 2) {
					listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '"><i class="child-sui">岁</i>' + '</div>';
				} else {
					listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>';
				}
			} else if (i == 1) {
				listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
			} else if (i == 2) {
				listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
			}
			addbed();
		}

		function extraRoomTemp(i) {
			if (onlyForAdult) {
				return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">1</i><span class="up_btn"></span></div>' + '</div>';
			} else {
				return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">1</i><span class="up_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(' + childAgeMin + '-' + childAgeMax + ')</span>' + '<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="this.value=this.value.replace(/\D/gi,\"\")"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>' + '</div>';
			}
		}

		function domAfter(dom, html) {
			var next = dom.nextSibling;
			if (next != null) {
				while (next.tagName == undefined) {
					if (next.nextSibling != null) {
						next = next.nextSibling;
					} else {
						next = null;
						break;
					}
				}
			}
			next != null ? next.parentNode.insertBefore(el(html), next) : dom.parentNode.appendChild(el(html));
		}

	};

}).call(this);

/* 不再启用的扩展 ，author：heyong
 function TicketDate(argument) {
 Calender.call(this, argument)
 }

 TicketDate.prototype = new Calender();

 TicketDate.prototype.linkColor = function(type, date) {
 var that = this, links = _CalF.$('.live', this.dd), startIndex, endIndex;
 if (type == 'Return') {
 for (var st = 0; st < links.length; st++) {
 if (links[st].querySelector('.live_txt') && links[st].querySelector('.live_txt').innerHTML == '入住') {
 startIndex = st;
 }
 if (links[st].querySelector('.live_txt') && links[st].querySelector('.live_txt').innerHTML == '离店') {
 endIndex = st;
 }
 }
 for (var t = startIndex; t < endIndex; t++) {
 _CalF.addClass("yellow", links[t]);
 }
 } else {
 for (var sn = 0; sn < links.length; sn++) {
 var temStr = /(\d{1,2})/g.exec(links[sn].innerHTML);
 if (temStr) {
 if (links[sn].getAttribute('data-day') == date) {
 links[sn].innerHTML = '<span class="live_circle">' + temStr[0] + '</span>';
 } else {
 links[sn].innerHTML = temStr[0] != null ? temStr[0] : '';
 }
 }
 if (links[sn].innerHTML == '今天' && date == links[sn].getAttribute('data-day')) {
 links[sn].innerHTML = '<span class="live_circle">今天</span>';
 }
 }
 }
 return false;
 };

 TicketDate.prototype._word = {
 h : ['入住', '离店'],
 f : ['入住', '离店', '去+返']
 };
 TicketDate.prototype.inputEvent = function() {
 var that = this;
 var date = new Date();
 var nowY = date.getFullYear();
 var nowM = date.getMonth();
 var nowD = date.getDate();
 var reShowDate = function(arg) {

 };
 _CalF.bind(this.input, 'click', function() {
 that.createContainer();
 for (var i = 0; i < that.num; i++) {
 if (i == (that.num - 1)) {
 var idate = new Date(nowY, nowM + i, 01);
 that.drawLastDate(idate);
 } else {
 var idate = new Date(nowY, nowM + i, 01);
 if (that.type == "Oneway") {
 that.drawDate(idate);
 that.linkColor("Oneway", that.singleDate)
 } else {
 var start = that.doubleDate.start, end = that.doubleDate.end;
 that.time = {};
 if (start != end) {
 that.time[start] = '入住';
 that.time[end] = '离店';
 } else {
 that.time[start] = '去+返';
 }
 that.drawDate(idate);
 }
 }
 }
 });
 }, TicketDate.prototype.initialize = function(options) {
 this.type = options.type;
 this.id = options.id;
 this.num = options.num;
 this.sClass1 = options.sClass1;
 this.id2 = options.id2;
 this.fn = options.fn;
 this.fn2 = options.fn2;
 this.op = 0;
 this.input = _CalF.$('#' + this.id);
 this.inputEvent();
 this.outClick();
 this.type == "Oneway" ? this.singleDate = options.time.start : this.doubleDate = options.dateObj;
 if (options.range) {
 this.range = options.range;
 }
 };

 TicketDate.prototype.createContainer = function(odate) {
 // 如果存在，则移除整个日期层Container
 var odiv = _CalF.$('#' + this.id + '-date');
 if (!!odiv)
 odiv.parentNode.removeChild(odiv);
 var container = this.container = document.createElement('div');
 container.id = this.id + '-date';
 container.style.position = "absolute";
 container.style.zIndex = 98;
 if (this.input.tagName === 'input') {
 //PC输入框
 var inputPos = _CalF.getPos(this.input);
 // 根据input的位置设置container高度
 container.style.left = inputPos.left + 'px';
 container.style.top = inputPos.bottom - 1 + 'px';
 // 设置日期层上的单击事件，仅供阻止冒泡，用途在日期层外单击关闭日期层
 _CalF.bind(container, 'click', this.stopPropagation);

 } else {
 //M站层
 container.style.background = "#f5f4f9";
 container.style.overflow = 'auto';
 container.style.width = container.style.height = '100%';
 container.style.left = '0';
 container.style.top = '0';
 container.style.paddingBottom = '118px';
 var header = this.header = document.createElement('div');
 header.id = this.id + "-header";
 header.className = 'header tour-date-header';
 header.innerHTML = '<a href="javascript:void(0);" class="header-back"><i class="icons go-back"></i></a><h3>选择日期</h3>';
 document.body.appendChild(header);
 var weeker = document.createElement('div');
 weeker.className = 'calendar';
 weeker.style.marginTop = '49px';
 weeker.innerHTML = this._tempweek.join('');
 container.appendChild(weeker);

 var tiper = this.tiper = document.createElement('div');
 tiper.id = this.id + '-tiper';
 tiper.className = 'tipers';

 tiper.innerHTML = "请选择入住日期";
 this.type == 'Oneway' ?
 void (0) : container.appendChild(tiper);
 }
 document.body.appendChild(container);
 };

 TicketDate.prototype.drawDate = function(odate) {
 var dateWarp, titleDate, dd, year, month, date, days, weekStart, i, l, ddHtml = [], textNode;
 var nowDate = new Date(), nowyear = nowDate.getFullYear(), nowmonth = nowDate.getMonth(), nowdate = nowDate.getDate();
 var mWor = '', dWor = '';
 this.dateWarp = dateWarp = document.createElement('div');
 dateWarp.className = 'calendar';
 dateWarp.innerHTML = this._template.join('');
 this.year = year = odate.getFullYear();
 this.month = month = odate.getMonth() + 1;
 this.date = date = odate.getDate();
 this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
 tims = this.time;
 textNode = document.createTextNode(year + '年' + month + '月');
 titleDate.appendChild(textNode);

 // 获取模板中唯一的DD元素
 dd = _CalF.$('dd',dateWarp)[0];
 // 获取本月天数
 days = new Date(year, month, 0).getDate();
 // 获取本月第一天是星期几
 weekStart = new Date(year, month - 1, 1).getDay();
 // 开头显示空白段
 for ( i = 0; i < weekStart; i++) {
 ddHtml.push('<a>&nbsp;</a>');
 }
 // 循环显示日期
 for ( i = 1; i <= days; i++) {
 dWor = parseInt(i) < 10 ? '0' + parseInt(i) : parseInt(i);
 mWor = parseInt(month) < 10 ? '0' + parseInt(month) : parseInt(month);
 if (year < nowyear) {
 ddHtml.push('<a class="disabled">' + i + '</a>');
 } else if (year == nowyear) {
 if (month < nowmonth + 1) {
 ddHtml.push('<a class="live disabled">' + i + '</a>');
 } else if (month == nowmonth + 1) {
 if (i < nowdate) {
 ddHtml.push('<a class="live disabled">' + i + '</a>');
 } else {
 if (tims && tims[year + '-' + mWor + '-' + dWor] && this.type == "Return") {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '"><span class="live_circle">' + i + '</span><span class="live_txt">' + tims[year + '-' + mWor + '-' + dWor] + '</span></a>';
 } else if (tims && tims[year + '-' + mWor + '-' + dWor] && this.type == "Oneway") {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '"><span class="live_circle">' + i + '</span></a>';
 } else {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '">' + i + '</a>';
 }
 i == nowdate ? ddHtml.push('<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '">今天</a>') : ddHtml.push(pstr);
 }
 } else if (month == nowmonth + 2) {
 if (tims && tims[year + '-' + mWor + '-' + dWor] && this.type == "Return") {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '"><span class="live_circle">' + i + '</span><span class="live_txt">' + tims[year + '-' + mWor + '-' + dWor] + '</span></a>';
 } else if (tims && tims[year + '-' + mWor + '-' + dWor] && this.type == "Oneway") {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '"><span class="live_circle">' + i + '</span></a>';
 } else {
 pstr = '<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '">' + i + '</a>';
 }
 ddHtml.push(pstr);
 } else {
 ddHtml.push('<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '">' + i + '</a>');
 }
 } else if (year > nowyear) {
 ddHtml.push('<a class="live" data-day="' + year + '-' + mWor + '-' + dWor + '">' + i + '</a>');
 }
 }
 dd.innerHTML = ddHtml.join('');

 // 添加
 this.container.appendChild(dateWarp);
 var ie6 = !!window.ActiveXObject && !window.XMLHttpRequest;
 if (ie6)
 dateWarp.appendChild(this.createIframe());
 this.linkOn();
 if (this.type == 'Oneway') {
 if (document.querySelector('#chooseDate-single-header')) {
 document.querySelector('#chooseDate-single-header').onclick = function(event) {
 var event = event || window.event;
 var target = event.target || event.srcElement, op = null, op2 = null;
 if ((target.tagName == 'A' && target.className == 'header-back') || (target.tagName == 'I' && target.className == 'icons go-back')) {
 op = document.querySelector('.header'), op2 = document.querySelector('#date-range-date');
 document.body.removeChild(op);
 document.body.removeChild(op2)
 }
 }
 } else if (document.querySelector('#dateIcon-header')) {
 document.querySelector('#dateIcon-header').onclick = function(event) {
 var event = event || window.event;
 var target = event.target || event.srcElement, op = null, op2 = null;
 if ((target.tagName == 'A' && target.className == 'ticket-header-back') || (target.tagName == 'I' && target.className == 'icons ticket-go-back')) {
 op = document.querySelector('#dateIcon-header'), op2 = document.querySelector('#dateIcon-date');
 document.body.removeChild(op)
 document.body.removeChild(op2)
 }
 }
 }

 } else {
 if (document.querySelector('#ori-des-Date-header')) {
 document.querySelector('#ori-des-Date-header').onclick = function(event) {
 var event = event || window.event;
 var target = event.target || event.srcElement, op = null, op2 = null;
 if ((target.tagName == 'A' && target.className == 'ticket-header-back') || (target.tagName == 'I' && target.className == 'icons ticket-go-back')) {
 op = document.querySelector('#ori-des-Date-header'), op2 = document.querySelector('#ori-des-Date-date');
 document.body.removeChild(op)
 document.body.removeChild(op2)
 }
 }
 } else if (document.querySelector('#dateIcon-header')) {
 document.querySelector('#dateIcon-header').onclick = function(event) {
 var event = event || window.event;
 var target = event.target || event.srcElement, op = null, op2 = null;
 if ((target.tagName == 'A' && target.className == 'ticket-header-back') || (target.tagName == 'I' && target.className == 'icons ticket-go-back')) {
 op = document.querySelector('#dateIcon-header'), op2 = document.querySelector('#dateIcon-date');
 document.body.removeChild(op)
 document.body.removeChild(op2)
 }
 }
 }

 }
 };

 TicketDate.prototype.linkOn = function() {
 var links = _CalF.$('.live', this.dd), i, l = links.length, that = this;
 for ( i = 0; i < l; i++) {
 links[i].index = i;
 links[i].onclick = function(event) {
 if (that.input.tagName === 'input') {
 $(this).css("border", "1px solid #ff6a2f").css("z-index", "9999999");
 $(this).siblings().css("border", "").css("z-index", "");
 } else {
 if (!(this.className.indexOf("disabled") > -1)) {
 if (that.type == 'Oneway') {
 that.linkOver(event);
 } else {
 if (that.op == 0) {
 if (that.timer != null) {
 window.clearTimeout(that.timer);
 that.timer = null;
 }
 that.tiper.innerHTML = '请选择' + that._word.f[1] + '日期';
 that.linkReset(this.index);
 $(this).html('<span class="live_circle">' + (this.innerHTML) + '</span><span class="live_txt">' + that._word.f[that.op] + '</span>');
 that.op++;
 that.cache = this.getAttribute('data-day');
 that.doubleDate.start = this.getAttribute('data-day');
 } else if (that.op == 1 && this.getAttribute('data-day') != that.cache) {
 if (that.timer != null) {
 window.clearTimeout(that.timer);
 that.timer = null;
 }
 that.doubleDate.end = this.getAttribute('data-day');
 $(this).html('<span class="live_circle">' + (this.innerHTML) + '</span><span class="live_txt">' + that._word.f[that.op] + '</span>');
 that.tiper.style.display = 'none';
 that.linkOver();
 that.linkColor('Return');
 } else if (that.op == 1 && this.getAttribute('data-day') == that.cache) {
 if (that.timer != null) {
 window.clearTimeout(that.timer);
 that.timer = null;
 }
 that.tiper.style.display = 'none';
 that.doubleDate.end = this.getAttribute('data-day');
 this.querySelector('.live_txt').innerHTML = that._word.f[2];
 that.linkOver();
 }
 }
 }
 }
 };
 }
 this.linkColor('Return');
 if (!this.range) {
 return;
 } else if (this.type == "Oneway" && this.range.length >= 2) {
 this.linkRange('Oneway');
 }
 };

 TicketDate.prototype.linkOver = function(event) {
 var sels = $('#' + this.id + '-date .live_circle'), i, l = sels.length, that = this, arr = [];
 var out = _CalF.$('input', that.input);
 if (!out.length) {
 out = _CalF.$('.' + this.sClass1, document);
 }

 if (this.type != 'Oneway') {
 var tal = _CalF.$('#' + this.id2, that.input);
 if (out[0].tagName == 'INPUT') {
 for ( i = 0; i < 2; i++) {
 arr.push(sels[i].parentNode.getAttribute("data-day"));
 out[i].value = sels[i].parentNode.getAttribute("data-day");
 }
 } else {
 if (sels.length == 1) {
 arr.push(sels[0].parentNode.getAttribute("data-day"));
 arr.push(sels[0].parentNode.getAttribute("data-day"));
 out[0].innerHTML = returnWeek(sels[0].parentNode.getAttribute("data-day"));
 that.doubleChosenDateOne = sels[0].parentNode.getAttribute("data-day");
 if (out[1]) {
 that.doubleChosenDateTwo = sels[0].parentNode.getAttribute("data-day");
 out[1].innerHTML = returnWeek(sels[0].parentNode.getAttribute("data-day"));
 }
 } else {
 arr.push(sels[0].parentNode.getAttribute("data-day"));
 arr.push(sels[1].parentNode.getAttribute("data-day"));
 out[0].innerHTML = returnWeek(sels[0].parentNode.getAttribute("data-day"));
 that.doubleChosenDateOne = sels[0].parentNode.getAttribute("data-day");
 if (out[1]) {
 that.doubleChosenDateTwo = sels[1].parentNode.getAttribute("data-day");
 out[1].innerHTML = returnWeek(sels[1].parentNode.getAttribute("data-day"));
 }
 }
 }
 if (tal) {
 tal.innerHTML = (Math.round((new Date(arr[1]) - new Date(arr[0])) / (1000 * 60 * 60 * 24)));
 }
 } else {
 var event = event || window.event;
 var target = event.target || event.srcElement;
 if (target.tagName == 'A') {
 that.singleDate = target.getAttribute('data-day');
 that.linkColor('Oneway', that.singleDate);
 if (out[0].tagName == 'INPUT') {
 out[0].value = that.singleDate;
 } else {
 out[0].innerHTML = that.singleDate;
 }
 } else if (target.tagName == 'SPAN') {
 that.singleDate = target.parentNode.getAttribute('data-day');
 that.linkColor('Oneway', that.singleDate);
 if (out[0].tagName == 'INPUT') {
 out[0].value = that.singleDate;
 } else {
 out[0].innerHTML = that.singleDate;
 }

 }
 }
 that.timer = window.setTimeout(function() {
 that.op >= 1 ? that.op = 0 : null;
 that.removeDate();
 if (that.header.parentNode) {
 that.header.parentNode.removeChild(that.header);
 }
 if ( typeof that.fn === 'function') {
 that.fn();
 window.clearTimeout(that.timer);
 that.timer = null;
 }
 }, 1000);

 function returnWeek(arg) {
 if (arg) {
 var week, array, index = new Date(arg.replace(/-/g, "/")).getDay();
 switch (index) {
 case 0 :
 week = '周日';
 break;
 case 1 :
 week = '周一';
 break;
 case 2 :
 week = '周二';
 break;
 case 3 :
 week = '周三';
 break;
 case 4 :
 week = '周四';
 break;
 case 5 :
 week = '周五';
 break;
 case 6 :
 week = '周六';
 break;
 default :
 void (0);
 }
 array = arg.split('-');
 array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
 array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
 return '<span class="dateNumber">' + array[1] + '月' + array[2] + '日' + '</span>' + ' ' + '<span>' + week + '</span>';
 }
 }

 };

 TicketDate.prototype.linkRange = function(type) {
 var that = this, links = _CalF.$('.live', this.dd), startRange, endRange;
 if (!this.range) {
 return;
 } else if (type == "Oneway" && this.range.length >= 2) {
 startRange = new Date(this.range[0].replace(/-/g, "/"));
 endRange = new Date(this.range[1].replace(/-/g, "/"));
 for (var st = 0; st < links.length; st++) {
 if (links[st].getAttribute('data-day') != null) {
 if (new Date((links[st].getAttribute('data-day')).replace(/-/g, "/")) < startRange || new Date((links[st].getAttribute('data-day')).replace(/-/g, "/")) > endRange) {
 links[st].className = links[st].className + " disabled"
 }
 }
 }
 }
 };

 TicketDate.prototype.linkReset = function(ele) {
 var that = this, ospan = $('.live_circle'), links = _CalF.$('.live', this.dd), startIndex, endIndex;

 if (that.op == 0) {
 for (var i = 0; i < ospan.length; i++) {

 var v = ospan[i].parentNode.getAttribute("data-day");
 var a = v.split("-");
 ospan[i].parentNode.innerHTML = a[a.length - 1];
 }
 for ( i = 0; i < ele; i++) {
 _CalF.addClass("disabled", links[i]);
 }
 for ( i = ele + 30; i < links.length; i++) {
 _CalF.addClass("disabled", links[i]);
 }
 return false;
 }
 };
 */
