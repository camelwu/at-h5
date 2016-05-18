var data2 = '',roomdata = '';
(function () {
    var temObj = JSON.parse(localStorage.getItem("hotelDetailInfo"));
    var urlIf = window.location.search;

    var ulrRoomId = urlIf.substring(23)-0;

    var departDate = temObj.departDate.substring(0,10);
    var enterDate = temObj.returnDate.substring(0,10);
    temObj.departDate = departDate;
    temObj.returnDate = enterDate;
    if(!ulrRoomId){delete temObj.selectedRoomID}
    //data中入住离店时间必须去掉时分秒
    var data = {
        "Code":"50100009",
        "ForeEndType":2,
        "Parameters":temObj
    };
    var departDateHtml = temObj.departDate.substring(5);
    var enterDateHtml = temObj.returnDate.substring(5);
    $('.jhf-mes span.departDate').html(departDateHtml);
    $('.jhf-mes span.returnDate').html(enterDateHtml);

    //getDayNum计算天数
    $('#nightNum').html(getDayNum(departDate, enterDate))
    function getDayNum(arg1, arg2) {
        var time1 = Date.parse(arg1.replace(/-/g, "/")), time2 = Date.parse(arg2.replace(/-/g, "/")), dayCount;
        return dayCount = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
    }
    vlm.loadJson('', JSON.stringify(data), dataCallBack);//url统一改vlm中的，此处可以为空
    function dataCallBack(result) {
        console.log(result)
        $("#preloader").hide();
        if(result.success&&result.data.hotelInfo.hotelID){
            var flightHotelAllData = JSON.parse(window.sessionStorage.getItem('hftFlightHotelTourInfo'));
            //console.log(flightHotelAllData)
            if(!window.location.search){
                flightHotelAllData.hotelInfo = result.data.hotelInfo;
                window.sessionStorage.setItem('flightHotelAllData',JSON.stringify(flightHotelAllData));
            }
            data2 = result.data;
            console.log(data2);
            roomdata = data2.hotelInfo.rooms;
            nav();
            banner();
            adress();
            room();
            $('.jhf-date').show();
            vlm.init();
        }else{
            jAlert('暂无酒店详细数据,请稍后再试', "提示");
        }
    }
    //nav标题部分
    function nav(){
        $('.header h3').html(data2.hotelInfo.hotelName);
    }
    //banner
    function banner(){
        var banner = template("banner", data2.hotelInfo);
        $('.jhf-banner').html(banner);
    }
    //日历部分
    //
    //
    //rili();
    //function rili(){
    //    var dateInitObj = new Object();
    //    var myDate2 = new Calender({
    //        id : 'chooseDate',
    //        num : 13,
    //        time : dateInitObj,
    //        sClass1 : 'enterDate',
    //        id2 : 'nightNum',
    //        fn : upDateContent
    //    });
    //    function upDateContent(){
    //    }
    //}
    //地址 星级 wifi
    function adress(){
        var jhf_score = template("jhf_score", data2.hotelInfo);
        $('.jhf-score').html(jhf_score);
    }

    //客房部分
    function room(){
        var jhf_room = template("jhf_room", data2.hotelInfo);
        $('.jhf-mes').append(jhf_room);
        console.log(roomdata[0].roomID)
        $('.jhf-mes li.showh .slide').each(function(i){
            if( ulrRoomId == roomdata[i].roomID ){
                console.log('true')
                $('.jhf-mes li.showh .slide').eq(i).find('b').addClass('cur');
            }

            $('.jhf-mes li.showh .slide').eq(i).click(function(){
                //$(this).find('i').toggleClass('cur');
                //$('.jhf-mes ol.show').eq(i).slideToggle();
                $(this).find('b').addClass('cur').parents('li.showh').siblings().find('b').removeClass('cur');
                var roomID = roomdata[i].roomID;
                window.location.href = 'hft_choose.html?type=1&selectedRoomID='+roomID;
            })
        });
    }
})();


















