/* * 底部菜单
 * 创建底部菜单，id,class会有不同,每个页面只有一个底部，多个筛选条件
 * menu：根据页面url地址进行判断
 * filters：根据传入的json对象显示和判断
 * 传入参数示例说明：
sortTypes: {    /!*生成的底部dl单元的id*!/
    candidateTitle : [], /!*候选名字组， 点击后底部dl单元文字是否改变，和isTitleChange，isArrayItem，titleItem配合使用*!/
    s :1 ，       /!*1|2, 单|多选*!/
    c : "foot_sort", //样式
    type : 1,//类型：0底部dl单元直接点击，1按钮触发列表显示 点击列表直接查询回调，2同1，多条件筛选，点击确认按钮进行查询，3航空公司，特殊处理方式
    key : 'sortTypes', /!*和底部dl单元id一定要相同*!/
    isTitleChange:2,  /!*点击后是否改变底部dl单元标题：0, 不变,一直显示默认， 1, 从candidateTitle数组里取， 2 :从高亮的li文字里取，*!/
    isAddDl:0,       /!*点击完后是否把底部dl单元当前操作dl返回  0不返回， 1返回*!/
    isArrayItem:0,/!*底部dl单元是否顺序显示候选名字组的值 0,不循环， 1循环*!/
    titleMaxRate:0,  /!*最大标题索引值， 默认为0, 其值根据上面的candidateTitle的长度取*!/
    titleItem:" ",  /!*当需要从candidateTitle取值显示时，其值是该数组的索引值*!/
    defaultTitle:{sortText:"优选", sortValue:""}, /!*底部dl单元默认名字*!/
    clearOtherDl:8,   //点击该dl后，是否清空另一个dl的值和高亮状态，序号 值为1就清除1，值为8则不清除
    listData: [ /!列表选项*!/
    {sortText: "直飞优先", sortValue: 1}, {sortText: "低价优先", sortValue: 2},
    {sortText: "耗时短优先", sortValue: 3}, {sortText: "起飞早到晚", sortValue: "isDesc_false"},
    {sortText: "起飞晚到早", sortValue: "isDesc_true"}
  ]
}*/

