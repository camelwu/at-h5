/**
 * Created by Asiatravel on 2015/12/31.
 */
//董振昊js代码
/**
 * Created by changlv on 2015/12/11.
 */
function fun11(){
    var choose=document.getElementById("choose");
    var show=document.getElementById("show");
    choose.style.display="block";
    show.style.display="block";
}
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

var ho_i1=document.getElementById('ho_i1');
var ho_i2=document.getElementById('ho_i2');
var ho_i3=document.getElementById('ho_i3');
var ho_i4=document.getElementById('ho_i4');
var ho_i7=document.getElementById('ho_i7');
var ho_i6=document.getElementById('ho_i6');
ho_i1.onclick=function fun1(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    if( this.parentNode.children[0].value<10){
        this.parentNode.children[0].value++;
    }else{
        return false;
    }
}
ho_i2.onclick=function fun2(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    if(this.parentNode.children[0].value>1){
        this.parentNode.children[0].value--;
    }else{
        return false;
    }
}

ho_i7.onclick=function fun7(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    this.parentNode.children[0].value++;
}
ho_i6.onclick=function fun6(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    if(this.parentNode.children[0].value>1){
        this.parentNode.children[0].value--;
    }else{
        return false;
    }
}

ho_i3.onclick=function fun3(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    this.parentNode.children[0].value++;
}
ho_i4.onclick=function fun4(ev){
    var oEvent=ev||event;
    oEvent.stopPropagation?oEvent.stopPropagation():oEvent.cancelBubble=true;
    if(this.parentNode.children[0].value>0){
        this.parentNode.children[0].value--;
    }else{
        return false;
    }
}

function focus1(){
    var input1=document.getElementById("input1");
    input1.focus();
    var input2=document.getElementById("input2");
    input2.focus();
}

function focus2(){
    var input3=document.getElementById("CheckInDate");
    input3.focus();
}
function focus3(){
    var input4=document.getElementById("CheckOutDate");
    input4.focus();
}
function focus4(){
    var count1=document.getElementById("count1");
    count1.focus()
}
function focus5(){
    var count2=document.getElementById("count2");
    count2.focus()
}
function focus6(){
    var count3=document.getElementById("count3");
    count3.focus()
}
function focus7(){
    var hotelname=document.getElementById("hotelname");
    hotelname.focus()
}

window.onload=fun5()
function fun5(){
    var input2=document.getElementById("input2");
    if(!input2)return;
    input2.name="";
}


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
    }
};

function inpChange(id,myText){
    var oInp=document.getElementById(id);
    oInp.onfocus=function(){
        if(this.value==myText){
            this.value='';
            this.style.color='#484848';
        }
    };
    oInp.onblur=function(){
        if(!this.value){
            this.value='酒店名';
            this.style.color='#d1d1d1';
        }
    };
}
//酒店输入框
inpChange('hotelname','酒店名');

