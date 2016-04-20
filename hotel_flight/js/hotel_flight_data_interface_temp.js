//默认搜索接口：
var result1 = {
    "success": 1,
    "code": 200,
    "data": {
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
        "airwaySetID": 1002001,
        "airwayCacheID": 1013262
    }
};

//机票和酒店（更换其他航班信息）搜索接口
//	网络异常

//机票和酒店（选择酒店）搜索接口
var result2 = {
    "success": 1,
    "code": 200,
    "data": {
        "hotels": [{
            "hotelID": 96,
            "hotelName": "Amari Boulevard Bangkok（曼谷阿玛瑞大道酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/96/96_amari_boulevard_bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.554628",
            "latitudes": "13.741972",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3540,
            "additionalPrice": 0
        }, {
            "hotelID": 101,
            "hotelName": "曼谷阿玛丽水门酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/101/101-Amari-Watergate-Bangkok.jpg",
            "location": "Pratunam Area",
            "longitude": "100.540492",
            "latitudes": "13.751736",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3574,
            "additionalPrice": 0
        }, {
            "hotelID": 104,
            "hotelName": "Arnoma Grand Bangkok（曼谷阿诺玛酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/104/104-Arnoma-Hotel-Bangkok.jpg",
            "location": "Central World",
            "longitude": "100.541117",
            "latitudes": "13.746569",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 108,
            "hotelName": "Baiyoke Sky Hotel（彩虹云霄酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/108/108_baiyoke_sky_hotel_front_hotel.jpg",
            "location": "Pratunam Area",
            "longitude": "100.540972",
            "latitudes": "13.754786",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3574,
            "additionalPrice": 0
        }, {
            "hotelID": 111,
            "hotelName": "Bangkok Palace Hotel（曼谷皇宫酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/111/111_bangkok_palace_hotel.jpg",
            "location": "Petchburi",
            "longitude": "100.547506",
            "latitudes": "13.752664",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3398,
            "additionalPrice": 0
        }, {
            "hotelID": 18664,
            "hotelName": "Hillry公寓@曼通​​他尼",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/18664/18664-Hillry-Residence.jpg",
            "location": "Muang Thong Thani",
            "longitude": "100.5329838",
            "latitudes": "13.92751537",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 18839,
            "hotelName": "Vince Hotel Pratunam（文斯水门酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/18839/18839-Vince-Hotel-Pratunam.jpg",
            "location": "Pratunam Area",
            "longitude": "100.535601",
            "latitudes": "13.7544386",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 18959,
            "hotelName": "Grand Tower Inn Sathorn（沙吞大塔酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/18959/18959-Grand-Tower-Inn-Sathorn.jpg",
            "location": "Chao Phraya Riverside",
            "longitude": "100.507424",
            "latitudes": "13.720882",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 19633,
            "hotelName": "La Porte Bangkok Hotel（曼谷拉波特酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/19633/19633-La-Porte-Bangkok-Hotel.jpg",
            "location": "Petchburi",
            "longitude": "100.537842",
            "latitudes": "13.751369",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3270,
            "additionalPrice": 0
        }, {
            "hotelID": 16998,
            "hotelName": "The Grand Sathorn（格兰德沙吞酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/16998/16998-The-Grand-Sathorn.jpg",
            "location": "Sathorn",
            "longitude": "100.517499",
            "latitudes": "13.718966",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3386,
            "additionalPrice": 0
        }, {
            "hotelID": 17086,
            "hotelName": "U-Tiny Boutique Home Suvarnabhumi Bangkok（曼谷素万那普微型精品酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/17086/17086_U_Tiny_Boutique_Suvarnabhumi.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.705519",
            "latitudes": "13.744834",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3374,
            "additionalPrice": 0
        }, {
            "hotelID": 17164,
            "hotelName": "绿洲复古酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/17164/17164_RetrOasis_Hotel.jpg",
            "location": "Sukhumvit",
            "longitude": "100.564836",
            "latitudes": "13.734127",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 17603,
            "hotelName": "曼谷南特拉隆齐酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/17603/17603-nantra-ploenchit.jpg",
            "location": "Ploenchit",
            "longitude": "100.548566",
            "latitudes": "13.746941",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3288,
            "additionalPrice": 0
        }, {
            "hotelID": 17877,
            "hotelName": "曼谷阿马拉酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/17877/17877_Amara_Bangkok.jpg",
            "location": "Surawongse",
            "longitude": "100.527349",
            "latitudes": "13.728785",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3468,
            "additionalPrice": 0
        }, {
            "hotelID": 18605,
            "hotelName": "曼谷意可特酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/18605/18605-The-Ecotel-Bangkok-Hotel.jpg",
            "location": "Pratunam Area",
            "longitude": "100.546631",
            "latitudes": "13.752657",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3321,
            "additionalPrice": 0
        }, {
            "hotelID": 15650,
            "hotelName": "iCheck Inn Sukhumvit 11（素坤逸11巷艾切克酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15650/15650-iCheck-Inn-Sukhumvit-11.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556828",
            "latitudes": "13.740894",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 15651,
            "hotelName": "iCheck Inn Nana（娜娜艾查克旅馆） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15651/15651-iCheck-Inn-Nana.jpg",
            "location": "Sukhumvit",
            "longitude": "100.555505",
            "latitudes": "13.740608",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 15652,
            "hotelName": "iCheck Inn Silom（伊查斯罗姆旅馆）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15652/15652-iCheck-Inn-Silom.jpg",
            "location": "Silom",
            "longitude": "100.52117407",
            "latitudes": "13.72437367",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 16317,
            "hotelName": "暹罗传统精品套房酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/16317/16317_The_Siam_Heritage_Boutique_Suites.jpg",
            "location": "Silom",
            "longitude": "100.530449",
            "latitudes": "13.729468",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3468,
            "additionalPrice": 0
        }, {
            "hotelID": 16567,
            "hotelName": "Hotel Royal Bangkok @ Chinatown（曼谷唐人街皇家酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/16567/16567_Hotel_Royal_Bangkok_at_Chinatown.jpg",
            "location": "China Town",
            "longitude": "100.506092",
            "latitudes": "13.743014",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 16709,
            "hotelName": "Holiday Inn Express Bangkok Sukhumvit 11（曼谷素坤逸11号智选假日酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/16709/16709_Holiday_Inn_Express_Bangkok_Sukhumvit_11.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556849",
            "latitudes": "13.744941",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3451,
            "additionalPrice": 0
        }, {
            "hotelID": 15357,
            "hotelName": "The Landmark Bangkok（曼谷龙马大饭店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15357/15357_The_Landmark_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.553961",
            "latitudes": "13.741141",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3528,
            "additionalPrice": 0
        }, {
            "hotelID": 15398,
            "hotelName": "iCheck Inn Resident Sathorn（埃切克沙同酒店）",
            "hotelPictureURL": "",
            "location": "Sathorn",
            "longitude": "100.538701",
            "latitudes": "13.70143",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3352,
            "additionalPrice": 0
        }, {
            "hotelID": 15617,
            "hotelName": "曼谷康莱德酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15617/15617-Conrad-Bangkok.jpg",
            "location": "Wireless",
            "longitude": "100.54908782",
            "latitudes": "13.73930171",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3644,
            "additionalPrice": 0
        }, {
            "hotelID": 15625,
            "hotelName": "曼谷沙通智选假日酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/15625/15625_Holiday_Inn_Express_Bangkok_Sathorn.jpg",
            "location": "Sathorn",
            "longitude": "100.494087",
            "latitudes": "13.752753",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3386,
            "additionalPrice": 0
        }, {
            "hotelID": 14692,
            "hotelName": "Renaissance Bangkok Ratchaprasong Hotel（万丽曼谷拉查阿帕森酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14692/14692_Renaissance_Bangkok_Ratchaprasong_Hotel.jpg",
            "location": "Sukhumvit",
            "longitude": "100.542026",
            "latitudes": "13.742574",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3892,
            "additionalPrice": 0
        }, {
            "hotelID": 14729,
            "hotelName": "Jasmine Grande Residence（茉莉花豪华公寓）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14729/14729_Jasmine_Grande_Residence_Bangkok.jpg",
            "location": "Sathorn",
            "longitude": "100.5852",
            "latitudes": "13.7125",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3386,
            "additionalPrice": 0
        }, {
            "hotelID": 14830,
            "hotelName": "MA Hotel（马酒店 ） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14830/14830-MA-Hotel.jpg",
            "location": "Silom",
            "longitude": "100.518165",
            "latitudes": "13.726165",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 14837,
            "hotelName": "Asoke Suite（阿索克套房酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14837/14837_Asoke_Suite_Hotel_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.561863",
            "latitudes": "13.735623",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3280,
            "additionalPrice": 0
        }, {
            "hotelID": 14946,
            "hotelName": "Grand Swiss Sukhumvit 11 by Compass Hospitality（康帕斯酒店集团素坤逸11巷瑞士大酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14946/14946_Grand_Swiss_Sukhumvit11_Grand_Executive_01.jpg",
            "location": "Sukhumvit",
            "longitude": "100.5566612",
            "latitudes": "13.7408441",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3398,
            "additionalPrice": 0
        }, {
            "hotelID": 13681,
            "hotelName": "Radisson Suites Bangkok Sukhumvit（曼谷素坤逸丽笙套房酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/13681/13681_Radisson_Suites_Bangkok_Sukhumvit_Swimming-Pool.jpg",
            "location": "Sukhumvit",
            "longitude": "100.557684",
            "latitudes": "13.744049",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 13749,
            "hotelName": "myhotel Pratunam（普拉提那我的酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/13749/13749_myhotel-Pratunam.jpg",
            "location": "Pratunam Area",
            "longitude": "100.538270",
            "latitudes": "13.755183",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3287,
            "additionalPrice": 0
        }, {
            "hotelID": 14100,
            "hotelName": "The St. Regis Bangkok（曼谷瑞吉酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14100/14100_The_St_Regis_Bangkok.jpg",
            "location": "Central World",
            "longitude": "100.54011",
            "latitudes": "13.739958",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3974,
            "additionalPrice": 0
        }, {
            "hotelID": 14416,
            "hotelName": "J TWO S Pratunam Hotel（水门J2S酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14416/14416_-J_Two_S_Pratunam_Hotel.jpg",
            "location": "Pratunam Area",
            "longitude": "100.538149",
            "latitudes": "13.755088",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3276,
            "additionalPrice": 0
        }, {
            "hotelID": 14419,
            "hotelName": "605撒拉族登豪华套房",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14419/14419_Holiday_Inn_Bangkok_Sukhumvit_22.jpg",
            "location": "Sukhumvit",
            "longitude": "100.565561",
            "latitudes": "13.733225",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3586,
            "additionalPrice": 0
        }, {
            "hotelID": 14550,
            "hotelName": "LiT BANGKOK Hotel（LIT曼谷酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/14550/14550_The_Lit_Bangkok_Hotel_building.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.529497",
            "latitudes": "13.747472",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3557,
            "additionalPrice": 0
        }, {
            "hotelID": 12544,
            "hotelName": "Prince House（王子豪斯酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12544/12544_Prince_House.jpg",
            "location": "Pratunam Area",
            "longitude": "100.538372",
            "latitudes": "13.753082",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3298,
            "additionalPrice": 0
        }, {
            "hotelID": 12545,
            "hotelName": "The Best Bangkok House（曼谷佳华酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12545/12545_The_Best_Bangkok_House_Deluxe_02.jpg",
            "location": "Pratunam Area",
            "longitude": "100.538386",
            "latitudes": "13.755465",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3278,
            "additionalPrice": 0
        }, {
            "hotelID": 12656,
            "hotelName": "Grand Alpine by Variety Hotels（阿尔宾娜大酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12656/12656_grand_alpine_front_image.jpg",
            "location": "Pratunam Area",
            "longitude": "100.539217",
            "latitudes": "13.75347",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3316,
            "additionalPrice": 0
        }, {
            "hotelID": 13451,
            "hotelName": "The Aim Sathorn Hotel（沙吞目标酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/13451/13451_the_aim_sathorn_hotel.jpg",
            "location": "Sathorn",
            "longitude": "100.548114",
            "latitudes": "13.720054",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3280,
            "additionalPrice": 0
        }, {
            "hotelID": 13487,
            "hotelName": "曼谷诺富特暹罗广场酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/13487/13487-Novotel-Bangkok-on-Siam-Square.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.534891",
            "latitudes": "13.744742",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3644,
            "additionalPrice": 0
        }, {
            "hotelID": 11911,
            "hotelName": "Suphan Lake Hometel（素帆湖别墅酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.731513",
            "latitudes": "13.762091",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3233,
            "additionalPrice": 0
        }, {
            "hotelID": 12033,
            "hotelName": "Arcadia Suites Phloenchit Bangkok by Compass Hospitality（阿卡迪亚套房隆齐曼谷罗盘康帕斯酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12033/12033-Arcadia-Suites-Bangkok.jpg",
            "location": "Wireless",
            "longitude": "100.548696",
            "latitudes": "13.746524",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3480,
            "additionalPrice": 0
        }, {
            "hotelID": 12037,
            "hotelName": "曼谷素坤逸爱瑞酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12037/12037_Arize_Hotel_Sukhumvit_Front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.570476",
            "latitudes": "13.728379",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 12116,
            "hotelName": "曼谷凤凰酒店（素万那普机场）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12116/12116_The_Phoenix_Hotel_Bangkok_Front.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.753754",
            "latitudes": "13.723199",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3257,
            "additionalPrice": 0
        }, {
            "hotelID": 12154,
            "hotelName": "The Continent Bangkok  by Compass Hospitality（康帕斯酒店集团曼谷欧陆酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12154/12154_the_continent_hotel_bangkok_view.jpg",
            "location": "Sukhumvit",
            "longitude": "100.562212",
            "latitudes": "13.736324",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3480,
            "additionalPrice": 0
        }, {
            "hotelID": 12543,
            "hotelName": "A-2 House(A-2之家酒店)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/12543/12543_A_2_House.jpg",
            "location": "Pratunam Area",
            "longitude": "100.538563",
            "latitudes": "13.752746",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3306,
            "additionalPrice": 0
        }, {
            "hotelID": 11603,
            "hotelName": "Red Planet Asoke Bangkok（阿索克红色星球酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11603/11603-red-planet-asoke.jpg",
            "location": "Sukhumvit",
            "longitude": "100.559953",
            "latitudes": "13.735876",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3312,
            "additionalPrice": 0
        }, {
            "hotelID": 11620,
            "hotelName": "Lucky Palace Hotel（幸运皇宫酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11620/11620-lucky-palace-hotel.jpg",
            "location": "Sukhumvit",
            "longitude": "100.553519",
            "latitudes": "13.742600",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3292,
            "additionalPrice": 0
        }, {
            "hotelID": 11631,
            "hotelName": "Grand Lucky Hotel（幸运大酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11631/11631_Grand_Lucky_Hotel_Front.gif",
            "location": "Sukhumvit",
            "longitude": "100.553524",
            "latitudes": "13.74316",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 11827,
            "hotelName": "Citrus Sukhumvit 13  by Compass Hospitality（康帕斯酒店集团素坤逸13巷娜娜柑橘酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11827/11827-citrus-sukhumvit13.jpg",
            "location": "Sukhumvit",
            "longitude": "100.557837",
            "latitudes": "13.742994",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3333,
            "additionalPrice": 0
        }, {
            "hotelID": 11008,
            "hotelName": "Sofitel So Bangkok（曼谷索菲特所酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11008/11008_sofitel_so_bangkok_front_image.gif",
            "location": "Sathorn",
            "longitude": "100.543139",
            "latitudes": "13.725998",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3926,
            "additionalPrice": 0
        }, {
            "hotelID": 11139,
            "hotelName": "Pullman Bangkok Hotel G（曼谷铂尔曼G酒店)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11139/11139-pullman-bangkok-hotel-g.jpg",
            "location": "Silom",
            "longitude": "100.525846",
            "latitudes": "13.726182",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3627,
            "additionalPrice": 0
        }, {
            "hotelID": 11196,
            "hotelName": "索菲特曼谷素坤逸酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11196/11196_sofitel_bangkok_sukhumvit_front_image.jpg",
            "location": "Sukhumvit",
            "longitude": "100.557703",
            "latitudes": "13.739758",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3855,
            "additionalPrice": 0
        }, {
            "hotelID": 11227,
            "hotelName": "曼谷素坤逸路20最佳西方Plus酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11227/11227_best_western_plus_at20_sukhumvit_front_image.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563299",
            "latitudes": "13.731299",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 11283,
            "hotelName": "Best Western Premier Sukhumvit（贝斯特韦斯特素坤逸路顶级酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11283/11283_Best_Western_Premier_Sukhumvit_Front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.55190",
            "latitudes": "13.74615",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3480,
            "additionalPrice": 0
        }, {
            "hotelID": 11304,
            "hotelName": "Holiday Inn Express Bangkok Siam（曼谷暹罗快捷假日酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11304/11304_holiday_inn_express_bangkok_siam.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.527772",
            "latitudes": "13.74687",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3468,
            "additionalPrice": 0
        }, {
            "hotelID": 10416,
            "hotelName": "Manhattan Hotel Bangkok（曼谷曼哈頓酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10416/10416_Manhattan_Hotel_Bangkok_Superior_04.jpg",
            "location": "Sukhumvit",
            "longitude": "100.55824",
            "latitudes": "13.739739",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3352,
            "additionalPrice": 0
        }, {
            "hotelID": 10526,
            "hotelName": "Novotel Bangkok Platinum Pratunam（水门诺富特曼谷铂金酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10526/10526_NovotelBangkokPlatinum_Front01.gif",
            "location": "Pratunam Area",
            "longitude": "100.54033",
            "latitudes": "13.749598",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3528,
            "additionalPrice": 0
        }, {
            "hotelID": 10576,
            "hotelName": "Tower Club at lebua（莲花大酒店塔楼会馆）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10576/10576_Tower_Club_at_lebua_Front.gif",
            "location": "Chao Phraya Riverside",
            "longitude": "100.516917",
            "latitudes": "13.722079",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3786,
            "additionalPrice": 0
        }, {
            "hotelID": 10579,
            "hotelName": "Park Plaza Bangkok Soi 18（公园广场曼谷素坤逸酒店18） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10579/10579-Park-Plaza-Bangkok-Soi18.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563022",
            "latitudes": "13.733544",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3350,
            "additionalPrice": 0
        }, {
            "hotelID": 10614,
            "hotelName": "Golden Tulip Mandison Suites（金色郁金香麦迪逊套房酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10614/10614_golden_tulip_mandison_suites_Building2.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563703",
            "latitudes": "13.731936",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 10653,
            "hotelName": "Salil Hotel Sukhumvit Soi 11（素坤逸11号萨利酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10653/10653_salil_hotel_sukhumvit_soi11_Deluxe_Jewel03.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556523",
            "latitudes": "13.742793",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3357,
            "additionalPrice": 0
        }, {
            "hotelID": 9714,
            "hotelName": "Hotel de Bangkok（曼谷酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9714/9714_hotel_de_bangkok_front_hotel.jpg",
            "location": "Pratunam Area",
            "longitude": "100.542873",
            "latitudes": "13.757081",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 9738,
            "hotelName": "Sivatel Bangkok Hotel（曼谷斯瓦特尔酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9738/9738_Sivatel_Bangkok_Hotel.jpg",
            "location": "Ploenchit",
            "longitude": "100.547795",
            "latitudes": "13.744666",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3622,
            "additionalPrice": 0
        }, {
            "hotelID": 10135,
            "hotelName": "Grande Centre Point Hotel Terminal21（航站21中心酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10135/10135_Grande_Centre_Point_Terminal21_Building_02.jpg",
            "location": "Sukhumvit",
            "longitude": "100.560324",
            "latitudes": "13.737358",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3644,
            "additionalPrice": 0
        }, {
            "hotelID": 10220,
            "hotelName": "Nantra de Comfort（南特拉德舒适旅馆） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10220/10220-nantra-de-comfort.jpg",
            "location": "Sukhumvit",
            "longitude": "100.581843",
            "latitudes": "13.728867",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3243,
            "additionalPrice": 0
        }, {
            "hotelID": 10259,
            "hotelName": "Nantra Silom（西隆楠特拉酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10259/10259_NantraSilom.jpg",
            "location": "Silom",
            "longitude": "100.530396",
            "latitudes": "13.727431",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3288,
            "additionalPrice": 0
        }, {
            "hotelID": 10352,
            "hotelName": "Vic3 Bangkok（曼谷威客3号酒店（原曼谷胜利纪念碑全季酒店）） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/10352/10352_Vic3_Bangkok_Front.jpg",
            "location": "Chatuchak Area (Weekend Market)",
            "longitude": "100.541956",
            "latitudes": "13.772634",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3287,
            "additionalPrice": 0
        }, {
            "hotelID": 9394,
            "hotelName": "D VAREE Xpress Makkasanl（D瓦里克斯普利斯马卡萨酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9394/9394-D-VAREE-Xpress-Makkasan.jpg",
            "location": "Pratunam Area",
            "longitude": "100.560881",
            "latitudes": "13.74952",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3258,
            "additionalPrice": 0
        }, {
            "hotelID": 9402,
            "hotelName": "Anantara Bangkok Sathorn（曼谷沙吞安娜塔拉酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9402/9402_anantara_bangkok_sathorn.jpg",
            "location": "Sathorn",
            "longitude": "100.532268",
            "latitudes": "13.716633",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3487,
            "additionalPrice": 0
        }, {
            "hotelID": 9458,
            "hotelName": "I Galleria Sukhumvit 13（爱伽利素坤逸13号酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9458/9458_best_western_bangkok_hiptiqu_front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.558296",
            "latitudes": "13.745899",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 9466,
            "hotelName": "Hotel Muse Bangkok（曼谷缪斯酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9466/9466_Hotel-Muse-Bangkok.jpg",
            "location": "Langsuan",
            "longitude": "100.543275",
            "latitudes": "13.740261",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3634,
            "additionalPrice": 0
        }, {
            "hotelID": 9508,
            "hotelName": "V Residence Hotel & Serviced Apartment（曼谷维居公寓酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9508/9508_V_Residence_Hotel_And_Serviced_Apartment_Front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.571058",
            "latitudes": "13.729067",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3550,
            "additionalPrice": 0
        }, {
            "hotelID": 9711,
            "hotelName": "Novotel Bangkok Ploenchit Sukhumvit（诺富特曼谷素坤逸酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9711/9711_NovotelBangkokFenixPloenchit_Front.gif",
            "location": "Ploenchit",
            "longitude": "100.549691",
            "latitudes": "13.742788",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3562,
            "additionalPrice": 0
        }, {
            "hotelID": 8617,
            "hotelName": "Rembrandt Hotel and Towers Serviced Apartments（伦勃朗塔公寓酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8617/8617-Rembrandt-Hotel-and-Towers-Serviced-Apartments.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563639",
            "latitudes": "13.732239",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3374,
            "additionalPrice": 0
        }, {
            "hotelID": 8633,
            "hotelName": "Le Fenix Sukhumvit 11 Bangkok by Compass Hospitality（康帕斯酒店集团曼谷素坤逸11巷乐菲尼克斯酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8633/8633_le_fenix_sukhumvit_Superior_3.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556067",
            "latitudes": "13.744896",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3299,
            "additionalPrice": 0
        }, {
            "hotelID": 9082,
            "hotelName": "Galleria 10 Sukhumvit Bangkok by Compass Hospitality（康帕斯酒店集团曼谷素坤逸10巷格乐丽雅酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9082/9082_galleria_10_bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.557026",
            "latitudes": "13.736951",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3381,
            "additionalPrice": 0
        }, {
            "hotelID": 9117,
            "hotelName": "Miramar Hotel Bangkok（美丽华酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9117/9117_miramar_hotel_bangkok.jpg",
            "location": "China Town",
            "longitude": "100.503498",
            "latitudes": "13.747253",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3306,
            "additionalPrice": 0
        }, {
            "hotelID": 9132,
            "hotelName": "Lohas Suites Sukhumvit by SuperHotel（乐浩思SUKHUMVIT超级套房酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9132/9132amari_residences_sukhumvit.jpg",
            "location": "Sukhumvit",
            "longitude": "100.552147",
            "latitudes": "13.736578",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 9245,
            "hotelName": "Dream Town Pratunam Hotel（水门梦幻城酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/9245/9245_Dream_Town_Pratunam_Hotel_Front.jpg",
            "location": "Pratunam Area",
            "longitude": "100.535309",
            "latitudes": "13.754986",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3276,
            "additionalPrice": 0
        }, {
            "hotelID": 8076,
            "hotelName": "The Cottage Suvarnabhumi（素万那普村舍酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8076/8076_the_cottage_suvarnabhumi.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.724177",
            "latitudes": "13.722005",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3280,
            "additionalPrice": 0
        }, {
            "hotelID": 8155,
            "hotelName": "iCheck inn Sukhumvit Soi 2（素坤逸2巷艾切克酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8155/8155_monaco_bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.552328",
            "latitudes": "13.738309",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 8238,
            "hotelName": "Best Western Premier Amaranth Hotel(素万那普机场贝斯特韦斯特紫苋精品酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8238/8238_best_western_premier_amaranth_hotel.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.714162",
            "latitudes": "13.646872",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 8312,
            "hotelName": "Legacy Express Sukhumvit by Compass Hospitality（康帕斯酒店集团素坤逸力狮快捷酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8312/8312legacy_express.jpg",
            "location": "Sukhumvit",
            "longitude": "100.55114",
            "latitudes": "13.742986",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3333,
            "additionalPrice": 0
        }, {
            "hotelID": 8315,
            "hotelName": "曼谷福朋喜来登酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8315/8315_Four_Points_by_Sheraton_Bar_02.jpg",
            "location": "Sukhumvit",
            "longitude": "100.558142",
            "latitudes": "13.739061",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3592,
            "additionalPrice": 0
        }, {
            "hotelID": 8608,
            "hotelName": "Sawasdee Hotel @ Sukhumvit Soi 8（素坤逸路第八巷萨瓦斯德酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8608/8608_sawasdee_hotel_at_sukhumvit_soi8.jpg",
            "location": "Sukhumvit",
            "longitude": "100.555785",
            "latitudes": "13.73616",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3333,
            "additionalPrice": 0
        }, {
            "hotelID": 7516,
            "hotelName": "Salil Hotel Sukhumvit - Soi Thonglor1（素坤逸通罗一号莎丽尔酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7516/7516_salil_hotel_sukhumvit_soi_thonglor1_Lobby.jpg",
            "location": "Sukhumvit",
            "longitude": "100.578742",
            "latitudes": "13.727331",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 7601,
            "hotelName": "Glitz Hotel（曼谷炫目酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7601/7601_Glitz_Hotel_Suite.jpg",
            "location": "Silom",
            "longitude": "100.529738",
            "latitudes": "13.729259",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3311,
            "additionalPrice": 0
        }, {
            "hotelID": 7762,
            "hotelName": "Phachara Suites（素坤逸帕查拉套房酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7762/7762-Phachara-Suites.jpg",
            "location": "Sukhumvit",
            "longitude": "100.553758",
            "latitudes": "13.739351",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3415,
            "additionalPrice": 0
        }, {
            "hotelID": 7897,
            "hotelName": "Somerset Sukhumvit Thonglor（萨默塞特苏库通劳酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7897/7879_Somerset_Sukhumvit_Thonglor.jpg",
            "location": "Sukhumvit",
            "longitude": "100.580483",
            "latitudes": "13.728791",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3468,
            "additionalPrice": 0
        }, {
            "hotelID": 7931,
            "hotelName": "Vie Hotel Bangkok（美憬阁连锁曼谷VIE酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7931/7931_VIE_Hotel_Bangkok_exterior_1.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.532101",
            "latitudes": "13.750515",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3619,
            "additionalPrice": 0
        }, {
            "hotelID": 8033,
            "hotelName": "Maitria Hotel Sukhumvit 18（美蒂雅酒店素坤逸18巷-察殿集团） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8033/8033_Maitria_Hotel_Sukhumvit_18_Exterior_03.jpg",
            "location": "Sukhumvit",
            "longitude": "100.562415",
            "latitudes": "13.733027",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 6273,
            "hotelName": "Citadines Sukhumvit 23 Bangkok（曼谷馨乐庭素坤逸23号酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/6273/6273_Citadines_Sukhumvit23_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.56305",
            "latitudes": "13.739997",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 6386,
            "hotelName": "The Key Sukhumvit Bangkok by Compass Hospitality（康帕斯酒店集团曼谷素坤逸钥匙酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/6386/6386the_key_bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.559833",
            "latitudes": "13.739014",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3405,
            "additionalPrice": 0
        }, {
            "hotelID": 6498,
            "hotelName": "Chatrium Hotel Riverside Bangkok（察殿曼谷河畔豪华酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/6498/6498_Chatrium_Hotel_Riverside_Bangkok.jpg",
            "location": "Chao Phraya Riverside",
            "longitude": "100.509825",
            "latitudes": "13.711161",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3644,
            "additionalPrice": 0
        }, {
            "hotelID": 6919,
            "hotelName": "Salil Hotel Sukhumvit Soi 8（素坤逸8号萨利酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/6919/6919_salil_hotel_sukhumvit_soi8_Lobby.jpg",
            "location": "Sukhumvit",
            "longitude": "100.555744",
            "latitudes": "13.737044",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 5639,
            "hotelName": "Mac Boutique Suites（麦克精品套房酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5639/5639_Mac_Boutique_Suites_Front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.555522",
            "latitudes": "13.743289",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3352,
            "additionalPrice": 0
        }, {
            "hotelID": 5758,
            "hotelName": "FuramaXclusive Asoke, Bangkok（素坤逸富丽华阿索克酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5758/5758_furama_xclusive_asoke_sukhumvit_front_image.jpg",
            "location": "Sukhumvit",
            "longitude": "100.561731",
            "latitudes": "13.739819",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 5923,
            "hotelName": "Citadines Sukhumvit 8 Bangkok（曼谷素坤逸8号馨乐庭酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5923/5923_Citadines_Sukhumvit8_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.555975",
            "latitudes": "13.737153",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3370,
            "additionalPrice": 0
        }, {
            "hotelID": 5995,
            "hotelName": "Chatrium Residence Sathon Bangkok（察殿曼谷沙吞酒店式公寓） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5995/5995-Chatrium-Residence-Sathon.jpg",
            "location": "Sathorn",
            "longitude": "100.537436",
            "latitudes": "13.702042",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 6150,
            "hotelName": "Citadines Sukhumvit 11 Bangkok（曼谷素坤逸11号馨乐庭酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/6150/6150citadines_sukhumvit11_bangkok_hotel.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556931",
            "latitudes": "13.744181",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3370,
            "additionalPrice": 0
        }, {
            "hotelID": 4642,
            "hotelName": "Citadines Sukhumvit 16 Bangkok（曼谷馨乐庭素坤逸16号酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/4642/4642_Citadines_Sukhumvit16_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.560865",
            "latitudes": "13.734153",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 5194,
            "hotelName": "Citichic by iCheck inn（时尚杰克旅馆） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5194/5194-Citichic-by-iCheck-Inn.jpg",
            "location": "Sukhumvit",
            "longitude": "100.558105",
            "latitudes": "13.744953",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 5568,
            "hotelName": "Park Plaza Sukhumvit Bangkokt（素坤逸公园广场酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/5568/5568_park_plaza_sukhumvit_bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.560586",
            "latitudes": "13.734893",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3468,
            "additionalPrice": 0
        }, {
            "hotelID": 2591,
            "hotelName": "Pantip Suites（潘提普套房酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2591/2591_pantip_court_serviced_residence.jpg",
            "location": "Sathorn",
            "longitude": "100.54489",
            "latitudes": "13.72175",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 2703,
            "hotelName": "The Tawana Bangkok（曼谷塔瓦纳酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2703/2703_the_tawana_bangkok.jpg",
            "location": "Surawongse",
            "longitude": "100.52971",
            "latitudes": "13.729640",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3386,
            "additionalPrice": 0
        }, {
            "hotelID": 2960,
            "hotelName": "Chateau de Bangkok（曼谷城堡酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2960/2960_Chateau_de_Bangkok_Pool02.jpg",
            "location": "Ploenchit",
            "longitude": "100.5500",
            "latitudes": "13.7398",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 2962,
            "hotelName": "Jasmine City Hotel（茉莉城市酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2962/2962jasmine_executive_suites.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563194",
            "latitudes": "13.735733",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3480,
            "additionalPrice": 0
        }, {
            "hotelID": 3991,
            "hotelName": "Tarntawan Place（坦塔湾广场酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/3991/3991-Tarntawan-Place.jpg",
            "location": "Surawongse",
            "longitude": "100.530248",
            "latitudes": "13.729138",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3427,
            "additionalPrice": 0
        }, {
            "hotelID": 4406,
            "hotelName": "For You Residence（为你公寓酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/4406/4406_for_you_residence.jpg",
            "location": "Silom",
            "longitude": "100.522081",
            "latitudes": "13.7239",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3280,
            "additionalPrice": 0
        }, {
            "hotelID": 2331,
            "hotelName": "I Residence Hotel Silom（西隆爱逸酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2331/2331_i_residence_hotel_silom.jpg",
            "location": "Silom",
            "longitude": "100.5301",
            "latitudes": "13.7238",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3316,
            "additionalPrice": 0
        }, {
            "hotelID": 2349,
            "hotelName": "Somerset Park Suanplu Bangkok（萨默塞特苏安普卢公园酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2349/2349_Somerset_Park_Suanplu_bangkok_hotel.jpg",
            "location": "Sathorn",
            "longitude": "100.5382",
            "latitudes": "13.7218",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 2355,
            "hotelName": "Chaophya Park Hotel（曼谷猜尤披亚公园酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2355/2355-Chaophya-Park-Hotel.jpg",
            "location": "Ratchadapisek & Rama 9",
            "longitude": "100.57343",
            "latitudes": "13.795810",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 2375,
            "hotelName": "FuramaXclusive Sathorn, Bangkok（西隆富丽萨通酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2375/2375_furamaxclusive_sathorn_bangkok.jpg",
            "location": "Sathorn",
            "longitude": "100.531176",
            "latitudes": "13.723875",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 2430,
            "hotelName": "FuramaXclusive Sukhumvit, Bangkok（素坤逸富丽华酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/2430/2430_FuramaXclusive_Sukhumvit_Bangkok_Front.gif",
            "location": "Sukhumvit",
            "longitude": "100.551964",
            "latitudes": "13.746411",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 883,
            "hotelName": "Rembrandt Hotel Bangkok（曼谷瑞博朗得酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/883/883_Rembrandt_Hotel_Bangkok_Deluxe_02.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563158",
            "latitudes": "13.732428",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3550,
            "additionalPrice": 0
        }, {
            "hotelID": 955,
            "hotelName": "曼谷雅高素坤逸大酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/955/955_Grand_Sukhumvit_Hotel_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.554599",
            "latitudes": "13.738989",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3532,
            "additionalPrice": 0
        }, {
            "hotelID": 980,
            "hotelName": "Ascott Sathorn Bangkok（曼谷萨通雅诗阁酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/980/980_Ascott_Sathorn_Bangkok.jpg",
            "location": "Sathorn",
            "longitude": "100.5284",
            "latitudes": "13.7206",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3543,
            "additionalPrice": 0
        }, {
            "hotelID": 981,
            "hotelName": "Davis Bangkok（曼谷戴维斯酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/981/981_Davis_Bangkok_Deluxe_02.gif",
            "location": "Sukhumvit",
            "longitude": "100.565989",
            "latitudes": "13.720917",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3352,
            "additionalPrice": 0
        }, {
            "hotelID": 999,
            "hotelName": "The Residence @Pratunam Hotel (Formerly The Residence Rajtaevee Hotel)(拉吉塔维住所)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/999/999_residence_rajtaevee_premier_01.jpg",
            "location": "Pratunam Area",
            "longitude": "100.5355",
            "latitudes": "13.7515",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3304,
            "additionalPrice": 0
        }, {
            "hotelID": 1008,
            "hotelName": "曼谷西隆辉光三位一体酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/1008/1008_Glow_Trinity_Silom_Internet-Corner.jpg",
            "location": "Silom",
            "longitude": "100.52287530",
            "latitudes": "13.72419660",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3386,
            "additionalPrice": 0
        }, {
            "hotelID": 718,
            "hotelName": "Majestic Grande（皇家大饭店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/718/718_majestic_grande_front.jpg",
            "location": "Sukhumvit",
            "longitude": "100.551488",
            "latitudes": "13.740344",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3434,
            "additionalPrice": 0
        }, {
            "hotelID": 746,
            "hotelName": "Mandarin Hotel Managed by Centre Point（中间点曼达林大酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/746/746_Mandarin_Hotel_Managed_by_Centre_Point.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.527236",
            "latitudes": "13.732983",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 750,
            "hotelName": "lebua at State Tower（国家大楼莲花大酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/750/750_lebua_at_state_tower.jpg",
            "location": "Chao Phraya Riverside",
            "longitude": "100.517134",
            "latitudes": "13.721257",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3644,
            "additionalPrice": 0
        }, {
            "hotelID": 792,
            "hotelName": "Ambassador Bangkok（曼谷大使酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/792/792_Ambassador_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.557663",
            "latitudes": "13.742396",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 808,
            "hotelName": "Pinnacle Lumpinee Park Hotel（隆披尼公园品尼高酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/808/808_Pinnacle_hotel_Lumpinee_Swimming_Pool_01.jpg",
            "location": "Sathorn",
            "longitude": "100.548469",
            "latitudes": "13.723731",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3311,
            "additionalPrice": 0
        }, {
            "hotelID": 811,
            "hotelName": "President Park Bangkok（曼谷总统公园酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/811/811_President_Park_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.565728",
            "latitudes": "13.721303",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3363,
            "additionalPrice": 0
        }, {
            "hotelID": 410,
            "hotelName": "Hotel Windsor Suites and Convention Bangkok（素坤逸路20号温莎套房会议酒店 ）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/410/410_Windsor_Suites_Hotel.jpg",
            "location": "Sukhumvit",
            "longitude": "100.563342",
            "latitudes": "13.733353",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3357,
            "additionalPrice": 0
        }, {
            "hotelID": 508,
            "hotelName": "Centre Point Chidlom（奇德伦中心酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/508/508_centre_point_langsuan.jpg",
            "location": "Langsuan",
            "longitude": "100.543197",
            "latitudes": "13.738978",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3492,
            "additionalPrice": 0
        }, {
            "hotelID": 509,
            "hotelName": "Centre Point Pratunam（水门中心酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/509/509_centre_point_petchburi.jpg",
            "location": "Petchburi",
            "longitude": "100.537295",
            "latitudes": "13.751819",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3398,
            "additionalPrice": 0
        }, {
            "hotelID": 511,
            "hotelName": "Centre Point Silom（是隆中央酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/511/511_Centre_Point_Silom.jpg",
            "location": "Silom",
            "longitude": "100.515139",
            "latitudes": "13.719878",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 526,
            "hotelName": "Ploenchit先得坊酒店",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/526/526_Centre_Point_Wireless_Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.547083",
            "latitudes": "13.742308",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3540,
            "additionalPrice": 0
        }, {
            "hotelID": 573,
            "hotelName": "Emporium Suites by Chatrium（察殿恩博利豪华酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/573/573_Emporium_Suites_by_Chatrium.jpg",
            "location": "Sukhumvit",
            "longitude": "100.569008",
            "latitudes": "13.730442",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3692,
            "additionalPrice": 0
        }, {
            "hotelID": 334,
            "hotelName": "The Sukosol （苏阁索酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/334/334the-sukosol-bangkok.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.536200",
            "latitudes": "13.75797",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3492,
            "additionalPrice": 0
        }, {
            "hotelID": 335,
            "hotelName": "Silom City Hotel（西隆城市酒店（原西隆城市旅馆）)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/335/335-Silom-City-Hotel.jpg",
            "location": "Silom",
            "longitude": "100.522537",
            "latitudes": "13.72581",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3333,
            "additionalPrice": 0
        }, {
            "hotelID": 341,
            "hotelName": "Somerset Lake Point （萨默塞特湖景酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/341/341_Somerset_Lake_Point.jpg",
            "location": "Sukhumvit",
            "longitude": "100.561533",
            "latitudes": "13.730081",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3398,
            "additionalPrice": 0
        }, {
            "hotelID": 402,
            "hotelName": "Twin Towers Hotel Bangkok(曼谷双子塔酒店)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/402/402_The_Twin_Towers_Hotel_Bangkok.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.520128",
            "latitudes": "13.745517",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 275,
            "hotelName": "Pathumwan Princess Hotel（曼谷帕色哇公主酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/275/275_Pathumwan_Princess_Hotel_Front.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.529897",
            "latitudes": "13.743439",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3663,
            "additionalPrice": 0
        }, {
            "hotelID": 290,
            "hotelName": "Diamond City Hotel（钻石城酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/290/290_diamond_city_hotel_front_image.jpg",
            "location": "MBK Shopping Complex, Siam Square",
            "longitude": "100.526911",
            "latitudes": "13.752317",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3287,
            "additionalPrice": 0
        }, {
            "hotelID": 308,
            "hotelName": "Royal Princess Larn Luang（皇家公主兰朗酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/308/308_royal_princess_larn_luang.jpg",
            "location": "Khao Sarn",
            "longitude": "100.513272",
            "latitudes": "13.757399",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3410,
            "additionalPrice": 0
        }, {
            "hotelID": 321,
            "hotelName": "Astera Sathorn（阿斯特拉沙吞酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/321/321_Astera_Sathorn_Superior_02.jpg",
            "location": "Sathorn",
            "longitude": "100.516522",
            "latitudes": "13.717603",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3434,
            "additionalPrice": 0
        }, {
            "hotelID": 327,
            "hotelName": "Shangri-La Hotel（曼谷香格里拉酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/327/327_Shangri_La_Hotel_Bangkok_Building_01.jpg",
            "location": "Chao Phraya Riverside",
            "longitude": "100.513862",
            "latitudes": "13.720896",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3738,
            "additionalPrice": 0
        }, {
            "hotelID": 132,
            "hotelName": "Ramada D'MA Bangkok（曼谷华美达迪马阁酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/132/132_ramada_d_ma_bangkok_front.jpg",
            "location": "Pratunam Area",
            "longitude": "100.546306",
            "latitudes": "13.753211",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 139,
            "hotelName": "Grand China Hotel（大中国酒店 ）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/139/139-Grand-China-Hotel.jpg",
            "location": "China Town",
            "longitude": "100.506961",
            "latitudes": "13.742756",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3446,
            "additionalPrice": 0
        }, {
            "hotelID": 140,
            "hotelName": "Grand President Bangkok（曼谷格蓝总统饭店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/140/140_Grand_President_Bangkok_Junior-Suite03.jpg",
            "location": "Sukhumvit",
            "longitude": "100.556994",
            "latitudes": "13.742753",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3352,
            "additionalPrice": 0
        }, {
            "hotelID": 152,
            "hotelName": "JW Marriott Hotel Bangkok（曼谷JW万豪酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/152/152-JW-Marriott-Hotel-Bangkok.jpg",
            "location": "Sukhumvit",
            "longitude": "100.55237",
            "latitudes": "13.73499",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3938,
            "additionalPrice": 0
        }, {
            "hotelID": 248,
            "hotelName": "Ramada Plaza Bangkok Menam Riverside（曼谷湄南河畔华美达广场酒店）",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/248/248_ramada_plaza_menam_riverside_hotel.jpg",
            "location": "Chao Phraya Riverside",
            "longitude": "100.506119",
            "latitudes": "13.7078",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3528,
            "additionalPrice": 0
        }, {
            "hotelID": 1005399,
            "hotelName": "Amari Boulevard",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-AMA3-1.jpg",
            "location": "",
            "longitude": "100.554746000000000",
            "latitudes": "13.741901000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3605,
            "additionalPrice": 0
        }, {
            "hotelID": 1005401,
            "hotelName": "Amari Residences Bangkok",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-AMAH-1.jpg",
            "location": "",
            "longitude": "100.584951000000000",
            "latitudes": "13.748041000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3576,
            "additionalPrice": 0
        }, {
            "hotelID": 1038174,
            "hotelName": "Ambassador",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.557657000000000",
            "latitudes": "13.742431000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1005406,
            "hotelName": "Arnoma",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ARN-3.jpg",
            "location": "",
            "longitude": "100.541192406000000",
            "latitudes": "13.746358043900000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3488,
            "additionalPrice": 0
        }, {
            "hotelID": 1005415,
            "hotelName": "Bangkok City Inn",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BAN-1.jpg",
            "location": "",
            "longitude": "100.541680000000000",
            "latitudes": "13.752870000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3338,
            "additionalPrice": 0
        }, {
            "hotelID": 1005416,
            "hotelName": "Bangkok Palace",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BAN1-2.jpg",
            "location": "",
            "longitude": "100.547604000000000",
            "latitudes": "13.752537000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3391,
            "additionalPrice": 0
        }, {
            "hotelID": 1005419,
            "hotelName": "Bel-aire Princess",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BEL-1.jpg",
            "location": "",
            "longitude": "100.554697000000000",
            "latitudes": "13.744189000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3588,
            "additionalPrice": 0
        }, {
            "hotelID": 1005420,
            "hotelName": "Swana Bangkok Hotel",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BES-1.jpg",
            "location": "",
            "longitude": "100.502815700000000",
            "latitudes": "13.764664340000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3372,
            "additionalPrice": 0
        }, {
            "hotelID": 1005424,
            "hotelName": "Bhiman Inn",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BHI-2.jpg",
            "location": "",
            "longitude": "100.496970000000000",
            "latitudes": "13.763409000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3350,
            "additionalPrice": 0
        }, {
            "hotelID": 1005425,
            "hotelName": "Boonsiri Place",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-BOO-1.jpg",
            "location": "",
            "longitude": "100.497223000000000",
            "latitudes": "13.754743000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 1005428,
            "hotelName": "Century Park",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-CEN2-19.jpg",
            "location": "",
            "longitude": "100.543268700000000",
            "latitudes": "13.762077280000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3521,
            "additionalPrice": 0
        }, {
            "hotelID": 1005430,
            "hotelName": "Centara Grand At Central World",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-CEN7-10.jpg",
            "location": "",
            "longitude": "100.538854000000000",
            "latitudes": "13.747656000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3919,
            "additionalPrice": 0
        }, {
            "hotelID": 1005431,
            "hotelName": "Chaophya Park",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-CHA-1.jpg",
            "location": "",
            "longitude": "100.573386000000000",
            "latitudes": "13.795732000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3406,
            "additionalPrice": 0
        }, {
            "hotelID": 1005435,
            "hotelName": "Chatrium Hotel Riverside",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-CHAC-2.jpg",
            "location": "",
            "longitude": "100.509972000000000",
            "latitudes": "13.711052000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3654,
            "additionalPrice": 0
        }, {
            "hotelID": 1038149,
            "hotelName": "China Town",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.511156000000000",
            "latitudes": "13.739468000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3328,
            "additionalPrice": 0
        }, {
            "hotelID": 1005437,
            "hotelName": "Citin Pratunam",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-CIT5-16.jpg",
            "location": "",
            "longitude": "100.539608000000000",
            "latitudes": "13.754604000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3391,
            "additionalPrice": 0
        }, {
            "hotelID": 1038189,
            "hotelName": "Heritage Sathorn",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.525664000000000",
            "latitudes": "13.718124000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 1005445,
            "hotelName": "Davis",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-DAV-1.jpg",
            "location": "",
            "longitude": "100.566066000000000",
            "latitudes": "13.720901000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1038239,
            "hotelName": "Eastin",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.544527000000000",
            "latitudes": "13.760042000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 1005452,
            "hotelName": "First",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-FIR-1.jpg",
            "location": "",
            "longitude": "100.535356000000000",
            "latitudes": "13.752403000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3372,
            "additionalPrice": 0
        }, {
            "hotelID": 1005453,
            "hotelName": "First House",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-FIR1-1.jpg",
            "location": "",
            "longitude": "100.528104000000000",
            "latitudes": "13.750979000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3299,
            "additionalPrice": 0
        }, {
            "hotelID": 1005455,
            "hotelName": "Forum Park",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-FOR1-2.jpg",
            "location": "",
            "longitude": "100.535636000000000",
            "latitudes": "13.706926000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3283,
            "additionalPrice": 0
        }, {
            "hotelID": 1005456,
            "hotelName": "Four Wings",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-FOU2-1.jpg",
            "location": "",
            "longitude": "100.569097000000000",
            "latitudes": "13.724498000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3488,
            "additionalPrice": 0
        }, {
            "hotelID": 1005458,
            "hotelName": "All Seasons Gold Orchid",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-GOL-3.jpg",
            "location": "",
            "longitude": "100.560581000000000",
            "latitudes": "13.791232000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3381,
            "additionalPrice": 0
        }, {
            "hotelID": 1005460,
            "hotelName": "Grand China Princess",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-GRA1-15.jpg",
            "location": "",
            "longitude": "100.507401000000000",
            "latitudes": "13.742698000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1038099,
            "hotelName": "Grande Ville",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.503775000000000",
            "latitudes": "13.745498000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3331,
            "additionalPrice": 0
        }, {
            "hotelID": 1005463,
            "hotelName": "Grand Diamond Suites",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-GRA7-1.jpg",
            "location": "",
            "longitude": "100.538477600000000",
            "latitudes": "13.750130570000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3521,
            "additionalPrice": 0
        }, {
            "hotelID": 1005464,
            "hotelName": "Grand Tower Inn Rama Vi",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-GRA8-1.jpg",
            "location": "",
            "longitude": "100.548273000000000",
            "latitudes": "13.796869000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "1",
            "currencyCode": "CNY",
            "avgRatePerPax": 3406,
            "additionalPrice": 0
        }, {
            "hotelID": 1005468,
            "hotelName": "Heritage Baan Silom",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-HER-1.jpg",
            "location": "",
            "longitude": "100.520763000000000",
            "latitudes": "13.723311000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 1005469,
            "hotelName": "Heritage Bangkok",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-HER2-1.jpg",
            "location": "",
            "longitude": "100.529767600000000",
            "latitudes": "13.724014880000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3439,
            "additionalPrice": 0
        }, {
            "hotelID": 1005480,
            "hotelName": "Indra Regent",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-IND1-9.jpg",
            "location": "",
            "longitude": "100.541529000000000",
            "latitudes": "13.753009000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 1005488,
            "hotelName": "Unico Express At Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-LEE-2.jpg",
            "location": "",
            "longitude": "100.554236000000000",
            "latitudes": "13.747850000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3357,
            "additionalPrice": 0
        }, {
            "hotelID": 1005489,
            "hotelName": "Le Fenix Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-LEF-4.jpg",
            "location": "",
            "longitude": "100.556067700000000",
            "latitudes": "13.744807880000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3480,
            "additionalPrice": 0
        }, {
            "hotelID": 1005502,
            "hotelName": "Swissotel Le Concorde",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-MER2-1.jpg",
            "location": "",
            "longitude": "100.574400000000000",
            "latitudes": "13.769506000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3711,
            "additionalPrice": 0
        }, {
            "hotelID": 1005512,
            "hotelName": "Bangkok Hotel Lotus Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-NOV1-1.jpg",
            "location": "",
            "longitude": "100.572842000000000",
            "latitudes": "13.729647000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3605,
            "additionalPrice": 0
        }, {
            "hotelID": 1005525,
            "hotelName": "Patra Place",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-PAT4-1.jpg",
            "location": "",
            "longitude": "100.608764000000000",
            "latitudes": "13.746803000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3324,
            "additionalPrice": 0
        }, {
            "hotelID": 1005533,
            "hotelName": "President Park",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-PRE-1.jpg",
            "location": "",
            "longitude": "100.565520000000000",
            "latitudes": "13.721235000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 1005534,
            "hotelName": "President Solitaire",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-PRE1-1.jpg",
            "location": "",
            "longitude": "100.557615000000000",
            "latitudes": "13.745371000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 1038191,
            "hotelName": "President Palace",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.556920000000000",
            "latitudes": "13.743351000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3539,
            "additionalPrice": 0
        }, {
            "hotelID": 1005536,
            "hotelName": "Princeton Bangkok",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-PRI1-1.jpg",
            "location": "",
            "longitude": "100.556471900000000",
            "latitudes": "13.771680840000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 1005539,
            "hotelName": "Radisson Suites Bangkok",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-RAD7-14.jpg",
            "location": "",
            "longitude": "100.557357000000000",
            "latitudes": "13.744038000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3752,
            "additionalPrice": 0
        }, {
            "hotelID": 1005541,
            "hotelName": "Ramada Hotel & Suites Bangkok",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-RAM5-2.jpg",
            "location": "",
            "longitude": "100.557764200000000",
            "latitudes": "13.734591960000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3498,
            "additionalPrice": 0
        }, {
            "hotelID": 1005544,
            "hotelName": "Residence Rajtaevee",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-RES-1.jpg",
            "location": "",
            "longitude": "100.533713000000000",
            "latitudes": "13.751208000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3340,
            "additionalPrice": 0
        }, {
            "hotelID": 1005545,
            "hotelName": "Royal Benja",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ROY-1.jpg",
            "location": "",
            "longitude": "100.554980000000000",
            "latitudes": "13.745047000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1005546,
            "hotelName": "Royal Princess",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ROY2-3.jpg",
            "location": "",
            "longitude": "100.513968000000000",
            "latitudes": "13.756639000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1005548,
            "hotelName": "Royal President",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ROY4-1.jpg",
            "location": "",
            "longitude": "100.558548000000000",
            "latitudes": "13.738905000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3456,
            "additionalPrice": 0
        }, {
            "hotelID": 1005549,
            "hotelName": "Royal Orchid Sheraton",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ROY5-1.jpg",
            "location": "",
            "longitude": "100.513849000000000",
            "latitudes": "13.729208000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3985,
            "additionalPrice": 0
        }, {
            "hotelID": 1005554,
            "hotelName": "Dusit Princess Srinakarin",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-ROYI-1.jpg",
            "location": "",
            "longitude": "100.642226000000000",
            "latitudes": "13.747581000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3506,
            "additionalPrice": 0
        }, {
            "hotelID": 1005556,
            "hotelName": "Sacha's Uno",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SAC-2.jpg",
            "location": "",
            "longitude": "100.560078100000000",
            "latitudes": "13.739037940000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3521,
            "additionalPrice": 0
        }, {
            "hotelID": 1005569,
            "hotelName": "Shanghai Mansion",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SHA4-1.jpg",
            "location": "",
            "longitude": "100.511162000000000",
            "latitudes": "13.739666000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3555,
            "additionalPrice": 0
        }, {
            "hotelID": 1038389,
            "hotelName": "Siam Heritage",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SIA1-1.jpg",
            "location": "",
            "longitude": "100.528142000000000",
            "latitudes": "13.728660000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3535,
            "additionalPrice": 0
        }, {
            "hotelID": 1005572,
            "hotelName": "Siam @ Siam Design",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SIA4-1.jpg",
            "location": "",
            "longitude": "100.526435000000000",
            "latitudes": "13.747134000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3770,
            "additionalPrice": 0
        }, {
            "hotelID": 1038430,
            "hotelName": "Siam Society",
            "hotelPictureURL": "",
            "location": "",
            "longitude": "100.599768000000000",
            "latitudes": "13.755661000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3439,
            "additionalPrice": 0
        }, {
            "hotelID": 1005574,
            "hotelName": "Siam Piman,suvarnabhumi Apt.",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SIAA-1.jpg",
            "location": "",
            "longitude": "100.714448000000000",
            "latitudes": "13.796962000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3372,
            "additionalPrice": 0
        }, {
            "hotelID": 1005575,
            "hotelName": "Silom City",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SIL-9.jpg",
            "location": "",
            "longitude": "100.522005000000000",
            "latitudes": "13.725788000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3343,
            "additionalPrice": 0
        }, {
            "hotelID": 1005578,
            "hotelName": "Grand Mercure Asoke Residence",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SOF3-1.jpg",
            "location": "",
            "longitude": "100.561405000000000",
            "latitudes": "13.739919000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3719,
            "additionalPrice": 0
        }, {
            "hotelID": 1005581,
            "hotelName": "Twin Towers",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SOL-1.jpg",
            "location": "",
            "longitude": "100.520083000000000",
            "latitudes": "13.745362000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3439,
            "additionalPrice": 0
        }, {
            "hotelID": 1005584,
            "hotelName": "S15 Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SSU-3.jpg",
            "location": "",
            "longitude": "100.558360000000000",
            "latitudes": "13.738729000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3584,
            "additionalPrice": 0
        }, {
            "hotelID": 1005585,
            "hotelName": "S31 Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-SSU3-2.jpg",
            "location": "",
            "longitude": "100.565919000000000",
            "latitudes": "13.733426000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3803,
            "additionalPrice": 0
        }, {
            "hotelID": 1005591,
            "hotelName": "Furama Silom",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-TOW-1.jpg",
            "location": "",
            "longitude": "100.525773000000000",
            "latitudes": "13.724711000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3473,
            "additionalPrice": 0
        }, {
            "hotelID": 1005592,
            "hotelName": "Triple Two Silom",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-TRI-2.jpg",
            "location": "",
            "longitude": "100.526590000000000",
            "latitudes": "13.725768000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3621,
            "additionalPrice": 0
        }, {
            "hotelID": 1005593,
            "hotelName": "Glow Trinity Silom",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-TRI1-2.jpg",
            "location": "",
            "longitude": "100.533199000000000",
            "latitudes": "13.727374000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "2",
            "currencyCode": "CNY",
            "avgRatePerPax": 3422,
            "additionalPrice": 0
        }, {
            "hotelID": 1005594,
            "hotelName": "Furamaxclusive Sathorn",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-UNI-1.jpg",
            "location": "",
            "longitude": "100.538804000000000",
            "latitudes": "13.725802000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3719,
            "additionalPrice": 0
        }, {
            "hotelID": 1005595,
            "hotelName": "Furamaxclusive Sukhumvit",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-UNI4-1.jpg",
            "location": "",
            "longitude": "100.552374000000000",
            "latitudes": "13.743724000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3719,
            "additionalPrice": 0
        }, {
            "hotelID": 1005596,
            "hotelName": "Furamaxclusive Asoke",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-UNI6-1.jpg",
            "location": "",
            "longitude": "100.561548000000000",
            "latitudes": "13.739801000000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "4",
            "currencyCode": "CNY",
            "avgRatePerPax": 3752,
            "additionalPrice": 0
        }, {
            "hotelID": 1005598,
            "hotelName": "Vie-m Gallery",
            "hotelPictureURL": "http://images.gta-travel.com/HH/Images/TH/BKKth/BKK-VIE2-8.jpg",
            "location": "",
            "longitude": "100.532061800000000",
            "latitudes": "13.750546540000000",
            "city": "Bangkok",
            "country": "Thailand",
            "starRating": "8",
            "currencyCode": "CNY",
            "avgRatePerPax": 3736,
            "additionalPrice": 0
        }],
        "starRatingList": [{"starRatingValue": 4, "starRatingName": "4"}, {
            "starRatingValue": 8,
            "starRatingName": "5"
        }, {"starRatingValue": 2, "starRatingName": "3"}, {"starRatingValue": 1, "starRatingName": "2"}],
        "locationList": ["Sukhumvit", "Pratunam Area", "Central World", "Petchburi", "Muang Thong Thani", "Chao Phraya Riverside", "Sathorn", "Suvarnabhumi Airport", "Ploenchit", "Surawongse", "Silom", "China Town", "Wireless", "MBK Shopping Complex, Siam Square", "Chatuchak Area (Weekend Market)", "Langsuan", "Ratchadapisek & Rama 9", "Khao Sarn"]
    }
}

