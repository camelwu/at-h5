/**
 * Created by Asiatravel on 2015/12/31.
 */
//董振昊js代码
/**
 * Created by changlv on 2015/12/11.
 */

var lsf_myweb={
    "getbyid":function(id){
        return document.getElementById(id);
    },
    "getbytag":function(obj,tag){
        return obj.getElementsByTagName(tag);
    },
    "getbyclass":function(obj,sClass){
        if(obj.getElementsByClassName){
            return obj.getElementsByClassName(sClass);
        }else{
            var aResult=[];
            var aEle=obj.getElementsByTagName('*');
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            for(var i=0;i<aEle.length;i++){
                if(aEle[i].className.search(reg)!=-1){
                    aResult.push(aEle[i]);
                }
            }
            return aResult;
        }
    },
    "bind":function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
    },
    "stopPropagation":function(event){
        var oEvent=ev||event;
        oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    },
    "pageY":function(node){
        if(node.offsetParent){
            return node.offsetTop+lsf_myweb.pageY(node.offsetParent);
        }else{
            return node.offsetTop;
        }
    },
    "pageX":function(node){
        if(node.offsetParent){
            return node.offsetLeft+lsf_myweb.pageX(node.offsetParent);
        }else{
            return node.offsetLeft;
        }
    },
    "getStyle":function(obj,sName){
        return (obj.currentStyle?obj.currentStyle:getComputedStyle(obj,false))[sName];
    },
    "setStyle":function(){
        if(arguments.length==2){
            for(var name in arguments[1]){
                arguments[0].style[arguments[1][name]]=arguments[1][name];
            }
        }else{
            arguments[0].style[arguments[1]]=arguments[2];
        }
    }
};
//网页还原用户上一次选择内容
var hotelStorage=JSON.parse(localStorage.getItem('hotelStorage12345'));
console.log(hotelStorage);
if(hotelStorage){
    lsf_myweb.getbyid('input1').value=hotelStorage.InterDes;
    lsf_myweb.getbyid('count1').value=hotelStorage.NumRoom;
    lsf_myweb.getbyid('count2').value=hotelStorage.NumAdult;
    lsf_myweb.getbyid('count3').value=hotelStorage.NumChild;
    lsf_myweb.getbyid('input2').value=hotelStorage.DomDes;
    //lsf_myweb.getbyid('InterHotelname').value=hotelStorage.InterHotelName;
    //已去掉城市模糊搜索
    //lsf_myweb.getbyid('DomHotelName').value=hotelStorage.DomHotelName;
}





//国际国内切换实现滑动效果
var owlQuoteSlider = $(".quote-slider");

owlQuoteSlider.owlCarousel({
    items:1,
      
});
owlQuoteSlider.on('changed.owl.carousel', function(event) {
    countryChange();
});
function countryChange(){
    var Inter=document.getElementById('Inter');
    var Dom=document.getElementById('Dom');

    if(Dom.className=='on'){
        Dom.className='';
        Inter.className='on';
    }else{
        Dom.className='on';
        Inter.className='';
    }
}
$("#Dom").click(function() {
        owlQuoteSlider.trigger('next.owl.carousel');
        return false;
});
$("#Inter").click(function() {
        owlQuoteSlider.trigger('prev.owl.carousel');
        return false;
});





//董振昊代码
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
//预加载的图片
$(window).load(function () {
    $("#status-h").fadeOut();
    $("#preloader").delay(400).fadeOut("medium");
});
//房间数/人数/儿童数按钮事件
var ho_i1=document.getElementById('ho_i1');
var ho_i2=document.getElementById('ho_i2');
var ho_i3=document.getElementById('ho_i3');
var ho_i4=document.getElementById('ho_i4');
var ho_i7=document.getElementById('ho_i7');
var ho_i6=document.getElementById('ho_i6');
function oUp(obj1,obj2,start,end){
    lsf_myweb.bind(obj1,'click',function(ev){
        var oEvent=ev||event;
        oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
        if(parseInt(this.parentNode.children[0].value)<end){
            this.parentNode.children[0].value++;
        }
        if( parseInt(this.parentNode.children[0].value)<end){
            if(parseInt(this.parentNode.children[0].value)>start){
                obj2.style.background='url("../images/hotelbtn.png") 0 0 no-repeat';
                obj2.style.backgroundSize='23px 150px';
            }
        }else{
            this.style.background='url("../images/hotelbtn.png") 0 -84px no-repeat';
            this.style.backgroundSize='23px 150px';
        }
    });
};
function oDown(obj1,obj2,start,end){
    lsf_myweb.bind(obj1,'click',function(ev){
        var oEvent=ev||event;
        oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
        if(parseInt(this.parentNode.children[0].value)>start){
            //console.log(parseInt(this.parentNode.children[0].value));
            this.parentNode.children[0].value--;
        }
        if(parseInt(this.parentNode.children[0].value)>start){
            if(parseInt(this.parentNode.children[0].value)<end){
                obj2.style.background='url("../images/hotelbtn.png") 0 -56px no-repeat';
                obj2.style.backgroundSize='23px 150px';
            }
        }else{
            this.style.background='url("../images/hotelbtn.png") 0 -28px no-repeat';
            this.style.backgroundSize='23px 150px';
        }
    });
}
oUp(ho_i1,ho_i2,1,10);
oDown(ho_i2,ho_i1,1,10);
oUp(ho_i7,ho_i6,1,100000);
oDown(ho_i6,ho_i7,1,100000);
oUp(ho_i3,ho_i4,0,100000);
oDown(ho_i4,ho_i3,0,100000);
//lsf_myweb.bind(lsf_myweb.getbyid('room'),'click',function(){
//    lsf_myweb.getbyid('count1').focus();
//});
//lsf_myweb.bind(lsf_myweb.getbyid('nav4-centertop'),'click',function(){
//    lsf_myweb.getbyid('count2').focus();
//});
//lsf_myweb.bind(lsf_myweb.getbyid('nav4-centerbottom'),'click',function(){
//    lsf_myweb.getbyid('count3').focus();
//});


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
    //董振昊js代码结束

