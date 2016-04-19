/**
 * Created by zhouwei on 2016/3/31.
 * 支付页面（酒店，机票，酒+景，机+X）
 */
(function(){
    var type/*业务类型 */,
        bookingRefNo/*订单号 */,
        paymentMode/*支付模式（10 - CreditCard; 20 - UnionPay; 21 - UnionPayCNY; 30 - AliPay; 31 - AlipayCNY; 40 - PayPal） */,
        cardType/*卡类型（101 - Visa; 102 - Master; 103 - Amex; 104 - JCB; 105 - Diner） */;

    var payment=function(){

        /*支付类型*/
        var paymentType={
            "Visa":{id:1,name:"Visa信用卡"},
            "Mast":{id:2,name:"万事达信用卡"}
        };
        var _bussinessType= {
            "Hotle":{id: 1, name: "酒店", detailCode: "0038", payMentCode: "022"},
            "Flight":{id: 2, name: "机票", detailCode: "0038", payMentCode: "022"},
            "Scenic":{id: 3, name: "景点", detailCode: "0095", payMentCode: "0093"},
            "Tour":{id: 4, name: "酒+景", detailCode: "0206", payMentCode: "022"},
            "FlightHotle":{id: 5, name: "机+酒", detailCode: "50100007", payMentCode: "50100005"}
        };

        var _init={
          bindPaymentTypeEvent:function(){
              $(".p-pay li").on("click",function(){
                    paymentMode=$(this).attr("data-paymentmode") //获取选择支付类型
                    cardType=$(this).attr("data-cardtype")//获取选择卡类型类型

                      //如果在线支付（银联Or支付宝）
                      if(cardType=="undefined" || cardType==undefined){
                            _paymentEvent();
                      }else{
                          $(".paymentype-session").hide();
                          $(".credit-session").show();
                      }
              })

              $(".credit-session .go-back").on("click",function(){
                  $(".paymentype-session").show();
                  $(".credit-session").hide();

              })
              $(".p-but").on("click",function(){
                  _paymentEvent();
              })
          }
        }
        var _getOrderData=function(bussinessType,bookingRefNo,foreEndType,callback){
            var Parameters={
                "Parameters": {
                    "BookingRefNo": bookingRefNo
                },
                "ForeEndType":foreEndType,
                "Code": bussinessType.detailCode
            }
            vlm.loadJson("", JSON.stringify(Parameters),callback);
        };
        /*支付Modle实体*/
        var _modle={
            "cardAddressPostalCode":$(".cardAddressPostalCode").val(),
            "bankName":$(".bankName").val(),
            "countryNumber":"CN",
            "cardAddressCity":$(".cardAddressCity").val(),
            "cardHolderName":$(".cardHolderName").val(),
            "cardExpiryDate":"2018-12-31",
            "cardNumber":$(".cardNumber").val(),
            "MobilePhone":$(".MobilePhone").val(),
            "cardType":cardType,
            "cardSecurityCode":$(".cardSecurityCode").val(),
            "cardCountryCode":"CN",
            "cardAddressCountryCode":$(".CardAddressCountryCode").val(),
            "cardAddress":$(".cardAddress").val()
        };
        /*支付方法  paymentType(支付宝，信用卡)，bussinessType（机票，酒店....）*/
        var _paymentEvent=function(){
            var parameters
            //支付模式为在线支付
            if(paymentMode!=10 &&  paymentMode!=31){
                parameters={
                    "cardInfo":_modle,
                    "bookingRefNo":bookingRefNo,
                    "currencyCode":"CNY",
                    "totalPrice":"4816",
                    "paymentMode":paymentMode
                }
            }else{
                parameters={
                    "cardInfo":{},
                    "bookingRefNo":bookingRefNo,
                    "currencyCode":"CNY",
                    "totalPrice":"4816",
                    "paymentMode":paymentMode
                }
            }
            var param={
                "Code":type.payMentCode,
                "Parameters":{
                    "cardInfo":_modle,
                    "bookingRefNo":bookingRefNo,
                    "currencyCode":"CNY",
                    "totalPrice":"4816",
                    "paymentMode":paymentMode
                },
                "ForeEndType":3
            }

            //$.jAlert.confirm("支付完成前，请不要关闭此支付验证窗口 </br> 支付完成后，请根据你支付的情况点击下面的按钮。","网上支付提示",null,"支付完成","支付出现问题");
            vlm.loadJson("", JSON.stringify(param), function(data){
                    if (data.success) {
                        location.href=data.url;
                    }
                    else{
                        alert(data.message);
                    }
                });

        };
        /*生成HTML片段*/
        var _generateHtml=function(type,data){
            if(type.id==5){
                var html = template("tpl_flighthotel_detail", data.data);
                $(".p-home").append(html);
                //获取详情价格
                var price=$(html).find(".order-price i").html();
                $(".total_price").html(price)
            }
            else if(type.id==2){

            }
        }

        /*页面初始化方法*/
        var _initPage=function(){
            type=_bussinessType[vlm.getpara("type")];
            bookingRefNo=vlm.getpara("bookingRefNo");
            _init.bindPaymentTypeEvent();
            _getOrderData(type,bookingRefNo,3,function(data){
                vlm.init();
                if (data.success) {
                    _generateHtml(type,data);
                }
                else{
                    jAlert("网络请求错误！");
                }
            });
        };
        /*接口*/
        return{
            InitPage:_initPage()
        }
    }()

})()

