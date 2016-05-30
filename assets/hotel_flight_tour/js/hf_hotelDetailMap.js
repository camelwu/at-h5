(function(){
  var latitude = sessionStorage.getItem('latitude')-0;
  var longitude = sessionStorage.getItem('longitude')-0;

  at.map.createMap(latitude,longitude);
  at.map.markHotel(latitude,longitude,"");
  at.map.moveCenterToHotelLocation(latitude,longitude);


})()
