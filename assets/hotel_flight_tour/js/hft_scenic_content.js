/**
 * Created by 蘅芜君 on 2016/5/11.
 */
(function(){
    var webkit = this;
    var packageID=vlm.getpara("packageId");
    var tourId=vlm.getpara("tourId");
    var tpl1 = [
        '<span class="bar_img_theme">景点详情</span>',
        '<% if(images.length==0){ %>',
            '<img src="<%= pictureURL%>" alt="image"/>',
        '<% }else{ %>' +
        '<a href="<%= images[0].imageURL%>" class="swipebox" title="1/<%=(images.length)%>">',
        '<img src="<%= images[0].imageURL %>" alt="image" style="height:100%;"/ ></a> '+
        '<% for(var i=1;i<images.length;i++){ %>',
        '<a href="<%= images[i].imageURL%>" class="swipebox" title="<%= (i+1)%>/<%=(images.length)%>">',
        '<img src="<%= images[i].imageURL%>" alt="image"/></a>',
        '<% }%>',
        '<span class = "bar_img_num">编号：<%= packageRefNo %></span>',
        '<% if(images.length>0) %>',
        '<span class = "bar_img_page"><%=(images.length)%>张</span>',
        '<% } %>'
       ].join('');

    var  core = function(){

        var ContentList = function(){

            var cityCodeFrom=JSON.parse(localStorage.getItem("searchInfo")).FromCity;
            var Cparam=
            {
                "Parameters": {
                    "PackageID": packageID,
                    "cityCodeFrom":cityCodeFrom,
                    "tourId":tourId
                },
                "ForeEndType": 2,
                "Code": "60100003"
            };
            console.log(JSON.stringify(Cparam));
            vlm.loadJson("",JSON.stringify(Cparam),callback);
        };
        var callback = function(data){
            vlm.init();
            if(data.success){
                console.log(data);

                var htmlc = $("#Barcontent").html();
                var htmlC = ejs.render(htmlc,data.data);
                $("#barContent").html(htmlC);

                var htmls = $("#Sceniccontent").html();
                var htmlS = ejs.render(htmls,data.data);
                //图片点击事件
                var htmlb = $("#Barimg2").html();
                var htmlB = ejs.render(htmlb,data.data);
                $("#barImg").html(htmlB);
                $(".swipebox").click(function() {
                    $('.gallery').hide(0);
                    $('.portfolio-wide').hide(0);
                });
                $(".swipebox").swipebox({
                    useCSS : true,
                    hideBarsDelay : 0
                });
                //加载更多点击事件
                $("#scenicContent").html(htmlS);
                var Sheight1=$("#Sheight1")[0];
                var Sheight2=$("#Sheight2")[0];
                var Sheight3=$("#Sheight3")[0];

                Sheight1.onclick =function(){
                  if($("#Sheight1").hasClass("js_show")){
                    $("#Sheight1").removeClass("js_show");
                    $(".scenic_height1").css({'height':'4.8rem'});
                    $("#Sheight1").css({"background-position":  "-3.71rem -2.26rem"});
                  }else{
                    $("#Sheight1").addClass("js_show");
                    $(".scenic_height1").css({'height':'100%'});
                    $("#Sheight1").css({"background-position":  "-4.1rem -2.26rem"});
                  }

                };
                Sheight2.onclick =function(){
                  if($("#Sheight2").hasClass("js_show")){
                    $("#Sheight2").removeClass("js_show");
                    $(".scenic_height2").css({'height':'4.8rem'});
                    $("#Sheight2").css({"background-position":  "-3.71rem -2.26rem"});
                  }else{
                    $("#Sheight2").addClass("js_show");
                    $(".scenic_height2").css({'height':'100%'});
                    $("#Sheight2").css({"background-position":  "-4.1rem -2.26rem"});
                  }
                };
                Sheight3.onclick =function(){
                  if($("#Sheight3").hasClass("js_show")){
                    $("#Sheight3").removeClass("js_show");
                    $(".scenic_height3").css({'height':'4.8rem'});
                    $("#Sheight3").css({"background-position":  "-3.71rem -2.26rem"});
                  }else{
                    $("#Sheight3").addClass("js_show");
                    $(".scenic_height3").css({'height':'100%'});
                    $("#Sheight3").css({"background-position":  "-4.1rem -2.26rem"});
                  }
                };
            }else {
                alert(data.message,"提示");
            }
        };
        return {
            ContentList:ContentList
        }
    }();
    webkit.vlm = webkit.vlm || {};
    webkit.vlm.load = function(){
        core.ContentList();
    };

})();
vlm.load();
