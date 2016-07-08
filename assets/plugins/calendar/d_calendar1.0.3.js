/**
 *===============================================
 *@desc F+H+S 日期控件 后续可能统一使用该版本   目前只能在F+H+T使用   依赖jquery
 *@author Jason
 *@time 2016-05-04
 *===============================================
 * */
(function (exports) {
    "use strict";
    var _CalF = {

      // 选择元素
      $: function (arg, context) {
        var tagAll, n, eles = [],
          i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
          switch (arg.charAt(0)) {
            case '#':
              return document.getElementById(sub);
              break;
            case '.':
              if (context.getElementsByClassName) return context.getElementsByClassName(sub);
              tagAll = _CalF.$('*', context);
              n = tagAll.length;
              for (i = 0; i < n; i++) {
                if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
              }
              return eles;
              break;
            default:
              return context.getElementsByTagName(arg);
              break;
          }
        }
      },
      // 绑定事件
      bind: function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
      },
      // 获取元素位置
      getPos: function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
          scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        pos = node.getBoundingClientRect();
        return {
          top: pos.top + scrollt,
          right: pos.right + scrollx,
          bottom: pos.bottom + scrollt,
          left: pos.left + scrollx
        };
      },
      // 添加样式名
      addClass: function (c, node) {
        node.className = node.className + ' ' + c;
      },
      // 移除样式名
      removeClass: function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        node.className = node.className.replace(reg, '');
      },
      // 阻止冒泡
      stopPropagation: function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
      }
    }; <<
    <<
    << < HEAD
      ===
      ===
      =

      >>>
      >>>
      > c21fe00a26c5e23126d5c30595b4c1c47913c14d
      /**
       * @name Calender
       * @constructor
       * @created by wusong
       * */
    function Calender() {
      if (!arguments.length) return;
      this.initialize.apply(this, arguments);
      this.result = [];
    } <<
    <<
    << < HEAD
    Calender.prototype = {
      constructor: Calender,
      // 文字数组
      _word: {
        hotel: ['入住', '离店'],
        flight: ['去程', '回程']
      },
      _tempweek: [
        '<dl class="ca_week clearfix">',
        '<dt class="date_title">日</dt>',
        '<dt class="date_title">一</dt>',
        '<dt class="date_title">二</dt>',
        '<dt class="date_title">三</dt>',
        '<dt class="date_title">四</dt>',
        '<dt class="date_title">五</dt>',
        '<dt class="date_title">六</dt>',
        '</dl>'
        ],
      //酒店日期提示
      _hotelTemptiper: '<div class="first_select tiper current"><span class="title">入住</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div><div class="second_select tiper"><span class="title">离店</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div>',
      //机票日期提示
      _flightTemptiper: '<div class="first_select tiper current"><span class="title">去程</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div><div class="second_select tiper"><span class="title">返程</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div>',
      //默认header
      _header: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><h3>选择日期</h3>',
      //带提示的header
      _tipHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期为出发地日期)</span></div>',
      //hotel header
      _tipHotelHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期以酒店当地时间为准)</span></div>',
      //带清除按钮和提示的header
      _tipCleanHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期为出发地日期)</span></div><a href="javascript:void(0);" class="header_clean">清除</a>',
      //确认按钮
      _confirmBtn: '<div class="btn"><p>选择完毕</p><span class="total">06月28日至06月30日(2晚)</span></div>',
      // 模板数组
      _template: [
        //'<dl class="ca_month">',
        '<dt class="title-date">',
        '</dt>',
        '<dd></dd>'
        //'</dl>'
        ],
      // 初始化对象
      initialize: function (options) {
        //默认使用机票模板   flight
        this.type = options.type || 'flight';
        this.headerSign = options.headerSign || 'default'; //header type: default tip tipClean
        //选择日期数量  默认选择出发日期和返回日期两个 2/1
        this.selectTime = options.selectTime || 2;
        this.format = options.format || "yyyy-mm-dd"; //TODO用于显示用的日期格式 yyyy-mm-dd,mm-dd
        this.id = options.id; // input的ID    初始化元素idid
        this.num = options.num || 13; //显示数量
        this.sClass1 = options.sClass1;
        this.callback = options.callback;
        this.noComfirmBtn = options.noComfirmBtn; //选择完毕后自动保存数据 不显示确认按钮
        this.time = options.time || {}; //已有时间  默认选中时间   默认时间必须是大于今天日期
        this.disableDate = options.disableDate || []; //默认不可用的日期
        this.disableDateAfterLength = options.disableDateAfterLength; // 选中一个日期后，后延多少天内日期可选，其他时间不可选   int 
        this.minDuration = options.minDuration; //日期选择的最小间隔  如果是3天 那么选中的第一个日期的第二天不可选；
        this.ableDateRange = options.ableDateRange; //初始化可选择日期时间段，配合num参数使用   
        this.startAbleDate = options.startAbleDate;
        this.ableWeekRange = options.ableWeekRange; //日期根据wenken 可选不可选 '1,2,3,4,5,6,0'
        this.prefix = options.prefix || "calendar";
        this.op = 0; //已操作次数
        this.theLastAbleDay = options.theLastAbleDay;
        this.checkInTimeOptId = options.checkInTimeOptId;
        this.checkOutTimeOptId = options.checkOutTimeOptId;
        this.input = $('#' + this.id); // 获取INPUT元素
        this.eventBind();
        //this.inputEvent(); // input的事件绑定，获取焦点事件
        // this.outClick(); // 区域外事件绑定
      },
      // 创建日期最外层盒子，并设置盒子的绝对定位
      createContainer: function (odate) {
        // 如果存在，则移除整个日期层Container
        var odiv = _CalF.$('#calendarWrap');
        if (!!odiv) odiv.parentNode.removeChild(odiv);
        var calendarWrap = document.createElement('div');
        calendarWrap.id = "calendarWrap";
        calendarWrap.className = 'calendar_Wrap';
        var container = this.container = document.createElement('div');
        container.id = this.id + 'Date';
        container.className = "calendar_date";
        //container.style.position = "absolute";
        //container.style.zIndex = 100;
        if (this.input.tagName === 'input') {
          //PC输入框
          var inputPos = _CalF.getPos(this.input);
          // 根据input的位置设置container高度
          container.style.left = inputPos.left + 'px';
          container.style.top = inputPos.bottom - 1 + 'px';
          // 设置日期层上的单击事件，仅供阻止冒泡，用途在日期层外单击关闭日期层
          _CalF.bind(container, 'click', this.stopPropagation);

          ===
          ===
          =

          Calender.prototype = {
            constructor: Calender,
            // 文字数组
            _word: {
              hotel: ['入住', '离店'],
              flight: ['去程', '回程']
            },
            _tempweek: [
      '<dl class="ca_week clearfix">',
      '<dt class="date_title">日</dt>',
      '<dt class="date_title">一</dt>',
      '<dt class="date_title">二</dt>',
      '<dt class="date_title">三</dt>',
      '<dt class="date_title">四</dt>',
      '<dt class="date_title">五</dt>',
      '<dt class="date_title">六</dt>',
      '</dl>'
    ],
            //酒店日期提示
            _hotelTemptiper: '<div class="first_select tiper current"><span class="title">入住</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div><div class="second_select tiper"><span class="title">离店</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div>',
            //机票日期提示
            _flightTemptiper: '<div class="first_select tiper current"><span class="title">去程</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div><div class="second_select tiper"><span class="title">返程</span><div class="date_wrap"><span class="date"></span><span class="week"></span></div></div>',
            //默认header
            _header: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><h3>选择日期</h3>',
            //带提示的header
            _tipHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期为出发地日期)</span></div>',
            //hotel header
            _tipHotelHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期以酒店当地时间为准)</span></div>',
            //带清除按钮和提示的header
            _tipCleanHeader: '<a href="javascript:void(0);" class="header_back"><i class="icons go_back"></i></a><div class="tip_header"><h3>选择日期</h3><span class="tiper">(查询日期为出发地日期)</span></div><a href="javascript:void(0);" class="header_clean">清除</a>',
            //确认按钮
            _confirmBtn: '<div class="btn"><p>选择完毕</p><span class="total">06月28日至06月30日(2晚)</span></div>',
            // 模板数组
            _template: [
      //'<dl class="ca_month">',
      '<dt class="title-date">',
      '</dt>',
      '<dd></dd>'
      //'</dl>'
    ],
            // 初始化对象
            initialize: function (options) {
              //默认使用机票模板   flight
              this.type = options.type || 'flight';
              this.headerSign = options.headerSign || 'default'; //header type: default tip tipClean
              //选择日期数量  默认选择出发日期和返回日期两个 2/1
              this.selectTime = options.selectTime || 2;
              this.format = options.format || "yyyy-mm-dd"; //TODO用于显示用的日期格式 yyyy-mm-dd,mm-dd
              this.id = options.id; // input的ID    初始化元素idid
              this.num = options.num || 13; //显示数量
              this.sClass1 = options.sClass1;
              this.callback = options.callback;
              this.noComfirmBtn = options.noComfirmBtn; //选择完毕后自动保存数据 不显示确认按钮
              this.time = options.time || {}; //已有时间  默认选中时间   默认时间必须是大于今天日期
              this.disableDate = options.disableDate || []; //默认不可用的日期
              this.disableDateAfterLength = options.disableDateAfterLength; // 选中一个日期后，后延多少天内日期可选，其他时间不可选   int
              this.minDuration = options.minDuration; //日期选择的最小间隔  如果是3天 那么选中的第一个日期的第二天不可选；
              this.ableDateRange = options.ableDateRange; //初始化可选择日期时间段，配合num参数使用
              this.startAbleDate = options.startAbleDate;
              this.ableWeekRange = options.ableWeekRange; //日期根据wenken 可选不可选 '1,2,3,4,5,6,0'
              this.prefix = options.prefix || "calendar";
              this.op = 0; //已操作次数
              this.theLastAbleDay = options.theLastAbleDay;
              this.checkInTimeOptId = options.checkInTimeOptId;
              this.checkOutTimeOptId = options.checkOutTimeOptId;
              this.input = $('#' + this.id); // 获取INPUT元素
              this.eventBind();
              //this.inputEvent(); // input的事件绑定，获取焦点事件
              // this.outClick(); // 区域外事件绑定
            },
            // 创建日期最外层盒子，并设置盒子的绝对定位
            createContainer: function (odate) {
              // 如果存在，则移除整个日期层Container
              var odiv = _CalF.$('#calendarWrap');
              if (!!odiv) odiv.parentNode.removeChild(odiv);
              var calendarWrap = document.createElement('div');
              calendarWrap.id = "calendarWrap";
              calendarWrap.className = 'calendar_Wrap';
              var container = this.container = document.createElement('div');
              container.id = this.id + 'Date';
              container.className = "calendar_date";
              //container.style.position = "absolute";
              //container.style.zIndex = 100;
              if (this.input.tagName === 'input') {
                //PC输入框
                var inputPos = _CalF.getPos(this.input);
                // 根据input的位置设置container高度
                container.style.left = inputPos.left + 'px';
                container.style.top = inputPos.bottom - 1 + 'px';
                // 设置日期层上的单击事件，仅供阻止冒泡，用途在日期层外单击关闭日期层
                _CalF.bind(container, 'click', this.stopPropagation);

                >>>
                >>>
                > c21fe00a26c5e23126d5c30595b4c1c47913c14d
              } else {
                //M站层
                var header = this.header = document.createElement('div');
                header.id = this.id + "Header";
                header.className = this.prefix + '_header';
                switch (this.headerSign) {
                  case 'hotelTip':
                    header.innerHTML = this._tipHotelHeader;
                    break;
                  case 'tip':
                    header.innerHTML = this._tipHeader;
                    break;
                  case 'tipClean':
                    header.innerHTML = this._tipCleanHeader;
                    break;
                  default:
                    header.innerHTML = this._header;
                    break;
                }
                calendarWrap.appendChild(header);
                if (this.selectTime === 2) {
                  var tiperWrap = document.createElement("div");
                  tiperWrap.className = "calendar_tiper";
                  switch (this.type) {
                    case 'hotel':
                      tiperWrap.innerHTML = this._hotelTemptiper;
                      break;
                    default:
                      tiperWrap.innerHTML = this._flightTemptiper;
                      break;
                  }
                  header.appendChild(tiperWrap);
                } else {
                  header.className = header.className + " no_tiper";
                  container.className = container.className + " no_tiper";
                }

                var weeker = document.createElement('div');
                weeker.className = 'calendar_week';
                weeker.innerHTML = this._tempweek.join('');
                header.appendChild(weeker);

                var comfirmBtn = this.tiper = document.createElement('div');
                comfirmBtn.id = 'comfirmBtn';
                comfirmBtn.className = 'calendar_comfirm';
                comfirmBtn.innerHTML = this._confirmBtn;
                container.appendChild(comfirmBtn);
                // 增加容器，减少dom操作
                var Warpper = this.Warpper = document.createElement('div');
                Warpper.className = 'calendar';
                container.appendChild(Warpper);
              }
              calendarWrap.appendChild(container);
              document.body.appendChild(calendarWrap);
            },
            //初始化日期
            initDate: function () {
              var dates = [];
              var calendar = $("#calendarWrap");
              var firstDate = calendar.find(".first_select .date");
              var firstWeek = calendar.find(".first_select .week");
              var secondDate = calendar.find(".second_select .date");
              var secondWeek = calendar.find(".second_select .week");
              if (this.selectTime === 2 && this.time) {
                for (var key in this.time) {
                  dates.push(key);
                }
                firstDate.html(dates[0]);
                firstWeek.html(vlm.Utils.getWeek(dates[0]))
                secondDate.html(dates[1]);
                secondWeek.html(vlm.Utils.getWeek(dates[1]));
              }
            },
            // 渲染日期
            drawDate: function (odate) { // 参数 odate 为日期对象格式
              var dateWarp, titleDate, dd, year, month, date, days, weekStart, i, l, ddHtml = [],
                textNode, disableDate, ableStartDate, rangeStartDate, rangeEndDate, tempDate;
              var nowDate = new Date(),
                nowyear = nowDate.getFullYear(),
                nowmonth = nowDate.getMonth(),
                nowdate = nowDate.getDate();
              ableStartDate = this.startAbleDate;
              ableStartDate = ableStartDate ? new Date(vlm.Utils.format_date(ableStartDate, "Ymd")).getDate() : nowdate;

              disableDate = this.disableDate;

              dateWarp = this.dateWarp = document.createElement('dl');
              dateWarp.className = 'ca_month';
              dateWarp.innerHTML = this._template.join('');
              this.year = year = odate.getFullYear();
              this.month = month = odate.getMonth() + 1;
              this.date = date = odate.getDate();
              this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
              tims = this.time;
              this.result.length = 0;
              for (var key in tims) {
                this.result.push(key);
              }
              textNode = document.createTextNode(year + '年' + month + '月');
              titleDate.appendChild(textNode);
              //this.btnEvent();

              // 获取模板中唯一的DD元素
              dd = _CalF.$('dd', dateWarp)[0];
              // 获取本月天数
              days = new Date(year, month, 0).getDate();
              // 获取本月第一天是星期几
              weekStart = new Date(year, month - 1, 1).getDay();
              // 开头显示空白段
              for (i = 0; i < weekStart; i++) {
                ddHtml.push('<a>&nbsp;</a>');
              }
              // 循环显示日期
              for (i = 1; i <= days; i++) {
                m = month < 10 ? '0' + month : month;
                d = i < 10 ? '0' + i : i;
                tempDate = new Date(year, m - 1, d);
                if (this.ableDateRange) {
                  rangeStartDate = this.ableDateRange.rangeStartDate;
                  rangeEndDate = this.ableDateRange.rangeEndDate;
                  rangeStartDate = new Date(rangeStartDate.replace(/-/g, "/"));
                  rangeEndDate = new Date(rangeEndDate.replace(/-/g, "/"));

                  if (tempDate <= rangeEndDate && tempDate >= rangeStartDate) {
                    if (this.ableWeekRange && this.ableWeekRange.indexOf(tempDate.getDay()) < 0) {
                      ddHtml.push('<a class="disabled">' + i + '</a>');
                    } else {
                      if (tims[year + '-' + m + '-' + d]) {
                        ddHtml.push('<a class="live selected" data-day="' + year + '-' + m + '-' + d + '"><span class="live_circle">' + i + '</span></a>');
                      } else {
                        ddHtml.push('<a class="live" data-day="' + year + '-' + month + '-' + i + '">' + i + '</a>');
                      }
                    }
                  } else {
                    ddHtml.push('<a class="disabled">' + i + '</a>');
                  }
                } else {
                  if (tims[year + '-' + m + '-' + d]) {
                    if (i == nowdate && month == nowmonth + 1) {
                      pstr = '<a class="live selected" data-day="' + year + '-' + m + '-' + d + '"><span class="live_circle">今天</span></a>';
                    } else {
                      pstr = '<a class="live selected" data-day="' + year + '-' + m + '-' + d + '"><span class="live_circle">' + i + '</span></a>';
                    }
                  } else {
                    if (i == nowdate && month == nowmonth + 1 && year == nowyear) {
                      if (i < ableStartDate) {
                        pstr = '<a class="live disabled">今天</a>';
                      } else {
                        pstr = '<a class="live" data-day="' + year + '-' + m + '-' + d + '">今天</a>';
                      }

                    } else {
                      if ((month == nowmonth + 1 && i < nowdate && year == nowyear) || (month == nowmonth + 1 && i < ableStartDate && year == nowyear)) {
                        pstr = '<a class="live disabled">' + i + '</a>';
                      } else if (disableDate.length > 0) {
                        for (var j = 0; j < disableDate.length; j++) {
                          if (disableDate[j] === year + "-" + m + "-" + d) {
                            pstr = '<a class="live disabled">' + i + '</a>';
                            break;
                          } else {
                            pstr = '<a class="live" data-day="' + year + '-' + m + '-' + d + '">' + i + '</a>';
                          }
                        }
                      } else {
                        pstr = '<a class="live" data-day="' + year + '-' + m + '-' + d + '">' + i + '</a>';
                      }
                    }
                  }
                  ddHtml.push(pstr);
                }
              }

              dd.innerHTML = ddHtml.join('');

              // 添加
              this.Warpper.appendChild(dateWarp);
              //IE6 select遮罩
              //            var ie6 = !!window.ActiveXObject && !window.XMLHttpRequest;
              //            if (ie6) dateWarp.appendChild(this.createIframe());
              // A link事件绑定
              //this.linkOn();
            },
            drawLastDate: function (odate) { // 参数 odate 为日期对象格式
              var dateWarp, titleDate, dd, year, month, date, days, weekStart, i, l, ddHtml = [],
                textNode, m, d;
              var nowDate = new Date(),
                nowyear = nowDate.getFullYear(),
                nowmonth = nowDate.getMonth(),
                nowdate = nowDate.getDate();
              this.dateWarp = dateWarp = document.createElement('dl');
              dateWarp.className = 'ca_month';
              dateWarp.innerHTML = this._template.join('');
              this.year = year = odate.getFullYear();
              this.month = month = odate.getMonth() + 1;
              this.date = date = odate.getDate();
              this.titleDate = titleDate = _CalF.$('.title-date', dateWarp)[0];
              tims = this.time;
              this.result.length = 0;
              for (var key in tims) {
                this.result.push(key);
              }
              textNode = document.createTextNode(year + '年' + month + '月');
              titleDate.appendChild(textNode);
              //this.btnEvent();

              // 获取模板中唯一的DD元素
              dd = _CalF.$('dd', dateWarp)[0];
              // 获取本月天数
              days = new Date(year, month, 0).getDate();
              // 获取本月第一天是星期几
              weekStart = new Date(year, month - 1, 1).getDay();
              // 开头显示空白段
              for (i = 0; i < weekStart; i++) {
                ddHtml.push('<a>&nbsp;</a>');
              }
              // 循环显示日期
              var theLastAbleDayDate = this.theLastAbleDay ? this.theLastAbleDay.getDate() : nowdate;
              var rangeStartDate, rangeEndDate, tempDate;
              for (i = 1; i <= days; i++) {
                m = month < 10 ? '0' + month : month;
                d = i < 10 ? '0' + i : i;
                tempDate = new Date(year, m - 1, d);
                if (this.ableDateRange) {
                  rangeStartDate = this.ableDateRange.rangeStartDate;
                  rangeEndDate = this.ableDateRange.rangeEndDate;
                  rangeStartDate = new Date(rangeStartDate.replace(/-/g, "/"));
                  rangeEndDate = new Date(rangeEndDate.replace(/-/g, "/"));
                  if ((tempDate <= rangeEndDate) && (tempDate >= rangeStartDate)) {
                    if (this.ableWeekRange && this.ableWeekRange.indexOf(tempDate.getDay()) < 0) {
                      ddHtml.push('<a class="disabled">' + i + '</a>');
                    } else {
                      if (tims[year + '-' + m + '-' + d]) {
                        ddHtml.push('<a class="live selected" data-day="' + year + '-' + m + '-' + d + '"><span class="live_circle">' + i + '</span></a>');
                      } else {
                        ddHtml.push('<a class="live" data-day="' + year + '-' + month + '-' + i + '">' + i + '</a>');
                      }
                    }

                  } else {
                    ddHtml.push('<a class="disabled">' + i + '</a>');
                  }
                } else {
                  if (i <= theLastAbleDayDate) {
                    ddHtml.push('<a class="live" data-day="' + year + '-' + m + '-' + d + '">' + i + '</a>');
                  } else {
                    ddHtml.push('<a class="disabled">' + i + '</a>');
                  }
                }
              }

              dd.innerHTML = ddHtml.join('');

              // 添加
              this.Warpper.appendChild(dateWarp);
              //IE6 select遮罩
              //            var ie6 = !!window.ActiveXObject && !window.XMLHttpRequest;
              //            if (ie6) dateWarp.appendChild(this.createIframe());
              // A link事件绑定
              //this.linkOn();
            },
            //        createIframe: function () {
            //            var myIframe = document.createElement('iframe');
            //            myIframe.src = 'about:blank';
            //            myIframe.style.position = 'absolute';
            //            myIframe.style.zIndex = '-1';
            //            myIframe.style.left = '-1px';
            //            myIframe.style.top = 0;
            //            myIframe.style.border = 0;
            //            myIframe.style.filter = 'alpha(opacity= 0 )';
            //            myIframe.style.width = this.container.offsetWidth + 'px';
            //            myIframe.style.height = this.container.offsetHeight + 'px';
            //            return myIframe;
            //        },
            // 移除日期DIV.calendar
            removeDate: function () {
              var odiv = $('#calendarWrap');
              var timer = null;
              if (odiv.length > 0) {
                timer = setTimeout(function () {
                  odiv.remove();
                  clearTimeout(timer);
                }, 500);

              }
            },
            //        // 上一月，下一月按钮事件
            //        btnEvent: function () {
            //            var that = this,
            //                prevmonth = _CalF.$('.prevmonth', this.dateWarp)[0],
            //                nextmonth = _CalF.$('.nextmonth', this.dateWarp)[0];
            //            prevmonth.onclick = function () {
            //                var idate = new Date(that.year, that.month - 2, that.date);
            //                that.drawDate(idate);
            //            };
            //            nextmonth.onclick = function () {
            //                var idate = new Date(that.year, that.month, that.date);
            //                that.drawDate(idate);
            //            };
            //        },
            // A 的事件
            linkOn: function () {
              var that = this;
              $('#' + this.id + 'Date').on("click", "a", function (event) {
                var target = event.target || event.srcElement;
                if (target.tagName == "A" && !(target.className.indexOf('disabled') > -1) && (target.className.indexOf('live') > -1)) {
                  target.innerHTML = '<span class="live_circle">' + (target.innerHTML) + '</span>';
                  // target.classList.add("disabled");
                  target.classList.add('selected');
                  that.linkOver(target);
                } else if (target.className.indexOf('live_circle') > -1) {
                  //已经选中的日期再次点击时target 变为span
                  that.linkOver(target.parentNode);
                }
              });
            },
            /**
             *重置选中状态
             **/
            resetSelected: function () {
              var selectedEle = $(".calendar .selected");
              var result = this.result;
              var dateValue = '';
              var sign = false; //选中标识
              var throughSign = false;
              selectedEle.each(function (index, ele) {
                dateValue = $(ele).attr("data-day");
                if (result.length === 1) {
                  if (dateValue === result[0]) {
                    //$(ele).attr("data-selected", result[i]);
                  } else {
                    $(ele).html($(ele).children().eq(0).html()).removeClass("disabled").removeClass("selected");
                  }
                } else {
                  if (dateValue === result[0] || dateValue === result[1]) {
                    //$(ele).attr("data-selected", result[i]);
                  } else {
                    $(ele).html($(ele).children().eq(0).html()).removeClass("disabled").removeClass("selected");
                  }
                }
              });

              //设置跨越的时间样式
              selectedEle = $(".calendar .selected");
              if (selectedEle.length === 2) {
                selectedEle.each(function (index, ele) {
                  if (sign) {
                    return;
                  }

                  if (index === 0) {
                    var next = ele.nextSibling;
                    while (next && next.className.indexOf('selected') === -1) {
                      throughSign = true;
                      next.className = next.className + ' through';
                      next = next.nextSibling;
                      if (next == null) { //当前月份找不到
                        break;
                      }
                      if (next.className.indexOf("selected") > -1) {
                        sign = true;
                        break;
                      }
                    }
                  }

                  //跨月的情况
                  if (index === 1) {
                    var pre = ele.previousSibling;
                    while (pre && pre.className.indexOf('selected') === -1 && pre.className.indexOf('live') > -1) {
                      throughSign = true;
                      pre.className = pre.className + ' through';
                      pre = pre.previousSibling;
                      if (pre == null) { //当前月份找不到
                        break;
                      }
                    }
                  }
                  if (throughSign) {
                    index === 0 ? $(ele).addClass('selectStart') : $(ele).addClass('selectEnd');
                  }

                });
                selectedEle.eq(0).addClass('selectStart');
                selectedEle.eq(1).addClass('selectEnd');
              } else {
                $(".calendar .through").removeClass('through');
                $(".calendar .selectStart").removeClass('selectStart');
                $(".calendar .selectEnd").removeClass('selectEnd');

              }
            },
            /**
             *显示选中的日期显示在指定位置
             **/
            showSelected: function () {
              var values = this.result;
              var calendar = $("#calendarWrap");
              var tipers = calendar.find(".calendar_tiper .tiper");
              var firstDate = calendar.find(".first_select .date");
              var firstWeek = calendar.find(".first_select .week");
              var secondDate = calendar.find(".second_select .date");
              var secondWeek = calendar.find(".second_select .week");
              if (values.length === 1) {
                firstDate.html(values[0]);
                firstWeek.html(vlm.Utils.getWeek(values[0]));
                secondDate.html('');
                secondWeek.html('');
                tipers.eq(1).addClass("current").siblings().removeClass("current");
              } else if (values.length === 0) {
                firstDate.html('');
                firstWeek.html('');
                secondDate.html('');
                secondWeek.html('');
                tipers.eq(0).addClass("current").siblings().removeClass("current");
              } else {
                firstDate.html(values[0]);
                firstWeek.html(vlm.Utils.getWeek(values[0]));
                secondDate.html(values[1]);
                secondWeek.html(vlm.Utils.getWeek(values[1]));
              }
            },
            /**
             *控制确认按钮显示
             **/
            showComfirmBtn: function (sign) {
              var selectDate = this.result;
              var comfirmBtn = $("#comfirmBtn");
              var totelEle = comfirmBtn.find(".total");
              if (sign) {
                var firstDate = vlm.Utils.format_date(selectDate[0], 'md');
                var secondDate = vlm.Utils.format_date(selectDate[1], 'md');
                var days = (Math.round(((new Date(selectDate[1].replace(/-/g, "/"))) - new Date(selectDate[0].replace(/-/g, "/"))) / (1000 * 60 * 60 * 24)))
                totelEle.html(firstDate + "至" + secondDate + '(' + days + '晚)');
                comfirmBtn.slideDown();
              } else {
                comfirmBtn.slideUp();
              }
            },
            /**
             *@desc 设置日期不可选择  从startDate 一直endDate不可选  如果没有endDate 一直到结束不可选
             ×@param  startDate  2016-06-24   endDate   option
             **/
            disableDateFrom: function (startDate, endDate) {
              var dayDate = $("#calendarWrap").find("a[data-day]");
              var startIndex = null;
              var endIndex = null;
              var temp, tempDate, startDateValue, endDateValue;
              //TODO 此处循环效率低   可待优化
              dayDate.each(function (index, ele) {
                temp = $(ele).attr("data-day");
                tempDate = new Date(temp.replace(/-/g, "/"));
                if (startDate === temp) {
                  startIndex = index;
                }
                if (!endDate) {
                  if (startIndex && index > startIndex) {
                    $(ele).addClass("disabled");
                  } else {
                    $(ele).removeClass("disabled");
                  }
                } else {
                  startDateValue = new Date(startDate.replace(/-/g, "/"));
                  endDateValue = new Date(endDate.replace(/-/g, "/"));
                  if (tempDate >= startDateValue && tempDate <= endDateValue) {
                    $(ele).addClass("disabled");
                  }
                }
              });
            },
            /**
             *@desc 设置日期可选 默认从startDate开始到日历结束，
             *@param startDate   2016-06-24  默认是今天
             *@param endDate options  new Date(fullYear, month + this.num, day);
             */
            ableDateFrom: function (startDate, endDate) {
              var now = new Date();
              var fullYear = now.getFullYear();
              var month = now.getMonth();
              var day = now.getDate();
              //所有的日历日期
              var dayDate = $("#calendarWrap").find("a[data-day]");

              var startDate = startDate || vlm.Utils.format_date(fullYear + "-" + (month + 1) + "-" + day, "Ymd");
              var endDate = endDate || new Date(fullYear, month + this.num, day);
              var currentDay, startDateValue, endDateValue;
              if (this.result.length === 0) {
                dayDate.each(function (index, ele) {
                  currentDay = $(ele).attr("data-day");
                  currentDay = new Date(currentDay.replace(/-/g, "/"));
                  startDateValue = new Date(startDate.replace(/-/g, "/"));
                  endDateValue = endDate;
                  if (currentDay >= startDateValue && currentDay <= endDateValue) {
                    $(ele).removeClass("disabled");
                  }
                });
              }
            },
            /**
             *每次点击结束，将选择结果进行处理
             **/
            linkOver: function (target) {
              var selectValue = target.getAttribute("data-day");
              if (this.result.length === 0 || this.result.length === this.selectTime) {
                this.result = [];
                this.result.push(selectValue);
                this.showComfirmBtn(0);
              } else {
                var oneSelect = new Date(this.result[0]);
                var twoSelect = new Date(selectValue);
                if (twoSelect > oneSelect) {
                  this.result.push(selectValue);
                  //控制确认按钮是否显示
                  if (!this.noComfirmBtn) {
                    this.showComfirmBtn(1);
                  }
                } else {
                  this.result[0] = selectValue;
                }
              }
              console.info(this.result);

              //重置选中状态
              this.resetSelected();
              //选择第一个日期后，如果存在disableDateAfterLength
              if (this.result.length === 1 && this.disableDateAfterLength) {
                //disableDateStart 参数指定某个日期后的日期不可选
                var firstSelect = this.result[0].replace(/-/g, "/");
                var firstSelectDate = new Date(firstSelect);
                var validSelectEndDate = new Date(firstSelectDate.getFullYear(), firstSelectDate.getMonth(), firstSelectDate.getDate() + this.disableDateAfterLength);
                this.disableDateFrom(vlm.Utils.format_date(validSelectEndDate.getFullYear() + '-' + (validSelectEndDate.getMonth() + 1) + '-' + validSelectEndDate.getDate(), 'Ymd')); <<
                <<
                << < HEAD
              }; ===
              ===
              =
            }; >>>
            >>>
            > c21fe00a26c5e23126d5c30595b4c1c47913c14d
            if (this.result.length === 1 && this.minDuration) {
              var firstSelect = this.result[0].replace(/-/g, "/");
              var firstSelectDate = new Date(firstSelect);
              var disableDateStart = new Date(firstSelectDate.getFullYear(), firstSelectDate.getMonth(), firstSelectDate.getDate() + 1);
              var disableDateEnd = new Date(firstSelectDate.getFullYear(), firstSelectDate.getMonth(), firstSelectDate.getDate() + (this.minDuration - 2));
              //做日期格式转换   需要2016-06-13这样的格式
              disableDateStart = vlm.Utils.format_date(disableDateStart.getFullYear() + '-' + (disableDateStart.getMonth() + 1) + '-' + disableDateStart.getDate(), 'Ymd');
              disableDateEnd = vlm.Utils.format_date(disableDateEnd.getFullYear() + '-' + (disableDateEnd.getMonth() + 1) + '-' + disableDateEnd.getDate(), 'Ymd');
              this.disableDateFrom(disableDateStart, disableDateEnd); <<
              <<
              << < HEAD
            }; ===
            ===
            =
          }; >>>
          >>>
          > c21fe00a26c5e23126d5c30595b4c1c47913c14d

          //显示选中日期到页面顶端
          this.showSelected();
          //控制确认按钮是否显示
          if ((this.noComfirmBtn && this.result.length === this.selectTime) || this.selectTime === 1) {
            this.saveSelectDate();
          }
        },
        linkReset: function (ele) {
            var that = this,
              ospan = $('.live_circle'),
              l = ospan.length,
              links = _CalF.$('.live', this.dd),
              len = links.length;
            //console.log(ospan[1].parentNode.outerHTML+ospan.length);
            if (that.op == 0) {
              for (var i = 0; i < l; i++) {
                var v = ospan[i].parentNode.getAttribute("data-day");
                //alert(v);
                var a = v.split("-");
                ospan[i].parentNode.innerHTML = a[a.length - 1];
              }
              for (i = 0; i < ele; i++) {
                _CalF.addClass("disabled", links[i]);
              }
              for (i = ele + 30; i < len; i++) {
                _CalF.addClass("disabled", links[i]);
              }
              return false;
            }
          },
          //时间绑定
          eventBind: function () {
            this.inputEvent();
            this.outClick();

          },
          saveSelectDate: function () {
            var that = this;
            var obj = {};
            if (that.selectTime === 2) {
              if ($('#' + that.checkInTimeOptId).length > 0 && $("#" + that.checkOutTimeOptId).length > 0) {
                _CalF.$('#' + that.checkInTimeOptId).innerHTML = that.result[0];
                _CalF.$('#' + that.checkOutTimeOptId).innerHTML = that.result[1];
              }
              var times = [that.result[0], that.result[1]];
              obj[that.result[0]] = that._word[that.type][0];
              obj[that.result[1]] = that._word[that.type][1];
              that.time = obj;
            } else {
              if ($('#' + that.checkInTimeOptId).length > 0) {
                _CalF.$('#' + that.checkInTimeOptId).innerHTML = that.result[0];
              }
              var times = [that.result[0]];
              obj[that.result[0]] = that._word[that.type][0];
              that.time = obj;
            }
            _CalF.$('#' + that.id).setAttribute("data-selectedTime", times);
            //修改calendar传入的参数time的值

            that.removeDate();

            //执行回调函数 将选择的日期作为参数传入
            if (typeof that.callback === 'function') {
              that.callback(that.result, that);
            }
            //清空result
            that.result = [];
          },
          //确认事件
          comfirmClick: function () {
            var btn = $("#comfirmBtn");
            var that = this;
            btn.click(function () {
              that.saveSelectDate();
            });
          },
          //格式化日期
          formatTime: function (fmt, date) {
            var o = {
              "M+": date.getMonth() + 1, //月份
              "d+": date.getDate(), //日
              "h+": date.getHours(), //小时
              "m+": date.getMinutes(), //分
              "s+": date.getSeconds(), //秒
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度
              "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
              if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
          },
          //格式化输出日期
          formatDisplayTime: function (fmt, date) {

          },
          //清除选中日期
          clearClick: function () {
            var that = this;
            $(".calendar_header").on("click", ".header_clean", function (event) {
              that.result.length = 0;
              console.info(that.result);
              that.resetSelected();
              that.showSelected();
              that.ableDateFrom();
              that.showComfirmBtn(0);
            });
          },
          // 表单的事件
          inputEvent: function () {
            var that = this;
            var date = new Date();
            var startDate;
            var nowY = date.getFullYear();
            var nowM = date.getMonth();
            var nowD = date.getDate();

            if (that.ableDateRange) {
              startDate = new Date(that.ableDateRange['rangeStartDate'].replace(/-/g, "/"));
              nowY = startDate.getFullYear();
              nowM = startDate.getMonth();
              nowD = startDate.getDate();
            }
            this.input.click(function (event) {
              that.createContainer();
              that.initDate();
              for (var i = 0; i < that.num; i++) {
                if (i == (that.num - 1) && that.num > 1) {
                  var idate = new Date(nowY, nowM + i, 01);
                  that.drawLastDate(idate);
                } else {
                  var idate = new Date(nowY, nowM + i, 01);
                  that.drawDate(idate);
                }
              }
              //事件绑定
              that.linkOn();
              that.comfirmClick();
              that.clearClick();
              //初始化日期状态
              that.resetSelected();
              that.showSelected();
            });
          },
          // 鼠标在对象区域外点击，移除日期层
          outClick: function () {
            var that = this;
            _CalF.bind(document, 'click', function (event) {
              event = event || window.event;
              var target = event.target || event.srcElement;
              if (target.className.indexOf("header_back") > -1 || target.className.indexOf("go_back") > -1) {
                that.removeDate();
              }
            });
          }
      };
      exports.Calender = Calender;
    }(typeof exports === 'undefined' ? (this.ATplugins ? this.ATplugins : this.ATplugins = {}) : exports));
