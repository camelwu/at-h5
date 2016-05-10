(function(){
  //传数据
  var data = {
    "parameters": {
      "selectedHotelID":1023696,
      "selectedRoomID":10996872,
      "hotelID":1023716,
      "flightCacheID":3511203,
      "flightSetID":30000001,
      "tours": [
        {
          "tourID": 134,
          "travelDate": "2016-06-15T00:00:00",
          "optionCode": "",
          "travelDateSpecified": 1
        },
        {
          "tourID": 136,
          "travelDate":"2016-06-16T00:00:00",
          "optionCode": "",
          "travelDateSpecified": 1
        },
        {
          "tourID": 166,
          "travelDate":"2016-06-17T00:00:00",
          "optionCode": "",
          "travelDateSpecified": 1
        }
      ],
      "packageID": 483297,
      "cityCodeFrom": "BJS",
      "cityCodeTo": "SIN",
      "departDate": "2016-06-15T00:00:00",
      "returnDate": "2016-06-20T00:00:00",
      "roomDetails": [
        {
          "adult": 2
        }
      ]
    },
    "foreEndType": 2,
    "code": "60100008"
  };
  //接数据
  vlm.loadJson('',JSON.stringify(data),dataCallBack);
  //var result =
  function dataCallBack(result){
    if(result.success){
      var data = result.data;
      console.log(data);
      banner(data)


      //message(data)
    }else{
      alert("数据加载错误")
    }
  }
  //根据模板需要提前处理好data
  //banner img
  function banner(data){
    var str = $('#banner').html();
    var banner = ejs.render(str,data.hotelInfo);
    $('.hotel_dbanner').html(banner);
  }
  //images
  function message(data){
    var str =$('#message').html();
    var star = data.hotelInfo.starRating;
    switch (star){
      case "1 星级":
            star = "一星级";
            break;
      case "2 星级":
            star = "二星级";
            break;
      case "3 星级":
            star = "三星级";
            break;
      case "4 星级":
            star = "四星级";
            break;
      case "5 星级":
            star = "五星级";
            break;
    }
    var message = ejs.render(str,star)
  }
})()
