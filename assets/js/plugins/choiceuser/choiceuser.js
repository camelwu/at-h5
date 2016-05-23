/**
 * Created by zhouwei on 2016/5/22.
 */
/**
 * Created by zhouwei on 2016/5/22.
 */
define([
  'css!baseCss/reset.css',
  'css!pluginsCss/choiceuser/choiceuser.css',
  'vlm',"jquery",
],function (){

  /* 抽象业务类型对象*/
  var typeArray= {
    "H":{id: 1,tplKey:"t_h",selectOperationConfig:[{tile:"选择入住",isMulSelect:true},{tile:"选择入住人",isMulSelect:false}]},
    "F":{id: 1,tplKey:"t_f",selectOperationConfig:[{tile:"选择乘机人",isMulSelect:true},{tile:"选择取票人",isMulSelect:false}]},
    "T":{id: 2,tplKey:"t_t",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
    "FT":{id: 3,tplKey:"t_ft",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
    "FHT":{id: 4,tplKey:"t_fht",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
  };
  var tplHtml={
    "t_fht": [
      '<section>'+
      '<div class="header" id="toper">'+
      '<a href="javascript:;" id="close_page" class="header_back name-illustrate closedWin">'+
      '<i class="icon_back"></i>'+
      '</a>'+
      '<h3>选择取票人</h3>'+
      '<div class="header_finish" onclick="submit_t();">完成</div>'+
      '</div>'+
      '<div class="all_elements">'+
      '<!-- Page Content-->'+
      '<div class="content">'+
      '<a href="javascript:;" class="f_btn addEdit_btn">'+
      '<b class="icon_person user_add"></b><span class="newTitle">新增取票人</span>'+
      '</a>'+
      '<ul class="often_traveler choosed-traveler"></ul>'+
      '<ul class="often_traveler list-traveler" id="allList"><li class="eve_traveler" index="0"><b class="icon_common user_choice" data-id="343" data-age="NaN"></b><b class="icon user_edit" data-id="343"></b><ul class="often_user"><input type="hidden" class="travellerId" value="343"> <input type="hidden" class="sexName" value="女"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">sdf</span>/<span class="firstName">sdf</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li><li class="passport-num"><span class="passport-card-type">军官证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">台胞证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">回乡证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">驾驶证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">港澳通行证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">身份证</span> <span class="passport-card-number">456780000</span></li></ul></li><li class="eve_traveler" index="1"><b class="icon_common user_choice" data-id="459" data-age="NaN"></b><b class="icon user_edit" data-id="459"></b><ul class="often_user"><input type="hidden" class="travellerId" value="459"> <input type="hidden" class="sexName" value="男"> <li data-card="5"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">zhou</span>/<span class="firstName">san</span></li><li class="passport-num"><span class="passport-card-type">军官证</span> <span class="passport-card-number">444</span></li></ul></li><li class="eve_traveler" index="2"><b class="icon_common user_choice" data-id="530" data-age="NaN"></b><b class="icon user_edit" data-id="530"></b><ul class="often_user"><input type="hidden" class="travellerId" value="530"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">zhoui</span>/<span class="firstName">wei</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li></ul></li><li class="eve_traveler" index="3"><b class="icon_common user_choice" data-id="532" data-age="NaN"></b><b class="icon user_edit" data-id="532"></b><ul class="often_user"><input type="hidden" class="travellerId" value="532"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">zhou</span>/<span class="firstName">wei</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li></ul></li><li class="eve_traveler" index="4"><b class="icon_common user_choice" data-id="2355" data-age="NaN"></b><b class="icon user_edit" data-id="2355"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2355"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">sdf</span>/<span class="firstName">sdf</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve_traveler" index="5"><b class="icon_common user_choice" data-id="2356" data-age="NaN"></b><b class="icon user_edit" data-id="2356"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2356"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">test</span>/<span class="firstName">tst</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve_traveler" index="6"><b class="icon_common user_choice" data-id="2357" data-age="NaN"></b><b class="icon user_edit" data-id="2357"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2357"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">zsdf</span>/<span class="firstName">qwe</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve_traveler" index="7"><b class="icon_common user_choice" data-id="2368" data-age="NaN"></b><b class="icon user_edit" data-id="2368"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2368"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">sdf</span>/<span class="firstName">df</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve_traveler" index="8"><b class="icon_common user_choice" data-id="2369" data-age="NaN"></b><b class="icon user_edit" data-id="2369"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2369"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">aawe</span>/<span class="firstName">ewe</span></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li></ul>'+
      '<div class="con_text" id="con-text">为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月</div>'+
      '</div>'+
      '<!-- 新增乘机人页-->'+
      '<div class="addAir_page" id="addAir-page">'+
      '<div class="all_elements">'+
      '<div class="header">'+
      '<div class="header_quit" onclick="closeAddAir_page()">取消</div>'+
      '<h3>新增乘机人</h3>'+
      '<div class="header_finish addFinish">完成</div>'+
      '</div>'+
      '<div class="content">'+
      '<div class="chn_eng_wrap">'+
      '<div class="addtra_title">旅客姓名<b id="name_state" class="icon_common user_must"></b></div>'+
      '<ul class="addtra_info nameche_wrap">'+
      '<li>'+
      '<div>中文姓名</div>'+
      '<input type="text" placeholder="与乘机人姓名一致" class="cnName">'+
      '</li>'+
      '</ul>'+
      '<ul class="addtra_info nameche_wrap">'+
      '<li>'+
      '<div>姓（英文 )</div>'+
      '<input type="text" placeholder="Surname,如Li" class="lastName">'+
      '</li>'+
      '<li>'+
      '<div>名（英文 )</div>'+
      '<input type="text" placeholder="Given name,如Shimin" class="firstName">'+
      '</li>'+
      '</ul>'+
      '</div>'+
      '<div class="addtra_title">证件</div>'+
      '<ul class="addAir_info">'+
      '<li>'+
      '<b class="icons open_pho"></b>'+
      '<div>证件类型</div>'+
      '<div id="postCard" class="postCard" data-code="1">护照</div>'+
      '</li>'+
      '<li>'+
      '<div>证件号</div>'+
      '<input type="text" placeholder="确保与乘机证件一致" class="cardNumber">'+
      '</li>'+
      '<li>'+
      '<b class="icons open_pho"></b>'+
      '<div class="birth-date">证件有效期</div>'+
      '<input id="time-cont" type="text" class="birth-cont cardDateLimit" data-cache="1990年-1月-1日" value="1990年1月9号" readonly="">'+
      '</li>'+
      '<li class="countries-wrap">'+
      '<b class="icons open_pho"></b>'+
      '<div>发证国家</div>'+
      '<div class="country-btn cardCountry" data-code="CN">中国</div>'+
      '</li>'+
      '</ul>'+
      '<div class="addtra_title">其他信息</div>'+
      '<ul class="addAir_info mart-non">'+
      '<li class="countries-wrap">'+
      '<b class="icons open_pho"></b>'+
      '<div>国籍</div>'+
      '<div class="country-btn country" data-code="CN">中国</div>'+
      '</li>'+
      '<li>'+
      '<div>性别</div>'+
      '<div class="sex_cho_wrap">'+
      '<span><b class="icon_h traveler_sex2" id="man"></b>男士</span>'+
      '<span><b class="icon_h traveler_sex2" id="woman"></b>女士</span>'+
      '</div>'+
      '</li>'+
      '<li>'+
      '<b class="icons open_pho"></b>'+
      '<div class="birth-date">出生日期</div>'+
      '<input id="birth-cont" type="text" class="birth-cont birthDay" data-cache="1990年-1月-1日" value="1990年1月9号" readonly="">'+
      '</li>'+
      '</ul>'+
      '<!--<div class="addtra_title">联系方式</div>-->'+
      '<!--<ul class="traveler-contect">-->'+
      '<!--<li class="clearFix">-->'+
      '<!--<div class="con-phone fl">-->'+
      '<!--手机号-->'+
      '<!--<span class="phone-pre">+86</span>-->'+
      '<!--</div>-->'+
      '<!--<input type="text" placeholder="请确保手机号无误" id="mobile-cell-add" class="telNum">-->'+
      '<!--</li>-->'+
      '<!--<li class="clearFix">-->'+
      '<!--<div class="fl">邮箱</div>-->'+
      '<!--<input type="text" placeholder="常用邮箱" id="email-cell-add" class="txtEmail">-->'+
      '<!--</li>-->'+
      '<!--</ul>-->'+
      '<div class="name_text" id="name-text">为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月</div>'+
      '<!--<div class="user-account" onclick="showChild_page()">-->'+
      '<!--儿童婴儿购票说明>-->'+
      '<!--</div>-->'+
      '<div id="delTra" class="f_btn button_grey">删除常旅客</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '<!-- 儿童购票说明页-->'+
      '<div class="childen-page" id="childen-page">'+
      '<div class="all_elements">'+
      '<div class="header">'+
      '<a class="icons header-back closedOfChindDescript" onclick="closeChild_page()"></a>'+
      '<h3>儿童购票说明</h3>'+
      '</div>'+
      '<div class="content">'+
      '<ol class="ch_account">'+
      '<li>航班起飞前当日出生日期未满14天的婴儿，请至航空公司柜台申请购买机票</li>'+
      '<li>婴儿/儿童年龄区分'+
      '<div class="child_detail">婴儿：14天-2周岁；</div>'+
      '<div class="child_detail">儿童：2-12周岁（按照航班起飞当日实际年龄区分）</div>'+
      '</li>'+
      '<li>婴儿票价格：航线标准价格的10%，不收机建费和燃油费（注：婴儿票无座。如需座位，可购买儿童票或成人票）</li>'+
      '<li>儿童票价格：航线标准价格的50%，不收机建费，燃油费为承认的50%</li>'+
      '<li>儿童、婴儿须要成人陪同登机。儿童如果单独乘机，需要至航空公司柜台申请购买机票</li>'+
      '<li>儿童婴儿购票可用证件：身份证、护照、户口簿、出生证明等</li>'+
      '<li>儿童婴儿购票可同时购买一份航意险</li>'+
      '<li>部分成人价格允许儿童婴儿购买，根据航空公司公布的成人价格政策确认儿童婴儿是否允许购买成人票</li>'+
      '</ol>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</section>'].join('')
  }
  /* 参数说明
   tpye:        业务类型(H,F,T,FT,FHT)
   isMulSelect：是否多选(True Or False)
   numofAdult：成人数量
   numofChild：小孩数量
   departDate：出发时间
   */
  var _bindEvent=function(){
    var addEdit_btn=$(".addEdit_btn"),addAir_page=$(".addAir_page");

    $(".addEdit_btn").on("click",function(){
      $(".addAir_page").show();

    })


  }

  var init = function (type,isMulSelect,numofAdult,numofChild,departDate){
    var _type=typeArray[type],_isMulSelect=isMulSelect,_numofAdult=numofAdult,_numofChild=numofChild,_departDate=departDate,_selectOperationConfig;


    if(!isMulSelect){
      _selectOperationConfig=_type.selectOperationConfig[0] /*默认第一个单选*/
    }
    else{
      _selectOperationConfig=_type.selectOperationConfig[1]/*多选*/
    }
    debugger;
    var html=tplHtml[_type.tplKey]
    $('body').append(html);
    _bindEvent();

  };
  return {
    init: init
  };


});














