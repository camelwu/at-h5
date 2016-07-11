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
    var oTraHeaderStr = ['<div class="header" id="toper">' +
    '<a href="javascript:;" id="close_page" class="header_back name-illustrate closedWin">' +
    '<i class="icon_back"></i>' +
    '</a>' +
    '<h3>已选：<span class="adult-number"></span></h3>' +
    '<div class="header_finish addPassager_finish">完成</div>' +
    '</div>' +
    '<div class="all_elements">' +
    '<div class="content">' +
    '<a href="javascript:;" class="add_passager f_btns">' +
    '<b class="icon_person user_add"></b><span class="newTitle">新增乘机人</span>' +
    '</a>' +
    '<ul class="often_traveler list-traveler" id="allList"></ul>' +
    '</div>' +
    '</div>'].join('');
    TraHd = ejs.render(oTraHeaderStr, {arrCountry: arrCountry});
    oTraHeaderWrap.html(TraHd);
    oTraHeaderWrap.appendTo($(document.body));
  },

  // 绑定操作对象的事件
  choiceEvent: function (id) {
    var that = this;
    $(id).on('click', function (e) {
      that.createTravelPanel();
      that.closeWindow();
      that.addTraveller();

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
    $('#passagers_list_wrap').remove();
  },

  //关闭面板
  closeWindow: function () {
    var that = this;
    $('.closedWin').click(function () {
      that.panelRemove();
    });
  },
  addTraPanel: function () {
    var addTraHeader = $('<div class="addAir_page" id="addAir-page"></div>');
    var addTraStr = ['<div class="all_elements">' +
    '<div class="header">' +
    '<div class="header_quit">取消</div>' +
    '<h3><span class="oprationType">新增</span><span class="bussinessTitle">乘机人</span></h3>' +
    '<div class="header_finish addFinish">完成</div>' +
    '</div>' +
    '<div class="content">' +
    '<div class="chn_eng_wrap">' +
    '<div class="addtra_title"><span>旅客姓名</span><b id="name_state" class="icon_common user_must"></b></div>' +
    '<ul class="addtra_info nameche_wrap cnNameUL">' +
    '<li>' +
    '<div>中文姓名</div>' +
    '<input type="text" placeholder="与乘机人姓名一致" class="cnName">' +
    '</li>' +
    '</ul>' +
    '<ul class="addtra_info nameche_wrap enNameUL">' +
    '<li>' +
    '<div>英文姓</div>' +
    '<input type="text" placeholder="Surname,如Li" class="lastName">' +
    '</li>' +
    '<li>' +
    '<div>英文名</div>' +
    '<input type="text" placeholder="Given name,如Shimin" class="firstName">' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '<div class="addtra_title">证件</div>' +
    '<ul class="addAir_info">' +
    '<li>' +
    '<b class="open_arw open_pho"></b>' +
    '<div>证件类型</div>' +
    '<div id="postCard" class="postCard" data-code="1">护照</div>' +
    '</li>' +
    '<li>' +
    '<div>证件号</div>' +
    '<input type="text" placeholder="确保与乘机证件一致" class="cardNumber">' +
    '</li>' +
    '<li>' +
    '<b class="open_arw  open_pho"></b>' +
    '<div class="birth-date">证件有效期</div>' +
    '<div id="time-cont" type="text" class="birth-cont cardDateLimit" data-cache="2016年-1月-1日"></div>' +
    '</li>' +
    '<li class="countries-wrap" id="oCountry1">' +
    '<b class="open_arw open_pho"></b>' +
    '<div>发证国家</div>' +
    '<div class="country-btn cardCountry" data-code="CN" >中国</div>' +
    '</li>' +
    '</ul>' +
    '<div class="addtra_title">其他信息</div>' +
    '<ul class="addAir_info mart-non">' +
    '<li class="countries-wrap" id="oCountry2">' +
    '<b class="open_arw open_pho"></b>' +
    '<div>国籍</div>' +
    '<div class="country-btn country" data-code="CN" >中国</div>' +
    '</li>' +
    '<li>' +
    '<div>性别</div>' +
    '<div class="sex_cho_wrap">' +
    '<span><b class="icon_h traveler_sex2" id="man" data-code="Mr" data-name="男"></b>男</span>' +
    '<span><b class="icon_h traveler_sex2" id="woman" data-code="Mrs" data-name="女"></b>女</span>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<b class="open_arw open_pho"></b>' +
    '<div class="birth-date">出生日期</div>' +
    '<div id="birth-cont" type="text" class="birth-cont birthDay" data-cache="1990年-1月-1日" value="1990年1月1号"></div>' +
    '</li>' +
    '</ul>' +
    '<!--<div class="ul_contect">' +
    '<div class="addtra_title">联系方式</div>' +
    '<ul class="traveler_contect">' +
    '<li class="clearfix">' +
    '<div class="con_phone fl" id="oCountryCellAdd">手机号' +
    '<span class="phone_pre tel-btn">+86</span>' +
    '<em class="open_arw mobile_tip_right"></em>' +
    '</div>' +
    '<input type="text" placeholder="请确保手机号无误" id="mobile-cell-add" class="telephone">' +
    '</li>' +
    '<li class="clearfix">' +
    '<div class="fl email_code">邮箱</div>' +
    '<input type="text" placeholder="常用邮箱" id="email-cell-add" class="email">' +
    '</li>' +
    '</ul>' +
    '<div class="name_text_tips" id="name-text">为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月</div>' +
    '</div>-->' +
    '</div>' +
    '</div>'].join('');
    addTraHeader.html(addTraStr);
    addTraHeader.appendTo($('#passagers_list_wrap'));

  },
  //新增乘机人
  addTraveller: function () {
    var that = this;
    $('.add_passager').click(function () {
      that.addTraPanel();
    });
  }


};


