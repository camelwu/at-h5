/**
 * Created by apple on 16/4/20.
 */
(function(){
    var globalData = {},originData = {},destinationData = {};
    var arrHistory = [],arr = [],originParams={},destinationParams={};
    $('html,body').animate({scrollTop:0});

    var val = vlm.parseUrlPara(window.location.href);

    var originORdestination = "";
    /**
     * 设置出发城市
     * @param
     * @constructor  设置出发城市
     */
    $(".origin").click(function(){
        originORdestination = ".origin";

        if(MT.XCache()){
            globalData = JSON.parse(localStorage.getItem("originCity"));
        }else{
            globalData = originData;
        }
//            console.log(globalData);
        MT.CreateCityList(globalData);
        $(".all-elementcity").show();
        $("#js_oversea").show();
        MT.getCityHistory();
    });
    /**
     * 设置到达城市
     * @param
     * @constructor 设置到达城市
     */
    $(".destination").click(function(){
        originORdestination = ".destination";
        if(MT.XCache()){
            globalData = JSON.parse(localStorage.getItem("destinationCity"));
        }else{
            globalData = originData;
        }
//            console.log(globalData);
        MT.CreateCityList(globalData);
        $(".all-elementcity").show();
        $("#js_oversea").show();
        MT.getCityHistory();
    });
    /**
     * 返回按钮
     * @param
     * @constructor 返回按钮
     */
    $(".js-backpage").click(function(){
        $(".all-elementcity").hide();
        $("#js_oversea").hide();
    });

    /**
     * 设置城市
     * @param 输出标签
     * @param 城市名称
     * @param 城市code
     * @constructor 设置城市
     */
    MT.setCity = function(out,cityname,citycode){
        $(out).html(cityname);
        $(out).attr("data-citycode",citycode);

        $(".all-elementcity").hide();
        $("#js_oversea").hide();
        $(".pop_box_dis").hide();
        $('body').attr("style","");
    }

    /**
     * 获得国外热门城市
     * @param
     * @constructor 获得国外热门城市
     */
//        MT.getExHotCity = function(){
//            var Param=
//            {
//                "Parameters": {
//                    "SubProduct": "All"
//                },
//                "ForeEndType": 3,
//
//            }
////            if(val.citycode == 0){
//                Param.Code= "0096";
////            }
//            if(val.citycode == 1){
//                Param.Code= "0209";
//            }
//
//
//            MT.ajaxJson("",JSON.stringify(Param),MT.CallbackExHotCity,MT.ajaxAnimIn,MT.ajaxAnimOut);
//        }

    /**
     * 获得国外热门城市的回调方法
     * @param data
     * @constructor
     */
//        MT.CallbackExHotCity = function(data){
//            var json=data;
//
//            if(json.success){
//                var data=json,tpl_GetExHotCity = template("tpl_GetHotCity",data);
//
//                $("#js_ExHotCity").html(tpl_GetExHotCity).find("li").click(MT.ClickTags);
//
//            }else {
//                console.log(json);
//                jAlert(json.message,"提示");
//            }
//
//        }

    /**
     * 获得城市列表
     * @param
     * @constructor 获得城市列表
     */
    MT.getCityList = function(){
        if(!MT.XCache()){
            originParams = {"Parameters":{"CityType":"1","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
            destinationParams = {"Parameters":{"CityType":"2","LastTime":"2016-04-15"},"ForeEndType":3,"Code":"50100008"};
            MT.ajaxJson("http://10.6.11.20:1111/api/GetServiceApiResult",JSON.stringify(originParams),MT.OriginCallbackCityList,MT.ajaxAnimIn,MT.ajaxAnimOut);
            MT.ajaxJson("http://10.6.11.20:1111/api/GetServiceApiResult",JSON.stringify(destinationParams),MT.DestinationCallbackCityList,MT.ajaxAnimIn,MT.ajaxAnimOut);
        }

    }

    /**
     * 城市列表排序
     * @param 城市A
     * @param 城市B
     * @constructor 城市列表排序
     */
    MT.ByCitylist = function(a,b){
//            console.log(a.fullSpellingName.substr(0,1).toUpperCase().charCodeAt(0));
        return a.fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toUpperCase().charCodeAt(0) - b.fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toUpperCase().charCodeAt(0);
    }


    /**
     * [public splitarray] 将数组中相同的元素提取出变为一个数组,最后由若干个小数组组成一个大数组
     * @param _oldArray
     * @returns {Array}
     * @constructor
     */
    MT.SplitCitiesArrayU2 = function(_oldArray){
        var oldArray = _oldArray,
            newArray = [],
            n = 0, tmp_old, tmp_new;

        for (var i = 0; i < oldArray.length -1; i++) {
            tmp_old = oldArray[i].fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toUpperCase().charCodeAt(0);
            tmp_new = oldArray[i + 1].fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toUpperCase().charCodeAt(0);
            if ( tmp_old!= tmp_new) {
                newArray.push(oldArray.slice(n, i + 1));
                n = i + 1;
            }
        }
        //console.log(newArr)
        return newArray;
    }
    /**
     * 生成城市列表
     * @param 城市列表数组
     * @constructor 生成城市列表
     */
    MT.CreateCityList = function(json){
        $("#js_oversea > *").remove();
        var Thead = $("<li><span class=\"gui-city-t\">当前</span><ul class=\"city-tags city-cur\"><li class=\"current\">我的位置</li></ul></li>"
            +"<li><span class=\"gui-city-t\">历史选择</span><ul class=\"city-tags\" id=\"historySea\"></ul></li>"
            +"<li><span class=\"gui-city-t\">热门城市</span><ul id=\"js_ExHotCity\" class=\"city-tags\"></ul></li>");
        $("#js_oversea").append(Thead);

        var list=json,tpl_str,newArray,tpl_ul;


        newArray = MT.SplitCitiesArrayU2(list);
        for (var i = 0;i<newArray.length;i++){

            var title =newArray[i][0].fullSpellingName.replace(/(^\s*)|(\s*$)/g,'').substr(0,1);
            tpl_str = $("<li id='"+title+"'></li>");
            $("<span  class='gui-city-t'></span>").html(title).appendTo(tpl_str);
            tpl_ul = $("<ul class='city-tags'></ul>");
            tpl_ul.appendTo(tpl_str);
            for (var j = 0;j<newArray[i].length;j++){
                var li_child= $("<li data-key='"+newArray[i][j].cityCode+"' data-value='"+newArray[i][j].fullSpellingName.replace(/(^\s*)|(\s*$)/g,'')+"'></li>").click(MT.ClickTags);
                li_child.html(newArray[i][j].cityName).appendTo(tpl_ul);
            }
            $("#js_oversea").append(tpl_str);
        }

        MT.CharColumn("CharColumn",newArray);
    }

    /**
     * 城市列表字母列表
     * @param ulId
     * @param newArray
     * @constructor
     */
    MT.CharColumn = function(ulId,newArray){
        $("#"+ulId+" > *").remove();
        var ul = $("#"+ulId),childli,childspan;
        $("<li data-key='cur' data-value='当前'>当前</li>").appendTo(ul);
        $("<li data-key='cur' data-value='当前'>历史</li>").appendTo(ul);
        $("<li data-key='hot' data-value='热门'>热门</li>").appendTo(ul);

        for (var i = 0;i<newArray.length;i++){
            var title = newArray[i][0].fullSpellingName.substr(0,1);
            childli = $("<li data-key='"+title+"' data-value='"+title+"'></li>")
            childspan = $("<span class='tags' data-value='"+title+"'><span> ").html(title);
            childspan.appendTo(childli);
            childli.appendTo(ul);
        }

        //字母点击事件
        $('#CharColumn>li').each(function(i){
            $('#CharColumn>li').eq(i).click(function(){
                var object_li = $('#js_oversea>li').eq(i).offset().top;
                $('html,body').animate({scrollTop:object_li-89},300)
            })
        })


    }
    /**
     * 设置缓存
     * @param
     * @constructor 设置缓存
     */
    MT.setXCache = function(json){
        var currentXCacheTime;
        currentXCacheTime = json.data.updateTime.replace(/T\d{2}:\d{2}:\d{2}/,"");
        currentXCacheTime = currentXCacheTime.replace(/-/g,"/");
        localStorage.setItem("XCacheTime",currentXCacheTime);
    }
    /**
     * 获得缓存
     * @param
     * @constructor 获得缓存
     */
    MT.getXCache = function(json){
        var currentXCacheTime,oldXCacheTime,atime,btime;
        oldXCacheTime = localStorage.getItem("XCacheTime");

        if (!oldXCacheTime){
            MT.setXCache(json);
        }else{
//                XCacheTime = json.data.updateTime.replace(/T\d{2}:\d{2}:\d{2}/,"");
//                XCacheTime = XCacheTime.replace(/-/g,"/");
//                XCacheTime = new Date(XCacheTime);
//                XCacheTime = new Date(XCacheTime.valueOf()+ 1*24*60*60*1000);
//                XCacheTime = XCacheTime.getFullYear()+"/"+(XCacheTime.getMonth()+1)+"/"+XCacheTime.getDate();
            atime = new Date();
            atime = atime.getFullYear()+"/"+(atime.getMonth()+1)+"/"+atime.getDate();
            atime = new Date(atime);
            btime = new Date(oldXCacheTime);
            console.log(atime +":"+btime);
            if(atime > btime){
                console.log("a > b");
                localStorage.XCache = "";
                return false;
            }else{
                localStorage.XCache = 1;
                console.log("b > a");
                return true;
            }

        }

    }
    /**
     * 获得城市列表的回调方法
     * @param data
     * @constructor
     */
    MT.OriginCallbackCityList = function(data){
        var json=data,isXCache = false;
        console.log(json);
        if(json.success){

            isXCache = MT.getXCache(json);
            if(!isXCache){
                MT.setXCache(json);
            }

            if(MT.XCache){
                var newArray = json.data.citys.sort(MT.ByCitylist);
                if(newArray){
                    localStorage.setItem("originCity",JSON.stringify(newArray));
                }
            }else{
                originData = json.data.citys.sort(MT.ByCitylist);
            }
        }else {
            console.log(json);
            jAlert(json.message,"提示");
        }

    }
    /**
     * 获得城市列表的回调方法
     * @param data
     * @constructor
     */
    MT.DestinationCallbackCityList = function(data){
        var json=data;
        console.log(json);
        if(json.success){

            isXCache = MT.getXCache(json);
            if(!isXCache){
                MT.setXCache(json);
            }

            if(MT.XCache()){
                var newArray = json.data.citys.sort(MT.ByCitylist);
                if(newArray){
                    localStorage.setItem("destinationCity",JSON.stringify(newArray));
                }
            }else{
                destinationData = json.data.citys.sort(MT.ByCitylist);
            }


        }else {
            console.log(json);
            jAlert(json.message,"提示");
        }

    }
    /**
     * 获得城市列表历史纪录
     * @param
     * @constructor 获得城市列表历史纪录
     */
    MT.getCityHistory = function(){
        var oldHistoryCityData = localStorage.getItem("ac_city");
        oldHistoryCityData = JSON.parse(oldHistoryCityData);

        if(oldHistoryCityData){
            $("#historySea li").remove();
            for (var i = oldHistoryCityData.length-1;i >= 0;i--){
                var li = $('<li>').attr('data-key',oldHistoryCityData[i].toString().split(":")[1]).html(oldHistoryCityData[i].toString().split(":")[0]).appendTo('#historySea');
            }

            $("#historySea li").click(function(){
                var citycode = $(this).attr("data-key");
                var cityname = $(this).html();
                MT.setHistoryCity(cityname,citycode);
                MT.getCityHistory();
                MT.setCity(originORdestination,cityname,citycode);
            });

        }

    }
    /**
     * 设置城市列表历史纪录
     * @param 城市名称
     * @param 城市code
     * @constructor 设置城市列表历史纪录
     */
    MT.setHistoryCity = function(cityname,citycode){
        var oldHistoryCityData = localStorage.getItem("ac_city");
        var newHistoryCityData = [cityname+":"+citycode];
        var tmpdata = [],tmpArray = [];

        if(!oldHistoryCityData){
            tmpdata.push(newHistoryCityData);
            localStorage.setItem("ac_city",JSON.stringify(tmpdata));
        }else{
            oldHistoryCityData = JSON.parse(oldHistoryCityData);
            for (var i = oldHistoryCityData.length-1;i >= 0;i--){
                if(oldHistoryCityData[i].toString().split(":")[1] === citycode){

                    tmpArray = oldHistoryCityData[oldHistoryCityData.length-1];
                    oldHistoryCityData[oldHistoryCityData.length-1] = oldHistoryCityData[i];
                    oldHistoryCityData[i] = tmpArray;
                    tmpdata = oldHistoryCityData;
                    localStorage.setItem("ac_city",JSON.stringify(tmpdata));
                    return;
                }

            }

            if(oldHistoryCityData.length > 2){
                oldHistoryCityData.shift();
            }
            oldHistoryCityData.push(newHistoryCityData);
            tmpdata = oldHistoryCityData;
            localStorage.setItem("ac_city",JSON.stringify(tmpdata));

        }


    }
    /**
     * 点击城市标签
     * @param 事件
     * @constructor 点击城市标签
     */
    MT.ClickTags = function(e){
        var citycode = $(this).attr("data-key");
        var cityname = $(this).html();


        MT.setHistoryCity(cityname,citycode);
        MT.getCityHistory();
        MT.setCity(originORdestination,cityname,citycode);


    }



//        <!--搜索弹出框-->
    $('#inputbox-btn').click(function(){
        $('.pop_box_dis,.pop_box .empty_history').show();
        $('#seach_up').focus();
        $('body').css('overflow-y','hidden');
        data = globalData;
    })
    $('.pop_box #js_back_btn,.pop_box a.cancelBtn').click(function(){
        $('.pop_box_dis,.pop_box .not_exist,span#close_empty').hide();
        $('#seach_up').val('');
        $('#pop_list').html('');
        $('body').attr("style","");
    })
    //键盘按下
    var isCun = false;
    $('#seach_up').keyup(function(){
        $('span#close_empty').show();
        if(isCun){
            $('.pop_box #pop_list:first').remove();
        }
        $('.pop_box .empty_history').hide();
        var value = $('#seach_up').val();
        value = value.toLowerCase();
        var strCity = '';

        for(var i=0;i<data.length;i++){
            if((data[i].fullSpellingName.toLowerCase()+data[i].cityName+pinyin.getCamelChars(data[i].cityName).toLowerCase()).indexOf(value)> -1){
                strCity+='<li><p data-key='+data[i].cityCode+' data-value='+data[i].fullSpellingName+data[i].cityName+pinyin.getCamelChars(data[i].cityName).toLowerCase()+'>'+data[i].cityName+'</p></li>'
            }
        }

        //数据展示
        $('<ul>',{
            id:'pop_list',
            html:strCity
        }).addClass('pop_list').appendTo('.pop_box');
        $('#pop_list').find("li>p").click(MT.ClickTags);
        //下拉列表为空
        if($('#pop_list').html() == ''){
            $('.pop_box .not_exist').show();
        }else{
            $('.pop_box .not_exist').hide();
        }
        //输入框为空
        if($('#seach_up').val() == ''){
            $('#pop_list').html('');
            $('span#close_empty').hide();
        }else{
            $('span#close_empty').show();
        }
        isCun = true;
    })
    //搜索控清空
    $('.pop_box #close_empty').click(function(){
        $('#seach_up').val('');
        $('#pop_list').html('');
        $('#seach_up').focus();
        $('.pop_box #pop_list').remove();
        $('.pop_box .not_exist,span#close_empty').hide();
    })
    //清空历史
    $('.pop_box a.empty_history').click(function(){
        $('.pop_box .empty_history').hide();
    })
//        <!--搜索弹出框-->

    //加载国外热门城市
//        MT.getExHotCity();
    //加载城市列表
    MT.getCityList();



})();