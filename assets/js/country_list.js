/*国籍选择*/

  'use strict';
  var Parameters = {
    "Parameters": {"LastUpdateTime": "2010-01-01"},
    "ForeEndType": 3,
    "Code":"70100008"
  };
  //console.log(Parameters);
  vlm.loadJson("", JSON.stringify(Parameters), countryback);

  //在原型链定义distinct
  Array.prototype.distinct = function () {
    var sameObj = function (a, b) {
      var tag = true;
      if (!a || !b)return false;
      for (var x in a) {
        if (!b[x])
          return false;
        if (typeof(a[x]) === 'object') {
          tag = sameObj(a[x], b[x]);
        } else {
          if (a[x] !== b[x])
            return false;
        }
      }
      return tag;
    };
    var newArr = [], obj = {};
    for (var i = 0, len = this.length; i < len; i++) {
      if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
        newArr.push(this[i]);
        obj[typeof(this[i]) + this[i]] = this[i];
      }
    }
    return newArr;
  };

  var countryArray={};
  //创建空数组
  function returnRArray () {
    var result = {}, array1 = [], data = arguments[0];
    data.forEach(function (itemValue) {
      array1.push(itemValue.firstPinYin.toUpperCase())
    });
    array1 = array1.distinct();
    array1 = array1.sort();
    array1.forEach(function (item) {
      result[item] = [];
    });
    return result;
  };
  function countryback(ret){
    var json=ret;
    if(json.success){
      var arrCountry=json.data;
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
      //hot
      var countryStrHot=$('#countryList_hot').html();
      var countryWrapHot=ejs.render(countryStrHot,{arrCountry :arrCountry});
      $('#country-wrap-hot').html(countryWrapHot);

      //全部列表
      var countryStr=$('#countryList').html();
      var countryWrap=ejs.render(countryStr,countryArray);
      $('#country-wrap').html(countryWrap);

      //国籍a-z
      var countryStrIndex=$('#country_index').html();
      var countryWrapIndex=ejs.render(countryStrIndex,countryArray);
      $('#country_index_wrap').html(countryWrapIndex);

      var aBtn=document.querySelectorAll('.countries-wrap');
      var aBtn_hot=document.querySelectorAll('.country_hot');
      var aBtn_tel=document.querySelectorAll('.tel-btn');
      var oDiv=document.querySelector('.country-cho-wrap');
      var oInput=document.querySelector('#country-input-zone');
      var oTc=document.querySelector('.country-list-searched');
      var countryListSearched = document.querySelector('.country-list-searched');
      var countryInputZone = document.querySelector('#country-input-zone');

      //国籍选择
      for(var i=0;i<aBtn.length; i++)
      {
        (function(index){
          aBtn[i].onclick=function(){
            var _this=this.querySelector('.country-btn');

            //模糊搜索赋值
            countryListSearched.onclick=function(e){
              _this.innerHTML=e.target.innerHTML;
              $(oCont).attr("data-code", $(e.target).attr("data-code"));
              $(oCont).attr("data-tel-code", $(e.target).attr("data-tel-code"));
              this.style.display='none';
              setTimeout(function(){
                oDiv.style.display='none';
                oTc.style.display='none';
                if(document.querySelector("#addtra_page .user-content")  !=null) {
                  $('.gj-header').css('visibility','hidden');
                  $('.country-cho-wrap').css('visibility','hidden');
                  $('#addtra_page').css({
                    'visibility':'visible',
                    'height':n,
                    'position':'relative'
                  });
                  $('#content').show();
                  $('#uptra_page').css({
                    'visibility':'visible',
                    'height':n,
                    'position':'relative'
                  });
                }
                oInput.value='';

                if($('#uptra_page').length >0){
                  $('#uptra_page').css('visibility','visible');
                }

              },500)
              if($('#addtra_page').length>0)
              {
                if($('#uptra_page')[0].style.display == 'block')
                {
                  if(index == 1 || index == 3)
                  {
                    $('#uptra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                  }
                }
                else{
                  if(index == 1 || index == 3)
                  {
                    $('#addtra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                  }
                }
              }

            };

            oDiv.style.display='block';
            $('.country-cho-wrap').css('visibility','visible');
            $('.gj-header').css('visibility','visible');
            $('#content-wrap').css('visibility','hidden');
            $('#uptra_page').css('visibility','hidden');
            var n;
            n=$(window).height();
            //android 相对位置 防止键盘覆盖问题
            if(document.querySelector("#addtra_page .user-content") !=null) {
              document.querySelector("#addtra_page .user-content").style.position = "absolute";
              document.querySelector("#uptra_page .user-content").style.position = "absolute";
            }

            //国家选择弹层返回按钮
            $('.country-hidden').click(function(){
              $('.gj-header').css('visibility','hidden');
              $('.country-cho-wrap').css('visibility','hidden');
              $('#addtra_page').css({
                'visibility':'visible',
                'height':n,
                'position':'relative'
              });
              $('#content').show();
              $('#uptra_page').css({
                'visibility':'visible',
                'height':n,
                'position':'relative'
              });

            });

            var oCont=document.querySelectorAll('.country-btn');
            var oTab=document.querySelector('.full_country_outer');
            var oTab_hot=document.querySelector('#country-wrap-hot');
            var oInp=document.querySelector('.cl_search input');

            //列表点击后赋值
            function addCont(e){
              oCont[index].innerHTML=e.target.innerHTML;
              $(oCont).eq(index).attr("data-code", $(e.target).attr("data-code"));
              $(oCont).eq(index).attr("data-tel-code", $(e.target).attr("data-tel-code"));
              console.log(e.target);
              setTimeout(function(){
                oDiv.style.display='none';
                oTc.style.display='none';
                if(document.querySelector("#addtra_page .user-content")!=null) {
                  $('.gj-header').css('visibility','hidden');
                  $('.country-cho-wrap').css('visibility','hidden');
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

                if($('#uptra_page').length >0){
                  $('#uptra_page').css('visibility','visible');
                }

              },500)

              if($('#addtra_page').length>0) {
                if ($('#uptra_page')[0].style.display == 'block') {
                  if (index == 1 || index == 3) {
                    $('#uptra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                  }
                }
                else {
                  if (index == 1 || index == 3) {
                    $('#addtra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                  }
                }
              }
              if($('#addAir-page').length>0) {
                $('#addAir-page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
              }
            }
            oTab.onclick=function(e){
              addCont(e);
            };
            oTab_hot.onclick=function(e){
              addCont(e);
            };
          };

          /*国籍模糊搜索*/
          var countryShow = {
            countrySearch: function () {
              var countryInputZone = document.querySelector('#country-input-zone');
              var valueStr = countryInputZone.value;
              var resultStr = '';
              var searchResult = [];

              if (valueStr) {
                for (var i = 0; i < arrCountry.length; i++) {
                  if (arrCountry[i]['chineseName'].indexOf(valueStr)>-1||arrCountry[i]['englishName'].indexOf(valueStr)>-1) {
                    searchResult.push(arrCountry[i]);
                  }
                }

                if (!searchResult.length) {
                  resultStr += '<li class="country-list-searched-item">无搜索结果</li>';
                } else {
                  for (var j = 0; j < searchResult.length; j++) {
                    resultStr += '<li class="country-list-searched-item" data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'" >' + searchResult[j].chineseName + '</li>';
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
        })(i);
      }


      //手机区号选择
      for(var i=0;i<aBtn_tel.length; i++)
      {
        (function(index){
          aBtn_tel[i].onclick=function(){
            var _this=this;

            //模糊搜索赋值
            countryListSearched.onclick=function(e){

              if(_this.className == 'tel-btn coun-find'){
                _this.children[0].innerHTML=$(e.target).html()+'+'+$(e.target).attr("data-tel-code");
              }else if(_this.className == 'p_86 tel-btn'){
                console.log(_this.children[0]);
                _this.children[0].innerHTML='+'+$(e.target).attr("data-tel-code");
              }else{
                _this.innerHTML='+'+$(e.target).attr("data-tel-code");
              }
              this.style.display='none';
              setTimeout(function(){
                oDiv.style.display='none';
                oTc.style.display='none';
                if(document.querySelector("#addtra_page .user-content")  !=null) {
                  $('.gj-header').css('visibility','hidden');
                  $('.country-cho-wrap').css('visibility','hidden');
                  $('#addtra_page').css({
                    'visibility':'visible',
                    'height':n,
                    'position':'relative'
                  });
                  $('#content').show();
                  $('#uptra_page').css({
                    'visibility':'visible',
                    'height':n,
                    'position':'relative'
                  });
                }
                oInput.value='';

                if($('#uptra_page').length >0){
                  $('#uptra_page').css('visibility','visible');
                }

              },500)
              if($('#addtra_page').length>0)
              {
                if($('#uptra_page')[0].style.display == 'block')
                {
                  if(index == 1 || index == 3)
                  {
                    $('#uptra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                  }
                }
                else{
                  if(index == 1 || index == 3)
                  {
                    $('#addtra_page .phone-pre').html('+'+$(e.target).attr('data-tel-code'));
                  }
                }
              }

            };

            oDiv.style.display='block';
            $('.country-cho-wrap').css('visibility','visible');
            $('.gj-header').css('visibility','visible');
            $('#content-wrap').css('visibility','hidden');
            $('#uptra_page').css('visibility','hidden');
            var n;
            n=$(window).height();
            //android 相对位置 防止键盘覆盖问题
            if(document.querySelector("#addtra_page .user-content") !=null) {
              document.querySelector("#addtra_page .user-content").style.position = "absolute";
              document.querySelector("#uptra_page .user-content").style.position = "absolute";
            }

            //国家选择弹层返回按钮
            $('.country-hidden').click(function(){
              $('.gj-header').css('visibility','hidden');
              $('.country-cho-wrap').css('visibility','hidden');
              $('#addtra_page').css({
                'visibility':'visible',
                'height':n,
                'position':'relative'
              });
              $('#content').show();
              $('#uptra_page').css({
                'visibility':'visible',
                'height':n,
                'position':'relative'
              });

            });

            var oCont=document.querySelectorAll('.tel-btn');
            var oTab=document.querySelector('.full_country_outer');
            var oTab_hot=document.querySelector('#country-wrap-hot');
            var oInp=document.querySelector('.cl_search input');

            //列表点击后赋值
            function addContTel(e){
              
              if(_this.className == 'tel-btn coun-find'){
                _this.children[0].innerHTML=$(e.target).html()+'+'+$(e.target).attr("data-tel-code");
              }else if(_this.className == 'p_86 tel-btn'){
                console.log(_this.children[0]);
                _this.children[0].innerHTML='+'+$(e.target).attr("data-tel-code");
              }else{
                _this.innerHTML='+'+$(e.target).attr("data-tel-code");
              }
              setTimeout(function(){
                oDiv.style.display='none';
                oTc.style.display='none';
                if(document.querySelector("#addtra_page .user-content")!=null) {
                  $('.gj-header').css('visibility','hidden');
                  $('.country-cho-wrap').css('visibility','hidden');
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

                if($('#uptra_page').length >0){
                  $('#uptra_page').css('visibility','visible');
                }

              },500)

              if($('#addtra_page').length>0) {
                if ($('#uptra_page')[0].style.display == 'block') {
                  if (index == 1 || index == 3) {
                    $('#uptra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                  }
                }
                else {
                  if (index == 1 || index == 3) {
                    $('#addtra_page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
                  }
                }
              }
              if($('#addAir-page').length>0) {
                $('#addAir-page .phone-pre').html('+' + $(e.target).attr('data-tel-code'));
              }
            }
            oTab.onclick=function(e){
              addContTel(e);
            };
            oTab_hot.onclick=function(e){
              addContTel(e);
            };
          };

          /*国籍模糊搜索*/
          var countryShow = {
            countrySearch: function () {
              var countryInputZone = document.querySelector('#country-input-zone');
              var valueStr = countryInputZone.value;
              var resultStr = '';
              var searchResult = [];

              if (valueStr) {
                for (var i = 0; i < arrCountry.length; i++) {
                  if (arrCountry[i]['chineseName'].indexOf(valueStr)>-1||arrCountry[i]['englishName'].indexOf(valueStr)>-1) {
                    searchResult.push(arrCountry[i]);
                  }
                }

                if (!searchResult.length) {
                  resultStr += '<li class="country-list-searched-item">无搜索结果</li>';
                } else {
                  for (var j = 0; j < searchResult.length; j++) {
                    resultStr += '<li class="country-list-searched-item" data-tel-code="'+searchResult[j].phoneCode+'" data-code="'+searchResult[j].countryCode+'" >' + searchResult[j].chineseName + '</li>';
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
        })(i);
      }


    }else{
      jAlert(json.message);
    }


  }


  //根据CountryCode获得CountryName
  function getCountryName(code){
    for(var i=0;i<arrCountry.length; i++)
    {
      if(arrCountry[i].CountryCode == code)
      {
        return arrCountry[i];
      }
    }
  }

  //根据CountryCode获得手机区号data-tel-code
  function getTelCode(code){
    for(var i=0;i<arrCountry.length; i++)
    {
      if(arrCountry[i].CountryCode == code)
      {
        return arrCountry[i];
      }
    }
  }

