/**
 * Created by 蘅芜君 on 2016/5/24.
 */
(function(){
    var latitude = 0;
    var longitude = 0;
    //传数据
    var data = {
        "parameters": {
            "selectedHotelID":1023696,
            "selectedRoomID":10996872,
            "hotelID":1023716,
            "flightCacheID":3511203,
            "flightSetID":30000001,
            "tours": [
                {
                    "tourID": 134,
                    "travelDate": "2016-06-15T00:00:00",
                    "optionCode": "",
                    "travelDateSpecified": 1
                },
                {
                    "tourID": 136,
                    "travelDate":"2016-06-16T00:00:00",
                    "optionCode": "",
                    "travelDateSpecified": 1
                },
                {
                    "tourID": 166,
                    "travelDate":"2016-06-17T00:00:00",
                    "optionCode": "",
                    "travelDateSpecified": 1
                }
            ],
            "packageID": 483297,
            "cityCodeFrom": "BJS",
            "cityCodeTo": "SIN",
            "departDate": "2016-06-15T00:00:00",
            "returnDate": "2016-06-20T00:00:00",
            "roomDetails": [
                {
                    "adult": 2
                }
            ]
        },
        "foreEndType": 2,
        "code": "60100008"
    };
    //接数据
    vlm.loadJson('',JSON.stringify(data),dataCallBack);
    function dataCallBack(result){
        if(result.success){
            var data = result.data;
            map(data)
            vlm.init();
        }else{
            alert("数据加载错误")
        }
    }
    //  map
    function map(data){
        latitude = data.hotelInfo.latitude-0;
        longitude = data.hotelInfo.longitude-0;
        at.map.createMap(latitude,longitude);
        at.map.markHotel(latitude,longitude,"");
        at.map.moveCenterToHotelLocation(latitude,longitude);
    }

})()