//刘少飞js代码


function inpChange(id,myText){
    var oInp=document.getElementById(id);
    if(oInp.value!=myText){
        oInp.style.color='#484848';
    }else{
        oInp.style.color='#d1d1d1';
    }
    oInp.onfocus=function(){
        if(this.value==myText){
            this.value='';
            this.style.color='#484848';
        }
    };
    oInp.onblur=function(){
        if(!this.value){
            this.value='酒店名/位置';
            this.style.color='#d1d1d1';
        }
    };
}
//酒店输入框
//已去掉城市模糊搜索
//inpChange('InterHotelname','酒店名/位置');
//inpChange('DomHotelName','酒店名/位置');
(function(){
    var hoPos='';
//目的地输入框去掉光标
    var address_broad=document.getElementById('input1');
    var address_demosic=document.getElementById('input2');
    lsf_myweb.bind(address_broad,'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(address_demosic,'focus',function(){
        this.blur();
    });
    //日期日历去掉光标
    lsf_myweb.bind(lsf_myweb.getbyid('CheckInDate'),'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(lsf_myweb.getbyid('CheckOutDate'),'focus',function(){
        this.blur();
    });
    //房间数，成人，儿童书去掉光标
    lsf_myweb.bind(lsf_myweb.getbyid('count1'),'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(lsf_myweb.getbyid('count2'),'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(lsf_myweb.getbyid('count3'),'focus',function(){
        this.blur();
    });
    //日历
    function n2c(num){
        switch (parseInt(num)){
            case 1:
                return '一';
                break;
            case 2:
                return '二';
                break;
            case 3:
                return '三';
                break;
            case 4:
                return '四';
                break;
            case 5:
                return '五';
                break;
            case 6:
                return '六';
                break;
            case 0:
                return '日';
                break;
        };
    }
    function toDou(num){
        return num<10?'0'+num:''+num;
    }
    //var cdDate=lsf_myweb.getbyid('cd_date');
    //返回按钮
    var ho_back=document.getElementById('ho_back');
    ho_back.onclick=function(){
        window.history.go(-1);
    };
    //城市列表
    var dataCN=[];
    var dataIN=[];
    var dataWorCN={};
    var dataWorIN={};
    function cityList(){
        var domestic_target_place=document.getElementById('arr2');
        var domestic_target_city=document.getElementById('input2');
        var abroad_target_place=document.getElementById('arr1');
        var abroad_target_city=document.getElementById('input1');
        var api='http://10.2.22.239:8888/api/GetServiceApiResult';
        var cl_box_box=document.getElementById('cl_box_box');
        var cl_back=document.getElementById('cl_back');
        var domHotData= {
            "Parameters": "",
            "ForeEndType": 3,
            "Code": "0082"
        };
        var interHotData= {
            "Parameters": "",
            "ForeEndType": 3,
            "Code": "0081"
        };
        var cityListData={
            "Code": "0083",
            "Parameters": "",
            "ForeEndType": 1
        };

        var domBok=true;
        var interBok=true;
        //城市列表
        vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(cityListData), function(d){
            var listJson=eval('('+d+')');
            if(!listJson.success){
                alert(listJson.message);
                return;
            }
            window.localStorage.setItem('cityListInfo',JSON.stringify(listJson.data));
            //城市列表
            function sortBy(json){
                var data=json.data;
                data.sort(function(data1,data2){
                    return data1.pingYin.charCodeAt(0)-data2.pingYin.charCodeAt(0);
                });
                for(var i=0;i<data.length;i++){
                    if(data[i].countryName=='China'){
                        dataCN.push(data[i]);
                    }else{
                        dataIN.push(data[i]);
                    }
                }
                for(var i=0;i<dataCN.length;i++){
                    if(dataWorCN[dataCN[i].pingYin.substring(0,1).toUpperCase()] instanceof Array){
                        dataWorCN[dataCN[i].pingYin.substring(0,1).toUpperCase()].push(dataCN[i]);
                    }else{
                        dataWorCN[dataCN[i].pingYin.substring(0,1).toUpperCase()]=[];
                        dataWorCN[dataCN[i].pingYin.substring(0,1).toUpperCase()].push(dataCN[i]);
                    }
                }
                for(var i=0;i<dataIN.length;i++){
                    if(dataWorIN[dataIN[i].pingYin.substring(0,1).toUpperCase()] instanceof Array){
                        dataWorIN[dataIN[i].pingYin.substring(0,1).toUpperCase()].push(dataIN[i]);
                    }else{
                        dataWorIN[dataIN[i].pingYin.substring(0,1).toUpperCase()]=[];
                        dataWorIN[dataIN[i].pingYin.substring(0,1).toUpperCase()].push(dataIN[i]);
                    }
                }
            }
            console.log(listJson);
            console.log(33333333333333333);
            sortBy(listJson);
            console.log(dataWorCN);
            console.log(dataWorIN);
        });
        function cityShow(oData,cityJson,obj){
            //热门城市
            cl_box_box.style.display='block';
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(oData), function(d){
                var json=eval('('+d+')');
                var str = template("cl_citysHot",json.data);
                $("#cl_citysHot").html(str);
            });
            //历史选择
            var cityHisArr=[];
            var cl_citysHis=document.getElementById('cl_citysHis');
            var searchCity=document.getElementById('searchCity');
            var citySearchBox=document.getElementById('citySearchBox');
            var cl_citysHisStr='';

            //输入框输入内容事件
            citySearchBox.onchange=function(){
                obj.value=citySearchBox.value;
                cl_box_box.style.display='none';
            };
            if(obj.getAttribute('id')=='input1'){
                citySearchBox.setAttribute('placeholder','新加坡');  //判断国际国内酒店改变placeholder
                var cityListHis=window.localStorage.getItem('interCityName');
                if(cityListHis){
                    cityHisArr=cityListHis.split(',');
                    cityHisArr.shift();
                }
                for(var i=0;i<dataIN.length;i++){
                    searchCity.innerHTML+='<option value="'+dataIN[i].cityNameCN+'('+dataIN[i].cityNameEN+')'+'"></option>';
                }
            }else if(obj.getAttribute('id')=='input2'){
                citySearchBox.setAttribute('placeholder','北京/beijing/bj/bjs/中国');  //判断国际国内酒店改变placeholder
                var cityListHis=window.localStorage.getItem('domCityName');
                if(cityListHis){
                    cityHisArr=cityListHis.split(',');
                    cityHisArr.shift();
                }
                for(var i=0;i<dataCN.length;i++){
                    searchCity.innerHTML+='<option value="'+dataCN[i].cityNameCN+'"></option>';
                }
            }
            //历史选择数组去重
            var json={};
            for(var i=0;i<cityHisArr.length;i++){
                if(cityHisArr[i]){
                    json[cityHisArr[i]]=1;
                }
            }
            cityHisArr=[];
            for(var name in json){
                cityHisArr.push(name);
            }
            //把历史城市生成页面
            cl_citysHis.innerHTML='';
            for(var i=0;i<cityHisArr.length;i++){
                cl_citysHisStr+='<li>'+cityHisArr[i]+'</li>';
            }
            cl_citysHis.innerHTML=cl_citysHisStr;

            //字母城市
            var strA=template("A",cityJson.A);
            $("#A").html(strA);
            var strB=template("B",cityJson.B);
            $("#B").html(strB);
            var strC=template("C",cityJson.C);
            $("#C").html(strC);
            var strD=template("D",cityJson.D);
            $("#D").html(strD);
            var strE=template("E",cityJson.E);
            $("#E").html(strE);
            var strF=template("F",cityJson.F);
            $("#F").html(strF);
            var strG=template("G",cityJson.G);
            $("#G").html(strG);
            var strH=template("H",cityJson.H);
            $("#H").html(strH);
            var strI=template("I",cityJson.I);
            $("#I").html(strI);
            var strJ=template("J",cityJson.J);
            $("#J").html(strJ);
            var strK=template("K",cityJson.K);
            $("#K").html(strK);
            var strL=template("L",cityJson.L);
            $("#L").html(strL);
            var strM=template("M",cityJson.M);
            $("#M").html(strM);
            var strN=template("N",cityJson.N);
            $("#N").html(strN);
            var strO=template("O",cityJson.O);
            $("#O").html(strO);
            var strP=template("P",cityJson.P);
            $("#P").html(strP);
            var strQ=template("Q",cityJson.Q);
            $("#Q").html(strQ);
            var strR=template("R",cityJson.R);
            $("#R").html(strR);
            var strS=template("S",cityJson.S);
            $("#S").html(strS);
            var strT=template("T",cityJson.T);
            $("#T").html(strT);
            var strU=template("U",cityJson.U);
            $("#U").html(strU);
            var strV=template("V",cityJson.V);
            $("#V").html(strV);
            var strW=template("W",cityJson.W);
            $("#W").html(strW);
            var strX=template("X",cityJson.X);
            $("#X").html(strX);
            var strY=template("Y",cityJson.Y);
            $("#Y").html(strY);
            var strZ=template("Z",cityJson.Z);
            $("#Z").html(strZ);
            function cityClick(parentId){
                var oParent=document.getElementById(parentId);
                var aLi=oParent.children;
                oParent.onclick=function(ev){
                    var oEvent=ev||event;
                    var oSrc=oEvent.srcElement||oEvent.target;
                    if(oSrc.tagName=='LI'){
                        var aSelected=lsf_myweb.getbyclass(cl_box_box,'selected');
                        for(var i=0;i<aSelected.length;i++){
                            aSelected[i].className='';
                        }
                        oSrc.className='selected';
                        cl_box_box.style.display='none';
                        obj.value=oSrc.innerHTML;

                        if(obj.getAttribute('id')=='input1'){
                            var cityNameStr=window.localStorage.getItem('interCityName');
                            if(!cityNameStr){
                                cityNameStr='';
                            }
                            cityNameStr+=','+oSrc.innerHTML;
                            window.localStorage.setItem('interCityName',cityNameStr);
                        }else if(obj.getAttribute('id')=='input2'){
                            var cityNameStr=window.localStorage.getItem('domCityName');
                            if(!cityNameStr){
                                cityNameStr='';
                            }
                            cityNameStr+=','+oSrc.innerHTML;
                            window.localStorage.setItem('domCityName',cityNameStr);
                        }
                    }
                };
            }
            cityClick('cl_citysHis');
            cityClick('cl_citysHot');
            cityClick('A');
            cityClick('B');
            cityClick('C');
            cityClick('D');
            cityClick('E');
            cityClick('F');
            cityClick('G');
            cityClick('H');
            cityClick('I');
            cityClick('J');
            cityClick('K');
            cityClick('L');
            cityClick('M');
            cityClick('N');
            cityClick('O');
            cityClick('P');
            cityClick('Q');
            cityClick('R');
            cityClick('S');
            cityClick('T');
            cityClick('U');
            cityClick('V');
            cityClick('W');
            cityClick('X');
            cityClick('Y');
            cityClick('Z');
            var lsf_city_list=document.getElementById('lsf_city_list');
            var cityListWord=lsf_city_list.children;
            for(var i=0;i<cityListWord.length;i++){
                var oUl=cityListWord[i].getElementsByTagName('ul')[0];
                var oDiv=cityListWord[i].getElementsByTagName('div')[0];
                if(oUl.children.length==1&&oUl.children[0].innerHTML==''){
                    cityListWord[i].style.display='none';
                }else{
                    cityListWord[i].style.display='block';
                }
            }
        }
        //国际城市
        lsf_myweb.bind(abroad_target_city,'click',function(){
            if(domBok&&interBok){
                cityShow(interHotData,dataWorIN,abroad_target_city);
            }else if(!domBok&&interBok){
                cl_box_box.innerHTML='<div class="cl_box">'+
                    '<div class="header" id="vlm-login">'+
                    '<div class="cl_search">'+
                    '<input type="text" placeholder="北京/beijing/bj/bjs/中国" list="searchCity" id="citySearchBox" />'+
                    '<datalist id="searchCity">'+
                    '</datalist>'+
                    '<i></i>'+
                    '</div>'+
                    '<a href="javascript:;" class="icons header-back" id="cl_back"></a>'+
                    '</div>'+
                    '<div class="cl_curr cl_con"  >'+
                    '<a name="cl_curr" class="cl_on">&nbsp;</a>'+
                '<div>当前</div>'+
                '<ul>'+
                '<li class="fl beijing">北京</li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="cl_con ">'+
                    '<a name="cl_hot" class="cl_on">&nbsp;</a>'+
                '<div>历史选择</div>'+
                '<ul class="cl_citysHis" id="cl_citysHis">'+
                    '</ul>'+
                    '</div>'+
                    '<div class="cl_con ">'+
                    '<a name="cl_hot" class="cl_on">&nbsp;</a>'+
                '<div>热门城市</div>'+
                '<ul class="cl_citysHot" id="cl_citysHot">'+
                '<li>{%=cityChineseName%}</li>'+
                '</ul>'+
                '</div>'+
                '<div class="cityWordBox" id="cityWordBox">'+
                    '<div class="cityWord">'+
                    '<div><a href="#cl_curr">当前</a></div>'+
                    '<div><a href="#cl_hot">热门</a></div>'+
                    '<ul class="cl_word" id="cl_side">'+
                    '<li><a href="#a">A</a></li>'+
                '<li><a href="#b">B</a></li>'+
                '<li><a href="#c">C</a></li>'+
                '<li><a href="#d">D</a></li>'+
                '<li><a href="#e">E</a></li>'+
                '<li><a href="#f">F</a></li>'+
                '<li><a href="#g">G</a></li>'+
                '<li><a href="#h">H</a></li>'+
                '<li><a href="#i">I</a></li>'+
                '<li><a href="#j">J</a></li>'+
                '<li><a href="#k">K</a></li>'+
                '<li><a href="#l">L</a></li>'+
                '<li><a href="#m">M</a></li>'+
                '<li><a href="#n">N</a></li>'+
                '<li><a href="#o">O</a></li>'+
                '<li><a href="#p">P</a></li>'+
                '<li><a href="#q">Q</a></li>'+
                '<li><a href="#r">R</a></li>'+
                '<li><a href="#s">S</a></li>'+
                '<li><a href="#t">T</a></li>'+
                '<li><a href="#u">U</a></li>'+
                '<li><a href="#v">V</a></li>'+
                '<li><a href="#w">W</a></li>'+
                '<li><a href="#x">X</a></li>'+
                '<li><a href="#y">Y</a></li>'+
                '<li><a href="#z">Z</a></li>'+
                '</ul>'+
                '</div>'+
                '</div>'+
                '<ol id="lsf_city_list" class="lsf_city_list">'+
                    '<li class="cl_con ">'+
                    '<a name="a" class="cl_on">&nbsp;</a>'+
                '<div>A</div>'+
                '<ul id="A">'+
                '<li>{%=cityNameCN%}</li>'+
           '</ul>'+
            '</li>'+
            '<li class="cl_con ">'+
            '<a name="b" class="cl_on">&nbsp;</a>'+
       '<div>B</div>'+
        '<ul id="B">'+
        '<li>{%=cityNameCN%}</li>'+
    '</ul>'+
    '</li>'+
    '<li class="cl_con ">'+
        '<a name="c" class="cl_on">&nbsp;</a>'+
    '<div>C</div>'+
    '<ul id="C">'+
    '<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="d" class="cl_on">&nbsp;</a>'+
'<div>D</div>'+
'<ul id="D">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="e" class="cl_on">&nbsp;</a>'+
'<div>E</div>'+
'<ul id="E">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="f" class="cl_on">&nbsp;</a>'+
'<div>F</div>'+
'<ul id="F">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="g" class="cl_on">&nbsp;</a>'+
'<div>G</div>'+
'<ul id="G">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="h" class="cl_on">&nbsp;</a>'+
'<div>H</div>'+
'<ul id="H">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="i" class="cl_on">&nbsp;</a>'+
'<div>I</div>'+
'<ul id="I">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="j" class="cl_on">&nbsp;</a>'+
'<div>J</div>'+
'<ul id="J">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="k" class="cl_on">&nbsp;</a>'+
'<div>K</div>'+
'<ul id="K">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="l" class="cl_on">&nbsp;</a>'+
'<div>L</div>'+
'<ul id="L">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="m" class="cl_on">&nbsp;</a>'+
'<div>M</div>'+
'<ul id="M">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="n" class="cl_on">&nbsp;</a>'+
'<div>N</div>'+
'<ul id="N">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="o" class="cl_on">&nbsp;</a>'+
'<div>O</div>'+
'<ul id="O">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con ">'+
    '<a name="p" class="cl_on">&nbsp;</a>'+
'<div>P</div>'+
'<ul id="P">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="q" class="cl_on">&nbsp;</a>'+
'<div>Q</div>'+
'<ul id="Q">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="r" class="cl_on">&nbsp;</a>'+
'<div>R</div>'+
'<ul id="R">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="s" class="cl_on">&nbsp;</a>'+
'<div>S</div>'+
'<ul id="S">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="t" class="cl_on">&nbsp;</a>'+
'<div>T</div>'+
'<ul id="T">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="u" class="cl_on">&nbsp;</a>'+
'<div>U</div>'+
'<ul id="U">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="v" class="cl_on">&nbsp;</a>'+
'<div>V</div>'+
'<ul id="V">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="w" class="cl_on">&nbsp;</a>'+
'<div>W</div>'+
'<ul id="W">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="x" class="cl_on">&nbsp;</a>'+
'<div>X</div>'+
'<ul id="X">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="y" class="cl_on">&nbsp;</a>'+
'<div>Y</div>'+
'<ul id="Y">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'<li class="cl_con">'+
    '<a name="z" class="cl_on">&nbsp;</a>'+
'<div>Z</div>'+
'<ul id="Z">'+
'<li>{%=cityNameCN%}</li>'+
'</ul>'+
'</li>'+
'</ol>'+
'</div>';
                cl_back=document.getElementById('cl_back');
                lsf_myweb.bind(cl_back,'click',function(){
                    var arr1=document.getElementById('arr1');
                    var arr2=document.getElementById('arr2');
                    var inter=arr1.parentNode.parentNode;
                    var dom=arr2.parentNode.parentNode;
                    cl_box_box.style.display='none';
                });
                cityShow(interHotData,dataWorIN,abroad_target_city);
            }else{
                cl_box_box.style.display='block';
            }
            interBok=false;
            domBok=true;
        });
        //国内城市
        lsf_myweb.bind(domestic_target_city,'click',function(){
            if(interBok&&domBok){
                cityShow(domHotData,dataWorCN,domestic_target_city);
            }else if(!interBok&&domBok){
                cl_box_box.innerHTML='<div class="cl_box">'+
                    '<div class="header" id="vlm-login">'+
                    '<div class="cl_search">'+
                    '<input type="text" placeholder="北京/beijing/bj/bjs/中国" list="searchCity" id="citySearchBox" />'+
                    '<datalist id="searchCity">'+
                    '</datalist>'+
                    '<i></i>'+
                    '</div>'+
                    '<a href="javascript:;" class="icons header-back" id="cl_back"></a>'+
                    '</div>'+
                    '<div class="cl_curr cl_con"  >'+
                    '<a name="cl_curr" class="cl_on">&nbsp;</a>'+
                    '<div>当前</div>'+
                    '<ul>'+
                    '<li class="fl beijing">北京</li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="cl_con ">'+
                    '<a name="cl_hot" class="cl_on">&nbsp;</a>'+
                    '<div>历史选择</div>'+
                    '<ul class="cl_citysHis" id="cl_citysHis">'+
                    '</ul>'+
                    '</div>'+
                    '<div class="cl_con ">'+
                    '<a name="cl_hot" class="cl_on">&nbsp;</a>'+
                    '<div>热门城市</div>'+
                    '<ul class="cl_citysHot" id="cl_citysHot">'+
                    '<li>{%=cityChineseName%}</li>'+
                    '</ul>'+
                    '</div>'+
                    '<div class="cityWordBox" id="cityWordBox">'+
                    '<div class="cityWord">'+
                    '<div><a href="#cl_curr">当前</a></div>'+
                    '<div><a href="#cl_hot">热门</a></div>'+
                    '<ul class="cl_word" id="cl_side">'+
                    '<li><a href="#a">A</a></li>'+
                    '<li><a href="#b">B</a></li>'+
                    '<li><a href="#c">C</a></li>'+
                    '<li><a href="#d">D</a></li>'+
                    '<li><a href="#e">E</a></li>'+
                    '<li><a href="#f">F</a></li>'+
                    '<li><a href="#g">G</a></li>'+
                    '<li><a href="#h">H</a></li>'+
                    '<li><a href="#i">I</a></li>'+
                    '<li><a href="#j">J</a></li>'+
                    '<li><a href="#k">K</a></li>'+
                    '<li><a href="#l">L</a></li>'+
                    '<li><a href="#m">M</a></li>'+
                    '<li><a href="#n">N</a></li>'+
                    '<li><a href="#o">O</a></li>'+
                    '<li><a href="#p">P</a></li>'+
                    '<li><a href="#q">Q</a></li>'+
                    '<li><a href="#r">R</a></li>'+
                    '<li><a href="#s">S</a></li>'+
                    '<li><a href="#t">T</a></li>'+
                    '<li><a href="#u">U</a></li>'+
                    '<li><a href="#v">V</a></li>'+
                    '<li><a href="#w">W</a></li>'+
                    '<li><a href="#x">X</a></li>'+
                    '<li><a href="#y">Y</a></li>'+
                    '<li><a href="#z">Z</a></li>'+
                    '</ul>'+
                    '</div>'+
                    '</div>'+
                    '<ol id="lsf_city_list" class="lsf_city_list">'+
                    '<li class="cl_con ">'+
                    '<a name="a" class="cl_on">&nbsp;</a>'+
                    '<div>A</div>'+
                    '<ul id="A">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="b" class="cl_on">&nbsp;</a>'+
                    '<div>B</div>'+
                    '<ul id="B">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="c" class="cl_on">&nbsp;</a>'+
                    '<div>C</div>'+
                    '<ul id="C">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="d" class="cl_on">&nbsp;</a>'+
                    '<div>D</div>'+
                    '<ul id="D">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="e" class="cl_on">&nbsp;</a>'+
                    '<div>E</div>'+
                    '<ul id="E">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="f" class="cl_on">&nbsp;</a>'+
                    '<div>F</div>'+
                    '<ul id="F">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="g" class="cl_on">&nbsp;</a>'+
                    '<div>G</div>'+
                    '<ul id="G">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="h" class="cl_on">&nbsp;</a>'+
                    '<div>H</div>'+
                    '<ul id="H">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="i" class="cl_on">&nbsp;</a>'+
                    '<div>I</div>'+
                    '<ul id="I">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="j" class="cl_on">&nbsp;</a>'+
                    '<div>J</div>'+
                    '<ul id="J">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="k" class="cl_on">&nbsp;</a>'+
                    '<div>K</div>'+
                    '<ul id="K">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="l" class="cl_on">&nbsp;</a>'+
                    '<div>L</div>'+
                    '<ul id="L">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="m" class="cl_on">&nbsp;</a>'+
                    '<div>M</div>'+
                    '<ul id="M">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="n" class="cl_on">&nbsp;</a>'+
                    '<div>N</div>'+
                    '<ul id="N">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="o" class="cl_on">&nbsp;</a>'+
                    '<div>O</div>'+
                    '<ul id="O">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con ">'+
                    '<a name="p" class="cl_on">&nbsp;</a>'+
                    '<div>P</div>'+
                    '<ul id="P">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="q" class="cl_on">&nbsp;</a>'+
                    '<div>Q</div>'+
                    '<ul id="Q">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="r" class="cl_on">&nbsp;</a>'+
                    '<div>R</div>'+
                    '<ul id="R">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="s" class="cl_on">&nbsp;</a>'+
                    '<div>S</div>'+
                    '<ul id="S">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="t" class="cl_on">&nbsp;</a>'+
                    '<div>T</div>'+
                    '<ul id="T">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="u" class="cl_on">&nbsp;</a>'+
                    '<div>U</div>'+
                    '<ul id="U">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="v" class="cl_on">&nbsp;</a>'+
                    '<div>V</div>'+
                    '<ul id="V">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="w" class="cl_on">&nbsp;</a>'+
                    '<div>W</div>'+
                    '<ul id="W">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="x" class="cl_on">&nbsp;</a>'+
                    '<div>X</div>'+
                    '<ul id="X">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="y" class="cl_on">&nbsp;</a>'+
                    '<div>Y</div>'+
                    '<ul id="Y">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '<li class="cl_con">'+
                    '<a name="z" class="cl_on">&nbsp;</a>'+
                    '<div>Z</div>'+
                    '<ul id="Z">'+
                    '<li>{%=cityNameCN%}</li>'+
                    '</ul>'+
                    '</li>'+
                    '</ol>'+
                    '</div>';
                cl_back=document.getElementById('cl_back');
                lsf_myweb.bind(cl_back,'click',function(){
                    var arr1=document.getElementById('arr1');
                    var arr2=document.getElementById('arr2');
                    var inter=arr1.parentNode.parentNode;
                    var dom=arr2.parentNode.parentNode;
                    cl_box_box.style.display='none';
                });
                cityShow(domHotData,dataWorCN,domestic_target_city);
            }else{
                cl_box_box.style.display='block';
            }
            domBok=false;
            interBok=true;
        });
        lsf_myweb.bind(cl_back,'click',function(){
            var arr1=document.getElementById('arr1');
            var arr2=document.getElementById('arr2');
            var inter=arr1.parentNode.parentNode;
            var dom=arr2.parentNode.parentNode;
            cl_box_box.style.display='none';
        });
    }
    cityList();

    var checkIn=lsf_myweb.getbyid('CheckInDate');
    var checkOut=lsf_myweb.getbyid('CheckOutDate');
    var content2=lsf_myweb.getbyid('content2');
    var week_span1=lsf_myweb.getbyid('week_span1');
    var week_span2=lsf_myweb.getbyid('week_span2');
    var oDate=new Date();
    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();
    //国际城市
    var oDate1=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+2);
    var oDate2=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+3);
    var beginDate=oDate1.getFullYear()+'-'+toDou(oDate1.getMonth()+1)+'-'+toDou(oDate1.getDate());
    var leaveDate=oDate2.getFullYear()+'-'+toDou(oDate2.getMonth()+1)+'-'+toDou(oDate2.getDate());
    var obj={};
    //网页还原用户上一次选择内容
    //if(hotelStorage){
    //    checkIn.value=hotelStorage.InterBeginDate;
    //    checkOut.value=hotelStorage.InterLeaveDate;
    //    lsf_myweb.getbyid('total_day').innerHTML=hotelStorage.InterTotalDay;
    //    week_span1.innerHTML=hotelStorage.InterBeginDateWeek;
    //    week_span2.innerHTML=hotelStorage.InterLeaveDateWeek;
    //    obj[hotelStorage.InterBeginDate]="入住";
    //    obj[hotelStorage.InterLeaveDate]="离店";
    //}else{
    //    checkIn.value=beginDate;
    //    checkOut.value=leaveDate;
    //    week_span1.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
    //    week_span2.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
    //    obj[beginDate]="入住";
    //    obj[leaveDate]="离店";
    //    console.log('国际');
    //    console.log(obj);
    //}
    checkIn.value=beginDate;
    checkOut.value=leaveDate;
    week_span1.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
    week_span2.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
    obj[beginDate]="入住";
    obj[leaveDate]="离店";
    //国内城市
    var DomCheckInDate=document.getElementById('DomCheckInDate');
    var DomCheckOutDate=document.getElementById('DomCheckOutDate');
    var oDate3=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+2);
    var oDate4=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+3);
    var DomBeginDate=oDate3.getFullYear()+'-'+toDou(oDate3.getMonth()+1)+'-'+toDou(oDate3.getDate());
    var DomLeaveDate=oDate4.getFullYear()+'-'+toDou(oDate4.getMonth()+1)+'-'+toDou(oDate4.getDate());
    var week_span3=document.getElementById('weekSpan3');
    var week_span4=document.getElementById('weekSpan4');
    var obj2={};
    //网页还原用户上一次选择内容
    //if(hotelStorage){
    //    DomCheckInDate.value=hotelStorage.DomCheckInDate;
    //    DomCheckOutDate.value=hotelStorage.DomCheckOutDate;
    //    lsf_myweb.getbyid('domeTotalDay').innerHTML=hotelStorage.DomeTotalDay;
    //    week_span3.innerHTML=hotelStorage.DomBeginDateWeek;
    //    week_span4.innerHTML=hotelStorage.DomLeaveDateWeek;
    //    obj2[hotelStorage.DomCheckInDate]="入住";
    //    obj2[hotelStorage.DomCheckOutDate]="离店";
    //}else{
    //    DomCheckInDate.value=DomBeginDate;
    //    DomCheckOutDate.value=DomLeaveDate;
    //    week_span3.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
    //    week_span4.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
    //    obj2[DomBeginDate]="入住";
    //    obj2[DomLeaveDate]="离店";
    //}
    DomCheckInDate.value=DomBeginDate;
    DomCheckOutDate.value=DomLeaveDate;
    week_span3.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
    week_span4.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
    obj2[DomBeginDate]="入住";
    obj2[DomLeaveDate]="离店";
    function Calender2(){
        Calender.apply(this,arguments);
        this.idTotal=arguments[0].idTotal;
        this.idLive=arguments[0].idLive;
        this.idLeave=arguments[0].idLeave;
        console.log(arguments[0]);
    }
    Calender2.prototype=new Calender();
    var oldlinkover=Calender.prototype.linkOver;
    Calender2.prototype.linkOver=function(){
        var sels = $('#'+ this.id +'-date .live_circle'),i,l=sels.length,that=this,arr=[];
        var out = _CalF.$('input',that.input);
        var tal = _CalF.$('#'+that.idTotal,that.input);
        beginDate=sels[0].parentNode.getAttribute("data-day").split('-').join('-');
        leaveDate=sels[1].parentNode.getAttribute("data-day").split('-').join('-');
        //console.log(this.time);

        //console.log(myDate1);
        //console.log(obj);
        //console.log(sels[0].parentNode.getAttribute("data-day"));
        //console.log(sels[1].parentNode.getAttribute("data-day"));
        var liveDate=sels[0].parentNode.getAttribute("data-day").split('-');
        var leaveDate=sels[1].parentNode.getAttribute("data-day").split('-');
        for(var i=0;i<liveDate.length;i++){
            liveDate[i]=liveDate[i]<10?'0'+liveDate[i]:liveDate[i];
        }
        for(var i=0;i<leaveDate.length;i++){
            leaveDate[i]=leaveDate[i]<10?'0'+leaveDate[i]:leaveDate[i];
        }
        //console.log(liveDate);
        liveDate=liveDate.join('-');
        leaveDate=leaveDate.join('-');
        //console.log(liveDate);
        out[0].value=liveDate;
        out[1].value=leaveDate;
        arr.push(liveDate);
        arr.push(leaveDate);
        //console.log(arr);
        //修改calendar传入的参数obj的值
        obj={};
        console.log(out[0].value+':'+out[1].value);
        obj[out[0].value]="入住";
        obj[out[1].value]="离店";
        this.time=obj;
        //console.log(this.time);
        //console.log(arr);
        //console.log(new Date(arr[1]));
        var live_y=arr[0].split('-')[0];
        var live_m=arr[0].split('-')[1]-1;
        var live_d=arr[0].split('-')[2];
        var leave_y=arr[1].split('-')[0];
        var leave_m=arr[1].split('-')[1]-1;
        var leave_d=arr[1].split('-')[2];
        tal.innerHTML = (Math.round((new Date(leave_y,leave_m,leave_d)-new Date(live_y,live_m,live_d))/(1000*60*60*24)));
        that.removeDate();
        var oDate1=new Date(arr[0].split('-')[0],(arr[0].split('-')[1]-1),arr[0].split('-')[2]);
        var oday1=oDate1.getDay();
        var oDate2=new Date(arr[1].split('-')[0],(arr[1].split('-')[1]-1),arr[1].split('-')[2]);
        var oday2=oDate2.getDay();
        //alert(oDate1+'---'+oDate2);
        lsf_myweb.getbyid(that.idLive).innerHTML='周'+n2c(oday1)+' 入住';
        lsf_myweb.getbyid(that.idLeave).innerHTML='周'+n2c(oday2)+' 离店';
    }
    var myDate1 = new Calender2({id: "nav2-center1", num: 13, time: obj,idTotal:"total_day",idLive:"week_span1",idLeave:"week_span2"});
    var domestic_calender=new Calender2({id:"nav2-center2",num:13,time:obj2,idTotal:"domeTotalDay",idLive:"weekSpan3",idLeave:"weekSpan4"});




    function hoMemory(){
        //用于记录用户历史选择

        var hotelStorage12345={
            //现在只有Singapore可以查询到数据，所以先默认城市是Singapore
            "InterDes":lsf_myweb.getbyid('input1').value,
            //"InterDes":"Singapore",
            "InterBeginDate":lsf_myweb.getbyid('CheckInDate').value,
            "InterLeaveDate":lsf_myweb.getbyid('CheckOutDate').value,
            "NumRoom":lsf_myweb.getbyid('count1').value,
            "NumAdult":lsf_myweb.getbyid('count2').value,
            "NumChild":lsf_myweb.getbyid('count3').value,
            //已去掉城市模糊搜索
            //"InterHotelName":lsf_myweb.getbyid('InterHotelname').value,
            "InterTotalDay":lsf_myweb.getbyid('total_day').innerHTML,
            "InterBeginDateWeek":lsf_myweb.getbyid('week_span1').innerHTML,
            "InterLeaveDateWeek":lsf_myweb.getbyid('week_span2').innerHTML,
            "DomDes":lsf_myweb.getbyid('input2').value,
            "DomCheckInDate":lsf_myweb.getbyid('DomCheckInDate').value,
            "DomCheckOutDate":lsf_myweb.getbyid('DomCheckOutDate').value,
            //已去掉城市模糊搜索
            //"DomHotelName":lsf_myweb.getbyid('DomHotelName').value,
            "DomeTotalDay":lsf_myweb.getbyid('domeTotalDay').innerHTML,
            "DomBeginDateWeek":lsf_myweb.getbyid('weekSpan3').innerHTML,
            "DomLeaveDateWeek":lsf_myweb.getbyid('weekSpan4').innerHTML
        };
        localStorage.setItem('hotelStorage12345',JSON.stringify(hotelStorage12345));
    }



    //查询按钮点击事件
    lsf_myweb.bind(lsf_myweb.getbyid('InterBtn'),'click',function(){
        hoMemory();
        hoPos='inter';
        localStorage.setItem('hoPos',hoPos);
    });
    lsf_myweb.bind(lsf_myweb.getbyid('domBtn'),'click',function(){
        hoMemory();
        hoPos='dom';
        localStorage.setItem('hoPos',hoPos);
    });
})();

