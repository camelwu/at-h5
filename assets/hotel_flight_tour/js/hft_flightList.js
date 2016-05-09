/**
 * Created by Venson on 2016/5/9.
 */
var flightList = {
    bottomEvent:function(){
        var shadow = document.getElementById('mbShadow');
        var rank = document.getElementById('rankBox');
        var screen = document.getElementById('screenBox');
        $('.fo_div').click(function(){
            $(this).css('backgroundColor','#2a2a2a');
        });
        var showFunction = function(obj){
            shadow.style.display = 'block';
            obj.style.transition = 'all 300ms ease-in';
            obj.style.bottom = '1rem';
        };
        var closeFunction = function(obj){
            shadow.style.display = 'none';
            obj.style.transition = 'all 300ms ease-in';
            obj.style.bottom = '-126%';
            $('.fo_div').removeAttr('style');
        };
        //   航空公司筛选
        $('#foAirway').click(function(){
            $('#awContent').show();
            $('#pageBack').hide();
            $('#closeAirw').show();
        });
        $('#closeAirw').click(function(){
            $('#foAirway').removeAttr('style');
            $('#awContent').hide();
            $('#closeAirw').hide();
            $('#pageBack').show();
        });
         //  排序
        $('#foRank').click(function(){
            showFunction(rank);
        });
        $('.rank_item').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            closeFunction(rank);
        });
        //  筛选
        $('#foScreen').click(function(){
            showFunction(screen);
        });
        $('.title_li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            switch($(this).attr('id')){
                case 'directFly':
                    $('#directFlyDetail').show().siblings().hide();
                    break;
                case 'share':
                    $('#shareDetail').show().siblings().hide();
                    break;
                case 'flyTime':
                    $('#flyTimeDetail').show().siblings().hide();
                    break;
                default :
                    void(0);
            }
        });
        $('.screen_item').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
        var clearSib = function(box){
            var li = box.getElementsByTagName('li');
            for(var i = 0;i < li.length;i++){
                li[i].className = 'screen_item';
            }
        };
        //  筛选按钮
        $('.screen_btn').click(function(){
            var directLi = document.getElementById('directFlyDetail').getElementsByTagName('li');
            var shareLi = document.getElementById('shareDetail').getElementsByTagName('li');
            var timeLi = document.getElementById('flyTimeDetail').getElementsByTagName('li');
            switch($(this).index()){
                case 0:
                    closeFunction(screen);
                    break;
                case 1:
                    clearSib(directLi[0].parentNode);
                    clearSib(shareLi[0].parentNode);
                    clearSib(timeLi[0].parentNode);
                    directLi[0].className = 'screen_item active';
                    shareLi[0].className = 'screen_item active';
                    timeLi[0].className = 'screen_item active';
                    break;
                case 2:
                    closeFunction(screen);
                    break;
                default :
                    void(0);
            }
        });
         //
        $('#mbShadow').click(function(event){
            var event = event || window.event;
            var target = target || event.srcElement;
            if (target.className.indexOf('full_shadow') > -1) {
                closeFunction(rank);
                closeFunction(screen);
            }
        });
    },
    init:function(){
        this.bottomEvent();
    }
};
flightList.init();
