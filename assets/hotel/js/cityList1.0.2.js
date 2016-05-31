/**
 * Created by Asiatravel on 2015/12/29.
 */
/*调用方法：
 * var test=new myCityList();
 * 数据存入localstorage，name是this.city，value值是用户所选城市名字
 * 样式需要引入styles中的cityList.css文件
 * 传入的参数，第一个id为城市输入框的id，第二个url为返回按钮返回到的页面
 * */
var json_citys= {"en":{"A":[{"city":"阿坝","cityUrl":""},{"city":"阿尔山","cityUrl":""},{"city":"阿勒泰","cityUrl":""},{"city":"安吉","cityUrl":""},{"city":"安康","cityUrl":""},{"city":"安庆","cityUrl":""},{"city":"安顺","cityUrl":""},{"city":"安阳","cityUrl":""},{"city":"鞍山","cityUrl":""},{"city":"阿克苏","cityUrl":""}],"B":[{"city":"北京","cityUrl":""},{"city":"北戴河","cityUrl":""},{"city":"北海","cityUrl":""},{"city":"保定","cityUrl":""},{"city":"保山","cityUrl":""},{"city":"宝鸡","cityUrl":""},{"city":"包头","cityUrl":""},{"city":"蚌埠","cityUrl":""},{"city":"百色","cityUrl":""},{"city":"本溪","cityUrl":""},{"city":"白山","cityUrl":""},{"city":"滨州","cityUrl":""}],"C":[{"city":"成都","cityUrl":""},{"city":"重庆","cityUrl":""},{"city":"长沙","cityUrl":""},{"city":"常州","cityUrl":""},{"city":"长春","cityUrl":""},{"city":"承德","cityUrl":""},{"city":"常德","cityUrl":""},{"city":"昌黎","cityUrl":""},{"city":"郴州","cityUrl":""},{"city":"沧州","cityUrl":""},{"city":"赤水","cityUrl":""},{"city":"池州","cityUrl":""}],"D":[{"city":"大连","cityUrl":""},{"city":"大理","cityUrl":""},{"city":"东莞","cityUrl":""},{"city":"丹东","cityUrl":""},{"city":"敦煌","cityUrl":""},{"city":"大同","cityUrl":""},{"city":"都江堰","cityUrl":""},{"city":"迪庆","cityUrl":""},{"city":"德州","cityUrl":""},{"city":"东营","cityUrl":""},{"city":"德阳","cityUrl":""},{"city":"大庆","cityUrl":""}],"E":[{"city":"鄂尔多斯","cityUrl":""},{"city":"鄂州","cityUrl":""},{"city":"恩施自治州","cityUrl":""}],"F":[{"city":"福州","cityUrl":""},{"city":"佛山","cityUrl":""},{"city":"防城港","cityUrl":""},{"city":"抚顺","cityUrl":""},{"city":"凤凰","cityUrl":""},{"city":"阜阳","cityUrl":""},{"city":"阜新","cityUrl":""},{"city":"抚州","cityUrl":""}],"G":[{"city":"广州","cityUrl":""},{"city":"桂林","cityUrl":""},{"city":"贵阳","cityUrl":""},{"city":"赣州","cityUrl":""},{"city":"鼓浪屿","cityUrl":""},{"city":"甘孜","cityUrl":""},{"city":"广元","cityUrl":""},{"city":"甘南","cityUrl":""},{"city":"固原","cityUrl":""},{"city":"贵港","cityUrl":""}],"H":[{"city":"杭州","cityUrl":""},{"city":"哈尔滨","cityUrl":""},{"city":"黄山","cityUrl":""},{"city":"惠州","cityUrl":""},{"city":"合肥","cityUrl":""},{"city":"海口","cityUrl":""},{"city":"湖州","cityUrl":""},{"city":"呼和浩特","cityUrl":""},{"city":"衡阳","cityUrl":""},{"city":"葫芦岛","cityUrl":""},{"city":"呼伦贝尔","cityUrl":""},{"city":"邯郸","cityUrl":""},{"city":"汉中","cityUrl":""},{"city":"衡水","cityUrl":""},{"city":"怀化","cityUrl":""}],"J":[{"city":"吉林","cityUrl":""},{"city":"嘉兴","cityUrl":""},{"city":"济南","cityUrl":""},{"city":"晋中","cityUrl":""},{"city":"金华","cityUrl":""},{"city":"九江","cityUrl":""},{"city":"江门","cityUrl":""},{"city":"焦作","cityUrl":""},{"city":"济宁","cityUrl":""},{"city":"酒泉","cityUrl":""},{"city":"锦州","cityUrl":""},{"city":"景德镇","cityUrl":""},{"city":"吉安","cityUrl":""},{"city":"九寨沟","cityUrl":""}],"K":[{"city":"昆明","cityUrl":""},{"city":"开封","cityUrl":""},{"city":"喀什","cityUrl":""},{"city":"克拉玛依","cityUrl":""}],"L":[{"city":"丽江","cityUrl":""},{"city":"洛阳","cityUrl":""},{"city":"乐山","cityUrl":""},{"city":"拉萨","cityUrl":""},{"city":"兰州","cityUrl":""},{"city":"凉山","cityUrl":""},{"city":"廊坊","cityUrl":""},{"city":"连云港","cityUrl":""},{"city":"柳州","cityUrl":""},{"city":"临沂","cityUrl":""}],"M":[{"city":"绵阳","cityUrl":""},{"city":"茂名","cityUrl":""},{"city":"梅州","cityUrl":""},{"city":"眉山","cityUrl":""},{"city":"牡丹江","cityUrl":""},{"city":"马鞍山","cityUrl":""}],"N":[{"city":"南京","cityUrl":""},{"city":"宁波","cityUrl":""},{"city":"南宁","cityUrl":""},{"city":"南昌","cityUrl":""},{"city":"南平","cityUrl":""},{"city":"内江","cityUrl":""},{"city":"南通","cityUrl":""},{"city":"南充","cityUrl":""},{"city":"宁德","cityUrl":""},{"city":"南阳","cityUrl":""}],"P":[{"city":"攀枝花","cityUrl":""},{"city":"莆田","cityUrl":""},{"city":"平顶山","cityUrl":""},{"city":"濮阳","cityUrl":""},{"city":"萍乡","cityUrl":""},{"city":"盘锦","cityUrl":""},{"city":"平凉","cityUrl":""},{"city":"普洱","cityUrl":""}],"Q":[{"city":"青岛","cityUrl":""},{"city":"秦皇岛","cityUrl":""},{"city":"泉州","cityUrl":""},{"city":"齐齐哈尔","cityUrl":""},{"city":"黔东南","cityUrl":""},{"city":"清远","cityUrl":""},{"city":"琼海","cityUrl":""},{"city":"黔南","cityUrl":""},{"city":"钦州","cityUrl":""},{"city":"衢州","cityUrl":""}],"R":[{"city":"日照","cityUrl":""},{"city":"日喀则","cityUrl":""}],"S":[{"city":"上海","cityUrl":""},{"city":"三亚","cityUrl":""},{"city":"深圳","cityUrl":""},{"city":"苏州","cityUrl":""},{"city":"沈阳","cityUrl":""},{"city":"石家庄","cityUrl":""},{"city":"绍兴","cityUrl":""},{"city":"韶关","cityUrl":""},{"city":"上饶","cityUrl":""},{"city":"汕头","cityUrl":""},{"city":"十堰","cityUrl":""}],"T":[{"city":"天津","cityUrl":""},{"city":"太原","cityUrl":""},{"city":"唐山","cityUrl":""},{"city":"泰安","cityUrl":""},{"city":"台州","cityUrl":""},{"city":"泰州","cityUrl":""},{"city":"天水","cityUrl":""},{"city":"铜仁","cityUrl":""}],"W":[{"city":"武汉","cityUrl":""},{"city":"无锡","cityUrl":""},{"city":"乌鲁木齐","cityUrl":""},{"city":"温州","cityUrl":""},{"city":"威海","cityUrl":""},{"city":"潍坊","cityUrl":""},{"city":"芜湖","cityUrl":""},{"city":"渭南","cityUrl":""},{"city":"万宁","cityUrl":""},{"city":"文昌","cityUrl":""},{"city":"梧州","cityUrl":""}],"X":[{"city":"厦门","cityUrl":""},{"city":"西安","cityUrl":""},{"city":"西双版纳","cityUrl":""},{"city":"许昌","cityUrl":""},{"city":"襄樊","cityUrl":""},{"city":"咸阳","cityUrl":""},{"city":"湘西","cityUrl":""},{"city":"徐州","cityUrl":""},{"city":"西宁","cityUrl":""},{"city":"忻州","cityUrl":""},{"city":"新乡","cityUrl":""},{"city":"宣城","cityUrl":""},{"city":"咸宁","cityUrl":""}],"Y":[{"city":"银川","cityUrl":""},{"city":"扬州","cityUrl":""},{"city":"烟台","cityUrl":""},{"city":"宜昌","cityUrl":""},{"city":"阳江","cityUrl":""},{"city":"雅安","cityUrl":""},{"city":"宜宾","cityUrl":""},{"city":"延边","cityUrl":""},{"city":"营口","cityUrl":""},{"city":"岳阳","cityUrl":""},{"city":"玉溪","cityUrl":""},{"city":"盐城","cityUrl":""},{"city":"延安","cityUrl":""},{"city":"宜春","cityUrl":""},{"city":"运城","cityUrl":""}],"Z":[{"city":"郑州","cityUrl":""},{"city":"珠海","cityUrl":""},{"city":"张家界","cityUrl":""},{"city":"张家口","cityUrl":""},{"city":"中山","cityUrl":""},{"city":"舟山","cityUrl":""},{"city":"肇庆","cityUrl":""},{"city":"镇江","cityUrl":""},{"city":"漳州","cityUrl":""},{"city":"湛江","cityUrl":""},{"city":"枣庄","cityUrl":""},{"city":"株洲","cityUrl":""},{"city":"淄博","cityUrl":""},{"city":"遵义","cityUrl":""},{"city":"自贡","cityUrl":""},{"city":"中卫","cityUrl":""}]},"gj":{"东南亚":[{"city":"新加坡","cityUrl":"singapore_city"},{"city":"苏梅岛","cityUrl":"ko_samui_district"},{"city":"兰卡威","cityUrl":"langkawi"},{"city":"河内","cityUrl":"hanoi_vn"},{"city":"热浪岛","cityUrl":"redang_island_ter"},{"city":"美奈","cityUrl":"mui_ne_pha"},{"city":"曼谷","cityUrl":"bangkok"},{"city":"吉隆坡","cityUrl":"kuala_lumpur"},{"city":"马尼拉","cityUrl":"manila"},{"city":"民丹岛","cityUrl":"bintan_ria"},{"city":"琅勃拉邦","cityUrl":"louangphabang"},{"city":"下龙湾","cityUrl":"ha_long"},{"city":"普吉","cityUrl":"koh_phuket_tha"},{"city":"长滩岛","cityUrl":"boracay_philippines"},{"city":"暹粒市","cityUrl":"siem_reap_cambodia"},{"city":"宿务","cityUrl":"cebu_city"},{"city":"西哈努克市","cityUrl":"krong_preah_sihanouk"},{"city":"茅庄","cityUrl":"nha_trang_kha"},{"city":"巴厘岛","cityUrl":"bali"},{"city":"岘港","cityUrl":"da_nang_vn"},{"city":"金边","cityUrl":"phnom_penh_new"},{"city":"仰光","cityUrl":"yangon_yan"},{"city":"顺化","cityUrl":"hue_vn_vie"},{"city":"清迈","cityUrl":"chiang_mai"},{"city":"胡志明市","cityUrl":"ho_chi_minh_city"},{"city":"雅加达","cityUrl":"jakarta"},{"city":"万象市","cityUrl":"vientiane_capital"},{"city":"会安","cityUrl":"tp_hoi_an"}],"亚程":[{"city":"曼谷","cityUrl":"bangkok"},{"city":"胡志明市","cityUrl":"ho_chi_minh_city"},{"city":"釜山","cityUrl":"busan_kr"},{"city":"科伦坡","cityUrl":"colombo_wp"},{"city":"马六甲","cityUrl":"malacca_mel"},{"city":"耶路撒冷","cityUrl":"jerusalem_il"},{"city":"清迈","cityUrl":"chiang_mai"},{"city":"兰卡威","cityUrl":"langkawi"},{"city":"雅加达","cityUrl":"jakarta"},{"city":"箱根町","cityUrl":"hakone_ash"},{"city":"万象市","cityUrl":"vientiane_capital"},{"city":"海防市","cityUrl":"hai_phong_vn"},{"city":"济州岛","cityUrl":"jeju"},{"city":"暹粒市","cityUrl":"siem_reap_cambodia"},{"city":"河内","cityUrl":"hanoi_vn"},{"city":"仰光","cityUrl":"yangon_yan"},{"city":"奈良","cityUrl":"nara_nar"},{"city":"大阪","cityUrl":"osaka"},{"city":"京都","cityUrl":"kyoto_kyo"},{"city":"孟买","cityUrl":"mumbai_suburban"},{"city":"名古屋","cityUrl":"nagoya_aic"},{"city":"平壤","cityUrl":"pyongyang_pyongyang"},{"city":"岘港","cityUrl":"da_nang_vn"},{"city":"金边","cityUrl":"phnom_penh_new"},{"city":"伊斯坦布尔","cityUrl":"istanbul_ist"},{"city":"仁川","cityUrl":"incheon_kr"},{"city":"小樽市","cityUrl":"otaru_hok"}],"大洋洲":[{"city":"斐济","cityUrl":"fiji_fij"},{"city":"基督城","cityUrl":"christchurch_chr"},{"city":"坎佩莱","cityUrl":"quimperle_fin"},{"city":"黄金海岸","cityUrl":"gold_coast_qld"},{"city":"阿德莱德","cityUrl":"adelaide_sa"},{"city":"科罗曼德","cityUrl":"coromandel"},{"city":"关岛","cityUrl":"guam"},{"city":"博拉博拉岛","cityUrl":"pora_pora"},{"city":"布鲁姆","cityUrl":"broome_wa"},{"city":"凯恩斯","cityUrl":"cairns_qld"},{"city":"惠灵顿","cityUrl":"wellington_wel"},{"city":"马尔堡","cityUrl":"malbork_gmi"},{"city":"珀斯","cityUrl":"perth_wa"},{"city":"罗托鲁瓦","cityUrl":"rotorua_rot"}],"欧洲":[{"city":"巴黎","cityUrl":"paris_city"},{"city":"马德里自治区","cityUrl":"madrid_com"},{"city":"苏黎世","cityUrl":"zurich_zur"},{"city":"马赛","cityUrl":"marseille_bou"},{"city":"纽伦堡","cityUrl":"nuremberg_mid"},{"city":"柏林","cityUrl":"berlin_ber"},{"city":"维也纳","cityUrl":"vienna_vie"},{"city":"佛罗伦萨","cityUrl":"florence"},{"city":"哥本哈根","cityUrl":"kobenhavn"},{"city":"鹿特丹","cityUrl":"government_of_rotterdam"},{"city":"莫斯科","cityUrl":"moscow_g"},{"city":"日内瓦","cityUrl":"geneva_gen"},{"city":"布鲁萨尔","cityUrl":"brussels"},{"city":"斯图加特","cityUrl":"stuttgart_s"},{"city":"剑桥","cityUrl":"cambridge_cam"},{"city":"法兰克福","cityUrl":"frankfurt_da"},{"city":"布拉格","cityUrl":"prague_hla"},{"city":"圣彼得堡","cityUrl":"st_petersburg_g"},{"city":"赫尔辛基","cityUrl":"helsinki_hel"},{"city":"利物浦","cityUrl":"liverpool_mer"},{"city":"慕尼黑","cityUrl":"munich_m"},{"city":"里斯本","cityUrl":"lisbon_pt"},{"city":"戛纳","cityUrl":"cannes_alp"},{"city":"布达佩斯","cityUrl":"budapest"},{"city":"雅典","cityUrl":"athens_ath"}],"海岛":[{"city":"普吉","cityUrl":"koh_phuket_tha"},{"city":"长滩岛","cityUrl":"boracay_philippines"},{"city":"冲绳","cityUrl":"okinawa_oki"},{"city":"宿务","cityUrl":"cebu_city"},{"city":"巴厘岛","cityUrl":"bali"},{"city":"沙巴","cityUrl":"sabah"},{"city":"塞舌尔","cityUrl":"seychelles_sey"},{"city":"关岛","cityUrl":"guam"},{"city":"马尔代夫","cityUrl":"maldives"},{"city":"塞班岛","cityUrl":"saipan_mnp"},{"city":"斐济","cityUrl":"fiji_fij"},{"city":"凯恩斯","cityUrl":"cairns_qld"},{"city":"济州岛","cityUrl":"jeju"},{"city":"兰卡威","cityUrl":"langkawi"},{"city":"黄金海岸","cityUrl":"gold_coast_qld"},{"city":"热浪岛","cityUrl":"redang_island_ter"},{"city":"苏梅岛","cityUrl":"ko_samui_district"},{"city":"夏威夷","cityUrl":"hawaii_county"},{"city":"民丹岛","cityUrl":"bintan_ria"},{"city":"邦咯岛","cityUrl":"pangkor_island_per"}],"热门城市":[{"city":"新加坡","cityUrl":"singapore_city"},{"city":"马尔代夫","cityUrl":"maldives"},{"city":"济州岛","cityUrl":"jeju"},{"city":"芭提雅","cityUrl":"pattaya"},{"city":"曼谷","cityUrl":"bangkok"},{"city":"吉隆坡","cityUrl":"kuala_lumpur"},{"city":"沙巴","cityUrl":"sabah"},{"city":"伦敦","cityUrl":"london_england"},{"city":"首尔","cityUrl":"seoul"},{"city":"东京","cityUrl":"tokyo"},{"city":"苏梅岛","cityUrl":"ko_samui_district"},{"city":"巴黎","cityUrl":"paris_city"},{"city":"台北市","cityUrl":"taipei"},{"city":"清迈","cityUrl":"chiang_mai"},{"city":"迪拜","cityUrl":"dubai"},{"city":"香港","cityUrl":"hongkong_city"},{"city":"巴厘岛","cityUrl":"bali"},{"city":"普吉","cityUrl":"koh_phuket_tha"},{"city":"长滩岛","cityUrl":"boracay_philippines"},{"city":"澳门","cityUrl":"macao_city"}],"美洲":[{"city":"洛杉矶","cityUrl":"los_angeles_ca"},{"city":"达拉斯","cityUrl":"dallas_tx"},{"city":"渥太华","cityUrl":"ottawa_ott"},{"city":"堪萨斯城","cityUrl":"kansas_city_was"},{"city":"新奥尔良","cityUrl":"new_orleans_orl"},{"city":"纽约","cityUrl":"new_york_new"},{"city":"圣迭戈","cityUrl":"san_diego_county"},{"city":"巴尔的摩县","cityUrl":"baltimore_md"},{"city":"落基山","cityUrl":"rocky_mountain_house_div"},{"city":"休斯顿","cityUrl":"houston_har"},{"city":"旧金山","cityUrl":"san_francisco_county"},{"city":"坎昆","cityUrl":"cancun_qroo"},{"city":"波特兰","cityUrl":"portland_vic_au"},{"city":"迈阿密","cityUrl":"miami_mia"},{"city":"亚特兰大","cityUrl":"atlanta_ful"},{"city":"温哥华","cityUrl":"vancouver_gre"},{"city":"费城县","cityUrl":"philadelphia_pa_us"},{"city":"太子港","cityUrl":"port_au_prince_oue"},{"city":"特立尼达","cityUrl":"trinidad_flo"},{"city":"芝加哥","cityUrl":"chicago_coo"},{"city":"夏威夷","cityUrl":"hawaii_county"},{"city":"丹佛","cityUrl":"denver_co"},{"city":"奥兰多","cityUrl":"orlando_ora"},{"city":"西雅图","cityUrl":"seattle_kin"}]}};
//console.log(json_citys);
var json_citysHot=[{"n":"北京","url":"beijing_city"},{"n":"上海","url":"shanghai_city"},{"n":"广州","url":"guangzhou"},{"n":"成都","url":"chengdu"},{"n":"杭州","url":"hangzhou"},{"n":"深圳","url":"shenzhen"},{"n":"三亚","url":"sanya"},{"n":"西安","url":"xian"},{"n":"重庆","url":"chongqing_city"},{"n":"香港","url":"hongkong_city"},{"n":"武汉","url":"wuhan"},{"n":"南京","url":"nanjing"},{"n":"昆明","url":"kunming"},{"n":"厦门","url":"xiamen"},{"n":"苏州","url":"suzhou_jiangsu"}];
//console.log(json_citysHot);
var lsf_myweb={
    "getbyid":function(id){
        return document.getElementById(id);
    },
    "getbytag":function(obj,tag){
        return obj.getElementsByTagName(tag);
    },
    "getbyclass":function(obj,sClass){
        if(obj.getElementsByClassName){
            return obj.getElementsByClassName(sClass);
        }else{
            var aResult=[];
            var aEle=obj.getElementsByTagName('*');
            var reg=new RegExp('\\b'+sClass+'\\b','g');
            for(var i=0;i<aEle.length;i++){
                if(aEle[i].className.search(reg)!=-1){
                    aResult.push(aEle[i]);
                }
            }
            return aResult;
        }
    },
    "bind":function(obj,sEv,fn){
        obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
    },
    "setStyle":function(){
        if(arguments.length==2){
            for(var name in arguments[1]){
                arguments[0].style[name]=arguments[1][name];
            }
        }else{
            arguments[0].style[arguments[1]]=arguments[2];
        }
    },
    "getStyle":function(obj,sName){
        return (obj.currentStyle?obj.currentStyle:getComputedStyle(obj,false))[sName];
    }
};
function myCityList(id,url){
    this.city=('city'+Math.random()).replace('.','');
    //alert(this.city);
    this.oDiv=null;
    this.id=id;
    this.url=url;
    this.init();
}
myCityList.prototype={
    init:function() {
        this.container();
        //热门城市
        this.hotCity('cl_citysHot');
        //字母城市
        this.show();
        //返回按钮点击事件
        this.oBack('cl_back');
    }
    ,
    container:function(){
        var _this=this;
        var str= '<div class="cl_box">'+
            '            <div class="header" id="vlm-login">'+
            '                <div class="cl_search">'+
            '                    <input type="text" placeholder="北京/beijing/bj/bjs/中国" />'+
            '                    <i></i>'+
            '                </div>'+
            '                <a href="javascript:;" class="icons header-back" id="cl_back"></a>'+
            '            </div>'+
            '            <div class="cl_curr cl_con"  >'+
            '                <a name="cl_curr" class="cl_on">&nbsp;</a>'+
            '                <div>当前</div>'+
            '                <ul>'+
            '                    <li class="fl beijing">北京</li>'+
            '                </ul>'+
            '            </div>'+
            '            <div class="cl_con ">'+
            '                <a name="cl_hot" class="cl_on">&nbsp;</a>'+
            '                <div>热门城市</div>'+
            '                <ul class="cl_citysHot" id="cl_citysHot">'+
            '                </ul>'+
            '            </div>'+
            '            <div class="cl_con ">'+
            '                <div>字母排序</div>'+
            '                <ul class="cl_word" id="cl_side">'+
            '                    <li><a href="#1F">A</a></li>'+
            '                    <li><a href="#2F">B</a></li>'+
            '                    <li><a href="#3F">C</a></li>'+
            '                    <li><a href="#4F">D</a></li>'+
            '                    <li><a href="#5F">E</a></li>'+
            '                    <li><a href="#6F">F</a></li>'+
            '                    <li><a href="#7F">G</a></li>'+
            '                    <li><a href="#8F">H</a></li>'+
            '                    <li><a href="#9F">I</a></li>'+
            '                    <li><a href="#10F">G</a></li>'+
            '                    <li><a href="#11F">K</a></li>'+
            '                    <li><a href="#12F">L</a></li>'+
            '                    <li><a href="#13F">M</a></li>'+
            '                    <li><a href="#14F">N</a></li>'+
            '                    <li><a href="#15F">O</a></li>'+
            '                    <li><a href="#16F">P</a></li>'+
            '                    <li><a href="#17F">Q</a></li>'+
            '                    <li><a href="#18F">R</a></li>'+
            '                    <li><a href="#19F">S</a></li>'+
            '                    <li><a href="#20F">T</a></li>'+
            '                    <li><a href="#21F">U</a></li>'+
            '                    <li><a href="#22F">V</a></li>'+
            '                    <li><a href="#23F">W</a></li>'+
            '                    <li><a href="#24F">X</a></li>'+
            '                    <li><a href="#25F">Y</a></li>'+
            '                    <li><a href="#26F">Z</a></li>'+
            '                </ul>'+
            '            </div>'+
            '            <ol id="lsf_city_list" class="lsf_city_list">'+
            '                <li class="cl_con ">'+
            '                    <a name="1F" class="cl_on">&nbsp;</a>'+
            '                    <div>A</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="2F" class="cl_on">&nbsp;</a>'+
            '                    <div>B</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="3F" class="cl_on">&nbsp;</a>'+
            '                    <div>C</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="4F" class="cl_on">&nbsp;</a>'+
            '                    <div>D</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="5F" class="cl_on">&nbsp;</a>'+
            '                    <div>E</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="6F" class="cl_on">&nbsp;</a>'+
            '                    <div>F</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="7F" class="cl_on">&nbsp;</a>'+
            '                    <div>G</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="8F" class="cl_on">&nbsp;</a>'+
            '                    <div>H</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="9F" class="cl_on">&nbsp;</a>'+
            '                    <div>I</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="10F" class="cl_on">&nbsp;</a>'+
            '                    <div>J</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="11F" class="cl_on">&nbsp;</a>'+
            '                    <div>K</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="12F" class="cl_on">&nbsp;</a>'+
            '                    <div>L</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="13F" class="cl_on">&nbsp;</a>'+
            '                    <div>M</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="14F" class="cl_on">&nbsp;</a>'+
            '                    <div>N</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="15F" class="cl_on">&nbsp;</a>'+
            '                    <div>O</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con ">'+
            '                    <a name="16F" class="cl_on">&nbsp;</a>'+
            '                    <div>P</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="17F" class="cl_on">&nbsp;</a>'+
            '                    <div>Q</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="18F" class="cl_on">&nbsp;</a>'+
            '                    <div>R</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="19F" class="cl_on">&nbsp;</a>'+
            '                    <div>S</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="20F" class="cl_on">&nbsp;</a>'+
            '                    <div>T</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="21F" class="cl_on">&nbsp;</a>'+
            '                    <div>U</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="22F" class="cl_on">&nbsp;</a>'+
            '                    <div>V</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="23F" class="cl_on">&nbsp;</a>'+
            '                    <div>W</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="24F" class="cl_on">&nbsp;</a>'+
            '                    <div>X</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="25F" class="cl_on">&nbsp;</a>'+
            '                    <div>Y</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '                <li class="cl_con">'+
            '                    <a name="26F" class="cl_on">&nbsp;</a>'+
            '                    <div>Z</div>'+
            '                    <ul>'+
            '                    </ul>'+
            '                </li>'+
            '            </ol>'+
            '        </div>';
        var oDiv=document.createElement('div');
        oDiv.className='cl_box_box';
        oDiv.style.zIndex=100;
        oDiv.innerHTML=str;
        lsf_myweb.setStyle(oDiv,{"position":"absolute","overflowX":"hidden!important","width":"100%","height":"100%","min-height":"100%","max-height":"100%","left":0,"top":0,"background":"#fff","zIndex":"120"});
        document.body.appendChild(oDiv);
        _this.oDiv=oDiv;
    },
    hotCity:function (id){
        var _this=this;
        var hotUl=document.getElementById(id);
        var str_hot='';
        for(var i=0;i<json_citysHot.length;i++){
            if(i==0){
                str_hot+='<li class="beijing">'+json_citysHot[i].n+'</li>';
            }else{
                str_hot+='<li>'+json_citysHot[i].n+'</li>';
            }
        }
        hotUl.innerHTML=str_hot;
        lsf_myweb.bind(hotUl,'click',function(ev){
            var oEvent=ev||event;
            var oSrc=oEvent.srcElement||oEvent.target;
            if(oSrc.tagName=='LI'){
                for(var i=0;i<hotUl.children.length;i++){
                    hotUl.children[i].style.color='#666';
                }
                oSrc.style.color='rgb(255,180,19)';
                sessionStorage[_this.city]=oSrc.innerHTML;
                document.getElementById(_this.id).value=oSrc.innerHTML;
                //删除城市列表
                document.body.removeChild(_this.oDiv);
                return;
            }
        });
    },
    cityList:function (json_city,word,obj,obj2){
        var _this=this;
        var city=json_city.en[word];
        var str='';
        //alert(word);
        //console.log(city);
        if(!city)return;
        for(var i=0;i<city.length;i++){
            str+='<li>'+city[i].city+'</li>';
        }
        for(var i=0;i<obj2.length;i++){
            //被点击的字母跳过去，不清0
            if(obj2[i]!=obj){
                obj2[i].innerHTML='';
            };
        }
        //对一个字母多次点击的时候实现隐藏显示效果
        if(obj.children.length){
            obj.innerHTML='';
        }else{
            obj.innerHTML=str;
            var obj_chil=obj.children;
            lsf_myweb.bind(obj,'click',function(ev){
                var oEvent=ev||event;
                var oSrc=oEvent.srcElement||oEvent.target;
                if(oSrc.tagName=='LI'){
                    for(var i=0;i<obj.children.length;i++){
                        obj.children[i].style.color='rgb(27,27,27)';
                    }
                    oSrc.style.color='rgb(255,180,19)';
                    sessionStorage[_this.city]=oSrc.innerHTML;
                    document.getElementById(_this.id).value=oSrc.innerHTML;
                    //删除城市列表
                    document.body.removeChild(_this.oDiv);
                    return;
                }
            });
        }
    },
    show:function(){
        var _this=this;
        //字母城市
        var oOl=lsf_myweb.getbyid('lsf_city_list');
        var aUl=oOl.getElementsByTagName('ul');
        var aLi=oOl.children;
        var aDiv=oOl.getElementsByTagName('div');
        var json_word={};
        lsf_myweb.bind(oOl,'click',function(ev){
            var oEvent=ev||event;
            var oSrc=oEvent.srcElement||oEvent.target;
            var oUl=oSrc.nextElementSibling||oSrc.nextSibling;
            _this.cityList(json_citys,oSrc.innerHTML,oUl,aUl);
        });
        //侧边列表部分；
        var oSide=document.getElementById('cl_side');
        var side_Li=oSide.children;
        for(var i=0;i<side_Li.length;i++){
            (function(index){
                lsf_myweb.bind(side_Li[index],'click',function(){
                    var oUl=aDiv[index].nextElementSibling||oSrc.nextSibling;
                    _this.cityList(json_citys,aDiv[index].innerHTML,oUl,aUl);
                });
            })(i);
        }
    },
    oBack:function(id){
        var _this=this;
        var oBack=document.getElementById(id);
        lsf_myweb.bind(oBack,'click',function(){
            document.body.removeChild(_this.oDiv);
        })
    }
};
