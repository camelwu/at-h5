/**
 * Created by 蘅芜君 on 2016/5/11.
 */
(function(){
    var webkit = this;
    //var tpl1 = [
    //        '<% for( var i=0;i< images.length;i++){ %>',
    //       '<img src="<%= images[i].thumbnailPhotoURL%>"alt="景点详情"/>',
    //       '<span class = "bar_img_num">编号：<%= packageRefNo %></span>',
    //       '<span class = "bar_img_page">1/20</span>',
    //       '<% }%>'
    //   ].join('');
    //var html_pb = template(tpl1, data);
    //$("#packageBox").html(html_pb);
    //
    //$('.swipebox').click(function() {
    //    $('.gallery').hide(0);
    //    $('.portfolio-wide').hide(0);
    //});
    //$(".swipebox").swipebox({
    //    useCSS : true,
    //    hideBarsDelay : 0
    //});
    var  core = function(){
        var ContentList = function(){
            var packageID=vlm.getpara("packageID");
            var cityCodeFrom=vlm.getpara("cityCodeFrom");
            var param=
            {
                "Parameters": {
                    "PackageID": packageID,
                    "cityCodeFrom": cityCodeFrom
                },
                "ForeEndType": 2,
                "Code": "60100003"
            };
            vlm.loadJson("",JSON.stringify(param),function(data){
                console.log(JSON.stringify(param));
                if(data.success){
                    console.log(data);
                    var htmlb = $("#Barimg").html();
                    var htmlB = ejs.render(htmlb,data.data);
                    $("#barImg").html(htmlB);
                    var htmlc = $("#Barcontent").html();
                    var htmlC = ejs.render(htmlc,data.data);
                    $("#barContent").html(htmlC);
                    var htmls = $("#Sceniccontent").html();
                    var htmlS = ejs.render(htmls,data.data);
                    $("#scenicContent").html(htmlS);
                }else {
                    jAlert(json.message,"提示");
                }
            });
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
