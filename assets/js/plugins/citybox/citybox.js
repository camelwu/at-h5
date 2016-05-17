/**
 * Created by Venson on 16/5/5.
 */
(function () {
  var webkit = this || (0, eval)('this');
  var show1 = 0,show2 = 0;
  var globalType = "";
  var returnType = "";
  var config = {
    HistoryData:{},
    HotCityListData:{},
    CityListData:{},
    LetterIndexData:[]
  };
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
   * 数据转化层
   * @param data
   */
  var dataHotCityAdapter = function(type,data){
    data = data.data;
    //console.log(type);
    if(type.indexOf("des") > -1){
      config["HotCityListData"]= data.hotCitysInternational;
    }else{
      config["HotCityListData"]= data.hotCitysCN;
    }

  }

  var Method = {
    /**
     * 显示城市列表 并 隐藏城市搜索列表
     */
    showCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").css("display","block");
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").css("display","none");
    },
    /**
     * 隐藏城市列表 并 显示城市搜索列表
     */
    hideCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").css("display","none");
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").css("display","block");
      VM("citybox_suggest_list");
    },
    /**
     * 隐藏城市列表 和 城市搜索列表
     */
    hideAllCityBox:function(){
      $(".citybox_search_container.citybox_search_state .citybox_content,.js_citybox_header_default").css("display","none");
      $(".citybox_search_container.citybox_search_state .citybox_search_suggest,.js_citybox_header_search").css("display","none");
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
      show1 = 0;
      show2 = 0;
      $("#preloader").show();
      Method["showCityBox"]();
      VM("citybox_history");
      if(globalType=="hft_ori"){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_OriCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hftHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_OriCityListData),Method["hftOriCityListDataCallback"]);
      }
      if(globalType=="hft_des"){
        var hft_HotCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100014'};
        var hft_DesCityListData = {'Parameters':{},'ForeEndType':3,'Code':'60100001'};
        vlm.loadJson("",JSON.stringify(hft_HotCityListData),Method["hftHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hft_DesCityListData),Method["hftDesCityListDataCallback"]);
      }
      if(globalType == "hf_ori"){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_OriCityListData = {"Parameters":{"CityType":"1","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hfHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_OriCityListData),Method["hfOriCityListDataCallback"]);
      }
      if(globalType == "hf_des"){
        var hf_HotCityListData = {"Parameters":{},"ForeEndType":3,"Code":"50100010"};
        var hf_DesCityListData = {"Parameters":{"CityType":"2","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
        vlm.loadJson("",JSON.stringify(hf_HotCityListData),Method["hfHotCityListDataCallback"]);
        vlm.loadJson("",JSON.stringify(hf_DesCityListData),Method["hfDesCityListDataCallback"]);
      }

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
     * 回调方法 机+酒+景 城市列表 热门城市
     * @param json
     */
    hftHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){

        dataHotCityAdapter(globalType,json);
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
    hftOriCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        config["CityListData"]= json.data.departCities;
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
    hftDesCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        config["CityListData"]= json.data.destCities;
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
    hfHotCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        dataHotCityAdapter(globalType,json);
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
    hfOriCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        config["CityListData"]= json.data.citys;
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
    hfDesCityListDataCallback:function(json){
      //console.log(json);
      if(json.success){
        config["CityListData"]= json.data.citys;
        VM("citybox_citylist");
        show2 = 1;
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
      dom.innerHTML = "";
      var citybox_content_title = document.createElement("div");
      citybox_content_title.setAttribute("class","citybox_content_title");
      citybox_content_title.setAttribute("id","js_location");
      citybox_content_title.innerHTML = "当前";
      dom.appendChild(citybox_content_title);

      var citybox_content_itemtitle_div = document.createElement("div");
      citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
      citybox_content_itemtitle_div.innerHTML = "北京";

      var citybox_content_item_li = document.createElement("li");
      citybox_content_item_li.setAttribute("class","citybox_content_item selected");
      citybox_content_item_li.setAttribute("data-code","200");
      citybox_content_item_li.setAttribute("data-name","北京");
      citybox_content_item_li.setAttribute("data-letter","bj");
      citybox_content_item_li.appendChild(citybox_content_itemtitle_div);

      var citybox_content_container_ul = document.createElement("ul");
      citybox_content_container_ul.setAttribute("class","citybox_content_container");
      citybox_content_container_ul.appendChild(citybox_content_item_li);
      dom.appendChild(citybox_content_container_ul);
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
        if(strValue == ""){
          return;
        }
        strValue = strValue.replace(/\s+/g,"");
        strValue = strValue.toLowerCase();


        var fragment = document.createDocumentFragment();
        for (var i =0;i<data.length;i++){

          var cityCode = data[i].cityCode.toLowerCase();
          var cityName = data[i].cityName.toLowerCase();
          var countryCode = data[i].countryCode.toLowerCase();
          var countryName = data[i].countryName.toLowerCase();
          var fullSpellingName = data[i].fullSpellingName.toLowerCase();
          var searchVal  = cityCode+cityName+countryCode+countryName+fullSpellingName;

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
            citybox_searchactive_li_p.setAttribute("data-letter",data[i].fullSpellingName);
            citybox_searchactive_li_p.innerHTML = data[i].cityName;
            citybox_searchactive_li_p.onclick = function(){
              var cityName = this.getAttribute("data-name");
              var cityCode = this.getAttribute("data-code");
              $(returnType).attr("data-code",cityCode);
              $(returnType).html(cityName);
              Method['hideAllCityBox']();
            }
            thin_border_li.appendChild(citybox_searchactive_li_p);

            fragment.appendChild(thin_border_li);
          }
          dom.appendChild(fragment);
        }


      });
    },
    /**
     * 城市历史记录
     * @param dom
     * @param data
     */
    cityboxHistory:function(dom,data){
      dom.innerHTML = "";
      var cityboxHistoryData = localStorage.getItem(""+globalType+"_history");
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
          citybox_content_item_li.setAttribute("data-name",cityboxHistoryData[i].toString().split(":")[1]);
          citybox_content_item_li.onclick = function(){
            var cityName = this.getAttribute("data-name");
            var cityCode = this.getAttribute("data-code");
            $(returnType).attr("data-code",cityCode);
            $(returnType).html(cityName);
            Method["setcityboxHistory"](this,cityCode,cityName);
            Method['hideAllCityBox']();
          }
          var citybox_content_itemtitle_div = document.createElement("div");
          citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
          citybox_content_itemtitle_div.innerHTML = cityboxHistoryData[i].toString().split(":")[1];
          citybox_content_item_li.appendChild(citybox_content_itemtitle_div);
          citybox_content_container_ul.appendChild(citybox_content_item_li);

        }
        dom.appendChild(citybox_content_container_ul);
      }


    },
    /**
     * 城市历史记录
     * @param dom
     * @param data
     */
    setcityboxHistory:function(dom,cityCode,cityName){
      var tmpdata = [];
      var newHistoryCityData = [cityCode+":"+cityName];
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
    remove: function(array, from, to) {
      var rest = array.slice((to || from) + 1 || array.length);
      array.length = from < 0 ? array.length + from : from;
      return array.push.apply(array, rest);
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
        var citybox_content_item_li = document.createElement("li");
        citybox_content_item_li.setAttribute("class","citybox_content_item");
        citybox_content_item_li.setAttribute("data-code",data[i].cityCode);
        citybox_content_item_li.setAttribute("data-name",data[i].cityName);
        citybox_content_item_li.setAttribute("data-letter",data[i].fullSpellingName);
        citybox_content_item_li.onclick = function(){
          var cityName = this.getAttribute("data-name");
          var cityCode = this.getAttribute("data-code");
          $(returnType).attr("data-code",cityCode);
          $(returnType).html(cityName);
          Method["setcityboxHistory"](this,cityCode,cityName);
          Method['hideAllCityBox']();
        }
        var citybox_content_itemtitle_div = document.createElement("div");
        citybox_content_itemtitle_div.setAttribute("class","citybox_content_itemtitle");
        citybox_content_itemtitle_div.innerHTML = data[i].cityName;
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
        citybox_content_lettername_li.setAttribute("data-letter",data[i].fullSpellingName);
        citybox_content_lettername_li.innerHTML = data[i].cityName;
        citybox_content_lettername_li.onclick = function(){
          var cityName = this.getAttribute("data-name");
          var cityCode = this.getAttribute("data-code");
          $(returnType).attr("data-code",cityCode);
          $(returnType).html(cityName);
          Method["setcityboxHistory"](this,cityCode,cityName);
          Method['hideAllCityBox']();
        }
        citybox_content_lettercitylist_ul.appendChild(citybox_content_lettername_li);
        fragment.appendChild(citybox_content_lettercitylist_ul);
        dom.appendChild(fragment);
        old_letter = new_letter;
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
      var citybox_summary_item_litop1 = document.createElement("li");
      citybox_summary_item_litop1.setAttribute("class","citybox_summary_item");
      citybox_summary_item_litop1.setAttribute("data-key","location");
      citybox_summary_item_litop1.innerHTML = "当前";
      citybox_summary_item_litop1.onclick = function(){
        var key = this.getAttribute("data-key");
        var a = $("#js_"+key);
        if (a.length != 0) {
          i = a.offset().top - 44;
        }
        $(window).scrollTop(i);
      }
      dom.appendChild(citybox_summary_item_litop1);

      var citybox_summary_item_litop2 = document.createElement("li");
      citybox_summary_item_litop2.setAttribute("class","citybox_summary_item");
      citybox_summary_item_litop2.setAttribute("data-key","history");
      citybox_summary_item_litop2.innerHTML = "历史";
      citybox_summary_item_litop2.onclick = function(){
        var key = this.getAttribute("data-key");
        var a = $("#js_"+key);
        if (a.length != 0) {
          i = a.offset().top - 44;
        }
        $(window).scrollTop(i);
      }
      dom.appendChild(citybox_summary_item_litop2);

      var citybox_summary_item_litop3 = document.createElement("li");
      citybox_summary_item_litop3.setAttribute("class","citybox_summary_item");
      citybox_summary_item_litop3.setAttribute("data-key","hotcity");
      citybox_summary_item_litop3.innerHTML = "热门";
      citybox_summary_item_litop3.onclick = function(){
        var key = this.getAttribute("data-key");
        var a = $("#js_"+key);
        if (a.length != 0) {
          i = a.offset().top - 44;
        }
        $(window).scrollTop(i);
      }
      dom.appendChild(citybox_summary_item_litop3);

      var fragment = document.createDocumentFragment();
      for (var i=0;i<data.length;i++){
        var citybox_summary_item_li = document.createElement("li");
        citybox_summary_item_li.setAttribute("class","citybox_summary_item");
        citybox_summary_item_li.setAttribute("data-key",data[i]);
        citybox_summary_item_li.innerHTML = data[i];
        citybox_summary_item_li.onclick = function(){
          var key = this.getAttribute("data-key");
          var a = $("#js_index_" + key);
          if (a.length != 0) {
            i = a.offset().top - 44;
          }
          $(window).scrollTop(i);
        }
        fragment.appendChild(citybox_summary_item_li);
      }
      dom.appendChild(fragment);

    }
  }

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

  webkit.VM = webkit.VM || {};
  webkit.VM.Load = VM;
  webkit.VM.Method = Method;
  webkit.VM.Config = config;
})();


