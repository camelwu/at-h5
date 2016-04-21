var data2 = '',roomdata = '';
(function () {
    var localJson = eval("localJson="+localStorage.getItem("hotelDetailInfo"));
    //data中入住离店时间必须去掉时分秒
    var departDate = localJson.data.DepartDate.substring(0,10);
    var enterDate = localJson.data.ReturnDate.substring(0,10);
    localJson.data.DepartDate = departDate;
    localJson.data.ReturnDate = enterDate;
    console.log(localJson)
    var data = {
        "Code":"50100009",
        "ForeEndType":2,
        "Parameters":localJson.data
    }

    var departDateHtml = localJson.data.DepartDate.substring(5);
    var enterDateHtml = localJson.data.ReturnDate.substring(5);
    $('.jhf-mes span.departDate').html(departDateHtml);
    $('.jhf-mes span.returnDate').html(enterDateHtml);
    //getDayNum计算天数
    $('#nightNum').html(getDayNum(departDateHtml, enterDateHtml))
    function getDayNum(arg1, arg2) {
        var time1 = Date.parse(arg1.replace(/-/g, "/")), time2 = Date.parse(arg2.replace(/-/g, "/")), dayCount;
        return dayCount = (Math.abs(time2 - time1)) / 1000 / 60 / 60 / 24;
    }
    //判断是从列表页进入还是机景选择页进
    if(window.location.search == ''){
        console.log('是列表页')
    }else{
        console.log('是何勇页面')
    }


    vlm.loadJson('', JSON.stringify(data), dataCallBack);//url统一改vlm中的，此处可以为空
    function dataCallBack(result) {
        //console.log(result);
        data2 = result.data;
        console.log(data2);
        roomdata = data2.hotelInfo.rooms;
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

        $('.jhf-mes li.showh .slide').each(function(i){
            $('.jhf-mes li.showh .slide').eq(i).click(function(){
                //$(this).find('i').toggleClass('cur');
                //$('.jhf-mes ol.show').eq(i).slideToggle();
                $(this).find('b').addClass('cur').parents('li.showh').siblings().find('b').removeClass('cur');
                var roomID = roomdata[i].roomID;
                window.location.href = 'ticket_hotel_choose.html?roomID='+roomID;
            })
        });
    }
})()


















