/**
 * Created by apple on 16/5/19.
 */
(function(){
  /**
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var adapter = {
      /**
       * 机+酒+景 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      hft_ori:function(){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_OriCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hftOriHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_OriCityListData),Method["hftOriCityListDataCallback"]);
      },
      /**
       * 机+酒+景 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      hft_des:function(){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_DesCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hftDesHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_DesCityListData),Method["hftDesCityListDataCallback"]);
      },
      /**
       * 机+酒 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      hf_ori:function(){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_OriCityListData = {"Parameters":{"CityType":"1","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hfOriHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_OriCityListData),Method["hfOriCityListDataCallback"]);
      },
      /**
       * 机+酒 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      hf_des:function(){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_DesCityListData = {"Parameters":{"CityType":"2","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hfDesHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_DesCityListData),Method["hfDesCityListDataCallback"]);
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
        return adapter[type]?adapter[type](data):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addAjaxAdapter:function(type,fn){
        adapter[type] = fn;
      }
    }
  };

})();
