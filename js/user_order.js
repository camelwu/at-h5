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
        switch (type){
            case '1':
                return '预付';
                break;
            case '2':
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

//输入框默认字体设置
styleChange('uo_c3_tele','用于接收短信通知');
styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Timberlake）');
styleChange2('uo_c3_peoBox','uo_firstname','名（如：Justin）');

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
    console.log(JSON.parse(user_order_storage2));
    //console.log(JSON.parse(user_order_storage2).data);
    //console.log(JSON.parse(user_order_storage2).data.Data);
    //console.log(JSON.parse(user_order_storage2).data.Data[0].HotelGenInfo);
    fake_data.HotelGenInfo=JSON.parse(user_order_storage2).data.data[0].hotelGenInfo;
    fake_data.dateInfo=JSON.parse(user_order_storage2).data.data[0].dateInfo;
    //console.log(JSON.parse(user_order_storage2).data.Data[0].HotelRoomsList);
    var HotelRoomsList=JSON.parse(user_order_storage2).data.data[0].hotelRoomsList;
    for(var i=0;i<HotelRoomsList.length;i++){
        for(var j=0;j<HotelRoomsList[i].roomList.length;j++){
            if(HotelRoomsList[i].roomList[j].roomCode==RoomCode){
                //console.log(HotelRoomsList[i].RoomList[j]);
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
    /*var user_order_storage={
        "CultureName":"",
        "PartnerCode":"",
        "HotelCode":"8016",
        "RoomCode":"",
        "HotelName":"Hotel Grand Chancellor (Hotel Grand Chancellor)",
        "CheckInTime":"2016-01-07",
        "CheckOutTime":"2016-01-10",
        "NumOfRoom":"1",
        "NumOfGuest":"",
        "NumOfChild":"",
        "GuestTitle":"",
        "GuestLastName":"",
        "GuestFirstName":"",
        "GuestContactNo":"",
        "GuestEmail":"ַ",
        "TotalPrice":"",
        "Availability":"",
        "GuestRequest":"",
        "MemberId":"",
        "CardHolderName":"",
        "CreditCardNumber":"",
        "CreditCardType":"",
        "CreditCardExpiryDate":"",
        "CardSecurityCode":"",
        "BankName":"",
        "ResidenceCode":"",
        "NationlityCode":"",
        "CardBillingAddress":"ַ",
        "CardIssuanceCountry":"",
        "CashVoucherDetails":"",
        "Trck":"",
        "IPAddress":"",
        "CookieID":"1",
        "BrowserType":"",
        "SessionID":"",


        "totalNight":3,
        "houseType":"大床房",
        "housePrice":"398"
};*/
//本地存储数据
localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));

(function(){
    /*页面跳转动画*/
    $(window).load(function(){
        $("#status").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    });


    var uo_back=document.getElementById('uo_back');
    var uo_c2_i1=document.getElementById('uo_c2_i1');
    var uo_c2_i2=document.getElementById('uo_c2_i2');
    var uo_c2_num=document.getElementById('uo_c2_num');
    var uo_c4_conf=document.getElementById('uo_c4_conf');
    var uo_or_infor=document.getElementById('uo_or_infor');
    var uo_form=document.getElementById('uo_con3');
    var uo_confirm=document.getElementById('uo_confirm');
    var uo_agree=document.getElementById('uo_agree');

    var bOk=true;
    var bOk2=true;

    //返回按钮
    uo_back.onclick=function(){
        window.history.go(-1);
    };




    //酒店名称/时间/房型
    var uo_con2_chil1=document.getElementById('uo_con2_chil1');
    uo_con2_chil1.innerHTML='<h3>'+fake_data.HotelGenInfo.hotelName+'</h3>'+
        '<p class="uo_c2_infor">'+fake_data.dateInfo.CheckInDate.split('-')[0]+'年'+fake_data.dateInfo.CheckInDate.split('-')[1]+'月'+fake_data.dateInfo.CheckInDate.split('-')[2]+'日'+'-'+fake_data.dateInfo.CheckOutDate.split('-')[0]+'年'+fake_data.dateInfo.CheckOutDate.split('-')[1]+'月'+fake_data.dateInfo.CheckOutDate.split('-')[2]+'日'+' -'+fake_data.dateInfo.totalNight+'晚（目的地时间为准）</p>'+
        '<p class="uo_house">房型：'+fake_data.RoomTypeName+'</p>';

    //房间数列表
    uo_c2_num.innerHTML=fake_data.NumOfRoom;
    for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
        uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
            '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
            '<div class="uo_c3_infor">'+
            '<input type="text" value="姓（如：Timberlake）" class="uo_lastname"  />'+
            '<input type="text" value="名（如：Justin）" class="uo_firstname"  />'+
            '</div>'+
            '</div>';
    }

    //输入框默认字体设置
    styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Timberlake）');
    styleChange2('uo_c3_peoBox','uo_firstname','名（如：Justin）');


    // 明细
    function uo_detail(id1,id2,id3,id4,id5,id6,json){
        //console.log(json);
        var oId1=document.getElementById(id1);
        var oId2=document.getElementById(id2);
        var oId3=document.getElementById(id3);
        var oId4=document.getElementById(id4);
        var oId5=document.getElementById(id5);
        var oId6=document.getElementById(id6);
        var price1=0;
        oId1.innerHTML=json.NumOfRoom+'间×'+json.dateInfo.totalNight+'晚';
        price1=parseFloat(json.NumOfRoom)*parseFloat(json.totalPrice);
        oId3.innerHTML='SGD'+json.taxCharges;
        oId4.innerHTML='付款方式：'+lsf_myweb.payment(json.paymentModeID);
        oId2.innerHTML='SGD'+(price1-json.taxCharges).toFixed(2);
        oId5.innerHTML=price1;
        fake_data.calcuTotalPrice=price1;
        oId6.innerHTML=parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
        fake_data.calcuTotalPriceCNY=parseFloat(json.totalPriceCNY)*parseFloat(json.NumOfRoom);
    }
    uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2',fake_data);

    //减少房间
    lsf_myweb.bind(uo_c2_i1,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)-1;
        if(parseInt(uo_c2_num.innerHTML)<1){
            uo_c2_num.innerHTML=1;
        }else{
            uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2',fake_data);
            uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" value="姓（如：Timberlake）" class="uo_lastname"  />'+
                    '<input type="text" value="名（如：Justin）" class="uo_firstname"  />'+
                    '</div>'+
                    '</div>';
            }
            //输入框默认字体设置
            styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Timberlake）');
            styleChange2('uo_c3_peoBox','uo_firstname','名（如：Justin）');
        }
        if(parseInt(uo_c2_num.innerHTML)<=1){
            uo_c2_i1.style.background='url("images/down2.png") no-repeat';
            uo_c2_i1.style.backgroundSize='23px 23px';
        }
        if(parseInt(uo_c2_num.innerHTML)<10){
            uo_c2_i2.style.background='url("images/up1.png") no-repeat';
            uo_c2_i2.style.backgroundSize='23px 23px';
        }
        //修改数据并存储数据
        fake_data.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        //console.log(localStorage.getItem('user_order_storage12345'));
    });
    //增加房间
    lsf_myweb.bind(uo_c2_i2,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)+1;

        //修改数据并存储数据
        fake_data.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        //console.log(localStorage.getItem('user_order_storage12345'));


        if(parseInt(uo_c2_num.innerHTML)>10){
            uo_c2_num.innerHTML=10;
        }else{
            uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum','uo_or_sum2',fake_data);
            uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" value="姓（如：Timberlake）" class="uo_lastname"  />'+
                    '<input type="text" value="名（如：Justin）" class="uo_firstname"  />'+
                    '</div>'+
                    '</div>';
            }
            //输入框默认字体设置
            styleChange2('uo_c3_peoBox','uo_lastname','姓（如：Timberlake）');
            styleChange2('uo_c3_peoBox','uo_firstname','名（如：Justin）');
        }
        if(parseInt(uo_c2_num.innerHTML)>1){
            uo_c2_i1.style.background='url("images/down1.png") no-repeat';
            uo_c2_i1.style.backgroundSize='23px 23px';
        }
        if(parseInt(uo_c2_num.innerHTML)>=10){
            uo_c2_i2.style.background='url("images/up2.png") no-repeat';
            uo_c2_i2.style.backgroundSize='23px 23px';
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
    //用户协议点击事件
    lsf_myweb.bind(uo_agree,'click',function(){
        document.getElementById('uo_shadow').style.display='block';
        document.getElementById('uo_hid_con6').style.display='block';
        var uo_c6_close=document.getElementById('uo_c6_close');


        //用户协议隐藏事件
        lsf_myweb.bind(uo_c6_close,'click',function(){
            document.getElementById('uo_shadow').style.display='none';
            document.getElementById('uo_hid_con6').style.display='none';
        })
    });
    lsf_myweb.bind(uo_or_infor,'click',function(){
        var oI=this.getElementsByTagName('i')[0];
        if(bOk2){
            oI.style.background='url(images/ui/icons1.png) -76px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='100%';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='38px';
            //点击阴影区域
            var uo_hid_shadow=document.getElementById('uo_hid_shadow');
            lsf_myweb.bind(uo_hid_shadow,'click',function(){
                oI.style.background='url(images/ui/icons1.png) -51px -38px ';
                oI.style.backgroundSize='400px 120px';
                lsf_myweb.getbyid('uo_hid').style.height='0';
                lsf_myweb.getbyid('uo_hid_con').style.marginBottom='-320px';
                bOk2=true;
            });
        }else{
            oI.style.background='url(images/ui/icons1.png) -51px -38px ';
            oI.style.backgroundSize='400px 120px';
            lsf_myweb.getbyid('uo_hid').style.height='0';
            lsf_myweb.getbyid('uo_hid_con').style.marginBottom='-320px';
        }
        bOk2=!bOk2;
    });

    lsf_myweb.bind(uo_confirm,'click',function(){
        //验证是否勾选协议
        if(bOk){
            alert('请勾选条款及条件和用户协议');
            return;
        }
        var aUo_lastname=lsf_myweb.getbyclass(uo_form,'uo_lastname');
        var aUo_firstname=lsf_myweb.getbyclass(uo_form,'uo_firstname');
        var uo_c3_tele=document.getElementById('uo_c3_tele');
        fake_data.fullName={};
        //验证名字
        for(var i=0;i<aUo_firstname.length;i++){
            if(!aUo_firstname[i].value){
                alert('请输入名字');
                return;
            }
            if(!aUo_lastname[i].value){
                alert('请输入姓');
                return;
            }

            var GuestFirstName="GuestFirstName"+i;
            var GuestLastName="GuestLastName"+i;
            fake_data.fullName[GuestFirstName]=aUo_firstname[i].value;
            fake_data.fullName[GuestLastName]=aUo_lastname[i].value;
        }
        //验证手机号
        if(!uo_c3_tele.value){
            alert('请输入手机号');
            return;
        }else{
            var reg=/^1[345678]\d{9}$/g;
            if(!reg.test(uo_c3_tele.value)){
                alert('手机号输入错误');
                uo_c3_tele.value='';
                return;
            }else{
                fake_data.GuestContactNo=uo_c3_tele.value;
            }
        }
        localStorage.setItem('user_order_storage12345',JSON.stringify(fake_data));
        console.log(fake_data);
        //console.log(JSON.parse(localStorage.getItem('user_order_storage12345')));
        uo_form.submit();
    })
})();