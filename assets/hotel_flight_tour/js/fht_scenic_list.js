/**
 * Created by ޿�߾� on 2016/5/5.
 */
(function(){
    var webkit = this;
    var core = function() {
        var url = "";
        var themeId = "";
//获取附近城市列表
//获取景点列表

        var ScenicList = function(){
          var destCityCode=JSON.parse(localStorage.getItem("searchInfo")).FromCity;
          var departCityCode=JSON.parse(localStorage.getItem("searchInfo")).ToCity;
            var localStoragedata = JSON.parse(localStorage.getItem("searchInfo"));
          var SParameter = {
            "Parameters": {
              "departCityCode": destCityCode,
              "destCityCode":departCityCode
            },
            "ForeEndType": 3,
            "Code":"60100002"
          };
            console.log(JSON.stringify(SParameter));
            vlm.loadJson(url,JSON.stringify(SParameter),function(data){
              vlm.init();
                if(data.success){
                    console.log(data);
                    var htmlt = $("#timeDetile").html();
                    var htmlT = ejs.render(htmlt,localStoragedata);
                    $("#TimeList").html(htmlT);
                    var htmlp = $("#scenicDetile").html();
                    var html = ejs.render(htmlp,data.data);
                    $("#scenicList").html(html);
                    var htmlc = $("#CityDetile").html();
                    var htmlC = ejs.render(htmlc,data.data);
                    $("#CityList").html(htmlC);
                    var htmls = $("#SortDetile").html();
                    var htmlS = ejs.render(htmls,data.data);
                    $("#SortList").html(htmlS);
                    var htmlf = $("#FilterDetile").html();
                    var htmlF = ejs.render(htmlf,data.data);
                    $("#FilterList").html(htmlF);
                    //快速排序点击事件
                    (function(){
                        var li  = $("ul#SortList li");
                        var b = $("ul#SortList li i");
                        li[0].className = 'checked_theme1';
                        b[0].className = 'Schecked';
                        for(var i = 0;i < li.length;i++){
                            (function(index) {
                                li[i].onclick = function () {
                                    for (var j = 0; j < li.length; j++) {
                                        li[j].className = '';
                                        b[j].className = '';
                                    }
                                    li[index].className = 'checked_theme1';
                                    b[index].className = 'Schecked';
                                    $("#shadeDiv1").css({'display': 'none'});
                                    $("#SortList").css({'bottom': -2222 + 'rem'});
                                    var sortValue=$(this).attr("data-sort");
                                    priceSort(sortValue);
                                };
                            })(i);
                            //点击遮罩层，关闭
                            $(document).click(function(e){
                                if(e.target.className == 'shade_div')
                                {   var SortList = $("#SortList");
                                    $("#shadeDiv1").css({'display':'none'});
                                    SortList.css({'bottom':-2222+'rem'});
                                    SortList.style.transition="all 400ms";
                                }
                            });

                        }
                    })();
                    //筛选点击事件
                    (function(){
                        var li  = $("ul#filterDiv li");
                        var b = $("ul#filterDiv li i");
                        li[0].className = 'checked_theme2';
                        b[0].className = 'Fchecked';
                        var footerRight = $("#footerRight")[0];
                        var shadeDiv2 = $("#shadeDiv2")[0];
                        var filter = $("#Filter")[0];
                        var cancel = $("#filter_button_l")[0];
                        var clear = $("#filter_button_c")[0];
                        var submit = $("#filter_button_r")[0];
                        footerRight.onclick = function(e){
                            shadeDiv2.style.display="block";
                            $("#Filter").css({'bottom':0.9+'rem'});
                            filter.style.transition="all 400ms";
                            if ( e && e.stopPropagation ) {
                                e.stopPropagation();
                            }else{
                                window.event.cancelBubble = true;
                                return false;
                            }
                         };
                        clear.onclick = function(){
                            var li  = $("ul#filterDiv li");
                            var b = $("ul#filterDiv li i");
                            li[0].className = 'checked_theme2';
                            b[0].className = 'Fchecked';
                            for(var i = 1;i < li.length;i++){
                                li[i].className = '';
                                b[i].className = '';
                            }
                        };
                        submit.onclick = function(){
                            $("#shadeDiv2").css({'display':'none'});
                            $("#Filter").css({'bottom':-200+'rem'});
                            filter.style.transition="all 400ms";

                            var themeId=$(".Fchecked").parent().attr("data-id");
                            console.log(themeId);
                            filterTheme(themeId);
                        };
                        //关闭筛选
                        cancel.onclick = function(){
                            $("#shadeDiv2").css({'display':'none'});
                            $("#Filter").css({'bottom':-200+'rem'});
                            filter.style.transition="all 400ms";
                        };
                        //点击遮罩层，关闭
                        $(document).click(function(e){
                            if(e.target.className == 'shade_div')
                            {closeBlock();}
                        });
                        //筛选选择
                        var li  = $("ul#filterDiv li");
                        var b = $("ul#filterDiv li i");
                        for(var i = 0;i < li.length;i++){
                            (function(index){
                                li[i].onclick = function(){
                                    if(index==0){
                                        for(var i = 0;i < li.length;i++){
                                            li[i].className = '';
                                            b[i].className = '';
                                        }
                                        li[index].className = 'checked_theme2';
                                        b[index].className = 'Fchecked';
                                        $("#shadeDiv1").css({'display':'none'});
                                        $("#FilterList").css({'bottom':-2222+'rem'});
                                        var themeId =$(this).attr("data-id");
                                    }else{
                                        li[0].className = '';
                                        b[0].className = ''
                                        li[index].className = 'checked_theme2';
                                        b[index].className = 'Fchecked';
                                        $("#shadeDiv1").css({'display':'none'});
                                        $("#FilterList").css({'bottom':-2222+'rem'});
                                    }
                                };
                            })(i);
                        }
                    })();
                    //城市列表父宽
                    //(function(){
                    //    var sum=0;
                    //    for(var i=0;i<data.recommendCities.length;i++){
                    //    sum+=i;}
                    //    $(".city_list ul").css({'width':sum+'%'});
                    //})();
                  var packageid=$(".scenic-detile_list").attr("data-packageid");
                  var scenicItem = {
                    packageid:packageid
                  };
                  localStorage.setItem('scenicItem', JSON.stringify(scenicItem));
                  $(".scenic-detile_list").on("click",function(){
                      window.location.href = 'hft_choose.html?type=2';
                  })
                }
          else {
                    alert(data.message,"提示");
                }
            });
        };
//价格排序调数据
        var priceSort = function(sortType){
                var destCityCode=vlm.getpara("destCityCode");
                var departCityCode=vlm.getpara("departCityCode");
                //var sortType=vlm.getpara("sortType");
                var PParamenter=
                {
                    "Parameters": {
                        "destCityCode":destCityCode,
                        "departCityCode":departCityCode,
                        "sortType" :sortType
                    },
                    "ForeEndType": 3,
                    "Code":"60100002"
                };
                vlm.loadJson("",JSON.stringify(PParamenter),function(data){
                    if(data.success){
                        var htmlp = $("#scenicDetile").html();
                        var html = ejs.render(htmlp,data.data);
                        $("#scenicList").html(html);
                        if(themeId != ""){
                            PParamenter.Parameters.ThemeID=themeId;
                        }
                    }else{
                        console.log(data);
                        jAlert(data.message,"提示");
                    }
                });
            };
//根据主题筛选调数据
        var filterTheme = function(themeId){
                var destCityCode=vlm.getpara("departCityCode");
                var Tparameter=
                {
                    "Parameters": {
                        "destCityCode": destCityCode,
                        "themeID":themeId
                    },
                    "foreEndType": 3,
                    "code":"60100002"
                };
                console.log(JSON.stringify(Tparameter));
                vlm.loadJson("",JSON.stringify(Tparameter),function(data){
                    if(data.success){
                        var htmlp = $("#scenicDetile").html();
                        var html = ejs.render(htmlp,data.data);
                        $("#scenicList").html(html);
                        if(themes.length == 0){
                            jAlert("抱歉暂时没有数据","提示");
                        }
                    }else {
                    }
                });
            };
        return {
            ScenicList:ScenicList
        }
    }();
    webkit.vlm = webkit.vlm || {};
    webkit.vlm.load = function(){
        core.ScenicList();
    };
})();
vlm.load();
//城市返回记录已访问过
$('#g_back').click(function(){
    var isInit=window.location.search;
    window.location.href='index.html'+isInit;
});