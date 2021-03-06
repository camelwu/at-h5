/**
 *@desc 酒店列表页 依赖footer组件
 *@time 2016-05-26
 **/
(function () {
    "use strict";
    //获取选中的房间id
    var ulrRoom = window.location.search;
    function initFooter(data) {
        var menu_data = {
            sortTypes: {
                    title: "推荐排序",
                    c: "foot_sort",
                    s: 1,
                    type: 1,
                    key: 'sortTypes',
                    listData: [
                        {
                            sortText: "推荐排序",
                            sortValue: 0
                        },
                        {
                        sortText: "价格从低至高",
                        sortValue: 3
                        },
                        {sortText: "价格从高至低",
                            sortValue: 4
                        },
                        {
                        sortText: "星级从高到低",
                        sortValue: 2
                        }, {
                        sortText: "星级从低到高",
                        sortValue: 1
                        }]
                },
            filters: {
                    title: "筛选",
                    c: "foot_screen",
                    s: 2,
                    type: 2,
                    key: 'filters',
                    listData: [{
                        title: "星级",
                        allowMultiSelect:true,
                        filterType: 1,
                        item: starChoose(data)
                    }]
                },
            locationList: {
                    title: "位置",
                    c: "foot_position",
                    s: 2, //select
                    type: 2,
                    key: 'locationList',
                    listData: data.locationList
                }
            },
            menu_call = function (data) {
                console.log(data);
                //位置重构
                var toString = [];
                toString = data.locationList;
                var locationList = toString.join(",");

                //筛选重构
                var arrNum = data.filters,
                    filter = 0;
                for (var i = 0; i < arrNum[0].FilterValues.length; i++) {
                    filter += arrNum[0].FilterValues[i] ? arrNum[0].FilterValues[i] - 0 : 0;
                }
                //排序入参重置
                var sortArr = [];
                var sortFilter = data.sortTypes[0] ? data.sortTypes[0] - 0 : 0;
                sortArr.push(sortFilter);
                console.log(sortArr);
                hotelList.parametersStorage.sortFields = sortArr;
                hotelList.parametersStorage.Location = locationList;
                hotelList.parametersStorage.StarRating = filter;
                hotelList.parametersStorage.pageNo = 1;

                hotelList.tAjax("", hotelList.parametersStorage, "50100003", "2", hotelList.sortList);
            };
        if (footer) {
            footer.data = menu_data;
            footer.callback = menu_call;
            footer.filters.init();
            //hotelList.footerSign = true;
        }
    }

    function starChoose(data) {
        var starArr = [];
        var starJson = {};
        var star = data.starRatingList;
        var starName;
        var starValue;
        starArr.push({
            "filterText": '不限',
            "filterValue": 0
        })
        for (var i = 0; i < star.length; i++) {
            starName = star[i].starRatingName;
            starValue = star[i].starRatingValue;
            switch (starName) {
                case "2":
                    starName = '二星以下';
                    break;
                case "3":
                    starName = '三星级';
                    break;
                case "4":
                    starName = '四星级';
                    break;
                case "5":
                    starName = '五星级';
                    break;
            }
            starJson = {
                "filterText": starName,
                "filterValue": starValue
            };
            starArr.push(starJson);
        }
        console.log(starArr);
        return starArr;
    }


    function dataCallBack(result) {
        if (result.success && result.code == '200') {
            console.log(result);
            var data = result.data;
            hotelList.list(result, false);

            //footer  begin
            //if (!hotelList.footerSign) {
            initFooter(data);
            //}
        } else {
            $.alerts.alert(result.message);
        }
    }

    function moreDataCallBack(result) {

        hotelList.list(result, true);

    }
    var hotelList = {
        currentPage: 1,
        footerSign: false,
        parametersStorage: JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {},
        chooseUrl: window.location.search,
        initData: function () {
            sessionStorage.setItem("hftHotelChooseUrl", chooseUrl);
        },
        tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
            var dataObj = {
                Parameters: data,
                ForeEndType: ForeEndType,
                Code: Code
            };
            questUrl = questUrl || "";
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        },
        //筛选排序
        sortList:function(result, more){
            $('.all_elements').scrollTop(0);
            hotelList.list(result, more);
        },
        /**
         *@desc 渲染酒店列表
         *@para result 酒店列表
         *@para more  false/true    是否是加载更多
         **/
        list: function (result, more) {
            if (result.code === 200 && result.success) {
                //更新酒店数量
                var data = result.data;
                var str = $('#title').html();
                var title = ejs.render(str, data);
                $('.header h3 span').html(title);

                //curList 只有第一页显示已选择的酒店
                if (data.pageNo === 1) {
                    var strCur = $('#curList').html();
                    var curList = ejs.render(strCur, data);
                    $('.hotel_list').append(curList);
                }

                //list
                var str = $('#templateList').html();
                var hotels = ejs.render(str, data);
                if (more) {
                    $('.hotel_list').append(hotels);
                } else {
                    $('.hotel_list').empty();
                    $('.hotel_list').append(curList).append(hotels);
                }

                //TODO 图片懒加载
                //                setTimeout(function () {
                //                    var c = new lazyLoad('hj_jList');
                //                }, 500);
                $('.hotel_list li').on('click', function () {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    var hotelID = $(this).attr("data-hotelId"),hotelAdditionalPrice = $(this).attr("data-addPrice");
                    //跳转到详情页用
                    hotelList.parametersStorage.hotelID = hotelID;
                    hotelList.parametersStorage.hotelAdditionalPrice = hotelAdditionalPrice;
                    sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(hotelList.parametersStorage));
                    sessionStorage.setItem('hotelAdditionalPrice',JSON.stringify(hotelAdditionalPrice));
                    window.location.href = 'hf_hotel_detail.html'+ ulrRoom;
                });

                hotelList.updateMoreStatus(data);
                hotelList.check();
            } else {
                $.alerts.alert(result.message);
            }
        },
        check: function () {
            $("#hj_jList li:nth-child(1)").addClass("cur");
        },
        updateMoreStatus: function (data) {
            this.currentPage = data.pageNo;
            if (data.hotels.length > 0 && data.pageNo < data.pageCount) {
                $("#loadMore").attr("data-more", "").html("点击加载更多").show();
            } else if (data.pageNo >= data.pageCount) {
                $("#loadMore").attr("data-more", "no").html("没有更多数据了！").show();
            } else {
                $("#loadMore").attr("data-more", "").html("点击加载更多").hide();
            }
        },

        initPage: function () {
            vlm.loadJson('', JSON.stringify(dataPull), dataCallBack);
            this.bindLoadMore();
        },
        bindLoadMore: function () {
            //点击加载更多
            $('#loadMore').on("click", function (event) {
                //设置参数
                var loadMoreBtn = $(event.target || event.scrElement);
                if (loadMoreBtn.attr("data-more") == "no") {
                    return;
                }
                loadMoreBtn.attr("data-more", "yes");
                dataPull.parameters.pageNo = hotelList.currentPage + 1;

                loadMoreBtn.html("正在加载...");
                vlm.loadJson('', JSON.stringify(dataPull), moreDataCallBack, false, false, true);
            });
        }
    };
    var dataPull = {
        "parameters": hotelList["parametersStorage"],
        "foreEndType": 2,
        "code": "50100003"
    }

    hotelList.initPage();
})();
/**
 *@desc 预处理数据，将星级信息转换
 *@para result
 *@return result
 **/
function handleData(result) {
    switch (result) {
        case "1":
            result = '一星级';
            break;
        case "2":
            result = '二星级';
            break;
        case "3":
            result = '三星级';
            break;
        case "4":
            result = '四星级';
            break;
        case "5":
            result = '五星级';
            break;
    }
    return result;
}
