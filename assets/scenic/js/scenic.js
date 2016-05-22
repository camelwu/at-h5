/**
 * Created by apple on 16/5/19.
 */
(function(){
  var webkit = this || (0, eval)('this');


  /**
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var Adapter = {
      /**
       * 机+酒+景 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      m_t_city:function(param){
        var param = param;
        vlm.loadJson("",JSON.stringify(param),Method["m_t_cityCallback"]);
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
    m_t_city:function(dom,data){
      var Ajax = data.AjaxAdapter;
      var param = [{"Parameters": {"SubProduct": "All"}, "ForeEndType": 3, "Code": "0096"}];
      AjaxAdapter().execAjaxAdapter({
        command:Ajax,
        param:param
      });
    },
    m_t_cityCallback:function(json){
      var tpl = "";
      console.log(json);
      if(json.success){
        tpl = ejs.render("tpl_t_city",{data:json.data});
      }else{
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

})();

(function(){
  T.Load("js_t_city");
})();
