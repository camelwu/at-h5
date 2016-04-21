console.log('页面加载成功');
var data2 = '',roomdata = '';
(function () {
    var data = {
        "Code":"50100009",
        "ForeEndType":2,
        "Parameters":{
            "HotelID":"11911",
            "SelectedRoomID":173151,
            "FlightCacheID":"1013219",
            "FlightSetID":"1003003",
            "CityCodeFrom":"SIN",
            "CityCodeTo":"BKK",
            "DepartDate":"2016-05-07",
            "ReturnDate":"2016-05-08",
            "RoomDetails":[
                {"Adult":2}
            ]
        }
    }

    vlm.loadJson('', JSON.stringify(data), dataCallBack);//url统一改vlm中的，此处可以为空
    function dataCallBack(result) {
        console.log(result);
        data2 = result.data;
        console.log(data2);
        roomdata = data2.hotelInfo.rooms;
        //console.log(roomdata[0].roomName);
        nav();
        banner();
        adress();
        room();
        vlm.init();
    }
    //nav标题部分
    function nav(){
        var tpl_seoul = template("tpl_seoul", data2.hotelInfo);
        $('.j-title').html(tpl_seoul);
    }
    //banner
    function banner(){
        var banner = template("banner", data2.hotelInfo);
        $('.jhf-banner').html(banner);
    }
    //日历部分


    rili();
    function rili(){
        var dateInitObj = new Object();
        var myDate2 = new Calender({
            id : 'chooseDate',
            num : 13,
            time : dateInitObj,
            sClass1 : 'enterDate',
            id2 : 'nightNum',
            fn : upDateContent
        });
        function upDateContent(){
            alert(222)
            hotelDetail.gdataInfo.CheckInDate = document.getElementsByClassName('enterDate')[0].innerHTML;
            hotelDetail.gdataInfo.CheckOutDate = document.getElementsByClassName('enterDate')[1].innerHTML;
            hotelDetail.init(hotelDetail.gdataInfo);
        }
    }
    //地址 星级 wifi
    function adress(){
        var jhf_score = template("jhf_score", data2.hotelInfo);
        $('.jhf-score').html(jhf_score);
    }

    //客房部分
    function room(){
        var jhf_room = template("jhf_room", data2.hotelInfo);
        $('.jhf-mes').append(jhf_room);

        $('.jhf-mes li.showh .slide').each(function(i){
            $('.jhf-mes li.showh .slide').eq(i).click(function(){
                $(this).find('i').toggleClass('cur');
                $('.jhf-mes ol.show').eq(i).slideToggle();
            })
        });
    }
})()


















