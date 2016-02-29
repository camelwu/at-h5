/**
 * Created by Asiatravel on 2015/12/31.
 */
//董振昊js代码
/**
 * Created by changlv on 2015/12/11.
 */
    //解决300毫秒延迟问题
(function($) {
    $(document).ready(function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    });
}(jQuery));

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
//加按钮点击事件
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
//减按钮点击事件
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

//输入框获得焦点和失去焦点事件
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
    //目的地解决光标问题
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
    var count1=document.getElementById('count1');
    var count2=document.getElementById('count2');
    var count3=document.getElementById('count3');
    lsf_myweb.bind(count1,'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(count2,'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(count3,'focus',function(){
        this.blur();
    });
    lsf_myweb.bind(count1,'dblclick',function(){
        return false;
    });
    lsf_myweb.bind(count2,'dblclick',function(){
        return false;
    });
    lsf_myweb.bind(count3,'dblclick',function(){
        return false;
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
    //var ho_back=document.getElementById('ho_back');
    //ho_back.onclick=function(){
    //    window.history.go(-1);
    //};
    //城市列表
    var dataCN=[];
    var dataIN=[];
    var dataWorCN={};
    var dataWorIN={};
    var domestic_target_place=document.getElementById('arr2');
    var domestic_target_city=document.getElementById('input2');
    var abroad_target_place=document.getElementById('arr1');
    var abroad_target_city=document.getElementById('input1');
    var api='http://10.2.22.239:8888/api/GetServiceApiResult';
    var cl_box_box=document.getElementById('cl_box_box');
    var dcl_box_box=document.getElementById('dcl_box_box');
    var cl_back=document.getElementById('cl_back');
    var dcl_back=document.getElementById('dcl_back');
    var vlm_login=document.getElementById('vlm-login');
    var dvlm_login=document.getElementById('dvlm-login');
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
    //城市列表
    vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(cityListData), function(d){
        var listJson=eval('('+d+')');
        if(!listJson.success){
            jAlert(listJson.message);
            return;
        }
        window.localStorage.setItem('cityListInfo',JSON.stringify(listJson.data));
        //对得到的城市列表数据进行处理
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
        sortBy(listJson);
        console.log(listJson);
        console.log(dataWorCN);
        console.log(dataWorIN);
        function cityShow(oData,doData,cityJson,dcityJson,obj,dobj){
            //热门城市
            //国际
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(oData), function(d){
                var json=eval('('+d+')');
                var str = template("cl_citysHot",json.data);
                $("#cl_citysHot").html(str);
            });
            //国内
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(doData), function(d){
                var json=eval('('+d+')');
                var dstr = template("dcl_citysHot",json.data);
                $("#dcl_citysHot").html(dstr);
            });
            //历史选择
            var cityHisArr=[];
            var dcityHisArr=[];
            var cl_citysHis=document.getElementById('cl_citysHis');
            var dcl_citysHis=document.getElementById('dcl_citysHis');
            var searchCity=document.getElementById('searchCity');
            var dsearchCity=document.getElementById('dsearchCity');
            var citySearchBox=document.getElementById('citySearchBox');
            var dcitySearchBox=document.getElementById('dcitySearchBox');
            var cl_citysHisStr='';
            var dcl_citysHisStr='';

            //输入框输入内容事件，模糊搜索
            //国际酒店
            citySearchBox.oninput=function(){
                var interInpCity=[];
                var domInpCity=[];
                var cl_inp_citys=document.getElementById('cl_inp_citys');
                cl_inp_citys.style.display='block';
                function getInpCity(){
                    for(var name in dataWorIN){
                        if(citySearchBox.value){
                            for(var j=0;j<dataWorIN[name].length;j++){
                                if(citySearchBox.value==dataWorIN[name][j].cityNameCN.substring(0,(citySearchBox.value.length))||citySearchBox.value==dataWorIN[name][j].pingYin.substring(0,(citySearchBox.value.length))){
                                    interInpCity.push(dataWorIN[name][j].cityNameCN);
                                }
                            }
                        }else{
                            cl_inp_citys.style.display='none';
                        }
                    }
                    cl_inp_citys.innerHTML='';
                    for(var i=0;i<interInpCity.length;i++){
                        var oLi=document.createElement('li');
                        oLi.innerHTML=interInpCity[i];
                        cl_inp_citys.appendChild(oLi);
                        oLi.onclick=function(){
                            abroad_target_city.value=this.innerHTML;
                            cl_box_box.style.display='none';
                            cl_inp_citys.style.display='none';
                            vlm_login.style.display='none';
                        };
                    }
                }
                //if(citySearchBox.value.charCodeAt(0)>=0x4e00&&citySearchBox.value.charCodeAt(i)<=0x9fa5){
                //    getInpCity();
                //}else{
                //    if(citySearchBox.value.length>=2){
                //        getInpCity();
                //    }else{
                //        cl_inp_citys.innerHTML='';
                //    }
                //}
                getInpCity();
            };
            //国内酒店
            dcitySearchBox.oninput=function(){
                var interInpCity=[];
                var domInpCity=[];
                var dcl_inp_citys=document.getElementById('dcl_inp_citys');
                dcl_inp_citys.style.display='block';
                function dgetInpCity(){
                    for(var name in dataWorCN){
                        if(dcitySearchBox.value){
                            console.log(dcitySearchBox.value);
                            for(var j=0;j<dataWorCN[name].length;j++){
                                if(dcitySearchBox.value==dataWorCN[name][j].cityNameCN.substring(0,(dcitySearchBox.value.length))||dcitySearchBox.value==dataWorCN[name][j].pingYin.substring(0,(dcitySearchBox.value.length))){
                                    domInpCity.push(dataWorCN[name][j].cityNameCN);
                                }
                            }
                        }else{
                            dcl_inp_citys.style.display='none';
                        }
                    }
                    dcl_inp_citys.innerHTML='';
                    console.log(domInpCity);
                    for(var i=0;i<domInpCity.length;i++){
                        var oLi=document.createElement('li');
                        oLi.innerHTML=domInpCity[i];
                        dcl_inp_citys.appendChild(oLi);
                        oLi.onclick=function(){
                            domestic_target_city.value=this.innerHTML;
                            dcl_box_box.style.display='none';
                            dcl_inp_citys.style.display='none';
                            dvlm_login.style.display='none';
                        };
                    }
                }
                //if(dcitySearchBox.value.charCodeAt(0)>=0x4e00&&dcitySearchBox.value.charCodeAt(i)<=0x9fa5){
                //    dgetInpCity();
                //}else{
                //    if(dcitySearchBox.value.length>=2){
                //        dgetInpCity();
                //    }else{
                //        dcl_inp_citys.innerHTML='';
                //    }
                //}
                dgetInpCity();
            };
            if(obj.getAttribute('id')=='input1'){
                citySearchBox.setAttribute('placeholder','新加坡');  //判断国际国内酒店改变placeholder
                var cityListHis=window.localStorage.getItem('interCityName');
                if(cityListHis){
                    cityHisArr=cityListHis.split(',');
                    cityHisArr.shift();
                }
                //for(var i=0;i<dataIN.length;i++){
                //    searchCity.innerHTML+='<option value="'+dataIN[i].cityNameCN+'('+dataIN[i].cityNameEN+')'+'"></option>';
                //}
            }
            if(dobj.getAttribute('id')=='input2'){
                dcitySearchBox.setAttribute('placeholder','北京/beijing/bj/bjs/中国');  //判断国际国内酒店改变placeholder
                var dcityListHis=window.localStorage.getItem('domCityName');
                if(dcityListHis){
                    dcityHisArr=dcityListHis.split(',');
                    dcityHisArr.shift();
                }
                //for(var i=0;i<dataCN.length;i++){
                //    dsearchCity.innerHTML+='<option value="'+dataCN[i].cityNameCN+'"></option>';
                //}
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
            var djson={};
            for(var i=0;i<dcityHisArr.length;i++){
                if(dcityHisArr[i]){
                    djson[dcityHisArr[i]]=1;
                }
            }
            dcityHisArr=[];
            for(var name in djson){
                dcityHisArr.push(name);
            }
            //把历史城市生成页面
            cl_citysHis.innerHTML='';
            for(var i=0;i<cityHisArr.length;i++){
                cl_citysHisStr+='<li>'+cityHisArr[i]+'</li>';
            }
            cl_citysHis.innerHTML=cl_citysHisStr;

            dcl_citysHis.innerHTML='';
            for(var i=0;i<dcityHisArr.length;i++){
                dcl_citysHisStr+='<li>'+dcityHisArr[i]+'</li>';
            }
            dcl_citysHis.innerHTML=dcl_citysHisStr;
            //字母城市
            //国内城市
            var dstrA=template("dA",dcityJson.A);
            $("#dA").html(dstrA);
            var dstrB=template("dB",dcityJson.B);
            $("#dB").html(dstrB);
            var dstrC=template("C",dcityJson.C);
            $("#dC").html(dstrC);
            var dstrD=template("dD",dcityJson.D);
            $("#dD").html(dstrD);
            var dstrE=template("dE",dcityJson.E);
            $("#dE").html(dstrE);
            var dstrF=template("dF",dcityJson.F);
            $("#dF").html(dstrF);
            var dstrG=template("dG",dcityJson.G);
            $("#dG").html(dstrG);
            var dstrH=template("dH",dcityJson.H);
            $("#dH").html(dstrH);
            var dstrI=template("dI",dcityJson.I);
            $("#dI").html(dstrI);
            var dstrJ=template("dJ",dcityJson.J);
            $("#dJ").html(dstrJ);
            var dstrK=template("dK",dcityJson.K);
            $("#dK").html(dstrK);
            var dstrL=template("dL",dcityJson.L);
            $("#dL").html(dstrL);
            var dstrM=template("dM",dcityJson.M);
            $("#dM").html(dstrM);
            var dstrN=template("dN",dcityJson.N);
            $("#dN").html(dstrN);
            var dstrO=template("dO",dcityJson.O);
            $("#dO").html(dstrO);
            var dstrP=template("dP",dcityJson.P);
            $("#dP").html(dstrP);
            var dstrQ=template("dQ",dcityJson.Q);
            $("#dQ").html(dstrQ);
            var dstrR=template("dR",dcityJson.R);
            $("#dR").html(dstrR);
            var dstrS=template("dS",dcityJson.S);
            $("#dS").html(dstrS);
            var dstrT=template("dT",dcityJson.T);
            $("#dT").html(dstrT);
            var dstrU=template("dU",dcityJson.U);
            $("#dU").html(dstrU);
            var dstrV=template("dV",dcityJson.V);
            $("#dV").html(dstrV);
            var dstrW=template("dW",dcityJson.W);
            $("#dW").html(dstrW);
            var dstrX=template("dX",dcityJson.X);
            $("#dX").html(dstrX);
            var dstrY=template("dY",dcityJson.Y);
            $("#dY").html(dstrY);
            var dstrZ=template("dZ",dcityJson.Z);
            $("#dZ").html(dstrZ);
            //国际城市
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
            //城市的点击事件
            function cityClick(parentId){
                var oParent=document.getElementById(parentId);
                var aLi=oParent.children;
                oParent.onclick=function(ev){
                    var oEvent=ev||event;
                    var oSrc=oEvent.srcElement||oEvent.target;
                    if(oParent.parentNode.parentNode.parentNode.getAttribute('id')=='cl_box_box'||oParent.parentNode.parentNode.parentNode.parentNode.getAttribute('id')=='cl_box_box'){
                        if(oSrc.tagName=='LI'){
                            var aSelected=lsf_myweb.getbyclass(cl_box_box,'selected');
                            for(var i=0;i<aSelected.length;i++){
                                aSelected[i].className='';
                            }
                            oSrc.className='selected';
                            cl_box_box.style.display='none';
                            vlm_login.style.display='none';
                            obj.value=oSrc.innerHTML;
                            if(obj.getAttribute('id')=='input1'){
                                var cityNameStr=window.localStorage.getItem('interCityName');
                                if(!cityNameStr){
                                    cityNameStr='';
                                }
                                cityNameStr+=','+oSrc.innerHTML;
                                window.localStorage.setItem('interCityName',cityNameStr);
                            }
                        }
                    }else if(oParent.parentNode.parentNode.parentNode.getAttribute('id')=='dcl_box_box'||oParent.parentNode.parentNode.parentNode.parentNode.getAttribute('id')=='dcl_box_box'){
                        if(oSrc.tagName=='LI'){
                            var daSelected=lsf_myweb.getbyclass(dcl_box_box,'selected');
                            for(var i=0;i<daSelected.length;i++){
                                daSelected[i].className='';
                            }
                            oSrc.className='selected';
                            dcl_box_box.style.display='none';
                            dvlm_login.style.display='none';
                            dobj.value=oSrc.innerHTML;
                            if(dobj.getAttribute('id')=='input2'){
                                var dcityNameStr=window.localStorage.getItem('domCityName');
                                if(!dcityNameStr){
                                    dcityNameStr='';
                                }
                                dcityNameStr+=','+oSrc.innerHTML;
                                window.localStorage.setItem('domCityName',dcityNameStr);
                            }
                        }
                    }

                };
            }
            //国际城市
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
            //国内城市
            cityClick('dcl_citysHis');
            cityClick('dcl_citysHot');
            cityClick('dA');
            cityClick('dB');
            cityClick('dC');
            cityClick('dD');
            cityClick('dE');
            cityClick('dF');
            cityClick('dG');
            cityClick('dH');
            cityClick('dI');
            cityClick('dJ');
            cityClick('dK');
            cityClick('dL');
            cityClick('dM');
            cityClick('dN');
            cityClick('dO');
            cityClick('dP');
            cityClick('dQ');
            cityClick('dR');
            cityClick('dS');
            cityClick('dT');
            cityClick('dU');
            cityClick('dV');
            cityClick('dW');
            cityClick('dX');
            cityClick('dY');
            cityClick('dZ');
            //判断字母下是否有城市，如果没有删掉改字母
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

            var dlsf_city_list=document.getElementById('dlsf_city_list');
            var dcityListWord=dlsf_city_list.children;
            for(var i=0;i<dcityListWord.length;i++){
                var doUl=dcityListWord[i].getElementsByTagName('ul')[0];
                var doDiv=dcityListWord[i].getElementsByTagName('div')[0];
                if(doUl.children.length==1&&doUl.children[0].innerHTML==''){
                    dcityListWord[i].style.display='none';
                }else{
                    dcityListWord[i].style.display='block';
                }
            }
        }
        cityShow(interHotData,domHotData,dataWorIN,dataWorCN,abroad_target_city,domestic_target_city);
        //国际城市
        console.log(dataWorIN);
        console.log(8888888888888888888);
        lsf_myweb.bind(abroad_target_city,'click',function(){
            cl_box_box.style.display='block';
            vlm_login.style.display='block';
        });
        //国内城市
        lsf_myweb.bind(domestic_target_city,'click',function(){
            dcl_box_box.style.display='block';
            dvlm_login.style.display='block';
        });
        //国际城市列表返回按钮点击事件
        lsf_myweb.bind(cl_back,'click',function(){
            var arr1=document.getElementById('arr1');
            var arr2=document.getElementById('arr2');
            var inter=arr1.parentNode.parentNode;
            var dom=arr2.parentNode.parentNode;
            cl_box_box.style.display='none';
            vlm_login.style.display='none';
        });
        //国内城市列表返回按钮点击事件
        lsf_myweb.bind(dcl_back,'click',function(){
            var arr1=document.getElementById('arr1');
            var arr2=document.getElementById('arr2');
            var inter=arr1.parentNode.parentNode;
            var dom=arr2.parentNode.parentNode;
            dcl_box_box.style.display='none';
            dvlm_login.style.display='none';
        });
    });



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

