(function(templateData) {
    var template_array=[];
    var fn=(function(data){
        var template_key='';
        for(key in data){
            template_key+=('var '+key+'=data["'+key+'"];');
        }
        eval(template_key);
        template_array.push('    ');
        for(var i=0;i < data.length;i++){
            template_array.push('    <li class="ho_list">' +
            '<img class="h-choose" src="../images/ui/choose.png">' +
            '<div class="ho_pic">' +
            '<img src="',typeof(data[i].hotelPictureURL)==='undefined'?'':data[i].hotelPictureURL,'" /></div>',typeof(data.hotels[i].hotelName)==='undefined'?'':data.hotels[i].hotelName,'            </p>            <div class="h-score">            <span style="color:#8ed1cc;font-size:1.5rem;font-weight: 600;"> ',typeof(data.hotels[i].score)==='undefined'?'':data.hotels[i].score,'</span>            <span style="color:#999999;font-size:0.8rem;">分/',typeof(data.hotels[i].personNum)==='undefined'?'':data.hotels[i].personNum,'人点评</span>            </div>            <div class="h-grade">                <span style="color:#999999;font-size:1rem;">',typeof(data.hotels[i].starRating)==='undefined'?'':data.hotels[i].starRating,'</span>                <b class="hl-icon1"></b>                <b class="hl-icon2"></b>                <p class="h-address">',typeof(hotels[i]['location'])==='undefined'?'':hotels[i]['location'],'</p>            </div>            <div class="l-price">                <span style="font-size:0.8em;color:#fe4716;">￥</span>                <span class="price-num">',typeof(hotels[i]['avgRatePerPax'])==='undefined'?'':hotels[i]['avgRatePerPax'],'</span>                <!&ndash;<a class="choose-no">选择</a>&ndash;>            </div>        </div>-->    </li>    '); }
        template_array.push('');
        template_key=null;
    })(templateData);
    fn=null;
    return template_array.join('');
})

hotels=[
        {
            "hotelID": "25",
            "hotelName": "Hotel Grand Central",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/25/25exterior.jpg",
            "location": "Orchard Vicinity",
            "city": "新加坡",
            "country": "新加坡",
            "isBestDeal": true,
            "starRating": "3 stars",
            "moreInfoLink": "http://book.asiatravel.net/hotelinfo.aspx?hid=25&lan=zh-CN",
            "currencyCode": "CNY",
            "avgRatePerPax": 834.00,
            "avgRatePerPaxSpecified": true,
            "avgRatePerPaxSeparately": 1042.00,
            "avgRatePerPaxSeparatelySpecified": true,
            "avgRatePerPaxInCNY": 834.00,
            "avgRatePerPaxInCNYSpecified": true,
            "avgRatePerPaxSeparatelyInCNY": 1042.00,
            "avgRatePerPaxSeparatelyInCNYSpecified": true,
            "rooms": null
        },
        {
            "hotelID": "30",
            "hotelName": "Gallery Hotel",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/30/30facade.jpg",
            "location": "River Valley",
            "city": "新加坡",
            "country": "新加坡",
            "isBestDeal": true,
            "starRating": "4 stars",
            "moreInfoLink": "http://book.asiatravel.net/hotelinfo.aspx?hid=30&lan=zh-CN",
            "currencyCode": "CNY",
            "avgRatePerPax": 1450.00,
            "avgRatePerPaxSpecified": true,
            "avgRatePerPaxSeparately": 1549.00,
            "avgRatePerPaxSeparatelySpecified": true,
            "avgRatePerPaxInCNY": 1450.00,
            "avgRatePerPaxInCNYSpecified": true,
            "avgRatePerPaxSeparatelyInCNY": 1549.00,
            "avgRatePerPaxSeparatelyInCNYSpecified": true,
            "rooms": null
        },
        {
            "hotelID": "3283",
            "hotelName": "Fragrance Hotel Selegie",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/3283/3283front.jpg",
            "location": "Little India",
            "city": "新加坡",
            "country": "新加坡",
            "isBestDeal": true,
            "starRating": "3 stars",
            "moreInfoLink": "http://book.asiatravel.net/hotelinfo.aspx?hid=3283&lan=zh-CN",
            "currencyCode": "CNY",
            "avgRatePerPax": 1533.00,
            "avgRatePerPaxSpecified": true,
            "avgRatePerPaxSeparately": 1765.00,
            "avgRatePerPaxSeparatelySpecified": true,
            "avgRatePerPaxInCNY": 1533.00,
            "avgRatePerPaxInCNYSpecified": true,
            "avgRatePerPaxSeparatelyInCNY": 1765.00,
            "avgRatePerPaxSeparatelyInCNYSpecified": true,
            "rooms": null
        },
        {
            "hotelID": "7765",
            "hotelName": "Festive Hotel(节庆酒店)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/7765/front-image.jpg",
            "location": "Sentosa Island",
            "city": "新加坡",
            "country": "新加坡",
            "isBestDeal": true,
            "starRating": "5 stars",
            "moreInfoLink": "http://book.asiatravel.net/hotelinfo.aspx?hid=7765&lan=zh-CN",
            "currencyCode": "CNY",
            "avgRatePerPax": 1707.00,
            "avgRatePerPaxSpecified": true,
            "avgRatePerPaxSeparately": 1806.00,
            "avgRatePerPaxSeparatelySpecified": true,
            "avgRatePerPaxInCNY": 1707.00,
            "avgRatePerPaxInCNYSpecified": true,
            "avgRatePerPaxSeparatelyInCNY": 1806.00,
            "avgRatePerPaxSeparatelyInCNYSpecified": true,
            "rooms": null
        },
        {
            "hotelID": "8016",
            "hotelName": "Hotel Grand Chancellor(大富酒店)",
            "hotelPictureURL": "http://images.asiatravel.com/Hotel/8016/8016facade.jpg",
            "location": "Little India",
            "city": "新加坡",
            "country": "新加坡",
            "isBestDeal": true,
            "starRating": "3 stars",
            "moreInfoLink": "http://book.asiatravel.net/hotelinfo.aspx?hid=8016&lan=zh-CN",
            "currencyCode": "CNY",
            "avgRatePerPax": 1125.00,
            "avgRatePerPaxSpecified": true,
            "avgRatePerPaxSeparately": 1295.00,
            "avgRatePerPaxSeparatelySpecified": true,
            "avgRatePerPaxInCNY": 1125.00,
            "avgRatePerPaxInCNYSpecified": true,
            "avgRatePerPaxSeparatelyInCNY": 1295.00,
            "avgRatePerPaxSeparatelyInCNYSpecified": true,
            "rooms": null
        }
    ]