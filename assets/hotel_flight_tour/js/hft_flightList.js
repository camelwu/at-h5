/**
 * Created by Venson on 2016/5/9.
 */
var val = vlm.parseUrlPara(window.location.href);
var changeFlightInfo,oldFlightInfo;
var data;
//var sendData = {
//  "flightCacheID": 3010900,
//  "flightSetID": 30000023,
//  "returnDate": "2016-05-27T00:00:00",
//  "packageID": 486978,
//  "roomDetails": [
//    {
//      "adult": 2
//    }
//  ],
//  "cityCodeTo": "SIN",
//  "departDate": "2016-05-22T00:00:00",
//  "cityCodeFrom": "BJS",
//  "pageNo": 1,
//  "tours": [
//    {
//      "travelDateSpecified": false,
//      "travelDate": "2016-05-22T00:00:00",
//      "optionCode": "",
//      "tourID": "166"
//    },
//    {
//      "travelDateSpecified": true,
//      "travelDate": "2016-05-23T00:00:00",
//      "optionCode": "",
//      "tourID": "2609"
//    }
//  ],
//  "pageSize": 20
//};
var flightList = {
    requestUrl:"",
    getWeekDay:function(date){
        var final_date = date.substr(0,10).replace(/-/g,'/');
        var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
        return week;
    },
    //格式化日期,
  formatDate:function(date,format) {
      if(date.indexOf('T')  > -1){
          date = date.replace("T"," ");
          if(date.indexOf("-") > -1){
            date = date.replace(/-/g,"/");
          }
          date = new Date(date);
      }
      var paddNum = function (num) {
          num += "";
          return num.replace(/^(\d)$/, "0$1");
      };
      //指定格式字符
      var cfg = {
          yyyy: date.getFullYear() //年 : 4位
          , yy: date.getFullYear().toString().substring(2)//年 : 2位
          , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
          , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
          , d: date.getDay()   //日 : 如果1位的时候不补0
          , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
          , hh: paddNum(date.getHours())  //时
          , mm: paddNum(date.getMinutes()) //分
          , ss: paddNum(date.getSeconds()) //秒
      };
      format || (format = "yyyy-MM-dd hh:mm:ss");
      return format.replace(/([a-z])(\1)*/ig, function (m) {
          return cfg[m];
      });
  },
    //   替换数组元素
  replaceElement:function(array,element,ch){
      for(var i = 0;i < array.length;i++){
          if(array[i] == element){
              array[i] = ch;
          }
      }
      return array;
  },
  getFlightList:function(){
      var that = this;
      var flightListBack = function(ret){
          var json = ret, that = flightList;
          console.log(json);
          data = json.data;
          var str1 = $("#tplFlightList").html();
          var flight_list = ejs.render(str1, data);
          document.getElementById('fligtList').innerHTML = flight_list;
          var str2 = $('#tplAirwayList').html();
          var airway_list = ejs.render(str2, data);
          document.getElementById('airwayList').innerHTML = airway_list;
          $.each($('.seat_detail'),function(i,item){
              if($(this).attr('data-setID')==oldFlightInfo.flightSetID){
                  $(this).find('b').addClass('cho_gou').siblings().find('b').removeClass('cho_gou');
              }
          });
          var airway = document.getElementsByClassName('airway');
          for(var i = 0;i < airway.length;i++){
              if(airway[i].getAttribute('data-airwaySetID') == changeFlightInfo.flightSetID){
                  airway[i].getElementsByClassName('hft_icon')[0].className = 'hft_icon cho_gou';
              }
          }
           $('.airway').click(function(){
             $(this).find('b').addClass('cho_gou');
             $(this).siblings().find('b').removeClass('cho_gou');
             $('#foAirway').removeAttr('style');
             $('#awContent').hide();
             $('#closeAirw').hide();
             $('#pageBack').show();
             changeFlightInfo.flightSetID = $(this).attr('data-airwaySetID');
             changeFlightInfo.flightCacheID = $(this).attr('data-airwayCacheID');
             that.tAjax("",changeFlightInfo,"60100005","2",flightListBack);
           });
          //  页面跳转
          $(".seat_detail").click(function(){
              $(this).find('b').addClass('cho_gou').parents().siblings().find('b').removeClass('cho_gou');
              var hftFlightHotelTourInfo = JSON.parse(sessionStorage.hftFlightHotelTourInfo);
              var setid = $(this).attr('data-setID');
              for(var i = 0;i < data.flightInfoListGroup.length;i++) {
                for (var j = 0; j < data.flightInfoListGroup[i].flightInfoList.length; j++) {
                  if (data.flightInfoListGroup[i].flightInfoList[j].setID == setid) {
                    hftFlightHotelTourInfo.flightInfo = data.flightInfoListGroup[i].flightInfoList[j];
                    hftFlightHotelTourInfo.flightInfo.setID = data.flightInfoListGroup[i].flightInfoList[j].setID;
                    hftFlightHotelTourInfo.flightInfo.cacheID =data.flightInfoListGroup[i].flightInfoList[j].cacheID;
                  }
                }
              }
              sessionStorage.hftFlightHotelTourInfo = JSON.stringify(hftFlightHotelTourInfo);
              hftFlightHotelTourInfo = JSON.parse(sessionStorage.hftFlightHotelTourInfo);
              var packageID = val.packageId;
              window.location.href = 'hft_choose.html?type=2';
          });
      };
      this.tAjax("",oldFlightInfo,"60100005","2",flightListBack);
      that.bottom();
  },
  bottom:function(){
    var menu_data = {
        hotelSort : {
          title : "航空公司",
          c : "airway",
          type : 1,
          key : 'airway',
          listData : data.airways
        },
        hotelScreen : {
          title : "快速排序",
          c : "sort",
          type : 1,
          key : 'starRatingList',
          listData : [{
            "星级档次" : ["二星", "三星", "四星"]
          }, {
            "酒店类型" : ["商务", "度假"]
          }]
        },
        hotelPosition : {
          title : "筛选",
          c : "screen",
          type : 2,
          key : 0,
          listData : ["Sentosa Island", "Bugis", "Orchard Vicinity", "Marina", "Geylang", "City Hall", "Chinatown", "Orchard"]
        }
      },
      menu_call = function() {
        alert("js request json.");
      };

    if (footer) {
      footer.data = menu_data;
      footer.callback = menu_call;
    }
    footer.filters.init();
  },
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
    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var that=this,dataObj =
        {
          Parameters: data,
          ForeEndType: ForeEndType,
          Code: Code
        };
        questUrl = questUrl || that.requestUrl;
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },
    init:function(){
        changeFlightInfo =  JSON.parse(sessionStorage.hftChangeFlightPara);
        console.log(changeFlightInfo);
        oldFlightInfo =  JSON.parse(sessionStorage.hftChangeFlightPara);
        //this.bottomEvent();
        this.getFlightList();
    }
};
flightList.init();
