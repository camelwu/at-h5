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
    "addClass":function(obj,sClass){
        if(obj.className){
            var reg=RegExp('\\b'+sClass+'\\b','g');
            if(obj.className.search(reg)==-1){
                obj.className+=' '+sClass;
            }
        }else{
            obj.className=sClass;
        }
    },
    "removeClass":function(obj,sClass){
        if(obj.className){
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            if(obj.className.search(reg)!=-1){
                obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
                if(!obj.className){
                    obj.removeAttribute('class');
                }
            }
        }
    },
    "bind":function(obj,sEv,fn){
        if(obj.addEventListener){
            obj.addEventListener(sEv,fn,false);
        }else{
            obj.attachEvent('on'+sEv,fn);
        }
    },
    "removeBind":function(obj,sEv,fn){
        if(obj.removeEventListener){
            obj.removeEventListener(sEv,fn,false);
        }else{
            obj.detachEvent('on'+sEv,fn);
        }
    },
    "setSession":function(name,json){
        window.sessionStorage.setItem(name,JSON.stringify(json));
    },
    "getSession":function(name){
        return JSON.parse(window.sessionStorage.getItem(name));
    }
};
//storage存储
var hlHis=lsf_myweb.getSession('asiaHlHistory')||{};
lsf_myweb.setSession('asiaHlHistory',hlHis);
//把星级英文数字换成汉字
function num2chin(num){
    switch(num){
        case '0':
            return '零';
            break;
        case '1':
            return '一';
            break;
        case '2':
            return '二';
            break;
        case '3':
            return '三';
            break;
        case '4':
            return '四';
            break;
        case '5':
            return '五';
            break;
        default:
            return '无';
            break;
    };
}

//把url字符串变成json
function url2json(url){
    if(!url)return;
    var json={};
    var arr=url.split('?');
    var arr2=arr[1].split('&');
    for(var i=0;i<arr2.length;i++){
        var arr3=arr2[i].split('=');
        json[arr3[0]]=arr3[1];
    }
    return json;
}

function styleChange(id,mytext){
    var oInp=document.getElementById(id);
    oInp.onfocus=function(){
        if(this.value==mytext){
            this.value='';
            this.style.color='#484848';
        }
    };
    oInp.onblur=function(){
        if(!this.value){
            this.value=mytext;
            this.style.color='#d1d1d1';
        }
    };
}



