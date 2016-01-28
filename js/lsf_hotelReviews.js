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
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            if(obj.className.search(reg)==-1){
                obj.className+=' '+sClass;
            }
        }else{
            obj.className=sClass;
        }
    },
    bind:function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
    },
    url2json:function(url){
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
};
(function(){
    var goBack=document.getElementById('hr_back');
    goBack.onclick=function(){
        window.history.go(-1);
    };

    //页面加载小动画
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




    var url=window.location.href;
    var HotelID=lsf_myweb.url2json(url).HotelID;
    lsf_myweb.getbyid('TAAvgRating').innerHTML=lsf_myweb.url2json(url).TAAvgRating;
    lsf_myweb.getbyid('TAReviewCount').innerHTML=lsf_myweb.url2json(url).TAReviewCount+'人点评';
    //alert(HotelID);
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
        result.comments=str;
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
    M({"HotelID":HotelID});
    //callback函数
    function mycallback(d){
        var json=eval('('+d+')');
        console.log(json);
        var data=json.data;
        V(data);
    }
    //展示部分
    function V(data){
        if(!data)return;
        var comments=data[0].reviewCommentsList;
        console.log(data);
        var str1='<section>'+
            '<p>设施<i>'+data[0].reviewRatingsList[0].scoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">客房<i>'+data[0].reviewRatingsList[1].scoringScaleID+'</i>分</p>'+
            '</section>'+
            '<section>'+
            '<p>地点<i>'+data[0].reviewRatingsList[3].scoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">服务<i>'+data[0].reviewRatingsList[4].scoringScaleID+'</i>分</p>'+
            '</section>'+
            '<section class="last_sec">'+
            '<p>清洁度<i>'+data[0].reviewRatingsList[2].scoringScaleID+'</i>分</p>'+
            '<p class="lsf_gra_p2">物有值<i>'+data[0].reviewRatingsList[5].scoringScaleID+'</i>分</p>'+
            '</section';
        var str2='';
        //评论分页设置
        function num_show(start,end){
            var myStart=start;
            var myEnd=end;
            //dis是每次显示的评论条数
            var dis=myEnd-myStart;
            //console.log(comments.length);
            //console.log(dis);
            if(myEnd<comments.length){
                for(var i=myStart;i<myEnd;i++){
                    var star=parseFloat(comments[i].avgReviewerRating);
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
                        '<h2 class="fl">'+comments[i].title+'</h2>'+
                        '<ol class="clearfix fr lsf_reSta">'+str3+
                        '</ol>'+
                        '</div>'+
                        '<p class="clearfix comments"><span class="com_cont">'+maxWord(comments[i].comments)+'</span>'+
                        '<i class="fr drop_down"></i>'+
                        '</p>'+
                        '<div class="lsf_reUser">'+
                        '<span class="clearfix reu_span1"><b class="fl">'+comments[i].reviewerName+'</b><i class="fl hr_city">'+comments[i].countryName+'</i></span>'+
                        '<span class="clearfix reu_span2"><em class="fr">'+comments[i].createdDate.substring(0,comments[i].createdDate.indexOf('T'))+'</em></span>'+
                        '</div>'+
                        '</div>';
                }
                lsf_myweb.getbyid('lsf_reDiscuss').innerHTML+=str2;
                notShow();
                myDown();
                str2='';
                var oMore=document.createElement('div');
                oMore.innerHTML='加载更多';
                lsf_myweb.addClass(oMore,'hr_more');
                lsf_myweb.getbyid('lsf_reDiscuss').appendChild(oMore);
                lsf_myweb.bind(oMore,'click',function(){
                    this.style.display='none';
                    myStart=myEnd;
                    myEnd=myStart+dis;
                    //console.log(myStart+'--'+myEnd)
                    num_show(myStart,myEnd);
                })
            }else{
                for(var i=myStart;i<comments.length;i++){
                    var star=parseFloat(comments[i].avgReviewerRating);
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
                        '<h2 class="fl">'+comments[i].title+'</h2>'+
                        '<ol class="clearfix fr lsf_reSta">'+str3+
                        '</ol>'+
                        '</div>'+
                        '<p class="clearfix comments"><span class="com_cont">'+maxWord(comments[i].comments)+'</span>'+
                        '<i class="fr drop_down"></i>'+
                        '</p>'+
                        '<div class="lsf_reUser">'+
                        '<span class="clearfix reu_span1"><b class="fl">'+comments[i].reviewerName+'</b><i class="fl">'+comments[i].countryName+'</i></span>'+
                        '<span class="clearfix reu_span2"><em class="fr">'+comments[i].createdDate.substring(0,comments[i].createdDate.indexOf('T'))+'</em></span>'+
                        '</div>'+
                        '</div>';
                }

                lsf_myweb.getbyid('lsf_reDiscuss').innerHTML+=str2;
                notShow();
                myDown();
            }

        }
        lsf_myweb.getbyid('lsf_reDetail_grade').innerHTML=str1;
        num_show(0,10);
        function notShow(){
            var com_cont=lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'),'com_cont');
            var coms=lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'),'comments');
            //评论数小于110字节的，不显示下拉按钮
            for(var i=0;i<com_cont.length;i++){
                if(count(com_cont[i].innerHTML).n<=110){
                    coms[i].innerHTML='<span class="com_cont">'+comments[i].comments+'</span>';
                }
            }
        }
        function myDown(){
            var reBox=lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'),'reBox');
            //对评论下拉做点击事件，点击显示全部评论内容
            for(var i=0;i<reBox.length;i++){
                (function(index){
                    var oP=lsf_myweb.getbyclass(reBox[index],'comments')[0];
                    reBox[index].onclick=function(ev){
                        var oEvent=ev||event;
                        oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
                        var reg=new RegExp('\\b'+'drop_down'+'\\b','g');
                        var oSrc=oEvent.srcElement||oEvent.target;
                        if(oSrc.className.search(reg)!=-1){
                            oSrc.style.display='none';
                            var oSpan=oSrc.parentNode.firstElementChild||oSrc.parentNode.firstChild;
                            oSpan.innerHTML=comments[index].comments;
                            //alert(1);
                            //oP.innerHTML='<span>'+comments[index].Comments+'</span>';
                        }
                    };
                })(i);
            }

        };

    }


})();



