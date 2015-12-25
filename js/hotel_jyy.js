
function h_l_s(){
    var rli = [],
        sli1 = [],
        sli2 = [],
        lb = [];
    var mb;
    function _(s){
        return document.getElementById(s);
    }
    var rank=_("rank");
    var screen=_("screen");
    var location=_("location");
    var fo_ra = _("fo_ra");
    var fo_sc = _("fo_sc");
    var fo_lo =_("fo_lo");
    var s_but = _("s_but");
    var l_but = _("l_but");
    function show(obj){
        mb=document.getElementById("r-mb");
        mb.style.display="block";
        obj.style.bottom="0";
        obj.style.transition="all 350ms";
    }
    function close(obj){
        mb=document.getElementById("r-mb");
        mb.style.display="none";
        obj.style.bottom=-350+'px';
        obj.style.transition="all 350ms";
    }
    function mb_close(){
        mb=document.getElementById("r-mb");
        mb.style.display="none";
        if(rank.style.display==""||rank.style.display=="block"){
            rank.style.bottom=-350+'px';
            rank.style.transition="all 350ms";
        }if(screen.style.display==""||screen.style.display=="block"){
            screen.style.bottom=-350+'px';
            screen.style.transition="all 350ms";
        }if(location.style.display==""||location.style.display=="block"){
            location.style.bottom=-350+'px';
            location.style.transition="all 350ms";
        }
    }
    /*   酒店筛选  */
    function selectType(){
        var obj = window.event.srcElement;
        var oName = obj.className;
        var array = [];
        if(obj.innerHTML == "不限"){
            array = document.getElementById("h-type").childNodes;
            for(var i=1;i<array.length;i++){
                array[i].className = "s-li";
            }
        }if(obj.innerHTML != "不限"){
            document.getElementById("h-type").firstElementChild.className = "s-li";
        }
        if(oName == "s-li"){
            obj.className = "s-li1";
        }else{
            obj.className = "s-li";
        }
    }
    function selectLevel(){
        var obj = window.event.srcElement;
        var oName = obj.className;
        var array = [];
        if(obj.innerHTML == "不限"){
            array = document.getElementById("h-level").childNodes;
            for(var i=1;i<array.length;i++){
                array[i].className = "s-li";
            }
        }if(obj.innerHTML != "不限"){
            document.getElementById("h-level").firstElementChild.className = "s-li";
        }
        if(oName == "s-li"){
            obj.className = "s-li1";
        }else{
            obj.className = "s-li";
        }
    }
    function openClick(obj1,obj2){
        obj1.onclick = function(){
            show(obj2);
            mb.addEventListener("click",mb_close);
        }
    }
    function closeClick(obj1,obj2){
        obj1.onclick = function(){
            close(obj2);
        }
    }
    this.init=function(s){
        //insert
        sli1 = document.getElementById("h-level").childNodes;
        for(var j=0;j < sli1.length;j++){
            sli1[j].addEventListener("click",selectLevel);
        }
        sli2 = document.getElementById("h-type").childNodes;
        for(var k=0;k < sli2.length;k++){
            sli2[k].addEventListener("click",selectType);
        }
        rli = document.getElementsByClassName("r-li");
        for(var i=0;i < rli.length;i++){
            rli[i].addEventListener("click",selectRank);
        }
        lli = document.getElementsByClassName("l-li");
        for(var r=0;r < lli.length;r++){
            lli[r].addEventListener("click",selectLocation);
        }
    };
    init();
    openClick(fo_ra,rank);
    openClick(fo_sc,screen);
    openClick(fo_lo,location);
    closeClick(s_but,screen);
    closeClick(l_but,location);
    /*   排序筛选   */
    function selectRank(){
        var obj = window.event.srcElement;
        var rank=document.getElementById("rank");
        var mb=document.getElementById("r-mb");
        var color = obj.style.color;
        if(color == "rgb(252, 148, 100)"){
            mb.style.display="none";
            rank.style.bottom=-350+'px';
            rank.style.transition="all 350ms";
        }else{
            for(var i=0;i < rli.length;i++){
                if(rli[i].style.color == "rgb(252, 148, 100)"){
                    var bb = rli[i].getElementsByTagName("b")[0];
                    rli[i].removeChild(bb);
                }
                rli[i].style.color="#b3b2b4";
            }
            obj.style.color="#fc9464";
            var b = document.createElement("b");
            b.className = "hl-icon5";
            obj.appendChild(b);
            mb.style.display="none";
            rank.style.bottom=-350+'px';
            rank.style.transition="all 350ms";
        }
    }
    /*   位置筛选  */
    function selectLocation(){
        var obj = window.event.srcElement;
        var p = obj.firstElementChild;
        var b = obj.lastElementChild;
        var array = [];
        array = document.getElementsByClassName("l-li");
        if(p.innerHTML == "不限"){
            for(var i=1;i < array.length;i++){
                array[i].lastElementChild.className = "l-icon";
            }
        }if(p.innerHTML != "不限"){
            document.getElementById("l-ul").firstElementChild.lastElementChild.className = "l-icon";
        }
        if(b.className == "l-icon"){
            b.className = "l-icon1";
        }else{
            b.className = "l-icon";
        }
    }
}






