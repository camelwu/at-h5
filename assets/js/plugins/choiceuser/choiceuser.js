/**
 * Created by zhouwei on 2016/5/22.
 */

define(['../vim'],function (){

  jAlert(111);

  /* 抽象业务类型对象*/
  var typeArray= {
    "H":{id: 1,tpl:"t_h",selectOperationConfig:[{tile:"选择入住",isMulSelect:true},{tile:"选择入住人",isMulSelect:false}]},
    "F":{id: 1,tpl:"t_f",selectOperationConfig:[{tile:"选择乘机人",isMulSelect:true},{tile:"选择取票人",isMulSelect:false}]},
    "T":{id: 2,tpl:"t_t",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
    "FT":{id: 3,tpl:"t_ft",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
    "FHT":{id: 4,tpl:"t_fht",selectOperationConfig:[{tile:"选择联系人",isMulSelect:true},{tile:"选择联系人",isMulSelect:false}]},
  };
  /* 参数说明
   tpye:        业务类型(H,F,T,FT,FHT)
   isMulSelect：是否多选(True Or False)
   numofAdult：成人数量
   numofChild：小孩数量
   departDate：出发时间
   */
  var init = function (type,isMulSelect,numofAdult,numofChild,departDate){
    var _type=typeArray[type],_isMulSelect=isMulSelect,_numofAdult=numofAdult,_numofChild=numofChild,_departDate=departDate,_selectOperationConfig;
    if(!isMulSelect){
      _selectOperationConfig=_type.selectOperationConfig[0] /*默认第一个单选*/
    }
    else{
      _selectOperationConfig=_type.selectOperationConfig[1]/*多选*/
    }

  };
  return {
    init: init
  };

  var tpl={
    "tpl_f": [
      '<div class="all-elements" style="overflow: hidden;">'+
      '<!-- Page Content-->'+
      '<div class="snap-content" style="padding-top: 45px;background-color: white; ">'+
      's			<b class="icons user-add"></b><span class="newTitle">新增乘机人</span>'+
      '</div>'+
      '<ul class="often-traveler choosed-traveler"></ul>'+
      '<!--<div class="name-text" style="margin-bottom: 0;margin-top: -15px;">-->'+
      '<!--首字母排序-->'+
      '<!--</div>-->'+
      '<ul class="often-traveler list-traveler" id="allList"><li class="eve-traveler" index="0"><b class="icon user-choice" data-id="343" data-age="3"></b><b class="icon user-edit" data-id="343"></b><ul class="often_user"><input type="hidden" class="travellerId" value="343"> <input type="hidden" class="sexName" value="女"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">sdf</span>/<span class="firstName" value="sdf">sdf</span><i class="per-type">儿童</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li><li class="passport-num"><span class="passport-card-type">军官证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">台胞证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">回乡证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">驾驶证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">港澳通行证</span> <span class="passport-card-number">45678</span></li><li class="passport-num"><span class="passport-card-type">身份证</span> <span class="passport-card-number">456780000</span></li></ul></li><li class="eve-traveler" index="1"><b class="icon user-choice" data-id="459" data-age="26"></b><b class="icon user-edit" data-id="459"></b><ul class="often_user"><input type="hidden" class="travellerId" value="459"> <input type="hidden" class="sexName" value="男"> <li data-card="5"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">zhou</span>/<span class="firstName" value="sdf">san</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">军官证</span> <span class="passport-card-number">444</span></li></ul></li><li class="eve-traveler" index="2"><b class="icon user-choice" data-id="530" data-age="26"></b><b class="icon user-edit" data-id="530"></b><ul class="often_user"><input type="hidden" class="travellerId" value="530"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">zhoui</span>/<span class="firstName" value="sdf">wei</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li></ul></li><li class="eve-traveler" index="3"><b class="icon user-choice" data-id="532" data-age="26"></b><b class="icon user-edit" data-id="532"></b><ul class="often_user"><input type="hidden" class="travellerId" value="532"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">zhou</span>/<span class="firstName" value="sdf">wei</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">22</span></li></ul></li><li class="eve-traveler" index="4"><b class="icon user-choice" data-id="2355" data-age="26"></b><b class="icon user-edit" data-id="2355"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2355"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">sdf</span>/<span class="firstName" value="sdf">sdf</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve-traveler" index="5"><b class="icon user-choice" data-id="2356" data-age="26"></b><b class="icon user-edit" data-id="2356"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2356"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">test</span>/<span class="firstName" value="sdf">tst</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve-traveler" index="6"><b class="icon user-choice" data-id="2357" data-age="26"></b><b class="icon user-edit" data-id="2357"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2357"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">zsdf</span>/<span class="firstName" value="sdf">qwe</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve-traveler" index="7"><b class="icon user-choice" data-id="2368" data-age="26"></b><b class="icon user-edit" data-id="2368"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2368"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">sdf</span>/<span class="firstName" value="sdf">df</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li><li class="eve-traveler" index="8"><b class="icon user-choice" data-id="2369" data-age="26"></b><b class="icon user-edit" data-id="2369"></b><ul class="often_user"><input type="hidden" class="travellerId" value="2369"> <input type="hidden" class="sexName" value="男"> <li data-card="1"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px" value="sdf">aawe</span>/<span class="firstName" value="sdf">ewe</span><i class="per-type">成人</i></li><li class="passport-num"><span class="passport-card-type">护照</span> <span class="passport-card-number">123</span></li></ul></li></ul>'+
      '<div class="con-text" id="con-text">为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月</div>'+
      '</div>'+
      '<!-- 新增乘机人页-->'+
      '<div class="addAir-page" id="addAir-page" style="display: none;">'+
      '<div class="all-elements">'+
      '<div class="header">'+
      '<div class="header-quit" onclick="closeAddAir_page()">'+
      '取消'+
      '</div>'+
      '<h3 type="edit" data-id="343">编辑乘机人信息</h3>'+
      '<div class="header-finish addFinish">'+
      '完成'+
      '</div>'+
      '</div>'+
      '<div class="snap-content" style="padding-top: 45px;background-color: white;">'+
      '<div class="chn-eng-wrap">'+
      '<div class="addtra-title">旅客姓名<b id="name_state" class="icon user-must"></b></div>'+
      '<ul class="addtra-info nameche-wrap" data-id="343">'+
      '<li>'+
      '<div>'+
      '中文姓名'+
      '</div>'+
      '<input type="text" placeholder="与乘机人姓名一致" class="cnName" value="水电费">'+
      '</li>'+
      '</ul>'+
      '<ul class="addtra-info nameche-wrap" data-id="343">'+
      '<li>'+
      '<div>'+
      '姓（英文）'+
      '</div>'+
      '<input type="text" placeholder="Surname,如Li" class="lastName" value="sdf">'+
      '<br>'+
      '</li>'+
      '<li>'+
      '<div>'+
      '名（英文）'+
      '</div>'+
      '<input type="text" placeholder="Given name,如Shimin" class="firstName" value="sdf">'+
      '</li>'+
      '</ul>'+
      '</div>'+
      '<div class="addtra-title">证件</div>'+
      '<ul class="addAir-info mart-non">'+
      '<li>'+
      '<b class="icons open-pho"></b>'+
      '<div>'+
      '证件类型'+
      '</div>'+
      '<div id="postCard" class="postCard" data-code="1">护照</div>'+
      '</li>'+
      '<li>'+
      '<div>'+
      '证件号'+
      '</div>'+
      '<input type="text" placeholder="确保与乘机证件一致" class="cardNumber" value="22">'+
      '</li>'+
      '<li>'+
      '<b class="icons open-pho"></b>'+
      '<div class="birth-date">'+
      '证件有效期'+
      '</div>'+
      '<input id="time-cont" type="text" class="birth-cont cardDateLimit" data-cache="1990年-1月-1日" value="2019年06月01号" readonly="">'+
      '</li>'+
      '<li class="countries-wrap">'+
      '<b class="icons open-pho"></b>'+
      '<div>'+
      '发证国家'+
      '</div>'+
      '<div class="country-btn cardCountry" data-code="BO">玻利维亚</div>'+
      '</li>'+
      '</ul>'+
      '<div class="addtra-title">其他信息</div>'+
      '<ul class="addAir-info mart-non">'+
      '<li class="countries-wrap">'+
      '<b class="icons open-pho"></b>'+
      '<div>'+
      '国籍'+
      '</div>'+
      '<div class="country-btn country" data-code="BO">中国</div>'+
      '</li>'+
      '<li>'+
      '<div>'+
      '性别'+
      '</div>'+
      '<div class="sex-cho-wrap">'+
      '<span style="margin-right:15%"><b class="icon-h traveler-sex2" id="man"></b>男士</span>'+
      '<span><b class="icon-h traveler-sex1" id="woman"></b>女士</span>'+
      '</div>'+
      '</li>'+
      '<li>'+
      '<b class="icons open-pho"></b>'+
      '<div class="birth-date">'+
      '出生日期'+
      '</div>'+
      '<input id="birth-cont" type="text" class="birth-cont birthDay" value="2013年01月01号" readonly="">'+
      '</li>'+
      '</ul>'+
      '<!--<div class="addtra-title">联系方式</div>-->'+
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
      '<div class="name-text" id="name-text">'+
      '为了您能顺利出行，请确保旅行结束日期至少比证件有效期早6个月'+
      '</div>'+
      '<div id="delTra" class="f_btn button-grey" style="display: block;">删除常旅客</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '<!-- 儿童购票说明页-->'+
      '<div class="childen-page" id="childen-page">'+
      '<div class="all-elements">'+
      '<div class="header">'+
      '<a class="icons header-back closedOfChindDescript" onclick="closeChild_page()"></a>'+
      '<h3>儿童购票说明</h3>'+
      '</div>'+
      '<div class="snap-content" style="padding-top: 45px;background-color: white;">'+
      '<ol class="ch_account">'+
      '<li>'+
      '航班起飞前当日出生日期未满14天的婴儿，请至航空公司柜台申请购买机票'+
      '</li>'+
      '<li>'+
      '婴儿/儿童年龄区分'+
      '<div class="child_detail">'+
      '婴儿：14天-2周岁；'+
      '</div>'+
      '<div class="child_detail">'+
      '儿童：2-12周岁（按照航班起飞当日实际年龄区分）'+
      '</div>'+
      '</li>'+
      '<li>'+
      '婴儿票价格：航线标准价格的10%，不收机建费和燃油费（注：婴儿票无座。如需座位，可购买儿童票或成人票）'+
      '</li>'+
      '<li>'+
      '儿童票价格：航线标准价格的50%，不收机建费，燃油费为承认的50%'+
      '</li>'+
      '<li>'+
      '儿童、婴儿须要成人陪同登机。儿童如果单独乘机，需要至航空公司柜台申请购买机票'+
      '</li>'+
      '<li>'+
      '儿童婴儿购票可用证件：身份证、护照、户口簿、出生证明等'+
      '</li>'+
      '<li>'+
      '儿童婴儿购票可同时购买一份航意险'+
      '</li>'+
      '<li>'+
      '部分成人价格允许儿童婴儿购买，根据航空公司公布的成人价格政策确认儿童婴儿是否允许购买成人票'+
      '</li>'+
      '</ol>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'].join('')
  }
});



