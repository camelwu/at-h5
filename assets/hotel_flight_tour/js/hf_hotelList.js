/**
 *@desc 酒店列表页 依赖footer组件
 *@time 2016-05-26
 **/
(function () {
    "use strict";

    function initFooter(data) {
        var menu_data = {
                hotelSort: {
                    title: "推荐排序",
                    c: "foot_sort",
                    s: 1,
                    type: 1,
                    key: 'sortTypes',
                    listData: [{
                        sortText: "价格从高至低",
                        sortValue: 4
                        }, {
                        sortText: "价格从低至高",
                        sortValue: 3
                        }, {
                        sortText: "星级从高到低",
                        sortValue: 2
                        }, {
                        sortText: "星级从低到高",
                        sortValue: 1
                        }]
                },
                hotelScreen: {
                    title: "筛选",
                    c: "foot_screen",
                    s: 2,
                    type: 2,
                    key: 'filters',
                    listData: [{
                        title: "星级",
                        filterType: 1,
                        item: starChoose(data)
					}]
                },
                hotelPosition: {
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
                for (var i = 0; i < arrNum.length; i++) {
                    filter += arrNum[i].FilterValues[0] ? arrNum[i].FilterValues[0] - 0 : 0;
                }
                //排序入参重置
                var sortArr = [];
                var sortFilter = data.sortTypes[0] - 0;
                sortArr.push(sortFilter);
                console.log(sortArr);
                hotelList.parametersStorage.sortFields = sortArr;
                hotelList.parametersStorage.Location = locationList;
                hotelList.parametersStorage.StarRating = filter;
                hotelList.parametersStorage.pageNo = 1;

                hotelList.tAjax("", hotelList.parametersStorage, "50100003", "2", hotelList.list);
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
        for (var i = 0; i < star.length; i++) {
            switch (star[i].starRatingName) {
                case "1":
                    star[i].starRatingName = '不限';
                    break;
                case "2":
                    star[i].starRatingName = '二星以下';
                    break;
                case "3":
                    star[i].starRatingName = '三星级';
                    break;
                case "4":
                    star[i].starRatingName = '四星级';
                    break;
                case "5":
                    star[i].starRatingName = '五星级';
                    break;
            }
            starJson = {
                "filterText": star[i].starRatingName,
                "filterValue": star[i].starRatingValue
            }
            starArr.push(starJson)
        }
        console.log(starArr);
        return starArr
    }
    /**
     *@desc 预处理数据，将星级信息转换
     *@para result
     *@return result
     **/
    function handleData(result) {
        var star = result.data.hotels;
        for (var i = 0; i < star.length; i++) {
            switch (star[i].starRating) {
                case "1":
                    star[i].starRating = '一星级';
                    break;
                case "2":
                    star[i].starRating = '二星级';
                    break;
                case "3":
                    star[i].starRating = '三星级';
                    break;
                case "4":
                    star[i].starRating = '四星级';
                    break;
                case "5":
                    star[i].starRating = '五星级';
                    break;
            }
        }
        return result;
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

                var str = $('#templateList').html();
                var hotels = ejs.render(str, handleData(result));
                if (more) {
                    $('.hotel_list').append(hotels);
                } else {
                    $('.hotel_list').empty().append(hotels);
                }

                //TODO 图片懒加载
                //                setTimeout(function () {
                //                    var c = new lazyLoad('hj_jList');
                //                }, 500);


                $('.hotel_list li').on('click', function () {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    var hotelID = $(this).attr("data-hotelId");

                    //跳转到详情页用
                    console.log(hotelID);
                    hotelList.parametersStorage.hotelID = hotelID;
                    sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(hotelList.parametersStorage));
                    window.location.href = 'hf_hotel_detail.html';
                });

                hotelList.updateMoreStatus(data);

            } else {
                $.alerts.alert(result.message);
            }
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
                vlm.loadJson('', JSON.stringify(dataPull), moreDataCallBack);
            });
        }
    }
    var dataPull = {
        "parameters": hotelList["parametersStorage"],
        "foreEndType": 2,
        "code": "50100003"
    }

    hotelList.initPage();
})();
