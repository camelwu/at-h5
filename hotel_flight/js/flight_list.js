/**
 * Created by Venson on 2016/4/18.
 */
var flight_list = {
    //  页面跳转
    nextPage:function(){
        $('.seat-detail').click(function(){
            $(this).find('.hf-gou').addClass('cho-gou').parents().siblings().find('.hf-gou').removeClass('cho-gou');
            window.location.href = 'ticket_hotel_choose.html';
        });
        $('#fo_aw').click(function(){
            window.location.href = 'airway-list.html';
        })
    },
    init:function(){
        this.nextPage();
    }
};
flight_list.init();