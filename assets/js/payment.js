/**
 * Created by zhouwei on 2016/2/17.
 */
/*类名：  支付接口插件
* 功能描述：
* */

function paymentObj(data,callback) {
    $.alerts.confirm("支付完成前，请不要关闭此支付验证窗口 </br> 支付完成后，请根据你支付的情况点击下面的按钮。","网上支付提示",null,"支付完成","支付出现问题");
    this.data = data;    //post参数对象
    this.handlePayment = function () {
       return  vlm.loadJson("", JSON.stringify(data), callback);
    };
}