(function(){
    //贾燕云的js
    function h_l_s(){
        var rli = [],
            sli1 = [],
            sli2 = [],
            lb = [];
        var mb;
        function _(s){
            return document.getElementById(s);
        }
        var rank=_("rank");
        var screen=_("screen");
        var location=_("location");
        var fo_ra = _("fo_ra");
        var fo_sc = _("fo_sc");
        var fo_lo =_("fo_lo");
        var s_but = _("s_but");
        var l_but = _("l_but");
        function show(obj){
            mb=document.getElementById("r-mb");
            mb.style.display="block";
            obj.style.bottom="0";
            obj.style.transition="all 350ms";
        }
        function close(obj){
            mb=document.getElementById("r-mb");
            mb.style.display="none";
            obj.style.bottom=-550+'px';
            obj.style.transition="all 350ms";
        }
        function mb_close(){
            mb=document.getElementById("r-mb");
            mb.style.display="none";
            if(rank.style.display==""||rank.style.display=="block"){
                rank.style.bottom=-550+'px';
                rank.style.transition="all 350ms";
            }if(screen.style.display==""||screen.style.display=="block"){
                screen.style.bottom=-550+'px';
                screen.style.transition="all 350ms";
            }if(location.style.display==""||location.style.display=="block"){
                location.style.bottom=-550+'px';
                location.style.transition="all 350ms";
            }
        }
        /*   酒店筛选  */
        function selectType(){
            var obj = window.event.srcElement;
            var oName = obj.className;
            var array = [];
            if(obj.innerHTML == "不限"){
                array = document.getElementById("h-type").childNodes;
                for(var i=1;i<array.length;i++){
                    array[i].className = "s-li";
                }
            }if(obj.innerHTML != "不限"){
                document.getElementById("h-type").firstElementChild.className = "s-li";
            }
            if(oName == "s-li"){
                obj.className = "s-li1";
            }else{
                obj.className = "s-li";
            }
        }
        function selectLevel(){
            var obj = window.event.srcElement;
            var oName = obj.className;
            var array = [];
            if(obj.innerHTML == "不限"){
                array = document.getElementById("h-level").childNodes;
                for(var i=1;i<array.length;i++){
                    array[i].className = "s-li";
                }
            }if(obj.innerHTML != "不限"){
                document.getElementById("h-level").firstElementChild.className = "s-li";
            }
            if(oName == "s-li"){
                obj.className = "s-li1";
            }else{
                obj.className = "s-li";
            }
        }
        function openClick(obj1,obj2){
            obj1.onclick = function(){
                show(obj2);
                mb.addEventListener("click",mb_close);
            }
        }
        function closeClick(obj1,obj2){
            obj1.onclick = function(){
                close(obj2);
            }
        }
        this.init=function(s){
            //insert
            sli1 = document.getElementById("h-level").childNodes;
            for(var j=0;j < sli1.length;j++){
                sli1[j].addEventListener("click",selectLevel);
            }
            sli2 = document.getElementById("h-type").childNodes;
            for(var k=0;k < sli2.length;k++){
                sli2[k].addEventListener("click",selectType);
            }
            rli = document.getElementsByClassName("r-li");
            for(var i=0;i < rli.length;i++){
                rli[i].addEventListener("click",selectRank);
            }
            /*lli = document.getElementsByClassName("l-li");
             for(var r=0;r < lli.length;r++){
             lli[r].addEventListener("click",selectLocation);
             }*/
        };
        init();
        openClick(fo_ra,rank);
        openClick(fo_sc,screen);
        openClick(fo_lo,location);
        closeClick(s_but,screen);
        closeClick(l_but,location);
        /*   排序筛选   */
        function selectRank(){
            var obj = window.event.srcElement;
            var rank=document.getElementById("rank");
            var mb=document.getElementById("r-mb");
            var color = obj.style.color;
            if(color == "rgb(252, 148, 100)"){
                mb.style.display="none";
                rank.style.bottom=-550+'px';
                rank.style.transition="all 350ms";
            }else{
                for(var i=0;i < rli.length;i++){
                    if(rli[i].style.color == "rgb(252, 148, 100)"){
                        var bb = rli[i].getElementsByTagName("b")[0];
                        rli[i].removeChild(bb);
                    }
                    rli[i].style.color="#b3b2b4";
                }
                obj.style.color="#fc9464";
                var b = document.createElement("b");
                b.className = "hl-icon5";
                obj.appendChild(b);
                mb.style.display="none";
                rank.style.bottom=-550+'px';
                rank.style.transition="all 350ms";
            }
        }
        /*   位置筛选  */
        /*function selectLocation(){
         var obj = window.event.srcElement;
         var p = obj.firstElementChild;
         var b = obj.lastElementChild;
         var array = [];
         array = document.getElementsByClassName("l-li");
         if(p.innerHTML == "不限"){
         for(var i=1;i < array.length;i++){
         array[i].lastElementChild.className = "l-icon";
         }
         }if(p.innerHTML != "不限"){
         document.getElementById("l-ul").firstElementChild.lastElementChild.className = "l-icon";
         }
         if(b.className == "l-icon"){
         b.className = "l-icon1";
         }else{
         b.className = "l-icon";
         }
         }
         */
    }
    h_l_s();
    //贾燕云的js结束

    //返回按钮事件
    var hl_back=document.getElementById('hl_back');
    lsf_myweb.bind(hl_back,'click',function(){
        window.history.go(-1);
    });
    var oUl=document.getElementById('lsf_list');
    $(window).load(function () {
        //$("#status-h").fadeOut();
        //$("#preloader").delay(400).fadeOut("medium");
        var timer=null;
        timer=setInterval(function(){
            if($('#lsf_list').children().length){
                $("#status-h").fadeOut();
                $("#preloader").delay(400).fadeOut("medium");
                clearInterval(timer);
            }
            //console.log($('#lsf_list').children().length);
        },30);

    });
    //输入框样式改变
    styleChange('sousou','酒店名/位置')

    var list_oUl=lsf_myweb.getbyid('lsf_list');
    var pWidth=list_oUl.offsetWidth-140;
    var str=window.location.href;
    var url_json=url2json(str);
    var oBody=document.getElementsByTagName('body')[0];
    var oBtn=document.getElementById('s_but');
    var addressBok=true;
    //console.log(url_json);

    var preloader=document.getElementById('preloader');
    var status_h=document.getElementById('status-h');
    //交互部分
    function M(json){
        console.log('这是传入的数据');
        console.log(json);
        preloader.style.display='block';
        status_h.style.display='block';
        var lsf_list=document.getElementById('lsf_list');
        lsf_list.innerHTML='';
        json=json||{};
        json.rank=json.rank||'priceasc';
        json.InterCityName=decodeURIComponent(json.InterCityName)||'Singapore';
        json.DomCityName=decodeURIComponent(json.DomCityName)||'北京';
        json.NumRoom=json.NumRoom||'1';
        json.NumChild=json.NumChild||'1';
        json.NumAdult=json.NumAdult||'1';
        json.Category=json.Category||'';
        json.StarRating=json.StarRating||'';
        json.LocationList=json.LocationList||'';
        json.CountryISOCode=json.CountryISOCode||'SG';
        var oDate=new Date();
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();
        json.InterCheckInDate=json.InterCheckInDate||y+'-'+m+'-'+d;
        json.InterCheckOutDate=json.InterCheckOutDate||y+'-'+m+'-'+(d+1);
        var hoPos=localStorage.getItem('hoPos');
        //alert(hoPos);
        //获得的目的地名字在城市列表里面进行搜索，然后获得英文名字
        var hl_cityListInfo=JSON.parse(window.localStorage.getItem('cityListInfo'));
        console.log(hl_cityListInfo);
        console.log('haksdhfkjahdsfkajhfdskajhfdsk');
        //对获取的城市名字进行处理，得到汉字名字
        function cityNameChange(cityName){
            if(cityName.indexOf('(')!=-1){
                cityName=cityName.substring(0,cityName.indexOf('('));
            }
            return cityName;
        }
        json.InterCityName=cityNameChange(json.InterCityName);
        json.DomCityName=cityNameChange(json.DomCityName);
        //对得到的汉字名字进行处理，得到英文名字和三字码
        for(var i=0;i<hl_cityListInfo.length;i++){
            if(json.InterCityName==hl_cityListInfo[i].cityNameCN){
                json.InterCityName=hl_cityListInfo[i].cityNameEN;
                json.CountryISOCode=hl_cityListInfo[i].countryISOCode;
            }
            if(json.DomCityName==hl_cityListInfo[i].cityNameCN){
                json.DomCityName=hl_cityListInfo[i].cityNameEN;
                json.CountryISOCode=hl_cityListInfo[i].countryISOCode;
            }
            if((json.InterCityName==hl_cityListInfo[i].cityNameEN)||(json.DomCityName==hl_cityListInfo[i].cityNameEN)){
                json.CountryISOCode=hl_cityListInfo[i].countryISOCode;
            }
        }
        //alert(json.CountryISOCode);
        if(hoPos=='inter'){
            var data =
            {
                "Parameters": "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\""+json.CountryISOCode+"\",\"CityName\":\""+json.InterCityName+"\",\"CheckInDate\":\""+json.InterCheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.InterCheckOutDate+"T00:00:00\",\"NumRoom\":"+json.NumRoom+",\"NumAdult\":"+json.NumAdult+",\"NumChild\":"+json.NumChild+",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\""+json.rank+"\",\"Category\":\""+json.Category+"\",\"StarRating\":\""+json.StarRating+"\",\"LocationList\":\""+json.LocationList+"\"}",
                "Code": "0007",
                "ForeEndType": 3
            };
        }else if(hoPos='dom'){
            var data =
            {
                "Parameters": "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\""+json.CountryISOCode+"\",\"CityName\":\""+json.DomCityName+"\",\"CheckInDate\":\""+json.DomCheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.DomCheckOutDate+"T00:00:00\",\"NumRoom\":\"\",\"NumAdult\":\"\",\"NumChild\":\"\",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\""+json.rank+"\",\"Category\":\""+json.Category+"\",\"StarRating\":\""+json.StarRating+"\",\"LocationList\":\""+json.LocationList+"\"}",
                "Code": "0007",
                "ForeEndType": 3
            };
        }

        return  vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
    }

    //数据展示部分
    function V(data){
        if(!data)return;
        //console.log(data);
        var data_address=data.locationList;
        var data=data.hotelList;
        console.log(data_address);
        console.log(data);
        console.log('hajshdj');
        var timer=null;
        var oUl=lsf_myweb.getbyid('lsf_list');
        list_oUl.innerHTML='';
        if(data.length){
            for(var i=0;i<data.length;i++){
                var  str1=data[i].starRating.substring(0,1);
                var str2='';
                var str3='';
                var str4='';
                if(data[i].isFreeWiFi){
                    //str2+='<b class="hl-icon1">免费wifi</b>';
                    str2+='<div class="h-div1">免费wifi</div>';
                }
                if(data[i].isFreeTransfer){
                    //str2+='<b class="hl-icon2">免费接送</b>';
                    str2+='<div class="h-div1">免费接送</div>';
                }
                if(data[i].isCashReward){
                    str3='<div class="h-div1" style="background-color: #ffb412">现金奖励</div>';
                }
                if(data[i].isFreeCityTour){
                    str4='<div class="h-div1">免费景点</div>';
                }

                //有地区地址就给地址加括号，没有就不加
                if(data[i].location){
                    data[i].location='('+data[i].location+')';
                }

                var str='<li class="ho_list">'+
                    '<div class="ho_pic">'+
                    '<img  src="../images/loading-hotel.gif" data-src="'+data[i].frontPgImage+'" class="ho_img"/ data-all="'+data[i]+'">'+
                    '</div>'+
                    '<div class="ho_infor">'+
                    '<p class="hname"  style="font-size:1.6rem;width:'+pWidth+'px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis">'+
                    (data[i].hotelNameLocale||'')+'('+data[i].hotelName+')'+
                    '</p>'+
                    '<div class="h-score">'+
                    '<span style="color:#8ed1cc;font-size:1.5rem;font-weight: 600;">'+data[i].hotelReviewScore+'</span>'+
                    '<span style="color:#999999;font-size:1rem;">分/'+data[i].hotelReviewCount+'人点评</span>'+
                    '<p class="hl_price">'+
                    '<span style="font-size:0.8rem;color:#fe4716;">￥</span>'+
                    '<span style="font-size:2rem;font-weight: 600;color:#fe4716;">'+data[i].avgPriceCNY+'</span>'+
                    '<span style="font-size:1.2rem;color:#999999;">起</span>'+
                    '</p>'+
                    '</div>'+
                    '<div class="h-grade">'+
                    '<span style="color:#999999;font-size:1rem;">'+num2chin(str1)+'星级</span>'+
                    str2+
                    str3+
                    str4+
                    '</div>'+
                    '<p class="h-address">'+data[i].city+data[i].location+'</p>'+
                    '</div>'+
                    '</li>';
                list_oUl.innerHTML+=str;
            }
            //懒加载
            function lazyLoad2(){
                lazyLoad.apply(this,arguments);
            }
            lazyLoad2.prototype=new lazyLoad();

            lazyLoad2.prototype.update=function(){
                //如图片都加载完成，返�?
                //alert(this.imgs.length);
                if(!this.imgs.length){return;}
                var i = this.imgs.length;
                for(--i;i>=0;i--){
                    if(this.shouldShow(i)){
                        //加载图片
                        var osrc=this.imgs[i].src;
                        this.imgs[i].src = this.imgs[i].getAttribute("data-src");
                        this.imgs[i].onerror=function(){
                            this.src='../images/hotelListerrorpic.png';
                        };
                        //清理缓存
                        this.imgs.splice(i,1);
                    }
                }
            };
            lazyLoad2.prototype.bindEvent=function(){
                var that = this;
                //节流处理，绑定Window 滑动和屏幕大小改变，也可替换成其它元素
                this.on(window,'scroll',function(){
                    throttle(that.update,{context : that});
                });
                this.on(document,'touchmove',function(){
                    throttle(that.update,{context : that});
                });
                this.on(window,'resize',function(){
                    throttle(that.update,{context : that});
                });

            };
            var c=new lazyLoad2('lsf_list','allElements');
        }else{
            var oLi=document.createElement('li');
            oLi.innerHTML='<div><img src="../images/hotelListNo.jpg" /><p class="hotelConSorry1">非常抱歉，无符合要求的酒店。</p><p class="hotelConSorry2">建议您扩大搜索范围</p></div>';
            oLi.className='hotelConNo';
            oUl.style.width='100%';
            oUl.style.height='100%';
            oUl.appendChild(oLi);
        }
        //位置交互部分
        function hlAddress(){
            var oUl=document.getElementById('l-ul');
            //模板添加内容
            //console.log(data_address);
            oUl.innerHTML='<li class="l-li l-liFirst">'+
                '<p class="l-p">不限</p>'+
                '<b class="l-icon1 l-icon1First"></b>'+
                '</li>';

            for(var i=0;i<data_address.length;i++){
                var str='<li class="l-li">'+
                    '<p class="l-p">{$adress$}</p>'+
                    '<b class="l-icon1"></b>'+
                    '</li>';
                str=str.replace(/\{\$\w+\$\}/g,function(s){
                    return data_address[i];
                });
                oUl.innerHTML+=str;
            }
            var liFirst=lsf_myweb.getbyclass(oUl,'l-liFirst')[0];
            var aLi=lsf_myweb.getbyclass(oUl,'l-li');
            var aB=lsf_myweb.getbyclass(oUl,'l-icon1');
            var oB=lsf_myweb.getbyclass(oUl,'l-icon1First')[0];
            var bOk=true;
            var aOk={};
            for(var i=1;i<aLi.length;i++){
                aOk[i]=true;
            }
            //联动选项
            //“不限”点击事件
            lsf_myweb.bind(liFirst,'click',function(){
                if(!bOk){
                    for(var i=1;i<aLi.length;i++){
                        lsf_myweb.removeClass(aLi[i],'l-li2')
                    }
                    lsf_myweb.removeClass(liFirst,'l-li3')
                    for(var i=1;i<aLi.length;i++){
                        aOk[i]=true;
                    }
                }else{
                    lsf_myweb.addClass(liFirst,'l-li3');
                    for(var i=1;i<aLi.length;i++){
                        lsf_myweb.addClass(aLi[i],'l-li2');
                    }
                    for(var i=1;i<aLi.length;i++){
                        aOk[i]=false;
                    }
                }
                bOk=!bOk;
            });
            //每个地区的点击事件
            for(var i=1;i<aLi.length;i++){
                (function(index){
                    lsf_myweb.bind(aLi[index],'click',function(){
                        if(aOk[index]){
                            lsf_myweb.addClass(aLi[index],'l-li2');
                        }else{
                            lsf_myweb.removeClass(aLi[index],'l-li2');
                        }
                        aOk[index]=!aOk[index];
                        var n=0;
                        for(var j=1;j<aLi.length;j++){
                            if(!aOk[j]){
                                lsf_myweb.addClass(liFirst,'l-li3');
                                bOk=false;
                            }else{
                                n++;
                            }
                        }
                        if(n==aLi.length-1){
                            lsf_myweb.removeClass(liFirst,'l-li3');
                            bOk=true;
                        }
                    });
                })(i);
            }
        }
        //如果是第一次执行就加载城市，如果不是第一次执行就不用二次加载了，间接实现历史记忆功能
        if(addressBok){
            hlAddress();
        }
        addressBok=false;

        $(function () {
            //$("#status-h").fadeOut();
            //$("#preloader").delay(400).fadeOut("medium");
            var timer=null;
            clearInterval(timer);
            timer=setInterval(function(){
                if($('#lsf_list').children().length){
                    $("#status-h").fadeOut();
                    $("#preloader").delay(400).fadeOut("medium");
                    clearInterval(timer);
                }
                //console.log($('#lsf_list').children().length);
            },30);
        });


    }
    //历史记忆功能
    //推荐排序实现记忆功能
    function sortHistory(){
        var hlSortLi=lsf_myweb.getbyid('rank').children;
        var myAsiaHlHistory=JSON.parse(window.sessionStorage.getItem('asiaHlHistory'));
        console.log(myAsiaHlHistory);
        if(!myAsiaHlHistory.hlSort)return;
        for(var i=0;i<hlSortLi.length;i++){
            if(hlSortLi[i].innerHTML.indexOf(myAsiaHlHistory.hlSort.chinese)!=-1){
                url_json.rank=myAsiaHlHistory.hlSort.english;
                for(var j=0;j<hlSortLi.length;j++){
                    hlSortLi[j].style.color='#b3b2b4';
                    var oB=hlSortLi[j].getElementsByTagName('b');
                    if(oB.length){
                        hlSortLi[j].removeChild(oB[0]);
                    }
                }
                hlSortLi[i].style.color='#fc9464';
                var b = document.createElement("b");
                b.className = "hl-icon5";
                hlSortLi[i].appendChild(b);
            }
        }
    }
    sortHistory();
    //筛选实现记忆功能
    function filterHistory(){
        var myAsiaHlHistory=JSON.parse(window.sessionStorage.getItem('asiaHlHistory'));
        console.log(myAsiaHlHistory.hlFilter);
        if(!myAsiaHlHistory.hlFilter)return;
        var hLevel=document.getElementById('h-level');
        var hType=document.getElementById('h-type');
        var hLevelLi=hLevel.children;
        var hTypeLi=hType.children;
        function filterAli(obj){
            for(var j=0;j<obj.length;j++){
                obj[j].className='s-li';
            }
            for(var i=0;i<obj.length;i++){
                if(myAsiaHlHistory.hlFilter.chinese.indexOf(obj[i].innerHTML)!=-1){
                    obj[i].className='s-li1';
                }
            }
        }
        filterAli(hLevelLi);
        filterAli(hTypeLi);
        url_json.StarRating=myAsiaHlHistory.hlFilter.star;
        url_json.Category=myAsiaHlHistory.hlFilter.hotelType;
    }
    filterHistory();

    console.log(url_json);
    console.log('22222');
    M(url_json);
    function mycallback(d){
        //console.log(d);
        var json=eval('('+d+')');
        console.log(json);
        //console.log(1);
        //alert(arr.Success);
        if(json.success){
            //console.log(json.Data);
            var data=json.data[0];
            console.log(data);
            console.log(2);
            //console.log(data.HotelList);
            V(data);
            //绑定跳转事件
            getDetail(data);
        }else{
            if(json.message=='There is no hotel on the selected destination.'){
                var data={'hotelList':[],'locationList':[]};
                V(data);
            }else{
                //alert(json.message);
                //console.log(json.message);
                var data={'hotelList':[],'locationList':[]};
                V(data);
            }
            //window.history.go(-1);
        }

    }
    //推荐排序里面的点击事件（交互）
    lsf_myweb.bind(oBody,'click',function(ev){
        var oEvent=ev||event;
        var oSrc=oEvent.srcElement||oEvent.target;
        hlHis.hlSort={"chinese":'',"english":''};
        if(oSrc.className=='r-li'){
            var oSrc_str=oSrc.innerHTML;
            if(oSrc_str.indexOf('推荐排序')!=-1){
                url_json.rank='PriorityDESC';
                hlHis.hlSort.chinese='推荐排序';
                hlHis.hlSort.english='PriorityDESC';
            }else if(oSrc_str.indexOf('价格升序')!=-1){
                url_json.rank='PriceASC';
                hlHis.hlSort.chinese='价格升序';
                hlHis.hlSort.english='PriceASC';
            }else if(oSrc_str.indexOf('价格降序')!=-1){
                url_json.rank='PriceDESC';
                hlHis.hlSort.chinese='价格降序';
                hlHis.hlSort.english='PriceDESC';
            }else if(oSrc_str.indexOf('好评优先')!=-1){
                url_json.rank='ReviewscoreDESC';
                hlHis.hlSort.chinese='好评优先';
                hlHis.hlSort.english='ReviewscoreDESC';
            }
            lsf_myweb.setSession('asiaHlHistory',hlHis);
            M(url_json);
        }
    });
    //筛选里面确定按钮的点击事件（交互）
    lsf_myweb.bind(oBody,'click',function(ev){
        var oEvent=ev||event;
        var oFilter=document.getElementById('screen');
        var oSrc=oEvent.srcElement||oEvent.target;
        //设置弹出框的最大高度
        var clienH=document.documentElement.clientHeight;
        oFilter.style.maxHeight=(clienH-45)+'px';

        //确定按钮点击事件
        if(oSrc.getAttribute('id')=='s_but'){
            var hl_star_str='';
            var hl_type_str='';
            var hl_star_type=lsf_myweb.getbyclass(lsf_myweb.getbyid('screen'),'s-li1');
            hlHis.hlFilter={"chinese":'',"star":'',"hotelType":''};
            for(var i=0;i<hl_star_type.length;i++){
                switch(hl_star_type[i].innerHTML){
                    case '二星级以下':
                        hl_star_str+='2$';
                        hlHis.hlFilter.chinese+='二星级以下$';
                        hlHis.hlFilter.star+='2$';
                        break;
                    case '三星':
                        hl_star_str+='3$';
                        hlHis.hlFilter.chinese+='三星$';
                        hlHis.hlFilter.star+='3$';
                        break;
                    case '四星':
                        hl_star_str+='4$';
                        hlHis.hlFilter.chinese+='四星$';
                        hlHis.hlFilter.star+='4$';
                        break;
                    case '五星':
                        hl_star_str+='5$';
                        hlHis.hlFilter.chinese+='五星$';
                        hlHis.hlFilter.star+='5$';
                        break;
                    case '酒店':
                        hl_type_str+='1$';
                        hlHis.hlFilter.chinese+='酒店$';
                        hlHis.hlFilter.hotelType+='1$';
                        break;
                    case '汽车旅馆':
                        hl_type_str+='2$';
                        hlHis.hlFilter.chinese+='汽车旅馆$';
                        hlHis.hlFilter.hotelType+='2$';
                        break;
                    case '酒店式公寓':
                        hl_type_str+='3$';
                        hlHis.hlFilter.chinese+='酒店式公寓$';
                        hlHis.hlFilter.hotelType+='2$';
                        break;
                    case '家庭旅馆':
                        hl_type_str+='4$';
                        hlHis.hlFilter.chinese+='家庭旅馆$';
                        hlHis.hlFilter.hotelType+='4$';
                        break;
                    case '背包客栈':
                        hl_type_str+='5$';
                        hlHis.hlFilter.chinese+='背包客栈$';
                        hlHis.hlFilter.hotelType+='5$';
                        break;
                    case '宾馆/招待所':
                        hl_type_str+='6$';
                        hlHis.hlFilter.chinese+='宾馆/招待所$';
                        hlHis.hlFilter.hotelType+='6$';
                        break;
                    case '精品酒店':
                        hl_type_str+='7$';
                        hlHis.hlFilter.chinese+='精品酒店$';
                        hlHis.hlFilter.hotelType+='7$';
                        break;
                    case '度假类酒店':
                        hl_type_str+='8$';
                        hlHis.hlFilter.chinese+='度假类酒店$';
                        hlHis.hlFilter.hotelType+='8$';
                        break;
                    case '游轮度假酒店':
                        hl_type_str+='9$';
                        hlHis.hlFilter.chinese+='游轮度假酒店$';
                        hlHis.hlFilter.hotelType+='9$';
                        break;
                    case '别墅型酒店':
                        hl_type_str+='10$';
                        hlHis.hlFilter.chinese+='别墅型酒店$';
                        hlHis.hlFilter.hotelType+='10$';
                        break;
                    case '乡村平房酒店':
                        hl_type_str+='11$';
                        hlHis.hlFilter.chinese+='乡村平房酒店$';
                        hlHis.hlFilter.hotelType+='11$';
                        break;
                    case '家庭寄宿':
                        hl_type_str+='12$';
                        hlHis.hlFilter.chinese+='家庭寄宿$';
                        hlHis.hlFilter.hotelType+='12$';
                        break;
                    case '农舍式房子':
                        hl_type_str+='13$';
                        hlHis.hlFilter.chinese+='农舍式房子$';
                        hlHis.hlFilter.hotelType+='13$';
                        break;
                    case '豪华露营地':
                        hl_type_str+='14$';
                        hlHis.hlFilter.chinese+='豪华露营地$';
                        hlHis.hlFilter.hotelType+='14$';
                        break;
                    case '标准露营地':
                        hl_type_str+='15$';
                        hlHis.hlFilter.chinese+='标准露营地$';
                        hlHis.hlFilter.hotelType+='15$';
                        break;
                };
            }
            hlHis.hlFilter.chinese=hlHis.hlFilter.chinese.substring(0,hlHis.hlFilter.chinese.length-1);
            hlHis.hlFilter.hotelType=hlHis.hlFilter.hotelType.substring(0,hlHis.hlFilter.hotelType.length-1);
            lsf_myweb.setSession('asiaHlHistory',hlHis);
            hl_star_str=hl_star_str.substring(0,(hl_star_str.length-1));
            hl_type_str=hl_type_str.substring(0,(hl_type_str.length-1));
            url_json.StarRating=hl_star_str;
            url_json.Category=hl_type_str;
            M(url_json);
            //alert(hl_star_str+'---'+hl_type_str);
        }
    });
    //位置按钮里面的城市实现筛选交互
    lsf_myweb.bind(oBody,'click',function(ev){
        var oEvent=ev||event;
        var oLocation=document.getElementById('location');
        var loca_con=document.getElementById('loca_con');
        var loca_conBro=document.getElementById('loca_conBro');
        //设置弹出框的最大高度
        var clienH=document.documentElement.clientHeight;
        loca_conBro.style.height=loca_con.offsetHeight+'px';
        //bottom:0为了实现滑动效果,如果没有bottom:0;内容就不可滑动
        loca_con.style.bottom='0';
        oLocation.style.maxHeight=(clienH-45)+'px';
        var oSrc=oEvent.srcElement||oEvent.target;
        var locationList='';
        if(oSrc.getAttribute('id')=='l_but'){
            var targetLi=lsf_myweb.getbyclass(lsf_myweb.getbyid('l-ul'),'l-li2');
            for(var i=0;i<targetLi.length;i++){
                var cityName=targetLi[i].children[0];
                locationList+=cityName.innerHTML+'$';
                if(i==targetLi.length-1){
                    locationList+=cityName.innerHTML;
                }
            }
            url_json.LocationList=locationList;
            M(url_json);
        }
    });
    //获取酒店详情
    function getDetail(data){
        //console.log(url_json);
        //console.log(data);
        data=data.hotelList;
        var hotelRefers = document.getElementsByClassName('ho_list');
        var toDetail= function(that){
            var paraObj= new Object();
            paraObj.HotelID=data[that.index].hotelCode;
            paraObj.HotelCode=data[that.index].hotelCode;

            // paraObj.PartnerCode=data[that.index].PartnerCode!=null?data[that.index].PartnerCode:1000;
            paraObj.InstantConfirmation=data[that.index].InstantConfirmation!=undefined?data[that.index].InstantConfirmation:false;
            paraObj.AllOccupancy=data[that.index].AllOccupancy!=undefined?data[that.index].AllOccupancy:true;

            paraObj.CheckInDate=url_json.InterCheckInDate;
            paraObj.CheckOutDate=url_json.InterCheckOutDate;
            paraObj.NumRoom=url_json.NumRoom;
            paraObj.NumAdult=url_json.NumAdult;
            paraObj.NumChild=url_json.NumChild;

            var paramStr = "";
            for(var attr in paraObj){
                paramStr+="&"+attr+"="+paraObj[attr];
            }
            paramStr=paramStr.slice(1);
            window.location.href='hotel_detail.html?'+paramStr;
        }


        for(var i = 0;i<hotelRefers.length;i++){
            hotelRefers[i].index = i;
            hotelRefers[i].onclick=function(){
                var that=this;
                toDetail(that);
            }

        }
    }
    var hl_hiddenBox=document.getElementById('hl_hiddenBox');
    $('#hl_hiddenBox').bind("touchmove",function(ev){
        //ev.preventDefault();
        ev.stopPropagation?ev.stopPropagation():ev.cancelBubble=true;
    });
})();