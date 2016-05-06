var  hftFlightDetail = {
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

  addEvent:function(){
    var iconBack =  document.querySelector('.icon_back');
    this.addHandler(iconBack, 'click', function () {
      window.history.go(-1);
    });
  },

  init:function(){
    this.addEvent();
  }
};

hftFlightDetail.init();
