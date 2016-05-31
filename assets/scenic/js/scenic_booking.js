/**
 * Created by Venson on 16/5/24.
 */
(function(){
  var webkit = this || (0, eval)('this');
  var val = vlm.parseUrlPara(window.location.href);
  var ChildAgeMin, ChildAgeMax, TravelDate, TourID, MinPax,MaxPax,OnlyForAdult,MinPaxType, DetailData, SearchPriceData, globaldata, ExtendData, pickupInfosData, StartDate, EndDate, recalSearchPrice;

  /**
   *     监听某个节点属性是否改变
   *     //选择目标节点
   *     var target = document.querySelector('#some-id');
   *     Listener().callWatch("watch",target);
   *     setTimeout(function(){
   *        $("#some-id").attr("data-bind","type:'selectMethod'");
   *     },1000);
   * @returns {{callWatch: callWatch, addWatch: addWatch, multiWatch: multiWatch}}
   * @constructor
   */
  var well = function(){
    var watcher = {
      wellWatch:function(data){
        // Firefox和Chrome早期版本中带有前缀
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        // 配置观察选项:
        var config = { attributes: true };

        // 创建观察者对象
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            //console.log(mutation.attributeName);
            //console.log(mutation.target.id);
            return data.callback && data.callback(mutation);
          });
        });
        // 传入目标节点和观察选项
        return observer.observe(data.target, config);
      }
    }
    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      oneWatch:function(type,data){
        return watcher[type]?watcher[type](data):'';
      },
      /**
       * 通信适配器Command
       *  var titleData = {
       *    title:'夏日',
       *    tips:'暖暖夏日'
       *  }
       *  listener().multiWatch({
       *    command:'watch',
       *    param:['#title']
       *  });
       * @returns {*}
       */
      multiWatch:function(msg){
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]"?msg.param : [msg.param];
        return watcher[msg.command].apply(watcher,msg.param);
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addWatch:function(type,fn){
        watcher[type] = fn;
      }
    }
  }

  /**
   * 公用函数策略层
   * @returns {{callCommand: callCommand, addCommand: addCommand}}
   * @constructor
   */
  var Command = function(){
    var Adapter = {
      getWeekDay : function(date) {
        var final_date = date.substr(0, 10).replace(/-/g, '/');
        var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
        return week;
      },
      formatDate : function(date, format) {
        if (date.indexOf('T') > -1) {
          date = date.replace("T", " ");
          if (date.indexOf("-") > -1) {
            date = date.replace(/-/g, "/");
          }
          date = new Date(date);
        }
        var paddNum = function(num) {
          num += "";
          return num.replace(/^(\d)$/, "0$1");
        };
        //指定格式字符
        var cfg = {
          yyyy : date.getFullYear()//年 : 4位
          ,
          yy : date.getFullYear().toString().substring(2)//年 : 2位
          ,
          M : date.getMonth() + 1//月 : 如果1位的时候不补0
          ,
          MM : paddNum(date.getMonth() + 1)//月 : 如果1位的时候补0
          ,
          d : date.getDay()//日 : 如果1位的时候不补0
          ,
          dd : paddNum(date.getDate())//日 : 如果1位的时候补0
          ,
          hh : paddNum(date.getHours())//时
          ,
          mm : paddNum(date.getMinutes())//分
          ,
          ss : paddNum(date.getSeconds()) //秒
        };
        format || ( format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function(m) {
          return cfg[m];
        });
      },
      render:function(data){
        var isAudlt = val.ADU;
        //ExtendData = JSON.parse(localStorage.getItem("lists"));
        //ExtendData.isAudlt = parseInt(isAudlt);
        //pickupInfosData =  JSON.parse(localStorage.getItem("pickuplist"));

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

        ExtendData.DefaultDate = Adapter.formatDate(ExtendData.DetailData.data.defaultDepartStartDate,"yyyy-MM-dd");
        ExtendData.StartDate = Adapter.formatDate(ExtendData.DetailData.data.departValidFrom,"yyyy-MM-dd");
        ExtendData.EndDate = Adapter.formatDate(ExtendData.DetailData.data.departValidTo,"yyyy-MM-dd");
        ExtendData.maxPax = ExtendData.DetailData.data.maxPax;
        ExtendData.minPax = ExtendData.DetailData.data.minPax;
        ExtendData.minPaxType = ExtendData.DetailData.data.minPaxType;
        ExtendData.onlyForAdult = ExtendData.DetailData.data.onlyForAdult;
        ExtendData.PackageID = ExtendData.DetailData.data.packageID;
        ExtendData.travelersInput = ExtendData.SearchPriceData.data.bookingFormInfo.travelersInput;
        ExtendData.requiredPickupPoint = ExtendData.SearchPriceData.data.bookingFormInfo.requiredPickupPoint;
        ExtendData.airportTransferType = ExtendData.SearchPriceData.data.bookingFormInfo.airportTransferType;
        ExtendData.addPackage = 1;
        //localStorage.setItem("lists",JSON.stringify(ExtendData));

        console.log(ExtendData);


        Adapter.initBookingPackage();
        Adapter.initAddPackage();
        Adapter.initCount();
        Adapter.initPickUP();
        Adapter.priceDetail();
        Adapter.bindPickupSearchInput();


      },
      initPickUP:function(){
        if(ExtendData.requiredPickupPoint){
          $("#js_booking_package_pickup").show();
          Adapter.bindPickupSelect();
          //Method["callbackPickup"](pickupInfosData);
        }else{
          $("#js_booking_package_pickup").hide();
        }
      },
      initBookingPackage:function(){
        var tplString="",outString =""
        //第一次初始化
        tplString = $("#tpl_BookingPackage").html();
        if(ExtendData.isAudlt){
          outString = ejs.render(tplString,{lists:ExtendData});
          $("#js_BookingPackage_first").html(outString);
          Adapter.bindAudltCount();
        }else{
          outString = ejs.render(tplString,{lists:ExtendData});
          $("#js_BookingPackage_first").html(outString);
          Adapter.bindChildCount();
        }
        /**
         * 时间选择 上午 下午 晚上 全天 不显示
         */
        $(".booking_package_fullday_ul").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0];
          console.log();

          if(tar.nodeName.toLowerCase() === 'li') {
            if($(tar).hasClass("current")){
              if($(tar).siblings().length > 0){
                $(tar).removeClass("current");
              }
            }else {
              $(tar).addClass("current");
              $(tar).siblings().removeClass("current");
            }

          }
        });
      },
      initAddPackage:function(){
        //第一次初始化 添加套餐
        var tplAddPackage = $("#tpl_BookingPackageAddPackage").html();
        var outAddPackage = ejs.render(tplAddPackage,{lists:ExtendData});
        $(".js_booking_footer_pop_list").html(outAddPackage);

        /**
         *  添加套餐 选中&取消选中
         */
        $("#js_booking_footer_pop_item_r").toggle(function(e){
          $("#js_booking_footer_pop_item_i").addClass("current");
        },function(e){
          $("#js_booking_footer_pop_item_i").removeClass("current");
        });
      },
      addPackage:function(data){
        var tplString="",outString ="";
        var id = data.id && data.id;
        var isadult = $(""+id+"").attr("data-key");
        ExtendData.isAudlt = parseInt(isadult);
        ExtendData.addPackage = 0;

        if($("#js_booking_footer_pop_item_i").hasClass("current")){
          tplString = $("#tpl_BookingPackage").html();
          if(ExtendData.isAudlt){
            outString = ejs.render(tplString,{lists:ExtendData});
            $("#js_BookingPackage_last").html(outString);
            Adapter.bindAudltCount();

          }else{
            outString = ejs.render(tplString,{lists:ExtendData});
            $("#js_BookingPackage_last").html(outString);
            Adapter.bindChildCount();
          }

          $("#js_booking_package_addpackage").addClass("stopgray");
        }

      },
      initCount:function(){
        if(ExtendData.minPax != -1){
          for(var i = 0;i<ExtendData.minPax;i++){
            if(ExtendData.isAudlt){
              $(".js_booking_package_adult_maxbtn").trigger("click");
            }else{
              $(".js_booking_package_child_maxbtn").trigger("click");
            }
          }
        }
      },
      bindChildCount:function(){
        /**
         * 游玩人数 减少
         */
        $(".js_booking_package_child_minbtn").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0],perprice = 0,totalprice = 0;
          var count = parseInt($(tar).next().html());
          perprice = $(tar).next().attr("data-preprice");
          if(count > 0){
            count--;
            totalprice = count * perprice;
            $(tar).next().html(count);
            $(tar).next().attr("data-value",totalprice);
            Adapter.totalPrice();
            Adapter.removeChildInput(".js_booking_package_pre_childlist");
            if(count == 0){
              $(tar).removeClass("current");
            }
          }
        });
        /**
         * 游玩人数 增加
         */
        $(".js_booking_package_child_maxbtn").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0],perprice = 0,totalprice = 0;
          var count = parseInt($(tar).prev().html());
          perprice = $(tar).prev().attr("data-preprice");
          $(tar).prev().prev().addClass("current");
          count++;
          totalprice = count * perprice;
          $(tar).prev().html(count);
          $(tar).prev().attr("data-value",totalprice);
          Adapter.totalPrice();
          Adapter.addChildInput(".js_booking_package_pre_childlist",count);
        });

        //var target = document.querySelector(".js_booking_package_pre_child_num");
        //well().oneWatch("wellWatch",{target:target,callback:function(data){
        //  console.log(data.target);
        //}});

      },
      bindAudltCount:function(){
        /**
         * 游玩人数 减少
         */
        $(".js_booking_package_adult_minbtn").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0],perprice = 0,totalprice = 0;
          var count = parseInt($(tar).next().html());
          perprice = $(tar).next().attr("data-preprice");
          if(count > 0){
            count--;
            totalprice = count * perprice;
            $(tar).next().html(count);
            $(tar).next().attr("data-value",totalprice);
            if(count == 0){
              $(tar).removeClass("current");
            }

            Adapter.totalPrice();
          }
        });
        /**
         * 游玩人数 增加
         */
        $(".js_booking_package_adult_maxbtn").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0],perprice = 0,totalprice = 0;
          var count = parseInt($(tar).prev().html());
          perprice = $(tar).prev().attr("data-preprice");
          $(tar).prev().prev().addClass("current");
          count++;
          totalprice = count * perprice;
          $(tar).prev().html(count);
          $(tar).prev().attr("data-value",totalprice);

          Adapter.totalPrice();
        });
      },
      addChildInput:function(id,count){
        var tplString = "",outString = "";
        $(""+id+"").innerHTML = "";
        tplString = $("#tpl_BookingPackageCount").html();
        outString = ejs.render(tplString,{lists:ExtendData,count:count});
       $(""+id+":last").append(outString);
      },
      removeChildInput:function(id){
        $(""+id+" li:last").remove();
      },
      totalPrice:function(){
        var perprice1 = 0,perprice2 = 0,totalprice = 0;
        perprice1 = $(".js_booking_package_pre_child_num").length;
        perprice2 = $(".js_booking_package_pre_adult_num").length;

        if(perprice1 > 0){
          totalprice = totalprice + parseInt($(".js_booking_package_pre_child_num").attr("data-value"));
        }

        if(perprice2 > 0){
          totalprice = totalprice + parseInt($(".js_booking_package_pre_adult_num").attr("data-value"));
        }

        $(".js_booking_package_totalprice").html(totalprice);
      },
      priceDetail:function(){

        /**
         * 费用明细
         */
        $("#js_booking_price").toggle(function(e){
          Adapter.updatePriceDetail();
          $("#js_booking_footer_i").addClass("current");
          $(".js_booking_footer_popprice").animate({bottom: '0rem'},300,function(e){
            $(".mask_tips").show();
          });
        },function(e){
          Adapter.updatePriceDetail();
          $("#js_booking_footer_i").removeClass("current");
          $(".js_booking_footer_popprice").animate({bottom: '-7.8rem'},300,function(e){
            $(".mask_tips").hide();
          });
        });

        $(".mask_tips").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0];
          if(tar.className.toLowerCase() === 'mask_tips'){
            $("#js_booking_price").trigger("click");
          }

        });
      },
      updatePriceDetail:function(){
        var tplString="",outString="";
        $(".js_booking_footer_popprice_list").empty();

          if($(".js_booking_package_pre_adult_num").html() !== undefined){
            for(var i =0;i<ExtendData.SearchPriceData.data.prices.length;i++){
              if(ExtendData.SearchPriceData.data.prices[i].category == "ADULT"){
                tplString = $("#tpl_BookingPackagePriceDetail").html();
                outString = ejs.render(tplString,{tourCategory:"成人票",
                  tourAmount:ExtendData.SearchPriceData.data.prices[i].amount,
                  tourNum:$(".js_booking_package_pre_adult_num").html()});
                $(".js_booking_footer_popprice_list").append(outString);
                //console.log(ExtendData.SearchPriceData.data.prices[i].amount);
              }
            }
          }
          if($(".js_booking_package_pre_child_num").html() !== undefined){
            for(var i =0;i<ExtendData.SearchPriceData.data.prices.length;i++){
              if(ExtendData.SearchPriceData.data.prices[i].category == "CHILD"){
                tplString = $("#tpl_BookingPackagePriceDetail").html();
                outString = ejs.render(tplString,{tourCategory:"儿童票",
                  tourAmount:ExtendData.SearchPriceData.data.prices[i].amount,
                  tourNum:$(".js_booking_package_pre_child_num").html()});
                $(".js_booking_footer_popprice_list").append(outString);
                //console.log(ExtendData.SearchPriceData.data.prices[i].amount);
              }
            }
          }



      },
      bindPickupSelect:function(){
        $(".js_booking_package_pickup_select").click(function(e){

        });
      },
      bindPickupSearchInput:function(){
        var suggest = "";
        $(".pickup_pop").hide();
        $(".js_pickup_pop_search_input").click(function(e){
          $(".pickup_pop_search_icon").animate({left:"0rem"},300);
          $(".js_pickup_pop_search_input").animate({padding:"0.06rem 0.28rem 0.06rem .5rem"},300);
        });

        $(".js_pickup_pop_search_input").blur(function(e){
          $(".pickup_pop_search_icon").animate({left:"2rem"},300);
          $(".js_pickup_pop_search_input").animate({padding:"0.06rem 0.28rem 0.06rem 2.5rem"},300);
        });

        $(".js_pickup_pop_search_input").bind("keyup , input propertychange",function(e){
          //第一次初始化
          $(document).scrollTop(0);
          var tplString = "", outString = "",new_list=[],tmp_list = pickupInfosData.data.pickupInfos;
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0];
          var key = $(tar).val().toLowerCase().trim();
          //console.log(tmp_list);
          for(var i = 0;i<tmp_list.length;i++){
            if(tmp_list[i].pickupPoint.toLowerCase().indexOf(key) > -1){
              new_list.push(tmp_list[i]);
            }

          }
          tplString= $("#tpl_Booking_pickuppop_suggest").html();
          outString = ejs.render(tplString,{lists:new_list});
          $("#js_pickup_pop_suggest_list").html(outString);
        });

        $("#js_pickup_pop_header_goback").click(function(e){
          $(".pickup_pop").hide();
        });

        $(".js_booking_package_pickup_select").click(function(e){
          $(".pickup_pop").show();
          $(document).scrollTop(0);
          Method["callbackPickup"](pickupInfosData);
        });
      }


    }

    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callCommand:function(type,data){
        return Adapter[type]?Adapter[type](data):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addCommand:function(type,fn){
        Adapter[type] = fn;
      },
      /**
       * 通信适配器Command
       *  var titleData = {
       *    title:'夏日',
       *    tips:'暖暖夏日'
       *  }
       *  AjaxAdapter().execAjaxAdapter({
       *    command:'display',
       *    param:[titleData,'title']
       *  });
       * @returns {*}
       */
      execCommand:function(msg){
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]"?msg.param : [msg.param];
        return Adapter[msg.command].apply(Adapter,msg.param);
      }
    }
  };


  /**
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var Adapter = {
      getDetails:function(data){
        var param = {
          "Parameters" : {
            "PackageID" : val.PackageID
          },
          "ForeEndType" : 3,
          "Code" : "0088"
        }
        vlm.loadJson("",JSON.stringify(param),Method["callbackDetails"]);
      },
      getSearchPrice:function(data){
        recalSearchPrice = data;
        vlm.loadJson("",JSON.stringify(data),Method["callbackSearchPrice"]);
      },
      getPickup:function(data){
        if (val.RPP == "0") {
          $(".js_booking_package_pickup").hide();
          return false;
        }else{
          var param = {
            "Parameters" : {
              "PackageID" : val.PackageID
            },
            "ForeEndType" : 3,
            "Code" : "0089"
          }
          vlm.loadJson("",JSON.stringify(param),Method["callbackPickup"]);
        }

      }
    }

    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callAjaxAdapter:function(type,data){
        return Adapter[type]?Adapter[type](data):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addAjaxAdapter:function(type,fn){
        Adapter[type] = fn;
      },
      /**
       * 通信适配器Command
       *  var titleData = {
       *    title:'夏日',
       *    tips:'暖暖夏日'
       *  }
       *  AjaxAdapter().execAjaxAdapter({
       *    command:'display',
       *    param:[titleData,'title']
       *  });
       * @returns {*}
       */
      execAjaxAdapter:function(msg){
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]"?msg.param : [msg.param];
        return Adapter[msg.command].apply(Adapter,msg.param);
      }
    }
  };



  var Method = {
    callbackDetails:function(data){
      var json = data;
      DetailData = json;
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
              "Tours": []
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
                "Tours": []
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
        T.AjaxAdapter().callAjaxAdapter("getPickup",{});
        T.AjaxAdapter().callAjaxAdapter("getSearchPrice",SearchPrice);
      } else {
        console.log(json);
        jAlert(json.message, "提示");
      }
    },
    callbackSearchPrice:function(data){
      var json = data;
      SearchPriceData = json;
      if (json.success) {
        ExtendData = $.extend({
          "SearchPriceData" : SearchPriceData
        }, ExtendData);

        T.Command().callCommand("render",{});
      } else {
        console.log(json);
        jAlert(json.message, "提示");
      }
    },
    callbackPickup:function(data){
      var tplString="",outString =""
      var json = data;
      if (json.success) {
        pickupInfosData = json;

        //第一次初始化
        tplString = $("#tpl_Booking_pickuppop_suggest").html();
        outString = ejs.render(tplString,{lists:pickupInfosData.data.pickupInfos});
        $("#js_pickup_pop_suggest_list").html(outString);
        $("#js_pickup_pop_suggest_list").click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement,
            tar = $(tar)[0];
          if(tar.nodeName.toLowerCase() === 'li'){
            var id = $(tar).attr("data-key");
            var value = $(tar).html();
            $(".js_booking_package_pickup_select").attr("data-key",id).html(value);
            $(".js_pickup_pop_search_input").val("");
            $("#js_pickup_pop_header_goback").trigger("click");
          }
        });
        //console.log(pickupInfosData);
      } else {
        console.log(json);
        jAlert(json.message, "提示");
      }
    }
  };

  /**
   * 获取 data-bind 数据并解析
   */
  var VM = function () {
    function getBindData(dom) {
      var data = dom.getAttribute("data-bind");
      return !!data && (new Function("return ({" + data + "})"))();
    }

    return function (id) {
      var doms = document.getElementById(id), ctx = null;
      ctx = getBindData(doms);
      ctx.type && Method[ctx.type] && Method[ctx.type](doms, ctx);
    }
  }();

  //设置公共属性
  webkit.T = webkit.T || {};
  webkit.T.Load = VM;
  webkit.T.AjaxAdapter = AjaxAdapter;
  webkit.T.Command = Command;

})();
/**
 * 入口
 */
