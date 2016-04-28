/**
 * Created by Venson on 2016/4/21.
 */
var changeFlightInfo;
var airwayLiat = {
    requestUrl:"http://10.6.11.28:1337/api/GetServiceApiResult",
    getWeekDay:function(date){
        var final_date = date.substr(0,10).replace(/-/g,'/');
        var week = "周" + "日一二三四五六".split("")[new Date(final_date).getDay()];
        return week;
    },//格式化日期,
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
        }
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
        }
        //console.log(cfg);
        format || (format = "yyyy-MM-dd hh:mm:ss");
        return format.replace(/([a-z])(\1)*/ig, function (m) {
            return cfg[m];
        });
    },
    getweekly:function(date){
        week = ["日","一","二","三","四","五","六"];
        return week[date];
    },
    getAirwayInfo:function(){
        var that = this;
        var sendData = changeFlightInfo.data;
        //$('#departData').html(sendData.DepartDate.substr(5,5));
        //$('#returnData').html(sendData.ReturnDate.substr(5,5));
        //$('#departWeek').html(that.getWeekDay(sendData.DepartDate));
        //$('#returnWeek').html(that.getWeekDay(sendData.ReturnDate));
        $('#departData').html(that.formatDate(sendData.DepartDate,"MM-dd"));
        $('#returnData').html(that.formatDate(sendData.ReturnDate,"MM-dd"));
        $('#departWeek').html("周"+that.getweekly(that.formatDate(sendData.DepartDate,"d")));
        $('#returnWeek').html("周"+that.getweekly(that.formatDate(sendData.ReturnDate,"d")));
        var airwayList_callback = function(ret){
            console.log(sendData);
            var json = ret;
            console.log(json);
            var data = json.data;
            if(json.success){
                $('.set-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameFrom);
                $('.to-place').html(data.flightInfoListGroup[0].flightInfoList[0].cityNameTo);
                var tpl1 = [
                    '<li class="airway" data-airwaySetID="{%=airwaySetID%}" data-airwayCacheID="{%=airwayCacheID%}">',
                    '<div>',
                    '<img src="{%=airwayLogo%}" />',
                    '</div>',
                    '<span class="airway-name">{%=chineseName%}</span>',
                    '<div class="aw-price">',
                    '<apan>+￥</apan><apnn >{%=additionalPrice%}</apnn>',
                    '</div>',
                    '<b class="hf-icon"></b>',
                    '</li>'
                ].join('');
                var html_aw = template(tpl1,data.airways);
                $('#airway_list').html(html_aw);
                //  选择航空公司，页面跳转
                $('.airway').click(function(){
                    $(this).find('b.hf-icon').addClass('cho-gou').parents().siblings().find('b.hf-icon').removeClass('cho-gou');
                    var airwaySetID = $(this).attr('data-airwaySetID');
                    var airwayCacheID = $(this).attr('data-airwayCacheID');
                    // var flightHotelAllData = JSON.parse(sessionStorage.flightHotelAllData);
                    /*先不用*/
                    //flightHotelAllData.data.airwayCacheID = airwayCacheID;
                    //flightHotelAllData.data.airwaySetID = airwaySetID;
                    //sessionStorage.flightHotelAllData = JSON.stringify(flightHotelAllData);
                    changeFlightInfo.data.AirwayCacheID = airwayCacheID;
                    changeFlightInfo.data.AirwaySetID = airwaySetID;
                    localStorage.changeFlightParaObj = JSON.stringify(changeFlightInfo);
                    window.location.href = 'ticket-list.html';
                });
            }else{
                jAlert(json.message,"提示");
            }
        };
        this.tAjax("",sendData,"50100002","3",airwayList_callback);
    },
    tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
        var that=this,dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl?questUrl:that.requestUrl;
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },
    init:function(){
        changeFlightInfo =  JSON.parse(localStorage.changeFlightParaObj);
        this.getAirwayInfo();
    }
};
airwayLiat.init();
