/**
 *@desc  用于统计用户在页面的相关操作记录
 *@author
 *@time
 **/
(function (w, d) {
    "use strict";
    var postMessage = {},
        parameters = [],
        parameter = {},
        meta = {
            ua: navigator.userAgent,
            st: new Date().getTime(), //页面性能统计优化performance.timing
            lt: null,
            ut: null,
            rt: null
        },
        dataPara = ['data-statc', 'data-statl', 'data-statm', 'data-statp'];
    //收集统计参数
    /*
     *@desc 参数说明：data-statp 与url/path 重复， data-statp参数可以不设置
     *
     {
         parameters:[{
            u:url/path
            p:page, =>data-statp
            m:module, =>data-statm
            l:lable, =>data-statl
            c:lable conent =>data-statc
         }],
         meta:{
            ua: userAgent,
            st : start load time,
            lt : load time,
            ut : unload time,
            rt : dom ready time
         }
     }
     *
     */
    d.onclick = function (event) {
        var target = event.target || event.srcElement;
        //遍历父节点找到所有的参数信息
        var parent = target.parentNode;
        var dataValue = "";
        while (parent && parent.nodeName !== "#document") {
            for (var i = 0, len = dataPara.length; i < len; i++) {
                dataValue = parent.getAttribute(dataPara[i]);
                if (dataValue) {
                    parameter[dataPara[i].substr(-1)] = dataValue;
                    break;
                }
            }
            parent = parent.parentNode;
        }
        console.info(parameter);
        if (parameter.l) {
            parameter.u = location.pathname;
            parameters.push(parameter);
            parameter = {};
        }
        console.info(parameters);
    };

    //unload前发送日志
    w.onbeforeunload = function (event) {
        meta.ut = new Date().getTime();
        //如果Label参数存在
        if (parameters.length > 0) {
            console.info("send log");
            postMessage.parameters = parameters;
            postMessage.meta = meta;
            postMessage = JSON.stringify(postMessage);
            sendLog(postMessage);
        }
    };

    bind(d, "DOMContentLoaded", function (event) {
        meta.rt = new Date().getTime();
    });
    bind(w, "load", function (event) {
        meta.lt = new Date().getTime();
    });

    function bind(ele, type, fn) {
        if (w.addEventListener) {
            ele.addEventListener(type, fn, false);
        }
    }

    function sendLog(logString) {
        //发送日志后情况parameters
        parameters.length = 0;
        var script = document.createElement("script");
        script.id = "tempStatNode";
        script.src = "/log/logRecord?info=" + logString;
        document.head.appendChild(script);
        script.onload = function (event) {
            var node = document.getElementById("tempStatNode");
            node.parentNode.removeChild(node);
        };
    }
    this.meta = meta;
}).call(this, window, document);
