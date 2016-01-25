/*¼ÛÄ¿ÏêÇé´°*/
(function(){
    var detaBtn=document.getElementsByClassName('order-total-tip')[0];
    var oHid=document.getElementsByClassName('price-tot-box')[0];
    var oMask=document.getElementsByClassName('mask')[0];
    var bOk=true;
    detaBtn.onclick=function(){
        if(bOk){
            oMask.style.display='block';
            oHid.style.bottom='50px';
            bOk=false;
        }else{
            oMask.style.display='none';
            oHid.style.bottom='-300px';
            bOk=true;
        }
    };
})();