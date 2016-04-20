/*
 *@desc 机票+酒店 酒店搜索列表页   
 *       TODO requirejs   depend on jquery.js and vlm.js
 *@time
 *@author Jason
 */
//require.config({
//    baseUrl: '../js/lib',
//    paths: {
//        jquery: 'jquery',
//        vlm: 'vlm',
//        template : 'template',
//        plugins: 'plugins'
//    }
//});
//
//require(['jquery','vlm'], function($,vlm) {
//    
//    
//});
(function () {
    var parametersStorage = JSON.parse(localStorage.getItem("changeHotelParaObj")) || {};
    if(!parametersStorage){
       // return;
    }
     var params = {
            "Code": "50100003",
            "ForeEndType": 2,
            "Parameters": {
                "SelectedHotelID": "1005455",
                "FlightCacheID": "13767",
                "FlightSetID": "1002001",
                "CityCodeFrom": "SIN",
                "CityCodeTo": "BKK",
                "DepartDate": "2016-05-07",
                "ReturnDate": "2016-05-08",
                "SortFields": [1, 3],
                "PageNo": 1,
                "PageSize": 20,
                "RoomDetails": [{
                    "Adult": 2
            }]
            }
        },
//    var params = {
//            "Code": "50100003",
//            "ForeEndType": 2,
//            "Parameters": {
//                "SelectedHotelID": parametersStorage.SelectedHotelID || "",
//                "FlightCacheID": parametersStorage.FlightCacheID || "",
//                "FlightSetID": parametersStorage.FlightSetID || "",
//                "CityCodeFrom": parametersStorage.CityCodeFrom || "",
//                "CityCodeTo": parametersStorage.CityCodeTo || "",
//                "DepartDate": parametersStorage.DepartDate || "",
//                "ReturnDate": parametersStorage.ReturnDate || "",
//                "SortFields": parametersStorage.SortFields || "",
//                "PageNo": parametersStorage.PageNo || "",
//                "PageSize": parametersStorage.PageSize || "",
//                "RoomDetails": parametersStorage.RoomDetails || []
//            }
//        },
        currentPage;
   
    vlm.init();

    //根据模板需要提前处理好data
    function handleData(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            data[i].hotelInfo = encodeURI(JSON.stringify(data[i]));
            switch (data[i].starRating) {
                case "1":
                    data[i].starRating = "一";
                    break;
                case "2":
                    data[i].starRating = "二";
                    break;
                case "3":
                    data[i].starRating = "三";
                    break;
                case "4":
                    data[i].starRating = "四";
                    break;
                case "5":
                    data[i].starRating = "五";
                    break;
            }
        }
        return data;
    }

    function dataCallBack(result) {

        //        var testData = [
        //            {
        //                "hotelID": 96,
        //                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
        //                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
        //                "location": "Sukhumvit",
        //                "longitude": "100.554628",
        //                "latitudes": "13.741972",
        //                "city": "曼谷",
        //                "country": "泰国",
        //                "starRating": "4",
        //                "currencyCode": "CNY",
        //                "avgRatePerPax": 3540,
        //                "additionalPrice": 0
        //                },
        //            {
        //                "hotelID": 96,
        //                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
        //                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
        //                "location": "Sukhumvit",
        //                "longitude": "100.554628",
        //                "latitudes": "13.741972",
        //                "city": "曼谷",
        //                "country": "泰国",
        //                "starRating": "4",
        //                "currencyCode": "CNY",
        //                "avgRatePerPax": 3540,
        //                "additionalPrice": 0
        //                },
        //            {
        //                "hotelID": 96,
        //                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
        //                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
        //                "location": "Sukhumvit",
        //                "longitude": "100.554628",
        //                "latitudes": "13.741972",
        //                "city": "曼谷",
        //                "country": "泰国",
        //                "starRating": "4",
        //                "currencyCode": "CNY",
        //                "avgRatePerPax": 3540,
        //                "additionalPrice": 0
        //                 }];
        //        testData = handleData(testData);
        //        var str = template("hj_jList", testData);
        //        $("#hj_jList").html(str);
        //        $("#totalHotels").html(testData.length);  //更新酒店数量
        if (result.success && result.code == '200') {
            if (result.data.length == 0) {
                //TODO 没有数据
                return;
            }
            var data = result.data;
            var str = template("hj_list_template", handleData(data.hotels));
            $("#hj_jList").html($("#hj_jList").html() + str);
            //$("#totalHotels").html(); //更新酒店数量 接口没有酒店总数
            
            //图片懒加载
            var c = new lazyLoad('hj_jList');
            
            currentPage = data.pageNo;
            if (data.pageNo < data.pageCount) {
                $("#loadMore").html("点击加载更多").show();
            } else if (data.pageNo == data.pageCount) {
                $("#loadMore").attr("data-more", "no").html("没有更多数据了！").show();
            } else {
                $("#loadMore").attr("data-more", "").html("点击加载更多").hide();
            }
        } else {
            //TODO 异常处理
        }
    }
    //初始化数据
    function initData() {

        var data = JSON.stringify(params);
        vlm.loadJson('', data, dataCallBack, true, null, null);
        // dataCallBack();
    }
    //获取参数  所有的筛选条件
    function getParams() {
        //排序条件
        var currentSort = $(".jpop .sort .cur").attr("data-sort") || 0; //0 标识默认排序
        params.Parameters.SortFields = [currentSort];
        //筛选条件

        var hl_star_type = $("#screen .s-li1");
        var hl_star_str = "";
        var hl_filter_chinese = "";
        var hl_filter_star = "";
        var hl_type_str = "";
        var hl_filter_type = "";

        for (var i = 0; i < hl_star_type.length; i++) {
            switch (hl_star_type[i].innerText) {
                case '二星级以下':
                    hl_star_str += '2$';
                    hl_filter_chinese += '二星级以下$';
                    hl_filter_star += '2$';
                    break;
                case '三星':
                    hl_star_str += '3$';
                    hl_filter_chinese += '三星$';
                    hl_filter_star += '3$';
                    break;
                case '四星':
                    hl_star_str += '4$';
                    hl_filter_chinese += '四星$';
                    hl_filter_star += '4$';
                    break;
                case '五星':
                    hl_star_str += '5$';
                    hl_filter_chinese += '五星$';
                    hl_filter_star += '5$';
                    break;
                case '酒店':
                    hl_type_str += '1$';
                    hl_filter_chinese += '酒店$';
                    hl_filter_type += '1$';
                    break;
                case '汽车旅馆':
                    hl_type_str += '2$';
                    hl_filter_chinese += '汽车旅馆$';
                    hl_filter_type += '2$';
                    break;
                case '酒店式公寓':
                    hl_type_str += '3$';
                    hl_filter_chinese += '酒店式公寓$';
                    hl_filter_type += '2$';
                    break;
                case '家庭旅馆':
                    hl_type_str += '4$';
                    hl_filter_chinese += '家庭旅馆$';
                    hl_filter_type += '4$';
                    break;
                case '背包客栈':
                    hl_type_str += '5$';
                    hl_filter_chinese += '背包客栈$';
                    hl_filter_type += '5$';
                    break;
                case '宾馆/招待所':
                    hl_type_str += '6$';
                    hl_filter_chinese += '宾馆/招待所$';
                    hl_filter_type += '6$';
                    break;
                case '精品酒店':
                    hl_type_str += '7$';
                    hl_filter_chinese += '精品酒店$';
                    hl_filter_type += '7$';
                    break;
                case '度假类酒店':
                    hl_type_str += '8$';
                    hl_filter_chinese += '度假类酒店$';
                    hl_filter_type += '8$';
                    break;
                case '游轮度假酒店':
                    hl_type_str += '9$';
                    hl_filter_chinese += '游轮度假酒店$';
                    hl_filter_type += '9$';
                    break;
                case '别墅型酒店':
                    hl_type_str += '10$';
                    hl_filter_chinese += '别墅型酒店$';
                    hl_filter_type += '10$';
                    break;
                case '乡村平房酒店':
                    hl_type_str += '11$';
                    hl_filter_chinese += '乡村平房酒店$';
                    hl_filter_type += '11$';
                    break;
                case '家庭寄宿':
                    hl_type_str += '12$';
                    hl_filter_chinese += '家庭寄宿$';
                    hl_filter_type += '12$';
                    break;
                case '农舍式房子':
                    hl_type_str += '13$';
                    hl_filter_chinese += '农舍式房子$';
                    hl_filter_type += '13$';
                    break;
                case '豪华露营地':
                    hl_type_str += '14$';
                    hl_filter_chinese += '豪华露营地$';
                    hl_filter_type += '14$';
                    break;
                case '标准露营地':
                    hl_type_str += '15$';
                    hl_filter_chinese += '标准露营地$';
                    hl_filter_type += '15$';
                    break;
            };
        }
        return JSON.stringify(params);
    }
    //排序查询
    function displaySortResult() {
        //TODO 获取参数

        var data = getParams();
        vlm.loadJson("", data, dataCallBack, true, null, null);

    }
    //筛选查询
    function displayFilterResult() {
        //TODO 获取参数
        var data = getParams();
        vlm.loadJson("", data, dataCallBack, null, null, null);
    }
    //加载更多
    function loadMore() {
        //设置参数
        var loadMoreBtn = $("#loadMore");
        if (loadMoreBtn.attr("data-more") == "no") {
            return;
        }
        params.Parameters.PageNo = currentPage + 1;

        var data = getParams();
        $("#loadMore").html("正在加载...");
        vlm.loadJson("", data, dataCallBack, null, null, true);
    }
    //选择酒店类型
    function selectType() {
        var obj = window.event.srcElement;
        var oName = obj.className;
        var array = [];
        var selected = [];
        if (obj.innerText == "不限") {
            array = document.getElementById("h-type").childNodes;
            for (var i = 1; i < array.length; i++) {
                array[i].className = "s-li";
            }
        }
        if (obj.innerText != "不限") {
            document.getElementById("h-type").firstElementChild.className = "s-li";
        }
        if (oName == "s-li") {
            obj.className = "s-li1";
        } else {
            obj.className = "s-li";
        }
        //如果一个都没有选中的情况，显示不限；
        array = document.getElementById("h-type").childNodes;
        for (var j = 0, len = array.length; j < len; j++) {
            if (array[j].className == "s-li1") {
                selected.push(array[j].innerText);
            }
        }
        if (selected.length == 0) {
            document.getElementById("h-type").firstElementChild.className = "s-li1";
        }
    }
    //选择酒店星级
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
        for (var j = 0, len = array.length; j < len; j++) {
            if (array[j].className == "s-li1") {
                selected.push(array[j].innerText);
            }
        }
        if (selected.length == 0) {
            document.getElementById("h-level").firstElementChild.className = "s-li1";
        }
    }
    //绑定事件
    function bindEvent() {
        //加载更多
        $('#loadMore').on("click", function () {
                loadMore();
            })
            //        $('.jlist li').on('click', function () {
            //                $(this).addClass('cur').siblings().removeClass('cur');
            //            })
            /*排序*/
        $('.j-bottom .fo-lf').on('click', function () {
            $('.jpop,.jpop .sort').show();
        })
        $('.jpop .sort').on('click', 'li', function () {
                $(this).addClass('cur').siblings().removeClass('cur');
                $('.jpop,.jpop .sort').hide();
                displaySortResult();
            })
            /*筛选*/
        $('.j-bottom .fo-rg').on('click', function () {
            $('.jpop,.jpop .screen').show();
        })
        $("#h-level").on("click", 'li', selectLevel);
        $("#h-type").on("click", 'li', selectType);
        $("#s-but").on("click", function (event) {
            $('.jpop,.jpop .screen').hide();
            displayFilterResult();
        });

        //        $('.jpop .screen-lf li').on('click', function () {
        //            $(this).addClass('cur').siblings().removeClass('cur');
        //            $('.screen-rg ul').eq($(this).index()).show().siblings().hide();
        //        })
        //        $('.jpop .screen-rg ul li').on('click', function () {
        //            $(this).addClass('cur').siblings().removeClass('cur');
        //        })
        //        $('.jpop .j-btn').on('click', function () {
        //             $('.jpop,.jpop .screen').hide();
        //            displayFilterResult();
        //            /*恢复默认
        //            $('.jpop .screen-lf li').eq(0).addClass('cur').siblings().removeClass('cur');
        //            $('.jpop .screen-rg ul li').eq(0).addClass('cur').siblings().removeClass('cur');
        //            $('.screen-rg ul').eq(0).show().siblings().hide();*/
        //        })
        /*遮罩层事件*/
        var mask = document.getElementById('mask');
        mask.addEventListener('touchstart', fn, false);

        function fn(event) {
            var event = event || window.event;
            $('.jpop,.jpop .screen,.jpop .sort').hide();
            event.preventDefault();
        }
        
        // 酒店选择 页面跳转 将选择的酒店信息存入sessionStorage
        $('#hj_jList').on("click","li",function(evnt){
            var that = $(this);
            that.find('i').addClass("active");
            var hotelInfo = decodeURI(that.attr("data-hotelInfo"));
            var flightHotelAllData = JSON.parse(sessionStorage.getItem('flightHotelAllData'));
            flightHotelAllData.data.hotelInfo = hotelInfo;
            sessionStorage.setItem('flightHotelAllData',JSON.stringify(flightHotelAllData));
            var timer = setTimeout(function(){
                window.history.go(-1);
                clearTimeout(timer);
            },500)
            
//            
//            var paraObj = new Object();
//			paraObj.HotelID = that.attr('data-hotelId');
//			paraObj.SelectedRoomID = params.Parameters.SelectedRoomID;
//			paraObj.FlightCacheID = params.Parameters.FlightCacheID;
//			paraObj.FlightSetID = params.Parameters.FlightSetID;
//			paraObj.CityCodeFrom = params.Parameters.CityCodeFrom;
//			paraObj.CityCodeTo = params.Parameters.CityCodeTo;
//			paraObj.ReturnDate = params.Parameters.ReturnDate;
//			//paraObj.RoomDetails = params.Parameters.RoomDetails;
//
//            var paramStr = "";
//			for (var attr in paraObj) {
//				paramStr += "&" + attr + "=" + paraObj[attr];
//			}
//			paramStr = paramStr.slice(1);
//            
//            window.location.href = 'hotel_detail.html?' + paramStr;
        });
    }

    function init() {
        initData();
        bindEvent();
    }

    init();
})()
