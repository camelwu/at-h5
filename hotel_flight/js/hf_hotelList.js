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
    vlm.init();

    //根据模板需要提前处理好data
    function handleData(data) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
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

        var testData = [
            {
                "hotelID": 96,
                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
                "location": "Sukhumvit",
                "longitude": "100.554628",
                "latitudes": "13.741972",
                "city": "曼谷",
                "country": "泰国",
                "starRating": "4",
                "currencyCode": "CNY",
                "avgRatePerPax": 3540,
                "additionalPrice": 0
                },
            {
                "hotelID": 96,
                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
                "location": "Sukhumvit",
                "longitude": "100.554628",
                "latitudes": "13.741972",
                "city": "曼谷",
                "country": "泰国",
                "starRating": "4",
                "currencyCode": "CNY",
                "avgRatePerPax": 3540,
                "additionalPrice": 0
                },
            {
                "hotelID": 96,
                "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
                "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
                "location": "Sukhumvit",
                "longitude": "100.554628",
                "latitudes": "13.741972",
                "city": "曼谷",
                "country": "泰国",
                "starRating": "4",
                "currencyCode": "CNY",
                "avgRatePerPax": 3540,
                "additionalPrice": 0
                 }];
        testData = handleData(testData);
        var str = template("hj_jList", testData);
        $("#hj_jList").html(str);
        $("#totalHotels").html(testData.length);  //更新酒店数量
//        if(result.success && result.code == '200'){
//            if(result.data..length == 0){
//                //TODO 没有数据
//                return;
//            }
//            var str = template("hj_jList", result.data.hotels);
//            $("#hj_jList").html(str);
//        }else{
//            //TODO 异常处理
//        }
    }
    //初始化数据
    function initData() {
        //vlm.loadJson('',);
        dataCallBack();
    }
    //排序查询
    function displaySortResult(){
        //TODO 获取参数
        var params = {};
        vlm.loadJson("",params,dataCallBack,null,null,null);
        
    }
    //筛选查询
    function displayFilterResult(){
        //TODO 获取参数
        var params = {};
        vlm.loadJson("",params,dataCallBack,null,null,null);
    }
    //绑定事件
    function bindEvent() {
        $('.jlist li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        /*排序*/
        $('.j-bottom .fo-lf').on('click',function(){
            $('.jpop,.jpop .sort').show();
        })
        $('.jpop .sort li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.jpop,.jpop .sort').hide();
            displaySortResult();
        })
        /*筛选*/
        $('.j-bottom .fo-rg').on('click',function(){
            $('.jpop,.jpop .screen').show();
        })
        $('.jpop .screen-lf li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.screen-rg ul').eq($(this).index()).show().siblings().hide();
        })
        $('.jpop .screen-rg ul li').on('click',function(){
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        $('.jpop .j-btn').on('click',function(){
            $('.jpop,.jpop .screen').hide();
            displayFilterResult();
            /*恢复默认
            $('.jpop .screen-lf li').eq(0).addClass('cur').siblings().removeClass('cur');
            $('.jpop .screen-rg ul li').eq(0).addClass('cur').siblings().removeClass('cur');
            $('.screen-rg ul').eq(0).show().siblings().hide();*/
        })
        /*遮罩层事件*/
        var mask = document.getElementById('mask');
        mask.addEventListener('touchstart',fn, false);
        function fn(event){
            var event = event|| window.event;
            $('.jpop,.jpop .screen,.jpop .sort').hide();
        }
        //  页面跳转
        $('.hotelli').click(function(){
            window.location.href = 'hotel_detail.html';
        })
    }

    function init() {
        initData();
        bindEvent();
    }

    init();
})()