(function(){
  /**
   *  添加套餐 显示
   */
  $("#js_booking_package_addpackage").click(function(e){
    $(".booking_footer_pop").animate({bottom: '0rem'},300,function(e){
      $(".mask_pop").show();
      $("#js_booking_footer_i").addClass("current");
    });
    T.Command().callCommand("initAddPackage",{});
  });

  $(".mask_pop").click(function(e){
    var e = e || window.event,
      tar = e.target || e.srcElement,
      tar = $(tar)[0];
    if(tar.className.toLowerCase() === 'mask_pop'){
      $("#js_booking_footer_pop_tool_cancel").trigger("click");
    }
  });
  /**
   * 添加套餐 取消
   */
  $("#js_booking_footer_pop_tool_cancel").click(function(e){
    $(".booking_footer_pop").animate({bottom: '-7.8rem'},300,function(e){
      $(".mask_pop").hide();
      $("#js_booking_footer_i").removeClass("current");
    });
  });
  /**
   * 添加套餐 确认
   */
  $("#js_booking_footer_pop_tool_confirm").click(function(e){
    $(".booking_footer_pop").animate({bottom: '-7.8rem'},300,function(e){
      $(".mask_pop").hide();
      $("#js_booking_footer_i").removeClass("current");
    });

    T.Command().callCommand("addPackage",{id:"#js_booking_footer_pop_item_r"});
  });


  /**
   * 加载详情
   */
  T.AjaxAdapter().callAjaxAdapter("getDetails",{});
  //T.Command().callCommand("render",{});
  //vlm.init();
})();
