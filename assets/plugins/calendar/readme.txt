
var myTime = new Calender({
            id: "timeClickWrap",
            time: {
                "2016-05-17": "checkinTime",
                "2016-05-19": "checkoutTime"
            },
            checkInTimeOptId: 'checkInTime',
            checkOutTimeOptId: 'checkOutTime',
            callback: function(result) {
                console.info(result);
            }
        });
参数说明：
    id : 触发日历组件的容器id
    time: 初始化显示在日历组件上的日期
    checkInTimeOptId：页面显示选择的checkIn time的元素ID
    checkOutTimeOptId：页面显示选择的checkOut time的元素ID
    callback：回调函数，将选择的日期传入回调函数中
    num : 显示的月份数量  默认13个月   （可选）
    
    
    
    