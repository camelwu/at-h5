"use strict";
function jsonp(json){
    json=json||{};
    if(!json.url)return;
    json.cbName=json.cbName||'cb';
    json.data=json.data||{};
    json.data[json.cbName]=show+Math.random();
    json.data[json.cbName]=json.data[json.cbName].replace('.','');
    var arr=[];
    for(var i in json.data){
        arr.push(i+'='+encodeURIComponent(json.data[i]));
    }
    window[json.data[json.cbName]]=function(result){
        json.success&&json.success(result);
        oH.removeChild(oS);
        window[json.data[json.cbName]]=null;
    };
    var star=arr.join('&');
    var oS=document.createElement('script');
    oS.src=json.url+'?'+str;
    var oH=document.getElementsByTagName('head')[0];
    oH.appendChild(oS);
}