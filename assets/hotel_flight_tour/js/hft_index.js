/**
 * Created by Venson on 2016/5/6.
 */
var val = vlm.parseUrlPara(window.location.href);
var htf_search = {
  //  页面初始化
  init_title_room:function(){
      var indexTab = $('#indexTab')[0];
      var tab = indexTab.getElementsByTagName('div');
      if(val.isInit){

      }else{
          tab[0].className = 'tab active';
          $('#flightHotelBox').show();
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
      })
  },
  //  实现加减
  add_subtract:function(){
      var oNum = document.getElementsByClassName('cut_up_cont'), _plus_btn = document.getElementsByClassName('plus_btn'), _cut_down_btn = document.getElementsByClassName('cut_down_btn');
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
    //  页面跳转
    next_page:function(){
        $('#hft_searchBtn').click(function(){
            window.location.href = 'hft_choose.html';
        });
        $('#hf_searchBtn').click(function(){
            window.location.href = '../hotel_flight/ticket_hotel_choose.html';
        })
    },
    init:function(){
        this.init_title_room();
        this.next_page();
        //this.add_subtract();
    }
};
htf_search.init();
