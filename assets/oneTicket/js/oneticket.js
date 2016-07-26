/**
 * Created by qzz on 2016/7/13.
 */
"use strict";

(function () {
  //加载动画
  $("#status").fadeOut();
  $("#preloader").delay(400).fadeOut("medium");

  function init() {

    //特卖模块
    var greatSaleData = [
      {
        "ProductName": "新加坡双程缆车电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/28054/3-compressed.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "2015/7/14",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK00519LGK09",
        "ProductDesc": "穿梭于圣淘沙和新加坡花柏山顶两个繁华目的地",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "507063",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "滨海湾花园电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2433/7-compressed.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "2013/1/23",
        "ProductEndDate": "2016/9/30",
        "IsEnabled": "1",
        "ProductCode": "PK0382360SIN17",
        "ProductDesc": "城市中心的绿洲",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "382792",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡河川生态园电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/31774/Giant%20River%20Otter.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "2015/11/18",
        "ProductEndDate": "2016/12/31",
        "IsEnabled": "1",
        "ProductCode": "PK0505975SIN17",
        "ProductDesc": "参观亚洲首个亦是唯一一个以河川为主题的野生动物园",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "509289",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "时光之翼1940场电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/1353/rh-SINGAPORE-ENTERTAINMENT-160714e_converted.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "2014/6/19",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK04205SIN17",
        "ProductDesc": "关于勇气的故事",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "4416",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡动物园和电车电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/31676/Zoo_RhinoFeeding_379_Main_04-compressed.jpg",
        "ProductIndex": "5",
        "ProductStartDate": "2015/11/11",
        "ProductEndDate": "2016/12/31",
        "IsEnabled": "1",
        "ProductCode": "PK0505901SIN17",
        "ProductDesc": "新加坡旅游局的最佳休闲景点体验奖的九冠王新加坡日间动物园含小火车",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "509215",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "圣淘沙鱼尾狮塔电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2609/Merlion%20Tower%204.jpg",
        "ProductIndex": "6",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "穿梭于圣淘沙和新加坡花柏山顶两个繁华目的地",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡环球影城2大1小",
        "ProductPicUrl": "http://cn.asiatravel.com/common/media/images/thumb-overseas-eticket-uss.jpg",
        "ProductIndex": "7",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "穿梭于圣淘沙和新加坡花柏山顶两个繁华目的地",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡环球影城双人票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/200/USS.jpg",
        "ProductIndex": "8",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "穿梭于圣淘沙和新加坡花柏山顶两个繁华目的地",
        "ProductSite": "新加坡",
        "ProductPrice": "480",
        "ProductID": "",
        "ProductAttentionNum": "",
        "ProductType": "T",
      }
    ];

    //亲子模块
    var childAllData = [
      {
        "ProductName": "新加坡环球影城电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/200/USS.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "2014/1/14",
        "ProductEndDate": "2016/6/30",
        "IsEnabled": "1",
        "ProductCode": "PK0489210SIN17",
        "ProductDesc": "嗨翻新加坡影城，进入惊心动魄的电影魔幻世界，身临其境的娱乐体验，让人身心愉悦",
        "ProductSite": "新加坡",
        "ProductPrice": "297",
        "ProductID": "492416",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "S.E.A.水族馆™电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2542/S.E.A%20Aquarium%201.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "2013/3/11",
        "ProductEndDate": "2016/7/31",
        "IsEnabled": "1",
        "ProductCode": "PK0449906SIN17",
        "ProductDesc": "沉醉于世界最大海洋馆,寓教于乐",
        "ProductSite": "新加坡",
        "ProductPrice": "98",
        "ProductID": "453034",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "裕廊飞禽公园和电车电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/31672/JBP_Birdz_036_Main_03.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "2015/1/11",
        "ProductEndDate": "2016/12/31",
        "IsEnabled": "1",
        "ProductCode": "PK0505895SIN17",
        "ProductDesc": "与动物亲密接触",
        "ProductSite": "新加坡",
        "ProductPrice": "98",
        "ProductID": "509209",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "河川生态园和夜间野生动物园半日游",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2690/River%20Safari%205.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "2013/4/11",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK0479507SIN17",
        "ProductDesc": "参观亚洲首个亦是唯一一个以河川为主题的野生动物园及世界夜间野生动物园",
        "ProductSite": "新加坡",
        "ProductPrice": "348",
        "ProductID": "482686",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "圣淘沙名胜世界逸濠酒店 (Resorts World Sentosa - Equarius Hotel)",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/10472/front-image3.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "住海底套房与鱼共眠，拥有超大海洋馆观景窗的海景套房",
        "ProductSite": "圣淘沙",
        "ProductPrice": "1547",
        "ProductID": "10472",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "圣淘沙名胜世界节庆酒店(Resorts World Sentosa - Festive Hotel) ",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/7765/attraction10.jpg?_ga=1.44722727.200375633.1463101167",
        "ProductIndex": "2",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "住海底套房与鱼共眠，拥有超大海洋馆观景窗的海景套房",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "7765",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "迈克尔酒店Resorts World Sentosa - Hotel Michael",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/7764/Deluxe.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "时尚创新设计，客房暖色调的温馨设计，舒适的入住体验",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "7764",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "圣淘沙喜乐度假酒店Siloso Beach Resort, Sentosa",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/80/Exterior.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "尽情享受大自然的美丽风光，享受度假的悠闲时光",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "80",
        "ProductAttentionNum": "",
        "ProductType": "H",
      }
    ];

    //闺蜜模块
    var bestieData = [
      {
        "ProductName": "Ducktour之游（电子船票）",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2208/Singapore%20Ducktours%204.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "2012/11/27",
        "ProductEndDate": "2016/9/30",
        "IsEnabled": "1",
        "ProductCode": "PK24831SIN17",
        "ProductDesc": "乘坐二战使用的越南战争军用机模型，开始水陆探险",
        "ProductSite": "新加坡",
        "ProductPrice": "169",
        "ProductID": "24850",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "斜坡滑车与空中吊椅的电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2327/Luge%20with%20Skyride%202.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "2012/12/27",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK0037721SIN17",
        "ProductDesc": "",
        "ProductSite": "新加坡",
        "ProductPrice": "69",
        "ProductID": "37937",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "圣淘沙冲浪区电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2613/Wavehouse%202.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "2013/3/20",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK0461871SIN17",
        "ProductDesc": "与闺蜜在亚洲顶级冲浪区感受热岛夏日的激情",
        "ProductSite": "新加坡",
        "ProductPrice": "59",
        "ProductID": "465004",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "水上探险乐园电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2543/Adventure%20Cove%20Waterpark%204.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "2013/3/11",
        "ProductEndDate": "2016/11/30",
        "IsEnabled": "1",
        "ProductCode": "PK0449909SIN17",
        "ProductDesc": "搭乘东南亚的第一个水电磁过山车",
        "ProductSite": "新加坡",
        "ProductPrice": "99",
        "ProductID": "453037",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡文化大酒店Mandarin Orchard Singapore ",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/58/Facade-Day.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "文华大酒店是乌节路将传统东方文化和西方高雅的现代风格完美的结合的代表",
        "ProductSite": "乌节路",
        "ProductPrice": "",
        "ProductID": "58",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "新加坡半岛怡东酒店Peninsula Excelsior Hotel",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/46/FRONT%202%20OK.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "半岛怡东酒店位于新加坡商业、娱乐区，距离历史悠久的新加坡河只有一街之隔",
        "ProductSite": "市政厅",
        "ProductPrice": "",
        "ProductID": "46",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "新加坡柏-伟诗酒店/瑞吉公园酒店Park Regis",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/8860/Facade.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "酒店紧靠来福士广场、滨海湾、新加坡商业及娱乐中心等知名景点",
        "ProductSite": "克拉码头",
        "ProductPrice": "",
        "ProductID": "8860",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "新加坡龙都大酒店Rendezvous Hotel Singapore",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/48/48_Facade.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "新加坡龙都大酒店是您来新加坡的最佳落脚点",
        "ProductSite": "",
        "ProductPrice": "",
        "ProductID": "48",
        "ProductAttentionNum": "",
        "ProductType": "H",
      }
    ];

    //情侣模块
    var loversData = [
      {
        "ProductName": "夜游新加坡（含新加坡河游船）",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2433/4-compressed.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "2016/1/14",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK0506423SIN17",
        "ProductDesc": "和爱人泛舟新加坡河，感受古老建筑与现代摩天楼的对比，享受城市的美丽",
        "ProductSite": "新加坡",
        "ProductPrice": "260",
        "ProductID": "509737",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "天空餐饮体验 - Cloud 9 Sky 餐厅 ",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2449/116_31dec2013-compressed.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "2016/3/22",
        "ProductEndDate": "2016/12/31",
        "IsEnabled": "1",
        "ProductCode": "PK0407866SIN17",
        "ProductDesc": "美妙的城市在浪漫夜空烘托下，与心爱人在摩天轮用餐，终身难忘",
        "ProductSite": "新加坡",
        "ProductPrice": "655",
        "ProductID": "409750",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "老虎摩天塔电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2328/Sky%20Tower%205.jpg",
        "ProductIndex": "3",
        "ProductStartDate": "2012/12/27",
        "ProductEndDate": "2017/3/31",
        "IsEnabled": "1",
        "ProductCode": "PK0037730SIN17",
        "ProductDesc": "圣淘沙旅行最高点，可观及马来西亚甚至印尼全景",
        "ProductSite": "新加坡",
        "ProductPrice": "54",
        "ProductID": "37946",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "2合1配套：新加坡摩天观景轮电子票+DuckTour之旅电子票",
        "ProductPicUrl": "http://packages.asiatravel.com/packageImage/Tour/AddtlImages/2137/Singapore%20Flyer%205.jpg",
        "ProductIndex": "4",
        "ProductStartDate": "2016/1/27",
        "ProductEndDate": "2016/9/30",
        "IsEnabled": "1",
        "ProductCode": "PK0506708SIN17",
        "ProductDesc": "360°无死角的标志性视觉盛宴",
        "ProductSite": "新加坡",
        "ProductPrice": "290",
        "ProductID": "510022",
        "ProductAttentionNum": "",
        "ProductType": "T",
      },
      {
        "ProductName": "新加坡喜来登大酒店Sheraton Towers",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/47/47facade.jpg",
        "ProductIndex": "1",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "位于城市的心脏的国际五星豪华酒店",
        "ProductSite": "市中心",
        "ProductPrice": "",
        "ProductID": "47",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "圣淘沙安曼纳圣殿度假酒店Amara Sanctuary Resort Sentosa",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/5168/palawan-beach.jpg?_ga=1.252202889.1603362550.1458039440",
        "ProductIndex": "2",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "圣淘沙阿玛拉私人度假村一个世界级综合度假胜地",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "5168",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "新加坡圣淘沙嘉佩乐酒店 Capella Singapore",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/6822/6822exterior.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "一个远离尘嚣的世外桃源，新加坡最知名的度假天堂",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "6822",
        "ProductAttentionNum": "",
        "ProductType": "H",
      },
      {
        "ProductName": "新加坡艾美圣淘沙酒店'Le Meridien Singapore",
        "ProductPicUrl": "http://images.asiatravel.com/Hotel/9186/exterior.jpg",
        "ProductIndex": "2",
        "ProductStartDate": "",
        "ProductEndDate": "",
        "IsEnabled": "1",
        "ProductCode": "",
        "ProductDesc": "探索狮城古老和现代文化独特融合的完美下榻之所",
        "ProductSite": "圣淘沙",
        "ProductPrice": "",
        "ProductID": "9186",
        "ProductAttentionNum": "",
        "ProductType": "H",
      }
    ];

    function oneticketTab(oneticketData) {
      var greatSalestr = $('#greatSale').html();
      var greatSaleList = ejs.render(greatSalestr, {greatSaleData: oneticketData})
      $('#one_sale_cont').html(greatSaleList);
      def_img();
    }

    oneticketTab(greatSaleData);

    //Tab切换
    $('.one_select >li').on('click', function () {
      var one_index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      switch (one_index) {
        case 0:
          $('.shortexhibition').attr('src', '../images/oneticket/great_sale.png');
          $('.one_sale_cont').css('backgroundColor', '#fed81d');
          $('.one_foot').css('backgroundColor', '#fed81d');
          oneticketTab(greatSaleData);
          break;
        case 1:
          $('.shortexhibition').attr('src', '../images/oneticket/child_all.png');
          $('.one_sale_cont').css('backgroundColor', '#7bc300');
          $('.one_foot').css('backgroundColor', '#7bc300');
          oneticketTab(childAllData);
          break;
        case 2:
          $('.shortexhibition').attr('src', '../images/oneticket/bestie.png');
          $('.one_sale_cont').css('backgroundColor', '#65ebe0');
          $('.one_foot').css('backgroundColor', '#65ebe0');
          oneticketTab(bestieData);
          break;
        case 3:
          $('.shortexhibition').attr('src', '../images/oneticket/lovers.png');
          $('.one_sale_cont').css('backgroundColor', '#4ad1ef');
          $('.one_foot').css('backgroundColor', '#4ad1ef');
          oneticketTab(loversData);
          break;
      }

    });

  }

  init();


})();

