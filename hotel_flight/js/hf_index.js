/**
 * Created by Venson on 2016/4/18.
 */
var hf_search = {
    toUp:function(m, n, n_1){
        var _type = n.parentNode.getAttribute("data-type");
        var str = '', temAll = 0, roomEle = '';
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
                    // n.style.backgroundPosition = '-51px 2px';
                } else if (str > 2) {
                    jAlert('单个房间儿童数不能超过2人!', '提示');
                    return;
                } else {
                    m.innerHTML = str;
                }
                this.extraChild(n.parentNode.parentNode, str);
            } else if (_type == "extraRoom") {
                str = m.innerHTML;
                str = Number(str);
                str = str + 1;
                if (str > 5) {
                    jAlert('最多选择5个房间!', '提示');
                } else {
                    m.innerHTML = str;
                    extraRoom(n.parentNode.parentNode, str);
                }
            } else if (_type == "adult") {
                var adultdown = n.parentNode.getElementsByClassName('cut-down-btn')[0];
                adultdown.style.backgroundPosition = '-51px 2px';
                //if (onlyForAdult) {
                //    str = m.innerHTML;
                //    str = Number(str);
                //    str = str + 1;
                //    temAll = str;
                //    if (temAll > roomMaxNum) {
                //        jAlert('单个房间最多人数不能超过' + roomMaxNum + '人!', '提示');
                //        return;
                //        // n.style.backgroundPosition = '-51px 2px';
                //    } else if (temAll > 3) {
                //        jAlert('单个房间成人数不能超过3人!', '提示');
                //        return;
                //    } else {
                //        m.innerHTML = str;
                //    }
                //} else {
                    str = m.innerHTML;
                    str = Number(str);
                    str = str + 1;
                    temAll = Number(roomEle.querySelector('.child-number').innerHTML) + str;
                    if (temAll > 5) {
                        jAlert('单个房间最多人数不能超过5人!', '提示');
                        return;
                        //n.style.backgroundPosition = '-51px 2px';
                    } else if (str > 3) {
                        jAlert('单个房间成人数不能超过3人!', '提示');
                        return;
                    } else {
                        m.innerHTML = str;
                    }
                    var parent = n.parentNode.parentNode.parentNode;
                    var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
                    changeChildTemp(parent,str,ChildNum);
                //}
            }
        };
    },
    toDown:function(m, n){
        var _type = n.parentNode.getAttribute("data-type");
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
                str == 1 ? n.style.backgroundPosition = '-26px 2px' : n.style.backgroundPosition = '-51px 2px';
            } else if (n.id == 'adult-down') {
                if (str <= 1) {
                    m.innerHTML = 1;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 1 ? n.style.backgroundPosition = '-26px 2px' : n.style.backgroundPosition = '-51px 2px';
                var parent = n.parentNode.parentNode.parentNode;
                var ChildNum = parseInt(parent.querySelector('.child-number').innerHTML);
                changeChildTemp(parent,str,ChildNum);
            } else {
                if (str <= 0) {
                    m.innerHTML = 0;
                } else {
                    str = str - 1;
                    m.innerHTML = str;
                }
                str == 0 ? n.style.backgroundPosition = '-26px 2px' : n.style.backgroundPosition = '-51px 2px';
            }
            _type == "extraChild" && this.extraChild(n.parentNode.parentNode, str);
            _type == "extraRoom" && extraRoom(n.parentNode.parentNode, str);
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
            if (i == 0) {
                str == 1 ? _cut_down_btn[i].style.backgroundPosition = '-26px 2px' : _cut_down_btn[i].style.backgroundPosition = '-51px 2px';
            } else {
                str == 0 ? _cut_down_btn[i].style.backgroundPosition = '-26px 2px' : _cut_down_btn[i].style.backgroundPosition = '-51px 2px';
            }
        }
        addbed();
    },
    //   加减儿童
    extraChild:function(dom, numb){
        alert(1);
        var _bedBox = dom.parentNode.getElementsByClassName('extraChild'), _html = '';
        var adultPeople = parseInt(dom.parentNode.getElementsByClassName('adult-people-number')[0].innerHTML);
        if (numb == 0 && _bedBox.length == 1) {
            _bedBox[0].style.display = 'none';
        } else {
            var _listHtml;
            _bedBox[0].style.display = 'block';
            _listHtml = extraChildTemp(numb, adultPeople);
            //'';
            /*for (var i = 1; i <= numb; i++) {
             _listHtml += extraChildTemp(i);
             }*/
            if (_bedBox.length == 0) {
                _html = '<div class="extraChild">';
                domAfter(dom, _html + _listHtml + '</div>');
                _listHtml = extraChildTemp(numb, adultPeople);
            } else {
                _bedBox[0].innerHTML = _listHtml;
                _listHtml = extraChildTemp(numb, adultPeople);
            }
        }
        this.add_subtract();
    },
    //   页面跳转
    nextPage:function(){
        $('#search-button').click(function(){
            window.location.href = 'ticket_hotel_choose.html';
        })
    },
    init:function(){
        //this.toUp();
        //this.toDown();
        this.add_subtract();
        this.nextPage();

    }
};
hf_search.init();