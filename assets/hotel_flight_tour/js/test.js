/**
 * Created by qzz on 2016/5/4.
 */
define(['jquery'],function ($){
  debugger;
  var init=function(){

    alert("test");

  }
  var package_detail = function (){
    $(window).load(function () {
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
      alert("test");
    });
  };
  return {
    package_detail: package_detail,
    init:_init
  };
});

