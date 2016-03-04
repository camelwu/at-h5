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

    //套餐名称
    var sceTit='八达岭长城一日游【仅限12-23日-12月30日使用】';
    var sceCpde='（产品编号 PK348758945）';
    $('.sce-introduce-txt')[0].innerHTML=sceTit+'<span class="sce-introduce-span">'+sceCpde+'</span>';


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
            +'<li class="trave-li">'
            +'<span class="list_tit2">姓：</span>'
            +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Zhang" /></span>'
            +'<span class="list_tit2">名：</span>'
            +'<span class="list_con2 name-inp"><input class="list_inp2" type="text" placeholder="Xiaohua" /></span>'
            +'</li>'
            +'<li>'
            +'<span class="list_tit">护照：</span>'
            +' <span class="list_con"><input class="list_inp" type="text" placeholder="2088833" /></span>'
            +'</li>';
            oRoomNum[i].querySelector('ul').appendChild(oSection);

        }


        for(var j=0;j<jsonPackage.eveChildNum[i]; j++)
        {
            var oSection=document.createElement('section');
            oSection.className='li_section_box';
            oSection.innerHTML='<li>'
                +'<span class="list_tit">儿童'+(j+1)+'：</span>'
                +'<b class="add_icon"><a href="javascript:;" class="add-contact"></a></b></span>'
                +'</li>'
                +'<li class="trave-li">'
                +'<span class="list_tit2">姓：</span>'
                +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Zhang" /></span>'
                +'<span class="list_tit2">名：</span>'
                +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Xiaohua" /></span>'
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

            //存联系人信息
            function setContact(){
                var oLast=$('#list-lastname').val();
                var oFir=$('#list-firstname').val();
                var oConTel=$('#list_con_tel').val();
                var oConEmail=$('#list_con_email').val();
                localStorage.contactName=oLast+'/'+oFir;
                localStorage.contactTel=oConTel;
                localStorage.contactEmail=oConEmail;
            };
            setContact();

            //航班信息
            if($('#flight-air')[0]){
                var departFlightNo=document.querySelector('#content3 .input_flight input').value;
                var departDateTime=document.querySelector('#content3_CheckInDate').value;
                var arrivalFlightNo=document.querySelector('#content4 .input_flight input').value;
                var arrivalDateTime=document.querySelector('#content4_CheckInDate').value;
            }
            //总价
            var totalSale=document.querySelector('.all_num i').innerHTML;

            var Parmeters={
                "Parameters": {
                    "PackageID": ""+localStorage.packageID+"",
                    "CheckinDate": ""+jsonPackage.checkInDate+"",
                    "CheckoutDate": ""+jsonPackage.checkOutDate+"",
                    "HotelID": "30",
                    "RoomID": "77501",
                    "RoomDetails": [
                        {
                            "Adult": ""+jsonPackage.adultNum+""
                        }
                    ],

                    "ContactDetails": {
                        "Salutation": "Mr",
                        "FirstName": ""+conFirName+"",
                        "LastName": ""+conLasName+"",
                        "Email": ""+conEmail+"",
                        "ContactNo": {
                            "CountryCode": "65",
                            "PhoneNo": ""+conPhone+""
                        },
                        "MemberID": "6789"
                    },
                    "ChargeDetails": {
                        "CurrencyCode": "CNY",
                        "TotalPrice": ""+totalSale+""
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
                tour.TourID=jsonPackage.tourList[0].tourId;
                tour.TravelDate=jsonPackage.tourList[0].tourDate;
                tour.TourSession="None";
                Tour.push(tour);
                Parmeters.Parameters.Tours=Tour;
            }

            //创建房间及添加旅客姓名等信息
            var traveler=[];
            for(var i=0;i<roomNum.length; i++)
            {
                var inputAdult=roomNum[i].querySelectorAll('.list_con2 input');
                var lastNameAdu=inputAdult[0].value;
                var firstNameAdu=inputAdult[1].value;
                var passport=roomNum[i].querySelectorAll('.list_con input').value;
                var lastNameChi=inputAdult[2].value;
                var firstNameChi=inputAdult[3].value;

                var tra={};
                tra.RoomSeqNo=""+(i+1)+"";
                tra.TravelerType="Adult";
                tra.Salutation="Mr";
                tra.FirstName=firstNameAdu;
                tra.LastName=lastNameAdu;
                tra.NationalityCode="Mr";
                traveler.push(tra);
                Parmeters.Parameters.Travelers=traveler;
            }

            //接机信息
            if($('#flight-air')[0]){
                var flight=[];
                var fli={};
                fli.ArrivalFlightNo=arrivalFlightNo;
                fli.ArrivalDateTime=arrivalDateTime;
                fli.DepartFlightNo=departFlightNo;
                fli.DepartDateTime=departDateTime;
                flight.push(fli);
                Parmeters.Parameters.FlightDetails=flight;
            }

            console.log(Parmeters.Parameters.FlightDetails);
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

})()