/**
 *@desc 所有浮层的滑动使用该文件来处理，防止在iphone手机上的一些穿透问题
 *      依赖jquery
 *@time 2016-06-28
 *@author
 **/
(function (exports) {
    "use strict";
    var Utils = {
        //获取元素在某一轴上移动的位置
        getTranslate: function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;

            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }

            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function (a) {
                        return a.replace(',', '.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) {
                    curTransform = transformMatrix.m41;
                }
                //Crazy IE10 Matrix
                else if (matrix.length === 16) {
                    curTransform = parseFloat(matrix[12]);
                }
                //Normal Browsers
                else {
                    curTransform = parseFloat(matrix[4]);
                }
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix) {
                    curTransform = transformMatrix.m42;
                }
                //Crazy IE10 Matrix
                else if (matrix.length === 16) {
                    curTransform = parseFloat(matrix[13]);
                }
                //Normal Browsers
                else {
                    curTransform = parseFloat(matrix[5]);
                }
            }

            return curTransform || 0;
        },

        //RAF 动画
        requestAnimationFrame: function (callback) {
            if (window.requestAnimationFrame) {
                return window.requestAnimationFrame(callback);
            } else if (window.webkitRequestAnimationFrame) {
                return window.webkitRequestAnimationFrame(callback);
            } else if (window.mozRequestAnimationFrame) {
                return window.mozRequestAnimationFrame(callback);
            } else {
                return window.setTimeout(callback, 1000 / 60);
            }
        },
        //取消RAF 动画
        cancelAnimationFrame: function (id) {
            if (window.cancelAnimationFrame) {
                return window.cancelAnimationFrame(id);
            } else if (window.webkitCancelAnimationFrame) {
                return window.webkitCancelAnimationFrame(id);
            } else if (window.mozCancelAnimationFrame) {
                return window.mozCancelAnimationFrame(id);
            } else {
                return window.clearTimeout(id);
            }
        },
        //touch 支持判断
        supportTouch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
        //设置transition style属性
        transition: function (target, duration) {
            if (typeof duration !== 'string') {
                duration = duration + 'ms';
            }
            for (var i = 0; i < target.length; i++) {
                var elStyle = target[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        },
        //设置transform style属性
        transform: function (target, transform) {
            for (var i = 0; i < target.length; i++) {
                var elStyle = target[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        }
    };
    var scrollLayer = function () {
        var scrollLayerSelector, wrapperSelector, wrapperContainer, scrollContainer;
        var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;

        var animationFrameId;

        var minTranslate, maxTranslate;

        var containerHeight, innerColHeight;

        function scroll(scrollLayerSelector, wrapperSelector) {
            scrollLayerSelector = scrollLayerSelector;
            wrapperSelector = wrapperSelector;
            wrapperContainer = $(wrapperSelector);
            scrollContainer = $(scrollLayerSelector);
            _calcSize();
            _eventInit();
        }

        function _calcSize() {
            containerHeight = scrollContainer[0].offsetHeight;
            innerColHeight = 0;
            scrollContainer.children().each(function (index, ele) {
                innerColHeight += $(ele).height();
            });
            innerColHeight = wrapperContainer[0].offsetHeight;
            console.info("containerHeight:" + containerHeight);
            console.info("innerColHeight:" + innerColHeight);
            minTranslate = 0; //default 0px
            maxTranslate = innerColHeight > containerHeight ? innerColHeight - containerHeight : 5;
        }

        function _eventInit(detach) {
            var method = detach ? 'off' : 'on';
            wrapperContainer[method]('touchstart', handleTouchStart);
            wrapperContainer[method]('touchmove', handleTouchMove);
            wrapperContainer[method]('touchend', handleTouchEnd);
        }

        function handleTouchStart(event) {
            if (isMoved || isTouched) {
                return;
            }
            event.originalEvent.preventDefault();
            isTouched = true;
            touchStartY = touchCurrentY = event.type === 'touchstart' ? event.originalEvent.targetTouches[0].pageY : event.originalEvent.pageY;

            touchStartTime = (new Date()).getTime();

            startTranslate = currentTranslate = Utils.getTranslate(wrapperContainer[0], 'y');
            console.info("touchStartY:" + touchStartY);
            console.info("touchCurrentY:" + touchCurrentY);
            console.info("startTranslate:" + startTranslate);
        }

        function handleTouchMove(event) {
            if (!isTouched) {
                return;
            }
            event.originalEvent.preventDefault();

            touchCurrentY = event.type === 'touchmove' ? event.originalEvent.targetTouches[0].pageY : event.originalEvent.pageY;

            if (!isMoved) {
                Utils.cancelAnimationFrame(animationFrameId);
                isMoved = true;
                startTranslate = currentTranslate = Utils.getTranslate(wrapperContainer[0], 'y');
                Utils.transition(wrapperContainer, 0);
            }

            var diff = touchCurrentY - touchStartY;

            currentTranslate = startTranslate + diff;
            returnTo = undefined;
            console.info("currentTranslate:" + currentTranslate);
            if (innerColHeight <= containerHeight) {
                return;
            }

            Utils.transform(wrapperContainer, 'translate3d(0,' + currentTranslate + 'px,0)');

            // Calc velocity
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = (new Date()).getTime();
            prevTranslate = currentTranslate;
        }

        function handleTouchEnd(event) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
            //                col.wrapper.css('transition', '');
            Utils.transition(scrollContainer, '');

            touchEndTime = new Date().getTime();
            var velocity, newTranslate;
            if (touchEndTime - touchStartTime > 300) {
                newTranslate = currentTranslate;
            } else {
                velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                newTranslate = currentTranslate + velocityTranslate * 7;
            }
            console.info("velocity:" + velocity);
            console.info("newTranslate:" + newTranslate);
            //newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
            console.info("newTranslate:" + currentTranslate);
            console.info("newTranslate:" + newTranslate);
            console.info("maxTranslate:" + maxTranslate);
            newTranslate = newTranslate > minTranslate ? minTranslate : newTranslate;
            newTranslate = Math.abs(newTranslate) > maxTranslate ? -maxTranslate : newTranslate;
            Utils.transform(wrapperContainer, 'translate3d(0,' + (parseInt(newTranslate, 10)) + 'px,0)');
        }

        return {
            "scroll": scroll
        };

    };
    exports.ScrollLayer = scrollLayer;

})(typeof exports === 'undefined' ? (this.ATplugins ? this.ATplugins : this.ATplugins = {}) : exports);
