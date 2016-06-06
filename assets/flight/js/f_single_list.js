"use strict";

var fSingleList = {

  addHandler: function (target, eventType, handle) {
    if (document.addEventListener) {
      this.addHandler = function (target, eventType, handle) {
        target.addEventListener(eventType, handle, false);
      }
    } else if (document.attachEvent) {
      this.addHandler = function (target, eventType, handle) {
        target.attachEvent('on' + eventType, function () {
          handle.call(target);
        });
      }
    } else {
      this.addHandler = function (target, eventType, handle) {
        target['on' + eventType] = handle;
      }
    }
    this.addHandler(target, eventType, handle);
  },

  tAjax: function (questUrl, data, Code, ForeEndType, Callback) {
    var that = this, dataObj =
    {
      Parameters: data,
      ForeEndType: ForeEndType,
      Code: Code
    };
    questUrl = questUrl ? questUrl : "";
    vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
  },
  dateChangeHandler:function(){
    var searchZone = document.querySelector('.searchZone'), that = this;
    this.addHandler(searchZone, 'click', function (e) {
      var e = e || window.event, target = e.target || e.srcElement, temDate = "", lineMaxDate = "", newUrl = "";
      var tem = "", plusOne = "", minusOne = "", monthNum = "", dateNum = "";
      temDate = document.querySelector('#setOffDateSingle').getAttribute('date-full-value');
      if (target.className == "previousDay") {
        lineMaxDate = new Date().getFullYear() + 1 + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
        tem = new Date(temDate.replace(/-/g, "/"));
        minusOne = new Date(tem.setDate(tem.getDate() - 1));
        monthNum = (minusOne.getMonth() + 1) < 10 ? "0" + parseInt((minusOne.getMonth() + 1)) : minusOne.getMonth() + 1;
        dateNum = (minusOne.getDate()) < 10 ? "0" + parseInt(minusOne.getDate()) : minusOne.getDate();
        minusOne = minusOne.getFullYear() + '-' + monthNum + '-' + dateNum;
        if (new Date(minusOne.replace(/-/g, "/") + ' 23:59:59') >= new Date()){
          that.fadeHandler('show');
          that.postObj.isClearAll = 1;
          that.postObj.departDate = minusOne;
          that.pageHandler();
          that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
        }
      } else if (target.className == "nextDay") {
        lineMaxDate = new Date().getFullYear() + 1 + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
        tem = new Date(temDate.replace(/-/g, "/"));
        plusOne = new Date(tem.setDate(tem.getDate() + 1));
        monthNum = (plusOne.getMonth() + 1) < 10 ? "0" + parseInt((plusOne.getMonth() + 1)) : plusOne.getMonth() + 1;
        dateNum = (plusOne.getDate()) < 10 ? "0" + parseInt(plusOne.getDate()) : plusOne.getDate();
        plusOne = plusOne.getFullYear() + '-' + monthNum + '-' + dateNum;
        if (new Date(plusOne.replace(/-/g, "/") + ' 00:00:00') > new Date() && new Date(plusOne.replace(/-/g, "/")) < new Date(lineMaxDate + ' 00:00:00')) {
          that.fadeHandler('show');
          that.postObj.isClearAll = 1;
          that.postObj.departDate = plusOne;
          that.pageHandler();
          that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
        }
      }
    });
    return this
  },
  eventHandler: function () {
    var content = document.querySelector('.content'), lis = document.querySelectorAll('.flight_ul li'), that = this, tem = {}, storage = window.sessionStorage;
    for (var i = 0, len = lis.length; i < len; i++) {
      this.addHandler(lis[i], 'click', function () {
        var setId = this.getAttribute('data-set-id');
        that.currrentFlightList.flightInfos.forEach(function (item, index) {
          if (item.setID == setId) {
            tem = item;
            return false;
          }
        });
        storage.setItem('currentFlight', JSON.stringify(tem));
        window.location.href = "f_seat_choose.html";
      })
    }
    return this;
  },

  createTags: function () {
    var data = arguments[0];
    var tempString = "", outputString = "", that = fSingleList;
    tempString = $("#template_flight_single_list").html();
    outputString = ejs.render(tempString, data);
    $(".flight_ul").eq(0).html(outputString);
    return this;
  },

  renderHandler: function () {
    var result = arguments[0], that = fSingleList, storage = window.sessionStorage, no_result = document.querySelector('#no_flight_data');
    that.fadeHandler();
    if (result.success && result.code == "200") {
      if (result.data.flightInfos.length < 1) {
        no_result.style.display = "block";
        $('#loadMore').hide();
        that.first == true ? that.filterHandler().dateCalender() : that.dateCalender();
        that.first = false;
      } else {
        that.currrentFlightList = result.data;
        that.first == true ? that.filterHandler(result.data.airCorpCodeList).loadMoreHandler(true) :that.loadMoreHandler(false);
        that.first = false;
        that.createTags(that.currrentFlightList).fadeHandler().eventHandler().dateCalender();
      }
    } else {
      no_result.style.display = "block";
      $('#loadMore').hide();
      that.filterHandler().dateCalender();
    }
  },

  dateCalender: function () {
    var tem = {start: this.postObj.departDate}, timeObj = {}, fIndexInfoObj = {}, storage = window.sessionStorage;
    fIndexInfoObj = JSON.parse(storage.getItem('fIndexInfo'));
    timeObj[tem.start] = tem.start;
    var dates = document.querySelectorAll('#timeSingle .monthDay'), weeks = document.querySelectorAll('#timeSingle .weekWord');
    var myTime2 = new ATplugins.Calender({
      id: "timeSingle",
      selectTime: 1,
      time: timeObj,
      checkInTimeOptId: 'setOffDateSingle',
      callback: function () {
        var dateSource = arguments[0], that = fSingleList;
        that.fadeHandler('show');
        fIndexInfoObj.data.departDate = dateSource[0];
        storage.setItem('fIndexInfo', JSON.stringify(fIndexInfoObj));
        that.postObj.departDate = dateSource[0];
        that.pageHandler();
        that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
      }
    });
    dates[0].setAttribute('date-full-value', this.postObj.departDate);
    dates[0].innerHTML = this.returnDay(this.postObj.departDate);
    weeks[0].innerHTML = this.setWeekItems(this.postObj.departDate);
  },
  loadMoreHandler: function () {
    var loadMore = document.querySelector("#loadMore"), that = fSingleList, tag = arguments[0];
    if (this.currrentFlightList.pageNo >= this.currrentFlightList.pageCount){
      $('#loadMore').html("没有更多信息了!").fadeOut(3000);
    } else {
      loadMore.innerHTML = "点击查看更多...";
      if(tag){
        this.addHandler(loadMore, 'click', function () {
          that.loadMoreData();
        });
      }
    }
    return this;
  },

  loadMoreData: function () {
    var loadMore = document.querySelector("#loadMore"), storage = window.sessionStorage, newUrl = "";
    if (this.currrentFlightList.pageNo >= this.currrentFlightList.pageCount) {
      $('#loadMore').html("没有更多信息了!").fadeOut(3000);
    } else {
      this.postObj.pageNo++;
      loadMore.innerHTML = "正在加载...";
      storage.setItem('fIndexInfo', JSON.stringify({type: "return", data: this.postObj}));
      this.pageHandler().tAjax("", this.postObj, "3001", 3, this.renderHandler);
    }
  },

  setWeekItems: function () {
    var arg = arguments[0].replace(/T.*/, ''), index = new Date(arg.replace(/-/g, '/')).getDay(), week = '';
    switch (index) {
      case 0 :
        week = '周日';
        break;
      case 1 :
        week = '周一';
        break;
      case 2 :
        week = '周二';
        break;
      case 3 :
        week = '周三';
        break;
      case 4 :
        week = '周四';
        break;
      case 5 :
        week = '周五';
        break;
      case 6 :
        week = '周六';
        break;
      default :
        void(0)
    }
    return week;
  },

  returnDay: function () {
    var array = [], arg = arguments[0];
    array = arg.split('-');
    array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
    array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
    return array[1] + '月' + array[2] + '日';
  },

  fadeHandler: function () {
    var tag = arguments[0] || "hide";
    if (tag == "show") {
      $("#preloader").fadeIn();
      $("#status").delay(400).fadeIn("medium");
    } else {
      $("#status").fadeOut();
      $("#preloader").delay(400).fadeOut("medium");
    }
    return this;
  },

  titleInit: function () {
    var spans = document.querySelectorAll('.header h3 span');
    spans[0].innerHTML = this.postObj.fromCity;
    spans[1].innerHTML = this.postObj.toCity
    return this;
  },

  parseUrlHandler: function (url, isEncode) {
    var isEncode = isEncode || false, reg = /([^=&?]+)=([^=&?]+)/g, obj = {}, url = url;
    url.replace(reg, function () {
      var arg = arguments;
      obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
    });
    return obj;
  },

  pageHandler: function (url) {
    var newUrl = url, that = fSingleList;
    that.postObj.pageSize =10*(parseInt(that.postObj.pageSize/10+1));
    that.postObj.pageNo = 1;
    return that;
  },

  filerCallBack: function () {
    console.log(arguments);
    var transferData = arguments, that = fSingleList;
    if (that.postObj.internationalOrDomestic == "international") {
      if (arguments[1].id == "Tax") {
        that.fadeHandler('show')
        var dd = arguments[1].querySelector('dd');
        if (dd.innerHTML == "含税价") {
          that.postObj.hasTax = 1;
          that.renderHandler({success: 1, code: 200, data: that.currrentFlightList});
        } else if (dd.innerHTML == "不含税价") {
          that.postObj.hasTax = 0;
          that.renderHandler({success: 1, code: 200, data: that.currrentFlightList});
        }
      } else {
        console.log(transferData[0])
        that.postObj.isDirectFlight = transferData[0].filters[0].FilterValues[0];
        that.postObj.isHideSharedFlight = transferData[0].filters[1].FilterValues[0];
        that.postObj.cabinClass = transferData[0].filters[2].FilterValues[0];
        that.postObj.airCorpCode = transferData[0].filters[3].FilterValues[0];
        that.postObj.priorityRule = transferData[0].sortTypes[0];
        if (that.postObj.airCorpCode == undefined || that.postObj.airCorpCode == "") {
          delete that.postObj.airCorpCode;
        }
        that.pageHandler();
        that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
      }
    } else {
      if (arguments[1].id == "Price") {
        var dd = arguments[1].querySelector('dd');
        if (dd.innerHTML == "价格") {
          that.postObj.priorityRule = 2;
          that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
        } else if (dd.innerHTML == "从低到高") {
          that.postObj.priorityRule = 0;
          that.pageHandler();
          that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
        }
      } else {
        that.postObj.isDirectFlight = transferData[0].filters[0].FilterValues[0];
        that.postObj.isHideSharedFlight = transferData[0].filters[1].FilterValues[0];
        that.postObj.departStartHour = transferData[0].filters[2].FilterValues[0].substring(0, 2);
        that.postObj.departEndHour = transferData[0].filters[2].FilterValues[0].substring(3);
        that.postObj.cabinClass = transferData[0].filters[3].FilterValues[0];
        that.postObj.airCorpCode = transferData[0].filters[4].FilterValues[0];
        if (transferData[0].sortTypes[0].indexOf('isDesc') > -1) {
          that.postObj.isDesc = transferData[0].sortTypes[0].substring(7);
          that.postObj.priorityRule = 0;
        } else {
          that.postObj.priorityRule = transferData[0].sortTypes[0];
          delete that.postObj.isDesc
        }
        if (that.postObj.airCorpCode == undefined || that.postObj.airCorpCode == "") {
          delete that.postObj.airCorpCode;
        }
        that.pageHandler();
        that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
      }
    }
  },

  filterHandler: function (data) {
    var dataTransfer = data || [], tempArray = [{filterText: "不限", filterValue: ""}], f_data = {}, that = this;
    if (dataTransfer.length > 1) {
      dataTransfer.forEach(function (array, item) {
        var temObj = {};
        temObj.filterText = array.airCorpName;
        temObj.filterValue = array.airCorpCode;
        tempArray.push(temObj);
      });
    }
    if (this.postObj.internationalOrDomestic == "international") {
      f_data = {
        Sort: {
          title: "优选",
          c: "f_foot_sort",
          type: 1,
          key: "sortTypes",
          listData: [
            {sortText: "不限", sortValue: 0}, {sortText: "直飞优先", sortValue: 1}, {sortText: "低价优先", sortValue: 2},
            {sortText: "耗时短优先", sortValue: 3}]
        },
        Screen: {
          title: "筛选", /*名字*/
          c: "foot_screen",
          type: 2, /*类型*/
          key: 'filters',
          listData: [
            {
              allowMultiSelect: 0,
              filterType: 4,
              item: [{
                filterText: "不限",
                filterValue: "false"
              }, {
                filterText: "仅看直飞",
                filterValue: "true"
              }],
              sortNumber: 0,
              title: "直飞"
            }, {
              allowMultiSelect: 0,
              filterType: 3,
              item: [{
                filterText: "不限",
                filterValue: "false"
              }, {
                filterText: "隐藏共享",
                filterValue: "true"
              }],
              sortNumber: 1,
              title: "共享航班"
            }, {
              allowMultiSelect: 0,
              filterType: 2,
              item: [
                {
                  filterText: "经济舱",
                  filterValue: "economy"
                },
                {
                  filterText: "超级经济舱",
                  filterValue: "economyPremium"
                },
                {
                  filterText: "商务舱",
                  filterValue: "business"
                },
                {
                  filterText: "头等舱",
                  filterValue: "first"
                }

              ],
              sortNumber: 3,
              title: "舱位"
            },
            {
              allowMultiSelect: 0,
              filterType: 1,
              item: tempArray,
              sortNumber: 3,
              title: "航空公司"
            }
          ]
        },
        Tax: {
          title: "含税价",
          c: "f_tax_sort",
          type: 0,
          key: 'tax',
          listData: ["含税价", "不含税价"]
        }
      };
    } else {
      f_data = {
        Sort: {
          title: "起飞早到晚",
          c: "f_foot_sort",
          type: 1,
          key: "sortTypes",
          listData: [
            {sortText: "直飞优先", sortValue: 1}, {sortText: "低价优先", sortValue: 2},
            {sortText: "耗时短优先", sortValue: 3}, {sortText: "起飞早到晚", sortValue: "isDesc_false"},
            {sortText: "起飞晚到早", sortValue: "isDesc_true"}
          ]
        },
        Screen: {
          title: "筛选", /*名字*/
          c: "foot_screen",
          type: 2, /*类型*/
          key: 'filters',
          listData: [
            {
              allowMultiSelect: 0,
              filterType: 5,
              item: [{
                filterText: "不限",
                filterValue: "false"
              }, {
                filterText: "仅看直飞",
                filterValue: "true"
              }],
              sortNumber: 0,
              title: "直飞"
            }, {
              allowMultiSelect: 0,
              filterType: 4,
              item: [{
                filterText: "不限",
                filterValue: "false"
              }, {
                filterText: "隐藏共享",
                filterValue: "true"
              }],
              sortNumber: 1,
              title: "共享"
            }, {
              allowMultiSelect: 0,
              filterType: 3,
              item: [{
                filterText: "不限",
                filterValue: "00-24"
              }, {
                filterText: "00:00 - 06:00",
                filterValue: "00-06"
              }, {
                filterText: "06:00 - 12:00",
                filterValue: "06-12"
              }, {
                filterText: "12:00 - 18:00",
                filterValue: "12-18"
              }, {
                filterText: "18:00 - 24:00",
                filterValue: "18-24"
              }],
              sortNumber: 2,
              title: "起飞时段"
            }, {
              allowMultiSelect: 0,
              filterType: 2,
              item: [
                {
                  filterText: "经济舱",
                  filterValue: "economy"
                },
                {
                  filterText: "超级经济舱",
                  filterValue: "economyPremium"
                },
                {
                  filterText: "商务舱",
                  filterValue: "business"
                },
                {
                  filterText: "头等舱",
                  filterValue: "first"
                }

              ],
              sortNumber: 3,
              title: "舱位"
            },
            {
              allowMultiSelect: 0,
              filterType: 1,
              item: tempArray,
              sortNumber: 3,
              title: "航空公司"
            }
          ]
        },
        Price: {
          title: "价格",
          c: "f_tax_sort",
          type: 0,
          key: 'tax',
          listData: ["从低到高", "价格"]
        }
      }
    }
    if (footer) {
      footer.data = f_data;
      footer.callback = that.filerCallBack;
    }
    footer.filters.init();
    return this
  },

  airCompanyHandler: function () {
    var data = arguments[0], tag = 0, tem = [], that = fSingleList;
    Array.prototype.distinct = function () {
      var sameObj = function (a, b) {
        var tag = true;
        if (!a || !b)return false;
        for (var x in a) {
          if (!b[x])
            return false;
          if (typeof(a[x]) === 'object') {
            tag = sameObj(a[x], b[x]);
          } else {
            if (a[x] !== b[x])
              return false;
          }
        }
        return tag;
      };
      var newArr = [], obj = {};
      for (var i = 0, len = this.length; i < len; i++) {
        if (!sameObj(obj[typeof(this[i]) + this[i]], this[i])) {
          newArr.push(this[i]);
          obj[typeof(this[i]) + this[i]] = this[i];
        }
      }
      return newArr;
    };
    data.forEach(function (array) {
      tem.push(array.airCorpCode);
    });
    tem = tem.distinct();
    return tem.length > 1 ? 1 : 0
  },

  init: function () {
    var postObj = this.parseUrlHandler(window.location.href, true);
    this.postObj = postObj;
    this.first = true;
    this.titleInit().dateChangeHandler().tAjax("", this.postObj, "3001", 3, this.renderHandler);
  }
};
fSingleList.init();
