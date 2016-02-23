// JavaScript Document

require.config({
    baseUrl: '../js/lib',
    paths: {
        jquery: 'jquery',
        vlm: 'vlm',
        plugins: 'plugins',
        Scroller: 'scroller'
    },
    $:['jquery'],
    shim: {
    	'plugins':{
    		deps: ['jquery'],
    		init:function(){
    			return{
    				WOW:WOW,
    				FastClick:FastClick,
    				owlCarousel:owlCarousel,
    				countdown:countdown,
    				swipebox:swipebox,
    				ScrollIt:ScrollIt,
    				Snap:Snap
    			}
    		}
    	},
    	'scroller':{
    		deps: ['jquery','plugins'],

    		exports: 'Scroller'
        }
	}//,
	//urlArgs: "bust=" +  (new Date()).getTime()
});

require(['jquery','vlm','scroller'], function($,vlm,Scroller) {
    //console.log("dataReady="+vlm);
    vlm.init();
    /**
     * Created by changlv on 2016/1/19.
     */
    var index;
    var array = [];
    var arrayId = [];
    var travJson;
    $(function(){
        var a=location.href;
        if(a.indexOf('user-oftenInfo') == -1)
        {
            return;
        }
        var menu = $("#menu")[0];
        menu.style.display = "none";
        // 初始化常旅客
        var memberId = localStorage.memberid||sessionStorage.memberid;
        var Parameters = {
            "Parameters": "{\"memberId\":" + memberId + "}",
            "ForeEndType": 3,
            "Code": "0074"
        };
        //console.log(Parameters);
        vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

        var addtra_page = $("#addtra_page")[0];
        var addUser = $("#addUser")[0];
        var add_quit = $("#add_quit")[0];
        var uptra_page = $("#uptra_page")[0];
        var update_quit = $("#update_quit")[0];
        var name_state = $("#name_state")[0];
        var aname_state = $("#aname_state")[0];
        var fillName_page = $("#fillName_page")[0];
        var close_name = $("#close_name")[0];

        function showPage(obj1, obj2) {
            obj1.onclick = function () {
                obj2.style.display = "block";

            }
        }

        showPage(addUser, addtra_page);
        showPage(name_state, fillName_page);
        showPage(aname_state, fillName_page);
        function closePage(obj1, obj2) {
            obj1.onclick = function () {
                obj2.style.display = "none";
            }
        }

        closePage(add_quit, addtra_page);
        closePage(update_quit, uptra_page);
        closePage(close_name, fillName_page);

        //   增加常旅客
        var add_finish = $("#add_finish")[0];

        function addTraveler(obj) {
            obj.onclick = function () {
                var input = document.getElementById("addForm").getElementsByTagName("input");
                var postCard = document.getElementById("postCard").innerHTML;
                var cardId;
                if (input[1].value == "" || input[2].value == "") {
                    alert("英文姓名为必填信息");
                    return;
                }
                //  判断证件类型
                if (postCard == "护照") {
                    cardId = "1";
                } else if (postCard == "身份证") {
                    cardId = "2";
                } else if (postCard == "出生证明") {
                    cardId = "3";
                } else if (postCard == "港澳通行证") {
                    cardId = "4";
                } else if (postCard == "军人证") {
                    cardId = "5";
                } else if (postCard == "驾驶证") {
                    cardId = "6";
                } else if (postCard == "台胞证") {
                    cardId = "7";
                } else if (postCard == "回乡证") {
                    cardId = "8";
                } else {
                    cardId = "9";
                }
                //  判断性别
                var man = $("#man")[0];
                var sexCode;
                var sexName;
                if (man.className == "icon-h traveler-sex1") {
                    sexCode = "Mr";
                    sexName = "男";
                } else {
                    sexCode = "Mrs";
                    sexName = "女";
                }


                var oMobile = $('#mobile-cell-add')[0].value;
                var oEmail = $('#email-cell-add')[0].value;

                if (vlm.Utils.validate.mobileNo(oMobile) && vlm.Utils.validate.email(oEmail)) {

                    var Parameters = {
                        "Parameters": "{\"Traveller\":{\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+input[5].value.replace('年','-').replace('月','-').replace('号','')+"\",\"Email\":\"" + input[7].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[6].value + "\"},\"ListTravellerIdInfo\":[{\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\""+input[4].value.replace('年','-').replace('月','-').replace('号','').replace('日','')+"\"}]}",
                        "ForeEndType": 3,
                        "Code": "0071"
                    }
                    //console.log(Parameters);
                    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_addtrav);
                }
                else {
                    alert('请输入正确的邮箱和电话号码');
                }
            }
        }

        addTraveler(add_finish);
        //   编辑常旅客
        var upadate_finish = $("#upadate_finish")[0];

        function upTraveler(obj) {
            obj.onclick = function () {
                //debugger;
                //console.log(array);
                var travelId = array[index];
                //console.log(travelId);
                var id = arrayId[index];
                //console.log(id);
                var input = document.getElementById("updateForm").getElementsByTagName("input");
                var cardType = document.getElementById("cardType").innerHTML;
                var cardId;
                var countryName = document.getElementById("countryName").innerHTML;
                if (input[1].value == "" || input[2].value == "") {
                    alert("英文姓名为必填信息");
                    return;
                }
                //  判断性别
                var man = $("#man2")[0];
                var sexCode;
                var sexName;
                if (man.className == "icon-h traveler-sex1") {
                    sexCode = "Mr";
                    sexName = "男";
                } else {
                    sexCode = "Mrs";
                    sexName = "女";
                }
                //  判断证件类型
                if (cardType == "身份证") {
                    cardId = "1";
                } else if (cardType == "护照") {
                    cardId = "2";
                } else if (cardType == "港澳通行证") {
                    cardId = "3";
                } else if (cardType == "军官证") {
                    cardId = "4";
                } else if (cardType == "驾驶证") {
                    cardId = "5";
                } else if (cardType == "台胞证") {
                    cardId = "6";
                } else if (cardType == "回乡证") {
                    cardId = "7";
                } else if (cardType == "户口本") {
                    cardId = "8";
                } else if (cardType == "出生证明") {
                    cardId = "9";
                }
                else {
                    cardId = "10";
                }
                // 手机号邮箱检验
                var oMobile = $('#mobile-cell')[0].value;
                var oEmail = $('#email-cell')[0].value;

                if (vlm.Utils.validate.mobileNo(oMobile) && vlm.Utils.validate.email(oEmail)) {
                    var Parameters = {
                        "Parameters": "{\"Traveller\":{\"TravellerId\":" + travelId + ",\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+input[5].value.replace('年','-').replace('月','-').replace('号','')+"\",\"Email\":\"" + input[7].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[6].value + "\"},\"ListTravellerIdInfo\":[{\"Id\":" + id + ",\"TravellerId\":" + travelId + ",\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\""+input[4].value.replace('年','-').replace('月','-').replace('号','')+"\"}]}",
                        "ForeEndType": 3,
                        "Code": "0072"
                    };
                    //console.log(Parameters);
                    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_uptrav);

                }
                else {
                    alert('请输入正确的手机号和邮箱');
                }
                //console.log(Parameters);

            }
        }

        upTraveler(upadate_finish);
        //   删除常旅客
        var delTra = $("#delTra")[0];

        function deleteTra(obj) {
            obj.onclick = function () {
                var travelId = array[index];
                var id = arrayId[index];
                var Parameters = {
                    "Parameters": "{\"travellerId\":" + travelId + "}",
                    "ForeEndType": 3,
                    "Code": "0073"
                };
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_deltrav);
            }
        }

        deleteTra(delTra);
    });


    (function () {
        var aSel = document.querySelectorAll('.sex-cho-wrap');

        for (var i = 0; i < aSel.length; i++) {
            (function (index) {
                var aSpan = aSel[index].querySelectorAll('b');
                for (j = 0; j < aSpan.length; j++) {
                    aSpan[j].onclick = function () {
                        for (i = 0; i < aSpan.length; i++) {
                            aSpan[i].className = 'icon-h traveler-sex2';
                        }
                        this.className = 'icon-h traveler-sex1';
                    }
                }
            })(i);

        }

    })();


