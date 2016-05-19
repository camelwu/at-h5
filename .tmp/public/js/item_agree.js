/*同意条款*/

(function(){
    var oAgree=document.getElementsByClassName('order-notice-btn')[0];
    var bOk=true;
    oAgree.onclick=function(){
        if(bOk){
            oAgree.style.background='url(images/ui/icons1.png) -23.7rem -0.4rem';
            oAgree.style.backgroundSize='40rem 12rem';
            bOk=false;
        }else{
            oAgree.style.background='url(images/ui/icons1.png) -26.6rem -0.4rem';
            oAgree.style.backgroundSize='40rem 12rem';
            bOk=true;
        }
    };
})();