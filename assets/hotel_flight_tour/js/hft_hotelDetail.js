(function(){
  //获取本地存储数据
  var sStorage = JSON.parse(sessionStorage.getItem("hftHotelDetailPara")) || {};
  var chooseUrl = sessionStorage.getItem("hftHotelChooseUrl");
  //添加当前选中样式  资源选择页有roomId、列表页没有，所以用判断
  var ulrRoom = window.location.search;
  var dataTransferObj = null, flightHotelAllData = JSON.parse(window.sessionStorage.getItem('hftFlightHotelTourInfo'));
  if(ulrRoom){
    var ulrRoomId = ulrRoom.substring(40);
  }
  //酒店详情页的入参 存入session
  var fhtHotelCharacteristic = {};
  //酒店详情特色
  fhtHotelCharacteristic.parameters = {};
  fhtHotelCharacteristic.parameters.cultureName = "zh-CN";
  fhtHotelCharacteristic.parameters.hotelID = sStorage.hotelID;
  fhtHotelCharacteristic.foreEndType = 2;
  fhtHotelCharacteristic.code = "10100003";
  //经纬度
  var latitude = 0;
  var longitude = 0;
  var tpl1 = [
    '<% if(images.length==0){ %>',
    '<img src="<%= hotelPictureURL%>" alt="image"/>',
    '<% }else{ %>' +
    '<a href="<%= images[0].imageFileName%>" class="swipebox" title="1/<%=(images.length)%>">',
    '<img src="<%= images[0].imageFileName %>" alt="image"/ ></a> '+
    '<% for(var i=1;i<images.length;i++){ %>',
    '<a style="display:none;" href="<%= images[i].imageFileName%>" class="swipebox" title="<%= (i+1)%>/<%=(images.length)%>">',
    '<img src="<%= images[i].imageFileName%>" alt="image"/></a>',
    '<% } %>',
    '<a class="goback" href="javascript:window.history.go(-1);"></a>',
    '<% if(images.length>0) %>',
    '<p class = "bar_img_page"><%=(images.length)%>张</p>',
    '<% } %>'
  ].join('');
  //传数据
  var data = {
    "parameters": sStorage,
    "foreEndType": 2,
    "code": "60100008"
  };
  //接数据
  vlm.loadJson('',JSON.stringify(data),dataCallBack);
  function dataCallBack(result){
    if(result.success == 1&&result.code == 200){
      var data = result.data,
          hftFlightHotelTourInfo =JSON.parse(window.sessionStorage.getItem('hftFlightHotelTourInfo'));
      console.log(data)
      //酒店详情描述 存本地session
      dataTransferObj = result;
      fhtHotelCharacteristic.hotelDesc = data.hotelInfo.hotelDesc;
      sessionStorage.setItem("fhtHotelCharacteristic",JSON.stringify(fhtHotelCharacteristic));
      banner(data);
      ulList(data);
      hotelName(data);
      hotelAddress(data);
      map(data);
      message(data);
      date();
      vlm.init();
    }else{
      vlm.init();
      jAlert('暂无酒店详细数据,请稍后再试', "提示");
    }
  }

  //banner img
  function banner(data){
    //图片点击事件
    var htmlB = ejs.render(tpl1,data.hotelInfo);
    $("#htmlB").html(htmlB);
    $(".swipebox").click(function() {
      $('.gallery').hide(0);
      $('.portfolio-wide').hide(0);
    });
    $(".swipebox").swipebox({
      useCSS : true,
      hideBarsDelay : 0
    });
  }

  //ulList
  function ulList(data){
    var str = $('#ulList').html();
    var ulList = ejs.render(str,data.hotelInfo);
    $('ul.ul_room').html(ulList);
    //添加当前选中
    //判断  从资源选择页跳转 有选中，列表页过来没有选中
    if(ulrRoom){
      $('.ul_room li').each(function(i){
        var attr = $('.ul_room li').eq(i).attr('data-hotelid');
        if( attr == ulrRoomId ){
          $('.ul_room li').eq(i).addClass('cur');
        }
      });
    }
    //点击事件  跳转
    $('.hotel_detail_rooms ul.ul_room li').on('click',function(){
      var roomID = $(this).attr('data-hotelId');
      $(this).addClass('cur').siblings().removeClass('cur');
      flightHotelAllData.hotelInfo = dataTransferObj.data.hotelInfo;
       window.sessionStorage.setItem('hftFlightHotelTourInfo', JSON.stringify(flightHotelAllData));
       window.timer2 = setTimeout(function () {
        window.clearTimeout(window.timer2);
        window.timer2 = null;
        if(ulrRoom){
          window.location.href = 'hft_choose.html'+ulrRoom.substring(0,24)+'&selectedRoomId='+roomID;
        }else{
          window.location.href = 'hft_choose.html'+chooseUrl+'&selectedRoomId='+roomID;
        }
      }, 500);
    });
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
    at.map.createMap(latitude,longitude,false);
    at.map.markHotel(latitude,longitude,"");
    at.map.moveCenterToHotelLocation(latitude,longitude);
    // 增加参数
    var dataObj = {
        HotelName: data.hotelInfo.hotelNameLocale +"("+data.hotelInfo.hotelName+") "+data.hotelInfo.hotelAddress,
        Latitude: data.hotelInfo.latitude,
        Longitude: data.hotelInfo.longitude
    },paramStr = "";
    for (var attr in dataObj) {
        paramStr += "&" + attr + "=" + dataObj[attr];
    }
    paramStr = paramStr.slice(1);
    // 参数拼接结束
    $('#map').on('click',function(){
      window.location.href = '../hotel/hotel_map.html?' + paramStr;
    });
  }

  //message
  function message(data){
    console.log(data)
    var str =$('#message').html();
    var message = ejs.render(str,handleData(data.hotelInfo));
    $('.hotel_detail_msg .ul2').html(message);
    // 点击评分跳转到酒店评分页面
    $('li.score').on('click',function(){
      window.location.href = "../hotel/hotel_reviews.html?HotelID="+data.hotelInfo.hotelID+"&TAAvgRating="+data.hotelInfo.hotelReviewScore+"&TAReviewCount="+data.hotelInfo.hotelReviewCount;
    })
    //点击跳转到酒店介绍页面
    $('li.star').on('click',function(){
      window.location.href = "hft_hotel_summary.html";
    })
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
  //日期  房间
  function date(){
    var departDate = new Date(sStorage.departDate.substring(0,10)).getTime();
    var returnDate = new Date(sStorage.returnDate.substring(0,10)).getTime();
    var numberNeight = (returnDate-departDate)/1000/60/60/24;
    $('.numberNeight').html(numberNeight);
    $('.hotel_detail_rooms .departDate').html(sStorage.departDate.substring(5,10));
    $('.hotel_detail_rooms .returnDate').html(sStorage.returnDate.substring(5,10));

  //  房间
    var searchInfo = JSON.parse(localStorage.getItem("searchInfo"));
    var roomNumber = searchInfo.RoomInfo.length;
    var adultNumber = searchInfo.AdultNum;
    var childNumber = searchInfo.ChildNum;
    $('.roomNumber').html(roomNumber);
    $('.adultNumber').html(adultNumber);
    $('.childNumber').html(childNumber);
    console.log(searchInfo)
  }

})();

