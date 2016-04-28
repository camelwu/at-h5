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
    bind:function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
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



(function(){
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
})();

(function(){
    var list_oUl=lsf_myweb.getbyid('lsf_list');
    var pWidth=list_oUl.offsetWidth-140;
    var str=window.location.href;
    var url_json=url2json(str);
    var oBody=document.getElementsByTagName('body')[0];
    var oBtn=document.getElementById('s_but');
    //console.log(url_json);



    //交互部分
    function M(json){
        json=json||{};
        json.rank=json.rank||'priceasc';
        json.CityName=json.CityName||'Singapore';
        json.NumRoom=json.NumRoom||'1';
        json.NumChild=json.NumChild||'1';
        json.NumAdult=json.NumAdult||'1';
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
            "Parameters": "{\"CultureName\":\"zh-CN\",\"PartnerCode\":\"1000\",\"CountryISOCode\":\"SG\",\"CityName\":\""+json.CityName+"\",\"CheckInDate\":\""+json.CheckInDate+"T00:00:00\",\"CheckOutDate\":\""+json.CheckOutDate+"T00:00:00\",\"NumRoom\":"+json.NumRoom+",\"NumAdult\":"+json.NumAdult+",\"NumChild\":"+json.NumChild+",\"InstantConfirmation\":true,\"AllOccupancy\":true,\"PageIndex\":1,\"PageSize\":20,\"sorttype\":\""+json.rank+"\"}",
            "Code": "0007",
            "ForeEndType": 3
        };
        //alert(data.Parameters);
        return  c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
    }




    //数据展示部分
    function V(data){
        if(!data)return;
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
                str3='<div class="h-div1" style="margin-right: 3px;background-color: #ffb412">现金奖励</div>';
            }
            if(data[i].IsFreeCityTour){
                str4='<div class="h-div1">免费景点</div>';
            }


            var str='<li class="ho_list">'+
                '<div class="ho_pic">'+
                '<img  src="images/cars.png" data-src="'+data[i].FrontPgImage+'" class="ho_img"/ data-all="'+data[i]+'">'+
                '</div>'+
                '<div class="ho_infor">'+
                '<p class="hname"  style="font-size:1.4rem;width:'+pWidth+'px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-ellipsis:ellipsis">'+
                data[i].HotelNameLocale+'('+data[i].HotelName+')'+
            '</p>'+
                '<div class="h-score">'+
                '<span style="color:#8ed1cc;font-size:1.5em;font-weight: 600;">'+data[i].HotelReviewScore+'</span>'+
                '<span style="color:#999999;font-size:0.8em;">分/'+data[i].HotelReviewCount+'人点评</span>'+
                '<p class="price">'+
                '<span style="font-size:0.8em;color:#fe4716;">￥</span>'+
                '<span style="font-size:2em;font-weight: 600;color:#fe4716;">'+data[i].AvgPrice+'</span>'+
                '<span style="font-size:0.8em;color:#999999;">起</span>'+
                '</p>'+
                '</div>'+
                '<div class="h-grade">'+
                '<span style="color:#999999;font-size:1em;">'+num2chin(str1)+'星级</span>'+
                str2+
                str3+
                str4+
                '</div>'+
                '<p class="h-address">'+data[i].City+'('+data[i].Location+')'+'</p>'+
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
            //如图片都加载完成，返回
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
        var arr=eval('('+d+')');
        //console.log(arr.Data);
        var data=arr.Data;
        //console.log(data);
        V(data);
        //绑定跳转事件
        getDetail(data);
    }

    oBody.onclick=function(ev){
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
    };
    //获取酒店详情
    function getDetail(data){
        console.log(data)
        var hotelRefers = document.getElementsByClassName('ho_img');
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
            paraObj.FrontPgImage=that.getAttribute('data-src');

            var paramStr = "";
            for(var attr in paraObj){
                paramStr+="&"+attr+"="+paraObj[attr];
            }
            paramStr=paramStr.slice(1);
            console.log(paramStr)  //HotelID=3283&HotelCode=3283&InstantConfirmation=false&AllOccupancy=true&CheckInDate=2015-12-31&CheckOutDate=2016-1-1&NumRoom=1&NumAdult=1&NumChild=0&FrontPgImage=http://images.asiatravel.com/Hotel/3283/3283front.jpg
            window.location.href='jyy_hotelDetail.html?'+paramStr;
        }


        for(var i = 0;i<hotelRefers.length;i++){
            console.log(data)
            hotelRefers[i].index = i;
            hotelRefers[i].onclick=function(){
                var that=this;
                toDetail(that);
            }

        }
    }



//懒加载
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
     //滚动的时候如果图片的后缀名是png说明是这张图片是预订好图片
     if(aImg[i].offsetTop<clienH&&str=='png'){
     aImg[i].src=aImg[i].dataset.src;
     }
     //这样能够判断错误也能够换成想要的图片，但是会一直报错，报404页面错误
     aImg[i].onerror=function(){
     this.src='images/cars.png';
     }
     }
     };
     })();*/
//懒加载
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