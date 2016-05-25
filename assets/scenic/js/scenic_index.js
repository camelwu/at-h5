/**
 * Created by Venson on 16/5/24.
 */
(function(){
  var webkit = this || (0, eval)('this');

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
      watch:function(target){
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
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var Adapter = {
      /**
       * 景 首页 热门城市
       * @param data
       * @returns {Array}
       */
      m_city_list:function(param){
        var parameters = {"Parameters": {"SubProduct": "All"}, "ForeEndType": 3, "Code": "0096"};
        vlm.loadJson("",JSON.stringify(parameters),Method["m_city_listCallback"]);
      },
      /**
       * 景 首页 热门景点
       * @param param
       */
      m_product_list:function(param){
        var parameters = {"Parameters": {"Isinternational": true, "PageNo": 1, "PageSize": 10}, "ForeEndType": 3, "Code": "001305"};
        vlm.loadJson("",JSON.stringify(parameters),Method["m_product_listCallback"]);
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
     * 景 首页 热门城市
     * @param dom
     * @param data
     */
    m_city_list:function(dom,data){
      var Ajax = data.AjaxAdapter;
      var param = [];
      AjaxAdapter().execAjaxAdapter({
        command:Ajax,
        param:param
      });
    },
    /**
     * 景 首页 热门城市
     * @param json
     */
    m_city_listCallback:function(json){
      var tplString = "",outString = "";
      //console.log(json);
      if(json.success){
        tplString = $("#tpl_city_list").html();
        outString = ejs.render(tplString,{data:json.data});
        $("#js_city_list").html(outString).click(function(e){
          var e = e || window.event,
            tar = e.target || e.srcElement;
          if(tar.nodeName.toLowerCase() === 'div'){
            var cityCode = (e.target).getAttribute("data-code");
            window.location.href = "../scenic/scenic_list.html?DestCityCode=" + cityCode;
          }

        });
      }else{
        console.log(json);
      }
    },
    /**
     * 景 首页 热门景点
     * @param dom
     * @param data
     */
    m_product_list:function(dom,data){
      var Ajax = data.AjaxAdapter;
      var param = [];
      AjaxAdapter().execAjaxAdapter({
        command:Ajax,
        param:param
      });
    },
    /**
     * 景 首页 热门景点
     * @param json
     */
    m_product_listCallback:function(json){
      var tplString = "",outString = "";
      //console.log(json);
      if(json.success){
        tplString = $("#tpl_product_list").html();
        outString = ejs.render(tplString,{data:json.data});
        $("#js_product_list").html(outString);
      }else{
        console.log(json);
      }
    },
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

})();
/**
 * 入口
 */
(function(){
  T.Load("js_city_list");
  T.Load("js_product_list");
  $("#t_des").click(function(e){
    VM.Load("t_des");
  });
})();
