
/*国籍选择*/
var arrCountry= [{"CountryName":"中国","CountryEN":"China","CountryCode":"CN"},{"CountryName":"阿联酋","CountryEN":"United Arab Emirates","CountryCode":"AE"},{"CountryName":"阿富汗","CountryEN":"Afghanistan ","CountryCode":"AF"},{"CountryName":"安提瓜","CountryEN":"Antigua","CountryCode":"AG"},{"CountryName":"阿尔巴尼亚","CountryEN":"ALBANIA ","CountryCode":"AL"},{"CountryName":"亚美尼亚共和国","CountryEN":"The Republic of Armenia","CountryCode":"AM"},{"CountryName":"安的列斯（荷属）","CountryEN":"Nederlandse Antillen","CountryCode":"AN"},{"CountryName":"安哥拉","CountryEN":"Angola ","CountryCode":"AO"},{"CountryName":"阿根廷","CountryEN":"Argentina","CountryCode":"AR"},{"CountryName":"奥地利","CountryEN":"Austria ","CountryCode":"AT"},{"CountryName":"澳大利亚","CountryEN":"Australia","CountryCode":"AU"},{"CountryName":"波黑","CountryEN":" Bosnia and Herzegovina ","CountryCode":"BA"},{"CountryName":"巴巴多斯","CountryEN":"Barbados","CountryCode":"BB"},{"CountryName":"孟加拉","CountryEN":"Bengladesh","CountryCode":"BD"},{"CountryName":"比利时","CountryEN":"Belgium","CountryCode":"BE"},{"CountryName":"保加利亚","CountryEN":"Bulgaria ","CountryCode":"BG"},{"CountryName":"巴林","CountryEN":"Bahrain","CountryCode":"BH"},{"CountryName":"布隆迪","CountryEN":"BURUNDI","CountryCode":"BI"},{"CountryName":"贝宁","CountryEN":"BENIN","CountryCode":"BJ"},{"CountryName":"文莱","CountryEN":"Brunei","CountryCode":"BN"},{"CountryName":"巴西","CountryEN":"Brazil","CountryCode":"BR"},{"CountryName":"巴哈马","CountryEN":"Bahamas","CountryCode":"BS"},{"CountryName":"白俄罗斯","CountryEN":"BELARUS","CountryCode":"BY"},{"CountryName":"加拿大","CountryEN":"Canada","CountryCode":"CA"},{"CountryName":"刚果","CountryEN":"Congo ","CountryCode":"CG"},{"CountryName":"瑞士","CountryEN":"Switzerland ","CountryCode":"CH"},{"CountryName":"科特迪瓦","CountryEN":"Cote Divoire","CountryCode":"CI"},{"CountryName":"智利","CountryEN":"Chile","CountryCode":"CL"},{"CountryName":"喀麦隆","CountryEN":"CAMEROON","CountryCode":"CM"},{"CountryName":"哥伦比亚","CountryEN":"Colombia ","CountryCode":"CO"},{"CountryName":"古巴","CountryEN":"Cuba","CountryCode":"CU"},{"CountryName":"塞浦路斯","CountryEN":"Cyprus","CountryCode":"CY"},{"CountryName":"捷克","CountryEN":"Czech Republic","CountryCode":"CZ"},{"CountryName":"德国","CountryEN":"Germany","CountryCode":"DE"},{"CountryName":"吉布提","CountryEN":"DJIBOUTI","CountryCode":"DJ"},{"CountryName":"丹麦","CountryEN":"Denmark","CountryCode":"DK"},{"CountryName":"多米尼加共和国","CountryEN":"Dominican Republic ","CountryCode":"DO"},{"CountryName":"阿尔及利亚","CountryEN":"Algeria","CountryCode":"DZ"},{"CountryName":"厄瓜多尔","CountryEN":"ECUADOR","CountryCode":"EC"},{"CountryName":"爱沙尼亚","CountryEN":"Estonia","CountryCode":"EE"},{"CountryName":"埃及","CountryEN":"Egypt","CountryCode":"EG"},{"CountryName":"西班牙","CountryEN":"Spain ","CountryCode":"ES"},{"CountryName":"埃塞俄比亚","CountryEN":"Ethiopia","CountryCode":"ET"},{"CountryName":"芬兰","CountryEN":"Finland","CountryCode":"FI"},{"CountryName":"斐济","CountryEN":"Fiji","CountryCode":"FJ"},{"CountryName":"法国","CountryEN":"France","CountryCode":"FR"},{"CountryName":"加蓬","CountryEN":"Gabon ","CountryCode":"GA"},{"CountryName":"英国","CountryEN":"United Kingdom","CountryCode":"GB"},{"CountryName":"格林纳达","CountryEN":"Grenada","CountryCode":"GD"},{"CountryName":"格鲁吉亚","CountryEN":"GEORIA","CountryCode":"GE"},{"CountryName":"加纳","CountryEN":"Ghana","CountryCode":"GH"},{"CountryName":"几内亚","CountryEN":"Guinea ","CountryCode":"GN"},{"CountryName":"赤道几内亚","CountryEN":"EQUATORIAL GUINEA","CountryCode":"GQ"},{"CountryName":"希腊","CountryEN":"Greece ","CountryCode":"GR"},{"CountryName":"危地马拉","CountryEN":"GUATEMALA","CountryCode":"GT"},{"CountryName":"几内亚","CountryEN":"GUINEA-BISSAU","CountryCode":"GW"},{"CountryName":"洪都拉斯","CountryEN":"HONDURAS","CountryCode":"HN"},{"CountryName":"克罗地亚","CountryEN":"Croatia","CountryCode":"HR"},{"CountryName":"海地共和国","CountryEN":"The Republic of Haiti","CountryCode":"HT"},{"CountryName":"匈牙利","CountryEN":"Hungary","CountryCode":"HU"},{"CountryName":"印度尼西亚","CountryEN":"Indonesia ","CountryCode":"ID"},{"CountryName":"爱尔兰","CountryEN":"Ireland ","CountryCode":"IE"},{"CountryName":"以色列","CountryEN":"Israel ","CountryCode":"IL"},{"CountryName":"印度","CountryEN":"India","CountryCode":"IN"},{"CountryName":"伊拉克","CountryEN":"Iraq","CountryCode":"IQ"},{"CountryName":"伊朗","CountryEN":"Iran","CountryCode":"IR"},{"CountryName":"冰岛","CountryEN":"Iceland ","CountryCode":"IS"},{"CountryName":"意大利","CountryEN":"Italy","CountryCode":"IT"},{"CountryName":"牙买加","CountryEN":"Jamaica ","CountryCode":"JM"},{"CountryName":"约旦","CountryEN":"Jordan ","CountryCode":"JO"},{"CountryName":"日本","CountryEN":"Japan","CountryCode":"JP"},{"CountryName":"肯尼亚","CountryEN":"Kenya ","CountryCode":"KE"},{"CountryName":"吉尔吉斯斯坦","CountryEN":"Kyrgyzstan","CountryCode":"KG"},{"CountryName":"柬埔寨","CountryEN":"Cambodia ","CountryCode":"KH"},{"CountryName":"朝鲜","CountryEN":"Democratic People’s Republic of Korea","CountryCode":"KP"},{"CountryName":"韩国","CountryEN":"Korea","CountryCode":"KR"},{"CountryName":"科威特","CountryEN":"Kuwait ","CountryCode":"KW"},{"CountryName":"开曼群岛","CountryEN":"Cayman Islands","CountryCode":"KY"},{"CountryName":"哈萨克斯坦共和国","CountryEN":"Kazakhstan","CountryCode":"KZ"},{"CountryName":"老挝","CountryEN":"Laos ","CountryCode":"LA"},{"CountryName":"黎巴嫩","CountryEN":"Lebanon ","CountryCode":"LB"},{"CountryName":"圣卢西亚","CountryEN":"Saint Lucia","CountryCode":"LC"},{"CountryName":"斯里兰卡","CountryEN":"Sri Lanka ","CountryCode":"LK"},{"CountryName":"利比里亚","CountryEN":"Liberia ","CountryCode":"LR"},{"CountryName":"莱索托","CountryEN":"Lesotho","CountryCode":"LS"},{"CountryName":"立陶宛","CountryEN":"Lithuania","CountryCode":"LT"},{"CountryName":"卢森堡","CountryEN":"Luxemburg ","CountryCode":"LU"},{"CountryName":"拉脱维亚","CountryEN":"The Republic of Latvia ","CountryCode":"LV"},{"CountryName":"利比亚","CountryEN":"Libya ","CountryCode":"LY"},{"CountryName":"摩洛哥","CountryEN":"Morocco","CountryCode":"MA"},{"CountryName":"摩尔多瓦共和国","CountryEN":"The Republoc of Moldova ","CountryCode":"MD"},{"CountryName":"马达加斯加","CountryEN":"Madagascar","CountryCode":"MG"},{"CountryName":"马其顿","CountryEN":"The Republic of Macedonia","CountryCode":"MK"},{"CountryName":"马里","CountryEN":"MALI","CountryCode":"ML"},{"CountryName":"缅甸","CountryEN":"Myanmar ","CountryCode":"MM"},{"CountryName":"蒙古","CountryEN":"Mongolia","CountryCode":"MN"},{"CountryName":"澳门","CountryEN":"Macau","CountryCode":"MO"},{"CountryName":"北玛里亚纳群岛","CountryEN":"Northern Mariana Island","CountryCode":"MP"},{"CountryName":"毛里塔尼亚","CountryEN":"MAURITANIA ","CountryCode":"MR"},{"CountryName":"马耳他","CountryEN":"Malta","CountryCode":"MT"},{"CountryName":"毛里求斯","CountryEN":"Mauritius","CountryCode":"MU"},{"CountryName":"马尔代夫","CountryEN":"Maldives","CountryCode":"MV"},{"CountryName":"马拉维","CountryEN":"Malawi","CountryCode":"MW"},{"CountryName":"墨西哥","CountryEN":"The United Mexican States","CountryCode":"MX"},{"CountryName":"马来西亚","CountryEN":"Malaysia ","CountryCode":"MY"},{"CountryName":"莫桑比克","CountryEN":"MOZAMBIQUE","CountryCode":"MZ"},{"CountryName":"纳米比亚","CountryEN":"Namibia","CountryCode":"NA"},{"CountryName":"新喀里多尼亚 ","CountryEN":"New Caledonia Nouvelle Caledonie","CountryCode":"NC"},{"CountryName":"尼日尔","CountryEN":"Niger","CountryCode":"NE"},{"CountryName":"尼日利亚","CountryEN":"Nigeria ","CountryCode":"NG"},{"CountryName":"尼加拉瓜","CountryEN":"Nicaragua","CountryCode":"NI"},{"CountryName":"荷兰","CountryEN":"Netherland","CountryCode":"NL"},{"CountryName":"挪威","CountryEN":"Norway ","CountryCode":"NO"},{"CountryName":"尼泊尔","CountryEN":"Nepal ","CountryCode":"NP"},{"CountryName":"新西兰","CountryEN":"New Zealand","CountryCode":"NZ"},{"CountryName":"阿曼","CountryEN":"Oman","CountryCode":"OM"},{"CountryName":"巴拿马","CountryEN":"Panama ","CountryCode":"PA"},{"CountryName":"秘鲁","CountryEN":"Peru ","CountryCode":"PE"},{"CountryName":"法属玻利尼","CountryEN":"French Polynesia","CountryCode":"PF"},{"CountryName":"菲律宾","CountryEN":"Philippines ","CountryCode":"PH"},{"CountryName":"巴基斯坦","CountryEN":"Pakistan ","CountryCode":"PK"},{"CountryName":"波兰","CountryEN":"Poland","CountryCode":"PL"},{"CountryName":"波多黎各","CountryEN":"Puerto Rico","CountryCode":"PR"},{"CountryName":"葡萄牙","CountryEN":"Portugal ","CountryCode":"PT"},{"CountryName":"帕劳","CountryEN":"The Republic Palau","CountryCode":"PW"},{"CountryName":"巴拉圭","CountryEN":"Paraguay","CountryCode":"PY"},{"CountryName":"卡塔尔","CountryEN":"Qatar","CountryCode":"QA"},{"CountryName":"罗马尼亚","CountryEN":"Romania","CountryCode":"RO"},{"CountryName":"塞尔维亚","CountryEN":"SERBIA AND MONTENEGRO","CountryCode":"RS"},{"CountryName":"俄罗斯","CountryEN":"Russia","CountryCode":"RU"},{"CountryName":"卢旺达","CountryEN":"RWANDA","CountryCode":"RW"},{"CountryName":"沙特阿拉伯","CountryEN":"Saudi Arabia ","CountryCode":"SA"},{"CountryName":"塞舌尔共和国","CountryEN":"The Republic of Seychelles","CountryCode":"SC"},{"CountryName":"苏丹","CountryEN":"Sudan ","CountryCode":"SD"},{"CountryName":"瑞典","CountryEN":"Sweden","CountryCode":"SE"},{"CountryName":"新加坡 ","CountryEN":"Singapore","CountryCode":"SG"},{"CountryName":"斯洛文尼亚","CountryEN":"Slovenia","CountryCode":"SI"},{"CountryName":"斯洛伐克","CountryEN":"Slovakia","CountryCode":"SK"},{"CountryName":"塞内加尔共和国","CountryEN":"The Republic of Senegal","CountryCode":"SN"},{"CountryName":"索马里","CountryEN":"Somalia ","CountryCode":"SO"},{"CountryName":"苏里南","CountryEN":"Surinam","CountryCode":"SR"},{"CountryName":"叙利亚","CountryEN":"Syria ","CountryCode":"SY"},{"CountryName":"斯威士兰王国","CountryEN":"The Kingdom of Swaziland","CountryCode":"SZ"},{"CountryName":"特克斯和凯科斯群岛","CountryEN":"Turks Caicos Islands","CountryCode":"TC"},{"CountryName":"乍得","CountryEN":"CHAD","CountryCode":"TD"},{"CountryName":"多哥","CountryEN":"TOGO","CountryCode":"TG"},{"CountryName":"泰国","CountryEN":"Thailand","CountryCode":"TH"},{"CountryName":"塔吉克斯坦","CountryEN":"TAJIKISTAN ","CountryCode":"TJ"},{"CountryName":"土库曼斯坦","CountryEN":"Turkmenistan","CountryCode":"TM"},{"CountryName":"突尼斯","CountryEN":"Tunis ","CountryCode":"TN"},{"CountryName":"土耳其","CountryEN":"Turkey","CountryCode":"TR"},{"CountryName":"特立尼达和多巴哥","CountryEN":"Trinidad and Tobago","CountryCode":"TT"},{"CountryName":"坦桑尼亚","CountryEN":"Tanzania ","CountryCode":"TZ"},{"CountryName":"乌克兰","CountryEN":"Ukraine ","CountryCode":"UA"},{"CountryName":"乌干达","CountryEN":"Uganda ","CountryCode":"UG"},{"CountryName":"美国","CountryEN":"United States of America","CountryCode":"US"},{"CountryName":"乌拉圭","CountryEN":"URUGUAY","CountryCode":"UY"},{"CountryName":"乌兹别克斯坦","CountryEN":"Uzbekistan","CountryCode":"UZ"},{"CountryName":"委内瑞拉","CountryEN":"Venezuela","CountryCode":"VE"},{"CountryName":"越南","CountryEN":"Vietnam ","CountryCode":"VN"},{"CountryName":"瓦努阿图共和国","CountryEN":"The Republic of Vanuatu","CountryCode":"VU"},{"CountryName":"萨摩亚独立国","CountryEN":"The Independent State of Samoa","CountryCode":"WS"},{"CountryName":"也门","CountryEN":"Yemen","CountryCode":"YE"},{"CountryName":"南非","CountryEN":"South Africa ","CountryCode":"ZA"},{"CountryName":"赞比亚","CountryEN":"Zambia ","CountryCode":"ZM"},{"CountryName":"扎伊尔","CountryEN":"Zaire","CountryCode":"ZR"},{"CountryName":"津巴布韦","CountryEN":"Zimbabwe ","CountryCode":"ZW"}];


