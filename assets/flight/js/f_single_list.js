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
    var content = document.querySelector('.content'), lis = document.querySelectorAll('.flight_ul li'), that = this, tem = {}, storage = window.localStorage;
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
        window.location.href = "f_seat_choose.html?hasTax="+that.postObj.hasTax+"&internationalOrDomestic="+that.postObj.internationalOrDomestic;
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
    var result = arguments[0], that = fSingleList, storage = window.localStorage, no_result = document.querySelector('#no_flight_data');
    that.fadeHandler();
    if (result.success && result.code == "200") {
      no_result.style.display = "none";
      if (result.data.flightInfos.length < 1) {
        no_result.style.display = "block";
        $('#loadMore').hide();
        $(".flight_ul").eq(0).html("");
        that.first == true ? that.filterHandler().dateCalender() : that.dateCalender();
        that.first = false;
      } else {
        that.currrentFlightList = result.data;
        that.first == true ? that.filterHandler(result.data.airCorpCodeList).loadMoreHandler(true) :that.loadMoreHandler(false);
        that.first = false;
        that.createTags(that.currrentFlightList).delayLoadImage().fadeHandler().eventHandler().dateCalender();
      }
    } else {
      if(!that.first){
        $(".flight_ul").eq(0).html("");
      }
      no_result.style.display = "block";
      $('#loadMore').hide();
      that.filterHandler().dateCalender();
    }
  },

  dateCalender: function () {
    var tem = {start: this.postObj.departDate}, timeObj = {}, fIndexInfoObj = {},that = this, storage = window.sessionStorage;
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
    return this;
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
    var loadMore = document.querySelector("#loadMore"), storage = window.localStorage, newUrl = "";
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
    var spans = document.querySelectorAll('.header>h3>span');
    spans[0].innerHTML = this.postObj.fromCity;
    spans[1].innerHTML = this.postObj.toCity;
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
    console.log(arguments[0])
    var transferData = arguments[0], that = fSingleList;
    if (that.postObj.internationalOrDomestic == "international"){
          that.postObj.isDirectFlight = transferData.filters[0].FilterValues[0];
          that.postObj.isHideSharedFlight = transferData.filters[1].FilterValues[0];
          that.postObj.departStartHour = transferData.filters[2].FilterValues[0].substring(0, 2);
          that.postObj.departEndHour = transferData.filters[2].FilterValues[0].substring(3);
          that.postObj.cabinClass = transferData.filters[3].FilterValues[0];
          that.postObj.airCorpCode = transferData.filters[4].FilterValues[0];
          that.postObj.hasTax = transferData.transformTypes.FilterValues.substring(8) == "false"?0:1;
          if (transferData.sortTypes[0].indexOf('isDesc') > -1) {
             that.postObj.isDesc = transferData.sortTypes[0].substring(7);
             that.postObj.priorityRule = 0;
          } else {
             that.postObj.priorityRule = transferData.sortTypes[0];
             delete that.postObj.isDesc
         }
          that.pageHandler();
         if(arguments.length==2){
            that.renderHandler({success: 1, code: 200, data: that.currrentFlightList});
           }else{
            that.fadeHandler('show');
            that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
           }
    }else{
          that.postObj.isDirectFlight = transferData.filters[0].FilterValues[0];
          that.postObj.isHideSharedFlight = transferData.filters[1].FilterValues[0];
          that.postObj.departStartHour = transferData.filters[2].FilterValues[0].substring(0, 2);
          that.postObj.departEndHour = transferData.filters[2].FilterValues[0].substring(3);
          that.postObj.cabinClass = transferData.filters[3].FilterValues[0];
          that.postObj.airCorpCode = transferData.filters[4].FilterValues[0];
          that.postObj.priorityRule = transferData.transformTypes.FilterValues;
          if (transferData.timeTypes.FilterValues.indexOf('isDesc') > -1) {
              that.postObj.isDesc = transferData.timeTypes.FilterValues.substring(7);
              that.postObj.priorityRule = 0;
          }else{
            that.postObj.priorityRule = transferData.transformTypes.FilterValues;
            delete that.postObj.isDesc
          }
            that.pageHandler();
            that.fadeHandler('show');
            that.tAjax("", that.postObj, "3001", 3, that.renderHandler);
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
    if (this.postObj.internationalOrDomestic == "international") { /*国际*/
      f_data = {
        sortTypes: {
          candidateTitle : [], /*候选名字组*/
          c : "foot_sort",
          type : 1,
          s : 1,
          key : 'sortTypes',
          isTitleChange:2,  /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:0,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:0,/*是否顺序显示候选组*/
          titleMaxRate:0,  /*最大标题索引值*/
          titleItem:" ",  /*当前题索引值*/
          defaultTitle:{sortText:"优选", sortValue:""}, /*默认名字*/
          clearOtherDl:8,   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为8则不清除
          listData: [
            {sortText: "直飞优先", sortValue: 1}, {sortText: "低价优先", sortValue: 2},
            {sortText: "耗时短优先", sortValue: 3}, {sortText: "起飞早到晚", sortValue: "isDesc_false"},
            {sortText: "起飞晚到早", sortValue: "isDesc_true"}
          ]
        },
        filters : {
          candidateTitle : [],/*候选名字组*/
          c : "foot_screen",
          type : 2,
          s : 2,
          key : 'filters',
          isTitleChange:0,        /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:0,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:0,/*是否顺序显示候选组*/
          clearOtherDl:"",   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为""则不清除
          titleMaxRate:0,  /*最大标题索引值*/
          titleItem:" ",  /*当前题索引值*/
          defaultTitle:{sortText:"筛选", sortValue:""}, /*默认名字*/
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
              title: "共享航班"
            },
            {
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
            },
            {
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
        transformTypes : {
          candidateTitle : [{sortText:"含税价", sortValue:"has_tax_true"},{sortText:"不含税价", sortValue:"has_tax_false"}], /*候选名字组*/
          c : "foot_transform",
          type : 0,
          s : 1,
          key : 'transformTypes',
          isTitleChange:1,  /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:1,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:1,/*是否顺序显示候选组*/
          titleMaxRate:1,  /*最大标题索引值*/
          titleItem:0,  /*当前题索引值*/
          defaultTitle:{sortText:"含税价", sortValue:"has_tax_true"}, /*默认名字*/
          clearOtherDl:8,   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为8则不清除
          listData : []
        }
      };

    } else {
      f_data = {
        timeTypes : {
          candidateTitle : [{sortText:"起飞早到晚", sortValue:"isDesc_false"},{sortText:"起飞晚到早", sortValue:"isDesc_true"}], /*候选名字组*/
          c : "foot_transform",
          type : 0,
          s : 1,
          key : 'timeTypes',
          isTitleChange:1,  /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:0,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:1,/*是否顺序显示候选组*/
          titleMaxRate:1,  /*最大标题索引值*/
          titleItem:0,  /*当前题索引值*/
          defaultTitle:{sortText:"时间", sortValue:""}, /*默认名字*/
          clearOtherDl:2,   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为8则不清除
          listData : []
        },
        filters : {
          candidateTitle : [],/*候选名字组*/
          c : "foot_screen",
          type : 2,
          s : 2,
          key : 'filters',
          isTitleChange:0,        /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:0,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:0,/*是否顺序显示候选组*/
          clearOtherDl:"",   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为""则不清除
          titleMaxRate:0,  /*最大标题索引值*/
          titleItem:" ",  /*当前题索引值*/
          defaultTitle:{sortText:"筛选", sortValue:""}, /*默认名字*/
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
              title: "共享航班"
            },
            {
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
            },
            {
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
        transformTypes : {
          candidateTitle : [{sortText:"从低到高", sortValue:"2"}], /*候选名字组*/  //that.postObj.priorityRule = 2 从低到高; that.postObj.priorityRule = 0;不排序
          c : "foot_transform",
          type : 0,
          s : 1,
          key : 'transformTypes',
          isTitleChange:1,  /*0, 不换,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*/
          isAddDl:0,   /*点击完后是否把底部当前操作dl返回  0不返回， 1返回*/
          isArrayItem:1,/*是否顺序显示候选组*/
          titleMaxRate:1,  /*最大标题索引值*/
          titleItem:"",  /*当前题索引值*/
          defaultTitle:{sortText:"价格", sortValue:"0"}, /*默认名字*/
          clearOtherDl:0,   //清空另一个dl的高亮状态，    序号 值为1就清除1，值为8则不清除
          listData : []
        }
      };

    }
    if (footer) {
      footer.data = f_data;
      footer.callback = that.filerCallBack;
    }
    footer.filters.init();
    return this
  },
  delayLoadImage : function() {
    var images = document.getElementsByTagName('img');
    var  loadImage = function(url, error_url,callback,errorFunc) {
      var img = new Image();
      img.src = url;
      img.onload = function() {
        img.onload = null;
        callback();
      };
      img.onerror = function(){
        img.onerror = null;
        errorFunc();
      }
    };
    images = Array.prototype.slice.call(images);
    images.forEach(function(array){
      var re_url = array.getAttribute('data-src'), error_url = "../images/loading_def_big.png";
      loadImage(re_url,error_url, function() {
        array.setAttribute('src', re_url);
      },function(){
        array.setAttribute('src', error_url);
      });
    });
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
    this.titleInit().dateCalender().dateChangeHandler().tAjax("", this.postObj, "3001", 3, this.renderHandler);
    //this.renderHandler(singleDe)
  }
};
fSingleList.init();
