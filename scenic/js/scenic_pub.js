/**
 * Created by apple on 16/2/29.
 */
(function(){
    var webkit = this;
    var core = function(){
        var _url ="http://123.56.190.34:8888/api/GetServiceApiResult";
        //var _url ="http://10.2.22.239:8888/api/GetServiceApiResult";
        var callback="";
        var citycode=[
            {   //scenic
                city:{
                    inland:{hotcity:0,citylist:0},
                    oversea:{hotcity:"0096",citylist:"0086"}
                }
            },
            {   //tour
                city:{
                    inland:{hotcity:0,citylist:0},
                    oversea:{hotcity:"0096",citylist:"0086"}
                }
            }

        ];
        /**
         * [private getcity]返回城市对象
         * @param code
         * @param callback
         * @returns {{CallbackCity: ({city}|*), CallbackUrl: *}}
         */
        var getCity = function(code,callback){

            return {CallbackCity:citycode[code],CallbackUrl:callback}
        }
        /**
         * [public hash]返回hashcode编码
         * @param key
         * @returns {number}
         */
        var d2jhash = function(key){
            var hash = 5381;
            for (var i = 0;i<key.length;i++){
                hash = hash * 33 +key.charCodeAt(i);
            }
            return hash % 1013;
        }
        /**
         * [public date]获取年月日
         * @param arg "2016-01-01T00:00:00"
         * @param mark 例如 "-" 2016-01-01 ,"/" 2016/01/01
         * @returns {string}
         */
        var getYMD = function(arg,mark){
            var defaultTime =arg
                .replace(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})T(\d{1,2})[:](\d{1,2})[:](\d{1,2})/g, function(){
                    if(mark!=undefined && mark!=""){
                        mark = mark;
                    }else{
                        mark = "-";
                    }
                    var args = [];
                    args = [].slice.call(arguments);
                    args = args.slice(1,4);
                    //console.log(args);
                    return args[0]+mark+args[1]+mark+args[2];
                });
            return defaultTime;
        }
        /**
         * [public week]获取当前日期星期几
         * @param arg1 2016-01-01
         * @returns {string}
         */
        var getWeek = function(arg1){
            if(arg1){
                var week,array,index = new Date(arg1.replace(/-/g, "/")).getDay();
                switch (index){
                    case 0 :
                        week = '周日';
                        break;
                    case 1 :
                        week = '周一';
                        break;
                    case 2 :
                        week = '周二';
                        break;
                    case 3 :
                        week = '周三';
                        break;
                    case 4 :
                        week = '周四';
                        break;
                    case 5 :
                        week = '周五';
                        break;
                    case 6 :
                        week = '周六';
                        break;
                    default :
                        void(0);
                }
                return week;
            }
        };
        /**
         * 存储历史记录
         */
        var Queue = function(){
            var items = [];
            //向队列尾部添加一个或多个新的对象
            this.enqueue = function (element) {
                items.push(element);
            }
            //移除队列第一个
            this.dequeue =function(){
                return items.shift();
            }
            //返回队列中第一个元素
            this.front = function(){
                return items[0];
            }
            //队列中是否位空,空则返回true,否则返回false
            this.isEmpty = function(){
                return items.length == 0;
            }
            //清空队列
            this.clear = function(){
                items=[];
            }
            //返回队列返回个数
            this.size = function(){
                return items.length;
            }
            //显示队列
            this.showrender = function(){
                console.log(items.toString());
            }
        }


        /**
         * [public GetQueryString] 获取URL中的参数
         * @param name
         * @returns {*}
         * @constructor
         */
        var GetQueryString = function(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  decodeURI(r[2]); return null;
        }
        /**
         * 待定
         * @param url
         * @returns {Array}
         * @constructor
         */
        var GetRequestUrl = function(url) {
            var url = url||location.search; //获取url中"?"符后的字串
            var ename;
            var Request = [];
            if(url.indexOf("?")!=-1)
            {
                var str = url.substr(url.indexOf("?")+1,url.len);

                strs= str.split("&");
                //console.log(strs);
                for(var i=0;i < strs.length;i++)
                {
                    Request[i] = strs[i];
                }

            }
            return Request;
        }

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
            $("#js_oversea").show();
            $("#js_inland").hide();

        }
        /**
         * [private scenic_city]tab2Totab1
         * @constructor
         */
        var MTtabScroll2 = function(){
            $("[data-key = 1]").removeClass("gui-tab-current cp");
            $("[data-key = 2]").addClass("gui-tab-current cp");
            $(".gui-tab-scrollbar").animate({left:$(".gui-tab-scrollbar").css("width")},"slow");
            $("#js_oversea").hide();
            $("#js_inland").show();
        }

        /**
         * [public sort]城市排序 按照cityCode快速排序
         * @param a
         * @param b
         * @returns {number}
         * @constructor
         */
        var ByCities = function(a, b){
            return a.cityNamePY.substr(0,1).toUpperCase().charCodeAt(0) - b.cityNamePY.substr(0,1).toUpperCase().charCodeAt(0);
        }


        /**
         * [public splitarray] 将数组中相同的元素提取出变为一个数组,最后由若干个小数组组成一个大数组
         * @param _oldArray
         * @returns {Array}
         * @constructor
         */
        var SplitCitiesArray = function(_oldArray){
            var oldArray = _oldArray,
            newArray = [],
            n = 0, tmp_old, tmp_new;

            for (var i = 0; i < oldArray.length -1; i++) {
                tmp_old = oldArray[i].cityNamePY.substr(0,1).toUpperCase().charCodeAt(0);
                tmp_new = oldArray[i + 1].cityNamePY.substr(0,1).toUpperCase().charCodeAt(0);
                if ( tmp_old!= tmp_new) {
                    newArray.push(oldArray.slice(n, i + 1));
                    n = i + 1;
                }
            }
            //console.log(newArr)
            return newArray;
        }



        /**
         * [public ajax]动画模版
         * @constructor
         */
        var CTmplAnim = function(){
            var _roothtml = $("<div id=\"preloader\"><div id=\"status-t\"><p class=\"center-text\"><br><em>加载中……</em></p></div></div>");
            return _roothtml;
        }

        var AnimIn = function(){
            if($("[id=preloader]").length < 1) {
                $("body").after(CTmplAnim());
            }
            $("[id=preloader]").show();
        }

        var AnimOut = function(){
            $("[id=preloader]").fadeOut();
        }
        /**
         * [ajax]动画淡入
         * @constructor
         */
        var CAnimIn = function(){
            if($("[id=preloader]").length < 1){
                $("body").after(CTmplAnim());
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
            if(animin!=undefined && animin != ""){
                animin();
            }

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
            AnimIn:AnimIn,
            AnimOut:AnimOut,
            CAnimIn:CAnimIn,//[public ajax]
            CAnimOut:CAnimOut,//[public ajax]
            SplitCitiesArray:SplitCitiesArray,//[public split array]
            ByCities:ByCities, //[public by cityCode]
            getCity:getCity, //[private getcity]
            GetQueryString:GetQueryString,//[public GetURL QueryString ]
            GetRequestUrl:GetRequestUrl,
            Queue:Queue, //[public Queue]
            getYMD:getYMD,//[public getYMD]
            getWeek:getWeek //[public QugetWeekeue]
        }
    }();
    webkit.MT = webkit.MT || {};
    webkit.MT.tabScroll = function(){
        core.MTtabInit();
        core.MTtab();
    }
    webkit.MT.AnimIn = function(){
        core.AnimIn();
    }
    webkit.MT.AnimOut = function(){
        core.AnimOut();
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
    webkit.MT.ByCities = function(a,b){
        return core.ByCities(a,b);
    }
    webkit.MT.getCity = function(a,b){
        return core.getCity(a,b);
    }
    webkit.MT.GetQueryString = function(a){
        return core.GetQueryString(a);
    }
    webkit.MT.GetRequestUrl = function(url){
        return core.GetRequestUrl(url);
    }
    webkit.MT.SplitCitiesArray = function(_oldArray){
       return core.SplitCitiesArray(_oldArray);
    }
    webkit.MT.getYMD = function(arg,mark){
        return core.getYMD(arg,mark);
    }
    webkit.MT.getWeek = function(arg){
        return core.getWeek(arg);
    }
})();