//机票和酒店订单创建订单
//网络异常，请点击重试
//机票和酒店订单确认接口
//网络异常，请点击重试

//机票和酒店订单订单Finalize接口
var result3 = {
    "success": 1,
    "code": 200,
    "data": {"bookingID": 514954, "bookingRefNo": "SG17SINFP0375958", "reservationStatus": 1, "paymentStatus": 1}
}


//订单详情
var result4 = {
    "success": 1,
    "code": 200,
    "data": {
        "flightInfo": {
            "setID": 0,
            "cacheID": 0,
            "segmentsLeaveTotalTravelTime": 715,
            "segmentsLeaveTotalTravelTimeString": "7h15m",
            "segmentsReturnTotalTravelTime": 705,
            "segmentsReturnTotalTravelTimeString": "7h05m",
            "cityCodeFrom": "SIN",
            "cityCodeTo": "BKK",
            "cityNameFrom": "新加坡",
            "cityNameTo": "曼谷",
            "isLeaveShareFlight": 0,
            "isReturnShareFlight": 0,
            "isInternationalFlight": 1,
            "flightLeaveStartDate": "2016-04-25T06:40:00",
            "flightLeaveEndDate": "2016-04-25T10:15:00",
            "flightReturnStartDate": "2016-04-27T06:00:00",
            "flightReturnEndDate": "2016-04-27T11:25:00",
            "flightLeaveSpacingDay": 0,
            "flightReturnSpacingDay": 0,
            "segmentsLeave": [{
                "airportCodeFrom": "SIN",
                "airportCodeTo": "KUL",
                "cityCodeFrom": "SIN",
                "cityCodeTo": "BKK",
                "airportNameFrom": "新加坡樟宜机场",
                "airportNameTo": "吉隆坡国际机场",
                "cityNameFrom": "新加坡",
                "cityNameTo": "吉隆坡",
                "airCorpCode": "MH",
                "airCorpName": "马来西亚航空公司",
                "flightNo": "602",
                "departDate": "2016-04-25T06:40:00",
                "arriveDate": "2016-04-25T07:40:00",
                "planeType": "738",
                "planeName": "波音737-800",
                "marketingCarrierCode": "MH",
                "operatingCarrierCode": "MH",
                "operatingCarrierName": "马来西亚航空公司"
            }, {
                "airportCodeFrom": "KUL",
                "airportCodeTo": "BKK",
                "cityCodeFrom": "SIN",
                "cityCodeTo": "BKK",
                "airportNameFrom": "吉隆坡国际机场",
                "airportNameTo": "曼谷苏瓦纳蓬国际机场",
                "cityNameFrom": "吉隆坡",
                "cityNameTo": "曼谷",
                "airCorpCode": "MH",
                "airCorpName": "马来西亚航空公司",
                "flightNo": "784",
                "departDate": "2016-04-25T09:10:00",
                "arriveDate": "2016-04-25T10:15:00",
                "planeType": "738",
                "planeName": "波音737-800",
                "marketingCarrierCode": "MH",
                "operatingCarrierCode": "MH",
                "operatingCarrierName": "马来西亚航空公司"
            }],
            "segmentsReturn": [{
                "airportCodeFrom": "BKK",
                "airportCodeTo": "KUL",
                "cityCodeFrom": "SIN",
                "cityCodeTo": "BKK",
                "airportNameFrom": "曼谷苏瓦纳蓬国际机场",
                "airportNameTo": "吉隆坡国际机场",
                "cityNameFrom": "曼谷",
                "cityNameTo": "吉隆坡",
                "airCorpCode": "MH",
                "airCorpName": "马来西亚航空公司",
                "flightNo": "797",
                "departDate": "2016-04-27T06:00:00",
                "arriveDate": "2016-04-27T09:10:00",
                "planeType": "738",
                "planeName": "波音737-800",
                "marketingCarrierCode": "MH",
                "operatingCarrierCode": "MH",
                "operatingCarrierName": "马来西亚航空公司"
            }, {
                "airportCodeFrom": "KUL",
                "airportCodeTo": "SIN",
                "cityCodeFrom": "SIN",
                "cityCodeTo": "BKK",
                "airportNameFrom": "吉隆坡国际机场",
                "airportNameTo": "新加坡樟宜机场",
                "cityNameFrom": "吉隆坡",
                "cityNameTo": "新加坡",
                "airCorpCode": "MH",
                "airCorpName": "马来西亚航空公司",
                "flightNo": "627",
                "departDate": "2016-04-27T10:15:00",
                "arriveDate": "2016-04-27T11:25:00",
                "planeType": "738",
                "planeName": "波音737-800",
                "marketingCarrierCode": "MH",
                "operatingCarrierCode": "MH",
                "operatingCarrierName": "马来西亚航空公司"
            }],
            "directFlight": 1,
            "currencyCode": "CNY"
        },
        "currencyCode": "CNY",
        "totalFlightPrice": 4816,
        "createTime": "2016-04-12T15:48:00",
        "isContinuePay": 0,
        "bookingRefNo": "SG17SINFP0375958",
        "travelers": [{
            "travelerName": "xiaoding",
            "lastName": "ding",
            "idType": 1,
            "idNumber": "P989878",
            "sexCode": 1
        }, {"travelerName": "xiaoding", "lastName": "ding", "idType": 1, "idNumber": "P989878", "sexCode": 1}],
        "contactNumber": "86--15001235421",
        "email": "Kim@email.com",
        "sexCode": 1,
        "firstName": "xiao",
        "lastName": "ding",
        "hotelDetails": {
            "hotleName": "Amari Boulevard",
            "checkInDate": "2016-04-25T00:00:00",
            "checkoutDate": "2016-04-27T00:00:00",
            "roomDetials": {"roomName": "Superior Room", "totalAdult": 2, "totalChild": 0, "numRoom": 1}
        }
    }
}

