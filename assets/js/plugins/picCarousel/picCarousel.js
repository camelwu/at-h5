/**
 * Created by zhouwei on 2017/3/7.
 */
function PicCarousel() {
    this.config = {
        elemCls             :  '.input',            // 目标元素
        data                 :  {},                //开始日期
        endYear             :  2020,                //结束日期
        panelCls            :  '.calendarPanel',    // 日历面板类
        bg_cur_day          :  'bg_cur_day',        // 当前的颜色
        bg_out              :  'bg_out',            // 鼠标hover颜色
        bg_over             :  'bg_over',           // 鼠标out颜色
        date2StringPattern  :  'yyyy-MM-dd',        // 默认显示格式 yyyy-MM-dd
        patternDelimiter    :  '-',                 // 分隔符 注意：分隔符要和上面显示格式对应
        panelCount          :  2,                   // 面板的个数 是单日历 双日历 或者 多日历等
        manyDisabled        :  false,               // 默认情况下为false 如果为true 指当前日期之前的日期不可点击
        ishasSelect         :  true,                // 是否有下拉框选择年份和月份 默认为true 暂不做操作
                                                    // 为以后留接口 因为如果没有的话 年月份没有显示出来 感觉怪怪的
    };
}
PicCarousel.prototype = {
    init: function(options) {
        this.config = $.extend(this.config, options || {});
        var self = this

        //图片单独生成
        var iDiv = document.createElement('div');
        iDiv.id = "imageContainer";
        iDiv.innerHTML = '<h5 class="indexShow">1/' + result.data[0].hotelImagesList.length + '</h5><div class="showZone">' + '<ul class="imgUl" style="left: 0px; width: 100%;">' + hotelDetail.sTools.getImages(result.data[0].hotelImagesList) + '</ul></div>'
        document.body.appendChild(iDiv);
    }

}

// 页面初始化方式
$(function(){
    new PicCarousel().init({
        //manyDisabled: true
        //ishasSelect: true
    });
});