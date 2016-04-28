var index;
var array = [];
var arrayId = [];
var travJson;
$(function() {
	var a = location.href;
	if (a.indexOf('user-oftenInfo') == -1) {
		return;
	}
	var menu = $("#menu")[0];
	menu.style.display = "none";
	// 初始化常旅客
	var memberId = localStorage.memberid||sessionStorage.memberid;
	var Parameters = {
		"Parameters" : "{\"memberId\":" + memberId + "}",
		"ForeEndType" : 3,
		"Code" : "0074"
	};
	//console.log(Parameters);
	vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback);

	var addtra_page = $("#addtra_page")[0];
	var addUser = $("#addUser")[0];
	var add_quit = $("#add_quit")[0];
	var uptra_page = $("#uptra_page")[0];
	var update_quit = $("#update_quit")[0];
	var name_state = $("#name_state")[0];
	var aname_state = $("#aname_state")[0];
	var fillName_page = $("#fillName_page")[0];
	var close_name = $("#close_name")[0];

	function showPage(obj1, obj2) {
		obj1.onclick = function() {
			obj2.style.display = "block";
		};
	}

	showPage(addUser, addtra_page);
	showPage(name_state, fillName_page);
	showPage(aname_state, fillName_page);
	function closePage(obj1, obj2) {
		obj1.onclick = function() {
			obj2.style.display = "none";
		};
	}

	closePage(add_quit, addtra_page);
	closePage(update_quit, uptra_page);
	closePage(close_name, fillName_page);

	//   增加常旅客
	var add_finish = $("#add_finish")[0];

	function addTraveler(obj) {
		obj.onclick = function() {
			var input = document.getElementById("addForm").getElementsByTagName("input");
			var postCard = document.getElementById("postCard").innerHTML;
			var cardId;
			if (input[1].value == "" || input[2].value == "") {
				alert("英文姓名为必填信息");
				return ;
			}
			//  判断证件类型
			if (postCard == "护照") {
				cardId = "1";
			} else if (postCard == "身份证") {
				cardId = "2";
			} else if (postCard == "出生证明") {
				cardId = "3";
			} else if (postCard == "港澳通行证") {
				cardId = "4";
			} else if (postCard == "军人证") {
				cardId = "5";
			} else if (postCard == "驾驶证") {
				cardId = "6";
			} else if (postCard == "台胞证") {
				cardId = "7";
			} else if (postCard == "回乡证") {
				cardId = "8";
			} else {
				cardId = "9";
			}
			//  判断性别
			var man = $("#man")[0];
			var sexCode;
			var sexName;
			if (man.className == "icon-h traveler-sex1") {
				sexCode = "Mr";
				sexName = "男";
			} else {
				sexCode = "Mrs";
				sexName = "女";
			}

			var oMobile = $('#mobile-cell-add')[0].value;
			var oEmail = $('#email-cell-add')[0].value;

			if (vlm.Utils.validate.mobileNo(oMobile) && vlm.Utils.validate.email(oEmail)) {

				var Parameters = {
					"Parameters" : "{\"Traveller\":{\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\"1932-06-15\",\"Email\":\"" + input[5].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[4].value + "\"},\"ListTravellerIdInfo\":[{\"IdType\":2,\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\"2016-02-13\"}]}",
					"ForeEndType" : 3,
					"Code" : "0071"
				};

				vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_addtrav);
			} else {
				alert('请输入正确的邮箱和电话号码');
			}
		};
	}

	addTraveler(add_finish);
	//   编辑常旅客
	var upadate_finish = $("#upadate_finish")[0];

	function upTraveler(obj) {
		obj.onclick = function() {
			//debugger;
			//console.log(array);
			var travelId = array[index];
			//console.log(travelId);

			var id = arrayId[index];
			//console.log(id);
			var input = document.getElementById("updateForm").getElementsByTagName("input");
			var cardType = document.getElementById("cardType").innerHTML;
			var cardId;
			var countryName = document.getElementById("countryName").innerHTML;
			if (input[1].value == "" || input[2].value == "") {
				alert("英文姓名为必填信息");
				return;
			}
			//  判断性别
			var man = $("#man2")[0];
			var sexCode;
			var sexName;
			if (man.className == "icon-h traveler-sex1") {
				sexCode = "Mr";
				sexName = "男";
			} else {
				sexCode = "Mrs";
				sexName = "女";
			}
			//  判断证件类型
			if (cardType == "护照") {
				cardId = "1";
			} else if (cardType == "身份证") {
				cardId = "2";
			} else if (cardType == "出生证明") {
				cardId = "3";
			} else if (cardType == "港澳通行证") {
				cardId = "4";
			} else if (cardType == "军人证") {
				cardId = "5";
			} else if (cardType == "驾驶证") {
				cardId = "6";
			} else if (cardType == "台胞证") {
				cardId = "7";
			} else if (cardType == "回乡证") {
				cardId = "8";
			} else {
				cardId = "9";
			}
			// 手机号邮箱检验
			var oMobile = $('#mobile-cell')[0].value;
			var oEmail = $('#email-cell')[0].value;

			if (vlm.Utils.validate.mobileNo(oMobile) && vlm.Utils.validate.email(oEmail)) {
				var Parameters = {
					"Parameters" : "{\"Traveller\":{\"TravellerId\":" + travelId + ",\"IdName\":\"" + input[0].value + "\",\"LastName\":\"" + input[1].value + "\",\"FirstName\":\"" + input[2].value + "\",\"CountryCode\":\"CN\",\"CountryName\":\"中国\",\"SexCode\":\"" + sexCode + "\",\"SexName\":\"" + sexName + "\",\"DateOfBirth\":\"1932-06-15\",\"Email\":\"" + input[5].value + "\",\"MemberId\":\"" + memberId + "\",\"MobilePhone\":\"" + input[4].value + "\"},\"ListTravellerIdInfo\":[{\"Id\":" + id + ",\"TravellerId\":" + travelId + ",\"IdType\":2,\"IdNumber\":\"" + input[3].value + "\",\"IdCountry\":\"CN\",\"IdActivatedDate\":\"2016-02-13\"}]}",
					"ForeEndType" : 3,
					"Code" : "0072"
				};
				//console.log(Parameters);
				vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_uptrav);

			} else {
				alert('请输入正确的手机号和邮箱');
			}
			//console.log(Parameters);

		}
	}

	upTraveler(upadate_finish);
	//   删除常旅客
	var delTra = $("#delTra")[0];

	function deleteTra(obj) {
		obj.onclick = function() {
			var travelId = array[index];
			var id = arrayId[index];
			var Parameters = {
				"Parameters" : "{\"travellerId\":" + travelId + "}",
				"ForeEndType" : 3,
				"Code" : "0073"
			};
			vlm.loadJson("http://10.2.22.239:8888/api/GetServiceApiResult", JSON.stringify(Parameters), mycallback_deltrav);
		}
	}

	deleteTra(delTra);
});

