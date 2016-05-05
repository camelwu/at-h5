//
//  ATGMSMain.js
//  AsiaTravel
//
//  Created by ChengCheng on 4/18/16.
//  Copyright © 2016 asiatravel. All rights reserved.
//

// summary:
//      Provide transformation & util methods on locations.
var transform = (function () {
	var outOfChina = function (lat, lng) {
		if ((lng < 72.004) || (lng > 137.8347)) {
			return true;
		}
		if ((lat < 0.8293) || (lat > 55.8271)) {
			return true;
		}
		return false;
	};
	var transformLat = function (x, y) {
		var ret = -100.0 + 2.0*x + 3.0*y + 0.2*y*y + 0.1*x*y + 0.2*Math.sqrt(Math.abs(x));
		ret += (20.0*Math.sin(6.0*x*Math.PI) + 20.0*Math.sin(2.0*x*Math.PI)) * 2.0 / 3.0;
		ret += (20.0*Math.sin(y*Math.PI) + 40.0*Math.sin(y/3.0*Math.PI)) * 2.0 / 3.0;
		ret += (160.0*Math.sin(y/12.0*Math.PI) + 320*Math.sin(y*Math.PI/30.0)) * 2.0 / 3.0;
		return ret;
	};
	var transformLng = function (x, y) {
		var ret = 300.0 + x + 2.0*y + 0.1*x*x + 0.1*x*y + 0.1*Math.sqrt(Math.abs(x));
		ret += (20.0*Math.sin(6.0*x*Math.PI) + 20.0*Math.sin(2.0*x*Math.PI)) * 2.0 / 3.0;
		ret += (20.0*Math.sin(x*Math.PI) + 40.0*Math.sin(x/3.0*Math.PI)) * 2.0 / 3.0;
		ret += (150.0*Math.sin(x/12.0*Math.PI) + 300.0*Math.sin(x/30.0*Math.PI)) * 2.0 / 3.0;
		return ret;
	};
	var delta = function (lat, lng) {
		var a = 6378245.0;
		var ee = 0.00669342162296594323;
		var dLat = transformLat(lng-105.0, lat-35.0);
		var dLng = transformLng(lng-105.0, lat-35.0);
		var radLat = lat / 180.0 * Math.PI;
		var magic = Math.sin(radLat);
		magic = 1 - ee*magic*magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
		dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
		return {"lat": dLat, "lng": dLng};
	};

	var wgs2gcj = function (wgsLat, wgsLng) {
		if (outOfChina(wgsLat, wgsLng)) {
			return {"lat": wgsLat, "lng": wgsLng};
		}
		var d = delta(wgsLat, wgsLng);
		return {"lat": wgsLat + d.lat, "lng": wgsLng + d.lng};
	};
	var gcj2wgs = function (gcjLat, gcjLng) {
		if (outOfChina(gcjLat, gcjLng)) {
			return {"lat": gcjLat, "lng": gcjLng};
		}
		var d = delta(gcjLat, gcjLng);
		return {"lat": gcjLat - d.lat, "lng": gcjLng - d.lng};
	}
	return {
		wgs2gcj: wgs2gcj,
		gcj2wgs: gcj2wgs,
		outOfChina: outOfChina
	};
})();

if (at) {
	at.transform = transform;
};
