var ticketOrderDetail = {

    CultureName: "zh-CN",

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

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

    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var dataObj =
        {
            Parameters: JSON.stringify(data),
            ForeEndType: ForeEndType,
            Code: Code
        };
        var c = new vcm();
        c.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },

    addEvent:function(){
        var coDiv = document.querySelector('.contact-service');
        var topTel = document.querySelector('.tel-icon');
        var mb = document.querySelector('.mb');
        var contactWrap = document.querySelector('.contact-wrap');
        var cancelButton = document.querySelector('.cancel');
        var callButton = document.querySelector('.call');
        var contactWrapOuter = document.querySelector('.contact-wrap-outer');
        var payButton = document.querySelector('.pay-button');

        this.addHandler(topTel, 'click', function(){
            mb.style.display = 'block';
            contactWrap.style.display = 'block';
        });

        this.addHandler(payButton, 'click', function(){
            document.location.href = 'pay_fail.html'
        });

        this.addHandler(coDiv, 'click', function(){
            var contactWrapOuter = document.createElement('div');
            var str = '<div class="contact-wrap-outer">'+
                '          <div class="clearfix"><i class="fl close-concat"></i>'+
                '               <span>联系客服</span>'+
                '           </div>'+
                '          <div class="enter-contact-text">'+
                '             <textarea maxlength="200" rows="8" placeholder="输入申请内容" autofocus="" required=""></textarea>'+
                '          </div>'+
                '          <div class="tip-button-para">'+
                '            <button type="button" class="contact-button">发送</button>'+
                '          <p class="contact-para">'+
                '                感谢您对我们的信任，我们会在一个工作日内联系您，请耐心等待！'+
                '          </p>'+
                '          </div>'+
                '          </div>';
            contactWrapOuter.className = "contact-wrap-outer";
            contactWrapOuter.innerHTML = str;
            document.body.insertBefore(contactWrapOuter,contactWrap);
        });

        this.addHandler(cancelButton, 'click', function(){
            mb.style.display = 'none';
            contactWrap.style.display = 'none';
        });

        this.addHandler(callButton, 'click', function(){
            mb.style.display = 'none';
            contactWrap.style.display = 'none';
        });

        this.addHandler(document.body, 'click', function(){
               var event = event || window.event;
               var target = event.target || event.srcElement;
               var that = ticketOrderDetail,dataObj ={};
               if(target.className == "fl close-concat"){
                   Boolean(document.querySelector('.contact-wrap-outer'))!=false?document.body.removeChild(document.querySelector('.contact-wrap-outer')):void 0;
               }else if(target.className == "contact-button"){
                   if(document.body.querySelector('textarea').value){
                       dataObj.orderNumber = '12345678';
                       dataObj.contactText = document.body.querySelector('textarea').value;
                       that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, function(){
                           Boolean(document.querySelector('.contact-wrap-outer'))!=false?document.body.removeChild(document.querySelector('.contact-wrap-outer')):void 0;
                       })
                   }else{
                       jAlert('请输入申请内容再发送!', '', function(){})
                   }
               }

        })

    },

    init:function(){
        this.addEvent()
    }
};

ticketOrderDetail.init();