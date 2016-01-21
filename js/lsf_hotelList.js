




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
    }
};

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
        //$("#status").fadeOut();
        //$("#preloader").delay(400).fadeOut("medium");
        var timer=null;
        timer=setInterval(function(){
            if($('#lsf_list').children().length){
                $("#status").fadeOut();
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
    console.log(url_json);


    //交互部分
    function M(json){
        console.log(json);
        json=json||{};
        json.rank=json.rank||'priceasc';
        json.CityName=json.CityName||'Singapore';
        json.NumRoom=json.NumRoom||'1';
        json.NumChild=json.NumChild||'1';
        json.NumAdult=json.NumAdult||'1';
        json.Category=json.Category||'';
        json.StarRating=json.StarRating||'';
        var oDate=new Date();
        var y=oDate.getFullYear();
        var m=oDate.getMonth()+1;
        var d=oDate.getDate();
        json.CheckInDate=json.CheckInDate||y+'-'+m+'-'+d;
        json.CheckOutDate=json.CheckOutDate||y+'-'+m+'-'+(d+1);
        var c = new vcm();
        //alert(url_json.NumRoom);
        var data =
        {
            "Parameters": "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\"SG\",\"CityName\":\""+json.InterCityName+"\",\"CheckInDate\":\""+json.InterCheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.InterCheckOutDate+"T00:00:00\",\"NumRoom\":"+json.NumRoom+",\"NumAdult\":"+json.NumAdult+",\"NumChild\":"+json.NumChild+",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\""+json.rank+"\",\"Category\":\""+json.Category+"\",\"StarRating\":\""+json.StarRating+"\"}",
            "Code": "0007",
            "ForeEndType": 3
        };
        //alert(data.Parameters);
        return  c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
    }




    //数据展示部分
    function V(data){
        if(!data)return;
        //console.log(data);
        var data_address=data.LocationList;
        var data=data.HotelList;
        //console.log(data_address);
        var timer=null;
        var oUl=lsf_myweb.getbyid('lsf_list');

        list_oUl.innerHTML='';
        for(var i=0;i<data.length;i++){
            var  str1=data[i].StarRating.substring(0,1);
            var str2='';
            var str3='';
            var str4='';
            if(data[i].IsFreeWifi){
                str2+='<b class="hl-icon1"></b>';
            }
            if(data[i].IsFreeTransfer){
                str2+='<b class="hl-icon2"></b>';
            }
            if(data[i].IsCashReward){
                str3='<div class="h-div1" style="background-color: #ffb412">现金奖励</div>';
            }
            if(data[i].IsFreeCityTour){
                str4='<div class="h-div1">免费景点</div>';
            }

            //有地区地址就给地址加括号，没有就不加
            if(data[i].Location){
                data[i].Location='('+data[i].Location+')';
            }

            var str='<li class="ho_list">'+
                '<div class="ho_pic">'+
                '<img  src="images/cars.png" data-src="'+data[i].FrontPgImage+'" class="ho_img"/ data-all="'+data[i]+'">'+
                '</div>'+
                '<div class="ho_infor">'+
                '<p class="hname"  style="font-size:1.6rem;width:'+pWidth+'px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-overflow:ellipsis">'+
                data[i].HotelNameLocale+'('+data[i].HotelName+')'+
            '</p>'+
                '<div class="h-score">'+
                '<span style="color:#8ed1cc;font-size:1.5rem;font-weight: 600;">'+data[i].HotelReviewScore+'</span>'+
                '<span style="color:#999999;font-size:1rem;">分/'+data[i].HotelReviewCount+'人点评</span>'+
                '<p class="price">'+
                '<span style="font-size:0.8rem;color:#fe4716;">￥</span>'+
                '<span style="font-size:2rem;font-weight: 600;color:#fe4716;">'+parseFloat(data[i].AvgPrice).toFixed(2)+'</span>'+
                '<span style="font-size:1.2rem;color:#999999;">起</span>'+
                '</p>'+
                '</div>'+
                '<div class="h-grade">'+
                '<span style="color:#999999;font-size:1rem;">'+num2chin(str1)+'星级</span>'+
                str2+
                str3+
                str4+
                '</div>'+
                '<p class="h-address">'+data[i].City+data[i].Location+'</p>'+
                '</div>'+
                '</li>';
            list_oUl.innerHTML+=str;
        }

        //位置交互部分
        function hlAddress(){
            var oUl=document.getElementById('l-ul');
            //模板添加内容
            console.log(data_address);
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
                    oB.style.background='url(images/ui/icons1.png) -236px -6px';
                    oB.style.backgroundSize='400px 120px';
                    for(var i=1;i<aB.length;i++){
                        aB[i].style.background='url(images/ui/icons1.png) -265px -6px';
                        aB[i].style.backgroundSize='400px 120px';
                    }
                    for(var i=1;i<aLi.length;i++){
                        aOk[i]=true;
                    }
                }else{
                    oB.style.background='url(images/ui/icons1.png) -265px -6px';
                    oB.style.backgroundSize='400px 120px';
                    for(var i=1;i<aB.length;i++){
                        aB[i].style.background='url(images/ui/icons1.png) -236px -6px';
                        aB[i].style.backgroundSize='400px 120px';
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
                            aB[index].style.background='url(images/ui/icons1.png) -236px -6px';
                            aB[index].style.backgroundSize='400px 120px';
                        }else{
                            aB[index].style.background='url(images/ui/icons1.png) -265px -6px';
                            aB[index].style.backgroundSize='400px 120px';
                        }
                        aOk[index]=!aOk[index];
                        var n=0;
                        for(var j=1;j<aLi.length;j++){
                            if(!aOk[j]){
                                oB.style.background='url(images/ui/icons1.png) -265px -6px';
                                oB.style.backgroundSize='400px 120px';
                                bOk=false;
                            }else{
                                n++;
                            }
                        }
                        if(n==aLi.length-1){
                            oB.style.background='url(images/ui/icons1.png) -236px -6px';
                            oB.style.backgroundSize='400px 120px';
                            bOk=true;
                        }
                    });
                })(i);
            }
        }
        hlAddress();
        //懒加�?
        function lazyLoad2(){
            lazyLoad.apply(this,arguments);
        }
        lazyLoad2.prototype=new lazyLoad();
        lazyLoad2.prototype.update=function(){
            //如图片都加载完成，返�?
            if(!this.imgs.length){return;}
            var i = this.imgs.length;
            for(--i;i>=0;i--){
                if(this.shouldShow(i)){
                    //加载图片
                    var osrc=this.imgs[i].src;
                    this.imgs[i].src = this.imgs[i].getAttribute("data-src");
                    this.imgs[i].onerror=function(){
                        this.src=osrc;
                    };
                    //清理缓存
                    this.imgs.splice(i,1);
                }
            }
        }
        var c=new lazyLoad2('lsf_list');
        //绑定图片src
        document.getElementsByClassName('hotelcontent')[0].getElementsByClassName('ho_img');
    }


    M(url_json);
    function mycallback(d){
        //console.log(d);
        var json=eval('('+d+')');
        console.log(json);
        console.log(1);
        //alert(arr.Success);
        if(json.Success){
            //console.log(json.Data);
            var data=json.Data[0];
            console.log(data);
            //console.log(data.HotelList);
            V(data);
            //绑定跳转事件
            getDetail(data);
        }else{
            alert(json.Message);
        }

    }

    lsf_myweb.bind(oBody,'click',function(ev){
        var oEvent=ev||event;
        var oSrc=oEvent.srcElement||oEvent.target;
        if(oSrc.className=='r-li'){
            var oSrc_str=oSrc.innerHTML;
            if(oSrc_str.indexOf('价格升序')!=-1){
                url_json.rank='PriceASC';
            }else if(oSrc_str.indexOf('价格降序')!=-1){
                url_json.rank='PriceDESC';
            }else if(oSrc_str.indexOf('好评优先')!=-1){
                url_json.rank='ReviewscoreDESC';
            }
            M(url_json);
        }
    });
    lsf_myweb.bind(lsf_myweb.getbyid('s_but'),'click',function(ev){
        var hl_star_str='';
        var hl_type_str='';
        var hl_star_type=lsf_myweb.getbyclass(lsf_myweb.getbyid('screen'),'s-li1');
        for(var i=0;i<hl_star_type.length;i++){
            switch(hl_star_type[i].innerHTML){
                case '二星级以下':
                    hl_star_str+='2$';
                    break;
                case '三星':
                    hl_star_str+='3$';
                    break;
                case '四星':
                    hl_star_str+='4$';
                    break;
                case '五星':
                    hl_star_str+='5$';
                    break;
                case '酒店':
                    hl_type_str+='1$';
                    break;
                case '汽车旅馆':
                    hl_type_str+='2$';
                    break;
                case '酒店式公寓':
                    hl_type_str+='3$';
                    break;
                case '家庭旅馆':
                    hl_type_str+='4$';
                    break;
                case '背包客栈':
                    hl_type_str+='5$';
                    break;
                case '宾馆/招待所':
                    hl_type_str+='6$';
                    break;
                case '精品酒店':
                    hl_type_str+='7$';
                    break;
                case '度假类酒店':
                    hl_type_str+='8$';
                    break;
                case '游轮度假酒店':
                    hl_type_str+='9$';
                    break;
                case '别墅型酒店':
                    hl_type_str+='10$';
                    break;
                case '乡村平房酒店':
                    hl_type_str+='11$';
                    break;
                case '家庭寄宿':
                    hl_type_str+='12$';
                    break;
                case '农舍式房子':
                    hl_type_str+='13$';
                    break;
                case '豪华露营地':
                    hl_type_str+='14$';
                    break;
                case '标准露营地':
                    hl_type_str+='15$';
                    break;
            };
        }
        hl_star_str=hl_star_str.substring(0,(hl_star_str.length-1));
        hl_type_str=hl_type_str.substring(0,(hl_type_str.length-1));
        url_json.StarRating=hl_star_str;
        url_json.Category=hl_type_str;
        M(url_json);
        //alert(hl_star_str+'---'+hl_type_str);
    });
    //获取酒店详情
    function getDetail(data){
        data=data.HotelList;
        var hotelRefers = document.getElementsByClassName('ho_list');
        var toDetail= function(that){
            var paraObj= new Object();
            paraObj.HotelID=data[that.index].HotelCode;
            paraObj.HotelCode=data[that.index].HotelCode;

            // paraObj.PartnerCode=data[that.index].PartnerCode!=null?data[that.index].PartnerCode:1000;
            paraObj.InstantConfirmation=data[that.index].InstantConfirmation!=undefined?data[that.index].InstantConfirmation:false;
            paraObj.AllOccupancy=data[that.index].AllOccupancy!=undefined?data[that.index].AllOccupancy:true;

            paraObj.CheckInDate=url_json.CheckInDate;
            paraObj.CheckOutDate=url_json.CheckOutDate;
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



//懒加�?
    /*(function(){
     window.onscroll=window.onresize=function(){
     var oUl=document.getElementById('lsf_list');
     var aImg=document.getElementsByClassName('ho_img');
     var clienH=document.documentElement.scrollTop||document.body.scrollTop+document.documentElement.clientHeight;
     //console.log(document.documentElement.clientHeight);
     //console.log(document.documentElement.scrollTop||document.body.scrollTop)
     //console.log(clienH);
     for(var i=0;i<aImg.length;i++){
     var str=aImg[i].src.substring(aImg[i].src.lastIndexOf('.')+1);
     //滚动的时候如果图片的后缀名是png说明是这张图片是预定好图�?
     if(aImg[i].offsetTop<clienH&&str=='png'){
     aImg[i].src=aImg[i].dataset.src;
     }
     //这样能够判断错误也能够换成想要的图片，但是会�?直报错，�?404页面错误
     aImg[i].onerror=function(){
     this.src='images/cars.png';
     }
     }
     };
     })();*/
//懒加�?
    /*(function(){
     var timer=null;
     var oUl=lsf_myweb.getbyid('lsf_list');
     function lazyLoad2(){
     lazyLoad.apply(this,arguments);
     }
     lazyLoad2.prototype=new lazyLoad();
     timer=setInterval(function(){
     if(oUl.getElementsByTagName('img').length){
     var c=new lazyLoad2('lsf_list');
     clearInterval(timer);
     }
     },30);
     })();*/
})();