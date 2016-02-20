var ticketOrder = {

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    addHandler: function (target, eventType, handle) {

        if (document.addEventListener) {
            ticketOrder.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            ticketOrder.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            ticketOrder.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        ticketOrder.addHandler(target, eventType, handle);
    },

    telSlider:function(){
        $(".custom-select").each(function() {
            var classes = $(this).attr("class"),
                id = $(this).attr("id"),
                name = $(this).attr("name");
            var template = '<div class="' + classes + '">';
            template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
            template += '<div class="custom-options">';
            $(this).find("option").each(function() {
                template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
            });
            template += '</div></div>';

            $(this).wrap('<div class="custom-select-wrapper"></div>');
            $(this).hide();
            $(this).after(template);
        });
        $(".custom-option:first-of-type").hover(function() {
            $(this).parents(".custom-options").addClass("option-hover");
        }, function() {
            $(this).parents(".custom-options").removeClass("option-hover");
        });
        $(".custom-select-trigger").on("click", function() {
            $(this).parents(".custom-select").toggleClass("opened");
        });
        $(".custom-option").on("click", function() {
            $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
            $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
            $(this).addClass("selection");
            $(this).parents(".custom-select").removeClass("opened");
            $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
        });
    },

    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage,data = localStorage.getItem(key),dataObj = JSON.parse(data);
            return dataObj.data;
        }
    },
    timeCut:function(arg){
        var reg = /\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}/g,result = reg.exec(arg);
        return result[1]+':'+result[2];
    },
    addEvent:function(){
        var Button = document.querySelector('#buy-ticket-tip');
        var closeTag = document.querySelector('.close-buy-tip');
        var tipWord = document.querySelector('.tip-word');
        var backMealClose = document.querySelector('.back-meal-close');
        var goLineOuter = document.querySelector('.go-line-outer');
        var confirmButton = document.querySelector('.confirm');
        var summaryCostShadowTwo = document.querySelector('.summary-cost-shadow-two');
        var detailTangle = document.querySelector('.detail-tangle');
        var summaryCostModal = document.querySelector('.summary-cost-modal');
        var summaryCostShadowOne = document.querySelector('.summary-cost-shadow-one');
        var rightArrow = document.querySelector('.trigger-button ');
        var addPassenger = document.querySelector('.add-Passenger');
        var contactPerson = document.querySelector('.contact-person');
        var passengerWrap = document.querySelector('.passenger-list-data');
        var toEditPassengers = document.querySelectorAll('.next-icon');
        var deletePassenger = document.querySelectorAll('.icon-add');
        var that = this;
        console.log(contactPerson)
        this.addHandler(addPassenger,'click', function(){
            document.location.href = '../user/user-choiceAir.html?type=add&NumofAdult='+that.costFinaListData.NumofAdult+'&NumofChild='+that.costFinaListData.NumofChild
        });

        for(var i = 0;i<toEditPassengers.length;i++){
            this.addHandler(toEditPassengers[i],'click', function(){
                document.location.href = '../user/user-choiceAir.html?type=edit&NumofAdult='+that.costFinaListData.NumofAdult+'&NumofChild='+that.costFinaListData.NumofChild;
            });
        }

            this.addHandler(passengerWrap,'click', function(){
               var event = event || window.event;
               var target = event.target || event.srcElement;
                console.log(target.className)
                if(target.tagName =='I'){
                    this.removeChild(target.parentNode.parentNode)
                }
        })

       /* this.addHandler(contactPerson,'click', function(){
            document.location.href = '../user/cont-list.html'
        });*/
        this.addHandler(rightArrow,'click', function(){
            document.querySelector('.summary-cost-shadow-two').style.display = 'block';
            document.querySelector('.ticket-detail-modal').style.display = 'block';
        });

        this.addHandler(confirmButton,'click', function(){
             console.log('dataCommit')
             document.location.href = 'pay_detail.html';
        });


        this.addHandler(Button,'click', function(){
            document.querySelector('.summary-cost-shadow-two').style.display = 'block';
            document.querySelector('.buy-tip').style.display = 'block';
        });
        this.addHandler(closeTag,'click', function(event){
            var event = event || window.event;
            var target =event.target || event.srcElement;
            if(target.tagName == 'I'){
                document.querySelector('.summary-cost-shadow-two').style.display = 'none';
                document.querySelector('.buy-tip').style.display = 'none';
            }
        });
        this.addHandler(tipWord,'click', function(event){
           /* document.querySelector('.summary-cost-shadow-two').style.display = 'block';
            backMeal.style.display = 'block';*/
            jLayer('<div>每程不得退改签</div><div>每程不得退改签</div><div>每程不得退改签</div><div>每程不得退改签</div><div>每程不得退改签</div>','退改签说明',function(){})




        });

        if(goLineOuter){
            this.addHandler(goLineOuter,'click', function(event){
                document.querySelector('.summary-cost-shadow-two').style.display = 'block';
                document.querySelector('.ticket-detail-modal').style.display = 'block';
            });
        }
        this.addHandler(summaryCostShadowTwo,'click', function(event){
                this.style.display = 'none';
                document.querySelector('.ticket-detail-modal').style.display = 'none';

        });

        this.addHandler(detailTangle,'click', function(event){
            summaryCostModal.style.webkitTransition = "all 300ms";
            summaryCostModal.className=="summary-cost-modal summary-cost-modal-show"?hide():show();
            function hide(){
                summaryCostModal.className="summary-cost-modal summary-cost-modal-hide";
                summaryCostShadowOne.style.display='none';
                detailTangle.className="detail clearfixs detail-tangle opened"}

            function show(){
                summaryCostModal.className="summary-cost-modal summary-cost-modal-show";
                summaryCostShadowOne.style.display='block';
                detailTangle.className="detail clearfixs detail-tangle"
            }
        });

    },

    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var that=this,dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl?questUrl:that.requestUrl;
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },

    returnDate:function(arg){
        var argArray = /(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}/.exec(arg);
        var transferData = argArray[1]+'-'+argArray[2]+'-'+argArray[3];
        var index = new Date(transferData.replace(/-/g, "/")).getDay(),week='';
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
                return ''
        }
        array = arg.split('-');
        array[1] = array[1]<10?'0'+parseInt(array[1]):parseInt(array[1]);
        array[2] = array[2]<10?'0'+parseInt(array[2]):parseInt(array[2]);
        return '<span class="date">'+array[1]+'-'+array[2]+'</span>'+'<span class="order-week">'+week+'</span>';

    },
    addContent:function(arg){
        var orderTop = document.querySelector('.order-top');
        var detailOuter = document.querySelector('.detail-outer');
        var goLineOuterHtml = '',seatConditionHtml ='', detailOuterHtml='',costStr='',that = this;
        var cacheInfo = this.storageUtil.get('reverseInformationCache');
        console.log(cacheInfo.TotalFlightPrice*parseInt(cacheInfo.WapOrder.NumofAdult))

        if(arg.segmentsReturn){
            goLineOuterHtml+= '<div class="go-line-outer-sub">' + createTopGo(arg)+'<p class="go-line go-line-return-middle"><span class="trigger-button right-arrow"></span></p>'+createTopBack(arg)+'</div>';
            seatConditionHtml += createSeatCondition(arg);
            orderTop.innerHTML = goLineOuterHtml + seatConditionHtml;
        }else{
            goLineOuterHtml+= '<div class="go-line-outer-sub match">' + createTopGo(arg)+createTopBack(arg)+'</div>';
            seatConditionHtml += createSeatCondition(arg);
            orderTop.innerHTML = goLineOuterHtml + seatConditionHtml;
        }
        detailOuter.innerHTML = detailGo(arg) + detailBack(arg);
        function createTopGo(arg){
                var str = '',toCity = '';
               if(arg.segmentsReturn){
                   toCity = arg.segmentsLeave.length>1?arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameFrom:arg.segmentsLeave[0].airportNameTo;
                   str+='<p class="go-line  go-line-return">' +
                   '<i class="icon-go"></i>'+that.returnDate(arg.flightLeaveStartDate)+'</span><span class="fix-width">'+arg.segmentsLeave[0].airportNameFrom+'</span><span class="line-order">-</span><span class="order-city-end fix-width">'+toCity+'</span><i class="icon-clock"></i><span class="hour">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span>'+
                   '</p>';
               }else{
                   toCity = arg.segmentsLeave.length>1?arg.segmentsLeave[arg.segmentsLeave.length-1].airportNameFrom:arg.segmentsLeave[0].airportNameTo;
                   str+='<p class="go-line">' +
                   '<i class="icon-go"></i>'+that.returnDate(arg.flightLeaveStartDate)+'</span><span class="fix-width">'+arg.segmentsLeave[0].airportNameFrom+'</span><span class="line-order">-</span><span class="order-city-end fix-width">'+toCity+'</span><i class="icon-clock"></i><span class="hour">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span><span class="trigger-button right-arrow"></span>'+
                   '</p>';
               }

               return str;
        }


        function createTopBack(arg){
             var str ='',toCity ='';
             if(arg.segmentsReturn){
                toCity = arg.segmentsReturn.length>1?arg.segmentsReturn[arg.segmentsReturn.length-1].airportNameFrom:arg.segmentsReturn[0].airportNameTo;
                str+='<p class="go-line go-line-return">' +
                        '<i class="icon-go-return"></i>'+that.returnDate(arg.flightReturnStartDate)+'</span><span class="fix-width">'+arg.segmentsReturn[0].airportNameFrom+'</span><span class="line-order">-</span></span><span class="fix-width" style="margin-left: 0">'+toCity+'</span><i class="icon-clock"></i><span class="hour">'+parseInt(arg.segmentsReturnTotalTravelTime/60)+'h'+arg.segmentsReturnTotalTravelTime%60+'m</span>' +
                     '</p>'
            }
            return str;
        }

        function createSeatCondition(arg){
            var tipStr = arg.segmentsReturn!=null?'往返票价':'单程票价';
            var str ='';
             str +='<div class="seat-condition"><div class="left">' +
                   '<span>'+arg.segmentsLeave[0].cabinClassName+'</span><p><span>'+tipStr+'</span>&nbsp;￥<span>'+arg.totalFareAmountADT+'</span><span>&nbsp;税费</span>￥<span>'+arg.totalTaxAmountADT+'</span></p></div> <div class="right"> <p><span class="tag">￥<strong>'+arg.totalFareAmountExc+'</strong></span></p><p><span class="tip-word">退改签说明</span></p></div></div>';
            return str;

        }

        function detailGo(arg){
            var str = '';
            str += '<li class="detail-start">' +
            '<div class="top-line"><span class="icon-go"></span>'+that.returnDate(arg.flightLeaveStartDate)+'<span class="start">'+arg.cityNameFrom+'</span><span class="line">-</span><span class="end">'+arg.cityNameTo+'</span>' +
            '<span class="detail-hour">'+parseInt(arg.segmentsLeaveTotalTravelTime/60)+'h'+arg.segmentsLeaveTotalTravelTime%60+'m</span></div>'+createFlightUnit(arg.segmentsLeave)+'</div></li>';
            return str;

        }
        function detailBack(arg){
            var str = '';
            if(arg.segmentsReturn) {
                str += '<li class="detail-start">' +
                '<div class="top-line"><span class="icon-back"></span>' + that.returnDate(arg.flightReturnStartDate) + '<span class="start">' + arg.cityNameTo + '</span><span class="line">-</span><span class="end">' + arg.cityNameFrom + '</span>' +
                '<span class="detail-hour">' + parseInt(arg.segmentsReturnTotalTravelTime / 60) + 'h' + arg.segmentsReturnTotalTravelTime % 60 + 'm</span></div>' + createFlightUnit(arg.segmentsReturn) + '</div></li>';
            }
            return str;
        }
        function createFlightUnit(arg){
            if(arg){
                var str = '',transferStr='',dayStr='',that = ticketOrder;
                for(var j = 0;j<arg.length;j++){
                    transferStr= arg[j+1]!=undefined?'<div class="transit-city-hour">中转'+arg[j].cityNameTo+'</div>':'';
                    dayStr= Math.floor((new Date(arg[j].arriveDate.replace(/-/g, "/")) - new Date(arg[j].departDate.replace(/-/g, "/")))/1000/60/60/24)>=1?Math.floor((new Date(arg[j].arriveDate.replace(/-/g, "/")) - new Date(arg[j].departDate.replace(/-/g, "/")))/1000/60/60/24)+'天':'';
                    str+='<div class="go-trip start">' +
                    '<div class="time-airport-info">'+
                    '<div class="start-time-info">'+
                    '<span class="time-number">'+that.timeCut(arg[j].departDate)+'</span>'+
                    '<span class="air-port-word">'+arg[j].airportNameFrom+'</span>'+
                    '</div>'+
                    '<div class="total-time-info">'+
                    '<span class="time-hour-minute"></span>'+
                    '<span class="arrow-time"></span>'+
                    '</div>'+
                    '<div class="end-time-info">'+
                    '<span class="tip-add-days-seat">'+dayStr+'</span>'+
                    '<span class="time-number">'+that.timeCut(arg[j].arriveDate)+'</span>'+
                    '<span class="air-port-word-right">'+arg[j].airportNameTo+'</span>'+
                    '</div>'+
                    '</div>'+
                    '<div class="bottom-word">'+
                    '<span>'+arg[j].airCorpName+'</span>'+
                    '<span>|</span>'+
                    '<span>'+arg[j].flightNo+'</span>'+
                    '<span>|</span>'+
                    '<span>'+arg[j].planeName+'</span>'+
                    '</div>'+
                    '</div>'+transferStr;
                }
            }
            return str;
        }
    },
   costFinaList:function(){
       var that = this, costTotal = document.querySelector('.second-line'),temObj = {},totalCost = document.querySelector('.total-price-number strong');
       var costStr = '',curFlightListData = this.storageUtil.get('curFlightListData'),reverseInformationCache = this.storageUtil.get('reverseInformationCache') ;
       var totalPerson = document.querySelector('.total-person-price');
       temObj.totalFareAmountADT = curFlightListData.totalFareAmountADT;
       temObj.totalFareAmountCHD = curFlightListData.totalFareAmountCHD;
       temObj.totalFareAmountExc = curFlightListData.totalFareAmountExc;
       temObj.totalTaxAmountADT = curFlightListData.totalTaxAmountADT;
       temObj.totalTaxAmountCHD = curFlightListData.totalTaxAmountCHD;
       temObj.NumofAdult = parseInt(reverseInformationCache.WapOrder.NumofAdult);
       temObj.NumofChild = parseInt(reverseInformationCache.WapOrder.NumofChild);
       this.costFinaListData = temObj;
       costStr+= '<p>成人票<span>￥<span>'+temObj.totalFareAmountADT+'</span> x'+temObj.NumofAdult+' 人</span></p>';
       costStr+= '<p>税费<span>￥<span>'+temObj.totalTaxAmountADT+'</span> x'+temObj.NumofAdult+' 人</span></p>';
       costStr+= temObj.NumofChild!=0?'<p>儿童票<span>￥<span>'+temObj.totalFareAmountCHD+'</span> x'+temObj.NumofChild+' 人</span></p>':'';
       costStr+= temObj.NumofChild!=0?'<p>税费<span>￥<span>'+temObj.totalTaxAmountCHD+'</span> x'+temObj.NumofChild+' 人</span></p>':'';
       costTotal.innerHTML = costStr;
       totalCost.innerHTML = temObj.totalFareAmountExc*temObj.NumofAdult + (temObj.totalFareAmountCHD + temObj.totalTaxAmountCHD)*temObj.NumofChild
       totalPerson.innerHTML = temObj.NumofAdult+temObj.NumofChild+'人总价';
       console.log(this.costFinaListData)
       console.log( totalCost.innerHTML)
   },

    init:function(){
        console.log(this.storageUtil.get('reverseInformationCache'));
        /*var reverseInformationCache = {
            WapOrder:{},
            TravellerInfo: [
                {PassengerType: "ADULT",
                    SexCode: "Mr",
                    FirstName: "sss",
                    LastName: "ddd",
                    DateOfBirth: "1900-12-24",
                    FlightCertificateInfo: {
                        IdType: "4",
                        IdCountry: "SIN",
                        NationalityCode: "123",
                        IdNumber: "3412",
                        IdActivatedDate: "2016-12-31"
                    },
                    AirCorpCode: "MF",
                    FlightNo: "757"
                }
            ],
            ContactDetail:{
                SexCode: "Mr",
                FirstName: "dddd",
                LastName: "ssss",
                Email: "855@asiatravel.com",
                Email2: "",
                ContactNumber: "5689",
                MobilePhone: "",
                FaxNumber: "",
                DestContactNumber: "12356",
                Address: "kkkk",
                PostalCode: "123456",
                City: "SIN",
                CountryCode: "SG"
            },
            CurrencyCode: "",
            TotalFlightPrice: ""
        };*/

        this.telSlider()
        this.orderFlightData = this.storageUtil.get('curFlightListData');
        this.addContent(this.orderFlightData);
        console.log(this.storageUtil.get('curFlightListData'))
        this.addEvent();
        this.costFinaList();
    }
};

ticketOrder.init();