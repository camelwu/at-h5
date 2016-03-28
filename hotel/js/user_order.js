/**
 * Created by Asiatravel on 2016/1/4.
 */
//对得到的url进行处理
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
    },
    "payment":function(type){
        switch (parseInt(type)){
            case 1:
                return '预付';
                break;
            case 2:
                return '到付';
                break;
            default:
                return '请选择支付方式';
                break;
        };
    }
};


//页面没有展示前页面展示的页面
$(window).load(function () {
    //$("#status-h").fadeOut();
    //$("#preloader").delay(400).fadeOut("medium");
    var oP=document.getElementById('uo_c1_info');
    var timer=null;
    timer=setInterval(function(){
        if(oP.innerHTML!=''){
            $("#status-h").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
            clearInterval(timer);
        }
        //console.log($('#lsf_list').children().length);
    },30);

});





//输入框默认字体设置
function styleChange(id,mytext){
    var oInp=document.getElementById(id);
    if(oInp.value==mytext){
        oInp.style.color='#d1d1d1';
    }else{
        oInp.style.color='#484848';
    }
    oInp.onfocus=function(){
        if(this.value==mytext){
            this.value='';
            this.style.color='#484848';
        }
    };
    oInp.onblur=function(){
        if(!this.value){
            this.value=mytext;
            this.style.color='#d1d1d1';
        }
    };
}
function styleChange2(parentid,sClass,mytext){
    var oBox=document.getElementById(parentid);
    //alert(oBox);
    var aChil=lsf_myweb.getbyclass(oBox,sClass);
    //alert(aChil);
    for(var i=0;i<aChil.length;i++){
        if(aChil[i].value==mytext){
            aChil[i].style.color='#d1d1d1';
        }else{
            aChil[i].style.color='#484848';
        }
        aChil[i].onfocus=function(){
            if(this.value==mytext){
                this.value='';
                this.style.color='#484848';
            }
        };
        aChil[i].onblur=function(){
            if(!this.value){
                this.value=mytext;
                this.style.color='#d1d1d1';
            }
        };
    }
};

/*
//输入框默认字体设置
styleChange('uo_c3_tele','用于接收短信通知');
styleChange('uo_c3_email','用于接收邮件通知');
styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
*/

//把得到的数据全部存入到fake_data里面
    var RoomCode;
    var fake_data={};
    var myUrl=window.location.href;
    for(var name in url2json(myUrl)){
        if(name=='roomCode'){
            RoomCode=url2json(myUrl)[name];
            //alert(RoomCode);
        }
    }
    //默认房间数量
    fake_data.NumOfRoom=1;
    var user_order_storage2=localStorage.getItem('hotelDetailData');
    console.log(JSON.parse(user_order_storage2));
    console.log(999999999999);
    fake_data.HotelGenInfo=JSON.parse(user_order_storage2).data.data[0].hotelGenInfo;
    fake_data.dateInfo=JSON.parse(user_order_storage2).data.data[0].dateInfo;
    var HotelRoomsList=JSON.parse(user_order_storage2).data.data[0].hotelRoomsList;
    for(var i=0;i<HotelRoomsList.length;i++){
        for(var j=0;j<HotelRoomsList[i].roomList.length;j++){
            if(HotelRoomsList[i].roomList[j].roomCode==RoomCode){
                fake_data.MinAvgPrice=HotelRoomsList[i].minAvgPrice;
                fake_data.RoomTypeCode=HotelRoomsList[i].roomTypeCode;
                fake_data.RoomTypeName=HotelRoomsList[i].roomTypeName;
                for(var name in HotelRoomsList[i].roomList[j]){
                    fake_data[name]=HotelRoomsList[i].roomList[j][name];
                }
            }
        }
    }
    console.log(fake_data);
    console.log(1);
    var hoPos=window.localStorage.getItem('hoPos');
    //hoPos='dom';
    //国际酒店有邮箱，国内酒店没有邮箱
    if(hoPos=='dom'){
        var uo_con3=document.getElementById('uo_con3');
        uo_con3.removeChild(uo_con3.children[2]);
    }
