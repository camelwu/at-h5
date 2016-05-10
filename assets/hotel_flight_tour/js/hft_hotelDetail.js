(function(){
  var latitude = 0;
  var longitude = 0;
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
  function dataCallBack(result){
    if(result.success){
      var data = result.data;
      console.log(data);
      banner(data)
      ulList(data)
      hotelName(data)
      hotelAddress(data)
      map(data)
      message(data)
      vlm.init()
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
  //ulList
  function ulList(data){
    var str = $('#ulList').html();
    var ulList = ejs.render(str,data.hotelInfo);
    $('ul.ul_room').html(ulList);
  }
  //hotelName
  function hotelName(data){
    var str =$('#hotelName').html();
    var hotelName = ejs.render(str,data.hotelInfo);
    $('.hotel_detail_msg li.name').html(hotelName);
  }
  //hotelAddress
  function hotelAddress(data){
    var str =$('#hotelAddress').html();
    var hotelAddress = ejs.render(str,data.hotelInfo);
    $('.hotel_detail_msg li.mes2').html(hotelAddress);
  }
  //  map
  function map(data){
    latitude = data.hotelInfo.latitude-0;
    longitude = data.hotelInfo.longitude-0;
    at.map.createMap(latitude,longitude);
    at.map.markHotel(latitude,longitude,"");
    at.map.moveCenterToHotelLocation(latitude,longitude);
  }
  //message
  function message(data){
    var str =$('#message').html();
    var message = ejs.render(str,handleData(data.hotelInfo));
    $('.hotel_detail_msg .ul2').html(message);
  }
  //根据模板需要提前处理好data
  function handleData(data){
    switch (data.starRating){
      case "1 星级":
        data.starRating = '一星级';
        break;
      case "2 星级":
        data.starRating = '二星级';
        break;
      case "3 星级":
        data.starRating = '三星级';
        break;
      case "4 星级":
        data.starRating = '四星级';
        break;
      case "5 星级":
        data.starRating = '五星级';
        break;
    }
    return data;
  }
})()
