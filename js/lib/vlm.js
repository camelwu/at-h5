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
		/*page view layout*/
		var basePath = basePath == undefined ? "http://" + window.location.host : basePath, menus = {
			home : ['首页', basePath + '/index.html'],
			//order : ['订单', basePath + '/order.html'],
			//service : ['客服', basePath + '/service.html'],
			find :	['发现', basePath],
			user : ['我的', basePath + '/user.html']
		}, lStorage=window.localStorage
		, sStorage=window.sessionStorage
		, init = function(k) {
			_loadend();
			var hrefstr = window.location.href;
			var _a = hrefstr.split("/");
			var _s = _a[_a.length - 1];
			var _p = _s.indexOf(".");
			var _k = _s.substring(0,_p);
			_k = _k==""?"home":_k;
			var _initPage = function(key) {
			/*	if(menus.hasOwnProperty(key)){
					_initMenu();
				}*/
				for(var temp in menus){
					console.log(temp.indexOf(key));
					if(key.indexOf(temp) != -1){

						_initMenu();
					}

				}

				if($(".header").length > 0){
					$("#content").css("padding-top","45px");
				}
				switch(key) {
					case "order":
						if (sessionStorage.getItem("login")) {
							
						} else {

						}
						localStorage.setItem("type", 1);
						
						break;
					case "service":
						//
						break;
					case "user":
						sessionStorage.setItem("status", 1);
						sessionStorage.setItem("type", 1);
						
						break;
					default:
						/*默认用户首页*/
						//_initMenu();
						/*if(lStorage.islogin==0){
						 $("#unloginShow").show();
						 $("#loginShow").hide();
						 }else{//has login
						 $("#loginShow").show();
						 $("#unloginShow").hide();
						 //begin set userinfo
						 lStorage.isauth=lStorage.isPwd=lStorage.isBindCard=0;
						 //load authinfo
						 loadJSON(basePath+"/auth/account/account_manager",{},authInfo);
						 }*/
						break;
				}
			};
			function _initMenu() {
				if (document.getElementById("menu")) {
					var menuer = document.getElementById("menu");
					menuer.className = "footer-menu-three-icons footer-menu";
				} else {
					var menuer = document.createElement('div');
					menuer.id = "menu";
					menuer.className = "footer-menu-three-icons footer-menu";
					document.body.appendChild(menuer);
					// var odiv = document.createElement('div');
					// odiv.style.height = "5.1rem";
					// document.getElementById("content").appendChild(odiv);
				}


				var _str = "";
				for (var k in menus) {
					var cn = _k.indexOf(k) != -1?"foot-"+k+"s":"foot-"+k;
					_str += "<a href='" + menus[k][1] + "' class='" + cn + "'><i></i>" + menus[k][0] + "</a>";
				}
				menuer.innerHTML = _str;
				$("#content").css("padding-bottom","51px");
			};


			_initPage(_k);


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
		};
		/*product layout*/
		var list = [];
		/*Dom List*/
		var listeners = {};
		/*How it`s work*/
		var add = function(name) {
			this.list.push({
				name : name
			});
			this.dispatch("user-added");
		};
		var on = function(eventName, listener) {
			if (!this.listeners[eventName])
				this.listeners[eventName] = [];
			this.listeners[eventName].push(listener);
		};
		var dispatch = function(eventName) {
			if (this.listeners[eventName]) {
				for (var i = 0; i < this.listeners[eventName].length; i++) {
					this.listeners[eventName][i](this);
				}
			}
		};
		var numOfAddedUsers = function() {
			return this.list.length;
		};
		/*this.on=("user-added", function() {
		 alert(Users.numOfAddedUsers());
		 });*/
		this.close = function() {
			o.dispatchEvent("close");
			u.translate.easeTo(0);
		};
		//out api
		return {
			_basePath : basePath,
			loading : _loading,
			loadend : _loadend,
			_init : init
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

//vlm._init(); 