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
    var mydata=JSON.parse(localStorage.getItem('user_order_storage12345'));
    console.log(mydata);
    console.log(mydata.TotalPrice);
    var tdHoteName=document.getElementById('tdHoteName');
    var tdCheckInDate=document.getElementById('tdCheckInDate');
    var tdCheckOutDate=document.getElementById('tdCheckOutDate');
    var tdRoomType=document.getElementById('tdRoomType');
    var tdNoomRoom=document.getElementById('tdNoomRoom');
    var tdPrice=document.getElementById('tdPrice');
    tdHoteName.innerHTML=mydata.HotelGenInfo.hotelName;
    tdCheckInDate.innerHTML=mydata.dateInfo.CheckInDate;
    tdCheckOutDate.innerHTML=mydata.dateInfo.CheckOutDate;
    tdRoomType.innerHTML=mydata.RoomTypeName;
    tdPrice.innerHTML='￥'+mydata.totalPriceCNY;

    var homeUrl=document.getElementById('fl')
    lsf_myweb.bind(homeUrl,'click',function(){
        location.href="index.html";
    })


    var orderDetailUrl=document.getElementById('fr')
    lsf_myweb.bind(orderDetailUrl,'click',function(){
        location.href="order-details.html";
    })

})();