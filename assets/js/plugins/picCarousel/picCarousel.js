/**
 * Created by zhouwei on 2017/3/7.
 */
function PicCarousel() {
    this.config = {
        elemCls             :  '.input',            // Ŀ��Ԫ��
        data                 :  {},                //��ʼ����
        endYear             :  2020,                //��������
        panelCls            :  '.calendarPanel',    // ���������
        bg_cur_day          :  'bg_cur_day',        // ��ǰ����ɫ
        bg_out              :  'bg_out',            // ���hover��ɫ
        bg_over             :  'bg_over',           // ���out��ɫ
        date2StringPattern  :  'yyyy-MM-dd',        // Ĭ����ʾ��ʽ yyyy-MM-dd
        patternDelimiter    :  '-',                 // �ָ��� ע�⣺�ָ���Ҫ��������ʾ��ʽ��Ӧ
        panelCount          :  2,                   // ���ĸ��� �ǵ����� ˫���� ���� ��������
        manyDisabled        :  false,               // Ĭ�������Ϊfalse ���Ϊtrue ָ��ǰ����֮ǰ�����ڲ��ɵ��
        ishasSelect         :  true,                // �Ƿ���������ѡ����ݺ��·� Ĭ��Ϊtrue �ݲ�������
                                                    // Ϊ�Ժ����ӿ� ��Ϊ���û�еĻ� ���·�û����ʾ���� �о��ֵֹ�
    };
}
PicCarousel.prototype = {
    init: function(options) {
        this.config = $.extend(this.config, options || {});
        var self = this

        //ͼƬ��������
        var iDiv = document.createElement('div');
        iDiv.id = "imageContainer";
        iDiv.innerHTML = '<h5 class="indexShow">1/' + result.data[0].hotelImagesList.length + '</h5><div class="showZone">' + '<ul class="imgUl" style="left: 0px; width: 100%;">' + hotelDetail.sTools.getImages(result.data[0].hotelImagesList) + '</ul></div>'
        document.body.appendChild(iDiv);
    }

}

// ҳ���ʼ����ʽ
$(function(){
    new PicCarousel().init({
        //manyDisabled: true
        //ishasSelect: true
    });
});