(function() {
	var aSel = document.querySelectorAll('.sex-cho-wrap');

	for (var i = 0; i < aSel.length; i++) {
		(function(index) {
			var aSpan = aSel[index].querySelectorAll('b');
			for ( j = 0; j < aSpan.length; j++) {
				aSpan[j].onclick = function() {
					for ( i = 0; i < aSpan.length; i++) {
						aSpan[i].className = 'icon-h traveler-sex2';
					}
					this.className = 'icon-h traveler-sex1';
				}
			}
		})(i);

	}

})();

//  页面初始获取常旅客
function mycallback(ret) {
	travJson = eval('(' + ret + ')');
	var blank = $("#blank")[0];
	//console.log(travJson)
	if (travJson.success) {
		if (travJson.data.length == 0) {
			blank.style.display = "block";
		} else {
			blank.style.display = "none";
			var content = $("#content")[0];
			var UL = document.createElement("ul");
			UL.className = "often-traveler";
			UL.style.borderTop = "1px solid #dedede";
			UL.style.marginTop = "10px";
			for (var i = 0; i < travJson.data.length; i++) {
				array[i] = travJson.data[i].traveller.travellerId;
				arrayId[i] = travJson.data[i].traveller.Id;
				var li = document.createElement("li");
				li.className = "eve-traveler";
				var b = document.createElement("b");
				b.className = "bu_icon user-edits";
				b.style.marginTop = li.clientHeight + 20 + 'px';
				b.addEventListener("click", updateTra);
				li.appendChild(b);
				var ul = document.createElement("ul");
				ul.className = "often_user";
				var ul_li1 = document.createElement("li");
				ul_li1.innerHTML = travJson.data[i].traveller.idName + travJson.data[i].traveller.lastName + "/" + travJson.data[i].traveller.firstName;
				ul.appendChild(ul_li1);
				var ul_li2 = document.createElement("li");
				if (travJson.data[i].listTravellerIdInfo[0].idType == "1") {
					ul_li2.innerHTML = "护照" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "2") {
					ul_li2.innerHTML = "身份证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "3") {
					ul_li2.innerHTML = "出生证明" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "4") {
					ul_li2.innerHTML = "港澳通行证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "5") {
					ul_li2.innerHTML = "军官证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "6") {
					ul_li2.innerHTML = "驾驶证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "7") {
					ul_li2.innerHTML = "台胞证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else if (travJson.data[i].listTravellerIdInfo[0].idType == "8") {
					ul_li2.innerHTML = "回乡证" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				} else {
					ul_li2.innerHTML = "其他" + " " + travJson.data[i].listTravellerIdInfo[0].idNumber;
				}
				ul.appendChild(ul_li2);
				var ul_li3 = document.createElement("li");
				ul_li3.innerHTML = "手机号" + " " + travJson.data[i].traveller.mobilePhone;
				ul.appendChild(ul_li3);
				li.appendChild(ul);
				li.setAttribute("index", i);
				UL.appendChild(li);
			}
			content.appendChild(UL);
		}
	} else {
		alert(travJson.message);
	}
}