(function(){
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
    var oDate1=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+2);
    var oDate2=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+3);
    var beginDate=oDate1.getFullYear()+'-'+toDou(oDate1.getMonth()+1)+'-'+toDou(oDate1.getDate());
    var leaveDate=oDate2.getFullYear()+'-'+toDou(oDate2.getMonth()+1)+'-'+toDou(oDate2.getDate());
    checkIn.value=beginDate;
    checkOut.value=leaveDate;
    week_span1.innerHTML='周'+n2c(oDate1.getDay())+' 入住';
    week_span2.innerHTML='周'+n2c(oDate2.getDay())+' 离店';
    var obj={};
    obj[beginDate]="入住";
    obj[leaveDate]="离店";
    function Calender2(){
        Calender.apply(this,arguments);
    }
    Calender2.prototype=new Calender();
    var oldlinkover=Calender.prototype.linkOver;
    Calender2.prototype.linkOver=function(){
        var sels = $('#'+ this.id +'-date .live_circle'),i,l=sels.length,that=this,arr=[];
        var out = _CalF.$('input',that.input);
        var tal = _CalF.$('#total_day',that.input);
        for(i = 0;i<2;i++){
            var arr3=[];
            arr.push(sels[i].parentNode.getAttribute("data-day"));
            arr3=sels[i].parentNode.getAttribute("data-day").split('-');
            arr3[1]=toDou(arr3[1]);
            arr3[2]=toDou(arr3[2]);
            out[i].value = arr3.join('-');
        }
        console.log(arr);
        //console.log(new Date(arr[1]));
        var live_y=arr[0].split('-')[0];
        var live_m=arr[0].split('-')[1];
        var live_d=arr[0].split('-')[2];
        var leave_y=arr[1].split('-')[0];
        var leave_m=arr[1].split('-')[1];
        var leave_d=arr[1].split('-')[2];
        tal.innerHTML = (Math.round((new Date(leave_y,leave_m,leave_d)-new Date(live_y,live_m,live_d))/(1000*60*60*24)));
        that.removeDate();
        var oDate1=new Date(arr[0].split('-')[0],(arr[0].split('-')[1]-1),arr[0].split('-')[2]);
        var oday1=oDate1.getDay();
        var oDate2=new Date(arr[1].split('-')[0],(arr[1].split('-')[1]-1),arr[1].split('-')[2]);
        var oday2=oDate2.getDay();
        //alert(oDate1+'---'+oDate2);
        lsf_myweb.getbyid('week_span1').innerHTML='周'+n2c(oday1)+' 入住';
        lsf_myweb.getbyid('week_span2').innerHTML='周'+n2c(oday2)+' 离店';
    }
    var myDate1 = new Calender2({id: 'content2', num: 13, time: obj});
    /*content2.onclick=function() {
     var obj={};
     // cdDate.style.display = 'block';
     // cdDate.style.background = '#fff';
     obj[beginDate]="入住";
     obj[leaveDate]="离店";
     //var obj={"2015-12-24":"入住","2015-12-26":"离店"};
     //var arr=new Calender({id:'cd_date',num:4,time:obj});
     function calender2() {
     Calender.apply(this, arguments);
     }
     calender2.prototype = new Calender();
     //console.log(calender2.prototype);
     var oldLinkover = calender2.prototype.linkOver;
     //alert(oldLinkover);
     calender2.prototype.linkOver = function () {
     oldLinkover.apply(this, arguments);
     var oDate=new Date();
     var span1=lsf_myweb.getbyid('week_span1');
     var span2=lsf_myweb.getbyid('week_span2');
     var oDate1=new Date();
     var oDate2=new Date();
     checkIn.value = this.result[0]
     checkOut.value = this.result[1];
     function spl(str){
     return str.split('-');
     }
     oDate1.setFullYear(spl(this.result[0])[0],(spl(this.result[0])[1]-1),spl(this.result[0])[2]);
     var week1=oDate1.getDay();
     span1.innerHTML='周'+n2c(week1)+' 入住';
     oDate2.setFullYear(spl(this.result[1])[0],(spl(this.result[1])[1]-1),spl(this.result[1])[2]);
     var week2=oDate2.getDay();
     span2.innerHTML='周'+n2c(week2)+' 离店';
     var oDay=((oDate2-oDate1)/(1000*60*60*24))+1;
     if(oDay>=30){
     alert('住店时间不可超过30天，请重新选择');
     return;
     }
     lsf_myweb.getbyid('total_day').innerHTML=oDay;
     //cdDate.style.display = 'none';
     //if(spl(this.result[1])[2]<spl(this.result[0])[2]){
     //    if(spl(this.result[1])[1]<spl(this.result[0])[1]){
     //        if(spl(this.result[1])[0]<spl(this.result[0])[0]){
     //            alert('离店日期不能比住店日期提前');
     //        }
     //    }
     //}

     }
     var arr = new calender2({id: 'content2', num: 13, time: obj});
     };*/


    //城市
    var domestic_target_place=document.getElementById('arr2');
    var domestic_target_city=document.getElementById('input2');
    var abroad_target_place=document.getElementById('arr1');
    var abroad_target_city=document.getElementById('input1');
    //国内城市
    lsf_myweb.bind(domestic_target_place,'click',function(){
        var citys=new myCityList('input1','hotel.html');
        //alert(citys.city);
    });
    //国际城市
    lsf_myweb.bind(abroad_target_place,'click',function(){
        var citys=new myCityList('input2','hotel.html');
        //alert(citys.city);
    })
})();

