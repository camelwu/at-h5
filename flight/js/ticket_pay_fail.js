var ticketPayFail = {
    addHandler: function (target, eventType, handle) {
        if (document.addEventListener) {
            ticketPayFail.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            ticketPayFail.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            ticketPayFail.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        ticketPayFail.addHandler(target, eventType, handle);
    },

    addEvent:function(){
        var backHomePage = document.querySelector('.back-home-page');
        var checkOrder = document.querySelector('.check-order');
        this.addHandler(checkOrder,'click', function(){
            document.location.href = 'ticket_order_detail.html';
        });
        this.addHandler(backHomePage,'click', function(){
            document.location.href = 'ticket_index.html';
        });

    },

    init:function(){
        this.addEvent();
    }
};

ticketPayFail.init();