function mycallback_addtrav(ret) {
	var myJson = eval('(' + ret + ')');
	console.log(myJson);
	if (myJson.success) {
		document.getElementById("addForm").submit();
	} else {
		alert(myJson.message);
	}
}

function mycallback_deltrav(ret) {
	var myJson = eval('(' + ret + ')');
	console.log(myJson);
	if (myJson.success) {
		window.location.href = "user-oftenInfo.html";
	} else {
		alert(myJson.message);
	}
}

function mycallback_uptrav(ret) {
	var myJson = eval('(' + ret + ')');
	console.log(myJson);
	if (myJson.success) {
		document.getElementById("updateForm").submit();
	} else {
		alert(myJson.message);
	}
}

//  编辑常旅客页面
function updateTra() {
	var b = window.event.srcElement;
	var li = b.parentElement;
	index = li.getAttribute("index");
	var uptra_page = $("#uptra_page")[0];
	uptra_page.style.display = "block";
	var input = document.getElementById("updateForm").getElementsByTagName("input");
	var cardType = $("#cardType")[0];
	var countryName = $("#countryName")[0];
	var man2 = $("#man2")[0];
	var woman2 = $("#woman2")[0];
	input[0].value = travJson.data[index].traveller.idName;
	input[1].value = travJson.data[index].traveller.lastName;
	input[2].value = travJson.data[index].traveller.firstName;
	input[3].value = travJson.data[index].traveller.idNumber;
	input[5].value = travJson.data[index].traveller.email;
	if (travJson.data[index].listTravellerIdInfo[0].idType == "1") {
		cardType.innerHTML = "护照";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "2") {
		cardType.innerHTML = "身份证";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "3") {
		cardType.innerHTML = "出生证明";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "4") {
		cardType.innerHTML = "港澳通行证";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "5") {
		cardType.innerHTML = "军官证";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "6") {
		cardType.innerHTML = "驾驶证";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "7") {
		cardType.innerHTML = "台胞证";
	} else if (travJson.data[index].listTravellerIdInfo[0].idType == "8") {
		cardType.innerHTML = "回乡证";
	} else {
		cardType.innerHTML = "其他";
	}
	countryName.innerHTML = travJson.data[index].traveller.countryName;
	if (travJson.data[index].traveller.sexCode == "Mr") {
		man2.className = "icon-h traveler-sex1";
		woman2.className = "icon-h traveler-sex2";
	} else {
		man2.className = "icon-h traveler-sex2";
		woman2.className = "icon-h traveler-sex1";
	}
}

