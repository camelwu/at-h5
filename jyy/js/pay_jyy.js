/**
 * Created by changlv on 2015/12/14.
 */
var array = [];
function init(){
    var ul = document.getElementById("p-ul1");
    array = ul.getElementsByTagName("b");
}
function selectThis(){
    var obj = window.event.srcElement;
    var cname = obj.className;
    if(cname == "p-icon2"){
        for(var j=0;j<array.length;j++){
            if(array[j].className == "p-icon1"){
                array[j].className = "p-icon2";
            }
        }
        obj.className = "p-icon1";
    }else{
        obj.className = "p-icon2";
    }
}