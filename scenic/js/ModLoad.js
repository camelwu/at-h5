/**
 * Created by apple on 16/4/5.
 */
(function (ModLoad) {
    //模块缓存器,存储已创建模块.
    var moduleCache = {};
    //拼接完整的文件路径字符串,如'lib/ajax'=>'lib/ajax.js'
    var getUrl = function (moduleName) {
        return String(moduleName).replace(/\.js$/g, '') + '.js';
    };

    //创建script元素
    var loadScript = function (src) {
        var t = (new Date).getTime();
        var _script = document.createElement('script');
        _script.type = 'text/javascript';
        _script.charset = 'UTF-8';
        _script.async = true;
        _script.src = src+"?t="+t;
        document.getElementsByTagName('head')[0].appendChild(_script);
    };

    /**
     * 异步加载依赖模块所在文件
     * @param moduleName 模块路径(ID)
     * @param callback 模块加载完成回调函数
     */
    var loadModule = function (moduleName, cb) {
        //依赖模块
        var _module;
        //如果依赖模块被要求加载过
        if (moduleCache[moduleName]) {
            //获取该模块信息
            _module = moduleCache[moduleName];
            //如果模块加载完成
            if (_module.status === 'loaded') {
                //执行模块加载完成回调函数
                setTimeout(cb(_module.exports), 0);
            } else {
                //缓存该模块所处文件加载完成回调函数
                _module.onload.push(cb);
            }
            //模块第一次被依赖引用
        } else {
            //缓存该模块初始化信息
            moduleCache[moduleName] = {
                moduleName: moduleName,//模块ID
                status: 'loading',//模块对应文件加载状态(默认加载中)
                exports: null,//模块接口
                onload: [cb]//模块对应文件加载完成回调函数缓冲器
            };
            //加载模块对应文件
            loadScript(getUrl(moduleName));
        }
    };
    /**
     * 设置模块并执行模块构造函数
     * @param moduleName 模块ID名称
     * @param params 依赖模块
     * @param callback 模块构造函数
     */
    var setModule = function (moduleName, params, cb) {
        //模块容器,模块文件加载完成回调函数
        var _module, fn;
        //如果模块被调用过
        if (moduleCache[moduleName]) {
            //获取模块
            _module = moduleCache[moduleName];
            //设置模块已经加载完成
            _module.status = 'loaded';
            //矫正模块接口
            _module.exports = cb ? cb.apply(_module, params) : null;

            //执行模块文件加载完成回调函数
            while (fn = _module.onload.shift()) {
                fn(_module.exports);
            }
        } else {
            //模块不存在(匿名模块),则直接执行构造函数
            cb && cb.apply(null, params);
        }
    };

    /**
     * 创建或调用模块方法
     * @param url 参数为模块url
     * @param deps 参数为依赖模块
     * @param callback 参数为模块主函数
     */
    ModLoad.module = function () {
        //将参数转化为数组
        var args = Array.prototype.slice.call(arguments);
        //获取模块构造函数(最后一个参数)
        var callback = args.pop();
        //获取依赖模块(紧邻回调函数参数,且数据类型为数组)
        var deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [];
        //该模块url(模块ID)
        var url = args.length ? args.pop() : null;
        //依赖模块序列
        var params = [];
        //未加载的依赖模块数量统计
        var depsCount = 0;
        //依赖模块序列长度
        var len;
        //获取依赖模块长度
        if (len = deps.length) {
            //遍历依赖模块
            for (var i = 0; i < len; i++) {
                //闭包保存i
                (function (i) {
                    //增加未加载依赖模块数量统计
                    depsCount++;
                    //异步加载依赖模块
                    loadModule(deps[i], function (mod) {
                        //依赖模块序列中添加依赖模块接口引用
                        params[i] = mod;
                        //依赖模块加载完成,依赖模块数量统计减一
                        depsCount--;
                        //如果依赖模块全部加载
                        if (depsCount === 0) {
                            //在模块缓存器中矫正该模块,并执行构造函数
                            setModule(url, params, callback);
                        }
                    });
                })(i);
            }
        } else {
            //在模块缓存器中矫正该模块,并执行构造函数
            setModule(url, [], callback);
        }
    };


})((function () {
    //创建模块管理器对象F,并保存在全局作用域中
    return window.ModLoad = {};
})());

//lib/test1.js
//ModLoad.module('lib/test1', function () {
//    return {
//        a: '123'
//    }
//});

//lib/test2.js
//ModLoad.module('lib/test2', function () {
//    return {
//        b: '123'
//    }
//});

//AMD 规范加载模块
//ModLoad.module(['lib/test1', 'lib/test2'], function (test1, test2) {
//    console.log(arguments);
//});