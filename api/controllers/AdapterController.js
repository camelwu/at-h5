/*
 *@description  用于接口暂时转发 后续增加路由和模板统一调整
 *@param
 *@return
*@desc 中间层服务接口过滤
    1.1、Http Head
     a、当前时间戳+Json(现在传输的数据)，当前时间戳以毫秒为单位，可以有小数部分，长度尽可能长点。
          以上拼成一个字符串做MD5加密，放在Http Head里面，Head的key=Sign,Head的Value=MD5加密过后的数据。
     b、Http的Head里面添加Key=Token，Value=上面时间戳的Base64编码。

    1.2、Http Body
       Json(现在没加密的数据)做AES加密再做Base64编码，AES的Key=YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4(256位，Base64加密，暂定)     AES的偏移量IV=YWJjZGVmZ2hpamts(128位，base64加密，暂定)
       以上是具体的加密规则。

    2、为了方便前端调用测试，现暂定在Http的Head加上key=flag，Vaue=1(传的是加密数据，按照既定的加密规则传输)，Value=0(传的是非加密数据，按照现有的方式传输)，
     该规则只适合测试环境，生产环境所有的方法调用都需要加密。
*@time
*/

var request = require("request");
var md5 = require("md5");
var crypto = require("crypto");

//AES加密body
var algorithm = 'aes-256-cbc';
var key = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4';
var iv = 'YWJjZGVmZ2hpamts';
var cipherEncoding = 'base64';
var clearEncoding = 'utf8';

var getWithTrickParam = function (res, res, param) {
    console.log(param);
    var orderType = apiOrderDic[param.code] == undefined ? apiOrderDic[param.Code] : apiOrderDic[param.code]
    if (orderType != undefined) {
        if (orderType.tpye != "H") {
            if (param.Parameters.track.deviceID == "") {
                var deviceID = uuid.v4();
                param.Parameters.track.deviceID = deviceID;
                res.cookie('deviceID', deviceID);
            }
            param.Parameters.track.browserType = "Siri";
        } else {
            if (param.Parameters.deviceID == "") {
                var deviceID = uuid.v4();
                param.Parameters.deviceID = deviceID;
                res.cookie('deviceID', deviceID);
            }
            param.Parameters.browserType = "Siri";

        }
    }
    return param;
}

module.exports = {
    api: function (req, res) {
        var method = req.method;
        var headers = req.headers;
        var postJson = req.body;

        var timestamp = new Date().getTime();
        var bodyString = JSON.stringify(postJson);
        var sign = md5(timestamp + bodyString);
        var timeBase64 = new Buffer(timestamp + '').toString('base64');
        var cipher = crypto.createCipheriv(algorithm, key, iv);

        var cipherChunks = [];
        var bodyBuffer = new Buffer(bodyString);
        cipherChunks.push(cipher.update(bodyBuffer, clearEncoding, cipherEncoding));
        // if data is buffer then input_encoding is  ignored
        cipherChunks.push(cipher.final(cipherEncoding));

        var bodyAesBase64 = cipherChunks.join("");
        //cipherChunks.join('');
        /*
        console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));

        var decipher = crypto.createDecipheriv(algorithm, key,iv);
        var plainChunks = [];
        for (var i = 0;i < cipherChunks.length;i++) {
          plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));

        }
        plainChunks.push(decipher.final(clearEncoding));
        console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
        */
        //headers.flag = 0;  //非加密
        headers.flag = headers.flag || 1; //加密传输
        if (headers.flag == 1) {
            var reqeustStartTime, requestEndTime, spendTime;
            //http://10.6.11.20:6666/api/GetServiceApiResult
            //http://123.56.190.34:8888/api/GetServiceApiResult
            //http://10.6.11.20:11111/api/GetServiceApiResult  hotel_flight
            //10.7.2.100:8888
            //UAT domain   hapi.atrip.net
            var _api = 'http://10.7.2.117:8888/api/GetServiceApiResult' + '?rnd=' + Math.random();

            //自定义请求header和body
            var option = {
                method: method,
                //json : true,
                //encoding : null,
                gzip: true,
                //headers : headers,
                headers: {
                    "Content-Type": headers["content-type"],
                    "Sign": sign,
                    "Token": timeBase64
                },
                body: bodyAesBase64
            }
            reqeustStartTime = new Date().getTime();
            //接口调用
            request(_api, option, function (err, httpResponse, body) {
                requestEndTime = new Date().getTime();
                spendTime = requestEndTime - reqeustStartTime;
                if (parseInt(spendTime) > 5000) {
                    console.log(bodyString);
                    console.log(new Date() + "--api 接口访问时间：" + (requestEndTime - reqeustStartTime));
                }

                if (!err && httpResponse.statusCode == 200) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "X-Requested-With");
                    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                    res.header("X-Powered-By", ' 3.2.1')
                    res.header("Content-Type", "application/json;charset=utf-8");
                    res.type('application/json'); //设置返回content-type
                    res.send(body);
                } else {
                    console.info(err);
                    //TODO response error data
                }
            });
        } else {
            //TODO 不加密
        }
    },
}