//  页面初始获取常旅客
    function mycallback(ret) {
        travJson = eval('(' + ret + ')');
        var blank = $("#blank")[0];
        console.log(travJson)
        if (travJson.success) {
            if (travJson.data.length == 0) {
                blank.style.display = "block";
            } else {
                blank.style.display = "none";
                var content = $("#content")[0];
                var UL = document.createElement("ul");
                UL.className = "often-traveler";
                UL.style.borderTop = "1px solid #dedede";
                UL.style.marginTop = "10px";
                for (var i = 0; i < travJson.data.length; i++) {
                    array[i] = travJson.data[i].traveller.travellerId;
                    arrayId[i] = travJson.data[i].traveller.Id;
                    var li = document.createElement("li");
                    li.className = "eve-traveler";
                    var b = document.createElement("b");
                    b.className = "user-edits";
                    b.style.marginTop = li.clientHeight + 20 + 'px';
                    b.addEventListener("click", updateTra);
                    li.appendChild(b);
                    var ul = document.createElement("ul");
                    ul.className = "often_user";
                    var ul_li1 = document.createElement("li");
                    ul_li1.innerHTML = travJson.data[i].traveller.idName + travJson.data[i].traveller.lastName + "/" + travJson.data[i].traveller.firstName;
                    ul.appendChild(ul_li1);
                    var ul_li2 = document.createElement("li");
                    var idtype_num=travJson.data[i].listTravellerIdInfo.length;
                    if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "1") {
                        ul_li2.innerHTML = "身份证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "2") {
                        ul_li2.innerHTML = "护照" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "3") {
                        ul_li2.innerHTML = "港澳通行证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "4") {
                        ul_li2.innerHTML = "军官证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "5") {
                        ul_li2.innerHTML = "驾驶证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "6") {
                        ul_li2.innerHTML = "台胞证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    } else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "7") {
                        ul_li2.innerHTML = "回乡证" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    }
                    else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "8") {
                        ul_li2.innerHTML = "户口本" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    }
                    else if (travJson.data[i].listTravellerIdInfo[idtype_num-1].idType == "9") {
                        ul_li2.innerHTML = "出生证明" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    }
                    else {
                        ul_li2.innerHTML = "其他" + " " + travJson.data[i].listTravellerIdInfo[idtype_num-1].idNumber;
                    }
                    ul.appendChild(ul_li2);
                    var ul_li3 = document.createElement("li");
                    ul_li3.innerHTML = "手机号" + " " + travJson.data[i].traveller.mobilePhone;
                    ul.appendChild(ul_li3);
                    li.appendChild(ul);
                    li.setAttribute("index", i);
                    UL.appendChild(li);
                }
                content.appendChild(UL);
            }
        } else {
            alert(travJson.message);
        }
    }

    function mycallback_addtrav(ret) {
        var myJson = eval('(' + ret + ')');
        console.log(myJson);
        if (myJson.success) {
            document.getElementById("addForm").submit();
        } else {
            alert(myJson.message);
        }
    }

    function mycallback_deltrav(ret) {
        var myJson = eval('(' + ret + ')');
        console.log(myJson);
        if (myJson.success) {
            window.location.href = "user-oftenInfo.html";
        } else {
            alert(myJson.message);
        }
    }

    function mycallback_uptrav(ret) {
        var myJson = eval('(' + ret + ')');
        console.log(myJson);
        if (myJson.success) {
           document.getElementById("updateForm").submit();
        } else {
            alert(myJson.message);
        }
    }

