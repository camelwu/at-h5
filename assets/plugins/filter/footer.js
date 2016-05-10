/*
 * 底部菜单
 * 创建底部菜单，id,class会有不同,每个页面只有一个底部，多个筛选条件
 * [
 *  "hotelSort":{title:"推荐排序",class:"t",type:0,key:,listData:[]},
 *  "hotelSect":{title:"推荐排序",class:"t",type:0,key:,listData:[]}
 * ]
 */
var footer = (function() {
	// 定义全局cache，随时替换
	var node,
	// 遮罩
	masker,
	// 菜单盒子
	box,
	// 盒子中选择
	sec,
	// 实例
	instance,
	// 已选择的内容cache
	filters = [],
	// 选择对象
	$ = function(arg, context) {
		var sub = arg.substring(1);
		context = context || document;
		if ( typeof arg == 'string') {
			switch(arg.charAt(0)) {
			case '#':
				node = document.getElementById(sub);
				break;
			case '.':
				if (context.getElementsByClassName)
					node = context.getElementsByClassName(sub);
				break;
			default:
				node = context.getElementsByTagName(arg);
				break;
			}
			return node;
		}
	},
	// 对象长度
	size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key))
				size++;
		}
		return size;
	},
	// 添加样式
	addClass = function(c) {
		node.className = node.className + ' ' + c;
		return this;
	},
	// 移除样式名
	removeClass = function(c) {
		var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
		node.className = node.className.replace(reg, '');
	},
	// 默认冒泡
	stopPropagation = function(event) {
		event = event || window.event;
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	};
	var menu = {
		init : function() {
			var i = 1, key, args = [].slice.call(arguments);
			if(args.length>0){
				box = document.querySelector(args[0]);
			}else{
				create();
			}
			
			return this;
		},

		setClass : function(n) {
			if (!node) {
				return "Error: Need to be attached to a dom node.";
			} else {
				node.className = n;
			}
			return this;
		},

		create : function(options) {
			if (!node) {
				return "Error: Need to be attached to a dom node to render the menu.";
			} else {
				//overlay

				//create menu
				for (var p in data) {

				}
				instance = new google.maps.Map(node, {
					zoom : zoom,
					center : new google.maps.LatLng(lat, lng),
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					disableDefaultUI : true
				});
				markers = [];
			}
			return instance;
		},

		// masker
		createMask : function(id, c) {
			if (!masker) {
				var masker = document.createElement('div');
				id ? masker.id = id : null;
				c ? masker.className = c : null;
				masker.style.display = "block";
				if (!id && !c) {
					masker.style.position = 'fixed';
					masker.style.left = 0;
					masker.style.top = 0;
					masker.style.width = '100%';
					masker.style.height = '100%';
					masker.style.background = 'rgba(0,0,0,0.6)';
					masker.style.zIndex = 20;
				}
				return this;
			} else {
				return false;
			}
		},

		currentMap : function() {
			return instance;
		},

		// drawings, marker
		createMarker : function(latitude, longitude, label, icon) {
			// marker
			if (!instance) {
				throw "Error: Need to create a map first!";
			}
			var transformed = at.transform.wgs2gcj(latitude, longitude);
			latitude = transformed.lat, longitude = transformed.lng;
			var marker = new google.maps.Marker({
				position : new google.maps.LatLng(latitude, longitude),
				map : instance,
				icon : icon
			});
			marker.at_label = label;
			markers.push(marker);
			// infor window
			var infoWindow = this.infoWindow || (this.infoWindow = new google.maps.InfoWindow());
			google.maps.event.addListener(marker, 'click', (function(_marker) {
				return function() {
					if (marker.at_label) {
						infoWindow.setContent(marker.at_label);
						infoWindow.open(instance, _marker);
					}
				};
			})(marker));
			setTimeout(function() {
				google.maps.event.trigger(marker, 'click');
			}, 2000);
			return markers.length;
		},

		removeMarkerWithLabel : function(label) {
			var found, idx;
			markers.forEach(function(item, index) {
				if (item.at_label == label) {
					idx = index;
					found = item;
				}
			});
			if (found) {
				found.setMap(null);
				markers.splice(idx, 1);
				return true;
			} else {
				return false;
			}
		},

		markHotel : function(latitude, longitude, label) {
			hotelPosition = {
				lat : latitude,
				lng : longitude
			};
			return this.createMarker(latitude, longitude, label, at.icons.hotel);
		},

		markUser : function(latitude, longitude, label) {
			userPosition = {
				lat : latitude,
				lng : longitude
			};
			return this.createMarker(latitude, longitude, label, at.icons.user);
		},

		moveCenter : function(dx, dy) {
			// move the center of the map with the given offset, dx, dy in km.
			lat = lat + (dy / 6378) * (180 / Math.PI);
			lng = lng + (dx / 6378) * (180 / Math.PI);
			if (this.currentMap()) {
				this.currentMap().panTo({
					lat : lat,
					lng : lng
				});
			}
		},

		on : function(node, type, handler) {
			node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
		},

		bindEvent : function() {
			var that = this;
			//底部三按钮
			that.on(node, 'click', function() {
				showItems();
			});
			//取消按钮
			that.on(btn_ok, 'click', function() {
				remove();
			});
			//确定按钮
			that.on(btn_esc, 'click', function() {
				showItems();
			});
			// 对象区域外点击，隐藏
			that.on(document, 'click', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				if (target.className.indexOf("mask") > -1) {
					that.selShow(0);
				}
			});
		},

		moveCenterToHotelLocation : function() {
			if (this.currentMap()) {
				this.currentMap().panTo(at.transform.wgs2gcj(hotelPosition.lat, hotelPosition.lng));
			}
			return this;
		},

		locateCurrentPosition : function(callback) {
			var _self = this;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat : position.coords.latitude,
						lng : position.coords.longitude
					};
					userPosition = pos;
					if (callback) {
						callback();
					} else {
						instance.setCenter(at.transform.wgs2gcj(pos.lat, pos.lng));
						_self.markUser(pos.lat, pos.lng);
					}
				}, function() {
					alert("Get user location failed!");
				});
			} else {
				// Browser doesn't support Geolocation
				alert("Browser doesn't support geolocation!");
			}
		},
	};

	return {
		menu : menu,
		filters : filters,
	};
})();
//调用方法
var menu_data = function() {
	var data = {
		hotelSort : {
			title : "推荐排序",
			c : "t",
			type : 0,
			key : 0,
			listData : []
		},
		hotelSect : {
			title : "推荐排序",
			c : "t",
			type : 1,
			key : 0,
			listData : []
		}
	};
	return data;
}();
if (footer) {
	footer.data = menu_data;
}
console.log(footer.menu.setData());