//默认图片
function def_img(){
  var images = $("#one_sale_cont").find('img');
  var error_url = '../../images/hotelDetailerrorpic.png';
  for (var i = 0; i < images.length; i++) {

    (function(index) {
      var re_url = images[i].getAttribute('data-src');
      loadImage(re_url, error_url, function() {
        images[index].setAttribute('src', re_url);

      }, function() {
        images[index].setAttribute('src', error_url);
      });

      function loadImage(url, error_url, callback, errorFunc) {
        var img = new Image();
        img.src = url;
        img.onload = function() {
          img.onload = null;
          callback();
        };
        img.onerror = function() {
          img.onerror = null;
          errorFunc();
        }
      }
    })(i);
  }
}

//立即抢购
var shopTarget;
function quickShop(obj) {
  shopTarget=obj;
  var sPackageId = $(this).attr('data-packageId');
  var Parmeters = {
    "parameters": {"packageID": "1064"},
    "foreEndType": 2,
    "code": "20100003"
  }
  vlm.loadJson("", JSON.stringify(Parmeters), saleList_back);

  function saleList_back(ret) {
    var json = ret;
    console.log(json);
    if (json.success) {
      if (json.data.tourAllotmentTotal && json.data.isCashVoucherAllowed) {
        //是否登录
        if(vlm.checkLogin("../scenic/scenic_detail.html?packageID=1064")){
          window.location.href='../scenic/scenic_detail.html?packageID=1064';
        };
      } else {
        //售罄
        $(shopTarget).parents('.one_sale_show').find('.one_sale_bg').show();
        $(shopTarget).parents('.one_sale_show').find('.one_price').css('color','#ccc');
        $(shopTarget).parents('.one_sale_show').find('.panic_buy').addClass('on');
      }
    } else {
      jAlert(json.message);
    }
  }

}
