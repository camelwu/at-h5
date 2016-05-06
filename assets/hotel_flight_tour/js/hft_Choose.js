var  hftChoose = {
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

  addEvent:function(){
       var backI = document.querySelector('.top_info i'), changeFlight =  document.querySelector('.moreFlight'), that = this;
       var flightDetailI = document.querySelector('.flightDetailArrow i'), hotelDetailI =  document.querySelector('.hotelImgInfo i');
       var priceTotal = document.querySelector('.priceTotal i'), preserve =  document.querySelector('.preserve'),iconBack =  document.querySelector('.icon_back');
       var tourOuter = document.querySelector('.tourOuter'), chooseDateOuter=document.querySelector('.chooseDate'),priceDetailInfo=document.querySelector('.priceDetailInfo');
    this.addHandler(backI, 'click', function () {
      window.location.href = "index.html";
    });
    this.addHandler(iconBack, 'click', function () {
      window.history.go(-1);
    });
    /*this.addHandler(changeFlight, 'click', function () {
      window.location.href = "hft_flight_list.html";
    });*/

    this.addHandler(flightDetailI, 'click', function () {
      window.location.href = "hft_flightDetail.html";
    });

    this.addHandler(hotelDetailI, 'click', function () {
      window.location.href = "hft_hotel_detail.html";
    });

    this.addHandler(preserve, 'click', function () {
      window.location.href = "hft_order.html";
    });
    this.addHandler(tourOuter, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.tagName == "SPAN"){
        chooseDateOuter.style.display = "block";
      }
    });
    this.addHandler(chooseDateOuter, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement;
      if(target.innerHTML == "取消"){
        this.style.display = "none";
      }else if(target.innerHTML == "确定"){
        this.style.display = "none";
      }
    });
    this.addHandler(priceTotal, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, tem, temEle, shadowEle;
      if(target.tagName=="I"){
        tem = priceDetailInfo.style.display;
        shadowEle = document.querySelector('.shadow');
        console.log(tem)
        console.log(shadowEle.style.display)
        if(tem=="block"){
          tem="none";
          shadowEle.style.display ="none"
        }else{
          tem="block";
          shadowEle.className ="shadow";
          shadowEle.style.display ="block"
        }
      }
    });
  },
  init:function(){
    this.addEvent();
  }
};

hftChoose.init();
