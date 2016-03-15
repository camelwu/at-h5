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
        var memberId = localStorage.memberid;
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
                var travelId = array[index];
                //console.log(travelId);
                var id = arrayId[index];
                //console.log(id);
                var input = document.getElementById("addForm").getElementsByTagName("input");
                var postCard = document.getElementById("postCard").innerHTML;
                var cardId;
                //中文姓名验证
                var sChiName=input[0].value;
                if( ! vlm.Utils.validate.ChineseName(sChiName))
                {
                    jAlert('请输入正确的中文名');
                    return;
                }
                //英文姓
                var sEngfa=input[1].value;
                if( ! vlm.Utils.validate.engName(sEngfa))
                {
                    jAlert('请输入正确的英文姓');
                    return;
                }

                //英文名
                var sEngfir=input[2].value;
                if( ! vlm.Utils.validate.engName(sEngfir))
                {
                    jAlert('请输入正确的英文名');
                    return;
                }

                if (input[1].value == "" || input[2].value == "") {
                    jAlert("英文姓名为必填信息");
                    return;
                }
                //  判断证件类型
                if (postCard == "身份证") {
                    cardId = "1";
                } else if (postCard == "护照") {
                    cardId = "2";
                } else if (postCard == "港澳通行证") {
                    cardId = "3";
                } else if (postCard == "军官证") {
                    cardId = "4";
                } else if (postCard == "驾驶证") {
                    cardId = "5";
                } else if (postCard == "台胞证") {
                    cardId = "6";
                } else if (postCard == "回乡证") {
                    cardId = "7";
                } else if (postCard == "出生证明") {
                    cardId = "9";
                } else {
                    cardId = "10";
                }
                //证件号
                if(input[3].value == '')
                {
                    jAlert('请输入证件号')
                    return;
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

                //出生日期校验
                var oBirthday=input[5].value.replace('年','-').replace('月','-').replace('号','').replace('日','');
                if( ! vlm.Utils.compareBirth(oBirthday))
                {
                    jAlert('你选择的出生日期不符合购票要求(建议年龄大于13周岁)');
                    return;
                }
                var oMobile = $('#mobile-cell-add')[0].value;
                var oEmail = $('#email-cell-add')[0].value;

                if (vlm.Utils.validate.mobileNo(oMobile) && vlm.Utils.validate.email(oEmail)) {
                    console.log($('#addtra_page .country-btn')[0]);
                    var Parameters = {
                        "Parameters": "{\"Traveller\":{\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\""+$('#addtra_page .country-btn').eq(1).attr('data-code')+"\",\"CountryName\":\""+$('#addtra_page .country-btn').eq(1).html()+"\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+input[5].value.replace('年','-').replace('月','-').replace('号','')+"\",\"Email\":\"" + input[7].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[6].value + "\"},\"ListTravellerIdInfo\":[{\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\""+$('#addtra_page .country-btn').eq(0).attr('data-code')+"\",\"IdActivatedDate\":\""+input[4].value.replace('年','-').replace('月','-').replace('号','').replace('日','')+"\",\"NationalityCode\":\"SIN\"}]}",
                        "ForeEndType": 3,
                        "Code": "0071"
                    }
                    console.log(Parameters);
                    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_addtrav);
                }
                else {
                    jAlert('请输入正确的邮箱和电话号码');
                }
            }
        }

        addTraveler(add_finish);
        //   编辑常旅客
        var upadate_finish = $("#upadate_finish")[0];

        function upTraveler(obj) {
            obj.onclick = function () {
                var travelId = array[index];
                //console.log(travelId);
                var id = arrayId[index];
                //console.log(id);
                var input = document.getElementById("updateForm").getElementsByTagName("input");
                var cardType = document.getElementById("cardType").innerHTML;
                var cardId;
                var countryName = document.getElementById("countryName").innerHTML;
                //中文姓名验证
                var sChiName=input[0].value;
                if( ! vlm.Utils.validate.ChineseName(sChiName))
                {
                    jAlert('请输入正确的中文名');
                    return;
                }
                //英文姓
                var sEngfa=input[1].value;
                if( ! vlm.Utils.validate.engName(sEngfa))
                {
                    jAlert('请输入正确的英文姓');
                    return;
                }

                //英文名
                var sEngfir=input[2].value;
                if( ! vlm.Utils.validate.engName(sEngfir))
                {
                    jAlert('请输入正确的英文名');
                    return;
                }

                if (input[1].value == "" || input[2].value == "") {
                    jAlert("英文姓名为必填信息");
                    return;
                }
                //证件号
                if(input[3].value == '')
                {
                    jAlert('请输入证件号')
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
                }  else if (cardType == "出生证明") {
                    cardId = "9";
                }
                else {
                    cardId = "10";
                }

                //出生日期校验
                var oBirthday=input[5].value.replace('年','-').replace('月','-').replace('号','').replace('日','');
                if( ! vlm.Utils.compareBirth(oBirthday))
                {
                    jAlert('你选择的出生日期不符合购票要求(建议年龄大于13周岁)');
                    return;
                }
                // 手机号邮箱检验
                var oMobile = $('#mobile-cell')[0].value;
                var oEmail = $('#email-cell')[0].value;

                if ( ! vlm.Utils.validate.mobileNo(oMobile) )
                {
                    jAlert('请输入正确的手机号');
                    return;
                }
                if ( ! vlm.Utils.validate.email(oEmail) )
                {
                    jAlert('请输入正确的邮箱');
                    return;
                }
                var Parameters = {
                    "Parameters": "{\"Traveller\":{\"TravellerId\":" + travelId + ",\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\""+$('#uptra_page .country-btn').eq(1).attr('data-code')+"\",\"CountryName\":\""+$('#uptra_page .country-btn').eq(1).html()+"\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+oBirthday+"\",\"Email\":\"" + input[7].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[6].value + "\"},\"ListTravellerIdInfo\":[{\"Id\":" + id + ",\"TravellerId\":" + travelId + ",\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\""+$('#uptra_page .country-btn').eq(0).attr('data-code')+"\",\"IdActivatedDate\":\""+input[4].value.replace('年','-').replace('月','-').replace('号','').replace('日','')+"\"}]}",
                    "ForeEndType": 3,
                    "Code": "0072"
                };
                console.log(Parameters);
                vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_uptrav);

            }
        }

        upTraveler(upadate_finish);
        //   删除常旅客
        var delTra = $("#delTra")[0];
        function deleteTra(obj) {
            obj.onclick = function () {
                var travelId = array[index];

                jConfirm("确认删除该旅客?","",deletetra); //message, title, callback, okstr, escstr
                function deletetra(argue){
                     if(argue==true){
                         var Parameters = {
                             "Parameters": "{\"travellerId\":" +travelId+ "}",
                             "ForeEndType": 3,
                             "Code": "0073"
                         };
                         //console.log(Parameters);
                         vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_deltrav);

                     }
                }
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
        travJson = ret;
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
                    var idtype_num=travJson.data[i].listTravellerIdInfo.length;
                    if(idtype_num == 0)
                    {
                        array[i] = '';
                        arrayId[i] = '';
                        $('#country-name').html('');
                    }
                    else
                    {
                        array[i] = travJson.data[i].listTravellerIdInfo[0].travellerId;
                        arrayId[i] = travJson.data[i].listTravellerIdInfo[0].id;
                        var oCountryName=getCountryName(travJson.data[i].listTravellerIdInfo[0].idCountry)
                        if(oCountryName == undefined)
                        {
                            $('#country-name').html();
                        }
                        else
                        {
                            $('#country-name').html(oCountryName.CountryName);
                        }

                    }

                    var li = document.createElement("li");
                    li.className = "eve-traveler";
                    //给li添加自定义属性
                    li.setAttribute('idtype',array[i]);
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
                    if(travJson.data[i].listTravellerIdInfo.length != 0)
                    {
                        if (travJson.data[i].listTravellerIdInfo[0].idType == "1") {
                            ul_li2.innerHTML = "身份证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "2") {
                            ul_li2.innerHTML = "护照" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "3") {
                            ul_li2.innerHTML = "港澳通行证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "4") {
                            ul_li2.innerHTML = "军官证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "5") {
                            ul_li2.innerHTML = "驾驶证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "6") {
                            ul_li2.innerHTML = "台胞证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "7") {
                            ul_li2.innerHTML = "回乡证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        }
                        else if (travJson.data[i].listTravellerIdInfo[0].idType == "9") {
                            ul_li2.innerHTML = "出生证明" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        }
                        else {
                            ul_li2.innerHTML = "其他" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        }
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
        var myJson = ret;
        //console.log(myJson);
        if (myJson.success) {
            document.getElementById("addForm").submit();

        } else {
            alert(myJson.message);
        }
    }

    function mycallback_deltrav(ret) {
        var myJson = ret;
        console.log(myJson);
        if (myJson.success) {
            window.location.href = "user-oftenInfo.html";
        } else {
            alert(myJson.message);
        }
    }

    function mycallback_uptrav(ret) {
        var myJson = ret;
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

        var telCode=getTelCode(travJson.data[index].traveller.countryCode);
        if(telCode == undefined)
        {
            $('#uptra_page .phone-pre').html('+86');
        }else{
            $('#uptra_page .phone-pre').html('+'+telCode.TelCode);
        }
        $('#uptra_page .country-btn').eq(0).attr('data-code',travJson.data[index].listTravellerIdInfo[0].idCountry)
        if(travJson.data[index].listTravellerIdInfo.length != 0)
        {
            input[3].value = travJson.data[index].listTravellerIdInfo[0].idNumber;
            input[4].value = travJson.data[index].listTravellerIdInfo[0].idActivatedDate.substring(0,10).replace('-','年').replace('-','月')+'号';
            if (travJson.data[index].listTravellerIdInfo[0].idType == "1") {
                cardType.innerHTML = "身份证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "2") {
                cardType.innerHTML = "护照";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "3") {
                cardType.innerHTML = "港澳通行证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "4") {
                cardType.innerHTML = "军官证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "5") {
                cardType.innerHTML = "驾驶证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "6") {
                cardType.innerHTML = "台胞证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "7") {
                cardType.innerHTML = "回乡证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "9") {
                cardType.innerHTML = "出生证明";
            } else {
                cardType.innerHTML = "其他";
            }
        }
        input[5].value = travJson.data[index].traveller.dateOfBirth.substring(0,10).replace('-','年').replace('-','月')+'号';
        input[6].value = travJson.data[index].traveller.mobilePhone;
        input[7].value = travJson.data[index].traveller.email;
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

    //新增常旅
    var myDate1 = new Scroller({id: "birth-cont", type:"birth",cont:"uuun1"});
    var myDate2 = new Scroller({id: "time-cont", type:"validity",cont:"uuun2"});
    var myDate2 = new Scroller({id: "postCard", type:"card",cont:"uuu"});
    //编辑常旅
    var myDate3 = new Scroller({id: "birth-cont-edit", type:"birth",cont:"eee1"});
    var myDate3 = new Scroller({id: "time-cont-edit", type:"validity",cont:"eee2"});
    var myDate3 = new Scroller({id: "cardType", type:"card",cont:"eee3"});
    //个人信息修改页生日
    var myDate4 = new Scroller({id: "birth-cont-per", type:"birth",cont:"ppp"});

    $('#cardType').on('click',function(){
        alert(1);
    })
});


