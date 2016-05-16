var ticketDouble = {

    CultureName: "zh-CN",

    requestUrl: "http://10.2.22.239:8888/api/GetServiceApiResult",

    dateInit: function (arg) {
        var spans = document.querySelectorAll('.ticket-double-date');
        var dateInitObj = {};
        spans[0].innerHTML = ticketDouble.returnWeek(arg.DepartDate);
        spans[1].innerHTML = ticketDouble.returnWeek(arg.ReturnDate);
        dateInitObj[arg.DepartDate] = '去程';
        dateInitObj[arg.ReturnDate] = '返程';
        var myDate = new TicketDate({
            id: 'dateIcon',
            num: 13,
            time: dateInitObj,
            sClass1: 'date-wrap-double',
            type: 'Return',
            dateObj: {start: this.backParaObj.DepartDate, end: this.backParaObj.ReturnDate},
            fn: this.dateChangeRender
        });
    },

    returnWeek: function (arg) {
        var week, array, index = new Date(arg.replace(/-/g, "/")).getDay();

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
        array = arg.split('-');
        array[1] = array[1] < 10 ? '0' + parseInt(array[1]) : parseInt(array[1]);
        array[2] = array[2] < 10 ? '0' + parseInt(array[2]) : parseInt(array[2]);
        return '<span>' + array[1] + '-' + array[2] + '</span>' + ' ' + '<span>' + week + '</span>';
    },

    tAjax: function (questUrl, data, Code, ForeEndType, Callback, noShowLoading) {
        var that = this, dataObj =
        {
            Parameters: data,
            ForeEndType: ForeEndType,
            Code: Code
        };
        questUrl = questUrl ? questUrl : that.requestUrl;
        if (noShowLoading) {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback, false, false, noShowLoading);
        } else {
            vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
        }
    },

    addHandler: function (target, eventType, handle) {

        if (document.addEventListener) {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target.addEventListener(eventType, handle, false);
            }
        } else if (document.attachEvent) {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target.attachEvent('on' + eventType, function () {
                    handle.call(target);
                });
            }
        } else {
            ticketDouble.addHandler = function (target, eventType, handle) {
                target['on' + eventType] = handle;
            }
        }
        ticketDouble.addHandler(target, eventType, handle);
    },
    reDate: function (arg) {
        var reg = /(\d{1,2})月(\d{1,2})日/g, tStr = reg.exec(arg);
        var returnWeek = function () {
            var index = new Date(new Date().getFullYear() + '/' + tStr[1] + '/' + tStr[2]).getDay(), week;
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
            return week
        };
        tStr[1] = parseInt(tStr[1]) < 10 ? '0' + parseInt(tStr[1]) : parseInt(tStr[1]);
        tStr[2] = parseInt(tStr[2]) < 10 ? '0' + parseInt(tStr[2]) : parseInt(tStr[2]);
        return '<span>' + tStr[1] + '-' + tStr[2] + '</span>&nbsp;<span>' + returnWeek() + '</span>';
    },
    dateChangeRender: function () {
        var that = ticketDouble, dateEle = document.querySelectorAll('.date-wrap-double');
        var start = dateEle[0].querySelector('.dateNumber').innerHTML, end = dateEle[1].querySelector('.dateNumber').innerHTML;
        document.querySelector('.start-date').innerHTML = that.reDate(start);
        document.querySelector('.end-date').innerHTML = that.reDate(end);
        that.backParaObj.DepartDate = new Date().getFullYear() + '-' + document.querySelector('.start-date').querySelectorAll('span')[0].innerHTML;
        that.backParaObj.ReturnDate = new Date().getFullYear() + '-' + document.querySelector('.end-date').querySelectorAll('span')[0].innerHTML;
        that.backParaObj.pageNo = 1;
        that.backParaObj.pageSize = 10;
        document.querySelector('#preloader').style.display = 'block';
        //that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
        //重置URL  DepartDate
        var tempUrl = vlm.setUrlPara("", "DepartDate", that.backParaObj.DepartDate);
        var newUrl = vlm.setUrlPara(tempUrl, "ReturnDate", that.backParaObj.ReturnDate);
        window.location.href = newUrl;
    },

    parseUrlPara: function (url, isEncode) {
        var isEncode = isEncode || false;
        var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
        url.replace(reg, function () {
            var arg = arguments;
            obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
        });
        return obj;
    },

    checkTip: function () {
        var lis = document.querySelectorAll('.detail-list li'), temArray = '';
        var tLis = document.querySelectorAll('#time-modal li'), tTemArray = '';
        var pLis = document.querySelectorAll('#price-modal li'), pTemArray = '';
        for (var i = 0; i < lis.length; i++) {
            if (lis[i].className.indexOf('active') > -1) {
                temArray += i;
            }
        }

        for (var j = 0; j < tLis.length; j++) {
            if (tLis[j].className.indexOf('active') > -1) {
                tTemArray += j;
            }
        }
        for (var k = 0; k < pLis.length; k++) {
            if (pLis[k].className.indexOf('active') > -1) {
                pTemArray += k;
            }
        }
        return {left: temArray, middle: tTemArray, right: pTemArray};
    },

    eventHandler: function () {
        var oLis = document.querySelectorAll('.seat-detail'), that = ticketDouble, shadowBox = document.querySelector('#r-shadow'),
            filterModal = document.querySelector('#filter-modal'), timeModal = document.querySelector('#time-modal'), priceModal = document.querySelector('#price-modal');
        for (var i = 0; i < oLis.length; i++) {
            this.addHandler(oLis[i], 'click', function () {
                document.location.href = 'ticket_seat_choose.html?setId=' + this.getAttribute('data-set-id') + '&RouteType=' + that.backParaObj.RouteType + '&hasTax=' + that.backParaObj.hasTax +
                '&CabinClass=' + that.backParaObj.CabinClass + '&NumofAdult=' + that.backParaObj.NumofAdult + '&NumofChild=' + that.backParaObj.NumofChild + '&interNationalOrDomestic=' + that.backParaObj.interNationalOrDomestic;
            })
        }
        this.addHandler(shadowBox, 'click', function () {
            if (filterModal.style.bottom == '0px') {
                filterModal.style.transition = 'all 300ms ease-in';
                filterModal.style.webkitTransition = 'all 300ms linear';
                filterModal.style.bottom = '-126%';
            } else if (timeModal.style.bottom == '0px') {
                timeModal.style.transition = 'all 300ms ease-in';
                timeModal.style.webkitTransition = 'all 300ms linear';
                timeModal.style.bottom = '-126%';
            } else if (priceModal.style.bottom == '0px') {
                priceModal.style.transition = 'all 300ms ease-in';
                priceModal.style.webkitTransition = 'all 300ms linear';
                priceModal.style.bottom = '-126%';
            }
            this.style.display = 'none';
        })
    },
    timeCut: function (arg) {
        var reg = /\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2}):\d{2}/g, result = reg.exec(arg);
        return result[1] + ':' + result[2];
    },

    alertNoFlightNotice: function (citys, type) {
        var div = document.createElement('div'), allEleWrap = document.querySelector('.all-elements'), backButton, that = ticketDouble;
        var arrowIcon = type == 'Oneway' ? 'direction-single' : 'direction-double';
        div.className = 'no-flight-notice';
        div.innerHTML = '<header class="big-title"><i class="fl close-no-flight"></i>' +
        '<span class="set-place">' + citys.fromCity + '</span>' +
        '<i class="' + arrowIcon + '"></i>' +
        '<span class="to-place">' + citys.toCity + '</span>' +
        '</header>' +
        '<div class="tip-button-para">' +
        '<p class="no-flight-word">没有找到符合条件的航班！ </p></div>';
        allEleWrap.appendChild(div);
        backButton = document.querySelector('.close-no-flight');
        that.addHandler(backButton, "click", function () {
            allEleWrap.removeChild(div)
        })
    },
    returnTransferCity: function (arg) {
        var str = '';

        if (arg.length < 2) {
            str = ''
        } else if (arg.length == 2) {

            str = '<span class="air-port-word">转' + arg[0].cityNameTo + '</span>'
        } else if (arg.length >= 3) {
            str = '<span class="air-port-word">中转' + (arg.length - 1) + '次</span>'
        }
        return str;
    },

    taxDeal: function (arg) {
        var taxData = [], freeTaxData = [], priceDesc = [], priceAsic = [];
        for (var i = 0; i < arg.length; i++) {
            arg[i].totalTaxAmountADT == 0 ? freeTaxData.push(arg[i]) : taxData.push(arg[i])
        }
        priceDesc = arg.sort(function (a, b) {
            return parseFloat(a.totalFareAmountExc) - parseFloat(b.totalFareAmountExc)
        });
        priceAsic = priceDesc.reverse();
        this.cacheTypeData = {
            taxData: taxData,
            freeTaxData: freeTaxData,
            priceDesc: priceDesc,
            priceAsic: priceAsic
        }
    },

    taxHandler: function () {
        var priceModal = document.querySelector('#price-modal');
        this.addHandler(priceModal, 'click', function (event) {
            var shadowBox = document.querySelector('#r-shadow'), that = ticketDouble;
            var event = event || window.event;
            var target = target || event.srcElement;
            var sibLis = target.parentNode.querySelectorAll('li'), temParaObject = {data: {flightInfos: []}};
            if (target.getAttribute('data-i') == 'noTax') {
                if (that.cacheTypeData.freeTaxData.length == 0) {
                    jAlert('当前航班均含税，换种条件试试!', '', function () {
                    })
                } else {
                    temParaObject.data.flightInfos = that.cacheTypeData.freeTaxData;
                    that.changeFlightList(temParaObject, true);
                    for (var l = 0, length = sibLis.length; l < length; l++) {
                        sibLis[l].className = sibLis[l] == target ? "price-modal-item active" : "price-modal-item";
                    }
                }
            } else if (target.getAttribute('data-i') == 'hasTax') {
                temParaObject.data.flightInfos = that.cacheTypeData.taxData;
                that.changeFlightList(temParaObject, true);
                for (var l = 0, length = sibLis.length; l < length; l++) {
                    sibLis[l].className = sibLis[l] == target ? "price-modal-item active" : "price-modal-item";
                }
            } else if (target.getAttribute('data-i') == 'priceHighToLow') {
                temParaObject.data.flightInfos = that.cacheTypeData.priceDesc;
                that.changeFlightList(temParaObject, true);
                for (var l = 0, length = sibLis.length; l < length; l++) {
                    sibLis[l].className = sibLis[l] == target ? "price-modal-item active" : "price-modal-item";
                }
            } else if (target.getAttribute('data-i') == 'priceLowToHigh') {
                temParaObject.data.flightInfos = that.cacheTypeData.priceAsic;
                that.changeFlightList(temParaObject, true);
                for (var l = 0, length = sibLis.length; l < length; l++) {
                    sibLis[l].className = sibLis[l] == target ? "price-modal-item active" : "price-modal-item";
                }
            }

            this.style.transition = 'all 300ms ease-in';
            this.style.webkitTransition = 'all 300ms linear';
            this.style.bottom = '-126%';
            shadowBox.style.display = 'none';
        });
    },
    loadMoreHandler: function (pageNo, pageCount) {
        var loadMoreBtn = document.getElementById("loadMore");
        loadMoreBtn.innerHTML = "点击加载更多";
        loadMoreBtn.style.display = "block";
        if (pageNo == pageCount) {
            loadMoreBtn.innerHTML = "没有更多数据了";
        }
    },
    loadMoreBtnEvent: function () {
        var loadMoreBtn = document.getElementById("loadMore");
        this.addHandler(loadMoreBtn, "click", function () {
            ticketDouble.loadMoreData();
        })
    },
    changeFlightList: function (arg, type) {
        var that = this;
        var ticketDetailUl = document.querySelector('.air-tickets-detail-wrapper'), ticketListStr = '', li;
        var taxPriceStr = '';
        var myFixed = function (arg) {
            if (String(arg).indexOf('.') > -1) {
                if (String(arg).substring(String(arg).indexOf('.')).length == 2) {
                    return String(arg) + '0';
                }
                return String(arg).substring(0, String(arg).indexOf('.') + 3)
            } else {
                return String(arg) + '.00';
            }
        };
        ticketDetailUl.innerHTML = type == true ? "" : ticketDetailUl.innerHTML;
        for (var i = 0; i < arg.data.flightInfos.length; i++) {
            ticketListStr = '';
            li = document.createElement('li');
            li.className = "air-tickets-detail seat-detail";
            li.setAttribute("data-set-id", arg.data.flightInfos[i].setID);
            ticketListStr += '<div class="time-airport">' + goTrip(arg) + backTrip(arg) + '</div>' + rightPrice(arg.data.flightInfos[i]);
            li.innerHTML = ticketListStr;
            ticketDetailUl.appendChild(li);
        }
        this.loadMoreHandler(arg.data.pageNo, arg.data.pageCount);
        that.eventHandler();
        return;
        function goTrip(arg) {
            var data = arg.data.flightInfos[i].segmentsLeave;
            var transferCity = that.returnTransferCity(arg.data.flightInfos[i].segmentsLeave);
            var tipDay = arg.data.flightInfos[i].flightLeaveSpacingDay >= 1 ? '+' + arg.data.flightInfos[i].flightLeaveSpacingDay + '天' : '';
            var str = '';
            var isStrop = arg.data.flightInfos[i].isLeaveStop == true ? ' | <span class="green-tip">经停</span>' : '';
            var isShareFlight = arg.data.flightInfos[i].isReturnShareFlight == true ? '&nbsp;|&nbsp;<span class="green-tip">共享</span>' : '';
            str += '<div class="go">' +
            '<div class="go-info">' +
            '<div class="start-time-info start-time-info-double">' +
            '<span class="start-icon"></span>' +
            '<span class="time-number">' + that.timeCut(data[0].departDate) + '</span>' +
            '<span class="air-port-word">' + data[0].airportNameFrom + data[0].termDepart + '</span>' +
            '</div>' +
            '<div class="total-time-info">' +
            '<span class="time-hour-minute">' + parseInt(arg.data.flightInfos[i].segmentsLeaveTotalTravelTime / 60) + 'h' + arg.data.flightInfos[i].segmentsLeaveTotalTravelTime % 60 + 'm</span>' +
            '<span class="arrow-time"></span>' +
            '<span class="air-port-word">' + transferCity + '</span>' +
            '</div>' +
            '<div class="end-time-info">' +
            '<span class="tip-add-days">' + tipDay + '</span>' +
            '<span class="time-number">' + that.timeCut(data[data.length - 1].arriveDate) + '</span>' +
            '<span class="air-port-word">' + data[data.length - 1].airportNameTo + data[data.length - 1].termArrive + '</span>' +
            '</div>' +
            '</div>' +
            '<p class="small-info-double ">' + data[0].operatingCarrierName + data[0].operatingCarrierCode + data[0].flightNo + '<span>&nbsp;|&nbsp;</span>' + data[0].cabinClassName + isStrop + isShareFlight +
            '</p>' +
            '</div>';
            return str;
        }

        function backTrip(arg) {
            var data = arg.data.flightInfos[i].segmentsReturn;
            var transferCity = that.returnTransferCity(arg.data.flightInfos[i].segmentsReturn);
            var tipDay = arg.data.flightInfos[i].flightReturnSpacingDay >= 1 ? '+' + arg.data.flightInfos[i].flightReturnSpacingDay + '天' : '';
            var str = '';
            var isStrop = arg.data.flightInfos[i].isReturnStop == true ? ' | <span class="green-tip">经停</span>' : '';
            var isShareFlight = arg.data.flightInfos[i].isReturnShareFlight == true ? '&nbsp;|&nbsp;<span class="green-tip">共享</span>' : '';
            str += '<div class="go">' +
            '<div class="go-info">' +
            '<div class="start-time-info start-time-info-double">' +
            '<span class="end-icon"></span>' +
            '<span class="time-number">' + that.timeCut(data[0].departDate) + '</span>' +
            '<span class="air-port-word">' + data[0].airportNameFrom + data[0].termDepart + '</span>' +
            '</div>' +

            '<div class="total-time-info">' +
            '<span class="time-hour-minute">' + parseInt(arg.data.flightInfos[i].segmentsReturnTotalTravelTime / 60) + 'h' + arg.data.flightInfos[i].segmentsReturnTotalTravelTime % 60 + 'm</span>' +
            '<span class="arrow-time"></span>' +
            '<span class="air-port-word">' + transferCity + '</span>' +

            '</div>' +
            '<div class="end-time-info">' +
            '<span class="tip-add-days">' + tipDay + '</span>' +
            '<span class="time-number">' + that.timeCut(data[data.length - 1].arriveDate) + '</span>' +
            '<span class="air-port-word">' + data[data.length - 1].airportNameTo + data[data.length - 1].termArrive + '</span>' +
            '</div>' +
            '</div>' +
            '<p class="small-info-double ">' + data[0].operatingCarrierName + data[0].operatingCarrierCode + data[0].flightNo + '<span>&nbsp;|&nbsp;</span>' + data[0].cabinClassName + isStrop + isShareFlight +
            '</p>' +
            '</div>';
            return str;
        }

        function rightPrice(arg) {
            var str = '';
            if (that.backParaObj.interNationalOrDomestic == "domestic") {
                str += '<div class="price-tax">' +
                '    <div class="price-info price-info-domestic"><span class="price-icon">￥</span><span class="price-num">' + arg.totalFareAmountADT + '</span><span class="word-tip">往返</span><br></div>' +
                '    </div>';
            } else {
                if (that.backParaObj.hasTax == "true") {
                    str += '<div class="price-tax">' +
                    '    <div class="price-info"><span class="price-icon">￥</span><span class="price-num">' + arg.totalFareAmountExc + '</span><span class="word-tip">往返</span><br></div>' +
                    '    <div class="price-tax-info tax-word-pull-left"><span class="tax-word">含税总价</span></div>' +
                    '        </div>';
                } else {
                    str += '<div class="price-tax">' +
                    '    <div class="price-info"><span class="price-icon">￥</span><span class="price-num">' + arg.totalFareAmountADT + '</span><span class="word-tip">往返</span><br></div>' +
                    '    <div class="price-tax-info"><span class="tax-word">税费</span>￥' + arg.totalTaxAmountADT + '</div>' +
                    '        </div>';
                }
            }
            return str;
        }
    },
    callRender: function (arg) {
        var paraObj = {}, that = ticketDouble;
        paraObj.IsDirectFlight = arg.directFly == 'unlimitedPlane' ? 'false' : 'true';
        paraObj.IsShareFlight = arg.shareFlight == 'hideShareFlight' ? 'false' : 'true';
        paraObj.DepartStartHour = arg.filterTime.substr(0, 2);
        paraObj.DepartEndHour = arg.filterTime.substr(2, 2);
        paraObj.CabinClass = arg.CabinClass;
        paraObj.pageNo = 1;
        paraObj.pageSize = 10;
        switch (arg.paraMiddle) {
            case "directFirst":
                paraObj.PriorityRule = 1;
                break;
            case"lowPriceFirst":
                paraObj.PriorityRule = 2;
                break;
            case "shortTimeFirst":
                paraObj.PriorityRule = 3;
                break;
            default :
                paraObj.PriorityRule = 0;
        }
        paraObj.HasTax = arg.paraRight == 'hasTax' ? "true" : "false";
        for (var tem in paraObj) {
            that.backParaObj[tem] = paraObj[tem]
        }
        document.querySelector('#preloader').style.display = 'block';
        that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
        var temObj = that.checkTip();
        that.initLeftState.left != temObj.left ? document.querySelector('#fo_sc i').className = 'red-tip' : document.querySelector('#fo_sc i').className = '';
        that.initLeftState.middle != temObj.middle ? document.querySelector('#fo_ra i').className = 'red-tip' : document.querySelector('#fo_ra i').className = '';
        that.initLeftState.right != temObj.right ? document.querySelector('#fo_lo i').className = 'red-tip' : document.querySelector('#fo_lo i').className = '';
    },

    toSeatDetail: function () {
        var oLis = document.querySelectorAll('.seat-detail'), that = ticketDouble;
        for (var i = 0; i < oLis.length; i++) {
            this.addHandler(oLis[i], 'click', function () {
                document.location.href = 'ticket_seat_choose.html?setId=' + this.getAttribute('data-set-id') + '&RouteType=' + that.backParaObj.RouteType + '&hasTax=' + that.backParaObj.hasTax +
                '&CabinClass=' + that.backParaObj.CabinClass + '&NumofAdult=' + that.backParaObj.NumofAdult + '&NumofChild=' + that.backParaObj.NumofChild + '&interNationalOrDomestic=' + that.backParaObj.interNationalOrDomestic;
            })

        }
    },
    storageUtil: {
        set: function (key, v) {
            var localStorage = window.localStorage;
            localStorage.setItem(key, JSON.stringify({data: v}))
        },
        get: function (key) {
            var localStorage = window.localStorage, data = localStorage.getItem(key), dataObj = JSON.parse(data);
            return JSON.stringify(dataObj.data);
        }
    },
    renderHandler: function (arg) {
        var that = ticketDouble, airTicketsListWrapper = document.querySelector('.air-tickets-detail-wrapper');
        var tipEle = document.querySelector('.flight-result-tip'), clearTag = '', exLi = document.querySelectorAll('.air-tickets-detail-wrapper li');

        var arg = arg, localStorage = window.localStorage;

        clearTag = that.isClearAll;
        document.querySelector('#preloader').style.display = 'none';
        if (arg.success && arg.code == 200 && arg.data.flightInfos.length > 0) {
            document.querySelector('.tip-button-para').style.display = 'none';
            tipEle.style.display = 'none';

            that.lastBackData = arg;
            that.pageNo = arg.data.pageNo;
            that.pageCount = arg.data.pageCount;
            localStorage.setItem('flightListData', JSON.stringify(arg.data.flightInfos));

            that.changeFlightList(arg, clearTag);
            that.taxDeal(arg.data.flightInfos);
        } else if (arg.success == false && arg.message.indexOf('greater') > -1) {
            document.querySelector('.no-flight-word').innerHTML = '未搜到航班信息，请扩大搜索范围!';
            document.querySelector('.tip-button-para').style.display = 'block';
            airTicketsListWrapper.innerHTML = "";
            tipEle.style.display = 'block';
            that.timer8 = window.setTimeout(function () {
                tipEle.style.display = 'none';
                window.clearTimeout(that.timer8);
                that.timer8 = null;
            }, 3000);
        } else {
            if (!exLi) {
                tipEle.style.display = 'none';
                document.querySelector('#preloader').style.display = 'none';
                document.querySelector('.tip-button-para').style.display = 'block';
            }
        }
    },
    loadMoreData: function () {
        var that = ticketDouble;
        var loadMore = document.getElementById("loadMore");
        if (that.pageNo >= that.pageCount) {
            $('#loadMore').fadeOut(1000);
            jAlert('<div class="no-more-flight-tip">没有更多航班信息了</div>', '', function () {
            })
        } else if (that.pageNo < that.pageCount) {
            that.isClearAll = false;
            that.backParaObj["pageNo"] = Number((that.backParaObj.pageSize)) / 10;
            that.backParaObj["pageNo"]++;
            that.backParaObj.pageSize = 10;
            loadMore.innerHTML = "正在加载...";
            that.tAjax(this.requestUrl, that.backParaObj, "3001", 3, that.renderHandler, true);
        }
    },

    handler1: function (arg) { //后台请求
        var that = ticketDouble;
        that.backParaObj = arg;
        document.querySelector('#preloader').style.display = 'block';
        that.tAjax(that.requestUrl, that.backParaObj, "3001", 3, that.renderHandler);
    },
    handler2: function (arg) { //自己缓存的数据重新展现
        var that = ticketDouble;
        that.backParaObj = arg;
        that.changeFlightList(that.lastBackData, true);
    },
    init: function () {
        var backParaObj = this.parseUrlPara(document.location.search, true), that = ticketDouble;
        document.querySelector('.set-place').innerHTML = backParaObj.fromCity;
        document.querySelector('.to-place').innerHTML = backParaObj.toCity;
        this.tripType = backParaObj.interNationalOrDomestic;
        backParaObj.NumofAdult = parseInt(backParaObj.NumofAdult);
        backParaObj.NumofChild = parseInt(backParaObj.NumofChild);
        backParaObj.PriorityRule = parseInt(backParaObj.PriorityRule);
        backParaObj.pageNo = parseInt(backParaObj.pageNo);
        backParaObj.pageSize = parseInt(backParaObj.pageSize);
        this.backParaObj = backParaObj;
        this.isClearAll = true;
        this.dateInit(backParaObj);
        this.toSeatDetail();
        this.tAjax(this.requestUrl, backParaObj, "3001", 3, this.renderHandler);
        conditionalFiltering.init(this.tripType, this.backParaObj.RouteType, this.backParaObj, this.handler1, this.handler2, this);
        this.taxHandler();

        this.initLeftState = this.checkTip();
        this.loadMoreBtnEvent();
    }
};


ticketDouble.init();

