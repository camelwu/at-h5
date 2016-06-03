/*
 * vlm.js
 * name:vehicle_layout_mobile
 * out_api:pls check return
 * auth:wusongbo
 * 2015-11-12
 * ver:1.1.1
 */

(function (e, t) {
    var n = n || (function (n) { //123.56.190.34:8888 //10.6.11.20:8888 10.7.2.111  10.7.2.119
        var _api = "http://10.7.2.111/api/GetServiceApiResult",
            _apiWithDeviceID = "http://10.7.2.111/apiWihtDeviceID/GetServiceApiResult",
            lStorage = window.localStorage,
            sStorage = window.sessionStorage,
            basePath = basePath == undefined ? "http://" + window.location.host : basePath,
            menus = {
                home: ['首页', basePath],
                user: ['我的', basePath + '/user/user.html']
            },
            _codeDic = {
                //1.酒店(10)
                "0007": "10100001",
                "0008": "10100002",
                "0009": "10100003",
                "0010": "10100004",
                "0011": "10100005",
                "0012": "10100006",
                "0013": "10100007",
                "0014": "10100008",
                "0015": "10100009",
                "0016": "10100010",
                "0017": "10100011",
                "0081": "10100012",
                "0082": "10100013",
                "0083": "10100014",

                //2.景点(20)
                "0086": "20100001",
                "0087": "20100002",
                "0088": "20100003",
                "0089": "20100004",
                "0090": "20100005",
                "0091": "20100006",
                "0092": "20100007",
                "0093": "20100008",
                "0094": "20100009",
                "0095": "20100010",
                "0096": "20100011",

                //2.景点(20)
                "0086": "20100001",
                "0087": "20100002",
                "0088": "20100003",
                "0089": "20100004",
                "0090": "20100005",
                "0091": "20100006",
                "0092": "20100007",
                "0093": "20100008",
                "0094": "20100009",
                "0095": "20100010",
                "0096": "20100011",

                //3.机票(30)
                "3001": "30100001",
                "3002": "30100002",
                "3003": "30100003",
                "3004": "30100004",
                "3005": "30100005",
                "3006": "30100006",
                "3007": "30100007",
                "3008": "30100008",
                "3009": "30100009",

                //4. 酒+景(40)
                "0201": "40100001",
                "0202": "40100002",
                "0203": "40100003",
                "0204": "40100004",
                "0205": "40100005",
                "0206": "40100006",
                "0207": "40100007",
                "0208": "40100008",
                "0209": "40100009",

                //5.个人中心(70)
                "0052": "70100001",
                "0058": "70100002",
                "0051": "70100003",
                "0053": "70100005",
                "0055": "70100006",
                "0054": "70100007",
                "0063": "70100008",
                "0056": "70100009",
                "0060": "70100010",
                "0059": "70100011",
                "0071": "70100012",
                "0072": "70100013",
                "0073": "70100014",
                "0074": "70100015",
                "0061": "70100016",
                "0062": "70100017",

                //6. 首页(80)
                "001302": "80100001",
                "001303": "80100002",
                "001304": "80100003",
                "001305": "80100004",
                "001306": "80100005",
                "001307": "80100006",

                //7. 短信(90)
                "001301": "90100001"
            }
        arr_t = {
                1: '护照',
                2: '身份证',
                3: '出生证明',
                4: '港澳通行证',
                5: '军官证',
                6: '驾驶证',
                7: '台胞证',
                8: '回乡证',
                9: '其他'
            }, getpara = function (str) {
                var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return decodeURIComponent(r[2]);
                return null;
            }, setUrlPara = function (url, key, value) {
                var originalUrl = url ? url : window.location.href,
                    newUrl = "",
                    reg = new RegExp(key + "=([^&]*)(&|$)"),
                    result = [];
                newUrl = originalUrl;
                result = newUrl.match(reg);
                if (result) {
                    if (!value) {
                        return newUrl.replace(result[0], "")
                    } else {
                        return newUrl.replace(result[0], key + "=" + value + result[2])
                    }
                } else {
                    return newUrl.indexOf('?') > -1 ? newUrl + "&" + key + "=" + value : newUrl + "?" + key + "=" + value
                }
            }, parseUrlPara = function (url, isEncode) {
                var isEncode = isEncode || false;
                var reg = /([^=&?]+)=([^=&?]+)/g,
                    obj = {};
                url.replace(reg, function () {
                    var arg = arguments;
                    obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
                });
                return obj;
            }, _init = function () {
                _loadend();
                var hrefstr = window.location.href,
                    _k;
                if (hrefstr == "http://" + basePath + "/index.html" || hrefstr == "http://" + basePath + "/") {
                    _k = "home";
                } else {
                    var _s = hrefstr.substr(basePath.length + 1);
                    if (_s == "" || _s == "index.html") {
                        _k = "home";
                    } else if (_s == "scenic/index.html") {
                        _k = "find";
                    } else if (_s == "user/user.html") {
                        _k = "user";
                    } else if (_s == "building.html") {
                        _k = "find";
                    }
                }
                //底部菜单

                if (menus.hasOwnProperty(_k)) {
                    _initMenu();
                }
                if ($(".header").length >= 1 && $(".header").is(":visible")) {
                    $("#content").css("padding-top", "45px");
                }

                function _initMenu() {
                    if (document.getElementById("menu")) {
                        var menuer = document.getElementById("menu");
                        menuer.className = "footer-menu-three-icons footer-menu";
                    } else {
                        var menuer = document.createElement('div');
                        menuer.id = "menu";
                        menuer.className = "footer-menu-three-icons footer-menu";
                        document.body.appendChild(menuer);
                    }
                    var _str = "";
                    for (var k in menus) {
                        var cn = k == _k ? "foot-" + k + "s" : "foot-" + k;
                        _str += "<a href='" + menus[k][1] + "' class='" + cn + "'><i></i>" + menus[k][0] + "</a>";
                    }
                    menuer.innerHTML = _str;
                    $("#content").css("padding-bottom", "51px");
                };
            }, _loading = function (k) {
                if ($("#preloader").css('display') == 'none') {
                    $("#status").css({
                        backgroundImage: "../images/loading" + k + ".gif"
                    });
                    $("#status").fadeIn();
                    $("#preloader").delay(400).fadeIn("medium");
                }
            }, _loadend = function () {
                if ($("#preloader").css('display') != 'none') {
                    $("#status").fadeOut();
                    $("#preloader").delay(400).fadeOut("medium");
                }
            }, _checklogin = function (c) {
                if (!lStorage.memberid || lStorage.memberid == '' || !lStorage.login || lStorage.login != 1) { //need login
                    l_login(c);
                    return false;
                } else {
                    return l_find(c);
                }
            },
            _getDeviceID = function () {
                var deviceID = _Utils.CookieUtil.get("deviceID");
                if (deviceID == undefined) {
                    return "";
                } else {
                    return deviceID;
                }
            },
            _Utils = {
                format_add_zero: function (time) {
                    if (parseInt(time) < 10) {
                        return "0" + time;
                    } else {
                        return time;
                    }
                },
                //转化数字为现金格式
                format_number: function (number) {
                    if (typeof number != 'number') {
                        number = Number(number);
                    }
                    var pmStr = number >= 0 ? '' : "-";
                    //正负值
                    var absNumber = Math.abs(number);
                    //取绝对值
                    var numString = absNumber.toString();
                    if (numString.indexOf('.') > -1) {
                        var pattern = /-*[0-9]+(.[0-9]+)/;
                        //匹配小数
                        var decimalStr = numString.replace(pattern, "$1");
                        //小数点
                        if (decimalStr.length == 2) {
                            decimalStr = decimalStr + '0';
                        }
                    } else {
                        var decimalStr = '.00';
                        //小数点
                    }
                    var integerStr = parseInt(numString, 10).toString();
                    var len = integerStr.length;
                    if (len <= 3) {
                        return pmStr + integerStr + decimalStr;
                    } else {
                        var r = len % 3;
                        var result = r > 0 ? integerStr.slice(0, r) + ',' + integerStr.slice(r, len).match(/\d{3}/g).join(",") : integerStr.slice(r, len).match(/\d{3}/g).join(",");
                        return pmStr + result + decimalStr;
                    }
                },
                //百分数
                numToPercent: function (num) {
                    if (typeof num != 'number') {
                        return '';
                    }
                    return (Math.round(num * 10000) / 100).toFixed(1) + '%';
                },
                //格式化日期
                format_date: function (dtime, format) {

                    var stringTime = dtime.replace('-', "/").replace('-', "/").replace('T', " ");
                    console.log(stringTime)
                    var newDate = new Date(stringTime);
                    var year = newDate.getFullYear();
                    var yy = year.toString(),
                        yy = yy.substr(-2),
                        month = parseInt(newDate.getMonth()) + 1,
                        day = parseInt(newDate.getDate());
                    var hour = newDate.getHours(),
                        minutes = parseInt(newDate.getMinutes()),
                        seconds = parseInt(newDate.getSeconds());
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                    hour = hour < 10 ? '0' + hour : hour;
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var timeStr;
                    format = typeof format == 'undefined' ? '' : format;
                    if (format == 'YmdHi') {
                        timeStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
                    } else if (format == 'YmdHis') {
                        timeStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
                    } else if (format == 'Ymd') {
                        timeStr = year + '-' + month + '-' + day;
                    } else if (format == 'ymd') {
                        timeStr = yy + '-' + month + '-' + day;
                    } else if (format == 'md') {
                        timeStr = month + '月' + day + "日";
                    } else if (format == 'cymd') {
                        timeStr = year + '年' + month + '月' + day + "日";
                    } else if (format == 'hm') {
                        timeStr = hour + ':' + minutes
                    } else {
                        timeStr = month + '-' + day;
                    }
                    return timeStr;
                },

                get30Minutes: function (data) {
                    var stringTime = data.replace('-', "/").replace('-', "/").replace('T', " ");
                    var newDate = new Date(stringTime);
                    var str = newDate.setMinutes(newDate.getMinutes() + 30, newDate.getSeconds(), 0);

                    var hour = newDate.getHours(),
                        minutes = parseInt(newDate.getMinutes()),
                        seconds = parseInt(newDate.getSeconds());

                    hour = hour < 10 ? '0' + hour : hour;
                    minutes = minutes < 10 ? '0' + minutes : minutes;

                    return hour + ':' + minutes;

                },
                //获取星期几
                getWeek: function (dtime, format) {
                    var date = new Date(dtime.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4")),
                        reslut;
                    switch (date.getDay()) {
                        case 0:
                            reslut = "日";
                            break;
                        case 1:
                            reslut = "一";
                            break;
                        case 2:
                            reslut = "二";
                            break;
                        case 3:
                            reslut = "三";
                            break;
                        case 4:
                            reslut = "四";
                            break;
                        case 5:
                            reslut = "五";
                            break;
                        case 6:
                            reslut = "六";
                            break;
                    }
                    if (format == "f1") {
                        return "周" + reslut;
                    } else if (format == "f2") {
                        return "星期" + reslut;
                    } else {
                        return "周" + reslut;
                    }
                },
              getAge:function GetAgeByBrithday(birthday,departDate){
                var age=-1,today;
                if(departDate==undefined){
                  today=new Date();
                }
                else {
                  today = new Date(departDate.replace('-', "/").replace('-', "/").replace('T', " "));
                }
                var todayYear=today.getFullYear();
                var todayMonth=today.getMonth()+1;
                var todayDay=today.getDate();

                var birthday= new Date(birthday.replace('-', "/").replace('-', "/").replace('T', " "))
                if(birthday !=null)
                {
                  birthdayYear=birthday.getFullYear();
                  birthdayMonth=birthday.getMonth();
                  birthdayDay=birthday.getDate();
                  if(todayYear-birthdayYear<0)
                  {
                    alert("出生日期选择错误!");
                  }
                  else
                  {
                    if(todayMonth*1-birthdayMonth*1<0)
                    {
                      age = (todayYear*1-birthdayYear*1)-1;
                    }
                    else
                    {
                      if(todayDay-birthdayDay>=0)
                      {//alert(thisDay+'-'+brithd+"_ddd");
                        age = (todayYear*1-birthdayYear*1);
                      }
                      else
                      {
                        age = (todayYear*1-birthdayYear*1)-1;
                      }
                    }
                  }
                  return age*1;
                }
                else
                {
                  return -1;
                }
              },
                //比较时间串与当前时间的大小
                compareTime: function (timeStr) {
                    if (timeStr == '' || timeStr == null) {
                        return false;
                    }
                    var timeData = timeStr.toString().split('-');
                    var year = timeData[0];
                    var month = parseInt(timeData[1] - 1);
                    var day = parseInt(timeData[2]);
                    var dtime = new Date(year, month, day).getTime();
                    var nowtime = new Date().getTime();
                    if (dtime >= nowtime) {
                        return true;
                    } else {
                        return false;
                    }
                },
                //比较时间的天数差
                compareDay: function (d1, d2) {
                    if (d1 == '' || d1 == null || d2 == '' || d2 == null) {
                        return 'no timestr.';
                    }
                    d1 = new Date(d1.replace("T", " "));
                    d2 = new Date(d2.replace("T", " "));
                    var dtime = Math.floor((d2 - d1) / (24 * 60 * 60 * 1000));
                    return dtime;
                },
                //比较出生日期
                compareBirth: function (timeStr) {
                    if (timeStr == '' || timeStr == null) {
                        return false;
                    }
                    var timeData = timeStr.toString().split('-');
                    var year = timeData[0];
                    var month = parseInt(timeData[1] - 1);
                    var day = parseInt(timeData[2]);
                    var dtime = new Date(year, month, day).getTime();
                    var nowtime = new Date().getTime();
                    if (dtime <= nowtime) {
                        return true;
                    } else {
                        return false;
                    }
                },
                //问好
                sayHello: function () {
                    var date = new Date();
                    var hour = date.getHours();
                    if (hour < 6) {
                        return "凌晨好!";
                    } else if (hour < 9) {
                        return "早上好!";
                    } else if (hour < 12) {
                        return "上午好!";
                    } else if (hour < 14) {
                        return "中午好!";
                    } else if (hour < 17) {
                        return "下午好!";
                    } else if (hour < 19) {
                        return "傍晚好!";
                    } else if (hour < 22) {
                        return "晚上好!";
                    }
                },


                //cookie
                CookieUtil: {
                    get: function (name) {
                        var cookieName = encodeURIComponent(name) + "=",
                            cookieStart = document.cookie.indexOf(cookieName),
                            cookieValue = null;
                        if (cookieStart > -1) {
                            var cookieEnd = document.cookie.indexOf(";", cookieStart);
                            if (cookieEnd == -1) {
                                cookieEnd = document.cookie.length;
                            }
                            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                        }
                        return cookieValue;
                    },
                    set: function (name, value, expires, path, domain, secure) {
                        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                        if (expires instanceof Date) {
                            cookieText += "; expires=" + expires.toGMTString();
                        }
                        if (path) {
                            cookieText += "; path=" + path;
                        }
                        if (domain) {
                            cookieText += "; domain=" + domain;
                        }
                        if (secure) {
                            cookieText += "; secure=" + secure;
                        }
                        document.cookie = cookieText;
                    },
                    unset: function (name, path, domain, secure) {
                        this.set(name, "", new Date(0), path, domain, secure);
                    }
                },
                //格式验证
                validate: {
                    isNoEmpty: function (obj) {
                        if (obj == "") {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    dataValid: function (obj) {

                        var reg = /(\d{2})\/(\d{2})$/;
                        console.log(reg.test(obj));
                        if (!reg.test(obj)) {
                            return false;
                        } else {
                            return true;
                        }

                    },
                    safecode: function (obj) {
                        var reg = new RegExp("^[0-9]*$");
                        if (obj.length > 3 || !reg.test(obj)) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    //手机格式
                    mobileNo: function (mobile) {
                        var pattern = /^1\d{10}$/;
                        if (pattern.test(mobile)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //邮箱
                    email: function (email) {
                        var pattern = /^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/;
                        if (pattern.test(email)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //用户名
                    userName: function (uname) {
                        var pattern = /^[a-zA-Z][a-zA-Z0-9_]{3,29}$/;
                        //4-29位 字母开头  字母数字下划线组合
                        //var pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
                        if (pattern.test(uname)) {
                            return true;
                        } else {
                            return false;
                        }
                    },

                    //姓名
                    guestName: function (name) {
                        var pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
                        //3-16位 字母开头  字母数字下划线组合
                        if (pattern.test(uname)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //昵称
                    nickName: function (name) {
                        //var pattern = /^[a-zA-Z0-9-_]{4,20}$/;
                        var pattern1 = /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5a-zA-Z0-9_]{3,19}$/;
                        var pattern2 = /^[\u4E00-\u9FA5]{2,10}$/;
                        var pattern3 = /^[\u4E00-\u9FA5][\u4E00-\u9FA5a-zA-Z0-9_]{2,18}$/;
                        //4-20个字符，可由中英文字母，数字、"_"组成，不能以'_'开头
                        if (pattern1.test(name) || pattern2.test(name) || pattern3.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //护照中文姓名
                    chiName: function (name) {
                        var pattern = /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z. ]{1,19}$/;
                        //姓名用于兑奖和业务联系，需要填写真实姓名。必须是2-20个字符，支持空格、“.”
                        if (pattern.test(name)) {
                            if (/[a-z]/ig.test(name)) {
                                //中间有生僻字，后面必须是拼音
                                var indexEng = /[a-z]/ig.exec(name).index;
                                name = name.substring(indexEng);
                                if (!/^[a-z. ]*[a-z]$/ig.test(name)) {
                                    return false;
                                }
                            }
                            return true;
                        } else {
                            return false;
                        }
                    },

                    //中文姓名
                    ChineseName: function (name) {
                        var pattern = /^([\u4e00-\u9fa5a-zA-Z]){2,7}$/;
                        //只能是中文，长度为2-7位
                        if (pattern.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //六位数字验证码
                    code: function (name) {
                        var pattern = /^[0-9]{6}$/;
                        //只能是中文，长度为2-7位
                        if (pattern.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    engName: function (name) {
                        var pattern = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]{1,25}$/;
                        //字符头尾是字母，中间由空格和字母组成，中间可以有多个空格;2-26字符
                        if (pattern.test(name)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //密码
                    password: function (password) {
                        var pattern = /^\w*.{6,16}$/;
                        //6-16位字母、数字、符号组成
                        if (pattern.test(password)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //非法字符
                    illegalCharater: function (str) {
                        //非法字符@、&、空格、/、\、|、双引号、单引号、大于号、小于号、？、“· ”、冒号、分号  
                        var pattern = /[@&\s\/\\\|"'><\?\.\:;]/im;
                        if (pattern.test(str)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //银行卡
                    bankAccountNo: function (idcard) {
                        var pattern = /^\d{16,19}$/g;
                        if (pattern.test(idcard)) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    //身份证
                    IdCard: {
                        Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], //加权因子
                        vCode: [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2], // 身份证验证位值.10代表X
                        IdCardMatch: function (idCard) {
                            idCard = this.trim(idCard.replace(/ /g, ""));
                            //去掉字符串头尾空格
                            if (idCard.length == 15) {
                                return this.isValidityBrithBy15IdCard(idCard);
                                //进行15位身份证的验证
                            } else if (idCard.length == 18) {
                                var a_idCard = idCard.split("");
                                // 得到身份证数组
                                if (this.isValidityBrithBy18IdCard(idCard) && this.isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        },
                        isTrueValidateCodeBy18IdCard: function (a_idCard) {
                            var sum = 0;
                            // 声明加权求和变量
                            var Wi = this.Wi;
                            //加权因子
                            var ValideCode = this.vCode;
                            // 身份证验证位值.10代表X
                            if (a_idCard[17].toLowerCase() == 'x') {
                                a_idCard[17] = 10;
                                // 将最后位为x的验证码替换为10方便后续操作
                            }
                            for (var i = 0; i < 17; i++) {
                                sum += Wi[i] * a_idCard[i];
                                // 加权求和
                            }
                            valCodePosition = sum % 11;
                            // 得到验证码所位置
                            if (a_idCard[17] == ValideCode[valCodePosition]) {
                                return true;
                            } else {
                                return false;
                            }
                        },
                        isValidityBrithBy18IdCard: function (idCard18) {
                            var year = idCard18.substring(6, 10);
                            var month = idCard18.substring(10, 12);
                            var day = idCard18.substring(12, 14);
                            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                            // 这里用getFullYear()获取年份，避免千年虫问题
                            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                                return false;
                            } else {
                                return true;
                            }
                        },
                        isValidityBrithBy15IdCard: function (idCard15) {
                            var year = idCard15.substring(6, 8);
                            var month = idCard15.substring(8, 10);
                            var day = idCard15.substring(10, 12);
                            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

                            // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
                            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                                return false;
                            } else {
                                return true;
                            }
                        },
                        trim: function (str) {
                            return str.replace(/(^\s*)|(\s*$)/g, "");
                        }
                    },
                    //密码强度
                    showPwdStrong: function (password, container) {
                        var O_color = "#ccc";
                        var L_color = '#ff0000';
                        var M_color = '#ff9900';
                        var H_color = '#19c521';
                        if (password == null || password == '') {
                            Lcolor = Mcolor = Hcolor = O_color;
                        } else {
                            S_level = this.checkPwdStrong(password);
                            switch (S_level) {
                                case 0:
                                    Lcolor = Mcolor = Hcolor = O_color;
                                case 1:
                                    Lcolor = L_color;
                                    Mcolor = Hcolor = O_color;
                                    break;
                                case 2:
                                    Lcolor = Mcolor = M_color;
                                    Hcolor = O_color;
                                    break;
                                default:
                                    Lcolor = Mcolor = Hcolor = H_color;
                            }
                        }
                        container.find('#weak').css('background-color', Lcolor);
                        container.find('#middle').css('background-color', Mcolor);
                        container.find('#strong').css('background-color', Hcolor);
                    },
                    checkPwdStrong: function (password) {
                        if (password.length < 4) {
                            return 0;
                            //太短
                        }
                        Modes = 0;
                        for (i = 0; i < password.length; i++) {
                            Modes |= this.charMode(password.charCodeAt(i));
                            //返回密码的Unicode编码
                        }
                        return this.bitTotal(Modes);

                    },
                    //判断输入密码的类型
                    charMode: function (unicode) {
                        if (unicode >= 48 && unicode <= 57) { //数字
                            return 1;
                        } else if (unicode >= 65 && unicode <= 90) { //大写字母
                            return 2;
                        } else if (unicode >= 97 && unicode <= 122) { //小写字母
                            return 4;
                        } else {
                            return 8;
                        }
                    },
                    //计算密码模式
                    bitTotal: function (num) {
                        modes = 0;
                        for (var i = 0; i < 4; i++) {
                            if (num & 1)
                                modes++;
                            num >>>= 1;
                        }
                        return modes;
                    }
                },
                //设置字符串部分隐藏
                setPartHidden: function (str, flag) {
                    if (!str) {
                        return '';
                    }
                    if (flag == 'email') { //邮箱
                        var stringArr = str.split('@');
                        var hiddenStr = str.substring(2, stringArr[0].length - 2);
                        var hiddenArr = new Array();
                        for (var i = 0; i < hiddenStr.length; i++) {
                            hiddenArr.push(hiddenStr.substr(i, 1));
                        }
                        for (var i = 0; i < hiddenStr.length; i++) {
                            hiddenArr[i] = "*";
                        }
                        var hiddenStr = hiddenArr.join('');
                        var frontStr = str.substring(0, 2);
                        var frontLength = stringArr[0].length;
                        var lastStr = stringArr[0].substring(frontLength - 2, frontLength);
                        var suffixStr = stringArr[1];
                        var emailString = frontStr + hiddenStr + lastStr + "@" + suffixStr;
                        return emailString;
                    } else if (flag == 'phone') { //手机
                        var frontStr = str.substring(0, 3);
                        var lastStr = str.substring(str.length - 5, str.length - 1);
                        return frontStr + '****' + lastStr;
                    } else if (flag == 'realname') {
                        var len = str.length,
                            firstName, showLen = 1,
                            hiddenStr = '';
                        firstName = str.substr(0, 1);
                        //复姓
                        var hyphenatedNames = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫', '万俟', '闻人', '夏侯', '诸葛', '尉迟', '公羊', '赫连', '澹台', '皇甫', '宗政', '濮阳', '公冶', '太叔', '申屠', '公孙', '慕容', '仲孙', '钟离', '长孙', '宇文', '城池', '司徒', '鲜于', '司空', '汝嫣', '闾丘', '子车', '亓官', '司寇', '巫马', '公西', '颛孙', '壤驷', '公良', '漆雕', '乐正', '宰父', '谷梁', '拓跋', '夹谷', '轩辕', '令狐', '段干', '百里', '呼延', '东郭', '南门', '羊舌', '微生', '公户', '公玉', '公仪', '梁丘', '公仲', '公上', '公门', '公山', '公坚', '左丘', '公伯', '西门', '公祖', '第五', '公乘', '贯丘', '公皙', '南荣', '东里', '东宫', '仲长', '子书', '子桑', '即墨', '达奚', '褚师'];
                        for (var i = 0; i < hyphenatedNames.length; i++) {
                            if (str.indexOf(hyphenatedNames[i]) != -1) {
                                firstName = str.substr(0, 2);
                                showLen = 2;
                                break;
                            }
                        }
                        for (var i = 0; i < len - showLen; i++) {
                            hiddenStr += '*';
                        }
                        return firstName + hiddenStr;
                    } else if (flag == 'idcard') { //身份证号
                        var len = str.length,
                            hiddenStr = '';
                        for (var i = 0; i < len - 1; i++) {
                            hiddenStr += "*";
                        }
                        var frontStr = str.substring(0, 3);
                        var lastStr = str.substring(str.length - 4, str.length);
                        return frontStr + hiddenStr + lastStr;
                    }

                },
                //时间倒数
                timeCountDown: function (seconds, cb1, cb2) {
                    var timer = setInterval(function () {
                        seconds--;
                        if (seconds == 0) {
                            clearInterval(timer);
                            cb2();
                        } else {
                            cb1(seconds);
                        }
                    }, 1000);
                    return timer;
                },
                //根据后缀名得到邮件地址
                getEmailWebsiteUrl: function (email) {
                    var url;
                    if (email.indexOf('@126.com') != -1 || email.indexOf('@163.com') != -1 || email.indexOf('@yeah.net') != -1) {
                        url = 'http://hw.mail.163.com/';
                    } else if (email.indexOf('@sohu.com') != -1) {
                        url = 'http://mail.sohu.com/';
                    } else if (email.indexOf('@qq.com') != -1 || email.indexOf('@foxmail.com') != -1) {
                        url = 'http://mail.qq.com';
                    } else if (email.indexOf('@139.com') != -1) {
                        url = 'http://mail.10086.cn';
                    } else if (email.indexOf('@wo.com') != -1) {
                        url = 'http://mail.wo.com.cn';
                    } else if (email.indexOf('@sina.com') != -1 || email.indexOf('@sina.cn') != -1 || email.indexOf('@sina.com.cn') != -1 || email.indexOf('@vip.sina.com') != -1) {
                        url = 'http://mail.sina.com.cn/';
                    } else if (email.indexOf('@aliyun.com') != -1) { //阿里云
                        url = 'https://mail.aliyun.com';
                    } else if (email.indexOf('@tom.com') != -1) {
                        url = 'http://web.mail.tom.com';
                    } else if (email.indexOf('@outlook.com') != -1) {
                        url = 'http://www.outLook.com';
                    } else if (email.indexOf('@icloud.com') != -1) {
                        url = 'https://www.icloud.com';
                    } else if (email.indexOf('@263.net') != -1) {
                        url = 'http://www.263.net';
                    } else if (email.indexOf('@ddshenbian.com') != -1) {
                        url = 'http://exmail.qq.com/login';
                    } else {
                        url = email.replace(/^(\w-*\.*)+@((\w-?)+(\.\w{2,}))+$/, "http://mail.$2");
                    }
                    return url;
                },
                //验证手机验证码
                vlidateMobileCode: function (paramsObj) {
                    var data;
                    $.ajax({
                        type: 'get',
                        async: false,
                        url: _api + '/validate/check_mcode1',
                        dataType: 'json',
                        data: paramsObj,
                        success: function (jsondata) {
                            data = jsondata;
                        }
                    });
                    return data;
                },
                //发送手机验证码
                sendMobileCode: function (paramsObj) {
                    var data;
                    $.ajax({
                        type: 'get',
                        async: false,
                        url: _api + '/validate/send_mcode1',
                        dataType: 'json',
                        data: paramsObj,
                        success: function (jsondata) {
                            data = jsondata;
                        }
                    });
                    return data;
                },
                //发送邮件
                sendEmail: function (paramsObj) {
                    var data;
                    $.ajax({
                        type: 'post',
                        async: false,
                        url: _api + '/validate/send_email1',
                        dataType: 'json',
                        data: paramsObj,
                        success: function (jsondata) {
                            data = jsondata;
                        }
                    });
                    return data;
                },
                //分页
                pagination: function (containerId, pageObj, searchObj) {
                    var totalCount = pageObj.totalCount;
                    var perPageCount = pageObj.perPageCount ? pageObj.perPageCount : 10;
                    var callback = pageObj.callback;
                    var currentPage = pageObj.currentPage;
                    $("#" + containerId).pagination(totalCount, {
                        items_per_page: perPageCount,
                        num_display_entries: 6,
                        current_page: currentPage,
                        num_edge_entries: 1,
                        callback: pageselectCallback
                    });

                    function pageselectCallback(page_id, jq) {
                        $.extend(searchObj, {
                            "page": page_id + 1,
                            "rows": perPageCount
                        });
                        callback(searchObj, false);
                    }

                },
                getCurrency: function (coin) {
                    if (coin == "CNY") {
                        return "￥"
                    } else if (coin == "USD") {
                        return "$"
                    }
                },
                //前端静态分页
                Jpage: function (containerId, pageObj) {
                    var totalCount = pageObj.totalCount;
                    var perPageCount = pageObj.perPageCount ? pageObj.perPageCount : 10;
                    var callback = pageObj.callback;
                    $("#" + containerId).pagination(totalCount, {
                        items_per_page: perPageCount,
                        num_display_entries: 6,
                        current_page: 0,
                        num_edge_entries: 1,
                        callback: pageselectCallback
                    });

                    function pageselectCallback(page_id, jq) {
                        callback(page_id);
                    }

                }
            }, loadJson = function (url, data, mycallback, async, encryption, isShowLoading) {

                data = JSON.parse(data);
                data.Code = _codeDic[data.Code] == undefined ? data.Code : _codeDic[data.Code];
                data = JSON.stringify(data);

                if (isShowLoading != undefined && isShowLoading == true) {
                    //ajax 不全屏显示loading
                    $("#preloader").ajaxStart(function () {
                        $(this).hide();
                        $('#status').hide();
                    });
                    $("#preloader").ajaxStop(function () {
                        $(this).hide();
                        $('#status').hide();
                    });
                } else {
                    $("#preloader").ajaxStart(function () {
                        $(this).show();
                        $('#status').show();
                    });
                    $("#preloader").ajaxStop(function () {
                        $(this).hide();
                        $('#status').show();
                    });
                }
                if (async != undefined && async == true) {
                    $.ajaxSetup({
                        async: false
                    });
                };
                var apiUrl = url == "" ? _api : url;
                $.ajax({
                    type: "post",
                    url: apiUrl + '?rnd=' + Math.random(),
                    timeout: 1000 * 60 * 5,
                    data: data,
                    contentType: 'application/json;charset=utf-8',
                    beforeSend: function (xhr) {
                        //xhr.setRequestHeader("Accept-Encoding", "gzip");
                        //xhr.setRequestHeader('Content-Type','application/json');
                        if (encryption != undefined && encryption == true) {
                            var uid = md5("zhangfengming");
                            var password = md5("");
                            xhr.setRequestHeader('uid', user);
                        }
                    },
                    success: function (jsondata) {
                        mycallback(jsondata);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (textStatus == 'timeout') {
                            alert("网络不给力，刷新重试！");
                            window.location.reload();
                        }
                    }
                });
                $.ajaxSetup({
                    async: true
                });
            }, loadJsonp = function (sid, jsurl, callback) {
                var nodeHead = document.getElementsByTagName('head')[0];
                var nodeScript = null;
                if (document.getElementById(sid) == null) {
                    nodeScript = document.createElement('script');
                    nodeScript.setAttribute('type', 'text/javascript');
                    nodeScript.setAttribute('src', jsurl);
                    nodeScript.setAttribute('id', sid);
                    if (callback != null) {
                        nodeScript.onload = nodeScript.onreadystatechange = function () {
                            if (nodeScript.ready) {
                                return false;
                            }
                            if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
                                nodeScript.ready = true;
                                callback();
                            }
                        };
                    }
                    nodeHead.appendChild(nodeScript);
                } else {
                    if (callback != null) {
                        callback();
                    }
                }
                //loadJsonp("yy","package.js",callbackFunction);
            }, l_login = function (c) {
                var urlstr;
                if (typeof c === "string" && (c.indexOf(".html") > -1 || c.indexOf("&") > -1)) {
                    var str = c.replace("?", "@");
                    str = str.replace(/&/g, "*");
                    urlstr = 'returnURL=' + str;
                } else {
                    urlstr = 'callback=' + c;
                }
                var loginer = createIframe('../user/user-login.html?' + urlstr);
                document.body.appendChild(loginer);
            }, l_contact = function () {
                if (document.getElementById("name")) {
                    document.getElementById("name").value = lStorage.name ? lStorage.name : "";
                }
                if (document.getElementById("tel-num")) {
                    document.getElementById("tel-num").value = lStorage.phone ? lStorage.phone : "";
                }
                if (document.getElementById("email-label")) {
                    document.getElementById("email-label").value = lStorage.email ? lStorage.email : "";
                }
            }, c_contact = function () {
                if (document.getElementById("name")) {
                    lStorage.name = lStorage.name ? lStorage.name : document.getElementById("name").value;
                }
                if (document.getElementById("tel-num")) {
                    lStorage.phone = lStorage.phone ? lStorage.phone : document.getElementById("tel-num").value;
                }
                if (document.getElementById("email-label")) {
                    lStorage.email = lStorage.email ? lStorage.email : document.getElementById("email-label").value;
                }
            }, l_find = function (mycall) {
                var email = localStorage.email,
                    phone = localStorage.phone,
                    memberid = localStorage.memberid,
                    back = false,
                    udata = {
                        "Parameters": "{\"CultureName\":\"zh-CN\",\"MemberId\":\"" + memberid + "\",\"Email\":\"" + email + "\",\"Mobile\":\"" + phone + "\"}",
                        "ForeEndType": 3,
                        "Code": "0053"
                    };
                loadJson("", JSON.stringify(udata), function (myJson) {
                    if (myJson.success) {
                        back = true;
                    } else {
                        if (mycall) {
                            var c = eval(mycall);
                            c();
                        }
                    }
                }, true);
                return back;
            }, _choice = function (elementId, f, t, tid, isNeedPassport, isMulSelect, numofAdult, numofChlid, id, departDate,isShowChinaName,isShowContact,callback) {
                //if(arguments.length<1){return ;}
                //var arg = arguments.callee.slice(this);
                var type = '',
                    title = '';
                if (t === "contact") {
                    title = '选择联系人';
                } else {
                    switch (f.toLowerCase()) {
                        case "h":
                            title = '选择入住人';
                            break;
                        case "t":
                            title = '选择取票人';
                            break;
                        case "ht":
                            title = '选择取票人';
                            break;
                        default:
                            title = '选择乘机人';
                            break;
                    }
                }
                if (tid) {
                    type = 'edit';
                } else {
                    type = 'add';
                }
                //var choice = window.open('../user/user-choiceAir.html?from=' + f + '&isNeedPassport=' + isNeedPassport + '&title=' + title + '&type=' + type + '&TravellerId=' + tid + ''+ '&isMulSelect=' + isMulSelect + '&numofAdult='+numofAdult+"&numofChlid="+numofChlid+"&Id="+id, title, "fullscreen=1");isShowChinaName,isShowContact
                var choice = createIframe('../user/user-choiceAir.html?elementId='+elementId + ' &from=' + f+t + '&isNeedPassport=' + isNeedPassport + '&title=' + title + '&type=' + type + '&TravellerId=' + tid + '' + '&isMulSelect=' + isMulSelect + '&numofAdult=' + numofAdult + "&numofChlid=" + numofChlid + "&Id=" + id + "&departDate=" + departDate+"&isShowChinaName="+isShowChinaName+"&isShowContact="+isShowContact+"&callback="+callback);
                document.body.appendChild(choice);

                //choice.location = urls;
            }, createIframe = function (urlstr, id) {
                var str = id ? id : 'choiceAir',
                    myIframe = document.createElement('iframe');
                myIframe.id = str;
                myIframe.name = str;
                myIframe.src = urlstr ? urlstr : 'about:blank';
                myIframe.style.position = 'fixed';
                myIframe.style.zIndex = '9999';
                myIframe.style.left = '0';
                myIframe.style.top = '0';
                myIframe.style.right = '0';
                myIframe.style.bottom = '0';
                myIframe.style.border = 0;
                myIframe.style.width = '100%';
                myIframe.style.height = '100%';
                return myIframe;
            };
        //out api
        return {
            api: _api,
            apiWithDeviceID: _apiWithDeviceID,
            getpara: getpara,
            setUrlPara: setUrlPara,
            arr_t: arr_t,
            parseUrlPara: parseUrlPara,
            loading: _loading,
            loadend: _loadend,
            init: _init,
            checkLogin: _checklogin,
            checkUser: l_find,
            f_choice: _choice,
            l_contact: l_contact,
            loadJson: loadJson,
            loadJsonp: loadJsonp,
            getDeviceID: _getDeviceID,
            Utils: _Utils
        };
    })();
    if (typeof module !== "undefined" && module.exports) {
        module.exports = n;
    }
    if (typeof ender === "undefined") {
        this.vlm = n;
    }
    if (typeof define === "function" && define.amd) {
        define("vlm", ['jquery'], function ($) {
            return n;
        });
    }
}).call(this, window, document);
