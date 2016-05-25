/**
 *@desc  统计请求controller，将所有的日志请求按天存储在一个日子文件中
 *@author Jason
 *@time 2016-5-23
 **/
(function () {
    "use strict";
    var fs = require("fs");
    //window dev env
    var logPath = "d:/log/";
    //linux 
    //var logPath = '/mydata/logs/';
    var now = new Date();
    var logFileName = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate() + ".json";
    var fileName = logPath + logFileName;

    module.exports = {
        logRecord: function (req, res) {
            var parameter = req.query.info;
            fs.stat(fileName, function (err, stat) {
                if (!err) {
                    fs.appendFile(fileName, parameter + "\n", function (err) {
                        if (err) {
                            console.error(err);
                        }
                        //close file
                        fs.close(fileName, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                } else {
                    fs.writeFile(fileName, parameter + "\n", function (err) {
                        if (err) {
                            console.error(err);
                        }
                        //close file
                        fs.close(fileName, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                }
            });
            //console.info(parameter);
            res.ok();
        }
    };
})();
