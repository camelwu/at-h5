/**
 *@desc picker  用于出生日期，日历，证件等选择
 *depend    jquery.js vlm.js
 *@time   2016-06-23
 *@author   Jason
 **/
(function (exports) {
  "use strict";
  /**
   *@desc 提供通用功能方法集合
   **/
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
  var Picker = function (params) {
    var p = this;
    var defaults = {
      updateValuesOnMomentum: false,
      updateValuesOnTouchmove: true,
      scrollToInput: false,
      momentumRatio: 7,
      rotateEffect: false,
      inputReadOnly: true,
      toolbarTemplate: '<div id="" class="toolbar">' +
      '<span class="fl btn_cancel">取消</span>' +
      '<span class="fr btn_sure">确定</span>' +
      '</div>'
    };
    params = params || {};
    for (var option in defaults) {
      if (typeof params[option] === 'undefined') {
        params[option] = defaults[option];
      }
    }

    p.params = params;
    p.cols = []; //选择的列数
    p.initialized = false;

    //ios safari transforms origin bug
    var originBug = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0);

    //初始化columns
    p.columnHtml = function (col, styleWidth) {
      var columnHtml = '';
      var columnItemsHtml = '';
      for (var i = 0, len = col.values.length; i < len; i++) {
        columnItemsHtml += col.dataValues ? '<div  class="picker_item" data-value="' + col.dataValues[i] + '" data-picker-value="' + col.values[i] + '">' + col.values[i] + '</div>' : '<div  class="picker_item" data-value="' + col.values[i] + '" data-picker-value="' + col.values[i] + '">' + col.values[i] + '</div>';
      }
      columnHtml += '<div class="picker_items_col" style="width: ' + styleWidth + '"><div class="picker_items_col_wrapper">' + columnItemsHtml + '</div></div>';
      return columnHtml;
    };
    //设置每行的值
    p.setValue = function (arrValues, transition) {
      var valueIndex = 0;
      if (p.cols.length === 0) {
        p.value = arrValues;
        p.updateValue(arrValues);
        return;
      }
      for (var i = 0; i < p.cols.length; i++) {
        if (p.cols[i] && !p.cols[i].divider) {
          p.cols[i].setValue(arrValues[valueIndex], transition);
          valueIndex++;
        }
      }
    };
    p.updateValue = function (forceValues) {
      var newValue = forceValues || [];
      var newDisplayValue = [];
      for (var i = 0; i < p.cols.length; i++) {
        if (!p.cols[i].divider) {
          newValue.push(p.cols[i].value);
          newDisplayValue.push(p.cols[i].displayValue);
        }
      }
      if (newValue.indexOf(undefined) >= 0) {
        return;
      }
      p.value = newValue;
      p.displayValue = newDisplayValue;
      if (p.params.onChange) {
        p.params.onChange(p, p.value, p.displayValue);
      }
      if (p.input && p.input.length > 0) {
        $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
        $(p.input).trigger('change');
      }
    };
    //初始化每一列
    p.initPickerCol = function (colElement, updateItems) {
      var colContainer = $(colElement);
      var colIndex = colContainer.index();
      var col = p.cols[colIndex];
      if (col.divider) {
        return;
      }
      col.container = colContainer;
      col.wrapper = col.container.find('.picker_items_col_wrapper');
      col.items = col.wrapper.find('.picker_item');

      var i, j;
      var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
      col.replaceValues = function (values, displayValues) {
        col.destroyEvents();
        col.values = values;
        col.displayValues = displayValues;
        var newItemsHTML = p.columnHTML(col, true);
        col.wrapper.html(newItemsHTML);
        col.items = col.wrapper.find('.picker_item');
        col.calcSize();
        col.setValue(col.values[0], 0, true);
        col.initEvents();
      };
      col.calcSize = function () {
        if (p.params.rotateEffect) {
          col.container.removeClass('picker_items_col_absolute');
          if (!col.width) {
            col.container.css({
              width: ''
            });
          }
        }
        var colWidth, colHeight;
        colWidth = 0;
        colHeight = col.container[0].offsetHeight;
        wrapperHeight = col.wrapper[0].offsetHeight;
        itemHeight = col.items[0].offsetHeight;
        itemsHeight = itemHeight * col.items.length;
        minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
        maxTranslate = colHeight / 2 - itemHeight / 2;
        if (col.width) {
          colWidth = col.width;
          if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
          col.container.css({
            width: colWidth
          });
        }
        if (p.params.rotateEffect) {
          if (!col.width) {
            col.items.each(function () {
              var item = $(this);
              item.css({
                width: 'auto'
              });
              colWidth = Math.max(colWidth, item[0].offsetWidth);
              item.css({
                width: ''
              });
            });
            col.container.css({
              width: (colWidth + 2) + 'px'
            });
          }
          col.container.addClass('picker_items_col_absolute');
        }
      };
      col.calcSize();

      col.wrapper.css('transform', 'translate3d(0,' + maxTranslate + 'px,0)').css('transition', 0);

      var activeIndex = 0;
      var animationFrameId;

      // Set Value Function
      col.setValue = function (newValue, transition, valueCallbacks) {
        if (typeof transition === 'undefined') transition = '';
        var newActiveIndex = col.wrapper.find('.picker_item[data-picker-value="' + newValue + '"]').index();
        if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
          return;
        }
        var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
        // Update wrapper

        Utils.transition(col.wrapper, transition);
        Utils.transform(col.wrapper, 'translate3d(0,' + (newTranslate) + 'px,0)');

        // Watch items
        if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex) {
          $.cancelAnimationFrame(animationFrameId);
          col.wrapper.transitionEnd(function () {
            Utils.cancelAnimationFrame(animationFrameId);
          });
          updateDuringScroll();
        }

        // Update items
        col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
      };
      //更新item的状态 位置以及value
      col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
        if (typeof translate === 'undefined') {
          translate = Utils.getTranslate(col.wrapper[0], 'y');
        }
        if (typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate) / itemHeight);
        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
        var previousActiveIndex = col.activeIndex;
        col.activeIndex = activeIndex;
        col.wrapper.find('.picker_selected').removeClass('picker_selected');

        //col.items.css("transition", transition);
        Utils.transition(col.items, transition);
        var selectedItem =
          col.items.eq(activeIndex).addClass('picker_selected').css('transform', '');
        // Set 3D rotate effect
        if (p.params.rotateEffect) {
          var percentage = (translate - (Math.floor((translate - maxTranslate) / itemHeight) * itemHeight + maxTranslate)) / itemHeight;

          col.items.each(function () {
            var item = $(this);
            var itemOffsetTop = item.index() * itemHeight;
            var translateOffset = maxTranslate - translate;
            var itemOffset = itemOffsetTop - translateOffset;
            var percentage = itemOffset / itemHeight;

            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

            var angle = (-18 * percentage);
            if (angle > 180) angle = 180;
            if (angle < -180) angle = -180;
            // Far class
            if (Math.abs(percentage) > itemsFit) item.addClass('picker_item_far');
            else item.removeClass('picker_item_far');
            // Set transform
            item.css('transform', 'translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
          });
        }

        if (valueCallbacks || typeof valueCallbacks === 'undefined') {
          // Update values
          col.value = selectedItem.attr('data-picker-value');
          col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
          // On change callback
          if (previousActiveIndex !== activeIndex) {
            if (col.onChange) {
              col.onChange(p, col.value, col.displayValue);
            }
            p.updateValue();
          }
        }
      };

      function updateDuringScroll() {
        animationFrameId = Utils.requestAnimationFrame(function () {
          col.updateItems(undefined, undefined, 0);
          updateDuringScroll();
        });
      }

      // Update items on init
      if (updateItems) col.updateItems(0, maxTranslate, 0);

      var allowItemClick = true;
      var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;

      function handleTouchStart(e) {
        if (isMoved || isTouched) return;
        e.originalEvent.preventDefault();
        isTouched = true;
        touchStartY = touchCurrentY = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageY : e.originalEvent.pageY;
        touchStartTime = (new Date()).getTime();

        allowItemClick = true;
        startTranslate = currentTranslate = Utils.getTranslate(col.wrapper[0], 'y');
      }

      function handleTouchMove(e) {
        if (!isTouched) return;
        e.originalEvent.preventDefault();
        allowItemClick = false;
        touchCurrentY = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageY : e.pageY;
        if (!isMoved) {
          // First move
          Utils.cancelAnimationFrame(animationFrameId);
          isMoved = true;
          startTranslate = currentTranslate = Utils.getTranslate(col.wrapper[0], 'y');
          //col.wrapper.css('transition', 0);
          Utils.transition(col.wrapper, 0);
        }

        var diff = touchCurrentY - touchStartY;
        currentTranslate = startTranslate + diff;
        returnTo = undefined;

        // Normalize translate
        if (currentTranslate < minTranslate) {
          currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
          returnTo = 'min';
        }
        if (currentTranslate > maxTranslate) {
          currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
          returnTo = 'max';
        }
        console.info(currentTranslate);
        // Transform wrapper
        //col.wrapper.css('transform', 'translate3d(0,' + currentTranslate + 'px,0)');
        Utils.transform(col.wrapper, 'translate3d(0,' + currentTranslate + 'px,0)');
        //Utils.transform(col.wrapper, 'translate3d(0,' + currentTranslate + 'px),0');
        // Update items
        col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);

        // Calc velocity
        velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
        velocityTime = (new Date()).getTime();
        prevTranslate = currentTranslate;
      }

      function handleTouchEnd(e) {
        if (!isTouched || !isMoved) {
          isTouched = isMoved = false;
          return;
        }
        isTouched = isMoved = false;
        //                col.wrapper.css('transition', '');
        Utils.transition(col.wrapper, '');
        if (returnTo) {
          if (returnTo === 'min') {
            Utils.transform(col.wrapper, 'translate3d(0,' + minTranslate + 'px,0)');
          } else {
            Utils.transform(col.wrapper, 'translate3d(0,' + maxTranslate + 'px,0)');
          }
        }
        touchEndTime = new Date().getTime();
        var velocity, newTranslate;
        if (touchEndTime - touchStartTime > 300) {
          newTranslate = currentTranslate;
        } else {
          velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
          newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
        }
        console.info("velocity:" + velocity);
        console.info("newTranslate:" + newTranslate);
        newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

        // Active Index
        var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

        // Normalize translate
        if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

        // Transform wrapper
        // col.wrapper.css('transform', 'translate3d(0,' + (parseInt(newTranslate, 10)) + 'px,0)');
        Utils.transform(col.wrapper, 'translate3d(0,' + newTranslate + 'px,0)');
        // Update items
        col.updateItems(activeIndex, newTranslate, '', true);

        // Watch items
        if (p.params.updateValuesOnMomentum) {
          updateDuringScroll();
          col.wrapper.transitionEnd(function () {
            Utils.cancelAnimationFrame(animationFrameId);
          });
        }

        // Allow click
        setTimeout(function () {
          allowItemClick = true;
        }, 100);
      }

      function handleClick(e) {
        if (!allowItemClick) return;
        Utils.cancelAnimationFrame(animationFrameId);
        /*jshint validthis:true */
        var value = $(this).attr('data-picker-value');
        col.setValue(value);
      }

      col.initEvents = function (detach) {
        var method = detach ? 'off' : 'on';
        col.container[method]('touchstart', handleTouchStart);
        col.container[method]('touchmove', handleTouchMove);
        col.container[method]('touchend', handleTouchEnd);
        col.items[method]('click', handleClick);
      };
      col.destroyEvents = function () {
        col.initEvents(true);
      };

      //            col.container[0].f7DestroyPickerCol = function () {
      //                col.destroyEvents();
      //            };

      col.initEvents();
    };
    //picker 的html框架
    p.layout = function () {
      var pickerHtml = '';
      var pickerClass = '';
      var i;

      var type = p.params.type;
      switch (type) {
        case 'card':
          p.cols = [{
            values: ['护照', '身份证'], //data-code 护照：1  身份证：2
            dataValues: ['1', '2']
          }];
          break;
        case 'cardInte':
          p.cols = [{
            values: ['护照'],
            dataValues: ['1']
          }];
          break;
        case 'cardDom':
          p.cols = [{
            values: ['身份证'],
            dataValues: ['2']
          }];
          break;
        case 'seat':
          p.cols = [{
            values: ['经济舱', '超级经济舱', '商务舱', '头等舱']
          }];
          break;
        case 'time':
          p.cols = [{
            values: ['上午', '下午']
          }]
          break;
        case 'date':
          p.cols = setDateCols(['年', '月', '日']);
          break;
        case 'dateTime':
          p.cols = setDateTimeCols(['date', 'h', 'm']);
          break;
        case 'cardExpirationDate':
          p.cols = setCardDateCols(['年', '月']);
          break;
        case 'validate':
          p.cols = setValidateCols(['年', '月', '日']);
          break;
        case 'custom':
          p.cols = p.params.cols;
          break;
        default:
          p.cols = setDateCols(['年', '月', '日']);
          break;
      }
      var colsHtml = '';
      var len = p.cols.length;
      var styleWidth = Math.round(1 / len * 10000) / 100 + "%";
      for (i = 0; i < len; i++) {
        var col = p.cols[i];
        colsHtml += p.columnHtml(col, styleWidth);
      }

      pickerHtml = p.params.toolbarTemplate +
        '<div class="picker_modal_inner picker_items">' +
        colsHtml +
        '<div class="picker_center_highlight"></div>' +
        '</div>';
      p.pickerHtml = pickerHtml;
    };

    //设置月 周 时 分
    function setDateTimeCols(formatArray) {
      var cols = [];
      var col;
      var items;
      var dataItems;
      var num = p.params.num || 365;
      var now = p.params.startDate ? p.params.startDate : new Date();
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      var munites = ["00", '10', '20', '30', '40', '50'];
      var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      for (var j = 0, len = formatArray.length; j < len; j++) {
        switch (formatArray[j]) {
          case "date":
            items = [];
            dataItems = [];
            for (var i = 0; i < num; i++) {
              var date = new Date(year, month, day + i);
              var yearNew = date.getFullYear();
              var monthNew = date.getMonth() + 1;
              var dayNew = date.getDate();
              var monthNewZero = monthNew < 10 ? "0" + monthNew : monthNew;
              var dayNewZero = dayNew < 10 ? "0" + dayNew : dayNew;
              var weekNew = date.getDay();
              items.push(monthNew + "月" + dayNew + "日\<i style='padding-left:10px;' \>" + week[weekNew] + "\<\/i \>");
              dataItems.push(yearNew + "-" + monthNewZero + "-" + dayNewZero);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            col.width = "50%";
            cols.push(col);
            break;
          case "h":
            items = [];
            dataItems = [];
            for (var m = 0; m < 24; m++) {
              var hour = m < 10 ? "0" + m : m;
              dataItems.push(hour)
              items.push(hour + "时");
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            col.width = "25%";
            cols.push(col);
            break;
          case "m":
            items = [];
            dataItems = [];
            for (var n = 0; n < munites.length; n++) {
              dataItems.push(munites[n])
              items.push(munites[n] + "分");
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            col.width = "25%";
            cols.push(col);
            break;
        }
      }

      return cols;
    }

    //设置卡的有效期年月  年为至今到未来30年
    function setCardDateCols(formatArray) {
      var cols = [];
      var col;
      var items;
      var dataItems;
      var yearNow = new Date().getFullYear();
      var endYear = yearNow + 30; //延后30年
      for (var i = 0, len = formatArray.length; i < len; i++) {
        switch (formatArray[i]) {
          case '年':
            items = [];
            dataItems = [];
            for (; yearNow <= endYear; yearNow++) {
              items.push(yearNow + "年");
              dataItems.push(yearNow);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
          case '月':
            items = [];
            dataItems = [];
            for (var j = 1; j <= 12; j++) {
              items.push(j + "月");
              dataItems.push(j);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems
            cols.push(col);
            break;
        }
      }
      return cols;
    }

    //设置生日的年月日   年为1900年至今
    function setDateCols(formatArray) {
      // cols = [{values:['2000年'，'2001年']},{values:['9月']}]
      var cols = [];
      var col;
      var items;
      var dataItems;
      var yearNow = new Date().getFullYear();
      for (var i = 0, len = formatArray.length; i < len; i++) {
        switch (formatArray[i]) {
          case '年':
            var defaultStartYear = 1900;
            items = [];
            dataItems = [];
            for (; defaultStartYear <= yearNow; defaultStartYear++) {
              items.push(defaultStartYear + "年");
              dataItems.push(defaultStartYear);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
          case '月':
            items = [];
            dataItems = [];
            for (var j = 1; j <= 12; j++) {
              items.push(j + "月");
              dataItems.push(j);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
          case '日':
            col = {};
            items = [];
            dataItems = [];
            for (var j = 1; j <= 31; j++) {
              items.push(j + "日");
              dataItems.push(j);
            }
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
        }
      }
      return cols;
    }

    //设置证件有效期  年为至今到未来30年
    function setValidateCols(formatArray) {
      var cols = [];
      var col;
      var items;
      var dataItems;
      var yearNow = new Date().getFullYear();
      var endYear = yearNow + 30;
      for (var i = 0, len = formatArray.length; i < len; i++) {
        switch (formatArray[i]) {
          case '年':
            items = [];
            dataItems = [];
            for (; yearNow <= endYear; yearNow++) {
              items.push(yearNow + "年");
              dataItems.push(yearNow);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
          case '月':
            items = [];
            dataItems = [];
            for (var j = 1; j <= 12; j++) {
              items.push(j + "月");
              dataItems.push(j);
            }
            col = {};
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
          case '日':
            col = {};
            items = [];
            dataItems = [];
            for (var j = 1; j <= 31; j++) {
              items.push(j + "日");
              dataItems.push(j);
            }
            col.values = items;
            col.dataValues = dataItems;
            cols.push(col);
            break;
        }
      }
      return cols;
    }

    p.opened = false;
    p.open = function () {
      var pickerClass = 'picker_modal picker_columns';
      var pickerContainerId = 'pickerContainer';
      var tempValue = "";


      //dom 结构
      p.layout();

      var pickerContainer = document.createElement("div");
      pickerContainer.id = pickerContainerId;
      pickerContainer.className = pickerClass;
      pickerContainer.innerHTML = p.pickerHtml;


      //overlay
      var overlay = document.createElement("div");
      overlay.id = "pickerOverlay";
      overlay.className = 'mask';
      document.body.appendChild(overlay);

      if ($('.mask').length > 1) {
        for (var i = 0; i < $('.mask').length - 1; i++) {
          $('.mask').eq(i).remove();
        }
      }

      document.body.appendChild(pickerContainer);

      p.container = $("#" + pickerContainerId);
      p.container.find('.picker_items_col').each(function () {
        var updateItems = true;
        p.initPickerCol(this, updateItems);
      });
      p.container.addClass("modal_in");


      // Init Events
      p.container.on("click", '.btn_cancel', p.close);
      p.container.on("click", '.btn_sure', p.done);

      //遮挡层事件
      $("#pickerOverlay").on("touchstart", function (e) {
        p.close();
        e.preventDefault();
        e.stopPropagation();
      });


      p.opened = true;
      p.initialized = true;


      //设置value  params.value为初始化值
      p.value = p.params.value;

      tempValue = p.input.attr("data-selected");
      if (tempValue) {
        p.value = tempValue.split(",");
      }

      if (p.value) {
        setTimeout(function () {
          p.setValue(p.value, 200);
        }, 200);
      }
    };
    //移除picker组件
    p.close = function () {
      p.opened = false;
      $("#pickerContainer").remove();
      $("#pickerOverlay").remove();
    };
    //确认选择数据
    p.done = function () {
      var selectedValue = [];
      var selectedPickerValue = [];
      var responseValue;
      var selectedElems = p.container.find(".picker_selected");
      selectedElems.each(function (index, ele) {
        selectedValue.push($(ele).attr("data-value"));
        selectedPickerValue.push($(ele).attr("data-picker-value"));
      });
      p.setValue(selectedValue);
      p.input.attr("data-selected", selectedPickerValue.join(","));
      var type = p.params.type;
      switch (type) {
        case 'cardExpirationDate':
          var year = selectedValue[0];
          var month = selectedValue[1] < 10 ? '0' + selectedValue[1] : selectedValue[1];
          p.input.attr('data-expire', year + "-" + month + "-01");

          selectedValue[0] = month;
          selectedValue[1] = parseInt(year.substring(2));
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = selectedValue.join("/");
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = selectedValue.join("/");
          }
          break;
        case 'card':
          p.input.attr('data-cache', selectedPickerValue[0]);
          p.input.attr('data-code', selectedValue[0]);
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = selectedPickerValue[0];
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = selectedPickerValue[0];
          }
          break;
        case 'cardInte':
          p.input.attr('data-cache', selectedPickerValue[0]);
          p.input.attr('data-code', selectedValue[0]);
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = selectedPickerValue[0];
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = selectedPickerValue[0];
          }
          break;
        case 'cardDom':
          p.input.attr('data-cache', selectedPickerValue[0]);
          p.input.attr('data-code', selectedValue[0]);
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = selectedPickerValue[0];
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = selectedPickerValue[0];
          }
          break;
        case 'date':
          var year = selectedValue[0];
          var month = selectedValue[1] < 10 ? "0" + selectedValue[1] : selectedValue[1];
          var day = selectedValue[2] < 10 ? "0" + selectedValue[2] : selectedValue[2];
          var birthDay = year + "-" + month + "-" + day;
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = birthDay;
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = birthDay;
          }
          break;
        case 'validate':
          var year = selectedValue[0];
          var month = selectedValue[1] < 10 ? "0" + selectedValue[1] : selectedValue[1];
          var day = selectedValue[2] < 10 ? "0" + selectedValue[2] : selectedValue[2];
          var birthDay = year + "-" + month + "-" + day;
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = birthDay;
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = birthDay;
          }
          break;
        case 'dateTime':
          var date = selectedValue[0];
          var hour = selectedValue[1];
          var m = selectedValue[2];
          var dateTime = date + "-" + hour + "-" + m + '-00';
          if (p.input[0].nodeName == 'DIV') {
            p.input[0].innerHTML = dateTime;
          } else if (p.input[0].nodeName == 'INPUT') {
            p.input[0].value = dateTime;
          }
          break;
      }
      if (p.params.callback && typeof p.params.callback === 'function') {
        p.params.callback(selectedValue);
      }
      p.close();
    };

    function openOnInput(e) {
      e.preventDefault();
      p.input.focus();
      //让当前获取焦点的input失去焦点
      $("input").each(function (index, ele) {
        $(ele).blur();
      });
      if (p.opened) return;
      p.open();

      if (p.params.scrollToInput) {
        var pageContent = p.input.parents('.all_elements');
        if (pageContent.length === 0) return;

        var paddingTop = parseInt(pageContent.css('padding-top'), 10),
          paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
          pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
          pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
          newPaddingBottom;
        var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
        if (inputTop > pageHeight) {
          var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
          if (scrollTop + pageHeight > pageScrollHeight) {
            newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
            if (pageHeight === pageScrollHeight) {
              newPaddingBottom = p.container.height();
            }
            pageContent.css({
              'padding-bottom': (newPaddingBottom) + 'px'
            });
          }
          pageContent.scrollTop(scrollTop, 300);
        }
      }
    }

    if (p.params.input) {
      p.input = $(p.params.input);
      if (p.input.length > 0) {
        if (p.params.inputReadOnly) {
          p.input.prop('readOnly', true);
        }
        p.input.on('click', openOnInput);
        if (p.params.inputReadOnly) {
          p.input.on('focus mousedown', function (e) {
            e.preventDefault();
          });
        }
      }

    }

    return p;
  }

  exports.Picker = Picker;
})(typeof exports === 'undefined' ? (this.ATplugins ? this.ATplugins : this.ATplugins = {}) : exports);
