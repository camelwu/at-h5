/**
 * Created by qzz on 2016/3/2.
 */

(function(){

    var oReserve=document.querySelector('.reserve');
    var hotelID='',perPrice=0,totPrice=0,roomID='';
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

        var travelersInput=window.location.search.substring(1).split('&')[5].split('=')[1];
        //根据房间数创建房间信息
        var roomNumber=jsonPackage.roomDetails.length;
        for(var i=0;i<roomNumber; i++)
        {
            var oRoom=document.createElement('div');
            oRoom.className='per_data';
            oRoom.innerHTML='<span class="title"><i>房间'+(i+1)+'</i></span>'
                +'<ul></ul>'
            $('#per-room-wrap')[0].appendChild(oRoom);
            var oRoomNum=document.querySelectorAll('.per_data');

            //每个房间成人数
            var tAdult=parseInt(jsonPackage.roomDetails[i].adult);
            for(var k=0;k<tAdult;k++)
            {
                var oSection=document.createElement('section');
                oSection.className='li_section_box';
                if(travelersInput == 0)
                {
                    oSection.innerHTML='<li>'
                        +'<span class="list_tit">成人'+(k+1)+'：</span>'
                        +'<b class="add_icon"><a href="javascript:;" class="add-passager" ></a></b></span>'
                        +'</li>'
                        +"<ul id='trave"+k+"'>"
                        +'<li class="trave-li trave-li-adu">'
                        +'<span class="list_tit2 ">姓：</span>'
                        +'<span class="list_con2"><input class="list_inp2 list-adult" type="text" placeholder="Zhang" data-elementName="firstName" /></span>'
                        +'<span class="list_tit2 ">名：</span>'
                        +'<span class="list_con2 name-inp"><input class="list_inp2 list-adult" type="text" placeholder="Xiaohua" data-elementName="lastName" /></span>'
                        +'</li>'
                        +"</ul>"
                }
                else
                {
                    oSection.innerHTML='<li>'
                        +'<span class="list_tit">成人'+(k+1)+'：</span>'
                        +'<b class="add_icon"><a href="javascript:;" class="add-passager" ></a></b></span>'
                        +'</li>'
                        +"<ul id='trave"+k+"'>"
                        +'<li class="trave-li trave-li-adu">'
                        +'<span class="list_tit2 ">姓：</span>'
                        +'<span class="list_con2"><input class="list_inp2 list-adult" type="text" placeholder="Zhang" data-elementName="firstName" /></span>'
                        +'<span class="list_tit2 ">名：</span>'
                        +'<span class="list_con2 name-inp"><input class="list_inp2 list-adult" type="text" placeholder="Xiaohua" data-elementName="lastName" /></span>'
                        +'</li>'
                        +'<li>'
                        +'<span class="list_tit">护照：</span>'
                        +' <span class="list_con"><input class="list_inp" type="text" placeholder="2088833" data-elementName="idNumber" /></span>'
                        +'</li>';
                    +"</ul>"
                }

                oRoomNum[i].querySelector('ul').appendChild(oSection);

            }

            //每个房间儿童数
            var totChiNUm= 0,t1= 0,t2=0;
            if(jsonPackage.roomDetails[i].childWithOutBed){
                t1=parseInt(jsonPackage.roomDetails[i].childWithOutBed.length);
            }
            if(jsonPackage.roomDetails[i].childWithBed){
                t2=parseInt(jsonPackage.roomDetails[i].childWithBed.length);
            }

            totChiNUm=t1+t2;
            for(var j=0;j<totChiNUm; j++)
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

        //处理地址栏信息
        function urlShow(){
            if(window.location.search){
                var winhref=window.location.search.substring(1);
                var arr2=winhref.split('&');
                //hotel
                hotelID=arr2[0].split('=')[1];
                //航班信息
                var airFli=arr2[2].split('=')[1];
                var dateObj = JSON.parse(window.localStorage.info);
                var paraObj = {
                    start:dateObj.CheckInDate.replace(/T.*/,''),
                    end:dateObj.CheckInDate.replace(/T.*/,'')
                };
                switch (airFli){
                    case 'None':
                        $('#flight-air').remove();
                        break;
                    case 'TwoWay':
                        document.querySelector('#content3_CheckInDate').value=paraObj.start;
                        document.querySelector('#content4_CheckInDate').value=paraObj.end;
                        var myDate= new TicketDate({
                            id: 'nav2-center-dep',
                            num: 13,
                            time: paraObj,
                            sClass1: 'CheckInDate',
                            type:'Oneway',
                            _word:{tip:['出发']}
                        });
                        var myDate2= new TicketDate({
                            id: 'nav2-center-arr',
                            num: 13,
                            time: paraObj,
                            sClass1: 'CheckInDate',
                            type:'Oneway',
                            _word:{tip:['出发']}
                        });
                        break;
                    case 'Arrival':
                        $('#content3').remove();
                        document.querySelector('#content3_CheckInDate').value=paraObj.start;
                        var myDate= new TicketDate({
                            id: 'nav2-center-dep',
                            num: 13,
                            time: paraObj,
                            sClass1: 'CheckInDate',
                            type:'Oneway',
                            _word:{tip:['出发']}
                        });
                        break;
                    case 'Depart':
                        $('#content4').remove();
                        break;
                    default:;
                }
                //订单总价
                perPrice=arr2[3].split('=')[1];
                //totPrice=perPrice*(tAdult+totChiNUm);
                totPrice=perPrice;
                $('.all_num i').html(totPrice);
                //roomID
                roomID=arr2[4].split('=')[1];
            }
        }
        urlShow();

        $('.add-passager').each(function(index,element){
            $(this).click(function(){
                vlm.f_choice('trave'+index,"ht",'traver','',false,false,null,null,null,null);
            })
        });
        $('.add-contact').click(function(){
                vlm.f_choice('contact',"ht",'contact','',false,false,null,null,null,null);
        });

        sentPackage(oReserve);
        //同意条款
        var oAgree=document.querySelector('.order-notice-btn');
        var bOk=true;
        oAgree.onclick=function(){
            if(bOk){
                oAgree.style.background='url(../images/ui/icons1.png) -26.6rem -0.4rem';
                oAgree.style.backgroundSize='40rem 12rem';
                oReserve.style.backgroundColor='#ddd';
                sentPackage(oReserve);
                bOk=false;
            }else{
                oAgree.style.background='url(../images/ui/icons1.png) -23.7rem -0.4rem';
                oAgree.style.backgroundSize='40rem 12rem';
                oReserve.style.backgroundColor='#fdb330';
                oReserve.style.color='#fff';

                bOk=true;
            }
        };

        //   订单数据
        function sentPackage(obj){
            obj.onclick=function(){

                if(this.style.backgroundColor == 'rgb(221, 221, 221)'){
                    return;
                }
                else
                {
                    this.style.backgroundColor='#ff9313';
                }
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
                        }
                    },

                    "Method": null,
                    "ForeEndType": 3,
                    "Code": "0204"
                };

                //每个房间
                var roomdet=[];
                for(var i=0;i<roomNum.length;i++)
                {
                    //成人
                    var roomdetail={};
                    roomdetail.Adult=jsonPackage.roomDetails[i].adult;
                    //儿童
                    if(jsonPackage.roomDetails[0].childWithBed){
                        var arrWithbed=[];
                        for(var k=0;k<jsonPackage.roomDetails[0].childWithBed.length;k++)
                        {
                            //arrWithbed.push(jsonPackage.roomDetails[0].childWithBed[k]);
                            arrWithbed.push(7);

                        }
                        roomdetail.ChildwithBed=arrWithbed;
                    }
                    if(jsonPackage.roomDetails[0].childWithOutBed){
                        var arrWithoutbed=[];
                        for(var m=0;m<jsonPackage.roomDetails[0].childWithOutBed.length;m++)
                        {
                            //arrWithoutbed.push(jsonPackage.roomDetails[0].childWithOutBed[m]);
                            arrWithoutbed.push(7);

                        }
                        roomdetail.ChildwithoutBed=arrWithoutbed;
                    }
                    roomdet.push(roomdetail);
                }
                Parmeters.Parameters.RoomDetails=roomdet;

                //添加景点信息
                var Tour=[];
                for(var i=0;i<jsonPackage.tours.length; i++)
                {
                    var tour={};
                    tour.TourID=jsonPackage.tours[i].tourID;
                    tour.TravelDate=jsonPackage.tours[i].travelDate;
                    tour.TourSession="None";
                    Tour.push(tour);
                    Parmeters.Parameters.Tours=Tour;
                }

                //添加旅客姓名等信息
                var traveler=[];
                for(var i=0;i<roomNum.length; i++)
                {
                    //每个房间的成人信息
                    var oLiAdult=roomNum[i].querySelectorAll('.trave-li-adu');
                    for(var n=0;n<oLiAdult.length;n++)
                    {
                        var inputAdult=oLiAdult[n].querySelectorAll('.list-adult');
                        var lastNameAdu=inputAdult[0].value;
                        var firstNameAdu=inputAdult[1].value;
                        if(! vlm.Utils.validate.engName(lastNameAdu)){
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        if(! vlm.Utils.validate.engName(firstNameAdu)){
                            jAlert('请您输入英文的旅行人姓名');
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
                    for(var m=0;m<oLiChild.length;m++) {
                        var inputChild = roomNum[i].querySelectorAll('.list-child');
                        var lastNameChi = inputChild[0].value;
                        var firstNameChi = inputChild[1].value;
                        if(! vlm.Utils.validate.engName(lastNameChi)){
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        if(! vlm.Utils.validate.engName(firstNameChi)){
                            jAlert('请您输入英文的旅行人姓名');
                            return;
                        }
                        var tra = {};
                        tra.RoomSeqNo = (m + 1);
                        tra.TravelerType = "Child";
                        tra.Salutation = "None";
                        tra.FirstName = firstNameChi;
                        tra.LastName = lastNameChi;
                        tra.DOB ="2009-2-1";
                        tra.NationalityCode = "SG";
                        traveler.push(tra);
                    }

                }
                Parmeters.Parameters.Travelers=traveler;


                //联系人姓名检验
                var inputCon=$('.list_inp_name');
                if(! vlm.Utils.validate.engName(inputCon.eq(0).val())){
                    jAlert('请您输入英文的联系人姓名');
                    return;
                }
                if(! vlm.Utils.validate.engName(inputCon.eq(1).val())){
                    jAlert('请您输入英文的联系人姓名');
                    return;
                }
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
                if($('#flight-air').css('display') == 'block'){
                    var fli={};
                    if($('#content3').css('display') == 'block')
                    {
                        var departFlightNo=document.querySelector('#content3 .input_flight input').value;
                        var departDateTime=document.querySelector('#content3_CheckInDate').value;
                        fli.DepartFlightNo=departFlightNo;
                        fli.DepartDateTime=departDateTime+'T00:00:00';
                    }
                    if($('#content4').css('display') == 'block')
                    {

                        var arrivalFlightNo=document.querySelector('#content4 .input_flight input').value;
                        var arrivalDateTime=document.querySelector('#content4_CheckInDate').value;
                        fli.ArrivalFlightNo=arrivalFlightNo;
                        fli.ArrivalDateTime=arrivalDateTime+'T00:00:00';
                    }


                    Parmeters.Parameters.FlightDetails=fli;
                }

                console.log(Parmeters);
                setOrderTime();
                vlm.loadJson("",JSON.stringify(Parmeters),package_back);
            }

            function package_back(ret){
                var json = ret;
                console.log(json);
                if(json.success) {
                    localStorage.bookingID=json.data.bookingID;
                    localStorage.bookingRefNo=json.data.bookingRefNo;
                    window.location.href='order_pay_page.html?bookingRefNo='+json.data.bookingRefNo;
                }else{
                    jAlert(json.message);
                }
            }
        };
    }
    init();

    //初始化函数回调
    function package_tit_back(ret){
        var json = ret;
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
    //   获取明细
    var info = JSON.parse(localStorage.info);
    //var hotelID=vlm.getpara("hotelID");
    var tmp = {
        "Parameters": {
            "PackageID": info.packageID,
            "CheckinDate": info.CheckInDate,
            "CheckoutDate": info.CheckOutDate,
            "HotelID": hotelID,
            "RoomDetails":info.roomDetails,
            "Tours": info.tours
        },
        "ForeEndType": 3,
        "Code": "0208"
    };
    vlm.loadJson("", JSON.stringify(tmp), getDetail_back);
    function getDetail_back(ret){
        var json = ret;
        if(json.success) {
            var data = json.data;
            var n;
            for(var k = 0;k < data.hotels[0].rooms.length;k++){
                if(data.hotels[0].rooms[k].roomID == roomID){
                    n = k;
                }
            }
            var tpl = [
                '<li>费用明细</li>',
                '{% for(var i=0; i<hotels[0].rooms['+n+'].prices.length;i++){  if(hotels[0].rooms['+n+'].prices[i].category=="ADULT"){ %}',
                '<li>',
                '<div>成人</div>',
                '<div>￥{%=hotels[0].rooms['+n+'].prices[i].amountInCNY%}×{%=hotels[0].rooms['+n+'].prices[i].quantity%}人</div>',
                '</li>',
                '{% } else if(hotels[0].rooms['+n+'].prices[i].category=="CHILD"){ %}',
                '<li>',
                '<div>儿童</div>',
                '<div>￥{%=hotels[0].rooms['+n+'].prices[i].amountInCNY%}×{%=hotels[0].rooms['+n+'].prices[i].quantity%}人</div>',
                '</li>',
                '{% } %}',
                '{% } %}'
            ].join('');
            var html_fd = template(tpl,data);
            //$('.separate_num i').html(data.hotels[0].avgRatePerPaxSeparatelyInCNY);
            $('#fillDetail').html(html_fd);
            vlm.init();
        }else{
            console.log(json);
            jAlert(json.message,"提示");
        }
    }


    //上午下午
    var aNoon=$('.travel-noon a');
    aNoon.click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        if(aNoon.attr('class') == 'fa-noon on')
        {
            localStorage.noon=0;
        }
        else
        {
            localStorage.noon=1;
        }
    });


    function setOrderTime(){
        var oDate=new Date();
        var year=oDate.getFullYear();
        var mon=oDate.getMonth()+1;
        var day=oDate.getDate();
        var h=oDate.getHours();
        var m=oDate.getMinutes();
        var s=oDate.getSeconds();
        localStorage.orderTime=year+'-'+mon+'-'+day+' '+h+':'+m+':'+s;
    }
})()