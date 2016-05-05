
var infoObj = parseUrlPara(document.location.href,true);
var latitude = Number(infoObj["Latitude"]), longitude = Number(infoObj["Longitude"]) ,label = infoObj["HotelName"];

at.map.createMap(latitude, longitude);
at.map.markHotel(latitude, longitude, label);
CreateHeader();
function parseUrlPara(url,isEncode){
    var isEncode=isEncode||false;
    var reg=/([^=&?]+)=([^=&?]+)/g,obj={};
    url.replace(reg,function(){
        var arg=arguments;
        obj[arg[1]]=isEncode?decodeURIComponent(arg[2]):arg[2];
    });
    return obj;
}

function CreateHeader(){
    var top=document.createElement('div');
    var str='<a href="javascript:window.history.go(-1);" class="header-back"><i class="go-back"></i></a><div class="header-title">酒店</div>';
    top.className = "header";
    top.innerHTML =str;
    document.body.appendChild(top);
}
