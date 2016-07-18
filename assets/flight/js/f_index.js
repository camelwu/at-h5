"use strict";
var fIndexModal = {

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
        var that = this,
            dataObj = {
                Parameters: data,
                ForeEndType: ForeEndType,
                Code: Code
            };
        questUrl = questUrl ? questUrl : "";
        vlm.loadJson(questUrl, JSON.stringify(dataObj), Callback);
    },

    getCityType: function (arg) {
        var dataPool1 = internationalCities,
            dataPool2 = domesticCities,
            tag1 = "";
        for (var ff in dataPool1) {
            dataPool1[ff].forEach(function (index) {
                if (index.cityCode == arg) {
                    tag1 = "international"; //domestic
                    return false;
                }
            })
        }
        for (var gg in dataPool2) {
            dataPool2[gg].forEach(function (index) {
                if (index.cityCode == arg) {
                    tag1 = "domestic"; //domestic
                    return false;
                }
            })
        }
        return tag1;
    },

    getHotCityHandler: function () {
        this.tAjax("", {
            top: 40
        }, "30100005", 3, this.citySearchHandler);
        return this
    },

    citySearchHandler: function () {
        var dataObj = arguments[0],
            place = document.querySelector('.place'),
            cityZone = document.querySelector('#city-input-zone'),
            countryListSearched = document.querySelector('.country-list-searched'),
            that = fIndexModal;
        var city_outer = document.querySelector('.city_outer'),
            tempString1 = "",
            outputString1 = "",
            resultArray = {},
            internationalArray = {},
            domesticArray = {},
            array1 = [],
            array2 = [];
        var internationalTitle = document.querySelector('.international_title'),
            domesticTitle = document.querySelector('.domestic_title');
        that.hotDometicCity = [];
        that.hotInterCity = [];
        if (!dataObj.success) {
            jAlert(dataObj.message, '提示');
            return false;
        }
        dataObj.data.cities.forEach(function (array) {
            if (array.countryCode == "CN") {
                that.hotDometicCity.push(array);
            } else {
                that.hotInterCity.push(array);
            }
        });
        that.domesticArray = domesticCities;
        that.internationalArray = internationalCities;
        that.addHandler(place, "click", function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement;
            if (target.getAttribute('data-city-type') == "domestic" || target.parentNode.getAttribute('data-city-type') == "domestic") {
                internationalTitle.className = "international_title grey-title";
                domesticTitle.className = "domestic_title light-title";
                that.cityEle = target.getAttribute('data-city-type') == "domestic" ? target : target.parentNode;
                tempString1 = $("#template_city_summary").html();
                outputString1 = ejs.render(tempString1, {
                    resultArray: domesticCities,
                    hotCity: that.hotDometicCity
                });
                $(".city_detail_info").eq(0).html(outputString1);
                city_outer.style.display = "block";
                that.historyInitF("domestic").citySearchEvent();
            } else if (target.getAttribute('data-city-type') == "international" || target.parentNode.getAttribute('data-city-type') == "international") {
                internationalTitle.className = "international_title light-title";
                domesticTitle.className = "domestic_title grey-title";
                that.cityEle = target.getAttribute('data-city-type') == "international" ? target : target.parentNode;
                tempString1 = $("#template_city_summary").html();
                outputString1 = ejs.render(tempString1, {
                    resultArray: internationalCities,
                    hotCity: that.hotInterCity
                });
                $(".city_detail_info").eq(0).html(outputString1);
                that.historyInitF("international").citySearchEvent();
                city_outer.style.display = "block";
            }
            cityZone.value = "";
            countryListSearched.innerHTML = "";
            countryListSearched.style.display = "none";
        });
        return that;
    },

    historyInitF: function () {
        var str = arguments[0] || "",
            string = "",
            storage = window.localStorage,
            historyList = document.querySelector('.history_list'),
            historyWrap = document.querySelector('.history_choose_city');
        var hisData = [],
            that = this;
        if (str == "international") {
            hisData = JSON.parse(storage.getItem('internationalHistory')) || []
        } else {
            hisData = JSON.parse(storage.getItem('domesticHistory')) || []
        }
        if (hisData.length >= 1) {
            for (var i = 0; i < hisData.length; i++) {
                (function (i) {
                    var i = i;
                    if (hisData[i].cityCode == fIndexModal.cityEle.getAttribute('data-code')) {
                        string += '<li class="city_list cur" data-city-code="' + hisData[i].cityCode + '">' + hisData[i].cityNameCN + '</li>';
                    } else {
                        string += '<li class="city_list" data-city-code="' + hisData[i].cityCode + '">' + hisData[i].cityNameCN + '</li>';
                    }
                })(i);
            }
            historyList.innerHTML = string;
            historyWrap.style.display = "block";
        } else {
            historyList.innerHTML = "";
            historyWrap.style.display = "none";
        }
        return this
    },
   distinct:function(){
     var obj={},ary=[], arr = arguments[0];
     for (var i = 0; i < arr.length; i++) {
       var str="";
       for(var key in arr[i]){
         str+=key+":"+arr[i][key]+",";
       }
       var cur=str;
       if(obj[cur]==cur){
         continue;
       }
       obj[cur]=cur;
       ary.push(arr[i]);
     }
     return ary;
   },
    cityChooseHistory: function () {
        var data = arguments[0] || [],
            storage = window.localStorage,
            historyList = document.querySelector('.history_list'),
            internationalHistory = JSON.parse(storage.getItem('internationalHistory')) || [],
            that = this,
            domesticHistory = JSON.parse(storage.getItem('domesticHistory')) || [];
            var historyTag = function () {
            var data = arguments[0].str = "";
            if (data.length >= 1) {
                for (var i = 0; i < data.length; i++) {
                    str += '<li class="city_list' + fIndexModal.cityEle.getAttribute('data-code') == data[i].cityCode ? 'cur' : '' + '" data-city-code="' + data[i].cityCode + '">' + data[i].cityNameCN + '</li>';
                }
                historyList.innerHTML = str;
            } else {
                historyList.innerHTML = ""
            }
        };
        if (data.type == "international") {
            internationalHistory.unshift(data);
            internationalHistory = that.distinct(internationalHistory);
            if (internationalHistory.length > 3) {
                internationalHistory = internationalHistory.slice(0, 3)
            }
            storage.setItem('internationalHistory', JSON.stringify(internationalHistory));
            historyTag(internationalHistory)
        } else {
            domesticHistory.unshift(data);
            domesticHistory = that.distinct(domesticHistory);
            if (domesticHistory.length > 3) {
                domesticHistory = domesticHistory.slice(0, 3)
            }
            storage.setItem('domesticHistory', JSON.stringify(domesticHistory));
            historyTag(domesticHistory)
        }
    },

    citySearchEvent: function () {
        var cityOuter = document.querySelector('.city_outer'),
            that = this, tempString1 = "",outputString1 = "";
        var cityInputZone = document.querySelector('#city-input-zone');
        this.addHandler(cityOuter, "click", function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement,
                internationalTitle = document.querySelector('.international_title'),
                domesticTitle = document.querySelector('.domestic_title');
            if (target == internationalTitle) {
                cityInputZone.value = "";
                internationalTitle.className = "international_title light-title";
                domesticTitle.className = "domestic_title grey-title";
                tempString1 = $("#template_city_summary").html();
                outputString1 = ejs.render(tempString1, {
                    resultArray: that.internationalArray,
                    hotCity: that.hotInterCity
                });
                $(".city_detail_info").eq(0).html(outputString1);
                that.historyInitF("international");
            } else if (target == domesticTitle) {
                cityInputZone.value = "";
                internationalTitle.className = "international_title grey-title";
                domesticTitle.className = "domestic_title light-title";
                tempString1 = $("#template_city_summary").html();
                outputString1 = ejs.render(tempString1, {
                    resultArray: that.domesticArray,
                    hotCity: that.hotDometicCity
                });
                $(".city_detail_info").eq(0).html(outputString1);
                that.historyInitF("domestic");
            } else if (target.className.indexOf('city_list') > -1) {
                var dateCode = target.getAttribute('data-city-code'),
                    type = that.getCityType(dateCode);
                that.cityEle.setAttribute("data-code", dateCode);
                that.cityEle.querySelector('b').innerHTML = target.innerHTML;
                that.cityEle.setAttribute("data-city-type", type);
                that.cityChooseHistory({
                    type: type,
                    cityCode: dateCode,
                    cityNameCN: target.innerHTML
                });
                this.style.display = "none";
            } else if (target.className == "header_back" || target.className == "icon_back") {
                this.style.display = "none";
            }
        });
        var searchHandler = function () {
                var cityListSearched = document.querySelector('.country-list-searched-order');
                var searchResult = [],
                    reg = /[A-Za-z]{2,}|[\u4e00-\u9fa5]{1,}/,
                    valueStr = cityInputZone.value,
                    resultStr = '';
                var allCityData = [],
                    tempArray = [];
                for (var ttt in internationalCities) {
                    internationalCities[ttt].forEach(function (array) {
                        tempArray.push(array)
                    })
                }
                for (var vvv in domesticCities) {
                    domesticCities[vvv].forEach(function (array) {
                        tempArray.push(array)
                    })
                }
                allCityData = tempArray;
                if (reg.test(valueStr)) {
                    var mb = String(valueStr).toLowerCase();
                    allCityData.forEach(function (array) {
                        if (array.cityCode) {
                            if (array.cityNameCn.toLowerCase().indexOf(mb) > -1 ||
                                array.hyKeyWord.toLowerCase().indexOf(mb) > -1 ||
                                array.cityCode.toLowerCase().indexOf(mb) > -1 ||
                                array.pingYin.toLowerCase().indexOf(mb) > -1) {
                                searchResult.push(array);
                            }
                        }
                    });
                };
                searchResult = that.distinct(searchResult);
                if (!searchResult.length) {
                    resultStr += '<li>无搜索结果</li>';
                } else {
                    for (var l = 0; l < searchResult.length; l++) {
                        resultStr += '<li class="city_list" data-city-code="' + searchResult[l].cityCode + '">' + searchResult[l].cityNameCn + '</li></li>'
                    }
                }
                cityListSearched.innerHTML = resultStr;
                cityListSearched.style.display = 'block';
                if (valueStr == "") {
                    cityListSearched.style.display = 'none';
                }
            },
            shadowThin = document.querySelector('.shadow_thin');
        if (cityInputZone.addEventListener) {
            cityInputZone.addEventListener('input', searchHandler, false)
        } else {
            cityInputZone.attachEvent('onpropertychange', searchHandler)
        }
        shadowThin.style.transition = '0.6s all ease';
        shadowThin.style.webkitTransition = '0.6s all ease';
    },

    eventHandler: function () {
        var content = document.querySelector('.content'),
            that = this,
            paraObj = {},
            storage = window.localStorage;
        var singleWrap = document.querySelector('#timeSingleWrap'),
            doubleWrap = document.querySelector('#timeDoubleWrap');
        that.deg = 0;
        this.addHandler(content, 'click', function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement;
            var temTitle = null;
            var js_origin = "",
                js_destination = "";
            if (target.innerHTML == "单程") {
                that.type = "oneWay";
                target.className = "singleTrip light-title";
                target.nextSibling.nextSibling.className = "doubleTrip grey-title";
                singleWrap.style.display = "block";
                doubleWrap.style.display = "none";
                document.querySelector('.dateInfo').className = "dateInfo white single_date";
            } else if (target.innerHTML == "往返") {
                that.type = "return";
                target.className = "doubleTrip light-title";
                target.previousSibling.previousSibling.className = "singleTrip grey-title";
                singleWrap.style.display = "none";
                doubleWrap.style.display = "block";
                document.querySelector('.dateInfo').className = "dateInfo white";
            } else if (target.className == "iconTip" || target.parentNode.className == "iconTip" || target.className == "span-target") {
                var oSpan = this.querySelector('.span-target'),
                    cityName = document.querySelectorAll('.citySearch'),
                    tem = "",
                    temCode = "",
                    temType = "";
                oSpan.style.transition = '0.7s all ease';
                oSpan.style.webkitTransition = '0.7s all ease';
                that.deg += 180;
                oSpan.style.transform = 'rotate(' + that.deg + 'deg)';
                oSpan.style.webkitTransform = 'rotate(' + that.deg + 'deg)';
                $(".place b").each(function () {
                    $(this).hide()
                });
                tem = cityName[0].querySelector('b').innerHTML;
                temCode = cityName[0].getAttribute('data-code');
                temType = cityName[0].getAttribute('data-city-type');
                cityName[0].querySelector('b').innerHTML = cityName[1].querySelector('b').innerHTML;
                cityName[0].setAttribute('data-code', cityName[1].getAttribute('data-code'));
                cityName[0].setAttribute('data-city-type', cityName[1].getAttribute('data-city-type'));
                cityName[1].querySelector('b').innerHTML = tem;
                cityName[1].setAttribute('data-code', temCode);
                cityName[1].setAttribute('data-city-type', temType);
                $(".place b").each(function () {
                    $(this).fadeIn("700")
                });
            } else if (target.className.indexOf("minus") > -1 || target.className.indexOf("plus") > -1) {
                var adultNumEle = document.querySelector('.adultNumber'),
                    childNumEle = document.querySelector('.childNumber'),
                    adultNum = Number(adultNumEle.innerHTML),
                    childNum = Number(childNumEle.innerHTML);
                var adultIs = document.querySelectorAll(".adult i"),
                    childIs = document.querySelectorAll(".child i");
                if (target.className == "adu plus") {
                    if (adultNum + childNum < 9) {
                        adultNum++;
                        adultNumEle.innerHTML = adultNum;
                        that.buttonStatusHandler();
                    }
                } else if (target.className == "chi plus") {
                    if (adultNum + childNum < 9) {
                        if (adultNum / childNum > 1 / 2) {
                            childNum++;
                            childNumEle.innerHTML = childNum;
                            that.buttonStatusHandler();
                        }
                    }
                } else if (target.className == "adu minus") {
                    if (adultNum >= 2) {
                        adultNum--;
                        adultNumEle.innerHTML = adultNum;
                        that.buttonStatusHandler();
                        childNumEle.innerHTML = adultNum / childNum < 1 / 2 ? adultNum * 2 : childNum;
                    }
                } else if (target.className == "chi minus") {
                    if (childNum >= 1) {
                        childNum--;
                        childNumEle.innerHTML = childNum;
                        that.buttonStatusHandler();
                    }
                }
            } else if (target.id == "ticket-search-button") {
                var urlStr = "",
                    paraObj = {},
                    cityEles = document.querySelectorAll('.citySearch'),
                    singleDateSet = document.querySelector('#setOffDateSingle'),
                    doubleDateSet = document.querySelector('#setOffDate'),
                    doubleDateArrive = document.querySelector('#arriveDate');
                var adultValue = document.querySelector('.adultNumber').innerHTML,
                    childValue = document.querySelector('.childNumber').innerHTML,
                    seatValue = document.querySelector('#seats').innerHTML;
                var reFixedSeat = function (arg) {
                    var cabinStr = "";
                    switch (arg) {
                        case "经济舱":
                            cabinStr = "economy";
                            break;
                        case "商务舱":
                            cabinStr = "business";
                            break;
                        case "头等舱":
                            cabinStr = "first";
                            break;
                        case "豪华经济舱":
                            cabinStr = "economyPremium";
                            break;
                        default:
                            void(0);
                    }
                    return cabinStr;
                };
                var getTripType = function () {
                    var cityTypeFrom = cityEles[0].getAttribute('data-city-type'),
                        cityTypeTo = cityEles[1].getAttribute('data-city-type');
                    return (cityTypeFrom == "domestic" && cityTypeTo == "domestic") ? "domestic" : "international";
                };
                if (cityEles[0].getAttribute('data-code') == cityEles[1].getAttribute('data-code')) {
                    jAlert("请选择到达城市为不同城市", '提示');
                    return false;
                }
                paraObj = {
                    "cityCodeFrom": cityEles[0].getAttribute('data-code'),
                    "cityCodeTo": cityEles[1].getAttribute('data-code'),
                    "cabinClass": reFixedSeat(seatValue),
                    "routeType": that.type,
                    "isHideSharedFlight": "false",
                    "isDirectFlight": "false",
                    "numofAdult": adultValue,
                    "numofChild": childValue,
                    "departStartHour": "00",
                    "departEndHour": "24",
                    "priorityRule": 0,
                    "isDesc": "false",
                    "pageNo": 1,
                    "pageSize": 10,
                    "internationalOrDomestic": getTripType(),
                    "hasTax": getTripType() == "international"?1:0,
                    "isClearAll": 1,
                    "fromCity": cityEles[0].querySelector('b').innerHTML,
                    "toCity": cityEles[1].querySelector('b').innerHTML
                };
                if (that.type == "oneWay") { /*单程*/
                    paraObj.departDate = singleDateSet.getAttribute('date-full-value');
                    storage.setItem('fIndexInfo', JSON.stringify({
                        type: "oneWay",
                        data: paraObj
                    }));
                    for (var att in paraObj) {
                        urlStr += "&" + att + "=" + paraObj[att];
                    }
                    window.location.href = 'f_single_list.html?' + urlStr;
                } else { /*往返*/
                    paraObj.departDate = doubleDateSet.getAttribute('date-full-value');
                    paraObj.returnDate = doubleDateArrive.getAttribute('date-full-value');
                    storage.setItem('fIndexInfo', JSON.stringify({
                        type: "return",
                        data: paraObj
                    }));
                    for (var att_ in paraObj) {
                        urlStr += "&" + att_ + "=" + paraObj[att_];
                    }
                    window.location.href = 'f_double_list.html?' + urlStr;
                }
            }
        })
        return this
    },

    setWeekItems: function () {
        var arg = arguments[0].replace(/T.*/, ''),
            index = new Date(arg.replace(/-/g, '/')).getDay(),
            week = '';
        switch (index) {
            case 0:
                week = '周日';
                break;
            case 1:
                week = '周一';
                break;
            case 2:
                week = '周二';
                break;
            case 3:
                week = '周三';
                break;
            case 4:
                week = '周四';
                break;
            case 5:
                week = '周五';
                break;
            case 6:
                week = '周六';
                break;
            default:
                void(0)
        }
        return week;
    },

    returnDay: function () {
        var array = [],
            arg = arguments[0];
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

    createDefaultDate: function () {
        var d = arguments[0]&&new Date(arguments[0].replace(/-/g, '/'))>=new Date()? new Date(arguments[0].replace(/-/g, '/')) : new Date(),
            s = arguments[0] ? new Date(d.setDate(d.getDate())) : new Date(d.setDate(d.getDate() + 2)),
            r = new Date(d.setDate(d.getDate() + 2)),
            startDay, endDay, startStrMonth = '',
            startStrDate = '',
            endStrMonth = '',
            endStrDate = '';
        startStrMonth = parseInt(s.getMonth() + 1) >= 10 ? parseInt(s.getMonth() + 1) : '0' + parseInt(s.getMonth() + 1);
        startStrDate = parseInt(s.getDate()) >= 10 ? parseInt(s.getDate()) : '0' + parseInt(s.getDate());
        endStrMonth = parseInt(r.getMonth() + 1) >= 10 ? parseInt(r.getMonth() + 1) : '0' + parseInt(r.getMonth() + 1);
        endStrDate = parseInt(r.getDate()) >= 10 ? parseInt(r.getDate()) : '0' + parseInt(r.getDate());
        startDay = s.getFullYear() + "-" + startStrMonth + "-" + startStrDate;
        endDay = r.getFullYear() + "-" + endStrMonth + "-" + endStrDate;
        return [startDay, endDay];
    },
    buttonStatusHandler: function () {
        var adultIs = document.querySelectorAll(".adult i"),
            childIs = document.querySelectorAll(".child i"),
            adultNum = 0,
            childNum = 0;
        adultNum = parseInt(document.querySelector('.adultNumber').innerHTML), childNum = parseInt(document.querySelector('.childNumber').innerHTML);
        adultIs[1].className = adultNum + childNum < 9 ? "adu plus" : "adu plus plus_grey";
        childIs[1].className = adultNum / childNum > 1 / 2 && adultNum + childNum < 9 ? "chi plus" : "chi plus plus_grey";
        adultIs[0].className = adultNum > 1 ? "adu minus" : "adu minus minus_grey";
        childIs[0].className = childNum > 0 ? "chi minus" : "chi minus minus_grey";
    },

    initShowInfo: function () {
        var data = arguments[0],
            tripTitles = document.querySelectorAll('.hTab div'),
            that = this,
            weeks = document.querySelectorAll('.weekWord'),
            adultValue = document.querySelector('.adultNumber'),
            childValue = document.querySelector('.childNumber'),
            cityEle = document.querySelectorAll(".citySearch"),
            seatValue = document.querySelector('#seats'),
            timeClickWrap = document.querySelector('#timeClickWrap'),
            singleDateSet = document.querySelector('#setOffDateSingle'),
            doubleDateSet = document.querySelector('#setOffDate'),
            doubleDateArrive = document.querySelector('#arriveDate'),
            singleWrap = document.querySelector('#timeSingleWrap'),
            doubleWrap = document.querySelector('#timeDoubleWrap'),
            defaultDate = [],
            reSeat = function (arg) {
                var cabinStr = "";
                switch (arg) {
                    case "economy":
                        cabinStr = "经济舱";
                        break;
                    case "business":
                        cabinStr = "商务舱";
                        break;
                    case "first":
                        cabinStr = "头等舱";
                        break;
                    case "economyPremium":
                        cabinStr = "豪华经济舱";
                        break;
                    default:
                        void(0);
                }
                return cabinStr;
            };
        defaultDate = this.createDefaultDate(data.departDate);
        if (this.type == "oneWay") {
            tripTitles[0].className = "singleTrip light-title";
            tripTitles[1].className = "doubleTrip grey-title";
            singleWrap.style.display = "block";
            doubleWrap.style.display = "none";
        } else {
            if (data.returnDate) {
                defaultDate[1] = data.returnDate
            }
            tripTitles[0].className = "singleTrip grey-title";
            tripTitles[1].className = "doubleTrip light-title";
            singleWrap.style.display = "none";
            doubleWrap.style.display = "block";
        }
        cityEle[0].querySelector('b').innerHTML = data.fromCity;
        cityEle[0].setAttribute('data-code', data.cityCodeFrom);
        cityEle[0].setAttribute('data-city-type', that.getCityType(data.cityCodeFrom));
        cityEle[1].querySelector('b').innerHTML = data.toCity;
        cityEle[1].setAttribute('data-code', data.cityCodeTo);
        cityEle[1].setAttribute('data-city-type', that.getCityType(data.cityCodeTo));
        singleDateSet.innerHTML = this.returnDay(defaultDate[0]);
        singleDateSet.setAttribute('date-full-value', defaultDate[0]);
        weeks[0].innerHTML = this.setWeekItems(defaultDate[0]);
        doubleDateSet.innerHTML = this.returnDay(defaultDate[0]);
        doubleDateSet.setAttribute('date-full-value', defaultDate[0]);
        weeks[1].innerHTML = this.setWeekItems(defaultDate[0]);
        doubleDateArrive.innerHTML = this.returnDay(defaultDate[1]);
        doubleDateArrive.setAttribute('date-full-value', defaultDate[1]);
        weeks[2].innerHTML = this.setWeekItems(defaultDate[1]);
        adultValue.innerHTML = data.numofAdult;
        childValue.innerHTML = data.numofChild;
        seatValue.innerHTML = reSeat(data.cabinClass);
        that.buttonStatusHandler();
    },

    initDate: function () {
        var singleDateSet = document.querySelector('#setOffDateSingle'),
            doubleDateSet = document.querySelector('#setOffDate'),
            doubleDateArrive = document.querySelector('#arriveDate'),
            weeks = document.querySelectorAll('.weekWord'),
            defaultDate = [];
        defaultDate = this.createDefaultDate();
        singleDateSet.setAttribute('date-full-value', defaultDate[0]);
        singleDateSet.innerHTML = this.returnDay(defaultDate[0]);
        doubleDateSet.setAttribute('date-full-value', defaultDate[0]);
        doubleDateSet.innerHTML = this.returnDay(defaultDate[0]);
        weeks[0].innerHTML = this.setWeekItems(defaultDate[0]);
        weeks[1].innerHTML = this.setWeekItems(defaultDate[0]);
        doubleDateArrive.setAttribute('date-full-value', defaultDate[1]);
        doubleDateArrive.innerHTML = this.returnDay(defaultDate[1]);
        weeks[2].innerHTML = this.setWeekItems(defaultDate[1]);
    },

    initHandler: function () {
        var storage = window.localStorage,
            fIndexInfoObj = {},
            dateInfoObj = {},
            dateInfo = document.querySelectorAll('.month-day');
        var singleWrap = document.querySelector('#timeSingleWrap'),
            doubleWrap = document.querySelector('#timeDoubleWrap');
        fIndexInfoObj = JSON.parse(storage.getItem('fIndexInfo'));
        this.type = "oneWay";
        this.time1 = {};
        this.time2 = {};
        if (fIndexInfoObj) {
            this.type = fIndexInfoObj.type;
            this.initShowInfo(fIndexInfoObj.data);
            if (new Date(fIndexInfoObj.data.departDate.replace(/-/g, '/')) < new Date()) {
                this.initDate();
            }
        } else {
            this.initDate()
        }
        if (this.type == "oneWay") {
            singleWrap.style.display = "block";
            doubleWrap.style.display = "none";
        } else {
            singleWrap.style.display = "none";
            doubleWrap.style.display = "block";
        }
        dateInfoObj.start = dateInfo[0].getAttribute('date-full-value');
        dateInfoObj.end = dateInfo[1].getAttribute('date-full-value');
        var setOffDateSingle = $("#setOffDateSingle").attr('date-full-value');
        var setOffDateStart = $("#setOffDate").attr('date-full-value');
        var arriveDateEnd = $("#arriveDate").attr('date-full-value');
        this.time1[setOffDateSingle] = "checkinTime";
        this.time2[setOffDateStart] = "checkinTime";
        this.time2[arriveDateEnd] = "checkoutTime";
        var myTime2 = new ATplugins.Calender({
            id: "timeSingleWrap",
            selectTime: 1,
            headerSign: 'tipClean', //tipClean  tip
            noComfirmBtn: true,
            time: this.time1,
            checkInTimeOptId: 'setOffDateSingle',
            callback: function () {
                var dates = document.querySelectorAll('#timeSingleWrap .month-day'),
                    weeks = document.querySelectorAll('#timeSingleWrap .weekWord'),
                    dateSource = arguments[0],
                    that = fIndexModal;
                dateSource.forEach(function (array, index) {
                    dates[index].setAttribute('date-full-value', array);
                    dates[index].innerHTML = that.returnDay(array);
                    weeks[index].innerHTML = that.setWeekItems(array);
                });
            }
        });
        var myTime1 = new ATplugins.Calender({
            id: "timeDoubleWrap",
            headerSign: 'tipClean', //tipClean  tip
            time: this.time2,
            checkInTimeOptId: 'setOffDate',
            checkOutTimeOptId: 'arriveDate',
            callback: function () {
                var dates = document.querySelectorAll('#timeDoubleWrap .month-day'),
                    weeks = document.querySelectorAll('#timeDoubleWrap .weekWord'),
                    dateSource = arguments[0],
                    that = fIndexModal;
                dateSource.forEach(function (array, index) {
                    dates[index].setAttribute('date-full-value', array);
                    dates[index].innerHTML = that.returnDay(array);
                    weeks[index].innerHTML = that.setWeekItems(array);
                });
            }
        });
        var mySeat = new Scroller({
            id: "seats",
            type: "seat",
            cont: "uuun1"
        });
        return this;
    },

    init: function () {
        this.fadeHandler().initHandler().eventHandler().getHotCityHandler();
    }
};
fIndexModal.init();
