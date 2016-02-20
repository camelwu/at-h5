/**
 * Created by zhouwei on 2016/2/20.
 */
//(function(){
//    var obj=[]
//    var info=getPaymentDetails();
//    obj.BookingRefNo=1111;
//    obj.PaymentDetails=CardInfo;
//
//    alert(CardInfo);
//})
$(document).ready(function(){

})
function getPaymentDetails(){
    //定义行用卡结构
    var cardInfo={
        "CardType":111,
        "CardHolderName":$(".fill-content").find("li input").eq(0).val(),
        "CardNumber":$(".fill-content").find("li input").eq(1).val(),
        "CardIssuanceBank":$(".fill-content").find("li input").eq(2).val(),
        "CardIssuanceCountryCode":$(".fill-content").find("li input").eq(3).val(),
        "CardExpiryDate":$(".fill-content").find("li input").eq(4).val(),
        "CardSecurityCode":$(".fill-content").find("li input").eq(5).val(),
        "CardContactNumber":$(".fill-content").find("li input").eq(6).val(),
        "CardAddress":$(".fill-content").find("li input").eq(7).val(),
        "CardAddressPostalCode":$(".fill-content").find("li input").eq(8).val(),
        "CardAddressCountryCode":$(".fill-content").find("li input").eq(9).val(),
        "CardAddressCity":22,
    }
    return cardInfo;
}
$(".s-btn").on("click",function(){
    var info=getPaymentDetails();

    var data={
        "Parameters":info,
        "ForeEndType": 3,
        "Code": "0012"
    };
    console.log(data);
    //var payment=new paymentObj(data,mycallback);
    //payment.handlePayment();
})