var lsf_myweb = {
  "getbyid" : function(id) {
    return document.getElementById(id);
  },
  "getbytag" : function(obj, tag) {
    return obj.getElementsByTagName(tag);
  },
  "getbyclass" : function(obj, sClass) {
    if (obj.getElementsByClassName) {
      return obj.getElementsByClassName(sClass);
    } else {
      var aResult = [];
      var aEle = obj.getElementsByTagName('*');
      var reg = new RegExp('\\b' + sClass + '\\b', 'g');
      for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className.search(reg) != -1) {
          aResult.push(aEle[i]);
        }
      }
      return aResult;
    }
  },
  "addClass" : function(obj, sClass) {
    if (obj.className) {
      var reg = new RegExp('\\b' + sClass + '\\b', 'g');
      if (obj.className.search(reg) == -1) {
        obj.className += ' ' + sClass;
      }
    } else {
      obj.className = sClass;
    }
  },
  bind : function(obj, sEv, fn) {
    obj.addEventListener ? obj.addEventListener(sEv, fn, false) : obj.attachEvent('on' + sEv, fn);
  },
  url2json : function(url) {
    if (!url)
      return;
    var json = {};
    var arr = url.split('?');
    var arr2 = arr[1].split('&');
    for (var i = 0; i < arr2.length; i++) {
      var arr3 = arr2[i].split('=');
      json[arr3[0]] = arr3[1];
    }
    return json;
  }
};
(function() {
  var goBack = document.getElementById('hr_back'),url = window.location.href,HotelID = lsf_myweb.url2json(url).HotelID, Rating = new Number(lsf_myweb.url2json(url).TAAvgRating);
  //goBack.onclick = function() {
  //  window.history.go(-1);
  //};

  $(document).ready(function() {
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
    }, false);
    vlm.loadend();
  });

  lsf_myweb.getbyid('TAAvgRating').innerHTML = Rating.toFixed(1);
  lsf_myweb.getbyid('TAReviewCount').innerHTML = lsf_myweb.url2json(url).TAReviewCount + '人点评';
  //alert(HotelID);
  //最大字数设置
  function maxWord(str) {
    var n = count(str).n;
    var a = count(str).a;
    var len = n;
    if (len >= 110) {
      return str.substring(0, a) + '...';
    } else {
      return str;
    }
  }

  //统计字数
  function count(str) {
    var result = {};
    result.comments = str;
    var adress = 110;
    var num = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fa5) {
        num += 3;
      } else {
        num += 1;
      }
      if (num <= adress) {
        result.a = i;
      }
    }
    result.n = num;
    return result;
  }

  //交互部分
  function M(json) {
    json = json || {};
    if (!json.HotelID)
      return;
    var data = {
      "Parameters" : "{\"HotelID\":" + json.HotelID + ",\"CultureName\":\"en - US\" }",
      "ForeEndType" : 3,
      "Code" : "0011"
    };
    return vlm.loadJson("", JSON.stringify(data), mycallback);
  }

  M({
    "HotelID" : HotelID
  });
  //callback函数
  function mycallback(json) {
    if (json.success) {
      V(json.data);
    } else {
      vlm.loadend();
      jAlert(json.message);
    }
  }

  //展示部分
  function V(data) {
    if (!data)
      return;
    var comments = data[0].reviewCommentsList;
    console.log(data);
    var str1 = '<section>' + '<p>设施&nbsp&nbsp<i>' + data[0].reviewRatingsList[0].scoringScaleID + '</i>分</p>' + '<p class="lsf_gra_p2">客房&nbsp&nbsp<i>' + data[0].reviewRatingsList[1].scoringScaleID + '</i>分</p>' + '</section>' + '<section class = "center">' + '<p>地点&nbsp&nbsp<i>' + data[0].reviewRatingsList[3].scoringScaleID + '</i>分</p>' + '<p class="lsf_gra_p2">服务&nbsp&nbsp<i>' + data[0].reviewRatingsList[4].scoringScaleID + '</i>分</p>' + '</section>' + '<section class="last_sec">' + '<p>清洁度&nbsp&nbsp<i>' + data[0].reviewRatingsList[2].scoringScaleID + '</i>分</p>' + '<p class="lsf_gra_p2">物有值&nbsp&nbsp<i>' + data[0].reviewRatingsList[5].scoringScaleID + '</i>分</p>' + '</section';
    var str2 = '';
    //评论分页设置
    function num_show(start, end) {
      var myStart = start;
      var myEnd = end;
      //dis是每次显示的评论条数
      var dis = myEnd - myStart;
      //console.log(comments.length);
      //console.log(dis);
      if (myEnd < comments.length) {
        for (var i = myStart; i < myEnd; i++) {
          var star = parseFloat(comments[i].avgReviewerRating);
          var str3 = '';
          for (var j = 0; j < 5; j++) {
            if ((j + 1) <= star) {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.33rem -0.59rem;background-size: 5.12rem 1.41rem;"></li>';
            } else if (star > j && star < (j + 1)) {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.05rem -0.59rem;background-size: 5.12rem 1.41rem;"></li>';
            } else {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.33rem -0.32rem;background-size: 5.12rem 1.41rem;"></li>';
            }
          }
          str2 += '<div class="reBox hotel_grade_content_box">' + '<div class="clearfix lsf_reTitle hotel_grade_content_box_first">' + '<h2 class="fl">' + comments[i].title + '</h2>' + '<ol class="clearfix fr lsf_reSta hotel_grade_content_box_ol">' + str3 + '</ol>' + '</div>' + '<p class="clearfix comments hotel_grade_content_box_comments"><span class="com_cont">' + maxWord(comments[i].comments) + '</span></p>' + '<em class="fr drop_down"><i></i></em>' + '<div class="lsf_reUser hotel_grade_content_box_User">' + '<span class="reu_span1"><b class="fl">' + comments[i].reviewerName + '</b><i class="fl hr_city">' + comments[i].countryName + '</i></span>' + '<span class="reu_span2"><em class="fr">' + comments[i].createdDate.substring(0, comments[i].createdDate.indexOf('T')) + '</em></span>' + '</div>' + '</div>';
        }
        lsf_myweb.getbyid('lsf_reDiscuss').innerHTML += str2;
        notShow();
        myDown();
        str2 = '';
        var oMore = document.createElement('div');
        oMore.innerHTML = '加载更多';
        lsf_myweb.addClass(oMore, 'hr_more hotel_grade_content_more');
        lsf_myweb.getbyid('lsf_reDiscuss').appendChild(oMore);
        lsf_myweb.bind(oMore, 'click', function() {
          this.style.display = 'none';
          myStart = myEnd;
          myEnd = myStart + dis;
          //console.log(myStart+'--'+myEnd)
          num_show(myStart, myEnd);
        });
      } else {
        for (var i = myStart; i < comments.length; i++) {
          var star = parseFloat(comments[i].avgReviewerRating);
          var str3 = '';
          for (var j = 0; j < 5; j++) {
            if ((j + 1) <= star) {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.33rem -0.59rem;background-size: 5.12rem 1.41rem;"></li>';
            } else if (star > j && star < (j + 1)) {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.05rem -0.59rem;background-size: 5.12rem 1.41rem;"></li>';
            } else {
              str3 += '<li class="fl" style="background:url(../images/ui/jd-icon.png) -0.33rem -0.32rem;background-size: 5.12rem 1.41rem;"></li>';
            }
          }
          str2 += '<div class="reBox hotel_grade_content_box">' + '<div class="clearfix lsf_reTitle hotel_grade_content_box_first">' + '<h2 class="fl">' + comments[i].title + '</h2>' + '<ol class="clearfix fr lsf_reSta hotel_grade_content_box_ol">' + str3 + '</ol>' + '</div>' + '<p class="clearfix comments hotel_grade_content_box_comments"><span class="com_cont">' + maxWord(comments[i].comments) + '</span></p>'  + '<em class="fr drop_down"><i></i></em>' + '<div class="lsf_reUser hotel_grade_content_box_User">' + '<span class="clearfix reu_span1"><b class="fl">' + comments[i].reviewerName + '</b><i class="fl">' + comments[i].countryName + '</i></span>' + '<span class="clearfix reu_span2"><em class="fr">' + comments[i].createdDate.substring(0, comments[i].createdDate.indexOf('T')) + '</em></span>' + '</div>' + '</div>';
        }

        lsf_myweb.getbyid('lsf_reDiscuss').innerHTML += str2;
        notShow();
        myDown();
      }

    }
    //总分五角星展示
    function start_show(Rating) {
          var star = parseFloat(Rating);
          var str0 = '';
          for (var i = 0; i < 5; i++) {
            if ((i + 1) <= star) {
              str0 += '<li class="fl" style="background:url(../images/ui.1.0/big_start1.png) 0rem 0rem;background-size: 0.39rem 0.36rem;"></li>';
            } else if (star > i && star < (i + 1)) {
              str0 += '<li class="fl" style="background:url(../images/ui.1.0/big_start2.png) 0rem 0rem;background-size: 0.39rem 0.36rem;"></li>';
            } else {
              str0 += '<li class="fl" style="background:url(../images/ui.1.0/big_start3.png) 0rem 0rem;background-size: 0.39rem 0.36rem;"></li>';
            }
          }
        lsf_myweb.getbyid('total_start').innerHTML += str0;
    }


    lsf_myweb.getbyid('lsf_reDetail_grade').innerHTML = str1;
    num_show(0, 10);
    start_show(Rating);
    function notShow() {
      var com_cont = lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'), 'com_cont');
      var coms = lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'), 'comments');
      //评论数小于110字节的，不显示下拉按钮
      for (var i = 0; i < com_cont.length; i++) {
        if (count(com_cont[i].innerHTML).n <= 110) {
          lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'), 'drop_down')[i].style.display= "none";
        }
      }
    }

    function myDown() {
      var reBox = lsf_myweb.getbyclass(lsf_myweb.getbyid('lsf_reDiscuss'), 'reBox');
      //对评论下拉做点击事件，点击显示全部评论内容
      for (var i = 0; i < reBox.length; i++) {
        (function(index) {
          var oP = lsf_myweb.getbyclass(reBox[index],'comments')[0];
          var dropDown = lsf_myweb.getbyclass(reBox[index], 'drop_down');
          if(dropDown.length > 0){
            dropDown[0].onclick = function(ev) {
              var oEvent = ev || event;
              this.style.display = 'none';
              var oSpan = oP.firstElementChild || oP.firstChild;
              oSpan.innerHTML = comments[index].comments;
            };
          }
        })(i);
      }
    };
  }
})();

