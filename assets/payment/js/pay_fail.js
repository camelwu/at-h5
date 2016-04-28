//created chaimeili on 2016/04/20
(function(){
    //定义全局变量：订单号、产品名、订单总额
    var type,bookingRefNo;
    /*支付模块（酒店，机票，景点，酒+景，机+酒）*/
    var pay_fail = function(){
        var _bussinessType= {
            "Hotle":{id: 1,detailCode: "0013",name:"Hotle"},
            "Flight":{id: 2,detailCode: "3006",name:"Flight"},
            "Scenic":{id: 3,detailCode: "0095",name:"Scenic"},
            "Tour":{id: 4,detailCode: "0095",name:"Tour"},
            "FlightHotle":{id: 5,detailCode: "50100007",name:"FlightHotle"}
        };
        //页面初始化
        var _init = {
            //页面事件绑定
            bindbindPaymentTypeEvent:function(){
                $("#fl").on("click",function() {
                    window.location.href = "../index.html";
                })
                $("#fr").on("click",function() {
                    window.location.href = "payment.html?bookingRefNo="+bookingRefNo+"&type="+type.name;
                })
                $("#fr2").on("click",function() {
                    window.location.href = "../user/user-allorder.html";
                })
            }
        };
        /*获取订单详情数据*/
        var _getData=function(bussinessType,bookingRefNo,foreEndType,callback){
            var para;
            if(type.id==1){
                 para={
                    "Parameters": {"BookingReferenceNo": bookingRefNo},
                    "ForeEndType":foreEndType,
                    "Code": type.detailCode
                };
            }
            else{
                 para={
                    "Parameters": {"BookingRefNo": bookingRefNo},
                    "ForeEndType":foreEndType,
                    "Code": type.detailCode
                };
            }
            console.log(JSON.stringify(para));
            vlm.loadJson("", JSON.stringify(para),function(data){
                if (data.success) {
                    if(type.id==1){
                        data.data[0].bookingRefNo=data.data[0].bookingReferenceNo;
                        data.data[0].productName=data.data[0].hotelName;
                        data.data[0].totalPrice=parseInt(data.data[0].totalRoomRate);
                    }else if(type.id==2){
                        data.data.productName = data.data.flightInfo.cityNameFrom+"-"+data.data.flightInfo.cityNameTo;
                        data.data.totalPrice=data.data.totalFlightPrice;
                    }
                    else if(type.id==3){
                        data.data.productName=data.data.packageName;
                        var totalPrice=0;
                        for(var i=0;i<=data.data.chargeDetails.length-1;i++){
                            /*计算总额：跳过类型为PAYMENT*/
                            if(data.data.chargeDetails[i].category === 'PAYMENT') {
                                continue;
                            }
                            totalPrice+=data.data.chargeDetails[i].totalAmount;
                        }
                        data.data.totalPrice=totalPrice;
                    }
                    else if(type.id==4){
                        data.data.productName=data.data.packageName;
                        var totalprice=0;
                        for(var i=0;i<=data.data.chargeDetails.length-1;i++){
                            /*计算总额：跳过类型为PAYMENT*/
                            if(data.data.chargeDetails[i].category === 'PAYMENT') {
                                continue;
                            }
                            totalprice+=data.data.chargeDetails[i].totalAmount;
                        }
                        data.data.totalPrice=totalprice;
                    }
                    else if(type.id==5){
                        data.data.productName = data.data.flightInfo.cityNameFrom+"-"+data.data.flightInfo.cityNameTo;
                        data.data.totalPrice=data.data.totalFlightPrice;
                    }
                    var html = template("vlm_login", data.data);
                    $("#vlm_login").html(html);
                }

            });
        };
        //页面初始化方法
        var  _initPage = function(){
            //获取url参数
            type=_bussinessType[vlm.getpara("type")];//业务类型（1酒店，2机票，3景点，4酒+景，5机+景）
            bookingRefNo=vlm.getpara("bookingRefNo");//订单code
            //绑定页面事件
            _init.bindbindPaymentTypeEvent();
            //获取支付数据
            _getData(type,bookingRefNo,3,function(data){
                if (data.success) {
                    data.data.totalPrice=data.data.totalFlightPrice;
                    var html = template("vlm_login", data.data);
                    $("#vlm_login").html(html);
                    vlm.init();
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
    }();

})();