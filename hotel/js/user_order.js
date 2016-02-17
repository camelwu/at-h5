/**
 * Created by Asiatravel on 2016/1/4.
 */
    //我需要的数据：RoomCode/user_order_storage2/fake_data.totalNight/CheckInTime/CheckOutTime
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
    var myUrl=window.location.href;
    for(var name in url2json(myUrl)){
        if(name=='roomCode'){
            RoomCode=url2json(myUrl)[name];
            //alert(RoomCode);
        }
    }
    var RoomCode;
    var fake_data={};
    //默认房间数量
    fake_data.NumOfRoom=1;
    var user_order_storage2=localStorage.getItem('hotelDetailData');
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


    var uo_back=document.getElementById('uo_back');
    var uo_c2_i1=document.getElementById('uo_c2_i1');
    var uo_c2_i2=document.getElementById('uo_c2_i2');
    var uo_c1_info=document.getElementById('uo_c1_info');
    var uo_c1_infoDown=document.getElementById('uo_c1_infoDown');
    var uo_c2_num=document.getElementById('uo_c2_num');
    var uo_or_infor=document.getElementById('uo_or_infor');
    var uo_form=document.getElementById('uo_con3');
    var uo_confirm=document.getElementById('uo_confirm');
    var downBok=true;
    var bOk2=true;
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
    //酒店名称/时间/房型
    var uo_con2_chil1=document.getElementById('uo_con2_chil1');
    uo_con2_chil1.innerHTML='<h3>'+fake_data.HotelGenInfo.hotelName+'</h3>'+
        '<p class="uo_c2_infor">'+fake_data.dateInfo.CheckInDate.split('-')[0]+'年'+fake_data.dateInfo.CheckInDate.split('-')[1]+'月'+fake_data.dateInfo.CheckInDate.split('-')[2]+'日'+'-'+fake_data.dateInfo.CheckOutDate.split('-')[0]+'年'+fake_data.dateInfo.CheckOutDate.split('-')[1]+'月'+fake_data.dateInfo.CheckOutDate.split('-')[2]+'日'+' -'+fake_data.dateInfo.totalNight+'晚（目的地时间为准）</p>'+
        '<p class="uo_house">房型：'+fake_data.RoomTypeName+'</p>';

    //房间数列表
    uo_c2_num.innerHTML=fake_data.NumOfRoom;
    var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
    for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
        uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
            '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
            '<div class="uo_c3_infor">'+
            '<input type="text" value="姓（如：Zhang）" class="uo_lastname"  />'+
            '<input type="text" value="名（如：San）" class="uo_firstname"  />'+
            '</div>'+
            '</div>';
    }
    //姓名手机号邮箱实现历史选择记忆功能
    function uoHisFillIn(){
        //实现历史记忆功能，把记忆的东西添加到value中
        if(fake_data.guestName&&fake_data.guestName[0].GuestFirstName!=''){
            var uo_lastname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_lastname');
            var uo_firstname=lsf_myweb.getbyclass(uo_c3_peoBox,'uo_firstname');
            for(var j=0;j<uo_lastname.length;j++){
                uo_lastname[j].value=fake_data.guestName[j].GuestLastName;
                uo_firstname[j].value=fake_data.guestName[j].GuestFirstName;
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
    styleChange('uo_c3_email','用于接收邮件通知');
    styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
    styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
    // 明细
    function uo_detail(id1,id2,id3,id4,id5,id6,id7,json){
        console.log(json);
        console.log(222);
        var oId1=document.getElementById(id1);
        var oId2=document.getElementById(id2);
        var oId3=document.getElementById(id3);
        var oId4=document.getElementById(id4);
        var oId5=document.getElementById(id5);
        oId1.innerHTML=json.NumOfRoom+'间×'+json.dateInfo.totalNight+'晚';
        if(parseInt(json.paymentModeID)==1){
            oId2.innerHTML='￥'+parseFloat(json.avgPriceCNY)*parseFloat(json.NumOfRoom);
            oId3.innerHTML='￥'+parseFloat(json.taxChargesCNY)*parseFloat(json.NumOfRoom);
            oId4.innerHTML='付款方式：'+lsf_myweb.payment(json.paymentModeID);
            oId5.innerHTML=parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
        }else if(parseInt(json.paymentModeID)==2){
            var oId6=document.getElementById(id6);
            var oId7=document.getElementById(id7);
            oId2.innerHTML='SGD'+parseFloat(json.avgPrice)*parseFloat(json.NumOfRoom);
            oId3.innerHTML='SGD'+parseFloat(json.taxCharges)*parseFloat(json.NumOfRoom);
            oId4.innerHTML='付款方式：'+lsf_myweb.payment(json.paymentModeID);
            oId6.innerHTML=parseFloat(json.totalPrice)*parseFloat(json.NumOfRoom);
            oId7.innerHTML='约￥'+parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
        }
        fake_data.calcuTotalPrice=parseFloat(json.NumOfRoom)*parseFloat(json.totalPrice);
        fake_data.calcuTotalPriceCNY=parseFloat(json.NumOfRoom)*parseFloat(json.totalPriceCNY);
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
            styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
            styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
        }
        if(parseInt(uo_c2_num.innerHTML)<=1){
            uo_c2_i1.style.background='url("../images/down2.png") no-repeat';
            uo_c2_i1.style.backgroundSize='23px 23px';
        }
        if(parseInt(uo_c2_num.innerHTML)<10){
            uo_c2_i2.style.background='url("../images/up1.png") no-repeat';
            uo_c2_i2.style.backgroundSize='23px 23px';
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


        if(parseInt(uo_c2_num.innerHTML)>10){
            uo_c2_num.innerHTML=10;
        }else{
            for(var i=parseInt(myNum);i<parseInt(uo_c2_num.innerHTML);i++){
                var oDiv=document.createElement('div');
                oDiv.className='uo_c3_peo';
                oDiv.innerHTML='<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                '<div class="uo_c3_infor">'+
                '<input type="text" value="姓（如：Zhang）" class="uo_lastname"  />'+
                '<input type="text" value="名（如：San）" class="uo_firstname"  />'+
                '</div>';
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
            styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Zhang）');
            styleChange2('uo_c3_peoBox','uo_firstname','名（如：San）');
        }
        if(parseInt(uo_c2_num.innerHTML)>1){
            uo_c2_i1.style.background='url("../images/down1.png") no-repeat';
            uo_c2_i1.style.backgroundSize='23px 23px';
        }
        if(parseInt(uo_c2_num.innerHTML)>=10){
            uo_c2_i2.style.background='url("../images/up2.png") no-repeat';
            uo_c2_i2.style.backgroundSize='23px 23px';
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
        if(hoPos=='inter'){
            for(var i=0;i<aUo_firstname.length;i++){
                if(aUo_lastname[i].value=='姓（如：Zhang）'){
                    alert('请输入姓');
                    return;
                }
                if(checkCN(aUo_lastname[i].value)){
                    alert('请输入英文姓或名');
                    return;
                }
                if(checkCN(aUo_firstname[i].value)){
                    alert('请输入英文姓或名');
                    return;
                }
                if(aUo_firstname[i].value=='名（如：San）'){
                    alert('请输入名');
                    return;
                }
                fake_data.guestName.push({"GuestFirstName":aUo_firstname[i].value,"GuestLastName":aUo_lastname[i].value});
            }
        }else if(hoPos=='dom'){
            for(var i=0;i<aUo_firstname.length;i++){
                if(aUo_lastname[i].value=='姓（如：Zhang）'){
                    alert('请输入姓');
                    return;
                }
                if(aUo_firstname[i].value=='名（如：San）'){
                    alert('请输入名');
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
            alert('请输入手机号');
            return;
        }else{
            var reg=/^\d+$/g;
            if(!reg.test(uo_c3_tele.value)){
                alert('手机号必须是数字');
                return;
            }else{
                fake_data.GuestContactNo=uo_c3_tele.value;
            }
        }
        console.log(fake_data);
        if(uo_c3_email.value=='用于接收邮件通知'){
            alert('请输入邮箱');
            return;
        }else{
            fake_data.GuestEmail=uo_c3_email.value;
        }
        window.localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        console.log(fake_data);
        //console.log(JSON.parse(localStorage.getItem('user_order_storage12345')));
        uo_form.submit();
    });
    //取消说明点击事件
    lsf_myweb.bind(uo_c1_infoDown,'click',function(){
        if(downBok){
            uo_c1_info.className='';
        }else{
            uo_c1_info.className='uo_c1_info';
        }
        downBok=!downBok;
    });
})();