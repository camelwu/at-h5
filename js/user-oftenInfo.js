/**
 * Created by changlv on 2016/1/19.
 */
var index;
var array = [];
var arrayId = [];
var travJson;
window.onload = function(){
    var menu = $("#menu")[0];
    menu.style.display = "none";
    var c = new vcm;
    // 初始化常旅客
    var memberId = sessionStorage.memberid;
    var Parameters= {
        "Parameters": "{\"memberId\":"+memberId+"}",
        "ForeEndType": 3,
        "Code": "0074"
    };
    c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

    var addtra_page = $("#addtra_page")[0];
    var addUser = $("#addUser")[0];
    var add_quit = $("#add_quit")[0];
    var uptra_page = $("#uptra_page")[0];
    var update_quit = $("#update_quit")[0];
    var name_state = $("#name_state")[0];
    var aname_state = $("#aname_state")[0];
    var fillName_page = $("#fillName_page")[0];
    var close_name = $("#close_name")[0];
    function showPage(obj1,obj2){
        obj1.onclick = function(){
            obj2.style.display = "block";
        }
    }
    showPage(addUser,addtra_page);
    showPage(name_state,fillName_page);
    showPage(aname_state,fillName_page);
    function closePage(obj1,obj2){
        obj1.onclick = function(){
            obj2.style.display = "none";
        }
    }
    closePage(add_quit,addtra_page);
    closePage(update_quit,uptra_page);
    closePage(close_name,fillName_page);
    //   增加常旅客
    var add_finish = $("#add_finish")[0];
    function addTraveler(obj){
        obj.onclick = function(){
            var input = document.getElementById("addForm").getElementsByTagName("input");
            var postCard = document.getElementById("postCard").innerHTML;
            var cardId;
            if(input[1].value == ""||input[2].value ==""){
                alert("英文姓名为必填信息");
                return;
            }
            //  判断证件类型
            if(postCard == "护照"){
                cardId = "1";
            }else if(postCard == "身份证"){
                cardId = "2";
            }else if(postCard == "出生证明"){
                cardId = "3";
            }else if(postCard == "港澳通行证"){
                cardId = "4";
            }else if(postCard == "军人证"){
                cardId = "5";
            }else if(postCard == "驾驶证"){
                cardId = "6";
            }else if(postCard == "台胞证"){
                cardId = "7";
            }else if(postCard == "回乡证"){
                cardId = "8";
            }else{
                cardId = "9";
            }
            //  判断性别
            var man = $("#man")[0];
            var sexCode;
            var sexName;
            if(man.className == "icon-h traveler-sex1"){
                sexCode = "Mr";
                sexName = "男";
            }else{
                sexCode = "Mrs";
                sexName = "女";
            }
            var Parameters= {
                "Parameters": "{\"Traveller\":{\"IdName\":\""+input[0].value+"\",\"LastName\":\""+input[1].value+"\",\"FirstName\":\""+input[2].value+"\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\""+sexCode+"\",\"SexName\":\""+sexName+"\",\"DateOfBirth\":\"1932-06-15\",\"Email\":\""+input[5].value+"\",\"MemberId\":\""+memberId+"\",\"MobilePhone\":\""+input[4].value+"\"},\"ListTravellerIdInfo\":[{\"IdType\":2,\"IdNumber\":\""+input[3].value+"\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\"2016-02-13\"}]}",
                "ForeEndType": 3,
                "Code": "0071"
            };

            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_addtrav);
        }
    }
    addTraveler(add_finish);
    //   编辑常旅客
    var upadate_finish = $("#upadate_finish")[0];
    function upTraveler(obj){
        obj.onclick = function(){
            debugger;
            var travelId = array[index];
            var id = arrayId[index];
            var input  = document.getElementById("updateForm").getElementsByTagName("input");
            var cardType = document.getElementById("cardType").innerHTML;
            var cardId;
            var countryName = document.getElementById("countryName").innerHTML;
            if(input[1].value == ""||input[2].value ==""){
                alert("英文姓名为必填信息");
                return;
            }
            //  判断性别
            var man = $("#man2")[0];
            var sexCode;
            var sexName;
            if(man.className == "icon-h traveler-sex1"){
                sexCode = "Mr";
                sexName = "男";
            }else{
                sexCode = "Mrs";
                sexName = "女";
            }
            //  判断证件类型
            if(cardType == "护照"){
                cardId = "1";
            }else if(cardType == "身份证"){
                cardId = "2";
            }else if(cardType == "出生证明"){
                cardId = "3";
            }else if(cardType == "港澳通行证"){
                cardId = "4";
            }else if(cardType == "军人证"){
                cardId = "5";
            }else if(cardType == "驾驶证"){
                cardId = "6";
            }else if(cardType == "台胞证"){
                cardId = "7";
            }else if(cardType == "回乡证"){
                cardId = "8";
            }else{
                cardId = "9";
            }
            var Parameters= {
                "Parameters": "{\"Traveller\":{\"TravellerId\":"+travelId+",\"IdName\":\""+input[0].value+"\",\"LastName\":\""+input[1].value+"\",\"FirstName\":\""+input[2].value+"\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\""+sexCode+"\",\"SexName\":\""+sexName+"\",\"DateOfBirth\":\"1932-06-15\",\"Email\":\""+input[5].value+"\",\"MemberId\":\""+memberId+"\",\"MobilePhone\":\""+input[4].value+"\"},\"ListTravellerIdInfo\":[{\"Id\":"+id+",\"TravellerId\":"+travelId+",\"IdType\":2,\"IdNumber\":\""+input[3].value+"\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\"2016-02-13\"}]}",
                "ForeEndType": 3,
                "Code": "0072"
            };

            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_uptrav);
        }
    }
    upTraveler(upadate_finish);
    //   删除常旅客
    var delTra = $("#delTra")[0];
    function deleteTra(obj){
        obj.onclick = function(){
            var travelId = array[index];
            var id = arrayId[index];
            var Parameters={
                "Parameters": "{\"travellerId\":"+travelId+"}",
                "ForeEndType": 3,
                "Code": "0073"
            };
            c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_deltrav);
        }
    }
    deleteTra(delTra);
};
//   性别选择
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
function choseSex2(){
    var span = window.event.srcElement;
    var man = document.getElementById("man2");
    var woman = document.getElementById("woman2");
    var b = span.firstChild;
    if(b.className == "icon-h traveler-sex1"){
        b.className = "icon-h traveler-sex2";
    }else{
        man.className = "icon-h traveler-sex2";
        woman.className = "icon-h traveler-sex2";
        b.className = "icon-h traveler-sex1";
    }
}
//  页面初始获取常旅客
function mycallback(ret){
    travJson = eval('('+ret+')');
    console.log(travJson);
    var blank = $("#blank")[0];
    if(travJson.Success){
        if(travJson.Data.length == 0){
            blank.style.display = "block";
        }else{
            blank.style.display = "none";
            var content = $("#content")[0];
            var UL = document.createElement("ul");
            UL.className = "often-traveler";
            UL.style.borderTop = "1px solid #dedede";
            UL.style.marginTop = "10px";
            for(var i=0;i < travJson.Data.length;i++){
                array[i] = travJson.Data[i].traveller.travellerId;
                arrayId[i] = travJson.Data[i].traveller.Id;
                var li = document.createElement("li");
                li.className = "eve-traveler";
                var b = document.createElement("b");
                b.className = "bu_icon user-edits";
                b.style.marginTop = li.clientHeight + 20+ 'px';
                b.addEventListener("click",updateTra);
                li.appendChild(b);
                var ul = document.createElement("ul");
                ul.className = "often_user";
                var ul_li1 = document.createElement("li");
                ul_li1.innerHTML = travJson.Data[i].traveller.idName + travJson.Data[i].traveller.lastName + "/" + travJson.Data[i].traveller.firstName;
                ul.appendChild(ul_li1);
                var ul_li2 = document.createElement("li");
                if(travJson.Data[i].listTravellerIdInfo.idType == "1"){
                    ul_li2.innerHTML = "护照" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "2"){
                    ul_li2.innerHTML = "身份证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "3"){
                    ul_li2.innerHTML = "出生证明" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "4"){
                    ul_li2.innerHTML = "港澳通行证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "5"){
                    ul_li2.innerHTML = "军官证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "6"){
                    ul_li2.innerHTML = "驾驶证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "7"){
                    ul_li2.innerHTML = "台胞证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else if(travJson.Data[i].listTravellerIdInfo.idType == "8"){
                    ul_li2.innerHTML = "回乡证" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }else{
                    ul_li2.innerHTML = "其他" +" "+ travJson.Data[i].listTravellerIdInfo[0].idNumber;
                }
                ul.appendChild(ul_li2);
                var ul_li3 = document.createElement("li");
                ul_li3.innerHTML = "手机号" +" "+ travJson.Data[i].traveller.mobilePhone;
                ul.appendChild(ul_li3);
                li.appendChild(ul);
                li.setAttribute("index",i);
                UL.appendChild(li);
            }
            content.appendChild(UL);
        }
    }else{
        alert(travJson.Message);
    }
}
function mycallback_addtrav(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.Success){
        document.getElementById("addForm").submit();
    }else{
        alert(myJson.Message);
    }
}
function mycallback_deltrav(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.Success){
        window.location.href = "user-oftenInfo.html";
    }else{
        alert(myJson.Message);
    }
}
function  mycallback_uptrav(ret){
    var myJson = eval('('+ret+')');
    console.log(myJson);
    if(myJson.Success){
        document.getElementById("updateForm").submit();
    }else{
        alert(myJson.Message);
    }
}
//  编辑常旅客页面
function updateTra(){
    var b = window.event.srcElement;
    var li = b.parentElement;
    index = li.getAttribute("index");
    var uptra_page = $("#uptra_page")[0];
    uptra_page.style.display = "block";
    var input  = document.getElementById("updateForm").getElementsByTagName("input");
    var cardType = $("#cardType")[0];
    var countryName = $("#countryName")[0];
    var man2 = $("#man2")[0];
    var woman2 = $("#woman2")[0];
    input[0].value = travJson.Data[index].traveller.idName;
    input[1].value = travJson.Data[index].traveller.lastName;
    input[2].value = travJson.Data[index].traveller.firstName;
    input[3].value = travJson.Data[index].traveller.idNumber;
    input[5].value = travJson.Data[index].traveller.email;
    if(travJson.Data[index].listTravellerIdInfo[0].idType == "1"){
        cardType.innerHTML = "护照";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "2"){
        cardType.innerHTML = "身份证";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "3"){
        cardType.innerHTML = "出生证明";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "4"){
        cardType.innerHTML = "港澳通行证";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "5"){
        cardType.innerHTML = "军官证";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "6"){
        cardType.innerHTML = "驾驶证";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "7"){
        cardType.innerHTML = "台胞证";
    }else if(travJson.Data[index].listTravellerIdInfo[0].idType == "8"){
        cardType.innerHTML = "回乡证";
    }else{
        cardType.innerHTML = "其他";
    }
    countryName.innerHTML = travJson.Data[index].traveller.countryName;
    if(travJson.Data[index].traveller.sexCode == "Mr"){
        man2.className = "icon-h traveler-sex1";
        woman2.className = "icon-h traveler-sex2";
    }else{
        man2.className = "icon-h traveler-sex2";
        woman2.className = "icon-h traveler-sex1";
    }
}
