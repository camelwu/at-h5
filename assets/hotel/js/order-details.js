/**
 * Created by Asiatravel on 2016/1/21.
 */
;(function(){
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
    var td_back=document.getElementById('td_back');
    lsf_myweb.bind(td_back,'click',function(){
        window.history.go(-1);
    })
})();