/**
 *@desc fastclick 绑定
 *@time
 **/
(function ($) {
  "use strict";
  $(document).ready(function () {
    window.addEventListener('load', function () {
      FastClick.attach(document.body);
    }, false);
  });
}(jQuery));

/**
 *@desc 酒店搜索页  依赖jquery
 *@time
 *@author
 **/
(function () {
  "use strict";
  var hotelIndex = {
    owlQuoteSlider: null,
    checkInOutDate: {},
    NumRoom: 1,
    NumAdult: 1,
    NumChild: 0,
    init: function () {
      //this.initSlider(); owlCarousel 插件在iOS UC浏览器横竖屏切换时DOM渲染有问题
      this.initTab();
      this.initEvent();
      this.initData();
    },
    initTab: function () {
      var tabHeader = $("#h-Tab a");
      var panels = $(".quote-slider .hotel_content");
      tabHeader.eq(0).addClass("on").siblings().removeClass("on");
      panels.eq(0).show().siblings().hide();
      //tab 点击事件切换
      $("#h-Tab").on("click", "a", function (event) {
        var target = $(event.target);
        var index = tabHeader.index(target);
        if ($('#arr2 .i_address').hasClass('on')) {
          $('#arr2 .i_address').removeClass('on');
        }
        tabHeader.eq(index).addClass("on").siblings().removeClass("on");
        panels.eq(index).show().siblings().hide();
      });
    },

    saveHistory: function () {
      //用于记录用户历史选择
      var hotelStorage12345 = {
        //"InterDes" : lsf_myweb.getbyid('input1').value,
        "InterBeginDate": document.forms[0].InterCheckInDate.value,
        "InterLeaveDate": document.forms[0].InterCheckOutDate.value,
        "NumRoom": $("#js_roomNum").html(),
        "NumAdult": $("#js_adultNum").html(),
        "NumChild": $("#js_childNum").html(),
        //已去掉城市模糊搜索
        "InterTotalDay": $("#total_day").html(),
        "InterBeginDateWeek": $("#week_span1").html(),
        "InterLeaveDateWeek": $("#week_span2").html(),
        //"DomDes" : lsf_myweb.getbyid('input2').value,
        "DomCheckInDate": document.forms[0].DomCheckInDate.value,
        "DomCheckOutDate": document.forms[0].DomCheckOutDate.value,
        //已去掉城市模糊搜索
        "DomeTotalDay": $("#domeTotalDay").html(),
        "DomBeginDateWeek": $("#weekSpan3").html(),
        "DomLeaveDateWeek": $("#weekSpan4").html()
      };

      if(sessionStorage.h_agesArr){
        hotelStorage12345.AgesChild=sessionStorage.h_agesArr;
      }
      sessionStorage.setItem('hotelStorage12345', JSON.stringify(hotelStorage12345));
    },
    //初始化国际 国内日期
    /**
     *@para {"2016-05-30":"startDate","2016-06-01":"endDate"}
     *@
     **/
    initCalendar: function (obj, obj2) {
      var myDate1 = new ATplugins.Calender({
        id: "nav2-center1",
        num: 13,
        time: obj,
        type: "hotel",
        headerSign: 'hotelTip', //tipClean  tip hotelTip
        disableDateAfterLength: 30,
        noComfirmBtn: true,
        callback: function (result) {
          var checkInDateEle = $("#CheckInDate");
          var checkInWeekEle = $("#week_span1");

          var checkOutDateEle = $("#CheckOutDate");
          var checkOutWeekEle = $("#week_span2");
          var totalDayEle = $("#total_day");
          document.forms[0].InterCheckInDate.value = result[0];
          document.forms[0].InterCheckOutDate.value = result[1];
          //                    checkInDateEle.val(vlm.Utils.format_date(result[0], 'md'));
          checkInDateEle.html(vlm.Utils.format_date(result[0], 'md'));
          checkInWeekEle.html(vlm.Utils.getWeek(result[0]));
          checkOutDateEle.html(vlm.Utils.format_date(result[1], 'md'));
          //                    checkOutDateEle.val(vlm.Utils.format_date(result[1], 'md'));
          checkOutWeekEle.html(vlm.Utils.getWeek(result[1]));

          totalDayEle.html(Math.round(((new Date(result[1].replace(/-/g, "/"))) - new Date(result[0].replace(/-/g, "/"))) / (1000 * 60 * 60 * 24)));
        }
      });
      var domestic_calender = new ATplugins.Calender({
        id: "nav2-center2",
        num: 13,
        time: obj2,
        headerSign: 'tip', //tipClean  tip
        noComfirmBtn: true,
        type: "hotel",
        callback: function (result) {
          var checkInDateEle = $("#DomCheckInDate");
          var checkInWeekEle = $("#weekSpan3");

          var checkOutDateEle = $("#DomCheckOutDate");
          var checkOutWeekEle = $("#weekSpan4");
          var totalDayEle = $("#domeTotalDay");

          document.forms[0].DomCheckInDate.value = result[0];
          document.forms[0].DomCheckOutDate.value = result[1];
          checkInDateEle.html(vlm.Utils.format_date(result[0], 'md'));
          //                    checkInDateEle.val(vlm.Utils.format_date(result[0], 'md'));
          checkInWeekEle.html(vlm.Utils.getWeek(result[0]));
          //                    checkOutDateEle.val(vlm.Utils.format_date(result[1], 'md'));
          checkOutDateEle.html(vlm.Utils.format_date(result[1], 'md'));
          checkOutWeekEle.html(vlm.Utils.getWeek(result[1]));
          totalDayEle.html(Math.round(((new Date(result[1].replace(/-/g, "/"))) - new Date(result[0].replace(/-/g, "/"))) / (1000 * 60 * 60 * 24)));
        }
      });
    },
    initEvent: function () {
      //预加载的图片
      $(window).load(function () {
        $("#status-h").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
      });

      //查询按钮事件
      $("#hotel_search").submit(function () {
        if ($("#Inter").hasClass("on")) { //国际
          if (parseInt($("#count1").val()) > parseInt($("#count1").val())) {
            jAlert("房间数不可大于人数，请重新选择！", "");
            return false;
          } else {
            hotelIndex.saveHistory();
            localStorage.setItem('hoPos', 'inter');
            return true;
          }
        } else { //国内
          // jAlert("敬请期待国内酒店搜索！", "");
          // return false;
          hotelIndex.saveHistory();
          localStorage.setItem('hoPos', 'dom');
          return true;
        }
      });
      //返回按钮
      $(".header_back").click(function () {
        //清楚搜索记录
        // sessionStorage.removeItem("hotelStorage12345");
        // history.go(-1);
      });

      $('#arr1 .i_address').on('touchend', function () {
        $('#Dom').trigger('click');
        $('#arr2 .i_address').addClass('on');
        //$('#h_in').text(localAddress['city']);
        GEOIKIT().callMethod("CurrentLocation", {});
        return false;
      });
      $('#arr2 .i_address').on('touchend', function () {
        $(this).addClass('on');
        //$('#h_in').text(localAddress['city']);
        GEOIKIT().callMethod("CurrentLocation", {});
        //$('#h_in').text(localAddress['province']+localAddress['city']);

      });

      //城市列表
      $("#h_in").click(function () {
        VM.Load("h_in");
      });

      $("#h_out").click(function () {
        VM.Load("h_out");
      });

      $('.choose-aim1 #h_in').on('click', function () {
        if ($('#arr2 .i_address').hasClass('on')) {
          $('#arr2 .i_address').removeClass('on');
        }
      });


    },
    initData: function () {
      var checkIn = $('#CheckInDate'),
        checkOut = $('#CheckOutDate'),
        content2 = $('#content2'),
        week_span1 = $('#week_span1'),
        week_span2 = $('#week_span2'),
        oDate = new Date(),
        year = oDate.getFullYear(),
        month = oDate.getMonth(),
        day = oDate.getDate(),
        interInitDate = {},
        domInitDate = {};
      //国际城市默认时间
      var oDate1 = new Date(year, month, day + 2); //默认入住时间T+2
      var oDate2 = new Date(year, month, day + 3);

      var beginDate = vlm.Utils.format_date(oDate1.getFullYear() + '-' + (oDate1.getMonth() + 1) + '-' + oDate1.getDate(), 'Ymd');
      var leaveDate = vlm.Utils.format_date(oDate2.getFullYear() + '-' + (oDate2.getMonth() + 1) + '-' + oDate2.getDate(), 'Ymd');

      //默认入住离店时间
      //获取历史搜索数据
      var hotelStorage = JSON.parse(sessionStorage.getItem("hotelStorage12345"));
      //国际
      if (hotelStorage) {
        $("#count1").val(hotelStorage.NumRoom);
        $("#count2").val(hotelStorage.NumAdult);
        $("#count3").val(hotelStorage.NumChild);
        //如果历史搜索入住日期早于最早入住日期
        console.info(new Date(hotelStorage.InterBeginDate.replace(/-/g, '/')));
        if (new Date(hotelStorage.InterBeginDate.replace(/-/g, '/')) < oDate1) {
          checkIn.html(vlm.Utils.format_date(beginDate, 'md'));
          //checkIn.val(beginDate);
          checkOut.html(vlm.Utils.format_date(leaveDate, 'md'));
          document.forms[0].InterCheckInDate.value = beginDate;
          document.forms[0].InterCheckOutDate.value = leaveDate;
          //checkOut.val(leaveDate);
          week_span1.html(vlm.Utils.getWeek(beginDate, "Ymd"));
          week_span2.html(vlm.Utils.getWeek(leaveDate, "Ymd"));
          $("#total_day").html(1);
          interInitDate[beginDate] = "入住";
          interInitDate[leaveDate] = "离店";

        } else {
          //checkIn.val(hotelStorage.InterBeginDate);
          checkIn.html(vlm.Utils.format_date(hotelStorage.InterBeginDate, 'md'));
          //checkOut.val(hotelStorage.InterLeaveDate);
          checkOut.html(vlm.Utils.format_date(hotelStorage.InterLeaveDate, 'md'));
          document.forms[0].InterCheckInDate.value = hotelStorage.InterBeginDate;
          document.forms[0].InterCheckOutDate.value = hotelStorage.InterLeaveDate;
          $("#total_day").html(hotelStorage.InterTotalDay);
          week_span1.html(hotelStorage.InterBeginDateWeek);
          week_span2.html(hotelStorage.InterLeaveDateWeek);
          interInitDate[hotelStorage.InterBeginDate] = "入住";
          interInitDate[hotelStorage.InterLeaveDate] = "离店";
        }
        recoverStatus("count1,count2,count3");
      } else {
        //默认房间数
        //默认成人数
        //默认儿童数
        $("#count1").val(hotelIndex.NumRoom);
        $("#count2").val(hotelIndex.NumAdult);
        $("#count3").val(hotelIndex.NumChild);
        //checkIn.val(beginDate);
        //checkOut.val(leaveDate);
        checkIn.html(vlm.Utils.format_date(beginDate, 'md'));
        checkOut.html(vlm.Utils.format_date(leaveDate, 'md'));
        document.forms[0].InterCheckInDate.value = beginDate;
        document.forms[0].InterCheckOutDate.value = leaveDate;
        $("#total_day").html(1);
        week_span1.html(vlm.Utils.getWeek(beginDate, "Ymd"));
        week_span2.html(vlm.Utils.getWeek(leaveDate, "Ymd"));
        interInitDate[beginDate] = "入住";
        interInitDate[leaveDate] = "离店";
      }

      //如果酒店搜索页来自UTM投放页
      if (vlm.getpara('from') === 'utm') {
        $("#count1").val(hotelIndex.NumRoom);
        $("#count2").val(hotelIndex.NumAdult);
        $("#count3").val(hotelIndex.NumChild);
        oDate1 = new Date(year, month, day + 14); //默认入住时间T+14  T+16
        oDate2 = new Date(year, month, day + 16);

        beginDate = vlm.Utils.format_date(oDate1.getFullYear() + '-' + (oDate1.getMonth() + 1) + '-' + oDate1.getDate(), 'Ymd');
        leaveDate = vlm.Utils.format_date(oDate2.getFullYear() + '-' + (oDate2.getMonth() + 1) + '-' + oDate2.getDate(), 'Ymd');
        //checkIn.val(beginDate);
        //checkOut.val(leaveDate);
        checkIn.html(vlm.Utils.format_date(beginDate, 'md'));
        checkOut.html(vlm.Utils.format_date(leaveDate, 'md'));

        document.forms[0].InterCheckInDate.value = beginDate;
        document.forms[0].InterCheckOutDate.value = leaveDate;

        $("#total_day").html(2);
        week_span1.html(vlm.Utils.getWeek(beginDate, "Ymd"));
        week_span2.html(vlm.Utils.getWeek(leaveDate, "Ymd"));
        interInitDate = {};
        interInitDate[beginDate] = "入住";
        interInitDate[leaveDate] = "离店";
      }

      //还原加减状态
      /**
       *@param  input id array   : 'count1,count2,count3';
       **/
      function recoverStatus(itemIdString) {
        var itemIdAarr = itemIdString.split(",");
        for (var i = 0, len = itemIdAarr.length; i < len; i++) {
          var inputEle = $("#" + itemIdAarr[i]);
          var minusEle = inputEle.siblings(".minus");
          var addEle = inputEle.siblings(".add");
          var inputValue = inputEle.val();
          var minValue = parseInt(inputEle.attr("data-min"));
          var maxVlaue = parseInt(inputEle.attr("data-max"));

          if (inputValue > minValue) {
            minusEle.removeClass('disable').addClass("able");
          }
          if (inputValue == maxVlaue) {
            addEle.removeClass('able').addClass('disable');
          }
        }
      }

      //国内城市
      var DomCheckInDate = $('#DomCheckInDate');
      var DomCheckOutDate = $('#DomCheckOutDate');
      var oDate3 = new Date(year, month, day + 2);
      var oDate4 = new Date(year, month, day + 3);
      var DomBeginDate = vlm.Utils.format_date(oDate3.getFullYear() + '-' + (oDate3.getMonth() + 1) + '-' + oDate3.getDate(), 'Ymd');
      var DomLeaveDate = vlm.Utils.format_date(oDate4.getFullYear() + '-' + (oDate4.getMonth() + 1) + '-' + oDate4.getDate(), 'Ymd');
      var week_span3 = $('#weekSpan3');
      var week_span4 = $('#weekSpan4');
      if (hotelStorage) {
        //如果历史搜索入住日期早于最早入住日期
        if (new Date(hotelStorage.DomCheckInDate.replace(/-/g, '/')) < oDate3) {
          //DomCheckInDate.val(DomBeginDate);
          //DomCheckOutDate.val(DomLeaveDate);
          DomCheckInDate.html(vlm.Utils.format_date(DomBeginDate, 'md'));
          DomCheckOutDate.html(vlm.Utils.format_date(DomLeaveDate, 'md'));
          document.forms[0].DomCheckInDate.value = DomBeginDate;
          document.forms[0].DomCheckOutDate.value = DomLeaveDate;
          week_span3.html(vlm.Utils.getWeek(DomBeginDate, "Ymd"));
          week_span4.html(vlm.Utils.getWeek(DomLeaveDate, "Ymd"));
          $("#domeTotalDay").html(1);
          domInitDate[DomBeginDate] = "入住";
          domInitDate[DomLeaveDate] = "离店";

        } else {
          //DomCheckInDate.val(hotelStorage.DomCheckInDate);
          //DomCheckOutDate.val(hotelStorage.DomCheckOutDate);
          DomCheckInDate.html(vlm.Utils.format_date(hotelStorage.DomCheckInDate, 'md'));
          DomCheckOutDate.html(vlm.Utils.format_date(hotelStorage.DomCheckOutDate, 'md'));
          document.forms[0].DomCheckInDate.value = hotelStorage.DomCheckInDate;
          document.forms[0].DomCheckOutDate.value = hotelStorage.DomCheckOutDate;
          $("#domeTotalDay").html(hotelStorage.DomeTotalDay);
          week_span3.html(hotelStorage.DomBeginDateWeek);
          week_span4.html(hotelStorage.DomLeaveDateWeek);
          domInitDate[hotelStorage.DomCheckInDate] = "入住";
          domInitDate[hotelStorage.DomCheckOutDate] = "离店";
        }
      } else {
        //DomCheckInDate.val(DomBeginDate);
        //DomCheckOutDate.val(DomLeaveDate);
        DomCheckInDate.html(vlm.Utils.format_date(DomBeginDate, 'md'));
        DomCheckOutDate.html(vlm.Utils.format_date(DomLeaveDate, 'md'));
        document.forms[0].DomCheckInDate.value = DomBeginDate;
        document.forms[0].DomCheckOutDate.value = DomLeaveDate;
        $("#domeTotalDay").html(1);
        week_span3.html(vlm.Utils.getWeek(DomBeginDate, "Ymd"));
        week_span4.html(vlm.Utils.getWeek(DomLeaveDate, "Ymd"));
        domInitDate[DomBeginDate] = "入住";
        domInitDate[DomLeaveDate] = "离店";
      }

      //初始化日期
      hotelIndex.initCalendar(interInitDate, domInitDate);
    }
  };
  hotelIndex.init();
})();

