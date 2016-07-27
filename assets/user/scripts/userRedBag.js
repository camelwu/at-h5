/**
 * Created by lichengjun on 16/7/26.
 */
(function () {

  var Parameters = {
    "Parameters": "{\"MemberId\":\"" + memberid + "\"}",
    "ForeEndType": 3,
    "Code": "70100032"
  };

  var RedBag = {
    //获取红包   个人中心   酒店/景点 订单填写页

    //点击查看红包列表/可用红包
    init: function (module, afterAppendDom) {
      switch (module) {
        case 'my':
          this.createMy(afterAppendDom);
          break;
        case 'hotel':
          this.createHotel(afterAppendDom);
          break;
        case 'tour':
          this.createTour(afterAppendDom);
          break;
      }
    },

    createMy: function (afterAppendDom) {
      
    },
    createHotel: function (afterAppendDom) {

    },
    createTour: function (afterAppendDom) {

    }

  };
})();


// redBag.init("my",afterAppendDom);
// redBag.init("hotel",afterAppendDom);
// redBag.init("tour",afterAppendDom);