var footer = (function(){
  "use strict";
  // 遮罩容器
  var masker,
  // 菜单容器
    box,
  // 选择容器
    sec,
  // 实例
    instance,
  // 返回结果
    results = {},
  // 对象长度
    size = function(obj){
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key))
          size++;
      }
      return size;
    },
  // 数字转换英文
    numToEn = function(n) {
      var en = new Array(" ", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine");
      n = isNaN(parseInt(n)) ? 0 : parseInt(n);
      return en[n];
    },
  // 添加样式
    addClass = function(c, node) {
      node.className = node.className + ' ' + c;
    },
  // 删除样式
    removeClass = function(c, node) {
      var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
      node.className = node.className.replace(reg, '');
    },
  // 绑定事件
    on = function(node, type, handler) {
      node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },
  //菜单
    menu = function() {
      var basePath = basePath == undefined ? "http://" + window.location.host : basePath, hrefstr = window.location.href, _k, menus = {
        home : ['首页', basePath],
        user : ['我的', basePath + '/user/user.html']
      };
      if (hrefstr == "http://" + basePath + "/index.html" || hrefstr == "http://" + basePath + "/") {
        _k = "home";
      } else {
        var _s = hrefstr.substr(basePath.length + 1);
        if (_s == "" || _s == "index.html") {
          _k = "home";
        } else if (_s == "scenic/index.html") {
          _k = "find";
        } else if (_s == "user/user.html") {
          _k = "user";
        } else if (_s == "building.html") {
          _k = "find";
        }
      }
      if (menus.hasOwnProperty(_k)) {
        if (document.getElementById("menu")) {
          var menuer = document.getElementById("menu");
          menuer.className = "footer-menu-three-icons footer-menu";
        } else {
          var menuer = document.createElement('div');
          menuer.id = "menu";
          menuer.className = "footer-menu-three-icons footer-menu";
          document.body.appendChild(menuer);
        }
        var _str = "";
        for (var k in menus) {
          var cn = k == _k ? "foot-" + k + "s" : "foot-" + k;
          _str += "<a href='" + menus[k][1] + "' class='" + cn + "'><i></i>" + menus[k][0] + "</a>";
        }
        menuer.innerHTML = _str;
        menuer.innerHTML = _str;
      }
      //return this;
    },
  // 筛选
    filters = {
      bindEvent : function() {
        var that = this;
        //底部
        on(box, 'click', function(event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src, index, returnVal;
          src = target.parentNode;
          //当前dom元素等于事件绑定的dom元素的时候，停止“冒泡”
          while (src && src !== box) {
            target = src;
            src = src.parentNode;
          }
          index = 0;
          returnVal = target.getAttribute("data-type");
          //底部样式改变
          for (var i = 0; i < size(footer.data); i++) {
            box.childNodes[i].style.backgroundColor = "";
          }
          while ( target = target.previousSibling) {
            if (target.nodeType == 1) {
              index++;
            }
          }
          box.childNodes[index].style.backgroundColor = "#333";
          that.dlItem = index;
          that.dlType = returnVal;
          that.showItems(index,returnVal);
        });
        // 容器里的各种点击：取消，确定按钮
        on(sec, 'click', function(event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src, index, cur,nod;
          src = target.parentNode;
          if (target.className == "cancel") {// 取消
            if(target.parentNode.nextSibling){
              var screenLi = target.parentNode.nextSibling.getElementsByTagName('li');
              for(var j = 0;j < screenLi.length;j++){
                if(screenLi[j].className == 'cur choose'){
                  screenLi[j].className = '';
                }
                if(screenLi[j].className == 'choose'||screenLi[j].className == 'cur choose'){
                  screenLi[j].className = 'cur';
                }
              }
            }
            that.remove();
          } else if (target.className == "clears") {// 清初筛选
            var node = src.parentNode;
            that.resec(node);
          } else if (target.className == "sure") {// 筛选确定
            if(target.parentNode.nextSibling){
              var screenLi_ = target.parentNode.nextSibling.getElementsByTagName('li');
              for(var p = 0;p < screenLi_.length;p++){
                if(screenLi_[p].className == 'cur choose'||screenLi_[p].className == 'cur choose'){
                  screenLi_[p].className = 'cur';
                }
                if(screenLi_[p].className == 'choose'||screenLi_[p].className == 'choose'){
                  screenLi_[p].className = '';
                }
              }
            }
            that.request();
          }  else if (target.className == "button") {//航空公司的确定
            var air = target.parentNode;
            var li = air.getElementsByTagName('li');
            for(var k = 0;k < li.length;k++){
              if(li[k].className == 'cur choose'){
                li[k].className='cur';
                nod = li[k];
              }else if(li[k].className == 'cur choose'){
                li[k].className='cur';
                nod = li[k];
              }else if(li[k].className == 'cur'){
                nod = li[k];
              }
            }
            nod.parentNode.insertBefore(nod, nod.parentNode.firstChild);
            that.request();
          } else {
            if (target.tagName == "I" || src.tagName == "LI") {// 非LI向上冒泡
              target = target.parentNode;
              src = target.parentNode;
            }
            if (target.tagName == "LI") {
              if (src.className == "screen_lf") {
                var cur = src.getElementsByClassName("cur");
                for (var i = 0; i < cur.length; i++) {
                  if (cur[i].className == "cur") {
                    cur[i].className = "";
                    break;
                  }
                }
                target.className = "cur";
                index = 0;
                while ( target = target.previousSibling) {
                  if (target.nodeType == 1)
                    index++;
                }
                // 右侧显示隐藏
                var sRight = src.nextSibling, ul = sRight.getElementsByTagName("ul");
                for (var i = 0; i < ul.length; i++) {
                  //if (ul[i].style.display == "block") {
                  ul[i].style.display = "none";
                  //break;
                  //}
                }
                ul[index].style.display = "block";
              } else {
                var sel = parseInt(src.getAttribute("data-sel")), theme = parseInt(src.getAttribute("data-theme"));
                switch(sel) {
                  case 1:
                    //单选
                    var cur = src.getElementsByClassName("cur");
                    for (var i = 0; i < cur.length; i++) {
                      if (cur[i].className == "cur") {
                        cur[i].className = "choose";
                        //break;
                      } else{
                        cur[i].className = "";
                      }
                    }
                    if(target.className == "cur choose"){
                      target.className = "choose";
                    }else if(target.className == "cur"){
                      target.className = "choose";
                    }else if(target.className == "choose") {
                      target.className = "cur choose";
                    } else{
                      target.className = "cur choose";
                    }
                    break;
                  case 2:
                    //多选
                    var sss = src.firstChild.innerHTML;
                    if (sss.indexOf("不限") > -1||sss.indexOf("经济舱") > -1) {//不限互斥
                      if (target == src.firstChild) {//如果点击是第一个
                        var cur = src.getElementsByTagName("li");
                        for (var i = 1; i < cur.length; i++) {
                          //if (cur[i].className == "cur") {
                          if(cur[i].className == "cur"){
                            cur[i].className = "choose";
                          }else if(cur[i].className == "cur choose"){
                            cur[i].className = "choose";
                          }else{
                            cur[i].className = "";
                          }
                          // break;
                          //}
                        }
                        if(target.className == "cur choose"){
                          target.className = "choose";
                        }else if(target.className == "cur"){
                          target.className = "choose";
                        }else if(target.className == "choose") {
                          target.className = "cur choose";
                        } else{
                          target.className = "cur choose";
                        }
                      } else {//点击是其他（非不限选项）
                        if(src.firstChild.className == "cur choose"){
                          src.firstChild.className = "choose";
                        }else if(src.firstChild.className == "cur"){
                          src.firstChild.className = "choose";
                        }
                        //判断比直接赋空值内存性能优化方面好
                        if(target.className == "cur choose"){
                          target.className = "choose";
                        }else if(target.className == "cur"){
                          target.className = "choose";
                        }else if(target.className == "choose") {
                          target.className = "cur choose";
                        } else{
                          target.className = "cur choose";
                        }
                      }
                    } else {
                      if(target.className == "cur choose"){
                        target.className = "choose";
                      }else if(target.className == "cur"){
                        target.className = "choose";
                      }else if(target.className == "choose") {
                        target.className = "cur choose";
                      } else{
                        target.className = "cur choose";
                      }
                    }
                    break;
                  default:
                    //单击
                    break;
                }
                if (theme == 1) {// 显示类型确认操作，2016-06-14将航空公司操作theme==3屏蔽
                  that.request();
                }
              }
            }
          }

        });
        // 遮罩层|返回按钮点击，包括隐藏
        $("body").children().click(function () {});  //解决iPhone safari中Document事件不触发
        on(document, 'click', function(event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src = target.parentNode;
          if (target.className.indexOf("header_back") > -1 || src.className.indexOf("header_back") > -1) {
            if (masker.style.display == "none" && sec.firstChild.style.top == "1.48rem") {
              var airwaylist = document.querySelector(".flight_company").getElementsByTagName('li');
              for(var mm = 0;mm < airwaylist.length;mm++){
                if(airwaylist[mm].className == 'cur choose'){
                  airwaylist[mm].className = '';
                }
                airwaylist[0].className = 'cur';
              }
              that.showItems(0, 3);
              // 阻止默认链接跳转
              if (event && event.preventDefault) {
                event.preventDefault();
              } else {
                window.event.returnValue = false;
              }
              return false;
            }
          }
          if (target == masker || target == sec) {
            var screenLi = target.nextSibling.getElementsByTagName('li');
            for(var j = 0;j < screenLi.length;j++) {
              if (screenLi[j].className == 'cur choose') {
                screenLi[j].className = '';
              }
              if (screenLi[j].className == 'choose'||screenLi[j].className == 'cur choose') {
                screenLi[j].className = 'cur';
              }
            }
            that.remove();
          }
        });
      },
      // 新建筛选：列表&菜单
      create : function() {
        //overlay
        this.createMask();
        //container
        this.createContainer();
        //menu
        box = document.createElement('footer');
        box.className = 'footer_' + numToEn(size(footer.data));
        //addClass('footer_filter_btn',box);
        if (1) {
          box.style.position = 'fixed';
          box.style.left = 0;
          box.style.bottom = 0;
          box.style.width = '100%';
          box.style.height = '0.98rem';
          box.style.background = '#4c4c4c';
          box.style.zIndex = 130;
          box.style.fontSize = '0.24rem';
        }
        var data = footer.data, ca = [];
        for (var p in data) {
          ca.push('<dl class=' + data[p].c +
            ' id=' + p +
            ' data-type=' + data[p].type +
            ' data-isTitleChange=' + data[p].isTitleChange +
            ' data-isAddDl=' + data[p].isAddDl +
            ' data-isArrayItem=' + data[p].isArrayItem +
            ' data-titleMaxRate=' + data[p].titleMaxRate +
            ' data-clearOtherDl=' + data[p].clearOtherDl +
            ' data-titleItem=' + data[p].titleItem +
            '><dt></dt><dd>' + data[p].defaultTitle.sortText + '</dd></dl>');
          this.createSec(data[p].s, data[p].c, data[p].type, data[p].key, data[p].listData);
        }
        box.innerHTML = ca.join('');
        document.body.appendChild(box);
        this.bindEvent();
        return this;
      },
      // container
      createContainer : function() {
        if (!sec) {
          sec = document.createElement('span');
          sec.style.position = "fixed";
          sec.style.zIndex = 110;
          sec.style.width = '100%';
          sec.style.left = 0;
          sec.style.bottom = 0;
          document.body.appendChild(sec);
        } else {
          return sec;
        }
      },
      // masker
      createMask : function() {
        if (!masker) {
          masker = document.createElement('div');
          masker.style.display = "none";
          masker.style.position = 'fixed';
          masker.style.left = 0;
          masker.style.top = 0;
          masker.style.width = '100%';
          masker.style.height = '100%';
          masker.style.background = 'rgba(0,0,0,0.6)';
          masker.style.zIndex = 100;
          document.body.appendChild(masker);
        } else {
          return masker;
        }
      },
      // section
      createSec : function(s, c, t, k, d) {
        var str = '', ulstr = '', listr = '', i = 0, l = d.length, css = '', s = s ? s : 1, cache = [], defaultItem = 0,
        // 容器
          wrapper = ['<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k +'" class="' + k + '">', '</ul>'],
        // 左侧容器
          left = ['<ul class="screen_lf">', '</ul>'],
        // 右侧容器
          right = ['<div class="screen_rg">', '</div>'],
        // 列表容器
          ulstr = '',
        // 航司确认按钮
          button = '<div class="button">确认</div>',
        // 新建section
          mysec = document.createElement('section');
        c ? mysec.className = c : null;
        switch(k) {
          case "airways":
            // 航空公司
            for (; i < l; i++) {
              css = i == 0 ? ' class="cur"' : '';
              listr += '<li' + css + ' data-val="' + d[i].airwayCacheID + '" airwayCacheID="' + d[i].airwayCacheID + '" airwaySetID="' + d[i].airwaySetID + '"><div><img src="' + d[i].airwayLogo + '"></div><span class="airway_name">' + d[i].chineseName + '</span><div class="aw_price"><span>+￥</span><span>' + d[i].additionalPrice + '</span></div><b class="hft_icon"></b></li>';
            }
            ulstr = wrapper[0] + listr + wrapper[1] + button;
            break;
          case "filters":
            // 筛选
            for (; i < l; i++) {
              var a = d[i], item = a.item, li = '';
              css = i == 0 ? ' class="cur"' : '';
              cache.push('<li' + css + ' data-filterType="' + a.filterType + '">' + a.title + '</li>');
              s = a.allowMultiSelect == 1 || a.allowMultiSelect == "1" ? 2 : 1;
              wrapper[0] = '<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k +'" class="' + k + '" data-type="' + a.filterType + '">';
              for (var j = 0; j < item.length; j++) {
                var o = item[j];
                css = o.filterText == '不限'||o.defaultChoose == 1 ? ' class="cur"' : '';
                li += '<li' + css + ' data-val="' + o.filterValue + '">' + o.filterText + '<i></i></li>';
              }
              ulstr += wrapper[0] + li + wrapper[1];
            }
            break;
          case "locationList":
            // 位置
            for (; i < l; i++) {
              css = '';
              listr += '<li' + css + ' data-val="' + d[i] + '">' + d[i] + '<i></i></li>';
            }
            ulstr = wrapper[0] + listr + wrapper[1];
            break;
          case "sortTypes":
            // 排序
            for (j=0; j < l; j++) {
                 if(d[j].defaultChoose){
                    defaultItem = j;
                    break;
                 }
            }
            for (; i < l; i++) {
              css = i == defaultItem? ' class="cur"' : '';
              listr += '<li' + css + ' data-val="' + d[i].sortValue + '">' + d[i].sortText + '<i></i></li>';
            }

            ulstr = wrapper[0] + listr + wrapper[1];
            break;
          case "themes":
            // 主题
            for (; i < l; i++) {
              css = '';
              listr += '<li' + css + ' data-val="' + d[i].themeID + '">' + d[i].themeName + '</li>';
            }
            ulstr = wrapper[0] + listr + wrapper[1];
            break;
          default:
            // 默认，按普通数组处理
            for (; i < l; i++) {
              css = i == 0 ? ' class="cur"' : '';
              listr += '<li' + css + ' data-val="' + i + '">' + d[i] + '</li>';
            }
            /*for(var key in d){
             listr += '<li data-val="' + key + '">' + d[key] + '</li>';
             }*/
            ulstr = wrapper[0] + listr + wrapper[1];
            break;
        }
        // 根据type判断显示类型
        switch(t) {
          case 1:
            str = ulstr;
            break;
          case 2:
            str = '<div class="foot_screen_btn"><p class="cancel">取消</p><p class="clears">清空筛选</p><p class="sure">确定</p></div>';
            if (cache.length > 0) {
              str += '<div class="screen_box">';
              str += left[0] + cache.join('') + left[1];
              str += right[0] + ulstr + right[1];
              str += '</div>';
            } else {
              str += ulstr;
            }
            break;
          case 3:
            // 航空公司列表，单选
            str = ulstr;
            break;
          default:
            // 非单击类型
            str = '';
            break;
        }
        mysec.innerHTML = str;
        if (sec) {
          sec.appendChild(mysec);
        } else {
          this.createContainer();
          sec.appendChild(mysec);
        }
        return this;
      },

      current : function() {
        return box;
      },

      init : function() {
        var i = 1, key, args = [].slice.call(arguments), dlArray = [], that = this, time = 0;
        this.isInt = true;
        if (args.length > 0) {
          box = document.querySelector(args[0]);
        } else {
          if (!box)
            this.create();
          dlArray = document.querySelectorAll('footer dl')
          Array.prototype.slice.call(dlArray).forEach(function(ele, index){
            that.targetDlHandler(index,Number(ele.getAttribute('data-type')), ele)
            time++;
          })
          this.isInt = (time < dlArray.length)?true:false;
         // this.redTip();
        }
      },

      remove : function() {
        if (masker.style.display != "none") {
          masker.style.display = "none";
        }
        var node = sec.getElementsByTagName("section");
        // first
        if (node[0].className == "flight_company") {
          node[0].style.top = "";
          box.childNodes[0].style.backgroundColor = "";
        } else {
          node[0].style.bottom = "";
        }
        for (var i = 1; i < node.length; i++) {
          node[i].style.bottom = "";
          box.childNodes[i].style.backgroundColor = "";
        }
      },
      redTip:function(){
        var allLis = sec.querySelectorAll('.cur'), temObj = {}, dlArray = document.querySelectorAll('footer dl');
        Array.prototype.slice.call(allLis).forEach(function(element,index){
          if(element.parentNode.getAttribute('data-key')){
            temObj[element.parentNode.getAttribute('data-key')] = [];
          }
        });
        Array.prototype.slice.call(allLis).forEach(function(element,index){
          for(var p in temObj){
            if(p == element.parentNode.getAttribute('data-key')){
              temObj[element.parentNode.getAttribute('data-key')].push(element);
            }
          }
        });
        for(var p in temObj){
          var targetDl =  document.querySelector('#'+p), tag = false;
          tag = temObj[p].every(function (value) {
            var tTag = value.getAttribute('data-val');
            return  tTag==""||tTag=="0"||tTag=="economy"||tTag=="false"||tTag=="00-24"
             })
            if(tag){
              targetDl.querySelector('dt').className = "clo";
            }else{
              targetDl.querySelector('dt').className = "";
            }
        }
        Array.prototype.slice.call(dlArray).forEach(function(element,index){
          if(element.getAttribute('data-type')=="0"){
            element.querySelector('dt').className = element.getAttribute('data-titleitem')!=""?"":"clo"
          }
        })
      },
      noUlHandler:function(){
        var dlArray = document.querySelectorAll('footer dl'), oproObj = arguments[0];
        Array.prototype.slice.call(dlArray).forEach(function(ele){
          if(ele.getAttribute('data-type')=="0"){
            oproObj[ele.id] = {};
            oproObj[ele.id].FilterValues = ele.getAttribute('data-val');
          }
        })
        return oproObj
      },
      setChoo : function(w) {
        var wUl = document.querySelectorAll('.'+w.id),curLi=null, fst="";
        if(wUl.length!=1){return}
        curLi=wUl[0].querySelectorAll('li');
        fst = curLi[0].innerText;
        if (fst.indexOf("不限") > -1||fst.indexOf("经济舱") > -1) {
          curLi[0].className = 'cur choose';
        }else{
          curLi[0].className = '';
        }
        for (var j = 1; j < curLi.length; j++) {
          if (curLi[j].className == 'cur' || curLi[j].className == 'cur choose') {
            curLi[j].className = '';
          }
        }
      },
      targetDlHandler:function(){
        var targetDlItem = arguments[0]!=undefined?arguments[0]:this.dlItem,isArrayItem= 0, dlType = arguments[1]!=undefined?arguments[1]:this.dlType,
          dlArray = document.querySelectorAll('footer dl'), that = this,clickDl = null,temNum = 0,titleItem="", ulArray =[], type="", isTitleChange = "",maxRate = "", clearOtherDl = "";
        clickDl = dlArray[targetDlItem];
        this.clickDl = clickDl;
        this.isAddDl = clickDl.getAttribute('data-isAddDl');
        type = clickDl.getAttribute('data-type');
        isTitleChange = clickDl.getAttribute('data-istitlechange');
        isArrayItem = Number(clickDl.getAttribute('data-isArrayItem'));
        clearOtherDl = clickDl.getAttribute('data-clearotherdl');
        titleItem = clickDl.getAttribute('data-titleItem');
        maxRate = clickDl.getAttribute('data-titleMaxRate');
        ulArray = document.querySelectorAll('.'+ clickDl.id);
        var bottleDlTitle = function(){
          var  data = footer.data, resultTitle = "", cacheObj = null;
          for(var t in data){
            if(t == arguments[0]){
              cacheObj = data[t];
              if(that.isInt){
                var titleitem = arguments[2].getAttribute('data-titleitem');
                if(titleitem!=""){
                  resultTitle = cacheObj.candidateTitle[titleitem].sortText;
                  arguments[2].setAttribute('data-val',cacheObj.candidateTitle[titleitem].sortValue)
                }else{
                  resultTitle = cacheObj.defaultTitle.sortText;
                  arguments[2].setAttribute('data-val',cacheObj.defaultTitle.sortValue)
                }
              }else{
                if(arguments[4]=="reset"){
                  arguments[2].setAttribute('data-val',cacheObj.defaultTitle.sortValue);
                  arguments[2].setAttribute('data-titleitem',"");
                  resultTitle = cacheObj.defaultTitle.sortText;
                }else{
                  if(arguments[3]==1){
                    var curNum = Number(arguments[2].getAttribute('data-titleitem')),maxRate = cacheObj.candidateTitle.length-1;
                    curNum++;
                    (curNum>maxRate)?curNum = 0:"";
                    resultTitle = cacheObj.candidateTitle[curNum].sortText;
                    arguments[2].setAttribute('data-val',cacheObj.candidateTitle[curNum].sortValue);
                    arguments[2].setAttribute('data-titleitem',curNum);
                  }else{
                    if(arguments[1]!=null){
                      resultTitle = cacheObj.candidateTitle[arguments[1]].sortText;
                      arguments[2].setAttribute('data-val',cacheObj.candidateTitle[arguments[1]].sortValue)
                    }else{
                      resultTitle = cacheObj.defaultTitle.sortText;
                      arguments[2].setAttribute('data-val',cacheObj.defaultTitle.sortValue)
                    }
                  }
                }
              }
            }
          }
          return resultTitle;
        };
        if(ulArray.length ==0 ){
          if(isTitleChange == "1"&&maxRate !=""){
            if(titleItem == ""){
              titleItem = 0;
            }else{
              titleItem = Number(titleItem)+1<= Number(maxRate)?Number(titleItem)+1:Number(maxRate);
            }
            clickDl.querySelector('dd').innerHTML = bottleDlTitle(clickDl.id,titleItem,clickDl, isArrayItem);
            if(Number(clearOtherDl)<8){
              this.setChoo(dlArray[Number(clearOtherDl)]);
              dlArray[Number(clearOtherDl)].querySelector('dt').className = "clo";
              dlArray[Number(clearOtherDl)].querySelector('dd').innerHTML = bottleDlTitle(dlArray[Number(clearOtherDl)].id, null, dlArray[Number(clearOtherDl)], isArrayItem, "reset")
            }
          }
        }else if(ulArray.length ==1){
          var curLi =  ulArray[0].querySelectorAll('.cur');
          if(isTitleChange == "2"){
             if(curLi.length==1&&curLi[0].innerText!="不限"){
                clickDl.querySelector('dd').innerHTML = curLi[0].innerText;
             }else{
               clickDl.querySelector('dd').innerHTML = bottleDlTitle(clickDl.id,null,clickDl, "");
             }
          }
          if(Number(clearOtherDl)<8){
            this.setChoo(dlArray[Number(clearOtherDl)]);
            dlArray[Number(clearOtherDl)].querySelector('dt').className = "clo";
            dlArray[Number(clearOtherDl)].querySelector('dd').innerHTML = bottleDlTitle(dlArray[Number(clearOtherDl)].id, null, dlArray[Number(clearOtherDl)], isArrayItem, "reset")
          }

        }
      },
      request : function() {
        // 选中的属性
        var node = sec.getElementsByTagName("ul"), obj = {};
        this.targetDlHandler();
        this.redTip();
        for (var i = 0; i < node.length; i++) {
          if (node[i].getAttribute("data-key")){
            var cache = [], chk = node[i].getElementsByClassName("cur"), mykey = node[i].getAttribute("data-key");
            for (var j = 0; j < chk.length; j++) {
              cache.push(chk[j].getAttribute("data-val"));
            }
            if (mykey == "airways") {// 航空公司处理
              obj.airways = {
                airwaySetID : chk[0].getAttribute("airwaySetID"),
                airwayCacheID : chk[0].getAttribute("airwayCacheID")
              };
            } else if (mykey == "filters") {// 过滤处理
              if (obj[node[i].getAttribute("data-key")]) {
                obj[node[i].getAttribute("data-key")].push({
                  FilterType : node[i].getAttribute("data-type"),
                  FilterValues : cache
                });
              } else {
                obj[node[i].getAttribute("data-key")] = [];
                obj[node[i].getAttribute("data-key")].push({
                  FilterType : node[i].getAttribute("data-type"),
                  FilterValues : cache
                });
              }
            } else {
              obj[node[i].getAttribute("data-key")] = cache;
            }
          }
        }
        obj = this.noUlHandler(obj);
        footer.result = obj;
        this.remove();
        if (box.style.display == 'none') {
          box.style.display = 'block';
        }
        if (footer.callback) {
          this.isAddDl == "0"?footer.callback(obj):footer.callback(obj, this.clickDl);
        }
      },

      // 重置选中
      resec : function(w) {
        var cur = w.getElementsByClassName("cur");
        var ul = w.getElementsByTagName("ul");
        for (var i = 0; i < ul.length; i++) {
          if (ul[i].getAttribute("data-key")) {
            var li = ul[i].getElementsByTagName("li"), fst = li[0].innerHTML;
            // 第一个判断
            if (fst.indexOf("不限") > -1||fst.indexOf("经济舱") > -1) {
              li[0].className = 'cur choose';
            } else {
              if(li[0].className == 'cur'|| li[0].className == 'cur choose'){
                li[0].className = 'choose';
              }else{
                li[0].className = '';
              }
            }
            // 后续循环
            for (var j = 1; j < li.length; j++) {
              if(li[j].className == 'cur'|| li[j].className == 'cur choose'){
                li[j].className = 'choose';
              }else if(li[j].className == 'cur choose'){
                li[j].className = '';
              }
            }
          }
        }
      },
      showItems : function(n,t) {
        var that = this;
        if (t == 0) {
          that.request();
          return;
        }
        // 显示要筛选的列表内容
        if (sec) {
          if (t == 3) {
            // 航空公司
            if (sec.firstChild.style.top == "1.48rem") {
              this.remove();
              box.style.display = "block";
            } else {
              this.remove();
              sec.firstChild.style.top = "1.48rem";
              box.style.display = "none";
            }
          } else {
            if (masker.style.display == "none") {
              masker.style.display = "block";
              sec.childNodes[n].style.bottom = "0.98rem";
            } else {
              if (sec.childNodes[n].style.bottom == "0.98rem") {
                box.childNodes[n].style.backgroundColor = "";
                this.remove();
              } else {
                for (var i = 0; i < sec.childNodes.length; i++) {
                  if (sec.childNodes[i].style.bottom == "0.98rem") {
                    sec.childNodes[i].style.bottom = "";
                    //break;
                  }
                }
                sec.childNodes[n].style.bottom = "0.98rem";
              }
            }
          }
        } else {
          return "没找到section。";
        }
      }
    };

  return {
    menu : menu,
    filters : filters,
    results : results
  };
})();

