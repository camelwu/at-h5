/*
 * cvm.js
 * name:vehicle_control_mobile
 *
 * auth:wusongbo
 * 2015-11-12
 * ver:1.1.1
 */

(function(e, t) {"use strict";
	var c = c ||
	function(c) {
		var basePath = basePath == undefined ? "http://" + window.location.host : basePath
		, menus = {
			home : ['首页', basePath],
			order : ['订单', basePath + '/order.html'],
			service : ['客服', basePath + '/service.html'],
			user : ['我的', basePath + '/user.html']
		}, lStorage=window.localStorage
		, sStorage=window.sessionStorageterms
		,terms = {
			sort : ['排序', ''],
			order : ['筛选', ''],
			service : ['位置', '/service.html']
		}, init = function(k) {
			_loadend();
			var hrefstr = window.location.href;
			var _a = hrefstr.split("/");
			var _s = _a[_a.length - 1];
			var _p = _s.indexOf(".");
			var _k = _s.substring(0, _p);
			_k = _k == "" ? "home" : _k;
			var _initPage = function(key) {
				if (menus.hasOwnProperty(key)) {
					_initMenu();
				}
				if ($(".header").length > 0) {
					$("#content").css("padding-top", "45px");
				}
				switch(key) {
					case "order":
						if (sessionStorage.getItem("login")) {

						} else {

						}
						localStorage.setItem("type", 1);
						/*2~3：现金，加息，1为所有*/
						_initMenu();
						break;
					case "service":
						//
						break;
					case "user":
						sessionStorage.setItem("status", 1);
						sessionStorage.setItem("type", 1);
						/* */
						//_initMenu();
						break;
					default:
						/*默认用户首页*/
						//_initMenu();
						break;
				}
			};
			function _initMenu() {
				if (document.getElementById("menu")) {
					var menuer = document.getElementById("menu");
					menuer.className = "footer-menu-four-icons footer-menu";
				} else {
					var menuer = document.createElement('div');
					menuer.id = "menu";
					menuer.className = "footer-menu-four-icons footer-menu";
					document.body.appendChild(menuer);
					var odiv = document.createElement('div');
					odiv.style.height = "5.1rem";
					document.getElementById("content").appendChild(odiv);
				}
				var _str = "";
				for (var k in menus) {
					var cn = k == _k ? "foot-" + k + "s" : "foot-" + k;
					_str += "<a href='" + menus[k][1] + "' class='" + cn + "'><i></i>" + menus[k][0] + "</a>";
				}
				menuer.innerHTML = _str;
			};
		}, _loading = function() {
			if ($("#preloader").css('dislay') == 'none') {
				$("#status").fadeIn();
				$("#preloader").delay(400).fadeIn("medium");
			}
		}, _loadend = function() {
			if ($("#preloader").css('dislay') != 'none') {
				$("#status").fadeOut();
				$("#preloader").delay(400).fadeOut("medium");
			}
		}, dd={};
		function md5(string) {
			function md5_RotateLeft(lValue, iShiftBits) {
				return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}

			function md5_AddUnsigned(lX, lY) {
				var lX4, lY4, lX8, lY8, lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
				if (lX4 & lY4) {
					return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				}
				if (lX4 | lY4) {
					if (lResult & 0x40000000) {
						return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					} else {
						return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
					}
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			}

			function md5_F(x, y, z) {
				return (x & y) | ((~x) & z);
			}

			function md5_G(x, y, z) {
				return (x & z) | (y & (~z));
			}

			function md5_H(x, y, z) {
				return (x ^ y ^ z);
			}

			function md5_I(x, y, z) {
				return (y ^ (x | (~z)));
			}

			function md5_FF(a, b, c, d, x, s, ac) {
				a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
				return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_GG(a, b, c, d, x, s, ac) {
				a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
				return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_HH(a, b, c, d, x, s, ac) {
				a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
				return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_II(a, b, c, d, x, s, ac) {
				a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
				return md5_AddUnsigned(md5_RotateLeft(a, s), b);
			};
			function md5_ConvertToWordArray(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWords_temp1 = lMessageLength + 8;
				var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
				var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
				var lWordArray = Array(lNumberOfWords - 1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength) {
					lWordCount = (lByteCount - (lByteCount % 4)) / 4;
					lBytePosition = (lByteCount % 4) * 8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
				lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
				lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
				return lWordArray;
			};
			function md5_WordToHex(lValue) {
				var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
				for ( lCount = 0; lCount <= 3; lCount++) {
					lByte = (lValue >>> (lCount * 8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
				}
				return WordToHexValue;
			};
			function md5_Utf8Encode(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			};
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
			var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
			var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
			var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
			string = md5_Utf8Encode(string);
			x = md5_ConvertToWordArray(string);
			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;
			for ( k = 0; k < x.length; k += 16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
				d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
				c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
				b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
				a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
				d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
				c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
				b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
				a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
				d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
				c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
				b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
				a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
				d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
				c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
				b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
				a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
				d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
				c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
				b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
				a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
				d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
				c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
				b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
				a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
				d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
				c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
				b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
				a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
				d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
				c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
				b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
				a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
				d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
				c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
				b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
				a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
				d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
				c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
				b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
				a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
				d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
				c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
				b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
				a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
				d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
				c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
				b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
				a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
				d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
				c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
				b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
				a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
				d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
				c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
				b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
				a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
				d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
				c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
				b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
				a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
				d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
				c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
				b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
				a = md5_AddUnsigned(a, AA);
				b = md5_AddUnsigned(b, BB);
				c = md5_AddUnsigned(c, CC);
				d = md5_AddUnsigned(d, DD);
			}
			return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
		};
		function des(key, message, encrypt, mode, iv, padding) {
			//declaring this locally speeds things up a bit
			var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004, 0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400, 0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400, 0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004, 0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000, 0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000, 0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400, 0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404, 0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400, 0, 0x10004, 0x10400, 0, 0x1010004);
			var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020, 0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0, -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0, 0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020, -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020, -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0, 0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000, -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20, 0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0, 0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0, -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0, 0x108000);
			var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0, 0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000, 0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200, 0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200, 0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200, 0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200, 0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008, 0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200, 0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8, 0x8020008, 0x20200);
			var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080, 0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81, 0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80, 0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000, 0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081, 0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001, 0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001, 0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001, 0x80, 0x800000, 0x2000, 0x802080);
			var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100, 0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000, 0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000, 0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100, 0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000, 0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100, 0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100, 0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100, 0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100, 0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100, 0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
			var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010, 0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010, 0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0, 0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10, 0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000, 0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000, 0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000, 0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000, 0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000, 0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000, 0x400010, 0x20004010);
			var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800, 0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002, 0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002, 0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000, 0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800, 0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002, 0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000, 0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802, 0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000, 0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
			var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040, 0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000, 0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000, 0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040, 0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000, 0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40, 0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040, 0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0, 0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000, 0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040, 0x40040, 0x10000000, 0x10041000);

			//create the 16 or 48 subkeys we will need
			var keys = des_createKeys(key);
			var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
			var cbcleft, cbcleft2, cbcright, cbcright2;
			var endloop, loopinc;
			var len = message.length;
			var chunk = 0;
			//set up the loops for single and triple des
			var iterations = keys.length == 32 ? 3 : 9;
			//single or triple des
			if (iterations == 3) {
				looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
			} else {
				looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
			}

			//pad the message depending on the padding parameter
			if (padding == 2)
				message += "        ";
			//pad the message with spaces
			else if (padding == 1) {
				temp = 8 - (len % 8);
				message += String.fromCharCode(temp, temp, temp, temp, temp, temp, temp, temp);
				if (temp == 8)
					len += 8;
			}//PKCS7 padding
			else if (!padding)
				message += "\0\0\0\0\0\0\0\0";
			//pad the message out with null bytes

			//store the result here
			result = "";
			tempresult = "";

			if (mode == 1) {//CBC mode
				cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
				cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
				m = 0;
			}

			//loop through each 64 bit chunk of the message
			while (m < len) {
				left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
				right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

				//for Cipher Block Chaining mode, xor the message with the previous result
				if (mode == 1) {
					if (encrypt) {
						left ^=cbcleft;
						right ^=cbcright;
					} else {
						cbcleft2 = cbcleft;
						cbcright2 = cbcright;
						cbcleft = left;
						cbcright = right;
					}
				}

				//first each 64 but chunk of the message must be permuted according to IP
				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
				right ^=temp;
				left ^=(temp << 4);
				temp = ((left >>> 16) ^ right) & 0x0000ffff;
				right ^=temp;
				left ^=(temp << 16);
				temp = ((right >>> 2) ^ left) & 0x33333333;
				left ^=temp;
				right ^=(temp << 2);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff;
				left ^=temp;
				right ^=(temp << 8);
				temp = ((left >>> 1) ^ right) & 0x55555555;
				right ^=temp;
				left ^=(temp << 1);

				left = ((left << 1) | (left >>> 31));
				right = ((right << 1) | (right >>> 31));

				//do this either 1 or 3 times for each chunk of the message
				for ( j = 0; j < iterations; j += 3) {
					endloop = looping[j + 1];
					loopinc = looping[j + 2];
					//now go through and perform the encryption or decryption
					for ( i = looping[j]; i != endloop; i += loopinc) {//for efficiency
						right1 = right ^ keys[i];
						right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
						//the result is attained by passing these bytes through the S selection functions
						temp = left;
						left = right;
						right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f] | spfunction6[(right1 >>> 8) & 0x3f] | spfunction8[right1 & 0x3f] | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f] | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
					}
					temp = left;
					left = right;
					right = temp;
					//unreverse left and right
				}//for either 1 or 3 iterations

				//move then each one bit to the right
				left = ((left >>> 1) | (left << 31));
				right = ((right >>> 1) | (right << 31));

				//now perform IP-1, which is IP in the opposite direction
				temp = ((left >>> 1) ^ right) & 0x55555555;
				right ^=temp;
				left ^=(temp << 1);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff;
				left ^=temp;
				right ^=(temp << 8);
				temp = ((right >>> 2) ^ left) & 0x33333333;
				left ^=temp;
				right ^=(temp << 2);
				temp = ((left >>> 16) ^ right) & 0x0000ffff;
				right ^=temp;
				left ^=(temp << 16);
				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
				right ^=temp;
				left ^=(temp << 4);

				//for Cipher Block Chaining mode, xor the message with the previous result
				if (mode == 1) {
					if (encrypt) {
						cbcleft = left;
						cbcright = right;
					} else {
						left ^=cbcleft2;
						right ^=cbcright2;
					}
				}
				tempresult += String.fromCharCode((left >>> 24), ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff), (right >>> 24), ((right >>> 16) & 0xff), ((right >>> 8) & 0xff), (right & 0xff));

				chunk += 8;
				if (chunk == 512) {
					result += tempresult;
					tempresult = "";
					chunk = 0;
				}
			}//for every 8 characters, or 64 bits in the message

			//return the result as an array
			return result + tempresult;
		};
		function des_createKeys(key) {
			//declaring this locally speeds things up a bit
			pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004, 0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204, 0x10200, 0x10204, 0x20010200, 0x20010204);
			pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001, 0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100, 0x4000101, 0x4100100, 0x4100101);
			pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008, 0x1000800, 0x1000808);
			pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000, 0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000, 0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
			pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10, 0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010, 0x41010);
			pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420, 0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400, 0x2000020, 0x2000420);
			pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000, 0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
			pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000, 0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800, 0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
			pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2, 0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002, 0x2040002, 0x2000002, 0x2040002);
			pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000, 0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400, 0x10000400, 0x408, 0x10000408);
			pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000, 0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020, 0x102000, 0x102020);
			pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000, 0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200, 0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
			pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000, 0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010, 0x80010, 0x81010, 0x8080010, 0x8081010);
			pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1, 0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);

			//how many iterations (1 for des, 3 for triple des)
			var iterations = key.length > 8 ? 3 : 1;
			//changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
			//stores the return keys
			var keys = new Array(32 * iterations);
			//now define the left shifts which need to be done
			var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
			//other variables
			var lefttemp, righttemp, m = 0, n = 0, temp;

			for (var j = 0; j < iterations; j++) {//either 1 or 3 iterations
				left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
				right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

				temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
				right ^=temp;
				left ^=(temp << 4);
				temp = ((right >>> -16) ^ left) & 0x0000ffff;
				left ^=temp;
				right ^=(temp << -16);
				temp = ((left >>> 2) ^ right) & 0x33333333;
				right ^=temp;
				left ^=(temp << 2);
				temp = ((right >>> -16) ^ left) & 0x0000ffff;
				left ^=temp;
				right ^=(temp << -16);
				temp = ((left >>> 1) ^ right) & 0x55555555;
				right ^=temp;
				left ^=(temp << 1);
				temp = ((right >>> 8) ^ left) & 0x00ff00ff;
				left ^=temp;
				right ^=(temp << 8);
				temp = ((left >>> 1) ^ right) & 0x55555555;
				right ^=temp;
				left ^=(temp << 1);

				//the right side needs to be shifted and to get the last four bits of the left side
				temp = (left << 8) | ((right >>> 20) & 0x000000f0);
				//left needs to be put upside down
				left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
				right = temp;

				//now go through and perform these shifts on the left and right keys
				for (var i = 0; i < shifts.length; i++) {
					//shift the keys either one or two bits to the left
					if (shifts[i]) {
						left = (left << 2) | (left >>> 26);
						right = (right << 2) | (right >>> 26);
					} else {
						left = (left << 1) | (left >>> 27);
						right = (right << 1) | (right >>> 27);
					}
					left &= -0xf;
					right &= -0xf;

					//now apply PC-2, in such a way that E is easier when encrypting or decrypting
					//this conversion will look like PC-2 except only the last 6 bits of each byte are used
					//rather than 48 consecutive bits and the order of lines will be according to
					//how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
					lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf] | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf] | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf] | pc2bytes6[(left >>> 4) & 0xf];
					righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf] | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf] | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf] | pc2bytes13[(right >>> 4) & 0xf];
					temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
					keys[n++] = lefttemp ^ temp;
					keys[n++] = righttemp ^ (temp << 16);
				}
			}//for each iterations
			//return the keys we've created
			return keys;
		};

		this.setMd5 = function(s) {
			return md5(s);
		};
		this.stringToHex = function(s) {
			var r = "0x";
			var hexes = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
			for (var i = 0; i < s.length; i++) {
				r += hexes[s.charCodeAt(i) >> 4] + hexes[s.charCodeAt(i) & 0xf];
			}
			return r;
		};
		this.hexToString = function(h) {
			var r = "";
			for (var i = (h.substr(0, 2) == "0x") ? 2 : 0; i < h.length; i += 2) {
				r += String.fromCharCode(parseInt(h.substr(i, 2), 16));
			}
			return r;
		};
		this.Utils = {
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
			//比较时间大小
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
			//
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
					url : basePath + '/validate/check_mcode1',
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
					url : basePath + '/validate/send_mcode1',
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
					url : basePath + '/validate/send_email1',
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

			},
			pagination1 : function(containerId, pageObj, searchObj) {
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
						"curpage" : page_id + 1,
						"rows" : perPageCount
					});
					callback(searchObj, false);
				}

			}
		};
		this.loadJson=function(url, data, mycallback, async){
	    	if(async!=undefined && async==true){
		    	$.ajaxSetup({
		            async: false
		        });
	    	}
	    	//var AjaxUrl = url+ "?jsoncallback=?";
	    	url +='?rnd='+Math.random();
	        //$.ajax(url, data, mycallback);
	        $.ajax({
	            type:"post",
	            url:url,
	            dataType:'json',
	            data:data,
	            beforeSend: function(xhr){//这里设置header
	            	var uid = md5("zhangfengming");
	            	var password = md5("");
	            	xhr.setRequestHeader('user', user);
	            	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	            },
	            success:function(jsondata){
	            	mycallback(jsondata);
	          }
	        });
	        $.ajaxSetup({
	            async: true
	        });
		};
		//loadJsonp("yy","package.js",callbackFunction);
		this.loadJsonp=function(sid,jsurl,callback){
	        function loadJs(sid,jsurl,callback){
	            var nodeHead = document.getElementsByTagName('head')[0];
	            var nodeScript = null;
	            if(document.getElementById(sid) == null){
	                nodeScript = document.createElement('script');
	                nodeScript.setAttribute('type', 'text/javascript');
	                nodeScript.setAttribute('src', jsurl);
	                nodeScript.setAttribute('id',sid);
	                if (callback != null) {
	                    nodeScript.onload = nodeScript.onreadystatechange = function(){
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
	                if(callback != null){
	                    callback();
	                }
	            }
	        };
	        return loadJs(sid,jsurl,callback);
		};
	};

	if ( typeof module !== "undefined" && module.exports) {
		module.exports = c;
	}
	if ( typeof ender === "undefined") {
		this.vcm = c;
	}
	if ( typeof define === "function" && define.amd) {
		define("vcm", [], function($) {
			return c;
		});
	}

}).call(this, window, document);

