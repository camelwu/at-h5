/**
 * Created by Asiatravel on 2016/1/4.
 */
    var user_order_storage={
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
};
//本地存储数据
localStorage.setItem('user_order_storage12345',JSON.stringify(user_order_storage));
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
    /*页面跳转动画*/
    $(window).load(function(){
        $("#status").fadeOut();
        $("#preloader").delay(400).fadeOut("medium");
    });



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

    //酒店名称/时间/房型
    var uo_con2_chil1=document.getElementById('uo_con2_chil1');
    uo_con2_chil1.innerHTML='<h3>'+user_order_storage.HotelName+'</h3>'+
        '<p class="uo_c2_infor">'+user_order_storage.CheckInTime+'-'+user_order_storage.CheckOutTime+' -'+user_order_storage.totalNight+'晚（目的地时间为准）</p>'+
        '<p class="uo_house">房型：'+user_order_storage.houseType+'</p>';
    // 明细
    function uo_detail(id1,id2,id3,id4,id5,json){
        var oId1=document.getElementById(id1);
        var oId2=document.getElementById(id2);
        var oId3=document.getElementById(id3);
        var oId4=document.getElementById(id4);
        var oId5=document.getElementById(id5);
        var price1=0;
        oId1.innerHTML=json.NumOfRoom+'间×'+json.totalNight+'晚';
        price1=parseInt(json.NumOfRoom)*parseInt(json.totalNight)*json.housePrice;
        oId2.innerHTML='￥'+parseInt(json.NumOfRoom)*parseInt(json.totalNight)*json.housePrice;
        oId3.innerHTML='￥159(没有给)';
        price1+=159;
        oId4.innerHTML='付款方式：前台现付';
        oId5.innerHTML=price1;
    }
    uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum',user_order_storage);


    lsf_myweb.bind(uo_c2_i1,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)-1;

        //修改数据并存储数据
        user_order_storage.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(user_order_storage));
        //console.log(localStorage.getItem('user_order_storage12345'));


        if(parseInt(uo_c2_num.innerHTML)<0){
            uo_c2_num.innerHTML=0;
        }else{
            uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum',user_order_storage);
            uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" placeholder="姓（如：Timberlake）" class="uo_lastname" />'+
                    '<input type="text" placeholder="名（如：Justin）" class="uo_firstname" />'+
                    '</div>'+
                    '</div>';
            }
        }

    });
    lsf_myweb.bind(uo_c2_i2,'click',function(){
        var uo_c3_peoBox=document.getElementById('uo_c3_peoBox');
        uo_c2_num.innerHTML=parseInt(uo_c2_num.innerHTML)+1;

        //修改数据并存储数据
        user_order_storage.NumOfRoom=parseInt(uo_c2_num.innerHTML);
        localStorage.setItem('user_order_storage12345',JSON.stringify(user_order_storage));
        //console.log(localStorage.getItem('user_order_storage12345'));


        if(parseInt(uo_c2_num.innerHTML)>10){
            uo_c2_num.innerHTML=10;
        }else{
            uo_detail('uo_hid_p2','uo_hid_span2','uo_hid_span3','uo_hid_met','uo_or_sum',user_order_storage);
            uo_c3_peoBox.innerHTML='';
            for(var i=0;i<parseInt(uo_c2_num.innerHTML);i++){
                uo_c3_peoBox.innerHTML+='<div class="uo_c3_peo">'+
                    '<div class="uo_c3_div1">房间'+(i+1)+'入住人</div>'+
                    '<div class="uo_c3_infor">'+
                    '<input type="text" placeholder="姓（如：Timberlake）" class="uo_lastname" />'+
                    '<input type="text" placeholder="名（如：Justin）" class="uo_firstname" />'+
                    '</div>'+
                    '</div>';
            }
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
    lsf_myweb.bind(uo_agree,'click',function(){
        document.getElementById('uo_shadow').style.display='block';
        document.getElementById('uo_hid_con6').style.display='block';
        var uo_c6_close=document.getElementById('uo_c6_close');
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
        user_order_storage.fullName={};
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
            user_order_storage.fullName[GuestFirstName]=aUo_firstname[i].value;
            user_order_storage.fullName[GuestLastName]=aUo_lastname[i].value;
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
                user_order_storage.GuestContactNo=uo_c3_tele.value;
            }
        }
        localStorage.setItem('user_order_storage12345',JSON.stringify(user_order_storage));
        //console.log(JSON.parse(localStorage.getItem('user_order_storage12345')));
        uo_form.submit();
    })
})();