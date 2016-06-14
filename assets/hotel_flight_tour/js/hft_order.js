var hftTool ={
  resetMonth:function () {
  var array = [], arg = arguments[0];
  array = arg.split('-');
  array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
  array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
  return array[1] + '月' + array[2] + '日';
},
  resetSession:function() {
   var dataStr = arguments[0],result = "";
   switch (dataStr) {
     case "0":
       result = "上午";
       break;
     case "1":
       result = "下午";
       break;
     case "2":
       result = "晚上";
       break;
     case "3":
       result = "全天";
       break;
     case "4":
       result = "全天";
       break;
     default :
       void (0);
   }
   return result;
 }
}
;(function () {
  "use strict";
  //加载动画
  function package_detail() {

    $(window).load(function () {
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
    });
  };
  package_detail();
  var hftFlightHotelTourInfo=JSON.parse(sessionStorage.hftFlightHotelTourInfo);
  console.log(hftFlightHotelTourInfo);
  var hftCreateOrderPara=JSON.parse(sessionStorage.hftCreateOrderPara);
  hftCreateOrderPara.hotelName=hftFlightHotelTourInfo.hotelInfo.hotelName;
  hftCreateOrderPara.hotelNameLocale=hftFlightHotelTourInfo.hotelInfo.hotelNameLocale;
  var freetype=vlm.getpara('type');
  //返回资源选择页
  $('#hftFreeBack').click(function(){
      window.location.href='../hotel_flight_tour/hft_choose.html?'+ window.location.search;
  });
  //初始化
  function init() {
    //机票详情
    var flightstr=$('#orderFlight').html();
    var flightdet = ejs.render(flightstr , hftFlightHotelTourInfo)
    $('#flightCirTab').html(flightdet);
    //酒店详情
    var hotelstr=$('#orderHotel').html();
    console.log(hftCreateOrderPara)
    var hoteldet = ejs.render(hotelstr, hftCreateOrderPara)
    $('#hftHotelTab').html(hoteldet);

    //费用明细
    var farestr=$('#orderFare').html();
    var faredet = ejs.render(farestr, hftCreateOrderPara)
    $('#fareDetail').html(faredet);

    //总价
    var totamountnum='￥'+hftCreateOrderPara.totalPrice;
    $('.num1 >i').html(totamountnum);

    //明细遮罩
    $('.hft_det_mask').on('click',function(){
      $('.hft_det_mask').hide();
      $('.detail_fale').removeClass('open');
      $('.hft_detail_fare').css('bottom','-8rem');
    })

    //明细showhide
    var fareFlag=true;
    $('.num_tip').on('click',function(){
      if(fareFlag){
        $('.hft_det_mask').show();
        $('.detail_fale').addClass('open');
        $('.hft_detail_fare').css('bottom','.98rem');
        fareFlag=false;
      }else{
        $('.hft_det_mask').hide();
        $('.detail_fale').removeClass('open');
        $('.hft_detail_fare').css('bottom','-8rem');
        fareFlag=true;
      }
    });

    //出行人明细
    function travelDet(){
      var traAdu={};
      var traChi={};
      var room=hftCreateOrderPara.roomDetails;
      var traAdultnum=0;
      var traChildnum=0;
      for(var i=0;i<room.length; i++)
      {
        traAdultnum+=parseInt(room[i].adult);
        if(room[i].childWithOutBed)
        {
          traChildnum+=room[i].childWithOutBed.length;
        }
        if(room[i].childWithBed)
        {
          traChildnum+=room[i].childWithBed.length;
        }

      }
      if(traChildnum == 0){
        $('.order_tsl2 b').remove();
      }
      $('.chi_tot').html(traChildnum);
      $('.adu_tot').html(traAdultnum);
      var obj={};
      obj.adunum=traAdultnum;
      obj.chinum=traChildnum;
      return obj;
    }



    travelDet();
    var hft_peotot=travelDet();
    window.localStorage.hft_peotot=(hft_peotot.adunum+hft_peotot.chinum);
    window.localStorage.hft_adunum=hft_peotot.adunum;
    window.localStorage.hft_chinum=hft_peotot.chinum;

    /*添加出行人*/
    $(document).on('click','.add_traveller',function(){
      $("#status").show().fadeOut();
      $("#preloader").show().delay(400).fadeOut("medium");
      vlm.f_choice('orderTraveller', 'fx', 'traver', '', true, true, hft_peotot.adunum, hft_peotot.chinum, null, hftFlightHotelTourInfo.flightInfo.flightLeaveStartDate,false,false,"callback");
    });

    if(freetype == 2){
      //景点详情
      var tourstr=$('#orderTour').html();
      var tourdet = ejs.render(tourstr, hftCreateOrderPara)
      $('#hftTourTab').html(tourdet);

    }else if(freetype == 1){
      $('.tour_section').remove();

    }else{

      jAlert('资源选择页url:type=undefined');
    }

  }
  init();


//下单
  var orderSub=document.querySelector('.order_submit');
  function hf_order(obj){
    obj.onclick=function(){
      var Parmeters = {
        "Parameters": {
          "cityCodeFrom": hftCreateOrderPara.cityCodeFrom,
          "cityCodeTo": hftCreateOrderPara.cityCodeTo,
          "packageID": hftCreateOrderPara.packageID,
          "departDate": hftCreateOrderPara.departDate,
          "returnDate": hftCreateOrderPara.returnDate,
          "setID": hftCreateOrderPara.setID,
          "cacheID": hftCreateOrderPara.cacheID,
          "hotelID": hftCreateOrderPara.hotelID,
          "roomID": hftCreateOrderPara.roomID,

          "contactDetail": {
            "sexCode": "Ms",
            "firstName": $('.hft_con_firstname').val(),
            "lastName": $('.hft_con_lastname').val(),
            "email": $('.hft_con_email').val(),
            "countryNumber": $('.tel-btn span').html().substring(1),
            "mobilePhone": $('.hft_con_cell').val()
          },
          //"tours":[
          //  {
          //    "tourID":hftFlightHotelTourInfo.tours.tourID,
          //    "travelDate":"2016-05-25T00:00:00",
          //    "tourSession":"MorningTour"
          //  }
          //],
          "currencyCode": hftCreateOrderPara.currencyCode,
          "totalPrice": hftCreateOrderPara.totalPrice,
          //"track": {
          //  "browserType":"Chrome",
          //  "deviceID":"111"
          //},
          "memberID": localStorage.memberid,
        }
      }

      if(freetype == 2){
        //追踪信息
        Parmeters.Parameters.track=hftCreateOrderPara.track;
        //景点信息
        console.log(hftCreateOrderPara)
        console.log(hftFlightHotelTourInfo)
        var tours=[]; /*请求景点的参数*/
        for(var i=0;i<hftCreateOrderPara.tours.length; i++){
          var scenic={},sceWrap=hftCreateOrderPara.tours[i];
          scenic.tourID=sceWrap.tourID;
          scenic.travelDate =null;
          scenic.tourSession=null;
          if(sceWrap.tourType!="1"){
            scenic.travelDate =sceWrap.travelDate;
            scenic.tourSession = sceWrap.enumvalue;
          }
          tours.push(scenic);
        }
        Parmeters.Parameters.tours=tours;
        //hft请求码
        Parmeters.foreEndType = 3;
        Parmeters.code = 60100010;
      }else{
        //hf请求码
        Parmeters.Parameters.track={
          "browserType": "",
           "deviceID": vlm.getDeviceID()
        };
        Parmeters.foreEndType = 3;
        Parmeters.code = 50100004;
      }
      //房间信息
      Parmeters.Parameters.RoomDetails=hftCreateOrderPara.roomDetails;

      var birthDay=[];//重新计算小孩年龄
      for(var i=0;i<=Parmeters.Parameters.RoomDetails.length-1;i++){

        if(Parmeters.Parameters.RoomDetails[i].hasOwnProperty("childWithOutBed")) {
          for (var j = 0; j <= Parmeters.Parameters.RoomDetails[i].childWithOutBed.length - 1; j++) {
            var b = getBirthday(hftCreateOrderPara.departDate, Parmeters.Parameters.RoomDetails[i].childWithOutBed[j])
            birthDay.push({
                birth: b,
                age: Parmeters.Parameters.RoomDetails[i].childWithOutBed[j]
              }
            )
          }
        }
        if(Parmeters.Parameters.RoomDetails[i].hasOwnProperty("childWithBed")) {
          for(var j=0; j<=Parmeters.Parameters.RoomDetails[i].childWithBed.length-1;j++) {
            var b = getBirthday(hftCreateOrderPara.departDate, Parmeters.Parameters.RoomDetails[i].childWithBed[j])
            birthDay.push({
                birth: b,
                age: Parmeters.Parameters.RoomDetails[i].childWithBed[j]
              }
            )
          }
          }
      }
      //出行人
      var traveller=[];
      if(localStorage.travellerInfo_selected){
        var traInfo_sel=JSON.parse(localStorage.travellerInfo_selected);
        for(var i=0;i<traInfo_sel.length; i++)
        {
          var tra={};
          var person={};

          var age=vlm.Utils.getAge(traInfo_sel[i].DateOfBirth);
          if(age<=12){
            var tempAge=birthDay.pop();
            if(age !=tempAge.age) {
              person.dateOfBirth =tempAge.birth ;
            }
            else{
              person.dateOfBirth=traInfo_sel[i].DateOfBirth;
            }
          }
          else{
            person.dateOfBirth=traInfo_sel[i].DateOfBirth;
          }

          person.firstName=traInfo_sel[i].FirstName;
          person.lastName=traInfo_sel[i].LastName;
          person.passengerType=traInfo_sel[i].PassengerType;
          tra.idNumber=traInfo_sel[i].CertificateInfo.IdNumber;
          tra.idCountry=traInfo_sel[i].CertificateInfo.IdCountry;
          tra.idType=traInfo_sel[i].CertificateInfo.IdType;
          tra.idActivatedDate=traInfo_sel[i].CertificateInfo.IdActivatedDate;
          person.certificateInfo=tra;
          person.sexCode=traInfo_sel[i].SexCode;
          person.countryCode=traInfo_sel[i].CountryCode;
          traveller.push(person);
        }
        Parmeters.Parameters.travellerInfo=traveller;
      }


      if( $('.order_tlist2:visible').length != localStorage.hft_peotot){
        jAlert('请添加出行人');
        return;
      }
      //联系人姓名检验
      var inputlast=$('.hft_con_lastname');
      if(! vlm.Utils.validate.engName(inputlast.val())){
        jAlert('请您输入英文的联系人姓');
        return;
      }
      var inputfir=$('.hft_con_firstname');
      if(! vlm.Utils.validate.engName(inputfir.val())){
        jAlert('请您输入英文的联系人名');
        return;
      }
      // 手机号邮箱检验
      var oMobile = $('.hft_con_cell')[0].value;
      var oEmail = $('.hft_con_email')[0].value;

      if ( ! vlm.Utils.validate.mobileNo(oMobile) )
      {
        jAlert('请输入正确的手机号');
        return;
      }
      if ( ! vlm.Utils.validate.email(oEmail) )
      {
        jAlert('请输入正确的邮箱');
        return;
      }

      console.log(Parmeters);
      vlm.loading();
      vlm.loadJson(vlm.apiWithDeviceID, JSON.stringify(Parmeters), hotel_flight_back);
    };
  }

  function getBirthday(departDate,age){
    var newDate = new Date(departDate.replace('-', "/").replace('-', "/").replace('T', " "));
    newDate.setFullYear(newDate.getFullYear()-age);
    var year=newDate.getFullYear();
    var month=newDate.getMonth()+1;
    var day=newDate.getDate();
    return year+"-"+month+"-"+day;
  }
  hf_order(orderSub);

  //下单回调函数
  function hotel_flight_back(ret){
    var json=ret;
    console.log(json);
    vlm.loadend();
    if(json.success)
    {
       console.log(json.data.bookingRefNo)
      if( freetype == 2 ){
        window.location.href='../payment/payment.html?bookingRefNo='+json.data.bookingRefNo+"&type=FlightHotelTour";
      }else{
        window.location.href='../payment/payment.html?bookingRefNo='+json.data.bookingRefNo+"&type=FlightHotle";
      }
    }else{
      jAlert(json.message);
    }
  }
})();


