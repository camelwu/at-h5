/**
 * Created by zhouwei on 2016/2/17.
 */
/*������  ֧���ӿڲ��
* ����������
* */

function paymentObj(data,callback) {
    this.data = data;    //post��������
    this.handlePayment = function () {
       return  vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), callback);
    };
}

//(function($) {
//    $.fn.payment = function(options, callback) {
//        var defaults = {
//            data: ''
//        };
//        var opts = $.extend(defaults, options);
//        $(this).each(function() {
//            var res=vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), mycallback);
//        });
//        if(callback) {
//            callback();
//        }
//    };
//})(jQuery);

