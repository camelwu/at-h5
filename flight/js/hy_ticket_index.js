       var  ticketIndexModal = {
       double:function(){
           var paraObj = {
               start:this.reDate(document.querySelector('.double-date-one').innerHTML),
               end:this.reDate(document.querySelector('.double-date-two').innerHTML)};
           var dateInitObj = {},paramStr;
           dateInitObj[paraObj.start] = '去程';
           dateInitObj[paraObj.end] = '返程';
           var myDate= new TicketDate({
               id: 'ori-des-Date',
               num: 13,
               time: dateInitObj,
               sClass1: 'double-date',
               type:'double'
           });
       },

       single:function(){
           var myDate2= new TicketDate({
               id: 'chooseDate-single',
               num: 13,
               time: {},
               sClass1: 'enterDate',
               type:'single'
           });
       },

       reDate:function(arg){
           console.log(arg)
           var reg = /(\d{1,2})月(\d{1,2})日/g,tStr = reg.exec(arg);
           tStr[1] = parseInt(tStr[1]) < 10?'0'+parseInt(tStr[1]):parseInt(tStr[1]);
           tStr[2] = parseInt(tStr[2]) < 10?'0'+parseInt(tStr[2]):parseInt(tStr[2]);
           return new Date().getFullYear()+'-'+tStr[1]+'-'+tStr[2];
       },

       singleAndDoubleTangle:function(){
          var double = document.querySelector('#double');
          var single = document.querySelector('#single');
           document.querySelector('.hTab').onclick = function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.className.indexOf('singleTrip')>-1){
                   double.style.display = 'none';
                   single.style.display = 'block';
                   target.style.borderBottom = '0.2rem solid  rgb(255, 180, 19)';
                   target.style.color = 'rgb(255, 180, 19)';
                   document.querySelector('.doubleTrip').style.borderBottom = 'none';
                   document.querySelector('.doubleTrip').style.color = 'rgb(102, 102, 102)';
               }else if(target.className.indexOf('doubleTrip')>-1){
                   single.style.display = 'none';
                   double.style.display = 'block';
                   target.style.borderBottom = '0.2rem solid  rgb(255, 180, 19)';
                   target.style.color = 'rgb(255, 180, 19)';
                   document.querySelector('.singleTrip').style.borderBottom = 'none';
                   document.querySelector('.singleTrip').style.color = 'rgb(102, 102, 102)';
               }
           }
       },

       storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage,data = localStorage.getItem(key),dataObj = JSON.parse(data);
            if(dataObj!=null){
                return dataObj.data;
            }
        }
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

       returnCityCode:function(arg){
           var CityCode = "";
           for(var i=0;i<internationalCities.length;i++){
               if(internationalCities[i].CityName ==arg.innerHTML){
                   CityCode = internationalCities[i].CityCode;
                   break;
               }
           }
           if(!CityCode){
               for(var j=0;j<domesticCities.length;j++){
                   if(domesticCities[j].CityName ==arg.innerHTML){
                       CityCode = domesticCities[j].CityCode;
                       break;
                   }
               }
           }
           return CityCode;
       },

       returnCabinClass:function(arg){
           var cabinStr="";
            switch(arg){
                case "经济舱":
                    cabinStr = "Economy";
                    break;
                case "商务舱":
                    cabinStr = "Business";
                    break;
                case "头等舱":
                    cabinStr = "First";
                    break;
                case "豪华经济舱":
                    cabinStr = "EconomyPremium";
                    break;
                default :
                    cabinStr = "All";
            }
           return cabinStr;
       },

       toTicketList:function(){
           var that = ticketIndexModal,caCheContent = {};
           var ticketSearchButton = document.querySelector('#ticket-search-button');
           var tipBox = document.querySelector('.city-choose-tip');
           this.addHandler(ticketSearchButton,'click', function(){
               var oDiv = document.querySelector('#single').style.display == 'block'?document.querySelector('#single'):document.querySelector('#double');
               var cityItems = oDiv.querySelectorAll('.city-search'),cityStrs ="",CityCodeFrom = "",CityCodeTo = "",startDate = "",endDate = "",adultNumber = "",childNumber = "",CabinStr = "",paraObj = new Object(),paramStr = "";
               var NumofAdult = "",NumofChild ="";
               if(cityItems[0].innerHTML==cityItems[1].innerHTML){
                   tipBox.style.display = 'block';
                   that.timer = window.setTimeout(function(){
                           tipBox.style.display = 'none';
                           window.clearTimeout(that.timer);
                           that.timer = null;
                   },5000);
               }else{
                   if(document.querySelector('#double').style.display == 'block'){
                       cityStrs = document.querySelectorAll('#double .city-search');
                       CityCodeFrom = that.returnCityCode(cityStrs[0]);
                       CityCodeTo = that.returnCityCode(cityStrs[1]);
                       startDate = that.reDate(document.querySelector('.ori-des-Date').querySelectorAll('.dateNumber')[0].innerHTML);
                       endDate = that.reDate(document.querySelector('.ori-des-Date').querySelectorAll('.dateNumber')[1].innerHTML);
                       NumofAdult = parseInt(document.querySelector('.adult-number.double').innerHTML);
                       NumofChild = parseInt(document.querySelector('.child-number.double').innerHTML);
                       CabinStr = that.returnCabinClass(document.querySelector('#double .double-cabin-choose').innerHTML);
                       paraObj.CityCodeFrom = CityCodeFrom;
                       paraObj.CityCodeTo = CityCodeTo;
                       paraObj.DepartDate = startDate;
                       paraObj.ReturnDate = endDate;
                       paraObj.CabinClass = CabinStr;
                       paraObj.RouteType = "Return";
                       paraObj.IsHideSharedFlight=false;
                       paraObj.IsDirectFlight=false;
                       paraObj.NumofAdult= NumofAdult;
                       paraObj.NumofChild= NumofChild;
                       paraObj.DepartStartHour="00";
                       paraObj.DepartEndHour="24";
                       paraObj.PriorityRule= 0;
                       paraObj.pageNo= 1;
                       paraObj.pageSize= 10;
                       paraObj.IsDesc= "false";
                       paraObj.fromCity= cityItems[0].innerHTML;
                       paraObj.toCity= cityItems[1].innerHTML;
                       that.storageUtil.set('ticketSearchedInfo',paraObj)
                       for(var attr in paraObj){
                           paramStr+="&"+attr+"="+paraObj[attr];
                       }
                       paramStr=paramStr.slice(1);
                       document.location.href='ticket_double_list.html?'+paramStr;
                   } else {
                       NumofAdult = parseInt(document.querySelector('.adult-number').innerHTML);
                       NumofChild = parseInt(document.querySelector('.child-number').innerHTML);
                       cityStrs = document.querySelectorAll('#single .city-search');
                       CityCodeFrom = that.returnCityCode(cityStrs[0]);
                       CityCodeTo = that.returnCityCode(cityStrs[1]);
                       startDate = that.reDate(document.querySelector('#chooseDate-single').querySelector('.dateNumber').innerHTML);
                       console.log(startDate)
                       adultNumber = document.querySelector('#single span.adult-number').innerHTML;
                       childNumber = document.querySelector('#single span.child-number').innerHTML;
                       CabinStr = that.returnCabinClass(document.querySelector('#single .single-cabin-choose').innerHTML);
                       paraObj.CityCodeFrom = CityCodeFrom;
                       paraObj.CityCodeTo = CityCodeTo;
                       paraObj.DepartDate = startDate;
                       paraObj.CabinClass = CabinStr;
                       paraObj.RouteType = "Oneway";
                       paraObj.IsHideSharedFlight=false;
                       paraObj.IsDirectFlight=false;
                       paraObj.NumofAdult= NumofAdult;
                       paraObj.NumofChild= NumofChild;
                       paraObj.DepartStartHour="00";
                       paraObj.DepartEndHour="24";
                       paraObj.PriorityRule= 0;
                       paraObj.IsDesc= "false";
                       paraObj.pageNo= 1;
                       paraObj.pageSize= 10;
                       paraObj.fromCity= cityItems[0].innerHTML;
                       paraObj.toCity= cityItems[1].innerHTML;
                       that.storageUtil.set('ticketSearchedInfo',paraObj)
                       for(var attr_ in paraObj){
                           paramStr+="&"+attr_+"="+paraObj[attr_];
                       }
                       paramStr=paramStr.slice({from:cityItems[0].innerHTML,to:cityItems[1].innerHTML});
                       document.location.href='ticket_single_list.html?'+paramStr;
                   }
               }
           },false );
       },

       toCitySearch:function(){
           var cityNames = document.querySelectorAll('.city-search');
           var outDiv = document.querySelector('.city-list-choose');
           for(var i = 0; i < cityNames.length;i++){
               cityNames[i].onclick=function(){
                   ticketIndexModal.celement = this;
                   outDiv.style.display = 'block';
               }
           }

       },

       changeItem:function(itemNum){
          var oSpans = document.querySelectorAll('.item-span');
             for(var i = 0;i<oSpans.length; i++){
                 oSpans[i].className='item-span';
               }
           oSpans[itemNum].className = 'item-span dot'
       },

       startHandler: function (e) {
           ticketIndexModal.preventDefault(e);
           ticketIndexModal.stopPropagation(e);
           if(ticketIndexModal.autoTimerInt){
               window.clearInterval(ticketIndexModal.autoTimerInt);
               ticketIndexModal.autoTimerInt = null;
           }
           if (!ticketIndexModal.isAnimation) {
               ticketIndexModal.tempStart = e.targetTouches[0].pageX;
           } else {
               ticketIndexModal.isAnimation = true;
           }
       },

       moveHandler: function (e) {
           ticketIndexModal.preventDefault(e);
           ticketIndexModal.stopPropagation(e);
           var innerUl = document.querySelector('.frontPicUl');
           innerUl.style.left = parseFloat(innerUl.style.left) + e.targetTouches[0].pageX - ticketIndexModal.tempStart + 'px';
           ticketIndexModal.tempStart = e.targetTouches[0].pageX;
       },

       endHandler: function (e) {
           ticketIndexModal.preventDefault(e);
           ticketIndexModal.stopPropagation(e);
           var minLeftValue = - (document.querySelectorAll('.frontPicLi').length - 2) * window.innerWidth;
           var maxLeftValue = - window.innerWidth;
           var endLeftValue = parseFloat(document.querySelector('.frontPicUl').style.left);
           var distance = endLeftValue - ticketIndexModal.tempCurLeft, time = 1000, targetLeft;
           if (distance < 0 && Math.abs(distance) >= window.innerWidth / 4) {
               targetLeft = ticketIndexModal.tempCurLeft - window.innerWidth;
           } else if (distance > 0 && Math.abs(distance) >= window.innerWidth / 4) {
               targetLeft = ticketIndexModal.tempCurLeft + window.innerWidth;
           } else {
               targetLeft = ticketIndexModal.tempCurLeft;
           }

           if (targetLeft > maxLeftValue) {
               targetLeft = maxLeftValue;
           } else if (targetLeft < minLeftValue) {
               targetLeft = minLeftValue;
           }
           time = Math.abs((targetLeft - parseFloat(document.querySelector('.frontPicUl').style.left)) / window.innerWidth) * time;
           ticketIndexModal.tempCurLeft = targetLeft;
           $('.frontPicUl').animate({'left': targetLeft}, time);
           ticketIndexModal.changeItem(Math.abs(Math.floor(targetLeft / window.innerWidth))-1);
           ticketIndexModal.isAnimation = false;
           ticketIndexModal.autoMove();
       },
       preventDefault: function (event) {
           if (event.preventDefault) {
               event.preventDefault();
           } else {
               event.returnValue = false;
           }
       },

       stopPropagation: function (event) {
           if (event.stopPropagation) {
               event.stopPropagation();
           } else {
               event.cancelBubble = true;
           }
       },

       tangleCity:function(){
           var oDivs=document.querySelectorAll('.place');
           for(var i = 0;i < oDivs.length;i++) {
               oDivs[i].current = 0;
               this.addHandler(oDivs[i], 'click', function(event){
                   var startStr = this.querySelector('.origin ').innerHTML;
                   var endStr = this.querySelector('.destination').innerHTML;
                   var event = event || window.event;
                   var target = event.target || event.srcElement;
                  if(target.className.indexOf('span-target')!=-1){
                      var oSpan = this.querySelector('span');
                      oSpan.style.transition = '0.7s all ease';
                      oSpan.style.webkitTransition = '0.7s all ease';
                      oSpan.style.webkitTransformOrigin = '18px ' + '23px';
                      oSpan.style.transformOrigin = '22px ' + '24px';
                      this.current = (this.current + 180);
                      oSpan.style.transform = 'rotate(' + this.current + 'deg)';
                      oSpan.style.webkitTransform = 'rotate(' + this.current + 'deg)';
                      this.querySelector('.origin ').innerHTML=endStr;
                      this.querySelector('.destination ').innerHTML=startStr;
                  }
               });
           }
       },

       createWrap:function(){
           var wrapDiv = document.createElement('div'),frameStr = '',allWrap = document.querySelector('.all-elements');
           wrapDiv.className = 'city-list-choose';
           frameStr +='<header class="clearfix"><i class="fl"></i>'+
           '<div class="cl_search">'+
           '    <input type="text" placeholder="北京/beijing/bj/bjs/中国" id="city-input-zone"><i></i>'+
           '</div>'+
           '</header>'+
           '<div class="city-content">'+
           '<div class="hTab c-htab">'+
           '<div class="singleTrip addFontStyle">国内</div>'+
           '<div class="doubleTrip">国际</div>'+
           '</div>'+
           '<div class="domestic-city">'+
           '<ul class="city-classifying">'+
           '<li class="title-tip d-cur-city"><h4>当前</h4>'+
           '<ul class="city-content">'+
           '<li class="city-content-item focus">北京</li>'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip d-his-city-ele d-his-city"><h4>历史选择</h4>'+
           '<ul class="city-content history-choose-ul">'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip d-re-hot-city"><h4>热门城市</h4>'+
           '<ul class="city-content city-content-hot">'+
           '</ul>'+
           '</li>'+
           '</ul>'+
           '<ul class="city-list-details">'+
           '<li class="city-list-details-info"><h4>A</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '<li class="city-list-details-info"><h4>B</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '<li class="city-list-details-info"><h4>C</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '</ul>'+
           '</div>'+
           '<div class="international-city">'+
           '<ul class="city-classifying">'+
           '<li class="title-tip i-cur-city"><h4>当前</h4>'+
           '<ul class="city-content">'+
           '<li class="city-content-item focus">北京</li>'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip i-his-city-ele i-his-city"><h4>历史选择</h4>'+
           '<ul class="city-content">'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip i-re-hot-city"><h4>热门城市</h4>'+
           '<ul class="city-content city-content-hot">'+
           '</ul>'+
           '</li>'+
           '</ul>'+
           '<ul class="city-list-details">'+
           '<li class="city-list-details-info"><h4>A</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '<li class="city-list-details-info"><h4>B</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '<li class="city-list-details-info"><h4>C</h4>'+
           '<ul class="city-list-details-content">'+
           '</ul>'+
           '</li>'+
           '</ul>'+
           '</div>'+
           '<div class="right-side">'+
           '<div class="cur-word">'+
           '<div class="special-tip"><span class="cur-city">当前</span><span class="his-city">历史</span><span class="re-hot-city">热门</span></div>'+
           '<div class="city-pin-fir"><div>' + '<span class="letter">A</span>'+
           '<span class="letter">B</span>'+
           '<span class="letter">C</span>'+
           '<span class="letter">D</span>'+
           '<span class="letter">E</span>'+
           '<span class="letter">F</span>'+
           '<span class="letter">G</span>'+
           '<span class="letter">H</span>'+
           '<span class="letter">I</span>'+
           '<span class="letter">J</span>'+
           '<span class="letter">K</span>'+
           '<span class="letter">L</span>'+
           '<span class="letter">M</span>'+
           '<span class="letter">N</span>'+
           '<span class="letter">O</span>'+
           '<span class="letter">P</span>'+
           '<span class="letter">Q</span>'+
           '<span class="letter">R</span>'+
           '<span class="letter">S</span>'+
           '<span class="letter">T</span>'+
           '<span class="letter">U</span>'+
           '<span class="letter">V</span>'+
           '<span class="letter">W</span>'+
           '<span class="letter">X</span>'+
           '<span class="letter">Y</span>'+
           '<span class="letter">Z</span></div></div>'+
           '</div>'+
           '</div>'+
           '<ul class="city-list-searched" style="display: none;">'+
           '</ul>'+
           '</div>';
           wrapDiv.innerHTML = frameStr;
           allWrap.appendChild(wrapDiv);
       },

       getHotCity:function(type){
           var that = this;
           A(fns,type);
           function A(fns,type){
               var filter ={};
               filter.filterColumn = "countryCode";
               filter.value = type;
               getNetCity(filter,fns);
           }
           function fns(arg,status,statusMsg){
              // console.log("Status : "+status + " :"+ statusMsg);
               if(type =="NOTCN"){
                   that.intHotCity = arg;
               }else{
                   that.demHotCity = arg;
               }
               if(that.demHotCity!=undefined&&that.intHotCity!=undefined){
                   that.createHotCityContent(that.demHotCity, that.intHotCity)
               }
           }
      },

       createHotCityContent:function(demHotCity,intHotCity){
        var dHotCity = document.querySelector('.domestic-city ul.city-content-hot');
        var iHotCity = document.querySelector('.international-city ul.city-content-hot'),iHotCityStr='',dHotCityStr='';
        for(var i = 0;i< demHotCity.length;i++){
            dHotCityStr+='<li class="city-content-item hot city-word">'+demHotCity[i].cityChineseName+'</li>';
        }
        for(var m = 0;m < intHotCity.length;m++){
            iHotCityStr+='<li class="city-content-item hot city-word">'+intHotCity[m].cityChineseName+'</li>';
        }
        dHotCity.innerHTML = dHotCityStr;
        iHotCity.innerHTML = iHotCityStr;
    },
       addContent:function(){
           var dCityList = document.querySelector('.domestic-city ul.city-list-details');
           var iCityList = document.querySelector('.international-city ul.city-list-details');
           var dHisELe = document.querySelector('.d-his-city-ele');
           var iHisELe = document.querySelector('.i-his-city-ele');
           var dCityListStr='',iCityListStr='';

           for(var temp in domesticCitiesData){
               if(tem != "0"){
                   dCityListStr += '<li class="city-list-details-info d'+temp.toUpperCase()+'-Link"><h4>'+temp.toUpperCase()+'</h4><ul class="city-list-details-content">';
                   for(var j = 0;j< domesticCitiesData[temp].length;j++){
                       dCityListStr+='<li class="city-list-name city-word">'+domesticCitiesData[temp][j].CityName+'</li>';
                   }
                   dCityListStr +='</ul>';
               }
           }

           for(var t in internationalCitiesData){
               iCityListStr += '<li class="city-list-details-info i'+t.toUpperCase()+'-Link"><h4>'+t.toUpperCase()+'</h4><ul class="city-list-details-content">';
               for(var n = 0;n < internationalCitiesData[t].length; n++){
                   iCityListStr+='<li class="city-list-name city-word">'+internationalCitiesData[t][n].CityName+'</li>';
               }
               iCityListStr +='</ul>';
           }

           dCityList.innerHTML = dCityListStr;
           iCityList.innerHTML = iCityListStr;
       },

       historyChooseHandler:function(arg){
          var ul = document.querySelector('.domestic-city').style.display =='block'?document.querySelector('.d-his-city-ele ul'):document.querySelector('.i-his-city-ele ul')
          var outLi = document.querySelector('.domestic-city').style.display =='block'?document.querySelector('.d-his-city-ele'):document.querySelector('.i-his-city-ele')
          var n = [],liStr='';
          for(var i = 0; i < arg.length; i++)
          {
              if (n.indexOf(arg[i]) == -1) n.push(arg[i]);
              if(n.length > 3){
                  n = n.slice(1);
               }
          }
          if(n.length>0){
              for(var m = 0; m < n.length; m++){
                  liStr +='<li class="city-content-item">'+n[m]+'</li>'
              }
          }
          ul.innerHTML =liStr;
          outLi.style.display ='block';
       },

       eventHandle2:function(){
           var that = ticketIndexModal;
           var outDiv = document.querySelector('.city-list-choose');
           var cityInputZone = document.querySelector('#city-input-zone');
           var citySearchs = document.querySelectorAll('.city-search');
           var position = document.querySelector('.cur-word');
           var chTab = document.querySelector('.c-htab');
           var domesticCity = document.querySelector('.domestic-city');
           var internationalCity = document.querySelector('.international-city');
           var cityListSearched = document.querySelector('.city-list-searched');
           var aBox=document.querySelectorAll('.pas-num-cont');
           var  aCabs = document.querySelectorAll('.cabin-wrap');
           var oAir=document.querySelector('.mask');
           var header = document.querySelector('.clearfix');
           domesticCity.style.display='block';
           internationalCity.style.display='none';
            for(var f = 0;f<aBox.length;f++){
                this.addHandler(aBox[f],'click',function(event){
                    var event = event || window.event;
                    var target = event.target || event.srcElement;
                    if(target.className=='add-minus-per-more'){
                        target.parentNode.querySelector('span').innerHTML = parseInt(target.parentNode.querySelector('span').innerHTML)+1;
                        if(parseInt(target.parentNode.querySelector('span').innerHTML)>=10){target.parentNode.querySelector('span').innerHTML=10;}
                    }else if(target.className=='add-minus-per-less'){
                        target.parentNode.querySelector('span').innerHTML = parseInt(target.parentNode.querySelector('span').innerHTML)-1;
                        if(parseInt(target.parentNode.querySelector('span').innerHTML)<=0){target.parentNode.querySelector('span').innerHTML=0;}
                    }
                });
            }
           this.addHandler(cityListSearched,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.tagName=='LI'){
                   if(domesticCity.style.display=='block'){
                       that.dhisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.dhisChoosePool);
                   }else{
                       that.ihisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.ihisChoosePool);
                   }
                   cityInputZone.value = target.innerHTML;
                   that.timer3 = window.setTimeout(function(){
                       outDiv.style.display = 'none';
                       that.celement.innerHTML= target.innerHTML;
                       window.clearTimeout(that.timer3);
                       that.timer3 = null;
                   },1000);
                   this.style.display = 'none';
               }
           });
           this.addHandler(cityListSearched,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.tagName=='LI'){
                   if(domesticCity.style.display=='block'){
                       that.dhisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.dhisChoosePool);
                   }else{
                       that.ihisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.ihisChoosePool);
                   }
                   cityInputZone.value = target.innerHTML;
                   that.timer3 = window.setTimeout(function(){
                       outDiv.style.display = 'none';
                       that.celement.innerHTML= target.innerHTML;
                       window.clearTimeout(that.timer3);
                       that.timer3 = null;
                   },1000);
                   this.style.display = 'none';
               }
           });
           this.addHandler(chTab,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.className=='singleTrip'){
                   target.className='singleTrip addFontStyle';
                   target.parentNode.querySelector('.doubleTrip').className ='doubleTrip';
                   console.log(111111111)
                   domesticCity.style.display = 'block';
                   internationalCity.style.display = 'none'
               }else if(target.className=='doubleTrip'){
                   target.className='doubleTrip addFontStyle';
                   domesticCity.style.display = 'none';
                   target.parentNode.querySelector('.singleTrip').className ='singleTrip';
                   internationalCity.style.display = 'block'
               }
           });

           this.addHandler(header,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.className=='fl'){
                   window.history.go(-1);
               }
           });
           this.addHandler(position,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               console.log(domesticCity.style.display)
               console.log(internationalCity.style.display)
               if(domesticCity.style.display=='block'&&internationalCity.style.display=='none'){

                   if(target.tagName=='SPAN'&&target.className.indexOf('letter')>-1&&document.querySelector(".d"+target.innerHTML+"-Link")){
                       document.querySelector(".d"+target.innerHTML+"-Link").scrollIntoView(false)
                   }else if(target.tagName=='SPAN'&&target.className.indexOf('city')>-1){
                       document.querySelector(".d-"+target.className).scrollIntoView(false);
                   }
               }else if(domesticCity.style.display=='none'&&internationalCity.style.display=='block'){
                   if(target.tagName=='SPAN'&&target.className.indexOf('letter')>-1&&document.querySelector(".i"+target.innerHTML+"-Link")){
                       document.querySelector(".i"+target.innerHTML+"-Link").scrollIntoView(false)
                   }else if(target.tagName=='SPAN'&&target.className.indexOf('city')>-1){
                       document.querySelector(".i-"+target.className).scrollIntoView(false);
                   }
               }
           });
            if(cityInputZone.addEventListener){
                cityInputZone.addEventListener('focus',function(){
                    var oMask=$('<div class="city-choose-mask"></div>');
                    oMask.appendTo($('.city-content'));

                },false);
                cityInputZone.addEventListener('blur',function(){

                    $('.city-choose-mask').remove();

                },false);
                cityInputZone.addEventListener('input',that.searchHandler,false)
            }else{
                cityInputZone.attachEvent('onpropertychange',that.searchHandler)
            }
           this.addHandler(outDiv,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.className =='fl'){
                   outDiv.style.display = 'none';
               }else if(target.className.indexOf('city-word')!=-1){
                   if(domesticCity.style.display=='block'){
                       that.dhisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.dhisChoosePool);
                   }else{
                       that.ihisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.ihisChoosePool);
                   }
                   cityInputZone.value = target.innerHTML;
                   that.timer2 = window.setTimeout(function(){
                       outDiv.style.display = 'none';
                       that.celement.innerHTML= target.innerHTML;
                       window.clearTimeout(that.timer2);
                       that.timer2 = null;
                   },1000);
               }

           })
       },
       searchHandler:function(){
          var cityListSearched = document.querySelector('.city-list-searched');
          var cityInputZone = document.querySelector('#city-input-zone');
          var domesticCity = document.querySelector('.domestic-city');
          var internationalCity = document.querySelector('.international-city');
          var valueStr = cityInputZone.value,resultStr = '';
          var searchResult = [];
          if(valueStr){
               if(domesticCity.style.display=='block'&&internationalCity.style.display=='none'){
                     for(var k = 0; k < domesticCities.length;k++){
                           for(var t in domesticCities[k]){
                               if(domesticCities[k][t].indexOf(valueStr) > -1){
                                   searchResult.push(domesticCities[k])
                               }
                           }
                     }
               }else{
                   for(var p = 0; p < internationalCities.length; p++){
                       for(var te in internationalCities[p]){
                           if(internationalCities[p][te].indexOf(valueStr) > -1){
                               searchResult.push(internationalCities[p])
                           }
                       }
                   }
               }
              if(!searchResult.length){
                  resultStr +='<li class="city-list-searched-item">无搜索结果</li>';
              }else{
                  for(var l = 0;l<searchResult.length;l++){
                      resultStr += '<li class="city-list-searched-item">'+searchResult[l].CityName+'</li>'
                  }
              }
              cityListSearched.innerHTML = resultStr;
              cityListSearched.style.display = 'block'
          }else{
              cityListSearched.style.display = 'none'
          }
      },
       initDate:function(){
           var d = new Date(), s = new Date(d.setDate(d.getDate() + 1)),
               r =new Date( d.setDate(d.getDate() + 3)),
               startDay,endDay,startStrMonth = '',startStrDate = '',endStrMonth = '',endStrDate = '',
           returnWeek = function(index){
               var week = '';
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
                   default :void(0)
               }
               return week;
           };
           startStrMonth = parseInt(s.getMonth() +1) > 10 ?parseInt(s.getMonth() +1):'0'+parseInt(s.getMonth() +1);
           startStrDate = parseInt(s.getDate()) > 10 ?parseInt(s.getDate()):'0'+parseInt(s.getDate());
           endStrMonth = parseInt(r.getMonth() +1) > 10 ?parseInt(r.getMonth() +1):'0'+parseInt(r.getMonth() +1);
           endStrDate = parseInt(r.getDate()) > 10 ?parseInt(r.getDate()):'0'+parseInt(r.getDate());
           startDay = [startStrMonth +'月' + startStrDate +'日',returnWeek(s.getDay())];
           endDay = [endStrMonth +'月' + endStrDate +'日',returnWeek(r.getDay())];
           document.querySelector('.single-date').innerHTML = startDay[0];
           document.querySelector('.single-week').innerHTML = startDay[1];
           document.querySelector('.double-date-one').innerHTML = startDay[0];
           document.querySelector('.double-week-one').innerHTML = startDay[1];
           document.querySelector('.double-date-two').innerHTML = endDay[0];
           document.querySelector('.double-week-two').innerHTML = endDay[1];
       },
       initShowData:function(arg){
           console.log(arg)
              var outEleOpen,outEleClosed,singleTitle = document.querySelector('.singleTrip'),doubleTitle = document.querySelector('.doubleTrip');
              var returnDateAndWeek = function(arg){
                    var reg=/\d{4}-(\d{2})-(\d{2})/,week,dateNum; //"2016-02-24"
                    var weekIndex = new Date(arg.replace('/-/g','/')).getDay();
                    dateNum = reg.exec(arg);
                    switch (weekIndex){
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
                      default :void(0)
                  }
               return {date:dateNum[1]+'月'+dateNum[2]+'日',weekWord:week}

              };
              var reFixedSeat = function(arg){
                      var cabinStr="";
                      switch(arg){
                          case "Economy":
                           cabinStr = "经济舱";
                           break;
                           case "Business":
                           cabinStr = "商务舱";
                           break;
                           case "First":
                           cabinStr = "头等舱";
                           break;
                           case "EconomyPremium":
                           cabinStr = "豪华经济舱";
                           break;
                           default :
                           void (0);
                      }
                      return cabinStr;
              };
              if(arg.RouteType == "Oneway"){
                 outEleOpen = document.querySelector('#single');
                 outEleClosed = document.querySelector('#double');
                 outEleOpen.style.display = "block";
                 outEleClosed.style.display = "none";
                  singleTitle.className = "singleTrip light-title";
                  doubleTitle.className = "doubleTrip grey-title";
                   var cityNames = outEleOpen.querySelectorAll('.city-search');
                   var singleDate = outEleOpen.querySelector('.single-date');
                   var singleWeek = outEleOpen.querySelector('.single-week');
                   var adultNumber = outEleOpen.querySelector('.add-minus-per-content.adult-number');
                   var childNumber = outEleOpen.querySelector('.add-minus-per-content.child-number');
                   var seatEle = outEleOpen.querySelector('.cabin-wrap-choice.single-cabin-choose');
                   cityNames[0].innerHTML = arg.fromCity;
                   cityNames[1].innerHTML = arg.toCity;
                   singleDate.innerHTML = returnDateAndWeek(arg.DepartDate)["date"];
                   singleWeek.innerHTML = returnDateAndWeek(arg.DepartDate)["weekWord"];
                   adultNumber.innerHTML = arg.NumofAdult;
                   childNumber.innerHTML = arg.NumofChild;
                   seatEle.innerHTML =reFixedSeat(arg.CabinClass);
             }else if(arg.RouteType == "Return"){
                  outEleOpen = document.querySelector('#double');
                  outEleClosed = document.querySelector('#single');
                  outEleOpen.style.display = "block";
                  outEleClosed.style.display = "none";
                  console.log(outEleOpen)
                  singleTitle.className = "singleTrip grey-title";
                  doubleTitle.className = "doubleTrip light-title";
                   var cityNames = outEleOpen.querySelectorAll('.city-search');
                   var doubleDateOne = outEleOpen.querySelector('.double-date-one');
                   var doubleWeekOne = outEleOpen.querySelector('.double-week-one');
                   var doubleDateTwo = outEleOpen.querySelector('.double-date-two');
                   var doubleWeekTwo = outEleOpen.querySelector('.double-week-two');
                   var adultNumber = outEleOpen.querySelector('.add-minus-per-content.adult-number');
                   var childNumber = outEleOpen.querySelector('.add-minus-per-content.child-number');
                   var seatEle = outEleOpen.querySelector('.cabin-wrap-choice.double-cabin-choose');
                   cityNames[0].innerHTML = arg.fromCity;
                   cityNames[1].innerHTML = arg.toCity;
                   doubleDateOne.innerHTML = returnDateAndWeek(arg.DepartDate)["date"];
                   doubleWeekOne.innerHTML = returnDateAndWeek(arg.DepartDate)["weekWord"];
                   doubleDateTwo.innerHTML = returnDateAndWeek(arg.ReturnDate)["date"];
                   doubleWeekTwo.innerHTML = returnDateAndWeek(arg.ReturnDate)["weekWord"];
                   adultNumber.innerHTML = arg.NumofAdult;
                   childNumber.innerHTML = arg.NumofChild;
                   seatEle.innerHTML =reFixedSeat(arg.CabinClass);
              }
       },
       loadingFade:function(){
            $(window).load(function () {
                   $("#status-f").fadeOut();
                   $("#preloader").delay(400).fadeOut("medium");

               });
       },
       init:function(){
           this.ticketSearchedInfo = this.storageUtil.get('ticketSearchedInfo') || "";
           this.initDate();
           if(this.ticketSearchedInfo){
               this.initShowData(this.ticketSearchedInfo);
           }
           this.loadingFade();
           this.getHotCity("NOTCN");
           this.getHotCity("CN");
           this.createWrap();
           this.addContent();
           this.double();
           this.single();
           this.eventHandle2();
           this.singleAndDoubleTangle();
           this.toTicketList();
           this.toCitySearch();
           this.tangleCity();
           this.dhisChoosePool = [];
           this.ihisChoosePool = [];
       }
   };

ticketIndexModal.init();
