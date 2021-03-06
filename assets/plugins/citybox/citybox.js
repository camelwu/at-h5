/**
 * Created by Venson on 16/5/5.
 */
(function () {
  var webkit = this || (0, eval)('this');
  var show1 = 0,show2 = 0,scrollTopPx = 0.88,cityboxHistoryScrollTop = 0,isHistory = 0;
  var globalType = "";
  var returnType = "";
  var returnAttr = "";
  var returnStrType = "";
  var returnStrAttr = "";
  var returnCountryType = "";
  var returnCountryAttr = "";
  var cityboxCache = 1;
  var config = {
    HistoryData:{},
    HotCityListData:{},
    CityListData:{},
    LetterIndexData:[],
    cacheHotCityList:{},
    cacheCityList:{}
  };
  var tips = {
    GEO_UNKNOWN_DATA:"尚无旅行产品,请切换其他城市。",
    GEO_UNKNOWN_ERROR:"由于未知原因，无法获取地理定位信息，请重新尝试。",
    GEO_PERMISSION_DENIED:"您的当前位置不可用,请开启设备上的\"定位服务\"。",
    GEO_TIMEOUT:"获取信息超时，请重新尝试。",
    GEO_POSITION_UNAVAILABLE:"由于网络或信号等问题，地理定位失败，请检查网络或信号。"
  }
  /**
   * 排序
   * @param a
   * @param b
   * @returns {number}
   * @constructor
   */
  var ByCitylist = function(a,b){
    return a.fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0) - b.fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0);
  };



  /**
   * 数据通信策略层
   * @returns {{callAjaxAdapter: callAjaxAdapter, addAjaxAdapter: addAjaxAdapter}}
   * @constructor
   */
  var AjaxAdapter = function(){
    var adapter = {
      /**
       * 机+酒+景 去程 通信
       * @param data
       * @returns {Array}
       */
      hft_ori:function(){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_OriCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hft_oriHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_OriCityListData),Method["hft_oriCityListDataCallback"]);
      },
      /**
       * 机+酒+景Cache 去程 通信
       * @param data
       * @returns {Array}
       */
      hft_ori_cache:function(){
        Method["hft_oriHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["hft_oriCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 机+酒+景 返程 通信
       * @param data
       * @returns {Array}
       */
      hft_des:function(){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_DesCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hft_desHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_DesCityListData),Method["hft_desCityListDataCallback"]);
      },
      /**
       * 机+酒+景Cache 返程 通信
       * @param data
       * @returns {Array}
       */
      hft_des_cache:function(){
        Method["hft_desHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["hft_desCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 机+酒 去程 通信
       * @param data
       * @returns {Array}
       */
      hf_ori:function(){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_OriCityListData = {"Parameters":{"CityType":"1","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hf_oriHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_OriCityListData),Method["hf_oriCityListDataCallback"]);
      },
      /**
       * 机+酒Cache 返程 通信
       * @param data
       * @returns {Array}
       */
      hf_ori_cache:function(){
        Method["hf_oriHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["hf_oriCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 机+酒 去程 通信
       * @param data
       * @returns {Array}
       */
      hf_des:function(){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_DesCityListData = {"Parameters":{"CityType":"2","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hf_desHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_DesCityListData),Method["hf_desCityListDataCallback"]);
      },
      /**
       * 机+酒Cache 返程 通信
       * @param data
       * @returns {Array}
       */
      hf_des_cache:function(){
        Method["hf_desHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["hf_desCityListDataCallback"](JSON.parse(config.cacheCityList));
      },

      /**
       * 景 通信
       */
      t_des:function(){
        var t_HotCityListData = { "Parameters": {"SubProduct": "All"}, "ForeEndType": 3,"Code":"0096"};
        var t_DesCityListData = {"Parameters": {"SubProduct": "All"}, "ForeEndType": 3,"Code":"0086"};
        vlm.loadJson("",JSON.stringify(t_HotCityListData),Method["t_desHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(t_DesCityListData),Method["t_desCityListDataCallback"]);
      },
      /**
       * 景Cache 通信
       */
      t_des_cache:function(){
        Method["t_desHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["t_desCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 酒+景 通信
       */
      ht_des:function(){
        var ht_HotCityListData = { "Parameters": {"SubProduct": "All"}, "ForeEndType": 3,"Code":"0209"};
        var ht_DesCityListData = {"Parameters": {"SubProduct": "All"}, "ForeEndType": 3,"Code":"0201"};
        vlm.loadJson("",JSON.stringify(ht_HotCityListData),Method["ht_desHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(ht_DesCityListData),Method["ht_desCityListDataCallback"]);
      },
      /**
       * 酒+景Cache 通信
       */
      ht_des_cache:function(){
        Method["ht_desHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["ht_desCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 机票 国内 去程 通信
       */
      f_inori:function(){
        var f_inoriHotCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100013"};
        var f_inoriCityListData = {"success": true, "message": "", "data":domesticCities};;
        vlm.loadJson("",JSON.stringify(f_inoriHotCityListData),Method["f_inoriHotCityListDataCallback"]);
        Method["f_inoriCityListDataCallback"](f_inoriCityListData);
      }
      ,
      /**
       * 机票 国内 去程 通信
       */
      f_indes:function(){
        var f_indesHotCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100012"};
        var f_indesCityListData = {"success": true, "message": "", "data":internationalCities};
        vlm.loadJson("",JSON.stringify(f_indesHotCityListData),Method["f_indesHotCityListDataCallback"]);
        Method["f_indesCityListDataCallback"](f_indesCityListData);
      },
      /**
       * 机票 国内 去程 通信
       */
      f_outori:function(){
        var f_outoriHotCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100013"};
        var f_outoriCityListData = {"success": true, "message": "", "data":domesticCities};;
        vlm.loadJson("",JSON.stringify(f_outoriHotCityListData),Method["f_outoriHotCityListDataCallback"]);
        Method["f_outoriCityListDataCallback"](f_outoriCityListData);
      }
      ,
      /**
       * 机票 国内 去程 通信
       */
      f_outdes:function(){
        var f_outdesHotCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100012"};
        var f_outdesCityListData = {"success": true, "message": "", "data":internationalCities};
        vlm.loadJson("",JSON.stringify(f_outdesHotCityListData),Method["f_outdesHotCityListDataCallback"]);
        Method["f_outdesCityListDataCallback"](f_outdesCityListData);
      },
      /**
       * 酒 国内 通信
       */
      h_in:function(){
        var h_inHotCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100013"};
        var h_inCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100014"};
        vlm.loadJson("",JSON.stringify(h_inHotCityListData),Method["h_inHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(h_inCityListData),Method["h_inCityListDataCallback"]);
      },
      /**
       * 酒Cache 国内 通信
       */
      h_in_cache:function(){
        Method["h_inHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["h_inCityListDataCallback"](JSON.parse(config.cacheCityList));
      },
      /**
       * 酒 国际 通信
       */
      h_out:function(){
        var h_outHotCityListData ={"Parameters":"","ForeEndType":3,"Code":"10100012"};
        var h_outCityListData = {"Parameters":"","ForeEndType":3,"Code":"10100014"};
        vlm.loadJson("",JSON.stringify(h_outHotCityListData),Method["h_outHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(h_outCityListData),Method["h_outCityListDataCallback"]);
      },
      /**
       * 酒Cache 国际 通信
       */
      h_out_cache:function(){
        Method["h_outHotCityListDataCallback"](JSON.parse(config.cacheHotCityList));
        Method["h_outCityListDataCallback"](JSON.parse(config.cacheCityList));
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

  /**
   * 数据过滤策略层
   * @returns {{callAdapter: callAdapter, addAdapter: addAdapter}}
   */
  var dataAdapter = function(){
    var adapter = {
      /**
       * 机+酒+景 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      hftHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机+酒+景 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      hftCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机+酒 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      hfHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机+酒 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      hfCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 景 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      tHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 景 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      tCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].cityNamePY || "",
            shortSpellingName : data[i].cityNameInitial  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 景 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      htHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 景 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      htCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].cityNamePY || "",
            shortSpellingName : data[i].cityNameInitial  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国内 去程 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      f_inoriHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国内 去程 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      f_inoriCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityNameCN || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].pingYin || "",
            shortSpellingName : data[i].hyKeyWord  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国内 返程 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      f_indesHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国内 返程 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      f_indesCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityNameCN || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].pingYin || "",
            shortSpellingName : data[i].hyKeyWord  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国际 去程 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      f_outoriHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国际 去程 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      f_outoriCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityNameCN || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].pingYin || "",
            shortSpellingName : data[i].hyKeyWord  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国际 返程 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      f_outdesHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 机票 国际 返程 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      f_outdesCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityCode || "",
            cityName : data[i].cityNameCN || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryName || "",
            fullSpellingName : data[i].pingYin || "",
            shortSpellingName : data[i].hyKeyWord  || "",
            cityNameEn : data[i].cityNameEn  || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 酒 国内 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      h_inHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityEnglishName || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""
          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 酒 国内 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      h_inCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          if(data[i].countryISOCode.toLowerCase() == "cn"){
            obj = {
              cityCode : data[i].cityNameEN  || "",
              cityName : data[i].cityNameCN || "",
              countryCode : data[i].countryISOCode || "",
              countryName : data[i].countryName || "",
              fullSpellingName : data[i].pingYin || "",
              shortSpellingName : data[i].acronym  || "",
              cityNameEn : data[i].cityCode || ""
            };
            newObj.push(obj);
          }

        }

        return newObj;
      },
      /**
       * 酒 国际 热门城市 数据转化
       * @param data
       * @returns {Array}
       */
      h_outHotCity:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          obj = {
            cityCode : data[i].cityEnglishName || "",
            cityName : data[i].cityChineseName || "",
            countryCode : data[i].countryCode || "",
            countryName : data[i].countryChineseName || "",
            fullSpellingName : data[i].fullSpellingName || ""

          };
          newObj.push(obj);
        }
        return newObj;
      },
      /**
       * 酒 国际 城市列表 数据转化
       * @param data
       * @returns {Array}
       */
      h_outCityList:function(data){
        //data数据处理转化
        var obj = {};
        var newObj = [];
        for(var i = 0;i < data.length;i++){
          if(data[i].countryISOCode.toLowerCase() != "cn"){
            obj = {
              cityCode : data[i].cityNameEN || "",
              cityName : data[i].cityNameCN || "",
              countryCode : data[i].countryISOCode || "",
              countryName : data[i].countryName || "",
              fullSpellingName : data[i].pingYin || "",
              shortSpellingName : data[i].acronym  || "",
              cityNameEn : data[i].cityCode  || ""
            };
            newObj.push(obj);
          }
        }
        return newObj;
      }
    }


    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callAdapter:function(type,data){
        return adapter[type]?adapter[type](data):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addAdapter:function(type,fn){
        adapter[type] = fn;
      }
    }
  };

  var geo = function(){
    var params= {};
    var Adapter = {
      Location:function(param){
        params = param;
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(e) {
            Adapter.LocationSuccess({
              lat: e.coords.latitude,
              lng: e.coords.longitude,
              type:param.type,
              list:param.list
            });
          }, function(e) {
            Adapter.LocationError(e);
          },{
            enableHighAccuracy: true, // 是否获取高精度结果
            timeout: 6000, //超时,毫秒
            maximumAge: 0 //可以接受多少毫秒的缓存位置
          })
        }else{
          alert('抱歉！您的浏览器无法使用地位功能');
        }
      },
      LocationSuccess:function(param){
        var geoinfo = new google.maps.Geocoder;
        var latlng = {lat:param.lat,lng:param.lng};
        var cityname = "未知";
        geoinfo.geocode({"location":latlng},function(result,status){
          if(status == google.maps.GeocoderStatus.OK){
            cityname = result[0].address_components[3].long_name;
            for(var i= 0;i<param.list.length;i++){
              if(cityname.indexOf(param.list[i].cityName) > -1 ){
                console.log(param.list[i]);
                $(""+param.type+"").attr("data-code",param.list[i].cityCode);
                $(""+param.type+"").attr("data-name",param.list[i].cityName);
                $(""+param.type+"").attr("data-countrycode",param.list[i].countryCode);
                $(""+param.type+"").find("div").html(param.list[i].cityName);
                return;
              }
            }

            //未找到城市
            $(""+param.type+"").attr("data-code","");
            $(""+param.type+"").attr("data-name","");
            $(""+param.type+"").attr("data-countrycode","");
            $(""+param.type+"").find("div").html(cityname);
            console.log(cityname);
          }
        });
      },
      LocationError:function(error){
        console.log(error);
        switch(error.code) {
          case error.TIMEOUT://地理位置获取超时
            if(!Adapter.CurrentNetLocation()) {
              jAlert(tips.GEO_TIMEOUT, "提示");
            }
            break;
          case error.POSITION_UNAVAILABLE://地理位置获取失败（可能是用户没网或卫星搜不到等原因）
            if(!Adapter.CurrentNetLocation()){
              jAlert(tips.GEO_POSITION_UNAVAILABLE, "提示");
            }
            break;
          case error.PERMISSION_DENIED://用户拒绝
            if(!Adapter.CurrentNetLocation()) {
              jAlert(tips.GEO_PERMISSION_DENIED, "提示");
            }
            break;
          case error.UNKNOWN_ERROR://其他出错原因
            jAlert(tips.GEO_UNKNOWN_ERROR, "提示");
            break;
        }
      },
      CurrentNetLocation:function(){
        var cityname = localAddress['city'];
        if(cityname){
          if(cityname.indexOf("市") > -1){
            cityname = cityname.replace("市","");
          }
          for(var i= 0;i<params.list.length;i++) {
            if (cityname.indexOf(params.list[i].cityName) > -1) {
              $(""+params.type+"").attr("data-code",params.list[i].cityCode);
              $(""+params.type+"").attr("data-name",params.list[i].cityName);
              $(""+params.type+"").attr("data-countrycode",params.list[i].countryCode);
              $(""+params.type+"").find("div").html(params.list[i].cityName);
              return true;
            }
          }

          $(""+params.type+"").attr("data-code","");
          $(""+params.type+"").attr("data-name","");
          $(""+params.type+"").attr("data-countrycode","");
          $(""+params.type+"").find("div").html(cityname);

          return true;
        }else{
          return false;
        }

      },
      createlocation:function(param){
        var dom = param.dom;
        var data = param.data;
        dom.innerHTML = "";
        var citybox_content_title = document.createElement("div");
        citybox_content_title.setAttribute("class","citybox_content_title");
        citybox_content_title.setAttribute("id","js_location");
        citybox_content_title.innerHTML = "当前";
        dom.appendChild(citybox_content_title);

        var citybox_content_itemtitle_div = document.createElement("div");
        citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
        citybox_content_itemtitle_div.innerHTML = "未知";

        var citybox_content_item_li = document.createElement("li");
        citybox_content_item_li.setAttribute("class","citybox_content_item selected");
        citybox_content_item_li.setAttribute("id","js_d_location");
        citybox_content_item_li.setAttribute("data-code","");
        citybox_content_item_li.setAttribute("data-name","");
        citybox_content_item_li.setAttribute("data-countrycode","");
        citybox_content_item_li.appendChild(citybox_content_itemtitle_div);
        citybox_content_item_li.onclick = function(){
          var cityData = {};
          var cityName = this.getAttribute("data-name");
          var cityCode = this.getAttribute("data-code");
          var countryCode = this.getAttribute("data-countrycode");
          if(cityCode == ""){
            jAlert(tips.GEO_UNKNOWN_DATA, "提示");
            return;
          }
          cityData.returnType = returnType;
          cityData.returnAttr = returnAttr;
          cityData.returnStrType = returnStrType;
          cityData.returnStrAttr = returnStrAttr;
          cityData.cityName = cityName;
          cityData.cityCode = cityCode;
          cityData.returnCountryType = returnCountryType;
          cityData.returnCountryAttr = returnCountryAttr;
          cityData.countryCode = countryCode;
          Method["setcityboxHistory"](this,cityCode,cityName,countryCode);
          dataCityExec().callCityExec(""+globalType+"Exec",cityData);
          Method['hideAllCityBox']();
        }


        var citybox_content_container_ul = document.createElement("ul");
        citybox_content_container_ul.setAttribute("class","citybox_content_container");
        citybox_content_container_ul.appendChild(citybox_content_item_li);
        dom.appendChild(citybox_content_container_ul);
      }

    }

    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callMethod:function(type,data){
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
      callMultipleMethod:function(msg){
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]"?msg.param : [msg.param];
        return Adapter[msg.command].apply(Adapter,msg.param);
      }
    }
  };
  /**
   * 城市列表 生成策略 (globalType)id+HotCity = t_desHotCity & id+CityList = t_desCityList
   * @returns {{callCityList: callCityList, addCityList: addCityList, multiCityList: multiCityList}}
   */
  var dataSearchSuggest = function(){
    var city = {
      /**
       * 景 城市搜索
       * @param data
       * @returns {Array}
       */
      t_desSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 酒+景 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      ht_desSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 机票 国内 去程 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      f_inoriSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 机票 国内 返程 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      f_indesSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 机票 国际 去程 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      f_outoriSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 机票 国际 返程 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      f_outdesSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 酒 国内 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      h_inSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 酒 国际 城市搜索
       * @param dom
       * @param data
       * @param i
       * @returns {string}
       */
      h_outSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        //var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var shortSpellingName = data[i].shortSpellingName.toLowerCase();
        var cityNameEn = data[i].cityNameEn.toLowerCase();
        var searchVal  = cityCode+cityName+countryName+fullSpellingName+shortSpellingName+cityNameEn;
        return searchVal;
      },
      /**
       * 机+酒+景 城市搜索
       * @param data
       * @returns {Array}
       */
      hft_oriSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName;
        return searchVal;
      },
      /**
       * 机+酒+景 城市搜索
       * @param data
       * @returns {Array}
       */
      hft_desSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName;
        return searchVal;
      },
      /**
       * 机+酒 城市搜索
       * @param data
       * @returns {Array}
       */
      hf_oriSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName;
        return searchVal;
      },
      /**
       * 机+酒 城市搜索
       * @param data
       * @returns {Array}
       */
      hf_desSearchSuggest:function(dom,data,i){
        var cityCode = data[i].cityCode.toLowerCase();
        var cityName = data[i].cityName.toLowerCase();
        var countryCode = data[i].countryCode.toLowerCase();
        var countryName = data[i].countryName.toLowerCase();
        var fullSpellingName = data[i].fullSpellingName.toLowerCase();
        var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName;
        return searchVal;
      }

    }

    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callCityList:function(type,dom,data,i){
        return city[type]?city[type](dom,data,i):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addCityList:function(type,fn){
        city[type] = fn;
      },
      /**
       *  执行策略 可带参数
       *  var titleData = {
       *    title:'夏日',
       *    tips:'暖暖夏日'
       *  }
       *  listener().multiWatch({
       *    command:'watch',
       *    param:['#title']
       *  });
       * @param msg
       * @returns {*}
       */
      multiCityList:function(msg){
        msg.param = Object.prototype.toString.call(msg.param) === "[object Array]"?msg.param : [msg.param];
        return city[msg.command].apply(city,msg.param);
      }
    }
  };

  /**
   * 城市列表 行为策略(跳转|赋值) (globalType)id+Exec = t_desExec
   * @returns {{callCityList: callCityList, addCityList: addCityList, multiCityList: multiCityList}}
   */
  var dataCityExec = function(){
    var cityexec = {
      /**
       *
       * @param data
       */
      pub_Exec:function(data){
        if(data.returnAttr!=""){
          $(data.returnType).attr(""+data.returnAttr+"",data.cityCode);
        }else{
          $(data.returnType).attr("data-code",data.cityCode);
        }

        if(data.returnStrType != ""){
          if(data.returnStrAttr != ""){
            $(data.returnStrType).attr(""+data.returnStrAttr+"",data.cityName);
          }else{
            $(data.returnStrType).html(data.cityName);
          }
        }else{
          $(data.returnType).html(data.cityName);
        }

        if(data.returnCountryType != ""){
          if(data.returnCountryAttr != ""){
            $(data.returnCountryType).attr(""+data.returnCountryAttr+"",data.countryCode);
          }else{
            $(data.returnCountryType).html(data.countryCode);
          }
        }else{
          $(data.returnCountryType).html(data.countryCode);
        }
        $(".citybox_search_suggestBG").css("display","none");
      },
      /**
       * 景
       * @param data
       * @returns {Array}
       */
      t_desExec:function(data){
        window.location.href = "/scenic/scenic_list.html?DestCityCode="+data.cityCode;
      },
      /**
       * 酒+景
       * @param data
       * @returns {Array}
       */
      ht_desExec:function(data){
        window.location.href = "/tour/scenic_list.html?DestCityCode="+data.cityCode;
      },
      /**
       * 机+酒+景
       * @param data
       * @returns {Array}
       */
      hft_oriExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机+酒+景
       * @param data
       * @returns {Array}
       */
      hft_desExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机票 国内 去程
       * @param data
       * @returns {Array}
       */
      f_inoriExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机票 国内 返程
       * @param data
       * @returns {Array}
       */
      f_indesExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机票 国际 去程
       * @param data
       * @returns {Array}
       */
      f_outoriExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机票 国际 返程
       * @param data
       * @returns {Array}
       */
      f_outdesExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 酒 国内
       * @param data
       * @returns {Array}
       */
      h_inExec:function(data){
        cityexec.pub_Exec(data);

      },
      /**
       * 酒 国际
       * @param data
       * @returns {Array}
       */
      h_outExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机+酒
       * @param data
       * @returns {Array}
       */
      hf_oriExec:function(data){
        cityexec.pub_Exec(data);
      },
      /**
       * 机+酒
       * @param data
       * @returns {Array}
       */
      hf_desExec:function(data){
        cityexec.pub_Exec(data);
      }

    }


    return {
      /**
       * 调用数据过滤方法
       * @param type
       * @param data
       * @returns {string}
       */
      callCityExec:function(type,dom,data,i){
        return cityexec[type]?cityexec[type](dom,data,i):'';
      },
      /**
       * 添加策略
       * @param type
       * @param fn
       */
      addCityExec:function(type,fn){
        cityexec[type] = fn;
      }
    }
  };



  var Method = {
    geolocationview:function(){
      geo().callMethod("Location",{"type":"#js_d_location","list":config["CityListData"]});
    },
    /**
     * 显示城市列表 并 隐藏城市搜索列表
     */
    showCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").show();
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").hide();
      $(".citybox_wrap").show();
      $(".citybox_index").show();
      $("#citybox_search_container").show();
      $("#citybox_search_container").removeClass("citybox_search_container");
      $("#citybox_search_container").addClass("citybox_search_container");
      cityboxHistoryScrollTop = $(document).scrollTop();
      $(".citybox_content").scrollTop(0);
    },
    /**
     * 隐藏城市列表 并 显示城市搜索列表
     */
    hideCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").hide();
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").show();
      $(".citybox_search_suggestBG").show();
      $(".citybox_index").hide();
      $("#js_citybox_searchactive_input").focus();
      $(".citybox_content").scrollTop(0);
      VM("citybox_suggest_list");
    },
    /**
     * 隐藏城市列表 和 城市搜索列表
     */
    hideAllCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").hide();
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").hide();
      $(".citybox_wrap").hide();
      $(".citybox_search_container").hide();
      $(document).scrollTop(cityboxHistoryScrollTop);
    },
    /**
     * 返回城市数据
     * @param dom
     * @param data
     */
    loadingCityBox:function(){
      if(show1 && show2){
        $("#preloader").hide();
      }
    },
    /**
     * 设置城市接口
     * @param dom
     * @param data
     */
    setCityBox:function(dom,data){
      console.log(data);
      globalType = data.data;
      returnType = data.returnId;
      returnAttr = data.returnAttr || "";
      returnStrType = data.returnStrId || "";
      returnStrAttr = data.returnStrVal || "";
      returnCountryType = data.returnCountryId || "";
      returnCountryAttr = data.returnCountryVal || "";
      cityboxCache = data.cache || 1;
      show1 = 0;
      show2 = 0;
      $("#preloader").show();
      Method["showCityBox"]();

      VM("citybox_location");//当前城市

      VM("citybox_history");//显示历史纪录

      config["cacheHotCityList"] = localStorage.getItem(globalType+"_cacheHotcitylist")||"";
      config["cacheCityList"] = localStorage.getItem(globalType+"_cacheCitylist") || "";
      if(config["cacheHotCityList"] != "" && config["cacheCityList"] != "" && cityboxCache == 1){
        AjaxAdapter().callAjaxAdapter(globalType+"_cache");
      }else{
        AjaxAdapter().callAjaxAdapter(globalType);
      }


    },
    /**
     * 回调方法 机+酒+景 城市列表 热门城市
     * @param json
     */
    hft_oriHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        config["HotCityListData"]= dataAdapter().callAdapter("hftHotCity",json.data.hotCitysCN);
        //localStorage.setItem("listhotcity",JSON.stringify(config["HotCityListData"]));
        VM("citybox_hotcitylist");
        show1 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }

    },
    /**
     * 回调方法 机+酒+景 城市列表 热门城市
     * @param json
     */
    hft_desHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        config["HotCityListData"]= dataAdapter().callAdapter("hftHotCity",json.data.hotCitysInternational);
        VM("citybox_hotcitylist");
        show1 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }

    },
    /**
     * 回调方法 机+酒+景 城市列表 去程
     * @param json
     */
    hft_oriCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        config["CityListData"]= dataAdapter().callAdapter("hftCityList",json.data.departCities);
        //localStorage.setItem("listcity",JSON.stringify(config["CityListData"]));
        VM("citybox_citylist");
        show2 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 回调方法 机+酒+景 城市列表 返程
     * @param json
     */
    hft_desCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        config["CityListData"]= dataAdapter().callAdapter("hftCityList",json.data.destCities);
        VM("citybox_citylist");
        show2 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 回调方法 机+酒 城市列表 热门城市
     * @param json
     */
    hf_oriHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        config["HotCityListData"]= dataAdapter().callAdapter("hfHotCity",json.data.hotCitysCN);
        VM("citybox_hotcitylist");
        show1 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 回调方法 机+酒 城市列表 热门城市
     * @param json
     */
    hf_desHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        config["HotCityListData"]= dataAdapter().callAdapter("hfHotCity",json.data.hotCitysInternational);
        VM("citybox_hotcitylist");
        show1 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 回调方法 机+酒 城市列表 去程
     * @param json
     */
    hf_oriCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        config["CityListData"]= dataAdapter().callAdapter("hfCityList",json.data.citys);
        VM("citybox_citylist");
        show2 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 回调方法 机+酒 城市列表 返程
     * @param json
     */
    hf_desCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        config["CityListData"]= dataAdapter().callAdapter("hfCityList",json.data.citys);
        VM("citybox_citylist");
        show2 = 1;
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 景 热门城市
     * @param json
     */
    t_desHotCityListDataCallback:function(json){
      //console.log(json);

      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("tHotCity",json.data.destCities);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 景 城市列表
     * @param json
     */
    t_desCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("tCityList",json.data.destCities);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 酒+景 热门城市
     * @param json
     */
    ht_desHotCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("htHotCity",json.data.destCities);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 酒+景 城市列表
     * @param json
     */
    ht_desCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("htCityList",json.data.destCities);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国内 去程 热门城市
     * @param json
     */
    f_inoriHotCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("f_inoriHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国内 去程 城市列表
     * @param json
     */
    f_inoriCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("f_inoriCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国内 返程 热门城市
     * @param json
     */
    f_indesHotCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("f_indesHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国内 返程 城市列表
     * @param json
     */
    f_indesCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("f_indesCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国际 去程 热门城市
     * @param json
     */
    f_outoriHotCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("f_inoriHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国际 去程 城市列表
     * @param json
     */
    f_outoriCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("f_inoriCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国际 返程 热门城市
     * @param json
     */
    f_outdesHotCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("f_indesHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 机票 国际 返程 城市列表
     * @param json
     */
    f_outdesCityListDataCallback:function(json){
      console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("f_indesCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 酒 国内 热门城市
     * @param json
     */
    h_inHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("h_inHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 酒 国内 城市列表
     * @param json
     */
    h_inCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("h_inCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },/**
     * 酒 国际 热门城市
     * @param json
     */
    h_outHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheHotCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheHotcitylist",JSON.stringify(json));
        }
        show1 = 1;
        config["HotCityListData"]= dataAdapter().callAdapter("h_outHotCity",json.data);
        VM("citybox_hotcitylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * 酒 国际 城市列表
     * @param json
     */
    h_outCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        if(config.cacheCityList == "" && cityboxCache == 1){
          localStorage.setItem(""+globalType+"_cacheCitylist",JSON.stringify(json));
        }
        show2 = 1;
        config["CityListData"]= dataAdapter().callAdapter("h_outCityList",json.data);
        VM("citybox_citylist");
        Method["loadingCityBox"]();
      }else{
        console.log(json);
      }
    },
    /**
     * Header设置
     * @param dom
     * @param data
     */
    cityboxHeader:function(dom,data){

    },
    /**
     * 当前城市地理位置模块
     * @param dom
     * @param data
     */
    cityboxLocation:function(dom,data){

      if(globalType.indexOf("h_in") > -1){
        geo().callMethod("createlocation",{"dom":dom,"data":data});
        return;
      }

      if(globalType.indexOf("h_out") > -1){
        geo().callMethod("createlocation",{"dom":dom,"data":data});
        return;
      }

      $(dom).hide();

    },
    /**
     * 城市历史记录
     * @param dom
     * @param data
     */
    cityboxHistory:function(dom,data){
      dom.innerHTML = "";
      var cityboxHistoryData = localStorage.getItem(""+globalType+"_history") || "";
      isHistory = 1;
      if(cityboxHistoryData != ""){//begin if
        isHistory  = 0;
        cityboxHistoryData = JSON.parse(cityboxHistoryData);
        var citybox_content_title_div = document.createElement("div");
        citybox_content_title_div.setAttribute("class","citybox_content_title");
        citybox_content_title_div.setAttribute("id","js_history");
        citybox_content_title_div.innerHTML = "历史选择";
        dom.appendChild(citybox_content_title_div);
        if(cityboxHistoryData){
          var citybox_content_container_ul = document.createElement("ul");
          citybox_content_container_ul.setAttribute("class","citybox_content_container");


          for (var i = cityboxHistoryData.length-1;i >= 0;i--){
            var citybox_content_item_li = document.createElement("li");
            citybox_content_item_li.setAttribute("class","citybox_content_item");
            citybox_content_item_li.setAttribute("data-code",cityboxHistoryData[i].toString().split(":")[0]);
            citybox_content_item_li.setAttribute("data-name",cityboxHistoryData[i].toString().split(":")[1].split("|")[0]);
            citybox_content_item_li.setAttribute("data-countrycode",cityboxHistoryData[i].toString().split(":")[1].split("|")[1]);
            citybox_content_item_li.onclick = function(){
              var cityData = {};
              var cityName = this.getAttribute("data-name");
              var cityCode = this.getAttribute("data-code");
              var countryCode = this.getAttribute("data-countrycode");
              cityData.returnType = returnType;
              cityData.returnAttr = returnAttr;
              cityData.returnStrType = returnStrType;
              cityData.returnStrAttr = returnStrAttr;
              cityData.cityName = cityName;
              cityData.cityCode = cityCode;
              cityData.returnCountryType = returnCountryType;
              cityData.returnCountryAttr = returnCountryAttr;
              cityData.countryCode = countryCode;
              Method["setcityboxHistory"](this,cityCode,cityName,countryCode);
              dataCityExec().callCityExec(""+globalType+"Exec",cityData);
              Method['hideAllCityBox']();
            }
            var citybox_content_itemtitle_div = document.createElement("div");
            citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
            citybox_content_itemtitle_div.innerHTML = cityboxHistoryData[i].toString().split(":")[1].split("|")[0];
            citybox_content_item_li.appendChild(citybox_content_itemtitle_div);
            citybox_content_container_ul.appendChild(citybox_content_item_li);

          }
          dom.appendChild(citybox_content_container_ul);
        }

      }//end if
    },
    /**
     * 城市历史记录
     * @param dom
     * @param data
     */
    setcityboxHistory:function(dom,cityCode,cityName,countryCode,type){
      var tmpdata = [];
      var newHistoryCityData = [cityCode+":"+cityName+"|"+countryCode];
      globalType = globalType || type;
      var cityboxHistoryData = localStorage.getItem(""+globalType+"_history");
      if(!cityboxHistoryData){
        tmpdata.push(newHistoryCityData);
        localStorage.setItem(""+globalType+"_history",JSON.stringify(tmpdata));
      }else{
        cityboxHistoryData = JSON.parse(cityboxHistoryData);
        for (var i = cityboxHistoryData.length-1;i >= 0;i--){

          if(cityboxHistoryData[i].toString().split(":")[0] === cityCode){
            tmpdata = cityboxHistoryData[i];
            Method["remove"](cityboxHistoryData,i);
            cityboxHistoryData.push(tmpdata);
            tmpdata = cityboxHistoryData;
            localStorage.setItem(""+globalType+"_history",JSON.stringify(tmpdata));

            return;
          }

        }

        if(cityboxHistoryData.length > 2){
          cityboxHistoryData.shift();
        }
        cityboxHistoryData.push(newHistoryCityData);
        tmpdata = cityboxHistoryData;
        localStorage.setItem(""+globalType+"_history",JSON.stringify(tmpdata));
      }

    },
    /**
     * 删除数组元素
     * @param array
     * @param from
     * @param to
     * @returns {Number|*}
     */
    remove: function(array, from, to) {
      var rest = array.slice((to || from) + 1 || array.length);
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply(array, rest);
    },
    /**
     * 搜索列表
     * @param dom
     * @param data
     */
    cityboxSearchSuggest:function(dom,data){
      dom.innerHTML = "";
      $('#js_citybox_searchactive_input').val("");


      $("#js_citybox_searchactive_input").bind("keyup , input propertychange",function(){
        var data = config["CityListData"];
        var strValue = $('#js_citybox_searchactive_input').val();
        dom.innerHTML = "";
        // #2237 两个字母以上显示
        if(strValue.length <= 1) {
          return;
        }
        strValue = strValue.replace(/\s+/g,"");
        strValue = strValue.toLowerCase();


        var fragment = document.createDocumentFragment();
        for (var i =0;i<data.length;i++){

          var searchVal  = dataSearchSuggest().callCityList(""+globalType+"SearchSuggest",dom,data,i);

          if(searchVal.indexOf(strValue) > -1){
            var thin_border_li = document.createElement("li");
            thin_border_li.setAttribute("class","thin_border");

            var citybox_searchactive_li_icon_span = document.createElement("span");
            citybox_searchactive_li_icon_span.setAttribute("class","citybox_searchactive_li_icon");
            thin_border_li.appendChild(citybox_searchactive_li_icon_span);

            var citybox_searchactive_li_p = document.createElement("p");
            citybox_searchactive_li_p.setAttribute("class","citybox_searchactive_li_p");
            citybox_searchactive_li_p.setAttribute("data-code",data[i].cityCode);
            citybox_searchactive_li_p.setAttribute("data-name",data[i].cityName);
            citybox_searchactive_li_p.setAttribute("data-countrycode",data[i].countryCode);
            citybox_searchactive_li_p.innerHTML = data[i].cityName;
            citybox_searchactive_li_p.onclick = function(){
              var cityData = {};
              var cityName = this.getAttribute("data-name");
              var cityCode = this.getAttribute("data-code");
              var countryCode = this.getAttribute("data-countrycode");
              if(cityName.indexOf("(") > -1 ){
                cityName = cityName.substring(0,cityName.indexOf("("));
              }
              cityData.returnType = returnType;
              cityData.returnAttr = returnAttr;
              cityData.returnStrType = returnStrType;
              cityData.returnStrAttr = returnStrAttr;
              cityData.cityName = cityName;
              cityData.cityCode = cityCode;
              cityData.returnCountryType = returnCountryType;
              cityData.returnCountryAttr = returnCountryAttr;
              cityData.countryCode = countryCode;
              Method["setcityboxHistory"](this,cityCode,cityName,countryCode);
              dataCityExec().callCityExec(""+globalType+"Exec",cityData);
              Method['hideAllCityBox']();
            }
            thin_border_li.appendChild(citybox_searchactive_li_p);

            fragment.appendChild(thin_border_li);
          }

        }
        dom.appendChild(fragment);

        //无结果
        var childLen = dom.childNodes.length;
        if(childLen == 0){
          var thin_border_li = document.createElement("li");
          thin_border_li.setAttribute("class","thin_border");
          thin_border_li.style.border = 0;
          thin_border_li.style.textAlign = "center";

          var citybox_searchactive_li_icon_span = document.createElement("span");
          citybox_searchactive_li_icon_span.innerHTML = "无结果";
          thin_border_li.appendChild(citybox_searchactive_li_icon_span);
          fragment.appendChild(thin_border_li);
          dom.appendChild(fragment);
        }

      });
    },
    /**
     * 热门城市列表
     * @param dom
     * @param data
     */
    cityboxHotCityList:function(dom,data){
      dom.innerHTML = "";
      var data = data.data;

      var citybox_content_title_div = document.createElement("div");
      citybox_content_title_div.setAttribute("class","citybox_content_title");
      citybox_content_title_div.setAttribute("id","js_hotcity");
      citybox_content_title_div.innerHTML = "热门城市";
      dom.appendChild(citybox_content_title_div);

      var citybox_content_container_ul = document.createElement("ul");
      citybox_content_container_ul.setAttribute("class","citybox_content_container");
      dom.appendChild(citybox_content_container_ul);

      for(var i = 0;i<data.length;i++){

        var nltitle = data[i].cityName;
        if(data[i].cityName.indexOf("(") > -1 ){
          nltitle = data[i].cityName.substring(0,data[i].cityName.indexOf("("));
        }

        var citybox_content_item_li = document.createElement("li");
        citybox_content_item_li.setAttribute("class","citybox_content_item");
        citybox_content_item_li.setAttribute("data-code",data[i].cityCode);
        citybox_content_item_li.setAttribute("data-name",nltitle);
        citybox_content_item_li.setAttribute("data-countrycode",data[i].countryCode);
        citybox_content_item_li.onclick = function(){
          var cityData = {};
          var cityName = this.getAttribute("data-name");
          var cityCode = this.getAttribute("data-code");
          var countryCode = this.getAttribute("data-countrycode");
          cityData.returnType = returnType;
          cityData.returnAttr = returnAttr;
          cityData.returnStrType = returnStrType;
          cityData.returnStrAttr = returnStrAttr;
          cityData.cityName = cityName;
          cityData.cityCode = cityCode;
          cityData.returnCountryType = returnCountryType;
          cityData.returnCountryAttr = returnCountryAttr;
          cityData.countryCode = countryCode;
          Method["setcityboxHistory"](this,cityCode,cityName,countryCode);
          dataCityExec().callCityExec(""+globalType+"Exec",cityData);
          Method['hideAllCityBox']();
        }

        var citybox_content_itemtitle_div = document.createElement("div");
        citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
        citybox_content_itemtitle_div.innerHTML = nltitle;
        citybox_content_item_li.appendChild(citybox_content_itemtitle_div);
        citybox_content_container_ul.appendChild(citybox_content_item_li);
      }


    },
    /**
     * 城市列表
     * @param dom
     * @param data
     */
    cityboxCityList:function(dom,data){
      dom.innerHTML = "";
      var data = data.data.sort(ByCitylist);
      var new_letter= "",old_letter="";
      config["LetterIndexData"] = [];
      var fragment = document.createDocumentFragment();
      for (var i =0;i<data.length;i++){
        new_letter = data[i].fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toUpperCase();
        if(new_letter != old_letter){

          config["LetterIndexData"].push(new_letter);

          var citybox_content_title_div = document.createElement("div");
          citybox_content_title_div.setAttribute("class","citybox_content_title");
          citybox_content_title_div.setAttribute("id","js_index_"+new_letter+"");
          citybox_content_title_div.innerHTML = new_letter;
          fragment.appendChild(citybox_content_title_div);
          var citybox_content_lettercitylist_ul = document.createElement("ul");
          citybox_content_lettercitylist_ul.setAttribute("class","citybox_content_lettercitylist");
          fragment.appendChild(citybox_content_lettercitylist_ul);
        }

        var citybox_content_lettername_li = document.createElement("li");
        citybox_content_lettername_li.setAttribute("class","citybox_content_lettername");
        citybox_content_lettername_li.setAttribute("data-code",data[i].cityCode);
        citybox_content_lettername_li.setAttribute("data-name",data[i].cityName);
        citybox_content_lettername_li.setAttribute("data-countrycode",data[i].countryCode);
        //citybox_content_lettername_li.setAttribute("data-letter",data[i].fullSpellingName);
        citybox_content_lettername_li.innerHTML = data[i].cityName;
        citybox_content_lettername_li.onclick = function(){
          var cityData = {};
          var cityName = this.getAttribute("data-name");
          var cityCode = this.getAttribute("data-code");
          var countryCode = this.getAttribute("data-countrycode");
          if(cityName.indexOf("(") > -1 ){
            cityName = cityName.substring(0,cityName.indexOf("("));
          }
          cityData.returnType = returnType;
          cityData.returnAttr = returnAttr;
          cityData.returnStrType = returnStrType;
          cityData.returnStrAttr = returnStrAttr;
          cityData.cityName = cityName;
          cityData.cityCode = cityCode;
          cityData.returnCountryType = returnCountryType;
          cityData.returnCountryAttr = returnCountryAttr;
          cityData.countryCode = countryCode;
          Method["setcityboxHistory"](this,cityCode,cityName,countryCode);
          dataCityExec().callCityExec(""+globalType+"Exec",cityData);
          Method['hideAllCityBox']();
        }
        citybox_content_lettercitylist_ul.appendChild(citybox_content_lettername_li);
        fragment.appendChild(citybox_content_lettercitylist_ul);
        dom.appendChild(fragment);
        old_letter = new_letter;
      }
      if(globalType=="h_in"||globalType=="h_out"){
        Method["geolocationview"]();
      }
      VM("citybox_letterindex");
    },
    /**
     * 城市字母导航
     * @param dom
     * @param data
     */
    cityboxLetterIndex:function(dom,data){
      dom.innerHTML = "";
      var data = data.data;
      var citybox_summary_item_litop1="";
      if(globalType=="h_in") {
        citybox_summary_item_litop1 = document.createElement("li");
        citybox_summary_item_litop1.setAttribute("class", "citybox_summary_item");
        citybox_summary_item_litop1.setAttribute("data-key", "location");
        citybox_summary_item_litop1.innerHTML = "当前";
        citybox_summary_item_litop1.onclick = function () {
          var key = this.getAttribute("data-key");
          var a = $("#js_" + key);

          var showletter = $("#citybox_showletter");
          showletter.html("当前");
          showletter.addClass("show");
          setTimeout(function(){
            showletter.removeClass("show");
          },400);

          if (a.length != 0) {

            i = a.offset().top - ($("html").css("font-size").replace("px", "") * 0.88) + $(".citybox_content").scrollTop();
          }
          $(".citybox_content").scrollTop(i);
        }
        dom.appendChild(citybox_summary_item_litop1);
      }

      if(globalType=="h_out") {
        citybox_summary_item_litop1 = document.createElement("li");
        citybox_summary_item_litop1.setAttribute("class", "citybox_summary_item");
        citybox_summary_item_litop1.setAttribute("data-key", "location");
        citybox_summary_item_litop1.innerHTML = "当前";
        citybox_summary_item_litop1.onclick = function () {
          var key = this.getAttribute("data-key");
          var a = $("#js_" + key);

          var showletter = $("#citybox_showletter");
          showletter.html("当前");
          showletter.addClass("show");
          setTimeout(function(){
            showletter.removeClass("show");
          },400);

          if (a.length != 0) {
            i = a.offset().top - ($("html").css("font-size").replace("px", "") * 0.88) + $(".citybox_content").scrollTop();
          }
          $(".citybox_content").scrollTop(i);
        }
        dom.appendChild(citybox_summary_item_litop1);
      }

      if(!isHistory){
        var citybox_summary_item_litop2 = document.createElement("li");
        citybox_summary_item_litop2.setAttribute("class","citybox_summary_item");
        citybox_summary_item_litop2.setAttribute("data-key","history");
        citybox_summary_item_litop2.innerHTML = "历史";
        citybox_summary_item_litop2.onclick = function(){
          var key = this.getAttribute("data-key");
          var a = $("#js_"+key);
          var showletter = $("#citybox_showletter");
          showletter.html("历史");
          showletter.addClass("show");
          setTimeout(function(){
            showletter.removeClass("show");
          },400);
          if (a.length != 0) {
            i = a.offset().top - ($("html").css("font-size").replace("px","")*0.88) + $(".citybox_content").scrollTop();
          }
          $(".citybox_content").scrollTop(i);
        }
        dom.appendChild(citybox_summary_item_litop2);
      }

      var citybox_summary_item_litop3 = document.createElement("li");
      citybox_summary_item_litop3.setAttribute("class","citybox_summary_item");
      citybox_summary_item_litop3.setAttribute("data-key","hotcity");
      citybox_summary_item_litop3.innerHTML = "热门";
      citybox_summary_item_litop3.onclick = function(){
        var key = this.getAttribute("data-key");
        var a = $("#js_"+key);

        var showletter = $("#citybox_showletter");
        showletter.html("热门");
        showletter.addClass("show");
        setTimeout(function(){
          showletter.removeClass("show");
        },400);
        if (a.length != 0) {

          i = a.offset().top - ($("html").css("font-size").replace("px","")*0.88) + $(".citybox_content").scrollTop();
        }
        $(".citybox_content").scrollTop(i);
      }
      dom.appendChild(citybox_summary_item_litop3);
      var oldi = 0;
      var fragment = document.createDocumentFragment();
      for (var i=0;i<data.length;i++){
        var citybox_summary_item_li = document.createElement("li");
        citybox_summary_item_li.setAttribute("class","citybox_summary_item");
        citybox_summary_item_li.setAttribute("data-key",data[i]);
        citybox_summary_item_li.innerHTML = data[i];
        citybox_summary_item_li.onclick = function(){
          var key = this.getAttribute("data-key");
          var a = $("#js_index_" + key);

          var showletter = $("#citybox_showletter");
          showletter.html(key.toLocaleUpperCase());
          showletter.addClass("show");
          setTimeout(function(){
            showletter.removeClass("show");
          },400);

          if (a.length != 0) {

            i = a.offset().top - ($("html").css("font-size").replace("px","")*0.88) + $(".citybox_content").scrollTop();
          }
          $(".citybox_content").scrollTop(i);

        }
        fragment.appendChild(citybox_summary_item_li);
      }
      dom.appendChild(fragment);

    }
  }
  /**
   * 获取 data-bind 数据并解析
   */
  var VM = function () {
    function getBindData(dom) {
      if(!dom)return;
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
  webkit.VM = webkit.VM || {};
  webkit.VM.Load = VM;
  webkit.VM.Method = Method;
  webkit.VM.Config = config;
  webkit.VM.Typeid = globalType;
  Method["hideAllCityBox"]();
})();
