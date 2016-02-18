var ticketPayDetail = {

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

    timeCount:function(){
        var oSpan=document.getElementById('cou-down');
        var n=1800, m, s;
        tick();
        var timer=setInterval(tick,1000);
        function tick(){
            n--;
            m=parseInt(n/60)<10?'0'+parseInt(n/60):parseInt(n/60);
            s=n%60<10?'0'+n%60:n%60;
            oSpan.innerHTML=m+'分钟'+s+'秒';
            if(n<0)
            {
                clearInterval(timer);
                oSpan.innerHTML='结束';
            }
        }
    },

    sliderOption:function(){
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
    cardAction:function(){
        var oCre=document.getElementById('credit-card');
        var arr=[];
        arr=oCre.getElementsByTagName('b');
        for(var i=0;i<arr.length; i++)
        {
            arr[i].onclick=function(){
                var obj=window.event.srcElement;

                if(obj.className == 'p-icon2')
                {
                    for(var i=0;i<arr.length; i++)
                    {
                        arr[i].className='p-icon2';
                    }
                    obj.className='p-icon1';
                }
                else
                {
                    obj.className='p-icon2';
                }
            }
        }
    },

    resultFunction:function(arg){
        console.log(arg)
       document.location.href = 'pay_fail.html';
    },

    addEvent:function(){
        var payButton = document.querySelector('.air-ticket-pay-btn'),that = ticketPayDetail;
        this.addHandler(payButton,'click', function(){
           /* var dataObj = {};  //包含第一次调用de h5页面
            that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.resultFunction);*/
            document.location.href = 'ticket_order_detail.html'
        });
    },
    init:function(){
        this.addEvent();
        this.timeCount();
        this.sliderOption();
        this.cardAction();
    }
};

ticketPayDetail.init();