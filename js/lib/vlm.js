/*
 * vlm.js
 * name:vehicle_layout_mobile
 * out_api:pls check return
 * auth:wusongbo
 * 2015-11-12
 * ver:1.1.1
 */
(function(e, t) {"use strict";
	var n = n ||
	function(n) {
		var _api = "http://10.2.22.239:8888/api/GetServiceApiResult", lStorage = window.localStorage, sStorage = window.sessionStorage, basePath = basePath == undefined ? "http://" + window.location.host : basePath, menus = {
			home : ['首页', basePath],
			find : ['发现', basePath + '/find.html'],
			user : ['我的', basePath + '/user/user.html']
		}, _init = function() {
			_loadend();
			var hrefstr = window.location.href, _a = hrefstr.split("/"), _s = _a[_a.length - 1], _p = _s.indexOf("."), _k = _s.substring(0, _p);
			_k = _k == "index" || _k == "" ? "home" : _k;
			//底部菜单
			if (menus.hasOwnProperty(_k)) {
				_initMenu();
			}
			if ($(".header").length >= 1&&$(".header").parent().display!="none") {
				$("#content").css("padding-top","45px");
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
		}, _loading = function(k) {
			if ($("#preloader").css('dislay') == 'none') {
				$("#status").css({
					backgroundImage : "../images/loading" + k + ".gif"
				});
				$("#status").fadeIn();
				$("#preloader").delay(400).fadeIn("medium");
			}
		}, _loadend = function() {
			if ($("#preloader").css('dislay') != 'none') {
				$("#status").fadeOut();
				$("#preloader").delay(400).fadeOut("medium");
			}
		},_Utils = {
			//转化数字为现金格式
			format_number : function(number) {
				if ( typeof number != 'number') {
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
			numToPercent : function(num) {
				if ( typeof num != 'number') {
					return '';
				}
				return (Math.round(num * 10000) / 100).toFixed(1) + '%';
			},
			//格式化日期为2016-01-01
			format_date : function(dtime, format) {
				var newDate = new Date(dtime);
				var year = newDate.getFullYear();
				var month = newDate.getMonth() + 1;
				var day = newDate.getDate();
				var hour = newDate.getHours();
				var minutes = newDate.getMinutes();
				var seconds = newDate.getSeconds();
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;

				var timeStr;
				format = typeof format == 'undefined' ? 'Ymd' : format;
				if (format == 'Ymd') {
					timeStr = year + '-' + month + '-' + day;
				} else if (format == 'YmdHis') {
					timeStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
				}
				return timeStr;
			},
			//比较时间串与当前时间的大小
			compareTime : function(timeStr) {
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
			//问好
			sayHello : function() {
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
			CookieUtil : {
				get : function(name) {
					var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie.indexOf(cookieName), cookieValue = null;
					if (cookieStart > -1) {
						var cookieEnd = document.cookie.indexOf(";", cookieStart);
						if (cookieEnd == -1) {
							cookieEnd = document.cookie.length;
						}
						cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
					}
					return cookieValue;
				},
				set : function(name, value, expires, path, domain, secure) {
					var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
					if ( expires instanceof Date) {
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
				unset : function(name, path, domain, secure) {
					this.set(name, "", new Date(0), path, domain, secure);
				}
			},
			//格式验证
			validate : {
				//手机格式
				mobileNo : function(mobile) {
					var pattern = /^1\d{10}$/;
					if (pattern.test(mobile)) {
						return true;
					} else {
						return false;
					}
				},
				//邮箱
				email : function(email) {
					var pattern = /^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/;
					if (pattern.test(email)) {
						return true;
					} else {
						return false;
					}
				},
				//用户名
				userName : function(uname) {
					//var pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;//3-16位 字母开头  字母数字下划线组合
					var pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
					if (pattern.test(uname)) {
						return true;
					} else {
						return false;
					}
				},
				//密码
				password : function(password) {
					var pattern = /^\w*.{6,16}$/;
					//6-16位字母、数字、符号组成
					if (pattern.test(password)) {
						return true;
					} else {
						return false;
					}
				},
				//非法字符
				illegalCharater : function(str) {
					//非法字符@、&、空格、/、\、|、双引号、单引号、大于号、小于号、？、“· ”、冒号、分号  
					var pattern = /[@&\s\/\\\|"'><\?\.\:;]/im;
					if (pattern.test(str)) {
						return true;
					} else {
						return false;
					}
				},
				//银行卡
				bankAccountNo : function(idcard) {
					var pattern = /^\d{16,19}$/g;
					if (pattern.test(idcard)) {
						return true;
					} else {
						return false;
					}
				},
				//身份证
				IdCard : {
					Wi : [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], //加权因子
					vCode : [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2], // 身份证验证位值.10代表X
					IdCardMatch : function(idCard) {
						idCard = this.trim(idCard.replace(/ /g, ""));
						//去掉字符串头尾空格
						if (idCard.length == 15) {
							return this.isValidityBrithBy15IdCard(idCard);
							//进行15位身份证的验证
						} else if (idCard.length == 18) {
							var a_idCard = idCard.split("");
							// 得到身份证数组
							if (this.isValidityBrithBy18IdCard(idCard) && this.isTrueValidateCodeBy18IdCard(a_idCard)) {//进行18位身份证的基本验证和第18位的验证
								return true;
							} else {
								return false;
							}
						} else {
							return false;
						}
					},
					isTrueValidateCodeBy18IdCard : function(a_idCard) {
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
					isValidityBrithBy18IdCard : function(idCard18) {
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
					isValidityBrithBy15IdCard : function(idCard15) {
						var year = idCard15.substring(6, 8);
						var month = idCard15.substring(8, 10);
						var day = idCard15.substring(10, 12);
						var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

						// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
						if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
							return false;
						} else {
							return true;
						}
					},
					trim : function(str) {
						return str.replace(/(^\s*)|(\s*$)/g, "");
					}
				},
				//密码强度
				showPwdStrong : function(password, container) {
					var O_color = "#ccc";
					var L_color = '#ff0000';
					var M_color = '#ff9900';
					var H_color = '#19c521';
					if (password == null || password == '') {
						Lcolor = Mcolor = Hcolor = O_color;
					} else {
						S_level = this.checkPwdStrong(password);
						switch(S_level) {
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
				checkPwdStrong : function(password) {
					if (password.length < 4) {
						return 0;
						//太短
					}
					Modes = 0;
					for ( i = 0; i < password.length; i++) {
						Modes |= this.charMode(password.charCodeAt(i));
						//返回密码的Unicode编码
					}
					return this.bitTotal(Modes);

				},
				//判断输入密码的类型
				charMode : function(unicode) {
					if (unicode >= 48 && unicode <= 57) {//数字
						return 1;
					} else if (unicode >= 65 && unicode <= 90) {//大写字母
						return 2;
					} else if (unicode >= 97 && unicode <= 122) {//小写字母
						return 4;
					} else {
						return 8;
					}
				},
				//计算密码模式
				bitTotal : function(num) {
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
			setPartHidden : function(str, flag) {
				if (!str) {
					return '';
				}
				if (flag == 'email') {//邮箱
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
				} else if (flag == 'phone') {//手机
					var frontStr = str.substring(0, 3);
					var lastStr = str.substring(str.length - 5, str.length - 1);
					return frontStr + '****' + lastStr;
				} else if (flag == 'realname') {
					var len = str.length, firstName, showLen = 1, hiddenStr = '';
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
				} else if (flag == 'idcard') {//身份证号
					var len = str.length, hiddenStr = '';
					for (var i = 0; i < len - 1; i++) {
						hiddenStr += "*";
					}
					var frontStr = str.substring(0, 3);
					var lastStr = str.substring(str.length - 4, str.length);
					return frontStr + hiddenStr + lastStr;
				}

			},
			//时间倒数
			timeCountDown : function(seconds, cb1, cb2) {
				var timer = setInterval(function() {
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
			getEmailWebsiteUrl : function(email) {
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
				} else if (email.indexOf('@aliyun.com') != -1) {//阿里云
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
			vlidateMobileCode : function(paramsObj) {
				var data;
				$.ajax({
					type : 'get',
					async : false,
					url : _api + '/validate/check_mcode1',
					dataType : 'json',
					data : paramsObj,
					success : function(jsondata) {
						data = jsondata;
					}
				});
				return data;
			},
			//发送手机验证码
			sendMobileCode : function(paramsObj) {
				var data;
				$.ajax({
					type : 'get',
					async : false,
					url : _api + '/validate/send_mcode1',
					dataType : 'json',
					data : paramsObj,
					success : function(jsondata) {
						data = jsondata;
					}
				});
				return data;
			},
			//发送邮件
			sendEmail : function(paramsObj) {
				var data;
				$.ajax({
					type : 'post',
					async : false,
					url : _api + '/validate/send_email1',
					dataType : 'json',
					data : paramsObj,
					success : function(jsondata) {
						data = jsondata;
					}
				});
				return data;
			},
			//分页
			pagination : function(containerId, pageObj, searchObj) {
				var totalCount = pageObj.totalCount;
				var perPageCount = pageObj.perPageCount ? pageObj.perPageCount : 10;
				var callback = pageObj.callback;
				var currentPage = pageObj.currentPage;
				$("#" + containerId).pagination(totalCount, {
					items_per_page : perPageCount,
					num_display_entries : 6,
					current_page : currentPage,
					num_edge_entries : 1,
					callback : pageselectCallback
				});
				function pageselectCallback(page_id, jq) {
					$.extend(searchObj, {
						"page" : page_id + 1,
						"rows" : perPageCount
					});
					callback(searchObj, false);
				}
			},
			//前端静态分页
			Jpage : function(containerId, pageObj) {
				var totalCount = pageObj.totalCount;
				var perPageCount = pageObj.perPageCount ? pageObj.perPageCount : 10;
				var callback = pageObj.callback;
				$("#" + containerId).pagination(totalCount, {
					items_per_page : perPageCount,
					num_display_entries : 6,
					current_page : 0,
					num_edge_entries : 1,
					callback : pageselectCallback
				});
				function pageselectCallback(page_id, jq) {
					callback(page_id);
				}
			}
		},
		loadJson = function(data, mycallback, async, encryption) {
			if (async != undefined && async == true) {
				$.ajaxSetup({
					async : false
				});
			}
			//var AjaxUrl = url+ "?jsoncallback=?";
			//$.ajax(url, data, mycallback);
			$.ajax({
				type : "post",
				url : _api+'?rnd=' + Math.random(),
				//datType:'json',
				data : data,
				contentType : 'application/json;charset=utf-8',
				beforeSend : function(xhr) {
					//后续开始加密，设置header
					//xhr.setRequestHeader('Content-Type','application/json');
					if (encryption != undefined && encryption == true) {
						var uid = md5("zhangfengming");
						var password = md5("");
						xhr.setRequestHeader('uid', user);
					}
				},
				success : function(jsondata) {
					mycallback(jsondata);
				}
			});
			$.ajaxSetup({
				async : true
			});
		},
		//loadJsonp("yy","package.js",callbackFunction);
		loadJsonp = function(sid, jsurl, callback) {
			//function loadJs(sid,jsurl,callback){
			var nodeHead = document.getElementsByTagName('head')[0];
			var nodeScript = null;
			if (document.getElementById(sid) == null) {
				nodeScript = document.createElement('script');
				nodeScript.setAttribute('type', 'text/javascript');
				nodeScript.setAttribute('src', jsurl);
				nodeScript.setAttribute('id', sid);
				if (callback != null) {
					nodeScript.onload = nodeScript.onreadystatechange = function() {
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
		};
		//out api
		return {
			api : _api,
			loading : _loading,
			loadend : _loadend,
			init : _init,
			loadJson : loadJson,
			loadJsonp : loadJsonp,
			Utils: _Utils
		};
	};
	if ( typeof module !== "undefined" && module.exports) {
		module.exports = n;
	}
	if ( typeof ender === "undefined") {
		this.vlm = n;
	}
	if ( typeof define === "function" && define.amd) {
		define("vlm", ['jquery'], function($) {
			return n;
		});
	}
}).call(this, window, document);
