//国际城市
var _ExHotCity = {
    "Parameters": "",
    "ForeEndType": 3,
    "Code": "0081"
}
//国内城市
var _InHotCity = {
    "Parameters": "",
    "ForeEndType": 3,
    "Code": "0082"
}       
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
               type:'Return',
               _word:{tip:['去程','返程']}
           });
       },
       single:function(){
           var paraObj = {
               start:this.reDate(document.querySelector('.single-date').innerHTML)};
           var dateInitObj = {},paramStr;
           dateInitObj[paraObj.start] = '已选';
           var myDate2= new TicketDate({
               id: 'chooseDate-single',
               num: 13,
               time: dateInitObj,
               sClass1: 'enterDate',
               type:'Oneway',
               _word:{tip:['去程']}
           });
       },

       reDate:function(arg){
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
           var CityCode = "",type='domestic';
           for(var i=0;i<internationalCities.length;i++){
               if(internationalCities[i].CityName ==arg.innerHTML){
                   CityCode = internationalCities[i].CityCode;
                   type = 'international';
                   break;
               }
           }
           if(!CityCode){
               for(var j=0;j<domesticCities.length;j++){
                   if(domesticCities[j].CityName ==arg.innerHTML){
                       CityCode = domesticCities[j].CityCode;
                       type = 'domestic';
                       break;
                   }
               }
           }
           return {CityCode:CityCode,type:type};
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
               var NumofAdult = "",NumofChild ="",CityFromObj={},CityToObj={};
               if(cityItems[0].innerHTML==cityItems[1].innerHTML){
                   tipBox.innerHTML = '请确保出发与到达为不同城市！';
                   tipBox.style.display = 'block';
                   that.timer = window.setTimeout(function(){
                           tipBox.style.display = 'none';
                           window.clearTimeout(that.timer);
                           that.timer = null;
                   },3000);
               }else{
                   if(document.querySelector('#double').style.display == 'block'){
                       cityStrs = document.querySelectorAll('#double .city-search');
                       CityFromObj = that.returnCityCode(cityStrs[0]);
                       CityToObj = that.returnCityCode(cityStrs[1]);
                       CityCodeFrom = CityFromObj['CityCode'];
                       CityCodeTo = CityToObj['CityCode'];
                       startDate = that.reDate(document.querySelector('.ori-des-Date').querySelectorAll('.dateNumber')[0].innerHTML);
                       endDate = that.reDate(document.querySelector('.ori-des-Date').querySelectorAll('.dateNumber')[1].innerHTML);
                       adultNumber = document.querySelector('#double span.adult-number').innerHTML;
                       childNumber = document.querySelector('#double span.child-number').innerHTML;
                       CabinStr = that.returnCabinClass(document.querySelector('#double .double-cabin-choose').innerHTML);
                       paraObj.CityCodeFrom = CityCodeFrom;
                       paraObj.CityCodeTo = CityCodeTo;
                       paraObj.interNationalOrDomestic = (CityFromObj["type"]=="domestic"&&CityToObj["type"]=="domestic")?"domestic":"international";
                       paraObj.DepartDate = startDate;
                       paraObj.ReturnDate = endDate;
                       paraObj.CabinClass = CabinStr;
                       paraObj.RouteType = "Return";
                       paraObj.IsHideSharedFlight=false;
                       paraObj.IsDirectFlight=false;
                       paraObj.NumofAdult= adultNumber;
                       paraObj.NumofChild= childNumber;
                       paraObj.DepartStartHour="00";
                       paraObj.DepartEndHour="24";
                       paraObj.PriorityRule= 0;
                       paraObj.pageNo= 1;
                       paraObj.pageSize= 10;
                       paraObj.hasTax= true;
                       paraObj.IsDesc= "true";
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
                       CityFromObj = that.returnCityCode(cityStrs[0]);
                       CityToObj = that.returnCityCode(cityStrs[1]);
                       CityCodeFrom = CityFromObj['CityCode'];
                       CityCodeTo = CityToObj['CityCode'];
                       console.log(CityCodeFrom)
                       console.log(CityCodeTo)
                       startDate = that.reDate(document.querySelector('#chooseDate-single').querySelector('.dateNumber').innerHTML);
                       adultNumber = document.querySelector('#single span.adult-number').innerHTML;
                       childNumber = document.querySelector('#single span.child-number').innerHTML;
                       CabinStr = that.returnCabinClass(document.querySelector('#single .single-cabin-choose').innerHTML);
                       paraObj.CityCodeFrom = CityCodeFrom;
                       paraObj.CityCodeTo = CityCodeTo;
                       paraObj.interNationalOrDomestic = (CityFromObj["type"]=="domestic"&&CityToObj["type"]=="domestic")?"domestic":"international";
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
                       paraObj.IsDesc= "true";
                       paraObj.pageNo= 1;
                       paraObj.pageSize= 10;
                       paraObj.hasTax= true;
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
           var input = document.getElementById("city-input-zone");
           var searchList = document.querySelector(".city-list-searched");
           for(var i = 0; i < cityNames.length;i++){
               cityNames[i].onclick=function(){
                   ticketIndexModal.celement = this;
                   outDiv.style.display = 'block';
                   document.querySelector('.air_content').style.display='none';
                   var oDiv=document.createElement('div');
                   oDiv.className='maskCity';
                   document.querySelector('#tpls').appendChild(oDiv);
                   //h5-470 每次显示城市搜索前清空输入框和搜索结果页
                   input.value = "";
                   searchList.style.display = 'none';
                   searchList.innerHTML = "";
                   
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
           '    <input type="text" placeholder="新加坡/xinjiapo/Singapore" id="city-input-zone"><i></i>'+
           '</div>'+
           '</header>'+
           '<div class="city-content">'+
           '<div class="hTab c-htab">'+
           '<div class="singleTrip addFontStyle">国内</div>'+
           '<div class="doubleTrip">国际</div>'+
           '</div>'+
           '<div class="domestic-city">'+
           '<ul class="city-classifying">'+
           '<li class="title-tip d-cur-city"><a class="target" name="CURR"></a>'+
           '<h4>当前</h4>'+
           '<ul class="city-content">'+
           '<li class="city-content-item focus">北京</li>'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip d-his-city-ele d-his-city"><a class="target" name="HIST"></a>'+
           '<h4>历史选择</h4>'+
           '<ul class="city-content history-choose-ul">'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip d-re-hot-city"><a class="target" name="HOTT"></a>'+
           '<h4>热门城市</h4>'+
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
           '<li class="title-tip i-cur-city"><a class="target" name="ICURR"></a>'+
           '<h4>当前</h4>'+
           '<ul class="city-content">'+
           '<li class="city-content-item focus">北京</li>'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip i-his-city-ele i-his-city"><a class="target" name="IHIST"></a>'+
           '<h4>历史选择</h4>'+
           '<ul class="city-content">'+
           '</ul>'+
           '</li>'+
           '<li class="title-tip i-re-hot-city"><a class="target" name="IHOTT"></a>'+
           '<h4>热门城市</h4>'+
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
           '<div class="special-tip"><span class="cur-city"><a href="#CURR">当前</a></span><span class="his-city"><a href="#HIST">历史</a></span><span class="re-hot-city"><a href="#HOTT">热门</a></span></div>'+
           '<div class="city-pin-fir"><div>'+
           '<a class="letter" href="#A">A</a>'+
           '<a class="letter" href="#B">B</a>'+
           '<a class="letter" href="#C">C</a>'+
           '<a class="letter" href="#D">D</a>'+
           '<a class="letter" href="#E">E</a>'+
           '<a class="letter" href="#F">F</a>'+
           '<a class="letter" href="#G">G</a>'+
           '<a class="letter" href="#H">H</a>'+
           '<a class="letter" href="#I">I</a>'+
           '<a class="letter" href="#J">J</a>'+
           '<a class="letter" href="#K">K</a>'+
           '<a class="letter" href="#L">L</a>'+
           '<a class="letter" href="#M">M</a>'+
           '<a class="letter" href="#N">N</a>'+
           '<a class="letter" href="#O">O</a>'+
           '<a class="letter" href="#P">P</a>'+
           '<a class="letter" href="#Q">Q</a>'+
           '<a class="letter" href="#R">R</a>'+
           '<a class="letter" href="#S">S</a>'+
           '<a class="letter" href="#T">T</a>'+
           '<a class="letter" href="#U">U</a>'+
           '<a class="letter" href="#V">V</a>'+
           '<a class="letter" href="#W">W</a>'+
           '<a class="letter" href="#X">X</a>'+
           '<a class="letter" href="#Y">Y</a>'+
           '<a class="letter" href="#Z">Z</a>'+
           '</div></div>'+
           '</div>'+
           '</div>'+
           '<ul class="city-list-searched" style="display: none;">'+
           '</ul>'+
           '</div>';
           wrapDiv.innerHTML = frameStr;
           allWrap.appendChild(wrapDiv);
       },
          
       selectCity : function (data) {
            var _city;
            if(data.filterColumn=="countryCode" && data.value == "NOTCN"){
                _city=_ExHotCity;
            }else if (data.filterColumn=="countryCode" && data.value == "CN"){
                _city=_InHotCity;
            }else{
                _city=_InHotCity;
            }
            return _city;
        },
       getHotCity:function(type){
           var that = this;
           var filter ={};
           filter.filterColumn = "countryCode";
           filter.value = type;
           var _city = this.selectCity(filter);
           
           var  data = JSON.stringify(_city);
           vlm.loadJson("",data,fns);

           function fns(result){
               var status = {};
                var p = result;
                status = p;
                if (!p.success) {

                    return callback(cityresult, status.success, status.message);
                }
                //结果集合过滤器
                //var cityresult = filterCity(p, dataObj);
                var cityresult = p.data;
                //将结果返回callback
                return callback(cityresult, status.success, status.message);
           }
           function callback(arg,status,statusMsg){
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
                   dCityListStr += '<li class="city-list-details-info d'+temp.toUpperCase()+'-Link"><a class="target" name="'+temp.toUpperCase()+'"></a><h4>'+temp.toUpperCase()+'</h4><ul class="city-list-details-content">';
                   for(var j = 0;j< domesticCitiesData[temp].length;j++){
                       dCityListStr+='<li class="city-list-name city-word">'+domesticCitiesData[temp][j].CityName+'</li>';
                   }
                   dCityListStr +='</ul>';
               }
           }
           for(var t in internationalCitiesData){
               iCityListStr += '<li class="city-list-details-info d'+t.toUpperCase()+'-Link"><a class="target" name="IN'+t.toUpperCase()+'"></a><h4>'+t.toUpperCase()+'</h4><ul class="city-list-details-content">';
               for(var n = 0;n < internationalCitiesData[t].length; n++){
                   iCityListStr+='<li class="city-list-name city-word">'+internationalCitiesData[t][n].CityName+'</li>';
               }
               iCityListStr +='</ul>';
           }

           dCityList.innerHTML = dCityListStr;
           iCityList.innerHTML = iCityListStr;
       },

       createHisCity:function(){
           var dCityData = this.storageUtil.get('dHisCity');
           var iCityData = this.storageUtil.get('iHisCity');
           var createEle = function(cityData){
               var outerEle = (cityData.type == "demestic")?document.querySelector('.d-his-city-ele'):document.querySelector('.i-his-city-ele');
               var opEle = outerEle.querySelector('.city-content'),liStr ='';
               if(cityData.data.length>0){
                   for(var m = 0; m < cityData.data.length; m++){
                       liStr +='<li class="city-content-item focus">'+cityData.data[m]+'</li>'
                   }
                   opEle.innerHTML =liStr;
                   outerEle.style.display = 'block';
               }
               };
           if(dCityData!=null&&dCityData!=undefined){
               createEle(dCityData);}
           if(iCityData!==null&&iCityData!=undefined){
               createEle(iCityData);}
       },
       historyChooseHandler:function(arg,type){
           console.log(arg)
           console.log(type)
          var ul = document.querySelector('.domestic-city').style.display =='block'?document.querySelector('.d-his-city-ele ul'):document.querySelector('.i-his-city-ele ul');
          var outLi = document.querySelector('.domestic-city').style.display =='block'?document.querySelector('.d-his-city-ele'):document.querySelector('.i-his-city-ele');
          var dCityData = this.storageUtil.get('dHisCity');
          var iCityData = this.storageUtil.get('iHisCity');
          Array.prototype.distinct=function(){
               var sameObj=function(a,b){
                   var tag = true;
                   if(!a||!b)return false;
                   for(var x in a){
                       if(!b[x])
                           return false;
                       if(typeof(a[x])==='object'){
                           tag=sameObj(a[x],b[x]);
                       }else{
                           if(a[x]!==b[x])
                               return false;
                       }
                   }
                   return tag;
               };
               var newArr=[],obj={};
               for(var i=0,len=this.length;i<len;i++){
                   if(!sameObj(obj[typeof(this[i])+this[i]],this[i])){
                       newArr.push(this[i]);
                       obj[typeof(this[i])+this[i]]=this[i];
                   }
               }
               return newArr;
           };
          var liStr='',that = ticketIndexModal, n=[];
           if(type == 'domestic'){
               if(dCityData==undefined){
                   n.push(arg[0]);
               }else{
                   n =  dCityData.data;
                   n.push(arg[0]);
                   n = n.distinct();
                   n =  n.length>3?n.slice(1):n;
               }
               that.storageUtil.set('dHisCity',{type:"demestic",data:n})
           }else{
               if(iCityData==undefined){
                   n.push(arg[0]);
               }else{
                   n =  iCityData.data;
                   n.push(arg[0]);
                   n = n.distinct();
                   n =  n.length>3?n.slice(1):n;
               }
               that.storageUtil.set('iHisCity',{type:"international",data:n})
           }

           for(var m = 0; m < n.length; m++){
               liStr +='<li class="city-content-item focus">'+n[m]+'</li>'
           }
           ul.innerHTML =liStr;
           outLi.style.display ='block';},
       eventHandle2:function(){
           var that = ticketIndexModal;
           var outDiv = document.querySelector('.city-list-choose');
           var cityInputZone = document.querySelector('#city-input-zone');
           var position = document.querySelector('.cur-word');
           var chTab = document.querySelector('.c-htab');
           var domesticCity = document.querySelector('.domestic-city');
           var internationalCity = document.querySelector('.international-city');
           var cityListSearchedEle = document.querySelector('.city-list-searched');
           var airContent=document.querySelector('.air_content');
           var  aCabs = document.querySelectorAll('.cabin-wrap');
           var oAir=document.querySelector('.mask');
           var header = document.querySelector('.clearfix');
           domesticCity.style.display='block';
           internationalCity.style.display='none';
           this.addHandler(airContent,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement,that = this,eleUl,eleLi,opSpan,opSiteEle,childEle, childAdd;
               var showLine = document.querySelector('#show-result-tip');
               if(target.className.indexOf("add-minus-per-more adult")>-1){
                   eleUl = target.parentNode.parentNode.parentNode;
                   eleLi = target.parentNode.parentNode;
                   opSiteEle = target.parentNode.querySelector('.add-minus-per-less');
                   opSpan = target.parentNode.querySelector('.add-minus-per-content.adult-number');
                   var adultNum = parseInt(opSpan.innerHTML);
                   var childNum = parseInt(eleUl.querySelectorAll('li')[1].querySelector('.add-minus-per-content.child-number').innerHTML);
                      childAdd = eleUl.querySelectorAll('li')[1].querySelector('.add-minus-per-more.child');
                   if(adultNum+1+childNum>9){
                       target.className = "add-minus-per-more adult add-minus-per-more-grey";
                       showLine.innerHTML = "乘客总数不能超过 9 人!";
                       showLine.style.display = 'block';
                       that.timer9 = window.setTimeout(function(){
                           showLine.style.display = 'none';
                           window.clearTimeout(that.timer9);
                           that.timer9 = null;
                       },3000);
                       opSiteEle.className = "add-minus-per-less adult";
                   }else{
                       if(childNum!=0&&((adultNum+1)/childNum)<1/2){
                           showLine.innerHTML = "1 位成人最多携带 2 名儿童!!";
                           showLine.style.display = 'block';
                           that.timer10 = window.setTimeout(function(){
                               showLine.style.display = 'none';
                               window.clearTimeout(that.timer10);
                               that.timer10 = null;
                           },3000);
                           alert("")
                       }else {
                           opSpan.innerHTML = adultNum+1;
                           opSiteEle.className = "add-minus-per-less adult";
                           childAdd.className = "add-minus-per-more child";
                       }
                   }
               }else if(target.className.indexOf("add-minus-per-less adult")>-1){
                   eleUl = target.parentNode.parentNode.parentNode;
                   eleLi = target.parentNode.parentNode;
                   opSiteEle = target.parentNode.querySelector('.add-minus-per-more');
                   opSpan = target.parentNode.querySelector('.add-minus-per-content.adult-number');
                   childEle = eleUl.querySelectorAll('li')[1].querySelector('.add-minus-per-content.child-number');
                   childAdd = eleUl.querySelectorAll('li')[1].querySelector('.add-minus-per-more.child');
                   var adultNum = parseInt(opSpan.innerHTML);
                   var childNum = parseInt(childEle.innerHTML);
                   if(adultNum<=1){
                       opSpan.innerHTML = 1;
                       target.className = "add-minus-per-less adult add-minus-per-less-grey";
                       opSiteEle.className = "add-minus-per-more adult";
                   }else{
                       adultNum--;
                       opSpan.innerHTML = adultNum;
                       if (childNum != 0&&(adultNum/childNum<1/2)) {
                           childEle.innerHTML = adultNum*2;
                           childAdd.className = 'add-minus-per-more child add-minus-per-more-grey'
                       }
                       opSiteEle.className = "add-minus-per-more adult";
                   }
               }else if(target.className.indexOf("add-minus-per-more child")>-1){
                   eleUl = target.parentNode.parentNode.parentNode;
                   eleLi = target.parentNode.parentNode;
                   opSiteEle = target.parentNode.querySelector('.add-minus-per-less');
                   opSpan = target.parentNode.querySelector('.add-minus-per-content.child-number');
                   var  childNum = parseInt(opSpan.innerHTML);
                   var  adultNum = parseInt(eleUl.querySelectorAll('li')[0].querySelector('.add-minus-per-content.adult-number').innerHTML);
                   if(adultNum+1+childNum>9){
                       target.className = "add-minus-per-more child add-minus-per-more-grey";
                       showLine.innerHTML = "乘客总数不能超过 9 人!";
                       showLine.style.display = 'block';
                       that.timer11 = window.setTimeout(function(){
                           showLine.style.display = 'none';
                           window.clearTimeout(that.timer11);
                           that.timer11 = null;
                       },3000);
                       opSiteEle.className = "add-minus-per-less child";
                   }else{
                       if(childNum!=0&&adultNum/(childNum+1)<1/2){
                           showLine.innerHTML = "1 位成人最多携带 2 名儿童!";
                           showLine.style.display = 'block';
                           that.timer13 = window.setTimeout(function(){
                               showLine.style.display = 'none';
                               window.clearTimeout(that.timer13);
                               that.timer13 = null;
                           },3000);
                           target.className = "add-minus-per-more child add-minus-per-more-grey";
                       }else {
                           opSpan.innerHTML = childNum+1;
                           opSiteEle.className = "add-minus-per-less child";
                       }
                   }
               }else if(target.className.indexOf("add-minus-per-less child")>-1){
                   eleUl = target.parentNode.parentNode.parentNode;
                   eleLi = target.parentNode.parentNode;
                   opSiteEle = target.parentNode.querySelector('.add-minus-per-more');
                   opSpan = target.parentNode.querySelector('.add-minus-per-content.child-number');
                   var childNum = parseInt(opSpan.innerHTML);
                   var adultNum = parseInt(eleUl.querySelectorAll('li')[0].querySelector('.add-minus-per-content.adult-number').innerHTML);
                   if(childNum-1<=0){
                       opSpan.innerHTML = 0;
                       target.className = "add-minus-per-less child add-minus-per-less-grey";
                       opSiteEle.className = "add-minus-per-more child";
                   }else {
                       if (childNum!=0&&(adultNum/(childNum-1)<1/2)) {
                           showLine.innerHTML = "1 位成人最多携带 2 名儿童!";
                           showLine.style.display = 'block';
                           that.timer12 = window.setTimeout(function(){
                               showLine.style.display = 'none';
                               window.clearTimeout(that.timer12);
                               that.timer12 = null;
                           },3000);
                       } else {
                           opSpan.innerHTML = childNum-1;
                           opSiteEle.className = "add-minus-per-more child";
                       }
                   }
               }
           });
           this.addHandler(cityListSearchedEle,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               var outLi = target,cityNameEle,str;
                while(outLi.tagName!="LI"&&target.tagName=="SPAN"){
                           outLi = outLi.parentNode;
                  }
                 cityNameEle = outLi.querySelector('.result-city-name');
                 if(cityNameEle.querySelector('.high-light-letter')!=null){
                    var reg = /([\u4e00-\u9fa5]*)<.*>([\u4e00-\u9fa5]{1,})<.*>([\u4e00-\u9fa5]*)/g;
                    var regRe =reg.exec(cityNameEle.innerHTML);
                     str = regRe[1]+regRe[2]+regRe[3];
                }else{
                     str = cityNameEle.innerHTML;
                 }

               if (domesticCity.style.display == 'block') {
                       that.dhisChoosePool.push(str);
                       that.historyChooseHandler(that.dhisChoosePool);
                    } else {
                       that.ihisChoosePool.push(str);
                       that.historyChooseHandler(that.ihisChoosePool);
                   }
               cityInputZone.value = str;
               that.timer3 = window.setTimeout(function(){
                   outDiv.style.display = 'none';
                   document.querySelector('.air_content').style.display='block';
                   that.celement.innerHTML= cityInputZone.value;
                   window.clearTimeout(that.timer3);
                   that.timer3 = null;
               },1000);
           });
           this.addHandler(chTab,'click',function(event){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.className=='singleTrip'){
                   target.className='singleTrip addFontStyle';
                   target.parentNode.querySelector('.doubleTrip').className ='doubleTrip';
                   domesticCity.style.display = 'block';
                   internationalCity.style.display = 'none';
                   var rightOuter = document.querySelector('.right-side');
                   rightOuter.innerHTML = '<div class="cur-word"><div class="special-tip"><span class="cur-city"><a href="#CURR">当前</a></span><span class="his-city"><a href="#HIST">历史</a></span><span class="re-hot-city"><a href="#HOTT">热门</a></span></div><div class="city-pin-fir"><div><a class="letter" href="#A">A</a><a class="letter" href="#B">B</a><a class="letter" href="#C">C</a><a class="letter" href="#D">D</a><a class="letter" href="#E">E</a><a class="letter" href="#F">F</a><a class="letter" href="#G">G</a><a class="letter" href="#H">H</a><a class="letter" href="#I">I</a><a class="letter" href="#J">J</a><a class="letter" href="#K">K</a><a class="letter" href="#L">L</a><a class="letter" href="#M">M</a><a class="letter" href="#N">N</a><a class="letter" href="#O">O</a><a class="letter" href="#P">P</a><a class="letter" href="#Q">Q</a><a class="letter" href="#R">R</a><a class="letter" href="#S">S</a><a class="letter" href="#T">T</a><a class="letter" href="#U">U</a><a class="letter" href="#V">V</a><a class="letter" href="#W">W</a><a class="letter" href="#X">X</a><a class="letter" href="#Y">Y</a><a class="letter" href="#Z">Z</a></div></div></div></div>';

               }else if(target.className=='doubleTrip'){
                   target.className='doubleTrip addFontStyle';
                   domesticCity.style.display = 'none';
                   target.parentNode.querySelector('.singleTrip').className ='singleTrip';
                   internationalCity.style.display = 'block';
                   var rightOuter = document.querySelector('.right-side');
                   rightOuter.innerHTML = '<div class="cur-word"><div class="special-tip"><span class="cur-city"><a href="#ICURR">当前</a></span><span class="his-city"><a href="#IHIST">历史</a></span><span class="re-hot-city"><a href="#IHOTT">热门</a></span></div><div class="city-pin-fir"><div><a class="letter" href="#INA">A</a><a class="letter" href="#INB">B</a><a class="letter" href="#INC">C</a><a class="letter" href="#IND">D</a><a class="letter" href="#INE">E</a><a class="letter" href="#INF">F</a><a class="letter" href="#ING">G</a><a class="letter" href="#INH">H</a><a class="letter" href="#INI">I</a><a class="letter" href="#INJ">J</a><a class="letter" href="#INK">K</a><a class="letter" href="#INL">L</a><a class="letter" href="#INM">M</a><a class="letter" href="#INN">N</a><a class="letter" href="#INO">O</a><a class="letter" href="#INP">P</a><a class="letter" href="#INQ">Q</a><a class="letter" href="#INR">R</a><a class="letter" href="#INS">S</a><a class="letter" href="#INT">T</a><a class="letter" href="#INU">U</a><a class="letter" href="#INV">V</a><a class="letter" href="#INW">W</a><a class="letter" href="#INX">X</a><a class="letter" href="#INY">Y</a><a class="letter" href="#INZ">Z</a></div></div></div></div>';
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
               if(domesticCity.style.display=='block'&&internationalCity.style.display=='none'){

                   if(target.tagName=='SPAN'&&target.className.indexOf('letter')>-1&&document.querySelector(".d"+target.innerHTML+"-Link")){
                       document.querySelector(".d"+target.innerHTML+"-Link").scrollIntoView(true)
                   }else if(target.tagName=='SPAN'&&target.className.indexOf('city')>-1){
                       document.querySelector(".d-"+target.className).scrollIntoView(true);
                   }
               }else if(domesticCity.style.display=='none'&&internationalCity.style.display=='block'){
                   if(target.tagName=='SPAN'&&target.className.indexOf('letter')>-1&&document.querySelector(".i"+target.innerHTML+"-Link")){
                       document.querySelector(".i"+target.innerHTML+"-Link").scrollIntoView(true)
                   }else if(target.tagName=='SPAN'&&target.className.indexOf('city')>-1){
                       document.querySelector(".i-"+target.className).scrollIntoView(true);
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
                   document.querySelector('.air_content').style.display='block';
               }else if(target.className.indexOf('city-word')!=-1){
                   if(domesticCity.style.display=='block'){
                       that.dhisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.dhisChoosePool,"domestic");
                   }else{
                       that.ihisChoosePool.push(target.innerHTML);
                       that.historyChooseHandler(that.ihisChoosePool,"international");
                   }
                   cityInputZone.value = target.innerHTML;
                   that.timer2 = window.setTimeout(function(){
                       outDiv.style.display = 'none';
                       document.querySelector('.air_content').style.display='block';
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
          var valueStr = cityInputZone.value,resultStr = '',reg = /[A-Za-z]{2,}|[\u4e00-\u9fa5]{1,}/;
          Array.prototype.distinct=function(){
               var sameObj=function(a,b){
                   var tag = true;
                   if(!a||!b)return false;
                   for(var x in a){
                       if(!b[x])
                           return false;
                       if(typeof(a[x])==='object'){
                           tag=sameObj(a[x],b[x]);
                       }else{
                           if(a[x]!==b[x])
                               return false;
                       }
                   }
                   return tag;
               };
               var newArr=[],obj={};
               for(var i=0,len=this.length;i<len;i++){
                   if(!sameObj(obj[typeof(this[i])+this[i]],this[i])){
                       newArr.push(this[i]);
                       obj[typeof(this[i])+this[i]]=this[i];
                   }
               }
               return newArr;
           };
          var searchResult = [];
          if(reg.test(valueStr)){
               if(domesticCity.style.display=='block'&&internationalCity.style.display=='none'){
                     for(var k = 0; k < domesticCities.length;k++){
                           for(var t in domesticCities[k]){
                               if(domesticCities[k][t].toLowerCase().indexOf(valueStr.toLowerCase()) > -1){
                                   searchResult.push(domesticCities[k])
                               }
                           }
                     }
               }else{
                   for(var p = 0; p < internationalCities.length; p++){
                       if(internationalCities[p]['CityName'].toLowerCase().indexOf(valueStr.toLowerCase())>-1||internationalCities[p]['FullSpellingName'].toLowerCase().indexOf(valueStr.toLowerCase())>-1||internationalCities[p]['CityEN'].toLowerCase().indexOf(valueStr.toLowerCase())>-1){
                           searchResult.push(internationalCities[p]);
                       }
                   }
               }
              searchResult = searchResult.distinct();
              if(!searchResult.length){
                  resultStr +='<li class="city-list-searched-item">无搜索结果</li>';
              }else{
                  for(var l = 0;l<searchResult.length;l++){
                      var operatingStr='', front='', middle='', back='';
                      if(/[A-Za-z]+/.test(valueStr)){
                             if((searchResult[l].FullSpellingName.toUpperCase()).indexOf(valueStr.toUpperCase())>-1){
                                 operatingStr = searchResult[l].FullSpellingName;
                                 front = operatingStr.substring(0,operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()));
                                 middle = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()),operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                                 back = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                                 resultStr += '<li class="city-list-searched-item"><span class="result-city-name">'+searchResult[l].CityName+'</span><span class="result-city-name-letter">'+front+'<span class="high-light-letter">'+middle+'</span>'+back+'</span></li>'
                             }else if(searchResult[l].CityEN.toUpperCase().indexOf(valueStr.toUpperCase())>-1){
                                 operatingStr = searchResult[l].CityEN;
                                 front = operatingStr.substring(0,operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()));
                                 middle = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()),operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                                 back = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                                 resultStr += '<li class="city-list-searched-item"><span class="result-city-name">'+searchResult[l].CityName+'</span><span class="result-city-name-letter">'+front+'<span class="high-light-letter">'+middle+'</span>'+back+'</span></li>'
                             }
                      } else if(/[\u4E00-\u9FA5]/.test(valueStr)){
                           operatingStr = searchResult[l].CityName;
                           front = operatingStr.substring(0,operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()));
                           middle = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase()),operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                           back = operatingStr.substr(operatingStr.toUpperCase().indexOf(valueStr.toUpperCase())+valueStr.length);
                          resultStr += '<li class="city-list-searched-item"><span class="result-city-name chinese-city-name-fix">'+front+'<span class="high-light-letter">'+middle+'</span>'+back+'</span><span class="result-city-name-letter chinese-city-spellname-fix">'+searchResult[l].FullSpellingName+'</span></li>'
                      }
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
               r =new Date( d.setDate(d.getDate() + 2)),
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
           startStrMonth = parseInt(s.getMonth() +1) >= 10 ?parseInt(s.getMonth() +1):'0'+parseInt(s.getMonth() +1);
           startStrDate = parseInt(s.getDate()) >= 10 ?parseInt(s.getDate()):'0'+parseInt(s.getDate());
           endStrMonth = parseInt(r.getMonth() +1) >= 10 ?parseInt(r.getMonth() +1):'0'+parseInt(r.getMonth() +1);
           endStrDate = parseInt(r.getDate()) >= 10 ?parseInt(r.getDate()):'0'+parseInt(r.getDate());
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
           this.createHisCity();
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
