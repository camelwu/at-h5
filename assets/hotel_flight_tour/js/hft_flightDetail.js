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
    tempStr = $("#template").html();
    outputStr = ejs.render(tempStr,data);
    $(".all_elements").eq(0).html(outputStr);
    return that;
  },

  addEvent:function(){
    var iconBack =  document.querySelector('.icon_back');
    this.addHandler(iconBack, 'click', function () {
      window.history.go(-1);
    });
  },

  init:function(){
    var flightData = null, storage = window.sessionStorage;
    flightData = JSON.parse(storage.getItem('hftFlightHotelTourInfo'));
    this.createTags(flightData);
    //this.addEvent();
  }
};

hftFlightDetail.init();
