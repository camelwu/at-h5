/**
 * Created by heyong on 2015/12/24.
 */
(function () {
    "use strict";
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var str = window.location.href, data = str.slice(str.indexOf('?') + 1).split('&'), json = {}, startDate, endDate, FrontPgImage;
    for (var i = 0; i < data.length; i++) {
        json[data[i].split('=')[0]] = data[i].split('=')[1] == "true" || data[i].split('=')[1] == "false" ? JSON.parse(data[i].split('=')[1]) : data[i].split('=')[1];
    }

    for (var temp in json) {
        json[temp] = (temp == 'NumAdult' || temp == 'NumChild' || temp == 'NumRoom') ? parseInt(json[temp]) : json[temp];
    }
    startDate = json.CheckInDate;
    endDate = json.CheckOutDate;
    FrontPgImage = json.FrontPgImage;
    var data =
    {
        Parameters: JSON.stringify(json),
        Code: "0008",
        ForeEndType: 3
    };

    var c = new vcm();
    c.loadJson("", JSON.stringify(data), myCallback);


    function myCallback(d) {
        document.querySelector('#preloader').style.display = "none";
        var d = JSON.parse(d);
        if (window.localStorage) {
            window.localStorage.setItem('hotelMessage', JSON.stringify(d.Data));
        }
        var allContent = document.getElementsByClassName('all-elements')[0];
        var star = StarRatingName(d.Data[0].HotelGenInfo.StarRatingName);
        var htmlStr = '';
        htmlStr += ' <div class="imageContainer" onclick="hideZone.call(this)"><h5></h5><div class="showZone"><div class="innerContainer" style="left: 0px; width: 0%;"> ' +
        '<div class="noImage" style="width: 100%;height: 100%;text-align: center;">' + getImages(d.Data[0].HotelGenInfo.HotelImage) + '</div>' +
        '</div></div></div><div class="top" id="vlm-login"><a href="hotel_list.html" class="d-icons"></a>' +
        '<p class="d-p1">' + hotelName(d.Data[0].HotelGenInfo.HotelName) + '</p><a href="#" class="d-icon d1"></a></div>' +
        '<div class="d-div1"><img class="hotelPic" onclick="locationA();"  src="' + FrontPgImage + '" />' +
        '<div class="d-div2" onclick="showImage.call(this)"><div class="d-p4">' + d.Data[0].HotelGenInfo.HotelImage.length + '张</div></div>' +
        '</div>';


        htmlStr += '<ul class="d-ul1"><li class="d-li1"><div class="d-score"><span' +
        'style="color:#8ed1cc;font-size:15px;font-weight: 600;">' + d.Data[0].HotelGenInfo.TAAvgRating + '</span><span>分/' + d.Data[0].HotelGenInfo.TAReviewCount + '人点评</span></div> <a href="#" class="d-icon1"></a></li> ' +
        '<li class="d-li1"><div class="d-score">' + d.Data[0].HotelGenInfo.HotelAddress + '</div><a href="#" class="d-icon1"></a> ' +
        '<div class="d-p2">地图</div></li><li class="d-li1"><div class="d-score2">' + star + '</div><b class="d-icon2"></b><a href="#" class="d-icon1"></a></li>' +
        '<li class="d-li1"><div class="d-p3">' + getDates(startDate)[1] + '-' + getDates(startDate)[2] + '入住</div> ' +
        '<div class="d-p3" style="margin-left: 5px;">' + getDates(endDate)[1] + '-' + getDates(endDate)[2] + '离店</div><a href="#" class="d-icon1"></a> ' +
        '<div class="d-p2">共' + (new Date(endDate).getDate() - new Date(startDate).getDate() + 1) + '晚</div></li>'

        for (var i = 0; i < d.Data[0].HotelRoomsList.length; i++) {
            htmlStr += '<li class="d-li1"><div class="d-div3 roomEvent" style="max-width: 60%" onclick="test2.call(this)"><div class="d-p5">' + d.Data[0].HotelRoomsList[i].RoomName + '</div><b class="d-icon3"' +
            '></b><div class="d-p6">32-38㎡ 大/双床</div></div><a href="#" class="d-icon5" onclick="toggleStatus.apply(this)"></a> ' +
            '<div class="price"><span style="font-size:0.8em;color:#fe4716;">￥</span><span' +
            'style="font-size:2em;font-weight: 600;color:#fe4716;">' + firstPrices(d.Data[0].HotelRoomsList[i]) + '</span><span' +
            'style="font-size:0.8em;color:#999999;">起</span></div>' +
            '<ul class="roomUl"><li class="d-li1" style="width:94%;background: #dfdfdd">' +
            '<div class="d-div3" style="max-width: 60%"><div class="d-p5">标准价</div>' +
            '<div class="d-p7"><span>无早 大床 不可取消</span><span style="color: #fe4716"> 仅剩2间</span></div></div>' +
            '<div class="d-but">预订</div>' +
            '<div class="price2"><span' +
            'style="font-size:0.8em;color:#fe4716;">￥</span><span' +
            'style="font-size:2em;font-weight: 600;color:#fe4716;">' + firstPrices(d.Data[0].HotelRoomsList[i]) + '</span></div></li> ' +
            '<li class="d-li1" style="width:94%;background: #dfdfdd;border-top: 1px solid #FFF">' +
            '<div class="d-div3" style="max-width: 60%"><p class="d-p5">含早</p>' +
            '<div class="d-p7"><span>无早 大/双床 免费取消</span></div></div><div class="d-but">预订</div>' +
            '<div class="price2"><span' +
            'style="font-size:0.8em;color:#fe4716;">￥</span><span' +
            'style="font-size:2em;font-weight: 600;color:#fe4716;">' + firstPrices(d.Data[0].HotelRoomsList[i]) + '</span></div></li></ul>' +
            '</li>'
        }

        htmlStr += '</ul><div class="r-div" id="r-mb"></div><div class="roomAll" id="roomAll"></div>'
        allContent.innerHTML = htmlStr;


        document.querySelectorAll('.innerContainer')[0].style.width = d.Data[0].HotelGenInfo.HotelImage.length != 0 ? (100 * d.Data[0].HotelGenInfo.HotelImage.length) + "%" : "100%";
        if (document.querySelectorAll('.innerContainer>img').length) {
            for (var m = 0, images = document.querySelectorAll('.innerContainer>img'); m < images.length; m++) {
                images[m].style.width = innerWidth + "px";
            }
        }


        var roomDetail = document.getElementsByClassName('roomEvent');

        for (var i = 0; i < roomDetail.length; i++) {
            roomDetail[i].index = i;
            roomDetail[i].indexInfo = d.Data[0].HotelRoomsList[i];
            roomDetail[i].HotelID = d.Data[0].HotelGenInfo.HotelCode;

        }


        changeShow();

    }

    function getImages(arg) {
        if (arg == "") {
            return '<div class="noImage" style="width: 100%;height: 100%;text-align: center;color:#FFF">暂无图片</div>';
        }
        var str = "";
        for (var i = 0; i < arg.length; i++) {
            str += '<img src="' + arg[i] + '"/>'
        }
        return str;
    }

    function StarRatingName(starStr) {
        switch (starStr.charCodeAt(0)) {
            case 48:
                return '零星级';
                break;
            case 49:
                return '一星级';
                break;
            case 50:
                return '二星级';
                break;
            case 51:
                return '三星级';
                break;
            case 52:
                return '四星级';
                break;
            case 53:
                return '五星级';
                break;
            case 54:
                return '五星级';
                break;
            default:
                return '无星级';
                break;

        }
    };
    function getDates(arg) {
        return /^\d{4}\-(\d{1,2})\-(\d{1,2})/g.exec(arg)
    }

    function hotelName(arg) {
        return arg.indexOf('(') != -1 ? arg.slice(0, arg.indexOf(' (')) + '<br/>' + arg.slice(arg.indexOf(' (') + 1) : arg;
    }

    function images(arg) {
        return arg == "" ? '<img class="hotelPic" src="images/03-1_02.jpg">' : '<img class="hotelPic" src="' + arg[4] + '">';
    }


    function firstPrices(arg) {
        var firstPrices = arg.AvgPrice || "";
        return firstPrices;
    }

    function itemInfo(arg) {
        var itemStr = '';
        itemStr += arg.IsFreeWifi == true ? '<span class="morning">无早</span>' : '';
        itemStr += arg.bed == true ? '<span class="bed">大床</span>' : '';
        itemStr += '<span class="cancel">不可取消</span>';
        itemStr += arg.lastRoom == true ? '<span class="lastRoom">仅剩' + arg.lastRoom + '间</span>' : '';
        return itemStr;
    }

    function itemInfoTwo(arg) {
        var itemStr = '';
        itemStr += arg.IsFreeWifi == true ? '<span class="morning">双早</span>' : '';
        itemStr += arg.bed == true ? '<span class="bed">大/双床</span>' : '';
        itemStr += '<span class="cancel">免费取消</span>';
        itemStr += arg.lastRoom == true ? '<span class="lastRoom">仅剩' + arg.lastRoom + '间</span>' : '';
        return itemStr;
    }

    function changeShow() {
        var innerWidth = window.innerWidth, innerHeight = window.innerHeight,
            showZone = document.querySelectorAll('.showZone')[0],
            totalNum = document.querySelectorAll('.innerContainer>img').length,
            titleIndex = showZone.previousSibling,
            minLeftValue = -innerWidth * (totalNum - 1);

        if (totalNum == 0) {
            return false;
        } else {
            init();
        }
        function init() {
            titleIndex.indexNum = 1;
            titleIndex.innerText = titleIndex.indexNum + '/' + totalNum;
            showZone.addEventListener('touchstart', start, false);
            showZone.addEventListener('touchmove', move, false);
            showZone.addEventListener('touchend', end, false);
            showZone.getElementsByClassName('innerContainer')[0].isTransitionEnd = true;
        }


        function start(e) {
            this.innerContainer = this.getElementsByClassName('innerContainer')[0];
            this.startX = e.changedTouches[0].pageX;
            this.innerContainer.addEventListener('webkitTransitionEnd', changeEnd);
        }


        function changeEnd() {
            this.isTransitionEnd = true;
            // this.previousSibling.innerText=this.previousSibling.indexNum+"/"+totalNum;


        }


        function move(e) {
            var moveX = e.changedTouches[0].pageX;
            var changePos = moveX - this.startX;
            if (this.innerContainer.isTransitionEnd) {
                this.innerContainer.isTransitionEnd = false;
                console.log(changePos)
                if (changePos > 0) {
                    if (titleIndex.indexNum - 1 <= 0) {
                        this.innerContainer.style.left = 0 + "px";
                        titleIndex.indexNum = 1;
                        titleIndex.innerText = titleIndex.indexNum + '/' + totalNum;
                        this.innerContainer.isTransitionEnd = true;
                    } else {
                        this.innerContainer.style.left = parseFloat(this.innerContainer.style.left) + innerWidth + "px";
                        titleIndex.indexNum -= 1;
                        titleIndex.innerText = titleIndex.indexNum + '/' + totalNum;

                    }
                } else {
                    if (titleIndex.indexNum + 1 > totalNum) {
                        this.innerContainer.style.left = minLeftValue + "px";
                        titleIndex.indexNum = totalNum;
                        titleIndex.innerText = titleIndex.indexNum + '/' + totalNum;
                        this.innerContainer.isTransitionEnd = true;

                    } else {
                        this.innerContainer.style.left = parseFloat(this.innerContainer.style.left) - innerWidth + "px";
                        titleIndex.indexNum += 1;
                        titleIndex.innerText = titleIndex.indexNum + '/' + totalNum;

                    }

                }
            }


        }

        function end(e) {
            //this.getElementsByClassName('innerContainer')[0].isTransitionEnd=true;
        }

    }


})()


