(function(){
  var parametersStorage = JSON.parse(sessionStorage.getItem("hftChangeHotelPara")) || {};
  console.log(parametersStorage);

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
      console.log(data);
      vlm.init();
    }else{
      alert("数据加载错误")
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
      //parametersStorage.hotelID = hotelID;
      //console.log(parametersStorage);
      //sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(parametersStorage));

      //跳转到详情页用
      console.log(hotelID);
      parametersStorage.selectedHotelID=1023696;
      parametersStorage.selectedRoomID=10996872;
      parametersStorage.hotelID = hotelID;
      sessionStorage.setItem("hftHotelDetailPara", JSON.stringify(parametersStorage));
      window.location.href = 'hft_hotel_detail.html';
    })
  }
})()
