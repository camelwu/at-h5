/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
var data2="",roomdata="";!function(){function getDayNum(a,b){var c,d=Date.parse(a.replace(/-/g,"/")),e=Date.parse(b.replace(/-/g,"/"));return c=Math.abs(e-d)/1e3/60/60/24}function dataCallBack(a){if($("#preloader").hide(),a.success&&a.data.hotelInfo.hotelID){var b=JSON.parse(window.sessionStorage.getItem("flightHotelAllData"));window.location.search||(b.data.hotelInfo=a.data.hotelInfo,window.sessionStorage.setItem("flightHotelAllData",JSON.stringify(b))),data2=a.data,roomdata=data2.hotelInfo.rooms,nav(),banner(),adress(),room(),$(".jhf-date").show(),vlm.init()}else jAlert("暂无酒店详细数据,请稍后再试","提示")}function nav(){var a=template("tpl_seoul",data2.hotelInfo);$(".j-title").html(a)}function banner(){var a=template("banner",data2.hotelInfo);$(".jhf-banner").html(a)}function adress(){var a=template("jhf_score",data2.hotelInfo);$(".jhf-score").html(a)}function room(){var a=template("jhf_room",data2.hotelInfo);$(".jhf-mes").append(a),$(".jhf-mes li.showh .slide").each(function(a){ulrRoomId==roomdata[a].roomID&&$(".jhf-mes li.showh .slide").eq(a).find("b").addClass("cur"),$(".jhf-mes li.showh .slide").eq(a).click(function(){$(this).find("b").addClass("cur").parents("li.showh").siblings().find("b").removeClass("cur");var b=roomdata[a].roomID;window.location.href="ticket_hotel_choose.html?selectedRoomID="+b})})}var temObj=eval("temObj="+localStorage.getItem("hotelDetailInfo")).data,ulrRoomId=parseInt(window.location.search.substring(15)),departDate=temObj.DepartDate.substring(0,10),enterDate=temObj.ReturnDate.substring(0,10);temObj.DepartDate=departDate,temObj.ReturnDate=enterDate,ulrRoomId||delete temObj.SelectedRoomID;var data={Code:"50100009",ForeEndType:2,Parameters:temObj},departDateHtml=temObj.DepartDate.substring(5),enterDateHtml=temObj.ReturnDate.substring(5);$(".jhf-mes span.departDate").html(departDateHtml),$(".jhf-mes span.returnDate").html(enterDateHtml),$("#nightNum").html(getDayNum(departDate,enterDate)),vlm.loadJson("",JSON.stringify(data),dataCallBack)}();