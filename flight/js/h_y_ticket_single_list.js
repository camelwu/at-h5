var ticketSingle = {

    CultureName: "zh-CN",

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    dateInit:function(arg){
        var paraObj = {
            start:this.backParaObj.DepartDate};
        var myDate= new TicketDate({
            id: 'dateIcon',
            num: 13,
            time: paraObj,
            sClass1: 'num-wrap',
            type:'Oneway',
            fn:this.dateChangeRender
        });
        document.querySelector('.single-ticket-input').innerHTML = this.returnWeek(arg.DepartDate);
    },

    addHandler: function (target, eventType, handle) {
        if (document.addEventListener) {
            this.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            this.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            this.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        this.addHandler(target, eventType, handle);
    },

    dateChangeRender:function(){
           var that = ticketSingle,dateStr = document.querySelector('.num-wrap').innerHTML;
           var reg = /(\d{1,2})月(\d{1,2})日/g,tStr = reg.exec(dateStr);
           var returnWeek  = function(arg){
                   var index = new Date(new Date().getFullYear()+'/'+tStr[1]+'/'+tStr[2]).getDay(),week;
                   switch (index){
                   case 0 :
                       week = '周日';
                       break;
                   case 1 :
                       week = '周一';
                       break;
                   case 2 :
                       week = '周二';
                       break;
                   case 3 :
                       week = '周三';
                       break;
                   case 4 :
                       week = '周四';
                       break;
                   case 5 :
                       week = '周五';
                       break;
                   case 6 :
                       week = '周六';
                       break;
                   default :
                       void(0)
                   }
               return week
               };
           tStr[1] = parseInt(tStr[1]) < 10?'0'+parseInt(tStr[1]):parseInt(tStr[1]);
           tStr[2] = parseInt(tStr[2]) < 10?'0'+parseInt(tStr[2]):parseInt(tStr[2]);
           document.querySelector('.single-ticket-input').innerHTML = tStr[1] + '-' + tStr[2] +'&nbsp;<span>'+ returnWeek(new Date().getFullYear()+'-'+tStr[1]+'-'+tStr[2])+'</span>';
           that.backParaObj.DepartDate = new Date().getFullYear()+'-'+tStr[1]+'-'+tStr[2];
           document.querySelector('#preloader').style.display='block';
           //that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
           //重置URL  DepartDate
            var newUrl = vlm.setUrlPara("","DepartDate",that.backParaObj.DepartDate);
            window.location.href = newUrl;
        
    },

    tAjax: function (questUrl, data, Code, ForeEndType, Callback,loadMoreSign) {
        var that=this,dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl?questUrl:that.requestUrl;
        if(loadMoreSign){
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback,false,false,loadMoreSign);
        }else{
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        }
    },

    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage,data = localStorage.getItem(key),dataObj = JSON.parse(data);
            return JSON.stringify(dataObj.data);
        }
    },

    returnWeek:function(arg){
        var index = new Date(arg.replace(/-/g, "/")).getDay(),week;
        switch (index){
            case 0 :
                week = '周日';
                break;
            case 1 :
                week = '周一';
                break;
            case 2 :
                week = '周二';
                break;
            case 3 :
                week = '周三';
                break;
            case 4 :
                week = '周四';
                break;
            case 5 :
                week = '周五';
                break;
            case 6 :
                week = '周六';
                break;
            default :
                void(0)
        }
        array = arg.split('-');
        array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
        array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
        return array[1]+'-'+array[2]+' '+'<span>'+week+'</span>';
    },

    parseUrlPara: function (url, isEncode) {
        var isEncode = isEncode || false;
        var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
        url.replace(reg, function () {
            var arg = arguments;
            obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
        });
        return obj;
    },
    preAndNex:function(){
        var oDivs = document.querySelectorAll('.unit'),that = this;
        ticketSingle.addHandler(oDivs[0], 'click', function(){
            var str = document.querySelector('.single-ticket-input').innerHTML;
            var reg = /(\d{1,2}-\d{1,2})[\s\S]*/g;
            var dateCur = reg.exec(str)[1];
            var dd = new Date(((new Date().getFullYear()) +'-'+dateCur).replace(/-/g, "/"));
            dd.setDate(dd.getDate()-1);
            var monthNum = (dd.getMonth()+1)<10?"0"+parseInt((dd.getMonth()+1)):dd.getMonth()+1;
            var dateNum = (dd.getDate())<10?"0"+parseInt(dd.getDate()):dd.getDate();
            var arg = dd.getFullYear()+'-'+monthNum+'-'+dateNum;
            if(new Date(arg.replace(/-/g, "/"))-new Date()>0){
                var result = ticketSingle.returnWeek(arg);
                document.querySelector('.single-ticket-input').innerHTML = result;
                that.backParaObj.DepartDate = arg;
                that.backParaObj.pageNo= 1;
                that.backParaObj.pageSize= 10;
                document.querySelector('#preloader').style.display='block';
                //that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
                //重置URL  DepartDate
                var newUrl = vlm.setUrlPara("","DepartDate",arg);
                window.location.href = newUrl;
            }else {
                oDivs[0].className = 'unit previous-day disabled-date-choose'
            }
        });
        ticketSingle.addHandler(oDivs[1], 'click', function(){
            var str = document.querySelector('.single-ticket-input').innerHTML;
            var reg = /(\d{1,2}-\d{1,2})[\s\S]*/g;
            var dateCur = reg.exec(str)[1];
            var dd = new Date(((new Date().getFullYear()) +'-'+dateCur).replace(/-/g, "/"));
            dd.setDate(dd.getDate()+1);
            var monthNum = (dd.getMonth()+1)<10?"0"+parseInt((dd.getMonth()+1)):dd.getMonth()+1;
            var dateNum = (dd.getDate())<10?"0"+parseInt(dd.getDate()):dd.getDate();
            var arg = dd.getFullYear()+'-'+monthNum+'-'+dateNum;
            if(new Date(arg.replace(/-/g, "/"))-new Date()>0){
                var result_ = ticketSingle.returnWeek(arg);
                oDivs[0].className = 'unit previous-day';
                document.querySelector('.single-ticket-input').innerHTML = result_;
                that.backParaObj.DepartDate = arg;
                that.backParaObj.pageNo= 1;
                that.backParaObj.pageSize= 10;
                document.querySelector('#preloader').style.display='block';
                //that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
                //重置URL  DepartDate
                var newUrl = vlm.setUrlPara("","DepartDate",arg);
                window.location.href = newUrl;
            }

        });
    },
    checkPullStatus:function(){
        /*
        var lis =  document.querySelectorAll('.air-tickets-detail-wrapper li');
        var pullDown = document.querySelector('#pullDown'),pullUp = document.querySelector('#pullUp');
        if(lis!=null&&lis.length>0){
            pullDown.style.display = "block";
            pullUp.style.display = "block";
        }else{
            pullDown.style.display = "none";
            pullUp.style.display = "none";
        }
        */
    },
    renderHandler:function(arg){
        var arg = arg;
        var that = ticketSingle,airTicketsListWrapper =  document.querySelector('.air-tickets-detail-wrapper');
        var tipEle = document.querySelector('.flight-result-tip'), noFlightInfo=null;
        document.querySelector('#preloader').style.display='none';
        if(arg.success&&arg.code==200&&arg.data.flightInfos.length > 0){
                document.querySelector('.tip-button-para').style.display='none';
                tipEle.style.display = 'none';
                that.flightResultArray.push(arg["data"]);
                that.lastBackData = arg;
                that.storageUtil.set('flightListData',that.flightResultArray);
                that.pageNo = arg.data.pageNo;
                that.pageCount = arg.data.pageCount;
                that.changeFlightList(arg);
                that.eventHandler();
                that.taxDeal(arg.data.flightInfos);
                
        }else if(arg.success == false&&arg.message.indexOf('greater')>-1){
            document.querySelector('.no-flight-word').innerHTML='未搜到航班信息，请扩大搜索范围!';
            document.querySelector('.tip-button-para').style.display='block';
            airTicketsListWrapper.innerHTML = "";
            tipEle.style.display = 'block';
            that.timer7 = window.setTimeout(function(){
                tipEle.style.display = 'none';
                window.clearTimeout(that.timer7);
                that.timer7 = null;
            },3000);
        }else{
               tipEle.style.display = 'none';
               that.isClearAll = true;
               airTicketsListWrapper.innerHTML = "";
               document.querySelector('.tip-button-para').style.display='block';
          }
    },

    taxDeal:function(arg){
        var taxData = [],freeTaxData = [],priceDesc=[],priceAsic=[];
        for(var i = 0;i<arg.length;i++){
            arg[i].totalTaxAmountADT == 0?freeTaxData.push(arg[i]):taxData.push(arg[i])
        }
        priceDesc = arg.sort(function(a,b){
            return parseFloat(a.totalFareAmountExc)-parseFloat(b.totalFareAmountExc)
        });
        priceAsic = priceDesc.reverse();
        this.cacheTypeData = {
            taxData:taxData,
            freeTaxData:freeTaxData,
            priceDesc:priceDesc,
            priceAsic:priceAsic
        }
    },

    checkTip:function(){
        var lis = document.querySelectorAll('.detail-list li'),temArray='';
        var tLis = document.querySelectorAll('#time-modal li'),tTemArray='';
        var pLis = document.querySelectorAll('#price-modal li'),pTemArray='';
             for(var i = 0;i < lis.length;i++){
                if(lis[i].className.indexOf('active')>-1){
                    temArray+= i ;
                }
             }

        for(var j = 0;j < tLis.length;j++){
            if(tLis[j].className.indexOf('active')>-1){
                tTemArray+= j ;
            }
        }
        for(var k = 0;k < pLis.length;k++){
            if( pLis[k].className.indexOf('active')>-1){
                pTemArray+= k ;
            }
        }
           return {left:temArray,middle:tTemArray,right:pTemArray};
    },

    timeCut:function(arg){
        var reg = /\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}/g,result = reg.exec(arg);
        return result[1]+':'+result[2];
    },

    returnTransferCity:function(arg){
        var str = '';
        if(arg.length<2){
            str = ''
        }else if(arg.length=2){
            str = '<span class="air-port-word">转'+arg[0].cityNameTo+'</span>'
        }else if(arg.length>=3){
            str = '<span class="air-port-word">中转'+(arg.length-1)+'次</span>'
        }
        return str;
    },

    changeFlightList:function(arg, type){
        var that = this;
        var ticketDetailUl = document.querySelector('.air-tickets-detail-wrapper');
        var ticketListStr,ShareFlightStr='',passByStr='',transferCity='',tipDay='', li;
        var myFixed = function(arg){
            if(String(arg).indexOf('.')>-1){
                if(String(arg).substring(String(arg).indexOf('.')).length ==2){
                    return String(arg)+'0';
                }
                return String(arg).substring(0,String(arg).indexOf('.')+3)
            }else{
                return String(arg)+'.00';
            }
        };
        ticketDetailUl.innerHTML = that.isClearAll==true?"":ticketDetailUl.innerHTML;
        var returnRightTax = function(){
            var str = '';
            if(type == "false"){
                str+= '<div class="price-tax single-side">' +
                '<div class="price-info"><span class="price-icon">￥</span><span class="single-price-pull-right">'+myFixed(arg.data.flightInfos[i].totalFareAmountADT)+'</span></div>' +
                '<div class="single-price-tax-info"><span class="tax-word">税</span>'+myFixed(myFixed(arg.data.flightInfos[i].totalTaxAmountADT)) +'</div>'
            }else{
                str+= '<div class="price-tax single-side">' +
                '<div class="price-info"><span class="price-icon">￥</span><span class="single-price-pull-right">'+myFixed(arg.data.flightInfos[i].totalFareAmountExc)+'</span></div>' +
                '<div class="single-price-tax-info"><span class="tax-word">含税费</div>' +
                '</div>'
                }
            return str;
        };
        for(var i = 0; i < arg.data.flightInfos.length; i++){
            ticketListStr = '';
            li = document.createElement('li');
            li.className = "air-tickets-detail seat-detail";
            li.setAttribute("data-set-id",arg.data.flightInfos[i].setID);
            ShareFlightStr = arg.data.flightInfos[i].isReturnShareFlight==true?'&nbsp;|&nbsp;<span class="green-tip">共享</span>&nbsp;|':'';
            passByStr = arg.data.flightInfos[i].isLeaveStop==true?' | <span class="green-tip">经停</span>':'';
            tipDay = arg.data.flightInfos[i].flightLeaveSpacingDay>=1?'+'+arg.data.flightInfos[i].flightLeaveSpacingDay+'天':'';
            transferCity = that.returnTransferCity(arg.data.flightInfos[i].segmentsLeave);
            ticketListStr +='<div class="time-airport" >' +
            '<div class = "go" >' +
            '<div class = "go-info" >' +
            '<div class="start-time-info" >' +
            '<span class= "time-number" >'+that.timeCut(arg.data.flightInfos[i].flightLeaveStartDate)+'</span>'+
            '<span class="air-port-word">'+arg.data.flightInfos[i].segmentsLeave[0].airportNameFrom+arg.data.flightInfos[i].segmentsLeave[0].termDepart+'</span >'+
            '</div>'+
            '<div class="total-time-info">' +
            '<span class="time-hour-minute">'+parseInt(arg.data.flightInfos[i].segmentsLeaveTotalTravelTime/60)+'h'+arg.data.flightInfos[i].segmentsLeaveTotalTravelTime%60+'m</span>' +
            '<span class="arrow-time"></span>'+transferCity+'</div >' +
            '<div class= "end-time-info" >' +
            '<span class="tip-add-days" >'+tipDay+'</span>' +
            '<span class="time-number">'+that.timeCut(arg.data.flightInfos[i].flightLeaveEndDate)+'</span >' +
            '<span class= "air-port-word" >'+arg.data.flightInfos[i].segmentsLeave[arg.data.flightInfos[i].segmentsLeave.length-1].airportNameTo+arg.data.flightInfos[i].segmentsLeave[0].termArrive+'</span>' +
            '</div ></div>' +
            '<p class="small-info"></span >'+arg.data.flightInfos[i].segmentsLeave[0].operatingCarrierName+arg.data.flightInfos[i].segmentsLeave[0].operatingCarrierCode+arg.data.flightInfos[i].segmentsLeave[0].flightNo+'&nbsp;|&nbsp;'+arg.data.flightInfos[i].segmentsLeave[0].cabinClassName+ShareFlightStr+passByStr+'</p>'+
            '</div ></div>' +returnRightTax();
            li.innerHTML = ticketListStr;
            ticketDetailUl.appendChild(li);
        }

        this.loadMoreHandler(arg.data.pageNo,arg.data.pageCount);
        this.eventHandler();
        return;
    },
    loadMoreHandler:function(pageNo,pageCount){
        var loadMoreBtn = document.getElementById("loadMore");
        loadMoreBtn.innerHTML = "点击加载更多";
        loadMoreBtn.style.display = "block";
        if(pageNo == pageCount){
            loadMoreBtn.innerHTML = "没有更多数据了";
        }
    },
    loadMoreBtnEvent:function(){
        var loadMoreBtn = document.getElementById("loadMore");
        this.addHandler(loadMoreBtn,"click",function(){
            ticketSingle.loadMoreData();
        })
    },
    callRender:function(arg){
        var paraObj = {},that = ticketSingle;
        paraObj.IsDirectFlight = arg.directFly == 'unlimitedPlane'?'false':'true';
        paraObj.IsHideSharedFlight = arg.IsHideSharedFlight == 'hideShareFlight'?'false':'true';
        paraObj.DepartStartHour = arg.filterTime.substr(0,2);
        paraObj.DepartEndHour = arg.filterTime.substr(2,2);
        paraObj.CabinClass = arg.CabinClass;
        paraObj.pageNo = 1;
        paraObj.pageSize = 10;
        switch(arg.paraMiddle){
            case "directFirst":
                paraObj.PriorityRule = 1;break;
            case"lowPriceFirst":
                paraObj.PriorityRule = 2;break;
            case "shortTimeFirst":
                paraObj.PriorityRule = 3;break;
            case "earlyAsLate":
                paraObj.IsDesc = "true";break;
            case "lateAsEarly":
                paraObj.IsDesc = "false";break;
            default :
                paraObj.PriorityRule = 0;
        }

           for(var tem in paraObj){
               that.backParaObj[tem] = paraObj[tem];
              }
              console.log(that.backParaObj)
              document.querySelector('#preloader').style.display='block';
              that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
              var temObj = that.checkTip();
              that.initLeftState.left!=temObj.left?document.querySelector('#fo_sc i').className='red-tip':document.querySelector('#fo_sc i').className='';
              that.initLeftState.middle!=temObj.middle?document.querySelector('#fo_ra i').className='red-tip':document.querySelector('#fo_ra i').className='';
              that.initLeftState.right!=temObj.right?document.querySelector('#fo_lo i').className='red-tip':document.querySelector('#fo_lo i').className='';
    },
    alertNoFlightNotice:function(citys,type){
        var div = document.createElement('div'),allEleWrap = document.querySelector('.all-elements'),backButton,that = ticketSingle;
        var arrowIcon = type =='single'?'direction-single':'direction-double';
        div.className = 'no-flight-notice';
        div.innerHTML = '<header class="big-title"><i class="fl close-no-flight"></i>'+
        '<span class="set-place">'+citys.fromCity+'</span>'+
        '<i class="'+arrowIcon+'"></i>'+
        '<span class="to-place">'+citys.toCity+'</span>'+
        '</header>'+
        '<div class="tip-button-para">'+
        '<p class="no-flight-word">没有找到符合条件的航班!</p></div>';
        allEleWrap.appendChild(div);
        backButton = document.querySelector('.close-no-flight');
        that.addHandler(backButton,"click",function(){
            allEleWrap.removeChild(div)
        })

            },
    eventHandler:function(){
        var oLis =  document.querySelectorAll('.seat-detail'),that = ticketSingle,shadowBox = document.querySelector('#r-shadow'),
            filterModal=document.querySelector('#filter-modal'),timeModal = document.querySelector('#time-modal'),priceModal = document.querySelector('#price-modal');
        for(var i = 0 ;i < oLis.length; i ++){
            this.addHandler(oLis[i], 'click', function(){
                 that.storageUtil.set('currentListPara', that.backParaObj );
                 document.location.href ='ticket_seat_choose.html?setId='+this.getAttribute('data-set-id')+'&RouteType='+that.backParaObj.RouteType+
                '&CabinClass='+that.backParaObj.CabinClass+'&NumofAdult='+that.backParaObj.NumofAdult+'&NumofChild='+that.backParaObj.NumofChild;
            })
        }
        this.addHandler(shadowBox, 'click', function(){
            if(filterModal.style.bottom == '0px'){
                filterModal.style.transition = 'all 300ms ease-in';
                filterModal.style.webkitTransition = 'all 300ms linear';
                filterModal.style.bottom = '-126%';
            }else if(timeModal.style.bottom == '0px'){
                timeModal.style.transition = 'all 300ms ease-in';
                timeModal.style.webkitTransition = 'all 300ms linear';
                timeModal.style.bottom = '-126%';
            }else if(priceModal.style.bottom == '0px'){
                priceModal.style.transition = 'all 300ms ease-in';
                priceModal.style.webkitTransition = 'all 300ms linear';
                priceModal.style.bottom = '-126%';
            }
            this.style.display = 'none';
        });
    },

    taxHandler:function(){
        var priceModal = document.querySelector('#price-modal');
        this.addHandler(priceModal, 'click', function(event){
            var shadowBox = document.querySelector('#r-shadow'),that = ticketSingle;
            var event = event || window.event;
            var target =target||event.srcElement;
            var sibLis =target.parentNode.querySelectorAll('li'),temParaObject={data:{flightInfos:[]}};
            if(target.getAttribute('data-i')=='noTax'){
                if(that.cacheTypeData.freeTaxData.length==0){
                    jAlert('当前航班均含税，换种条件试试!', '', function(){})
                }else{
                    temParaObject.data.flightInfos = that.cacheTypeData.freeTaxData;
                    that.changeFlightList( temParaObject);
                    for(var l= 0,length=sibLis.length;l<length;l++){
                        sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                    }
                }
            }else if(target.getAttribute('data-i')=='hasTax'){
                temParaObject.data.flightInfos = that.cacheTypeData.taxData;
                that.changeFlightList( temParaObject);
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                }
            }else if(target.getAttribute('data-i')=='priceHighToLow'){
                    temParaObject.data.flightInfos = that.cacheTypeData.priceDesc;
                    that.changeFlightList( temParaObject);
                    for(var l= 0,length=sibLis.length;l<length;l++){
                        sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                    }
            }else if(target.getAttribute('data-i')=='priceLowToHigh'){
                temParaObject.data.flightInfos = that.cacheTypeData.priceAsic;
                that.changeFlightList( temParaObject);
                for(var l= 0,length=sibLis.length;l<length;l++){
                    sibLis[l].className =sibLis[l]==target?"price-modal-item active":"price-modal-item";
                }
            }

            this.style.transition = 'all 300ms ease-in';
            this.style.webkitTransition = 'all 300ms linear';
            this.style.bottom = '-126%';
            shadowBox.style.display = 'none';
        });
    },
        
    loadMoreData:function(){
        var  that = ticketSingle;
         var loadMore = document.getElementById("loadMore");
        if(that.pageNo >= that.pageCount){
            $('#loadMore').fadeOut(1000);
            jAlert('<div class="no-more-flight-tip">没有更多航班信息了</div>','',function(){})
        }else if(that.pageNo < that.pageCount){
            that.isClearAll = false;
            that.backParaObj["pageNo"] ++;
            console.log(that.backParaObj)
            loadMore.innerHTML = "正在加载...";
            that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler,true);
        }
    },
    handler1:function(arg){ //后台请求
        var that = ticketSingle;
        that.backParaObj = arg;
        document.querySelector('#preloader').style.display='block';
        that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
        console.log(arg)
    },
    handler2:function(arg){ //自己缓存的数据重新展现
        var that = ticketSingle;
        that.backParaObj = arg;
        that.changeFlightList(that.lastBackData, that.backParaObj.hasTax);
        console.log(arg)
    },
    init:function(){
        var backParaObj = this.parseUrlPara(document.location.search, true);
        var generatedCount = 0,that = ticketSingle;
        document.querySelector('.set-place').innerHTML =backParaObj.fromCity;
        document.querySelector('.to-place').innerHTML =backParaObj.toCity;
        this.tripType = backParaObj.interNationalOrDomestic;
        backParaObj.NumofAdult = parseInt(backParaObj.NumofAdult);
        backParaObj.NumofChild = parseInt(backParaObj.NumofChild);
        backParaObj.PriorityRule = parseInt(backParaObj.PriorityRule);
        backParaObj.pageNo = parseInt(backParaObj.pageNo);
        backParaObj.pageSize = parseInt(backParaObj.pageSize);
        this.backParaObj = backParaObj;
        this.tAjax(this.requestUrl, backParaObj, "3001", 3, this.renderHandler);
        this.flightResultArray = [];
        if($.browser.webkit && !window.chrome){
           document.querySelector('#wrapper').style.top = '88px';
        }
        this.dateInit(backParaObj);
        this.preAndNex();
        conditionalFiltering.init(this.tripType, this.backParaObj.RouteType, this.backParaObj,this.handler1, this.handler2);
        this.eventHandler();
        this.taxHandler();
        this.isClearAll = true;
        this.initLeftState = this.checkTip();
        this.loadMoreBtnEvent();
    }
};

ticketSingle.init();