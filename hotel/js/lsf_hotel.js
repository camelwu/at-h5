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
var hotelStorage=JSON.parse(sessionStorage.getItem('hotelStorage12345'));
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
    $("#status").fadeOut();
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
                obj2.style.background='url("../images/down1.png") no-repeat';
                obj2.style.backgroundSize='23px 23px';
            }
        }else{
            this.style.background='url("../images/up2.png") no-repeat';
            this.style.backgroundSize='23px 23px';
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
                obj2.style.background='url("../images/up1.png") no-repeat';
                obj2.style.backgroundSize='23px 23px';
            }
        }else{
            this.style.background='url("../images/down2.png") no-repeat';
            this.style.backgroundSize='23px 23px';
        }
    });
}
oUp(ho_i1,ho_i2,1,10);
oDown(ho_i2,ho_i1,1,10);
oUp(ho_i7,ho_i6,1,1000);
oDown(ho_i6,ho_i7,1,1000);
oUp(ho_i3,ho_i4,0,1000);
oDown(ho_i4,ho_i3,0,1000);
lsf_myweb.bind(lsf_myweb.getbyid('room'),'click',function(){
    lsf_myweb.getbyid('count1').focus();
});
lsf_myweb.bind(lsf_myweb.getbyid('nav4-centertop'),'click',function(){
    lsf_myweb.getbyid('count2').focus();
});
lsf_myweb.bind(lsf_myweb.getbyid('nav4-centerbottom'),'click',function(){
    lsf_myweb.getbyid('count3').focus();
});

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
    if(hotelStorage){
        checkIn.value=hotelStorage.InterBeginDate;
        checkOut.value=hotelStorage.InterLeaveDate;
        lsf_myweb.getbyid('total_day').innerHTML=hotelStorage.InterTotalDay;
        week_span1.innerHTML=hotelStorage.InterBeginDateWeek;
        week_span2.innerHTML=hotelStorage.InterLeaveDateWeek;
        obj[hotelStorage.InterBeginDate]="入住";
        obj[hotelStorage.InterLeaveDate]="离店";
    }else{
        checkIn.value=beginDate;
        checkOut.value=leaveDate;
        week_span1.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
        week_span2.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
        obj[beginDate]="入住";
        obj[leaveDate]="离店";
        console.log('国际');
        console.log(obj);
    }
    //国内城市
    var DomCheckInDate=document.getElementById('DomCheckInDate');
    var DomCheckOutDate=document.getElementById('DomCheckOutDate');
    var oDate3=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+1);
    var oDate4=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+2);
    var DomBeginDate=oDate3.getFullYear()+'-'+toDou(oDate3.getMonth()+1)+'-'+toDou(oDate3.getDate());
    var DomLeaveDate=oDate4.getFullYear()+'-'+toDou(oDate4.getMonth()+1)+'-'+toDou(oDate4.getDate());
    var week_span3=document.getElementById('weekSpan3');
    var week_span4=document.getElementById('weekSpan4');
    var obj2={};
    //网页还原用户上一次选择内容
    if(hotelStorage){
        DomCheckInDate.value=hotelStorage.DomCheckInDate;
        DomCheckOutDate.value=hotelStorage.DomCheckOutDate;
        lsf_myweb.getbyid('domeTotalDay').innerHTML=hotelStorage.DomeTotalDay;
        week_span3.innerHTML=hotelStorage.DomBeginDateWeek;
        week_span4.innerHTML=hotelStorage.DomLeaveDateWeek;
        obj2[hotelStorage.DomCheckInDate]="入住";
        obj2[hotelStorage.DomCheckOutDate]="离店";
    }else{
        DomCheckInDate.value=DomBeginDate;
        DomCheckOutDate.value=DomLeaveDate;
        week_span3.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
        week_span4.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
        obj2[DomBeginDate]="入住";
        obj2[DomLeaveDate]="离店";
    }
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
    var myDate1 = new Calender2({id: "content2", num: 13, time: obj,idTotal:"total_day",idLive:"week_span1",idLeave:"week_span2"});
    var domestic_calender=new Calender2({id:"domesticCalender",num:13,time:obj2,idTotal:"domeTotalDay",idLive:"weekSpan3",idLeave:"weekSpan4"});



    //城市
    var domestic_target_place=document.getElementById('arr2');
    var domestic_target_city=document.getElementById('input2');
    var abroad_target_place=document.getElementById('arr1');
    var abroad_target_city=document.getElementById('input1');
    //国内城市
    lsf_myweb.bind(abroad_target_city,'click',function(){
        var citys=new myCityList('input1','hotel.html');
        //alert(citys.city);
    });
    //国际城市
    lsf_myweb.bind(domestic_target_city,'click',function(){
        var citys=new myCityList('input2','hotel.html');
        //alert(citys.city);
    })
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
        sessionStorage.setItem('hotelStorage12345',JSON.stringify(hotelStorage12345));
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

