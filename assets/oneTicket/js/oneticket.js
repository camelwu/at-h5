/**
 * Created by qzz on 2016/7/13.
 */

(function () {
  "use strict";

  $(window).load(function () {
    $("#status").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");
  });

  $('.one_select >li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.one_travel_wrap >div').eq($(this).index()).addClass('on').siblings().removeClass('on');
  });

})();
