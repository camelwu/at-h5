
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
  //初始化
  var hftFlightHotelTourInfo=JSON.parse(localStorage.hftFlightHotelTourInfo);
  console.log(hftFlightHotelTourInfo);

  var hftCreateOrderPara=JSON.parse(localStorage.hftCreateOrderPara);
  hftCreateOrderPara.hotelName=hftFlightHotelTourInfo.hotelInfo.hotelName;
  console.log(hftCreateOrderPara);

  function init() {
    //机票详情
    var flightstr=$('#orderFlight').html();
    var flightdet = ejs.render(flightstr , hftFlightHotelTourInfo)
    $('#flightCirTab').html(flightdet);

    //酒店详情
    var hotelstr=$('#orderHotel').html();
    var hoteldet = ejs.render(hotelstr, hftCreateOrderPara)
    $('#hftHotelTab').html(hoteldet);

    //景点详情
    var tourstr=$('#orderTour').html();
    var tourdet = ejs.render(tourstr, hftFlightHotelTourInfo)
    $('#hftTourTab').html(tourdet);

    //费用明细
    var farestr=$('#orderFare').html();
    var faredet = ejs.render(farestr, hftCreateOrderPara)
    $('#fareDetail').html(faredet);

    //总价
    var totamountnum='￥'+hftCreateOrderPara.TotalPrice;
    $('.num1 >i').html(totamountnum);

    //明细遮罩
    $('.hft_det_mask').on('click',function(){
      $('.hft_det_mask').hide();
      $('.detail_fale').removeClass('open');
      $('.hft_detail_fare').css('bottom','-3rem');
    })

    //明细showhide
    var fareFlag=true;
    $('.detail_fale').on('click',function(){
      if(fareFlag){
        $('.hft_det_mask').show();
        $('.detail_fale').addClass('open');
        $('.hft_detail_fare').css('bottom','.98rem');
        fareFlag=false;
      }else{
        $('.hft_det_mask').hide();
        $('.detail_fale').removeClass('open');
        $('.hft_detail_fare').css('bottom','-3rem');
        fareFlag=true;
      }
    });

    //出行人明细
    function travelDet(){
      var traAdu={};
      var traChi={};
      var room=hftCreateOrderPara.RoomDetails;
      var traAdultnum=0;
      var traChildnum=0;
      for(var i=0;i<room.length; i++)
      {
        traAdultnum+=parseInt(room[i].Adult);
        if(room[i].ChildWithoutBed)
        {
          traChildnum+=room[i].ChildWithoutBed.length;
        }
        if(room[i].ChildWithBed)
        {
          traChildnum+=room[i].ChildWithBed.length;
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
          "SetID": hftCreateOrderPara.SetID,
          "CacheID": hftCreateOrderPara.CacheID,
          "CityCodeFrom": hftCreateOrderPara.CityCodeFrom,
          "CityCodeTo": hftCreateOrderPara.CityCodeTo,
          "DepartDate": hftCreateOrderPara.DepartDate,
          "ReturnDate": hftCreateOrderPara.ReturnDate,
          "HotelID": hftCreateOrderPara.HotelID,
          "RoomID": hftCreateOrderPara.RoomID,
          "MemberId": localStorage.memberid,

          "ContactDetail": {
            "SexCode": "Ms",
            "FirstName": $('.hft_con_firstname').val(),
            "LastName": $('.hft_con_lastname').val(),
            "Email": $('.hft_con_email').val(),
            "CountryNumber": $('.tel-btn span').html().substring(1),
            "MobilePhone": $('.hft_con_cell').val()
          },
          "CurrencyCode": hftCreateOrderPara.CurrencyCode,
          "TotalPrice": hftCreateOrderPara.TotalPrice
        },
        "ForeEndType": 3,
        "Code": "50100004"
      }

      //房间信息
      Parmeters.Parameters.RoomDetails=hftCreateOrderPara.RoomDetails;

      //出行人
      var traveller=[];
      if(localStorage.travellerInfo_selected){
        var traInfo_sel=JSON.parse(localStorage.travellerInfo_selected);
        for(var i=0;i<traInfo_sel.length; i++)
        {
          var tra={};
          var person={};
          person.FirstName=traInfo_sel[i].FirstName;
          person.LastName=traInfo_sel[i].LastName;
          person.PassengerType=traInfo_sel[i].PassengerType;
          person.DateOfBirth=traInfo_sel[i].DateOfBirth;
          tra.IdNumber=traInfo_sel[i].CertificateInfo.IdNumber;
          tra.IdCountry=traInfo_sel[i].CertificateInfo.IdCountry;
          tra.idType=traInfo_sel[i].CertificateInfo.IdType;
          tra.IdActivatedDate=traInfo_sel[i].CertificateInfo.IdActivatedDate;
          person.CertificateInfo=tra;
          person.SexCode=traInfo_sel[i].SexCode;
          person.CountryCode=traInfo_sel[i].CountryCode;
          traveller.push(person);
        }
        Parmeters.Parameters.TravellerInfo=traveller;
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
      vlm.loadJson("", JSON.stringify(Parmeters), hotel_flight_back);
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
      window.location.href='../payment/payment.html?bookingRefNo='+json.data.bookingRefNo+"&type=FlightHotle";
    }else{
      jAlert(json.message);
    }
  }













})();

