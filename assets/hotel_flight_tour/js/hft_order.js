/**
 * Created by qzz on 2016/5/4.
 */

(function () {

  //加载动画
  function package_detail() {

    $(window).load(function () {
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
    });
  };
  package_detail();
  //初始化


})();

