/**
 * Created by qzz on 2016/3/2.
 */

(function () {

    var oReserve = document.querySelector('.reserve');
    var hotelID = '',
        perPrice = 0,
        totPrice = 0,
        roomID = '';
    //加载动画
    function package_detail() {

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();

    //localStorage.Info
    var jsonPackage = JSON.parse(localStorage.info);
    console.log(jsonPackage)
        //160601有接送服务的产品有默认的接送时间  时间显示格式重置
    var dateTime = '';
    var jsonPackageJie = jsonPackage.CheckInDate;
    var jsonPackageSong = jsonPackage.CheckOutDate;
    timeChong(jsonPackageJie) //接 2016-6-5T00:00:00
    timeChong(jsonPackageSong) //送 2016-6-5T00:00:00
    function timeChong(strTime) {
        var meetYear = strTime.substring(0, 4);
        var month = '',
            day = '',
            hour = "12:00";
        if (strTime.length == 17) { //2016-6-5T00:00:00
            month = 0 + strTime.substring(5, 6);
            day = 0 + strTime.substring(7, 8);
        }
        if (strTime.length == 18) { //2016-10-5T00:00:00   2016-6-15T00:00:00
            if (jsonPackageJie.substring(6, 7) == '-') { //2016-6-15T00:00:00
                month = 0 + strTime.substring(5, 6);
                day = strTime.substring(7, 9);
            } else { //2016-10-5T00:00:00
                month = strTime.substring(5, 7);
                day = 0 + strTime.substring(8, 9);
            }
        }
        if (strTime.length == 19) { //2016-10-15T00:00:00
            month = strTime.substring(5, 7);
            day = strTime.substring(8, 10);
        }
        dateTime = meetYear + '-' + month + '-' + day + ' ' + hour;
        console.log(dateTime)
        return dateTime;
    }
    $('#content3_CheckInDate').attr('value', timeChong(jsonPackageJie));
    $('#content4_CheckInDate').attr('value', timeChong(jsonPackageSong));



    function init() {
        var Parmeters = {
                "Parameters": {
                    "PackageID": localStorage.packageID
                },
                "ForeEndType": 3,
                "Code": "0202"
            }
            //console.log(Parmeters);
        vlm.loadJson("", JSON.stringify(Parmeters), package_tit_back);

        var travelersInput = window.location.search.substring(1).split('&')[5].split('=')[1];
        //根据房间数创建房间信息
        var roomNumber = jsonPackage.roomDetails.length;
        for (var i = 0; i < roomNumber; i++) {
            var oRoom = document.createElement('div');
            oRoom.className = 'per_data order_per_data';
            oRoom.innerHTML = '<span class="title"><i>房间' + (i + 1) + '</i></span>' + '<ul></ul>'
            $('#per-room-wrap')[0].appendChild(oRoom);
            var oRoomNum = document.querySelectorAll('.per_data');

            //每个房间成人数
            var tAdult = parseInt(jsonPackage.roomDetails[i].adult);
            for (var k = 0; k < tAdult; k++) {
                var oSection = document.createElement('section');
                oSection.className = 'li_section_box';
                //if(travelersInput == 0)
                //{
                //    oSection.innerHTML='<li>'
                //        +'<span class="list_tit">成人'+(k+1)+'：</span>'
                //        +'<b class="add_icon"><a href="javascript:;" data-c-id="0" class="add-passager0" ></a></b></span>'
                //        +'</li>'
                //        +"<ul id='trave"+k+"'>"
                //        +'<li class="trave-li trave-li-adu ">'
                //        +'<span class="list_tit2 ">姓：</span>'
                //        +'<span class="list_con2"><input class="list_inp2 list-adult" type="text" placeholder="Zhang" data-elementName="firstName" /></span>'
                //        +'<span class="list_tit2 ">名：</span>'
                //        +'<span class="list_con2 name-inp"><input class="list_inp2 list-adult" type="text" placeholder="Xiaohua" data-elementName="lastName" /></span>'
                //        +'</li>'
                //        +"</ul>"
                //}
                //else
                //{
                oSection.innerHTML = '<li class="first">' + '<span class="list_tit">成人' + (k + 1) + '</span>' + '<b class="add_icon"><a href="javascript:;" data-c-id="' + k + '" class="add-passager' + k + '" ></a></b></span>' + '</li>' + '<ul class="order_trave" id="ht_trave' + k + '">' + '<li class="trave-li trave-li-adu fillinorder_li">'
                    //+'<span class="list_tit2 ">姓：</span>'
                    + '<span class="list_con2"><input class="list_inp2 list-adult" type="text" placeholder="姓（如：Li）" data-elementName="firstName" /></span>'
                    //+'<span class="list_tit2 ">名：</span>'
                    + '<span class="list_con2 name-inp"><input class="list_inp2 list-adult" type="text" placeholder="名（如：ShiMin）" data-elementname="lastName" /></span>' + '</li>' + '<li class="countries-wrap"><b class="icons open-pho-tour"></b><span class="list_country fl">国籍：</span><div class="country-btn" data-code="CN" data-tel-code="86">中国</div></li>' + "</ul>"
                    //}
                oRoomNum[i].querySelector('ul').appendChild(oSection);

                $(".add-passager" + k).on("click", function () {
                    var id = $(this).attr("data-c-id");
                    vlm.f_choice('ht_trave' + id, "ht", 'traver', '', false, false, null, null, null, null);
                })
            }

            //每个房间儿童数
            var totChiNUm = 0,
                t1 = 0,
                t2 = 0;
            if (jsonPackage.roomDetails[i].childWithOutBed) {
                t1 = parseInt(jsonPackage.roomDetails[i].childWithOutBed.length);
            }
            if (jsonPackage.roomDetails[i].childWithBed) {
                t2 = parseInt(jsonPackage.roomDetails[i].childWithBed.length);
            }

            totChiNUm = t1 + t2;
            for (var j = 0; j < totChiNUm; j++) {
                var oSection = document.createElement('section');
                oSection.className = 'li_section_box';
                oSection.innerHTML = '<li>' + '<span class="list_tit">儿童' + (j + 1) + '</span>' + '<b class="add_icon"><a href="javascript:;" data-c-id="' + j + '" class="add-cpassage' + j + '"></a></b></span>' + '</li>' + "<ul id='traveC" + j + "'>" + '<li class="trave-li trave-li-child child">'
                    //+'<span class="list_tit2 ">姓：</span>'
                    + '<span class="list_con2"><input class="list_inp2 list-child" type="text" placeholder="姓（如：Li）" data-elementName="firstName"  /></span>'
                    //+'<span class="list_tit2 ">名：</span>'
                    + '<span class="list_con2"><input class="list_inp2 list-child" type="text" placeholder="名（如：ShiMin）" data-elementName="lastName" /></span>' + '</li>' + "</ul>" + '</section>';
                oRoomNum[i].querySelector('ul').appendChild(oSection);
                $(".add-cpassage" + j).on("click", function () {
                    var id = $(this).attr("data-c-id");
                    vlm.f_choice('traveC' + id, "ht", 'traver', '', false, false, null, null, null, null);
                })

            }
        }
        //第一个房间的第一个人添加国籍
        var oCountry = $('<li class="clearFix countries-wrap">' + '<b class="icons open-pho-tour"></b>' + '<span class="list_country fl">国籍：</span>' + '<div class="country-btn"  data-code="CN" data-tel-code="86">中国</div>' + '</li>')
        oCountry.appendTo($('#trave0'));

        //处理地址栏信息
        function urlShow() {
            if (window.location.search) {
                var winhref = window.location.search.substring(1);
                var arr2 = winhref.split('&');
                //hotel
                hotelID = arr2[0].split('=')[1];
                //航班信息
                var airFli = arr2[2].split('=')[1];
                var dateObj = JSON.parse(window.localStorage.info);
                var paraObj = {
                    start: dateObj.CheckInDate.replace(/T.*/, ''),
                    end: dateObj.CheckOutDate.replace(/T.*/, '')
                };
                var checkInDate = dateObj.CheckInDate.split("T")[0].split("-");
                var checkOutDate = dateObj.CheckOutDate.split("T")[0].split("-");



                switch (airFli) {
                    case '0': // None => 0
                        $('#flight-air').remove();
                        break;
                    case '1': // TwoWay => 1
                        //                        document.querySelector('#content3_CheckInDate').value=paraObj.start;
                        //                        document.querySelector('#content4_CheckInDate').value=paraObj.end;
                        //                        var myDate= new TicketDate({
                        //                            id: 'nav2-center-dep',
                        //                            num: 13,
                        //                            time: paraObj,
                        //                            sClass1: 'CheckInDate',
                        //                            type:'Oneway',
                        //                            _word:{tip:['出发']}
                        //                        });
                        //                        var myDate2= new TicketDate({
                        //                            id: 'nav2-center-arr',
                        //                            num: 13,
                        //                            time: paraObj,
                        //                            sClass1: 'CheckInDate',
                        //                            type:'Oneway',
                        //                            _word:{tip:['出发']}
                        //                        });
                        //初始化content3_CheckInDate scroller组件
                        console.info(localStorage.info);

                        var arriveDate = new Scroller({
                            id: "content3_CheckInDate",
                            type: "dateTime",
                            cont: "content3_CheckInDate",
                            startDate: new Date(checkInDate[0], checkInDate[1], checkInDate[2]),
                            num: 2
                        });
                        var leftDate = new Scroller({
                            id: "content4_CheckInDate",
                            type: "dateTime",
                            cont: "content4_CheckInDate",
                            startDate: new Date(checkOutDate[0], checkOutDate[1], checkOutDate[2]),
                            num: 1
                        });

                        break;
                    case '2': // Arrival => 2
                        $('#content3').remove();
                        //                        document.querySelector('#content3_CheckInDate').value=paraObj.start;
                        //                        var myDate= new TicketDate({
                        //                            id: 'nav2-center-dep',
                        //                            num: 13,
                        //                            time: paraObj,
                        //                            sClass1: 'CheckInDate',
                        //                            type:'Oneway',
                        //                            _word:{tip:['出发']}
                        //                        });
                        var arriveDate = new Scroller({
                            id: "content3_CheckInDate",
                            type: "dateTime",
                            cont: "content3_CheckInDate",
                            startDate: new Date(checkInDate[0], checkInDate[1], checkInDate[2]),
                            num: 2
                        });
                        break;
                    case '3': // Depart => 3
                        $('#content4').remove();
                        var leftDate = new Scroller({
                            id: "content4_CheckInDate",
                            type: "dateTime",
                            cont: "content4_CheckInDate",
                            startDate: new Date(checkOutDate[0], checkOutDate[1], checkOutDate[2]),
                            num: 1
                        });

                        break;
                    default:
                        ;
                }
                //订单总价
                perPrice = arr2[3].split('=')[1];
                //totPrice=perPrice*(tAdult+totChiNUm);
                totPrice = perPrice;
                $('.all_num i').html("￥" + totPrice);
                //roomID
                roomID = arr2[4].split('=')[1];
            }
        }
        urlShow();

        //$('.add-passager').each(function(index,element){
        //    $(this).click(function(){
        //        vlm.f_choice('trave'+index,"ht",'traver','',false,false,null,null,null,null);
        //    })
        //});
        $('.add-contact').click(function () {
            vlm.f_choice('personal_data', "ht", 'contact', '', false, false, null, null, null, null);
        });

        sentPackage(oReserve);
        //同意条款
        var oAgree = document.querySelector('.order-notice-btn');
        var bOk = true;
        oAgree.onclick = function () {
            if (bOk) {
                oAgree.style.background = 'url(../images/ui/icons1.png) -5.29rem -0.07rem';
                oAgree.style.backgroundSize = '8.00rem 2.40rem';
                oReserve.style.backgroundColor = '#ddd';
                sentPackage(oReserve);
                bOk = false;
            } else {
                oAgree.style.background = 'url(../images/ui/icons1.png) -4.7rem -0.07rem';
                oAgree.style.backgroundSize = '8.00rem 2.40rem';
                oReserve.style.backgroundColor = '#7bc300';
                oReserve.style.color = '#fff';

                bOk = true;
            }
        };

        //   订单数据
        function sentPackage(obj) {
            obj.onclick = function () {

                if (this.style.backgroundColor == 'rgb(221, 221, 221)') {
                    return;
                } else {
                    this.style.backgroundColor = '#7bc300';
                }
                var roomNum = document.querySelectorAll('.per_data');
                //联系人信息
                var conInput = document.querySelectorAll('#personal_data .list_inp2');
                var conLasName = conInput[0].value;
                var conFirName = conInput[1].value;
                var conPhone = conInput[2].value;
                var conEmail = conInput[3].value;

                //总价
                var totalPrice = document.querySelector('.all_num i').innerHTML;
                var Parmeters = {
                    "Parameters": {
                        "PackageID": localStorage.packageID,
                        "CheckinDate": jsonPackage.CheckInDate,
                        "CheckoutDate": jsonPackage.CheckOutDate,
                        "HotelID": hotelID,
                        "RoomID": roomID,

                        "ContactDetails": {
                            "Salutation": "Mr",
                            "FirstName": conFirName,
                            "LastName": conLasName,
                            "Email": conEmail,
                            "ContactNo": {
                                "CountryCode": "65",
                                "PhoneNo": conPhone
                            },
                            "MemberID": localStorage.memberid
                        },
                        "ChargeDetails": {
                            "CurrencyCode": "CNY",
                            "TotalPrice": totPrice
                        },
                        "track": {
                            "browserType": "",
                            "deviceID": vlm.getDeviceID()
                        }
                    },

                    //"Method": null,
                    "ForeEndType": 3,
                    "Code": "0204"
                };

                //每个房间
                var roomdet = [];
                for (var i = 0; i < roomNum.length; i++) {
                    //成人
                    var roomdetail = {};
                    roomdetail.Adult = jsonPackage.roomDetails[i].adult;
                    //儿童
                    if (jsonPackage.roomDetails[0].childWithBed) {
                        var arrWithbed = [];
                        for (var k = 0; k < jsonPackage.roomDetails[0].childWithBed.length; k++) {
                            //arrWithbed.push(jsonPackage.roomDetails[0].childWithBed[k]);
                            arrWithbed.push(7);

                        }
                        roomdetail.ChildwithBed = arrWithbed;
                    }
                    if (jsonPackage.roomDetails[0].childWithOutBed) {
                        var arrWithoutbed = [];
                        for (var m = 0; m < jsonPackage.roomDetails[0].childWithOutBed.length; m++) {
                            //arrWithoutbed.push(jsonPackage.roomDetails[0].childWithOutBed[m]);
                            arrWithoutbed.push(7);

                        }
                        roomdetail.ChildwithoutBed = arrWithoutbed;
                    }
                    roomdet.push(roomdetail);
                }
                Parmeters.Parameters.RoomDetails = roomdet;

                //添加景点信息
                var Tour = [];
                for (var i = 0; i < jsonPackage.tours.length; i++) {
                    var tour = {};
                    tour.TourID = jsonPackage.tours[i].tourID;
                    tour.TravelDate = jsonPackage.tours[i].travelDate;
                    tour.TourSession = "None";
                    Tour.push(tour);
                    Parmeters.Parameters.Tours = Tour;
                }

                //添加旅客姓名等信息
                var traveler = [];
                for (var i = 0; i < roomNum.length; i++) {
                    //每个房间的成人信息
                    var oLiAdult = roomNum[i].querySelectorAll('.trave-li-adu');
                    for (var n = 0; n < oLiAdult.length; n++) {
                        var inputAdult = oLiAdult[n].querySelectorAll('.list-adult');
                        var lastNameAdu = inputAdult[0].value;
                        var firstNameAdu = inputAdult[1].value;
                        if (!vlm.Utils.validate.engName(lastNameAdu)) {
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        if (!vlm.Utils.validate.engName(firstNameAdu)) {
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        var tra = {};
                        tra.RoomSeqNo = i + 1;
                        tra.TravelerType = "Adult";
                        tra.Salutation = "Mr";
                        tra.FirstName = firstNameAdu;
                        tra.LastName = lastNameAdu;
                        tra.NationalityCode="CN";
                        traveler.push(tra);
                    }

                    //每个房间的儿童信息
                    var oLiChild = roomNum[i].querySelectorAll('.trave-li-child');
                    for (var m = 0; m < oLiChild.length; m++) {
                        var inputChild = roomNum[i].querySelectorAll('.list-child');
                        var lastNameChi = inputChild[0].value;
                        var firstNameChi = inputChild[1].value;
                        if (!vlm.Utils.validate.engName(lastNameChi)) {
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        if (!vlm.Utils.validate.engName(firstNameChi)) {
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        var tra = {};
                        tra.RoomSeqNo = (m + 1);
                        tra.TravelerType = "Child";
                        tra.Salutation = "None";
                        tra.FirstName = firstNameChi;
                        tra.LastName = lastNameChi;
                        tra.DOB = "2009-2-1";
                        traveler.push(tra);
                    }

                }
                Parmeters.Parameters.Travelers = traveler;
                Parmeters.Parameters.Travelers[0].NationalityCode = $('.countries-wrap .country-btn').attr('data-code');


                //联系人姓名检验
                var inputCon = $('.list_inp_name');
                if (!vlm.Utils.validate.engName(inputCon.eq(0).val())) {
                    jAlert('请您输入英文的联系人姓名');
                    return;
                }
                if (!vlm.Utils.validate.engName(inputCon.eq(1).val())) {
                    jAlert('请您输入英文的联系人姓名');
                    return;
                }
                // 手机号邮箱检验
                var oMobile = $('#list_con_tel')[0].value;
                var oEmail = $('#list_con_email')[0].value;

                if (!vlm.Utils.validate.mobileNo(oMobile)) {
                    jAlert('请输入正确的手机号');
                    return;
                }
                if (!vlm.Utils.validate.email(oEmail)) {
                    jAlert('请输入正确的邮箱');
                    return;
                }
                //接机信息
                var dateObj = JSON.parse(window.localStorage.info);

                var checkInDate = dateObj.CheckInDate;
                var checkOutDate = dateObj.CheckOutDate;
                if ($('#flight-air').css('display') == 'block') {
                    var fli = {};
                    if ($('#content3').css('display') == 'block') {
                        var arrivalFlightNo = document.querySelector('#content3 .input_flight input').value;
                        var arrivalDateTime = document.querySelector('#content3_CheckInDate').value;
                        var dateTime = arrivalDateTime ? arrivalDateTime.split("-") : checkInDate;
                        if (arrivalFlightNo = '') {
                            fli.ArrivalFlightNo = "None";
                        } else {

                            fli.ArrivalFlightNo = arrivalFlightNo;

                            if (dateTime.indexOf("T") > -1) {
                                fli.ArrivalDateTime = dateTime;
                            } else {
                                fli.ArrivalDateTime = arrivalDateTime.replace(" ","T");
                            }

                        }
                    }
                    if ($('#content4').css('display') == 'block') {
                        var departFlightNo = document.querySelector('#content4 .input_flight input').value;
                        var departDateTime = document.querySelector('#content4_CheckInDate').value;
                        var departDate = departDateTime ? departDateTime.split("-") : checkOutDate;
                        if (departFlightNo = '') {
                            fli.ArrivalFlightNo = "None";
                        } else {
                            fli.DepartFlightNo = departFlightNo;
                            if (departDate.indexOf("T") > -1) {
                                fli.DepartDateTime = departDate;
                            } else {
                                fli.DepartDateTime = departDateTime.replace(" ","T");
                            }

                        }
                    }
                    Parmeters.Parameters.FlightDetails = fli;
                }

                console.log(Parmeters);
                setOrderTime();
                vlm.loadJson(vlm.apiWithDeviceID, JSON.stringify(Parmeters), package_back);
            }

            function package_back(ret) {
                var json = ret;
                console.log(json);
                if (json.success) {
                    localStorage.bookingID = json.data.bookingID;
                    localStorage.bookingRefNo = json.data.bookingRefNo;
                    window.location.href = '../payment/payment.html?bookingRefNo=' + json.data.bookingRefNo + "&type=Tour";
                } else {
                    jAlert(json.message);
                }
            }
        };
    }
    init();

    //初始化函数回调
    function package_tit_back(ret) {
        var json = ret;
        if (json.success) {
            //套餐名称
            console.log(json);
            var sceTit = json.data.packageName;
            var sceCpde = json.data.packageRefNo;
            $('.sce-introduce-txt')[0].innerHTML = sceTit + '<span class="sce-introduce-span">(产品编号：' + sceCpde + ')</span>';
            $('.package-tit').html(sceTit);
        } else {
            jAlert(json.message);
        }
    }
    //   获取明细
    var info = JSON.parse(localStorage.info);
    //var hotelID=vlm.getpara("hotelID");
    var tmp = {
        "Parameters": {
            "PackageID": info.packageID,
            "CheckinDate": info.CheckInDate,
            "CheckoutDate": info.CheckOutDate,
            "HotelID": hotelID,
            "RoomDetails": info.roomDetails,
            "Tours": info.tours
        },
        "ForeEndType": 3,
        "Code": "0208"
    };
    vlm.loadJson("", JSON.stringify(tmp), getDetail_back);

    function getDetail_back(ret) {
        var json = ret;
        if (json.success) {
            var data = json.data;
            var weekday = JSON.parse(localStorage.week);
            var noon = JSON.parse(localStorage.noon);
            data = $.extend({
                "weekday": weekday,
                "noon": noon
            }, data);
            console.log(data);
            var n;
            for (var k = 0; k < data.hotels[0].rooms.length; k++) {
                if (data.hotels[0].rooms[k].roomID == roomID) {
                    n = k;
                }
            }
            var tpl1 =
                '<li>费用明细</li>' +
                '<% for(var i=0; i<hotels[0].rooms[' + n + '].prices.length;i++){  if(hotels[0].rooms[' + n + '].prices[i].category=="ADULT"){ %>' +
                '<li>' +
                '<div>成人</div>' +
                '<div>￥<%= hotels[0].rooms[' + n + '].prices[i].amountInCNY %>×<%= hotels[0].rooms[' + n + '].prices[i].quantity %>人</div>' +
                '</li>' +
                '<% } else if(hotels[0].rooms[' + n + '].prices[i].category=="CHILD"){ %>' +
                '<li>' +
                '<div>儿童</div>' +
                '<div>￥<%= hotels[0].rooms[' + n + '].prices[i].amountInCNY %>×<%= hotels[0].rooms[' + n + '].prices[i].quantity %>人</div>' +
                '</li>' +
                '<% } %>' +
                '<% } %>';

            var CheckInDate, CheckOutDate;
            if (info.CheckInDate.substr(9, 1) == 'T') {
                CheckInDate = info.CheckInDate.substr(0, 9);
            } else {
                CheckInDate = info.CheckInDate.substr(0, 10);
            }
            if (info.CheckOutDate.substr(9, 1) == 'T') {
                CheckOutDate = info.CheckOutDate.substr(0, 9);
            } else {
                CheckOutDate = info.CheckOutDate.substr(0, 10);
            }
            var tpl2 =
                '<div class="txt"><%= hotels[0].hotelName %></div>' +
                '<% for(var i=0;i<hotels[0].rooms.length;i++){ if(hotels[0].rooms[i].roomID==' + roomID + '){ %>' +
                '<div class="detail_span">房型 <%= hotels[0].rooms[i].roomName %>&nbsp;' +
                '<% if( hotels[0].rooms[i].includedBreakfast ){ %>' +
                '含早' +
                '<% }else{ %>' +
                '无早' +
                '<% } %>' +
                '&nbsp;' +
                info.roomDetails.length +
                '间</div>' +
                '<% } %>' +
                '<% } %>' +
                '<div class="detail_span">' + CheckInDate + ' 至 ' + CheckOutDate + ' ' + info.nightNum + '晚</div>';

            var tpl3 = $('#tpl3').html();
            var html_fd = ejs.render(tpl1, data);
            var html_dh = ejs.render(tpl2, data);
            var html_dt = ejs.render(tpl3, data);
            //$('.separate_num i').html(data.hotels[0].avgRatePerPaxSeparatelyInCNY);
            $('#fillDetail').html(html_fd);
            $('#hotel_detail').html(html_dh);
            $('#tour_detail').html(html_dt);
            vlm.init();
        } else {
            console.log(json);
            jAlert(json.message, "提示");
        }
    }
    ////上午下午
    //var aNoon=$('.travel-noon a');
    //aNoon.click(function(){
    //    $(this).addClass('on').siblings().removeClass('on');
    //    if(aNoon.attr('class') == 'fa-noon on')
    //    {
    //        localStorage.noon=0;
    //    }
    //    else
    //    {
    //        localStorage.noon=1;
    //    }
    //});
    $('.open-close').click(function () {
        $('#detailBox').toggle();
        $(this).find('b').toggleClass('cur');
        //if($('#detailBox').display == 'none'){
        //    $('#detailBox').show();
        //}else{
        //    $('#detailBox').hide();
        //}
    });

    function setOrderTime() {
        var oDate = new Date();
        var year = oDate.getFullYear();
        var mon = oDate.getMonth() + 1;
        var day = oDate.getDate();
        var h = oDate.getHours();
        var m = oDate.getMinutes();
        var s = oDate.getSeconds();
        localStorage.orderTime = year + '-' + mon + '-' + day + ' ' + h + ':' + m + ':' + s;
    }



})()
