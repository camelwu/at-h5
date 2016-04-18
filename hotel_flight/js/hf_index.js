/**
 * Created by Venson on 2016/4/18.
 */
var hf_search = {
    //   页面跳转
    nextPage:function(){
        $('#search-button').click(function(){
            window.location.href = 'ticket_hotel_choose.html';
        })
    },
    init:function(){
        this.nextPage();
    }
};
hf_search.init();