(function () {
  var geokit = this || (0, eval)('this');

  var tips = {
    GEO_UNKNOWN_DATA: "尚无旅行产品,请切换其他城市。",
    GEO_UNKNOWN_ERROR: "由于未知原因，无法获取地理定位信息，请重新尝试。",
    GEO_PERMISSION_DENIED: "您的当前位置不可用,请开启设备上的\"定位服务\"。",
    GEO_TIMEOUT: "获取信息超时，请重新尝试。",
    GEO_POSITION_UNAVAILABLE: "由于网络或信号等问题，地理定位失败，请检查网络或信号。"
  }

  var currgeo = function () {
    var Adapter = {
      CurrentLocation: function (param) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (e) {
            Adapter.CurrentLocationSuccess({
              lat: e.coords.latitude,
              lng: e.coords.longitude,
              type: param.type,
              list: param.list
            });

          }, function (e) {
            Adapter.CurrentLocationError(e);
          }, {
            enableHighAccuracy: true, // 是否获取高精度结果
            timeout: 6000, //超时,毫秒
            maximumAge: 0 //可以接受多少毫秒的缓存位置
          })
        } else {
          jAlert('抱歉！您的浏览器无法使用地位功能');
        }

      },
      CurrentLocationSuccess: function (param) {
        var geoinfo = new google.maps.Geocoder;
        var latlng = {
          lat: param.lat,
          lng: param.lng
        };
        var cityname = "未知",
          citypinyin = "none";
        return geoinfo.geocode({
          "location": latlng
        }, function (result, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            cityname = result[0].address_components[3].long_name;
            if (cityname.indexOf("市") > -1) {
              cityname = cityname.replace("市", "");
            }
            citypinyin = pinyin.getFullChars(cityname);
            $("#h_in").text(cityname);
            $("#DomCity").attr("value", citypinyin);
            return;
          }
          $("#h_in").text(cityname);
          $("#DomCity").attr("value", citypinyin);
          return;
        });
      },
      CurrentLocationError: function (error) {
        console.log(error);
        switch (error.code) {
          case error.TIMEOUT: //地理位置获取超时
            if (!Adapter.CurrentNetLocation()) {
              jAlert(tips.GEO_TIMEOUT, "提示");
            }
            break;
          case error.POSITION_UNAVAILABLE: //地理位置获取失败（可能是用户没网或卫星搜不到等原因）
            if (!Adapter.CurrentNetLocation()) { //如果却少gms信息,改用网络获取地址
              jAlert(tips.GEO_POSITION_UNAVAILABLE, "提示");
            }
            break;
          case error.PERMISSION_DENIED: //用户拒绝
            if (!Adapter.CurrentNetLocation()) { //如果却少gms信息,改用网络获取地址
              jAlert(tips.GEO_PERMISSION_DENIED, "提示");
            }
            break;
          case error.UNKNOWN_ERROR: //其他出错原因
            jAlert(tips.GEO_UNKNOWN_ERROR, "提示");
            break;
        }
      },
      CurrentNetLocation: function () {
        var cityname = localAddress['city'],
          citypinyin = "";
        if (cityname) {
          if (cityname.indexOf("市") > -1) {
            cityname = cityname.replace("市", "");
          }
          citypinyin = pinyin.getFullChars(cityname);
          $("#h_in").text(cityname);
          $("#DomCity").attr("value", citypinyin);
          return true;
        } else {
          return false;
        }

      }

    }

    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callMethod: function (type, data) {
        return Adapter[type] ? Adapter[type](data) : '';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addCommand: function (type, fn) {
        Adapter[type] = fn;
      },
      callMultipleMethod: function (msg) {
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param : [msg.param];
        return Adapter[msg.command].apply(Adapter, msg.param);
      }
    }
  };

  geokit.VM = geokit.VM || {};
  geokit.GEOIKIT = currgeo;

})();

//入住人数选择
new Perchoice({
  id: '#js_room_peo_show',
  perArr: ['#js_roomNum', '#js_adultNum', '#js_childNum']
});
