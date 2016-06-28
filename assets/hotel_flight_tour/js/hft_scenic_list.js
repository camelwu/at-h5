(function() {
  var filterSign = false;
  var core = function() {
    //获取缓存内容
    var searchInfo = JSON.parse(localStorage.getItem("searchInfo")),
    //全参设定
      SParameter = {
        "Parameters" : {
          "departCityCode" : searchInfo.FromCity,
          "destCityCode" : searchInfo.ToCity,
          "departDate" : searchInfo.DepartDate,
          "returnDate" : searchInfo.ReturnDate,
          // Android Request Arguments
          "roomDetails" : searchInfo.RoomInfo,
          "FilterFields" : [],
          "sortType" : 0,
          "PageIndex" : "1",
          "pageSize" : "20"
        },
        "ForeEndType" : 3,
        "Code" : "60100002"
      };
    console.log(JSON.stringify(SParameter));
    //获取景点列表
    var ScenicList = function() {
        vlm.loadJson('', JSON.stringify(SParameter), callback);
      },
    //全局回调处理
      callback = function(data) {
        if (data.success) {
          vlm.init();
          filterData = data;
          //var htmlT = ;
          $("#tour_city").html(ejs.render($("#tpl_head").html(), data.data));
          var htmlt = $("#timeDetile").html();
          var htmlT = ejs.render(htmlt, searchInfo);
          $("#TimeList").html(htmlT);
          if(SParameter.Parameters.PageIndex == 1){
            var htmlp = $("#scenicDetile").html();
            var html = ejs.render(htmlp, data.data);
            $("#scenicList").html(html);
          }else{
            var htmlp = $("#scenicDetile").html();
            var html = ejs.render(htmlp, data.data);
            $("#scenicList").append(html);
          }
          var htmlc = $("#CityDetile").html();
          var htmlC = ejs.render(htmlc, data.data);

          // (H5-1938)点击周边城市后，上面的周边城市不做改变，下面的机酒列表改变
          if (!filterSign) {
            $("#CityList").html(htmlC);
          }

          // 清理上次绑定事件（重复绑定事件造成多次查询接口）
          $("#CityList").off('click');
          $("#CityList").click(function(e){
            var e = e || window.event,
              tar = e.target || e.srcElement;
            if(tar.nodeName.toLowerCase() === 'li'){
              var cityCode = $(tar).attr("data-code");
              SParameter = {
                "Parameters" : {
                  "departCityCode" : searchInfo.FromCity,
                  "destCityCode" : cityCode,
                  "departDate" : searchInfo.DepartDate,
                  "returnDate" : searchInfo.ReturnDate,
                  // Android Request Arguments
                  "roomDetails" : searchInfo.RoomInfo,
                  "FilterFields" : [],
                  "sortType" : 0,
                  "PageIndex" : "1",
                  "pageSize" : "20"
                },
                "ForeEndType" : 3,
                "Code" : "60100002"
              };

              // 周边城市激活状态切换
              Array.prototype.forEach.call(tar.parentNode.children, function (el) {
                el.classList.remove('current');
              });
              tar.classList.add('current');

              // 加载机酒列表
              vlm.loadJson('', JSON.stringify(SParameter), callback);
            }
          });
          PWidth(data);
          var packageid = $(".scenic-detile_list").attr("data-packageid");
          var scenicItem = {
            packageid : packageid
          };
          localStorage.setItem('scenicItem', JSON.stringify(scenicItem));
          $(".scenic-detile_list").on("click", function() {
            var packageid = $(this).attr("data-packageid");
            window.location.href = 'hft_choose.html?type=2&packageId=' + packageid;
          });
          $('#Time').on("click", function() {
            window.location.href = 'index.html';
          });
          //点击加载更多
          $('#LoadMore').on("click", function () {
            loadMore();
          });
          clickMore(data);
          if (!filterSign) {
            filterSign = true;
            initFilter(data);
          }
        } else {
          alert(data.message, "提示");
        }
      };
    //init filter
    var initFilter = function(data) {
      // 添加底部筛选
      if (footer) {
        footer.data = {
          sortTypes : {
            title : "快速排序",
            c : "foot_sort",
            s : 1,
            type : 1,
            key : 'sortTypes',
            listData : data.data.sortTypes
          },
          hotelScreen : {
            title : "筛选",
            c : "foot_screen",
            s : 1,
            type : 2,
            key : 'filters',
            listData : data.data.filters
          }
        };
        footer.callback = function(obj) {
          SParameter.Parameters.sortType = obj.sortTypes[0];
          SParameter.Parameters.filterFields = obj.filters;
          SParameter.Parameters.PageIndex = "1";
          ScenicList();
        };
        footer.filters.init();
      }
    };
    //加载更多
    var  loadMore=function() {
      //设置参数
      var loadMoreBtn = $("#LoadMore");
      if (loadMoreBtn.attr("data-more") == "no") {
        return;
      }
      loadMoreBtn.attr("data-more", "yes");
      SParameter.Parameters.PageIndex = PageIndex;
      $("#LoadMore").html("正在加载...");
      vlm.loadJson('', JSON.stringify(SParameter), callback);
    };
    //点击加载更多
    var  clickMore= function(data){
      PageIndex = parseInt(SParameter.Parameters.PageIndex)+1;
      if (data.data.lists.length>0 && PageIndex==data.data.pageCount) {
        $("#LoadMore").attr("data-more", "").html("点击加载更多").show();
      } else if(PageIndex > data.data.pageCount){
        $("#LoadMore").attr("data-more", "no").html("没有更多数据了！").show();
      }else{
        $("#LoadMore").attr("data-more", "").html("点击加载更多").show();
      }
    }
    //城市列表父宽
    var PWidth = function(data) {
      var sum = data.data.recommendCities.length;
      var num = 0;
      var width = 0;
      for (var i = 0; i < sum; i++) {
        width = $(".city_list1").eq(i).outerWidth();
        num += width+10;
      }
      // rem换算为px会产生小数，导致总和误差为1个像素，顶部菜单会掉下来
      num += 1;
      //num = num + sum * 60;
      $(".city_box").css({
        'width' : num + 'px'
      });
    };
    return {
      ScenicList : ScenicList
    };
  }();
  core.ScenicList();
  //清空资源选择页历史数据
  window.sessionStorage.removeItem('hftFlightHotelTourInfo');
  window.localStorage.removeItem('hftFlightHotelTourInfo');
  window.sessionStorage.removeItem('tourChosenInfo');
  window.sessionStorage.removeItem('hftCreateOrderPara');
  window.localStorage.removeItem('hftCreateOrderPara');
  window.sessionStorage.removeItem('hotelAdditionalPrice');
  window.sessionStorage.removeItem('tempChooseTourDate');
  window.localStorage.removeItem('selectedRoomId')
})();
(function(){
  $(".all_elements")[0].addEventListener("scroll",function(){
    $(".header")[0].style.position="fixed";
  });
})()