//获取所有城市列表
var result5 = {
    "success": 1,
    "code": 200,
    "data": [{"cityCode": "AUH", "cityName": "阿布扎比", "countryCode": "AE", "countryName": "阿联酋"}, {
        "cityCode": "DXB",
        "cityName": "迪拜",
        "countryCode": "AE",
        "countryName": "阿联酋"
    }, {"cityCode": "SHJ", "cityName": "沙迦", "countryCode": "AE", "countryName": "阿联酋"}, {
        "cityCode": "TIA",
        "cityName": "地拉那",
        "countryCode": "AL",
        "countryName": "阿尔巴尼亚"
    }, {"cityCode": "EVN", "cityName": "埃里温", "countryCode": "AM", "countryName": "亚美尼亚"}, {
        "cityCode": "LWN",
        "cityName": "久姆里",
        "countryCode": "AM",
        "countryName": "亚美尼亚"
    }, {"cityCode": "GRZ", "cityName": "格拉茨", "countryCode": "AT", "countryName": "奥地利"}, {
        "cityCode": "HOH",
        "cityName": "霍恩埃姆斯",
        "countryCode": "AT",
        "countryName": "奥地利"
    }, {"cityCode": "INN", "cityName": "因斯布鲁克", "countryCode": "AT", "countryName": "奥地利"}, {
        "cityCode": "KLU",
        "cityName": "克拉根福",
        "countryCode": "AT",
        "countryName": "奥地利"
    }, {"cityCode": "LNZ", "cityName": "林茨", "countryCode": "AT", "countryName": "奥地利"}, {
        "cityCode": "SZG",
        "cityName": "萨尔茨堡",
        "countryCode": "AT",
        "countryName": "奥地利"
    }, {"cityCode": "VIE", "cityName": "维也纳", "countryCode": "AT", "countryName": "奥地利"}, {
        "cityCode": "ADL",
        "cityName": "阿德莱德",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "BNE", "cityName": "布里斯班", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "CBR",
        "cityName": "堪培拉",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "CNS", "cityName": "凯恩斯", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "DRW",
        "cityName": "达尔文",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "HBA", "cityName": "霍巴特", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "LST",
        "cityName": "朗塞斯顿",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "MEL", "cityName": "墨尔本", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "NTL",
        "cityName": "纽卡斯尔",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "OOL", "cityName": "黃金海岸", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "PER",
        "cityName": "珀斯",
        "countryCode": "AU",
        "countryName": "澳大利亚"
    }, {"cityCode": "SYD", "cityName": "悉尼", "countryCode": "AU", "countryName": "澳大利亚"}, {
        "cityCode": "SJJ",
        "cityName": "萨拉热窝",
        "countryCode": "BA",
        "countryName": "波斯尼亚和黑塞哥维那"
    }, {"cityCode": "BRU", "cityName": "布鲁塞尔", "countryCode": "BE", "countryName": "比利时"}, {
        "cityCode": "LGG",
        "cityName": "列格",
        "countryCode": "BE",
        "countryName": "比利时"
    }, {"cityCode": "OST", "cityName": "奥斯坦德", "countryCode": "BE", "countryName": "比利时"}, {
        "cityCode": "BOJ",
        "cityName": "布尔加斯",
        "countryCode": "BG",
        "countryName": "保加利亚"
    }, {"cityCode": "SOF", "cityName": "索非亚", "countryCode": "BG", "countryName": "保加利亚"}, {
        "cityCode": "VAR",
        "cityName": "瓦尔纳",
        "countryCode": "BG",
        "countryName": "保加利亚"
    }, {"cityCode": "BAH", "cityName": "巴林", "countryCode": "BH", "countryName": "巴林"}, {
        "cityCode": "GME",
        "cityName": "戈梅利",
        "countryCode": "BY",
        "countryName": "白俄罗斯"
    }, {"cityCode": "MSQ", "cityName": "明斯克", "countryCode": "BY", "countryName": "白俄罗斯"}, {
        "cityCode": "YMQ",
        "cityName": "蒙特利尔",
        "countryCode": "CA",
        "countryName": "加拿大"
    }, {"cityCode": "YTO", "cityName": "多伦多", "countryCode": "CA", "countryName": "加拿大"}, {
        "cityCode": "YVR",
        "cityName": "温哥华",
        "countryCode": "CA",
        "countryName": "加拿大"
    }, {"cityCode": "ACH", "cityName": "阿尔滕莱茵", "countryCode": "CH", "countryName": "瑞士"}, {
        "cityCode": "BRN",
        "cityName": "伯尔尼",
        "countryCode": "CH",
        "countryName": "瑞士"
    }, {"cityCode": "EAP", "cityName": "巴塞尔/牟罗兹", "countryCode": "CH", "countryName": "瑞士"}, {
        "cityCode": "GVA",
        "cityName": "日内瓦城",
        "countryCode": "CH",
        "countryName": "瑞士"
    }, {"cityCode": "LUG", "cityName": "卢加诺", "countryCode": "CH", "countryName": "瑞士"}, {
        "cityCode": "ZRH",
        "cityName": "苏黎世",
        "countryCode": "CH",
        "countryName": "瑞士"
    }, {"cityCode": "BAV", "cityName": "包头", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "BJS",
        "cityName": "北京",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "CAN", "cityName": "广州", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "CGO",
        "cityName": "郑州",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "CGQ", "cityName": "长春", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "CKG",
        "cityName": "重庆",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "CSX", "cityName": "长沙", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "CTU",
        "cityName": "成都",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "DLC", "cityName": "大连", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "FOC",
        "cityName": "福州",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "HAK", "cityName": "海口", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "HET",
        "cityName": "呼和浩特",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "HFE", "cityName": "合肥", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "HGH",
        "cityName": "杭州",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "HRB", "cityName": "哈尔滨", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "INC",
        "cityName": "银川",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "KHN", "cityName": "南昌", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "KMG",
        "cityName": "昆明",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "KWE", "cityName": "贵阳", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "KWL",
        "cityName": "桂林",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "LHW", "cityName": "兰州", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "LXA",
        "cityName": "拉萨",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "NGB", "cityName": "宁波", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "NKG",
        "cityName": "南京",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "NNG", "cityName": "南宁", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "SHA",
        "cityName": "上海",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "SHE", "cityName": "沈阳", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "SIA",
        "cityName": "西安",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "SJW", "cityName": "石家庄", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "SWA",
        "cityName": "汕头",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "SYX", "cityName": "三亚", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "SZX",
        "cityName": "深圳",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "TAO", "cityName": "青岛", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "TNA",
        "cityName": "济南",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "TSN", "cityName": "天津", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "TYN",
        "cityName": "太原",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "URC", "cityName": "乌鲁木齐", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "WEH",
        "cityName": "威海",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "WUH", "cityName": "武汉", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "XMN",
        "cityName": "厦门",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "XNN", "cityName": "西宁", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "YIH",
        "cityName": "宜昌",
        "countryCode": "CN",
        "countryName": "中国"
    }, {"cityCode": "YNT", "cityName": "烟台", "countryCode": "CN", "countryName": "中国"}, {
        "cityCode": "ECN",
        "cityName": "而参",
        "countryCode": "CY",
        "countryName": "塞浦路斯"
    }, {"cityCode": "LCA", "cityName": "拉纳卡", "countryCode": "CY", "countryName": "塞浦路斯"}, {
        "cityCode": "PFO",
        "cityName": "帕福斯",
        "countryCode": "CY",
        "countryName": "塞浦路斯"
    }, {"cityCode": "BRQ", "cityName": "布尔诺", "countryCode": "CZ", "countryName": "捷克共和国"}, {
        "cityCode": "KLV",
        "cityName": "卡罗维发利",
        "countryCode": "CZ",
        "countryName": "捷克共和国"
    }, {"cityCode": "OSR", "cityName": "俄斯特拉发", "countryCode": "CZ", "countryName": "捷克共和国"}, {
        "cityCode": "PED",
        "cityName": "帕尔杜比采",
        "countryCode": "CZ",
        "countryName": "捷克共和国"
    }, {"cityCode": "PRG", "cityName": "布拉格", "countryCode": "CZ", "countryName": "捷克共和国"}, {
        "cityCode": "AOC",
        "cityName": "阿尔腾堡",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "BER", "cityName": "柏林", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "BFE",
        "cityName": "比勒费尔德",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "BMK", "cityName": "波昆", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "BRE",
        "cityName": "不来梅",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "BRV", "cityName": "不莱梅港", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "BWE",
        "cityName": "不伦瑞克",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "CGN", "cityName": "科隆", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "DRS",
        "cityName": "德累斯顿",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "DTM", "cityName": "多特蒙德", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "DUS",
        "cityName": "杜塞尔多夫",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "EIB", "cityName": "埃森纳赫", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "EME",
        "cityName": "埃姆登",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "ERF", "cityName": "埃尔福特", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "ESS",
        "cityName": "艾森",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "EUM", "cityName": "纽蒙斯特", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "FCN",
        "cityName": "库克斯港",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "FDH", "cityName": "腓特烈港", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "FKB",
        "cityName": "卡尔斯鲁厄/巴登巴登",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "FMM", "cityName": "南德曼明根", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "FMO",
        "cityName": "明斯特",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "FRA", "cityName": "法兰克福", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "GWT",
        "cityName": "威斯特兰德",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "HAJ", "cityName": "汉诺威", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "HAM",
        "cityName": "汉堡",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "HDB", "cityName": "海德尔堡", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "HDF",
        "cityName": "赫林斯多夫",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "HEI", "cityName": "海德布埃色姆", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "HGL",
        "cityName": "海谷兰德",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "HOQ", "cityName": "河福", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "IGS",
        "cityName": "因戈尔施塔特-曼兴",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "KSF", "cityName": "卡塞尔", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "LEJ",
        "cityName": "莱比锡/哈利",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "MHG", "cityName": "曼海姆", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "MUC",
        "cityName": "慕尼黑",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "NUE", "cityName": "纽伦堡", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "PAD",
        "cityName": "帕德博恩",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "RLG", "cityName": "罗斯托克-拉吉", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "SCN",
        "cityName": "萨尔布吕肯",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "STR", "cityName": "斯图加特", "countryCode": "DE", "countryName": "德国"}, {
        "cityCode": "ZPY",
        "cityName": "西格堡",
        "countryCode": "DE",
        "countryName": "德国"
    }, {"cityCode": "JIB", "cityName": "吉布提", "countryCode": "DJ", "countryName": "吉布提"}, {
        "cityCode": "AAL",
        "cityName": "奥尔堡",
        "countryCode": "DK",
        "countryName": "丹麦"
    }, {"cityCode": "AAR", "cityName": "奥尔胡斯", "countryCode": "DK", "countryName": "丹麦"}, {
        "cityCode": "BLL",
        "cityName": "比隆",
        "countryCode": "DK",
        "countryName": "丹麦"
    }, {"cityCode": "CPH", "cityName": "哥本哈根", "countryCode": "DK", "countryName": "丹麦"}, {
        "cityCode": "EBJ",
        "cityName": "艾斯堡",
        "countryCode": "DK",
        "countryName": "丹麦"
    }, {"cityCode": "KRP", "cityName": "卡鲁普", "countryCode": "DK", "countryName": "丹麦"}, {
        "cityCode": "ODE",
        "cityName": "欧登塞",
        "countryCode": "DK",
        "countryName": "丹麦"
    }, {"cityCode": "RNN", "cityName": "波恩霍尔姆", "countryCode": "DK", "countryName": "丹麦"}, {
        "cityCode": "SGD",
        "cityName": "颂德堡",
        "countryCode": "DK",
        "countryName": "丹麦"
    }, {"cityCode": "AAE", "cityName": "安纳巴", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "ALG",
        "cityName": "阿尔及尔",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "CBH", "cityName": "比查", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "CZL",
        "cityName": "康斯坦汀",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "ELU", "cityName": "埃尔奎德", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "GJL",
        "cityName": "吉杰尔",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "INZ", "cityName": "艾因萨拉赫", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "OGX",
        "cityName": "瓦尔格拉",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "ORN", "cityName": "奥兰", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "QSF",
        "cityName": "塞蒂夫",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "TEE", "cityName": "泰贝萨", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "TGR",
        "cityName": "图古尔特",
        "countryCode": "DZ",
        "countryName": "阿尔及利亚"
    }, {"cityCode": "TIN", "cityName": "廷杜夫", "countryCode": "DZ", "countryName": "阿尔及利亚"}, {
        "cityCode": "KDL",
        "cityName": "凯尔德拉",
        "countryCode": "EE",
        "countryName": "爱沙尼亚"
    }, {"cityCode": "TLL", "cityName": "塔林", "countryCode": "EE", "countryName": "爱沙尼亚"}, {
        "cityCode": "URE",
        "cityName": "库雷萨雷",
        "countryCode": "EE",
        "countryName": "爱沙尼亚"
    }, {"cityCode": "ABS", "cityName": "阿布辛贝勒", "countryCode": "EG", "countryName": "埃及"}, {
        "cityCode": "ALY",
        "cityName": "埃及亚历山大",
        "countryCode": "EG",
        "countryName": "埃及"
    }, {"cityCode": "ASW", "cityName": "阿斯旺", "countryCode": "EG", "countryName": "埃及"}, {
        "cityCode": "CAI",
        "cityName": "开罗",
        "countryCode": "EG",
        "countryName": "埃及"
    }, {"cityCode": "HRG", "cityName": "洪加达", "countryCode": "EG", "countryName": "埃及"}, {
        "cityCode": "LXR",
        "cityName": "路克索",
        "countryCode": "EG",
        "countryName": "埃及"
    }, {"cityCode": "SSH", "cityName": "沙姆沙伊赫", "countryCode": "EG", "countryName": "埃及"}, {
        "cityCode": "ABC",
        "cityName": "阿尔巴赛特",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "ACE", "cityName": "兰萨罗特", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "AGP",
        "cityName": "马拉加",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "ALC", "cityName": "阿里坎特", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "BCN",
        "cityName": "巴塞罗那(ES)",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "BIO", "cityName": "毕尔巴鄂", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "BJZ",
        "cityName": "巴达霍斯",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "EAS", "cityName": "圣塞巴斯汀", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "FUE",
        "cityName": "富尔迪云度拉",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "GMZ", "cityName": "果美拉岛的圣塞巴斯提安市", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "GRO",
        "cityName": "赫罗纳",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "GRX", "cityName": "格兰纳达博尼", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "IBZ",
        "cityName": "伊比沙岛",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "JCU", "cityName": "休达", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "LCG",
        "cityName": "拉科鲁尼亚",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "LEI", "cityName": "阿尔梅里亚", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "LEN",
        "cityName": "利昂",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "LPA", "cityName": "拉斯帕尔马斯", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "MAD",
        "cityName": "马德里",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "MAH", "cityName": "梅诺卡岛", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "MJV",
        "cityName": "穆西亚",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "MLN", "cityName": "梅利利亚", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "OVD",
        "cityName": "阿斯图利亚斯",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "PMI", "cityName": "帕尔马马略卡岛", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "PNA",
        "cityName": "潘普洛纳",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "REU", "cityName": "雷乌斯", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "RJL",
        "cityName": "罗格诺",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "SCQ", "cityName": "圣地亚哥-德-孔波斯特拉", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "SDR",
        "cityName": "桑坦德",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "SPC", "cityName": "圣克鲁斯", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "SVQ",
        "cityName": "塞维亚",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "TCI", "cityName": "特內裡費島", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "VDE",
        "cityName": "蔚皇居",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "VGO", "cityName": "比戈", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "VIT",
        "cityName": "维多利亚（ES）",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "VLC", "cityName": "巴伦西亚（ES）", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "VLL",
        "cityName": "瓦拉杜利德",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "XRY", "cityName": "赫雷斯-德拉弗龙特拉", "countryCode": "ES", "countryName": "西班牙"}, {
        "cityCode": "ZAZ",
        "cityName": "萨拉戈萨",
        "countryCode": "ES",
        "countryName": "西班牙"
    }, {"cityCode": "ENF", "cityName": "埃农泰基厄", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "HEL",
        "cityName": "赫尔辛基",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "IVL", "cityName": "伊瓦洛", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "JOE",
        "cityName": "约恩苏",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "JYV", "cityName": "于韦斯屈莱", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "KAJ",
        "cityName": "科亚尼",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "KAO", "cityName": "库萨莫", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "KEM",
        "cityName": "凯米/托尔尼奥",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "KOK", "cityName": "科科拉/皮耶塔尔萨里", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "KTT",
        "cityName": "基蒂莱",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "KUO", "cityName": "库奥皮奥", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "LPP",
        "cityName": "拉彭兰塔",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "MHQ", "cityName": "马利汉姆", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "OUL",
        "cityName": "奥卢",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "POR", "cityName": "波里", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "RVN",
        "cityName": "罗凡尼米",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "SJY", "cityName": "塞纳约基", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "SVL",
        "cityName": "萨翁林纳",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "TKU", "cityName": "土尔库", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "TMP",
        "cityName": "坦佩雷",
        "countryCode": "FI",
        "countryName": "芬兰"
    }, {"cityCode": "VAA", "cityName": "瓦萨", "countryCode": "FI", "countryName": "芬兰"}, {
        "cityCode": "AGF",
        "cityName": "阿根",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "AJA", "cityName": "阿雅克修", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "ANE",
        "cityName": "昂热",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "ANG", "cityName": "安格雷姆", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "AUR",
        "cityName": "奥里亚克",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "AVN", "cityName": "阿维尼翁", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "BES",
        "cityName": "布雷斯特",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "BIA", "cityName": "巴斯蒂亚", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "BIQ",
        "cityName": "贝阿里兹",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "BOD", "cityName": "波尔多", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "BVE",
        "cityName": "布里夫-拉盖亚尔德",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "BZR", "cityName": "贝济耶", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "CCF",
        "cityName": "卡尔卡松",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "CER", "cityName": "瑟堡", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "CFE",
        "cityName": "克莱蒙费朗",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "CFR", "cityName": "卡昂", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "CLY",
        "cityName": "卡勒威",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "CMF", "cityName": "尚贝里", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "DCM",
        "cityName": "卡斯特尔",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "DNR", "cityName": "迪纳尔", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "DOL",
        "cityName": "多维尔",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "EBU", "cityName": "圣埃蒂安", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "EGC",
        "cityName": "贝尔吉拉克",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "ETZ", "cityName": "梅兹南希", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "FNI",
        "cityName": "尼姆",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "FSC", "cityName": "费加里", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "IDY",
        "cityName": "伊欧岛",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "LAI", "cityName": "拉尼翁", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "LDE",
        "cityName": "卢瑞德斯/塔布斯",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "LEH", "cityName": "勒阿弗尔", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "LIG",
        "cityName": "里摩日",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "LIL", "cityName": "里尔", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "LME",
        "cityName": "勒芒",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "LPY", "cityName": "勒培", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "LRH",
        "cityName": "拉罗谢尔",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "LRT", "cityName": "洛里昂", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "LYS",
        "cityName": "里昂",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "MPL", "cityName": "蒙彼利埃", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "MRS",
        "cityName": "马赛",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "NCE", "cityName": "尼斯", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "NCY",
        "cityName": "阿内西",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "NTE", "cityName": "南特", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "PAR",
        "cityName": "巴黎",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "PGF", "cityName": "佩皮尼昂", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "PIS",
        "cityName": "普瓦捷",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "PUF", "cityName": "波城", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "RDZ",
        "cityName": "罗德兹",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "RNS", "cityName": "雷恩", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "SNR",
        "cityName": "圣纳泽尔",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "SXB", "cityName": "斯特拉斯堡", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "TLN",
        "cityName": "土伦",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "TLS", "cityName": "图卢兹", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "TUF",
        "cityName": "图尔斯",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "UIP", "cityName": "坎佩尔", "countryCode": "FR", "countryName": "法国"}, {
        "cityCode": "URO",
        "cityName": "鲁昂",
        "countryCode": "FR",
        "countryName": "法国"
    }, {"cityCode": "ABZ", "cityName": "阿伯丁（GB）", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "ACI",
        "cityName": "奥尔德尼岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "ADX", "cityName": "圣安德鲁斯", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BEB",
        "cityName": "本贝丘拉",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "BFS", "cityName": "贝尔法斯特", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BHX",
        "cityName": "伯明翰（GB）",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "BLK", "cityName": "黑泽", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BOH",
        "cityName": "伯恩茅斯",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "BRF", "cityName": "布拉德福（GB）", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BRR",
        "cityName": "巴拉",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "BRS", "cityName": "布里斯托尔", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BSH",
        "cityName": "布莱顿码头",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "BWF", "cityName": "巴罗因弗内斯", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BZZ",
        "cityName": "布里兹·诺顿",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "CAL", "cityName": "坎普比尔顿", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "CAX",
        "cityName": "卡莱尔",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "CBG", "cityName": "剑桥", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "CEG",
        "cityName": "切斯特",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "CVT", "cityName": "考文垂", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "CWL",
        "cityName": "加的夫",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "DND", "cityName": "敦提", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "DSA",
        "cityName": "唐卡斯特",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "EDI", "cityName": "爱丁堡", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "EOI",
        "cityName": "依代",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "EXT", "cityName": "埃克塞特", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "FAB",
        "cityName": "法恩博洛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "FIE", "cityName": "费尔岛", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "FWM",
        "cityName": "威廉堡机场",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "FZO", "cityName": "弗尔通", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "GCI",
        "cityName": "格恩西岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "GLA", "cityName": "格拉斯哥（GB）", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "GSY",
        "cityName": "格林斯比",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "HLY", "cityName": "荷利赫德", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "HRT",
        "cityName": "哈罗盖特",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "HUY", "cityName": "亨伯赛德郡", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "ILY",
        "cityName": "爱雷岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "INV", "cityName": "恩华利斯", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "IOM",
        "cityName": "马恩岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "IPW", "cityName": "伊普斯威奇", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "ISC",
        "cityName": "锡利群岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "JER", "cityName": "泽西", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "KNF",
        "cityName": "金卡丁-林恩",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "KOI", "cityName": "柯克沃尔", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "KYN",
        "cityName": "米尔顿·凯恩斯",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "LBA", "cityName": "利兹布拉德福德", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "LDY",
        "cityName": "伦敦德里",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "LEQ", "cityName": "兰兹角", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "LON",
        "cityName": "伦敦（GB）",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "LPL", "cityName": "利物浦", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "MAN",
        "cityName": "曼切斯特（GB）",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "MME", "cityName": "达勒姆提斯瓦雷", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "NCL",
        "cityName": "纽卡斯尔（GB）",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "NDY", "cityName": "仙蒂", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "NQT",
        "cityName": "诺丁汉",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "NQY", "cityName": "纽奎", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "NRL",
        "cityName": "北罗纳德赛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "NWI", "cityName": "诺维奇", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "ORM",
        "cityName": "北安普敦",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "OXF", "cityName": "牛津", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "PLH",
        "cityName": "普利茅斯",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "PME", "cityName": "朴茨茅斯", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "PPW",
        "cityName": "帕帕韦斯特雷",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "PZE", "cityName": "潘赞斯", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "SDZ",
        "cityName": "设得兰群岛",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "SEN", "cityName": "索森德", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "SOU",
        "cityName": "南安普顿",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "SOY", "cityName": "斯特龙塞", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "SWS",
        "cityName": "斯旺西",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "SYY", "cityName": "斯托诺韦", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "SZD",
        "cityName": "设菲尔德",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "TRE", "cityName": "提利岛", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "WIC",
        "cityName": "维克",
        "countryCode": "GB",
        "countryName": "英国"
    }, {"cityCode": "WRY", "cityName": "韦斯特雷", "countryCode": "GB", "countryName": "英国"}, {
        "cityCode": "BUS",
        "cityName": "巴统",
        "countryCode": "GE",
        "countryName": "格鲁吉亚"
    }, {"cityCode": "KUT", "cityName": "库塔伊西", "countryCode": "GE", "countryName": "格鲁吉亚"}, {
        "cityCode": "TBS",
        "cityName": "第比利斯",
        "countryCode": "GE",
        "countryName": "格鲁吉亚"
    }, {"cityCode": "AOK", "cityName": "喀帕苏斯岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "ATH",
        "cityName": "雅典（GR）",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "AXD", "cityName": "亚历山德鲁波利斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "CFU",
        "cityName": "克基拉",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "CHQ", "cityName": "干尼亚", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "EFL",
        "cityName": "凯法利尼亚岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "GPA", "cityName": "佩特雷", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "HER",
        "cityName": "伊拉克里翁",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "IOA", "cityName": "约阿尼纳", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "JIK",
        "cityName": "伊卡里亚岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "JKH", "cityName": "希奥岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "JKL",
        "cityName": "卡利姆诺斯岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "JMK", "cityName": "米科諾斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "JNX",
        "cityName": "纳克索斯岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "JSH", "cityName": "西提亚", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "JSI",
        "cityName": "斯亚索斯",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "JSY", "cityName": "西柔斯岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "JTR",
        "cityName": "锡拉",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "JTY", "cityName": "阿斯提帕莱亚岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "KGS",
        "cityName": "科斯岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "KIT", "cityName": "基西拉岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "KLX",
        "cityName": "科拉马塔",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "KSJ", "cityName": "卡索斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "KSO",
        "cityName": "卡斯特里亚",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "KVA", "cityName": "卡瓦拉", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "KZI",
        "cityName": "扣紮尼",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "KZS", "cityName": "卡斯特劳利松岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "LRS",
        "cityName": "勒罗斯",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "LXS", "cityName": "利姆诺斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "MJT",
        "cityName": "米蒂利尼",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "MLO", "cityName": "米洛斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "PAS",
        "cityName": "帕罗斯",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "PVK", "cityName": "普雷韦扎莱夫卡斯", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "RHO",
        "cityName": "罗德斯",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "SKG", "cityName": "萨洛尼卡", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "SKU",
        "cityName": "斯基罗斯岛",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "SMI", "cityName": "萨摩斯岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "VOL",
        "cityName": "沃洛斯",
        "countryCode": "GR",
        "countryName": "希腊"
    }, {"cityCode": "ZTH", "cityName": "扎金索斯岛", "countryCode": "GR", "countryName": "希腊"}, {
        "cityCode": "HKG",
        "cityName": "香港",
        "countryCode": "HK",
        "countryName": "中国香港特别行政区"
    }, {"cityCode": "BWK", "cityName": "波尔", "countryCode": "HR", "countryName": "克罗地亚"}, {
        "cityCode": "DBV",
        "cityName": "杜布罗夫尼克",
        "countryCode": "HR",
        "countryName": "克罗地亚"
    }, {"cityCode": "OSI", "cityName": "奥西耶克", "countryCode": "HR", "countryName": "克罗地亚"}, {
        "cityCode": "PUY",
        "cityName": "普拉",
        "countryCode": "HR",
        "countryName": "克罗地亚"
    }, {"cityCode": "RJK", "cityName": "里耶卡", "countryCode": "HR", "countryName": "克罗地亚"}, {
        "cityCode": "SPU",
        "cityName": "斯普利特",
        "countryCode": "HR",
        "countryName": "克罗地亚"
    }, {"cityCode": "ZAD", "cityName": "扎达尔", "countryCode": "HR", "countryName": "克罗地亚"}, {
        "cityCode": "ZAG",
        "cityName": "萨格勒布",
        "countryCode": "HR",
        "countryName": "克罗地亚"
    }, {"cityCode": "BUD", "cityName": "布达佩斯", "countryCode": "HU", "countryName": "匈牙利"}, {
        "cityCode": "SOB",
        "cityName": "巴拉顿",
        "countryCode": "HU",
        "countryName": "匈牙利"
    }, {"cityCode": "DPS", "cityName": "巴厘登帕萨", "countryCode": "ID", "countryName": "印度尼西亚"}, {
        "cityCode": "JKT",
        "cityName": "雅加达",
        "countryCode": "ID",
        "countryName": "印度尼西亚"
    }, {"cityCode": "SUB", "cityName": "泗水", "countryCode": "ID", "countryName": "印度尼西亚"}, {
        "cityCode": "CFN",
        "cityName": "多内加尔",
        "countryCode": "IE",
        "countryName": "尔兰共和国"
    }, {"cityCode": "DUB", "cityName": "都柏林", "countryCode": "IE", "countryName": "尔兰共和国"}, {
        "cityCode": "GWY",
        "cityName": "戈尔韦",
        "countryCode": "IE",
        "countryName": "尔兰共和国"
    }, {"cityCode": "KIR", "cityName": "凯里郡", "countryCode": "IE", "countryName": "尔兰共和国"}, {
        "cityCode": "NOC",
        "cityName": "科诺可",
        "countryCode": "IE",
        "countryName": "尔兰共和国"
    }, {"cityCode": "ORK", "cityName": "科克", "countryCode": "IE", "countryName": "尔兰共和国"}, {
        "cityCode": "SNN",
        "cityName": "香农",
        "countryCode": "IE",
        "countryName": "尔兰共和国"
    }, {"cityCode": "SXL", "cityName": "斯莱戈", "countryCode": "IE", "countryName": "尔兰共和国"}, {
        "cityCode": "WAT",
        "cityName": "沃特福德",
        "countryCode": "IE",
        "countryName": "尔兰共和国"
    }, {"cityCode": "TLV", "cityName": "特拉维夫", "countryCode": "IL", "countryName": "以色列"}, {
        "cityCode": "AGR",
        "cityName": "阿格拉",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "AGX", "cityName": "阿格蒂岛", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "AJL",
        "cityName": "艾藻尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "AMD", "cityName": "艾哈迈达巴德", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "ATQ",
        "cityName": "阿密萨",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "BBI", "cityName": "布巴内斯瓦尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "BHJ",
        "cityName": "普杰",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "BHO", "cityName": "博帕尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "BLR",
        "cityName": "班加罗尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "BOM", "cityName": "孟买", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "CCJ",
        "cityName": "科泽科德",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "CCU", "cityName": "加尔各答", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "CJB",
        "cityName": "哥印拜陀",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "COK", "cityName": "高知", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "DED",
        "cityName": "德拉敦",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "DEL", "cityName": "德里", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "DHM",
        "cityName": "达兰萨拉",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "GAU", "cityName": "高哈蒂", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "GOI",
        "cityName": "果阿",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "GOP", "cityName": "哥拉克浦", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "GWL",
        "cityName": "瓜廖尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "HBX", "cityName": "呼比利", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "HJR",
        "cityName": "卡久拉霍",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "HYD", "cityName": "海德拉巴", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IDR",
        "cityName": "印多尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IMF", "cityName": "英帕尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "ISK",
        "cityName": "纳西克",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXA", "cityName": "阿加尔塔拉", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IXB",
        "cityName": "巴多格拉",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXC", "cityName": "昌迪加尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IXE",
        "cityName": "芒格洛尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXJ", "cityName": "查谟", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IXL",
        "cityName": "列城",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXM", "cityName": "马杜赖", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IXP",
        "cityName": "帕塔空",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXR", "cityName": "兰契", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "IXU",
        "cityName": "奥兰加巴德",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "IXZ", "cityName": "布莱尔港", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "JAI",
        "cityName": "斋浦尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "JDH", "cityName": "焦特布尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "JGA",
        "cityName": "加纳噶",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "JLR", "cityName": "贾巴尔普尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "JMD",
        "cityName": "詹谢普尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "JRH", "cityName": "焦尔哈德", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "JSA",
        "cityName": "斋沙默尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "KNU", "cityName": "坎普尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "KUU",
        "cityName": "库鲁",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "LKO", "cityName": "勒克瑙", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "MAA",
        "cityName": "钦奈",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "NAG", "cityName": "那格浦尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "PAT",
        "cityName": "巴特那",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "PNQ", "cityName": "浦那", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "RAJ",
        "cityName": "拉扣",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "RPR", "cityName": "赖布尔", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "SHL",
        "cityName": "西隆",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "SLV", "cityName": "西姆拉", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "SXR",
        "cityName": "斯利那加",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "TIR", "cityName": "堤如帕堤", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "TRV",
        "cityName": "特里凡得琅",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "TRZ", "cityName": "蒂鲁吉拉伯利", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "UDR",
        "cityName": "乌代浦尔",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "VNS", "cityName": "瓦拉那西", "countryCode": "IN", "countryName": "印度"}, {
        "cityCode": "VTZ",
        "cityName": "维萨喀巴坦",
        "countryCode": "IN",
        "countryName": "印度"
    }, {"cityCode": "ACZ", "cityName": "扎博尔", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "ADU",
        "cityName": "阿尔达比勒",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "BDH", "cityName": "伦格港", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "BND",
        "cityName": "阿巴斯港",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "BUZ", "cityName": "布什尔", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "GBT",
        "cityName": "戈尔干",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "IFN", "cityName": "伊斯法罕", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "KER",
        "cityName": "克尔曼",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "KIH", "cityName": "基什岛", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "MHD",
        "cityName": "马萨德",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "RAS", "cityName": "拉什特", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "SDG",
        "cityName": "萨南达季",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "SRY", "cityName": "莎丽", "countryCode": "IR", "countryName": "伊朗伊斯兰共和国"}, {
        "cityCode": "THR",
        "cityName": "德黑兰",
        "countryCode": "IR",
        "countryName": "伊朗伊斯兰共和国"
    }, {"cityCode": "AEY", "cityName": "阿库雷里", "countryCode": "IS", "countryName": "冰岛"}, {
        "cityCode": "EGS",
        "cityName": "埃基斯蒂尔",
        "countryCode": "IS",
        "countryName": "冰岛"
    }, {"cityCode": "GRY", "cityName": "格里姆塞", "countryCode": "IS", "countryName": "冰岛"}, {
        "cityCode": "IFJ",
        "cityName": "伊萨菲尔德",
        "countryCode": "IS",
        "countryName": "冰岛"
    }, {"cityCode": "REK", "cityName": "雷克雅未克", "countryCode": "IS", "countryName": "冰岛"}, {
        "cityCode": "THO",
        "cityName": "托斯赫芬",
        "countryCode": "IS",
        "countryName": "冰岛"
    }, {"cityCode": "VEY", "cityName": "韦斯文尼查", "countryCode": "IS", "countryName": "冰岛"}, {
        "cityCode": "VPN",
        "cityName": "沃普纳菲约杜尔",
        "countryCode": "IS",
        "countryName": "冰岛"
    }, {"cityCode": "AHO", "cityName": "阿尔盖罗", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "ALL",
        "cityName": "阿尔班加",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "AOI", "cityName": "安科纳", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "AOT",
        "cityName": "奥斯达",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "BDS", "cityName": "布林迪西", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "BLQ",
        "cityName": "博洛尼亚",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "BRI", "cityName": "巴里", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "BZO",
        "cityName": "博尔查诺/波镇",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "CAG", "cityName": "卡利亚里", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "CRV",
        "cityName": "克罗托內",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "CTA", "cityName": "卡塔尼亚", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "CUF",
        "cityName": "古尼奥",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "EBA", "cityName": "厄尔巴岛", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "FLR",
        "cityName": "佛罗伦萨（IT）",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "FOG", "cityName": "福贾", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "FRL",
        "cityName": "弗利",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "GOA", "cityName": "热那亚", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "LMP",
        "cityName": "朗贝杜萨",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "MIL", "cityName": "米兰", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "NAP",
        "cityName": "那不勒斯（IT）",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "OLB", "cityName": "欧比亚港", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "PEG",
        "cityName": "佩鲁贾",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "PMO", "cityName": "巴勒莫", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "PNL",
        "cityName": "潘泰莱亚岛",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "PSA", "cityName": "比萨", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "PSR",
        "cityName": "佩斯卡拉",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "REG", "cityName": "卡拉布里亚雷焦", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "RMI",
        "cityName": "里米尼",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "ROM", "cityName": "罗马", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "SUF",
        "cityName": "拉默齐亚-泰尔默",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "TPS", "cityName": "特拉帕尼", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "TQR",
        "cityName": "圣多米诺群岛（特雷米蒂群岛）",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "TRN", "cityName": "都灵", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "TRS",
        "cityName": "地里亚斯特",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "VCE", "cityName": "威尼斯", "countryCode": "IT", "countryName": "意大利"}, {
        "cityCode": "VRN",
        "cityName": "维罗纳",
        "countryCode": "IT",
        "countryName": "意大利"
    }, {"cityCode": "AMM", "cityName": "安曼", "countryCode": "JO", "countryName": "约旦"}, {
        "cityCode": "AQJ",
        "cityName": "亚喀巴",
        "countryCode": "JO",
        "countryName": "约旦"
    }, {"cityCode": "AKJ", "cityName": "旭川", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "AOJ",
        "cityName": "青森",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "ASJ", "cityName": "奄美大岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "AXT",
        "cityName": "秋田",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "FKS", "cityName": "福岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "FUJ",
        "cityName": "福江",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "FUK", "cityName": "福冈", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "GAJ",
        "cityName": "山形县",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "HAC", "cityName": "八丈岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "HIJ",
        "cityName": "广岛",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "HKD", "cityName": "函馆", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "HNA",
        "cityName": "花巻市",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "HSG", "cityName": "沙噶", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "ISG",
        "cityName": "石垣",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "IWJ", "cityName": "立石见", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "IZO",
        "cityName": "塔马",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "KCZ", "cityName": "高知", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "KIJ",
        "cityName": "新泻",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "KKJ", "cityName": "北九州", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "KMI",
        "cityName": "宫崎",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "KMJ", "cityName": "熊本", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "KMQ",
        "cityName": "小松",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "KOJ", "cityName": "鹿儿岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "KUH",
        "cityName": "钏路",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "MBE", "cityName": "门别", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "MMB",
        "cityName": "女满别",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "MMJ", "cityName": "松本", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "MMY",
        "cityName": "宫古岛",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "MSJ", "cityName": "米沙瓦", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "MYE",
        "cityName": "色丹岛",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "MYJ", "cityName": "松山", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "NGO",
        "cityName": "名古屋",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "NGS", "cityName": "长崎", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "NTQ",
        "cityName": "色丹岛",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "OBO", "cityName": "帯広", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "OGN",
        "cityName": "与那国岛 ",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "OIM", "cityName": "大岛渚", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "OIT",
        "cityName": "大分",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "OKA", "cityName": "冲绳", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "OKJ",
        "cityName": "冈山",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "ONJ", "cityName": "大馆能代", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "OSA",
        "cityName": "大阪",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "RIS", "cityName": "利尻", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "SDJ",
        "cityName": "仙台",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "SHB", "cityName": "中标津町", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "SHM",
        "cityName": "和歌山县",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "SPK", "cityName": "札幌", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "SYO",
        "cityName": "庄内",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "TAK", "cityName": "高松", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "TKN",
        "cityName": "德之岛",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "TKS", "cityName": "德岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "TOY",
        "cityName": "富山",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "TSJ", "cityName": "对马岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "TTJ",
        "cityName": "鸟取",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "TYO", "cityName": "东京", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "UBJ",
        "cityName": "宇部",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "UEO", "cityName": "久米岛", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "WKJ",
        "cityName": "稚内",
        "countryCode": "JP",
        "countryName": "日本"
    }, {"cityCode": "YGJ", "cityName": "米子", "countryCode": "JP", "countryName": "日本"}, {
        "cityCode": "MBA",
        "cityName": "梦巴萨",
        "countryCode": "KE",
        "countryName": "肯尼亚"
    }, {"cityCode": "NBO", "cityName": "内罗毕", "countryCode": "KE", "countryName": "肯尼亚"}, {
        "cityCode": "REP",
        "cityName": "暹粒",
        "countryCode": "KH",
        "countryName": "柬埔寨"
    }, {"cityCode": "FNJ", "cityName": "平壤", "countryCode": "KP", "countryName": "韩国"}, {
        "cityCode": "CJJ",
        "cityName": "青州",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "CJU", "cityName": "济洲岛", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "HIN",
        "cityName": "晋剧",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "KPO", "cityName": "浦项", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "KUV",
        "cityName": "群山",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "KWJ", "cityName": "光州", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "MPK",
        "cityName": "木浦",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "PUS", "cityName": "釜山", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "RSU",
        "cityName": "丽水",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "SEL", "cityName": "首尔", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "TAE",
        "cityName": "大邱",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "USN", "cityName": "蔚山", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "WJU",
        "cityName": "文沅洙",
        "countryCode": "KR",
        "countryName": "朝鲜"
    }, {"cityCode": "YNY", "cityName": "洋洋", "countryCode": "KR", "countryName": "朝鲜"}, {
        "cityCode": "KWI",
        "cityName": "科威特",
        "countryCode": "KW",
        "countryName": "科威特"
    }, {"cityCode": "HOE", "cityName": "会晒", "countryCode": "LA", "countryName": "老挝人民民主共和国"}, {
        "cityCode": "LPQ",
        "cityName": "琅勃拉邦",
        "countryCode": "LA",
        "countryName": "老挝人民民主共和国"
    }, {"cityCode": "ODY", "cityName": "乌多母塞", "countryCode": "LA", "countryName": "老挝人民民主共和国"}, {
        "cityCode": "PKZ",
        "cityName": "巴色",
        "countryCode": "LA",
        "countryName": "老挝人民民主共和国"
    }, {"cityCode": "VTE", "cityName": "万象", "countryCode": "LA", "countryName": "老挝人民民主共和国"}, {
        "cityCode": "XKH",
        "cityName": "辖川圹",
        "countryCode": "LA",
        "countryName": "老挝人民民主共和国"
    }, {"cityCode": "BEY", "cityName": "贝鲁特", "countryCode": "LB", "countryName": "黎巴嫩"}, {
        "cityCode": "CMB",
        "cityName": "科伦坡",
        "countryCode": "LK",
        "countryName": "斯里兰卡"
    }, {"cityCode": "KUN", "cityName": "考纳斯", "countryCode": "LT", "countryName": "立陶宛"}, {
        "cityCode": "PLQ",
        "cityName": "克莱佩达 ",
        "countryCode": "LT",
        "countryName": "立陶宛"
    }, {"cityCode": "VNO", "cityName": "维尔纽斯", "countryCode": "LT", "countryName": "立陶宛"}, {
        "cityCode": "LUX",
        "cityName": "卢森堡公园",
        "countryCode": "LU",
        "countryName": "卢森堡"
    }, {"cityCode": "RIX", "cityName": "里加", "countryCode": "LV", "countryName": "拉脱维亚"}, {
        "cityCode": "AGA",
        "cityName": "阿加迪尔",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "AHU", "cityName": "胡塞马", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "CAS",
        "cityName": " 卡萨布兰卡",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "ERH", "cityName": "艾拉差地", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "ESU",
        "cityName": "伊索维拉",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "FEZ", "cityName": "非斯", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "OUD",
        "cityName": "乌杰达",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "OZZ", "cityName": "瓦尔扎扎特", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "RAK",
        "cityName": "马拉喀什",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "RBA", "cityName": "拉巴特", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "TNG",
        "cityName": "丹吉尔",
        "countryCode": "MA",
        "countryName": "摩洛哥"
    }, {"cityCode": "VIL", "cityName": "达赫拉", "countryCode": "MA", "countryName": "摩洛哥"}, {
        "cityCode": "MCM",
        "cityName": "蒙特卡罗",
        "countryCode": "MC",
        "countryName": "摩纳哥"
    }, {"cityCode": "KIV", "cityName": "基希讷乌", "countryCode": "MD", "countryName": "摩尔多瓦共和国"}, {
        "cityCode": "TGD",
        "cityName": "波德戈里察",
        "countryCode": "ME",
        "countryName": "黑山共和国"
    }, {"cityCode": "TIV", "cityName": "蒂瓦特", "countryCode": "ME", "countryName": "黑山共和国"}, {
        "cityCode": "OHD",
        "cityName": "欧赫瑞",
        "countryCode": "MK",
        "countryName": "前南斯拉夫的马其顿共和国"
    }, {"cityCode": "SKP", "cityName": "斯科普里", "countryCode": "MK", "countryName": "前南斯拉夫的马其顿共和国"}, {
        "cityCode": "RGN",
        "cityName": "仰光",
        "countryCode": "MM",
        "countryName": "缅甸"
    }, {"cityCode": "BYN", "cityName": "巴彦洪果尔", "countryCode": "MN", "countryName": "蒙古"}, {
        "cityCode": "ULN",
        "cityName": "乌兰巴托市",
        "countryCode": "MN",
        "countryName": "蒙古"
    }, {"cityCode": "MFM", "cityName": "澳门", "countryCode": "MO", "countryName": "澳门特别行政区"}, {
        "cityCode": "MLA",
        "cityName": "马耳他",
        "countryCode": "MT",
        "countryName": "马耳他"
    }, {"cityCode": "MRU", "cityName": "毛里求斯", "countryCode": "MU", "countryName": "毛里求斯"}, {
        "cityCode": "RRG",
        "cityName": "罗德里格斯岛",
        "countryCode": "MU",
        "countryName": "毛里求斯"
    }, {"cityCode": "LLW", "cityName": "利隆圭", "countryCode": "MW", "countryName": "马拉维"}, {
        "cityCode": "AOR",
        "cityName": "亚罗士打",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "BKI", "cityName": "哥达基纳巴卢", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "JHB",
        "cityName": "柔佛",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "KBR", "cityName": "哥打巴鲁", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "KCH",
        "cityName": "古晋",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "KUA", "cityName": "关丹", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "KUL",
        "cityName": "吉隆坡",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "LBU", "cityName": "纳闽岛", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "LGK",
        "cityName": "兰卡威",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "MYY", "cityName": "米里", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "PEN",
        "cityName": "槟城",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "SDK", "cityName": "山打根", "countryCode": "MY", "countryName": "马来西亚"}, {
        "cityCode": "TWU",
        "cityName": "达斗湖",
        "countryCode": "MY",
        "countryName": "马来西亚"
    }, {"cityCode": "MPM", "cityName": "马普托", "countryCode": "MZ", "countryName": "莫桑比克"}, {
        "cityCode": "AMS",
        "cityName": "阿姆斯特丹",
        "countryCode": "NL",
        "countryName": "荷兰"
    }, {"cityCode": "EIN", "cityName": "恩荷芬市", "countryCode": "NL", "countryName": "荷兰"}, {
        "cityCode": "ENS",
        "cityName": "恩思赫德",
        "countryCode": "NL",
        "countryName": "荷兰"
    }, {"cityCode": "GRQ", "cityName": "格罗宁根", "countryCode": "NL", "countryName": "荷兰"}, {
        "cityCode": "MST",
        "cityName": "马斯特里赫特",
        "countryCode": "NL",
        "countryName": "荷兰"
    }, {"cityCode": "RTM", "cityName": "鹿特丹", "countryCode": "NL", "countryName": "荷兰"}, {
        "cityCode": "UTC",
        "cityName": "乌德勒支",
        "countryCode": "NL",
        "countryName": "荷兰"
    }, {"cityCode": "AES", "cityName": "奥勒松", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "ALF",
        "cityName": "阿尔塔",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "ANX", "cityName": "安德内斯", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "BDU",
        "cityName": "巴杜佛斯",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "BGO", "cityName": "卑尔根", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "BJF",
        "cityName": "博茨菲尤尔",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "BNN", "cityName": "布倫尼森德", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "BOO",
        "cityName": "博德",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "BVG", "cityName": "贝勒沃格", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "DLD",
        "cityName": "耶卢",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "EVE", "cityName": "哈尔斯塔-纳尔维克", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "FDE",
        "cityName": "富迪",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "FRO", "cityName": "弗卢勒", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "GLL",
        "cityName": "古尔",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "HAA", "cityName": "哈斯维克", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "HAU",
        "cityName": "海于格松",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "HFT", "cityName": "哈默费斯特", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "HMR",
        "cityName": "哈马尔",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "HOV", "cityName": "奥斯塔弗洛达", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "HVG",
        "cityName": "霍宁斯沃格",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "KKN", "cityName": "希尔克内斯", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "KRS",
        "cityName": "克里斯蒂安桑",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "KSU", "cityName": "克里斯蒂安松", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "LKL",
        "cityName": "拉克塞尔夫",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "LKN", "cityName": "莱克内斯", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "LYR",
        "cityName": "朗伊尔城",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "MEH", "cityName": "梅港", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "MJF",
        "cityName": "莫斯佐恩",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "MOL", "cityName": "莫尔德", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "MQN",
        "cityName": "莫伊拉纳",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "NVK", "cityName": "纳尔维克", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "OLA",
        "cityName": "奥兰多",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "OSL", "cityName": "奥斯陆", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "OSY",
        "cityName": "纳姆索斯",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "RET", "cityName": "罗斯塔", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "RRS",
        "cityName": "勒罗斯",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "RVK", "cityName": "罗尔维克", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "SDN",
        "cityName": "桑纳讷",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "SKE", "cityName": "希恩", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "SKN",
        "cityName": "斯托克马克内斯",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "SOG", "cityName": "松达尔", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "SOJ",
        "cityName": "松克罗森",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "SRP", "cityName": "斯图尔", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "SSJ",
        "cityName": "桑内舍恩",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "SVG", "cityName": "斯塔万格", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "SVJ",
        "cityName": "斯沃尔韦尔",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "TOS", "cityName": "特罗姆瑟", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "TRD",
        "cityName": "特隆赫姆",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "VAW", "cityName": "瓦尔德", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "VDB",
        "cityName": "法格尼斯",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "VDS", "cityName": "瓦德瑟", "countryCode": "NO", "countryName": "挪威"}, {
        "cityCode": "VRY",
        "cityName": "瓦尔欧伊",
        "countryCode": "NO",
        "countryName": "挪威"
    }, {"cityCode": "KHS", "cityName": "卡萨布", "countryCode": "OM", "countryName": "阿曼"}, {
        "cityCode": "MCT",
        "cityName": "马斯喀特",
        "countryCode": "OM",
        "countryName": "阿曼"
    }, {"cityCode": "SLL", "cityName": "撒拉拉", "countryCode": "OM", "countryName": "阿曼"}, {
        "cityCode": "BAG",
        "cityName": "碧瑶",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "BCD", "cityName": "巴科洛德", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "BSO",
        "cityName": "巴斯卡",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "BXU", "cityName": "武端", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "CBO",
        "cityName": "科塔巴托",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "CEB", "cityName": "宿务岛", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "CGM",
        "cityName": "卡米金岛",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "CGY", "cityName": "卡加廷德奥罗", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "CRM",
        "cityName": "卡塔曼 ",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "CYP", "cityName": "卡尔巴约格", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "DGT",
        "cityName": "杜马格特",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "DPL", "cityName": "第波罗", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "DVO",
        "cityName": "达沃",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "ENI", "cityName": "爱妮岛", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "GES",
        "cityName": "桑托斯将军城",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "ILO", "cityName": "怡朗", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "JOL",
        "cityName": "和乐岛",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "KLO", "cityName": "卡利波", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "LAO",
        "cityName": "佬沃",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "LGP", "cityName": "黎牙实比", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "MBT",
        "cityName": "马斯贝特",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "MNL", "cityName": "马尼拉", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "MPH",
        "cityName": "卡地克兰",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "NCP", "cityName": "吕宋岛", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "PAG",
        "cityName": "帕格蒂安湾",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "PPS", "cityName": "巴拉望公主岛", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "RXS",
        "cityName": "罗莎",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "RZP", "cityName": "泰太沙滩", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "SFE",
        "cityName": "圣费尔南多",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "SFS", "cityName": "苏比克海湾", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "SJI",
        "cityName": "圣何塞",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "SUG", "cityName": "苏利哥", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "TAC",
        "cityName": "塔克洛班",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "TAG", "cityName": "塔比拉兰", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "TUG",
        "cityName": "土格加劳",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "TWT", "cityName": "塔威塔威", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "USU",
        "cityName": "Coron",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "VRC", "cityName": "维拉克", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "WNP",
        "cityName": "那伽",
        "countryCode": "PH",
        "countryName": "菲律宾"
    }, {"cityCode": "ZAM", "cityName": "三宝颜", "countryCode": "PH", "countryName": "菲律宾"}, {
        "cityCode": "ISB",
        "cityName": "伊斯兰堡",
        "countryCode": "PK",
        "countryName": "巴基斯坦"
    }, {"cityCode": "KHI", "cityName": "卡拉奇", "countryCode": "PK", "countryName": "巴基斯坦"}, {
        "cityCode": "LHE",
        "cityName": "拉哈尔",
        "countryCode": "PK",
        "countryName": "巴基斯坦"
    }, {"cityCode": "PEW", "cityName": "白沙瓦", "countryCode": "PK", "countryName": "巴基斯坦"}, {
        "cityCode": "BZG",
        "cityName": "比得哥什",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "GDN", "cityName": "格但斯克", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "IEG",
        "cityName": "绿山城",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "KRK", "cityName": "克拉科夫", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "KTW",
        "cityName": "卡托维兹",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "LCJ", "cityName": "罗兹", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "OSZ",
        "cityName": "科沙林",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "POZ", "cityName": "波兹南", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "RZE",
        "cityName": "热舒夫 ",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "SZZ", "cityName": "什切青", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "WAW",
        "cityName": "华沙",
        "countryCode": "PL",
        "countryName": "波兰"
    }, {"cityCode": "WRO", "cityName": "弗罗茨瓦夫", "countryCode": "PL", "countryName": "波兰"}, {
        "cityCode": "CVU",
        "cityName": "科尔武岛",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "FAO", "cityName": "法鲁", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "FLW",
        "cityName": "佛罗雷斯岛",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "FNC", "cityName": "丰沙尔", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "GRW",
        "cityName": "格拉西奥萨岛",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "HOR", "cityName": "霍达", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "LIS",
        "cityName": "里斯本",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "OPO", "cityName": "波尔图", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "PDL",
        "cityName": "蓬塔德尔加达",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "PIX", "cityName": "皮库岛", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "PXO",
        "cityName": "桑塔岛",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "SJZ", "cityName": "圣若热岛", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "SMA",
        "cityName": "圣马利亚",
        "countryCode": "PT",
        "countryName": "葡萄牙"
    }, {"cityCode": "TER", "cityName": "特塞拉岛", "countryCode": "PT", "countryName": "葡萄牙"}, {
        "cityCode": "DOH",
        "cityName": "多哈",
        "countryCode": "QA",
        "countryName": "卡塔尔"
    }, {"cityCode": "BAY", "cityName": "巴亚马雷", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "BCM",
        "cityName": "巴克乌",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "BUH", "cityName": "布加勒斯特", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "CLJ",
        "cityName": "克鲁日",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "CND", "cityName": "康斯坦萨", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "CRA",
        "cityName": "克拉约瓦",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "IAS", "cityName": "雅西", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "OMR",
        "cityName": "奥拉迪亚",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "SBZ", "cityName": "锡比乌", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "SCV",
        "cityName": "苏恰瓦",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "SUJ", "cityName": "萨图马雷", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "TGM",
        "cityName": "特尔古穆列什",
        "countryCode": "RO",
        "countryName": "罗马尼亚"
    }, {"cityCode": "TSR", "cityName": "蒂米什瓦拉", "countryCode": "RO", "countryName": "罗马尼亚"}, {
        "cityCode": "BEG",
        "cityName": "贝尔格莱德",
        "countryCode": "RS",
        "countryName": "塞尔维亚"
    }, {"cityCode": "INI", "cityName": "尼斯", "countryCode": "RS", "countryName": "塞尔维亚"}, {
        "cityCode": "PRN",
        "cityName": "普里什蒂纳",
        "countryCode": "RS",
        "countryName": "塞尔维亚"
    }, {"cityCode": "AAQ", "cityName": "阿纳帕", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "ABA",
        "cityName": "阿巴坎",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "AER", "cityName": "阿德勒/索契", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "ARH",
        "cityName": "阿尔汉格尔斯",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "ASF", "cityName": "阿斯特拉罕", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "BAX",
        "cityName": "巴尔瑙尔",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "BQS", "cityName": "布拉果阜司钦斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "BTK",
        "cityName": "布拉茨克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "CEE", "cityName": "切列波韦茨", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "CEK",
        "cityName": "车里雅宾斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "CKH", "cityName": "俄罗斯联邦", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "CSY",
        "cityName": "切伯克萨瑞",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "CYX", "cityName": "解尔斯基山脉", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "DYR",
        "cityName": "阿纳德尔河",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "EGO", "cityName": "别尔哥罗德州", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "EIE",
        "cityName": "艾尼斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "ESL", "cityName": "埃利斯塔", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "GDX",
        "cityName": "马加丹",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "GOJ", "cityName": "诺夫哥罗德", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "GRV",
        "cityName": "雷帝",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "HMA", "cityName": "汉特-曼西斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "HTA",
        "cityName": "赤塔",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "HTG", "cityName": "哈坦加", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "IAA",
        "cityName": "伊加尔卡",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "IKS", "cityName": "季克西", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "IKT",
        "cityName": "伊尔库茨克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KEJ", "cityName": "克麦罗沃", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "KGD",
        "cityName": "加里宁格勒",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KGP", "cityName": "寇给林美", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "KHV",
        "cityName": "哈巴罗夫斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KJA", "cityName": "拉斯诺亚尔斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "KRO",
        "cityName": "坟墩",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KRR", "cityName": "克拉斯诺达尔", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "KUF",
        "cityName": "森马拉",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KXK", "cityName": "共青城", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "KYZ",
        "cityName": "基吉",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "KZN", "cityName": "喀山", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "LED",
        "cityName": "圣彼得堡",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "LPK", "cityName": "利佩茨克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "MCX",
        "cityName": "马哈齐卡拉",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "MJZ", "cityName": "米梅捷", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "MMK",
        "cityName": "摩尔曼斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "MOW", "cityName": "莫斯科", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "MQF",
        "cityName": "马格尼托格尔斯科",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "MRV", "cityName": "米纳拉涅-沃迪", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NAL",
        "cityName": "纳尔奇克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "NBC", "cityName": "下卡姆斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NER",
        "cityName": "涅留恩格里",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "NJC", "cityName": "下瓦尔托夫斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NNM",
        "cityName": "纳里安马尔",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "NOJ", "cityName": "伏尔加格勒", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NOZ",
        "cityName": "新库兹涅茨克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "NSK", "cityName": "诺里尔斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NUX",
        "cityName": "诺夫乌仁格伊",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "NYA", "cityName": "尼亚干", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "NYM",
        "cityName": "纳德姆",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "OGZ", "cityName": "弗拉季卡夫卡兹", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "OHO",
        "cityName": "鄂霍次克海",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "OMS", "cityName": "鄂木斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "OSW",
        "cityName": "奥尔斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "OVB", "cityName": "新西伯利亚", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "OVS",
        "cityName": "苏维埃斯基",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "PEE", "cityName": "彼尔姆", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "PES",
        "cityName": "彼德罗扎沃茨克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "PEZ", "cityName": "奔萨州", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "PKC",
        "cityName": "堪察加",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "RAT", "cityName": "拉杜真一", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "REN",
        "cityName": "奥伦堡",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "ROV", "cityName": "罗斯托夫", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "RTW",
        "cityName": "萨拉托夫",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "SCW", "cityName": "瑟克特夫卡尔", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "SGC",
        "cityName": "苏故特",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "SLY", "cityName": "萨列哈尔德", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "STW",
        "cityName": "斯塔夫罗波尔",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "SVX", "cityName": "叶卡特琳堡", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "TBW",
        "cityName": "坦波夫",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "TJM", "cityName": "秋明", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "TLY",
        "cityName": "帕拉斯吞",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "TOF", "cityName": "托木斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "UCT",
        "cityName": "乌赫塔",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "UFA", "cityName": "乌法", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "ULY",
        "cityName": "乌里扬诺夫斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "URJ", "cityName": "尤拉杰", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "URS",
        "cityName": "库尔斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "USK", "cityName": "乌申斯克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "UUA",
        "cityName": "布古利马",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "UUD", "cityName": "乌兰乌德", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "UUS",
        "cityName": "南萨哈林斯克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "VOG", "cityName": "伏尔加格勒", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "VOZ",
        "cityName": "佛罗尼斯",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "VVO", "cityName": "符拉迪沃斯托克", "countryCode": "RU", "countryName": "俄罗斯联邦"}, {
        "cityCode": "YKS",
        "cityName": "雅库茨克",
        "countryCode": "RU",
        "countryName": "俄罗斯联邦"
    }, {"cityCode": "ABT", "cityName": "艾尔巴哈", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "AHB",
        "cityName": "阿布哈",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "AJF", "cityName": "佐弗", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "AQI",
        "cityName": "凯苏马",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "BHH", "cityName": "比莎", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "DMM",
        "cityName": "达曼",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "DWD", "cityName": "达瓦达米", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "EAM",
        "cityName": "内基兰",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "EJH", "cityName": "韦吉", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "ELQ",
        "cityName": " 加西姆",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "GIZ", "cityName": "吉赞", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "HAS",
        "cityName": "黑尔",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "HBT", "cityName": "何巴特", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "HOF",
        "cityName": "阿拉莎",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "JED", "cityName": "吉达", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "KMC",
        "cityName": "金卡里德米利特里市",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "MED", "cityName": "马丁阿", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "RAE",
        "cityName": "阿拉尔",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "RAH", "cityName": "拉弗哈", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "RUH",
        "cityName": "利雅德",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "SHW", "cityName": "沙鲁拉", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "TIF",
        "cityName": "台弗",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "TUI", "cityName": "图莱弗", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "TUU",
        "cityName": "塔布克",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "URY", "cityName": "古拉雅特", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "WAE",
        "cityName": "沃迪艾德达瓦斯",
        "countryCode": "SA",
        "countryName": "沙竺阿拉伯"
    }, {"cityCode": "YNB", "cityName": "阳布", "countryCode": "SA", "countryName": "沙竺阿拉伯"}, {
        "cityCode": "PRI",
        "cityName": "普拉兰岛",
        "countryCode": "SC",
        "countryName": "塞舌尔共和国"
    }, {"cityCode": "SEZ", "cityName": "马埃岛", "countryCode": "SC", "countryName": "塞舌尔共和国"}, {
        "cityCode": "AGH",
        "cityName": "赫尔辛堡",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "AJR", "cityName": "阿尔维斯尧尔", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "BLE",
        "cityName": "法伦",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "EVG", "cityName": "斯韦格", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "GEV",
        "cityName": "耶利瓦勒",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "GOT", "cityName": "戈森堡", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "GVX",
        "cityName": "盖佛勒",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "HAD", "cityName": "哈尔姆斯塔德", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "HFS",
        "cityName": "哈格福什",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "HMV", "cityName": "赫玛旺", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "HUV",
        "cityName": "胡迪克维瓦尔",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "JKG", "cityName": "延雪平", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "JLD",
        "cityName": "兰斯克鲁纳",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "KID", "cityName": "克里斯蒂安斯塔德", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "KLR",
        "cityName": "卡尔马",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "KRF", "cityName": "克拉姆福什", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "KRN",
        "cityName": "基律纳",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "KSD", "cityName": "卡尔斯塔德", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "KVB",
        "cityName": "舍夫德",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "LLA", "cityName": "吕勒奥", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "LPI",
        "cityName": "林雪平",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "LYC", "cityName": "吕克瑟勒", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "MMA",
        "cityName": "马尔默",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "MXX", "cityName": "穆拉", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "NRK",
        "cityName": "诺尔雪平",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "OER", "cityName": "恩金尔兹维克", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "ORB",
        "cityName": "厄勒布鲁",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "OSD", "cityName": "厄斯特松德", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "OSK",
        "cityName": "奥斯卡港",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "RNB", "cityName": "龙讷比", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "SDL",
        "cityName": "松兹瓦尔",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "SFT", "cityName": "谢来夫特奥", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "SOO",
        "cityName": "瑟德港",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "SQO", "cityName": "斯图吕曼", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "STO",
        "cityName": "斯德哥尔摩",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "THN", "cityName": "特洛拉坦", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "TYF",
        "cityName": "图什比",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "UME", "cityName": "于默奥", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "VBY",
        "cityName": "维斯比",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "VHM", "cityName": "威廉敏娜", "countryCode": "SE", "countryName": "瑞典"}, {
        "cityCode": "VXO",
        "cityName": "韦克舍",
        "countryCode": "SE",
        "countryName": "瑞典"
    }, {"cityCode": "SIN", "cityName": "新加坡", "countryCode": "SG", "countryName": "新加坡"}, {
        "cityCode": "LJU",
        "cityName": "卢布尔雅那",
        "countryCode": "SI",
        "countryName": "斯洛文尼亚"
    }, {"cityCode": "BTS", "cityName": "布拉迪斯拉发", "countryCode": "SK", "countryName": "斯洛伐克"}, {
        "cityCode": "ILZ",
        "cityName": "斯利纳",
        "countryCode": "SK",
        "countryName": "斯洛伐克"
    }, {"cityCode": "KSC", "cityName": "科希策", "countryCode": "SK", "countryName": "斯洛伐克"}, {
        "cityCode": "SLD",
        "cityName": "斯利亚奇",
        "countryCode": "SK",
        "countryName": "斯洛伐克"
    }, {"cityCode": "TAT", "cityName": "波普拉德/塔特拉", "countryCode": "SK", "countryName": "斯洛伐克"}, {
        "cityCode": "ALP",
        "cityName": "阿勒颇",
        "countryCode": "SY",
        "countryName": "阿拉伯叙利亚共和国"
    }, {"cityCode": "DAM", "cityName": "大马士革", "countryCode": "SY", "countryName": "阿拉伯叙利亚共和国"}, {
        "cityCode": "KAC",
        "cityName": "卡米什利",
        "countryCode": "SY",
        "countryName": "阿拉伯叙利亚共和国"
    }, {"cityCode": "LTK", "cityName": "拉塔基亚", "countryCode": "SY", "countryName": "阿拉伯叙利亚共和国"}, {
        "cityCode": "MTS",
        "cityName": "曼齐尼",
        "countryCode": "SZ",
        "countryName": "斯威士兰"
    }, {"cityCode": "BKK", "cityName": "曼谷", "countryCode": "TH", "countryName": "泰国"}, {
        "cityCode": "CEI",
        "cityName": "清莱",
        "countryCode": "TH",
        "countryName": "泰国"
    }, {"cityCode": "CNX", "cityName": "清迈", "countryCode": "TH", "countryName": "泰国"}, {
        "cityCode": "HDY",
        "cityName": "合艾",
        "countryCode": "TH",
        "countryName": "泰国"
    }, {"cityCode": "HKT", "cityName": "普吉岛", "countryCode": "TH", "countryName": "泰国"}, {
        "cityCode": "KBV",
        "cityName": "甲米",
        "countryCode": "TH",
        "countryName": "泰国"
    }, {"cityCode": "USM", "cityName": "苏梅岛", "countryCode": "TH", "countryName": "泰国"}, {
        "cityCode": "MIR",
        "cityName": "莫纳斯提尔",
        "countryCode": "TN",
        "countryName": "突尼斯"
    }, {"cityCode": "TUN", "cityName": "突尼斯", "countryCode": "TN", "countryName": "突尼斯"}, {
        "cityCode": "ADA",
        "cityName": "阿达纳",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "ADF", "cityName": "阿德亚曼", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "ANK",
        "cityName": "安卡拉",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "ASR", "cityName": "开塞利", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "AYT",
        "cityName": "安塔利亚",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "BAL", "cityName": "巴特曼", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "CKZ",
        "cityName": "肯纳卡莱",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "DIY", "cityName": "迪亚巴克尔", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "DLM",
        "cityName": "达拉曼",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "DNZ", "cityName": "代尼兹利", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "ERC",
        "cityName": "埃尔津詹",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "ERZ", "cityName": "埃尔祖鲁姆", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "EZS",
        "cityName": "埃拉泽",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "GZT", "cityName": "加齐安泰普", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "IST",
        "cityName": "伊斯坦布尔",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "IZM", "cityName": "伊兹密尔", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "KCM",
        "cityName": "卡赫拉曼马哈什",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "KSY", "cityName": "卡尔斯", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "KYA",
        "cityName": "科尼亚",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "MLX", "cityName": "马拉蒂亚", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "MQM",
        "cityName": "马尔丁",
        "countryCode": "TR",
        "countryName": "土耳其"
    }, {"cityCode": "MSR", "cityName": "穆斯", "countryCode": "TR", "countryName": "土耳其"}, {
        "cityCode": "KHH",
        "cityName": "高雄",
        "countryCode": "TW",
        "countryName": "台湾"
    }, {"cityCode": "RMQ", "cityName": "台中", "countryCode": "TW", "countryName": "台湾"}, {
        "cityCode": "TPE",
        "cityName": "台北",
        "countryCode": "TW",
        "countryName": "台湾"
    }, {"cityCode": "DAR", "cityName": "达累斯萨拉姆", "countryCode": "TZ", "countryName": "坦桑尼亚联合共和国"}, {
        "cityCode": "JRO",
        "cityName": "乞力马扎罗山",
        "countryCode": "TZ",
        "countryName": "坦桑尼亚联合共和国"
    }, {"cityCode": "CWC", "cityName": "契诺西", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "DNK",
        "cityName": "第聂伯罗彼得罗夫斯克",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "DOK", "cityName": "顿涅茨克", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "HRK",
        "cityName": "哈尔科夫",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "IEV", "cityName": "基辅", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "IFO",
        "cityName": "伊凡法兰科夫斯科",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "KHE", "cityName": "赫尔松", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "KWG",
        "cityName": "克利瓦罗格",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "LWO", "cityName": "利沃夫", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "MPW",
        "cityName": "马里乌波尔",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "NLV", "cityName": "尼古拉耶夫", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "ODS",
        "cityName": "敖德萨",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "OZH", "cityName": "查波罗热", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "SIP",
        "cityName": "辛菲罗波尔",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "UDJ", "cityName": "乌日哥罗德", "countryCode": "UA", "countryName": "乌克兰"}, {
        "cityCode": "VSG",
        "cityName": "卢甘斯克",
        "countryCode": "UA",
        "countryName": "乌克兰"
    }, {"cityCode": "EBB", "cityName": "恩德培/坎帕拉", "countryCode": "UG", "countryName": "乌干达"}, {
        "cityCode": "ABE",
        "cityName": "艾林镇/伯斯恒/阿斯顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ABI", "cityName": "阿比林", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ABL",
        "cityName": "安波尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ABQ", "cityName": "爱伯克奇", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ABR",
        "cityName": "阿伯丁 (US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ABY", "cityName": "奥尔巴尼(US) GA", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ACK",
        "cityName": "楠塔基特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ACT", "cityName": "韦科", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ACV",
        "cityName": "阿克塔/尤利卡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ADK", "cityName": "维尔京群岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ADQ",
        "cityName": "阿拉斯加州",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AET", "cityName": "阿拉卡基特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AEX",
        "cityName": "亚历山大(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AGN", "cityName": "安古", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AGS",
        "cityName": "奥古斯塔(US) GA",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AHC", "cityName": "赫隆", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AHN",
        "cityName": "雅典(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AIA", "cityName": "厄莱恩斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AIN",
        "cityName": "威莱特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AIY", "cityName": "大西洋城", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AKB",
        "cityName": "阿特卡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AKI", "cityName": "阿基亚克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AKN",
        "cityName": "金莎蒙",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AKP", "cityName": "阿纳克图沃克帕斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ALB",
        "cityName": "奥尔巴尼(US) NY",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ALM", "cityName": "阿拉莫哥豆", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ALO",
        "cityName": "沃特卢",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ALS", "cityName": "阿拉莫莎", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ALW",
        "cityName": "瓦拉·瓦拉",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ALZ", "cityName": "阿里塔克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AMA",
        "cityName": "阿莫里罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ANC", "cityName": "安克雷奇", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ANI",
        "cityName": "安尼克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ANV", "cityName": "安维可", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AOO",
        "cityName": "阿尔图纳",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AOS", "cityName": "阿莫克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "APF",
        "cityName": "那不勒斯(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "APN", "cityName": "阿尔匹纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ARC",
        "cityName": "阿克提克村",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ART", "cityName": "沃特镇(US) NY", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ASE",
        "cityName": "阿斯蓬",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ATK", "cityName": "阿特夸苏克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ATL",
        "cityName": "亚特兰大",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ATT", "cityName": "亚特毛特卢阿克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ATW",
        "cityName": "阿普尔顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ATY", "cityName": "沃特镇(US) SD", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AUG",
        "cityName": "奥古斯塔(US) ME",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AUK", "cityName": "阿拉卡奴克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AUS",
        "cityName": "奥斯丁",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AUW", "cityName": "沃索", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AVL",
        "cityName": "阿什维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "AVP", "cityName": "威尔克斯巴里", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "AZO",
        "cityName": "卡拉马祖市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BDR", "cityName": "桥港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BED",
        "cityName": "贝德福德/汉斯空",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BET", "cityName": "伯特利", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BFD",
        "cityName": "布拉德福",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BFF", "cityName": "斯科茨布拉夫", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BFL",
        "cityName": "贝克費尔德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BGM", "cityName": "宾汉姆顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BGR",
        "cityName": "班戈",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BHB", "cityName": "巴尔港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BHM",
        "cityName": "伯明翰(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BIC", "cityName": "比克里克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BID",
        "cityName": "布洛克岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BIL", "cityName": "比灵斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BIS",
        "cityName": "俾斯麦",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BJI", "cityName": "伯米吉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BKC",
        "cityName": "巴克兰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BKW", "cityName": "贝克利", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BKX",
        "cityName": "布鲁金斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BLD", "cityName": "博尔德城", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BLF",
        "cityName": "布卢菲尔德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BLI", "cityName": "柏林罕", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BLV",
        "cityName": "比尔维勒",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BMI", "cityName": "布卢明顿-诺木尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BNA",
        "cityName": "纳什维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BOI", "cityName": "博伊西", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BOS",
        "cityName": "波士顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BOW", "cityName": "巴特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BPT",
        "cityName": "博蒙特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BRD", "cityName": "布锐内德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BRL",
        "cityName": "伯灵顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BRO", "cityName": "布朗斯维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BRW",
        "cityName": "贝楼",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BSZ", "cityName": "巴特里特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BTI",
        "cityName": "巴特岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BTL", "cityName": "巴特克里", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BTM",
        "cityName": "巴特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BTR", "cityName": "巴吞鲁日", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BTT",
        "cityName": "贝特尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BTV", "cityName": "伯林顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BUF",
        "cityName": "布法罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BUR", "cityName": "伯班克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "BWI",
        "cityName": "巴尔的摩",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BZN", "cityName": "波兹曼", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CAE",
        "cityName": "哥伦比亚(US) SC",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CAK", "cityName": "阿克伦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CDB",
        "cityName": "扣德海湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CDC", "cityName": "西德市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CDR",
        "cityName": "黑卓",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CDV", "cityName": "科多瓦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CDW",
        "cityName": "卡德威尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CEC", "cityName": "新奥尔良市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CEM",
        "cityName": "深茶尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CEZ", "cityName": "科特斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CFA",
        "cityName": "科飞珀特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CGA", "cityName": "克雷格", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CGI",
        "cityName": "拉杜角",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CHA", "cityName": "查塔努加", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CHI",
        "cityName": "芝加哥",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CHO", "cityName": "夏洛茨维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CHS",
        "cityName": "查尔斯顿(US) SC",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CHU", "cityName": "初斯巴鲁克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CIC",
        "cityName": "趣科",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CID", "cityName": "锡达拉皮兹", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CIK",
        "cityName": "搓基以斯克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CKB", "cityName": "克拉克斯堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CKD",
        "cityName": "可鲁基德克里克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CLE", "cityName": "克利夫兰", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CLL",
        "cityName": "克利奇站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CLM", "cityName": "天使港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CLP",
        "cityName": "可拉克斯珀特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CLT", "cityName": "夏洛特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CMH",
        "cityName": "哥伦布(US) OH",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CMI", "cityName": "催恩佩", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CMX",
        "cityName": "汉考克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CNM", "cityName": "卡尔丝贝", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CNY",
        "cityName": "莫阿比",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "COD", "cityName": "科迪", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "COS",
        "cityName": "科罗拉多斯普林斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "COU", "cityName": "哥伦比亚(US) MO", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CPR",
        "cityName": "凯斯普尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CRP", "cityName": "科珀斯克里斯蒂", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CRW",
        "cityName": "查尔斯顿(US) WV",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CSG", "cityName": "哥伦布(US) GA", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CSL",
        "cityName": "圣路易奥比斯波",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CVG", "cityName": "辛辛那提", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CVN",
        "cityName": "克罗维兹",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CYF", "cityName": "切福纳克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "CYS",
        "cityName": "夏安",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "CZN", "cityName": "兹莎纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DAB",
        "cityName": "代托纳比奇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DAY", "cityName": "代顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DBQ",
        "cityName": "杜布克市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DDC", "cityName": "多吉市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DEC",
        "cityName": "迪凯特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DEN", "cityName": "丹佛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DFW",
        "cityName": "达拉斯/沃斯堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DHN", "cityName": "达斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DIK",
        "cityName": "迪金森",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DIO", "cityName": "代奥米德群岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DLG",
        "cityName": "迪尔林翰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DLH", "cityName": "德卢斯/休皮尔利尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DRG",
        "cityName": "迪林",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DRO", "cityName": "杜尔勒勾(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DRT",
        "cityName": "德尔里奥",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DSM", "cityName": "得梅因", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DTT",
        "cityName": "底特律",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DUJ", "cityName": "杜布瓦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "DUT",
        "cityName": "达曲海港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "DVL", "cityName": "德维斯莱克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EAA",
        "cityName": "伊格尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EAR", "cityName": "科尔尼", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EAT",
        "cityName": "威纳奇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EAU", "cityName": "欧克莱尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EDA",
        "cityName": "埃德纳贝",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EEK", "cityName": "依克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EGE",
        "cityName": "范尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EGX", "cityName": "艾歌基克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EHM",
        "cityName": "凯普纽文翰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EKO", "cityName": "艾尔克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ELD",
        "cityName": "埃尔德拉德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ELI", "cityName": "以林", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ELM",
        "cityName": "埃米勒科明",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ELP", "cityName": "埃尔帕索", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ELV",
        "cityName": "艾费科维",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ELY", "cityName": "依利", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EMK",
        "cityName": "艾莫纳克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ENA", "cityName": "柯奈", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ENW",
        "cityName": "科诺沙",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ERI", "cityName": "伊尔利", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ESC",
        "cityName": "埃斯卡诺巴",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ESD", "cityName": "伊斯特韶德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EUG",
        "cityName": "尤真",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EVV", "cityName": "埃文斯维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EWB",
        "cityName": "新贝德福德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EWD", "cityName": "外德曼莱克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EWN",
        "cityName": "新伯尼尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EWR", "cityName": "纽瓦克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "EXI",
        "cityName": "伊克斯柯深因雷",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "EYW", "cityName": "基韦斯特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FAI",
        "cityName": "费尔班克斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FAR", "cityName": "法戈", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FAT",
        "cityName": "弗雷斯诺",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FAY", "cityName": "费耶特维尔(US) NC", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FCA",
        "cityName": "卡利斯比",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FKL", "cityName": "富兰克林", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FLL",
        "cityName": "劳德尔堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FLO", "cityName": "佛罗伦萨(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FMN",
        "cityName": "法明顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FMY", "cityName": "麦尔兹堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FNL",
        "cityName": "柯林斯堡/拉夫兰德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FNT", "cityName": "弗林特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FOD",
        "cityName": "道奇堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FRD", "cityName": "星期五海港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FSD",
        "cityName": "苏福尔斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FSM", "cityName": "史密斯堡(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FWA",
        "cityName": "韦恩堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "FYU", "cityName": "尤康堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "FYV",
        "cityName": "费耶特维尔(US) AR",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GAL", "cityName": "哥利纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GAM",
        "cityName": "干布",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GBD", "cityName": "哥瑞特班德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GCC",
        "cityName": "吉列",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GCK", "cityName": "嘉顿市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GCN",
        "cityName": "格兰德坎尤",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GDV", "cityName": "格伦代夫", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GEG",
        "cityName": "斯普肯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GFK", "cityName": "大福克斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GGG",
        "cityName": "朗维尤",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GGW", "cityName": "格拉斯(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GJT",
        "cityName": "格兰德姜欣",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GLH", "cityName": "格林维尔(US) MS", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GLV",
        "cityName": "勾罗维",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GNU", "cityName": "古纽斯湾", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GNV",
        "cityName": "盖恩斯维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GPT", "cityName": "格尔夫波特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GRB",
        "cityName": "格林贝",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GRI", "cityName": "格兰德岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GRR",
        "cityName": "大急流",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GSO", "cityName": "格林斯伯勒/高点", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GSP",
        "cityName": "格林维尔(US) SC",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GST", "cityName": "古斯塔夫斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "GTF",
        "cityName": "大瀑布村",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "GUC", "cityName": "刚尼逊", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HAE",
        "cityName": "哈瓦斯派",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HAR", "cityName": "哈利斯堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HCR",
        "cityName": "侯里克洛斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HFD", "cityName": "哈特福德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HGR",
        "cityName": "黑格斯敦",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HHH", "cityName": "希尔顿岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HHR",
        "cityName": "霍桑",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HIB", "cityName": "奇瑟姆", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HII",
        "cityName": "莱克哈瓦苏城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HKB", "cityName": "黑里莱克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HLN",
        "cityName": "海伦娜",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HNH", "cityName": "胡纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HNL",
        "cityName": "檀香山",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HNM", "cityName": "哈纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HNS",
        "cityName": "黑尼斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HOB", "cityName": "霍泊斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HOM",
        "cityName": "弘尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HON", "cityName": "休伦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HOT",
        "cityName": "霍斯匹林",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HOU", "cityName": "休斯敦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HPB",
        "cityName": "霍普湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HPN", "cityName": "威斯特郡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HRL",
        "cityName": "哈灵根",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HRO", "cityName": "哈里森", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HSL",
        "cityName": "胡斯利亚",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HSV", "cityName": "汉茨维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HTS",
        "cityName": "亨廷顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HUS", "cityName": "休斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HVN",
        "cityName": "纽黑文",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HVR", "cityName": "哈维勒", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HYA",
        "cityName": "海恩尼斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HYG", "cityName": "海达堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "HYL",
        "cityName": "霍尔斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "HYS", "cityName": "海斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IAG",
        "cityName": "尼亚加拉瀑布",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IAN", "cityName": "卡安娜", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ICT",
        "cityName": "威奇托",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IDA", "cityName": "爱达荷瀑布市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IFP",
        "cityName": "布尔海德市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IGG", "cityName": "伊久古格", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IGM",
        "cityName": "金曼",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IKO", "cityName": "尼科斯基", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ILE",
        "cityName": "基林",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ILG", "cityName": "维明顿(US) DE", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ILI",
        "cityName": "伊利亚姆纳",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ILM", "cityName": "维明顿(US) NC", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ILN",
        "cityName": "维明顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IMT", "cityName": "艾恩山脉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IND",
        "cityName": "印第安纳波利斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "INL", "cityName": "国际瀑布", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IPL",
        "cityName": "因皮尔里勒",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IPT", "cityName": "威廉斯波特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IRC",
        "cityName": "瑟可勒",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IRK", "cityName": "可立克斯维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ISN",
        "cityName": "威利斯顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ISO", "cityName": "金斯敦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ISP",
        "cityName": "隆艾勒德麦克阿瑟",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ITH", "cityName": "伊萨卡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ITO",
        "cityName": "海罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "IWD", "cityName": "艾厄乌德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "IYK",
        "cityName": "因优克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "JAC", "cityName": "杰克逊(US) WY", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "JAN",
        "cityName": "杰克逊(US) MS",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "JAX", "cityName": "杰克逊维尔(US) FL", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "JBR",
        "cityName": "琼斯泊罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "JHM", "cityName": "卡普鲁亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "JHW",
        "cityName": "詹姆斯顿(US) NY",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "JLN", "cityName": "裘普琳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "JMS",
        "cityName": "詹姆斯顿(US) ND",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "JNU", "cityName": "朱诺", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "JST",
        "cityName": "约翰斯敦",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KAE", "cityName": "卡克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KAL",
        "cityName": "卡尔塔格",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KBC", "cityName": "伯奇克里克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KCC",
        "cityName": "科夫曼科夫",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KCL", "cityName": "奇格尼克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KEB",
        "cityName": "南威尔克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KEK", "cityName": "埃阔克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KFP",
        "cityName": "佛洛斯帕斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KGK", "cityName": "科利加内克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KGX",
        "cityName": "格雷林",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KKA", "cityName": "科尤克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KKB",
        "cityName": "基图依湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KKH", "cityName": "孔基加纳克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KKI",
        "cityName": "阿基亚查克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KKU", "cityName": "埃库克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KLG",
        "cityName": "卡尔斯卡格",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KLL", "cityName": "莱弗洛克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KLW",
        "cityName": "可拉沃克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KMO", "cityName": "马诺科塔克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KMY",
        "cityName": "莫塞尔湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KNK", "cityName": "卡克霍纳克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KNW",
        "cityName": "新斯图亚霍克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KOA", "cityName": "科纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KOT",
        "cityName": "戈特利克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KOY", "cityName": "奥尔加湾", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KOZ",
        "cityName": "尤津基",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KPB", "cityName": "贝克港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KPC",
        "cityName": "克拉伦斯港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KPN", "cityName": "基普努克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KPR",
        "cityName": "威廉斯港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KPV", "cityName": "佩里维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KPY",
        "cityName": "贝利港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KQA", "cityName": "阿库坦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KSM",
        "cityName": "圣玛莉斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KSR", "cityName": "桑迪河", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KTB",
        "cityName": "斯罗尼海湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KTN", "cityName": "凯契根", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KTS",
        "cityName": "泰勒米深",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KUK", "cityName": "卡斯哥鲁克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KVC",
        "cityName": "克林楼维",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KVL", "cityName": "里瓦林阿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KWF",
        "cityName": "沃特佛尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KWK", "cityName": "奎吉林戈克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KWN",
        "cityName": "昆哈加克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KWP", "cityName": "西点", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KWT",
        "cityName": "奎斯卢克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KXA", "cityName": "卡萨安", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KYK",
        "cityName": "卡鲁克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "KYU", "cityName": "科尤库克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "KZB",
        "cityName": "扎查尔海湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LAN", "cityName": "兰辛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LAR",
        "cityName": "拉勒米",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LAS", "cityName": "拉斯维加斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LAW",
        "cityName": "劳顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LAX", "cityName": "洛杉矶", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LBB",
        "cityName": "拉伯克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LBE", "cityName": "拉筹伯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LBF",
        "cityName": "北普拉特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LBL", "cityName": "里本勒尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LCH",
        "cityName": "莱克查尔斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LEB", "cityName": "莱巴嫩", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LEX",
        "cityName": "列克星顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LFT", "cityName": "拉斐特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LGB",
        "cityName": "长滩",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LIH", "cityName": "考艾岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LIT",
        "cityName": "小石城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LMA", "cityName": "莱克明粗米纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LMT",
        "cityName": "克莱蒙斯瀑布市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LNK", "cityName": "林肯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LNS",
        "cityName": "兰开斯特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LNY", "cityName": "拉奈市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LPS",
        "cityName": "罗佩滋岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LRD", "cityName": "拉雷多", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LSE",
        "cityName": "拉克斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LUL", "cityName": "劳雷尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LUP",
        "cityName": "卡劳帕帕",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LUR", "cityName": "凯普里斯贝尔尼", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LWB",
        "cityName": "刘易斯堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LWS", "cityName": "刘易斯顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "LWT",
        "cityName": "里维斯通",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "LYH", "cityName": "林奇堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MAF",
        "cityName": "米德兰/敖德萨",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MBL", "cityName": "曼尼斯提", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MBS",
        "cityName": "萨吉诺",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MCE", "cityName": "默塞德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MCG",
        "cityName": "麦格里斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MCK", "cityName": "麦克库克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MCN",
        "cityName": "美肯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MCW", "cityName": "梅森城", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MEI",
        "cityName": "默里迪恩",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MEM", "cityName": "孟菲斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MFE",
        "cityName": "麦卡伦",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MFR", "cityName": "梅德福", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MGM",
        "cityName": "蒙哥马利",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MGW", "cityName": "摩根镇", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MHK",
        "cityName": "曼哈顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MHT", "cityName": "曼彻斯特(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MIA",
        "cityName": "迈阿密",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MKC", "cityName": "堪萨斯城", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MKE",
        "cityName": "密尔沃基",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MKG", "cityName": "马斯基根", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MKK",
        "cityName": "霍奥莱胡阿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MKL", "cityName": "杰克逊", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MLB",
        "cityName": "墨尔本(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MLI", "cityName": "莫林", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MLL",
        "cityName": "马歇尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MLS", "cityName": "迈尔斯市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MLU",
        "cityName": "梦露",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MLY", "cityName": "曼利温泉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MNT",
        "cityName": "明托",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MOB", "cityName": "莫柏尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MOD",
        "cityName": "莫德斯托",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MOT", "cityName": "迈诺特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MOU",
        "cityName": "冒廷乡村",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MQT", "cityName": "马凯特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MRY",
        "cityName": "蒙特利",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MSL", "cityName": "马斯尔肖尔斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MSN",
        "cityName": "麦迪深",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MSO", "cityName": "米苏拉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MSP",
        "cityName": "明尼亚波里/圣保罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MSS", "cityName": "马斯西纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MSY",
        "cityName": "新奥尔良",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MTH", "cityName": "马拉松", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MTJ",
        "cityName": "蒙特罗斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MTM", "cityName": "梅特拉卡特拉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MUE",
        "cityName": "卡姆依拉",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MVY", "cityName": "马萨葡萄园岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MWA",
        "cityName": "马里昂",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MYL", "cityName": "麦克科尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "MYR",
        "cityName": "默特尔比奇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "MYU", "cityName": "梅科尤克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "NCN",
        "cityName": "纽彻尼咖",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "NIB", "cityName": "尼古拉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "NKI",
        "cityName": "纳乌吉蒂",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "NLG", "cityName": "纳尔逊礁湖", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "NME",
        "cityName": "奈特缪特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "NNL", "cityName": "农多尔顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "NUI",
        "cityName": "诺伊克索特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "NUL", "cityName": "努拉托", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "NUP",
        "cityName": "纽纳皮兹",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "NYC", "cityName": "纽约", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OAJ",
        "cityName": "杰克逊维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OAK", "cityName": "奥克兰", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OBU",
        "cityName": "科伯克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ODW", "cityName": "欧克海港", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OGG",
        "cityName": "茂宜岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OGS", "cityName": "奥格登斯堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OKC",
        "cityName": "俄克拉荷马市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OLF", "cityName": "狼窝点", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OLH",
        "cityName": "旧海港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OMA", "cityName": "奥马哈", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OME",
        "cityName": "诺姆",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ONT", "cityName": "安大略", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OOK",
        "cityName": "托克苏克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ORF", "cityName": "诺福克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ORI",
        "cityName": "利翁斯港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ORL", "cityName": "奥兰多", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ORV",
        "cityName": "诺尔维克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OTH", "cityName": "诺斯班德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OTZ",
        "cityName": "扣紫布",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "OWB", "cityName": "欧文斯伯勒", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "OXR",
        "cityName": "奥古斯那/文图拉",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PAH", "cityName": "帕迪尤卡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PBI",
        "cityName": "西棕榈滩",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PCA", "cityName": "波特奇克里克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PCE",
        "cityName": "佩特克里克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PDB", "cityName": "佩得罗贝", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PDT",
        "cityName": "彭德尔顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PDX", "cityName": "波特兰(US) OR", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PEC",
        "cityName": "鹈鹕",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PFN", "cityName": "巴拿马城(US)", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PGA",
        "cityName": "佩桔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PGM", "cityName": "波特格雷厄姆", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PGV",
        "cityName": "格林维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PHF", "cityName": "纽波特纽斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PHL",
        "cityName": "费城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PHO", "cityName": "珀特霍普", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PHX",
        "cityName": "菲尼克斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PIA", "cityName": "皮奥里亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PIH",
        "cityName": "波卡特洛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PIP", "cityName": "帕勒特珀特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PIR",
        "cityName": "皮埃尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PIT", "cityName": "匹兹堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PIZ",
        "cityName": "珀特雷",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PKA", "cityName": "纳帕斯杰克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PKB",
        "cityName": "帕克堡/玛丽埃塔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PLB", "cityName": "普拉茨堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PLN",
        "cityName": "佩尔斯顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PMD", "cityName": "棕榈谷AFB", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PML",
        "cityName": "莫勒港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PNS", "cityName": "彭萨科拉", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PPV",
        "cityName": "普勒泰克深港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PQI", "cityName": "派斯克小岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PQS",
        "cityName": "飞行站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PRC", "cityName": "普雷斯科特", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PSC",
        "cityName": "帕斯克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PSG", "cityName": "彼得斯堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PSP",
        "cityName": "棕榈斯普林斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PTA", "cityName": "珀特哦斯维尔士", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PTH",
        "cityName": "黑登港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PTU", "cityName": "普雷提能", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PUB",
        "cityName": "普韦布洛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PUW", "cityName": "普尔曼", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PVC",
        "cityName": "普文斯镇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "PVD", "cityName": "普罗维登斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "PWM",
        "cityName": "波特兰(US) ME",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RAL", "cityName": "利维尔塞德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RAP",
        "cityName": "拉皮德城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RBY", "cityName": "鲁比", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RCE",
        "cityName": "罗彻海港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RCP", "cityName": "新德河", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RDB",
        "cityName": "雷朵",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RDD", "cityName": "雷丁", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RDM",
        "cityName": "瑞盟",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RDU", "cityName": "拉雷/达勒莫", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RDV",
        "cityName": "红魔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RHI", "cityName": "莱茵兰德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RIC",
        "cityName": "里奇蒙德(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RIW", "cityName": "利维尔通", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RKD",
        "cityName": "罗克兰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RKS", "cityName": "罗克斯普林斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RMP",
        "cityName": "兰帕特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RNO", "cityName": "雷诺", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ROA",
        "cityName": "罗阿诺克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ROC", "cityName": "罗彻斯特(US) NY", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ROW",
        "cityName": "罗斯维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RSH", "cityName": "拉深米深", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RSJ",
        "cityName": "罗莎里奥",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "RST", "cityName": "柔彻斯特(US)MN", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "RUT",
        "cityName": "拉特兰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SAC", "cityName": "萨克拉门托", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SAF",
        "cityName": "圣塔非(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SAN", "cityName": "圣迭哥", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SAT",
        "cityName": "圣安东尼奥(US)",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SAV", "cityName": "萨凡纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SBA",
        "cityName": "圣塔芭芭拉",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SBN", "cityName": "南本德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SBS",
        "cityName": "斯廷博特斯普林斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SBY", "cityName": "萨利斯贝利欧申市", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SCC",
        "cityName": "普拉德霍湾/得豪斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SCE", "cityName": "州立学院", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SCM",
        "cityName": "斯卡蒙贝",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SDF", "cityName": "路易斯维尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SDP",
        "cityName": "沙尖镇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SDY", "cityName": "西德尼", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SEA",
        "cityName": "西雅图",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SFO", "cityName": "旧金山", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SFY",
        "cityName": "斯宾菲尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SGF", "cityName": "斯宾菲尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SGU",
        "cityName": "圣佐治",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SGY", "cityName": "史凯威", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SHD",
        "cityName": "斯丹顿",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SHG", "cityName": "雄纳克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SHH",
        "cityName": "希什马廖夫",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SHR", "cityName": "谢里丹", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SHV",
        "cityName": "什里夫波特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SHX", "cityName": "沙格勒克 ", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SIT",
        "cityName": "少奇",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SJC", "cityName": "圣何塞", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SJT",
        "cityName": "圣安吉洛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SKK", "cityName": "沙土里克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SLC",
        "cityName": "盐湖城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SLE", "cityName": "赛伦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SLK",
        "cityName": "萨拉纳克湖",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SLN", "cityName": "瑟琳娜", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SLQ",
        "cityName": "斯利特缪特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SMK", "cityName": "圣麦克尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SMN",
        "cityName": "萨蒙",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SMX", "cityName": "新圣母玛利亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SNA",
        "cityName": "圣塔安那",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SNP", "cityName": "圣保罗岛", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SOP",
        "cityName": "南皮内斯岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SOV", "cityName": "塞尔多维亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SOW",
        "cityName": "搜罗",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SPI", "cityName": "斯宾菲尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SPS",
        "cityName": "威奇塔瀑布",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SRQ", "cityName": "萨拉索塔/布拉丁顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SRV",
        "cityName": "斯托尼河",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SSI", "cityName": "布朗斯维克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SSM",
        "cityName": "苏圣玛丽",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "STC", "cityName": "圣克劳德", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "STG",
        "cityName": "圣乔治岛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "STL", "cityName": "圣路易斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "STS",
        "cityName": "斯特罗斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SUN", "cityName": "太阳山谷", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SUX",
        "cityName": "苏市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SVA", "cityName": "萨瓦纳", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SVC",
        "cityName": "银城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SVS", "cityName": "斯泰文斯镇", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SWF",
        "cityName": "纽堡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SXP", "cityName": "赛末点", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "SYB",
        "cityName": "海豹湾",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "SYR", "cityName": "西拉克斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TAL",
        "cityName": "塔纳湖",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TBN", "cityName": "雷勒伍德堡", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TCT",
        "cityName": "塔克那",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TEB", "cityName": "泰德波罗", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TEK",
        "cityName": "塔蒂特利克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TEX", "cityName": "科罗拉多州", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TKE",
        "cityName": "泰纳基港",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TKJ", "cityName": "特克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TLA",
        "cityName": "泰勒",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TLH", "cityName": "塔拉哈希", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TLJ",
        "cityName": "塔塔丽娜",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TLT", "cityName": "吐露沙克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TNC",
        "cityName": "亭城",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TNK", "cityName": "吐露那可", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TOG",
        "cityName": "托奇阿克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TOL", "cityName": "托莱多", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TOP",
        "cityName": "托皮卡",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TPA", "cityName": "坦帕", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TRI",
        "cityName": "三连市",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TUL", "cityName": "塔尔萨", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TUP",
        "cityName": "图珀洛",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TUS", "cityName": "图森", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TVC",
        "cityName": "特拉弗斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TVF", "cityName": "锡基特波蒂奇", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TWA",
        "cityName": "双峰",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TWF", "cityName": "特温福尔斯", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TXK",
        "cityName": "特克萨卡纳",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "TYR", "cityName": "泰勒", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "TYS",
        "cityName": "诺克斯维尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "UBS", "cityName": "哥伦布", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "UGI",
        "cityName": "尤加尼克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "UIN", "cityName": "昆西", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "UNK",
        "cityName": "安阿拉克利特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "VAK", "cityName": "昔安", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "VBM",
        "cityName": "蓝山",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "VCT", "cityName": "维多利亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "VDZ",
        "cityName": "瓦尔迪兹",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "VEE", "cityName": "温尼提", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "VEL",
        "cityName": "温奈尔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "VIS", "cityName": "维萨利亚", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "VLD",
        "cityName": "瓦尔多斯塔",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "VPS", "cityName": "瓦尔帕来所", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WAA",
        "cityName": "威尔士",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WAS", "cityName": "华盛顿", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WBB",
        "cityName": "斯特比",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WBQ", "cityName": "博柔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WKK",
        "cityName": "阿勒纳吉",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WLK", "cityName": "塞拉威克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WMK",
        "cityName": "梅尔斯查克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WMO", "cityName": "白山", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WNA",
        "cityName": "纳帕奇阿克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WRG", "cityName": "兰格尔", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WRL",
        "cityName": "瓦尔兰德",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WSN", "cityName": "南纳克内克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WST",
        "cityName": "西风",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WSX", "cityName": "威斯特海湾", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WTK",
        "cityName": "诺阿塔克",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WTL", "cityName": "吞吐图莱克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WWP",
        "cityName": "瓦勒帕斯",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "WWT", "cityName": "纽托克", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "WYS",
        "cityName": "西黄石",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "XZU", "cityName": "雷雷火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "YAK",
        "cityName": "雅库特",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "YKM", "cityName": "雅集瓦", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "YNG",
        "cityName": "扬斯敦",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "YUM", "cityName": "尤马", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZFZ",
        "cityName": "布法罗火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZGD", "cityName": "新伦敦火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZME",
        "cityName": "纽约/纽瓦克火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZRD", "cityName": "里齐蒙得火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZRL",
        "cityName": "兰开斯特火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZRV", "cityName": "普罗维登斯火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZTD",
        "cityName": "斯臣呢太迪火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZTE", "cityName": "罗彻斯特火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZTF",
        "cityName": "威斯特郡斯坦福德火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZTJ", "cityName": "普林斯顿火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZTV",
        "cityName": "斯特蒂文特火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZUA", "cityName": "尤蒂卡火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZVE",
        "cityName": "纽黑文火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZWB", "cityName": "纽波特新威廉斯堡火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZWV",
        "cityName": "格兰威火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "ZWW", "cityName": "汉普顿纽波特纽斯火车站", "countryCode": "US", "countryName": "美国"}, {
        "cityCode": "ZYQ",
        "cityName": "锡拉库扎火车站",
        "countryCode": "US",
        "countryName": "美国"
    }, {"cityCode": "BMV", "cityName": "邦美蜀", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "CAH",
        "cityName": "金瓯省",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "DAD", "cityName": "峴港", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "DIN",
        "cityName": "奠边府",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "DLI", "cityName": "大叻", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "HAN",
        "cityName": "河内",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "HPH", "cityName": "海防", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "HUI",
        "cityName": "惠尔",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "NHA", "cityName": "芽庄", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "PQC",
        "cityName": "富国岛",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "PXU", "cityName": "波来古", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "SGN",
        "cityName": "胡志明市",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "TBB", "cityName": "绥和", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "UIH",
        "cityName": "归仁港",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "VCL", "cityName": "三奇", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "VCS",
        "cityName": "康岛",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "VII", "cityName": "威海市", "countryCode": "VN", "countryName": "越南"}, {
        "cityCode": "VKG",
        "cityName": "拉兹加",
        "countryCode": "VN",
        "countryName": "越南"
    }, {"cityCode": "AAY", "cityName": "盖海达", "countryCode": "YE", "countryName": "也门"}, {
        "cityCode": "ADE",
        "cityName": "亚丁",
        "countryCode": "YE",
        "countryName": "也门"
    }, {"cityCode": "GXF", "cityName": "塞云", "countryCode": "YE", "countryName": "也门"}, {
        "cityCode": "HOD",
        "cityName": "荷台达",
        "countryCode": "YE",
        "countryName": "也门"
    }, {"cityCode": "RIY", "cityName": "里雅恩姆卡拉", "countryCode": "YE", "countryName": "也门"}, {
        "cityCode": "SAH",
        "cityName": "萨纳亚",
        "countryCode": "YE",
        "countryName": "也门"
    }, {"cityCode": "SCT", "cityName": "索科特拉岛", "countryCode": "YE", "countryName": "也门"}, {
        "cityCode": "TAI",
        "cityName": "泰兹",
        "countryCode": "YE",
        "countryName": "也门"
    }, {"cityCode": "AAM", "cityName": "马拉马拉", "countryCode": "ZA", "countryName": "南非"}, {
        "cityCode": "CPT",
        "cityName": "开普敦",
        "countryCode": "ZA",
        "countryName": "南非"
    }, {"cityCode": "DUR", "cityName": "德班", "countryCode": "ZA", "countryName": "南非"}, {
        "cityCode": "HDS",
        "cityName": "侯斯普瑞特",
        "countryCode": "ZA",
        "countryName": "南非"
    }, {"cityCode": "JNB", "cityName": "约翰内斯堡", "countryCode": "ZA", "countryName": "南非"}, {
        "cityCode": "KIM",
        "cityName": "金佰利",
        "countryCode": "ZA",
        "countryName": "南非"
    }, {"cityCode": "MBD", "cityName": "姆马巴托", "countryCode": "ZA", "countryName": "南非"}, {
        "cityCode": "BUQ",
        "cityName": "布拉瓦约",
        "countryCode": "ZW",
        "countryName": "津巴布韦"
    }, {"cityCode": "HRE", "cityName": "哈拉雷", "countryCode": "ZW", "countryName": "津巴布韦"}]
}

//机票和酒店（选择酒店）酒店详情
var result6 = {
    "success": 1,
    "code": 200,
    "data": {
        "hotelInfo": {
            "hotelID": 11911,
            "hotelName": "Suphan Lake Hometel（素帆湖别墅酒店） ",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel.jpg",
            "location": "Suvarnabhumi Airport",
            "longitude": "100.731513",
            "latitudes": "13.762091",
            "city": "曼谷",
            "country": "泰国",
            "starRating": "2",
            "avgRatePerPax": 0,
            "rooms": [{
                "roomID": 78266,
                "roomName": "Standard (Package)",
                "roomPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel_standard_double_room2.jpg",
                "includedBreakfast": 0,
                "roomDescription": "Standard Room with private balcony offers main facilities such as cable TV,refrigerator with minibar,air condition,Free WI-Fi connection and 2 complimentary bottle water.\n",
                "prices": [{"category": 1, "quantity": 2, "currencyCode": "CNY", "amount": 3233, "totalAmount": 6466}],
                "addtionalPrice": -166,
                "totalAmount": 6466
            }, {
                "roomID": 78269,
                "roomName": "Superior (Package)",
                "roomPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel_superior_twin_bed.jpg",
                "includedBreakfast": 0,
                "roomDescription": "Superior room offers main facilities such as air conditioning,refrigerator with minibar,cable TV,desk,free Wi-fi connection,private balcony and 2 complimentary bottle water.\n",
                "prices": [{"category": 1, "quantity": 2, "currencyCode": "CNY", "amount": 3246, "totalAmount": 6492}],
                "addtionalPrice": -140,
                "totalAmount": 6492
            }, {
                "roomID": 78265,
                "roomName": "Standard with Breakfast (Package)",
                "roomPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel_standard_double_room2.jpg",
                "includedBreakfast": 1,
                "roomDescription": "Standard Room with private balcony offers main facilities such as cable TV,refrigerator with minibar,air condition,Free WI-Fi connection and 2 complimentary bottle water.\n",
                "prices": [{"category": 1, "quantity": 2, "currencyCode": "CNY", "amount": 3251, "totalAmount": 6502}],
                "addtionalPrice": -130,
                "totalAmount": 6502
            }, {
                "roomID": 78268,
                "roomName": "Superior with Breakfast (Package)",
                "roomPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel_superior_twin_bed.jpg",
                "includedBreakfast": 1,
                "roomDescription": "Superior room offers main facilities such as air conditioning,refrigerator with minibar,cable TV,desk,free Wi-fi connection,private balcony and 2 complimentary bottle water.\n",
                "prices": [{"category": 1, "quantity": 2, "currencyCode": "CNY", "amount": 3263, "totalAmount": 6526}],
                "addtionalPrice": -106,
                "totalAmount": 6526
            }, {
                "roomID": 173151,
                "roomName": "Superior with Breakfast plus Round trip BKK airport transfer (Package)",
                "roomPictureURL": "http://images.asiatravel.com/Hotel/11911/11911_suphan_lake_hometel_superior_twin_bed.jpg",
                "includedBreakfast": 1,
                "roomDescription": "Superior room offers main facilities such as air conditioning,refrigerator with minibar,cable TV,desk,free Wi-fi connection,private balcony and 2 complimentary bottle water.\n",
                "prices": [{"category": 1, "quantity": 2, "currencyCode": "CNY", "amount": 3316, "totalAmount": 6632}],
                "addtionalPrice": 0,
                "totalAmount": 6632
            }],
            "additionalPrice": 0
        }
    }
};























