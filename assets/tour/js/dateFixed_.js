var day_ary = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
//儿童年龄纯数字
  setAge = function (obj) {
    obj.value = obj.value.replace(/\D/ig, '');
  },
//时间差，两时间的 月|天 差
  getDayNum = function (d1, d2, t) {
    var time1 = Date.parse(d1.replace(/-/g, "/")),
      time2 = Date.parse(d2.replace(/-/g, "/")),
      Count;
    if (t == "m") {
      d2 = new Date(d2);
      d1 = new Date(d1);
      Count = (d2.getFullYear() - d1.getFullYear()) * 12;
      Count -= d1.getMonth();
      Count += d2.getMonth() + 1;
      Count = Count <= 0 ? 1 : Count;
      //Count = Count > 12 ? 12 : Count;
    } else {
      Count = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
    }
    return Count;
  };
// 立即执行
(function () {
  "use strict";
  // 定义全局，打包产品基础信息
  var packageID = localStorage.packageID,
    minPaxType = 0,
    minPax = 0,
    maxAdult = 0,
    onlyForAdult = false,
    childAgeMin = 2,
    childAgeMax = 12,
    roomMinNum = 1,
    roomMaxNum = 5,
    maxExtensionNight = 10,
    minDuration = 2,
    maxAdultNum = 3,
    minAdultNum = 1,
    maxChildNum = 2,
    minChildNum = 0,


    dateHandler = {},
    tourCalendar,
  // 时间相关参数
    day_Num, day_start, day_end, calendar_end, day_weekday, tourData, noon = [],
    initTourCalendar = function () {
      //多个景点日历初始化
      var contentList = $("[id*='dateContent']");
      var dateContentId;
      var initTourDate = {};
      //获取景点可选择日期时间段
      var rangesDate = $("#date-range").attr("data-selectedTime") ? $("#date-range").attr("data-selectedTime") : vlm.Utils.format_date(day_start, "Ymd") + "," + vlm.Utils.format_date(day_end, "Ymd");
      rangesDate = rangesDate.split(",");

      //景点的默认选中日期为开始日期+1天
      var firstDate = new Date(rangesDate[0].replace(/-/g, '/'));
      var defaultDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1);
      var defaultSelectedDate = defaultDate.getFullYear() + "-" + (defaultDate.getMonth() + 1) + "-" + defaultDate.getDate();
      initTourDate[vlm.Utils.format_date(defaultSelectedDate, "Ymd")] = "initDate";
      for (var i = 0, len = contentList.length; i < len; i++) {

        dateContentId = $(contentList[i]).attr("id");
        var ableWeekRange = $("#" + dateContentId).attr("data-frequency");
        tourCalendar = null;
        tourCalendar = new ATplugins.Calender({
          id: dateContentId,
          num: getDayNum(rangesDate[0], rangesDate[1], "m"),
          time: initTourDate,
          selectTime: 1,
          ableDateRange: {
            rangeStartDate: rangesDate[0],
            rangeEndDate: rangesDate[1]
          },
          ableWeekRange: ableWeekRange,
          //                    ableWeekRange: '1,2,3,',
          type: 'hotel',
          callback: function (data, instance) {
            console.info(data);
            console.info(instance);
            var containerId = instance.id;
            $("#" + containerId).find("input").val(data[0]);
            $("#" + containerId).find(".week-tour").html(vlm.Utils.getWeek(data[0]));
          }
        });
      }
    },
  // 定义方法，日历
    initHotelCalendar = function () {
      var initTime = {};
      // 计算离店
      var dd = new Date(day_start);
      dd.setDate(dd.getDate() + day_Num - 1);
      day_end = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
      initTime[vlm.Utils.format_date(day_start, "Ymd")] = "startDate";
      initTime[vlm.Utils.format_date(day_end, "Ymd")] = "endDate";
      var myDate = new ATplugins.Calender({
        id: 'date-range',
        num: getDayNum(day_start, calendar_end, "m"),
        time: initTime,
        theLastAbleDay: new Date(calendar_end),
        disableDateAfterLength: maxExtensionNight,
        minDuration: minDuration,
        startAbleDate: day_start,
        sClass1: 'CheckInDateI',
        type: 'hotel',
        dateObj: {
          //start : paraObj.start,
          //end : paraObj.end
        },
        range: [],
        _word: {
          tip: ['入住', '离店']
        },
        callback: function (data) {
          //重新赋值
          var checkInDateEle = $("#CheckInDate");
          var checkOutDateEle = $("#CheckOutDate");
          var checkInWeekEle = $("#week_span1");
          var checkOutWeekEle = $("#week_span2");
          var totalDayEle = $("#total_day");

          checkInDateEle.val(vlm.Utils.format_date(data[0], 'md'));
          checkOutDateEle.val(vlm.Utils.format_date(data[1], 'md'));
          checkInDateEle.attr("data-date", data[0]);
          checkOutDateEle.attr("data-date", data[1]);

          checkInWeekEle.html(vlm.Utils.getWeek(data[0]));
          checkOutWeekEle.html(vlm.Utils.getWeek(data[1]));

          totalDayEle.html(getDayNum(data[1],data[0],"d"));
          //修改日期后重新初始化景点日历
          var rangesDate = $("#date-range").attr("data-selectedTime") ? $("#date-range").attr("data-selectedTime") : vlm.Utils.format_date(day_start, "Ymd") + "," + vlm.Utils.format_date(day_end, "Ymd");
          rangesDate = rangesDate.split(",");

          //景点的默认选中日期为开始日期+1天
          var firstDate = new Date(rangesDate[0].replace(/-/g, '/'));
          var defaultDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1);
          var defaultSelectedDate = defaultDate.getFullYear() + "-" + (defaultDate.getMonth() + 1) + "-" + defaultDate.getDate();
          $("#tourTime").find("input").each(function (index, ele) {
            $(ele).val(defaultSelectedDate);
          });
          $("#tourTime").find(".week-tour").each(function (index, ele) {
            $(ele).html(vlm.Utils.getWeek(defaultSelectedDate));
          });
          initTourCalendar();
        }
      });
      initTourCalendar();
    },
  // 定义点击事件
    initEvent = function () {
      // 提交预订
      $("#order_btn").click(function () {
        sendInfo();
      });

      //景点上午下午晚上 周末选择
      $("#tourTime").on("click", ".tourSelect", function (event) {
        var target = $(event.target);
        target.addClass("tourcho");
        target.siblings().each(function (index, ele) {
          $(ele).removeClass("tourcho");
        });
      });

      //房间增减
      $("#roomNumber .down_btn").click(function (event) {

        var addBtn = $("#roomNumber .up_btn");
        var target = $(event.target);
        var roomNumber = parseInt($("#roomNum").html());
        var hotelInfoNumbPeopleSections = $(".hotelInfo_numb_people").length;

        //房间减少逻辑
        if (roomNumber > roomMinNum) {
          $("#roomNum").html(roomNumber - 1);
          roomNumber = roomNumber - 1;

        }
        if (target.hasClass("cur")) {
          //可点击状态
          if (hotelInfoNumbPeopleSections > roomNumber) {
            $(".hotelInfo_numb_people").eq(hotelInfoNumbPeopleSections - 1).remove();
            addBtn.addClass("cur");
          }
          //设置按钮不可点击
          if (roomNumber == roomMinNum) {
            target.removeClass("cur");
          }
        }


      });
      $("#roomNumber .up_btn").click(function (event) {
        var downBtn = $("#roomNumber .down_btn");
        var target = $(event.target);
        var roomNumber = parseInt($("#roomNum").html());
        var newRoomHtml = "";
        var allRoomEle = $(".hotelInfo_numb_people");
        var allRoomEleLen = $(".hotelInfo_numb_people").length;
        //更新房间数量
        if (roomNumber < roomMaxNum) {
          $("#roomNum").html(roomNumber + 1);
          roomNumber = roomNumber + 1;
        }

        if (target.hasClass("cur")) {
          //可点击状态
          var section = document.createElement("section");
          section.className = "hotelInfo_numb_people";
          var newRoomHtml = addNewRoomHtml(allRoomEleLen + 1, 2);
          section.innerHTML = newRoomHtml;
          allRoomEle.eq(allRoomEleLen - 1).after(section);
          //设置按钮不可点击
          if (roomNumber == roomMaxNum) {
            target.removeClass("cur");
          }
          downBtn.addClass("cur");
        }


      });

      //成人 儿童加减逻辑
      $("#roomList").on("click", ".down_btn", function (event) {
        var target = $(event.target);
        var type = target.parent().attr("data-type");
        var adultNumEle = target.siblings(".adult-people-number");
        var adultNumValue = parseInt(adultNumEle.html());
        var childNumEle = target.siblings(".child-number");
        var childNumValue = parseInt(childNumEle.html());
        var allExtraChild = target.parents(".numbList").siblings(".extraChild");
        var upBtn = target.siblings(".up_btn");
        switch (type) {
          case "adult":
            if (target.hasClass("cur")) {
              adultNumValue = adultNumValue - 1;
              adultNumEle.html(adultNumValue);
              if (adultNumValue === minAdultNum) {
                target.removeClass("cur");
              }
              if (adultNumValue < maxAdultNum) {
                upBtn.addClass("cur");
              }
              addBedShowOrHide(target);
            }
            break;
          case "extraChild":
            if (target.hasClass("cur")) {
              childNumValue = childNumValue - 1;
              childNumEle.html(childNumValue);
              if (childNumValue === minChildNum) {
                target.removeClass("cur");
              }
              if (childNumValue < maxChildNum) {
                upBtn.addClass("cur");
              }
              if (allExtraChild.length > childNumValue) {
                allExtraChild.eq(allExtraChild.length - 1).remove();
                upBtn.addClass("cur");
              }
              addBedShowOrHide(target);
            }
            break;
        }
      });
      $("#roomList").on("click", ".up_btn", function (event) {
        var target = $(event.target);
        var type = target.parent().attr("data-type");
        var adultNumEle = target.siblings(".adult-people-number");
        var adultNumValue = parseInt(adultNumEle.html());
        var childNumEle = target.siblings(".child-number");
        var childNumValue = parseInt(childNumEle.html());
        var allExtraChild = target.parents(".numbList").siblings(".extraChild");
        var downBtn = target.siblings(".down_btn");
        var extraChildHtml = "";
        switch (type) {
          case "adult":
            if (target.hasClass("cur")) {
              adultNumValue = adultNumValue + 1;
              adultNumEle.html(adultNumValue);
              if (adultNumValue === maxAdultNum) {
                target.removeClass("cur");
              }
              downBtn.addClass("cur");
              addBedShowOrHide(target);


            }
            break;
          case "extraChild":
            if (target.hasClass("cur")) {
              childNumValue = childNumValue + 1;
              childNumEle.html(childNumValue);
              extraChildHtml = addNewChildHtml(allExtraChild.length + 1);

              addBedShowOrHide(target)
              //target.parents(".hotelInfo_numb_people").append(extraChildHtml);
              target.parents(".hotelInfo_numb_people").find(".spenumbList").before(extraChildHtml);

              if (childNumValue === maxChildNum) {
                target.removeClass("cur");
              }
              downBtn.addClass("cur");
            }
            break;
        }
      });
    },

  //是否显示加床项
    addBedShowOrHide = function (target) {
      var adultNumValue = parseInt(target.parent().parent().parent().find(".adult-people-number").html());
      var childNumValue = parseInt(target.parent().parent().parent().find(".child-number").html());
      if (adultNumValue >= 2 && childNumValue > 0) {
        target.parent().parent().siblings(".spenumbList").show();
        if(childNumValue == 1){
          target.parent().parent().siblings(".spenumbList").find("b").removeClass("ico_select").addClass("noselect").css({
            opacity: 1
          });
          var eveclick =$._data(target.parent().parent().siblings(".spenumbList").find(".bedList b")[0], "events");
            if(eveclick && eveclick["click"]){
              return ;
            }
          target.parent().parent().siblings(".spenumbList").find(".bedList b").on("click", function () {
            $(this).toggleClass("ico_select noselect").css({
              opacity: 1
            });
          })
        }else{
          target.parent().parent().siblings(".spenumbList").find("b").removeClass("noselect").addClass("ico_select").css({
            opacity: 0.5
          });
          target.parent().parent().siblings(".spenumbList").find(".bedList b").unbind("click");
        }
      }
      if(childNumValue == 0){
        target.parent().parent().siblings(".spenumbList").hide();
        target.parent().parent().siblings(".spenumbList").find("b").removeClass("ico_select").addClass("noselect");
      }
      if(adultNumValue == 1){
        target.parent().parent().siblings(".spenumbList").hide();
        target.parent().parent().siblings(".spenumbList").find("b").removeClass("ico_select").addClass("noselect");
      }


      //if (adultNumValue >= 2 && childNumValue > 0) {
      //  target.parent().parent().siblings(".spenumbList").show();
      //  if(childNumValue == 1){
      //    target.parent().parent().siblings(".spenumbList").find(".bedList b").on("click", function () {
      //      $(this).toggleClass("ico_select noselect");
      //    })
      //  }else{
      //    target.parent().parent().siblings(".spenumbList").find("b").removeClass("noselect").addClass("ico_select");
      //  }
      //}
      //if(childNumValue == 0){
      //  target.parent().parent().siblings(".spenumbList").hide();
      //  target.parent().parent().siblings(".spenumbList").find("b").removeClass("ico_select").addClass("noselect");
      //}
      //if(adultNumValue == 1){
      //  target.parent().parent().siblings(".spenumbList").hide();
      //  target.parent().parent().siblings(".spenumbList").find("b").removeClass("ico_select").addClass("noselect");
      //}
    },
    bindChilWithBed = function (child, adult) {

    },

    addNewChildHtml = function (i) {
      if (onlyForAdult) {
        return '<div class="extraChild" style="display: block;"><span class="bedList" style="float: left"><i>儿童1年龄</i></span><div class="childAge"><input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i></div></div>';
      } else {
        return '<div class="extraChild" style="display: block;"><span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span><div class="childAge"><input class="inp-cage" type="tel" placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="setAge(this);"><i class="child-sui">岁</i></div></div>';
      }


    },
    addNewRoomHtml = function (i, minAdultNum) {;
      if (onlyForAdult) {
        return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">' + minAdultNum + '</i><span class="up_btn"></span></div>' + '</div>';
      } else {
        return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn cur" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">' + minAdultNum + '</i><span class="up_btn cur"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(' + childAgeMin + '-' + childAgeMax + ')</span>' + '<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn cur"></span></div>' + '</div>' + '<div class="extraChild" style="display: none; float: left">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value placeholder="' + childAgeMin + '-' + childAgeMax + '" onkeyup="this.value=this.value.replace(/\D/gi,\"\")"><i class="child-sui">岁</i>' + '</div>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
      }


    },
    sendInfo = function () {
      var CheckInDate = document.getElementById('CheckInDate').getAttribute("data-date") + 'T00:00:00';
      var CheckOutDate = document.getElementById('CheckOutDate').getAttribute("data-date") + 'T00:00:00';
      var roomNum = parseInt(document.getElementById('roomNum').innerHTML);
      var roomDetails = [],
        tours = [];
      var roomDetailSection = document.querySelectorAll('.hotelInfo_numb_people');
      var tourEle = document.querySelectorAll('.tour-out-div');
      for (var hn = 0, len = roomDetailSection.length; hn < len; hn++) {
        var temEle = roomDetailSection[hn],
          temObj = {},
          childWithOutBed = [],
          childWithBed = [];
        var temAdultNum = parseInt(temEle.querySelector('#adult-people-number').innerHTML);
        if (!onlyForAdult) {
          var temChildNum = parseInt(temEle.querySelector('.child-number').innerHTML);
          var extraChild = temEle.querySelector('.extraChild');
          var childChooseParent = temEle.querySelectorAll('.spenumbList');

          if (temAdultNum == 1 && temChildNum == 1) {
            //暂时简单处理方法，为了新增房间，有个display:none,所以需要取第二节点，这不是很好方案，先保证功能，后续修改
            if(temEle.querySelectorAll('input').length>1){
              childWithBed.push(temEle.querySelectorAll('input')[1].value);
            }
            else{
              childWithBed.push(temEle.querySelector('input').value);
            }

          } else if (temAdultNum == 1 && temChildNum == 2) {
            //暂时简单处理方法，为了新增房间，有个display:none,所以需要取第二节点，这不是很好方案，先保证功能，后续修改
            childWithBed.push(temEle.querySelectorAll('input')[0].value);
            childWithOutBed.push(temEle.querySelectorAll('input')[1].value);
          }
          if (temAdultNum == 2 || temAdultNum == 3) {
            for (var s = 0; s < childChooseParent.length; s++) {
              var ty = childChooseParent[s];
              var tt = $(ty).children().find('b');
              if (temChildNum == 1 && tt != null) {
                if (tt.hasClass("ico_select")) {
                  childWithBed.push(ty.parentNode.querySelectorAll('input')[1].value);
                } else {
                  childWithOutBed.push(ty.parentNode.querySelectorAll('input')[0].value);
                }
              } else if (temChildNum == 2 && tt != null) {
                childWithBed.push(ty.parentNode.querySelectorAll('input')[1].value);
                childWithOutBed.push(ty.parentNode.querySelectorAll('input')[2].value);
              }
            }
          }
          childWithBed.length > 0 ? temObj.childWithBed = childWithBed :
            void(0);
          childWithOutBed.length > 0 ? temObj.childWithOutBed = childWithOutBed :
            void(0);
        }
        temObj.adult = temAdultNum;
        roomDetails.push(temObj);
      }
      for (var fg = 0; fg < tourEle.length; fg++) {
        var id = tourEle[fg].getAttribute('data-tour-id'),
          dateStr = '',
          temp = {};
        if (tourEle[fg].querySelector('.content3_CheckInDate')) {
          dateStr = tourEle[fg].querySelector('.content3_CheckInDate').value + 'T00:00:00';
          temp.tourID = id;
          temp.travelDate = dateStr;
          if (tourData.hasOwnProperty("tours") && tourData.tours.length > 0) {
            temp.tourSession = tourData.tours[fg].tourSession;
          }
          tours.push(temp);
        } else {
          temp.tourID = id;
          tours.push(temp);
        }
      }
      var allNum = 0,
        adultNum = 0,
        childNum = 0;
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
            packageID: localStorage.packageID,
            CheckInDate: CheckInDate,
            CheckOutDate: CheckOutDate,
            nightNum: nightnum,
            roomDetails: roomDetails,
            tours: tours
          };
          localStorage.setItem('info', JSON.stringify(paraObj));
          //获得数据
          var getHotel = function () {
            var minMaxTime = /.*(\d)天(\d).*/.exec(dateHandler.dataInfomation.packageName);
            $("#preloader").show();
            $("#status").show();
            var tmp = {
              Parameters: paraObj,
              ForeEndType: 3,
              Code: "40100008"
            };
            console.log(tmp);
            vlm.loadJson("", JSON.stringify(tmp), function (json) {
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
            "StarRating": "",
            "Location": "",
            "SortType": 0,
            packageID: localStorage.packageID,
            CheckInDate: CheckInDate,
            CheckOutDate: CheckOutDate,
            nightNum: nightnum,
            roomDetails: roomDetails,
            adultNum: adultNum,
            childNum: childNum,
            tours: tours
          };
          //获得数据
          var getHotel = function () {
            var minMaxTime = /.*(\d)天(\d).*/.exec(dateHandler.dataInfomation.packageName);
            $("#preloader").show();
            $("#status").show();
            var tmp = {
              Parameters: paraObj,
              ForeEndType: 3,
              Code: "40100008"
            };
            console.log(tmp);
            vlm.loadJson("", JSON.stringify(tmp), function (ret) {
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
    },
  // 房间
    initRoom = function () {
      var parent = document.getElementById('roomList'),
        hotelInfo = document.querySelector('.hotelInfo_numb_room'),
        roomNum = document.getElementById('roomNum'),
      // 要操作的对象
        section, nums = Math.ceil(minPax / 3),
      // 插入的成人
        ary_a = ['<div class="numbList"><span class="n_tit">成人</span><div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">', '</i><span class="up_btn cur"></span></div></div>'],
        ary_as = ['<div class="numbList"><span class="n_tit">成人</span><div class="per-price-control zy_price_control" data-type="adult"><span class="down_btn cur" id="adult-down"></span><i class="change_num adult-people-number" data-type="adultNum" id="adult-people-number">', '</i><span class="up_btn cur"></span></div></div>'],
      // 儿童
        ary_c = ['<div class="numbList"><span class="n_tit">儿童</span><span class="child-age">(' + childAgeMin + '-' + (parseInt(childAgeMax)) + ')</span>', '<i class="com_icon child_age_state"></i><div class="age_state_box"><div class="state_text">儿童年龄限制为大于等于' + childAgeMin + '周岁，小于' + childAgeMax + '周岁</div><div></div></div>', '<div class="per-price-control zy_price_control" data-type="extraChild"><span class="down_btn"></span><i class="change_num child-number" data-type="childNum">0</i><span class="up_btn cur"></span></div></div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>'];
      //  默认房间数为1人，如有最少起订人数，则更换
      roomNum.innerHTML = nums;
      for (var i = 0; i < nums; i++) {
        var n = minPax - 3 * (i + 1) >= 0 ? 3 : minPax - 3 * i,
          initStr = '<span class="title">房间' + (i + 1) + '</span>';
        if(n == 2){
          initStr += ary_as[0] + n + ary_a[1];
        }else{
          initStr += ary_a[0] + n + ary_a[1];
        }
        if (!onlyForAdult) {
          initStr += ary_c.join('');
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
    Parameters: {
      PackageID: packageID
    },
    ForeEndType: 3,
    Code: "40100002"
  }), function (json) {
    if (json.success) {

      var data = json.data,
        total_day = document.querySelector('#total_day');
      tourData = data;
      console.log(data);
      dateHandler.dataInfomation = data;
      day_start = data.defaultDepartStartDate.substring(0, 10).replace(/-/g, "/");
      calendar_end = data.departValidTo.substring(0, 10).replace(/-/g, "/");
      day_Num = parseInt(data.minDuration ? data.minDuration : data.packageName.substr(2, 1));
      minDuration = data.minDuration;
      minPaxType = parseInt(data.minPaxType);
      minPax = parseInt(data.minPax);
      maxAdult = parseInt(data.maxAdult);
      onlyForAdult = data.onlyForAdult;
      maxExtensionNight = data.maxExtensionNight + minDuration - 1;

      dateHandler.dateInfomation = {
        minDuration: parseInt(data.minDuration) - 1,
        maxExtensionNight: parseInt(data.maxExtensionNight),
        departValidFrom: /(.*)(T.*)/g.exec(data.departValidFrom)[1],
        departValidTo: /(.*)(T.*)/g.exec(data.departValidTo)[1]
      };
      //儿童年龄限制
      childAgeMin = parseInt(data.childAgeMin);
      childAgeMax = parseInt(data.childAgeMax);
      // 酒店，默认开始时间
      document.getElementById("CheckInDate").value = vlm.Utils.format_date(day_start, 'md');
      document.getElementById("CheckInDate").setAttribute("data-date", vlm.Utils.format_date(day_start, 'Ymd'));
      document.getElementById("week_span1").innerHTML = day_ary[new Date(day_start).getDay()];
      // 共几晚
      total_day.innerHTML = day_Num - 1;
      // 计算离店
      var dd = new Date(day_start),
        etim;
      dd.setDate(dd.getDate() + day_Num - 1);
      etim = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
      // 插入离店
      document.getElementById("CheckOutDate").value = vlm.Utils.format_date(etim, 'md');
      document.getElementById("CheckOutDate").setAttribute("data-date", vlm.Utils.format_date(etim, 'Ymd'));
      document.getElementById("week_span2").innerHTML = day_ary[dd.getDay()];
      // 房间
      initRoom();
      // 景点
      // var tpl_g = $("tpl_GetTour").html(), tpl_GetTour = ejs.render(tpl_g, data);
      var tpl_GetTour = template("tpl_GetTour", data);
      $('#tourTime').html(tpl_GetTour);
      // 日历date-range
      initHotelCalendar();
      // loadend
      //事件绑定
      //tagAndEvent();
      //vlm.init();
      if (localStorage.getItem('init') != '1') {
        localStorage.setItem('init', 1);
      }
    } else {
      $('.amy_error_box').show();
      $('.all_elements').hide();
    }
  });
}).call(this);
