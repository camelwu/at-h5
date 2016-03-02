/**
 * Created by apple on 16/2/29.
 */
(function(){
    var webkit = this;
    var core = function(){
        var _url ="http://10.2.22.239:8888/api/GetServiceApiResult";

        /**
         * [private scenic_city]tab初始化
         * @constructor
         */
        var MTtabInit = function(){
            MTtabScroll1();
        }
        /**
         * [private scenic_city]tab切换
         * @constructor
         */
        var MTtab = function(){
            $(".gui-tab-mod li").click(function(){
                //console.log($(".gui-tab-scrollbar").css("width"));

                $key = $(this).attr("data-key");
                switch ($key){
                    case "1":
                        MTtabScroll1();
                        break;
                    case "2":
                        MTtabScroll2();
                        break;
                }

            });
        }
        /**
         * [private scenic_city]tab1Totab2
         * @constructor
         */
        var MTtabScroll1 = function(){
            $("[data-key = 2]").removeClass("gui-tab-current cp");
            $("[data-key = 1]").addClass("gui-tab-current cp");
            $(".gui-tab-scrollbar").animate({left:0},"slow");
            $("#js_oversea").hide();
            $("#js_inland").show();

        }
        /**
         * [private scenic_city]tab2Totab1
         * @constructor
         */
        var MTtabScroll2 = function(){
            $("[data-key = 1]").removeClass("gui-tab-current cp");
            $("[data-key = 2]").addClass("gui-tab-current cp");
            $(".gui-tab-scrollbar").animate({left:$(".gui-tab-scrollbar").css("width")},"slow");
            $("#js_inland").hide();
            $("#js_oversea").show();
        }


        /**
         * [public ajax]动画模版
         * @constructor
         */
        var CTmplAnim = function(){
            var _childhtml = '<div id="preloader"><div id="status"><p class="center-text"><br><em>加载中……</em></p></div></div>';
            var _roothtml = $(_childhtml)[0];

            return _roothtml;
        }

        /**
         * [ajax]动画淡入
         * @constructor
         */
        var CAnimIn = function(){
            if($("[id=preloader]").length < 1){
                document.body.appendChild(CTmplAnim());
            }
            $("#preloader").ajaxStart(function(){
                $(this).show();
            });

        }

        /**
         * [ajax]动画淡出
         * @constructor
         */
        var CAnimOut = function(){

            $("#preloader").ajaxStop(function(){
                $(this).delay(400).fadeOut();
            });

        }

        /**
         * [ajax] 增强方法 CLoadJson ,加入了两个参数 animin (淡入动画),animout(淡出动画)
         * @param url
         * @param data
         * @param mycallback
         * @param animin ,type function [new]
         * @param animout ,type function [new]
         * @param async
         * @param encryption
         * @constructor
         */
        var CLoadJson = function(url, data, mycallback,animin,animout, async, encryption) {
            if (async != undefined && async == true) {
                $.ajaxSetup({
                    async : false
                });
            }

            _url = url || _url;

            $.ajax({
                type : "post",
                url : _url + '?rnd=' + Math.random(),
                data : data,
                contentType : 'application/json;charset=utf-8',
                beforeSend : function(xhr) {
                    if(animin!=undefined && animin != ""){
                        animin();
                    }
                    //后续开始加密，设置header
                    //xhr.setRequestHeader('Content-Type','application/json');
                    if (encryption != undefined && encryption == true) {
                        var uid = md5("zhangfengming");
                        var password = md5("");
                        xhr.setRequestHeader('uid', user);
                    }
                },
                success : function(jsondata) {

                    mycallback(jsondata);


                }
            });
            if(animout!=undefined && animout != ""){
                animout();//动画淡出
            }
            $.ajaxSetup({
                async : true
            });
        }

        return {
            MTtabInit:MTtabInit,//[private scenic_city]
            MTtab:MTtab,//[private scenic_city]
            CLoadJson:CLoadJson,//[public ajax]
            CAnimIn:CAnimIn,//[public ajax]
            CAnimOut:CAnimOut//[public ajax]
        }
    }();
    webkit.MT = webkit.MT || {};
    webkit.MT.tabScroll = function(){
        core.MTtabInit();
        core.MTtab();
    }
    webkit.MT.ajaxAnimIn = function(){
        core.CAnimIn();
    }
    webkit.MT.ajaxAnimOut = function(){
        core.CAnimOut();
    }
    webkit.MT.ajaxJson = function(url, data, mycallback,animin,animout, async, encryption){
        core.CLoadJson(url, data, mycallback,animin,animout, async, encryption);
    }

})();