vlm.init();

//显示新增乘机人编辑页
function showAddAir_page() {
	var addAir_page = document.getElementById("addAir-page");
	addAir_page.style.display = "block";
}

function closeAddAir_page() {
	var addAir_page = document.getElementById("addAir-page");
	addAir_page.style.display = "none";
}

function showChild_page() {
	var childen_page = document.getElementById("childen-page");
	childen_page.style.display = "block";
}

function closeChild_page() {
	var childen_page = document.getElementById("childen-page");
	childen_page.style.display = "none";
}

function choseSex() {
	//  判断性别
	var man = $("#man")[0];
	var sexCode;
	var sexName;
	if (man.className == "icon-h traveler-sex1") {
		sexCode = "Mr";
		sexName = "男";
	} else {
		sexCode = "Mrs";
		sexName = "女";
	}
}

localStorage.cc = "1364324823748234";
//get user list
var tpl_u = ['<li class="eve-traveler">', '<b class="icon user-choice{% if(localStorage.cc==listTravellerIdInfo[0]["idNumber"]){ %}1{% }else{ %}2{% } %}"></b>', '<b class="icon user-edit"></b>', '<ul class="often_user">', '<li>{%=traveller["idName"]%}{%=traveller["firstName"]%}</li>', '<li>身份证 <span>{%=listTravellerIdInfo[0]["idNumber"]%}</span></li>', '</ul>', '</li>'].join(''), sdata = {
	"Parameters" : "{\"memberId\":'494258'}",
	"ForeEndType" : 3,
	"Code" : "0074"
}

function input_ulist(d) {
	console.log(d)
	var json = JSON.parse(d);
	/*  var json2 = {
	"success": true,
	"message": "",
	"data": [
	{
	"traveller": {
	"travellerId": 21,
	"idName": "1231234124",
	"lastName": "14",
	"firstName": "134",
	"countryCode": "CN",
	"countryName": "中国",
	"sexCode": "Mr",
	"sexName": "男",
	"dateOfBirth": "1932-06-15T00:00:00",
	"email": "1136328136@qq.com",
	"createTime": "2016-02-18T18:55:39.563",
	"memberId": 494258,
	"isDelete": false,
	"mobilePhone": "13716410136",
	"nationalityCode": null
	},
	"listTravellerIdInfo": [
	{
	"id": 22,
	"travellerId": 21,
	"idType": 2,
	"idNumber": "134134",
	"idCountry": "CN",
	"idActivatedDate": "1990-01-09T00:00:00"
	}
	]
	},
	{
	"traveller": {
	"travellerId": 22,
	"idName": "齐真真",
	"lastName": "1123",
	"firstName": "dsds",
	"countryCode": "CN",
	"countryName": "中国",
	"sexCode": "Mr",
	"sexName": "男",
	"dateOfBirth": "1932-06-15T00:00:00",
	"email": "1136328136@qq.com",
	"createTime": "2016-02-18T18:29:31.03",
	"memberId": 494258,
	"isDelete": false,
	"mobilePhone": "13652525256",
	"nationalityCode": null
	},
	"listTravellerIdInfo": [
	{
	"id": 23,
	"travellerId": 22,
	"idType": 2,
	"idNumber": "1364324823748234",
	"idCountry": "CN",
	"idActivatedDate": "1990-01-09T00:00:00"
	}
	]
	}
	]
	}*/
	//console.log(json2.data)
	var html = template(tpl_u, json.data);
	$("#allList").html(html);
}

vlm.loadJson("", JSON.stringify(sdata), input_ulist);

//中-英
$('#chn-name .foreign').click(function() {
	$('#chn-name').hide();
	$('#eng-name').show();
});

//英-中
$('#eng-name .chn').click(function() {
	$('#chn-name').show();
	$('#eng-name').hide();
});

