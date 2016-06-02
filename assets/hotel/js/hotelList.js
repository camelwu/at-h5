////解决300毫秒延迟问题
//(function ($) {
//    "use strict";
//    $(document).ready(function () {
//        window.addEventListener('load', function () {
//            FastClick.attach(document.body);
//        }, false);
//    });
//}(jQuery));
///**
// *@desc   酒店列表页   依赖jquery vlm jAlert  footer lazyload等组件
// *@author
// *@time
// **/
//(function () {
//    "use strict";
//    var hotelList = {
//        history: null,
//        //部署参数的默认值
//        parameters: {
//            CultureName: "zh-CN",
//            PartnerCode: "1000",
//            CountryISOCode: "SG",
//            CityName: "Singapore",
//            CheckInDate: "2016-06-03T00:00:00",
//            CheckOutDate: "2016-06-04T00:00:00",
//            NumRoom: "1",
//            NumAdult: "1",
//            NumChild: "0",
//            InstantConfirmation: true,
//            AllOccupancy: true,
//            PageIndex: "1",
//            PageSize: "20",
//            sorttype: "",
//            Category: "",
//            StarRating: "",
//            LocationList: ""
//        },
//        interData: {},
//        ,
//        domData: {},
//        filterData: {},
//        _url2Json: function (url) {
//            if (!url) {
//                return;
//            } else {
//                var json = {};
//                var arr = url.split('?');
//                var arr2 = arr[1].split('&');
//                for (var i = 0; i < arr2.length; i++) {
//                    var arr3 = arr2[i].split('=');
//                    json[arr3[0]] = arr3[1];
//                }
//                return json;
//            }
//        },
//        initParam: function () {
//            var url = window.location.href;
//            var params = hotelList._url2Json(url);
//
//        },
//        init: function () {
//            //获取参数
//            this.initParam();
//
//            //页面渲染
//            //筛选交互
//        }
//
//    };
//    hotelList.init();
//})();