/**
 * Created by qzz on 2016/3/2.
 */

(function(){

    var oReserve=document.querySelector('.reserve');
    //���ض���
    function package_detail(){

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();

    //���޺�����Ϣ
    if( ! localStorage.BookingFormInfo)
    {
        $('#flight-air').remove();
    }

    //�ײ�����
    var sceTit='�˴��볤��һ���Ρ�����12-23��-12��30��ʹ�á�';
    var sceCpde='����Ʒ��� PK348758945��';
    $('.sce-introduce-txt')[0].innerHTML=sceTit+'<span class="sce-introduce-span">'+sceCpde+'</span>';


    //���ݷ���������������Ϣ
    var roomNumber=localStorage.roomNumber=2;
    for(var i=0;i<roomNumber; i++)
    {
        var oRoom=document.createElement('div');
        oRoom.className='per_data';
        oRoom.innerHTML='<span class="title"><i>����'+(i+1)+'</i></span>'
            +'<ul>'
            +'<section class="li_section_box">'
            +'<li>'
            +'<span class="list_tit">����1��</span>'
            +'<b class="add_icon"><a href="javascript:;" class="add-contact"></a></b></span>'
            +'</li>'
            +'<li class="trave-li">'
            +'<span class="list_tit2">�գ�</span>'
            +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Zhang" /></span>'
            +'<span class="list_tit2">����</span>'
            +'<span class="list_con2 name-inp"><input class="list_inp2" type="text" placeholder="Xiaohua" /></span>'
            +'</li>'
            +'<li>'
            +'<span class="list_tit">���գ�</span>'
            +' <span class="list_con"><input class="list_inp" type="text" placeholder="2088833" /></span>'
            +'</li>'
            +'</section>'
            +'<section class="li_section_box">'
            +'<li>'
            +'<span class="list_tit">��ͯ1��</span>'
            +'<b class="add_icon"><a href="javascript:;" class="add-contact"></a></b></span>'
            +'</li>'
            +'<li class="trave-li">'
            +'<span class="list_tit2">�գ�</span>'
            +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Zhang" /></span>'
            +'<span class="list_tit2">����</span>'
            +'<span class="list_con2"><input class="list_inp2" type="text" placeholder="Xiaohua" /></span>'
            +'</li>'
            +'</section>'
            +'</ul>'
        $('#per-room-wrap')[0].appendChild(oRoom);
    }

    $('.add-contact').click(function(){
        vlm.f_choice('t','contact','',false,false);
    });


    //ͬ������
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

    //   ��������
    function sentPackage(obj){
        obj.onclick=function(){
            this.style.backgroundColor='#ff9313';
            var roomNum=document.querySelectorAll('.per_data');
            for(var i=0;i<roomNum.length; i++)
            {
                var inputAdult=roomNum[i].querySelectorAll('.list_con2 input');
                var lastNameAdu=inputAdult[0].value;
                var firstNameAdu=inputAdult[1].value;
                var passport=roomNum[i].querySelectorAll('.list_con input').value;
                var lastNameChi=inputAdult[2].value;
                var firstNameChi=inputAdult[3].value;
            }

            //��ϵ����Ϣ
            var conInput=document.querySelectorAll('#personal_data .list_inp2');
            var conLasName=conInput[0].value;
            var conFirName=conInput[1].value;
            var conPhone=conInput[2].value;
            var conEmail=conInput[3].value;

            //������Ϣ
            if($('#flight-air')[0]){
                var departNum=document.querySelector('#content3 .input_flight input').value;
                var departTime=document.querySelector('#content3_CheckInDate').value;
                var arriveNum=document.querySelector('#content4 .input_flight input').value;
                var arriveTime=document.querySelector('#content4_CheckInDate').value;
            }

            //����ϵ����Ϣ
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

            var Parmeters={

                "Parameters": {
                    "PackageID": "159",
                    "CheckinDate": "2016-03-05T00:00:00",
                    "CheckoutDate": "2016-03-08T00:00:00",
                    "HotelID": "30",
                    "RoomID": "77501",
                    "RoomDetails": [
                        {
                            "Adult": "2"
                        }
                    ],
                    "Tours": [
                        {
                            "TourID": "137",
                            "TravelDate": "2016-03-06T00:00:00",
                            "TourSession": "None"
                        },
                        {
                            "TourID": "166",
                            "TravelDate": "2016-03-06T00:00:00",
                            "TourSession": "None"
                        }
                    ],
                    "FlightDetails": {
                        "ArrivalFlightNo": "JT678",
                        "ArrivalDateTime": "2016-02-02T00:00:00",
                        "DepartFlightNo": "JT878",
                        "DepartDateTime": "2016-02-05T00:00:00"
                    },

//                            "FlightDetails": {
//                                "ArrivalFlightNo": ""+arriveNum+"",
//                                "ArrivalDateTime": ""+arriveTime+"",
//                                "DepartFlightNo": ""+departNum+"",
//                                "DepartDateTime": ""+departTime+""
//                            },
                    "Travelers": [
                        {
                            "RoomSeqNo": "1",
                            "TravelerType": "Adult",
                            "Salutation": "Mr",
                            "FirstName": "Kim",
                            "LastName": "Pin",
                            "NationalityCode": "SG"
                        },
                        {
                            "RoomSeqNo": "1",
                            "TravelerType": "Adult",
                            "Salutation": "Mr",
                            "FirstName": "Han",
                            "LastName": "Pin"
                        }
                    ],
                    "ContactDetails": {
                        "Salutation": "Mr",
                        "FirstName": "Kim",
                        "LastName": "Pin",
                        "Email": "test@asiatravel.com",
                        "ContactNo": {
                            "CountryCode": "65",
                            "PhoneNo": "7678767"
                        },
                        "MemberID": "6789"
                    },
                    "ChargeDetails": {
                        "CurrencyCode": "CNY",
                        "TotalPrice": "3634.00"
                    }
                },
                "Method": null,
                "ForeEndType": 3,
                "Code": "0204"
            };

            console.log(Parmeters);
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