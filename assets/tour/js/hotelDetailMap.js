(function(){
  var url = vlm.parseUrlPara(window.location.search);
  console.log(window.location.search)
  var latitude = url.latitude-0;
  var longitude = url.longitude-0;
  //  map
  at.map.createMap(latitude,longitude);
  at.map.markHotel(latitude,longitude,"");
  at.map.moveCenterToHotelLocation(latitude,longitude);
  vlm.init();


})()
