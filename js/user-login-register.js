/**
 * Created by changlv on 2016/1/7.
 */
window.onload = function(){
    function _(s){
        return document.getElementById(s);
    }
    var phone_login = _("phone_login");
    var email_login = _("email_login");
    var phone = _("phone");
    var email = _("email");
    var p_clear = _("p_clear");
    var e_clear = _("e_clear");
    var change_phone = _("change_phone");
    var change_email = _("change_email");
    var header_email = _("header_email");
    var header_phone = _("header_phone");
    var phone_register = _("phone_register");
    var email_register = _("email_register");
    var register = _("register");
    var register_page = _("register_page");
    var close_register = _("close_register");
    email_login.style.display = "none";
    function showPage(obj1,obj2){
        obj1.onclick = function(){
            obj2.style.display = "block";
        }
    }
    function closePage(obj1,obj2){
        obj1.onclick = function(){
            obj2.style.display = "none";
        }
    }
    showPage(register,register_page);
    closePage(close_register,register_page);
    function inputting(obj1,obj2){
        obj1.onkeydown = function(){
            obj2.style.display = "block";
        }
    }
    inputting(phone,p_clear);
    inputting(email,e_clear);
    function clear(obj1,obj2){
        obj1.onclick = function(){
            obj2.value = "";
        }
    }
    clear(p_clear,phone);
    clear(e_clear,email);
    function changeLogin(obj1,obj2,obj3){
        obj1.onclick = function(){
            obj2.style.display = "none";
            obj3.style.display = "block";
        }
    }
    changeLogin(change_email,phone_login,email_login);
    changeLogin(change_phone,email_login,phone_login);
    function changeRegister(obj1,obj2,obj3,obj4){
        obj1.onclick = function(){
            obj1.style.display = "none";
            obj2.style.display = "block";
            obj3.style.display = "none";
            obj4.style.display = "block";
        }
    }
    changeRegister(header_email,header_phone,phone_register,email_register);
    changeRegister(header_phone,header_email,email_register,phone_register);
};