/*! asiatravel FE team at-h5-nodejs-----2016-05-19T15:21:43 */
!function(){function a(a){if(a.success){var c=a.data;b(c),vlm.init()}else alert("数据加载错误")}function b(a){c=a.hotelInfo.latitude-0,d=a.hotelInfo.longitude-0,at.map.createMap(c,d),at.map.markHotel(c,d,""),at.map.moveCenterToHotelLocation(c,d)}var c=0,d=0,e={parameters:{selectedHotelID:1023696,selectedRoomID:10996872,hotelID:1023716,flightCacheID:3511203,flightSetID:30000001,tours:[{tourID:134,travelDate:"2016-06-15T00:00:00",optionCode:"",travelDateSpecified:1},{tourID:136,travelDate:"2016-06-16T00:00:00",optionCode:"",travelDateSpecified:1},{tourID:166,travelDate:"2016-06-17T00:00:00",optionCode:"",travelDateSpecified:1}],packageID:483297,cityCodeFrom:"BJS",cityCodeTo:"SIN",departDate:"2016-06-15T00:00:00",returnDate:"2016-06-20T00:00:00",roomDetails:[{adult:2}]},foreEndType:2,code:"60100008"};vlm.loadJson("",JSON.stringify(e),a)}();