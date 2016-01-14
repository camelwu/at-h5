/**
 * Created by changlv on 2016/1/13.
 */
function u_perInfo(){
    var data = JSON.parse(sessionStorage.data);
    console.log(data);
    var nickname = $("#nickname")[0];
    var close_page = $("#close_page")[0];
    var amend_info = $("#amend_info")[0];
    var title = $("#title")[0];
    var info_content = $("#info_content")[0];
    var a_nick = $("#a_nick")[0];
    var a_name = $("#a_name")[0];
    var a_phone = $("#a_phone")[0];
    var a_email = $("#a_email")[0];
    var a_key = $("#a_key")[0];
    var changename = $("#changename")[0];
    var fillname = $("#fillname")[0];
    var phoneverify = $("#phoneverify")[0];
    var useremail = $("#useremail")[0];
    var amendkey = $("#amendkey")[0];
    var array = title.innerHTML;
    var head = array.split("/");
    nickname.innerHTML = data.NickName;

    var c = new vcm;
    function closeAmend(obj){
        obj.onclick = function(){
            amend_info.style.display = "none";
        }
    }
    closeAmend(close_page);
    function amendInfo(obj1,obj2,obj3){
        obj1.onclick = function(){
            changename.style.display = "none";
            fillname.style.display = "none";
            phoneverify.style.display = "none";
            useremail.style.display = "none";
            amendkey.style.display = "none";
            title.innerHTML = obj2;
            obj3.style.display = "block";
            var li = info_content.getElementsByTagName("li");
            amend_info.style.display = "block";
        }
    }
    amendInfo(a_nick,head[0],changename);
    amendInfo(a_name,head[1],fillname);
    amendInfo(a_phone,head[2],phoneverify);
    amendInfo(a_email,head[3],useremail);
    amendInfo(a_key,head[4],amendkey);
}
function clearname(){
    var name = document.getElementById("name");
    name.value = "";
}