/**
 * Created by changlv on 2015/12/11.
 */
function fun11(){
    var choose=document.getElementById("choose");
    var show=document.getElementById("show");
    choose.style.display="block";
    show.style.display="block";
}
function No(){
    var choose=document.getElementById("choose");
    var show=document.getElementById("show");
    choose.style.display="none";
    show.style.display="none";
}
function Yes(){
    var choose=document.getElementById("choose");
    var show=document.getElementById("show");
    choose.style.display="none";
    show.style.display="none";
}


function fun1(num){
    if( num.parentNode.children[0].value<10){
        num.parentNode.children[0].value++;
    }else{
        return false;
    }
}
function fun2(num){
    if(num.parentNode.children[0].value>1){
        num.parentNode.children[0].value--;
    }else{
        return false;
    }
}

function fun7(num){
    num.parentNode.children[0].value++;
}
function fun6(num){
    if(num.parentNode.children[0].value>1){
        num.parentNode.children[0].value--;
    }else{
        return false;
    }
}

function fun3(num){
    num.parentNode.children[0].value++;
}
function fun4(num){
    if(num.parentNode.children[0].value>0){
        num.parentNode.children[0].value--;
    }else{
        return false;
    }
}

window.onload=fun5()
function fun5(){
    var input2=document.getElementById("input2");
    if(!input2)return;
    input2.name="";
}


function Dom(){
    var Dom=document.getElementById("Dom");
    var Inter=document.getElementById("Inter");
    var room=document.getElementById("room");
    var people=document.getElementById("people");
    var arr1=document.getElementById("arr1");
    var arr2=document.getElementById("arr2");
    var count1=document.getElementById("count1");
    var count2=document.getElementById("count2");
    var count3=document.getElementById("count3");
    var input1=document.getElementById("input1");
    input1.name="";
    var input2=document.getElementById("input2");
    input2.name="CityName";
    count1.value=1;
    count2.value=1;
    count3.value=0;
    room.style.display="none";
    people.style.display="none";
    arr1.style.display="none";
    arr2.style.display="block";
    Dom.className="on";
    Inter.className="off";
}
function Inter(){
    var Dom=document.getElementById("Dom");
    var Inter=document.getElementById("Inter");
    var room=document.getElementById("room");
    var people=document.getElementById("people");
    var arr1=document.getElementById("arr1");
    var arr2=document.getElementById("arr2");

    room.style.display="block";
    people.style.display="block";
    arr1.style.display="block";
    arr2.style.display="none";
    Dom.className="off";
    Inter.className="on";
}



