/**
 * Created by Asiatravel on 2016/1/4.
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
    }
};
(function(){
    var uo_c2_i1=document.getElementById('uo_c2_i1');
    var uo_c2_i2=document.getElementById('uo_c2_i2');
    var uo_c2_num=document.getElementById('uo_c2_num');
    var uo_c4_conf=document.getElementById('uo_c4_conf');
    var uo_or_infor=document.getElementById('uo_or_infor');
    var bOk=true;
    var bOk2=true;
    lsf_myweb.bind(uo_c2_i1,'click',function(){
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)-1;
        if(parseInt(uo_c2_num.innerHTML)<=0){
            uo_c2_num.innerHTML=0;
        }
    });
    lsf_myweb.bind(uo_c2_i2,'click',function(){
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)+1;
        if(parseInt(uo_c2_num.innerHTML)>=10){
            uo_c2_num.innerHTML=10;
        }
    });
    lsf_myweb.bind(uo_c4_conf,'click',function(){
        if(bOk){
            this.style.background='url(images/ui/icons1.png) -237px -4px';
            this.style.backgroundSize='400px 120px';
        }else{
            this.style.background='url(images/ui/icons1.png) -266px -4px';
            this.style.backgroundSize='400px 120px';
        }
        bOk=!bOk;
    });
    lsf_myweb.bind(uo_or_infor,'click',function(){
        var oI=this.getElementsByTagName('i')[0];
        if(bOk2){
            oI.style.background='url(images/ui/icons1.png) -76px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='100%';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='38px';
        }else{
            oI.style.background='url(images/ui/icons1.png) -51px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='0';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='-320px';
        }
        bOk2=!bOk2;
    })
})();