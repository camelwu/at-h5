(function(){
  //获取资源选择页传过来的数据
  var parametersStorage = JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {};
  //console.log(parametersStorage);
  //获取资源选择页的url保存下来，再传过去
  var chooseUrl = window.location.search;
  sessionStorage.setItem("hftHotelChooseUrl",chooseUrl);
  //传数据
  var dataPull = {
    "parameters":parametersStorage ,
    "foreEndType": 3,
    "code": "60100007"
  };
  //接数据
  vlm.loadJson('',JSON.stringify(dataPull),dataCallBack);
  function dataCallBack(result){
    if(result.success){
      var data = result.data;
      title(data);
      list(data);
      //footer();
      var menu_data = {
            hotelSort : {
              title : "推荐排序",
              c : "footer_filter_hotel_sort",
              type : 1,
              listData : [
                {
                  key: 'sort',
                  val: ["价格从高到低", "价格从低到高", "评分从高到低", "星级从高到低", "星级从低到高"],
                  type: 1
                }
              ]
            },
            hotelScreen : {
              title : "筛选",
              c : "footer_filter_hotel_screen",
              type : 2,
              key : 'starRatingList',
              listData : [
                {
                  key: 'start',
                  val: ["3", "4", "4+"],
                  title: "星级档次",
                  type: 2
                },
                {
                  key: 'htype',
                  val: ["度假", "亲子", "随便"],
                  title: "酒店类型",
                  type: 2
                }
              ]
            },
            hotelPosition : {
              title : "位置",
              c : "footer_filter_hotel_position",
              type : 2,
              listData : [{
                key: 'position',
                val: ["Sentosa Island", "Bugis", "Orchard Vicinity", "Marina", "Geylang", "City Hall", "Chinatown", "Orchard"],
                type: 2
              }]
            }
          },
          menu_call = function() {
            alert("js request json.");
          };
      ;
      if (footer) {
        footer.data = menu_data;
        footer.callback = menu_call;
      }
      footer.filters.init();
      console.log(data);
      vlm.init();
    }else{
      vlm.init();
      jAlert('暂无酒店数据,请稍后再试', "提示");
    }
  }
  //根据模板需要提前处理好data
  function handleData(data){
    var star = data.hotels;
    for(var i=0;i<star.length;i++){
      switch (star[i].starRating){
        case "1 星级":
          star[i].starRating = '一星级';
          break;
        case "2 星级":
          star[i].starRating = '二星级';
          break;
        case "3 星级":
          star[i].starRating = '三星级';
          break;
        case "4 星级":
          star[i].starRating = '四星级';
          break;
        case "5 星级":
          star[i].starRating = '五星级';
          break;
      }
    }
    return data;
  }
  //title
  function title(data){
    var str = $('#title').html();
    var title = ejs.render(str,data);
    $('.header h3 span').html(title);
  }
  //数据加载部分
  function list(data){
    var str = $('#templateList').html();
    var hotels = ejs.render(str, handleData(data));
    $('.hotel_list').html(hotels);
    $('.hotel_list li').on('click',function(){
      $(this).addClass('cur').siblings().removeClass('cur');
      var hotelID = $(this).attr("data-hotelId");

      //跳转到详情页用
      console.log(hotelID);
      parametersStorage.hotelID = hotelID;
      sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(parametersStorage));
      window.location.href = 'hft_hotel_detail.html';
    })
  }
  //底部  插件



})()
