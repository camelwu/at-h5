/**
 * Created by apple on 16/2/29.
 */
(function(){
    var webkit = this;
    var core = function(){

        var MTtabInit = function(){
            MTtabScroll1();
        }
        var MTtab = function(){
            $(".gui-tab-mod li").click(function(){
                console.log($(".gui-tab-scrollbar").css("width"));

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

        var MTtabScroll1 = function(){
            $("[data-key = 2]").removeClass("gui-tab-current cp");
            $("[data-key = 1]").addClass("gui-tab-current cp");
            $(".gui-tab-scrollbar").animate({left:0},"slow");
            $("#js_oversea").hide();
            $("#js_inland").show();

        }

        var MTtabScroll2 = function(){
            $("[data-key = 1]").removeClass("gui-tab-current cp");
            $("[data-key = 2]").addClass("gui-tab-current cp");
            $(".gui-tab-scrollbar").animate({left:$(".gui-tab-scrollbar").css("width")},"slow");
            $("#js_inland").hide();
            $("#js_oversea").show();
        }



        return {
            MTtabInit:MTtabInit,
            MTtab:MTtab
        }
    }();
    webkit.MT = webkit.MT || {};
    webkit.MT.tabScroll = function(){
        core.MTtabInit();
        core.MTtab();
    }
    MT.tabScroll();
})();