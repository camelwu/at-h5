window.onload = function () {

    var hotelMessage = window.localStorage.getItem('hotelDetailData');

    if (!hotelMessage) {return false;}
     else{
        document.body.removeChild(document.getElementById('preloader'));

        addContent(hotelMessage);
        function addContent(hotelMessage) {
            var hotelDesc = document.querySelector('.s-content1');
            var scenicSpot = document.querySelectorAll('.s-ul1')[0];
            var scenicSpot = document.querySelectorAll('.s-ul1')[0];
            var hotelFeature = document.querySelectorAll('.s-ul2')[0];

            hotelMessage = JSON.parse(hotelMessage).data.Data[0].HotelGenInfo;
            hotelDesc.innerText = hotelMessage.HotelDesc;
            scenicSpot.innerHTML = getAllSpot(hotelMessage);
            hotelFeature.innerHTML = getFeature(hotelMessage);

            function getAllSpot(arg) {
                var str = '';
                if (arg.scenicSpotData) {
                    for (var i = 0; i < arg.scenicSpotData.length; i++) {
                        str += '<li class="ul1-li"><p class="f-l">' + arg.scenicSpotData[i].a + '</p><p class="f-r">' + arg.scenicSpotData[i].b + '</p></li>';
                    }
                } else {
                    str += '<li class="ul1-li"><p class="f-l">暂无附近景点信息</p></li>';
                }
                return str;
            }

            function getFeature(arg) {
                var str = '';
                if (arg.hotelFeature) {
                    for (var i = 0; i < arg.length; i++) {
                        str += '<li class="ul2-li"><b class="s-icon3" style="margin-bottom:0px"></b><p class="s-p4">' + arg[i].Feature + '</p></li>';
                    }
                } else {
                    str += '<li class="ul2-li"><p class="s-p4">暂无酒店特色信息</p></li>'
                }

                return str;
            }

        }
    }







}