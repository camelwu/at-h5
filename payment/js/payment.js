/**
 * Created by zhouwei on 2016/3/31.
 * 支付页面（酒店，机票，酒+景，机+X）
 */
(function(){
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
                    $(".paymentype-session").hide();
                    $(".credit-session").show();
              })

              $(".credit-session .go-back").on("click",function(){
                  $(".paymentype-session").show();
                  $(".credit-session").hide();

              })
              $(".p-but").on("click",function(){
                  $(".paymentype-session").show();
                  $(".credit-session").hide();

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
            vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters),callback);
        };
        /*支付Modle实体*/
        var _modle={

        };
        /*支付方法*/
        var _paymentEvent=function(paymentType){
            $.jAlert.confirm("支付完成前，请不要关闭此支付验证窗口 </br> 支付完成后，请根据你支付的情况点击下面的按钮。","网上支付提示",null,"支付完成","支付出现问题");
            this.data = data;    //post参数对象
            this.handlePayment = function () {
                     return  vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), function(){
                         location.href=data.url;
                });
            };
        };
        /*生成HTML片段*/
        var _generateHtml=function(type,data){
            if(type.id==5){
                var html = template("tpl_flighthotel_detail", data.data);
                $(".p-home").append(html);
            }
            else if(type.id==2){

            }
        }

        /*页面初始化方法*/
        var _initPage=function(){
            var type=_bussinessType[vlm.getpara("type")];
            var bookingRefNo=vlm.getpara("bookingRefNo");
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

