/**
 * Created by zhouwei on 2016/2/17.
 */
/*������  ֧���ӿڲ��
* ����������
* */

function paymentObj(data,callback) {
    $.alerts.confirm("֧�����ǰ���벻Ҫ�رմ�֧����֤���� </br> ֧����ɺ��������֧��������������İ�ť��","����֧����ʾ",null,"֧�����","֧����������");
    this.data = data;    //post��������
    this.handlePayment = function () {
       return  vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(data), callback);
    };
}

