/**
 * Created by heyong on 2015/12/28.
 */

window.onload=function(){
    if(window.localStorage){
        var hotelMessage = window.localStorage.getItem('hotelMessage');
        window.localStorage.removeItem('hotelMessage');
    };
    addContent(hotelMessage);
    function addContent(hotelMessage){
      var hotelDesc = document.querySelector('.s-content1');
          hotelDesc.innerText =JSON.parse(hotelMessage)[0].HotelGenInfo.HotelDesc;

/*
       var scenicSpot = document.querySelector('.s-p3');
        //  scenicSpot.innerText =JSON.parse(hotelMessage)[0].HotelGenInfo.HotelDesc;

        function getAllSpot(arg){
            var str = '<ul class="s-ul1">';
            for(var i=0;i<arg.length;i++){
                str+='<li class="ul1-li"><p class="f-l">arg[i]['name']</p><p class="f-r">arg[i]['disdance']</p></li>';
            }
            str+=' </ul>';
            return str;
         }


         function getFeature(arg){
            var str = '<ul class="s-ul2">';
            for(var i=0;i<arg.length;i++){
                str+='<li class="ul2-li"><b class="s-icon3" style="margin-bottom:0px"></b><p class="s-p4">arg['featureIndex']</p></li>';
            }
            str+=' </ul>';
            return str;
        }
*/

    }
}