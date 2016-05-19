/**
 * Created by changlv on 2015/12/11.
 */
//window.onload=fonction()
//{
//    function showBlock(obj) {
//        obj.onclick = function () {
//            var rank=document.getElementById("rank");
//            var mb=document.getElementById("r-mb");
//            mb.style.display="block";
//            rank.style.bottom="0";
//            rank.style.transition="all 2s";
//        }
//    }
//}
function showRank(){
    var rank=document.getElementById("rank");
    var mb=document.getElementById("r-mb");
    mb.style.display="block";
    rank.style.bottom="0";
    rank.style.transition="all 2s";
}
function hiddenRank(){
    var rank=document.getElementById("rank");
    var mb=document.getElementById("r-mb");
    mb.style.display="none";
    rank.style.bottom=-350+'px';
    rank.style.transition="all 3s";
}
function showScreen(){
    var rank=document.getElementById("screen");
    var mb=document.getElementById("s-mb");
    mb.style.display="block";
    rank.style.bottom="0";
    rank.style.transition="all 2s";
}
function hiddenScreen(){
    var rank=document.getElementById("screen");
    var mb=document.getElementById("s-mb");
    mb.style.display="none";
    rank.style.bottom=-350+'px';
    rank.style.transition="all 3s";
}
function showLocation(){
    var rank=document.getElementById("location");
    var mb=document.getElementById("l-mb");
    mb.style.display="block";
    rank.style.bottom="0";
    rank.style.transition="all 2s";
}
function hiddenLocation(){
    var rank=document.getElementById("location");
    var mb=document.getElementById("l-mb");
    mb.style.display="none";
    rank.style.bottom=-350+'px';
    rank.style.transition="all 3s";
}