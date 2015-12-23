
function h_l_s(){
    var rli = [],
        sli1 = [],
        sli2 = [],
        lb = [];
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
        var mb=document.getElementById("r-mb");
        mb.style.display="block";
        obj.style.bottom="0";
        obj.style.transition="all 350ms";
    }
    function close(obj){
        var mb=document.getElementById("r-mb");
        mb.style.display="none";
        obj.style.bottom=-350+'px';
        obj.style.transition="all 350ms";
    }
    /*   æ∆µÍ…∏—°   */
    function select(){
        var obj = window.event.srcElement;
        var oName = obj.className;
        if(oName == "s-li"){
            obj.className = "s-li1";
        }else{
            obj.className = "s-li";
        }
    }
    function openClick(obj1,obj2){
        obj1.onclick = function(){
            show(obj2);
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
            sli1[j].addEventListener("click",select);
        }
        sli2 = document.getElementById("h-type").childNodes;
        for(var k=0;k < sli2.length;k++){
            sli2[k].addEventListener("click",select);
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
    /*   ≈≈–Ú—°‘Ò   */
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
    /*   Œª÷√—°‘Ò   */
    function selectLocation(){
        var obj = window.event.srcElement;
        var b = obj.lastElementChild;
        if(b.className == "l-icon"){
            b.className = "l-icon1";
        }else{
            b.className = "l-icon";
        }
    }
}

//window.onload = function(){
//    sli1 = document.getElementById("h-level").childNodes;
//    for(var j=0;j < sli1.length;j++){
//        sli1[j].addEventListener("click",selectLevel);
//    }
//    sli2 = document.getElementById("h-type").childNodes;
//    for(var k=0;k < sli2.length;k++){
//        sli2[k].addEventListener("click",selectType);
//    }
//    rli = document.getElementsByClassName("r-li");
//    for(var i=0;i < rli.length;i++){
//        rli[i].addEventListener("click",selectRank);
//    }
//    lb = document.getElementById("l-ul").getElementsByTagName("b");
//    for(var r=0;r < lb.length;r++){
//        lb[r].addEventListener("click",selectLocation);
//    }
//    function show(obj){
//        var mb=document.getElementById("r-mb");
//        mb.style.display="block";
//        obj.style.bottom="0";
//        obj.style.transition="all 1s";
//    }
//    function close(obj){
//        var mb=document.getElementById("r-mb");
//        mb.style.display="none";
//        obj.style.bottom=-350+'px';
//        obj.style.transition="all 1s";
//    }
//    function select(obj){
//        var obj1 = window.event.srcElement;
//        var oName = obj1.className;
//        if(oName == "s-li"){
//            for(var i=0;i<obj.length;i++){
//                if(obj[i].className == "s-li1"){
//                    obj[i].className = "s-li";
//                }
//            }
//            obj1.className = "s-li1";
//        }
//    }
//    function openClick(obj1,obj2){
//        obj1.onclick = function(){
//            show(obj2);
//        }
//    }
//    function closeClick(obj1,obj2){
//        obj1.onclick = function(){
//            close(obj2);
//        }
//    }
//    function selectLevel(){
//        select(sli1);
//    }
//    function selectType(){
//        select(sli2);
//    }
//    var rank=document.getElementById("rank");
//    var screen=document.getElementById("screen");
//    var location=document.getElementById("location");
//    var fo_ra = document.getElementById("fo_ra");
//    var fo_sc = document.getElementById("fo_sc");
//    var fo_lo = document.getElementById("fo_lo");
//    var s_but = document.getElementById("s_but");
//    var l_but = document.getElementById("l_but");
//    openClick(fo_ra,rank);
//    openClick(fo_sc,screen);
//    openClick(fo_lo,location);
//    closeClick(s_but,screen);
//    closeClick(l_but,location);
//};






