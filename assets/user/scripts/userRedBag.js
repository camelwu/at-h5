/**
 * Created by lichengjun on 16/7/26.
 */
(function (w) {
  'use strict';

  var RedBag = {
    hotelRedWrapId: "",
    triggerDomId: "",
    hotelOrderAmount: "",
    //获取红包   个人中心   酒店/景点 订单填写页


    //点击查看红包列表/可用红包
    /*
     * @param module   模块标记
     * @param redWrapId 红包列表wrap ID
     * @param triggerDom  点击打开列表selector
     * @orderAmount   酒店订单总额
     * @afterAppendDom   options   默认列表加载到body栏目下
     * */
    init: function (memberid, module, redWrapId, triggerDomId, orderAmount, afterAppendDom) {
      switch (module) {
        case 'my':
          this.createMy(triggerDom, afterAppendDom);
          //在个人中心出来
          break;
        case 'hotel':
          this.createHotel(memberid, triggerDomId, orderAmount, afterAppendDom);
          RedBag.hotelRedWrapId = redWrapId;
          RedBag.triggerDomId = triggerDomId;
          RedBag.hotelOrderAmount = orderAmount;
          break;
        case 'scenic':
          this.createScenic(memberid,triggerDomId, orderAmount,afterAppendDom);
          RedBag.scenicRedWrapId = redWrapId;
          RedBag.triggerDomId = triggerDomId;
          RedBag.scenicOrderAmount = orderAmount;
          break;
      }
    },

    createMy: function (triggerDom, afterAppendDom) {

    },
    createHotel: function (memberid, triggerDomId, orderAmount, afterAppendDom) {
      //获取红包数据  只有登录用户才能调用红包信息
      var redBagParameters = {
        "Parameters": "{\"MemberId\":\"" + memberid + "\",\"OrderAmount\":\"" + orderAmount + "\"}",
        "ForeEndType": 3,
        "Code": "70100200"
      }
      vlm.loadJson("", JSON.stringify(redBagParameters), RedBag.hotelRedBabCallback);

      //显示可用红包列表事件绑定
      var triggerEle = $("#" + triggerDomId);
      triggerEle.click(function (event) {
        RedBag.showHotelList();
      });
    },
    createScenic: function (memberid,triggerDomId, orderAmount,afterAppendDom) {
      //获取红包数据  只有登录用户才能调用红包信息
      var redBagParameters = {
        "Parameters": "{\"MemberId\":\"" + memberid + "\",\"OrderAmount\":\"" + orderAmount + "\"}",
        "ForeEndType": 3,
        "Code": "70100201"
      }
      vlm.loadJson("", JSON.stringify(redBagParameters), RedBag.scenicRedBabCallback,true,false,true);

      //显示可用红包列表事件绑定
      var triggerEle = $("#" + triggerDomId);
      triggerEle.click(function (event) {
        RedBag.scenicHotelList();
      });
    },
    scenicRedBabCallback: function(result){
      if (result.success) {
        var data = result.data;
        //有可用优惠券时才展示优惠券入口
        if(data.length > 0){
          //更新默认选中红包信息
          $("#" + RedBag.triggerDomId +" .money").html('' + data[0].amount);
          $("#" + RedBag.triggerDomId).attr("data-code",data[0].codeCN).attr("data-amount",data[0].amount).show();
          //更新订单总额和明细
          var passData = {};
          passData.amount = data[0].amount;
          jQueryCallbacks.fire(JSON.stringify(passData));   //更新订单总额详情

        }else {
          $("#" + RedBag.triggerDomId).hide();
          return;
        }
        // $("#" + RedBag.hotelRedWrapId).show();
        //
        var str = $("#redTemplate").html();
        //预处理数据
        var allCouponList = data;
        for (var i = 0; i < allCouponList.length; i++) {

          allCouponList[i].title = "景点现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站景点订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站景点订单立减" + allCouponList[i].amount;
          }
          allCouponList[i].endDate = allCouponList[i].endDate.split("T")[0];
        }

        var output1 = ejs.render(str, {
          data: data,
          allCouponList: allCouponList
        });
        $("body").append(output1);

        // 红包列表绑定事件
        RedBag.bindScenicListEvent();
      }
    },
    bindScenicListEvent: function(){
      var redWrap = $("#" + RedBag.scenicRedWrapId);
      //返回按钮
      redWrap.on("click",".header_back",function(event){
        $("#" + RedBag.scenicRedWrapId).hide();
        $("body .all_elements.scenic_order_content").show();
      });

      //列表点击选中
      redWrap.on("click",".red_list .red",function(event){
        var target = $(this);
        target.find(".icon_hook").addClass('selected');
        var siblingsRed = target.parent().siblings();
        siblingsRed.each(function(index,ele){
          var hook = $(ele).find('.icon_hook');
          if(hook.hasClass("selected")){
            hook.removeClass("selected");
          }
        });
        // var passData = {};
        // passData.amount = target.attr("data-amount");
        // jQueryCallbacks.fire(JSON.stringify(passData));   //更新订单总额详情
        //更新红包入口显示金额
        $("#" + RedBag.triggerDomId +" .money").html(target.attr("data-amount"));
        $("#" + RedBag.triggerDomId).attr("data-code",target.attr("data-code"));
        $("#" + RedBag.triggerDomId).attr("data-amount",target.attr("data-amount"));
        //关闭红包列表
        redWrap.find(".header_back").trigger("click");
      });
    },
    scenicHotelList: function(){
      $("#redBagWrap").show();
      $("body .all_elements.scenic_order_content").hide();
    },
    showHotelList: function () {
      $("#redBagWrap").show();
      $("body .all_elements").hide();
    },
    //酒店可用红包列表加载回调函数
    hotelRedBabCallback: function (result) {
      if (result.success) {
        var data = result.data;
        //有可用优惠券时才展示优惠券入口
        if(data.length > 0){
          //更新默认选中红包信息
          $("#" + RedBag.triggerDomId +" .money").html('' + data[0].amount);
          $("#" + RedBag.triggerDomId).attr("data-code",data[0].codeCN).attr("data-amount",data[0].amount).show();
          //更新订单总额和明细
          var passData = {};
          passData.amount = data[0].amount;
          jQueryCallbacks.fire(JSON.stringify(passData));   //更新订单总额详情

        }else {
          $("#" + RedBag.triggerDomId).hide();
          return;
        }
        $("#" + RedBag.hotelRedWrapId).show();
        //
        var str = $("#redTemplate").html();
        //预处理数据
        var allCouponList = data;
        for (var i = 0; i < allCouponList.length; i++) {

          allCouponList[i].title = "酒店现金红包";
          if (allCouponList[i].type == 1) {
            allCouponList[i].desc = "全站酒店订单满" + allCouponList[i].minUsePrice + "元可用";
          } else if (allCouponList[i].type == 2) {
            allCouponList[i].desc = "全站酒店订单立减" + allCouponList[i].amount;
          }
          allCouponList[i].endDate = allCouponList[i].endDate.split("T")[0];
        }

        var output1 = ejs.render(str, {
          data: data,
          allCouponList: allCouponList
        });
        $("body").append(output1);

        // 红包列表绑定事件
        RedBag.bindHotelListEvent();
      }

    },
    //酒店下单红包列表事件绑定
    bindHotelListEvent : function(){
      var redWrap = $("#" + RedBag.hotelRedWrapId);
      //返回按钮
      redWrap.on("click",".header_back",function(event){
        $("#" + RedBag.hotelRedWrapId).hide();
        $("body .all_elements").show();
      });

      //列表点击选中
      redWrap.on("click",".red_list .red",function(event){
        var target = $(this);
        target.find(".icon_hook").addClass('selected');
        var siblingsRed = target.parent().siblings();
        siblingsRed.each(function(index,ele){
          var hook = $(ele).find('.icon_hook');
          if(hook.hasClass("selected")){
            hook.removeClass("selected");
          }
        });
        var passData = {};
        passData.amount = target.attr("data-amount");
        jQueryCallbacks.fire(JSON.stringify(passData));   //更新订单总额详情
        //更新红包入口显示金额
        $("#" + RedBag.triggerDomId +" .money").html(target.attr("data-amount"));
        $("#" + RedBag.triggerDomId).attr("data-code",target.attr("data-code"));
        $("#" + RedBag.triggerDomId).attr("data-amount",target.attr("data-amount"));
        //关闭红包列表
        redWrap.find(".header_back").trigger("click");
      });
    }

  };
  w.RedBag = RedBag;
})(window);

//RedBag.init(memberid, "scenic", "redBagWrap", "coupon", orderAmount);
