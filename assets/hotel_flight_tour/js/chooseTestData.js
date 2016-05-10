var data = {
  "success": 1,
  "message": "",
  "data": {
    "flightInfo": {
      "setID": 30000006,
      "cacheID": 3510895,
      "segmentsTotalTravelTime": "24h20m",
      "segmentsLeaveTotalTravelTime": 1525,
      "segmentsLeaveTotalTravelTimeString": "15h25m",
      "segmentsReturnTotalTravelTime": 855,
      "segmentsReturnTotalTravelTimeString": "8h55m",
      "cityCodeFrom": "BJS",
      "cityCodeTo": "SIN",
      "cityNameFrom": "北京",
      "cityNameTo": "新加坡",
      "isLeaveShareFlight": 0,
      "isReturnShareFlight": 0,
      "isInternationalFlight": 1,
      "cabinClass": 0, /*0 - 经济舱; 1 - 头等舱; 2 - 商务舱; 3 - 超级经济舱*/
      "flightLeaveStartDate": "2016-06-05T06:45:00",
      "flightLeaveEndDate": "2016-06-05T22:10:00",
      "flightReturnStartDate": "2016-06-10T08:55:00",
      "flightReturnEndDate": "2016-06-10T17:50:00",
      "flightLeaveSpacingDay": 0,
      "flightReturnSpacingDay": 0,
      "transferListLeave": ["厦门","福州"],
      "transferListLeaveTime": ["8h"],
      "transferListReturn": ["厦门"],
      "transferListReturnTime": ["2h5m"],
      "directFlight": 1,/*是否中转， 0- 直飞，1 - 中转*/
      "currencyCode": null,
      "segmentsLeave": [
        {
          "airportCodeFrom": "PEK",
          "airportCodeTo": "XMN",
          "cityCodeFrom": "BJS",
          "cityCodeTo": "XMN",
          "airportNameFrom": "北京首都机场",
          "airportNameTo": "厦门",
          "cityNameFrom": "北京",
          "cityNameTo": "厦门",
          "airCorpCode": "MF",
          "airCorpName": "厦门航空",
          "cabinClass": 0,
          "flightNo": "8104",
          "departDate": "2016-06-05T06:45:00",/*起飞时间*/
          "arriveDate": "2016-06-05T10:00:00",/*到达时间*/
          "spacingDay": 0,/*间隔天数*/
          "timeSpan": null,/*飞行时间*/
          "planeType": "738",/*机型（727等）*/
          "planeName": "波音737-800", /*机型名称(波音等)*/
          "marketingCarrierCode": "MF",/*合约承运航空公司二字码*/
          "operatingCarrierCode": "MF",/*操作航空公司二字码*/
          "operatingCarrierName": "厦门航空",/*操作航空公司名称*/
          "termArrive": "T2",/*到达航站楼*/
          "termDepart": "T2"/*离开航站楼*/
        },
        {
          "airportCodeFrom": "XMN",
          "airportCodeTo": "SIN",
          "cityCodeFrom": "XMN",
          "cityCodeTo": "SIN",
          "airportNameFrom": "厦门",
          "airportNameTo": "新加坡樟宜机场",
          "cityNameFrom": "厦门",
          "cityNameTo": "新加坡",
          "airCorpCode": "MF",
          "airCorpName": "厦门航空",
          "cabinClass": 0,
          "flightNo": "855",
          "departDate": "2016-06-05T18:00:00",
          "arriveDate": "2016-06-05T22:10:00",
          "spacingDay": 0,
          "timeSpan": null,
          "planeType": "738",
          "planeName": "波音737-800",
          "marketingCarrierCode": "MF",
          "operatingCarrierCode": "MF",
          "operatingCarrierName": "厦门航空",
          "termArrive": "T3",
          "termDepart": "T3"
        }],
      "segmentsReturn": [
        {
          "airportCodeFrom": "SIN",
          "airportCodeTo": "XMN",
          "cityCodeFrom": "SIN",
          "cityCodeTo": "XMN",
          "airportNameFrom": "新加坡樟宜机场",
          "airportNameTo": "厦门",
          "cityNameFrom": "新加坡",
          "cityNameTo": "厦门",
          "airCorpCode": "MF",
          "airCorpName": "厦门航空",
          "cabinClass": 0,
          "flightNo": "856",
          "departDate": "2016-06-10T08:55:00",
          "arriveDate": "2016-06-10T12:55:00",
          "spacingDay": 0,
          "timeSpan": null,
          "planeType": "738",
          "planeName": "波音737-800",
          "marketingCarrierCode": "MF",
          "operatingCarrierCode": "MF",
          "operatingCarrierName": "厦门航空",
          "termArrive": "T1",
          "termDepart": "T1"
        },
        {
          "airportCodeFrom": "XMN",
          "airportCodeTo": "PEK",
          "cityCodeFrom": "XMN",
          "cityCodeTo": "BJS",
          "airportNameFrom": "厦门",
          "airportNameTo": "北京首都机场",
          "cityNameFrom": "厦门",
          "cityNameTo": "北京",
          "airCorpCode": "MF",
          "airCorpName": "厦门航空",
          "cabinClass": 0,
          "flightNo": "8105",
          "departDate": "2016-06-10T15:00:00",
          "arriveDate": "2016-06-10T17:50:00",
          "spacingDay": 0,
          "timeSpan": null,
          "planeType": "787",
          "planeName": "波音787",
          "marketingCarrierCode": "MF",
          "operatingCarrierCode": "MF",
          "operatingCarrierName": "厦门航空",
          "termArrive": "T3",
          "termDepart": "T3"
        }],
      "additionalPrice": 0.0/*加钱数（更换航班差价）*/
    },
    "hotelInfo": {
      "hotelID": 1023696,
      "hotelName": "Robertson Quay",
      "hotelPictureURL": "http://images.gta-travel.com/HH/Images/RS/SINth/SIN-ROB-1.jpg",
      "location": "",
      "longitude": null,/*酒店经度*/
      "latitude": null,/*酒店纬度*/
      "isCashRebate": 0,/*酒店是否有现金回扣*/
      "isCrazyRate": 0,/*超低折扣*/
      "isFreeWiFi": 0,/*免费WiFi*/
      "hotelReviewCount": 0,/*酒店总的得分(基于猫头鹰)*/
      "hotelReviewScore": 0.0,/*酒店等级(基于猫头鹰)*/
      "hotelNameLocale": null,/*酒店中文名称*/
      "city": "Singapore",
      "country": "Singapore",
      "starRating": "3 stars",/*酒店星级*/
      "currencyCode": "CNY",
      "avgRatePerPax": 6983.00,/*打包价格*/
      "rooms": [
        {
        "roomID": 10996872,
        "roomName": "Standard Room",
        "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
        "includedBreakfast": 1,/*是否包含早餐*/
        "roomDescription": null,/*房间描述*/
        "prices": [
          {
            "category": 1,/*客人类型*/
            "quantity": 2,/*人数*/
            "currencyCode": "CNY",
            "amount": 6983.0,/*单价*/
            "totalAmount": 13966.0/*总价*/
          }],
        "addtionalPrice": 0.0,
        "totalAmount": 13966.0
      },
        {
        "roomID": 10996872,
        "roomName": "Standard Room",
        "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
        "includedBreakfast": 1,/*是否包含早餐*/
        "roomDescription": null,/*房间描述*/
        "prices": [
          {
            "category": 1,/*客人类型*/
            "quantity": 2,/*人数*/
            "currencyCode": "CNY",
            "amount": 6983.0,/*单价*/
            "totalAmount": 13966.0/*总价*/
          }],
        "addtionalPrice": 0.0,
        "totalAmount": 13966.0
      },
        {
        "roomID": 10996872,
        "roomName": "Standard Room",
        "roomPictureURL": "http://packages.asiatravel.com/packagebooking/crs.style/img/icon/room-noimage.png",
        "includedBreakfast": 1,/*是否包含早餐*/
        "roomDescription": null,/*房间描述*/
        "prices": [
          {
            "category": 1,/*客人类型*/
            "quantity": 2,/*人数*/
            "currencyCode": "CNY",
            "amount": 6983.0,/*单价*/
            "totalAmount": 13966.0/*总价*/
          }],
        "addtionalPrice": 0.0,
        "totalAmount": 13966.0
      }

      ],
      "additionalPrice": 0.0,/*和当前所选酒店房间的差价*/
      "hotelAddress": null,
      "images": null
    },
    "airwaySetID": 30000006,/*	当前航班所属航空公司产品ID*/
    "airwayCacheID": 3510895,/*当前航班所属航空公司CacheID*/
    "tours": [
      {
      "tourID": 134,
      "travelDates": /*可游玩时间*/
        ["2016-06-05T00:00:00", "2016-06-06T00:00:00", "2016-06-07T00:00:00", "2016-06-08T00:00:00", "2016-06-09T00:00:00", "2016-06-10T00:00:00"],
      "selectTravelDate": "2016-06-05T00:00:00",/*选中游玩时间*/
      "tourOptions": null,/*可选TourOption*/
      "selectOptionCode": null,
      "travelDateMandatory": 1,/*游玩时间是否必填*/
      "tourName": "2合1动物园与夜间野生动物园游",
      "tourPictureURL": "http://packagescontrol.asiatravel.net/packageImage/Tour/night safari_02.jpg",
      "tourSessions": [
        {"tourSessionEnumValue": 3,/*0 - 上午; 1 - 下午; 2 - 晚上; 3 - 全天; 4 - 全天*/
          "tourSessionName": "全天",
          "isSelected": 1}/*是否选中*/
      ]
    }, {
      "tourID": 136,
      "travelDates": ["2016-06-05T00:00:00", "2016-06-06T00:00:00", "2016-06-07T00:00:00", "2016-06-08T00:00:00", "2016-06-09T00:00:00", "2016-06-10T00:00:00"],
      "selectTravelDate": "2016-06-06T00:00:00",
      "tourOptions": null,
      "selectOptionCode": null,
      "travelDateMandatory": 1,
      "tourName": "圣淘沙夕阳游(7小时)",
      "tourPictureURL": "http://packagescontrol.asiatravel.net/packageImage/Tour/136_UWW.jpg",
      "tourSessions": [{"tourSessionEnumValue": 1, "tourSessionName": "下午", "isSelected": 1}]
    }, {
      "tourID": 166,
      "travelDates": ["2016-06-05T00:00:00", "2016-06-06T00:00:00", "2016-06-07T00:00:00", "2016-06-08T00:00:00", "2016-06-09T00:00:00", "2016-06-10T00:00:00"],
      "selectTravelDate": "2016-06-07T00:00:00",
      "tourOptions": null,
      "selectOptionCode": null,
      "travelDateMandatory": 0,
      "tourName": "机场接送服务（ 拼车）",
      "tourPictureURL": "http://packagescontrol.asiatravel.net/packageImage/Tour/166_Asiatravel-coach-135x86.jpg",
      "tourSessions": [{"tourSessionEnumValue": 4, "tourSessionName": "上午", "isSelected": 1},{"tourSessionEnumValue": 4, "tourSessionName": "下午", "isSelected": 1}]
    }]
  },
  "code": "200"
};
