(function () {

    //加载动画
    function package_detail() {

        $(window).load(function () {
            $("#status").fadeOut();
            $("#preloader").delay(400).fadeOut("medium");
        });
    };
    package_detail();
    //初始化
    var datafli=JSON.parse(sessionStorage.flightHotelAllData).data;
    //console.log(datafli);
    var datahot=JSON.parse(localStorage.createOrderParaPart).data;
    console.log(datahot);
    function init() {
        //机票详情
        var flightdet=template('order-flight',datafli);
        $('.order-plane').html(flightdet);

        //酒店详情
        var hoteldet=template('order-hot',datahot);
        $('.order-hotel').html(hoteldet);

        //总价
        var totamountnum='￥'+datahot.priceDetail.totalAmount;
        $('.card1').html(totamountnum);
        //明细块
        var totamount=template('totamount-det',datahot);
        $('.hf_detail_fare').html(totamount);


        //出行人明细
        function travelDet(){
            var traAdu={};
            var traChi={};
            var room=datahot.RoomDetails;
            var traAdultnum=0;
            var traChildnum=0;
            for(var i=0;i<room.length; i++)
            {
                traAdultnum+=parseInt(room[i].adult);
                if(room[i].childWithOutBed)
                {

                    traChildnum+=room[i].childWithOutBed.length;
                }
                if(room[i].childWithBed)
                {
                  traChildnum+=room[i].childWithBed.length;

                }

            }
            if(traChildnum == 0){
                $('.order-tsl2 b').remove();
            }
            $('.chi-tot').html(traChildnum);
            $('.adu-tot').html(traAdultnum);
            var obj={};
            obj.adunum=traAdultnum;
            obj.chinum=traChildnum;
            return obj;
        }
        travelDet();
        var peotot=travelDet();
        window.localStorage.peotot=(peotot.adunum+peotot.chinum);
        window.localStorage.adunum=peotot.adunum;
        window.localStorage.chinum=peotot.chinum;


        //明细遮罩
        $('.hf_det_mask').on('click',function(){
            $('.hf_det_mask').hide();
            $('.detail-fale').removeClass('open');
            $('.hf_detail_fare').css('bottom','-80px');
        })

        /*添加出行人*/
        $(document).on('click','.order-tsl3',function(){
                $("#status").show().fadeOut();
                $("#preloader").show().delay(400).fadeOut("medium");
                vlm.f_choice('order-twrap', 'f', 'traver', '', true, true, peotot.adunum, peotot.chinum, null, datafli.flightInfo.flightLeaveStartDate);
        });


        //添加联系人
        $(document).on('click','.hf_add_contact',function(){
            $("#status").show().fadeOut();
            $("#preloader").show().delay(400).fadeOut("medium");
            vlm.f_choice('hf-add-msg', "f", 'contact', '', false, false, null, null, null, null);
        });


        //明细showhide
        $('.order-detail').click(function(){
            if($('.hf_detail_fare').css('bottom') == '-80px')
            {
                $('.hf_det_mask').show();
                $('.detail-fale').addClass('open');
                $('.hf_detail_fare').css('bottom','47px');
            }else{
                $('.hf_det_mask').hide();
                $('.detail-fale').removeClass('open');
                $('.hf_detail_fare').css('bottom','-80px');
            }
        });

    }
    init();

    //与第一出行人相同图标

        function firstsame(){
            var bFlag=true;
            $('.con-alike').click(function(){
            if( ! localStorage.travellerInfo_selected ){
                return;
            }else{
                var traInfo_sel = JSON.parse(localStorage.travellerInfo_selected);
                if (bFlag) {
                  $(this).css('backgroundPosition', '-3px -52px');
                  $('.hf_con_lastname').val(traInfo_sel[0].LastName);
                  $('.hf_con_firstname').val(traInfo_sel[0].FirstName);
                  $('.hf_con_cell').val(JSON.parse(localStorage.travellerInfo_selected)[0].mobile);
                  $('.hf_con_email').val(JSON.parse(localStorage.travellerInfo_selected)[0].email);
                  bFlag = false;
                }else{
                  $(this).css('backgroundPosition', '-37px -52px');
                  $('.hf_con_lastname').val('');
                  $('.hf_con_firstname').val('');
                  $('.hf_con_cell').val('');
                  $('.hf_con_email').val('');
                  bFlag = true;
                }
              }
            });
        }
        firstsame();




    //下单
    var orderSub=document.querySelector('.order-submit');
    function hf_order(obj){
        obj.onclick=function(){

            var Parmeters = {
                "Parameters": {
                    "SetID": datahot.SetID,
                    "CacheID": datahot.CacheID,
                    "CityCodeFrom": datahot.CityCodeFrom,
                    "CityCodeTo": datahot.CityCodeTo,
                    "DepartDate": datahot.DepartDate,
                    "ReturnDate": datahot.ReturnDate,
                    "HotelID": datahot.HotelID,
                    "RoomID": datahot.RoomID,
                    "MemberId": localStorage.memberid,

                    "ContactDetail": {
                        "SexCode": "Ms",
                        "FirstName": $('.hf_con_firstname').val(),
                        "LastName": $('.hf_con_lastname').val(),
                        "Email": $('.hf_con_email').val(),
                        "CountryNumber": $('.tel-btn span').html().substring(1),
                        "MobilePhone": $('.hf_con_cell').val()
                    },
                    "CurrencyCode": datahot.CurrencyCode,
                    "TotalPrice": datahot.priceDetail.totalAmount
                },
                "ForeEndType": 3,
                "Code": "50100004"
            }

            //房间信息
            Parmeters.Parameters.RoomDetails=datahot.RoomDetails;

            //出行人
            var traveller=[];
            var traInfo_sel=JSON.parse(localStorage.travellerInfo_selected);
            for(var i=0;i<traInfo_sel.length; i++)
            {
                var tra={};
                var person={};
                person.FirstName=traInfo_sel[i].FirstName;
                person.LastName=traInfo_sel[i].LastName;
                person.PassengerType=traInfo_sel[i].PassengerType;
                person.DateOfBirth=traInfo_sel[i].DateOfBirth;
                tra.IdNumber=traInfo_sel[i].CertificateInfo.IdNumber;
                tra.IdCountry=traInfo_sel[i].CertificateInfo.IdCountry;
                tra.idType=traInfo_sel[i].CertificateInfo.IdType;
                tra.IdActivatedDate=traInfo_sel[i].CertificateInfo.IdActivatedDate;
                person.CertificateInfo=tra;
                person.SexCode=traInfo_sel[i].SexCode;
                person.CountryCode=traInfo_sel[i].CountryCode;
                traveller.push(person);
            }

            Parmeters.Parameters.TravellerInfo=traveller;

            if( $('.order-tlist2').length != window.localStorage.peotot){
                jAlert('请添加出行人');
                return;
            }
            //联系人姓名检验
            var inputlast=$('.hf_con_lastname');
            if(! vlm.Utils.validate.engName(inputlast.val())){
                jAlert('请您输入英文的联系人姓');
                return;
            }
            var inputfir=$('.hf_con_firstname');
            if(! vlm.Utils.validate.engName(inputfir.val())){
                jAlert('请您输入英文的联系人名');
                return;
            }
            // 手机号邮箱检验
            var oMobile = $('.hf_con_cell')[0].value;
            var oEmail = $('.hf_con_email')[0].value;

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

            console.log(Parmeters);
            vlm.loading();
            vlm.loadJson("", JSON.stringify(Parmeters), hotel_flight_back);
        };
    }
    hf_order(orderSub);

    //下单回调函数
    function hotel_flight_back(ret){
        var json=ret;
        console.log(json);
        vlm.loadend();
        if(json.success)
        {
            window.location.href='../payment/payment.html?bookingRefNo='+json.data.bookingRefNo+"&type=FlightHotle";
        }else{
            jAlert(json.message);
        }
    }


})();

