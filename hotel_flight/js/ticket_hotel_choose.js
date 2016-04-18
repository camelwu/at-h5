var ticketHotel = {
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
    tAjax: function (questUrl, data, Code, ForeEndType, Callback, loadMoreSign) {
        var that = this, dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl ? questUrl : that.requestUrl;
        if (loadMoreSign) {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback, false, false, loadMoreSign);
        } else {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        }
    },
    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage, data = localStorage.getItem(key), dataObj = JSON.parse(data);
            return JSON.stringify(dataObj.data);
        }
    },
    eventHandler: function () {
        var detailEle = document.querySelector('.detail-text-arrow'), that = ticketHotel, shadowEle= document.querySelector('.shadow');
        var detailLine = document.querySelector('.summary-cost-modal'), icon=document.querySelector('.icon-arrow');
        var hide = function(){ detailLine.style.bottom = "-50px";
            shadowEle.style.display = 'none';
            icon.className="icon-arrow arrow-down";};
        var show = function(){ detailLine.style.bottom = "50px";
            shadowEle.style.display = 'block';
            icon.className="icon-arrow arrow-up";};
        this.addHandler(detailEle, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            if(target.className=='detail'){
                detailLine.style.webkitTransition = "all 300ms";
                shadowEle.style.display=='block'?hide():show();
            }
        });
        this.addHandler(document, 'click', function (){
            var event = event || window.event;
            var target =target||event.srcElement;
            if(target.className=='shadow'){
                detailLine.style.webkitTransition = "all 300ms";
                shadowEle.style.display=='block'?hide():show();
            }
        });

    },
    //   Ò³ÃæÌø×ª
    nextPage:function(){
        $('.edit-button').click(function(){
            window.location.href = 'index.html';
        })
    },
    init:function () {
        this.eventHandler();
        this.nextPage();
    }
};
ticketHotel.init();