/**
 * Created by apple on 16/5/26.
 */
MT.AnimIn();

function myCallBack() {
  countryShow.init();
}

/*景点 预订MT*/
(function() {
  var val = vlm.parseUrlPara(window.location.href);
  var ChildAgeMin, ChildAgeMax, TravelDate, TourID, MinPax,MaxPax,OnlyForAdult,MinPaxType, DetailData, SearchPriceData, globaldata, ExtendData, PickupPointData, StartDate, EndDate, recalSearchPrice;



  /**
   * 接送酒店页Event
   */
  MT.bindEventPickupPoint = function() {
    var choHotel = $('#choHotel');
    var close_list = $('#close_list');
    var holist_page = $('#holist_page');
    var list = $(".hote-list li");

    choHotel.click(function() {
      holist_page.css({
        display : 'block'
      });
    });
    close_list.click(function() {
      holist_page.css({
        display : 'none'
      });
    });

    list.click(MT.clickHotelList);
  }
  /**
   * 接送酒店列表Event
   */
  MT.clickHotelList = function() {
    $('#choHotel').attr("data-key", $(this).attr("data-key"));
    $(".js-pickup-icon").hide();
    $(this).find(".js-pickup-icon").show();
    $('#choHotel').html($(this).html());
    $('#choHotel').find(".js-pickup-icon").remove();
    $('#holist_page').hide();
  }
  /**
   * 返回接送点信息
   */
  MT.getPickupPoint = function() {
    if (val.RPP == "0") {
      $("[data-key=holist_page]").hide();
      return false;
    }
    var param = {
      "Parameters" : {
        "PackageID" : val.PackageID
      },
      "ForeEndType" : 3,
      "Code" : "0089"
    }
    vlm.loadJson("",JSON.stringify(param),MT.callbackPickupPoint);
  }
  /**
   * 接送点信息callback
   * @param data
   */
  MT.callbackPickupPoint = function(data) {
    var json = data;
    console.log(json);
    if (json.success) {
      var data = json, tpl_PickupPoint = template("tpl_PickupPoint", data);
      PickupPointData = data.data.pickupInfos;
      $(".js-PickupPoint").html(tpl_PickupPoint);
      MT.PickupPointSearch();
      MT.bindEventPickupPoint();
    } else {
      console.log(json);
      jAlert(json.message, "提示");
    }
  }

  MT.PickupPointSearch = function() {

    $('#seach_up').keyup(function() {
      var htmlTags = [];
      var value = $('#seach_up').val();
//						console.log(PickupPointData);
      for (var i = 0; i < PickupPointData.length; i++) {
        if (PickupPointData[i].pickupPoint.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          htmlTags.push("<li data-key=" + PickupPointData[i].pickupID + ">" + PickupPointData[i].pickupPoint + "</li>");
        }
      }

      $(".hote-list").html(htmlTags.join(''));
      MT.bindEventPickupPoint();
    });
  }
  /**
   * 返回详细信息
   */
  MT.getDetails = function() {
    var param = {
      "Parameters" : {
        "PackageID" : val.PackageID
      },
      "ForeEndType" : 3,
      "Code" : "0088"
    }
    vlm.loadJson("",JSON.stringify(param),MT.callbackDetails);
  }
  /**
   * 详细信息 callback
   * @param data
   */
  MT.callbackDetails = function(data) {
    var json = data;
    DetailData = json;
    //                console.log(json);
    if (json.success) {
      var data = json.data;

      ChildAgeMin = data.childAgeMin;
      ChildAgeMax = data.childAgeMax;
      TravelDate = data.defaultDepartStartDate;
      TourID = data.tours;
      MinPax = data.minPax;
      MaxPax = data.maxPax;
      OnlyForAdult = data.onlyForAdult;
      MinPaxType = data.minPaxType;

      globaldata = {
        DetailData : DetailData
      };
      ExtendData = globaldata;


      var SearchPrice;
      if(OnlyForAdult){//只是成人
        SearchPrice=
        {
          "Parameters": {
            "PackageID": val.PackageID,
            "Adult": MinPax,
            "Tours": [

            ]
          },
          "ForeEndType": 3,
          "Code": "0091"
        }
      }else{//成人和儿童
        if(MinPaxType == 1){//成人和儿童
          if(MaxPax > -1){
            if(MaxPax == MinPax){
              MinPax = MinPax -1;
            }
          }
          SearchPrice=
          {
            "Parameters": {
              "PackageID": val.PackageID,
              "Adult": MinPax,
              "Child": [
                ChildAgeMin
              ],
              "Tours": [
              ]
            },
            "ForeEndType": 3,
            "Code": "0091"

          }
        }else{//只限制成人

          SearchPrice=
          {
            "Parameters": {
              "PackageID": val.PackageID,
              "Adult": MinPax,
              "Child": [
                ChildAgeMin
              ],
              "Tours": [

              ]
            },
            "ForeEndType": 3,
            "Code": "0091"

          }
        }
      }


      for (var i = 0; i < data.tours.length; i++) {
        SearchPrice.Parameters.Tours[i] = {
          "TourID" : data.tours[i].tourID,
          "TravelDate" : TravelDate
        };
      }
      MT.getPickupPoint();

      MT.getSearchPrice(SearchPrice);
    } else {
      console.log(json);
      jAlert(json.message, "提示");
    }
  }
  /**
   * 返回SearchPrice
   */
  MT.getSearchPrice = function(SearchPrice) {
    recalSearchPrice = SearchPrice;
    vlm.loadJson("",JSON.stringify(SearchPrice),MT.callbackSearchPrice);
  }
  /**
   * SearchPrice callback
   * @param data
   */
  MT.callbackSearchPrice = function(data) {
    var json = data;
    SearchPriceData = json;
    //                console.log(json);
    if (json.success) {
      ExtendData = $.extend({
        "SearchPriceData" : SearchPriceData
      }, ExtendData);

      MT.render();
    } else {

      if (val.FAIL == 1) {
//							MT.renderFail();
        return false;
      } else {

        console.log(json);
        jAlert(json.message, "提示");

      }

    }
  }

  /**
   * 渲染模版
   */
//				MT.renderFail = function() {
//					var isAudlt = 1;
//
//					if (isAudlt == 1) {
//						ExtendData = $.extend({
//							isAudlt : 1,
//							AudltPrice : 0,
//							ChildPrice : 0,
//							minPax : 0,
//							minPaxType : "",
//							PackageID : 0
//						}, ExtendData);
//					}
//
//					ExtendData.DefaultDate = MT.getYMDMatch(ExtendData.DetailData.data.defaultDepartStartDate);
//					ExtendData.StartDate = MT.getYMDMatch(ExtendData.DetailData.data.departValidFrom);
//					ExtendData.EndDate = MT.getYMDMatch(ExtendData.DetailData.data.departValidTo);
//					ExtendData.minPax = ExtendData.DetailData.data.minPax;
//					ExtendData.minPaxType = ExtendData.DetailData.data.minPaxType;
//					ExtendData.PackageID = ExtendData.DetailData.data.packageID;
//					//                ExtendData.travelersInput = ExtendData.SearchPriceData.data.bookingFormInfo.travelersInput;
//					//                ExtendData.requiredPickupPoint = ExtendData.SearchPriceData.data.bookingFormInfo.requiredPickupPoint;
//					//                ExtendData.airportTransferType = ExtendData.SearchPriceData.data.bookingFormInfo.airportTransferType;
//					//是否需要接送服务
//					if (false) {
//						$("[data-key=holist_page]").remove();
//					}
//					//是否需要护照
//					if (false) {
//						$("#scenic2_idcard").parent().remove();
//					}
//					//是否需要航班信息
//					if (false) {
//						//None, TwoWay，Arrival，Depart
//						$("[data-key=flight_page]").show();
//						FlightDateChoose();
//
//					} else {
//						$("[data-key=flight_page]").hide();
//					}
//
//					MT.renderViewFail();
//
//					dateHandler();
//
//				}
  /**
   * 渲染view1
   * @constructor
   */
//				MT.renderViewFail = function() {
//					var data = ExtendData;
//					var tpl_ScenicView1 = template("tpl_ScenicView1", ExtendData);
//					var tpl_Adult_Child1 = template("tpl_Adult_Child1", ExtendData);
//					//初始化默认时间
//					var defaultTime = ExtendData.DefaultDate;
//					var categoryIndex = 0, categoryTitle;
//					//                console.log(data);
//
//					$(".js-childblock1").after(tpl_ScenicView1);
//
//					var child_one = $(".js-sce-ticket1").append(tpl_Adult_Child1);
//					child_one.find(".sce-ticket:last").attr("data-key", 1);
//					child_one.find(".sce-ticket:last").find(".js-date").attr("id", "jdate0");
//					child_one.find(".js-date > .js-ymd").html(defaultTime).next(".js-week").html(MT.getWeek(defaultTime));
//					child_one.find(".js-sce-introduce-txt:last").attr("data-key", data.DetailData.data.packageID);
//					child_one.find(".js-sce-introduce-txt:last").html(data.DetailData.data.packageName + "(产品编号 " + data.DetailData.data.packageRefNo + ")");
//					$(".add-ticket").addClass("stopgray");
//					$(".js-per-price-cont1").html("");
//					$(".js-order-total").html("");
//
//				}
  /*
   * 返回年月日
   * */
  MT.getYMDMatch = function(arg) {
    return arg.match(/\d{4}[-/]\d{2}[-/]\d{2}/)[0];
  }
  /**
   * 渲染模版
   */
  MT.render = function() {
    var isAudlt = val.ADU;

    if (isAudlt == 1) {
      ExtendData = $.extend({
        isAudlt : 1,
        AudltPrice : 0,
        ChildPrice : 0,
        minPax : 0,
        minPaxType : "",
        PackageID : 0
      }, ExtendData);
    }

    if (isAudlt == 0) {
      ExtendData = $.extend({
        isAudlt : 0,
        AudltPrice : 0,
        ChildPrice : 0,
        minPax : 0,
        minPaxType : "",
        PackageID : 0
      }, ExtendData);
    }

    ExtendData.DefaultDate = MT.getYMDMatch(ExtendData.DetailData.data.defaultDepartStartDate);
    ExtendData.StartDate = MT.getYMDMatch(ExtendData.DetailData.data.departValidFrom);
    ExtendData.EndDate = MT.getYMDMatch(ExtendData.DetailData.data.departValidTo);
    ExtendData.maxPax = ExtendData.DetailData.data.maxPax;
    ExtendData.minPax = ExtendData.DetailData.data.minPax;
    ExtendData.minPaxType = ExtendData.DetailData.data.minPaxType;
    ExtendData.onlyForAdult = ExtendData.DetailData.data.onlyForAdult;
    ExtendData.PackageID = ExtendData.DetailData.data.packageID;
    ExtendData.travelersInput = ExtendData.SearchPriceData.data.bookingFormInfo.travelersInput;
    ExtendData.requiredPickupPoint = ExtendData.SearchPriceData.data.bookingFormInfo.requiredPickupPoint;
    ExtendData.airportTransferType = ExtendData.SearchPriceData.data.bookingFormInfo.airportTransferType;
    //是否需要接送服务
    if (!ExtendData.requiredPickupPoint) {
      $("[data-key=holist_page]").remove();
    }
    //是否需要护照
    if (ExtendData.travelersInput == "0") {
      $("#scenic2_idcard").parent().remove();
    }
//					//是否需要航班信息
//					if (ExtendData.airportTransferType != "0") {
//						//None, TwoWay，Arrival，Depart
//						$("[data-key=flight_page]").show();
//						FlightDateChoose();
//
//					} else {
//						$("[data-key=flight_page]").hide();
//					}

    MT.renderView1();

    MT.renderAddPackageView();

    dateHandler();

    console.log(ExtendData);

  }
  /**
   * 渲染view1
   * @constructor
   */
  MT.renderView1 = function() {
    var data = ExtendData;
    var tpl_ScenicView1 = template("tpl_ScenicView1", ExtendData);
    var tpl_Adult_Child1 = template("tpl_Adult_Child1", ExtendData);
    //初始化默认时间
    var defaultTime = ExtendData.DefaultDate;
    var categoryIndex = 0, categoryTitle;

    $(".js-childblock1").after(tpl_ScenicView1);
    for (var i = 0; i < data.SearchPriceData.data.tourInfos.length; i++) {
      var child_one = $(".js-sce-ticket1").append(tpl_Adult_Child1),tchild=ExtendData.isAudlt?"(成人票)":"(儿童票)";
      child_one.find(".sce-ticket:last").attr("data-key", 1);
      child_one.find(".sce-ticket:last").find(".js-date:eq(" + i + ")").attr("id", "jdate" + i);
      child_one.find(".js-date > .js-ymd").html(defaultTime).next(".js-week").html(MT.getWeek(defaultTime));
      child_one.find(".js-sce-introduce-txt:last").attr("data-key", data.SearchPriceData.data.tourInfos[i].tourID);

      child_one.find(".js-sce-introduce-txt:last").html(data.SearchPriceData.data.tourInfos[i].tourName+ "<span class='codefont'>(产品编号 " + data.DetailData.data.packageRefNo + ")"+tchild+"</span>");

    }

    for (var i = 0; i < data.SearchPriceData.data.prices.length; i++) {
      categoryTitle = data.SearchPriceData.data.prices[i].category;
      if (categoryTitle == "ADULT") {
        categoryIndex = i;
        data.AudltPrice = data.SearchPriceData.data.prices[i].amount;
      }
      if (categoryTitle == "CHILD") {
        categoryIndex = i;
        data.ChildPrice = data.SearchPriceData.data.prices[i].amount;
      }
    }

    MT.OnePrice(1);
    MT.PriceList();
  }
  /**
   * 渲染view2
   * @constructor
   */
  MT.renderView2 = function() {
    var data = ExtendData;
    var tpl_ScenicView2 = template("tpl_ScenicView2", ExtendData);
    var tpl_Adult_Child2 = template("tpl_Adult_Child2", ExtendData);
    var categoryIndex = 0, categoryTitle;

    $(".js-childblock2").after(tpl_ScenicView2);
    for (var j = 0; j < data.SearchPriceData.data.tourInfos.length; j++) {
      var child_two = $(".js-sce-ticket2").append(tpl_Adult_Child2),tchild=!ExtendData.isAudlt?"(成人票)":"(儿童票)";
      child_two.find(".js-sce-introduce-txt:last").attr("data-key", data.SearchPriceData.data.tourInfos[j].tourID);
      child_two.find(".js-sce-introduce-txt:last").html(data.SearchPriceData.data.tourInfos[j].tourName + "<span style=\"color:#666;\">(产品编号 " + data.DetailData.data.packageRefNo + ")"+tchild+"</span>");
    }

    MT.OnePrice(2);
  }
  /**
   * 计算单价
   */
  MT.OnePrice = function(num) {
    var view1Price, view2Price, totalPrice;
    if (num == 1) {
      if (val.ADU == 1) {
        view1Price = $(".js-scenicview1").find(".js-per-price-cont1").html("¥" + ExtendData.AudltPrice);
      } else if (val.ADU == 0) {
        view1Price = $(".js-scenicview1").find(".js-per-price-cont1").html("¥" + ExtendData.ChildPrice);
      }
      view1Price = view1Price.html();

      view1Price = parseInt(view1Price.substring(1, view1Price.length));
    }

    if (num == 2) {
      if (val.ADU == 0) {
        view2Price = $(".js-scenicview2").find(".js-per-price-cont2").html("¥" + ExtendData.AudltPrice);
      } else if (val.ADU == 1) {
        view2Price = $(".js-scenicview2").find(".js-per-price-cont2").html("¥" + ExtendData.ChildPrice);
      }
      view2Price = view2Price.html();
      view2Price = parseInt(view2Price.substring(1, view2Price.length));
    }

    if (view1Price == undefined) {
      view1Price = 0;
    }
    if (view2Price == undefined) {
      view2Price = 0;
    }

    totalPrice = $(".js-order-total").html();
    if (totalPrice == "") {
      totalPrice = 0;
    } else {
      if (totalPrice.indexOf("¥") != -1) {
        totalPrice = parseInt(totalPrice.substring(1, totalPrice.length));
      } else {
        totalPrice = parseInt(totalPrice);
      }
    }

    $(".js-order-total").html("¥" + parseInt(totalPrice + (view1Price + view2Price) * ExtendData.minPax));

  }
  /**
   * 渲染添加套餐菜单
   * @constructor
   */
  MT.renderAddPackageView = function() {
    var data = ExtendData;
    var tpl_ScenicPrices = template("tpl_ScenicPrices", data);

    for (var k = 0; k < data.SearchPriceData.data.prices.length; k++) {

      if(val.ADU == 0 && data.SearchPriceData.data.prices[k].category == "ADULT"){
        var child_price = $(".js-tpl-ScenicPrices").append(tpl_ScenicPrices);
        var title = data.SearchPriceData.data.packageName;
        child_price.find(".js-add-setmeal-tit:last").html(title);
        child_price.find('.ticket-type').html("(成人票)");
        child_price.find("[data-c-id=meal]:last").attr("data-category", data.SearchPriceData.data.prices[k].category);
        child_price.find(".js-setmeal-price-cont:last").html("¥" + data.SearchPriceData.data.prices[k].amountInCNY);
      }
      if(val.ADU == 1 && data.SearchPriceData.data.prices[k].category == "CHILD"){
        var child_price = $(".js-tpl-ScenicPrices").append(tpl_ScenicPrices);
//							var title = data.SearchPriceData.data.packageName+"(儿童票)";
        var title = data.SearchPriceData.data.packageName;
        child_price.find(".js-add-setmeal-tit:last").html(title);
        child_price.find('.ticket-type').html("(儿童票)");
        child_price.find("[data-c-id=meal]:last").attr("data-category", data.SearchPriceData.data.prices[k].category);
        child_price.find(".js-setmeal-price-cont:last").html("¥" + data.SearchPriceData.data.prices[k].amountInCNY);
      }
    }
  }
  /**
   * 上午 下午
   */
  MT.HalfDay = function(obj, halfday) {


//					if (halfday) {
//						if ($(obj).attr("class") == "fa-noon") {
//							$(obj).next().attr("class", "fa-noon");
//							$(obj).attr("class", "fa-noon on");
//						}
//					} else {
//						if ($(obj).attr("class") == "fa-noon") {
//							$(obj).prev().attr("class", "fa-noon");
//							$(obj).attr("class", "fa-noon on");
//						}
//					}

  }

  /**
   * 计算总金额
   * @constructor
   */
  MT.totalPrice = function() {
    var price1, price2, totalPrice;

    price1 = $(".js-Audlt-cont").html();
    price2 = $(".js-Child-cont").html();
    if (price1 == undefined) {
      price1 = 0;
    } else {

      price1 = parseInt(price1) * ExtendData.AudltPrice;
    }
    if (price2 == undefined) {
      price2 = 0;
    } else {
      price2 = parseInt(price2) * ExtendData.ChildPrice;
    }

    totalPrice = price1 + price2;

    $(".js-order-total").html("¥" + parseInt(totalPrice));
  }
  /**
   * 增加减少人数
   * @param obj
   * @param isAudlt
   * @param minPax
   * @constructor
   */
  MT.PlusCount = function(obj, isAudlt, minPax, mark) {
    var current = 1;
    var AudltCount = $(".js-Audlt-cont").html();
    var ChildCount = $(".js-Child-cont").html();

    if (AudltCount == undefined) {
      AudltCount = 0;
    }
    if (ChildCount == undefined) {
      ChildCount = 0;
    }
    var maxCount = parseInt(AudltCount) + parseInt(ChildCount);
    var child_yearsold;
    if (isAudlt) {
      if (mark == 1) {
        current = parseInt($(obj).prev().html()) + 1;
        $(obj).prev().html(current);
      } else {
        current = parseInt($(obj).next().html());

        if (ExtendData.minPaxType == "1") {

          if (/*maxCount > minPax &&*/ current > 0) {
            $(obj).next().html(current - 1);
          }
        }

        if (ExtendData.minPaxType == "0") {
          if (AudltCount > 0/*minPax*/) {
            $(obj).next().html(current - 1);
          }
        }

      }

    } else {
      if (mark == 1) {
        current = parseInt($(obj).prev().html()) + 1;
        $(obj).prev().html(current);
        child_yearsold = $("<li class='clearFix'>" + "<span id='child_old' class='child-age fl'>儿童年龄" + (current) + "</span>" + "<div class='child-age-cont fr'><input type='text' placeholder=\"" + ExtendData.DetailData.data.childAgeMin + "-" + DetailData.data.childAgeMax + "\"/><span>岁</span></div>" + "</li>");

        $(".js-children-wrap").append(child_yearsold);
      } else {
        current = parseInt($(obj).next().html());

        if (ExtendData.minPaxType == "1") {

          if (/*maxCount > minPax &&*/ current > 0) {
            $(obj).next().html(current - 1);
            $(".js-children-wrap:last-child").children("li:last").remove();
          }
        }

        if (ExtendData.minPaxType == "0") {
          if (current > 1) {
            $(obj).next().html(current - 1);
            $(".js-children-wrap:last-child").children("li:last").remove();
          }
        }

      }
    }

    MT.totalPrice();
  }
  /**
   * 初始化添加套餐列表
   * @constructor
   */
  MT.InitMorePackage = function() {
    var oSetBtn = $(".add-ticket");
    var oAddwin = $(".add-setmeal");
    var oMaskWin = $(".mask");
    var oSetmealBtn = $(".add-setmeal-sure");

    oSetBtn.click(function() {
      oMaskWin.css({
        display : 'block'
      });
      oAddwin.css({
        bottom : '0'
      });
    });

    oSetmealBtn.click(function() {
      oMaskWin.css({
        display : 'none'
      });
      oAddwin.css({
        bottom : '-500px'
      });
      var addval = $(".js-tpl-ScenicPrices").find("[data-add]").attr("data-add");
      if (addval != undefined) {
        if (addval == 1) {
          if ($(".js-scenicview2").length > 0) {
            return false;
          }
          $(".add-ticket").addClass("stopgray");
          MT.renderView2();
        } else {

          MT.totalPrice();
        }
      } else {
        if (addval == 0) {
          MT.totalPrice();
        }

      }

    });

  }
  /**
   * 操作套餐列表
   * @param obj
   * @constructor
   */
  MT.MealClick = function(obj) {
    var currentClass = $(obj).attr("class");
    var firstval = $(obj).attr("data-first");
    if (firstval) {
      return false;
    }

    if (currentClass == "setmeal-tr fr") {
      $(obj).attr("class", "setmeal-tr fr on");
      $(obj).attr("data-add", 1);
    } else {
      $(obj).attr("class", "setmeal-tr fr");
      $(obj).attr("data-add", 0);
    }

  }

  MT.PriceList = function() {
    var AudltCount = 0, ChildCount = 0, list = [], taglist;

    //view1 进入成人
    if ($(".js-scenicview1").length > 0 && $("[data-key=\"js-per-price1\"]").find(".js-Audlt-cont").length > 0) {
      AudltCount = $("[data-key=\"js-per-price1\"]").find(".js-Audlt-cont").html();
      if (AudltCount > 0) {
        if ($(".js-sce-ticket1").find(".js-sce").length > 0) {
          for (var i = 0; i < $(".js-sce-ticket1").find(".js-sce").length; i++) {
            var title = $(".js-sce-ticket1").find(".js-sce").eq(i).find(".js-sce-introduce-txt").html();
            var htmltag = $("<li style='height:auto;'><span class=\"price-per-tit price-titj\">" + "成人票" + "</span><span class=\"price-per-tot price-totj\">¥" + ExtendData.AudltPrice + "×" + AudltCount + "人</span></li>");
            list.push(htmltag);
          }
        }

      }
    }
    //view1 进入儿童
    if ($(".js-scenicview1").length > 0 && $("[data-key=\"js-per-price1\"]").find(".js-Child-cont").length > 0) {
      ChildCount = $("[data-key=\"js-per-price1\"]").find(".js-Child-cont").html();
      if (ChildCount > 0) {
        if ($(".js-sce-ticket1").find(".js-sce").length > 0) {
          for (var i = 0; i < $(".js-sce-ticket1").find(".js-sce").length; i++) {
            var title = $(".js-sce-ticket1").find(".js-sce").eq(i).find(".js-sce-introduce-txt").html();
            var htmltag = $("<li style='height:auto;'><span class=\"price-per-tit  price-titj\">" + "儿童票" + "</span><span class=\"price-per-tot price-totj\">¥" + ExtendData.ChildPrice + "×" + ChildCount + "人</span></li>");
            list.push(htmltag);
          }
        }

      }

    }

    //view2 儿童
    if ($(".js-scenicview2").length > 0 && $("[data-key=\"js-per-price2\"]").find(".js-Child-cont").length > 0) {
      ChildCount = $("[data-key=\"js-per-price2\"]").find(".js-Child-cont").html();
      if (ChildCount > 0) {
        if ($(".js-sce-ticket2").find(".js-sce2").length > 0) {
          for (var i = 0; i < $(".js-sce-ticket2").find(".js-sce2").length; i++) {
            var title = $(".js-sce-ticket2").find(".js-sce2").eq(i).find(".js-sce-introduce-txt").html();
            var htmltag = $("<li style='height:auto;'><span class=\"price-per-tit  price-titj\">" + "儿童票" + "</span><span class=\"price-per-tot price-totj\">¥" + ExtendData.ChildPrice + "×" + ChildCount + "人</span></li>");
            list.push(htmltag);
          }
        }

      }

    }

    //view2 成人
    if ($(".js-scenicview2").length > 0 && $("[data-key=\"js-per-price2\"]").find(".js-Audlt-cont").length > 0) {
      AudltCount = $("[data-key=\"js-per-price2\"]").find(".js-Audlt-cont").html();
      if (AudltCount > 0) {
        if ($(".js-sce-ticket2").find(".js-sce2").length > 0) {
          for (var i = 0; i < $(".js-sce-ticket2").find(".js-sce2").length; i++) {
            var title = $(".js-sce-ticket2").find(".js-sce2").eq(i).find(".js-sce-introduce-txt").html();
            var htmltag = $("<li style='height:auto;'><span class=\"price-per-tit  price-titj\">" + "成人票" + "</span><span class=\"price-per-tot price-totj\">¥" + ExtendData.AudltPrice + "×" + AudltCount + "人</span></li>");
            list.push(htmltag);
          }
        }

      }
    }
    $(".js-price-list").html(list);
  }



  /**
   * 预订 验证
   * @constructor
   */
  MT.validate = function(data, rules, message) {
    var status = true;
    if (rules.required == "required") {
      if (!vlm.Utils.validate.isNoEmpty(data)) {
        jAlert(message.required, "提示");
        status = false;
        return false;
      }
    }
    if (rules.email == "email") {
      if (!vlm.Utils.validate.email(data)) {
        jAlert(message.email, "提示");
        status = false;
        return false;
      }
    }
    if (rules.phone == "phone") {
      if (!vlm.Utils.validate.mobileNo(data)) {
        jAlert(message.phone, "提示");
        status = false;
        return false;
      }
    }

    return status;
  }
  /**
   * 预订 创建订单
   * @constructor
   */
  MT.OrderDetail = function() {

    $(".js-order-detail").click(function(e) {

      var Status,AdultCount = 0, ChildCount = 0, ChildArray = [], Childtmp = "", TourArray = [], TourObj = {}, DOB = "", TravelDate = "", TourSession = "", TourCount = 0, TourID = 0, PickupID = "", PickupCount = 0, currentY = 0, PickupTmp, PickupPoint = {}, TravelerType = "", Salutation = "", FirstName = "", LastName = "", NationalityCode = "", Travelers = [], Email = "", ContactNo = {}, CountryCode = 0, PhoneNo = 0, CurrencyCode = "", recalTotalPrice = 0, TravelerDocument;
      var param = {
        "Parameters" : {
          "PackageID" : ExtendData.PackageID,
        },
        "ForeEndType" : 3,
        "Code" : "0092"
      }

      //成人数量
      AdultCount = $(".js-Audlt-cont").html();
      if (AdultCount == undefined) {
        AdultCount = 0;
      }
      recalSearchPrice.Parameters.Adult = AdultCount;
      param.Parameters.Adult = AdultCount;

      //儿童年龄数组
      ChildCount = $(".js-Child-cont").html();
      if (ChildCount == undefined) {
        ChildCount = 0;
        ChildArray = [];
        delete recalSearchPrice.Parameters.Child;
      } else {
        ChildCount = parseInt(ChildCount);
        for (var i = 0; i < ChildCount; i++) {
          Childtmp = $(".js-children-wrap").find("input").eq(i).val();
          Status = MT.validate(Childtmp, {
            "required" : "required"
          }, {
            "required" : "儿童年龄不能为空"
          });
          if(!Status){
            return false;
          }
          if(Childtmp > ExtendData.DetailData.data.childAgeMax || Childtmp < ExtendData.DetailData.data.childAgeMin){
            jAlert("请输入正确的儿童年龄范围", "提示");
            return false;
          }

          ChildArray.push(Childtmp);
        }
        recalSearchPrice.Parameters.Child = ChildArray;
        param.Parameters.Child = ChildArray;
      }
      //判断人数
      var totalP=0;
      if(ExtendData.onlyForAdult){//只限制成人
        if(AdultCount < ExtendData.minPax){
          jAlert("限定成人最小数为"+ExtendData.minPax+"起订", "提示");
          return false;
        }
        if(AdultCount > ExtendData.maxPax && ExtendData.maxPax != -1){
          jAlert("限定成人最大数为"+ExtendData.maxPax+"起订", "提示");
          return false;
        }
      }else{//限制成人和儿童
        if(ExtendData.minPaxType == 1){//限制成人和儿童
          totalP = parseInt(AdultCount) + parseInt(ChildCount);
          if(totalP < ExtendData.minPax){
            jAlert("限定最小人数为"+ExtendData.minPax+"起订", "提示");
            return false;
          }
          if(totalP > ExtendData.maxPax && ExtendData.maxPax != -1){
            jAlert("限定最大人数为"+ExtendData.maxPax+"起订", "提示");
            return false;
          }
        }else{//只限制成人
          if(AdultCount < ExtendData.minPax){
            jAlert("限定成人最小数为"+ExtendData.minPax+"起订", "提示");
            return false;
          }
          if(AdultCount > ExtendData.maxPax && ExtendData.maxPax != -1){
            jAlert("限定成人最大数为"+ExtendData.maxPax+"起订", "提示");
            return false;
          }
        }
      }



      //景点
      TourCount = $(".js-sce").length;
      if (TourCount > 0) {
        for (var i = 0; i < TourCount; i++) {
          TourID = $(".js-sce").eq(i).find(".js-sce-introduce-txt").attr("data-key");
          TravelDate = $(".js-sce").eq(i).find(".js-ymd").html() + "T00:00:00";
          TourSession = $(".js-sce").eq(i).find(".on").attr("data-key");

          TourObj = {
            "TourID" : TourID,
            "TravelDate" : TravelDate,
            "TourSession" : TourSession
          };

          TourArray.push(TourObj);
        }
        param.Parameters.Tours = TourArray;
      }
      var regx = /[^a-zA-Z]+/g;
      //国籍
      NationalityCode = $("#jp_bank_country").attr("data-code");
      CountryCode = $("#jp_tel_country").attr("data-tel-code");

      TravelerType = ExtendData.isAudlt == 1 ? "Adult" : "Child";
      Salutation = "Mr";
      //取票人信息
      FirstName = $("#scenic2_name1").val();
      LastName = $("#scenic2_name2").val();
      FirstName = FirstName.replace(/(^\s*)|(\s*$)/g,'');
      LastName = LastName.replace(/(^\s*)|(\s*$)/g,'');
      Status = MT.validate(FirstName, {
        "required" : "required"
      }, {
        "required" : "取票人姓不能为空"
      });
      if(!Status){
        return false;
      }
      if(FirstName.match(regx)){
        jAlert("请您输入英文的取票人姓名", "提示");
        return false;
      }
      Status = MT.validate(LastName, {
        "required" : "required"
      }, {
        "required" : "取票人名不能为空"
      });
      if(!Status){
        return false;
      }
      if(LastName.match(regx)){
        jAlert("请您输入英文的取票人姓名", "提示");
        return false;
      }

      //是否需要护照
      if (ExtendData.travelersInput == "1") {
        TravelerDocument = $("#scenic2_idcard").val();
        Status =MT.validate(TravelerDocument, {
          "required" : "required"
        }, {
          "required" : "护照不能为空"
        });
        if(!Status){
          return false;
        }

        Travelers.push({
          "TravelerType" : "Adult",
          "Salutation" : Salutation,
          "FirstName" : FirstName,
          "LastName" : LastName,
          "NationalityCode" : NationalityCode,
          "TravelerDocument" : TravelerDocument
        });
      } else {
        Travelers.push({
          "TravelerType" : "Adult",
          "Salutation" : Salutation,
          "FirstName" : FirstName,
          "LastName" : LastName,
          "NationalityCode" : NationalityCode
        });
      }
      param.Parameters.Travelers = Travelers;

      //是否需要航班信息
      if (ExtendData.airportTransferType != "0") {
        //None, TwoWay，Arrival，Depart
        var DepartFlightNo = $("#departFlightNo").val();
        var DepartDateTime = $("#departDateTime").html() + "T00:00:00";
        var ArrivalFlightNo = $("#arrivalFlightNo").val();
        var ArrivalDateTime = $("#arrivalDateTime").html() + "T00:00:00";
        Status = MT.validate(DepartFlightNo, {
          "required" : "required"
        }, {
          "required" : "航班信息不能为空"
        });
        if(!Status){
          return false;
        }
        Status = MT.validate(ArrivalFlightNo, {
          "required" : "required"
        }, {
          "required" : "航班信息不能为空"
        });
        if(!Status){
          return false;
        }
        param.Parameters.FlightDetails = {
          "ArrivalFlightNo" : ArrivalFlightNo,
          "ArrivalDateTime" : ArrivalDateTime,
          "DepartFlightNo" : DepartFlightNo,
          "DepartDateTime" : DepartDateTime
        };
      }

      //联系人信息
      FirstName = $("#scenic_name1").val();
      LastName = $("#scenic_name2").val();
      FirstName = FirstName.replace(/(^\s*)|(\s*$)/g,'');
      LastName = LastName.replace(/(^\s*)|(\s*$)/g,'');
      Status = MT.validate(FirstName, {
        "required" : "required"
      }, {
        "required" : "联系人信息姓不能为空"
      });
      if(!Status){
        return false;
      }
      if(FirstName.match(regx)){
        jAlert("请您输入英文的联系人姓名", "提示");
        return false;
      }

      Status = MT.validate(LastName, {
        "required" : "required"
      }, {
        "required" : "联系人信息名不能为空"
      });
      if(!Status){
        return false;
      }
      if(LastName.match(regx)){
        jAlert("请您输入英文的联系人姓名", "提示");
        return false;
      }

      PhoneNo = $("#scenic_phone").val();
      Status = MT.validate(PhoneNo, {
        "required" : "required"
      }, {
        "required" : "联系电话不能为空"
      });
      if(!Status){
        return false;
      }
      PhoneNo = PhoneNo.replace(/(^\s*)|(\s*$)/g,'');
      if(CountryCode == "86"){
        Status = MT.validate(PhoneNo, {
          "phone" : "phone"
        }, {
          "phone" : "联系电话格式不正确"
        });
        if(!Status){
          return false;
        }
      }

      Email = $("#scenic_email").val();
      Status = MT.validate(Email, {
        "required" : "required"
      }, {
        "required" : "邮箱不能为空"
      });
      if(!Status){
        return false;
      }
      Email = Email.replace(/(^\s*)|(\s*$)/g,'');
      Status = MT.validate(Email, {
        "email" : "email"
      }, {
        "email" : "请输入正确邮箱格式"
      });
      if(!Status){
        return false;
      }
      param.Parameters.ContactDetails = {
        "Salutation" : Salutation,
        "FirstName" : FirstName,
        "LastName" : LastName,
        "Email" : Email,
        "MemberID":localStorage.memberid,
        "ContactNo" : {
          "CountryCode" : CountryCode,
          "PhoneNo" : PhoneNo
        }
      };

      //接送服务
      PickupCount = $("#choHotel").length;
      if (PickupCount > 0) {
        PickupTmp = $("#choHotel").attr("data-key");
        Status = MT.validate(PickupTmp, {
          "required" : "required"
        }, {
          "required" : "请选择接送地点"
        });
        if(!Status){
          return false;
        }
        if (PickupTmp != "") {
          PickupID = $("#choHotel").attr("data-key");
          PickupCount = $("#choHotel").html();
          PickupPoint = {
            "PickupID" : PickupID,
            "PickupPoint" : PickupCount
          };
          param.Parameters.PickupPoint = PickupPoint;
        }

      }



//						console.log(param);

      //重新计算价格
      MT.recalSearchPrice(recalSearchPrice,param);


    });
  }

  /**
   * 返回SearchPrice
   */
  MT.recalSearchPrice = function(SearchPrice,OrderDetail) {
    var relTotalPrice = 0;
    $("#preloader").show();
    /**
     * SearchPrice callback
     * @param data
     */
//					MT.ajaxJson("", JSON.stringify(SearchPrice),search);
    vlm.loadJson("",JSON.stringify(SearchPrice),search);

    function search(data) {
      var json = data, len = 0;
      console.log(json);
      if (json.success) {
        len = json.data.prices.length;

        for (var i = 0;i<json.data.prices.length;i++){
          relTotalPrice += parseInt(json.data.prices[i].totalAmount);
        }
//							while (len--) {
//								relTotalPrice += parseInt(json.data.prices[len].totalAmount);
//							}
        OrderDetail.Parameters.track={"deviceID":vlm.getDeviceID(),"browserType":""};
        //价格信息
        OrderDetail.Parameters.ChargeDetails = {
          "CurrencyCode" : "CNY",
          "TotalPrice" : relTotalPrice
        };
        console.log(OrderDetail);
        MT.CreateOreder(OrderDetail);
      } else {
        console.log(json);
        jAlert(json.message, "提示");

      }
    }
  };

  /**
   * 创建订单
   * @param OrderDetail
   * @constructor
   */
  MT.CreateOreder = function(OrderDetail){
//					MT.ajaxJson("", JSON.stringify(OrderDetail), MT.callbackOrderDetail);
    vlm.loadJson("",JSON.stringify(OrderDetail),MT.callbackOrderDetail);
  }

  /**
   * 预订 callback
   * @param data
   * @constructor
   */
  MT.callbackOrderDetail = function(data) {
    var json = data;
    console.log(json);
    if (json.success) {
      var bookingRefNo = json.data.bookingRefNo;
      if (bookingRefNo != undefined && bookingRefNo != "") {
        window.location.href = "../payment/payment.html?bookingRefNo=" + bookingRefNo+"&type=Scenic";
      }
//						$("#preloader").hide();
    } else {
      console.log(json);
      jAlert(json.message, "提示");
    }


  }

  /**
   * 景点选择日期
   * @constructor
   */
  function dateHandler() {
    var startDate = ExtendData.StartDate;
    var endDate = ExtendData.EndDate;
    var defaultDate = ExtendData.DefaultDate;
    var allOuter = document.querySelectorAll('.travel-date-wrap-so');




    var chooseDate = function(id, dateNum, startDate, endDate,defDate) {
      var rangeArray = [startDate, endDate],timobj={defDate:'游玩'};
      var myDate = new Calender({
        id : id,
        num : 13,
        time : timobj,
        output : ".js-ymd",
        type : 't',
        range : rangeArray,
        fn : function() {
          // console.log(id);
          var ymd = $("#" + id).find(".js-ymd").html();
          $("#" + id).find(".js-week").html(MT.getWeek(ymd));
        }
      });
    };

    var initDate = function() {
      for (var i = 0; i < allOuter.length; i++) {
        (function() {
          var id = allOuter[i].id;
          chooseDate(id, 'tra-ymd', startDate, endDate,defaultDate);
        })(allOuter[i]);
      }
    };
    initDate();

  }

  /**
   * 景点选择日期
   * @constructor
   */
  function FlightDateChoose() {
    var startDate = ExtendData.StartDate;
    var endDate = ExtendData.EndDate;
    var allOuter = document.querySelectorAll('.js-filght-travel-date');
    var chooseDate = function(id, dateNum, startDate, endDate) {
      var rangeArray = [startDate, endDate],timobj={defDate:'游玩'};
      var myDate = new Calender({
        id : id,
        num : 13,
        time : timobj,
        output : dateNum,
        type : 't',
        range : rangeArray,
        fn : function() {
          // console.log(id);
          var ymd = $("#" + id).find(".js-ymd").html();
          $("#" + id).find(".js-week").html(MT.getWeek(ymd));
        }
      });
    };

    chooseDate("flight1", 'js-flight-ymd', startDate, endDate);
    chooseDate("flight2", 'js-flight-ymd', startDate, endDate);

  }


  MT.getDetails();
  MT.InitMorePackage();
  MT.OrderDetail();

})();

