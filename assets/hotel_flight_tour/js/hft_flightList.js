/**
 * Created by Venson on 2016/5/9.
 */
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
      var sendData = {
        "flightCacheID": 3010900,
        "flightSetID": 30000023,
        "returnDate": "2016-05-27T00:00:00",
        "packageID": 486978,
        "roomDetails": [
          {
            "adult": 2
          }
        ],
        "cityCodeTo": "SIN",
        "departDate": "2016-05-22T00:00:00",
        "cityCodeFrom": "BJS",
        "pageNo": 1,
        "tours": [
          {
            "travelDateSpecified": false,
            "travelDate": "2016-05-22T00:00:00",
            "optionCode": "",
            "tourID": "166"
          },
          {
            "travelDateSpecified": true,
            "travelDate": "2016-05-23T00:00:00",
            "optionCode": "",
            "tourID": "2609"
          }
        ],
        "pageSize": 20
      };
      var flightListBack = function(ret){
          var json = ret, that = flightList;
          console.log(json);
          var data = json.data;
      };
      this.tAjax("",sendData,"60100005","2",flightListBack);
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
        this.bottomEvent();
        this.getFlightList();
    }
};
flightList.init();