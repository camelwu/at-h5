/**
 * Created by 蘅芜君 on 2016/5/11.
 */
(function(){
    var webkit = this;
    var tpl1 = [
        '<span class="bar_img_theme">景点详情</span>',
        '<% if(images.length==0){ %>',
        '<img src="<%= pictureURL%>" alt="image"/>',
        '<% }else{ %>' +
        '<a href="<%= images[0].imageURL%>" class="swipebox" title="1/<%=(images.length)%>">',
        '<img src="<%= images[0].imageURL %>" alt="image"/ ></a> '+
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
            var packageID=vlm.getpara("packageID");
            var cityCodeFrom=vlm.getpara("cityCodeFrom");
            var Cparam=
            {
                "Parameters": {
                    "PackageID": packageID,
                    "cityCodeFrom": cityCodeFrom
                },
                "ForeEndType": 2,
                "Code": "60100003"
            };
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
                var htmlB = ejs.render(tpl1,data.data);
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
                    $(".scenic_height1").css({'height':'100%'});
                    $("#Sheight1").css({'display':'none'});
                };
                Sheight2.onclick =function(){
                    $(".scenic_height2").css({'height':'100%'});
                    $("#Sheight2").css({'display':'none'});
                };
                Sheight3.onclick =function(){
                    $(".scenic_height3").css({'height':'100%'});
                    $("#Sheight3").css({'display':'none'});
                };
            }else {
                jAlert(json.message,"提示");
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
