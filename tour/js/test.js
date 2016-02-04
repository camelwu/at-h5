/**
 * Created by Venson on 16/2/2.
 *
 * 调用方式:
 * 本方法有两个版本,Local版本与Net版本.根据不同情况可以设置url或者本地localurl.
 * _city是与接口交换数据的参数,根据文档上来做的.由于不清楚以后会发展成什么样的,所以暂时为固定方式.
 * before()方法,在调用函数之前调用.
 * after()方法,在调用函数之后调用.
 * 如,before()与after()同时使用,请写成如下形式:
 *  * getNetCity.before(function(){
 *       alert("before");
 *   }).after(function(){
 *       alert("after");
 *   })();
 *
 * 如果想单独使用,如下:
 * 方法之前调用
 * getNetCity.before(function(){
 *       alert("before");
 *   })();
 * 方法之后调用
 * getNetCity.after(function(){
 *       alert("before");
 *   })();
 *
 * 要知道如果如上例分开写就相当于两个对象,彼此之间无关系.
 * 要传参数取决于你函数的参数
 *  getLocalCity = function(dataObj,callback){}
 *
 *   getNetCity.before(function(){
        alert("before");
    }).after(function(){
        alert("after");
    })(filter,fns);
 *
 *接下来是比较完整的调用,如下:
 *
 * function A(fns){
        var filter ={}; //参数
        filter.filterColumn = "countryCode";//想要对哪个列进行塞选
        filter.value = "CN";//对应的值是什么,countryCode 国际城市因为国家很多,所以如果需要国际城市filter.value = "NOTCN";

        //filter.filterColumn ="cityChineseName";
        //filter.value = "上海";

        getNetCity.before(function(){
                alert("before");
            }).after(function(){
                alert("after");
            })(filter,fns);
    }

    A(fns);

    function fns(arg,status,statusMsg){
            console.log("Error : "+status + " :"+ statusMsg);
            console.log(arg);
            //返回值 如果值查询某个城市如"上海",返回的对象是object.如:arg.cityChineseName,输出:上海.
            //返回值 多个城市 会返回对象列表,遍历循环 arg[i].cityChineseName ,循环输出.
            //status 返回状态为200时 ,返回true或false.
            //statusMsg 为返回问题信息.
     }
 *
 *
**/


(function(win, doc) {
    var B = B|| function(B) {
            var _prv = {
                url: "http://10.2.22.239:8888/api/GetServiceApiResult",
                localurl: "http://localhost:63342/Venson/package.json"
            };
            var _city = {
                Parameters: JSON.stringify({}),
                ForeEndType: 3,
                Code: '3005'
            };

            Function.prototype.before = function (fn) {
                var __self = this;
                return function () {
                    //this指向了调用的函数
                    //fn.apply(this,arguments);
                    if (fn.apply(this, arguments) == false) {
                        return false;
                    }
                    //__self.apply(__self,arguments);
                    return __self.apply(this, arguments);
                }

            },
            Function.prototype.after = function (fn) {
                var __self = this;
                return function () {
                    //__self.apply(__self,arguments);
                    var result = __self.apply(this, arguments);
                    if (result === false) {
                        return false;
                    }
                    fn.apply(this, arguments);
                    return result;
                }
            },
            Object.size = function (obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            },
            getNetCity = function (dataObj, callback) {
                alert("middle");

                $.ajax({
                    url: _prv.url,
                    type: 'post',
                    data: JSON.stringify(_city),
                    contentType: 'application/json;charset=utf-8',
                    success: function (data) {
                        var status = {};
                        var p = JSON.parse(data);
                        //console.log(p);
                        if (!p.success) {
                            status = p;
                            return callback(cityresult, status.success, status.message);
                        }
                        //结果集合过滤器
                        var cityresult = filterCity(p, dataObj);

                        //将结果返回callback
                        return callback(cityresult, status.success, status.message);
                    },
                    error: function (data) {

                        console.error(data.responseText);
                        return false;
                    }
                });
            },
            getLocalCity = function (dataObj, callback) {


                $.ajax({
                    url: _prv.localurl,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {

                        var status = {};
                        var p = data;

                        if (!p.success) {
                            status = p;
                            return callback(cityresult, status.success, status.message);
                        }
                        //结果集合过滤器
                        var cityresult = filterCity(p, dataObj);
                        //将结果返回callback

                        return callback(cityresult, status.success, status.message);
                    },
                    error: function (data) {

                        console.error(data.responseText);
                        return false;
                    }
                });
            },
            filterCity = function (data, rules) {

                var result = {};
                var citylength = data.data.cities.length;
                var cCode;
                //console.log(data);
                if (rules.length < 2) {
                    return false;
                }


                for (var i = 0; i < citylength; i++) {
                    cCode = getcCode(data, rules.filterColumn, i);

                    if (cCode == "NONE") {
                        return false;
                    }

                    if (rules.value == "NOTCN") {

                        if (cCode != "CN") {
                            result[i] = data.data.cities[i];
                        }

                    } else {

                        if (cCode == rules.value) {
                            result[i] = data.data.cities[i];
                        }
                    }


                }

                if (Object.size(result) == 1) {
                    return result[0];
                }

                return result;
            },
            getcCode = function (data, column, i) {
                var cCode = column;
                switch (cCode) {
                    case 'cityChineseName':
                        cCode = data.data.cities[i].cityChineseName;
                        break;
                    case 'cityCode':
                        cCode = data.data.cities[i].cityCode;
                        break;
                    case 'cityEnglishName':
                        cCode = data.data.cities[i].cityEnglishName;
                        break;
                    case 'countryChineseName':
                        cCode = data.data.cities[i].countryChineseName;
                        break;
                    case 'countryCode':
                        cCode = data.data.cities[i].countryCode;
                        break;
                    case 'countryEnglishName':
                        cCode = data.data.cities[i].countryEnglishName;
                        break;
                    case 'fullSpellingName':
                        cCode = data.data.cities[i].fullSpellingName;
                        break;
                    default:
                        cCode = 'NONE';
                        break;
                }


                return cCode;
            }
        };
    window.B = B;

}).call(this, window, document);





//调用
function A(fns){
    var filter ={};
    //B.localurl="http://xxx";

    filter.filterColumn = "countryCode";
    filter.value = "NOTCN";

    //filter.filterColumn ="cityChineseName";
    //filter.value = "上海";

    getNetCity.before(function(){
        alert("before");
    }).after(function(){
        alert("after");
    })(filter,fns);
}

//A(fns);

function fns(arg,status,statusMsg){
    console.log("Error : "+status + " :"+ statusMsg);
    console.log(arg);
}


