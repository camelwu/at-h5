//解决300毫秒延迟问题
window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);

var utils = {
  "getbyid": function (id) {
    return document.getElementById(id);
  },
  "getbytag": function (obj, tag) {
    return obj.getElementsByTagName(tag);
  },
  "getbyclass": function (obj, sClass) {
    if (obj.getElementsByClassName) {
      return obj.getElementsByClassName(sClass);
    } else {
      var aResult = [];
      var aEle = obj.getElementsByTagName('*');
      var reg = new RegExp('\\b' + sClass + '\\b', 'g');
      for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className.search(reg) != -1) {
          aResult.push(aEle[i]);
        }
      }
      return aResult;
    }
  },
  "addClass": function (obj, sClass) {
    if (obj.className) {
      var reg = RegExp('\\b' + sClass + '\\b', 'g');
      if (obj.className.search(reg) == -1) {
        obj.className += ' ' + sClass;
      }
    } else {
      obj.className = sClass;
    }
  },
  "removeClass": function (obj, sClass) {
    if (obj.className) {
      var reg = new RegExp('\\b' + sClass + '\\b', 'g');
      if (obj.className.search(reg) != -1) {
        obj.className = obj.className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        if (!obj.className) {
          obj.removeAttribute('class');
        }
      }
    }
  },
  "bind": function (obj, sEv, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(sEv, fn, false);
    } else {
      obj.attachEvent('on' + sEv, fn);
    }
  },
  "removeBind": function (obj, sEv, fn) {
    if (obj.removeEventListener) {
      obj.removeEventListener(sEv, fn, false);
    } else {
      obj.detachEvent('on' + sEv, fn);
    }
  },
  "setSession": function (name, json) {
    window.sessionStorage.setItem(name, JSON.stringify(json));
  },
  "getSession": function (name) {
    return sessionStorage.getItem(name) ? JSON.parse(window.sessionStorage.getItem(name)) : null;
  }
};


// asiaHlHistory存储排序相关
var hlHis = utils.getSession('asiaHlHistory') || {};
utils.setSession('asiaHlHistory', hlHis);


/*每隔30毫秒，读取DOM，以隐藏preloader。此段代码优化后删除*/
var oUl = document.getElementById('hotelList');
$(window).load(function () {
  var timer = null;
  timer = setInterval(function () {
    if ($('#hotelList').children().length) {
      $("#status-h").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
      clearInterval(timer);
    }
  }, 30);
});


/**
 *  http://jira.asiatravel.net:8088/browse/H5-1397
 *  问题描述：酒店列表中，根据选中的位置传参，如locationList:'Sentosa Island$City Hall$Bugis Vicinity$Bugis Vicinity'。返回新的地理位置locationList:["Sentosa Island", "City Hall", "Bugis Vicinity"]，这时不应该将选中的位置存起，否则下次刷新页面会造成丢失其他地理位置，导致查询的列表结果不正确
 *
 *  解决方式：
 *  后端
 *    改为第一次请求，返回一个全量的地理位置信息。
 *  前端
 *    进入列表页，缓存全量位置信息
 *    刷新页面或返回到当前页面，缓存全量位置信息；如果过滤条件未变更(刷新页面、详情页回退)，使用Storage中的全量位置信息
 *
 */

