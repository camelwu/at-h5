function showDetail(){

    var room=document.getElementById("room");
    var roomAll=document.getElementById("roomAll");
    var mb=document.getElementById("r-mb");
    room.style.display="block";
    roomAll.style.display="block";
    mb.style.display="block";

}
function closeRoom(){
    var room=document.getElementById("room");
    var roomAll=document.getElementById("roomAll");
    var mb=document.getElementById("r-mb");
    room.style.display="none";
    mb.style.display="none";
    roomAll.style.display="none";
}
