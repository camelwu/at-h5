/*! asiatravel FE team at-h5-nodejs-----2016-05-19T16:09:38 */
window.onload=function(){function a(a){var b=document.querySelector(".s-content1");b.innerText=JSON.parse(a)[0].HotelGenInfo.HotelDesc}if(window.localStorage)var b=window.localStorage.getItem("hotelMessage");a(b)};