function showDetail() {
    var str = window.location.href, data = str.slice(str.indexOf('?') + 1).split('&'), json = {}, startDate, endDate;

    var json = {HotelID: 1, CultureName: "en - US"}

    var data = {
        Parameters: {"HotelID": 1, "CultureName": "en - US"},
        ForeEndType: 3,
        Code: "0010"
    }

    console.log(JSON.stringify(data))

    var c = new vcm();
    c.loadJson("", JSON.stringify(data), myCallback);


    var room = document.getElementById("room");
    var roomAll = document.getElementById("roomAll");
    var mb = document.getElementById("r-mb");
    room.style.display = "block";
    roomAll.style.display = "block";
    mb.style.display = "block";

}


function showImage() {
    var imageContainer = document.querySelector('.imageContainer');
    imageContainer.style.display = 'block';
    // document.querySelector('.all-elements>ul').style.display='none';

}

function closeRoom() {
    var room = document.getElementById("room");
    var roomAll = document.getElementById("roomAll");
    var mb = document.getElementById("r-mb");
    room.style.display = "none";
    mb.style.display = "none";
    roomAll.style.display = "none";
}

function hideZone() {
    this.style.display = "none";
}

function toggleStatus() {
    var roomUls = document.getElementsByClassName('roomUl');
    for (var i = 0; i < roomUls.length; i++) {
        roomUls[i].parentNode.getElementsByTagName('a')[0].className = 'd-icon5';
        roomUls[i].className = "roomUl"
    }
    if (this.isOpen) {
        this.parentNode.getElementsByClassName('roomUl')[0].className = 'roomUl hide';
        this.className = 'd-icon5';
        this.isOpen = false;
    } else {
        this.parentNode.getElementsByClassName('roomUl')[0].className = 'roomUl show';
        this.isOpen = true;
        this.className = 'd-icon4';
    }


}