(function(){
  //阻止在嵌套元素中传播
  function cancelPropagation (event){
    event = window.event||event;
    if( document.all){
      event.cancelBubble = true;
    }else{
      event.stopPropagation();
    }
  }
//				$("#state_btn").click(function(){
//					$(".js-mask").show();
//				});
  $("#state_btn").on("click",function(){
    $(".js-mask").show();
  });
//					$('.sc-content').css({"overflow":"hidden"})

//				$(".js-travelnotes-close").click(function(){
//					$(".js-mask").hide();
////					$('.sc-content').css({"overflow":"auto"})
//				});
  $(".js-travelnotes-close").on("click",function(){
    $(".js-mask").hide();
  });
//				$(".js-mask").click(function(){
//					$(".js-mask").hide();
//				});
  $(".js-mask").on("click",function(){
    $(".js-mask").hide();
  });
//				$('.js-travelnotes').click(function(event){
//					cancelPropagation(event);
//				});
  $(".js-travelnotes").on("click",function(){
    cancelPropagation(event);
  });

})();

/*价目详情窗*/
(function() {
  var detaBtn = document.getElementsByClassName('order-total-tip-details')[0];
  var tip = $(".order-total-tip");
  var oHid = document.getElementsByClassName('price-tot-box')[0];
  var oMask = document.getElementsByClassName('mask')[0];
  var bOk = true;

  detaBtn.onclick = function() {
    if (bOk) {
      oMask.style.display = 'block';
      oHid.style.bottom = '50px';
      tip.addClass("order-total-tips");
      bOk = false;

      MT.PriceList();
    } else {
      oMask.style.display = 'none';
      oHid.style.bottom = '-300px';
      tip.removeClass("order-total-tips");
      bOk = true;

    }
  };
  oMask.onclick = function() {
    if (bOk == false) {
      oMask.style.display = 'none';
      oHid.style.bottom = '-300px';
      tip.removeClass("order-total-tips");
      bOk = true;
    }
  }
})();

/*同意条款*/
(function() {
  var oAgree = document.getElementsByClassName('order-notice-btn')[0];
  //            var book = document

  var bOk = false;

  oAgree.onclick = function() {
    if (bOk) {
      oAgree.style.background = 'url(images/ui/icons1.png) -23.7rem -0.4rem';
      oAgree.style.backgroundSize = '40rem 12rem';
      bOk = false;
      $(".js-order-detail").removeClass("stopgray");
    } else {
      oAgree.style.background = 'url(images/ui/icons1.png) -26.6rem -0.4rem';
      oAgree.style.backgroundSize = '40rem 12rem';
      bOk = true;
      $(".js-order-detail").addClass("stopgray");

    }
  };

  oAgree.style.background = 'url(images/ui/icons1.png) -23.7rem -0.4rem';
  oAgree.style.backgroundSize = '40rem 12rem';
})();
