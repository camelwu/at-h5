/*国籍和手机区号选择组件js   author ：qzz  date:2016/07/01 */
var arrCountry = localStorage.arrCountry,countryArray={},targetDiv,targetTimer;

function CountryList() {
  if (!arguments.length)
    return;
  if (jQuery) {
    this.init.apply(this, arguments);
  } else {
    alert("需要jQuery!");
  }
};

CountryList.prototype= {

  constructor: CountryList,

  init: function (options) {
    this.id=options.id;
    this.telCode=options.telCode;
    this.inputEvent(options.id,options.telCode);

  },

  createCountryPanel: function (telCode) {
    var that = this, oCounHeader = document.createElement('div'),countryWrapHot,countryWrap,
    oCounContent = document.createElement('div'),
    oCounWindow = document.createElement('ul'),
    oCounIndex = document.createElement('div');

    oCounHeader.className = 'header country_header';
    oCounContent.className = 'all_elements country-cho-wrap';
    oCounWindow.className = 'country-list-searched';
    oCounIndex.className = 'country_index';
    oCounIndex.id = 'country_index_wrap';

    oCounHeader.innerHTML = '<a href="javascript:;" class="header_back country-hidden"><i class="icon_back"></i></a>' +
      '<div class="cl_search">' +
      '<input type="text" placeholder="新加坡/xinjiapo/xjp/Singapore" id="country-input-zone"/>' +
      '<i class="icon_common"></i>' +
      '</div>';

    oCounContent.innerHTML = '<div class="content">' +
      '<div id="country-wrap-hot"></div>' +
      '<div class="country-wrap" id="country-wrap"></div>' +
      '</div>';

    //点击时加遮罩，safari防止滑动看见上一步数据
    var countryMask = $('<div class="country_mask" ></div>');
    countryMask.appendTo($(document.body));

    document.body.appendChild(oCounHeader);
    document.body.appendChild(oCounContent);
    document.body.appendChild(oCounWindow);
    document.body.appendChild(oCounIndex);

    //右侧a-z点击显示字母
    targetDiv = $('<div class="a_target" ></div>');
    targetDiv.appendTo($(document.body));

    //创建空数组
    function returnRArray() {
      var result = {}, array1 = [], data = arguments[0];
      data.forEach(function (itemValue) {
        array1.push(itemValue.firstPinYin.toUpperCase())
      });
      //array1 = array1.distinct();
      array1 = array1.sort();
      array1.forEach(function (item) {
        result[item] = [];
      });
      return result;
    };

    arrCountry = JSON.parse(localStorage.arrCountry);

    //改造数组
    countryArray = returnRArray(arrCountry);
    arrCountry.forEach(function (itemValue) {
      for (var temp in  countryArray) {
        if (itemValue.firstPinYin.toUpperCase() == temp) {
          countryArray[temp].push(itemValue);
        }
      }
    });

    //模板
    <!--热门国籍-->
    var countryStrHot=['<h4><a name="rm" class="target"></a>热门</h4>'+
      '<ul class="country_hot">'+
      '<% for(var i=0; i< arrCountry.length; i++){ %>'+
      '<% if(arrCountry[i].isHot == 1) { %>'+
      '<li class="country_list_hot" data-tel-code="<%=arrCountry[i].phoneCode%>" data-code="<%=arrCountry[i].countryCode%>" ><%=arrCountry[i].chineseName%></li>'+
      '<% } %>'+
      '<% } %>'+
      '</ul>'].join('');

    <!--国籍全部列表-->
    var countryStr=['<div class="full_country_outer">'+
    '<% for(var tem in countryArray){ %>'+
    '<a class="target" name="<%=tem%>"></a>'+
    '<h4><%=tem%></h4>'+
    '<ul class="full_country_list">'+
    '<% countryArray[tem].forEach(function(array){ %>'+
    '<li class="country_list" data-tel-code="<%=array.phoneCode%>" data-code="<%=array.countryCode%>"><%=array.chineseName%></li>'+
    '<% })%>'+
    '</ul>'+
    '<% }%>'+
    '</div>'].join('');

    <!--热门手机区号-->
    var countryStrHotTel=['<h4><a name="rm" class="target"></a>热门</h4>'+
    '<ul class="country_hot">'+
    '<% for(var i=0; i< arrCountry.length; i++){ %>'+
    '<% if(arrCountry[i].isHot == 1) { %>'+
    '<li class="country_list_hot" data-tel-code="<%=arrCountry[i].phoneCode%>" data-code="<%=arrCountry[i].countryCode%>" ><em data-tel-code="<%=arrCountry[i].phoneCode%>" data-code="<%=arrCountry[i].countryCode%>"><%=arrCountry[i].chineseName%></em><span class="tel_code" data-tel-code="<%=arrCountry[i].phoneCode%>" data-code="<%=arrCountry[i].countryCode%>"><%=arrCountry[i].phoneCode%></span></li>'+
    '<% } %>'+
    '<% } %>'+
    '</ul>'].join('');

    <!--手机区号全部列表-->
    var countryStrTel=['<div class="full_country_outer">'+
    '<% for(var tem in countryArray){ %>'+
    '<a class="target" name="<%=tem%>"></a>'+
    '<h4><%=tem%></h4>'+
    '<ul class="full_country_list">'+
    '<%countryArray[tem].forEach(function(array){ %>'+
    '<li class="country_list" data-tel-code="<%=array.phoneCode%>" data-code="<%=array.countryCode%>"><em data-tel-code="<%=array.phoneCode%>" data-code="<%=array.countryCode%>"><%=array.chineseName%></em><span class="tel_code" data-tel-code="<%=array.phoneCode%>" data-code="<%=array.countryCode%>"><%=array.phoneCode%></span></li>'+
    '<% })%>'+
    '</ul>'+
    '<% }%>'+
    '</div>'].join('');

    <!--国籍a-z-->
    var countryStrIndex=['<ul>'+
    '<li><a href="#rm">热门</a></li>'+
    '<% for(var tem in countryArray){%>'+
    '<li><a href="#<%=tem%>"><%=tem%></a></li>'+
    '<%}%>'+
    '</ul>'].join('');

    if(telCode){
      //显示区号hot
      countryWrapHot=ejs.render(countryStrHotTel,{arrCountry :arrCountry});
      $('#country-wrap-hot').html(countryWrapHot);

      //显示区号全部列表
      countryWrap=ejs.render(countryStrTel,{countryArray:countryArray});
      $('#country-wrap').html(countryWrap);

    }else{
      //不显示区号hot
      countryWrapHot = ejs.render(countryStrHot, {arrCountry: arrCountry});
      $('#country-wrap-hot').html(countryWrapHot);

      //不显示区号全部列表
      countryWrap = ejs.render(countryStr, {countryArray: countryArray});
      $('#country-wrap').html(countryWrap);
    }

    //右侧a-z
    var countryWrapIndex = ejs.render(countryStrIndex, {countryArray: countryArray});
    $('#country_index_wrap').html(countryWrapIndex);

  },

  // 绑定操作对象的事件
  inputEvent: function (id,telCode) {
    var that = this;
    $(id).on('click', function (e) {
      that.createCountryPanel(telCode);
      that.chooseCountry(id);
      that.codeTarget();
      that.fuzzyQuery();
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
  panelRemove:function(){
    //展示列表消失
    setTimeout(function(){
      $('.country_mask').remove();
      targetDiv.remove();
      $('.country-cho-wrap').remove();
      $('.country_header').remove();
      $('#country_index_wrap').remove();
      if ($('.country-list-searched')) {
        $('.country-list-searched').remove();
      };
    },200)
  },

 //A-Z点击
  codeTarget: function(){
    $('#country_index_wrap a').click(function(){
      clearTimeout(targetTimer);
      targetDiv.css('visibility','visible');
      targetDiv.html($(this).html());
      targetTimer=setTimeout(function(){
        targetDiv.css('visibility','hidden');
      },500);
    });
  },

  //选择国家或者区号click具体操作
  selectCountry:function (e) {

    var cId=this.id,that=this,e = e || window.event, target = e.target || e.srcElement;
    if ( cId == '#tel11' || cId == '#tel12' || cId == '#oCountryCellAdd' || cId == '#oCountryCellEdit' || cId=='#booking_package_linkman_phoneselect') {
      //login +86
      if(target.className == "country_list_hot" || target.parentNode.className == "country_list_hot" || target.className == "country_list" || target.parentNode.className == "country_list"){
        var phonecode='+'+$(target).attr("data-tel-code");
        $(cId).find('span').html(phonecode);
        //选择完毕后展示列表remove
        that.panelRemove();
      }

    }else if(cId == '#tel13'){
      var phoneName,phonenumber,phonecode;
      //忘记密码页+86
      if(target.className == "country_list_hot"){
        phoneName=$(target).find('em').html();
        phonenumber=$(target).find('em').attr("data-tel-code");
        phonecode = phoneName + '+' + phonenumber;
        $(cId).find('div').html(phonecode);
        that.panelRemove();
      }else if(target.parentNode.className == "country_list_hot"){
        phoneName=$(target).parent().find('em').html();
        phonenumber = $(target).parent().find('em').attr("data-tel-code");
        phonecode = phoneName + '+' + phonenumber;
        $(cId).find('div').html(phonecode);
        that.panelRemove();
      }else if(target.className == "country_list"){
        phoneName=$(target).find('em').html();
        phonenumber = $(target).find('em').attr("data-tel-code");
        phonecode = phoneName + '+' + phonenumber;
        $(cId).find('div').html(phonecode);
        that.panelRemove();
      }else if(target.parentNode.className == "country_list"){
        phoneName=$(target).parent().find('em').html();
        phonenumber = $(target).parent().find('em').attr("data-tel-code");
        phonecode = phoneName + '+' + phonenumber;
        $(cId).find('div').html(phonecode);
        that.panelRemove();
      }

    }else if(cId == '#oCountry1' || cId == '#oCountry2' || cId == '#oCountry3' || cId == '#oCountry4' || cId=='#booking_package_linkman_contact' ){
      //新增常旅发证国家/国籍
      if(target.className == "country_list_hot" || target.parentNode.className == "country_list_hot" || target.className == "country_list" || target.parentNode.className == "country_list") {
        $(cId).find('.country-btn').html($(target).html());
        $(cId).find('.country-btn').attr("data-tel-code", $(target).attr("data-tel-code"));
        $(cId).find('.country-btn').attr("data-code", $(target).attr("data-code"));
        //选择完毕后展示列表remove
        that.panelRemove();
      }
    };

  },

  //选择国籍或者区号事件,返回按钮
  chooseCountry: function (id) {
    var that=this;

    //国家选择弹层返回按钮
    $('.country-hidden').click(function () {
      that.panelRemove();
    });

    //选择国家操作
    $("body").children().click(function () {});

    $('.country-cho-wrap .content').on('click',function(e){
      that.selectCountry(e);
    });

    if($('.country-list-searched').css('display') == 'block'){
      $('.country-list-searched').on('click',function(e){
        that.selectCountry(e);
      });
    };

  },

  countrySearch:function (str) {
    var valueStr = str,resultStr = '',searchResult = [],telCode=this.telCode,that=this;
    if (valueStr) {
      for (var i = 0; i < arrCountry.length; i++) {
        if (arrCountry[i]['chineseName'].toLowerCase().indexOf(valueStr) > -1 || arrCountry[i]['englishName'].toLowerCase().indexOf(valueStr) > -1 || arrCountry[i]['nationalityCode'].toLowerCase().indexOf(valueStr) > -1 || arrCountry[i]['simplePinYin'].toLowerCase().indexOf(valueStr) > -1 || arrCountry[i]['fullPinYin'].toLowerCase().indexOf(valueStr) > -1) {
          searchResult.push(arrCountry[i]);
        }
      }

      if (!searchResult.length) {
        resultStr += '<li class="country_list_hot">无搜索结果</li>';
      } else {
        if (telCode == true) {
          //手机区号
          for (var j = 0; j < searchResult.length; j++) {
            resultStr += '<li class="country_list" data-tel-code="' + searchResult[j].phoneCode + '" data-code="' + searchResult[j].countryCode + '" ><em data-tel-code="' + searchResult[j].phoneCode + '" data-code="' + searchResult[j].countryCode + '">' + searchResult[j].chineseName + '</em><span class="tel_code" data-tel-code="' + searchResult[j].phoneCode + '" data-code="' + searchResult[j].countryCode + '">' + searchResult[j].phoneCode + '</span></li>';
          }
        } else {
          //国籍
          for (var j = 0; j < searchResult.length; j++) {
            resultStr += '<li class="country_list" data-tel-code="' + searchResult[j].phoneCode + '" data-code="' + searchResult[j].countryCode + '" >' + searchResult[j].chineseName + '</li>';
          }
        }
      }
      $('.country-list-searched').html(resultStr).show();
      that.chooseCountry(that.id);
    }
    else {
      $('.country-list-searched').hide();
    }
  },

  //模糊搜索
  fuzzyQuery : function () {
    var that=this;
    $('#country-input-zone').on('input propertychange',function(){
      var serachstr=$('#country-input-zone').val();
      that.countrySearch(serachstr);
    });

  }

};

//根据countryCode获得CountryName
function getCountryName(code){
  arrCountry = JSON.parse(localStorage.arrCountry);
  for(var i=0;i<arrCountry.length; i++)
  {
    if(arrCountry[i].countryCode == code)
    {
      return arrCountry[i];
    }
  }
};

//根据countryCode获得手机区号data-tel-code
function getTelCode(code){
  arrCountry = JSON.parse(localStorage.arrCountry);
  for(var i=0;i<arrCountry.length; i++)
  {
    if(arrCountry[i].countryCode == code)
    {
      return arrCountry[i];
    }
  }
};

