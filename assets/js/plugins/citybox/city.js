/**
 * Created by apple on 16/5/16.
 */
(function(){


  //if(navigator.geolocation){
  //  navigator.geolocation.getCurrentPosition(function(pos){
  //    var properties = ["longitude","latitude","altitude","accuracy","altitudeAccuracy","heading","speed"];
  //    for (var i =0;i<properties.length;i++){
  //      var value = pos.coords[properties[i]];
  //      document.getElementById(properties[i]).innerHTML = value;
  //    }
  //    document.getElementById("timestamp").innerHTML = pos.timestamp;
  //    //var longitude = document.getElementById("longitude").innerHTML;
  //    //var latitude =  document.getElementById("latitude").innerHTML;
  //    //alert("经度:"+longitude+";纬度:"+latitude+";");
  //    //var map = new BMap.Map("allmap");
  //    //var point = new BMap.Point(longitude,latitude);
  //    //var gc = new BMap.Geocoder();
  //    //gc.getLocation(point, function(rs){
  //    //  var addComp = rs.addressComponents;
  //    //  alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
  //    //});
  //  },function(error){
  //    alert(JSON.parse(error));
  //  },{
  //    enableHighAccuracy: true, // 是否获取高精度结果
  //    timeout: 5000, //超时,毫秒
  //    maximumAge: 0 //可以接受多少毫秒的缓存位置
  //  });
  //
  //}else{
  //  alert('抱歉！您的浏览器无法使用地位功能');
  //}


  $("#hft_ori").click(function(){
    VM.Load("hft_ori");
  });

  $("#hft_des").click(function(){
    VM.Load("hft_des");
  });
  $("#hf_ori").click(function(){
    VM.Load("hf_ori");
  });

  $("#hf_des").click(function(){
    VM.Load("hf_des");
  });

  $("#t_des").click(function(){
    VM.Load("t_des");
  });

  $("#ht_des").click(function(){
    VM.Load("ht_des");
  });

  $("#f_inori").click(function(){
    VM.Load("f_inori");
  });

  $("#f_indes").click(function(){
    VM.Load("f_indes");
  });

  $("#f_outori").click(function(){
    VM.Load("f_outori");
  });

  $("#f_outdes").click(function(){
    VM.Load("f_outdes");
  });

  $("#h_in").click(function(){
    VM.Load("h_in");
  });

  $("#h_out").click(function(){
    VM.Load("h_out");
  });
})();
