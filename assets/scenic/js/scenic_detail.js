/**
 * Created by Venson on 16/5/24.
 */
(function(){
  var webkit = this || (0, eval)('this');
  var val = vlm.parseUrlPara(window.location.href);
  var themeId = "",OnlyForAdult,MinPaxType,OldMinPax, NewMinPax,MaxPax,MaxAdult,ChildAgeMax,ChildAgeMin,TourID,TravelDate,ExtendData = {};


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
      wellWatch:function(target){
        // Firefox和Chrome早期版本中带有前缀
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        // 配置观察选项:
        var config = { attributes: true };

        // 创建观察者对象
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            //console.log(mutation.attributeName);
            //console.log(mutation.target.id);
          });
        });
        // 传入目标节点和观察选项
        return observer.observe(target, config);
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
      /**
       * 景 详情预订
       * @constructor
         */
      DetailToBooking:function(e){
          console.log(e);
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
      /**
       * 景 详情
       * @param data
       * @returns {Array}
       */
      m_scenic_detail:function(param){
        var parameters=
        {
          "Parameters": {
            "PackageID": val.packageID
          },
          "ForeEndType": 3,
          "Code": "0088"
        }
        vlm.loadJson("",JSON.stringify(parameters),Method["m_scenic_detailCallback"]);
      },
      /**
       * 景 详情价格
       * @param data
       * @returns {Array}
       */
      m_scenic_detailprice:function(param){
        var parameters=param;
        vlm.loadJson("",JSON.stringify(parameters),Method["m_scenic_detailpriceCallback"]);
      },
      DetailToBooking:function(){

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
    /**
     * 景 列表
     * @param dom
     * @param data
     */
    m_scenic_detail:function(dom,data){
      AjaxAdapter().callAjaxAdapter("m_scenic_detail",{});
    },
    /**
     * 景 列表
     * @param json
     */
    m_scenic_detailCallback:function(json){
      var tplString = "",outString = "";
      //console.log(json);
      if(json.success){
        var data=json.data;
        ExtendData = data;


        var htmlc = $("#Barcontent").html();
        var htmlC = ejs.render(htmlc,json.data);
        $("#barContent").html(htmlC);
        var htmls = $("#Sceniccontent").html();
        var htmlS = ejs.render(htmls,json.data);
        //图片点击事件
        var htmlb = $("#Barimages").html();
        var htmlB = ejs.render(htmlb,{images:json.data});
        $("#barImg").html(htmlB);
        $(".swipebox").click(function() {
          $('.gallery').hide(0);
          $('.portfolio-wide').hide(0);
        });
        $(".swipebox").swipebox({
          useCSS : true,
          hideBarsDelay : 0
        });
        //加载更多点击事件
        $("#scenicContent").html(htmlS);
        var Sheight1=$("#Sheight1")[0];
        var Sheight2=$("#Sheight2")[0];
        var Sheight3=$("#Sheight3")[0];

        Sheight1.onclick =function(){
          if($("#Sheight1").hasClass("js_show")){
            $("#Sheight1").removeClass("js_show");
            $(".scenic_height1").css({'height':'4.8rem'});
            $("#Sheight1").css({"background-position":  "-3.71rem -2.26rem"});
          }else{
            $("#Sheight1").addClass("js_show");
            $(".scenic_height1").css({'height':'100%'});
            $("#Sheight1").css({"background-position":  "-4.1rem -2.26rem"});
          }

        };
        Sheight2.onclick =function(){
          if($("#Sheight2").hasClass("js_show")){
            $("#Sheight2").removeClass("js_show");
            $(".scenic_height2").css({'height':'4.8rem'});
            $("#Sheight2").css({"background-position":  "-3.71rem -2.26rem"});
          }else{
            $("#Sheight2").addClass("js_show");
            $(".scenic_height2").css({'height':'100%'});
            $("#Sheight2").css({"background-position":  "-4.1rem -2.26rem"});
          }
        };
        Sheight3.onclick =function(){
          if($("#Sheight3").hasClass("js_show")){
            $("#Sheight3").removeClass("js_show");
            $(".scenic_height3").css({'height':'4.8rem'});
            $("#Sheight3").css({"background-position":  "-3.71rem -2.26rem"});
          }else{
            $("#Sheight3").addClass("js_show");
            $(".scenic_height3").css({'height':'100%'});
            $("#Sheight3").css({"background-position":  "-4.1rem -2.26rem"});
          }
        };

        //price
        ChildAgeMin = data.childAgeMin;
        ChildAgeMax = data.childAgeMax;
        TravelDate = data.defaultDepartStartDate;
        TourID = data.tours;
        NewMinPax = data.minPax;
        MaxPax = data.maxPax;
        MaxAdult = data.maxAdult;
        MinPaxType = data.minPaxType;
        OnlyForAdult = data.onlyForAdult;
        var SearchPrice;
        if(OnlyForAdult){//只是成人
          SearchPrice= {"Parameters": {"PackageID": val.packageID, "Adult": NewMinPax, "Tours": []}, "ForeEndType": 3, "Code": "0091"};
        }else{//成人和儿童
          if(MinPaxType == 1){//成人和儿童限制
            if(MaxPax > -1){
              if(MaxPax == NewMinPax){
                OldMinPax=NewMinPax;
                NewMinPax = NewMinPax -1;
              }
            }
            SearchPrice= {"Parameters": {"PackageID": val.packageID, "Adult": NewMinPax, "Child": [ChildAgeMin], "Tours": []}, "ForeEndType": 3, "Code": "0091"};
          }else{//成人限制
            SearchPrice= {"Parameters": {"PackageID": val.packageID, "Adult": NewMinPax, "Child": [ChildAgeMin], "Tours": []}, "ForeEndType": 3, "Code": "0091"};
          }
        }

        for (var i = 0;i<data.tours.length;i++)
        {
          SearchPrice.Parameters.Tours[i] = {"TourID":data.tours[i].tourID,"TravelDate": TravelDate};
        }

        SearchPrice.Parameters.MemberID=localStorage.memberid;

        if(window.location.search.indexOf('oneticket') != -1){
          SearchPrice.Parameters.Adult = 1;
        }

        AjaxAdapter().callAjaxAdapter("m_scenic_detailprice",SearchPrice);
        //console.log(ExtendData);
      }else{
        jAlert(json.message, "提示");
        console.log(json);
      }
    },
    /**
     * 设置 城市列表标题
     * @param data
       */
    m_scenic_setHeaderMoreTitle:function(data){
      $(".header_more_title").html(data.data.destCity);
    },
    /**
     * 查询价格callback
     * @param data
       */
    m_scenic_detailpriceCallback:function(data){
      var json=data;
      //console.log(json);
      if(json.success){
        var data=json.data;
        data.minPax =OldMinPax||NewMinPax;
        var booking = $("#Booking").html();
        var bookingResult = ejs.render(booking,{data:data});
        $("#scenic_content_booking").html(bookingResult).click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement;
            if(tar.nodeName.toLowerCase() === 'a') {
              var packageId = tar.getAttribute("data-packageId");
              var RequiredPickupPoint = tar.getAttribute("data-RPP");
              var category = tar.getAttribute("data-category");
              var fail = tar.getAttribute("data-fail");
              //一元门票必须登陆
              var oneYuanStr='../scenic/scenic_order_detail.html?PackageID='+packageId+'&RPP='+RequiredPickupPoint+'&ADU='+category+'&FAIL='+fail;
              if(window.location.search.indexOf('oneticket') != -1 ){
                if(localStorage.memberid == undefined){
                  jConfirm('本产品购买需要登录，是否登录购买','',shopSure);

                  function shopSure(arg) {
                    if (arg == true) {
                      oneYuanStr=oneYuanStr+'&oneticket';
                      vlm.checkLogin(oneYuanStr);
                    }
                  }
                  return;
                }
                oneYuanStr=oneYuanStr+'&oneticket';
                window.location.href = oneYuanStr;
              }
              window.location.href = oneYuanStr;

            }
        });
      }else {
        jAlert(json.message, "提示");
        console.log(json);
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
  T.Load("js_scenic_detail");

})();
//(function(){
//  $(window)[0].addEventListener("scroll",function(){
//    var header = $(".header_scenic")[0];
//    //var height = $(".bar_img")[0].height;
//    //var scroll = $(".contents").scrollTop();
//    console.log(scroll);
//    if(!$(".content_detail").scrollTop == 0){
//      header.style.position="fixed";
//      header.style.opacity="1";
//      //$("#oldHeader")[0].style.opacity = "0";
//    }else{
//      header.style.position="absolute";
//      header.style.opacity="0";
//    }
//    //if(scroll>height){
//    //  header.style.backgroundColor = "#f7f7f7";
//    //}
//  });
//})()


