"use strict";
    //$(window).load(function(){
    //    $('#status').fadeOut();
    //    $('#preloader').delay(400).fadeOut('medium');
    //});
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
//���Ǽ�Ӣ�����ֻ��ɺ���
function num2chin(num){
    switch(num){
        case '0':
            return '��';
            break;
        case '1':
            return 'һ';
            break;
        case '2':
            return '��';
            break;
        case '3':
            return '��';
            break;
        case '4':
            return '��';
            break;
        case '5':
            return '��';
            break;
        default:
            return '��';
            break;
    };
}
//��url�ַ������json
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
    var list_oUl=document.getElementById('lsf_list');
    var pWidth=list_oUl.offsetWidth-140;
    var str=window.location.href;
    //�ѵõ���url��url2json���д���Ȼ�󸳸�url_json
    var url_json=url2json(str);
    var oBody=document.getElementsByTagName('body')[0];
    var oBtn=document.getElementById('s_but');
    //console.log(url_json);

    //��������
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
    //����չʾ����
    function V(data){
        if(!data)return;
        list_oUl.innerHTML='';
        for(var i=0;i<data.length;i++){
            var  str1=data[i].StarRating.substring(0,1);
            var str2='';
            var str3='';
            var str4='';
            if(data[i].IsFreeWifi){
                str2+='<i class="fl ho_i1">';
            }
            if(data[i].IsFreeTransfer){
                str2+='<i class="fl ho_i2"></i>';
            }
            if(data[i].IsCashReward){
                str3='<b class="fr ho_b1">�ֽ���</b>';
            }
            if(data[i].IsFreeCityTour){
                str4='<b class="fr ho_b2">��Ѿ���</b>';
            }

            /* var str='<li class="h-li" style="border-bottom:1px solid #dfdfdd">'+
             '<div class="hdiv"><img class="hotelPic" src="images/cars.png" data-src="'+data[i].FrontPgImage+'"></div>'+
             '<div class="detail" >'+
             '<p class="hname" style="font-size:1.4rem;width:'+pWidth+'px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-ellipsis:ellipsis">'+
             data[i].HotelNameLocale+'('+data[i].HotelName+')'+
             '</p>'+
             '<div class="h-score">'+
             '<span style="color:#8ed1cc;font-size:1.5em;font-weight: 600;">'+data[i].HotelReviewScore+'</span>'+
             '<span style="color:#999999;font-size:0.8em;">��/'+data[i].HotelReviewCount+'�˵���</span>'+
             '<p class="price">'+
             '<span style="font-size:0.8em;color:#fe4716;">��</span>'+
             '<span style="font-size:2em;font-weight: 600;color:#fe4716;">'+data[i].AvgPrice+'</span>'+
             '<span style="font-size:0.8em;color:#999999;">��</span>'+
             '</p>'+
             '</div>'+
             '<div class="h-grade">'+
             '<span style="color:#999999;font-size:1em;">'+num2chin(str1)+'�Ǽ�</span>'+
             str2+
             str4+
             str3+
             '</div>'+
             '<p class="h-address">'+data[i].City+'('+data[i].Location+')</p>'+
             '</div>'+
             '</li>';*/

            var str='<li class="ho_list">'+
                '<div class="ho_pic">'+
                '<img  src="images/cars.png" data-src="'+data[i].FrontPgImage+'"  class="ho_img">'+
                '</div>'+
                '<div class="ho_infor">'+
                '<h2 style="font-size:1.4rem;width:'+pWidth+'px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-text-ellipsis:ellipsis">'+data[i].HotelNameLocale+'('+data[i].HotelName+')'+'</h2>'+
                '<div class="ho_grade clearfix">'+
                '<span class="fl"><em>'+data[i].HotelReviewScore+'</em><i>��/'+data[i].HotelReviewCount+'�˵���</i></span><span class="fr ho_price"><b>��</b><strong>'+data[i].AvgPrice+'</strong>��</span>'+
                '</div>'+
                '<div class="ho_star clearfix">'+
                '<span class="fl">'+num2chin(str1)+'�Ǽ�</span>'+
                str2+
                str3+
                str4+
                '</div>'+
                '<div class="ho_adress">'+data[i].City+'('+data[i].Location+')'+
                '</div>'+
                '</div>'+
                '</li>';
            list_oUl.innerHTML+=str;
            var clienH=document.documentElement.scrollTop||document.body.scrollTop+document.documentElement.clientHeight;
            var lastLi=list_oUl.children[list_oUl.children.length-1];
            var oImg=lastLi.getElementsByClassName('ho_img')[0];
            console.log(oImg.offsetTop+'+++'+clienH);
            if(oImg.offsetTop<=clienH){
                oImg.src=oImg.dataset.src;
            }
        }
    }
    //�������涨��Ľ�������
    M(url_json);
    function mycallback(d){
        //console.log(d);
        var arr=eval('('+d+')');
        //console.log(arr.Data);
        var data=arr.Data;
        //console.log(data);
        V(data);
    }

    oBody.onclick=function(ev){
        var oEvent=ev||event;
        var oSrc=oEvent.srcElement||oEvent.target;
        if(oSrc.className=='r-li'){
            var oSrc_str=oSrc.innerHTML;
            if(oSrc_str.indexOf('�۸�����')!=-1){
                url_json.rank='PriceASC';
            }else if(oSrc_str.indexOf('�۸���')!=-1){
                url_json.rank='PriceDESC';
            }else if(oSrc_str.indexOf('��������')!=-1){
                url_json.rank='ReviewscoreDESC';
            }
            M(url_json);
        }
    };

})();
//������
(function(){
    //alert(window.innerHeight);
    //var oUl=document.getElementById('lsf_list');
    //var myAll=document.getElementsByClassName('all_elements')[0];
    //alert(window.innerHeight);
    //alert(document.documentElement.clientHeight);
    //��window.onscroll�����𣿣�������
    window.onscroll=window.onresize=function(){
        var oUl=document.getElementById('lsf_list');
        var aImg=document.getElementsByClassName('ho_img');
        var clienH=document.documentElement.scrollTop||document.body.scrollTop+document.documentElement.clientHeight;
        //console.log(document.documentElement.clientHeight);
        //console.log(document.documentElement.scrollTop||document.body.scrollTop)
        //console.log(clienH);
        for(var i=0;i<aImg.length;i++){
            var str=aImg[i].src.substring(aImg[i].src.lastIndexOf('.')+1);
            //������ʱ�����ͼƬ�ĺ�׺����png˵��������ͼƬ��Ԥ����ͼƬ
            if(aImg[i].offsetTop<clienH){
                alert(i);
            }
            if(aImg[i].offsetTop<clienH&&str=='png'){
                alert(i);
                aImg[i].src=aImg[i].dataset.src;
            }
            //�����ܹ��жϴ���Ҳ�ܹ�������Ҫ��ͼƬ�����ǻ�һֱ������404ҳ�����
            aImg[i].onerror=function(){
                this.src='images/cars.png';
            }
        }
    };
})();