(function () {
  // 获取href中的参数
  var str = window.location.href;
  var urlArgs = url2json(str);

  var list_oUl = utils.getbyid('hotelList');

  var oBody = document.getElementsByTagName('body')[0];
  // 初始化加载列表标记
  var addressFlag = true;

  var preloader = document.getElementById('preloader');

  // 筛选相关（事件绑定）
  function filterSettings() {
    var rli = [],
      sli1 = [],
      sli2 = [];
    var mb;

    function _(s) {
      return document.getElementById(s);
    }

    var rank = _("rank");
    var screen = _("screen");
    var location = _("location");
    var fo_ra = _("fo_ra");
    var fo_sc = _("fo_sc");
    var fo_lo = _("fo_lo");
    var s_but = _("s_but");
    var l_but = _("l_but");
    var s_cancelBtn = _("cancelBtn");
    var l_cancelBtn = _("l_cancelBtn");
    var l_clearBtn = _("l_clearBtn");

    function show(obj) {
      mb = document.getElementById("r-mb");
      body = document.getElementsByTagName("body");
      mb.style.display = "block";
      obj.style.bottom = "0";
      obj.style.transition = "all 350ms";
      body[0].style.overflow = "hidden"
    }

    function close(obj) {
      var windowHeight = window.innerHeight;
      mb = document.getElementById("r-mb");
      mb.style.display = "none";
      obj.style.bottom = -windowHeight + 'px';
      obj.style.transition = "all 350ms";
    }

    function mb_close(event) {
      var windowHeight = window.innerHeight;
      mb = document.getElementById("r-mb");
      mb.style.display = "none";
      if (rank.style.display == "" || rank.style.display == "block") {
        rank.style.bottom = -windowHeight + 'px';
        rank.style.transition = "all 350ms";
        $("#l_but").removeClass("s-but-checked");
        $("#s_but1").removeClass("s-but-checked");
      }
      if (screen.style.display == "" || screen.style.display == "block") {
        screen.style.bottom = -windowHeight + 'px';
        screen.style.transition = "all 350ms";
        $("#l_but").removeClass("s-but-checked");
        $("#s_but1").removeClass("s-but-checked");
      }
      if (location.style.display == "" || location.style.display == "block") {
        location.style.bottom = -windowHeight + 'px';
        location.style.transition = "all 350ms";
        $("#l_but").removeClass("s-but-checked");
        $("#s_but1").removeClass("s-but-checked");
      }
    }

    /*   酒店筛选  */
    function selectType() {
      var obj = window.event.srcElement;
      var oName = obj.className;
      var array = [];
      var selected = [];
      if (obj.innerText == "不限") {
        array = document.getElementById("h-type").childNodes;
        for (var i = 1; i < array.length; i++) {
          array[i].className = "s-li";
        }
      }
      if (obj.innerText != "不限") {
        document.getElementById("h-type").firstElementChild.className = "s-li";
      }
      if (oName == "s-li") {
        obj.className = "s-li1";
      } else {
        obj.className = "s-li";
      }
      //如果一个都没有选中的情况，显示不限；
      array = document.getElementById("h-type").childNodes;
      for (var j = 0, len = array.length; j < len; j++) {
        if (array[j].className == "s-li1") {
          selected.push(array[j].innerText);
        }
      }
      if (selected.length == 0) {
        document.getElementById("h-type").firstElementChild.className = "s-li1";
      }
    }

    function selectLevel() {
      var obj = window.event.srcElement;
      var oName = obj.className;
      var array = [];
      var selected = [];
      if (obj.innerText == "不限") {
        array = document.getElementById("h-level").childNodes;
        for (var i = 1; i < array.length; i++) {
          array[i].className = "s-li";
        }
      }
      if (obj.innerText != "不限") {
        document.getElementById("h-level").firstElementChild.className = "s-li";
      }
      if (oName == "s-li") {
        obj.className = "s-li1";
      } else {
        obj.className = "s-li";
      }
      //如果一个都没有选中的情况，显示不限；
      array = document.getElementById("h-level").childNodes;
      for (var j = 0, len = array.length; j < len; j++) {
        if (array[j].className == "s-li1") {
          selected.push(array[j].innerText);
        }
      }
      if (selected.length == 0) {
        document.getElementById("h-level").firstElementChild.className = "s-li1";
      }
    }

    function openClick(obj1, obj2) {
      obj1.onclick = function () {
        show(obj2);
        mb.addEventListener("click", mb_close);
        mb.addEventListener("touchmove", function (event) {
          event.preventDefault();
        })
      }
    }

    function closeClick(obj1, obj2) {
      obj1.onclick = function () {
        close(obj2);
      }
    }


    var init = function () {

      /*   排序筛选   */
      function selectRank() {
        var obj = window.event.srcElement;
        var rank = document.getElementById("rank");
        var mb = document.getElementById("r-mb");
        var color = obj.style.color;
        if (color == "rgb(123, 195, 0)") {
          mb.style.display = "none";
          rank.style.bottom = -550 + 'px';
          rank.style.transition = "all 350ms";
        } else {
          for (var i = 0; i < rli.length; i++) {
            if (rli[i].style.color == "rgb(123, 195, 0)") {
              var bb = rli[i].getElementsByTagName("b")[0];
              rli[i].removeChild(bb);
            }
            rli[i].style.color = "#333333";
          }
          obj.style.color = "#7bc300";
          var b = document.createElement("b");
          b.className = "hl-icon4";
          obj.appendChild(b);
          mb.style.display = "none";
          rank.style.bottom = -550 + 'px';
          rank.style.transition = "all 350ms";
        }
      }

      //insert
      sli1 = document.getElementById("h-level").childNodes;
      for (var j = 0; j < sli1.length; j++) {
        sli1[j].addEventListener("click", selectLevel);
      }
      sli2 = document.getElementById("h-type").childNodes;
      for (var k = 0; k < sli2.length; k++) {
        sli2[k].addEventListener("click", selectType);
      }
      rli = document.getElementsByClassName("r-li");
      for (var i = 0; i < rli.length; i++) {
        rli[i].addEventListener("click", selectRank);
      }
      //back button
      $(".header").on("click", ".header_back", function (event) {
        //清空缓存记录
        // window.sessionStorage.removeItem("asiaHlHistory");
        var myAsiaHlHistory = JSON.parse(window.sessionStorage.getItem('asiaHlHistory'));
        if (myAsiaHlHistory.hlSort) {
          window.sessionStorage.removeItem("asiaHlHistory");
        }
      });
    };
    init();

    // 推荐顺序、筛选、位置点击事件
    openClick(fo_ra, rank);
    openClick(fo_sc, screen);
    openClick(fo_lo, location);

    // 筛选取消按钮、确定按钮
    closeClick(s_but, screen);
    closeClick(s_cancelBtn, screen);

    // 地理位置取消按钮、确定按钮
    closeClick(l_cancelBtn, location);
    closeClick(l_but, location);

  }

  filterSettings();

  // 拼接参数，请求数据
  function getListByPage(json) {
    // json就是地址栏参数urlArgs。
    preloader.style.display = 'block';
    //status_h.style.display = 'block';
    var hotelList = document.getElementById('hotelList');
    var hoPos = localStorage.getItem('hoPos');
    //hotelList.innerHTML = '';
    json = json || {};
    json.rank = json.rank || ''; //使用默认排序
    // json.InterCityName = decodeURIComponent(json.InterCityName.replace(/\+/g, "%20")) || 'Singapore';
    json.InterCityName = json.InterCityName.replace(/\+/g, " ") || 'Singapore';
    json.DomCityName = json.DomCityName.replace(/\+/g, " ") || '北京';
    json.NumRoom = json.NumRoom || '1';
    json.NumChild = json.NumChild || '1';
    json.NumAdult = json.NumAdult || '1';
    json.Category = json.Category || '';
    json.StarRating = json.StarRating || '';
    json.LocationList = json.LocationList || '';
    if (hoPos == 'inter') {
      json.CountryISOCode = decodeURIComponent(json.InterCountryISOCode) || 'SG';
    } else {
      json.CountryISOCode = decodeURIComponent(json.DomCountryISOCode) || 'CN';
    }
    json.pageIndex = json.pageIndex || 1;
    json.pageSize = json.pageSize || 20;
    var oDate = new Date();
    var y = oDate.getFullYear();
    var m = oDate.getMonth() + 1;
    var d = oDate.getDate();
    json.InterCheckInDate = json.InterCheckInDate || y + '-' + m + '-' + d;
    json.InterCheckOutDate = json.InterCheckOutDate || y + '-' + m + '-' + (d + 1);

    //获得的目的地名字在城市列表里面进行搜索，然后获得英文名字
    var hl_cityListInfo = JSON.parse(window.localStorage.getItem('cityListInfo'));

    //对获取的城市名字进行处理，得到汉字名字
    function cityNameChange(cityName) {
      if (cityName.indexOf('(') != -1) {
        cityName = cityName.substring(0, cityName.indexOf('('));
      }
      return cityName;
    }


    //显示筛选状态
    var leftEle = document.getElementById('fo_ra'),
      middleEle = document.getElementById('fo_sc'),
      rightEle = document.getElementById('fo_lo');
    if (json.rank != "" && json.rank != "PriorityDESC") {
      leftEle.querySelector("i").className = "red-tip";
    } else {
      leftEle.querySelector("i").className = "";
    }
    if (json.Category != "" || json.StarRating != "") {
      middleEle.querySelector("i").className = "red-tip";
    } else {
      middleEle.querySelector("i").className = "";
    }
    if (json.LocationList != "") {
      rightEle.querySelector("i").className = "red-tip";
    } else {
      rightEle.querySelector("i").className = "";
    }

    json.InterCityName = cityNameChange(json.InterCityName);
    json.DomCityName = cityNameChange(json.DomCityName);
    //对得到的汉字名字进行处理，得到英文名字和三字码
    /*for (var i = 0; i < hl_cityListInfo.length; i++) {

     if (json.DomCityName == hl_cityListInfo[i].cityNameCN) {
     json.DomCityName = hl_cityListInfo[i].cityNameEN;
     json.CountryISOCode = hl_cityListInfo[i].countryISOCode;
     }
     if ((json.InterCityName == hl_cityListInfo[i].cityNameEN) || (json.DomCityName == hl_cityListInfo[i].cityNameEN)) {
     json.CountryISOCode = hl_cityListInfo[i].countryISOCode;
     }
     }*/

    //判断点击的是国际酒店按钮还是国内酒店按钮
    var pattern = /^([\u4e00-\u9fa5])*$/;
    if (hoPos == 'inter') {
      //中文,需要匹配
      if (pattern.test(json.InterCityName)) {
        for (var i = 0; i < hl_cityListInfo.length; i++) {
          if (json.InterCityName == hl_cityListInfo[i].cityNameCN) {
            json.InterCityName = hl_cityListInfo[i].cityNameEN;
            json.CountryISOCode = hl_cityListInfo[i].countryISOCode;
            break;
          }
        }
      }
      var data = {
        "Parameters": {
          'CultureName': 'zh-CN',
          'PartnerCode': '1000',
          'CountryISOCode': json.CountryISOCode,
          'CityName': json.InterCityName,
          'CheckInDate': json.InterCheckInDate + 'T00:00:00',
          'CheckOutDate': json.InterCheckOutDate + 'T00:00:00',
          'NumRoom': json.NumRoom,
          'NumAdult': json.NumAdult,
          'NumChild': json.NumChild,
          'childAges': JSON.parse(sessionStorage.h_agesArr),
          'InstantConfirmation': true,
          'AllOccupancy': true,
          'PageIndex': json.pageIndex,
          'PageSize': json.pageSize,
          'sorttype': json.rank,
          'Category': json.Category,
          'StarRating': json.StarRating,
          'LocationList': json.LocationList
        },
        "Code": "0007",
        "ForeEndType": 3
      };
    } else if (hoPos = 'dom') {
      //中文,需要匹配
      if (pattern.test(json.DomCityName)) {
        for (var i = 0; i < hl_cityListInfo.length; i++) {
          if (json.DomCityName == hl_cityListInfo[i].cityNameCN) {
            json.DomCityName = hl_cityListInfo[i].cityNameEN;
            json.CountryISOCode = hl_cityListInfo[i].countryISOCode;
            break;
          }
        }
      }
      var data = {
        "Parameters": {
          'CultureName': 'zh-CN',
          'PartnerCode': 'ACX98110SG',
          'CountryISOCode': 'CN',
          'CityName': json.DomCityName,
          'CheckInDate': json.DomCheckInDate + 'T00:00:00',
          'CheckOutDate': json.DomCheckOutDate + 'T00:00:00',
          'NumRoom': '1',
          'NumAdult': '1',
          'NumChild': '0',
          'InstantConfirmation': true,
          'AllOccupancy': true,
          'PageIndex': json.pageIndex,
          'PageSize': json.pageSize,
          'sorttype': json.rank,
          'Category': json.Category,
          'StarRating': json.StarRating,
          'LocationList': json.LocationList
        },
        "Code": "0007",
        "ForeEndType": 3
      };
    }

    //设置pageIndex 在酒店列表容器上 用于判断是加载更多还是正常加载
    document.getElementById("hotelList").setAttribute("data-index", json.pageIndex);


    function getListByPageCallback(json) {
      if (json.success) {
        var data = json.data[0];
        renderList(data);
      } else {
        // 请求失败报错
        if (json.message == '远程服务器返回错误: (500) 内部服务器错误。' || json.message == '目的地搜索酒店时出错(Error Occurs While SearchHotelByDest)') {
          // if (json.Message == '远程服务器返回错误: (500) 内部服务器错误。') {
          document.getElementById("loadMore").style.display = "none";
          var oLi = document.createElement('li');
          oLi.innerHTML = '<div><img src="../images/error/blank.png" /><p class="hotelConSorry1">没有找到相关信息，请重新查询</p><a href = "index.html" class="hotelConSorry2">点击页面 进入搜索页</a></div>';
          oLi.className = 'hotelConNo';
          oUl.style.width = '100%';
          oUl.style.height = '90%';
          oUl.appendChild(oLi);
          oLi.style.display = "block";
        } else if (json.message == 'There is no hotel on the selected destination.') {
          var data = {
            'hotelList': [],
            'locationList': []
          };
          renderList(data);
        } else {
          //alert(json.message);
          var data = {
            'hotelList': [],
            'locationList': []
          };
          renderList(data);
        }
        //window.history.go(-1);
      }
    }

    data.Parameters = JSON.stringify(data.Parameters)
    if (json.pageIndex == 1) {
      return vlm.loadJson("", JSON.stringify(data), getListByPageCallback);
    } else {
      return vlm.loadJson("", JSON.stringify(data), getListByPageCallback, false, false, true);
    }

  }

  //数据展示部分
  function renderList(data) {
    if (!data) return;
    var locationList = data.locationList;
    // 未查询过位置，缓存全量位置信息
    if (urlArgs.LocationList === '') {
      sessionStorage.setItem('hotel-locationList', JSON.stringify(locationList));
    }

    var hotelList = data.hotelList;
    var oUl = utils.getbyid('hotelList');
    var liHtml = "";
    var loadSign = document.getElementById("hotelList").getAttribute("data-index") > 1 ? true : false; //true 加载更多
    //如果不是加载更多，清空节点内容
    if (!loadSign) {
      list_oUl.innerHTML = "";
    }
    if (hotelList.length > 1) {
      for (var i = 0; i < hotelList.length; i++) {
        var str1 = hotelList[i].starRating.substring(0, 1);
        var str2 = '';
        var str3 = '';
        var str4 = '';
        if (hotelList[i].isFreeWiFi) {
          //str2+='<b class="hl-icon1">免费wifi</b>';
          str2 += '<span class="h-wifi hotel_content_wifi"></span>';
        }
        if (hotelList[i].isFreeTransfer) {
          //str2+='<b class="hl-icon2">免费接送</b>';
          str2 += '<span class="h-transfer hotel_content_transfer"></span>';
        }
        if (hotelList[i].isCashRebate) {
          //str3 = '<div class="h-div1 hotel_content_div1">返现</div>';
        }
        if (hotelList[i].isFreeCityTour) {
          //str4 = '<div class="h-div1 hotel_content_div1">免费景点</div>';
        }

        //有地区地址就给地址加括号，没有就不加
        /*if (hotelList[i].location) {
         hotelList[i].location = '(' + hotelList[i].location + ')';
         }*/

        var scoreHtml = "";
        if (!hotelList[i].hotelReviewScore && !hotelList[i].hotelReviewCount) {
          scoreHtml = '<span class="hotel_content_score_span">&nbsp;</span><span>&nbsp;  </span>'
        } else {
          scoreHtml = '<span class="hotel_content_score_span">' + hotelList[i].hotelReviewScore.toFixed(1) + '分</span><span>' + hotelList[i].hotelReviewCount + '人点评</span>'
        }
        var namestr = hotelList[i].hotelNameLocale != null && hotelList[i].hotelNameLocale != "" ? hotelList[i].hotelNameLocale + '(' + hotelList[i].hotelName + ')' : hotelList[i].hotelName,
          str = '<li class="ho_list hotel_list" data-freeTransfer="' + hotelList[i].isFreeTransfer + '" data-hotelCode="' + hotelList[i].hotelCode + '" data-InstantConfirmation="' + hotelList[i].InstantConfirmation + '" hotelList-AllOccupancy="' + hotelList[i].AllOccupancy + '">' + '<div class="ho_pic hotel_picture">' + '<img  src="../images/loading_def_small.png" data-src="' + hotelList[i].frontPgImage + '" class="ho_img"/ data-all="' + hotelList[i] + '">' + '</div>' + '<div class="ho_infor hotel_content">' + '<h3 class="hname hotel_name">' + namestr + '</h3>' + '<div class="hotel_content_score">' + scoreHtml + '<p class="hotel_content_price">' + '<span class = "hotel_content_price_start1">￥</span>' + '<span >' + hotelList[i].avgPriceCNY + '</span>' + '<span class ="hotel_content_price_start">起</span>' + '</p>' + '</div>' + '<div class="hotel_content_grade">' + '<span>' + num2chin(str1) + '星级</span>' + str2 + str3 + str4 + '</div>' + '<p class="h-address hotel_content_address">' + hotelList[i].location + '</p>' + '</div>' + '</li>';

        liHtml += str;
      }
      //筛选无结果到有结果时样式调整
      oUl.style.height = '';

      //fixed 页面滑动到底部后 清空内容重新赋值时页面还在底部
      var timer = setTimeout(function () {
        list_oUl.innerHTML += liHtml;

        var moreEle = document.getElementById("loadMore");
        moreEle.style.display = "block";
        if (hotelList.length < urlArgs.pageSize) {
          moreEle.setAttribute("data-more", "no");
          moreEle.innerHTML = "没有更多数据了";
        } else {
          moreEle.setAttribute("data-more", "yes");
          moreEle.innerHTML = "点击加载更多";
        }


        //懒加载
        new lazyLoad('hotelList');

        //获取酒店详情
        function getDetail(hotelList) {
          var hotelRefers = document.getElementsByClassName('ho_list');
          var toDetail = function (that) {
            var paraObj = {};
            var hoPos = localStorage.getItem('hoPos');

            paraObj.HotelID = that.getAttribute('data-hotelCode');
            paraObj.HotelCode = that.getAttribute('data-hotelCode');

            // paraObj.PartnerCode=hotelList[that.index].PartnerCode!=null?hotelList[that.index].PartnerCode:1000;
            paraObj.InstantConfirmation = (that.getAttribute('data-InstantConfirmation') != undefined && that.getAttribute('data-InstantConfirmation') != "undefined") ? that.getAttribute('data-InstantConfirmation') : false;
            paraObj.AllOccupancy = (that.getAttribute('data-AllOccupancy') != undefined && that.getAttribute('data-AllOccupancy') != "undefined") ? that.getAttribute('data-AllOccupancy') : true;
            if (hoPos == 'inter') {
              //国际
              paraObj.CheckInDate = urlArgs.InterCheckInDate;
              paraObj.CheckOutDate = urlArgs.InterCheckOutDate;
            } else if (hoPos == 'dom') {
              //国内
              paraObj.CheckInDate = urlArgs.DomCheckInDate;
              paraObj.CheckOutDate = urlArgs.DomCheckOutDate;
            }

            paraObj.NumRoom = urlArgs.NumRoom;
            paraObj.NumAdult = urlArgs.NumAdult;
            paraObj.NumChild = urlArgs.NumChild;
            //免费接送图标
            paraObj.freeTransfer = that.getAttribute('data-freeTransfer');

            var paramStr = "";
            for (var attr in paraObj) {
              paramStr += "&" + attr + "=" + paraObj[attr];
            }
            paramStr = paramStr.slice(1);
            window.location.href = 'hotel_detail.html?' + paramStr;
          }
          for (var i = 0; i < hotelRefers.length; i++) {
            hotelRefers[i].onclick = function () {
              var that = this;
              toDetail(that);
            }
          }
        }

        //绑定跳转事件
        getDetail(hotelList);

        clearTimeout(timer);
      }, 50);


      //function screenDir(){
      //    if(window.orientation==180||window.orientation==0){
      //        //alert('竖屏状态');
      //        var hnameWidth=(list_oUl.offsetWidth-140);
      //    }
      //    if(window.orientation==90||window.orientation==-90){
      //        //alert('横屏状态');
      //        var hnameWidth=(list_oUl.offsetWidth-140);
      //    }
      //    for(var j=0;j<hl_hname.length;j++){
      //        hl_hname[j].style.width=hnameWidth+'px';
      //    }
      //}
      //window.addEventListener('onorientationchange' in window?'onorientationchange':'resize',screenDir,false);


    } else {
      if (hotelList.length = 1) {
        document.getElementById("loadMore").style.display = "none";
        console.log(document.getElementById("loadMore"));
        var oLi = document.createElement('li');
        oLi.innerHTML = '<div><img src="../images/error/blank.png" /><p class="hotelConSorry1">非常抱歉，无符合要求的酒店。</p><p class="hotelConSorry2">建议您扩大搜索范围</p></div>';
        oLi.className = 'hotelConNo';
        oUl.appendChild(oLi);
        console.log(document.getElementsByClassName("hotelConNo"));
        document.getElementsByClassName("hotelConNo")[0].style.display = "block";
        oUl.style.width = '100%';
        oUl.style.height = '90%';

      }
      if (urlArgs.pageIndex >= 1) {
        document.getElementById("loadMore").innerHTML = "没有更多数据了";
      }
    }
    //位置交互部分
    function hlAddress(locationList) {
      locationList = utils.getSession('hotel-locationList');
      locationList = locationList ? locationList : [];

      var oUl = document.getElementById('l-ul');
      //模板添加内容
      oUl.innerHTML = '<li class="l-li l-liFirst">' + '<p class="l-p">不限</p>' + '<b class="l-icon1 l-icon1First"></b>' + '</li>';

      for (var i = 0; i < locationList.length; i++) {
        var str = '<li class="l-li">' + '<p class="l-p">' + locationList[i] + '</p>' + '<b class="l-icon1"></b>' + '</li>';
        oUl.innerHTML += str;
      }
      var liFirst = utils.getbyclass(oUl, 'l-liFirst')[0];
      var aLi = utils.getbyclass(oUl, 'l-li');
      var bOk = true;
      var aOk = {};
      for (var i = 1; i < aLi.length; i++) {
        aOk[i] = true;
      }
      //联动选项
      //“不限”点击事件

      utils.bind(liFirst, 'click', function () {
        utils.removeClass(liFirst, 'l-li3');
        for (var i = 1; i < aLi.length; i++) {
          utils.removeClass(aLi[i], 'l-li-active')
        }
        for (var i = 1; i < aLi.length; i++) {
          aOk[i] = true;
        }
      });

      //每个地区的点击事件
      for (var i = 1; i < aLi.length; i++) {
        (function (index) {
          utils.bind(aLi[index], 'click', function () {
            if (aOk[index]) {
              utils.addClass(aLi[index], 'l-li-active');
            } else {
              utils.removeClass(aLi[index], 'l-li-active');
            }
            aOk[index] = !aOk[index];
            var n = 0;
            for (var j = 1; j < aLi.length; j++) {
              if (!aOk[j]) {
                utils.addClass(liFirst, 'l-li3');
                bOk = false;
              } else {
                n++;
              }
            }
            if (n == aLi.length - 1) {
              utils.removeClass(liFirst, 'l-li3');
              bOk = true;
            }
          });
        })(i);
      }
    }

    // 初次请求页面数据成功后，缓存全量地理位置信息
    //如果是第一次执行就加载城市，如果不是第一次执行就不用二次加载了，间接实现历史记忆功能
    if (addressFlag) {
      hlAddress(locationList);
    }
    addressFlag = false;
    //位置信息 恢复缓存中状态   获取到数据后  再执行一次
    locationHistory();


    /*每隔30毫秒，读取DOM，以隐藏preloader。此段代码优化后删除*/
    $(function () {
      var timer = null;
      clearInterval(timer);
      timer = setInterval(function () {
        if ($('#hotelList').children().length) {
          $("#status-h").fadeOut();
          $("#preloader").delay(400).fadeOut("medium");
          clearInterval(timer);
        }
      }, 30);
    });

  }

  //推荐排序 恢复缓存中状态
  var myAsiaHlHistory = JSON.parse(window.sessionStorage.getItem('asiaHlHistory'));

  function sortHistory(myAsiaHlHistory) {
    var hlSortLi = utils.getbyid('rankWrapper').children;
    if (!myAsiaHlHistory.hlSort)
      return;
    for (var i = 0; i < hlSortLi.length; i++) {
      if (myAsiaHlHistory.hlSort.chinese && hlSortLi[i].innerHTML.indexOf(myAsiaHlHistory.hlSort.chinese) != -1) {
        urlArgs.rank = myAsiaHlHistory.hlSort.english;
        for (var j = 0; j < hlSortLi.length; j++) {
          hlSortLi[j].style.color = '#333333';
          var oB = hlSortLi[j].getElementsByTagName('b');
          if (oB.length) {
            hlSortLi[j].removeChild(oB[0]);
          }
        }
        hlSortLi[i].style.color = '#7bc300';
        var b = document.createElement("b");
        b.className = "hl-icon4";
        hlSortLi[i].appendChild(b);
      }
    }
  }

  sortHistory(myAsiaHlHistory);


  //筛选 恢复缓存中状态
  function filterHistory(myAsiaHlHistory) {
    if (!myAsiaHlHistory.hlFilter)
      return;
    var hLevel = document.getElementById('h-level');
    var hType = document.getElementById('h-type');
    var hLevelLi = hLevel.children;
    var hTypeLi = hType.children;

    function filterAli(obj) {
      var sign = false;
      for (var i = 0; i < obj.length; i++) {
        if (myAsiaHlHistory.hlFilter.chinese.indexOf(obj[i].innerText) != -1) {
          sign = true;
          obj[i].className = 's-li1';
        } else {
          obj[i].className = 's-li';
        }
      }
      if (!sign) {
        obj[0].className = 's-li1';
      }
    }

    filterAli(hLevelLi);
    filterAli(hTypeLi);
    urlArgs.StarRating = myAsiaHlHistory.hlFilter.star;
    urlArgs.Category = myAsiaHlHistory.hlFilter.hotelType;
  }

  filterHistory(myAsiaHlHistory);


  //位置信息 恢复缓存中状态   获取到数据后  再执行一次
  function locationHistory() {
    var myAsiaHlHistory = JSON.parse(window.sessionStorage.getItem('asiaHlHistory'));
    if (!myAsiaHlHistory.hlLocation)
      return;
    var hLocation = document.getElementById('l-ul');
    var hLocationLi = hLocation.children

    function resetStatus(obj) {
      var selectedLocationList = myAsiaHlHistory.hlLocation.list.split("$");
      var locationLen = selectedLocationList.length;
      if (locationLen > 1 && hLocationLi[0]) {
        hLocationLi[0].classList.add("l-li3");
      }
      for (var i = 0; i < obj.length; i++) {
        for (var j = 0; j < locationLen; j++) {
          if (obj[i].firstChild.innerText == selectedLocationList[j]) {
            obj[i].classList.add('l-li-active');
          }
        }
      }
    }

    resetStatus(hLocationLi);
    urlArgs.LocationList = myAsiaHlHistory.hlLocation.list;
  }

  locationHistory();


  getListByPage(urlArgs);

  //推荐排序里面的点击事件（交互）
  utils.bind(oBody, 'click', function (ev) {
    var oEvent = ev || event;
    var oSrc = oEvent.srcElement || oEvent.target;
    hlHis.hlSort = hlHis.hlSort || {};
    hlHis.hlSort.chinese = hlHis.hlSort.chinese || "";
    hlHis.hlSort.english = hlHis.hlSort.english || "";

    if (oSrc.className == 'r-li') {
      var oSrc_str = oSrc.innerHTML;
      if (oSrc_str.indexOf('推荐排序') != -1) {
        urlArgs.rank = 'PriorityDESC';
        hlHis.hlSort.chinese = '推荐排序';
        hlHis.hlSort.english = 'PriorityDESC';
      } else if (oSrc_str.indexOf('价格升序') != -1) {
        urlArgs.rank = 'PriceASC';
        hlHis.hlSort.chinese = '价格升序';
        hlHis.hlSort.english = 'PriceASC';
      } else if (oSrc_str.indexOf('价格降序') != -1) {
        urlArgs.rank = 'PriceDESC';
        hlHis.hlSort.chinese = '价格降序';
        hlHis.hlSort.english = 'PriceDESC';
      } else if (oSrc_str.indexOf('好评优先') != -1) {
        urlArgs.rank = 'ReviewscoreDESC';
        hlHis.hlSort.chinese = '好评优先';
        hlHis.hlSort.english = 'ReviewscoreDESC';
      }
      utils.setSession('asiaHlHistory', hlHis);
      //页码重置
      urlArgs.pageIndex = 1;
      getListByPage(urlArgs);
    }
    //筛选滑动穿透问题
    ATplugins.ScrollLayer().scroll("#rank", '#rankWrapper');
    //ATplugins.ScrollLayer().scroll("#screen", '#screenWrapper');
    // ATplugins.ScrollLayer().scroll("#location", '#locationWrapper');
  });
  //筛选里面确定按钮的点击事件（交互）
  utils.bind(oBody, 'click', function (ev) {
    var oEvent = ev || event;
    var oFilter = document.getElementById('screen');
    var oSrc = oEvent.srcElement || oEvent.target;
    //设置弹出框的最大高度
    var clienH = document.documentElement.clientHeight;
    oFilter.style.maxHeight = 7.8 + 'rem';

    //确定按钮点击事件
    if (oSrc.getAttribute('id') == 's_but') {
      var hl_star_str = '';
      var hl_type_str = '';
      var hl_filter_chinese = '';
      var hl_filter_star = '';
      var hl_filter_type = '';

      var hl_star_type = utils.getbyclass(utils.getbyid('screen'), 's-li1');
      hlHis.hlFilter = hlHis.hlFilter || {};
      hlHis.hlFilter.chinese = hlHis.hlFilter.chinese || "";
      hlHis.hlFilter.star = hlHis.hlFilter.star || "";
      hlHis.hlFilter.hotelType = hlHis.hlFilter.hotelType || "";

      for (var i = 0; i < hl_star_type.length; i++) {
        switch (hl_star_type[i].innerText) {
          case '二星级以下':
            hl_star_str += '2$';
            hl_filter_chinese += '二星级以下$';
            hl_filter_star += '2$';
            break;
          case '三星':
            hl_star_str += '3$';
            hl_filter_chinese += '三星$';
            hl_filter_star += '3$';
            break;
          case '四星':
            hl_star_str += '4$';
            hl_filter_chinese += '四星$';
            hl_filter_star += '4$';
            break;
          case '五星':
            hl_star_str += '5$';
            hl_filter_chinese += '五星$';
            hl_filter_star += '5$';
            break;
          case '酒店':
            hl_type_str += '1$';
            hl_filter_chinese += '酒店$';
            hl_filter_type += '1$';
            break;
          case '汽车旅馆':
            hl_type_str += '2$';
            hl_filter_chinese += '汽车旅馆$';
            hl_filter_type += '2$';
            break;
          case '酒店式公寓':
            hl_type_str += '3$';
            hl_filter_chinese += '酒店式公寓$';
            hl_filter_type += '2$';
            break;
          case '家庭旅馆':
            hl_type_str += '4$';
            hl_filter_chinese += '家庭旅馆$';
            hl_filter_type += '4$';
            break;
          case '背包客栈':
            hl_type_str += '5$';
            hl_filter_chinese += '背包客栈$';
            hl_filter_type += '5$';
            break;
          case '宾馆/招待所':
            hl_type_str += '6$';
            hl_filter_chinese += '宾馆/招待所$';
            hl_filter_type += '6$';
            break;
          case '精品酒店':
            hl_type_str += '7$';
            hl_filter_chinese += '精品酒店$';
            hl_filter_type += '7$';
            break;
          case '度假类酒店':
            hl_type_str += '8$';
            hl_filter_chinese += '度假类酒店$';
            hl_filter_type += '8$';
            break;
          case '游轮度假酒店':
            hl_type_str += '9$';
            hl_filter_chinese += '游轮度假酒店$';
            hl_filter_type += '9$';
            break;
          case '别墅型酒店':
            hl_type_str += '10$';
            hl_filter_chinese += '别墅型酒店$';
            hl_filter_type += '10$';
            break;
          case '乡村平房酒店':
            hl_type_str += '11$';
            hl_filter_chinese += '乡村平房酒店$';
            hl_filter_type += '11$';
            break;
          case '家庭寄宿':
            hl_type_str += '12$';
            hl_filter_chinese += '家庭寄宿$';
            hl_filter_type += '12$';
            break;
          case '农舍式房子':
            hl_type_str += '13$';
            hl_filter_chinese += '农舍式房子$';
            hl_filter_type += '13$';
            break;
          case '豪华露营地':
            hl_type_str += '14$';
            hl_filter_chinese += '豪华露营地$';
            hl_filter_type += '14$';
            break;
          case '标准露营地':
            hl_type_str += '15$';
            hl_filter_chinese += '标准露营地$';
            hl_filter_type += '15$';
            break;
        }
        ;
      }
      hl_star_str = hl_star_str.substring(0, (hl_star_str.length - 1));
      hl_type_str = hl_type_str.substring(0, (hl_type_str.length - 1));

      hlHis.hlFilter.chinese = hl_filter_chinese.substring(0, (hl_filter_chinese.length - 1));
      hlHis.hlFilter.hotelType = hl_filter_type.substring(0, (hl_filter_type.length - 1));
      hlHis.hlFilter.star = hl_filter_star.substring(0, (hl_filter_star.length - 1));
      utils.setSession('asiaHlHistory', hlHis);

      urlArgs.StarRating = hl_star_str;
      urlArgs.Category = hl_type_str;
      //页码重置
      urlArgs.pageIndex = 1;
      getListByPage(urlArgs);
      //alert(hl_star_str+'---'+hl_type_str);

    }
    ;
    if (oSrc.getAttribute("id") == "clearBtn") {
      var array = [];
      array = document.getElementById("h-type").childNodes;
      for (var i = 1; i < array.length; i++) {
        array[i].className = "s-li";
      }
      array = document.getElementById("h-level").childNodes;
      for (var i = 1; i < array.length; i++) {
        array[i].className = "s-li";
      }
      document.getElementById("h-type").firstElementChild.className = "s-li1";
      document.getElementById("h-level").firstElementChild.className = "s-li1";
    }
    ;
    //筛选滑动穿透问题
    //        ATplugins.ScrollLayer().scroll("#rank", '#rankWrapper');
    ATplugins.ScrollLayer().scroll("#screen", '#screenWrapper');
    // ATplugins.ScrollLayer().scroll("#location", '#locationWrapper');
  });
  //位置里面的城市实现筛选交互
  utils.bind(oBody, 'click', function (ev) {
    var oEvent = ev || event;
    var oLocation = document.getElementById('location');
    var loca_con = document.getElementById('loca_con');
    //        var loca_conBro = document.getElementById('loca_conBro');
    hlHis.hlLocation = hlHis.hlLocation || {};
    hlHis.hlLocation.list = hlHis.hlLocation.list || "";
    //设置弹出框的最大高度
    var clienH = document.documentElement.clientHeight;
    //        loca_conBro.style.height = 7.8 + 'rem';
    //bottom:0为了实现滑动效果,如果没有bottom:0;内容就不可滑动
    loca_con.style.bottom = '0';
    oLocation.style.maxHeight = 7.8 + 'rem';
    var oSrc = oEvent.srcElement || oEvent.target;
    var locationList = '';
    if (oSrc.getAttribute('id') == 'l_but') {
      var targetLi = utils.getbyclass(utils.getbyid('l-ul'), 'l-li-active');
      for (var i = 0; i < targetLi.length; i++) {
        var cityName = targetLi[i].children[0];
        locationList += cityName.innerHTML + '$';
        if (i == targetLi.length - 1) {
          locationList += cityName.innerHTML;
        }
      }
      hlHis.hlLocation.list = locationList;
      utils.setSession('asiaHlHistory', hlHis);
      urlArgs.LocationList = locationList;
      //页码重置
      urlArgs.pageIndex = 1;
      getListByPage(urlArgs);
    }
    ;
    if (oSrc.getAttribute("id") == 'l_clearBtn') {
      var oUl = document.getElementById("l-ul");
      var liFirst = utils.getbyclass(oUl, 'l-liFirst')[0];
      var aLi = utils.getbyclass(oUl, 'l-li');
      var aOk = {};
      for (var i = 1; i < aLi.length; i++) {
        aOk[i] = true;
      }

      utils.removeClass(liFirst, 'l-li3');
      for (var i = 1; i < aLi.length; i++) {
        utils.removeClass(aLi[i], 'l-li-active')
      }
      for (var i = 1; i < aLi.length; i++) {
        aOk[i] = true;
      }
    }
    ;
    //筛选滑动穿透问题
    //        ATplugins.ScrollLayer().scroll("#rank", '#rankWrapper');
    //        ATplugins.ScrollLayer().scroll("#screen", '#screenWrapper');
    ATplugins.ScrollLayer().scroll("#location", '#locationWrapper');
  });


  //加载更多
  utils.bind(document.getElementById("loadMore"), 'click', function () {
    var loadMore = document.getElementById("loadMore");
    var pageIndex = urlArgs.pageIndex + 1;
    //没有更多 数据加载标识
    var loadMoreSign = loadMore.getAttribute("data-more");
    if (loadMoreSign == "no") {
      return;
    }

    loadMore.innerHTML = "正在加载..."
    urlArgs.pageIndex = pageIndex;
    getListByPage(urlArgs);
  });


})();

//把星级英文数字换成汉字
function num2chin(num) {
  switch (num) {
    case '0':
      return '零';
      break;
    case '1':
      return '一';
      break;
    case '2':
      return '二';
      break;
    case '3':
      return '三';
      break;
    case '4':
      return '四';
      break;
    case '5':
      return '五';
      break;
    default:
      return '二'; //默认二星级  H5-726
      break;
  }
  ;
}

//把url字符串变成json
function url2json(url) {
  if (!url)
    return;
  var json = {};
  var arr = url.split('?');
  var arr2 = arr[1].split('&');
  for (var i = 0; i < arr2.length; i++) {
    var arr3 = arr2[i].split('=');
    json[arr3[0]] = arr3[1];
  }
  return json;
}
