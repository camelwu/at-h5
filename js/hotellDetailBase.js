;(function(window,document){
    var hotelDetail ={
        CultureName:"zh-CN",
        tempCurLeft:0,
        tempStart:0,
        isAnimation:false,
        $Id:function(id){
            return document.getElementById(id);
        },

        $CN:function(className){
            return document.getElementsByClassName(className)
        },

        storageUtil:{
            set:function(key,v){
                var curTime = new Date().getTime();
                var localStorage = window.localStorage;
                localStorage.setItem(key,JSON.stringify({data:v,time:curTime}))
            },
            get:function(key,exp){
                var data = localStorage.getItem(key);
                var dataObj = JSON.parse(data);
                if(new Date().getTime()-dataObj.time>exp){
                    return "";//expired
                }else{
                    return "data="+dataObj.data;
                }
            }
        },

        CookieUtil : {
            get : function(name) {
                var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie.indexOf(cookieName), cookieValue = null;
                if (cookieStart > -1) {
                    var cookieEnd = document.cookie.indexOf(";", cookieStart);
                    if (cookieEnd == -1) {
                        cookieEnd = document.cookie.length;
                    }
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }
                return cookieValue;
            },
            set : function(name, value, expires, path, domain, secure) {
                var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                if ( expires instanceof Date) {
                    cookieText += "; expires=" + expires.toGMTString();
                }
                if (path) {
                    cookieText += "; path=" + path;
                }
                if (domain) {
                    cookieText += "; domain=" + domain;
                }
                if (secure) {
                    cookieText += "; secure=" + secure;
                }
                document.cookie = cookieText;
            },
            clear : function(name, path, domain, secure) {
                this.set(name, "", new Date(0), path, domain, secure);
            }
        },

        parseUrlPara:function (url,isEncode){
            var isEncode=isEncode||false;
            var reg=/([^=&?]+)=([^=&?]+)/g,obj={};
            url.replace(reg,function(){
                var arg=arguments;
                obj[arg[1]]=isEncode?decodeURIComponent(arg[2]):arg[2];
            });
            return obj;
        },


        jAjax:function(questUrl, data,Code,ForeEndType,Callback){
            var dataObj =
            {
                Parameters: JSON.stringify(data),
                Code: Code,
                ForeEndType: ForeEndType
            };
            var c = new vcm();
            c.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        },

        sTools:{
            hotelName:function(arg) {
                return arg.indexOf('(') != -1 ? '<p class="d-p1">' + arg.slice(0, arg.indexOf(' (')) + '<br/>' + arg.slice(arg.indexOf(' (') + 1)+'</p>' : '<p class="d-p1" style="line-height: 44px">' + arg + '</p>';
            },
            frontImage:function(arg){
                for(var temp in arg){
                    if(arg[temp]["ReferenceType"] =='Front Image'){
                        return arg[temp]["ImageFileName"]
                    };
                }
            },
            imageNum:function(arg){
                return (arg&&arg.length)?arg.length:0;
            },
            getImages:function(arg) {
                if (arg == "") {
                    return '<li class="noImage">暂无图片</li>';
                }
                var str = "";
                for (var i = 0; i < arg.length; i++) {
                    str += '<li class="imageLi"><img class="freeImage" src="images/cars.png" real-src="'+arg[i].ImageFileName+'"/></li>'
                }

                return str;

            },
            StarRatingName: function(starStr) {
                switch (starStr.charCodeAt(0)) {
                    case 49:
                        return '一';
                        break;
                    case 50:
                        return '二';
                        break;
                    case 51:
                        return '三';
                        break;
                    case 52:
                        return '四';
                        break;
                    case 53:
                        return '五';
                        break;
                    case 54:
                        return '六';
                        break;
                    case 55:
                        return '七';
                        break;
                    default:
                        return '无';
                        break;

                }
            },
            getHotelTip:function(arg){
                var str='', argument=arg.Data[0].HotelGenInfo;
                for(var temp in argument){
                    str+=(temp=='IsCashRebate'&&argument[temp]==0)? '<b class="CashRebate"></b>':'';
                    str+=(temp=='IsCrazyRate'&&argument[temp]==0)? '<b class="CrazyRate"></b>':'';
                }
                return str;
            },
            getRoomTip:function(arg){
                var str='';
                for(var temp in arg){
                    str+=(temp=='IsFreeWifi'&&arg[temp]==true)? '<li><p>Wifi</p><div>有</div></li>':'';
                    str+=(temp=='IsFreeTransfer'&&arg[temp]==true)? '<li><p>免费接送机</p><div>有</div></li>':'';
                    str+=(temp=='IsFreeWifi'&&arg[temp]==true)? '<li><p>免费城市观光</p><div>有</div></li>':'';
                }
                return str;
            },
            getDates:function(arg) {
                return /^\d{4}\-(\d{1,2})\-(\d{1,2})/g.exec(arg)[1]+'-'+/^\d{4}\-(\d{1,2})\-(\d{1,2})/g.exec(arg)[2]
            },
            getTotalNights:function(end,start){
                return (Date.parse(end) - Date.parse(start))/1000/60/60/24;
            },
            Discount:function(arg){
                return arg.disCount!=null?'<div class="info-text"> <div class="privilege">现金奖励</div>该酒店正在参会现金奖励活动，最高返还房费5%</div>':'<div class="info-text">暂无</div>'
            },
            cancelTip:function(arg){
                return arg.disCount!=null?'<div class="info-text">订单提交后可随时取消，Asiatravel.com不收取任何费用。</div>':'<div class="info-text">暂无</div>'
            }

        },

        showUpper:function(result){
            console.log(result)
            var nameDiv = document.createElement('div');
            nameDiv.className="top name";
            nameDiv.id="vlm-login";
            nameDiv.innerHTML='<a href="hotel_list.html" class="d-icons"></a>'+this.sTools.hotelName(result.Data[0].HotelGenInfo.HotelName);
            this.$CN('all-elements')[0].appendChild(nameDiv);


            var numDiv = document.createElement('div');
            numDiv.className="d-div1";
            numDiv.innerHTML='<img class="hotelPic" src="'+this.sTools.frontImage(result.Data[0].HotelImagesList)+'"><div class="d-div2 totalNum"><div class="d-p4">'+this.sTools.imageNum(result.Data[0].HotelImagesList)+'张</div></div>';
            this.$CN('all-elements')[0].appendChild(numDiv);

        },

        showImages:function(result){
            var picOuter = document.createElement('div');
            picOuter.id="imageContainer";
            picOuter.innerHTML='<h5 class="indexShow">123</h5><div class="showZone"><ul class="imgUl" style="left:0px;width:100%">'+this.sTools.getImages(result.Data[0].HotelImagesList)+'</ul></div>';
            this.$CN('all-elements')[0].insertBefore(picOuter,this.$CN('top')[0]);
        },

        showTitleList:function(result){
            var titleList = document.createElement('ul');
            var dateInitObj= {};
            dateInitObj[this.gdataInfo.CheckInDate]='入住';
            dateInitObj[this.gdataInfo.CheckOutDate]='离店';
            titleList.className="d-ul1";
            titleList.innerHTML='<li class="d-li1"><div class="d-score"><span style ="color:#8ed1cc;font-size:15px;font-weight: 600;"="">'+result.Data[0].HotelGenInfo.TAAvgRating+'<span>分/'+result.Data[0].HotelGenInfo.TAReviewCount+'人点评</span></spanstyle ="color:#8ed1cc;font-size:15px;font-weight:></div> <a href="#" class="d-icon1"></a></li>' +
            '<li class="d-li1"><div class="d-score">'+result.Data[0].HotelGenInfo.HotelAddress+'</div><a href="#" class="d-icon1"></a><div class="d-p2">地图</div></li><li class="d-li1"><div class="d-score2">'+this.sTools.StarRatingName(result.Data[0].HotelGenInfo.StarRatingName)+'星级</div>'+this.sTools.getHotelTip(result)+'<a href="#" class="d-icon1"></a></li>' +
            '<li class="d-li1" id="chooseDate"> <div class="d-p3 enterDate">'+this.gdataInfo.CheckInDate+'</div><div class="d-p3">入住</div><div class="d-p3 enterDate" style="margin-left: 5px;">'+this.gdataInfo.CheckOutDate+'</div><div class="d-p3">离店</div> <a href="#" class="d-icon1"></a>  <div class="d-p2">共</div><div class="d-p2" id="nightNum">'+ this.sTools.getTotalNights(this.gdataInfo.CheckOutDate,this.gdataInfo.CheckInDate)+ '</div><div class="d-p2">晚</div></li>';
            this.$CN('all-elements')[0].appendChild(titleList);
            var myDate2=new Calender({id:'chooseDate',num:13,time:dateInitObj,sClass1:'enterDate',id2:'nightNum'});
        },

        mask:function(){
            var mask = document.createElement('div');
            mask.className="r-div";
            mask.id="r-mb";
            this.$CN('all-elements')[0].appendChild(mask);

        },

        showRoomList:function(result){
            var oFragment = document.createDocumentFragment();
            var tempArray=result.Data[0].HotelRoomsList;
            for(var i= 0; i<tempArray.length;i++){
                var oli = document.createElement('li');
                oli.className="d-li1 super";
                oli.innerHTML='<div class="d-div3 roomEvent" style="max-width: 60%" onclick="hotelDetail.toggleRoomModals.call(this)"  room-type-code='+tempArray[i].RoomTypeCode+'><div class="d-p5">'+tempArray[i].RoomTypeName+'</div><b class="d-icon3"></b><div class="d-p6">32-38㎡ 大/双床</div></div><a href="#" class="at d-icon4" onclick="hotelDetail.toggleStatus.call(this)"></a> <div class="price"><span style="font-size:0.8em;color:#fe4716;">￥</span><spanstyle="font-size:2em;font-weight: 600;color:#fe4716;"="">'+tempArray[i].MinPrice+'<spanstyle="font-size:0.8em;color:#999999;">起</spanstyle="font-size:0.8em;color:#999999;"></spanstyle="font-size:2em;font-weight:></div>'+this.subRoomList(tempArray[i].RoomList);
                oFragment.appendChild(oli);
            }
            this.$CN('d-ul1')[0].appendChild(oFragment);
        },

        subRoomList:function(arg){
            var str='<ul class="roomUl">';
            for(var i=0;i<arg.length;i++){
                str+='<li class="d-li1" style="width:94%;background: #dfdfdd">' +
                '<div class="d-div3 subRoomEvent" room-code='+arg[i].RoomCode+' style="max-width: 60%" onclick="hotelDetail.toggleSubModals.call(this)"><div class="d-p5">'+arg[i].RoomName+'</div><div class="d-p7"><span>无早 大床 不可取消</span></div></div>' +
                '<div class="d-but">预订</div><div class="price2"><spanstyle="font-size:0.8em;color:#fe4716;">￥<spanstyle="font-size:2em;font-weight: 600;color:#fe4716;"="">'+arg[i].AvgPrice+'</spanstyle="font-size:2em;font-weight:></spanstyle="font-size:0.8em;color:#fe4716;"></div></li>';
            }
            return str;
        },


        subRoomModal:function(arg){
            //var arg=JSON.parse(arg)
            var subRoomModal = document.createElement('div');
            subRoomModal.className="roomAll";
            subRoomModal.id="infoAll";
            subRoomModal.innerHTML='<div class="room" id="info"><header class="r-top"><p class="r-p1">'+arg.RoomName+'</p>' +
            '<b class="r-icon1"></b></header> <div class="info-div"><ul class="ro-info">' +this.sTools.getRoomTip(arg)+''+
            '</div><div class="info-div"><p class="r-p2" style="font-weight: bold">优惠政策</p>' +this.sTools.Discount(arg)+''+

            '<div class="info-div" style="border:none"> <p class="r-p2" style="font-weight: bold">取消说明</p>'+this.sTools.cancelTip(arg)+'</div></div>'
            hotelDetail.$CN('all-elements')[0].appendChild(subRoomModal);
            hotelDetail.$Id('info').onclick=function(event){
                var target=event.target||event.srcElement;
                if(hotelDetail.$Id('infoAll')){
                    hotelDetail.$Id('infoAll').style.display = 'none';
                    hotelDetail.$Id('r-mb').style.display = 'none';
                }
            }
        },

        roomDetailInfo:function(){
            var roomDetailInfo = document.createElement('div');
            roomDetailInfo.className="roomAll";
            roomDetailInfo.id="roomAll";
            roomDetailInfo.innerHTML='<div class="room" id="room"><header class="r-top"><p class="r-p1">高级客房</p><b class="r-icon1" onclick="closeRoom()"></b></header><div class="r-div1"><img class="hotelPic2" src="images/03-3_03.jpg"></div><article class="r-ar">最多 2成人<br>儿童10岁或以上按照成人算。&nbsp;&nbsp;10岁以下的儿童按照酒店的具体规定一般免费（但不提供早餐和加床）。婴儿（1岁以下）如果使用现有的床铺可免费入住。请注意，如果您需要一个婴儿床可能有额外收费 ' +
            '</article><hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间描述</p><article class="r-ar">Newly refurbished Deluxe Rooms are a unique expression of stylish comfort.Featuring</article>' +
            '<hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间设施</p><ul class="r-ul"><li class="r-li"><b class="r-icon2"></b><p class="r-p3">无线上网服务(免费)</p></li><li class="r-li"><b class="r-icon2"></b><p class="r-p3">双人床/两张单人床</p></li>' +
            '<li class="r-li"><b class="r-icon2"></b><p class="r-p3">个人温度调节器</p></li><li class="r-li"><b class="r-icon2"></b><p class="r-p3">有线/卫星电视</p></li><li class="r-li"><b class="r-icon2"></b><p class="r-p3">热水喝冷水淋浴</p></li><li class="r-li"><b class="r-icon2"></b><p class="r-p3">AM/FM收音机</p></li> <li class="r-li"><b class="r-icon2"></b><p class="r-p3">24小时商务中心</p></li><li class="r-li"><b class="r-icon2"></b><p class="r-p3">SPA浴盆</p></li></ul></div>';
            this.$CN('all-elements')[0].appendChild(roomDetailInfo);
        } ,

        showContent:function(result){
            result=JSON.parse(result);
            hotelDetail.sourceData=result;
            hotelDetail.showUpper(result);
            hotelDetail.showImages(result);
            hotelDetail.indexEvent(result,1);
            hotelDetail.imagesEvent(result);

            hotelDetail.showTitleList(result);
            hotelDetail.mask();
            hotelDetail.showRoomList(result);


            hotelDetail.subRoomModal(result);
            hotelDetail.roomDetailInfo(result);

        },

        indexEvent:function(result,item){
            if(!result.Data[0].HotelImagesList.length>0){
                document.querySelectorAll('.indexShow')[0].innerHTML=""
            }else{
                document.querySelectorAll('.indexShow')[0].innerHTML=item+"/"+result.Data[0].HotelImagesList.length;
            }

        },
        widthCorrecting:function(result){
            var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
            document.querySelectorAll('.imgUl')[0].style.width = result.Data[0].HotelImagesList.length != 0 ? (100 * result.Data[0].HotelImagesList.length) + "%" : "100%";
            if (document.querySelectorAll('.imageLi').length) {
                for (var m = 0, Lis = document.querySelectorAll('.imageLi'); m < Lis.length; m++) {
                    Lis[m].style.width = innerWidth + "px";
                }
            }
        },

        imagesEvent:function(result){
            this.widthCorrecting(result);
            this.imageTouchEvent();
            this.eventHandle();

        },


        imageTouchEvent:function(){
            var outerDiv=document.getElementById('imageContainer');
            var innerDiv=document.getElementsByClassName('showZone')[0];
            var totalNum=document.getElementsByClassName('totalNum')[0];

            outerDiv.onclick=function(event){
                var e =event ||window.event;
                var tar =event.target ||event.srcElement;
                if(tar.id=='imageContainer'){
                    tar.style.display = 'none'
                }
            };
            totalNum.onclick=function(event){
                document.getElementById('imageContainer').style.display='block';
            };
            innerDiv.addEventListener('touchstart', this.startHandler,false)
            innerDiv.addEventListener('touchmove', this.moveHandler,false)
            innerDiv.addEventListener('touchend', this.endHandler,false)
        },

        startHandler:function(e){
            e.preventDefault();
            if(!hotelDetail.isAnimation){
                hotelDetail.tempStart = e.targetTouches[0].pageX;
            }else{
                hotelDetail.isAnimation=true;
            };


        },
        moveHandler:function(e){
            e.preventDefault();
            var imgUl=document.getElementsByClassName('imgUl')[0];
            imgUl.style.left=parseFloat(imgUl.style.left)+e.targetTouches[0].pageX-hotelDetail.tempStart+'px';
            hotelDetail.tempStart=e.targetTouches[0].pageX;

        },
        endHandler:function(e){
            e.preventDefault();
            var minLeftValue = (document.querySelectorAll('.imageLi').length-1)*window.innerWidth;
            var endLeftValue = parseFloat(document.getElementsByClassName('imgUl')[0].style.left);
            var distance = endLeftValue-hotelDetail.tempCurLeft,time=1000,targetLeft,indexNUm;
            if(distance<0&&Math.abs(distance)>=window.innerWidth/3){
                targetLeft=hotelDetail.tempCurLeft-window.innerWidth;
            }else if(distance>0&&Math.abs(distance)>=window.innerWidth/3){
                targetLeft = hotelDetail.tempCurLeft+window.innerWidth;
            }else{
                targetLeft = hotelDetail.tempCurLeft;
            }

            if(targetLeft >= 0){//过界处理
                targetLeft = 0;
            }else if (targetLeft <= -minLeftValue){
                targetLeft =-minLeftValue;
            }
            indexNUm = Math.abs(targetLeft/window.innerWidth)+1;
            time = Math.abs((targetLeft-parseFloat(document.getElementsByClassName('imgUl')[0].style.left))/window.innerWidth)*time;
            hotelDetail.tempCurLeft=targetLeft;
            $('.imgUl').animate({'left': targetLeft},time);
            hotelDetail.indexEvent(hotelDetail.sourceData,indexNUm);
            hotelDetail.delayLoadImage(indexNUm);
            hotelDetail.isAnimation=false;
        },

        toHotelInfoPage:function(){

        },

        delayLoadImage:function(item){
            var images= document.getElementsByClassName('freeImage');
            var re_url=images[item-1].getAttribute('real-src');
            loadImage(re_url,function(){
                images[item-1].setAttribute('src',re_url)
            })
            function loadImage(url, callback) {
                var img = new Image();
                img.src = url;
                img.onload = function(){
                    img.onload = null;
                    callback();
                }

            }
        },

        updateSubRoomModal:function(arg){
            //var arg = JSON.parse(arg)
            var str='';
            str+='<header class="r-top"><p class="r-p1">'+arg.RoomName+'</p><b class="r-icon1"></b></header>';
            str+='<div class="info-div"><ul class="ro-info">' +this.sTools.getRoomTip(arg)+'</div>';
            str+='<div class="info-div"><p class="r-p2" style="font-weight: bold">优惠政策</p>'+this.sTools.Discount(arg);
            str+='<div class="info-div" style="border:none"> <p class="r-p2" style="font-weight: bold">取消说明</p>'+this.sTools.cancelTip(arg)+'</div></div>';
            hotelDetail.$Id('info').innerHTML=str;
        },

        updateRoomModal:function(arg){
            var arg = JSON.parse(arg)
            var str='';
            str+='<header class="r-top"><p class="r-p1">高级客房</p><b class="r-icon1"></b></header>';
            str+='<div class="r-div1"><img class="hotelPic2" src="images/03-3_03.jpg"></div>';
            str+='<article class="r-ar">最多 2成人<br>费 </article>'
            str+='<hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间描述</p>'
            str+='<article class="r-ar">Newly refurbished Deluxe Rooms are a unique expression of stylish comfort.Featuring</article>'
            str+='<hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间设施</p>'
            str+='<ul class="r-ul">'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">无线上网服务(免费)</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">双人床/两张单人床</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">个人温度调节器</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">有线/卫星电视</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">热水喝冷水淋浴</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">AM/FM收音机</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">24小时商务中心</p></li>'
            str+='<li class="r-li"><b class="r-icon2"></b><p class="r-p3">SPA浴盆</p></li>'
            str+='</ul>'
            str+='</div>';
            hotelDetail.$Id('room').innerHTML=str;
            hotelDetail.$Id('room').onclick=function(event){
                var target=event.target||event.srcElement;
                if(target.className=="r-icon1"){
                    hotelDetail.$Id('roomAll').style.display = 'none';
                    hotelDetail.$Id('r-mb').style.display = 'none';
                }
            }


        },

        updateBigModal:function(result){
            var result =result;
            hotelDetail.updateRoomModal(result);
            hotelDetail.$Id('roomAll').style.display = 'block';
            hotelDetail.$Id('r-mb').style.display = 'block';



        },

        toggleStatus:function() {
            $(this.parentNode.parentNode).find('ul.roomUl').hide();
            $(this.parentNode.parentNode).find('a.at').each(function(){
                $(this).attr('class', 'at d-icon5');
            })
            if (this.isOpen) {
                $(this.parentNode).find('ul.roomUl').slideUp("400");
                $(this).attr('class', 'at d-icon5');
                this.isOpen = false;
            } else {
                $(this.parentNode).find('ul.roomUl').slideDown("400");
                this.isOpen = true;
                $(this).attr('class', 'at d-icon4');
            }
        },

        toggleSubModals:function(){
            var  info = this.getAttribute('room-code'),tempInfo;
            var compareData =  hotelDetail.sourceData.Data[0].HotelRoomsList;
            for(var i = 0; i< compareData.length;i++){
                for(var j = 0,teList=compareData[i].RoomList;j<teList.length;j++){
                    console.log(teList[j])
                    if(teList[j].RoomCode==info){
                        tempInfo=teList[j];
                        break;
                    }
                }
            }

            hotelDetail.updateSubRoomModal(tempInfo);
            hotelDetail.$Id('infoAll').style.display = 'block';
            hotelDetail.$Id('r-mb').style.display = 'block';

        },

        toggleModals:function(reslut){
            console.log(reslut);
            hotelDetail.updateBigModal(reslut)
        },

        toggleRoomModals:function(){
            var  roomTypeCode = this.getAttribute('room-type-code');
            var roomInfo={HotelID:hotelDetail.gdataInfo.HotelID,CultureName:hotelDetail.CultureName,RoomTypeCode:roomTypeCode};
            hotelDetail.jAjax("http://10.2.22.239:8888/api/GetServiceApiResult",roomInfo,"0010",3,hotelDetail.toggleModals);
        },
        eventHandle:function(){
            var frontImage = this.$CN('hotelPic')[0];
            var totalNum = this.$CN('totalNum')[0];
            var imageContainer = this.$Id('imageContainer');
            var aLink = this.$CN('at');
            var subRooms = this.$CN('subRoomEvent');
            var Rooms = this.$CN('roomEvent');

            frontImage.onclick=function() {
                document.location.href = 'jyy_hotelSummary.html'
            };

            totalNum.onclick=function(){
                hotelDetail.$Id('imageContainer').style.display = 'block';
            };
            imageContainer.onclick=function(event){
                var event=event||window.event;
                var target =event.target||event.srcElement;
                if(target.id=='imageContainer'){
                    target.style.display = 'none'}
            };


            for(var j=0;j<subRooms.length;j++){
                (function(j,fun){
                    subRooms[j].addEventListener('click',fun,false);
                })(j,toggleSubModals)
            }

        },


        init:function(){
            document.body.removeChild(this.$Id('preloader'));
            var dataObj = this.parseUrlPara(document.location.search,true);
            this.gdataInfo = dataObj;
            this.jAjax("http://10.2.22.239:8888/api/GetServiceApiResult",dataObj,"0008",3,this.showContent);
            window.hotelDetail=hotelDetail;
        }
    };

    hotelDetail.init();
})(window,document);



