/**
 * Created by Venson on 2016/4/18.
 */
var val = vlm.parseUrlPara(window.location.href);
var hf_search = {
    initRoom:function(){
        var parent = document.getElementsByClassName('sc-content2')[0];
        var hotelInfo = document.querySelector('.hotelInfo_numb_room');
        var section;
        var initStr = '';
        var cacheSearch='';
        var roomNum = document.getElementById('roomNum');
        if(val.isInit){
            if(sessionStorage.cacheSearch){
               cacheSearch = JSON.parse(sessionStorage.cacheSearch);
            }else{
                cacheSearch={}
            }
            console.log(cacheSearch);
            $('.origin').html(cacheSearch.FromCityNameCN);
            $('.destination').html(cacheSearch.ToCityNameCN);
            $('.origin').attr("data-citycode",cacheSearch.FromCityCode);
            $('.destination').attr("data-citycode",cacheSearch.ToCityCode);
            //$('#mstartday').html(cacheSearch.DepartDate);
            //$('#mendday').html(cacheSearch.ReturnDate);
            //$('.double-week-one').html(cacheSearch.StardWeek);
            //$('.double-week-two').html(cacheSearch.EndWeek);
            roomNum.innerHTML = cacheSearch.RoomInfo.length;
            for(var i = 0;i < cacheSearch.RoomInfo.length;i++) {
                if(cacheSearch.RoomInfo[i].childWithOutBed&&cacheSearch.RoomInfo[i].adult == 1){
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">2</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithOutBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '</div>';
                }else if(cacheSearch.RoomInfo[i].childWithOutBed&&cacheSearch.ChildNum[i] == 1){
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">1</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithOutBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>' + '</div>';
                }else if(cacheSearch.RoomInfo[i].childWithOutBed&&cacheSearch.ChildNum[i] == 2){
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">2</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithOutBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>' + '</div>';
                }else if(cacheSearch.RoomInfo[i].childWithBed&&cacheSearch.RoomInfo[i].adult == 1){
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">1</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '</div>';
                }else if(cacheSearch.RoomInfo[i].childWithBed&&cacheSearch.ChildNum[i] == 1){
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">1</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value="'+cacheSearch.RoomInfo[i].childWithBed[0]+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect ico_select"></b></span>' + '</div>' + '</div>';
                }else{
                    initStr = '<span class="title">房间' + (i+1) + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">' + cacheSearch.RoomInfo[i].adult + '</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">0</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this)";><i class="child-sui">岁</i>' + '</div>';
                }
                section = document.createElement('section');
                section.innerHTML = initStr;
                section.className = 'hotelInfo_numb_people init-hotel-room-detail';
                var room = $('.init-hotel-room-detail').length;
                var echRoom = document.getElementsByClassName('init-hotel-room-detail');
                if(room){
                    parent.insertBefore(section, echRoom[room-1].nextSibling);
                }else{
                    parent.insertBefore(section, hotelInfo.nextSibling);
                }
            }
        }else{
            roomNum.innerHTML = 1;
            initStr = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">2</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(2-12)岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">0</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child-sui">岁</i>' + '</div>';
            section = document.createElement('section');
            section.innerHTML = initStr;
            section.className = 'hotelInfo_numb_people init-hotel-room-detail';
            parent.insertBefore(section, hotelInfo.nextSibling);
        }
    },
    toUp:function(m, n, n_1){
        var _type = n.parentNode.getAttribute("data-type");
        var str = '', temAll = 0, roomEle = '', that=this;
        n.onclick = function() {
            roomEle = n.parentNode.parentNode.parentNode;
            if (_type == "extraChild") {
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                temAll = Number(roomEle.querySelector('.adult-people-number').innerHTML) + str;
                if (temAll > 5) {
                    jAlert('单个房间最多人数不能超过5人!', '提示');
                    return;
                } else if (str > 2) {
                    jAlert('单个房间儿童数不能超过2人!', '提示');
                    return;
                } else {
                    m.innerHTML = str;
                }
                that.extraChild(n.parentNode.parentNode, str);
                str == 2 ? n.style.backgroundPosition = '-108px -23px' : n.style.backgroundPosition = '-131px -24px';
            } else if (_type == "extraRoom") {
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                if (str > 5) {
                    jAlert('最多选择5个房间!', '提示');
                    return;
                } else {
                    m.innerHTML = str;
                    that.extraRoom(n.parentNode.parentNode, str);
                }
                str == 5 ? n.style.backgroundPosition = '-108px -23px' : n.style.backgroundPosition = '-131px -24px';
            } else if (_type == "adult") {
                var adultdown = n.parentNode.getElementsByClassName('cut-down-btn')[0];
                adultdown.style.backgroundPosition = '-161px -24px';
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                temAll = Number(roomEle.querySelector('.child-number').innerHTML) + str;
                if (temAll > 5) {
                    jAlert('单个房间最多人数不能超过5人!', '提示');
                    return;
                } else if (str > 3) {
                    jAlert('单个房间成人数不能超过3人!', '提示');
                    return;
                } else {
                    m.innerHTML = str;
                }
                var parent = n.parentNode.parentNode.parentNode;
                var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
                that.changeChildTemp(parent,str,ChildNum);
                str == 3 ? n.style.backgroundPosition = '-108px -23px' : n.style.backgroundPosition = '-131px -24px';
            }
        };
    },
    //    儿童信息随成人信息更变
    changeChildTemp:function(box,n,i){
        var listStr = box.querySelector('.extraChild');
        var age1 = listStr.getElementsByClassName('inp-cage')[0].value;
        var age2;
        if(age1 != ''){
            if (n == 1) {
                if (i == 2) {
                    age2 = listStr.getElementsByClassName('inp-cage')[1].value;
                    if(age2 != ''){
                        listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age2+'" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>';
                    }else{
                        listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>';
                    }
                } else {
                    listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                age2 = listStr.getElementsByClassName('inp-cage')[1].value;
                if(age2 != ''){
                    listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age2+'" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
                }else{
                    listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
                }
            }
        }else{
            if (n == 1) {
                if (i == 2) {
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                } else {
                    listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
            }
        }
        this.addbed();
    },
    toDown:function(m, n){
        var _type = n.parentNode.getAttribute("data-type"),that = this;
        var plus = n.parentNode.getElementsByClassName('plus-btn')[0];
        n.onclick = function() {
            var str = m.innerHTML;
            str = Number(str);
            if (n.id == 'room_downb') {
                if (str <= 1) {
                    m.innerHTML = 1;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 1 ? n.style.backgroundPosition = '-185px -24px' : n.style.backgroundPosition = '-161px -24px';
                str == 5 ? plus.style.backgroundPosition = '-108px -23px' : plus.style.backgroundPosition = '-131px -24px';
            } else if (n.id == 'adult-down') {
                if (str <= 1) {
                    m.innerHTML = 1;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 1 ? n.style.backgroundPosition = '-185px -24px' : n.style.backgroundPosition = '-161px -24px';
                str == 3 ? plus.style.backgroundPosition = '-108px -23px' : plus.style.backgroundPosition = '-131px -24px';
                var parent = n.parentNode.parentNode.parentNode;
                var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
                that.changeChildTemp(parent,str,ChildNum);
            } else {
                if (str <= 0) {
                    m.innerHTML = 0;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 0 ? n.style.backgroundPosition = '-185px -24px' : n.style.backgroundPosition = '-161px -24px';
                str == 2 ? plus.style.backgroundPosition = '-108px -23px' : plus.style.backgroundPosition = '-131px -24px';
            }
            _type == "extraChild" && that.extraChild(n.parentNode.parentNode, str);
            _type == "extraRoom" && that.extraRoom(n.parentNode.parentNode, str);
        };
    },
    addbed:function(){
        var addBed = document.getElementsByClassName('icon noselect');
        for (var j = 0; j < addBed.length; j++) { {( function(index) {
            addBed[j].onclick = function() {
                var c_name = addBed[index].className;
                if (c_name == 'icon noselect') {
                    this.className = 'icon noselect ico_select';
                } else {
                    this.className = 'icon noselect';
                }
            };
        }(j));
        }
        }
    },
    //  实现加减
    add_subtract:function(){
        var oNum = document.getElementsByClassName('cut-up-cont'), _plus_btn = document.getElementsByClassName('plus-btn'), _cut_down_btn = document.getElementsByClassName('cut-down-btn');
        for (var i = 0; i < oNum.length; i++) {
            this.toUp(oNum[i], _plus_btn[i], _cut_down_btn[i]);
            this.toDown(oNum[i], _cut_down_btn[i]);
            var str = parseInt(oNum[i].innerHTML);
            if(oNum[i].parentNode.getAttribute('data-type') == 'adult' || oNum[i].parentNode.getAttribute('data-type') == 'extraRoom'){
                str == 1 ? _cut_down_btn[i].style.backgroundPosition = '-185px -24px' : _cut_down_btn[i].style.backgroundPosition = '-161px -24px';
            }else{
                str == 0 ? _cut_down_btn[i].style.backgroundPosition = '-185px -24px' : _cut_down_btn[i].style.backgroundPosition = '-161px -24px';
            }
        }
        this.addbed();
    },
    //   加减儿童
    extraChild:function(dom, numb){
        var _bedBox = dom.parentNode.getElementsByClassName('extraChild'), _html = '';
        var adultPeople = parseInt(dom.parentNode.getElementsByClassName('adult-people-number')[0].innerHTML);
        if (numb == 0 && _bedBox.length == 1) {
            _bedBox[0].style.display = 'none';
        } else {
            var _listHtml;
            _bedBox[0].style.display = 'block';
            _listHtml = this.extraChildTemp(numb, adultPeople,_bedBox[0]);

            if (_bedBox.length == 0) {
                _html = '<div class="extraChild">';
                domAfter(dom, _html + _listHtml + '</div>');
                _listHtml = this.extraChildTemp(numb, adultPeople,_html);
            } else {
                _bedBox[0].innerHTML = _listHtml;
                _listHtml = this.extraChildTemp(numb, adultPeople,_bedBox[0]);
            }
        }
        this.add_subtract();
    },
    //   加减房间
    extraRoom:function(dom, numb){
        var roomBox_first = dom.parentNode.childNodes[7];//zhege 7 shi sha 不是我写的，我不知道
        var roomBox = document.getElementsByClassName('hotelInfo_numb_people');
        var _html = '';
        console.log(numb)
        if (numb < roomBox.length) {
            var size = $('.hotelInfo_numb_people').size();
            console.log(size)
            $('.hotelInfo_numb_people').eq(size-1).remove();
            //roomBox_first.parentNode.removeChild(roomBox[roomBox.length - 1]);
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
                $('.sc-content2').append(section, roomBox[lastIndex].nextElementSibling);
            }
        }
        this.add_subtract();
    },
    //   儿童逻辑
    extraChildTemp:function(i, n,box){
        var age = box.getElementsByClassName('inp-cage')[0].value;
        if(age != ''){
            if (n == 1) {
                if (i == 2) {
                    return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '"><i class="child-sui">岁</i>' + '</div>';
                } else {
                    return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age+'"" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
            }
        }else {
            if (n == 1) {
                if (i == 2) {
                    return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                } else {
                    return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>';
                }
            } else if (i == 1) {
                return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>';
            } else if (i == 2) {
                return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon ico_select"></b></span>' + '</div>';
            }
        }
        this.addbed();
    },
    //   加房间
    extraRoomTemp:function(i){
        return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per-price-control" data-type="adult"><span class="cut-down-btn" id="adult-down"></span><i class="cut-up-cont adult-people-number" data-type="adultNum" id="adult-people-number">2</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child-age">(' + 2 + '-' + 12 + ')岁</span>' + '<div class="per-price-control" data-type="extraChild"><span class="cut-down-btn"></span><i class="cut-up-cont child-number" data-type="childNum">0</i><span class="plus-btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp-cage" type="tel" value placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child-sui">岁</i>' + '</div>' + '<div class="numbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="icon noselect"></b></span>' + '</div>' + '</div>';
    },
    domAfter:function(dom, html){
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
    //   切换往返城市
    addHandler: function (target, eventType, handle) {
        if (document.addEventListener) {
            this.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            this.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            this.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        this.addHandler(target, eventType, handle);
    },
    tangleCity:function(){
        var oDivs=document.querySelectorAll('.place');
        for(var i = 0;i < oDivs.length;i++) {
            oDivs[i].current = 0;
            this.addHandler(oDivs[i], 'click', function(event){
                var startStr = this.querySelector('.origin ').innerHTML;
                var startCode = $(".origin").attr("data-citycode");
                var endStr = this.querySelector('.destination').innerHTML;
                var endCode = $(".destination").attr("data-citycode");
                var event = event || window.event;
                var target = event.target || event.srcElement;
                if(target.className.indexOf('span-target')!=-1){
                    var oSpan = this.querySelector('span');
                    oSpan.style.transition = '0.7s all ease';
                    oSpan.style.webkitTransition = '0.7s all ease';
                    this.current = (this.current + 180);
                    oSpan.style.transform = 'rotate(' + this.current + 'deg)';
                    oSpan.style.webkitTransform = 'rotate(' + this.current + 'deg)';
                    this.querySelector('.origin ').innerHTML=endStr;
                    $(".origin").attr("data-citycode",endCode);
                    this.querySelector('.destination ').innerHTML=startStr;
                    $(".destination").attr("data-citycode",startCode);
                }
            });
        }
    },
    //   页面跳转
    nextPage:function(){
        var exaddChild = document.getElementsByClassName('extraChild');
        for (var v = 0; v < exaddChild.length; v++) {
            if (exaddChild[v].style.display != 'none') {
                var input = exaddChild[v].getElementsByClassName("inp-cage");
                for (var w = 0; w < input.length; w++) {
                    if(input[w].value == '')
                    {
                        jAlert('请输入儿童年龄!');
                        return;
                    }else if(input[w].value < 2|| input[w].value > 12) {
                        jAlert('儿童年龄不符合标准!');
                        return;
                    }
                }
            }
        }

        var FromCityNameCN = $('.origin').html() ;
        var ToCityNameCN = $('.destination').html();
        var fromCity = $('.origin').attr("data-citycode");
        var toCity = $('.destination').attr("data-citycode");
        var departDate = $('#startData').attr("data-startdata") + 'T00:00:00';
        var returnDate = $('#returnData').attr("data-returndata") + 'T00:00:00';
        var mstartday = $('#mstartday').html();
        var mendday = $('#mendday').html();
        var stardWeek = $('.double-week-one').html();
        var endWeek = $('.double-week-two').html();
        var roomDetails = [],echChildNum = [];
        var room = $('.hotelInfo_numb_people');
        for(var r = 0;r < room.length;r++){
            var temObj = {},childWithOutBed = [], childWithBed = [];
            var temAdultNum = parseInt(room[r].querySelector('#adult-people-number').innerHTML);
            var temChildNum = parseInt(room[r].querySelector('.child-number').innerHTML);
            var extraChild = room[r].querySelector('.extraChild');
            var childChooseParent = extraChild.querySelectorAll('.numbList');
            if(temAdultNum==1&&temChildNum==1){
                childWithBed.push(room[r].querySelector('input').value);
            }else if(temAdultNum==1&&temChildNum==2){
                childWithBed.push(room[r].querySelectorAll('input')[0].value);
                childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
            }else if(temAdultNum == 2||temAdultNum == 3){
                for (var s = 0; s < childChooseParent.length; s++) {
                    var ty = childChooseParent[s];
                    var tt = ty.querySelector('.icon.noselect');
                    if (temChildNum == 1) {
                        if (tt.className.indexOf('ico_select') > -1) {
                            childWithBed.push(ty.parentNode.querySelector('input').value);
                        } else {
                            childWithOutBed.push(ty.parentNode.querySelector('input').value)
                        }
                    }else if (temChildNum == 2){
                        childWithBed.push(room[r].querySelectorAll('input')[0].value);
                        childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
                    }
                }
            }
            childWithBed.length > 0 ? temObj.childWithBed = childWithBed :
                void (0);
            childWithOutBed.length > 0 ? temObj.childWithOutBed = childWithOutBed :
                void (0);
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
            FromCityNameCN:FromCityNameCN,
            ToCityNameCN:ToCityNameCN,
            FromCity:fromCity,
            ToCity:toCity,
            DepartDate:departDate,
            ReturnDate:returnDate,
            PeopleNum:allNum,
            AdultNum:adultNum,
            ChildNum:childNum,
            RoomInfo:roomDetails
        };
        var cacheSearch = {
            FromCityNameCN:FromCityNameCN,
            ToCityNameCN:ToCityNameCN,
            FromCityCode:fromCity,
            ToCityCode:toCity,
            DepartDate:mstartday,
            ReturnDate:mendday,
            StardWeek:stardWeek,
            EndWeek:endWeek,
            RoomInfo:roomDetails,
            ChildNum:echChildNum
        };
        console.log(searchInfo);
        localStorage.setItem('searchInfo', JSON.stringify(searchInfo));
        sessionStorage.setItem('cacheSearch', JSON.stringify(cacheSearch));
        window.location.href = 'ticket_hotel_choose.html';
    },
    init:function(){
        window.sessionStorage.removeItem('flightHotelAllData');//清除缓存信息
        this.initRoom();
        this.add_subtract();
        //this.tangleCity();    城市置换功能暂时不用
    }
};
hf_search.init();
//儿童年龄纯数字
function setAge(obj){
    obj.value=obj.value.replace(/\D/ig,'');
}
function checkAge(obj){
  if(parseInt(obj.value) < 2 || parseInt(obj.value) > 12){
    jAlert('儿童年龄不符合标准!');
    obj.value = '';
  }
}
$('#search-button').click(hf_search.nextPage);
