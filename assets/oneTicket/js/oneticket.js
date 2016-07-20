/**
 * Created by qzz on 2016/7/13.
 */

(function () {
  "use strict";

  $(window).load(function () {
    $("#status").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");
  });

  function init() {
    var Parmeters = {
      "Parameters": {"Isinternational": true, "PageNo": 1, "PageSize": 10},
      "ForeEndType": 3,
      "Code": "80100004"
    }

    //console.log(Parmeters);
    vlm.loadJson("", JSON.stringify(Parmeters), saleList_back);

    function saleList_back(ret) {
      var json = ret;
      console.log(json);
      if (json.success) {
        //特卖模块
        var greatSaleData = json.data.hotScenicList;
        var greatSalestr = $('#greatSale').html();
        var greatSaleList = ejs.render(greatSalestr, {greatSaleData: greatSaleData})
        $('#one_sale_cont').html(greatSaleList);

        def_img();

      } else {
        jAlert(json.message);
      }
    }

  }

  init();

  //默认图片
  function def_img(){
    //默认图片
    var images = $("#one_sale_cont").find('img');
    var error_url = '../../images/hotelDetailerrorpic.png';
    for (var i = 0; i < images.length; i++) {
      (function(index) {
        var re_url = images[i].getAttribute('data-src');
        loadImage(re_url, error_url, function() {
          images[index].setAttribute('src', re_url);

        }, function() {
          images[index].setAttribute('src', error_url);
        });

        function loadImage(url, error_url, callback, errorFunc) {
          var img = new Image();
          img.src = url;
          img.onload = function() {
            img.onload = null;
            callback();
          };
          img.onerror = function() {
            img.onerror = null;
            errorFunc();
          }
        }
      })(i);
    }
  }

  //Tab切换
  $('.one_select >li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.one_travel_wrap >div').eq($(this).index()).addClass('on').siblings().removeClass('on');
  });


})();