function locationA() {
    window.location.href = "jyy_hotelSummary.html";
}

function changeImage(e) {
   // console.log(e)
}

function getRoomE(arg) {
    var str_ = '';
    for (var k = 0; k < arg.HotelRoomAmenitiesList.length; k++) {
        if (arg.HotelRoomAmenitiesList[k].RmTypeCode == 0) {
            str_ += '<li class="r-li"><b class="r-icon2"></b>' +
            '<p class="r-p3">' + arg.HotelRoomAmenitiesList[k].FeatureDesc + '</p></li>';
        }
    }
    return str_;
}

function getRoomInfor(HotelID, indexInfo) {
    var Parameter = {
        "Parameters": "{\"HotelID\":" + HotelID + ",\"CultureName\":\"zh-CN\" }",
        "ForeEndType": 3,
        "Code": "0010"
    }
    var c = new vcm();
    c.loadJson("", JSON.stringify(Parameter), myCallbackRoom);
    function myCallbackRoom(result) {
        var result = JSON.parse(result)
        var str = '';
        str += ' <div class="room" id="room"><header class="r-top"><p class="r-p1">' + indexInfo.RoomName + '</p><b class="r-icon1" onclick="closeRoom()"></b></header>' +
        '<div class="r-div1"><img class="hotelPic2" src="' + getRoomImage(result) + '"></div>' +
        '<article class="r-ar">最多' + indexInfo.MaxOccupancy + '成人<br>儿童10岁或以上按照成人算。&nbsp;&nbsp;10岁以下的儿童按照酒店的具体规定一般免费（但不提供早餐和加床）。婴儿（1岁以下）如果使用现有的床铺可免费入住。请注意，如果您需要一个婴儿床可能有额外收费' +
        '</article><hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间描述</p>' +
        '<article class="r-ar">Newly refurbished Deluxe Rooms are a unique expression of stylish comfort.Featuring' +
        'plenty of naturallight,contemporary designs with rich wood furnishings,refreshing touches of colour' +
        'high qualitfinishes,these spacious and energy-efficient rooms include a thoughtfullly appointed' +
        'workspace,a wideselection of channels for in-room entertainment,as well as comlplimentary Internet' +
        'access.' +
        '</article><hr size="1px" width="100%" color="#ececec"><p class="r-p2" style="">房间设施</p>' +
        '<ul class="r-ul">' + getRoomE(result.Data[0]) + '</ul></div>';


        document.getElementById('roomAll').innerHTML = str;
        document.getElementById('roomAll').style.display = 'block';
        document.getElementById('roomAll').style.zIndex = 1000;
        document.getElementById('r-mb').style.display = 'block';
    }
}

function test2() {
    getRoomInfor(this.HotelID, this.indexInfo)
}

function getRoomImage(arg) {
    var realImage = new Array();
    var imageData = arg.Data[0].HotelRoomFeaturesList;
    for (var m = 0; m < imageData.length; m++) {
        if (imageData[m].ImageFileName != '') {
            realImage.push(imageData[m])
        }
    }

    if (realImage.length) {
        return realImage[0].ImageFileName;
    }
}












