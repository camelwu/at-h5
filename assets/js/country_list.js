/*国籍和手机区号选择插件js   author by：qzz  date:2016/06/02 */
var arrCountry = localStorage.arrCountry;

  (function(){
  //  var Parameters = {
  //  "Parameters": {"LastUpdateTime": "2010-01-01"},
  //  "ForeEndType": 3,
  //  "Code":"70100008"
  //};
  //  console.log(Parameters);
    //vlm.loadJson("", JSON.stringify(Parameters), countryback);

    //在原型链定义distinct
    //Array.prototype.distinct = function () {
    //  var sameObj = function (a, b) {
    //    var tag = true;
    //    if (!a || !b)return false;
    //    for (var x in a) {
    //      if (!b[x])
    //        return false;
    //      if (typeof(a[x]) === 'object') {
    //        tag = sameObj(a[x], b[x]);
    //      } else {
    //        if (a[x] !== b[x])
    //          return false;
    //      }
    //    }
    //    return tag;
    //  };
    //  var newArr = [], obj = {};
    //  for (var i = 0, len = this.length; i < len; i++) {
    //    if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
    //      newArr.push(this[i]);
    //      obj[typeof(this[i]) + this[i]] = this[i];
    //    }
    //  }
    //  return newArr;
    //};

    var countryArray={};
    //创建空数组
    function returnRArray () {
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
    //function countryback(ret){
    //var json=ret;
    //  console.log(json);
    //if(json.success){
    //  arrCountry=json.data;
    //}else{
    //  console.log(json.message);
    //  arrCountry = JSON.parse(localStorage.arrCountry);
    //}
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
    //console.log(countryArray);

    //公用hot
    var countryStrHot=$('#countryList_hot').html();
    var countryWrapHot=ejs.render(countryStrHot,{arrCountry :arrCountry});
    $('#country-wrap-hot').html(countryWrapHot);

    //公用全部列表
    var countryStr=$('#countryList').html();
    var countryWrap=ejs.render(countryStr,{countryArray:countryArray});
    $('#country-wrap').html(countryWrap);

    //右侧a-z
    var countryStrIndex=$('#country_index').html();
    var countryWrapIndex=ejs.render(countryStrIndex,{countryArray:countryArray});
    $('#country_index_wrap').html(countryWrapIndex);

    var aBtn=document.querySelectorAll('.countries-wrap');
    var aBtn_hot=document.querySelectorAll('.country_hot');
    var aBtn_tel=document.querySelectorAll('.tel-btn');


    var oDiv=document.querySelector('.country-cho-wrap');
    var oInput=document.querySelector('#country-input-zone');
    var oTc=document.querySelector('.country-list-searched');
    var countryListSearched = document.querySelector('.country-list-searched');
    var countryInputZone = document.querySelector('#country-input-zone');

    var oCont=document.querySelectorAll('.tel-btn');
    var oTab=document.querySelector('.full_country_outer');
    var oTab_hot=document.querySelector('#country-wrap-hot');
    var oInp=document.querySelector('.cl_search input');

    //国家选择弹层返回按钮
    $('.country-hidden').click(function(){
      countryMask.hide();
      $('.gj-header').hide();
      $('.country-cho-wrap').hide();
      $('.country_header').hide();
      $('#country_index_wrap').hide();
      if($('.country-list-searched').show()){
        $('.country-list-searched').hide();
      }

      $('#addtra_page').css({
        'visibility':'visible',
        'position':'relative'
      });
      $('#content').show();
      $('#uptra_page').css({
        'visibility':'visible',
        'position':'relative'
      });
    });

    //模糊搜索
    function search(str){
      /*国籍模糊搜索*/
      var countryShow = {
        countrySearch: function () {
          var countryInputZone = document.querySelector('#country-input-zone');
          var valueStr = countryInputZone.value;
          var resultStr = '';
          var searchResult = [];

          if (valueStr) {
            for (var i = 0; i < arrCountry.length; i++) {
              if (arrCountry[i]['chineseName'].toLowerCase().indexOf(valueStr)>-1||arrCountry[i]['englishName'].toLowerCase().indexOf(valueStr)>-1 ||arrCountry[i]['nationalityCode'].toLowerCase().indexOf(valueStr)>-1 ||arrCountry[i]['simplePinYin'].toLowerCase().indexOf(valueStr)>-1 ||arrCountry[i]['fullPinYin'].toLowerCase().indexOf(valueStr)>-1) {
                searchResult.push(arrCountry[i]);
              }
            }

            if (!searchResult.length) {
              resultStr += '<li class="country-list-searched-item">无搜索结果</li>';
            } else {
              if(str == 'code' ){
                //手机区号
                for (var j = 0; j < searchResult.length; j++) {
                  resultStr += '<li class="country-list-searched-item" data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'" ><em data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'">'+searchResult[j].chineseName +'</em><span class="tel_code" data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'">'+searchResult[j].phoneCode+'</span></li>';
                }
              }else{
                //国籍
                for (var j = 0; j < searchResult.length; j++) {
                  resultStr += '<li class="country-list-searched-item" data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'" >' + searchResult[j].chineseName + '</li>';
                }
              }
            }
            countryListSearched.innerHTML = resultStr;
            //console.log(resultStr);
            countryListSearched.style.display = 'block';

          }
          else {
            countryListSearched.style.display = 'none';
          }
        },

        addHander: function(){
          var that=countryShow;
          var countryInputZone = document.querySelector('#country-input-zone');
          if (countryInputZone.addEventListener) {
            countryInputZone.addEventListener('input', function(){
              that.countrySearch();
            }, false)
          } else {
            countryInputZone.attachEvent('onpropertychange', that.countrySearch)
          }
        },
        init: function(){
          this.addHander();
          this.countrySearch();
        }
      };
      countryShow.init();
    }

    //点击
    var  targetEle = null;

    //点击时加遮罩，safari防止滑动看见上一步数据
    var countryMask=$('<div class="country_mask" ></div>');
    countryMask.appendTo($(document.body));

    $("body").children().click(function () {});
    document.onclick=function(e){

      var e = e || window.event, target = e.target|| e.srcElement;
      if(target.className == "countries-wrap" || target.parentNode.className == 'countries-wrap'){

        countryMask.show();
        targetEle = target.className == "countries-wrap"?target:target.parentNode;

        //国籍hot
        var countryStrHot=$('#countryList_hot').html();
        var countryWrapHot=ejs.render(countryStrHot,{arrCountry :arrCountry});
        $('#country-wrap-hot').html(countryWrapHot);

        //国籍全部列表
        var countryStr=$('#countryList').html();
        var countryWrap=ejs.render(countryStr,{countryArray:countryArray});
        $('#country-wrap').html(countryWrap);
        search();
        oDiv.style.display='block';
        $('.country_header').show();
        $('#country_index_wrap').show();
        $('.country-cho-wrap').show();
        $('.gj-header').show();


      }else if(target.className == "country_list_hot" || target.parentNode.className == "country_list_hot" || target.className == "country_list" || target.parentNode.className == 'country_list' || target.className == "country-list-searched-item" || target.parentNode.className == 'country-list-searched-item' || target.parentNode.className == "country_list_hot"){
        //展示列表消失
        setTimeout(function(){
          oDiv.style.display='none';
          oTc.style.display='none';
          $('.country_header').hide();
          $('#country_index_wrap').hide();
          if(document.querySelector("#addtra_page .user-content")!=null) {
            $('.gj-header').hide();
            $('.country-cho-wrap').hide();
            $('#addtra_page').css({
              'visibility':'visible',
              'height':n,
              'position':'relative'
            });
            $('#uptra_page').css({
              'visibility':'visible',
              'height':n,
              'position':'relative'
            });
          }
          oInput.value='';

        },500)

        //列表点击赋值
        console.log(targetEle);
        countryMask.hide();
        if(targetEle.className == 'countries-wrap'){
          //国籍赋值
          $(targetEle).find('.country-btn').html($(target).html());
          $(targetEle).find('.country-btn').attr("data-code", $(target).attr("data-code"));
          $(targetEle).find('.country-btn').attr("data-tel-code", $(target).attr("data-tel-code"));

        }else if( targetEle.className == 'p_86 tel-btn'){
          //登录页的+86
          var phonecode='+'+$(target).attr("data-tel-code");
          $(targetEle).find('span').html(phonecode);
          $(targetEle).find('span').attr("data-code", $(target).attr("data-code"));
          $(targetEle).find('span').attr("data-tel-code", $(target).attr("data-tel-code"));
        }else if( targetEle.className == "tel-btn coun-find"){
          //忘记密码页+86
          if(target.className == "country_list_hot" ||target.className == "country_list" || target.className == "country-list-searched-item"){
            var phoneName=$(target).find('em').html();
            var phoneCival=$(target).find('.tel_code').attr("data-code");
            var phonenumber=$(target).find('.tel_code').attr("data-tel-code");
          }else if( target.parentNode.className == "country_list_hot" || target.parentNode.className == "country_list" || target.parentNode.className == "country-list-searched-item" ){
            var phoneName=$(target).parent().find('em').html();
            var phoneCival=$(target).parent().find('.tel_code').attr("data-code");
            var phonenumber=$(target).parent().find('.tel_code').attr("data-tel-code");
          }
          var phonecode=phoneName+'+'+phonenumber;
          $(targetEle).find('div').html(phonecode);
          $(targetEle).find('div').attr("data-code", phoneCival);
          $(targetEle).find('div').attr("data-tel-code", phonenumber);
        }else{
          //添加常旅的+86
          var telCode='+'+$(target).attr("data-tel-code");
          $(targetEle).find('.phone_pre').html(telCode);
          $(targetEle).find('.phone_pre').attr("data-code", $(target).attr("data-code"));
          $(targetEle).find('.phone_pre').attr("data-tel-code", $(target).attr("data-tel-code"));
        }

      }else if(target.className == "con_phone fl" || target.parentNode.className == 'con_phone fl' || target.className == "p_86 tel-btn" || target.parentNode.className == "p_86 tel-btn" || target.className == "tel-btn coun-find" || target.parentNode.className == "tel-btn coun-find"){
        countryMask.show();

        //手机区号
        if( target.className == "con_phone fl" || target.className == "p_86 tel-btn" || target.className == "tel-btn coun-find"){
          targetEle = target;
        }else{
          targetEle = target.parentNode;
        }
        //手机区号hot
        var countryStrHotTel=$('#countryList_hot_tel').html();
        var countryWrapHot=ejs.render(countryStrHotTel,{arrCountry :arrCountry});
        $('#country-wrap-hot').html(countryWrapHot);

        //手机区号全部列表
        var countryStrTel=$('#countryListTel').html();
        var countryWrap=ejs.render(countryStrTel,{countryArray:countryArray});
        $('#country-wrap').html(countryWrap);
        search('code');
        oDiv.style.display='block';
        $('.country_header').show();
        $('#country_index_wrap').show();
        $('.country-cho-wrap').show();
        $('.gj-header').show();
        $('#content-wrap').css('visibility','hidden');
      }
    };


    //右侧a-z点击显示字母
    var targetDiv=$('<div class="a_target" ></div>'),targetTimer;
    targetDiv.appendTo($(document.body));
    $('#country_index_wrap a').click(function(){
      clearTimeout(targetTimer);
      targetDiv.css('visibility','visible');
      targetDiv.html($(this).html());
      targetTimer=setTimeout(function(){
        targetDiv.css('visibility','hidden');
      },500);
    });
  //}

})();

//根据countryCode获得CountryName
function getCountryName(code){
  for(var i=0;i<arrCountry.length; i++)
  {
    if(arrCountry[i].countryCode == code)
    {
      return arrCountry[i];
    }
  }
}

//根据countryCode获得手机区号data-tel-code
function getTelCode(code){
  for(var i=0;i<arrCountry.length; i++)
  {
    if(arrCountry[i].countryCode == code)
    {
      return arrCountry[i];
    }
  }
}

