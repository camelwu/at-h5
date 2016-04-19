(function () {

    //加载动画
    function package_detail() {

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();

    //初始化
    function init() {

    var data=JSON.parse(localStorage.flightHotelFirstResult);
    console.log(data);
        function date_format(str){
            var arr=str.split('-');
            var oDate=new Date();
            oDate.setFullYear(arr[0],arr[1],arr[2]);
            return(oDate.getDay());
        }
    //机票详情
    var tpl1=['<li class = "order-lis1">',
        '<span class="order-lis1-l">',
        '<i></i>',
        '<span>机票</span>',
        '</span>',
        '<span class="order-lis1-r">',
        '<span>详情</span>',
        '<i></i>',
        '</span>',
        '</li>',
        '<li class = "order-lis2">',
        '<span class="order-lis2-l">',
        '<i></i>',
        '<span class = "order-ml">{%=flightInfo.flightLeaveStartDate.substring(5,10)%}</span>',
        '<span>{%=flightInfo.flightLeaveStartDate.substring(0,10)%}</span>',
        '<span>浦东T2-洛杉矶</span>',
        '</span>',
        '<span class="order-lis2-r">',
        '<i></i>',
        '<span>11h30m</span>',
        '</span>',
        '</li>',
        '<li class = "order-lis3">',
        '<span class="order-lis3-l">',
        '<i></i>',
        '<span class = "order-ml">01-08</span>',
        '<span>周二</span>',
        '<span>洛杉矶-浦东</span>',
        '</span>',
        '<span class="order-lis3-r">',
        '<i></i>',
        '<span>11h30m</span>',
        '</span>',
        '</li>',
        '<li class = "order-lis4">',
        '<span>',
        '头等舱+往返舱',
        '</span>',
        '</li>',].join('');

        var flightdet=template(tpl1,data);
        $('#order-flight').html(flightdet);
    }

    init();


    //下单
    var orderSub=document.querySelector('.order-submit');
    function hf_order(obj){
        obj.onclick=function(){

            var Parmeters = {
                "Parameters": {
                    "SetID": 1002001,
                    "CacheID": 1013226,
                    "CityCodeFrom": "SIN",
                    "CityCodeTo": "BKK",
                    "DepartDate": "2016-04-25T00:00:00",
                    "ReturnDate": "2016-04-27T00:00:00",
                    "HotelID": 96,
                    "RoomID": 108450,
                    "MemberId": "84587",
                    "RoomDetails": [{"Adult": 2, "ChildWithoutBed": [6]}, {"Adult": 1}, {"Adult": 1}],
                    "TravellerInfo": [{
                        "PassengerType": "ADULT",
                        "SexCode": "Ms",
                        "FirstName": "fr1",
                        "LastName": "111",
                        "DateOfBirth": "1990-01-09T00:00:00",
                        "CertificateInfo": {
                            "IdType": 1,
                            "IdCountry": "CN",
                            "IdNumber": "123",
                            "IdActivatedDate": "2017-01-09T00:00:00"
                        },
                        "CountryCode": "CN"
                    }, {
                        "PassengerType": "ADULT",
                        "SexCode": "Ms",
                        "FirstName": "ddd",
                        "LastName": "2222",
                        "DateOfBirth": "1990-01-09T00:00:00",
                        "CertificateInfo": {
                            "IdType": 1,
                            "IdCountry": "CN",
                            "IdNumber": "895333",
                            "IdActivatedDate": "2017-01-09T00:00:00"
                        },
                        "CountryCode": "CN"
                    }, {
                        "PassengerType": "ADULT",
                        "SexCode": "Ms",
                        "FirstName": "kli",
                        "LastName": "2222",
                        "DateOfBirth": "1991-01-09T00:00:00",
                        "CertificateInfo": {
                            "IdType": 1,
                            "IdCountry": "CN",
                            "IdNumber": "453333",
                            "IdActivatedDate": "2017-01-09T00:00:00"
                        },
                        "CountryCode": "CN"
                    }, {
                        "PassengerType": "ADULT",
                        "SexCode": "Ms",
                        "FirstName": "jkk",
                        "LastName": "df",
                        "DateOfBirth": "1989-01-09T00:00:00",
                        "CertificateInfo": {
                            "IdType": 1,
                            "IdCountry": "CN",
                            "IdNumber": "5833333",
                            "IdActivatedDate": "2017-01-09T00:00:00"
                        },
                        "CountryCode": "CN"
                    }],
                    "ContactDetail": {
                        "SexCode": "Ms",
                        "FirstName": "111",
                        "LastName": "111",
                        "Email": "1111",
                        "CountryNumber": "86",
                        "MobilePhone": "12385692356"
                    },
                    "CurrencyCode": "CNY",
                    "TotalPrice": "9664"
                },
                "ForeEndType": 3,
                "Code": "50100004"
            }
            console.log(Parmeters);
            //vlm.loadJson("", JSON.stringify(Parmeters), hotel_flight_back);
        };
    }
    hf_order(orderSub);

    //下单回调函数
    function hotel_flight_back(ret){
        var json=eval('('+ret+')');
        if(json.success)
        {
            alert('success');
            window.localStorage.BookingRefNo=json.BookingRefNo;
            window.localStorage.BookingID=json.BookingID;
        }
    }









})();