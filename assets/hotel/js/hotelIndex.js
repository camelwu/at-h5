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
            this.initSlider();
            this.initEvent();
            this.initData();
        },
        initSlider: function () {
            //国际国内切换实现滑动效果
            hotelIndex.owlQuoteSlider = $(".quote-slider");

            hotelIndex.owlQuoteSlider.owlCarousel({
                items: 1
            });
            hotelIndex.owlQuoteSlider.on('changed.owl.carousel', function (event) {
                var Inter = $('#Inter')[0],
                    Dom = $('#Dom')[0];
                if (Dom.className == 'on') {
                    Dom.className = '';
                    Inter.className = 'on';
                } else {
                    Dom.className = 'on';
                    Inter.className = '';
                }
            });
            //tab 点击事件切换
            hotelIndex._initTabEvent();
        },
        _initTabEvent: function () {
            $("#Dom").click(function () {
                hotelIndex.owlQuoteSlider.trigger('next.owl.carousel');
                return false;
            });
            $("#Inter").click(function () {
                hotelIndex.owlQuoteSlider.trigger('prev.owl.carousel');
                return false;
            });
        },
        saveHistory: function () {
            //用于记录用户历史选择
            var hotelStorage12345 = {
                //"InterDes" : lsf_myweb.getbyid('input1').value,
                "InterBeginDate": $("#CheckInDate").val(),
                "InterLeaveDate": $("#CheckOutDate").val(),
                "NumRoom": $("#count1").val(),
                "NumAdult": $("#count2").val(),
                "NumChild": $("#count3").val(),
                //已去掉城市模糊搜索
                "InterTotalDay": $("#total_day").html(),
                "InterBeginDateWeek": $("#week_span1").html(),
                "InterLeaveDateWeek": $("#week_span2").html(),
                //"DomDes" : lsf_myweb.getbyid('input2').value,
                "DomCheckInDate": $("#DomCheckInDate").val(),
                "DomCheckOutDate": $("#DomCheckOutDate").val(),
                //已去掉城市模糊搜索
                "DomeTotalDay": $("#domeTotalDay").html(),
                "DomBeginDateWeek": $("#weekSpan3").html(),
                "DomLeaveDateWeek": $("#weekSpan4").html()
            };
            localStorage.setItem('hotelStorage12345', JSON.stringify(hotelStorage12345));
        },
        //初始化国际 国内日期
        /**
         *@para {"2016-05-30":"startDate","2016-06-01":"endDate"}
         *@
         **/
        initCalendar: function (obj, obj2) {
            var myDate1 = new Calender({
                id: "nav2-center1",
                num: 13,
                time: obj,
                id2: "total_day",
                fn: function (date) {
                    //选择日期后的回调事件
                    //@param ['2016-06-01','2016-06-02']
                    var startDate = date[0],
                        endDate = date[1];
                    $('#week_span1').html(vlm.Utils.getWeek(startDate, "Ymd"));
                    $('#week_span2').html(vlm.Utils.getWeek(endDate, "Ymd"));
                }
            });
            var domestic_calender = new Calender({
                id: "nav2-center2",
                num: 13,
                time: obj2,
                id2: "domeTotalDay"
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
                    jAlert("敬请期待国内酒店搜索！", "");
                    return false;
                    hotelIndex.saveHistory();
                    localStorage.setItem('hoPos', 'dom');
                    return true;
                }
            });
            //返回按钮
            $(".header_back").click(function () {
                //清楚搜索记录
                localStorage.removeItem("hotelStorage12345");
                history.go(-1);
            });

            //城市列表
            $("#h_in").click(function () {
                VM.Load("h_in");
            });

            $("#h_out").click(function () {
                VM.Load("h_out");
            });

            //加 减按钮
            $("#content1").on("click", ".add", function (event) {
                var target = $(event.target);
                var inputEle = target.siblings("input");
                var minusEle = target.siblings(".minus");
                var maxValue = parseInt(inputEle.attr("data-max"));
                var inputValue = inputEle.val();
                var atferValue = parseInt(inputValue) + 1;
                inputEle.val(atferValue <= maxValue ? atferValue : inputValue);

                if (atferValue < maxValue && !minusEle.hasClass('able')) {
                    minusEle.addClass("able");
                }
                if (atferValue >= maxValue) {
                    target.addClass("disable");
                }
            });
            $("#content1").on("click", ".minus", function (event) {
                var target = $(event.target);
                var inputEle = target.siblings("input");
                var addEle = target.siblings(".add");
                var minValue = parseInt(inputEle.attr("data-min"));
                var maxValue = parseInt(inputEle.attr("data-max"));
                var inputValue = inputEle.val();
                var atferValue = parseInt(inputValue) - 1;
                inputEle.val(atferValue >= minValue ? atferValue : inputValue);

                if (atferValue > minValue && !target.hasClass('able')) {
                    minusEle.addClass("able");
                }
                if (atferValue <= minValue) {
                    target.removeClass('able');
                }
                if (atferValue < maxValue) {
                    addEle.removeClass('disable');
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
                month = oDate.getMonth() + 1,
                day = oDate.getDate(),
                interInitDate = {},
                domInitDate = {};
            //国际城市默认时间
            var oDate1 = new Date(year, month, day + 2); //默认入住时间T+2
            var oDate2 = new Date(year, month, day + 3);

            var beginDate = vlm.Utils.format_date(oDate1.getFullYear() + '-' + oDate1.getMonth() + '-' + oDate1.getDate(), 'Ymd');
            var leaveDate = vlm.Utils.format_date(oDate2.getFullYear() + '-' + oDate2.getMonth() + '-' + oDate2.getDate(), 'Ymd');

            //默认入住离店时间
            //获取历史搜索数据
            var hotelStorage = JSON.parse(localStorage.getItem("hotelStorage12345"));
            //国际
            if (hotelStorage) {
                $("#count1").val(hotelStorage.NumRoom);
                $("#count2").val(hotelStorage.NumAdult);
                $("#count3").val(hotelStorage.NumChild);
                //如果历史搜索入住日期早于最早入住日期
                if (new Date(hotelStorage.InterBeginDate.replace(/-/g, '/')) < oDate1) {
                    checkIn.val(beginDate);
                    checkOut.val(leaveDate);
                    week_span1.html(vlm.Utils.getWeek(beginDate, "Ymd"));
                    week_span2.html(vlm.Utils.getWeek(leaveDate, "Ymd"));
                    $("#total_day").html(1);
                    interInitDate[beginDate] = "入住";
                    interInitDate[leaveDate] = "离店";

                } else {
                    checkIn.val(hotelStorage.InterBeginDate);
                    checkOut.val(hotelStorage.InterLeaveDate);
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
                checkIn.val(beginDate);
                checkOut.val(leaveDate);
                $("#total_day").html(1);
                week_span1.html(vlm.Utils.getWeek(beginDate, "Ymd"));
                week_span2.html(vlm.Utils.getWeek(leaveDate, "Ymd"));
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
                        minusEle.addClass("able");
                    }
                    if (inputValue == maxVlaue) {
                        addEle.addClass('disable');
                    }
                }
            }

            //国内城市
            var DomCheckInDate = $('#DomCheckInDate');
            var DomCheckOutDate = $('#DomCheckOutDate');
            var oDate3 = new Date(year, month, day + 2);
            var oDate4 = new Date(year, month, day + 3);
            var DomBeginDate = vlm.Utils.format_date(oDate3.getFullYear() + '-' + oDate3.getMonth() + '-' + oDate3.getDate(), 'Ymd');
            var DomLeaveDate = vlm.Utils.format_date(oDate4.getFullYear() + '-' + oDate4.getMonth() + '-' + oDate4.getDate(), 'Ymd');
            var week_span3 = $('#weekSpan3');
            var week_span4 = $('#weekSpan4');
            if (hotelStorage) {
                //如果历史搜索入住日期早于最早入住日期
                if (new Date(hotelStorage.DomCheckInDate.replace(/-/g, '/')) < oDate3) {
                    DomCheckInDate.val(DomBeginDate);
                    DomCheckOutDate.val(DomLeaveDate);
                    week_span3.html(vlm.Utils.getWeek(DomBeginDate, "Ymd"));
                    week_span4.html(vlm.Utils.getWeek(DomLeaveDate, "Ymd"));
                    $("#total_day").html(1);
                    domInitDate[DomBeginDate] = "入住";
                    domInitDate[DomLeaveDate] = "离店";

                } else {
                    DomCheckInDate.val(hotelStorage.DomCheckInDate);
                    DomCheckOutDate.val(hotelStorage.DomCheckOutDate);
                    $("#total_day").html(hotelStorage.DomeTotalDay);
                    week_span3.html(hotelStorage.DomBeginDateWeek);
                    week_span4.html(hotelStorage.DomLeaveDateWeek);
                    domInitDate[hotelStorage.DomBeginDate] = "入住";
                    domInitDate[hotelStorage.DomLeaveDate] = "离店";
                }
            } else {
                DomCheckInDate.val(DomBeginDate);
                DomCheckOutDate.val(DomLeaveDate);
                $("#total_day").html(1);
                week_span3.html(vlm.Utils.getWeek(DomBeginDate, "Ymd"));
                week_span4.html(vlm.Utils.getWeek(DomLeaveDate, "Ymd"));
                domInitDate[DomBeginDate] = "入住";
                domInitDate[DomLeaveDate] = "离店";
            }

            domInitDate[beginDate] = "入住";
            domInitDate[leaveDate] = "离店";
            //初始化日期
            hotelIndex.initCalendar(interInitDate, domInitDate);
        }
    };
    hotelIndex.init();
})();