(function () {
    var str1 = '';
    var oUl=document.createElement('ul');

    for (var i=0; i<arrCountry.length; i++) {
        str1+='<li>'+arrCountry[i].CountryName+'</li>';
    }
    oUl.innerHTML=str1;
    oUl.className='country-list';

    document.querySelector('#country-wrap').appendChild(oUl);

    var aBtn=document.querySelectorAll('.country-btn');
    var oDiv=document.querySelector('.country-cho-wrap');
    var oInput=document.querySelector('#country-input-zone');
    var oTc=document.querySelector('.country-list-searched');
    var countryListSearched = document.querySelector('.country-list-searched');
    var countryInputZone = document.querySelector('#country-input-zone');
    var oWid=document.documentElement.clientWidth;
    oDiv.style.right='-'+oWid+'px';
    for(var i=0;i<aBtn.length; i++)
    {
        (function(index){
            aBtn[i].onclick=function(){
                var _this=this;
                countryListSearched.onclick=function(e){
                    _this.innerHTML=countryInputZone.value=e.target.innerHTML;
                    this.style.display='none';
                };

                oDiv.style.right='0';

                var oShut=document.querySelector('.country-hidden');
                oShut.onclick=function(){
                    oDiv.style.right='-'+oWid+'px';
                    oTc.style.display='none';
                    oInput.value='';
                };

                var oCont=document.querySelectorAll('.country-btn')[index];
                var oTab=document.querySelector('.country-list');
                var oInp=document.querySelector('.cl_search input');
                oTab.onclick=function(e){
                    oCont.innerHTML=oInp.value=e.target.innerHTML;
                };


            };

            /*国籍模糊搜索*/
            var countryShow = {
                countrySearch: function () {
                    var countryInputZone = document.querySelector('#country-input-zone');
                    var valueStr = countryInputZone.value;
                    var resultStr = '';
                    var searchResult = [];

                    if (valueStr) {
                        for (var i = 0; i < arrCountry.length; i++) {
                            for (var t in arrCountry[i]) {
                                if (arrCountry[i][t].indexOf(valueStr) != -1) {
                                    searchResult.push(arrCountry[i])
                                }
                            }
                        }

                        if (!searchResult.length) {
                            resultStr += '<li class="country-list-searched-item">无搜索结果</li>';
                        } else {
                            for (var j = 0; j < searchResult.length; j++) {
                                resultStr += '<li class="country-list-searched-item">' + searchResult[j].CountryName + '</li>';
                            }
                        }
                        countryListSearched.innerHTML = resultStr;
                        //console.log(resultStr);
                        countryListSearched.style.display = 'block';

                    }
                    else {
                        countryListSearched.style.display = 'none';
                    }
                },

                addHander: function(){
                    var that=countryShow;
                    var countryInputZone = document.querySelector('#country-input-zone');
                    if (countryInputZone.addEventListener) {
                        countryInputZone.addEventListener('input', function(){
                            that.countrySearch();
                        }, false)
                    } else {
                        countryInputZone.attachEvent('onpropertychange', that.countrySearch)
                    }
                },

                init: function(){
                    this.addHander();
                    this.countrySearch();

                }

            };
            countryShow.init();
        })(i);
    }

})();



