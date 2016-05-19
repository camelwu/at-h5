
(function () {
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
  console.log(hftCreateOrderPara);

  var freetype=vlm.getpara('type');

  //初始化
  function init() {

    if(freetype == 2){

      //景点详情
      var tourstr=$('#orderTour').html();
      var tourdet = ejs.render(tourstr, hftFlightHotelTourInfo)
      $('#hftTourTab').html(tourdet);

    }else if(freetype == 1){

      $('.tour_section').remove();

    }else{
      alert('上一步是type=undefined');
    }

    //机票详情
    var flightstr=$('#orderFlight').html();
    var flightdet = ejs.render(flightstr , hftFlightHotelTourInfo)
    $('#flightCirTab').html(flightdet);

    //酒店详情
    var hotelstr=$('#orderHotel').html();
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
      vlm.f_choice('orderTraveller', 'f', 'traver', '', true, true, hft_peotot.adunum, hft_peotot.chinum, null, hftFlightHotelTourInfo.flightInfo.flightLeaveStartDate);
    });

  }
  init();


//下单
  var orderSub=document.querySelector('.order_submit');
  function hf_order(obj){
    obj.onclick=function(){

      var Parmeters = {
        "Parameters": {
          "cityCodeFrom": hftCreateOrderPara.cityCodeFrom,
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
        },
        "foreEndType": 2,
        "code": "60100010"
      }

      if(freetype == 2){

        //追踪信息
        Parmeters.Parameters.track=hftCreateOrderPara.track;

        //景点信息
        var tours=[];
        for(var i=0;i<hftFlightHotelTourInfo.tours.length; i++)
        {
          var sceWrap=hftFlightHotelTourInfo.tours[i];
          var scenic={};
          scenic.tourID=sceWrap.tourID;
          scenic.travelDate=sceWrap.travelDates[0];
          var sceArr=[];
          for(var j=0; j<sceWrap.tourSessions.length; j++)
          {
            var session={};
            if( sceWrap.tourSessions[j].isSelected == 1){
              session.tourSession=sceWrap.tourSessions[j].tourSessionName;
            }
            sceArr.push(session);
          }
          scenic.tourSession=sceArr[0].tourSession;
          tours.push(scenic);
        }
        Parmeters.Parameters.tours=tours;

        //hft请求码
        Parmeters.foreEndType = 2;
        Parmeters.code = 60100010;
      }else{
        //hf请求码
        Parmeters.foreEndType = 3;
        Parmeters.code = 50100004;
      }


      //房间信息
      Parmeters.Parameters.RoomDetails=hftCreateOrderPara.roomDetails;

      //出行人
      var traveller=[];
      if(localStorage.travellerInfo_selected){
        var traInfo_sel=JSON.parse(localStorage.travellerInfo_selected);
        for(var i=0;i<traInfo_sel.length; i++)
        {
          var tra={};
          var person={};
          person.firstName=traInfo_sel[i].FirstName;
          person.lastName=traInfo_sel[i].LastName;
          person.passengerType=traInfo_sel[i].PassengerType;
          person.dateOfBirth=traInfo_sel[i].DateOfBirth;
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


      if( $('.order_tlist2').length != localStorage.hft_peotot){
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
  hf_order(orderSub);

  //下单回调函数
  function hotel_flight_back(ret){
    var json=ret;
    console.log(json);
    vlm.loadend();
    if(json.success)
    {
      window.location.href='../payment/payment.html?bookingRefNo='+json.data.bookingRefNo+"&type=FlightHotelTour";
    }else{
      jAlert(json.message);
    }
  }

})();

