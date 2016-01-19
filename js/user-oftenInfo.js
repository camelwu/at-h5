/**
 * Created by changlv on 2016/1/19.
 */
window.onload = function(){
    var menu = $("#menu")[0];
    menu.style.display = "none";
    var c = new vcm;
    var li = $(".eve-traveler");
    for(var i=0;i < li.length;i++){
        var edit = li[i].firstElementChild;
        console.log(li[i].clientHeight);
        edit.style.marginTop = li[i].clientHeight/2 - 24+ 'px';
        edit.onclick = editTrav;
    }
    function editTrav(){

    }
};
function showAdd_page(){
    var addtra_page = document.getElementById("addtra-page");
    addtra_page.style.display = "block";
}
function closeAdd_page(){
    var addtra_page = document.getElementById("addtra-page");
    addtra_page.style.display = "none";
}
function choseSex(){
    var span = window.event.srcElement;
    var man = document.getElementById("man");
    var woman = document.getElementById("woman");
    var b = span.firstChild;
    if(b.className == "icon-h traveler-sex1"){
        b.className = "icon-h traveler-sex2";
    }else{
        man.className = "icon-h traveler-sex2";
        woman.className = "icon-h traveler-sex2";
        b.className = "icon-h traveler-sex1";
    }
}