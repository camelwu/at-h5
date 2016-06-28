/**
 *@desc 所有浮层的滑动使用该文件来处理，防止在iphone手机上的一些穿透问题
 *      依赖jquery
 *@time 2016-06-28
 *@author
 **/
(function (exports) {
    "use strict";
    var scrollLayer = {
        scroll: function (scrollLayerId) {
            this._eventInit(scrollLayerId);
        },
        _eventInit: function (scrollLayerId) {

        }

    };
    exports.ScrollLayer = scrollLayer;

})(typeof exports === 'undefined' ? (this.ATplugins ? this.ATplugins : this.ATplugins = {}) : exports);