//  编辑常旅客页面
    function updateTra() {
        var b = window.event.srcElement;
        var li = b.parentElement;
        index = li.getAttribute("index");
        var uptra_page = $("#uptra_page")[0];
        uptra_page.style.display = "block";
        var input = document.getElementById("updateForm").getElementsByTagName("input");
        var cardType = $("#cardType")[0];
        var countryName = $("#countryName")[0];
        var man2 = $("#man2")[0];
        var woman2 = $("#woman2")[0];
        var idtype_num=travJson.data[index].listTravellerIdInfo.length;
        input[0].value = travJson.data[index].traveller.idName;
        input[1].value = travJson.data[index].traveller.lastName;
        input[2].value = travJson.data[index].traveller.firstName;
        input[3].value = travJson.data[index].listTravellerIdInfo[idtype_num-1].idNumber;
        input[4].value = travJson.data[index].listTravellerIdInfo[idtype_num-1].idActivatedDate.substring(0,10).replace('-','年').replace('-','月')+'号';
        input[5].value = travJson.data[index].traveller.dateOfBirth.substring(0,10).replace('-','年').replace('-','月')+'号';
        input[6].value = travJson.data[index].traveller.mobilePhone;
        input[7].value = travJson.data[index].traveller.email;
        if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "1") {
            cardType.innerHTML = "身份证";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "2") {
            cardType.innerHTML = "护照";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "3") {
            cardType.innerHTML = "出生证明";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "4") {
            cardType.innerHTML = "军官证";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "5") {
            cardType.innerHTML = "驾驶证";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "6") {
            cardType.innerHTML = "台胞证";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "7") {
            cardType.innerHTML = "回乡证";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "8") {
            cardType.innerHTML = "户口本";
        } else if (travJson.data[index].listTravellerIdInfo[idtype_num-1].idType == "9") {
            cardType.innerHTML = "港澳通行证";
        }else {
            cardType.innerHTML = "其他";
        }
        countryName.innerHTML = travJson.data[index].traveller.countryName;
        if (travJson.data[index].traveller.sexCode == "Mr") {
            man2.className = "icon-h traveler-sex1";
            woman2.className = "icon-h traveler-sex2";
        } else {
            man2.className = "icon-h traveler-sex2";
            woman2.className = "icon-h traveler-sex1";
        }
    }

//    });

    var myDate1 = new Scroller({id: "birth-cont", type:"birth",cont:"week_span2"});
    var myDate2 = new Scroller({id: "time-cont", type:"validity",cont:"week_span2"});
    var myDate2 = new Scroller({id: "postCard", type:"card",cont:"week_span2"});

    var myDate3 = new Scroller({id: "birth-cont-edit", type:"birth",cont:"week_span2"});
    var myDate3 = new Scroller({id: "time-cont-edit", type:"birth",cont:"week_span2"});
    var myDate3 = new Scroller({id: "cardType", type:"card",cont:"week_span2"});

    var myDate4 = new Scroller({id: "birth-cont-per", type:"birth",cont:"week_span2"});


});


