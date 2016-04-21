/**
 * Created by apple on 16/4/21.
 */

(function(){
    var year_num = 1;
    var starttime = new Date();
    starttime = starttime.getFullYear()+"/"+(starttime.getMonth()+1)+"/"+starttime.getDate();
    //starttime = new Date(starttime);
    var endtime = new Date();
    endtime = new Date();
    endtime = (endtime.getFullYear()+year_num)+"/"+(endtime.getMonth()+1)+"/"+endtime.getDate();
    //endtime = new Date(endtime);

    var obj = "{"+starttime+":去,"+endtime+":返}";
    //console.log(obj);
    var myDate1 = new Calender({
        id: "ori-des-Date",
        num: (year_num * 12),
        time: obj,
        //idTotal: "total_day",
        type:"flight",
        idLive: "startday",
        idLeave: "endday",
        fn:updateTime
    });

    function changeMouth(day){
        day = day.replace(/(\d{4})\W(\d{1,2})\W(\d{1,2})/g,function(){

            if(arguments[2].length == 1){
                arguments[2] = "0"+arguments[2];
            }
            if(arguments[3].length == 1){
                arguments[3] = "0"+arguments[3];
            }
            //console.log(arguments[1]+"/"+arguments[2]+"/"+arguments[3]);
            return arguments[1]+"/"+arguments[2]+"/"+arguments[3];
        });
        return day;
    }

    function updateTime(){
        var startday,endday,mstartday,mendday,startData,returnData,currentStartday,currentEndday,week1,week2;
        var startday = $("#startday").val();
        mstartday = startday
        mstartday = mstartday.substr(5,mstartday.length);
        $("#mstartday").html(mstartday);



        startData = startday;
        $("#startData").attr("data-startData",startData);


        var endday = $("#endday").val();

        mendday = endday;
        mendday = mendday.substr(5,mendday.length);
        $("#mendday").html(mendday);



        returnData = endday;
        $("#returnData").attr("data-returnData",returnData);


        currentStartday = startday;
        currentStartday = currentStartday.replace(/-/g,"/");
        week1 = getWeekly(currentStartday);
        $(".double-week-one").html("周"+week1);

        currentEndday = endday;
        currentEndday = currentEndday.replace(/-/g,"/");
        week2 = getWeekly(currentEndday);
        $(".double-week-two").html("周"+week2);


        //console.log(startday+" -- "+endday);
    }

    function getWeekly(day){
        var weekday = ["日","一","二","三","四","五","六"];
        day = new Date(day);
        return weekday[day.getDay()];
    }

    function initDate(day1,day2){
        day1 = changeMouth(day1);
        day2 = changeMouth(day2);
        day1 = day1.replace(/\W/g,"-");
        day2 = day2.replace(/\W/g,"-");
        $("#startday").val(day1);
        $("#endday").val(day2);
        updateTime();
    }


    initDate(starttime,endtime);

})();