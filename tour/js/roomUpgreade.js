var roomUpGrade = {

    CultureName: "zh-CN",

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    eventHandler: function (target, eventType, handle) {
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
        return this;
    },

    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var that = this, dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl ? questUrl : that.requestUrl;
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        return this;
    },

    resetData: function(){
        var data = arguments[0];
        var starWord=function(arg){
            var star="";
            switch(arg[0]){
                case "0":
                    star = "";
                    break;
                case "1":
                    star = "一";
                    break;
                case "2":
                    star = "二";
                    break;
                case "3":
                    star = "三";
                    break;
                case "4":
                    star = "四";
                    break;
                case "5":
                    star = "五";
                    break;
                case "6":
                    star = "六";
                    break;
                default :
                    star = "";
            }
            return star;
        };
       var temp = arguments[0]['starRating'];
       data['starRating'] = starWord(temp);
        return data;
    },
    dateDeal: function () {
        var reg = /\d{4}[/-](\d{1,2})[/-](\d{1,2}).*/;
        var dateD1 = reg.exec(this.curParaObj.CheckInDate);
        var dateD2 = reg.exec(this.curParaObj.CheckOutDate);
        var inStr = dateD1[1]+'-'+dateD1[2];
        var outStr = dateD2[1]+'-'+dateD2[2];
        var time1 = Date.parse(this.curParaObj.CheckInDate.replace(/T.*/g,'')), time2 = Date.parse(this.curParaObj.CheckOutDate.replace(/T.*/g,''));
        var dayNum=(Math.abs(time2 - time1))/1000/60/60/24;
       document.querySelector('.date-in').innerHTML = inStr +'入住';
       document.querySelector('.date-out').innerHTML = outStr +'离店';
       document.querySelector('.day-number').innerHTML = "共"+dayNum+"晚";
       return  this;
    },
    addEvent: function () {
        var nextPage = document.querySelector('.hs-next'), that = roomUpGrade;
        this.eventHandler(nextPage, 'click', function(){
                        document.location.href = 'fill-in-order-new.html'+document.location.search+'&totailPrice='+that.dataInfo.hotels[0].rooms[0].totailPrice+'&roomID='+that.dataInfo.hotels[0].rooms[0].roomID;
        });
    },
    callBack: function () {
        var that = roomUpGrade;
        var tpl1 = [
       '<a href="hotel-summary.html" class="top-pic"><img class="hotelPic" src="../images/hotelDetailerrorpic.png" real-src="{%=hotelPictureURL%}"></a>',
        '<ul id="hd_list" class="d-list">',
        '<li>',
        '<p class="d-score">',
        '<b class="d-icon4"></b> {%=location%}</p>',
        '</li>',
        '<li>',
        '<p class="d-score">{%=starRating%}星级</p>',
        '{% if(data["freeWifi"]){ %}<b class="d-icon2"></b>{% } %}',
        '<a href="{%=moreInfoLink%}" class="d-icon1"></a>',
        '</li>',
        '<li>',
        '<p class="d-p3 date-in">3月22入住</p><p class="d-p3 date-out" style="margin-left: 5px;">3月30离店</p>',
        '<p class="d-p2 day-number">共8晚</p>',
        '</li>',
        '<li>',
        '<ul class="room-list" id="room-list">',
        '</ul>',
        '</li>',
        '</ul>',
        '<a href=" javascript:void(0)" class="hs-next">下一步</a>'
        ].join('');
        var tpl2 =[
            '<li class="hd-hotel">',
            '<img class="hd-choose" src="../images/ui/choose.png">',
            '<div class="d-div3">',
            '<p class="d-p5">标准价</p>',
            '<p class="d-p7">',
            '<span>{% if(data["includedBreakfast"]){ %}无早{% } %}{% if(data["bigBed"]){ %}大床{% } %}{% if(data["cannotCancel"]){ %}不可取消{% } %}</span>' +
            '{% if(data["roomHasNum"]){ %}<span style="color: #fe4716"> 仅剩{%=roomHasNum%}间</span>{% } %}',
            '</p>',
            '</div>',
            '<p class="hd-price">',
            '<span>+￥</span>',
            '<span>{%=markUp%}</span>',
            '</p>',
            '</li>'
        ].join('');
        var resultData = arguments[0],that = roomUpGrade;
        if (resultData.success) {
            if (resultData.data.hotels.length == 0) {
                jAlert("抱歉暂时没有数据", "提示");
            }else{
                console.log(resultData.data)
                var  hotels = that.resetData(resultData.data.hotels[0]);
                var  rooms = resultData.data.hotels[0].rooms[0];
                var tpl_GetList = template(tpl1, hotels);
                var tpl_GetRooms = template(tpl2, rooms);
                that.dataInfo = resultData.data;
                $("#preloader").fadeOut();
                $('#sc-content').html(tpl_GetList);
                $('#room-list').html(tpl_GetRooms);
                that.dateDeal().delayLoadImage().addEvent()
            }
        } else {
            $("#preloader").fadeOut();
            jAlert(resultData.message, "提示");
        }
    },
    delayLoadImage : function(item) {
        var image = document.getElementsByClassName('hotelPic')[0];
        var re_url = image.getAttribute('real-src');
        loadImage(re_url, function() {
            image.setAttribute('src', re_url);
        });
        function loadImage(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function() {
                img.onload = null;
                callback();
            };
        }
        return this;
    },
    createTags: function () {
        var that = this;
        var  paraObj=JSON.parse(window.localStorage.getItem('info'));
        var hotelIDStr = document.location.search.substring(0,document.location.search.indexOf('&')).replace(/\?/,'');
        paraObj.hotelID = hotelIDStr.substring(hotelIDStr.indexOf('=')+1);
        that.curParaObj = paraObj;
        that.tAjax(that.requestUrl, paraObj, '0208', 3, that.callBack);
            return this;
    },
    init: function () {
        this.createTags();
    }
};
roomUpGrade.init();

