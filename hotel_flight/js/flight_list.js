/**
 * Created by Venson on 2016/4/18.
 */
var changeFlightInfo;
var flight_list = {
    requestUrl:"http://10.6.11.28:1337/api/GetServiceApiResult",
    getById:function(obj){
        return document.getElementById(obj);
    },
    getByClass:function(obj){
        return document.getElementsByClassName(obj);
    },
    getWeekDay:function(date){
        var final_date = date.substr(0,10).replace(/-/g,'/');
        var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
        return week;
    },
    //      页面加载机票数据
    getTicketList:function(){
        var that = this;
        var sendData = changeFlightInfo.data;
        $('#departData').html(sendData.DepartDate.substr(5,5));
        $('#returnData').html(sendData.ReturnDate.substr(5,5));
        $('#departWeek').html(that.getWeekDay(sendData.DepartDate));
        $('#returnWeek').html(that.getWeekDay(sendData.ReturnDate));
        var tpl1 = [
            '{% for(var i=0;i < flightInfoListGroup.length;i++){ %}',
            '{% if(flightInfoListGroup[i].additionalPrice!=0){ %}',
            '<div class="price-up">以下航班需加<span>￥{%=flightInfoListGroup[i].additionalPrice%}</span></div>',
            '{% } %}',
            '<ul class="js-air-list air-tickets-detail air-tickets-detail-wrapper">',
            '{% for(var j=0;j < flightInfoListGroup[i].flightInfoList.length;j++){ %}',
            '<li class="js-air-item air-tickets-detail seat-detail" data-setID="{%=flightInfoListGroup[i].flightInfoList[j].setID%}" data-cacheID="{%=flightInfoListGroup[i].flightInfoList[j].cacheID%}">',
            '<div class="time-airport">',
            '<div class="go">',
            '<div class="go-info">',
            '<div class="start-time-info start-time-info-double">',
            '<span class="start-icon"></span>',
            '<span class="time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveStartDate.substr(11,5)%}</span>',
            '<span class="air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[flightInfoListGroup[i].flightInfoList[j].segmentsLeave.length-1].airportNameFrom%}</span>',
            '</div>',
            '<div class="total-time-info">',
            '<span class="time-hour-minute">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeaveTotalTravelTimeString%}</span>',
            '<span class="arrow-time"></span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].directFlight==1){ %}',
            '<span class="air-port-word">转***</span>',
            '{% } %}',
            '</div>',
            '<div class="end-time-info">',
            '<span class="time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveEndDate.substr(11,5)%}</span>',
            '<span class="air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[flightInfoListGroup[i].flightInfoList[j].segmentsLeave.length-1].airportNameTo%}</span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].flightLeaveSpacingDay !=0){ %}',
            '<span class="tip-add-days">+{%=flightInfoListGroup[i].flightInfoList[j].flightLeaveSpacingDay%}天</span>',
            '{% } %}',
            '</div>',
            '</div>',
            '<p class="small-info-double ">{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].OperatingCarrierName%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsLeave[0].planeName%}<span>&nbsp;|&nbsp;</span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].isLeaveShareFlight){ %}',
            '商务舱 | <span class="green-tip">共享</span>',
            '{% }else{ %}',
            '商务舱',
            '{% } %}',
            '</p>',
            '</div>',
            '<div class="go">',
            '<div class="go-info">',
            '<div class="start-time-info start-time-info-double">',
            '<span class="end-icon"></span>',
            '<span class="time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightReturnStartDate.substr(11,5)%}</span>',
            '<span class="air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].airportNameFrom%}</span>',
            '</div>',
            '<div class="total-time-info">',
            '<span class="time-hour-minute">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturnTotalTravelTimeString%}</span>',
            '<span class="arrow-time"></span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].directFlight==1){ %}',
            '<span class="air-port-word">转***</span>',
            '{% } %}',
            '</div>',
            '<div class="end-time-info">',
            '{% if(flightInfoListGroup[i].flightInfoList[j].flightReturnSpacingDay !=0){ %}',
            '<span class="tip-add-days">+{%=flightInfoListGroup[i].flightInfoList[j].flightReturnSpacingDay%}天</span>',
            '{% } %}',
            '<span class="time-number">{%=flightInfoListGroup[i].flightInfoList[j].flightReturnEndDate.substr(11,5)%}</span>',
            '<span class="air-port-word">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[flightInfoListGroup[i].flightInfoList[j].segmentsReturn.length-1].airportNameTo%}</span>',
            '</div>',
            '</div>',
            '<p class="small-info-double ">{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].OperatingCarrierName%}{%=flightInfoListGroup[i].flightInfoList[j].segmentsReturn[0].planeName%}<span>&nbsp;|&nbsp;</span>',
            '{% if(flightInfoListGroup[i].flightInfoList[j].isReturnShareFlight){ %}',
            '商务舱 | <span class="green-tip">共享</span>',
            '{% }else{ %}',
            '商务舱',
            '{% } %}',
            '</p>',
            '</div>',
            '</div>',
            '<b class="hf-icon hf-gou"></b>',
            '</li>',
            '{% } %}',
            '</ul>',
            '{% } %}'
        ].join('');
        var ticketList_callback = function(ret){
            console.log(sendData);
            var json = ret;
            var data = json.data;
            if(json.success){
                console.log(json);
                $('.set-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameFrom);
                $('.to-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameTo);
                var html_c = template(tpl1,data);
                $('#content').html(html_c);
                $('.js-air-list > .js-air-item').click(flight_list.nextPage);
            }else{
                jAlert(json.message,"提示");
            }
        };
        this.tAjax("",sendData,"50100002","3",ticketList_callback);

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
    //  排序or筛选开始
    createTags:function(callback){
        var fn = this.fn;
        var backShadow = document.createElement('div');
        backShadow.className = 'r-shadow';
        backShadow.id = 'r-shadow';
        var oDiv = document.createElement('div');
        oDiv.className = "filter-wrap";

        var baseTitle =  document.createElement('div');
        baseTitle.className = "hl-bottom";

        var rightModal =  document.createElement('div');
        rightModal.className = "reset-action";
        rightModal.id = "filter-modal";

        var middleModal =  document.createElement('ul');
        middleModal.id = "time-modal";

        //var leftModal =  document.createElement('ul');
        //rightModal.id = "price-modal";
        //var leftModal =  document.createElement('div');
        //leftModal.className = "reset-action";
        //leftModal.id = "filter-modal";
        //
        //var middleModal =  document.createElement('ul');
        //middleModal.id = "time-modal";
        //
        //var rightModal =  document.createElement('ul');
        //rightModal.id = "price-modal";

        baseTitle.innerHTML = '<div class="fo-div" id="fo_aw"><b class="hf-icon ic-aw"></b><i class="red-tip"></i>' +
            '<span class="filter-select">航空公司</span>'+
            '</div>'+
            '<div class="fo-div" id="fo_ra"><b class="jd-icon s-rank"></b><i class="red-tip"></i>' +
            '<span class="filter-select">快速排序</span>'+
            '</div>'+
            '<div class="fo-div" id="fo_scr"><b class="hl-icon3 filter"></b><i class=""></i>' +
            '<span class="filter-select">筛选</span>'+   // /*点击价格弹出框（含税与不含税，前端计算）/
            '</div>';
        rightModal.innerHTML = '    <div class="reset-action-wrap">'+
            '<div class="reset-action-item hot">取消</div>'+
            '<div class="reset-action-item">清空筛选</div>'+
            '<div class="reset-action-item">确定</div>'+
            '</div>'+
            '<div class="reaction-detail" id="reaction-detail">'+
            '<ul class="filter-bottom" id="filter-bottom">'+
            '<li class="filter-title clear-background" data-info="df">直飞</li>'+
            '<li class="filter-title" data-info="sh">共享</li>'+
            '<li class="filter-title" data-info="se">舱位</li>'+
            '</ul>'+
            '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
            '<ul class="add only-direct-fly" id="only-direct-fly">'+
            '<li class="tag-item active" data-i="false">不限<b></b></li>'+
            '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
            '</ul>'+
            '<ul class="add filter-share" id="filter-share" style="display: none">'+
            '<li class="tag-item active" data-i="false">不限<b></b></li>'+
            '<li class="tag-item" data-i="true">隐藏共享<b class=""></b></li>'+
            '</ul>'+
            '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
            '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
            '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
            '<li class="tag-item" data-i="Business">商务舱<b class=""></b></li>'+
            '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
            '</ul>'+
            '</div>'+
            '</div>';
        middleModal.innerHTML =
            '<li class="time-modal-item active" data-i="0"><b></b>不限</li>'+
            '<li class="time-modal-item" data-i="1"><b></b>价格从低到高</li>'+
            '<li class="time-modal-item" data-i="2"><b></b>价格从高到低</li>'+
            '<li class="time-modal-item" data-i="3"><b></b>出发时间从早到晚</li>'+
            '<li class="time-modal-item" data-i="4"><b></b>出发时间从晚到早</li>'+
            '<li class="time-modal-item" data-i="5"><b></b>直飞优先</li>'+
            '<li class="time-modal-item" data-i="6"><b></b>耗时最短</li>';
        //rightModal.innerHTML =''
        //if(tripType =='domestic'){   //国内
        //    baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i>' +
        //        '<span class="filter-select">筛选</span>'+
        //        '</div>'+
        //        '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class="red-tip"></i>' +
        //        '<span class="filter-select">优选</span>'+
        //        '</div>'+
        //        '<div class="fo-div" id="fo_lo" data-price-type="domestic"><b class="hl-icon3 filter-price"></b><i class=""></i><span'+
        //        ' class="filter-select">价格</span>'+   // /*点击价格弹出框（含税与不含税，前端计算）/
        //        '</div>';
        //    leftModal.innerHTML = '    <div class="reset-action-wrap">'+
        //        '<div class="reset-action-item hot">取消</div>'+
        //        '<div class="reset-action-item">清空筛选</div>'+
        //        '<div class="reset-action-item">确定</div>'+
        //        '</div>'+
        //        '<div class="reaction-detail" id="reaction-detail">'+
        //        '<ul class="filter-bottom" id="filter-bottom">'+
        //        '<li class="filter-title clear-background" data-info="df">直飞</li>'+
        //        '<li class="filter-title" data-info="sh">共享</li>'+
        //        '<li class="filter-title" data-info="se">舱位</li>'+
        //        '</ul>'+
        //        '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
        //        '<ul class="add only-direct-fly" id="only-direct-fly">'+
        //        '<li class="tag-item active" data-i="false">不限<b></b></li>'+
        //        '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
        //        '</ul>'+
        //        '<ul class="add filter-share" id="filter-share" style="display: none">'+
        //        '<li class="tag-item active" data-i="false">不限<b></b></li>'+
        //        '<li class="tag-item" data-i="true">隐藏共享<b class=""></b></li>'+
        //        '</ul>'+
        //        '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
        //        '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="Business">商务舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
        //        '</ul>'+
        //        '</div>'+
        //        '</div>';
        //    middleModal.innerHTML =
        //        '<li class="time-modal-item active" data-i="0"><b></b>不限</li>'+
        //        '<li class="time-modal-item" data-i="1"><b></b>直飞优先</li>'+
        //        '<li class="time-modal-item" data-i="2"><b></b>低价优先</li>'+
        //        '<li class="time-modal-item" data-i="3"><b></b>耗时短优先</li>'
        //        rightModal.innerHTML =''
        //}else{  //国际
        //    baseTitle.innerHTML = '<div class="fo-div" id="fo_sc"><b class="hl-icon3 filter"></b><i class=""></i><span'+
        //        ' class="filter-select">筛选</span>'+
        //        '</div>'+
        //        '<div class="fo-div" id="fo_ra"><b class="hl-icon3 direct-fly"></b><i class="red-tip"></i><span'+
        //        ' class="filter-select">优选</span>'+
        //        '</div>'+
        //        '<div class="fo-div" id="fo_lo" data-info="openShadow"><b class="hl-icon3 filter-price"></b><i class="red-tip"></i><span'+
        //        ' class="filter-select">含税价</span>'+  /*点击价格有弹出框，包含含税与不含税*/'</div>';
        //    leftModal.innerHTML = '    <div class="reset-action-wrap">'+
        //        '<div class="reset-action-item hot">取消</div>'+
        //        '<div class="reset-action-item">清空筛选</div>'+
        //        '<div class="reset-action-item">确定</div>'+
        //        '</div>'+
        //        '<div class="reaction-detail" id="reaction-detail">'+
        //        '<ul class="filter-bottom" id="filter-bottom">'+
        //        '<li class="filter-title clear-background" data-info="df">直飞</li>'+
        //        '<li class="filter-title" data-info="sh">共享</li>'+
        //        '<li class="filter-title" data-info="se">舱位</li>'+
        //        '</ul>'+
        //        '<div class="detail-list" style="color: rgb(102, 102, 102);">'+
        //        '<ul class="add only-direct-fly" id="only-direct-fly">'+
        //        '<li class="tag-item active" data-i="false">不限<b></b></li>'+
        //        '<li class="tag-item" data-i="true">仅看直飞<b class=""></b></li>'+
        //        '</ul>'+
        //        '<ul class="add filter-share" id="filter-share" style="display: none">'+
        //        '<li class="tag-item active" data-i="false">不限<b></b></li>'+
        //        '<li class="tag-item" data-i="true">隐藏共享<b class=""></b></li>'+
        //        '</ul>'+
        //        '<ul class="add seat-condition" id="seat-condition" style="display: none">'+
        //        '<li class="tag-item active" data-i="Economy">经济舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="EconomyPremium">超级经济舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="Business">商务舱<b class=""></b></li>'+
        //        '<li class="tag-item" data-i="First">头等舱<b class=""></b></li>'+
        //        '</ul>'+
        //        '</div>'+
        //        '</div>';
        //    middleModal.innerHTML =
        //        '<li class="time-modal-item active" data-i="0"><b></b>不限</li>'+
        //        '<li class="time-modal-item" data-i="1"><b></b>直飞优先</li>'+
        //        '<li class="time-modal-item" data-i="2"><b></b>低价优先</li>'+
        //        '<li class="time-modal-item" data-i="3"><b></b>耗时短优先</li>'
        //    rightModal.innerHTML =""
        //}
        oDiv.appendChild(baseTitle);
        oDiv.appendChild(middleModal);
        oDiv.appendChild(rightModal);
        document.body.appendChild(backShadow);
        document.body.appendChild(oDiv);
        return this;
    },






    addEvent:function(){
        var titleWrap = document.querySelector('.hl-bottom'), that = this;
        var shadowEle = document.querySelector('#r-shadow');
        titleWrap.onclick = function(event){
            var event = event || window.event;
            var target =target||event.srcElement, lineEle;
            var rightModalHandle =function(){
                var rightModal = document.querySelector('#filter-modal');
                rightModal.style.transition = 'all 300ms ease-in';
                rightModal.style.webkitTransition = 'all 300ms linear';
                rightModal.style.bottom = 0;
            };
            //var leftModalHandle =function(){
            //    var leftModal = document.querySelector('#filter-modal');
            //    leftModal.style.transition = 'all 300ms ease-in';
            //    leftModal.style.webkitTransition = 'all 300ms linear';
            //    leftModal.style.bottom = 0;
            //};
            var  middleModalHandle =function (arg) {
                shadowEle.style.display = 'block';
                var middleModal4 = document.querySelector('#time-modal');
                var middleCock4 = document.querySelector('#fo_ra');
                middleModal4.style.transition = 'all 300ms ease-in';
                middleModal4.style.webkitTransition = 'all 300ms linear';
                middleModal4.style.bottom = 0;
                middleModal4.onclick = function () {
                    var event = event || window.event;
                    var target = target || event.srcElement, lineEle;
                    //var SP = middleCock4.querySelector('SPAN');
                    //var iO = middleCock4.querySelector('i');
                    if (target.tagName == 'LI') {
                        var twoEles4 = target.parentNode.querySelectorAll('li');
                        for (var s = 0; s < twoEles4.length; s++) {
                            twoEles4[s].className = 'tag-item';
                        }
                        //if(target.innerText=='不限'){
                        //    SP.innerHTML = '优选';
                        //}else{SP.innerHTML = target.innerText; }
                        target.className = 'tag-item active';
                    }
                    that.stateEvent('get');
                    that.fn(that.tempStates);
                    //that.checkRedTip();
                    this.style.transition = 'all 300ms ease-in';
                    this.style.webkitTransition = 'all 300ms linear';
                    this.style.bottom = "-126%";
                    shadowEle.style.display = 'none';
                }
            };


            //    if(that.sinOrDou=="Oneway"&&that.tripType == "domestic"){
            //        var rightCock = titleWrap.querySelector('#fo_lo');
            //        var iEle = rightCock.querySelector('i');
            //        var spEle = rightCock.querySelector('SPAN');
            //        spEle.innerHTML ='价格';
            //        iEle.className ='';
            //        that.tempStates.PriorityRule = '0';
            //        if(arg.querySelector('.filter-select').innerHTML=='起飞早到晚'){
            //            arg.querySelector('.filter-select').innerHTML='起飞晚到早';
            //            that.tempStates.IsDesc = true;
            //        }else{
            //            arg.querySelector('.filter-select').innerHTML='起飞早到晚';
            //            that.tempStates.IsDesc = false;
            //        }
            //        that.fn(that.tempStates);
            //        that.checkRedTip();
            //
            //    }else if(that.sinOrDou=="Oneway"&&that.tripType == "international"){
            //        shadowEle.style.display='block';
            //        var middleModal = document.querySelector('#time-modal');
            //        var middleCock = document.querySelector('#fo_ra');
            //        middleModal.style.transition = 'all 300ms ease-in';
            //        middleModal.style.webkitTransition = 'all 300ms linear';
            //        middleModal.style.bottom = 0;
            //        middleModal.onclick = function(){
            //            var event = event || window.event;
            //            var target =target||event.srcElement, lineEle;
            //            var SP = middleCock.querySelector('SPAN');
            //            var iO = middleCock.querySelector('i');
            //            if(target.tagName == 'LI'){
            //                var twoEles = target.parentNode.querySelectorAll('li');
            //                for(var s = 0;s < twoEles.length;s++){
            //                    twoEles[s].className = 'tag-item';
            //                }
            //                if(target.innerText=='不限'){
            //                    SP.innerHTML = '优选';
            //                }else{SP.innerHTML = target.innerText; }
            //                target.className = 'tag-item active';
            //            }
            //            that.stateEvent('get');
            //            that.fn(that.tempStates);
            //            that.checkRedTip();
            //            this.style.transition = 'all 300ms ease-in';
            //            this.style.webkitTransition = 'all 300ms linear';
            //            this.style.bottom = "-126%";
            //            shadowEle.style.display='none';
            //        }
            //
            //    } else if(that.sinOrDou=="Return"&&that.tripType == "domestic"){
            //        shadowEle.style.display='block';
            //        var middleModal = document.querySelector('#time-modal');
            //        var middleCock = document.querySelector('#fo_ra');
            //        var rightCock2 = titleWrap.querySelector('#fo_lo');
            //        var iEle = rightCock2.querySelector('i');
            //        var spEle = rightCock2.querySelector('SPAN');
            //        spEle.innerHTML ='价格';
            //        iEle.className ='';
            //        arg.querySelector('i').className='red-tip';
            //        that.tempStates.PriorityRule = '0';
            //        middleModal.style.transition = 'all 300ms ease-in';
            //        middleModal.style.webkitTransition = 'all 300ms linear';
            //        middleModal.style.bottom = 0;
            //        middleModal.onclick = function(){
            //            var event = event || window.event;
            //            var target =target||event.srcElement, lineEle;
            //            var SP = middleCock.querySelector('SPAN');
            //            var iO = middleCock.querySelector('i');
            //            if(target.tagName == 'LI'){
            //                var twoEles = target.parentNode.querySelectorAll('li');
            //                for(var s = 0;s < twoEles.length;s++){
            //                    twoEles[s].className = 'tag-item';
            //                }
            //                if(target.innerText=='不限'){
            //                    SP.innerHTML = '优选';
            //                }else{SP.innerHTML = target.innerText; }
            //                target.className = 'tag-item active';
            //            }
            //            that.stateEvent('get');
            //            that.fn(that.tempStates);
            //            that.checkRedTip();
            //            this.style.transition = 'all 300ms ease-in';
            //            this.style.webkitTransition = 'all 300ms linear';
            //            this.style.bottom = "-126%";
            //            shadowEle.style.display='none';
            //        }
            //    }else if(that.sinOrDou=="Return"&&that.tripType == "international"){
            //        shadowEle.style.display='block';
            //        var middleModal4 = document.querySelector('#time-modal');
            //        var middleCock4 = document.querySelector('#fo_ra');
            //        middleModal4.style.transition = 'all 300ms ease-in';
            //        middleModal4.style.webkitTransition = 'all 300ms linear';
            //        middleModal4.style.bottom = 0;
            //        middleModal4.onclick = function(){
            //            var event = event || window.event;
            //            var target =target||event.srcElement, lineEle;
            //            var SP = middleCock4.querySelector('SPAN');
            //            var iO = middleCock4.querySelector('i');
            //            if(target.tagName == 'LI'){
            //                var twoEles4 = target.parentNode.querySelectorAll('li');
            //                for(var s = 0;s < twoEles4.length;s++){
            //                    twoEles4[s].className = 'tag-item';
            //                }
            //                if(target.innerText=='不限'){
            //                    SP.innerHTML = '优选';
            //                }else{SP.innerHTML = target.innerText; }
            //                target.className = 'tag-item active';
            //            }
            //            that.stateEvent('get');
            //            that.fn(that.tempStates);
            //            that.checkRedTip();
            //            this.style.transition = 'all 300ms ease-in';
            //            this.style.webkitTransition = 'all 300ms linear';
            //            this.style.bottom = "-126%";
            //            shadowEle.style.display='none';
            //        }
            //    }
            //};
            //var  rightModalHandle = function(arg){
            //    if(that.sinOrDou=="Oneway"&&that.tripType == "domestic"){
            //        var middleCock = titleWrap.querySelector('#fo_ra');
            //        var iEle = middleCock.querySelector('i');
            //        var spEle = middleCock.querySelector('SPAN');
            //        spEle.innerHTML ='时间';
            //        iEle.className ='';
            //        that.tempStates.IsDesc = false;
            //        arg.querySelector('.filter-select').innerHTML='从低到高';
            //        that.tempStates.PriorityRule = '2';
            //
            //        that.fn(that.tempStates);
            //        that.checkRedTip();
            //
            //    }else if(that.sinOrDou=="Return"&&that.tripType == "domestic"){
            //        var middleCock2 = titleWrap.querySelector('#fo_ra');
            //        var iEle7 = middleCock2.querySelector('i');
            //        var spEle7 = middleCock2.querySelector('SPAN');
            //        spEle7.innerHTML ='优选';
            //        iEle7.className ='';
            //        that.tempStates.PriorityRule = '0';
            //
            //        arg.querySelector('.filter-select').innerHTML='从低到高';
            //        that.tempStates.PriorityRule = '2';
            //        that.stateEvent('set');
            //        that.fn(that.tempStates);
            //        that.checkRedTip();
            //    }else if(that.sinOrDou=="Oneway"&&that.tripType == "international"){
            //        var rightCock2 = titleWrap.querySelector('#fo_lo');
            //        var iEle2 = rightCock2.querySelector('i');
            //        var spEle2 = rightCock2.querySelector('SPAN');
            //        if(spEle2.innerHTML=='含税价'){
            //            spEle2.innerHTML='不含税价';
            //            that.tempStates.hasTax = "false"
            //        }else{
            //            spEle2.innerHTML='含税价';
            //            that.tempStates.hasTax = "true"
            //        }
            //        that.stateEvent('set');
            //        that.fn_(that.tempStates);
            //        that.checkRedTip();
            //    }else if(that.sinOrDou=="Return"&&that.tripType == "international"){
            //        var rightCock5 = titleWrap.querySelector('#fo_lo');
            //        var iEle5 = rightCock5.querySelector('i');
            //        var spEle5 = rightCock5.querySelector('SPAN');
            //        if(spEle5.innerHTML=='含税价'){
            //            spEle5.innerHTML='不含税价';
            //            that.tempStates.hasTax = "false"
            //        }else{
            //            spEle5.innerHTML='含税价';
            //            that.tempStates.hasTax = "true"
            //        }
            //        that.stateEvent('set');
            //        that.fn_(that.tempStates);
            //        that.checkRedTip();
            //    }
            //};
            if(target.tagName == 'B'||target.tagName == 'SPAN'){
                lineEle = target.parentNode;
            }else if(target.className == 'fo-div'){
                lineEle = target;
            }
            switch (lineEle.id){
                case 'fo_aw':
                    window.location.href = 'airway-list.html';
                    //rightModalHandle(lineEle);
                    //break;
                case 'fo_ra':
                    middleModalHandle(lineEle);
                    break;
                case 'fo_scr':
                    shadowEle.style.display = 'block';
                    rightModalHandle();
                    break;
                default :
                    void(0);
            };

            var moreOptions = document.querySelector('.reset-action-wrap'), leftWrap = document.querySelector('#filter-modal');
            moreOptions.onclick = function(event){
                var event = event || window.event;
                var target =target||event.srcElement, lineEle;
                if(target.className.indexOf('reset-action-item')>-1){
                    var threeEle = target.parentNode.querySelectorAll('.reset-action-item');
                    for(var m = 0;m < threeEle.length;m++){
                        threeEle[m].className = 'reset-action-item';
                    }
                    target.className = 'reset-action-item hot';
                    var  cancelFunction = function(){
                        that.stateEvent('set');
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                        //shadowBox.style.display = 'none';
                    }
                    var resetFunction=function(){
                        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
                        var filterShareLis = document.querySelectorAll('.filter-share li');
                        var setTimeDurationLis = document.querySelectorAll('.set-time-duration li');
                        var seatConditionLis = document.querySelectorAll('.seat-condition li');
                        for (var i = 0; i < directFlyLis.length; i++) {
                            directFlyLis[i].className = (i == 0)?"tag-item active" :"tag-item";
                        }

                        for (var j = 0; j < filterShareLis.length; j++) {
                            filterShareLis[j].className = (j == 0)?"tag-item active" :"tag-item";
                        }

                        for (var n = 0; n < setTimeDurationLis.length; n++) {
                            setTimeDurationLis[n].className = (n == 0)?"tag-item active" :"tag-item";
                        }

                        for (var l = 0; l < seatConditionLis.length; l++) {
                            seatConditionLis[l].className =(l == 0)?"tag-item active" :"tag-item";
                        }
                    };
                    var confirmFunction=function(){
                        that.stateEvent('get');
                        that.fn(that.tempStates);
                        //that.checkRedTip();
                        leftWrap.style.transition = 'all 300ms ease-in';
                        leftWrap.style.webkitTransition = 'all 300ms linear';
                        leftWrap.style.bottom = '-126%';
                    };

                    switch (target.innerHTML){
                        case "取消" :
                            cancelFunction();
                            shadowEle.style.display = 'none';
                            break;
                        case "清空筛选" :
                            resetFunction();
                            break;
                        case "确定" :
                            confirmFunction();
                            shadowEle.style.display = 'none';
                            break;
                        default :void(0);
                    }
                };
            };
            //左边弹出框的相应
            var reactionDetail = document.querySelector('#reaction-detail');
            reactionDetail.onclick = function(event){
                var event = event || window.event;
                var target =target||event.srcElement, lineEle;
                if(target.className.indexOf('filter-title')>-1){
                    var allLeLi = target.parentNode.querySelectorAll('li'),operRation;
                    for(var i = 0; i< allLeLi.length; i++){
                        allLeLi[i].className = allLeLi[i]==target?"filter-title clear-background":"filter-title"
                    }
                    var tipLetter = target.getAttribute('data-info'), that =this,allUl = this.querySelectorAll('.add');
                    switch (tipLetter){
                        case 'df':
                            operRation = document.querySelector('#only-direct-fly');
                            break;
                        case 'sh':
                            operRation = document.querySelector('#filter-share');
                            break;
                        case 'du':
                            operRation = document.querySelector('#set-time-duration');
                            break;
                        case 'se':
                            operRation = document.querySelector('#seat-condition');
                            break;
                        default :
                            void(0);
                    };
                    for(var j = 0;j < allUl.length;j++){
                        allUl[j].style.display = 'none';
                    }
                    operRation.style.display = 'block';
                }else if(target.className.indexOf('tag-item')>-1){
                    var allLi =  target.parentNode.querySelectorAll('li');
                    for(var n = 0; n< allLi.length; n++){
                        allLi[n].className = allLi[n]==target?"tag-item active":"tag-item"}
                }
            };
            shadowEle.onclick = function(event) {
                var event = event || window.event;
                var target = target || event.srcElement, lineEle, that=flight_list;
                var leftModal = document.querySelector('#filter-modal');
                var timeModal = document.querySelector('#time-modal');
                //var priceModal = document.querySelector('#price-modal');
                if (target.className.indexOf('r-shadow') > -1) {
                    leftModal.style.transition = 'all 300ms ease-in';
                    leftModal.style.webkitTransition = 'all 300ms linear';
                    leftModal.style.bottom = '-126%';
                    //priceModal.style.transition = 'all 300ms ease-in';
                    //priceModal.style.webkitTransition = 'all 300ms linear';
                    //priceModal.style.bottom = '-126%';
                    this.style.display = 'none';
                    timeModal.style.transition = 'all 300ms ease-in';
                    timeModal.style.webkitTransition = 'all 300ms linear';
                    timeModal.style.bottom = '-126%';
                }
            }
        };
        return this;
    },
    stateEvent:function(type){
        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
        var filterShareLis = document.querySelectorAll('.filter-share li');
        var seatConditionLis = document.querySelectorAll('#seat-condition li');
        var timeMiddleLis = document.querySelectorAll('#time-modal li');
        //var priceModalEle = document.querySelector('#fo_lo');
        for (var i = 0; i < directFlyLis.length; i++) {
            if(type=="set"){
                //directFlyLis[i].className = directFlyLis[i].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
            }else if(type =='get'){
                if(directFlyLis[i].className == "tag-item active"){
                    //this.tempStates.IsDirectFlight = directFlyLis[i].getAttribute('data-i');
                    break;
                }
            }
        }
        for (var j = 0; j < filterShareLis.length; j++) {
            if(type=="set"){
                //filterShareLis[j].className = filterShareLis[j].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
            }else if(type =='get'){
                if(filterShareLis[j].className == "tag-item active"){
                    //this.tempStates.IsHideSharedFlight =filterShareLis[j].getAttribute('data-i');
                    break;
                }
            }  }

        for (var x = 0; x < seatConditionLis.length; x++) {
            if(type=="set"){
                //seatConditionLis[x].className = seatConditionLis[x].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
            }else if(type =='get'){
                if(seatConditionLis[x].className == "tag-item active"){
                    //this.tempStates.CabinClass = seatConditionLis[x].getAttribute('data-i');
                    break;
                }
            } }

        for(var m = 0; m < timeMiddleLis.length; m++) {
            if(type=="set"){
                //timeMiddleLis[m].className = timeMiddleLis[m].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
            }else if(type =='get'){
                if(timeMiddleLis[m].className == "tag-item active"){
                    //this.tempStates.PriorityRule =timeMiddleLis[m].getAttribute('data-i');
                    break;
                }
            }
        }
        //(this.tempStates.PriorityRule == '2') ? priceModalEle.querySelector('.filter-select').innerHTML = '从低到高' : priceModalEle.querySelector('.filter-select').innerHTML = '价格';


        //if(this.tripType=="domestic"){
        //    if(this.sinOrDou == "Return") {  //国内往返
        //        var directFlyLis = document.querySelectorAll('.only-direct-fly li');
        //        var filterShareLis = document.querySelectorAll('.filter-share li');
        //        var seatConditionLis = document.querySelectorAll('#seat-condition li');
        //        var timeMiddleLis = document.querySelectorAll('#time-modal li');
        //        var priceModalEle = document.querySelector('#fo_lo');
        //        for (var i = 0; i < directFlyLis.length; i++) {
        //            if(type=="set"){
        //                directFlyLis[i].className = directFlyLis[i].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(directFlyLis[i].className == "tag-item active"){
        //                    this.tempStates.IsDirectFlight = directFlyLis[i].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //        for (var j = 0; j < filterShareLis.length; j++) {
        //            if(type=="set"){
        //                filterShareLis[j].className = filterShareLis[j].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(filterShareLis[j].className == "tag-item active"){
        //                    this.tempStates.IsHideSharedFlight =filterShareLis[j].getAttribute('data-i');
        //                    break;
        //                }
        //            }  }
        //
        //        for (var x = 0; x < seatConditionLis.length; x++) {
        //            if(type=="set"){
        //                seatConditionLis[x].className = seatConditionLis[x].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(seatConditionLis[x].className == "tag-item active"){
        //                    this.tempStates.CabinClass = seatConditionLis[x].getAttribute('data-i');
        //                    break;
        //                }
        //            } }
        //
        //        for(var m = 0; m < timeMiddleLis.length; m++) {
        //            if(type=="set"){
        //                timeMiddleLis[m].className = timeMiddleLis[m].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(timeMiddleLis[m].className == "tag-item active"){
        //                    this.tempStates.PriorityRule =timeMiddleLis[m].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //        (this.tempStates.PriorityRule == '2') ? priceModalEle.querySelector('.filter-select').innerHTML = '从低到高' : priceModalEle.querySelector('.filter-select').innerHTML = '价格';
        //    }else{ //国内单程
        //
        //        var directFlyLis__ = document.querySelectorAll('.only-direct-fly li');
        //        var filterShareLis__ = document.querySelectorAll('.filter-share li');
        //        var setTimeDurationLis__ = document.querySelectorAll('.set-time-duration li');
        //        var seatConditionLis__ = document.querySelectorAll('#seat-condition li');
        //        var timeMiddleLis__ = document.querySelectorAll('#time-modal li');
        //        var priceModalEle__ = document.querySelector('#fo_lo');
        //
        //        for (var bn = 0; bn < directFlyLis__.length; bn++) {
        //            if(type=="set"){
        //                directFlyLis__[bn].className = directFlyLis__[bn].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(directFlyLis__[bn].className == "tag-item active"){
        //                    this.tempStates.IsDirectFlight = directFlyLis__[bn].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //
        //        for (var js = 0; js < filterShareLis__.length; js++) {
        //            if(type=="set"){
        //                filterShareLis__[js].className = filterShareLis__[js].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(filterShareLis__[js].className == "tag-item active"){
        //                    this.tempStates.IsHideSharedFlight =filterShareLis__[js].getAttribute('data-i');
        //                    break;
        //                }
        //            }  }
        //
        //        for (var jp = 0; jp < setTimeDurationLis__.length; jp++) {
        //            if(type=="set"){
        //                setTimeDurationLis__[jp].className = setTimeDurationLis__[jp].getAttribute('data-i') == (''+this.tempStates.DepartStartHour+this.tempStates.DepartEndHour)? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(setTimeDurationLis__[jp].className == "tag-item active"){
        //                    this.tempStates.DepartStartHour =setTimeDurationLis__[jp].getAttribute('data-i').substring(0,2);
        //                    this.tempStates.DepartEndHour =setTimeDurationLis__[jp].getAttribute('data-i').substring(2);
        //                    break;
        //                }
        //            }  }
        //        for (var xv = 0; xv < seatConditionLis__.length; xv++) {
        //            if(type=="set"){
        //                seatConditionLis__[xv].className = seatConditionLis__[xv].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(seatConditionLis__[xv].className == "tag-item active"){
        //                    this.tempStates.CabinClass = seatConditionLis__[xv].getAttribute('data-i');
        //                    break;
        //                }
        //            } }
        //
        //        for(var mm = 0; mm < timeMiddleLis__.length; mm++) {
        //            if(type=="set"){
        //                timeMiddleLis__[mm].className = timeMiddleLis__[mm].getAttribute('data-i') == this.tempStates.IsDesc ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(timeMiddleLis__[mm].className == "tag-item active"){
        //                    this.tempStates.IsDesc =timeMiddleLis__[mm].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //    }
        //}else{
        //    if(this.sinOrDou == "Return"){ //国际往返
        //        var directFlyLis_ = document.querySelectorAll('.only-direct-fly li');
        //        var filterShareLis_ = document.querySelectorAll('.filter-share li');
        //        var seatConditionLis_ = document.querySelectorAll('#seat-condition li');
        //        var timeMiddleLis_ = document.querySelectorAll('#time-modal li');
        //        var priceModalLis_ = document.querySelector('#fo_lo');
        //        for (var q = 0; q < directFlyLis_.length; q++) {
        //            if(type=="set"){
        //                directFlyLis_[q].className = directFlyLis_[q].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(directFlyLis_[q].className == "tag-item active"){
        //                    this.tempStates.IsDirectFlight = directFlyLis_[q].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //
        //        for (var jz = 0; jz < filterShareLis_.length; jz++) {
        //            if(type=="set"){
        //                filterShareLis_[jz].className = filterShareLis_[jz].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(filterShareLis_[jz].className == "tag-item active"){
        //                    this.tempStates.IsHideSharedFlight =filterShareLis_[jz].getAttribute('data-i');
        //                    break;
        //                }
        //            }  }
        //
        //        for (var xa = 0; xa < seatConditionLis_.length; xa++) {
        //            if(type=="set"){
        //                seatConditionLis_[xa].className = seatConditionLis_[xa].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(seatConditionLis_[xa].className == "tag-item active"){
        //                    this.tempStates.CabinClass = seatConditionLis_[xa].getAttribute('data-i');
        //                    break;
        //                }
        //            } }
        //
        //        for(var mb = 0; mb < timeMiddleLis_.length; mb++) {
        //            if(type=="set"){
        //                timeMiddleLis_[mb].className = timeMiddleLis_[mb].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(timeMiddleLis_[mb].className == "tag-item active"){
        //                    this.tempStates.PriorityRule =timeMiddleLis_[mb].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //        (this.tempStates.hasTax == "true") ? priceModalLis_.querySelector('.filter-select').innerHTML = '含税价' : priceModalLis_.querySelector('.filter-select').innerHTML = '不含税价';
        //    }else{   //国际单程
        //        var directFlyLis_is = document.querySelectorAll('.only-direct-fly li');
        //        var filterShareLis_is = document.querySelectorAll('.filter-share li');
        //        var setTimeDurationLis_is = document.querySelectorAll('.set-time-duration li');
        //        var seatConditionLis_is = document.querySelectorAll('#seat-condition li');
        //        var timeMiddleLis_is = document.querySelectorAll('#time-modal li');
        //        var priceModalLis_is = document.querySelector('#fo_lo');
        //        for (var qq = 0; qq < directFlyLis_is.length; qq++) {
        //            if(type=="set"){
        //                directFlyLis_is[qq].className = directFlyLis_is[qq].getAttribute('data-i') == this.tempStates.IsDirectFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(directFlyLis_is[qq].className == "tag-item active"){
        //                    this.tempStates.IsDirectFlight = directFlyLis_is[qq].getAttribute('data-i');
        //                    break;
        //                }
        //            }
        //        }
        //        for (var jl = 0; jl < filterShareLis_is.length; jl++) {
        //            if(type=="set"){
        //                filterShareLis_is[jl].className = filterShareLis_is[jl].getAttribute('data-i') == this.tempStates.IsHideSharedFlight ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(filterShareLis_is[jl].className == "tag-item active"){
        //                    this.tempStates.IsHideSharedFlight =filterShareLis_is[jl].getAttribute('data-i');
        //                    break;
        //                }
        //            }  }
        //
        //        for (var cv = 0; cv < setTimeDurationLis_is.length; cv++) {
        //            if(type=="set"){
        //                setTimeDurationLis_is[cv].className = setTimeDurationLis_is[cv].getAttribute('data-i') == this.tempStates.DepartStartHour+this.tempStates.DepartEndHour? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(setTimeDurationLis_is[cv].className == "tag-item active"){
        //                    this.tempStates.DepartStartHour =setTimeDurationLis_is[cv].getAttribute('data-i').substring(0,2);
        //                    this.tempStates.DepartEndHour =setTimeDurationLis_is[cv].getAttribute('data-i').substring(2);
        //                    break;
        //                }
        //            }  }
        //
        //        for (var hy = 0; hy < seatConditionLis_is.length; hy++) {
        //            if(type=="set"){
        //                seatConditionLis_is[hy].className = seatConditionLis_is[hy].getAttribute('data-i') == this.tempStates.CabinClass ? "tag-item active" : "tag-item";
        //            }else if(type =='get'){
        //                if(seatConditionLis_is[hy].className == "tag-item active"){
        //                    this.tempStates.CabinClass = seatConditionLis_is[hy].getAttribute('data-i');
        //                    break;
        //                }
        //            } }
        //
        //        for(var ty = 0; ty < timeMiddleLis_is.length; ty++) {
        //            if(type=="set"){
        //                if(timeMiddleLis_is[ty].getAttribute('data-i').indexOf('isDesc')>-1){
        //                    timeMiddleLis_is[ty].className = timeMiddleLis_is[ty].getAttribute('data-i').substring(7) == this.tempStates.IsDesc ? "tag-item active" : "tag-item";
        //
        //                }else{
        //                    timeMiddleLis_is[ty].className = timeMiddleLis_is[ty].getAttribute('data-i') == this.tempStates.PriorityRule ? "tag-item active" : "tag-item";
        //                }
        //            }else if(type =='get'){
        //                if(timeMiddleLis_is[ty].className == "tag-item active"){
        //                    if(timeMiddleLis_is[ty].getAttribute('data-i').indexOf('isDesc')>-1){
        //                        this.tempStates.IsDesc =timeMiddleLis_is[ty].getAttribute('data-i').substring(7);
        //                        this.tempStates.PriorityRule ="0";
        //                    }else{
        //                        this.tempStates.PriorityRule =timeMiddleLis_is[ty].getAttribute('data-i');
        //                        delete this.tempStates.IsDesc;
        //                    }
        //                    break;
        //                }
        //            }
        //        }
        //        (this.tempStates.hasTax == "true") ? priceModalLis_is.querySelector('.filter-select').innerHTML = '含税价' : priceModalLis_is.querySelector('.filter-select').innerHTML = '不含税价';
        //    }
        //}
    },




    //  排序or筛选结束
    //  页面跳转
    nextPage:function(){
        //$('.seat-detail').click(function(){
            $(this).find('.hf-gou').addClass('cho-gou').parents().siblings().find('.hf-gou').removeClass('cho-gou');
            window.location.href = 'ticket_hotel_choose.html';
        //});
    },
    init:function(infoObj, callback1, callback2){
        changeFlightInfo =  JSON.parse(localStorage.changeFlightParaObj);
        this.getTicketList();
        //this.tempStates = infoObj;
        //this.originInfo = new Object();
        //for(var tem in infoObj){
        //    this.originInfo[tem] = infoObj[tem]
        //}
        //this.fn = callback1;
        //this.fn_ = callback2;
        this.createTags().addEvent().stateEvent('set');
        //this.nextPage();
    }
};
flight_list.init();

//$('.js-air-list > .js-air-item').click(flight_list.nextPage);
