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
    var update_quit = $("#update_quit")[0];
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
        vlm.loadJson("", JSON.stringify(Parameters), mycallback);

        var addtra_page = $("#addtra_page")[0];
        var addUser = $("#addUser")[0];
        var add_quit = $("#add_quit")[0];
        var uptra_page = $("#uptra_page")[0];
        var fillName_page = $("#fillName_page")[0];

        $('#addUser').click(function(){
            if($('.eve-traveler').length >= 50)
            {
                jAlert('超过常旅客人数上限，请删除一些再添加吧!');
                return;
            }
            $('#addtra_page').show();
        });

        //   增加常旅客
        var add_finish = $("#add_finish")[0];
        function addTraveler(obj) {
            obj.onclick = function () {
                var input = document.getElementById("addForm").getElementsByTagName("input");
                var postCard = document.getElementById("postCard").innerHTML;
                var cardId;
                //中文姓名验证
                var sChiName=input[0].value;
                if( ! vlm.Utils.validate.chiName(sChiName))
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
                if (postCard == "护照") {
                    cardId = "1";
                } else if (postCard == "身份证") {
                    cardId = "2";
                } else if (postCard == "出生证明") {
                    cardId = "3";
                } else if (postCard == "港澳通行证") {
                    cardId = "4";
                } else if (postCard == "军官证") {
                    cardId = "5";
                } else if (postCard == "驾驶证") {
                    cardId = "6";
                } else if (postCard == "台胞证") {
                    cardId = "7";
                } else if (postCard == "回乡证") {
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

                //证件有效期验证
                var card_validity=$('#time-cont').html();
                if(card_validity == ''){
                  jAlert('请选择有效的证件有效期');
                  return;
                }else if( ! vlm.Utils.compareTime(card_validity)){
                  jAlert('证件有效期无效，请重新选择!');
                  return;
                }

                //  判断性别
                var man = $("#man")[0];
                var woman = $("#woman")[0];
                var sexCode;
                var sexName;
                if (man.className == "icon_h traveler_sex1") {
                    sexCode = "Mr";
                    sexName = "男";
                }else if(woman.className == "icon_h traveler_sex1") {
                    sexCode = "Mrs";
                    sexName = "女";
                }else{
                  jAlert('请选择性别!');
                  return;
                }
                // 手机号邮箱检验

                $('#mobile-cell-add')[0].value=$('#mobile-cell-add')[0].value.replace(/^\s*/,'');
                var oMobile = $('#mobile-cell-add')[0].value;
                $('#email-cell-add')[0].value=$('#email-cell-add')[0].value.replace(/^\s*/,'');

                var oEmail = $('#email-cell-add')[0].value;

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
                    "Parameters": "{\"Traveller\":{\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\""+$('#addtra_page .country-btn').eq(1).attr('data-code')+"\",\"CountryName\":\""+$('#addtra_page .country-btn').eq(1).html()+"\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+$('#birth-cont').html()+"\",\"Email\":\"" + input[5].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[4].value + "\"},\"ListTravellerIdInfo\":[{\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\""+$('#addtra_page .country-btn').eq(0).attr('data-code')+"\",\"IdActivatedDate\":\""+$('#time-cont').html()+"\"}]}",
                    "ForeEndType": 3,
                    "Code": "0071"
                };


                console.log(Parameters);
                vlm.loadJson("", JSON.stringify(Parameters), mycallback_addtrav);
            }
            //新增常旅取消按钮提示
            var input = document.getElementById("addForm").getElementsByTagName("input");
            add_quit.onclick=function(){
                for(var i=0;i<4; i++)
                {
                    if(input[i].value !='')
                    {
                        jConfirm("当前编辑的内容未保存，确定退出编辑?","",conAdd);
                        return;
                    }
                }
                if($('#postCard').html() != '护照' || $('#time-cont').html() != '' || $('#birth-cont').html() != '1990-01-01' || $('.country-btn').eq(0).html() != '中国' || $('.country-btn').eq(1).html() != '中国' || input[4].value !='' || input[5].value !='' || $('#woman').attr('class') == 'icon-h traveler-sex1'){
                    jConfirm("当前编辑的内容未保存，确定退出编辑?","",conAdd);
                    return;
                }

                addtra_page.style.display='none';
            };
            function conAdd(arg){
                if(arg == true)
                {

                    for(var i=0;i<input.length; i++)
                    {
                        input[i].value='';
                    }
                    $('#time-cont').html('');
                    $('#birth-cont').html('1990-01-01');
                    $('.country-btn').html('中国');
                    $('.country-btn').attr('data-code','CN');
                    $('.country-btn').attr('data-tel-code','86');
                    $('#man').attr('class','icon-h traveler-sex1');
                    $('#woman').attr('class','icon-h traveler-sex2');
                    addtra_page.style.display='none';
                    $('#content-wrap').css('visibility','visible');
                }
            }
        }
        addTraveler(add_finish);

        //   编辑常旅客
        var upadate_finish = $("#upadate_finish")[0];
        function upTraveler(obj) {
            obj.onclick = function () {
                $('#preloader').remove();
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
                if( ! vlm.Utils.validate.chiName(sChiName))
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

                //证件有效期验证
                var card_validity=$('#time-cont-edit').html();
                if(card_validity == ''){
                  jAlert('请选择有效的证件有效期');
                  return;
                }else if( ! vlm.Utils.compareTime(card_validity)){
                  jAlert('证件有效期无效，请重新选择!');
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
                if (cardType == "护照") {
                    cardId = "1";
                } else if (cardType == "身份证") {
                    cardId = "2";
                } else if (cardType == "出生证明") {
                    cardId = "3";
                } else if (cardType == "港澳通行证") {
                    cardId = "4";
                } else if (cardType == "军官证") {
                    cardId = "5";
                } else if (cardType == "驾驶证") {
                    cardId = "6";
                } else if (cardType == "台胞证") {
                    cardId = "7";
                }  else if (cardType == "回乡证") {
                    cardId = "9";
                }
                else {
                    cardId = "10";
                }


                // 手机号邮箱检验

                $('#mobile-cell')[0].value=$('#mobile-cell')[0].value.replace(/^\s*/,'');
                var oMobile = $('#mobile-cell')[0].value;
                $('#email-cell')[0].value=$('#email-cell')[0].value.replace(/^\s*/,'');

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
                    "Parameters": "{\"Traveller\":{\"TravellerId\":" + travelId + ",\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\""+$('#uptra_page .country-btn').eq(1).attr('data-code')+"\",\"CountryName\":\""+$('#uptra_page .country-btn').eq(1).html()+"\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\""+$('#birth-cont-edit').html()+"\",\"Email\":\"" + input[5].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[4].value + "\"},\"ListTravellerIdInfo\":[{\"Id\":" + id + ",\"TravellerId\":" + travelId + ",\"IdType\":"+cardId+",\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\""+$('#uptra_page .country-btn').eq(0).attr('data-code')+"\",\"IdActivatedDate\":\""+$('#time-cont-edit').html()+"\"}]}",
                    "ForeEndType": 3,
                    "Code": "0072"
                };
                console.log(Parameters);
                vlm.loadJson("", JSON.stringify(Parameters), mycallback_uptrav);

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
                         vlm.loadJson("", JSON.stringify(Parameters), mycallback_deltrav);

                     }
                }
            }
        }
        deleteTra(delTra);
    });

    //性别
    var aSel = document.querySelectorAll('.sex_cho_wrap');
    for (var i = 0; i < aSel.length; i++) {
        (function (index) {
            var aSpan = aSel[index].querySelectorAll('b');
            for (j = 0; j < aSpan.length; j++) {
                aSpan[j].onclick = function () {
                    for (i = 0; i < aSpan.length; i++) {
                        aSpan[i].className = 'icon_h traveler_sex2';
                    }
                    this.className = 'icon_h traveler_sex1';
                }
            }
        })(i);
    }

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
                UL.className = "often_traveler";

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
                        var oCountryName=getCountryName(travJson.data[i].listTravellerIdInfo[0].idCountry);
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
                    li.className = "eve_traveler";
                    //给li添加自定义属性
                    li.setAttribute('idtype',array[i]);
                    var b = document.createElement("b");
                    b.className = "user_edits";
                    b.style.marginTop = li.clientHeight + '.4rem';
                    li.appendChild(b);
                    var ul = document.createElement("ul");
                    ul.className = "often_user";
                    var ul_li1 = document.createElement("li");
                    ul_li1.innerHTML = travJson.data[i].traveller.idName + travJson.data[i].traveller.lastName + "/" + travJson.data[i].traveller.firstName;
                    ul.appendChild(ul_li1);
                    b.parentNode.addEventListener("click", updateTra);
                    var ul_li2 = document.createElement("li");
                    if(travJson.data[i].listTravellerIdInfo.length != 0)
                    {
                        if (travJson.data[i].listTravellerIdInfo[0].idType == "1") {
                            ul_li2.innerHTML = "护照" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "2") {
                            ul_li2.innerHTML = "身份证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "3") {
                            ul_li2.innerHTML = "出生证明" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "4") {
                            ul_li2.innerHTML = "港澳通行证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "5") {
                            ul_li2.innerHTML = "军官证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "6") {
                            ul_li2.innerHTML = "驾驶证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        } else if (travJson.data[i].listTravellerIdInfo[0].idType == "7") {
                            ul_li2.innerHTML = "台胞证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
                        }
                        else if (travJson.data[i].listTravellerIdInfo[0].idType == "9") {
                            ul_li2.innerHTML = "回乡证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
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

    //  编辑常旅客页面
    function updateTra(e) {
        if($(e.target).parent().attr('class') == 'often_user' || $(e.target).attr('class') == 'user_edits')
        {
            index=$(e.target).parents('.eve_traveler').attr('index');
        }else{
            index= $(e.target).attr('index');
        }
        var uptra_page = $("#uptra_page")[0];
        uptra_page.style.display = "block";
        var input = document.getElementById("updateForm").getElementsByTagName("input");
        var cardType = $("#cardType")[0];
        var countryName = $("#countryName")[0];
        var man2 = $("#man2")[0];
        var woman2 = $("#woman2")[0];
        var old0,old1,old2,old3,old4,old5,old6,old7,oldcard,oldcName,oldsendName,oldsex;
        //var idtype_num=travJson.data[index].listTravellerIdInfo.length;
        old0=input[0].value = travJson.data[index].traveller.idName;
        old1=input[1].value = travJson.data[index].traveller.lastName;
        old2=input[2].value = travJson.data[index].traveller.firstName;

        var telCode=getTelCode(travJson.data[index].traveller.countryCode);
        if(telCode == undefined)
        {
            $('#uptra_page .phone_pre').html('+86');
        }else{
            $('#uptra_page .phone_pre').html('+'+telCode.TelCode);
        }
        $('#uptra_page .country-btn').eq(0).attr('data-code',travJson.data[index].listTravellerIdInfo[0].idCountry);
        //证件生日有效期缓存函数
        function dueCache(str1){

            var str=str1.split('-');
            if(str[1].charAt(0) == 0 && str[2].charAt(0) == 0){

                str=str[0]+'年-'+str[1].charAt(1)+'月-'+str[2].charAt(1)+'日';
            }else if(str[1].charAt(0) == 0 && str[2].charAt(0) != 0){

                str=str[0]+'年-'+str[1].charAt(1)+'月-'+str[2]+'日';
            }else if(str[1].charAt(0) != 0 && str[2].charAt(0) == 0){

                str=str[0]+'年-'+str[1]+'月-'+str[2].charAt(1)+'日';
            }else{
                str=str[0]+'年-'+str[1]+'月-'+str[2]+'日';
            }
            return str;
        }
        if(travJson.data[index].listTravellerIdInfo.length != 0)
        {
            old3=input[3].value = travJson.data[index].listTravellerIdInfo[0].idNumber;
            old6=$('#time-cont-edit')[0].innerHTML= travJson.data[index].listTravellerIdInfo[0].idActivatedDate.substring(0,10);
            var dateCachedue=travJson.data[index].listTravellerIdInfo[0].idActivatedDate.substring(0,10);

            $('#time-cont-edit')[0].setAttribute('data-cache',dueCache(dateCachedue));
            if (travJson.data[index].listTravellerIdInfo[0].idType == "1") {
                oldcard=cardType.innerHTML = "护照";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "2") {
                oldcard=cardType.innerHTML = "身份证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "3") {
                oldcard=cardType.innerHTML = "出生证明";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "4") {
                oldcard=cardType.innerHTML = "港澳通行证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "5") {
                oldcard=cardType.innerHTML = "军官证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "6") {
                oldcard=cardType.innerHTML = "驾驶证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "7") {
                oldcard=cardType.innerHTML = "台胞证";
            } else if (travJson.data[index].listTravellerIdInfo[0].idType == "9") {
                oldcard=cardType.innerHTML = "回乡证";
            } else {
                oldcard=cardType.innerHTML = "其他";
            }
        }
        //input[5].value = travJson.data[index].traveller.dateOfBirth.substring(0,10).replace('-','年').replace('-','月')+'号';
        old7=$('#birth-cont-edit')[0].innerHTML = travJson.data[index].traveller.dateOfBirth.substring(0,10);
        var dateCacheEdit=travJson.data[index].traveller.dateOfBirth.substring(0,10);

        $('#birth-cont-edit')[0].setAttribute('data-cache',dueCache(dateCacheEdit));
        old4=input[4].value = travJson.data[index].traveller.mobilePhone;
        old5=input[5].value = travJson.data[index].traveller.email;
        oldsex=travJson.data[index].traveller.sexCode;
        //console.log(oldsex);
        oldcName=countryName.innerHTML = travJson.data[index].traveller.countryName;
        var idCountry=travJson.data[index].listTravellerIdInfo[0].idCountry;
        oldsendName=getCountryName(idCountry).CountryName;
        $('#country-name').html(oldsendName);
        if (travJson.data[index].traveller.sexCode == "Mr") {
            man2.className = "icon_h traveler_sex1";
            woman2.className = "icon_h traveler_sex2";
        } else {
            man2.className = "icon_h traveler_sex2";
            woman2.className = "icon_h traveler_sex1";
        }

        //编辑常旅取消按钮提示
        update_quit.onclick=function(){
            var arr=[old0,old1,old2,old3,old4,old5];
            for(var i=0;i<input.length; i++)
            {
                if(arr[i] != input[i].value){
                    jConfirm("当前编辑的内容未保存，确定退出编辑?","",conEdit);
                    return;
                }
            }
            //证件类型、发证国家、国籍、性别
            //console.log(oldsendName +":"+ $('#country-name').html());
            if(old7 != $('#birth-cont-edit')[0].innerHTML || old6 != $('#time-cont-edit')[0].innerHTML || oldcard != $('#cardType').html() || oldsendName != $('#country-name').html() || oldcName != $('#countryName').html() ){
                jConfirm("当前编辑的内容未保存，确定退出编辑?","",conEdit);
                return;
            }

            if(oldsex == 'Mr' && $('#woman2').attr('class') == 'icon-h traveler-sex1' || oldsex == 'Mrs' && $('#woman2').attr('class') == 'icon-h traveler-sex2')
            {
                jConfirm("当前编辑的内容未保存，确定退出编辑?","",conEdit);
                return;
            }
            uptra_page.style.display='none';

        };

        function conEdit(arg){
            if(arg == true)
            {
                $('#content-wrap').css('visibility','visible');
                uptra_page.style.display='none';
            }
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

    //新增常旅
    var myDate1 = new Scroller({id: "birth-cont", type:"birth",cont:"uuun1"});
    var myDate2 = new Scroller({id: "time-cont", type:"validity",cont:"uuun2"});
    var myDate3 = new Scroller({id: "postCard", type:"card",cont:"uuu",callback:cardcallback});
    //编辑常旅
    var myDate4 = new Scroller({id: "birth-cont-edit", type:"birth",cont:"eee1"});
    var myDate5 = new Scroller({id: "time-cont-edit", type:"validity",cont:"eee2"});
    var myDate6 = new Scroller({id: "cardType", type:"card",cont:"eee3",callback:cardcallback});
    //个人信息修改页生日
    var myDate7 = new Scroller({id: "birth-cont-per", type:"birth",cont:"ppp"});

    function cardcallback(){

        if($('.date-selected').html() == '护照')
        {
            function cardnum(){
                if(travJson != undefined){
                  var arr1=travJson.data[index].listTravellerIdInfo;
                  for(var i=0;i<arr1.length; i++)
                  {
                    if(arr1[i].idType == 1)
                    {
                      return arr1[i].idNumber;
                    }
                  }

                }
            }
            var idnumber=cardnum();
            $('.postNum').val(idnumber);

        }else if($('.date-selected').html() == '身份证'){
            function cardnum(){
              if(travJson != undefined) {
                var arr1 = travJson.data[index].listTravellerIdInfo;
                for (var i = 0; i < arr1.length; i++) {
                  if (arr1[i].idType == 2) {
                    return arr1[i].idNumber;
                  }
                }
              }

            }
            var idnumber=cardnum();
            $('.postNum').val(idnumber);
        }

    }

    //姓名说明新增
    $('#anameState').click(function(){
        $('#content-wrap').css('visibility','hidden');
        $('#addtra_page').css('visibility','hidden');
        $('#fillName_page').show();
    })

    $('#closeName').click(function(){
        $('#content-wrap').css('visibility','visible');
        $('#addtra_page').css('visibility','visible');
        $('#fillName_page').hide();
    });

    //编辑
    $('#nameState').click(function(){
        $('#content-wrap').css('visibility','hidden');
        $('#uptra_page').css('visibility','hidden');
        $('#fillName_page').show();
    })

    $('#closeName').click(function(){
        $('#content-wrap').css('visibility','visible');
        $('#uptra_page').css('visibility','visible');
        $('#fillName_page').hide();
    });
});


