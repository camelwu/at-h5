/**
 * Created by Venson on 2016/5/6.
 */
var val = vlm.parseUrlPara(window.location.href);
var htf_search = {
  //  页面初始化
  init_title_room:function(){
      var that = this;
      var indexTab = $('#indexTab')[0];
      var tab = indexTab.getElementsByTagName('div');
      var initStr_hf = '';
      var initStr_hft = '';
      var section;
      var search_hotel = document.getElementsByClassName('search_hotel');
      var hotelInfo_hf = search_hotel[0].querySelector('.hotelInfo_numb_room');
      var hotelInfo_hft = search_hotel[1].querySelector('.hotelInfo_numb_room');
      if(val.isInit){

      }else{
          tab[0].className = 'tab active';
          $('#flightHotelBox').show();
          var hotelInfo = document.querySelector('.hotelInfo_numb_room');
          $('#hf_roomNum').html(1);
          $('#hft_roomNum').html(1);
          initStr_hf = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' +'<b class="com_icon child_age_state"></b>'+ '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>'+'<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
          section = document.createElement('section');
          section.innerHTML = initStr_hf;
          section.className = 'hotelInfo_numb_people init-hotel-room-detail';
          search_hotel[0].insertBefore(section, hotelInfo_hf.nextSibling);
          initStr_hft = '<span class="title">房间1</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(2-12)岁</span>' +'<b class="com_icon child_age_state"></b>'+ '<div class="age_state_box"><div></div><div class="state_text"><span>·</span><span>儿童年龄限制为大于等于2周岁，小于12周岁的儿童。</span></div></div>' +'<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="(2-12)" onkeyup="setAge(this);" onblur="checkAge(this);"><i class="child_sui">岁</i>' + '</div>';
          section = document.createElement('section');
          section.innerHTML = initStr_hft;
          section.className = 'hotelInfo_numb_people init-hotel-room-detail';
          search_hotel[1].insertBefore(section, hotelInfo_hft.nextSibling);
      }
      $('.tab').click(function(){

          $(this).addClass('active').siblings().removeClass('active');
          if($(this).index() == 0){
              $('#flightHotelBox').show();
              $('#flightHotelTourBox').hide();
          }else{
              $('#flightHotelBox').hide();
              $('#flightHotelTourBox').show();
          }
        that.add_subtract();
      });
      $('.child_age_state').click(function(e){
          e.stopPropagation();
          $(this).siblings('.age_state_box').toggle();
      });
      $('body').click(function(e){
          e.stopPropagation();
          var age_state_box = document.getElementsByClassName('age_state_box');
          if(age_state_box[0].style.display!='none'||age_state_box[1].style.display!='none'){
              age_state_box[0].style.display = 'none';
              age_state_box[1].style.display = 'none';
          }
      });
  },
  //   加
  toUp:function(m, n, n_1){
      var _type = n.parentNode.getAttribute("data-type");
      var str = '', temAll = 0, roomEle = '', that=this;
      n.onclick = function() {
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
                  that.changeChildTemp(parent,str,ChildNum);
                  str == 3 ? n.style.backgroundPosition = '29.5% 68%' : n.style.backgroundPosition = '41.2% 68%';
          }
      };
  },
  //    儿童信息随成人信息更变
  changeChildTemp:function(box,n,i){
      var listStr = box.querySelector('.extraChild');
      var age1 = listStr.getElementsByClassName('inp_cage')[0].value;
      var age2;
      if(age1 != ''){
          if (n == 1) {
              if (i == 2) {
                  age2 = listStr.getElementsByClassName('inp_cage')[1].value;
                  if(age2 != ''){
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age2+'" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>';
                  }else{
                    listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>';
                  }
              } else {
                  listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
              }
          } else if (i == 1) {
              listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
          } else if (i == 2) {
              age2 = listStr.getElementsByClassName('inp_cage')[1].value;
              if(age2 != ''){
                  listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age2+'" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
              }else{
                  listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age1+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
              }
          }
      }else{
          if (n == 1) {
              if (i == 2) {
                  listStr.innerHTML = '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
              } else {
                  listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
              }
          } else if (i == 1) {
              listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
          } else if (i == 2) {
              listStr.innerHTML ='<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
          }
      }
      this.addbed();
  },
  //   减
  toDown:function(m, n){
      var _type = n.parentNode.getAttribute("data-type"),that = this;
      var plus = n.parentNode.getElementsByClassName('plus_btn')[0];
      n.onclick = function() {
          var str = m.innerHTML;
          str = Number(str);
          if (n.id == 'roomDown') {
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
              that.changeChildTemp(parent,str,ChildNum);
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
  addbed:function(){
      var addBed = document.getElementsByClassName('com_icon noselect');
      for (var j = 0; j < addBed.length; j++) { {( function(index) {
          addBed[j].onclick = function() {
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
  add_subtract:function(){
      var content_box = document.getElementsByClassName('content_box');
      var oNum, _plus_btn, _cut_down_btn;
      if(content_box[0].style.display != 'none'){
          oNum = content_box[0].getElementsByClassName('cut_up_cont');
          _plus_btn = content_box[0].getElementsByClassName('plus_btn');
          _cut_down_btn = content_box[0].getElementsByClassName('cut_down_btn');
      }else{
          oNum = content_box[1].getElementsByClassName('cut_up_cont');
          _plus_btn = content_box[1].getElementsByClassName('plus_btn');
          _cut_down_btn = content_box[1].getElementsByClassName('cut_down_btn');
      }
      for (var i = 0; i < oNum.length; i++) {
          this.toUp(oNum[i], _plus_btn[i], _cut_down_btn[i]);
          this.toDown(oNum[i], _cut_down_btn[i]);
          var str = parseInt(oNum[i].innerHTML);
          if(oNum[i].parentNode.getAttribute('data-type') == 'adult' || oNum[i].parentNode.getAttribute('data-type') == 'extraRoom'){
              str == 1 ? _cut_down_btn[i].style.backgroundPosition = '6.7% 68%' : _cut_down_btn[i].style.backgroundPosition = '17.5% 68%';
          }else{
              str == 0 ? _cut_down_btn[i].style.backgroundPosition = '6.7% 68%' : _cut_down_btn[i].style.backgroundPosition = '17.5% 68%';
          }
      }
      this.addbed();
  },
  //   加减儿童
  extraChild:function(dom, numb){
      var _bedBox = dom.parentNode.getElementsByClassName('extraChild'), _html = '';
      var adultPeople = parseInt(dom.parentNode.getElementsByClassName('adult_people_number')[0].innerHTML);
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
      var  content_box = document.getElementsByClassName('content_box');
      var _box;
      if(content_box[0].style.display != 'none'){
          _box = content_box[0];
      }else{
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
  extraChildTemp:function(i, n,box){
      var age = box.getElementsByClassName('inp_cage')[0].value;
      if(age != ''){
          if (n == 1) {
              if (i == 2) {
                  return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12 + '"><i class="child_sui">岁</i>' + '</div>';
              } else {
                  return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>';
              }
          } else if (i == 1) {
              return '<span class="bedList" style="float: left"><i>儿童' + i + '年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age+'"" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>';
          } else if (i == 2) {
              return '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value = "'+age+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<span class="bedList" style="float: left"><i>儿童2年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" placeholder="' + 2 + '-' + 12+'" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList spenumbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect ico_select"></b></span>' + '</div>';
          }
      }else {
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
  extraRoomTemp:function(i){
      return '<span class="title">房间' + i + '</span>' + '<div class="numbList">' + '<span class="n_tit">成人</span>' + '<div class="per_price_control" data-type="adult"><span class="cut_down_btn" id="adultDown"></span><i class="cut_up_cont adult_people_number" data-type="adultNum" id="adult_people_number">2</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="numbList">' + '<span class="n_tit">儿童</span>' + '<span class="child_age">(' + 2 + '-' + 12 + ')岁</span>' + '<div class="per_price_control" data-type="extraChild"><span class="cut_down_btn"></span><i class="cut_up_cont child_number" data-type="childNum">0</i><span class="plus_btn"></span></div>' + '</div>' + '<div class="extraChild" style="display: none">' + '<span class="bedList" style="float: left"><i>儿童1年龄</i></span>' + '<div class="childAge">' + '<input class="inp_cage" type="tel" value placeholder="' + 2 + '-' + 12 + '" onkeyup="setAge(this);" onblur="checkAge(this)"><i class="child_sui">岁</i>' + '</div>' + '<div class="numbList">' + '<span class="bedList" data-type="ifaddBed"><i>儿童加1床</i><b class="com_icon noselect"></b></span>' + '</div>' + '</div>';
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
  //  页面跳转
  next_page:function(){
      var getByClass = function(box,obj){
          return box.getElementsByClassName(obj);
      };
      var box;
      var content = document.getElementsByClassName('content_box');
      if(content[0].style.display != 'none'){
          box = content[0];
      }else{
          box = content[1];
      }
      var exaddChild = box.getElementsByClassName('extraChild');
      for (var v = 0; v < exaddChild.length; v++) {
          if (exaddChild[v].style.display != 'none') {
              var input = exaddChild[v].getElementsByClassName("inp_cage");
              for (var w = 0; w < input.length; w++) {
                  if(input[w].value == '')
                  {
                      jAlert('请输入儿童年龄!');
                      return;
                  }
              }
          }
      }
      var FromCityNameCN = getByClass(box,'origin')[0].innerHTML;
      var ToCityNameCN = getByClass(box,'destination')[0].innerHTML;
      var fromCity = getByClass(box,'origin')[0].getAttribute('data-citycode');
      var toCity = getByClass(box,'destination')[0].getAttribute('data-citycode');
      var departDate = getByClass(box,'js_startData')[0].getAttribute('data-day') + 'T00:00:00';
      var returnDate = getByClass(box,'js_returnData')[0].getAttribute('data-day') + 'T00:00:00';
      var startday = getByClass(box,'js_startDay')[0].innerHTML;
      var endday = getByClass(box,'js_endDay')[0].innerHTML;
      var stardWeek = getByClass(box,'week_one')[0].innerHTML;
      var endWeek = getByClass(box,'week_two')[0].innerHTML;
      var roomDetails = [],echChildNum = [];
      var room = getByClass(box,'hotelInfo_numb_people');
      for(var r = 0;r < room.length;r++){
          var temObj = {},childWithOutBed = [], childWithBed = [];
          var temAdultNum = parseInt(room[r].querySelector('.adult_people_number').innerHTML);
          var temChildNum = parseInt(room[r].querySelector('.child_number').innerHTML);
          var extraChild = room[r].querySelector('.extraChild');
          var childChooseParent = extraChild.querySelector('.numbList');
          if(temAdultNum==1&&temChildNum==1){
              childWithBed.push(room[r].querySelector('input').value);
          }else if(temAdultNum==1&&temChildNum==2){
              childWithBed.push(room[r].querySelectorAll('input')[0].value);
              childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
          }else if(temAdultNum == 2||temAdultNum == 3){
              var tt = childChooseParent.querySelector('.com_icon.noselect');
              if (temChildNum == 1) {
                  if (tt.className.indexOf('ico_select') > -1) {
                      childWithBed.push(childChooseParent.parentNode.querySelector('input').value);
                  } else {
                      childWithOutBed.push(childChooseParent.parentNode.querySelector('input').value)
                  }
              }else if (temChildNum == 2){
                  childWithBed.push(room[r].querySelectorAll('input')[0].value);
                  childWithOutBed.push(room[r].querySelectorAll('input')[1].value);
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
          DepartDay:startday,
          ReturnDay:endday,
          StardWeek:stardWeek,
          EndWeek:endWeek,
          RoomInfo:roomDetails,
          EchChildNum:echChildNum
      };
      localStorage.setItem('searchInfo', JSON.stringify(searchInfo));
      localStorage.setItem('cacheSearch', JSON.stringify(cacheSearch));
  },
  init:function(){
      this.init_title_room();
      this.add_subtract();
  }
};
htf_search.init();
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
$('#hft_searchBtn').click(function(){
  htf_search.next_page();
  window.location.href = 'hft_scenic_list.html?type=2';
});
$('#hf_searchBtn').click(function(){
  htf_search.next_page();
  window.location.href = '../hotel_flight/ticket_hotel_choose.html?type=1';
});
