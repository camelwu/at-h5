var infoObj = parseUrlPara(document.location.href, true);
var latitude = Number(infoObj["Latitude"]), longitude = Number(infoObj["Longitude"]), label = infoObj["HotelName"];
infoObj["hotelAddress"] ? label += infoObj["hotelAddress"] : null;
function parseUrlPara(url, isEncode) {
	var isEncode = isEncode || false;
	var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
	url.replace(reg, function() {
		var arg = arguments;
		obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
	});
	return obj;
}

function CreateMap() {
	at.map.attachTo('map');
	at.map.createMap(latitude, longitude);
	at.map.markHotel(latitude, longitude, label);
	document.getElementById("preloader").style.display = 'none';
}