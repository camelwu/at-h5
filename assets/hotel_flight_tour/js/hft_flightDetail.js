/*支付模块（酒店，机票，景点，酒+景，机+酒）*/
var _bussinessType= {
  "Hotle":{id: 1, name: "酒店", detailCode: "0013", payMentCode: "0012"},
  "Flight":{id: 2, name: "机票", detailCode: "3006", payMentCode: "3004"},
  "Scenic":{id: 3, name: "景点", detailCode: "0095", payMentCode: "0093"},
  "Tour":{id: 4, name: "酒+景", detailCode: "0095", payMentCode: "0203"},
  "FlightHotle":{id: 5, name: "机+酒", detailCode: "50100007", payMentCode: "50100005"},
  "FlightHotelTour":{id: 6, name: "机+酒+景", detailCode: "60100013", payMentCode: "60100011"}
};

var  hftFlightDetail = {
  addHandler: function (target, eventType, handle) {
    if (document.addEventListener) {
      this.addHandler = function (target, eventType, handle) {
        target.addEventListener(eventType, handle, false);
      }
    } else if (document.attachEvent) {
      this.addHandler = function (target, eventType, handle) {
        target.attachEvent('on' + eventType, function () {
          handle.call(target);
        });
      }
    } else {
      this.addHandler = function (target, eventType, handle) {
        target['on' + eventType] = handle;
      }
    }
    this.addHandler(target, eventType, handle);
  },
  setWeekItems:function(){
    var arg = arguments[0].replace(/T.*/,''), index = new Date(arg.replace(/-/g,'/')).getDay(), week='';
    switch (index){
      case 0 :
        week = '周日';
        break;
      case 1 :
        week = '周一';
        break;
      case 2 :
        week = '周二';
        break;
      case 3 :
        week = '周三';
        break;
      case 4 :
        week = '周四';
        break;
      case 5 :
        week = '周五';
        break;
      case 6 :
        week = '周六';
        break;
      default :void(0)
    }
    return week;
  },

  getMinutes:function (arg1, arg2) {
  var time1 = Date.parse(arg1.replace(/-/g, "/").replace(/T/," ")), time2 = Date.parse(arg2.replace(/-/g, "/").replace(/T/," ")), dayCount;
  return dayCount = (Math.abs(time2 - time1)) / 1000 / 60;
},

  returnDay: function () {
    var array = [], arg = arguments[0];
    if(!arg){return ""}
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
  },

  setChineseStar:function(){
    var strNumber = arguments[0].substr(0,1), resultNum='';
    switch (strNumber.charCodeAt(0)) {
      case 49:
        resultNum = '一星级';
        break;
      case 50:
        resultNum = '二星级';
        break;
      case 51:
        resultNum = '三星级';
        break;
      case 52:
        resultNum = '四星级';
        break;
      case 53:
        resultNum = '五星级';
        break;
      case 54:
        resultNum = '六星级';
        break;
      case 55:
        resultNum = '七星级';
        break;
      default:
        void (0);
    }
    return resultNum;
  },
  createTags:function(){
    var data = arguments[0], that = hftFlightDetail, tempStr="", outputStr="";
    console.log(data);
    tempStr = $("#template").html();
    outputStr = ejs.render(tempStr,data);
    $(".all_elements").eq(0).html(outputStr);
    that.addEvent();
    return that;
  },
  delayLoadImage : function() {
    var images = document.getElementsByTagName('img');
    var  loadImage = function(url, error_url,callback,errorFunc) {
      var img = new Image();
      img.src = url;
      img.onload = function() {
        img.onload = null;
        callback();
      };
      img.onerror = function(){
        img.onerror = null;
        errorFunc();
      }
    };
    images = Array.prototype.slice.call(images)
    images.forEach(function(array){
      var re_url = array.getAttribute('data-src'), error_url = "../images/loading_def_big.png";
      loadImage(re_url,error_url, function() {
        array.setAttribute('src', re_url);
      },function(){
        array.setAttribute('src', error_url);
      });
    });
    return this
  },

  addEvent:function(){
    var iconBack =  document.querySelector('.icon_back');
    this.addHandler(iconBack, 'click', function () {
      window.history.go(-1);
    });
  },

  init:function(){

    var bookingRefNo=vlm.getpara("bookingRefNo");//订单code
    //获取Url参数
    var type=_bussinessType[vlm.getpara("type")];//业务类型（1酒店，2机票，3景点，4酒+景，5机+景）
    if(bookingRefNo==undefined){
        var flightData = null, storage = window.sessionStorage;
        flightData = JSON.parse(storage.getItem('hftFlightHotelTourInfo'));
        this.createTags({flightInfo:flightData.flightInfo}).delayLoadImage();
        $("#status").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    }
    else{
       var para = {
          "Parameters": {"BookingRefNo": bookingRefNo},
          "ForeEndType": 3,
          "Code": type.detailCode
        };
      vlm.loadJson("", JSON.stringify(para),function(data){
        hftFlightDetail.createTags({flightInfo:data.data.flightInfo});
        $("#status").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
      })
    }
  }
};

hftFlightDetail.init();