//本地存储数据
//localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));


//获取user_order_storage12345,实现历史选择记忆功能

function uoHisData(){
    var localData=JSON.parse(window.localStorage.getItem('user_order_storage12345'));
    console.log(localData);
    console.log('上面是localStorage');
    if(localData){
        //fake_data=localData;
        fake_data.GuestContactNo=localData.GuestContactNo;
        fake_data.GuestEmail=localData.GuestEmail;
        fake_data.guestName=localData.guestName;
        console.log(fake_data);
        console.log('hahahahhahahahah');
        return;
    }else{
        fake_data.guestName=[];
        return;
    }
}
uoHisData();


(function(){
    /*页面跳转动画*/
    $(window).load(function(){
        $("#status-h").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    });

    var all_elements = document.getElementById("all_elements");
    var uo_back=document.getElementById('uo_back');
    var uo_c2_i1=document.getElementById('uo_c2_i1');
    var uo_c2_i2=document.getElementById('uo_c2_i2');
    var uo_c1_info=document.getElementById('uo_c1_info');
    //var uo_c1_infoDown=document.getElementById('uo_c1_infoDown');
    var uo_c2_num=document.getElementById('uo_c2_num');
    var uo_or_infor=document.getElementById('uo_or_infor');
    var uo_form=document.getElementById('uo_con3');
    var uo_confirm=document.getElementById('uo_confirm');
    var downBok=true;
    var bOk2=true;
    
    //android底部浮层在调用键盘时遮挡页面元素
    //ios qq浏览器 fixed 支持问题
    //总体测试效果不佳  建议后续需要用户输入的页面，统一将输入框放到页面顶部
    var checkBrowser = function(){
        var ua = navigator.userAgent;
        return {
            trident: ua.indexOf('Trident') > -1, //IE内核
            presto: ua.indexOf('Presto') > -1, //opera内核
            webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            mobile: !!ua.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: ua.indexOf('iPad') > -1, //是否iPad
            webApp: ua.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            qq:/qqbrowser/i.test(ua)
        }
    }
    
    all_elements.onclick = function(e){
        var browser = checkBrowser();
        //alert(browser.qq);
        var targetEleName = e.target.tagName.toLocaleLowerCase();
        var uo_footer = document.getElementById("uo_footer");
        if(targetEleName == "input"){
            uo_footer.style.position = "absolute";
            if(browser.qq){
                document.querySelectorAll(".header")[0].style.position= "relative";
                lsf_myweb.getbyclass(document.getElementById("all_elements"),"uo_con1")[0].style.marginTop = "0px";
            }
        }else{
            uo_footer.style.position = "fixed";
            if(browser.qq){
                document.querySelectorAll(".header")[0].style.position= "fixed";
                lsf_myweb.getbyclass(document.getElementById("all_elements"),"uo_con1")[0].style.marginTop = "45px";
            }
        }
    }

    //返回按钮
    uo_back.onclick=function(){
        window.history.go(-1);
    };
    //判断是担保还是在线支付
    //fake_data.paymentModeID=2;//测试用的
    if(parseInt(fake_data.paymentModeID)==1){
        lsf_myweb.getbyid('uo_or_sumBox1').style.display='block';
        lsf_myweb.getbyid('uo_or_sumBox2').style.display='none';
        lsf_myweb.getbyid('toPayExp').style.display='none';
    }else if(parseInt(fake_data.paymentModeID)==2){
        lsf_myweb.getbyid('uo_or_sumBox1').style.display='none';
        lsf_myweb.getbyid('uo_or_sumBox2').style.display='block';
        lsf_myweb.getbyid('toPayExp').style.display='block';
    }
    //取消说明时间展示
    var uo_c1_info=document.getElementById('uo_c1_info');
    //uo_c1_info.innerHTML='如果您在'+fake_data.dateInfo.CheckOutDate.split('-')[0]+'年'+fake_data.dateInfo.CheckOutDate.split('-')[1]+'月'+fake_data.dateInfo.CheckOutDate.split('-')[2]+'日'+'晚12时（目的地时间）之前取消不收取任何费用';
    uo_c1_info.innerHTML=fake_data.cancellationDesc;
    //酒店名称/时间/房型
    var uo_con2_chil1=document.getElementById('uo_con2_chil1');
    uo_con2_chil1.innerHTML='<h3>'+fake_data.HotelGenInfo.hotelName+'</h3>'+
        '<p class="uo_c2_infor">'+fake_data.dateInfo.CheckInDate.split('-')[0]+'年'+fake_data.dateInfo.CheckInDate.split('-')[1]+'月'+fake_data.dateInfo.CheckInDate.split('-')[2]+'日'+'-'+fake_data.dateInfo.CheckOutDate.split('-')[0]+'年'+fake_data.dateInfo.CheckOutDate.split('-')[1]+'月'+fake_data.dateInfo.CheckOutDate.split('-')[2]+'日'+' -'+fake_data.dateInfo.totalNight+'晚（目的地时间为准）</p>'+
        '<p class="uo_house">房型：'+fake_data.RoomTypeName+'</p>';

    //房间数列表
    uo_c2_num.innerHTML=fake_data.NumOfRoom;
    var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
    for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
        if(hoPos=='inter'){
            uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                '<div class="uo_c3_infor">'+
                '<input type="text" value="姓（如：Zhang）" class="uo_lastname"  />'+
                '<input type="text" value="名（如：San）" class="uo_firstname"  />'+
                '</div>'+
                '</div>';
        }else if(hoPos=='dom'){
            uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                '<div class="uo_c3_infor">'+
                '<input type="text" value="姓（如：张）" class="uo_lastname"  />'+
                '<input type="text" value="名（如：三）" class="uo_firstname"  />'+
                '</div>'+
                '</div>';
        }

    }
    //姓名手机号邮箱实现历史选择记忆功能
    function uoHisFillIn(){
        //实现历史记忆功能，把记忆的东西添加到value中

        //if(fake_data.guestName&&(fake_data.guestName[0].GuestFirstName!='')){
        //    var uo_lastname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_lastname');
        //    var uo_firstname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_firstname');
        //    for(var j=0;j<uo_lastname.length;j++){
        //        uo_lastname[j].value=fake_data.guestName[j].GuestLastName;
        //        uo_firstname[j].value=fake_data.guestName[j].GuestFirstName;
        //    }
        //}
        console.log(fake_data.guestName);
        if(fake_data.guestName.length){
            if(fake_data.guestName[0].GuestFirstName!=''){
                var uo_lastname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_lastname');
                var uo_firstname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_firstname');
                for(var j=0;j<uo_lastname.length;j++){
                    uo_lastname[j].value=fake_data.guestName[j].GuestLastName;
                    uo_firstname[j].value=fake_data.guestName[j].GuestFirstName;
                }
            }
        }
        //手机号和邮箱实现历史记忆功能
        var uo_c3_tele=document.getElementById('uo_c3_tele');
        var uo_c3_email=document.getElementById('uo_c3_email');
        if(fake_data.GuestContactNo&&fake_data.GuestContactNo!=''){
            uo_c3_tele.value=fake_data.GuestContactNo;
        }
        if(fake_data.GuestEmail&&fake_data.GuestEmail!=''){
            uo_c3_email.value=fake_data.GuestEmail;
        }
    }
    uoHisFillIn();
    //输入框默认字体设置
    styleChange('uo_c3_tele','用于接收短信通知');
    //判断是国际酒店搜索还是国内酒店搜索
    if(hoPos=='inter'){
        styleChange('uo_c3_email','用于接收邮件通知');
        styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
        styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
    }else if(hoPos=='dom'){
        styleChange2('uo_c3_peoBox','uo_lastname','姓（如：张）');
        styleChange2('uo_c3_peoBox','uo_firstname','名（如：三）');
    }
    //$('#uo_c3_tele').bind('focus',function(){
    //    $('#uo_footer').css({'position':'absolute','left':'0','top':$(document).height()});
    //    $('#uo_box').css('margin-bottom','0px');
    //});
    //$('#uo_c3_tele').bind('blur',function(){
    //    $('#uo_footer').css({'position':'fixed','left':'0','bottom':'0','top':'auto'});
    //    $('#uo_box').css('margin-bottom','47px');
    //});
    //$('#uo_c3_tele').bind('focus',function(){
    //    var uo_box=document.getElementById('uo_box');
    //    document.documentElement.scrollTop='800';
    //});
    //获取判断服务器给的数据的精度
    function getAccuracy(digit){
        var digitLen = new String(digit).length;
        var dotIndex = new String(digit).indexOf(".");
        return dotIndex > -1 ? digitLen - dotIndex - 1 : 0;
    } 
    
    function formatFloat(f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }
    // 明细部分展示
    function uo_detail(id1,id2,id3,id4,id5,id6,id7,json){
        console.log(json);
        console.log(222);
        var oId1=document.getElementById(id1);
        var oId2=document.getElementById(id2);
        var oId3=document.getElementById(id3);
        var oId4=document.getElementById(id4);
        var oId5=document.getElementById(id5);
        var accuracy = getAccuracy(json.totalPrice);
        var totalPrice = parseFloat(json.totalPrice)*parseFloat(json.NumOfRoom);
        var totalPriceCNY = parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
        oId1.innerHTML=json.NumOfRoom+'间×'+json.dateInfo.totalNight+'晚';
        if(parseInt(json.paymentModeID)==1){
            oId2.innerHTML='￥'+parseFloat(json.avgPriceCNY)*parseFloat(json.NumOfRoom);
            oId3.innerHTML='￥'+(parseFloat(json.taxChargesCNY)*1000*parseFloat(json.NumOfRoom))/1000;
            oId4.innerHTML='付款方式：'+lsf_myweb.payment(json.paymentModeID);
            oId5.innerHTML=parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
        }else if(parseInt(json.paymentModeID)==2){
            var oId6=document.getElementById(id6);
            var oId7=document.getElementById(id7);
            
            oId2.innerHTML='SGD'+parseFloat(json.avgPrice)*parseFloat(json.NumOfRoom);
            oId3.innerHTML='SGD'+(parseFloat(json.taxCharges)*1000*parseFloat(json.NumOfRoom))/1000;
            oId4.innerHTML='付款方式：'+lsf_myweb.payment(json.paymentModeID);
            //判断服务器给的数据的精度
            oId6.innerHTML=accuracy > 0 ? formatFloat(totalPrice,accuracy) : totalPrice;
            oId7.innerHTML='约￥'+ (accuracy > 0 ? formatFloat(totalPriceCNY,accuracy) : totalPriceCNY);
        }
        fake_data.calcuTotalPrice=accuracy > 0 ? formatFloat(totalPrice,accuracy) : totalPrice;
        fake_data.calcuTotalPriceCNY=accuracy > 0 ? formatFloat(totalPriceCNY,accuracy) : totalPriceCNY;
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
    }
    uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2','uo_or_sum2CNY',fake_data);

    //减少房间
    lsf_myweb.bind(uo_c2_i1,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)-1;
        if(parseInt(uo_c2_num.innerHTML)<1){
            uo_c2_num.innerHTML=1;
        }else{
            uo_c3_peoBox.removeChild(uo_c3_peoBox.children[uo_c3_peoBox.children.length-1]);
            /*uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" value="姓（如：Timberlake）" class="uo_lastname"  />'+
                    '<input type="text" value="名（如：Justin）" class="uo_firstname"  />'+
                    '</div>'+
                    '</div>';
            }*/
            //输入框默认字体设置
            if(hoPos=='inter'){
                styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
                styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
            }else if(hoPos=='dom'){
                styleChange2('uo_c3_peoBox','uo_lastname','姓（如：张）');
                styleChange2('uo_c3_peoBox','uo_firstname','名（如：三）');
            }
        }
        if(parseInt(uo_c2_num.innerHTML)<=1){
            uo_c2_i1.style.background='url("../images/hotelbtn.png") 0 -27px no-repeat';
            uo_c2_i1.style.backgroundSize='23px 150px';
        }
        if(parseInt(uo_c2_num.innerHTML)<10){
            uo_c2_i2.style.background='url("../images/hotelbtn.png") 0 -55px no-repeat';
            uo_c2_i2.style.backgroundSize='23px 150px';
        }
        //修改数据并存储数据
        fake_data.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        //console.log(localStorage.getItem('user_order_storage12345'));
        //明细部分
        uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2','uo_or_sum2CNY',fake_data);
    });
    //增加房间
    lsf_myweb.bind(uo_c2_i2,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        var myNum=uo_c2_num.innerHTML;
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)+1;
        //房间数不能超过10
        if(parseInt(uo_c2_num.innerHTML)>10){
            uo_c2_num.innerHTML=10;
        }else{
            for(var i=parseInt(myNum);i<parseInt(uo_c2_num.innerHTML);i++){
                var oDiv=document.createElement('div');
                oDiv.className='uo_c3_peo';
                //判断是国际酒店搜索还是国内酒店搜索
                if(hoPos=='inter'){
                    oDiv.innerHTML='<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                        '<div class="uo_c3_infor">'+
                        '<input type="text" value="姓（如：Zhang）" class="uo_lastname"  />'+
                        '<input type="text" value="名（如：San）" class="uo_firstname"  />'+
                        '</div>';
                }else if(hoPos=='dom'){
                    oDiv.innerHTML='<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                        '<div class="uo_c3_infor">'+
                        '<input type="text" value="姓（如：张）" class="uo_lastname"  />'+
                        '<input type="text" value="名（如：三）" class="uo_firstname"  />'+
                        '</div>';
                }
                uo_c3_peoBox.appendChild(oDiv);
            }

            /*uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" value="姓（如：Timberlake）" class="uo_lastname"  />'+
                    '<input type="text" value="名（如：Justin）" class="uo_firstname"  />'+
                    '</div>'+
                    '</div>';
            }*/
            //输入框默认字体设置
            if(hoPos=='inter'){
                styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
                styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
            }else if(hoPos='dom'){
                styleChange2('uo_c3_peoBox','uo_lastname','姓（如：张）');
                styleChange2('uo_c3_peoBox','uo_firstname','名（如：三）');
            }
        }
        if(parseInt(uo_c2_num.innerHTML)>1){
            uo_c2_i1.style.background='url("../images/hotelbtn.png") 0 -27px no-repeat';
            uo_c2_i1.style.backgroundSize='23px 150px';
        }
        if(parseInt(uo_c2_num.innerHTML)>=10){
            uo_c2_i2.style.background='url("../images/hotelbtn.png") 0 -84px no-repeat';
            uo_c2_i2.style.backgroundSize='23px 150px';
        }

        //修改数据并存储数据
        fake_data.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        //console.log(localStorage.getItem('user_order_storage12345'));
        //明细部分
        uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2','uo_or_sum2CNY',fake_data);

    });
    lsf_myweb.bind(uo_or_infor,'click',function(){
        var oI=this.getElementsByTagName('i')[0];
        if(bOk2){
            oI.style.background='url(../images/ui/icons1.png) -76px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='100%';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='38px';
            //点击阴影区域
            var uo_hid_shadow=document.getElementById('uo_hid_shadow');
            lsf_myweb.bind(uo_hid_shadow,'click',function(){
                oI.style.background='url(../images/ui/icons1.png) -51px -38px ';
                oI.style.backgroundSize='400px 120px';
                lsf_myweb.getbyid('uo_hid').style.height='0';
                lsf_myweb.getbyid('uo_hid_con').style.marginBottom='-320px';
                bOk2=true;
            });
        }else{
            oI.style.background='url(../images/ui/icons1.png) -51px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='0';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='-320px';
        }
        bOk2=!bOk2;
    });
    //确定按钮点击事件
    lsf_myweb.bind(uo_confirm,'click',function(){
        var uo_c3_infor=lsf_myweb.getbyclass(uo_form,'uo_c3_infor');
        var aUo_lastname=lsf_myweb.getbyclass(uo_form,'uo_lastname');
        var aUo_firstname=lsf_myweb.getbyclass(uo_form,'uo_firstname');
        var uo_c3_tele=document.getElementById('uo_c3_tele');
        var uo_c3_email=document.getElementById('uo_c3_email');
        fake_data.guestName=[];
        //验证名字
        function checkCN(val){
            for(var i=0;i<val.length;i++){
                if(val[i].charCodeAt(0)>=0x4e00&&val[i].charCodeAt(0)<=0x9fa5){
                    return true;
                }else{
                    return false;
                }
            }
        }
        //判断是国内搜索还是国际搜索
        if(hoPos=='inter'){
            for(var i=0;i<aUo_firstname.length;i++){
                if(aUo_lastname[i].value=='姓（如：Zhang）'){
                    jAlert('请输入英文姓或名');
                    //alert('请输入姓');
                    return;
                }
                if(checkCN(aUo_lastname[i].value)){
                    jAlert('请输入英文姓或名');
                    return;
                }
                if(checkCN(aUo_firstname[i].value)){
                    jAlert('请输入英文姓或名');
                    return;
                }
                if(aUo_firstname[i].value=='名（如：San）'){
                    jAlert('请输入英文姓或名');
                    return;
                }
                fake_data.guestName.push({"GuestFirstName":aUo_firstname[i].value,"GuestLastName":aUo_lastname[i].value});
            }
        }else if(hoPos=='dom'){
            for(var i=0;i<aUo_firstname.length;i++){
                if(aUo_lastname[i].value=='姓（如：张）'){
                    jAlert('请输入姓');
                    return;
                }
                if(aUo_firstname[i].value=='名（如：三）'){
                    jAlert('请输入名');
                    return;
                }
                fake_data.guestName.push({"GuestFirstName":aUo_firstname[i].value,"GuestLastName":aUo_lastname[i].value});
            }
        }

        //验证手机号
        /*if(uo_c3_tele.value=='用于接收短信通知'){
            alert('请输入手机号');
            return;
        }else{
            //var reg=/^1[345678]\d{9}$/g;
            if(!reg.test(uo_c3_tele.value)){
                alert('手机号输入错误');
                return;
            }else{
                fake_data.GuestContactNo=uo_c3_tele.value;
            }
        }*/
        if(uo_c3_tele.value=='用于接收短信通知'){
            jAlert('请输入手机号');
            return;
        }else{
            if(vlm.Utils.validate.mobileNo(uo_c3_tele.value)){
                fake_data.GuestContactNo=uo_c3_tele.value;
            }else{
                jAlert('手机号格式错误');
                return;
            }
        }
        console.log(fake_data);
        if(uo_c3_email){
            if(uo_c3_email.value=='用于接收邮件通知'){
                jAlert('请输入邮箱');
                return;
            }else{
                if(vlm.Utils.validate.email(uo_c3_email.value)){
                    fake_data.GuestEmail=uo_c3_email.value;
                }else{
                    jAlert('邮箱格式错误');
                    return;
                }
            }
        }
        window.localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        console.log(fake_data);
        //console.log(JSON.parse(localStorage.getItem('user_order_storage12345')));
        uo_form.submit();
    });
    
    //取消说明点击事件
    //lsf_myweb.bind(uo_c1_infoDown,'click',function(){
    //    uo_c1_info.className='';
    //    this.style.display='none';
    //});
    //解决300毫秒延迟问题
    (function($) {
        $(document).ready(function() {
            window.addEventListener('load', function() {
                FastClick.attach(document.body);
            }, false);
        });
    }(jQuery));
})();