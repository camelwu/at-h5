
/*ѡ�*/
(function(){

    tab('tab');

    function tab(sName){

        var aParent=document.getElementsByClassName(sName);

        for(var i=0;i<aParent.length; i++)
        {
            _tab(aParent[i]);
        }

    }

    function _tab(oParent){

        var aBtn=oParent.getElementsByClassName('btn');
        var aCont=oParent.getElementsByClassName('cont');
        for(var i=0; i<aBtn.length; i++)
        {
            aBtn[i].index=i;
            aBtn[i].onclick=function(){

                for(var i=0; i<aBtn.length; i++)
                {
                    aBtn[i].className='btn';
                    aCont[i].className='cont';
                }
                this.className='active btn';
                aCont[this.index].className='active cont';
            };
        }
    }

})();