/*
 var nameMapStr = "{'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷'," +
 "'Armenia':'亚美尼亚','French Southern and Antarctic Lands':'法属南半球和南极领地','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆'," +
 "'Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马'," +
 "'Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那','Belarus':'白俄罗斯','Belize':'伯利兹','Bermuda':'百慕大','Bolivia':'玻利维亚','Brazil':'巴西'," +
 "'Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Republic':'中非共和国','Canada':'加拿大','Switzerland':'瑞士'," +
 "'Chile':'智利','China':'中国','Ivory Coast':'象牙海岸','Cameroon':'喀麦隆','Democratic Republic of the Congo':'刚果民主共和国','Republic of the Congo':'刚果共和国'," +
 "'Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Northern Cyprus':'北塞浦路斯','Cyprus':'塞浦路斯','Czech Republic':'捷克共和国','Germany':'德国'," +
 "'Djibouti':'吉布提','Denmark':'丹麦','Dominican Republic':'多明尼加共和国','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Eritrea':'厄立特里亚','Spain':'西班牙','Estonia':'爱沙尼亚'," +
 "'Ethiopia':'埃塞俄比亚','Finland':'芬兰','Fiji':'斐','Falkland Islands':'福克兰群岛','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚'," +
 "'Gambia':'冈比亚','Guinea Bissau':'几内亚比绍','Equatorial Guinea':'赤道几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉'," +
 "'French Guiana':'法属圭亚那','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印尼','India':'印度','Ireland':'爱尔兰','Iran':'伊朗'," +
 "'Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Jamaica':'牙买加','Jordan':'约旦','Japan':'日本','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Kyrgyzstan':'吉尔吉斯斯坦','Cambodia':'柬埔寨'," +
 "'South Korea':'韩国','Kosovo':'科索沃','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Liberia':'利比里亚','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lesotho':'莱索托','Lithuania':'立陶宛','Luxembourg':'卢森堡'," +
 "'Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Macedonia':'马其顿','Mali':'马里','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克'," +
 "'Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','New Caledonia':'新喀里多尼亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔'," +
 "'New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Papua New Guinea':'巴布亚新几内亚','Poland':'波兰','Puerto Rico':'波多黎各','North Korea':'北朝鲜'," +
 "'Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','Western Sahara':'西撒哈拉','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','South Sudan':'南苏丹'," +
 "'Senegal':'塞内加尔','Solomon Islands':'所罗门群岛','Sierra Leone':'塞拉利昂','El Salvador':'萨尔瓦多','Somaliland':'索马里兰','Somalia':'索马里','Republic of Serbia':'塞尔维亚共和国','Suriname':'苏里南','Slovakia':'斯洛伐克'," +
 "'Slovenia':'斯洛文尼亚','Sweden':'瑞典','Swaziland':'斯威士兰','Syria':'叙利亚','Chad':'乍得','Togo':'多哥','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','East Timor':'东帝汶'," +
 "'Trinidad and Tobago':'特里尼达和多巴哥','Tunisia':'突尼斯','Turkey':'土耳其','United Republic of Tanzania':'坦桑尼亚联合共和国','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭'," +
 "'United States of America':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉'," +
 "'Vietnam':'越南','Vanuatu':'瓦努阿图','West Bank':'西岸','Yemen':'也门','South Africa':'南非'," +
 "'Zambia':'赞比亚','Zimbabwe':'津巴布韦'}";
 var nameArray= nameMapStr.split(",");
 var geoCoord="{";
 console.log(nameArray.length);//177
 for(var a=0;a<nameArray.length;a++){
 var countryName=nameArray[a].split(":")[0].substring(1,(nameArray[a].split(":")[0].length)-1);//得到要查询的英文名称
 console.log(countryName+"===="+a);
 //geoCoord=geoCoord+countryName+",";
 $.ajax({
 type: "POST",
 async: false,
 url: "https://maps.googleapis.com/maps/api/geocode/json?address="+countryName+"&key=你的KEY",
 success: function(msg){
 alert(msg.status);
 if(msg.status='ok'){
 var lat= msg.results[0].geometry.location.lat;//纬度
 var lng= msg.results[0].geometry.location.lng;//经度
 geoCoord= geoCoord+"'"+countryName+"':["+lng+","+lat+"],";
 }else{
 geoCoord= geoCoord+"'"+countryName+"':["+"未知"+","+"未知2"+"],";
 }
 }
 });
 }
 geoCoord=geoCoord+"}";
 $("#res").html(geoCoord);*/