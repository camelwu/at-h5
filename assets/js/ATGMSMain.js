//
//  ATGMSMain.js
//  AsiaTravel
//
//  Created by ChengCheng on 4/05/16.
//  Copyright © 2016 asiatravel. All rights reserved.
//

// summary:
//      Global name space for asiatravel-gms-js components.

var at = (function () {
	var node, lat, lng, zoom, instance;
	var userPosition, hotelPosition;
	var markers = [];
	var map = {
		attachTo: function (nodeId) {
			node = document.getElementById(nodeId);
			return this;
		},

		latitude: function (latitude) {
			lat = latitude;
			return this;
		},

		longitude: function (longitude) {
			lng = longitude;
			return this;
		},

		zoom: function (zoomLevel) {
			// zoom level should stands between 1(world) to 20(buildings).
			zoom = Math.min(20, Math.max(1, zoomLevel));
			return this;
		},
		draggabletmp:function(tmp){
			if( tmp !== undefined){
				draggabletmp = tmp;
			}else{
				draggabletmp = true;
			}
			return this;
		},

		create: function () {
			if (!node) {
			    return "Error: Need to be attached to a dom node to render the map.";
			} else {
				instance = new google.maps.Map(node, {
					zoom: zoom,
					draggable:draggabletmp,
					center: new google.maps.LatLng(lat, lng),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					disableDefaultUI: true
				});
				markers = [];
			}
			return instance;
		},

		// map
		createMap: function (latitude, longitude,tmp, zoom) {
			console.log(tmp)
			if (latitude != null && longitude != null) {
				return this.latitude(latitude).longitude(longitude).zoom(zoom || 15).draggabletmp(tmp).create(); // default zoom level is 15.
			} else {
				return false;
			}
		},

		currentMap: function () {
			return instance;
		},

		// drawings, marker
		createMarker: function (latitude, longitude, label, icon) {
			// marker
			if (!instance) {
				throw "Error: Need to create a map first!";
			}
			var transformed = at.transform.wgs2gcj(latitude, longitude);
			latitude = transformed.lat, longitude = transformed.lng;
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: instance,
				icon: icon
			});
			marker.at_label = label;
			markers.push(marker);
			// infor window
			var infoWindow = this.infoWindow || (this.infoWindow = new google.maps.InfoWindow());
			google.maps.event.addListener(marker, 'click', (function (_marker) {
				return function () {
					if (marker.at_label) {
						infoWindow.setContent(marker.at_label);
						infoWindow.open(instance, _marker);
					}
				};
			})(marker));
			setTimeout(function () {
				google.maps.event.trigger(marker, 'click');
			}, 2000);
			return markers.length;
		},

		removeMarkerWithLabel: function (label) {
			var found, idx;
			markers.forEach(function (item, index) {
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

		markHotel: function (latitude, longitude, label) {
			hotelPosition = {lat: latitude, lng: longitude};
			return this.createMarker(latitude, longitude, label, at.icons.hotel);
		},

		markUser: function (latitude, longitude, label) {
			userPosition = {lat: latitude, lng: longitude};
			return this.createMarker(latitude, longitude, label, at.icons.user);
		},

		moveCenter: function (dx, dy) {
			// move the center of the map with the given offset, dx, dy in km.
			lat = lat + (dy / 6378) * (180 / Math.PI);
			lng = lng + (dx / 6378) * (180 / Math.PI);
			if (this.currentMap()) {
				this.currentMap().panTo({lat: lat, lng: lng});
			}
		},

		moveCenterToUserLocation: function () {
			if (this.currentMap()) {
				if (userPosition && userPosition.lat && userPosition.lng) {
					this.currentMap().panTo(at.transform.wgs2gcj(userPosition.lat, userPosition.lng));
				} else {
					this.locateCurrentPosition(function () {
						at.map.moveCenterToUserLocation();
					});
				}
			};
			return this;
		},

		moveCenterToHotelLocation: function () {
			if (this.currentMap()) {
				this.currentMap().panTo(at.transform.wgs2gcj(hotelPosition.lat, hotelPosition.lng));
			}
			return this;
		},

		locateCurrentPosition: function (callback) {
			var _self = this;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
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

	var bridge = {
          // bridge to call oc-client;
	};
	return {
		map: map,
		ocbridge: bridge,
	};
})();

var initialize = function () {
    at.map.attachTo('map');
};
