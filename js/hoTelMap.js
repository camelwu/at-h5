window.onload=function init() {

    var point;


    var icon = new BMap.Icon("images/loc.png",new BMap.Size(28,38),{
        anchor:new BMap.Size(14,38)
    });

    var infoObj = parseUrlPara(document.location.href,true);

    var mp = new BMap.Map("map");

    var marker = new BMap.Marker(getPoint(116.40499, 39.91599),{
        icon:icon
    });

    var myLabel = new SquareOverlay(getPoint(116.40499, 39.91599),257,64);  //infoObj.Longitude, infoObj.Latitude

    CreateHeader(infoObj);

    function parseUrlPara(url,isEncode){
        var isEncode=isEncode||false;
        var reg=/([^=&?]+)=([^=&?]+)/g,obj={};
        url.replace(reg,function(){
            var arg=arguments;
            obj[arg[1]]=isEncode?decodeURIComponent(arg[2]):arg[2];
        });
        return obj;
    }

    function hotelName (arg){

        return arg.indexOf('(') != -1 ? '<p class="d-p1">' + arg.slice(0, arg.indexOf(' (')) + '<br/>' + arg.slice(arg.indexOf(' (') + 1)+'</p>' : '<p class="d-p1" style="line-height: 44px">' + arg + '</p>';
    }

    function CreateHeader(){
        var top=document.getElementById('vlm-login');
        var str='<a href="javascript:window.history.go(-1);" class="d-icons"></a>'+hotelName(infoObj.HotelName);
        top.innerHTML =str;
    }

    function getPoint(x, y) {
        point = new BMap.Point(x, y);
        return point;
    }

    mp.centerAndZoom(getPoint(116.40499, 39.91599), 16);

    mp.addOverlay(marker);

    function SquareOverlay(center,length,height){
        this._center = center;
        this._length = length;
        this._height = height;
    }

    SquareOverlay.prototype = new BMap.Overlay();

    SquareOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = document.createElement("div");
        div.className = "m-div";
        var label = document.createElement("div");
        label.className = "label";
        label.innerHTML = "1-12-2 Dougenzaka shibuya-ku";
        div.appendChild(label);
        var triangle = document.createElement("div");
        triangle.className = "triangle";
        div.appendChild(triangle);
        map.getPanes().markerPane.appendChild(div);
        this._div = div;
        return div;
    };

    SquareOverlay.prototype.draw = function(){
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length / 2 + "px";
        this._div.style.top = position.y - this._height / 2 + "px";
    };

    mp.addOverlay(myLabel);
}
