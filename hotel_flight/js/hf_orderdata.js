
var data= {
    "flightInfo": {
        "setID": 1002001,
        "cacheID": 1013262,
        "segmentsLeaveTotalTravelTime": 225,
        "segmentsLeaveTotalTravelTimeString": "2h25m",
        "segmentsReturnTotalTravelTime": 225,
        "segmentsReturnTotalTravelTimeString": "2h25m",
        "cityCodeFrom": "SIN",
        "cityCodeTo": "BKK",
        "cityNameFrom": "新加坡",
        "cityNameTo": "曼谷",
        "isLeaveShareFlight": 0,
        "isReturnShareFlight": 0,
        "isInternationalFlight": 1,
        "flightLeaveStartDate": "2016-05-10T16:00:00",
        "flightLeaveEndDate": "2016-05-10T17:25:00",
        "flightReturnStartDate": "2016-05-15T09:40:00",
        "flightReturnEndDate": "2016-05-15T13:05:00",
        "flightLeaveSpacingDay": 0,
        "flightReturnSpacingDay": 0,
        "segmentsLeave": [{
            "airportCodeFrom": "SIN",
            "airportCodeTo": "BKK",
            "cityCodeFrom": "SIN",
            "cityCodeTo": "BKK",
            "airportNameFrom": "新加坡樟宜机场",
            "airportNameTo": "曼谷苏瓦纳蓬国际机场",
            "cityNameFrom": "新加坡",
            "cityNameTo": "曼谷",
            "airCorpCode": "SQ",
            "airCorpName": "新加坡航空",
            "flightNo": "976",
            "departDate": "2016-05-10T16:00:00",
            "arriveDate": "2016-05-10T17:25:00",
            "planeType": "333",
            "planeName": "空客 A330-300",
            "marketingCarrierCode": "SQ",
            "operatingCarrierCode": "SQ",
            "operatingCarrierName": "新加坡航空"
        }],
        "segmentsReturn": [{
            "airportCodeFrom": "BKK",
            "airportCodeTo": "SIN",
            "cityCodeFrom": "BKK",
            "cityCodeTo": "SIN",
            "airportNameFrom": "曼谷苏瓦纳蓬国际机场",
            "airportNameTo": "新加坡樟宜机场",
            "cityNameFrom": "曼谷",
            "cityNameTo": "新加坡",
            "airCorpCode": "SQ",
            "airCorpName": "新加坡航空",
            "flightNo": "973",
            "departDate": "2016-05-15T09:40:00",
            "arriveDate": "2016-05-15T13:05:00",
            "planeType": "333",
            "planeName": "空客 A330-300",
            "marketingCarrierCode": "SQ",
            "operatingCarrierCode": "SQ",
            "operatingCarrierName": "新加坡航空"
        }],
        "directFlight": 0
    },
    "hotelInfo": {
        "hotelID": 1005455,
        "hotelName": "Forum Park",
        "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-FOR1-2.jpg",
        "location": "",
        "city": "Bangkok",
        "country": "Thailand",
        "starRating": "3 stars",
        "currencyCode": "CNY",
        "avgRatePerPax": 1681,
        "rooms": [{
            "roomID": 10996915,
            "roomName": "Superior Room",
            "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
            "includedBreakfast": 1,
            "prices": [{
                "category": 1,
                "quantity": 2,
                "currencyCode": "CNY",
                "amount": 1888,
                "totalAmount": 3776
            }, {"category": 2, "quantity": 1, "currencyCode": "CNY", "amount": 1268, "totalAmount": 1268}],
            "addtionalPrice": 0,
            "totalAmount": 5044
        },
            {
                "roomID": 10996916,
                "roomName": "Deluxe Room",
                "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
                "includedBreakfast": 1,
                "prices": [{
                    "category": 1,
                    "quantity": 2,
                    "currencyCode": "CNY",
                    "amount": 1965,
                    "totalAmount": 3930
                }, {"category": 2, "quantity": 1, "currencyCode": "CNY", "amount": 1268, "totalAmount": 1268}],
                "addtionalPrice": 77,
                "totalAmount": 5198
            },
            {
                "roomID": 10996917,
                "roomName": "Room",
                "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
                "includedBreakfast": 1,
                "prices": [{
                    "category": 1,
                    "quantity": 2,
                    "currencyCode": "CNY",
                    "amount": 2173,
                    "totalAmount": 4346
                }, {"category": 2, "quantity": 1, "currencyCode": "CNY", "amount": 1268, "totalAmount": 1268}],
                "addtionalPrice": 285,
                "totalAmount": 5614
            }],
        "additionalPrice": 0
    },
    "RoomDetails":[{"Adult":"2","ChildWithoutBed":[6]},{"Adult":"1","ChildWithoutBed":[6]}],
    "airwaySetID": 1002001,
    "airwayCacheID": 1013262
}
window.localStorage.setItem('flightHotelFirstResult', JSON.stringify(data))

