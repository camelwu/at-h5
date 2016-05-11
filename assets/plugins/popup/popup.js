/**
 *@desc  popup 弹窗    depend on jQuery
 *@author
 *@time
 **/
! function (w, d, $) {
    function popup(options) {
        this.title = options.title || "";
        this.content = options.cnt || "";
        this.btnl = options.btnl || "";
        this.btnr = options.btnr || "";
        this.cbs = options.cbs ? options.cbs : [function () {}, function () {}];
        this.mask = ".w_popup_mask";
        this.pop = ".w_popup";
        this.popid = "#pop" + Math.ceil(1e5 * Math.random());
        this.setup().hide().attEvent();
    }
    return w && d && $ ? (popup.prototype.setup = function () {
            var that = this;
            if (0 === $(that.mask).size() && $("body").append('<div class="' + that.mask.slice(1) + '"></div>'), 0 === $(that.popid).size()) {
                var i = '<div id="' + that.popid.slice(1) + '" class="' + that.pop.slice(1) + '">';
                popup = ['<div class="title">' + that.title + "</div>",
                '<div class="content">' + that.content + "</div>",
                '<div class="bar"><div class="btn_l">' + that.btnl + "</div>",
                '<div class="btn_r">' + that.btnr + "</div>",
                "</div>"].join("");
                i += popup;
                i += "</div>";
                $("body").append(i);
            }
            return that;
        },
        popup.prototype.show = function () {
            var that = this;
            $(that.mask).show();
            $(that.popid).show();
            var i = $(that.popid).height() / 2;
            $(that.popid).css("margin-top", -i + "px");
            return that;
        },
        popup.prototype.hide = function () {
            var that = this;
            $(that.mask).hide();
            $(that.popid).css("margin-top", 0);
            $(that.popid).hide();
            return that;
        },
        popup.prototype.attEvent = function () {
            var that = this;
            $(that.popid + " .btn_l").on("click", function () {
                that.cbs[0] && "function" == typeof that.cbs[0] && that.cbs[0]();
            });
            $(that.popid + " .btn_r").on("click", function () {
                that.cbs[1] && "function" == typeof that.cbs[1] && that.cbs[1]();
            });
            $(that.mask).on("touchstart", function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
            return that;
        },
        w.widget = w.widget || {},
        w.widget.popup = popup) : !1;
}(window, document, jQuery);
