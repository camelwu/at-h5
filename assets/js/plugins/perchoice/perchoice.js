/**
 * Created by qzz on 2016/8/26.
 */

function Perchoice() {
  if (!arguments.length)
    return;
  if (jQuery) {
    this.init.apply(this, arguments);
  } else {
    alert("需要jQuery!");
  }
};
var agesArr, ages_child;
Perchoice.prototype = {

  constructor: Perchoice,

  init: function (options) {
    this.id = options.id;
    this.perArr = options.perArr;
    this.bindEvent(options.id, options.perArr);
  },

  // 绑定操作对象的事件
  bindEvent: function (id, perarr) {
    var that = this;
    $(id).on('click', function (e) {
      that.createPerPanel(perarr);
      that.removePanel(perarr);
      that.addMinus();
      if (e && e.stopPropagation) {
        //支持W3C的stopPropagation()方法
        e.stopPropagation();
      }
      else {
        //IE取消冒泡
        window.event.cancelBubble = true;
      }
    });
  },
  //创建面板
  createPerPanel: function (perarr) {
    var that = this;
    <!--选择房间人数-->
    var perPanel = [
      '<div class="header">' +
      '<a href="javascript:;" class="header_back" id="js_room_hide">' +
      '<i class="icon_back"></i>' +
      '</a>' +
      '<h3>入住人数选择</h3>' +
      '<div class="hotel_room_finish">完成</div>' +
      '</div>' +
      '<div class="content" id="rac_wrap">' +
      '<div id="room" class="content3 hotel_roomNum clearfix">' +
      '<div class="nav3-left fl">房间</div>' +
      '<div class="nav3-right hotel_roomNum_right fr">' +
      '<input type="text" id="count1" name="NumRoom" value="' + $(perarr[0]).html() + '" readonly data-min="1" data-max="10">' +
      '<i class="add hotel_roomNum_add " id="ho_i1"></i>' +
      '<i class="minus hotel_roomNum_reduce disable" id="ho_i2"></i>' +
      '</div>' +
      '</div>' +
      '<div id="people" class="content4 hotel_people">' +
      '<div class="nav4-center hotel_people_right">' +
      '<div class="nav4-centertop hotel_people_right_adult clearfix" id="nav4-centertop">' +
      '<span class="fl">成人</span>' +
      '<div class="fr adult_btn_wrap">' +
      '<input type="text" value="' + $(perarr[1]).html() + '" name="NumAdult" id="count2" readonly data-min="1" data-max="50">' +
      '<i class="add hotel_people_right_adult_add " id="ho_i7"></i>' +
      '<i class="minus hotel_people_right_adult_minus disable" id="ho_i6"></i>' +
      '</div>' +
      '</div>' +
      '<div class="nav4-centerbottom hotel_people_right_child clearfix" id="nav4-centerbottom">' +
      '<span class="fl">儿童</span>' +
      '<div class="fr child_btn_wrap">' +
      '<input type="text" value="' + $(perarr[2]).html() + '" name="NumChild" id="count3" readonly data-min="0" data-max="10">' +
      '<i class="add hotel_people_right_child_add" id="ho_i3"></i>' +
      '<i class="minus hotel_people_right_child_minus disable" id="ho_i4"></i>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<ul class="child_ages_ul" id="js_childAges">' +
      '</ul>' +
      '<p class="child_add_tips">如果您带一名儿童，并需要增加一张床，请直接增加为一名成人。</p>'+
      '</div>'
    ].join('');
    var perWrap = $('<div class="room_peo_choice" ></div>');
    perWrap.appendTo($(document.body));
    perWrap.html(perPanel);
    if (parseInt($('#count1').val()) >= 2) {
      $('#ho_i2').removeClass('disable').addClass('able');
    }

    if (parseInt($('#count2').val()) > parseInt($('#count1').val())) {
      $('#ho_i6').removeClass('disable').addClass('able');
    }

    if (parseInt($('#count3').val()) > 0) {
      $('#ho_i4').removeClass('disable').addClass('able');
    }

    //儿童年龄展示个数
    var n = $(perarr[2]).html();
    this.childAgeChoose();
  },

  //移除面板
  removePanel: function (perarr) {
    //取消
    $('#js_room_hide').on('click', function () {
      $('.room_peo_choice').css('visiility', 'hidden');
      setTimeout(function () {
        $('.room_peo_choice').remove();
      }, 150);
    });
    //确定
    $('.hotel_room_finish').on('click', function () {
      $(perarr[0]).html($('#count1').val());
      $(perarr[0]).parent().find('input').val($('#count1').val());
      $(perarr[1]).html($('#count2').val());
      $(perarr[1]).parent().find('input').val($('#count2').val());
      $(perarr[2]).html($('#count3').val());
      $(perarr[2]).parent().find('input').val($('#count3').val());
      agesArr = [], ages_child = $('#js_childAges .per_child_age');
      for (var i = 0; i < ages_child.length; i++) {
        agesArr.push(parseInt(ages_child.eq(i).html()));
      }
      window.sessionStorage.h_agesArr = JSON.stringify(agesArr);

      $('.room_peo_choice').remove();
    });
  },

  //儿童年龄选择
  childAgeChoose: function () {
    var str = '', n = $('#count3').val();
    ;
    for (var i = 0; i < n; i++) {
      var oChildAge = '<li class="clearfix"><span class="fl">儿童' + (i + 1) + '年龄</span><span class="fr per_child_age">2岁</span></li>';
      str += oChildAge;
    }
    $('#js_childAges').html(str);
  },

  //加 减按钮
  addMinus: function () {
    var that = this;
    //加
    $("#rac_wrap").on("click", ".add", function (event) {
      var target = $(event.target);
      if (target.hasClass('disable')) {
        return;
      }
      var inputEle = target.siblings("input");
      var minusEle = target.siblings(".minus");
      var maxValue = parseInt(inputEle.attr("data-max"));
      var inputValue = inputEle.val();
      var atferValue = parseInt(inputValue) + 1;

      inputEle.val(atferValue <= maxValue ? atferValue : inputValue);
      var roomNemEle = $("#count1");
      var roomValue = parseInt(roomNemEle.val());
      var adultNumEle = $("#count2");
      var adultValue = parseInt(adultNumEle.val());

      if (atferValue >= maxValue) {
        target.addClass("disable");
      }
      if (target.hasClass("hotel_people_right_adult_add") && atferValue <= roomValue) {
        minusEle.removeClass("able").addClass("disable");
      } else if (atferValue < maxValue && !minusEle.hasClass('able')) {
        minusEle.removeClass("disable").addClass("able");
      }
      if (target.hasClass("hotel_roomNum_add") && atferValue > adultValue) {
        $("#ho_i7").trigger("click");
        $('#ho_i3').removeClass('disable');
      }

      if (target.hasClass("hotel_roomNum_add") && atferValue == adultValue) {
        $(".hotel_people_right_adult_minus").removeClass('able').addClass("disable");
        $('#ho_i3').removeClass('disable');
      }

      if (parseInt($('#count1').val()) >= 2) {
        $('#ho_i3').removeClass('disable').addClass('able');
      }

      if (parseInt($('#count2').val()) >= 6*parseInt($('#count1').val())) {
        $('#ho_i7').removeClass('able').addClass('disable');
      }

      if (target.hasClass("hotel_roomNum_add") && parseInt($('#count2').val()) <= 6*parseInt($('#count1').val())) {
        $('#ho_i7').removeClass('disable').addClass('able');
      }

      //儿童加时，年龄栏
      if (target.hasClass('hotel_people_right_child_add')) {
        var n = $('#count3').val();
        var room_n = $('#count1').val();
        if (n >= 2 * room_n) {
          $('#ho_i3').addClass('disable');
        }
        that.childAgeChoose();
      }

    });


    //减
    $("#rac_wrap").on("click", ".minus", function (event) {
      var target = $(event.target);
      if (target.hasClass('disable')) {
        return;
      }
      var inputEle = target.siblings("input");
      var addEle = target.siblings(".add");
      var minValue = parseInt(inputEle.attr("data-min"));
      var maxValue = parseInt(inputEle.attr("data-max"));
      var inputValue = inputEle.val();
      var atferValue = parseInt(inputValue) - 1;
      inputEle.val(atferValue >= minValue ? atferValue : inputValue);
      var roomNemEle = $("#count1");
      var roomValue = parseInt(roomNemEle.val());
      var adultNumEle = $("#count2");
      var adultValue = parseInt(adultNumEle.val());
      if (atferValue > minValue && !target.hasClass('able')) {
        target.removeClass('disable').addClass("able");
      } else if (atferValue <= minValue) {
        target.removeClass('able').addClass("disable");
      }
      if (atferValue < maxValue) {
        addEle.removeClass('disable').addClass("able");
      } else {
        addEle.removeClass('able').addClass("disable");
      }
      if (target.hasClass("hotel_roomNum_reduce") && atferValue < adultValue) {
        $(".hotel_people_right_adult_minus").removeClass('disable').addClass("able");
        if (parseInt($('#count3').val()) > parseInt($('#count1').val()) * 2) {
          $('#count3').val(parseInt($('#count1').val()) * 2);
          that.childAgeChoose();
        }
      }
      if (target.hasClass("hotel_people_right_adult_minus") && atferValue <= roomValue) {
        target.removeClass("able").addClass("disable");
      }

      if (parseInt($('#count3').val()) == parseInt($('#count1').val())*2) {
        $('#ho_i3').removeClass('able').addClass('disable');
      }

      if (parseInt($('#count2').val()) >= 6*parseInt($('#count1').val())) {
        $('#count2').val(6*parseInt($('#count1').val()));
        $('#ho_i7').removeClass('able').addClass('disable');
      }

      //儿童减时，年龄栏
      var n = $('#count3').val();
      var str = '';
      if (target.hasClass('hotel_people_right_child_minus')) {
        for (var i = 0; i < n; i++) {
          var oChildAge = '<li class="clearfix"><span class="fl">儿童' + (i + 1) + '年龄</span><span class="fr per_child_age">2岁</span></li>';
          str += oChildAge;
        }
        $('#js_childAges').html(str);
      }

    });


  }


}
