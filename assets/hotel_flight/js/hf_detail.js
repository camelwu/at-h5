/**
 * Created by apple on 16/4/21.
 */
(function($) {
    $(document).ready(function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    });
}(jQuery));
(function() {
    var detailData = JSON.parse(sessionStorage.getItem("flightHotelAllData"));
    /**
     * 初始化数据
     * @param
     * @constructor
     * @return
     */
    function initialize(){
        //console.log(detailData);
        if(!detailData){
           window.location.href = "../";
        }
        var tpl_SegmentsLeave,tpl_SegmentsReturn;
        var localdata = detailData.data,totaltime;
        $(".js-set-place").html(localdata.flightInfo.cityNameFrom);
        $(".js-to-place").html(localdata.flightInfo.cityNameTo);
        totaltime = segmentsTotalTravelTimeString(localdata.flightInfo.segmentsLeaveTotalTravelTimeString,
            localdata.flightInfo.segmentsReturnTotalTravelTimeString);
        $(".js-segmentsTotalTravelTimeString").html(totaltime);




        var tmp = localdata;

        for (var i = 0;i < tmp.flightInfo.segmentsLeave.length;i++){
            tmp.flightInfo.segmentsLeave[i].departDate = formatDate(tmp.flightInfo.segmentsLeave[i].departDate,"hh:mm");
            tmp.flightInfo.segmentsLeave[i].arriveDate = formatDate(tmp.flightInfo.segmentsLeave[i].arriveDate,"hh:mm");
        }
        for (var i = 0;i < tmp.flightInfo.segmentsReturn.length;i++){
            tmp.flightInfo.segmentsReturn[i].departDate = formatDate(tmp.flightInfo.segmentsReturn[i].departDate,"hh:mm");
            tmp.flightInfo.segmentsReturn[i].arriveDate = formatDate(tmp.flightInfo.segmentsReturn[i].arriveDate,"hh:mm");
        }


        //console.log(localdata.flightInfo.segmentsLeave);
        tpl_SegmentsLeave = template("tpl_SegmentsLeave",tmp);
        tpl_SegmentsReturn = template("tpl_SegmentsReturn",tmp);

        $(".js-go-trip").html(tpl_SegmentsLeave);
        $(".js-back-trip").html(tpl_SegmentsReturn);

        $(".js-month-day1").html(formatDate(localdata.flightInfo.flightLeaveStartDate,"MM-dd"));
        $(".js-week-day-item1").html("周"+getweekly(formatDate(localdata.flightInfo.flightLeaveStartDate,"d")));
        $(".js-start1").html(localdata.flightInfo.cityNameFrom);
        $(".js-end1").html(localdata.flightInfo.cityNameTo);
        $(".js-detail-hour1").html(localdata.flightInfo.segmentsLeaveTotalTravelTimeString);

        $(".js-month-day2").html(formatDate(localdata.flightInfo.flightReturnStartDate,"MM-dd"));
        $(".js-week-day-item2").html("周"+getweekly(formatDate(localdata.flightInfo.flightReturnStartDate,"d")));
        $(".js-start2").html(localdata.flightInfo.cityNameFrom);
        $(".js-end2").html(localdata.flightInfo.cityNameTo);
        $(".js-detail-hour2").html(localdata.flightInfo.segmentsReturnTotalTravelTimeString);








    }
    /**
     * 14h20m or 30h 时间格式转换
     * @param time
     * @constructor 交通总耗时
     * @return time
     */
    function segmentsTotalTravelTime(time){
        time = time.replace(/((\d{1,4})h)((\d{1,4})m)|((\d{1,2})m)/ig,function(){
            //包含小时与分钟
            //@param arguments[2] 小时
            //@param arguments[4] 分钟
            var m_tmp = 0;
            if(arguments[2] != undefined){
                m_tmp = (parseInt(arguments[2]) * 60)+parseInt(arguments[4]);
                //console.log(m_tmp);
                return [m_tmp];

            }
            //仅又分钟
            //@param arguments[6] 分钟
            if(arguments[6] != undefined){
                //console.log(arguments[6]);
                return [arguments[6]];

            }
        });
        return time;
    }
    /**
     * 交通总耗时
     * @param 去程时间
     * @param 返程时间
     * @constructor segmentsTotalTravelTimeString
     * @return 总时间
     */
    function segmentsTotalTravelTimeString(leavetime,returntime){
        var time,leavetime_tmp,returntime_tmp;
        leavetime_tmp = segmentsTotalTravelTime(leavetime);
        returntime_tmp = segmentsTotalTravelTime(returntime);

        if(parseInt(leavetime_tmp)+parseInt(returntime_tmp) < 60){

            time = parseInt(leavetime_tmp)+parseInt(returntime_tmp) +"m";
        }else{
            var num1 = Math.round((parseInt(leavetime_tmp)+parseInt(returntime_tmp))/60);
            var num2 = (parseInt(leavetime_tmp)+parseInt(returntime_tmp))%60;
            time =  num1 + "h" + num2 +"m";
        }

        return time;
    }

    //格式化日期,
     function formatDate(date,format) {
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
    }

    function getweekly(date){
        week = ["日","一","二","三","四","五","六"];
        return week[date];
    }

    initialize();

}());

