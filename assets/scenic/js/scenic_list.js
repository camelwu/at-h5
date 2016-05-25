/**
 * Created by Venson on 16/5/24.
 */
(function(){
  var webkit = this || (0, eval)('this');
  var val = vlm.parseUrlPara(window.location.href);

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
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var Adapter = {
      /**
       * 景 列表页
       * @param data
       * @returns {Array}
       */
      m_scenic_list:function(param){
        var parameters =  {"Parameters" : {"DestCityCode" : val.DestCityCode}, "ForeEndType" : 3, "Code" : "0087"};
        vlm.loadJson("",JSON.stringify(parameters),Method["m_scenic_listCallback"]);
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
    m_scenic_list:function(dom,data){
      AjaxAdapter().callAjaxAdapter("m_scenic_list",{});
    },
    /**
     * 景 首页 热门城市
     * @param json
     */
    m_scenic_listCallback:function(json){
      var tplString = "",outString = "";
      console.log(json);
      if(json.success){
        Method['m_scenic_setHeaderMoreTitle'](json);
        tplString = $("#tpl_scenic_list").html();
        //console.log(json.data.lists);
        outString = ejs.render(tplString,{lists:json.data.lists});
        $("#js_scenic_list").html(outString);
      }else{
        console.log(json);
      }
    },
    m_scenic_setHeaderMoreTitle:function(data){
      $(".header_more_title").html(data.data.destCity);
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

})();
/**
 * 入口
 */
(function(){
  $("#t_des").click(function(e){
    VM.Load("t_des");
  });
  T.Load("js_scenic_list");
})();