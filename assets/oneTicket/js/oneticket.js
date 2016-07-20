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
    function send_req_tab(tmp){

      //console.log(Parmeters);
      vlm.loadJson("", JSON.stringify(tmp), saleList_back);

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
    send_req_tab(Parmeters);

    //Tab切换
    $('.one_select >li').on('click', function () {
      var one_index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      send_req_tab(Parmeters);
      switch (one_index) {
        case 0:
          $('.shortexhibition').attr('src','../../images/oneticket/great_sale.png');
          $('.one_sale_cont').css('backgroundColor','#fed81d');
          $('.one_foot').css('backgroundColor','#fed81d');
          break;
        case 1:
          $('.shortexhibition').attr('src','../../images/oneticket/child_all.png');
          $('.one_sale_cont').css('backgroundColor','#7bc300');
          $('.one_foot').css('backgroundColor','#7bc300');
          break;
        case 2:
          $('.shortexhibition').attr('src','../../images/oneticket/bestie.png');
          $('.one_sale_cont').css('backgroundColor','#65ebe0');
          $('.one_foot').css('backgroundColor','#65ebe0');
          break;
        case 3:
          $('.shortexhibition').attr('src','../../images/oneticket/lovers.png');
          $('.one_sale_cont').css('backgroundColor','#4ad1ef');
          $('.one_foot').css('backgroundColor','#4ad1ef');
          break;
      }


    });

  }

  init();

  //默认图片
  function def_img() {
    //默认图片
    var images = $("#one_sale_cont").find('img');
    var error_url = '../../images/hotelDetailerrorpic.png';
    for (var i = 0; i < images.length; i++) {
      (function (index) {
        var re_url = images[i].getAttribute('data-src');
        loadImage(re_url, error_url, function () {
          images[index].setAttribute('src', re_url);

        }, function () {
          images[index].setAttribute('src', error_url);
        });

        function loadImage(url, error_url, callback, errorFunc) {
          var img = new Image();
          img.src = url;
          img.onload = function () {
            img.onload = null;
            callback();
          };
          img.onerror = function () {
            img.onerror = null;
            errorFunc();
          }
        }
      })(i);
    }
  }


})();
