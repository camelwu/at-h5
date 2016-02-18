(function(win,doc,domesticCities,TicketDate){
    var  InitModal = {
        double:function(){
            var dateStr = document.querySelectorAll('.double-date'),paramStr;
            var paraObj = {
                start:this.reDate(dateStr[0].innerHTML),end:this.reDate(dateStr[1].innerHTML)};
            var dateInitObj = {};

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
            var reg = /(\d{1,2}-\d{1,2})[\s\S]*/g;
            return new Date().getFullYear()+'-'+reg.exec(arg)[1];},

        singleAndDoubleTangle:function(){
            document.querySelector('.hTab').onclick = function(event){
                var event = event || window.event;
                var target = event.target || event.srcElement;
                if(target.className == 'singleTrip'){
                    document.querySelector('#double').style.display = 'none';
                    document.querySelector('#single').style.display = 'block';
                    target.style.borderBottom = '0.2rem solid  rgb(255, 180, 19)';
                    target.style.color = 'rgb(255, 180, 19)';
                    document.querySelector('.doubleTrip').style.borderBottom = 'none';
                    document.querySelector('.doubleTrip').style.color = 'rgb(102, 102, 102)';
                }else if(target.className == 'doubleTrip'){
                    document.querySelector('#single').style.display = 'none';
                    document.querySelector('#double').style.display = 'block';
                    target.style.borderBottom = '0.2rem solid  rgb(255, 180, 19)';
                    target.style.color = 'rgb(255, 180, 19)';
                    document.querySelector('.singleTrip').style.borderBottom = 'none';
                    document.querySelector('.singleTrip').style.color = 'rgb(102, 102, 102)';
                }
            }
        },
        addHandler: function (target, eventType, handle) {

            if (document.addEventListener) {
                InitModal.addHandler = function (target, eventType, handle) {
                    target.addEventListener(eventType, handle, false);
                }
            } else if (document.attachEvent) {
                InitModal.addHandler = function (target, eventType, handle) {
                    target.attachEvent('on' + eventType, function () {
                        handle.call(target);
                    });
                }
            } else {
                InitModal.addHandler = function (target, eventType, handle) {
                    target['on' + eventType] = handle;
                }
            }
            InitModal.addHandler(target, eventType, handle);
        },

        correctingFrontPic:function(){
            var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
            var outerDiv = document.querySelector('.slider');
            var innerUl = document.querySelector('.frontPicUl');
            var oLis = document.querySelectorAll('.frontPicUl>li');
            outerDiv.style.width = innerWidth + 'px';
            outerDiv.style.height = innerHeight*0.325 + 'px';
            innerUl.style.width = (100*oLis.length)+"%";
            for(var i = 0; i< oLis.length;i++){
                oLis[i].style.width = innerWidth + 'px';
            }
            innerUl.style.left = -innerWidth + 'px';
        },

        toTicketList:function(){
            document.querySelector('#ticket-search-button').onclick = function() {
                if (document.querySelector('#double').style.display == 'block') {
                    var dateStr = document.querySelectorAll('.double-date'),paramStr;
                    var paraObj = {
                        start:InitModal.reDate(dateStr[0].innerHTML),end:InitModal.reDate(dateStr[1].innerHTML)};
                    for(var attr in paraObj){
                        paramStr+="&"+attr+"="+paraObj[attr];
                    }
                    paramStr=paramStr.slice(1);
                    document.location.href = 'ticket_double_list.html?'+paramStr;
                } else {
                    document.location.href = 'ticket_single_list.html?'+encodeURIComponent(document.querySelector('#chooseDate-single').innerHTML);
                }

            }
        },
        toCitySearch:function(){
            var cityNames = document.querySelectorAll('.city-search');
            for(var i = 0; i < cityNames.length;i++){
                cityNames[i].onclick=function(){
                    document.location.href='ticket_city_search_list.html';
                }
            }

        },

        carousel:function(){
            var innerUl = document.querySelector('.frontPicUl');
            this.addHandler(innerUl, 'touchstart', this.startHandler);
            this.addHandler(innerUl, 'touchmove', this.moveHandler);
            this.addHandler(innerUl, 'touchend', this.endHandler);
        },

        changeItem:function(itemNum){
            var oSpans = document.querySelectorAll('.item-span');
            for(var i = 0;i<oSpans.length; i++){
                oSpans[i].className='item-span';
            }
            oSpans[itemNum].className = 'item-span dot'
        },

        startHandler: function (e) {
            InitModal.preventDefault(e);
            InitModal.stopPropagation(e);
            if(InitModal.autoTimerInt){
                window.clearInterval(InitModal.autoTimerInt);
                InitModal.autoTimerInt = null;
            }
            if (!InitModal.isAnimation) {
                InitModal.tempStart = e.targetTouches[0].pageX;
            } else {
                InitModal.isAnimation = true;
            }
        },

        moveHandler: function (e) {
            InitModal.preventDefault(e);
            InitModal.stopPropagation(e);
            var innerUl = document.querySelector('.frontPicUl');
            innerUl.style.left = parseFloat(innerUl.style.left) + e.targetTouches[0].pageX - InitModal.tempStart + 'px';
            InitModal.tempStart = e.targetTouches[0].pageX;
        },

        endHandler: function (e) {
            InitModal.preventDefault(e);
            InitModal.stopPropagation(e);
            var minLeftValue = - (document.querySelectorAll('.frontPicLi').length - 2) * window.innerWidth;
            var maxLeftValue = - window.innerWidth;
            var endLeftValue = parseFloat(document.querySelector('.frontPicUl').style.left);
            var distance = endLeftValue - InitModal.tempCurLeft, time = 1000, targetLeft;
            if (distance < 0 && Math.abs(distance) >= window.innerWidth / 4) {
                targetLeft = InitModal.tempCurLeft - window.innerWidth;
            } else if (distance > 0 && Math.abs(distance) >= window.innerWidth / 4) {
                targetLeft = InitModal.tempCurLeft + window.innerWidth;
            } else {
                targetLeft = InitModal.tempCurLeft;
            }

            if (targetLeft > maxLeftValue) {
                targetLeft = maxLeftValue;
            } else if (targetLeft < minLeftValue) {
                targetLeft = minLeftValue;
            }
            time = Math.abs((targetLeft - parseFloat(document.querySelector('.frontPicUl').style.left)) / window.innerWidth) * time;
            InitModal.tempCurLeft = targetLeft;
            $('.frontPicUl').animate({'left': targetLeft}, time);
            InitModal.changeItem(Math.abs(Math.floor(targetLeft / window.innerWidth))-1);
            InitModal.isAnimation = false;
            InitModal.autoMove();
        },

        autoMove:function(){
            var innerUl = document.querySelector('.frontPicUl');
            var slider = document.querySelector('.slider');
            var minLeftValue = -(document.querySelectorAll('.frontPicLi').length - 2) * window.innerWidth;
            var maxLeftValue = -window.innerWidth;
            var maxNum = document.querySelectorAll('.slider li').length-2;
            function animate(offset){
                InitModal.isAnimation = true;
                var newLeft = parseInt(innerUl.style.left) + offset;
                var time = 500,interval = 10,num;
                var speed = offset/(time/interval);
                function go(){
                    window.clearTimeout(InitModal.autoTimerOut);
                    InitModal.autoTimerOut = null;
                    if( (speed < 0 && parseInt(innerUl.style.left) > newLeft) || (speed > 0 && parseInt(innerUl.style.left) < newLeft)){
                        innerUl.style.left = parseInt(innerUl.style.left) + speed + 'px';
                        InitModal.autoTimerOut = setTimeout(go,interval);
                    }
                    else{
                        InitModal.isAnimation = false;
                        innerUl.style.left = newLeft   +'px';
                        if(newLeft > maxLeftValue ){
                            innerUl.style.left = minLeftValue + 'px';
                        }
                        if(newLeft < minLeftValue){
                            innerUl.style.left = maxLeftValue + 'px';
                        }
                    }
                    num = Math.abs(Math.floor(parseFloat(innerUl.style.left)/ window.innerWidth));
                    num = num >= maxNum?0:num;
                    InitModal.changeItem(num);
                }
                go();
            }

            function tricter(){
                if(!InitModal.isAnimation){
                    animate(-window.innerWidth);
                }
            }
            InitModal.autoTimerInt = setInterval(tricter,3000)
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
                oDivs[i].time = 0;
                oDivs[i].current = 0;
                oDivs[i].startStr = oDivs[i].querySelector('.origin ').innerHTML;;
                oDivs[i].endStr = oDivs[i].querySelector('.destination').innerHTML;;
                this.addHandler(oDivs[i], 'click', function(event){
                    var event = event || window.event;
                    var target = event.target || event.srcElement;
                    if(target.className.indexOf('span-target')!=-1){
                        var oSpan = this.querySelector('span');
                        oSpan.style.transition = '0.7s all ease';
                        oSpan.style.transformOrigin = '22px ' + '23px';
                        this.current = (this.current + 180);
                        oSpan.style.transform = 'rotate(' + this.current + 'deg)';
                        if(this.time%2 == 0){
                            this.querySelector('.origin ').innerHTML=this.endStr;
                            this.querySelector('.destination ').innerHTML=this.startStr;
                            this.time++;
                        }else{
                            this.querySelector('.origin ').innerHTML=this.startStr;
                            this.querySelector('.destination ').innerHTML=this.endStr;
                            this.time++;
                        }
                    }

                });
            }
        },

        init:function(){
            /*this.tempCurLeft = 0;*/
            /*this.isAnimation = false;*/
            this.double();
            this.single();
            this.singleAndDoubleTangle();
            /*this.correctingFrontPic();*/
            this.toTicketList();
            this.toCitySearch();
            /*this.carousel();*/
            /*this.autoMove();*/
            this.tangleCity();
            /*this.addHandler(window, 'resize',this.correctingFrontPic);*/
        }
    };

    var  cityListModal = {
        createWrap:function(){
            var wrapDiv = document.createElement('div'),frameStr = '',allWrap = document.querySelector('.all-elements');
            wrapDiv.className = 'city-list-choose';
            frameStr +='<header class="clearfix"><i class="fl"></i>'+
            '<div class="cl_search">'+
            '    <input type="text" placeholder="北京/beijing/bj/bjs/中国"><i></i>'+
            '</div>'+
            '</header>'+
            '<div class="city-content">'+
            '<div class="hTab">'+
            '<div class="singleTrip">国内</div>'+
            '<div class="doubleTrip">国际</div>'+
            '</div>'+

            '<div class="domestic-city">'+
            '<ul class="city-classifying">'+
            '<li class="title-tip"><h4>当前</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '</ul>'+
            '</li>'+
            '<li class="title-tip"><h4>历史选择</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '<li class="city-content-item focus">北京</li>'+
            '<li class="city-content-item focus">北京</li>'+
            '</ul>'+
            '</li>'+
            '<li class="title-tip"><h4>热门城市</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '<li class="city-content-item">上海</li>'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '<ul class="city-list-details">'+
            '<li class="city-list-details-info"><h4>A</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">阿巴嘎旗</li>'+
            '<li class="city-list-name">阿坝县</li>'+
            '</ul>'+
            '</li>'+
            '<li class="city-list-details-info"><h4>B</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">北京</li>'+
            '</ul>'+
            '</li>'+
            '<li class="city-list-details-info"><h4>C</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">沧州</li>'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '<div class="international-city">'+
            '<ul class="city-classifying">'+
            '<li class="title-tip"><h4>当前</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '</ul>'+
            '</li>'+
            '<li class="title-tip"><h4>历史选择</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '</ul>'+
            '</li>'+
            '<li class="title-tip"><h4>热门城市</h4>'+
            '<ul class="city-content">'+
            '<li class="city-content-item focus">北京</li>'+
            '<li class="city-content-item">上海</li>'+
            '<li class="city-content-item">广州</li>'+
            '<li class="city-content-item">深圳</li>'+
            '<li class="city-content-item">成都</li>'+
            '<li class="city-content-item">杭州</li>'+
            '<li class="city-content-item">武汉</li>'+
            '<li class="city-content-item">西安</li>'+
            '<li class="city-content-item">厦门</li>'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '<ul class="city-list-details">'+
            '<li class="city-list-details-info"><h4>A</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">阿巴嘎旗</li>'+
            '</ul>'+
            '</li>'+
            '<li class="city-list-details-info"><h4>B</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '<li class="city-list-name">北京</li>'+
            '<li class="city-list-name">包头</li>'+
            '</ul>'+
            '</li>'+

            '<li class="city-list-details-info"><h4>C</h4>'+
            '<ul class="city-list-details-content">'+
            '<li class="city-list-name">承德</li>'+
            '<li class="city-list-name">池州</li>'+
            '<li class="city-list-name">沧州</li>'+
            '<li class="city-list-name">承德</li>'+
            '<li class="city-list-name">池州</li>'+
            '<li class="city-list-name">沧州</li>'+
            '<li class="city-list-name">承德</li>'+
            '<li class="city-list-name">池州</li>'+
            '<li class="city-list-name">沧州</li>'+
            '<li class="city-list-name">承德</li>'+
            '<li class="city-list-name">池州</li>'+
            '<li class="city-list-name">沧州</li>'+
            '<li class="city-list-name">承德</li>'+
            '<li class="city-list-name">池州</li>'+
            '<li class="city-list-name">沧州</li>'+
            '</ul>'+
            '</li>'+
            '</ul>'+
            '</div>'+

            '<div class="right-side">'+
            '<div class="cur-word">'+
            '<span>当前</span><span>历史</span><span>热门</span>'+
            '<span class="letter">A</span>'+
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
            '<span class="letter">Z</span>'+
            '</div>'+
            '</div>'+
            '<ul class="city-list-searched" style="display: none;">'+
            '<li class="city-list-searched-item">北京</li>'+
            '<li class="city-list-searched-item">北海道</li>'+
            '<li class="city-list-searched-item">台北</li>'+
            '<li class="city-list-searched-item">北海</li>'+
            '<li class="city-list-searched-item">北海</li>'+
            '</ul>'+
            '</div>';
            wrapDiv.innerHTML = frameStr;
            allWrap.appendChild(wrapDiv);
        },

        addContent:function(){

        },


        init:function(){
            this.createWrap();
            this.addContent();
        }

    };



    InitModal.init();
    cityListModal.init();

})(window,document,domesticCities,TicketDate);