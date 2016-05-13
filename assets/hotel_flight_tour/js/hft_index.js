/**
 * Created by Venson on 2016/5/6.
 */
var val = vlm.parseUrlPara(window.location.href);
var htf_search = {
    //  页面初始化
    init_title_room: function () {
        var that = this;
        var indexTab = $('#indexTab')[0];
        var tab = indexTab.getElementsByTagName('div');
        var initStr_hf = '';
        var initStr_hft = '';
        var section;
        var search_hotel = document.getElementsByClassName('search_hotel');
        var hotelInfo_hf = search_hotel[0].querySelector('.hotelInfo_numb_room');
        var hotelInfo_hft = search_hotel[1].querySelector('.hotelInfo_numb_room');
        if (localStorage.cacheSearch) {
            var cacheSearch = JSON.parse(localStorage.cacheSearch);
            console.log(cacheSearch);
            switch (cacheSearch.Box) {
                case 1:
                    tab[0].className = 'tab active';
                    $('#flightHotelBox').show();
                    break;
                case 2:
                    tab[1].className = 'tab active';
                    $('#flightHotelTourBox').show();
                    break;
                default:
                    void(0);
            }
            $('.content_box').eq(0).find('.origin').html(cacheSearch.hfSearchInfo.FromCityNameCN);
            $('.content_box').eq(0).find('.destination').html(cacheSearch.hfSearchInfo.ToCityNameCN);
            $('.content_box').eq(1).find('.origin').attr("data-citycode", cacheSearch.hftSearchInfo.FromCityCode);
            $('.content_box').eq(1).find('.destination').attr("data-citycode", cacheSearch.hftSearchInfo.ToCityCode);
            $('.content_box').eq(0).find('#hf_roomNum').html(cacheSearch.hfSearchInfo.RoomInfo.length);
            $('.content_box').eq(1).find('#hft_roomNum').html(cacheSearch.hftSearchInfo.RoomInfo.length);
            var room;
            var echRoom;
            for (var i = 0; i < cacheSearch.hfSearchInfo.RoomInfo.length; i++) {
                if (i == 0) {
                    if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.RoomInfo[i].adult == 1) {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 1) {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 2) {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon ico_select"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed && cacheSearch.hfSearchInfo.EchChildNum[i].adult == 1) {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 1) {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>' + '</div>';
                    } else {
                        initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
                    }
                } else {
                    if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.RoomInfo[i].adult == 1) {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 1) {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 2) {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon ico_select"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed && cacheSearch.hfSearchInfo.RoomInfo[i].adult == 1) {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_ui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed && cacheSearch.hfSearchInfo.EchChildNum[i] == 1) {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hfSearchInfo.RoomInfo[i].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>' + '</div>';
                    } else {
                        initStr_hf = '<span class="title">房间' + (i + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hfSearchInfo.RoomInfo[i].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this)";><i class="child_sui">岁</i>' + '</div>';
                    }
                }
                section = document.createElement('section');
                section.innerHTML = initStr_hf;
                section.className = 'hotelInfo_numb_people';
                room = $('.content_box').eq(0).find('.hotelInfo_numb_people').length;
                echRoom = $('.content_box').eq(0).find('.hotelInfo_numb_people');
                if (room) {
                    search_hotel[0].insertBefore(section, echRoom[room - 1].nextSibling);
                } else {
                    search_hotel[0].insertBefore(section, hotelInfo_hf.nextSibling);
                }
            }
            for (var j = 0; j < cacheSearch.hftSearchInfo.RoomInfo.length; j++) {
                if (j == 0) {
                    if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.RoomInfo[j].adult == 1) {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 1) {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 2) {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon ico_select"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed && cacheSearch.hftSearchInfo.EchChildNum[j].adult == 1) {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 1) {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>' + '</div>';
                    } else {
                        initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
                    }
                } else {
                    if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.RoomInfo[j].adult == 1) {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 1) {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 2) {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithOutBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon ico_select"></b></span>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed && cacheSearch.hftSearchInfo.RoomInfo[j].adult == 1) {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_ui">岁</i>' + '</div>' + '</div>';
                    } else if (cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed && cacheSearch.hftSearchInfo.EchChildNum[j] == 1) {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">1</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value="' + cacheSearch.hftSearchInfo.RoomInfo[j].childWithBed[0] + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>' + '</div>';
                    } else {
                        initStr_hft = '<span class="title">房间' + (j + 1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adult-down"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">' + cacheSearch.hftSearchInfo.RoomInfo[j].adult + '</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this)";><i class="child_sui">岁</i>' + '</div>';
                    }
                }
                section = document.createElement('section');
                section.innerHTML = initStr_hft;
                section.className = 'hotelInfo_numb_people';
                room = $('.content_box').eq(1).find('.hotelInfo_numb_people').length;
                echRoom = $('.content_box').eq(1).find('.hotelInfo_numb_people');
                if (room) {
                    search_hotel[1].insertBefore(section, echRoom[room - 1].nextSibling);
                } else {
                    search_hotel[1].insertBefore(section, hotelInfo_hft.nextSibling);
                }
            }
        } else {
            tab[0].className = 'tab active';
            $('#flightHotelBox').show();
            var hotelInfo = document.querySelector('.hotelInfo_numb_room');
            $('#hf_roomNum').html(1);
            $('#hft_roomNum').html(1);
            initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
            section = document.createElement('section');
            section.innerHTML = initStr_hf;
            section.className = 'hotelInfo_numb_people init-hotel-room-detail';
            search_hotel[0].insertBefore(section, hotelInfo_hf.nextSibling);
            initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' + '<b class="com_icon child_age_state"></b>' + '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
            section = document.createElement('section');
            section.innerHTML = initStr_hft;
            section.className = 'hotelInfo_numb_people init-hotel-room-detail';
            search_hotel[1].insertBefore(section, hotelInfo_hft.nextSibling);
        }
        $('.tab').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).index() == 0) {
                $('#flightHotelBox').show();
                $('#flightHotelTourBox').hide();
            } else {
                $('#flightHotelBox').hide();
                $('#flightHotelTourBox').show();
            }
            that.add_subtract();
        });
        $('.child_age_state').click(function (e) {
            e.stopPropagation();
            $(this).siblings('.age_state_box').toggle();
        });

        $('body').click(function (e) {
            //e.stopPropagation();   
            var age_state_box = document.getElementsByClassName('age_state_box');
            if (age_state_box[0].style.display != 'none' || age_state_box[1].style.display != 'none') {
                age_state_box[0].style.display = 'none';
                age_state_box[1].style.display = 'none';
            }
        });

        this.initCalendar();
    },
    //日历初始化
    initCalendar: function () {
        var initFhDate = {},
            initFhtDate = {},
            fhStartDate, fhEndDate, fhtStartDate, fhtEndDate, now = new Date(),
            initStartDate, initEndDate;
        //F+H
        var fhStartDay = $("#fhCalendar .js_startDay"); //显示出发日期
        var fhEndDay = $("#fhCalendar .js_endDay"); //显示返程日期
        var fhStartDayData = $("#fhCalendar .js_startData"); //保存出发日期
        var fhReturnDayData = $("#fhCalendar .js_returnData"); //保存返程日期
        var fhStartWeekDay = $("#fhCalendar .week_one");
        var fhEndWeekDay = $("#fhCalendar .week_two");
        //F+H+T
        var fhtStartDay = $("#fhtCalendar .js_startDay"); //显示出发日期
        var fhtEndDay = $("#fhtCalendar .js_endDay"); //显示返程日期
        var fhtStartDayData = $("#fhtCalendar .js_startData"); //保存出发日期
        var fhtReturnDayData = $("#fhtCalendar .js_returnData"); //保存返程日期
        var fhtStartWeekDay = $("#fhtCalendar .week_one");
        var fhtEndWeekDay = $("#fhtCalendar .week_two");

        //默认时间为T+2~T+4
        initStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
        initEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);

        if (localStorage.cacheSearch) {
            var cacheSearch = JSON.parse(localStorage.cacheSearch);
            var fhStartDate = cacheSearch.hfSearchInfo.DepartDay;
            var fhEndDate = cacheSearch.hfSearchInfo.ReturnDay;

            var fhtStartDate = cacheSearch.hftSearchInfo.DepartDay;
            var fhtEndDate = cacheSearch.hftSearchInfo.ReturnDay;

            var startDate, endDate;
            //F+H
            //保存缓存日期
            startDate = new Date(fhStartDate.replace("-", "/"));
            endDate = new Date(fhEndDate.replace("-", "/"));
            if (startDate < initStartDate) {
                startDate = initStartDate;
                endDate = initEndDate;
            }
            fhStartDayData.attr('data-day', fhStartDate);
            fhReturnDayData.attr('data-day', fhEndDate);

            fhStartDay.html((startDate.getMonth() + 1) + "月" + startDate.getDate() + "日");
            fhStartWeekDay.html(vlm.Utils.getWeek(startDate.toDateString()));
            fhEndDay.html((endDate.getMonth() + 1) + "月" + endDate.getDate() + "日");
            fhEndWeekDay.html(vlm.Utils.getWeek(endDate.toDateString()));
            startDate = vlm.Utils.format_date(startDate.toDateString(), 'Ymd');
            endDate = vlm.Utils.format_date(endDate.toDateString(), 'Ymd');
            initFhDate[startDate] = "checkin day";
            initFhDate[endDate] = "checkout day";
            //F+H+T
            //保存缓存日期
            fhtStartDayData.attr('data-day', fhtStartDate);
            fhtReturnDayData.attr('data-day', fhtEndDate);
            //显示选择的日期
            startDate = new Date(fhtStartDate.replace("-", "/"));
            endDate = new Date(fhtEndDate.replace("-", "/"));
            if (startDate < initStartDate) {
                startDate = initStartDate;
                endDate = initEndDate;
            }
            fhtStartDay.html((startDate.getMonth() + 1) + "月" + startDate.getDate() + "日");
            fhtStartWeekDay.html(vlm.Utils.getWeek(startDate.toDateString()));
            fhtEndDay.html((endDate.getMonth() + 1) + "月" + endDate.getDate() + "日");
            fhtEndWeekDay.html(vlm.Utils.getWeek(endDate.toDateString()));
            startDate = vlm.Utils.format_date(startDate.toDateString(), 'Ymd');
            endDate = vlm.Utils.format_date(endDate.toDateString(), 'Ymd');
            initFhtDate[startDate] = "checkin day";
            initFhtDate[endDate] = "checkout day";

        } else {
            //F+H
            fhStartDate = initStartDate;
            //显示出发日期
            fhStartDay.html((fhStartDate.getMonth() + 1) + "月" + fhStartDate.getDate() + "日");
            fhStartWeekDay.html(vlm.Utils.getWeek(fhStartDate.toDateString()));
            fhStartDate = vlm.Utils.format_date(fhStartDate.toDateString(), 'Ymd');
            fhStartDayData.attr("data-day", fhStartDate);
            fhEndDate = initEndDate;
            //显示返程日期
            fhEndDay.html((fhEndDate.getMonth() + 1) + "月" + fhEndDate.getDate() + "日");
            fhEndWeekDay.html(vlm.Utils.getWeek(fhEndDate.toDateString()));
            fhEndDate = vlm.Utils.format_date(fhEndDate.toDateString(), 'Ymd');
            fhReturnDayData.attr("data-day", fhEndDate);
            initFhDate[fhStartDate] = "checkin day";
            initFhDate[fhEndDate] = "checkout day";

            //F+H+T
            fhtStartDate = initStartDate;
            //显示出发日期
            fhtStartDay.html((fhtStartDate.getMonth() + 1) + "月" + fhtStartDate.getDate() + "日");
            fhtStartWeekDay.html(vlm.Utils.getWeek(fhtStartDate.toDateString()));
            fhtStartDate = vlm.Utils.format_date(fhtStartDate.toDateString(), 'Ymd');
            fhtStartDayData.attr("data-day", fhtStartDate);
            fhtEndDate = initEndDate;
            //显示返程日期
            fhtEndDay.html((fhtEndDate.getMonth() + 1) + "月" + fhtEndDate.getDate() + "日");
            fhtEndWeekDay.html(vlm.Utils.getWeek(fhtEndDate.toDateString()));
            fhtEndDate = vlm.Utils.format_date(fhtEndDate.toDateString(), 'Ymd');
            fhtReturnDayData.attr("data-day", fhtEndDate);
            initFhtDate[fhtStartDate] = "checkin day";
            initFhtDate[fhtEndDate] = "checkout day";
        }

        //F+H 日历初始化
        var fhCalendar = new Calender({
            id: "fhCalendar",
            time: initFhDate,
            callback: function (result) {
                //保存选择日期
                fhStartDayData.attr('data-day', result[0]);
                fhReturnDayData.attr('data-day', result[1]);
                //显示选择的日期
                var startDate = new Date(result[0].replace("-", "/"));
                var endDate = new Date(result[1].replace("-", "/"));
                fhStartDay.html((startDate.getMonth() + 1) + "月" + startDate.getDate() + "日");
                fhStartWeekDay.html(vlm.Utils.getWeek(startDate.toDateString()));
                fhEndDay.html((endDate.getMonth() + 1) + "月" + endDate.getDate() + "日");
                fhEndWeekDay.html(vlm.Utils.getWeek(endDate.toDateString()));
            }
        });

        var fhtCalendar = new Calender({
            id: "fhtCalendar",
            time: initFhtDate,
            callback: function (result) {
                //保存选择日期
                fhtStartDayData.attr('data-day', result[0]);
                fhtReturnDayData.attr('data-day', result[1]);
                //显示选择的日期
                var startDate = new Date(result[0].replace("-", "/"));
                var endDate = new Date(result[1].replace("-", "/"));
                fhtStartDay.html((startDate.getMonth() + 1) + "月" + startDate.getDate() + "日");
                fhtStartWeekDay.html(vlm.Utils.getWeek(startDate.toDateString()));
                fhtEndDay.html((endDate.getMonth() + 1) + "月" + endDate.getDate() + "日");
                fhtEndWeekDay.html(vlm.Utils.getWeek(endDate.toDateString()));
            }
        });

    },
    //   加
    toUp: function (m, n, n_1) {
        var _type = n.parentNode.getAttribute("data-type");
        var str = '',
            temAll = 0,
            roomEle = '',
            that = this;
        n.onclick = function () {
            roomEle = n.parentNode.parentNode.parentNode;
            if (_type == "extraChild") {
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                temAll = Number(roomEle.querySelector('.adult_people_number').innerHTML) + str;
                if (temAll > 5) {
                    return;
                } else if (str > 2) {
                    return;
                } else {
                    m.innerHTML = str;
                }
                that.extraChild(n.parentNode.parentNode, str);
                str == 2 ? n.style.backgroundPosition = '29.5% 68%' : n.style.backgroundPosition = '41.2% 68%';
            } else if (_type == "extraRoom") {
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                if (str > 5) {
                    return;
                } else {
                    m.innerHTML = str;
                    that.extraRoom(n.parentNode.parentNode, str);
                }
                str == 5 ? n.style.backgroundPosition = '29.5% 68%' : n.style.backgroundPosition = '41.2% 68%';
            } else if (_type == "adult") {
                var adultdown = n.parentNode.getElementsByClassName('cut_down_btn')[0];
                adultdown.style.backgroundPosition = '17.5% 68%';
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                temAll = Number(roomEle.querySelector('.child_number').innerHTML) + str;
                if (temAll > 5) {
                    return;
                } else if (str > 3) {
                    return;
                } else {
                    m.innerHTML = str;
                }
                var parent = n.parentNode.parentNode.parentNode;
                var ChildNum = parseInt(parent.querySelector('.child_number').innerHTML);
                that.changeChildTemp(parent, str, ChildNum);
                str == 3 ? n.style.backgroundPosition = '29.5% 68%' : n.style.backgroundPosition = '41.2% 68%';
            }
        };
    },
    //    儿童信息随成人信息更变
    changeChildTemp: function (box, n, i) {
        var listStr = box.querySelector('.extraChild');
        var age1 = listStr.getElementsByClassName('inp_cage')[0].value;
        var age2;
        if (age1 != '') {
            if (n == 1) {
                if (i == 2) {
                    age2 = listStr.getElementsByClassName('inp_cage')[1].value;
                    if (age2 != '') {
                        listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age2 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>';
                    } else {
                        listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>';
                    }
                } else {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                age2 = listStr.getElementsByClassName('inp_cage')[1].value;
                if (age2 != '') {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age2 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
                } else {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age1 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
                }
            }
        } else {
            if (n == 1) {
                if (i == 2) {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                } else {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
            }
        }
        this.addbed();
    },
    //   减
    toDown: function (m, n) {
        var _type = n.parentNode.getAttribute("data-type"),
            that = this;
        var plus = n.parentNode.getElementsByClassName('plus_btn')[0];
        n.onclick = function () {
            var str = m.innerHTML;
            str = Number(str);
            if (n.id == 'hf_roomDown' || n.id == 'hft_roomDown') {
                if (str <= 1) {
                    m.innerHTML = 1;
                    return;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 1 ? n.style.backgroundPosition = '6.7% 68%' : n.style.backgroundPosition = '17.5% 68%';
                str == 5 ? plus.style.backgroundPosition = '29.5% 68%' : plus.style.backgroundPosition = '41.2% 68%';
            } else if (n.id == 'adultDown') {
                if (str <= 1) {
                    m.innerHTML = 1;
                    return;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 1 ? n.style.backgroundPosition = '6.7% 68%' : n.style.backgroundPosition = '17.5% 68%';
                str == 3 ? plus.style.backgroundPosition = '29.5% 68%' : plus.style.backgroundPosition = '41.2% 68%';
                var parent = n.parentNode.parentNode.parentNode;
                var ChildNum = parseInt(parent.querySelector('.child_number').innerHTML);
                that.changeChildTemp(parent, str, ChildNum);
            } else {
                if (str <= 0) {
                    m.innerHTML = 0;
                    return;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 0 ? n.style.backgroundPosition = '6.7% 68%' : n.style.backgroundPosition = '17.5% 68%';
                str == 2 ? plus.style.backgroundPosition = '29.5% 68%' : plus.style.backgroundPosition = '41.2% 68%';
            }
            _type == "extraChild" && that.extraChild(n.parentNode.parentNode, str);
            _type == "extraRoom" && that.extraRoom(n.parentNode.parentNode, str);
        };
    },
    //  加床按钮
    addbed: function () {
        var addBed = document.getElementsByClassName('com_icon noselect');
        for (var j = 0; j < addBed.length; j++) {
            {
                (function (index) {
                    addBed[j].onclick = function () {
                        var c_name = addBed[index].className;
                        if (c_name == 'com_icon noselect') {
                            this.className = 'com_icon noselect ico_select';
                        } else {
                            this.className = 'com_icon noselect';
                        }
                    };
                }(j));
            }
        }
    },
    //  实现加减
    add_subtract: function () {
        var content_box = document.getElementsByClassName('content_box');
        var oNum, _plus_btn, _cut_down_btn;
        if (content_box[0].style.display != 'none') {
            oNum = content_box[0].getElementsByClassName('cut_up_cont');
            _plus_btn = content_box[0].getElementsByClassName('plus_btn');
            _cut_down_btn = content_box[0].getElementsByClassName('cut_down_btn');
        } else {
            oNum = content_box[1].getElementsByClassName('cut_up_cont');
            _plus_btn = content_box[1].getElementsByClassName('plus_btn');
            _cut_down_btn = content_box[1].getElementsByClassName('cut_down_btn');
        }
        for (var i = 0; i < oNum.length; i++) {
            this.toUp(oNum[i], _plus_btn[i], _cut_down_btn[i]);
            this.toDown(oNum[i], _cut_down_btn[i]);
            var str = parseInt(oNum[i].innerHTML);
            if (oNum[i].parentNode.getAttribute('data-type') == 'adult' || oNum[i].parentNode.getAttribute('data-type') == 'extraRoom') {
                str == 1 ? _cut_down_btn[i].style.backgroundPosition = '6.7% 68%' : _cut_down_btn[i].style.backgroundPosition = '17.5% 68%';
            } else {
                str == 0 ? _cut_down_btn[i].style.backgroundPosition = '6.7% 68%' : _cut_down_btn[i].style.backgroundPosition = '17.5% 68%';
            }
        }
        this.addbed();
    },
    //   加减儿童
    extraChild: function (dom, numb) {
        var _bedBox = dom.parentNode.getElementsByClassName('extraChild'),
            _html = '';
        var adultPeople = parseInt(dom.parentNode.getElementsByClassName('adult_people_number')[0].innerHTML);
        if (numb == 0 && _bedBox.length == 1) {
            _bedBox[0].style.display = 'none';
        } else {
            var _listHtml;
            _bedBox[0].style.display = 'block';
            _listHtml = this.extraChildTemp(numb, adultPeople, _bedBox[0]);
            if (_bedBox.length == 0) {
                _html = '<div class="extraChild">';
                domAfter(dom, _html + _listHtml + '</div>');
                _listHtml = this.extraChildTemp(numb, adultPeople, _html);
            } else {
                _bedBox[0].innerHTML = _listHtml;
                _listHtml = this.extraChildTemp(numb, adultPeople, _bedBox[0]);
            }
        }
        this.add_subtract();
    },
    //   加减房间
    extraRoom: function (dom, numb) {
        var content_box = document.getElementsByClassName('content_box');
        var _box;
        if (content_box[0].style.display != 'none') {
            _box = content_box[0];
        } else {
            _box = content_box[1];
        }
        var roomBox = _box.getElementsByClassName('hotelInfo_numb_people');
        var _html = '';
        if (numb < roomBox.length) {
            roomBox[0].parentNode.removeChild(roomBox[roomBox.length - 1]);
        } else if (numb == roomBox.length) {
            return;
        } else {
            var section = document.createElement("section");
            section.className = "hotelInfo_numb_people";
            for (var i = 1; i <= numb; i++) {
                _html = this.extraRoomTemp(i);
                var rb_l = roomBox.length;
                var lastIndex = rb_l - 1;
                section.innerHTML = _html;
            }
            _box.getElementsByClassName('search_hotel')[0].appendChild(section);
        }
        this.add_subtract();
    },
    //   儿童逻辑
    extraChildTemp: function (i, n, box) {
        var age = box.getElementsByClassName('inp_cage')[0].value;
        if (age != '') {
            if (n == 1) {
                if (i == 2) {
                    return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '"><i class="child_sui">岁</i>' + '</div>';
                } else {
                    return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age + '"" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "' + age + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
            }
        } else {
            if (n == 1) {
                if (i == 2) {
                    return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                } else {
                    return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
            }
        }
        this.addbed();
    },
    //   加房间
    extraRoomTemp: function (i) {
        return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(' + 2 + '-' + 12 + ')岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
    },
    domAfter: function (dom, html) {
        var next = dom.nextSibling;
        if (next != null) {
            while (next.tagName == undefined) {
                if (next.nextSibling != null) {
                    next = next.nextSibling;
                } else {
                    next = null;
                    break;
                }
            }
        }
        next != null ? next.parentNode.insertBefore(el(html), next) : dom.parentNode.appendChild(el(html));
    },
    //  页面跳转
    next_page: function () {
        var getByClass = function (box, obj) {
            return box.getElementsByClassName(obj);
        };
        var box;
        var type;
        var content = document.getElementsByClassName('content_box');
        if (content[0].style.display != 'none') {
            box = content[0];
            type = 1;
        } else {
            box = content[1];
            type = 2;
        }
        var box_hf = content[0];
        var box_hft = content[1];
        var exaddChild = box.getElementsByClassName('extraChild');
        for (var v = 0; v < exaddChild.length; v++) {
            if (exaddChild[v].style.display != 'none') {
                var input = exaddChild[v].getElementsByClassName("inp_cage");
                for (var w = 0; w < input.length; w++) {
                    if (input[w].value == '') {
                        jAlert('请输入儿童年龄!');
                        return;
                    }
                }
            }
        }
        //   传输查询数据
        var FromCityNameCN = getByClass(box, 'origin')[0].innerHTML;
        var ToCityNameCN = getByClass(box, 'destination')[0].innerHTML;
        var fromCity = getByClass(box, 'origin')[0].getAttribute('data-citycode');
        var toCity = getByClass(box, 'destination')[0].getAttribute('data-citycode');
        var departDate = getByClass(box, 'js_startData')[0].getAttribute('data-day') + 'T00:00:00';
        var returnDate = getByClass(box, 'js_returnData')[0].getAttribute('data-day') + 'T00:00:00';
        var startday = getByClass(box, 'js_startDay')[0].innerHTML;
        var endday = getByClass(box, 'js_endDay')[0].innerHTML;
        var stardWeek = getByClass(box, 'week_one')[0].innerHTML;
        var endWeek = getByClass(box, 'week_two')[0].innerHTML;
        var roomDetails = [],
            echChildNum = [];
        var room = getByClass(box, 'hotelInfo_numb_people');
        for (var r = 0; r < room.length; r++) {
            var temObj = {},
                childWithOutBed = [],
                childWithBed = [];
            var temAdultNum = parseInt(room[r].querySelector('.adult_people_number').innerHTML);
            var temChildNum = parseInt(room[r].querySelector('.child_number').innerHTML);
            var extraChild = room[r].querySelector('.extraChild');
            var childChooseParent = extraChild.querySelector('.numbList');
            if (temAdultNum == 1 && temChildNum == 1) {
                childWithBed.push(room[r].querySelector('input').value);
            } else if (temAdultNum == 1 && temChildNum == 2) {
                childWithBed.push(room[r].querySelectorAll('input')[0].value);
                childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
            } else if (temAdultNum == 2 || temAdultNum == 3) {
                if (temChildNum == 1) {
                    var tt = childChooseParent.querySelector('.noselect');
                    if (tt.className.indexOf('ico_select') > -1) {
                        childWithBed.push(childChooseParent.parentNode.querySelector('input').value);
                    } else {
                        childWithOutBed.push(childChooseParent.parentNode.querySelector('input').value)
                    }
                } else if (temChildNum == 2) {
                    childWithBed.push(room[r].querySelectorAll('input')[0].value);
                    childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
                }
            }
            childWithBed.length > 0 ? temObj.childWithBed = childWithBed :
                void(0);
            childWithOutBed.length > 0 ? temObj.childWithOutBed = childWithOutBed :
                void(0);
            temObj.adult = temAdultNum;
            echChildNum.push(temChildNum);
            roomDetails.push(temObj);
        }
        var allNum = 0;
        var adultNum = 0;
        var childNum = 0;
        for (var kl = 0; kl < roomDetails.length; kl++) {
            adultNum = adultNum + roomDetails[kl].adult;
            if (roomDetails[kl]['childWithBed']) {
                childNum = childNum + roomDetails[kl]['childWithBed'].length;
            }
            if (roomDetails[kl]['childWithOutBed']) {
                childNum = childNum + roomDetails[kl]['childWithOutBed'].length;
            }
        }
        allNum = adultNum + childNum;
        var searchInfo = {
            FromCityNameCN: FromCityNameCN,
            ToCityNameCN: ToCityNameCN,
            FromCity: fromCity,
            ToCity: toCity,
            DepartDate: departDate,
            ReturnDate: returnDate,
            PeopleNum: allNum,
            AdultNum: adultNum,
            ChildNum: childNum,
            RoomInfo: roomDetails
        };
        localStorage.setItem('searchInfo', JSON.stringify(searchInfo));
        //   缓存查询数据
        var hf_searchInfo = {},
            hft_searchInfo = {};
        var hf_FromCityNameCN = getByClass(box_hf, 'origin')[0].innerHTML;
        var hf_ToCityNameCN = getByClass(box_hf, 'destination')[0].innerHTML;
        var hf_fromCity = getByClass(box_hf, 'origin')[0].getAttribute('data-citycode');
        var hf_toCity = getByClass(box_hf, 'destination')[0].getAttribute('data-citycode');
        var hf_startday = getByClass(box_hf, 'js_startData')[0].getAttribute('data-day');
        var hf_endday = getByClass(box_hf, 'js_returnData')[0].getAttribute('data-day');
        var hf_stardWeek = getByClass(box_hf, 'week_one')[0].innerHTML;
        var hf_endWeek = getByClass(box_hf, 'week_two')[0].innerHTML;
        var hf_roomDetails = [],
            hf_echChildNum = [];
        var hf_room = getByClass(box_hf, 'hotelInfo_numb_people');
        for (var m = 0; m < hf_room.length; m++) {
            var hf_temObj = {},
                hf_childWithOutBed = [],
                hf_childWithBed = [];
            var hf_temAdultNum = parseInt(hf_room[m].querySelector('.adult_people_number').innerHTML);
            var hf_temChildNum = parseInt(hf_room[m].querySelector('.child_number').innerHTML);
            var hf_extraChild = hf_room[m].querySelector('.extraChild');
            var hf_childChooseParent = hf_extraChild.querySelector('.numbList');
            if (hf_temAdultNum == 1 && hf_temChildNum == 1) {
                hf_childWithOutBed.push(hf_room[m].querySelector('input').value);
            } else if (hf_temAdultNum == 1 && hf_temChildNum == 2) {
                hf_childWithBed.push(hf_room[m].querySelectorAll('input')[0].value);
                hf_childWithOutBed.push(hf_room[m].querySelectorAll('input')[1].value);
            } else if (hf_temAdultNum == 2 || hf_temAdultNum == 3) {
                if (hf_temChildNum == 1) {
                    var bb = hf_childChooseParent.querySelector('.noselect');
                    if (bb.className.indexOf('ico_select') > -1) {
                        hf_childWithBed.push(hf_childChooseParent.parentNode.querySelector('input').value);
                    } else {
                        hf_childWithOutBed.push(hf_childChooseParent.parentNode.querySelector('input').value)
                    }
                } else if (hf_temChildNum == 2) {
                    hf_childWithBed.push(hf_room[m].querySelectorAll('input')[0].value);
                    hf_childWithOutBed.push(hf_room[m].querySelectorAll('input')[1].value);
                }
            }
            hf_childWithBed.length > 0 ? hf_temObj.childWithBed = hf_childWithBed :
                void(0);
            hf_childWithOutBed.length > 0 ? hf_temObj.childWithOutBed = hf_childWithOutBed :
                void(0);
            hf_temObj.adult = hf_temAdultNum;
            hf_echChildNum.push(hf_temChildNum);
            hf_roomDetails.push(hf_temObj);
        }
        hf_searchInfo.FromCityNameCN = hf_FromCityNameCN;
        hf_searchInfo.ToCityNameCN = hf_ToCityNameCN;
        hf_searchInfo.FromCityCode = hf_fromCity;
        hf_searchInfo.ToCityCode = hf_toCity;
        hf_searchInfo.DepartDay = hf_startday;
        hf_searchInfo.ReturnDay = hf_endday;
        hf_searchInfo.StardWeek = hf_stardWeek;
        hf_searchInfo.EndWeek = hf_endWeek;
        hf_searchInfo.RoomInfo = hf_roomDetails;
        hf_searchInfo.EchChildNum = hf_echChildNum;

        var hft_FromCityNameCN = getByClass(box_hft, 'origin')[0].innerHTML;
        var hft_ToCityNameCN = getByClass(box_hft, 'destination')[0].innerHTML;
        var hft_fromCity = getByClass(box_hft, 'origin')[0].getAttribute('data-citycode');
        var hft_toCity = getByClass(box_hft, 'destination')[0].getAttribute('data-citycode');
        var hft_startday = getByClass(box_hft, 'js_startData')[0].getAttribute("data-day");
        var hft_endday = getByClass(box_hft, 'js_returnData')[0].getAttribute("data-day");
        var hft_stardWeek = getByClass(box_hft, 'week_one')[0].innerHTML;
        var hft_endWeek = getByClass(box_hft, 'week_two')[0].innerHTML;
        var hft_roomDetails = [],
            hft_echChildNum = [];
        var hft_room = getByClass(box_hft, 'hotelInfo_numb_people');
        for (var n = 0; n < hft_room.length; n++) {
            var hft_temObj = {},
                hft_childWithOutBed = [],
                hft_childWithBed = [];
            var hft_temAdultNum = parseInt(hft_room[n].querySelector('.adult_people_number').innerHTML);
            var hft_temChildNum = parseInt(hft_room[n].querySelector('.child_number').innerHTML);
            var hft_extraChild = hft_room[n].querySelector('.extraChild');
            var hft_childChooseParent = hft_extraChild.querySelector('.numbList');
            if (hft_temAdultNum == 1 && hft_temChildNum == 1) {
                hft_childWithOutBed.push(hft_room[n].querySelector('input').value);
            } else if (hft_temAdultNum == 1 && hft_temChildNum == 2) {
                hft_childWithBed.push(hft_room[n].querySelectorAll('input')[0].value);
                hft_childWithOutBed.push(hft_room[n].querySelectorAll('input')[1].value);
            } else if (hft_temAdultNum == 2 || hft_temAdultNum == 3) {
                if (hft_temChildNum == 1) {
                    var gg = hft_childChooseParent.querySelector('.noselect');
                    if (gg.className.indexOf('ico_select') > -1) {
                        hft_childWithBed.push(hft_childChooseParent.parentNode.querySelector('input').value);
                    } else {
                        hft_childWithOutBed.push(hft_childChooseParent.parentNode.querySelector('input').value)
                    }
                } else if (hft_temChildNum == 2) {
                    hft_childWithBed.push(hft_room[n].querySelectorAll('input')[0].value);
                    hft_childWithOutBed.push(hft_room[n].querySelectorAll('input')[1].value);
                }
            }
            hft_childWithBed.length > 0 ? hft_temObj.childWithBed = hft_childWithBed :
                void(0);
            hft_childWithOutBed.length > 0 ? hft_temObj.childWithOutBed = hft_childWithOutBed :
                void(0);
            hft_temObj.adult = hft_temAdultNum;
            hft_echChildNum.push(hft_temChildNum);
            hft_roomDetails.push(hft_temObj);
        }
        hft_searchInfo.FromCityNameCN = hft_FromCityNameCN;
        hft_searchInfo.ToCityNameCN = hft_ToCityNameCN;
        hft_searchInfo.FromCityCode = hft_fromCity;
        hft_searchInfo.ToCityCode = hft_toCity;
        hft_searchInfo.DepartDay = hft_startday;
        hft_searchInfo.ReturnDay = hft_endday;
        hft_searchInfo.StardWeek = hft_stardWeek;
        hft_searchInfo.EndWeek = hft_endWeek;
        hft_searchInfo.RoomInfo = hft_roomDetails;
        hft_searchInfo.EchChildNum = hft_echChildNum;
        var cacheSearch = {
            hfSearchInfo: hf_searchInfo,
            hftSearchInfo: hft_searchInfo,
            Box: type
        };
        localStorage.setItem('cacheSearch', JSON.stringify(cacheSearch));
    },
    init: function () {
        this.init_title_room();
        this.add_subtract();
    }
};
htf_search.init();
//儿童年龄纯数字
function setAge(obj) {
    obj.value = obj.value.replace(/\D/ig, '');
}

function checkAge(obj) {
    if (parseInt(obj.value) < 2 || parseInt(obj.value) > 12) {
        jAlert('儿童年龄不符合标准!');
        obj.value = '';
    }
}
$('#hft_searchBtn').click(function () {
    htf_search.next_page();
    window.location.href = 'hft_scenic_list.html?type=2';
});
$('#hf_searchBtn').click(function () {
    htf_search.next_page();
    window.location.href = 'hft_choose.html?type=1';
});
