
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
  var hftFlightHotelTourInfo=JSON.parse(sessionStorage.hftFlightHotelTourInfo);
  console.log(hftFlightHotelTourInfo);

  var hftCreateOrderPara=JSON.parse(sessionStorage.hftCreateOrderPara);
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

    //总价
    var totamountnum='￥'+hftCreateOrderPara.TotalPrice;
    $('.num1 >i').html(totamountnum);

    //费用明细
    var farestr=$('#orderFare').html();
    var faredet = ejs.render(farestr, hftCreateOrderPara)
    $('#fareDetail').html(faredet);

    //明细遮罩
    $('.hft_det_mask').on('click',function(){
      $('.hft_det_mask').hide();
      $('.detail_fale').removeClass('open');
      $('.hft_detail_fare').css('bottom','-49px');
    })

    //明细showhide
    $('.detail_fale').on('click',function(){
      if($('.hft_detail_fare').css('bottom') == '-150px')
      {
        $('.hft_det_mask').show();
        $('.detail_fale').addClass('open');
        $('.hft_detail_fare').css('bottom','49px');
      }else{
        $('.hft_det_mask').hide();
        $('.detail_fale').removeClass('open');
        $('.hft_detail_fare').css('bottom','-150px');
      }
    });

  }
  init();


//下单
  var orderSub=document.querySelector('.order_submit');
  function hf_order(obj){
    obj.onclick=function(){

      var Parmeters = {
        "Parameters": {
          "SetID": datahot.SetID,
          "CacheID": datahot.CacheID,
          "CityCodeFrom": datahot.CityCodeFrom,
          "CityCodeTo": datahot.CityCodeTo,
          "DepartDate": datahot.DepartDate,
          "ReturnDate": datahot.ReturnDate,
          "HotelID": datahot.HotelID,
          "RoomID": datahot.RoomID,
          "MemberId": localStorage.memberid,

          "ContactDetail": {
            "SexCode": "Ms",
            "FirstName": $('.hf_con_firstname').val(),
            "LastName": $('.hf_con_lastname').val(),
            "Email": $('.hf_con_email').val(),
            "CountryNumber": $('.tel-btn span').html().substring(1),
            "MobilePhone": $('.hf_con_cell').val()
          },
          "CurrencyCode": datahot.CurrencyCode,
          "TotalPrice": datahot.priceDetail.totalAmount
        },
        "ForeEndType": 3,
        "Code": "50100004"
      }

      //房间信息
      Parmeters.Parameters.RoomDetails=datahot.RoomDetails;

      //出行人
      var traveller=[];
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

      if( $('.order-tlist2').length != window.localStorage.peotot){
        jAlert('请添加出行人');
        return;
      }
      //联系人姓名检验
      var inputlast=$('.hf_con_lastname');
      if(! vlm.Utils.validate.engName(inputlast.val())){
        jAlert('请您输入英文的联系人姓');
        return;
      }
      var inputfir=$('.hf_con_firstname');
      if(! vlm.Utils.validate.engName(inputfir.val())){
        jAlert('请您输入英文的联系人名');
        return;
      }
      // 手机号邮箱检验
      var oMobile = $('.hf_con_cell')[0].value;
      var oEmail = $('.hf_con_email')[0].value;

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

