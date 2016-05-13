(function(){
  //获取本地存储数据
  var sStorage = JSON.parse(sessionStorage.getItem("hftHotelDetailPara")) || {};
  //console.log(sStorage);
  //取url再传给资源选择页
  var chooseUrl = sessionStorage.getItem("hftHotelChooseUrl");
  //添加当前选中样式  资源选择页有roomId、列表页没有，所以用判断
  var ulrRoom = window.location.search;
  if(ulrRoom){
    var ulrRoomId = ulrRoom.substring(40);
  }
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
      var data = result.data, hftFlightHotelTourInfo =JSON.parse(window.sessionStorage.getItem('hftFlightHotelTourInfo'));
      hftFlightHotelTourInfo['hotelInfo'] = data['hotelInfo']; //替换酒店信息
      window.sessionStorage.setItem('hftFlightHotelTourInfo', JSON.stringify(hftFlightHotelTourInfo));
      banner(data);
      ulList(data);
      hotelName(data);
      hotelAddress(data);
      map(data);
      message(data);
      date();
      vlm.init();
    }else{
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
      })
    }

    //点击事件  跳转
    $('.hotel_detail_rooms li').on('click',function(){
      var roomID = $(this).attr('data-hotelId');
      $(this).addClass('cur').siblings().removeClass('cur');
      if(ulrRoom){
        window.location.href = 'hft_choose.html'+ulrRoom.substring(0,24)+'&selectedRoomId='+roomID;
      }else{
        window.location.href = 'hft_choose.html'+chooseUrl+'&selectedRoomId='+roomID;
      }
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
    at.map.createMap(latitude,longitude);
    at.map.markHotel(latitude,longitude,"");
    at.map.moveCenterToHotelLocation(latitude,longitude);
    $('#map').on('click',function(){
      window.location.href = 'hft_hotel_detail_map.html';
    })
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
  //日期
  function date(){
    $('.hotel_detail_rooms .departDate').html(sStorage.departDate.substring(5,10));
    $('.hotel_detail_rooms .returnDate').html(sStorage.returnDate.substring(5,10));
  }

})()
