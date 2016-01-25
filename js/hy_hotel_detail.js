;(function(window,document){
    var hotelDetail ={
        CultureName:"zh-CN",
        tempCurLeft:0,
        tempStart:0,
        isAnimation:false,
        requestUrl:"http://10.2.22.239:8888/api/GetServiceApiResult",

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


        addHandler:function(target,eventType,handle,arguments){
            console.log(arguments)

            if(document.addEventListener){
                Event.addEvent = function(target,eventType,handle,arguments){
                    target.addEventListener(eventType,function(arguments){
                        handle.call(target,arguments);
                    },false);

                }
            }else if(document.attachEvent){
                Event.addEvent = function(target,eventType,handle){
                    target.attachEvent('on'+eventType,function(){
                        handle.call(target,arguments);
                    });
                }
            }else{
                Event.addEvent = function(target,eventType,handle){
                    target['on'+eventType] = handle;
                }
            }
            Event.addEvent (target,eventType,handle);
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
                    str += '<li class="imageLi"><img class="freeImage" src="images/cacheN.png" real-src="'+arg[i].ImageFileName+'"/></li>'
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
                        return '五';
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
                    str+=(temp=='IsFreeWifi'&&arg[temp]==true)? '<li><p>Wifi</p><div>��</div></li>':'';
                    str+=(temp=='IsFreeTransfer'&&arg[temp]==true)? '<li><p>��ѽ��ͻ�</p><div>��</div></li>':'';
                    str+=(temp=='IsFreeWifi'&&arg[temp]==true)? '<li><p>��ѳ��й۹�</p><div>��</div></li>':'';
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
                return arg.disCount!=null?'<div class="info-text"> <div class="privilege">�ֽ���</div>�þƵ����ڲλ��ֽ��������߷�������5%</div>':'<div class="info-text">����</div>'
            },


            cancelTip:function(arg){
                return arg.disCount!=null?'<div class="info-text">�����ύ�����ʱȡ����Asiatravel.com����ȡ�κη��á�</div>':'<div class="info-text">����</div>'
            }

        },

        showImages:function(result){
            var picOuter = document.createElement('div');
            picOuter.id="imageContainer";
            picOuter.innerHTML='<h5 class="indexShow">123</h5><div class="showZone"><ul class="imgUl" style="left:0px;width:100%">'+this.sTools.getImages(result.Data[0].HotelImagesList)+'</ul></div>';
            this.$Id('content').insertBefore(picOuter,this.$CN('top')[0]);
        },

        mask:function(){
            var mask = document.createElement('div');
            mask.className="r-div";
            mask.id="r-mb";
            this.$Id('content').appendChild(mask);

        },

        showRoomList:function(result){
            var str='';
            var tempArray=result.Data[0].HotelRoomsList;
            for(var i= 0; i<tempArray.length;i++){
                str='<li class="d-li1 super"><div class="d-div3 roomEvent" style="max-width: 60%"  room-type-code='+tempArray[i].RoomTypeCode+'> <div class="d-p5">'+tempArray[i].RoomTypeName+'</div> <b class="d-icon3"></b> <div class="d-p6">32-38㎡ 大/双床</div> </div> <a href="#" class="at d-icon5"></a> <div class="price"><span class="money">￥</span><span class="moneyNum">'+tempArray[i].MinAvgPrice+'<span>起</span></span></div>'+hotelDetail.subRoomList(tempArray[i].RoomList)+'</li>';
            }
            return str;
        },

        subRoomList:function(arg){
            var str='<ul class="roomDetailList">';
            for(var i=0;i<arg.length;i++){
                str+='<li class="d-li1"><div class="roomName subRoomEvent" room-code="'+arg[i].RoomCode+'"> <div class="d-p5">'+arg[i].RoomName+'</div> <div class="d-p6">无早 大/双床 不可取消</div> </div> <div class="moneyTip"><span class="money">￥</span><span class="moneyNum">'+arg[i].AvgPrice+'<span>起</span></span></div> <button type="button" class="reserve">预定</button> </li>'
            }
            return str;
        },

        showName:function(result){
            var htmlStr= this.sTools.hotelName(result.Data[0].HotelGenInfo.HotelName)
            $(".header h3").html(htmlStr);

        },

        eventHandle:function(){
            var frontImage = this.$CN('hotelPic')[0]
            var totalNum = this.$CN('totalNum')[0];
            var imageContainer = this.$Id('imageContainer');
            var aLink = this.$CN('at');
            var subRooms = this.$CN('subRoomEvent');
            var Rooms = this.$CN('roomEvent');
            var toMap =  this.$Id('toMap')

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

            toMap.onclick=function(){

                var dataObj={HotelName:hotelDetail.sourceData.Data[0].HotelGenInfo.HotelName,Latitude:hotelDetail.sourceData.Data[0].HotelGenInfo.Latitude,Longitude:hotelDetail.sourceData.Data[0].HotelGenInfo.Longitude}
                var paramStr = "";
                for(var attr in dataObj){
                    paramStr+="&"+attr+"="+dataObj[attr];
                }
                paramStr=paramStr.slice(1);
                document.location.href='jyy_hd_map.html?'+paramStr;
            };

            for(var i=0;i<aLink.length;i++){
                aLink[i].onclick = function(){
                    hotelDetail.toggleStatus.call(this)
                }

            }

            for(var j=0;j<Rooms.length;j++){
                Rooms[j].onclick = function(){
                    hotelDetail.toggleRoomModals.call(this,hotelDetail.gdataInfo)
                }

            }

            for(var k=0;k<subRooms.length;k++){
                subRooms[k].addEventListener('click', hotelDetail.toggleSubModals,false)
            }
        },

        imageHandler:function(result){
            hotelDetail.widthCorrecting(result);
            hotelDetail.imageTouchEvent();
            hotelDetail.eventHandle(); //图片处理完后绑定事件
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

        createAll:function(result){
            result=JSON.parse(result);
            console.log(result)
            if(result.Success==true){
                hotelDetail.$Id('preloader')?document.body.removeChild(hotelDetail.$Id('preloader')):'';
            }else{
                return false;
            }

            var allStr = '',headerStr='',frontImgStr='',imgContainer='',firstUl='',secondUl='',contentStr='',iDiv;

            hotelDetail.sourceData=result;

            headerStr+='<div class="header detailHeader" id="vlm-h-1"><a href="javascript:alert(1);" class="icons header-back"></a><h3>'+hotelDetail.sTools.hotelName(result.Data[0].HotelGenInfo.HotelName)+'</h3></div>';


            frontImgStr+='<div class="d-div1"><img class="hotelPic" src="'+hotelDetail.sTools.frontImage(result.Data[0].HotelImagesList)+'" /> <div class="d-div2 totalNum"><div class="d-p4">'+hotelDetail.sTools.imageNum(result.Data[0].HotelImagesList)+'张</div></div></div>';


            firstUl+='<ul class="d-ul1"><li><span class="rateScore" style="color:#8ed1cc;font-size:15px;font-weight:600;">'+result.Data[0].HotelGenInfo.TAAvgRating+'</span>分/'+result.Data[0].HotelGenInfo.TAReviewCount+'人点评<b class="icons open-arg"></b></li>' +
            '<li><span class="address-text">'+result.Data[0].HotelGenInfo.HotelAddress+'</span><em id="toMap">地图</em><b class="icons open-arg"></b></li>' +
            '<li>'+hotelDetail.sTools.StarRatingName(result.Data[0].HotelGenInfo.StarRatingName)+'星级<b class="CrazyRate"></b><b class="icons open-arg"></b></li></ul>';


            secondUl+='<ul class="d-ul2">' +
            '<li id="chooseDate"><span class="enterDate">'+hotelDetail.gdataInfo.CheckInDate+'</span>入住<span class="enterDate" style="margin-left: 5px;">'+hotelDetail.gdataInfo.CheckOutDate+'</span>离店<em>共<span id="nightNum">'+hotelDetail.sTools.getTotalNights(hotelDetail.gdataInfo.CheckInDate,hotelDetail.gdataInfo.CheckOutDate)+'</span>晚</em><b class="icons open-arg"></b></li>'+hotelDetail.showRoomList(result)+'</ul>';

            contentStr+='<div id="content" class="snap-content" style="padding-top: 45px;">'+frontImgStr+firstUl+secondUl+'</div>';

            allStr+=headerStr+contentStr;
            hotelDetail.$CN('all-elements')[0].innerHTML='';

            hotelDetail.$Id('imageContainer')?document.body.removeChild(hotelDetail.$Id('imageContainer')):"";
            
            hotelDetail.$CN('all-elements')[0].innerHTML=allStr;

            //图片单独生成
            iDiv = document.createElement('div');
            iDiv.id = "imageContainer";
            iDiv.innerHTML = '<h5 class="indexShow"></h5><div class="showZone">' +
            '<ul class="imgUl" style="left: 0px; width: 1400%;">'+hotelDetail.sTools.getImages(result.Data[0].HotelImagesList)+'</ul></div>'


            document.body.appendChild(iDiv);

            hotelDetail.imageHandler(result)

            hotelDetail.initDate(result)    //初始化日期
        },

        upDateContent:function(){
            hotelDetail.gdataInfo.CheckInDate=document.getElementsByClassName('enterDate')[0].innerHTML;
            hotelDetail.gdataInfo.CheckOutDate=document.getElementsByClassName('enterDate')[1].innerHTML;
            hotelDetail.init( hotelDetail.gdataInfo);
        },

        initDate:function(result){
            var dateInitObj=new Object();
            dateInitObj[this.gdataInfo.CheckInDate]='入住';
            dateInitObj[this.gdataInfo.CheckOutDate]='离店';
            var myDate2=new Calender({id:'chooseDate',num:13,time:dateInitObj,sClass1:'enterDate',id2:'nightNum',fn:hotelDetail.upDateContent});

            console.log(result)
            result.Data[0].dateInfo = {CheckInDate:hotelDetail.gdataInfo.CheckInDate,CheckOutDate:hotelDetail.gdataInfo.CheckOutDate,totalNight:Math.abs(hotelDetail.$Id('nightNum').innerHTML)};

            hotelDetail.storageUtil.set("hotelDetailData",result);
            console.log(JSON.parse(window.localStorage.getItem("hotelDetailData")));
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

            if(targetLeft >= 0){//过界判断
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

        indexEvent:function(result,item){
            if(!result.Data[0].HotelImagesList.length>0){
                document.querySelectorAll('.indexShow')[0].innerHTML=""
            }else{
                document.querySelectorAll('.indexShow')[0].innerHTML=item+"/"+result.Data[0].HotelImagesList.length;
            }

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

            var oDiv = document.createElement('div');
            oDiv.className="roomAll";
            oDiv.id="infoAll";

            oDiv.innerHTML='<div class="room" id="info"><header class="r-top"><p class="r-p1">'+arg.RoomName+'</p><b class="r-icon1 closeTag"></b></header><div class="info-div"><ul class="ro-info"></ul></div><div class="info-div"><p class="r-p2" style="font-weight: bold">优惠政策</p><div class="info-text">暂无</div><div class="info-div" style="border:none"><p class="r-p2" style="font-weight: bold">取消说明</p><div class="info-text">暂无</div></div></div></div>';

            hotelDetail.$CN('all-elements')[0].appendChild(oDiv);
            hotelDetail.$Id('r-mb').style.display = 'block';
            hotelDetail.$CN('closeTag')[0].onclick=function(event){
                hotelDetail.$CN('all-elements')[0].removeChild(hotelDetail.$Id('infoAll'))
                hotelDetail.$Id('r-mb').style.display = 'none';
            }

        },

        toggleStatus:function() {
            $(this.parentNode.parentNode).find('ul.roomDetailList').hide();
            $(this.parentNode.parentNode).find('a.at').each(function(){
                $(this).attr('class', 'at d-icon5');
            })
            if (this.isOpen) {
                $(this.parentNode).find('ul.roomDetailList').slideUp("400");
                $(this).attr('class', 'at d-icon5');
                this.isOpen = false;
            } else {
                $(this.parentNode).find('ul.roomDetailList').slideDown("400");
                this.isOpen = true;
                $(this).attr('class', 'at d-icon4');
            }
        },

        toggleSubModals:function(){
            var  info = this.getAttribute('room-code'),tempInfo;
            var compareData =  hotelDetail.sourceData.Data[0].HotelRoomsList;
            for(var i = 0; i< compareData.length;i++){
                for(var j = 0,teList=compareData[i].RoomList;j<teList.length;j++){
                    if(teList[j].RoomCode==info){
                        tempInfo=teList[j];
                        break;
                    }
                }
            }
            hotelDetail.updateSubRoomModal(tempInfo);
        },

        showRoomModals:function(reslut){
            var oDiv = document.createElement('div');
            oDiv.className='roomAll';
            oDiv.id='roomAll';
            oDiv.innerHTML='<div class="room" id="room"><header class="r-top"><p class="r-p1">高级客房</p><b class="r-icon1 closeTagAgain"></b></header> <div class="r-div1"><img class="hotelPic2" src="images/03-3_03.jpg"></div> <article class="r-ar">最多 2成人<br>儿童10岁或以上按照成人算。&nbsp;&nbsp;10岁以下的儿童按照酒店的具体规定一般免费（但不提供早餐和加床）。婴儿（1岁以下）如果使用现有的床铺可免费入住。请注意，如果您需要一个婴儿床可能有额外收费 </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间描述</p> <article class="r-ar">Newly refurbished Deluxe Rooms are a unique expression of stylishcomfort.Featuring </article> <hr size="1px" width="100%" color="#ececec"> <p class="r-p2" style="">房间设施</p> <ul class="r-ul"> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">无线上网服务(免费)</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">双人床/两张单人床</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">个人温度调节器</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">有线/卫星电视</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">热水喝冷水淋浴</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">AM/FM收音机</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">24小时商务中心</p></li> <li class="r-li"><b class="r-icon2"></b> <p class="r-p3">SPA浴盆</p></li> </ul> </div>'
            hotelDetail.$CN('all-elements')[0].appendChild(oDiv);
            hotelDetail.$Id('r-mb').style.display = 'block'
            hotelDetail.$CN('closeTagAgain')[0].onclick=function(event){
                hotelDetail.$CN('all-elements')[0].removeChild(hotelDetail.$Id('roomAll'))
                hotelDetail.$Id('r-mb').style.display = 'none';
            }

        },

        toggleRoomModals:function(gInfo){
            console.log(gInfo)
            var  roomTypeCode = this.getAttribute('room-type-code');
            var roomInfo={HotelID:gInfo.HotelID,CultureName:hotelDetail.CultureName,RoomTypeCode:roomTypeCode};
            hotelDetail.jAjax(hotelDetail.requestUrl,roomInfo,"0010",3,hotelDetail.showRoomModals);
        },


        init:function(arg){

            var dataObj = arg||this.parseUrlPara(document.location.search,true);

            this.gdataInfo = dataObj;

            this.jAjax(this.requestUrl,dataObj,"0008",3,this.createAll);

            window.hotelDetail=hotelDetail;
        }
    };

    hotelDetail.init();
})(window,document);
