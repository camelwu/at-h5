/**
 * Created by qzz on 2016/7/8.
 */

function TravelChoice() {
  if (!arguments.length)
    return;
  if (jQuery) {
    this.init.apply(this, arguments);
  } else {
    alert("需要jQuery!");
  }
};

TravelChoice.prototype = {

  constructor: TravelChoice,

  init: function (options) {
    this.id = options.id;
    this.Tid = options.Tid;
    this.choiceEvent(options.id);

  },

  createTravelPanel: function () {
    var that = this;
    var oTraHeaderWrap = $('<div id="passagers_list_wrap"></div>');
    var oTraHeaderStr=['<div class="header" id="toper">'+
    '<a href="javascript:;" id="close_page" class="header_back name-illustrate closedWin">'+
    '<i class="icon_back"></i>'+
    '</a>'+
    '<h3>已选：<span class="adult-number"></span></h3>'+
    '<div class="header_finish addPassager_finish">完成</div>'+
    '</div>'+
    '<div class="all_elements">'+
    '<div class="content">'+
    '<a href="javascript:;" class="add_passager f_btns">'+
    '<b class="icon_person user_add"></b><span class="newTitle"></span>'+
    '</a>'+
    '<ul class="often_traveler list-traveler" id="allList"></ul>'+
    '</div>'+
    '</div>'].join('');
    TraHd=ejs.render(oTraHeaderStr,{arrCountry :arrCountry});
    oTraHeaderWrap.html(TraHd);
    oTraHeaderWrap.appendTo($(document.body));
  },

  // 绑定操作对象的事件
  choiceEvent: function (id) {
    var that = this;
    $(id).on('click', function (e) {
      that.createTravelPanel();


      if (e && e.stopPropagation) {
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
      }
      else {
        //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
      }
    });
  },
  //移除面板
  panelRemove: function () {

  },


};


