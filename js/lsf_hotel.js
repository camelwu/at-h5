/**
 * Created by Asiatravel on 2015/12/31.
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
    bind:function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
    }
};
(function(){
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
                return '七';
                break;
        };
    }
    function toDou(num){
        return num<10?'0'+num:''+num;
    }
    //var cdDate=lsf_myweb.getbyid('cd_date');
    var checkIn=lsf_myweb.getbyid('CheckInDate');
    var checkOut=lsf_myweb.getbyid('CheckOutDate');
    var content2=lsf_myweb.getbyid('content2');
    var oDate=new Date();
    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();
    var oDate1=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+2);
    var oDate2=new Date(oDate.getFullYear(),oDate.getMonth(),oDate.getDate()+5);
    var beginDate=oDate1.getFullYear()+'-'+toDou(oDate1.getMonth()+1)+'-'+toDou(oDate1.getDate());
    var leaveDate=oDate2.getFullYear()+'-'+toDou(oDate2.getMonth()+1)+'-'+toDou(oDate2.getDate());
    checkIn.value=beginDate;
    checkOut.value=leaveDate;
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
        tal.innerHTML = (Math.round((new Date(arr[1])-new Date(arr[0]))/(1000*60*60*24)));
        that.removeDate();
        that.header.parentNode.removeChild(that.header);
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
})();

