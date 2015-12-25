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
(function(){
    //最大字数设置
    function maxWord(str){
        var n=count(str).n;
        var a=count(str).a;
        var len=n;
        if(len>=110){
            return str.substring(0,a)+'...';
        }else{
            return str;
        }
    }
    //统计字数
    function count(str){
        var result={};
        var adress=110;
        var num=0;
        for(var i=0;i<str.length;i++){
            if(str.charCodeAt(i)>=0x4e00&&str.charCodeAt(i)<=0x9fa5){
                num+=3;
            }else{
                num+=1;
            }
            if(num<=adress){
                result.a=i;
            }
        }
        result.n=num;
        return result;
    }
    //交互部分
    function M(json){
        json=json||{};
        if(!json.HotelID)return;
        var c=new vcm();
        var data= {
            "Parameters": "{\"HotelID\":"+json.HotelID+",\"CultureName\":\"en - US\" }",
            "ForeEndType": 3,
            "Code": "0011"
        };
        return c.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
    }
    M({"HotelID":1});
    //callback函数
    function mycallback(d){
        var json=eval('('+d+')');
        var data=json.Data;
        V(data);
    }
    //展示部分
    function V(data){
        if(!data)return;
        var comments=data[0].ReviewCommentsList;
        //console.log(data);
        var str1='<section>'+
            '<p>设施<i>'+data[0].ReviewRatingsList[0].ScoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">客房<i>'+data[0].ReviewRatingsList[1].ScoringScaleID+'</i>分</p>'+
            '</section>'+
            '<section>'+
            '<p>地点<i>'+data[0].ReviewRatingsList[3].ScoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">服务<i>'+data[0].ReviewRatingsList[4].ScoringScaleID+'</i>分</p>'+
            '</section>'+
            '<section class="last_sec">'+
            '<p>清洁度<i>'+data[0].ReviewRatingsList[2].ScoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">物有值<i>'+data[0].ReviewRatingsList[5].ScoringScaleID+'</i>分</p>'+
            '</section';
        var str2='';
        for(var i=0;i<comments.length;i++){
            var star=parseFloat(comments[i].AvgReviewerRating);
            var str3='';
            for(var j=0;j<5;j++){
                if((j+1)<=star){
                    str3+='<li class="fl" style="background:url(images/ui/icons1.png) -0.3rem -3.8rem;background-size:40rem 12rem;"></li>';
                }else if(star>j&&star<(j+1)){
                    str3+='<li class="fl" style="background:url(images/ui/icons1.png) -1.4rem -3.8rem;background-size:40rem 12rem;"></li>';
                }else{
                    str3+='<li class="fl" style="background:url(images/ui/icons1.png) -2.6rem -3.8rem;background-size:40rem 12rem;"></li>';
                }
            }
            str2+='<div class="reBox">'+
                '<div class="clearfix lsf_reTitle">'+
                '<h2 class="fl">'+comments[i].Title+'</h2>'+
                '<ol class="clearfix fr lsf_reSta">'+str3+
                '</ol>'+
                '</div>'+
                '<p class="clearfix comments"><span>'+maxWord(comments[i].Comments)+'</span>'+
                '<i class="fr drop_down"></i>'+
                '</p>'+
                '<div class="lsf_reUser">'+
                '<span class="clearfix"><b class="fl">'+comments[i].ReviewerName+'</b><i class="fl">'+comments[i].CountryName+'</i></span>'+
                '<span class="clearfix"><em class="fr">'+comments[i].CreatedDate.substring(0,comments[i].CreatedDate.indexOf('T'))+'</em></span>'+
                '</div>'+
                '</div>';
        }
        lsf_myweb.getbyid('lsf_reDetail_grade').innerHTML=str1;
        lsf_myweb.getbyid('lsf_reDiscuss').innerHTML+=str2;
        var coms=lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'),'comments');
        var drop_downs=lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'),'drop_down');
        if(count(coms[coms.length-1].innerHTML).n<=110){
            drop_downs[drop_downs.length-1].style.display='none';
        }
    }
})();


(function(){
    $(window).load(function () {
        //$("#status").fadeOut();
        //$("#preloader").delay(400).fadeOut("medium");
        var timer=null;
        timer=setInterval(function(){
            if($('#lsf_reDetail_grade').children().length){
                $("#status").fadeOut();
                $("#preloader").delay(400).fadeOut("medium");
                clearInterval(timer);
            }
            //console.log($('#lsf_list').children().length);
        },30);

    });
})();



