/*
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



//var md5 = require("md5");
//var crypto = require("crypto");

module.exports = function (req, res, next) {
//    var headers = req.headers;
//    var postJson = req.body;
//    var timestamp = new Date().getTime();
//    var bodyString = JSON.stringify(postJson);
//    var sign = md5(timestamp + bodyString);
//    //var signBase64 = new Buffer(sign).toString('base64');
//    var timeBase64 = new Buffer(timestamp + '').toString('base64');
//
//    //AES加密body
//    var algorithm = 'aes-256-cbc';
//    var key = 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4';
//    var iv = 'YWJjZGVmZ2hpamts';
//    var cipherEncoding = 'base64';
//    var clearEncoding = 'utf8';
//    var cipher = crypto.createCipheriv(algorithm, key, iv);
//
//    var cipherChunks = [];
//    var bodyBuffer = new Buffer(bodyString);
//    cipherChunks.push(cipher.update(bodyBuffer, clearEncoding, cipherEncoding));
//    // if data is buffer then input_encoding is  ignored
//    cipherChunks.push(cipher.final(cipherEncoding));
//
//    var bodyAesBase64 = cipherChunks.join("");
//    //cipherChunks.join('');
//    /*
//    console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));
//
//    var decipher = crypto.createDecipheriv(algorithm, key,iv);
//    var plainChunks = [];
//    for (var i = 0;i < cipherChunks.length;i++) {
//      plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
//
//    }
//    plainChunks.push(decipher.final(clearEncoding));
//    console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
//    */
//    //headers.flag = 0;  //非加密
//    headers.flag = 1; //加密传输
//    if (headers.flag && headers.flag == 1) {
//        headers.Sign = sign;
//        headers.Token = timeBase64;
//        headers.bodyString = bodyString;
//        req.body = bodyAesBase64;
//    }

    return next();
};