//姓名说明
$('.name-notes').click(function() {
	$('.fillName-page').show();
});

$('.name-eng-note').click(function() {
	$('.fillName-page').show();
});

$('.name-illustrate').click(function() {
	$('#fillName-page').hide();
});

function redicturl() {
	if (window.opener) {
		window.close();
	} else {
		window.history.go(-1);
	}
}


$(".con-mobile-list li").click(function() {
	//
	console.log(1111);

	redicturl();
});
document.querySelector('.header-back').onclick = function() {
	redicturl();
}
var myDate1 = new Scroller({
	id : "birth-cont",
	type : "birth",
	cont : "week_span2"
});
var myDate2 = new Scroller({
	id : "time-cont",
	type : "birth",
	cont : "week_span2"
});
var myDate2 = new Scroller({
	id : "postCard",
	type : "card",
	cont : "week_span2"
});

var myDate3 = new Scroller({
	id : "birth-cont-edit",
	type : "birth",
	cont : "week_span2"
});
var myDate3 = new Scroller({
	id : "time-cont-edit",
	type : "birth",
	cont : "week_span2"
});
var myDate3 = new Scroller({
	id : "cardType",
	type : "card",
	cont : "week_span2"
});

var myDate4 = new Scroller({
	id : "birth-cont-per",
	type : "birth",
	cont : "week_span2"
});

var userSub = {
	state : "",
	parseUrlPara : function(url, isEncode) {
		var isEncode = isEncode || false;
		var reg = /([^=&?]+)=([^=&?]+)/g, obj = {};
		url.replace(reg, function() {
			var arg = arguments;
			obj[arg[1]] = isEncode ? decodeURIComponent(arg[2]) : arg[2];
		});
		return obj;
	},
	addHandler : function(target, eventType, handle) {
		if (document.addEventListener) {
			this.addHandler = function(target, eventType, handle) {
				target.addEventListener(eventType, handle, false);
			}
		} else if (document.attachEvent) {
			this.addHandler = function(target, eventType, handle) {
				target.attachEvent('on' + eventType, function() {
					handle.call(target);
				});
			}
		} else {
			this.addHandler = function(target, eventType, handle) {
				target['on' + eventType] = handle;
			}
		}
		this.addHandler(target, eventType, handle);
		return this;
	},
	eventBind : function() {
		var cancel = document.querySelector('.header-quit'), self = this;
		var choPassengerUlList = document.querySelector('.often-traveler.list-traveler');
		var choPassengerUlChoosed = document.querySelector('.often-traveler.choosed-traveler');
		var adultNumber = document.querySelector('.adult-number'), that = this;
		this.addHandler(cancel, 'click', function() {
			if (self.state == 'edit') {
				if (window.opener) {
					window.close();
				} else {
					window.history.go(-1);
				}
			}
		}).addHandler(choPassengerUlList, 'click', function() {
			var event = event || window.event;
			var target = event.target || event.srcElement;
			if (target.className == 'icon user-edit') {
				document.querySelector("#addAir-page").style.display = "block";
			} else if (target.className == 'icon user-choice2') {
				target.className = 'icon user-choice1';
				choPassengerUlList.removeChild(target.parentNode);
				choPassengerUlChoosed.appendChild(target.parentNode);
				console.log(choPassengerUlChoosed.innerHTML)
				adultNumber.innerHTML = choPassengerUlChoosed.querySelectorAll('li').length + '/' + that.ruleNUmber.NumofAdult;
			}
		});
		this.addHandler(choPassengerUlChoosed, 'click', function() {
			var event = event || window.event;
			var target = event.target || event.srcElement;
			if (target.className == 'icon user-edit') {
				document.querySelector("#addAir-page").style.display = "block";
			}
		});
	},
	showBox : function() {
	},
	init : function() {
		var transferPara = this.parseUrlPara(document.location.search, true);
		this.ruleNUmber = transferPara
		this.state = transferPara.type;
		if (this.state == 'edit') {
			document.querySelector("#addAir-page").style.display = "block";
		}
		this.eventBind();
	}
};
userSub.init();
