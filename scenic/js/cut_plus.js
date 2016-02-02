
/*Æ±Êý¼Ó¼õ*/
(function(){
    function toUp(m,n){
        var oNum=document.getElementsByClassName(m)[0];
        var oBtn=document.getElementsByClassName(n)[0];
        oBtn.onclick=function(){
            var str=oNum.innerHTML;
            str=Number(str);
            str=str+1;
            oNum.innerHTML=str;
        };
    }
    function toDown(m,n){
        var oNum=document.getElementsByClassName(m)[0];
        var oBtn=document.getElementsByClassName(n)[0];

        oBtn.onclick=function(){
            var str=oNum.innerHTML;
            str=Number(str);
            if(str<=0){
                oNum.innerHTML=0;
            }else{
                str=str-1;
                oNum.innerHTML=str;
            }
        };
    }
    toUp('cut-up-cont','plus-btn');
    toDown('cut-up-cont','cut-down-btn');
})();