/**
 * Created by qzz on 2016/3/3.
 */
(function(){
    //加载动画
    function package_detail(){

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();

    //localStorage.Info
    var jsonPackage=JSON.parse(localStorage.info);
    console.log(jsonPackage);

    var Parmeters=
    {
        "Parameters": {
            "PackageID": localStorage.packageID
        },
        "ForeEndType": 3,
        "Code": "0202"
    }
    //console.log(Parmeters);
    vlm.loadJson("",JSON.stringify(Parmeters),package_tit_back);

    //初始化函数回调
    function package_tit_back(ret){
        var json = eval('('+ret+')');
        console.log(json);
        if(json.success) {
            //套餐名称
            var sceTit=json.data.packageName;
            var sceCpde=json.data.packageRefNo;
            $('.sce-introduce-txt')[0].innerHTML=sceTit+' <span class="sce-introduce-span">'+sceCpde+'</span>';
        }else{
            jAlert(json.message);
        }
    }

    //酒店信息
    var hotel_box=document.querySelector('.hotel_box');
    var hotelTitle='东京动机涩谷卓越大酒店';
    var hotelTime='11月25日 - 11月26日 共1晚(目的地时间为准)';
    hotel_box.innerHTML='<span class="conlist">'+hotelTitle+'</span>'
        +'<span class="conlist">'+hotelTime+'</span>';

    //根据景点数创建景点列表
    var sceNumber=jsonPackage.tourList.length
    for(var i=0;i<sceNumber; i++)
    {
        var oSce=document.createElement('div');
        oSce.className='sce-list-box';
        oSce.innerHTML='<section class="all_title">'
            +'<h3><i>景点'+(i+1)+'</i>杜莎夫人蜡像馆</h3>'
            +'</section>'
            +'<section class="trip_box">'
            +'<span class="conlist">游玩时间：2018.12.25 上午</span>'
            +'</section>'
        $('.sce-list-wrap')[0].appendChild(oSce);
    }

    //订单确认
    var order_pay_btn=document.querySelector('.order_pay_btn');

    function order_sure(obj){
        obj.onclick=function(){

            var Parmeters=
            {
                "Parameters": {
                    "BookingRefNo": "SG17SINFP0136971",
                    "PaymentDetails": {
                        "PaymentMode": "CreditCard",
                        "ReturnURL": "http://localhost/returnpage.aspx",
                        "PayCurrencyCode": "CNY",
                        "PayTotalAmount": "3634.00",
                        "CreditCardDetails": {
                            "CardType": "Visa",
                            "CardHolderName": "Kim Pin",
                            "CardNumber": "4544152000000004",
                            "CardSecurityCode": "123",
                            "CardIssuanceBank": "Citibank",
                            "CardExpiryDate": "2019-02-26T00:00:00",
                            "CardIssuanceCountryCode": "SG",
                            "CardAddress": "Toa Payoh",
                            "CardAddressPostalCode": "7866778",
                            "CardAddressCity": "Singapore",
                            "CardAddressCountryCode": "SG",
                            "CardContactNumber": {
                                "CountryCode": "65",
                                "PhoneNo": "787656767"
                            }
                        }
                    }
                },
                "Method": null,
                "ForeEndType": 3,
                "Code": "0203"
            }

            console.log(Parmeters);
            vlm.loadJson("",JSON.stringify(Parmeters),order_sure_back);

        };
    }

    order_sure(order_pay_btn);

    //订单确认回调
    function order_sure_back(ret){
        var json=eval('('+ret+')');
        console.log(json);
        if(json.success)
        {

            //window.location.href='order-pay.html';
        }
    }


})();
