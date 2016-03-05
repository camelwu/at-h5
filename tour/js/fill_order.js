/**
 * Created by qzz on 2016/3/2.
 */

(function(){

    var oReserve=document.querySelector('.reserve');
    //加载动画
    function package_detail(){

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();

    //localStorage.Info
    var jsonPackage=JSON.parse(localStorage.info);
    console.log(jsonPackage);

    //有无航班信息
    localStorage.BookingFormInfo=1;
    if( ! localStorage.BookingFormInfo)
    {
        $('#flight-air').remove();
    }

    function init(){
        var Parmeters=
        {
            "Parameters": {
                "PackageID": localStorage.packageID
            },
            "ForeEndType": 3,
            "Code": "0202"
        }
        //console.log(Parmeters);
        vlm.loadJson("",JSON.stringify(Parmeters),package_tit_back);


        //根据房间数创建房间信息
        var roomNumber=jsonPackage.roomNum;
        for(var i=0;i<roomNumber; i++)
        {
            var oRoom=document.createElement('div');
            oRoom.className='per_data';
            oRoom.innerHTML='<span class="title"><i>房间'+(i+1)+'</i></span>'
                +'<ul></ul>'
            $('#per-room-wrap')[0].appendChild(oRoom);
            var oRoomNum=document.querySelectorAll('.per_data');

            //每个房间成人数
            for(var k=0;k<jsonPackage.eveAdultNum[i];k++)
            {
                var oSection=document.createElement('section');
                oSection.className='li_section_box';
                oSection.innerHTML='<li>'
                    +'<span class="list_tit">成人'+(k+1)+'：</span>'
                    +'<b class="add_icon"><a href="javascript:;" class="add-contact"></a></b></span>'
                    +'</li>'
                    +'<li class="trave-li trave-li-adu">'
                    +'<span class="list_tit2 ">姓：</span>'
                    +'<span class="list_con2"><input class="list_inp2 list-adult" type="text" placeholder="Zhang" /></span>'
                    +'<span class="list_tit2 ">名：</span>'
                    +'<span class="list_con2 name-inp"><input class="list_inp2 list-adult" type="text" placeholder="Xiaohua" /></span>'
                    +'</li>'
                    +'<li>'
                    +'<span class="list_tit">护照：</span>'
                    +' <span class="list_con"><input class="list_inp" type="text" placeholder="2088833" /></span>'
                    +'</li>';
                oRoomNum[i].querySelector('ul').appendChild(oSection);

            }

            //每个房间儿童数
            for(var j=0;j<jsonPackage.eveChildNum[i]; j++)
            {
                var oSection=document.createElement('section');
                oSection.className='li_section_box';
                oSection.innerHTML='<li>'
                    +'<span class="list_tit">儿童'+(j+1)+'：</span>'
                    +'<b class="add_icon"><a href="javascript:;" class="add-contact"></a></b></span>'
                    +'</li>'
                    +'<li class="trave-li trave-li-child">'
                    +'<span class="list_tit2 ">姓：</span>'
                    +'<span class="list_con2"><input class="list_inp2 list-child" type="text" placeholder="Zhang" /></span>'
                    +'<span class="list_tit2 ">名：</span>'
                    +'<span class="list_con2"><input class="list_inp2 list-child" type="text" placeholder="Xiaohua" /></span>'
                    +'</li>'
                    +'</section>';
                oRoomNum[i].querySelector('ul').appendChild(oSection);
            }

        }


        //添加联系人
        $('.add-contact').click(function(){
            vlm.f_choice('t','contact','',false,false);
        });


        //同意条款
        var oAgree=document.querySelector('.order-notice-btn');
        var bOk=true;
        oAgree.onclick=function(){
            if(bOk){
                oAgree.style.background='url(../images/ui/icons1.png) -23.7rem -0.4rem';
                oAgree.style.backgroundSize='40rem 12rem';
                oReserve.style.backgroundColor='#fdb330';
                oReserve.style.color='#fff';
                sentPackage(oReserve);
                bOk=false;
            }else{
                oAgree.style.background='url(../images/ui/icons1.png) -26.6rem -0.4rem';
                oAgree.style.backgroundSize='40rem 12rem';
                document.querySelector('.reserve').style.backgroundColor='#ddd';
                oReserve.href='javascript:;';
                bOk=true;
            }
        };

        //   订单数据
        function sentPackage(obj){
            obj.onclick=function(){
                this.style.backgroundColor='#ff9313';
                var roomNum=document.querySelectorAll('.per_data');
                //联系人信息
                var conInput=document.querySelectorAll('#personal_data .list_inp2');
                var conLasName=conInput[0].value;
                var conFirName=conInput[1].value;
                var conPhone=conInput[2].value;
                var conEmail=conInput[3].value;

                //总价
                var totalPrice=document.querySelector('.all_num i').innerHTML;

                var Parmeters={
                    "Parameters": {
                        "PackageID": localStorage.packageID,
                        "CheckinDate": jsonPackage.checkInDate+'T00:00:00',
                        "CheckoutDate": jsonPackage.checkOutDate+'T00:00:00',
                        "HotelID": "30",
                        "RoomID": "77501",
                        "RoomDetails": [
                            {
                                "Adult": (jsonPackage.adultNum+jsonPackage.childNum)
                            }
                        ],

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
                            "TotalPrice": totalPrice
                        }
                    },

                    "Method": null,
                    "ForeEndType": 3,
                    "Code": "0204"
                };

                //添加景点信息
                var Tour=[];
                for(var i=0;i<jsonPackage.tourList.length; i++)
                {
                    var tour={};
                    tour.TourID=jsonPackage.tourList[i].tourId;
                    tour.TravelDate=jsonPackage.tourList[i].tourDate;
                    tour.TourSession="None";
                    Tour.push(tour);
                    Parmeters.Parameters.Tours=Tour;
                }

                //添加旅客姓名等信息

                for(var i=0;i<roomNum.length; i++)
                {
                    var traveler=[];

                    //每个房间的成人信息
                    var oLiAdult=roomNum[i].querySelectorAll('.trave-li-adu');
                    for(var n=0;n<oLiAdult.length;n++)
                    {
                        var inputAdult=oLiAdult[n].querySelectorAll('.list-adult');
                        var lastNameAdu=inputAdult[0].value;
                        var firstNameAdu=inputAdult[1].value;
                        //if(! vlm.Utils.validate.mobileNo(oMobile))
                        if(lastNameAdu == '')
                        {
                            jAlert('请输入名');
                            return;
                        }
                        if(firstNameAdu == '')
                        {
                            jAlert('请输入姓');
                            return;
                        }
                        var tra={};
                        tra.RoomSeqNo=i+1;
                        tra.TravelerType="Adult";
                        tra.Salutation="Mr";
                        tra.FirstName=firstNameAdu;
                        tra.LastName=lastNameAdu;
                        tra.NationalityCode="SG";
                        traveler.push(tra);
                    }

                    //每个房间的儿童信息
                    var oLiChild=roomNum[i].querySelectorAll('.trave-li-child');
                    for(var m=0;m<oLiChild,length;m++) {
                        var inputChild = roomNum[i].querySelectorAll('.list-child');
                        var lastNameChi = inputChild[0].value;
                        var firstNameChi = inputChild[1].value;
                        //if(! vlm.Utils.validate.mobileNo(oMobile))
                        if(lastNameChi == '')
                        {
                            jAlert('请输入名');
                            return;
                        }
                        if(firstNameChi == '')
                        {
                            jAlert('请输入姓');
                            return;
                        }
                        var tra = {};
                        tra.RoomSeqNo = (m + 1);
                        tra.TravelerType = "Child";
                        tra.Salutation = "None";
                        tra.FirstName = firstNameChi;
                        tra.LastName = lastNameChi;
                        tra.NationalityCode = "SG";
                        traveler.push(tra);
                    }

                }
                Parmeters.Parameters.Travelers=traveler;

                // 手机号邮箱检验
                var oMobile = $('#list_con_tel')[0].value;
                var oEmail = $('#list_con_email')[0].value;

                if ( ! vlm.Utils.validate.mobileNo(oMobile) )
                {
                    jAlert('请输入正确的手机号');
                    return;
                }
                if ( ! vlm.Utils.validate.email(oEmail) )
                {
                    jAlert('请输入正确的邮箱');
                    return;
                }
                //接机信息
                if($('#flight-air')[0]){
                    var departFlightNo=document.querySelector('#content3 .input_flight input').value;
                    var departDateTime=document.querySelector('#content3_CheckInDate').value;
                    var arrivalFlightNo=document.querySelector('#content4 .input_flight input').value;
                    var arrivalDateTime=document.querySelector('#content4_CheckInDate').value;

                    var fli={};
                    fli.ArrivalFlightNo=arrivalFlightNo;
                    fli.ArrivalDateTime=arrivalDateTime+'T00:00:00';
                    fli.DepartFlightNo=departFlightNo;
                    fli.DepartDateTime=departDateTime+'T00:00:00';
                    Parmeters.Parameters.FlightDetails=fli;
                }
                //console.log(Parmeters);
                vlm.loadJson("",JSON.stringify(Parmeters),package_back);
            }

            function package_back(ret){
                var json = eval('('+ret+')');
                console.log(json);
                if(json.success) {
                    localStorage.bookingID=json.data.bookingID;
                    localStorage.bookingRefNo=json.data.bookingRefNo;
                    window.location.href='order_pay_page.html';
                }else{
                    jAlert(json.message);
                }
            }
        };
    }
    init();

    //初始化函数回调
    function package_tit_back(ret){
        var json = eval('('+ret+')');
        //console.log(json);
        if(json.success) {
            //套餐名称
            var sceTit=json.data.packageName;
            var sceCpde=json.data.packageRefNo;
            $('.sce-introduce-txt')[0].innerHTML=sceTit+'<span class="sce-introduce-span">'+sceCpde+'</span>';
            $('.package-tit').html(sceTit);
        }else{
            jAlert(json.message);
        }
    }


})()