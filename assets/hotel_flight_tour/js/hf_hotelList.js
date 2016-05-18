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
    //var parametersStorage = JSON.parse(localStorage.getItem("changeHotelParaObj")) || {};
    //var parametersS = parametersStorage.data;
    var parametersS = JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {};
    console.log(parametersS)
    var locationList = null;
    var StarRating = JSON.parse(localStorage.getItem("filterStarRating")) || "0";
    var firstTime = 1;
    var params = {
            "Code": "50100003",
            "ForeEndType": 2,
            "Parameters": {
                "selectedHotelID": parametersS.selectedHotelID || "",
                "flightCacheID": parametersS.flightCacheID || "",
                "flightSetID": parametersS.flightSetID || "",
                "cityCodeFrom": parametersS.cityCodeFrom || "",
                "cityCodeTo": parametersS.cityCodeTo || "",
                "departDate": parametersS.departDate || "",
                "returnDate": parametersS.returnDate || "",
                "sortFields": parametersS.sortFields || [0],
                "starRating":  0,   //默认不限
                "pageNo": parametersS.pageNo || "",
                "pageSize": parametersS.pageSize || "",
                "roomDetails": parametersS.roomDetails || [],
                "location": parametersS.location || ""
            }
        },
        currentPage;

    //vlm.init();

    //根据模板需要提前处理好data
    function handleData(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
            //data[i].hotelInfo = encodeURI(JSON.stringify(data[i]));
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
    
    //页面显示
    function dataCallBack(result) {
        console.log(result)
        var loadMoreSign = ($("#loadMore").attr("data-more") == "yes") ? true : false;
        if (result.success && result.code == '200') {
            if (!loadMoreSign && result.data.hotels.length == 0) {
                showNodata();
                return;
            }
            var data = result.data;
            var str = template("hj_list_template", handleData(data.hotels));
            if (loadMoreSign) {
                $("#hj_jList").html($("#hj_jList").html() + str);
            } else {
                $("#hj_jList").html(str);
            }
            locationList = data.locationList;
            $("#totalHotels").html(data.totelHotelCount); //更新酒店数量 
            //页面第一加载时初始化位置信息
            if (firstTime == 1) {
                initLocationInfo(locationList);
                firstTime++;
            }

            //图片懒加载
            var c = new lazyLoad('hj_jList');

            currentPage = data.pageNo;
            if (data.pageNo < data.pageCount) {
                $("#loadMore").attr("data-more", "").html("点击加载更多").show();
            } else if (data.pageNo >= data.pageCount) {
                $("#loadMore").attr("data-more", "no").html("没有更多数据了！").show();
            } else {
                $("#loadMore").attr("data-more", "").html("点击加载更多").hide();
            }

            //显示筛选状态
            displayFilterStatus();

        } else {
            showNodata();
        }
    }
    
    //没有数据或者异常提示
    function showNodata(){
        $("#loadMore").hide();
        var oLi = document.createElement('li');
        oLi.innerHTML = '<div><img src="../images/hotelListNo.jpg" /><p class="hotelConSorry1">非常抱歉，无符合要求的酒店。</p><p class="hotelConSorry2">建议您扩大搜索范围</p></div>';
        oLi.className = 'hotelConNo';
        $("#hj_jList").empty().append(oLi).css({
            width: '100%',
            height: '100%'
        });
    }
    
    //更新筛选状态
    function displayFilterStatus() {
        var StarRating = localStorage.getItem('filterStarRating') || [0]; 
        var locations = params.Parameters.location;
        var sort = params.Parameters.sortFields;
        var start = params.Parameters.starRating;
        locations != "" ? $(".fo-location i").addClass("red-tip") : $(".fo-location i").removeClass("red-tip");
        sort[0] != 0 ? $(".fo-sort i").addClass("red-tip") : $(".fo-sort i").removeClass("red-tip");
        StarRating != "0" ? $(".fo-filter i").addClass("red-tip") : $(".fo-filter i").removeClass("red-tip");
        
        //console.info(sort + "---" + StarRating);
        $(sort).each(function(indexSort,sortValue){
            $(".jpop .sort li").each(function(index,sortLi){
                if($(sortLi).attr("data-sort")  == sortValue){
                    $(sortLi).addClass("cur");
                    console.info("sort list click");
                }
            });
        });
        //星级选择状态
        $("#h-level li").each(function(index,startLi){
            //console.info("$(startLi).attr('data-start') :" + $(startLi).attr("data-start"));
            var starts = StarRating;
            for(var i=0;i<starts.length;i++){
                if($(startLi).attr("data-start")  == starts[i]){
                    $(startLi)[0].className = "s-li1";
                    break;
                }else{
                    $(startLi)[0].className = "s-li";
                }
            }
        });
        
        $(locations.split("||")).each(function(locationIndex,locationValue){
            $("#locationList li").each(function(index,locationLi){
                if($(locationLi).attr("data-location")  == locationValue){
                    $(locationLi).trigger("click");
                }
            });
        });
    }
    
    //初始化位置信息
    function initLocationInfo(dataList) {
        var data_address = dataList || [];
        var oUl = document.getElementById('locationList');
        //模板添加内容
        //console.log(data_address);
        oUl.innerHTML = '<li class="l-li l-liFirst">' + '<p class="l-p">不限</p>' + '<b class="l-icon1 l-icon1First"></b>' + '</li>';
        var locationsLi = "";
        for (var i = 0; i < data_address.length; i++) {
            locationsLi += '<li class="l-li" data-location="'+data_address[i]+'">' + '<p class="l-p">'+data_address[i]+'</p>' + '<b class="l-icon1"></b>' + '</li>';
        }
        oUl.innerHTML += locationsLi;
        
        var liFirst = $('#locationList .l-liFirst');
        var aLi = $('#locationList .l-li');
        var aB = $('#locationList .l-icon1');
        var oB = $('#locationList .l-icon1First')[0];
        var bOk = true;
        var aOk = {};
        for (var i = 1; i < aLi.length; i++) {
            aOk[i] = true;
        }
        //联动选项
        //“不限”点击事件
        liFirst.on("click", function (event) {
            liFirst.removeClass("l-li3");
            for (var i = 1; i < aLi.length; i++) {
                aLi.eq(i).removeClass("l-li2");
            }
            for (var i = 1; i < aLi.length; i++) {
                aOk[i] = true;
            }
        });

        //每个地区的点击事件
        for (var i = 1; i < aLi.length; i++) {
            (function (index) {
                aLi.eq(index).on("click", function (event) {
                    if (aOk[index]) {
                        aLi.eq(index).addClass('l-li2');
                    } else {
                        aLi.eq(index).removeClass('l-li2');
                    }
                    aOk[index] = !aOk[index];
                    var n = 0;
                    for (var j = 1; j < aLi.length; j++) {
                        if (!aOk[j]) {
                            liFirst.addClass("l-li3");
                            bOk = false;
                        } else {
                            n++;
                        }
                    }
                    if (n == aLi.length - 1) {
                        liFirst.removeClass("l-li3");
                        bOk = true;
                    }
                });
            })(i);
        }
    }

    //初始化数据 优先使用历史筛选条件
    function initData() {
        var filterHistory = localStorage.getItem("flighHotelParams");
        var data = "";
        if (filterHistory) {
            data = filterHistory;
            params = JSON.parse(filterHistory);
        } else {
            data = JSON.stringify(params);
        }
        vlm.loadJson('', data, dataCallBack);
        // dataCallBack();
    }
    //获取参数  所有的筛选条件
    function getParams() {
        var paramsString = '';
        //排序条件
        var currentSort = $(".jpop .sort .cur").attr("data-sort") || 0; //0 标识默认排序
        params.Parameters.sortFields = [currentSort];
        //筛选条件

        var hl_star_type = $("#screen .s-li1");
        var hl_star_str = [];
        var hl_filter_chinese = "";
        var hl_filter_star = "";
        var hl_type_str = "";
        var hl_filter_type = "";

        for (var i = 0; i < hl_star_type.length; i++) {
            switch (hl_star_type[i].innerText) {
                case '不限':
                    hl_star_str.push("0");
                    hl_filter_chinese += '不限$';
                    hl_filter_star += '0$';
                    break;
                case '二星级以下':
                    hl_star_str.push("1");
                    hl_filter_chinese += '二星级以下$';
                    hl_filter_star += '1$';
                    break;
                case '三星':
                    hl_star_str.push("2");
                    hl_filter_chinese += '三星$';
                    hl_filter_star += '2$';
                    break;
                case '四星':
                    hl_star_str.push("4");
                    hl_filter_chinese += '四星$';
                    hl_filter_star += '4$';
                    break;
                case '五星':
                    hl_star_str.push("8");
                    hl_filter_chinese += '五星$';
                    hl_filter_star += '8$';
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

        var selectLocation = $("#locationList .l-li2");
        var locationString = [];
        selectLocation.each(function (index, ele) {
            locationString.push($(ele).text());
        });
        //设置星级   多个星级参数和
        //前端本地保存一份星级筛选
        localStorage.setItem("filterStarRating",hl_star_str.join(""));
        params.Parameters.StarRating = getStartParams(hl_star_str);
        
        //设置位置
        params.Parameters.Location = locationString.join("||");

        //保存筛选记录
        paramsString = JSON.stringify(params);
        localStorage.setItem("flighHotelParams", paramsString);
        return paramsString;
    }
    //星级参数相加
    function getStartParams(arrList){
        var starts = 0; 
        for(var i=0,len=arrList.length;i<len;i++){
            starts += parseInt(arrList[i]);
        }
        return starts;
    }
    
    //排序查询
    function displaySortResult() {
        //TODO 获取参数

        var data = getParams();
        vlm.loadJson("", data, dataCallBack);

    }
    //筛选查询
    function displayFilterResult() {
        //TODO 获取参数
        var data = getParams();
        vlm.loadJson("", data, dataCallBack);
    }

    //位置查询
    function displayLocationResult() {
        var data = getParams();
        vlm.loadJson("", data, dataCallBack);
        vlm.loadJ
    }
    //加载更多
    function loadMore() {
        //设置参数
        var loadMoreBtn = $("#loadMore");
        if (loadMoreBtn.attr("data-more") == "no") {
            return;
        }
        
        loadMoreBtn.attr("data-more", "yes");
        params.Parameters.PageNo = currentPage + 1;

        var data = getParams();
        $("#loadMore").html("正在加载...");
        vlm.loadJson("", data, dataCallBack, false, false, true);
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
    function selectLevel(event) {
        var obj = event.target || window.event.srcElement;
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
        $('.j-bottom .fo-sort').on('click', function () {
            $('.jpop,.jpop .sort').show();
        })
        $('.jpop .sort').on('click', 'li', function () {
                $(this).addClass('cur').siblings().removeClass('cur');
                $('.jpop,.jpop .sort').hide();
                displaySortResult();
            })
            /*筛选*/
        $('.j-bottom .fo-filter').on('click', function () {
            $('.jpop,.jpop .screen').show();
        })
        $("#h-level").on("click", 'li', selectLevel);
        //$("#h-type").on("click", 'li', selectType);  //暂时没有酒店类型筛选
        $("#s_but").on("click", function (event) {
            $('.jpop,.jpop .screen').hide();
            displayFilterResult();
        });

        //位置
        $('.j-bottom .fo-location').on('click', function () {
            $('.jpop,.jpop .location').show();
        });
        $("#sureBtn").on("click", function (event) {
            $('.jpop,.jpop .location').hide();
            displayLocationResult();
        });

        //返回
        $(".j-back").on("click", function () {
            //清除历史记录
            localStorage.removeItem("flighHotelParams");
            window.history.go(-1);
        });

        /*遮罩层事件*/
        var mask = document.getElementById('mask');
        mask.addEventListener('touchstart', fn, false);

        function fn(event) {
            var event = event || window.event;
            $('.jpop,.jpop .screen,.jpop .sort,.jpop .location').hide();
            event.preventDefault();
        }
        // 酒店选择 页面跳转 将选择的酒店信息存入sessionStorage
        $('#hj_jList').on("click", "li", function (evnt) {
            var that = $(this);
            var hotelId = that.attr("data-hotelid");
            if(!hotelId){
                return;
            }
            that.find('i').addClass("active");
            //var hotelInfo = decodeURI(that.attr("data-hotelInfo"));
            //var flightHotelAllData = JSON.parse(sessionStorage.getItem('flightHotelAllData'));
            //flightHotelAllData.data.hotelInfo = JSON.parse(hotelInfo);
            //sessionStorage.setItem('flightHotelAllData',JSON.stringify(flightHotelAllData));
            parametersS.HotelID = hotelId;
            localStorage.setItem("hotelDetailInfo", JSON.stringify(parametersS));
            var timer = setTimeout(function () {
                //window.history.go(-1);
                window.location.href = 'hf_hotel_detail.html';
                clearTimeout(timer);
            }, 500)
        });
    }

    function init() {
        initData();
        bindEvent();
    }

    init();
})();
