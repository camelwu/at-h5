/**
 * Created by zhouwei on 2016/5/4.
 */
define(['jquery',"ejs","vlm"],function (){

  /*支付模块（酒店，机票，景点，酒+景，机+酒）*/
  var _bussinessType= {
    "Hotle":{id: 1, name: "酒店", detailCode: "0013", payMentCode: "0012",tplKey:"tpl_h"},
    "Flight":{id: 2, name: "机票", detailCode: "3006", payMentCode: "3004" ,tplKey:"tpl_f"},
    "Scenic":{id: 3, name: "景点", detailCode: "0095", payMentCode: "0093",tplKey:"tpl_t" },
    "Tour":{id: 4, name: "酒+景", detailCode: "40100006", payMentCode: "0203",tplKey:"tpl_ht"},
    "FlightHotle":{id: 5, name: "机+酒", detailCode: "50100007", payMentCode: "50100005",tplKey:"tpl_fh"},
    "FlightHotelTour":{id: 6, name: "机+酒+景", detailCode: "60100013", payMentCode: "60100011",tplKey:"tpl_fht"}
  };


  var bindEvent=function(){
    var hft_flightDetail=$(".fht_hd"),fare_tip= $('.fare_tip').parent(),hft_pri_details=$(".hft_pri_details")
    //hft_flightDetail.on("click",function(){
    //  window.location.href="hft_flightDetail.html";
    //})

    //折叠订单价格
    fare_tip.toggle(function(){
      $('.hft_pri_details').hide();
    },function(){
      hft_pri_details.show();
      $('.all_elements').scrollTop($('.all_elements').height());
    })

    $(".cancelOrder").on("click",function(){
        var Parameters = {
          "Parameters":{"BookingReferenceNo":bookingRefNo},
          "Code":"0017",
          "ForeEndType":3
        };
        console.log(Parameters);
        jConfirm('是否取消订单?', '提示', function(status){
          if(status == true){
            vlm.loadJson("",JSON.stringify(Parameters),function(json){
              if(json.success) {
                window.location.reload();
              }
              else{
                jAlert("取消失败！");
              }
            });
          }
        }, '确定', '取消');
      })

    //拨号
    $(".tel_tip").on("click", function(){
      $(".jpop_box_tic").show();
    })
    $('.jpop_box_tic span,.jpop_box_tic a').click(function(){
      $('.jpop_box_tic').hide();
    })

  }

  var init = function () {

    //获取Url参数
    type = _bussinessType[vlm.getpara("type")];//业务类型（1酒店，2机票，3景点，4酒+景，5机+景）
    bookingRefNo = vlm.getpara("bookingRefNo");//订单code
    var pare,html;

    if (type.id == 1) {
      para = {
        "Parameters": {"bookingReferenceNo": bookingRefNo},
        "ForeEndType": 3,
        "Code": type.detailCode
      };
    }
    else {
        para = {
          "Parameters": {"BookingRefNo": bookingRefNo},
          "ForeEndType": 3,
          "Code": type.detailCode
        };
    }
    vlm.loadJson("", JSON.stringify(para),function(data){
      //var data={"flightInfo":{"segmentsLeaveTotalTravelTimeString":"4h25m","segmentsReturnTotalTravelTimeString":"4h20m","cityCodeFrom":"BKK","cityCodeTo":"SIN","cityNameFrom":"曼谷","cityNameTo":"新加坡","isLeaveShareFlight":0,"isReturnShareFlight":0,"isInternationalFlight":1,"cabinClass":0,"flightLeaveStartDate":"2016-05-24T06:00:00","flightLeaveEndDate":"2016-05-24T11:25:00","flightReturnStartDate":"2016-05-28T15:35:00","flightReturnEndDate":"2016-05-28T18:55:00","flightLeaveSpacingDay":0,"flightReturnSpacingDay":0,"transferListLeave":null,"transferListReturn":null,"directFlight":1,"segmentsLeave":[{"airportCodeFrom":"BKK","airportCodeTo":"KUL","cityCodeFrom":"BKK","cityCodeTo":"KUL","airportNameFrom":"曼谷苏瓦纳蓬国际机场","airportNameTo":"吉隆坡国际机场","cityNameFrom":"曼谷","cityNameTo":"曼谷","airCorpCode":"MH","airCorpName":"马来西亚航空公司","cabinClass":0,"flightNo":"797","departDate":"2016-05-24T06:00:00","arriveDate":"2016-05-24T09:10:00","spacingDay":0,"timeSpan":"3h10m","planeType":"738","planeName":"波音737-800","marketingCarrierCode":"MH","operatingCarrierCode":"MH","operatingCarrierName":"马来西亚航空公司","termArrive":"","termDepart":""},{"airportCodeFrom":"KUL","airportCodeTo":"SIN","cityCodeFrom":"KUL","cityCodeTo":"SIN","airportNameFrom":"吉隆坡国际机场","airportNameTo":"新加坡樟宜机场","cityNameFrom":"吉隆坡","cityNameTo":"吉隆坡","airCorpCode":"MH","airCorpName":"马来西亚航空公司","cabinClass":0,"flightNo":"627","departDate":"2016-05-24T10:15:00","arriveDate":"2016-05-24T11:25:00","spacingDay":0,"timeSpan":"1h10m","planeType":"738","planeName":"波音737-800","marketingCarrierCode":"MH","operatingCarrierCode":"MH","operatingCarrierName":"马来西亚航空公司","termArrive":"","termDepart":""}],"segmentsReturn":[{"airportCodeFrom":"SIN","airportCodeTo":"KUL","cityCodeFrom":"SIN","cityCodeTo":"KUL","airportNameFrom":"新加坡樟宜机场","airportNameTo":"吉隆坡国际机场","cityNameFrom":"新加坡","cityNameTo":"新加坡","airCorpCode":"MH","airCorpName":"马来西亚航空公司","cabinClass":0,"flightNo":"624","departDate":"2016-05-28T15:35:00","arriveDate":"2016-05-28T16:45:00","spacingDay":0,"timeSpan":"1h10m","planeType":"738","planeName":"波音737-800","marketingCarrierCode":"MH","operatingCarrierCode":"MH","operatingCarrierName":"马来西亚航空公司","termArrive":"","termDepart":""},{"airportCodeFrom":"KUL","airportCodeTo":"BKK","cityCodeFrom":"KUL","cityCodeTo":"BKK","airportNameFrom":"吉隆坡国际机场","airportNameTo":"曼谷苏瓦纳蓬国际机场","cityNameFrom":"吉隆坡","cityNameTo":"吉隆坡","airCorpCode":"MH","airCorpName":"马来西亚航空公司","cabinClass":0,"flightNo":"780","departDate":"2016-05-28T17:50:00","arriveDate":"2016-05-28T18:55:00","spacingDay":0,"timeSpan":"1h5m","planeType":"738","planeName":"波音737-800","marketingCarrierCode":"MH","operatingCarrierCode":"MH","operatingCarrierName":"马来西亚航空公司","termArrive":"","termDepart":""}],"additionalPrice":0.0},"currencyCode":"CNY","totalFlightPrice":10876.0,"createTime":"2016-05-09T17:26:00","isContinuePay":1,"bookingRefNo":"TH05BKKFP0024276","travelers":[{"travelerName":"fr1","lastName":"111","idType":1,"idNumber":"123"},{"travelerName":"ddd","lastName":"2222","idType":1,"idNumber":"895333"}],"contactNumber":"86--12385692356","email":"1111","sexCode":2,"firstName":"111","lastName":"111","hotelDetails":{"hotelName":"Hotel Grand Pacific","checkInDate":"2016-05-24T00:00:00","checkoutDate":"2016-05-28T00:00:00","roomDetials":{"roomName":"Deluxe Room","totalAdult":2,"totalAdultPrice":10876.0,"unitAdultPrice":5438.0,"totalChild":0,"totalChildPrice":0.0,"unitChildPrice":0.0,"numRoom":1}},"tours":[{"tourID":166,"tourName":"机场接送服务（ 拼车）","travelDate":"0001-01-01T00:00:00"},{"tourID":2434,"tourName":"**马来西亚乐高乐园电子门票(SIN)","travelDate":"2016-05-25T00:00:00"},{"tourID":200,"tourName":"新加坡环球影城®","travelDate":"2016-05-25T00:00:00"}]}
      if (data.success) {
        if(type.id == 1){
           html = ejs.render($("#"+type.tplKey).html(), data.data[0]);
        }
        else{
           html = ejs.render($("#"+type.tplKey).html(), data.data);
        }

        $("#order_detail").html(html);
        bindEvent();
      }
      else{
        alert("接口错误！");
      }
    });
  };
  return {
    init: init
  };
});



