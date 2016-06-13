var footer = (function () {
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
    size = function (obj) {
      var size = 0, key;
      for (key in obj) {
        if (obj.hasOwnProperty(key))
          size++;
      }
      return size;
    },
  // 数字转换英文
    numToEn = function (n) {
      var en = new Array(" ", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine");
      n = isNaN(parseInt(n)) ? 0 : parseInt(n);
      return en[n];
    },
  // 添加样式
    addClass = function (c, node) {
      node.className = node.className + ' ' + c;
    },
  // 绑定事件
    on = function (node, type, handler) {
      node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },
  //菜单
    menu = function () {
      var basePath = basePath == undefined ? "http://" + window.location.host : basePath, hrefstr = window.location.href, _k, menus = {
        home: ['首页', basePath],
        user: ['我的', basePath + '/user/user.html']
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
      }
      //return this;
    },
  // 筛选
    filters = {
      bindEvent: function () {
        var that = this, dls = document.querySelectorAll('footer dl');
        //底部三按钮
        on(box, 'click', function(event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src, index, returnVal;
          while (target.tagName != "DL") {
            target = target.parentNode;
          }
          returnVal = target.getAttribute("data-type");
          for (var i = 0; i < dls.length; i++) {
            if (dls[i] == target) {
              index = i;
              break
            }
          }
          that.target = target;
          that.showItems(index, returnVal);
          /*		src = target.parentNode;
           //当前dom元素等于事件绑定的dom元素的时候，停止“冒泡”
           while (src && src !== box) {
           target = src;
           src = src.parentNode;
           }
           index = 0;
           returnVal = target.getAttribute("data-type");
           while ( target = target.previousSibling) {
           if (target.nodeType == 1)
           index++;
           };*/

          //	that.showItems(index, returnVal);
        });
        // 容器里的各种点击：取消，确定按钮
        on(sec, 'click', function (event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src, index, cur;
          src = target.parentNode;
          if (target.className == "cancel") {
            that.remove();
          } else if (target.className == "clears") {
            var node = src.parentNode;
            //previousSibling
            that.resec(node);
          } else if (target.className == "sure") {
            that.request();
          } else {
            if (target.tagName == "I") {
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
                while (target = target.previousSibling) {
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
                switch (sel) {
                  case 1:
                    //单选
                    var cur = src.getElementsByClassName("cur");
                    for (var i = 0; i < cur.length; i++) {
                      if (cur[i].className == "cur") {
                        cur[i].className = "";
                        break;
                      }
                    }
                    target.className = "cur";
                    break;
                  case 2:
                    //多选
                    if (src.firstChild.innerHTML == "不限") {//不限互斥
                      if (target == src.firstChild) {
                        for (var i = 0; i < cur.length; i++) {
                          if (cur[i].className == "cur") {
                            cur[i].className = "";
                            // break;
                          }
                        }
                        target.className = "cur";
                      } else {
                        target.className = target.className == "cur" ? "" : "cur";
                      }
                    } else {
                      target.className = target.className == "cur" ? "" : "cur";
                    }
                    break;
                  default:
                    //单击
                    break;
                }
                if (theme == 1 || theme == 3) {// 显示类型确认操作
                  console.log(111)
                  that.request();
                }
              }
            }
          }
        });
        // 遮罩层|返回按钮点击，包括隐藏
        on(document, 'click', function (event) {
          event = event || window.event;
          var target = event.target || event.srcElement, src = target.parentNode;
          if (target.className.indexOf("header_back") > -1 || src.className.indexOf("header_back") > -1) {
            if (masker.style.display == "none" && sec.firstChild.style.top == "1.48rem") {
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
            that.remove();
          }
        });
      },
      // 新建筛选：列表&菜单
      create: function () {
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
          box.style.background = '#4a4a4a';
          box.style.zIndex = 130;
          box.style.fontSize = '0.24rem';
        }
        var data = footer.data, ca = [];
        console.log(data)
        for (var p in data) {
          ca.push('<dl class=' + data[p].c + ' id=' + p + ' data-type=' + data[p].type + '><dt class="clo"></dt><dd>' + data[p].title + '</dd></dl>');
          this.createSec(data[p].s, data[p].c, data[p].type, data[p].key, data[p].listData);
        }
        box.innerHTML = ca.join('');
        document.body.appendChild(box);
        this.bindEvent();
        return this;
      },
      // container
      createContainer: function () {
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
      createMask: function () {
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
      createSec: function (s, c, t, k, d) {//this.createSec(data[p].s, data[p].c, data[p].type, data[p].key, data[p].listData);
        var str = '', ulstr = '', listr = '', i = 0, l = d.length, css = '', s = s ? s : 1, cache = [],
        // 容器
          wrapper = ['<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k + '">', '</ul>'],
        // 左侧容器
          left = ['<ul class="screen_lf">', '</ul>'],
        // 右侧容器
          right = ['<div class="screen_rg">', '</div>'],
        // 列表容器
          ulstr = '',
        // 新建section
          mysec = document.createElement('section');
        c ? mysec.className = c : null;
        switch (k) {
          case "airways":
            // 航空公司
            for (; i < l; i++) {
              css = d[i].additionalPrice == 0 ? ' class="cur"' : '';
              listr += '<li' + css + ' data-val="' + d[i].airwayCacheID + '" airwayCacheID="' + d[i].airwayCacheID + '" airwaySetID="' + d[i].airwaySetID + '"><div><img src="' + d[i].airwayLogo + '"></div><span class="airway_name">' + d[i].chineseName + '</span><div class="aw_price"><span>+￥</span><span>' + d[i].additionalPrice + '</span></div><b class="hft_icon"></b></li>';
            }
            ulstr = wrapper[0] + listr + wrapper[1];
            break;
          case "filters":
            // 筛选
            for (; i < l; i++) {
              var a = d[i], item = a.item, li = '';
              css = i == 0 ? ' class="cur"' : '';
              cache.push('<li' + css + ' data-filterType="' + a.filterType + '">' + a.title + '</li>');
              s = a.allowMultiSelect == 1 || a.allowMultiSelect == "1" ? 2 : 1;
              wrapper[0] = '<ul data-sel="' + s + '" data-theme="' + t + '" data-key="' + k + '" data-type="' + a.filterType + '">';
              for (var j = 0; j < item.length; j++) {
                var o = item[j];
                css = j == 0 ? ' class="cur"' : '';
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
            for (; i < l; i++) {
              css = i == 0 ? ' class="cur"' : '';
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
        switch (t) {
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
      chooseStatus: function () {
        var outerObj = {};
        if (typeof fSingleList == "undefined") {
          outerObj = fDoubleList;
        } else {
          outerObj = fSingleList;
        }
        if (!arguments[0]){
          if (outerObj.postObj.routeType == "return") { /*往返*/
            var ele = document.querySelector('#Screen');
            if (outerObj.postObj.cabinClass == "economy") { /*国际*/
              ele.querySelector('dt').className = "clo";
            } else {
              ele.querySelector('dt').className = "";
            }
            if (outerObj.postObj.internationalOrDomestic == "international") {/*往返国内处理*/
              document.querySelector('#Tax').querySelector('dt').className = ""
            } else {
              var ele_ = document.querySelector('#Sort'), sort_ul = document.querySelectorAll('.f_foot_sort li');
              for (var k = 0; k < sort_ul.length; k++) {
                if (sort_ul[k].getAttribute('data-val') == "isDesc_false") {
                  sort_ul[k].className = "cur";
                } else {
                  sort_ul[k].className = "";
                }
              }
              ele_.querySelector('dt').className = "";
            }
          } else {
            var ele = document.querySelector('#Screen');
            if (outerObj.postObj.cabinClass == "economy") { /*单程国际*/
              ele.querySelector('dt').className = "clo";
            } else {
              ele.querySelector('dt').className = "";
            }
            if (outerObj.postObj.internationalOrDomestic == "international") {/*单程国内处理*/
              document.querySelector('#Tax').querySelector('dt').className = ""
            } else {
              var ele_ = document.querySelector('#Sort'), sort_ul = document.querySelectorAll('.f_foot_sort li');
              for (var k = 0; k < sort_ul.length; k++) {
                if (sort_ul[k].getAttribute('data-val') == "isDesc_false") {
                  sort_ul[k].className = "cur";
                } else {
                  sort_ul[k].className = "";
                }
              }
              ele_.querySelector('dt').className = "";
            }
          }
          return false;
        }
        var section = document.querySelector('section.' + arguments[0].className), te0 = null, te1 = null, tem2 = null, dt, dd;
        console.log(section)
        dt = arguments[0].querySelector('dt');
        dd = arguments[0].querySelector('dd');
        if (outerObj.postObj.routeType == "return") { /*往返*/
          if (outerObj.postObj.internationalOrDomestic == "international") {/*往返国际*/
            if (section.className == "f_foot_sort") {
              te0 = section.querySelectorAll('li');
              dt.className = "clo";
              dd.innerHTML = "优选";
              for (var i = 0; i < te0.length; i++) {
                if (i != 0 && te0[i].className.indexOf("cur") > -1) {
                  dt.className = "";
                  dd.innerHTML = te0[i].innerText;
                  break;
                }
              }
            } else if (section.className == "foot_screen") {
              te0 = section.querySelectorAll('li.cur');
              if (te0[1].getAttribute('data-val') != "false" || te0[2].getAttribute('data-val') != "false" || te0[3].getAttribute('data-val') != "economy") {
                dt.className = "";
              } else {
                dt.className = "clo";
              }
            } else {
              dd.innerHTML = dd.innerHTML == "含税价" ? "不含税价" : "含税价"
            }
          } else {  /*往返国内*/
            if (section.className == "f_foot_sort") {
              te0 = section.querySelectorAll('li');
              for (var i = 0; i < te0.length; i++) {
                if (te0[i].className.indexOf("cur") > -1) {
                  dt.className = "";
                  dd.innerHTML = te0[i].innerText;
                  break;
                }
              }
            } else if (section.className == "foot_screen") {
              te0 = section.querySelectorAll('li.cur');
              if (te0[1].getAttribute('data-val') != "false" || te0[2].getAttribute('data-val') != "false" || te0[3].getAttribute('data-val') != "00-24" || te0[4].getAttribute('data-val') != "economy") {
                dt.className = "";
              } else {
                dt.className = "clo";
              }
            } else {
              if (dd.innerHTML == "价格") {
                dd.innerHTML = "从低到高";
                dt.className = "";
              } else {
                dd.innerHTML = "价格";
                dt.className = "clo";
              }
            }
          }
        } else {/*单程*/
          if (outerObj.postObj.internationalOrDomestic == "international") {/*单程国际*/
            if (section.className == "f_foot_sort") {
              te0 = section.querySelectorAll('li');
              dt.className = "clo";
              dd.innerHTML = "优选";
              for (var i = 0; i < te0.length; i++) {
                if (i != 0 && te0[i].className.indexOf("cur") > -1) {
                  dt.className = "";
                  dd.innerHTML = te0[i].innerText;
                  break;
                }
              }
            } else if (section.className == "foot_screen") {
              te0 = section.querySelectorAll('li.cur');
              if (te0[1].getAttribute('data-val') != "false" || te0[2].getAttribute('data-val') != "false" || te0[3].getAttribute('data-val') != "economy"||te0[4].getAttribute('data-val') != "") {
                dt.className = "";
              } else {
                dt.className = "clo";
              }
            } else {
              dd.innerHTML = dd.innerHTML == "含税价" ? "不含税价" : "含税价"
            }
          } else {  /*单程国内*/
            if (section.className == "f_foot_sort") {
              te0 = section.querySelectorAll('li');
              for (var i = 0; i < te0.length; i++) {
                if (te0[i].className.indexOf("cur") > -1) {
                  dt.className = "";
                  dd.innerHTML = te0[i].innerText;
                  break;
                }
              }
            } else if (section.className == "foot_screen") {
              te0 = section.querySelectorAll('li.cur');
              if (te0[1].getAttribute('data-val') != "false" || te0[2].getAttribute('data-val') != "false" || te0[3].getAttribute('data-val') != "00-24" || te0[4].getAttribute('data-val') != "economy" ||te0[5].getAttribute('data-val') != "") {
                dt.className = "";
              } else {
                dt.className = "clo";
              }
            } else {
              if (dd.innerHTML == "价格") {
                dd.innerHTML = "从低到高";
                dt.className = "";
              } else {
                dd.innerHTML = "价格";
                dt.className = "clo";
              }
            }
          }

        }
      },

      current: function () {
        return box;
      },

      init: function () {
        var i = 1, key, args = [].slice.call(arguments);
        if (args.length > 0) {
          box = document.querySelector(args[0]);
        } else {
          if (!box)
            this.create();
            this.chooseStatus();
        }
      },

      remove: function () {
        if (masker.style.display != "none") {
          masker.style.display = "none";
        }
        var node = sec.getElementsByTagName("section");
        node[0].className == "flight_company" ? node[0].style.top = "" : node[0].style.bottom = "";
        for (var i = 1; i < node.length; i++) {
          node[i].style.bottom = "";
        }
      },
      request: function () {
        // 选中的属性
        var node = sec.getElementsByTagName("ul"), obj = {};
        for (var i = 0; i < node.length; i++) {
          if (node[i].getAttribute("data-key")) {
            var cache = [], chk = node[i].getElementsByClassName("cur"), mykey = node[i].getAttribute("data-key");
            for (var j = 0; j < chk.length; j++) {
              cache.push(chk[j].getAttribute("data-val"));
            }
            if (mykey == "airways") {// 航空公司处理
              obj.airways = {
                airwaySetID: chk[0].getAttribute("airwaySetID"),
                airwayCacheID: chk[0].getAttribute("airwayCacheID")
              };
            } else if (mykey == "filters") {// 过滤处理
              if (obj[node[i].getAttribute("data-key")]) {
                obj[node[i].getAttribute("data-key")].push({
                  FilterType: node[i].getAttribute("data-type"),
                  FilterValues: cache
                });
              } else {
                obj[node[i].getAttribute("data-key")] = [];
                obj[node[i].getAttribute("data-key")].push({
                  FilterType: node[i].getAttribute("data-type"),
                  FilterValues: cache
                });
              }
            } else {
              obj[node[i].getAttribute("data-key")] = cache;
            }
          }
        }
        footer.result = obj;
        this.remove();
        if (box.style.display == 'none') {
          box.style.display = 'block';
        }
        this.chooseStatus(filters.target, obj);
        footer.callback(obj, filters.target);
      },
      // 重置选中
      resec: function (w) {
        var cur = w.getElementsByClassName("cur");
        /*for (var i = 0; i < cur.length; i++) {
         cur[i].className=='cur'?cur[i].className = '':null;
         }*/
        var ul = w.getElementsByTagName("ul");
        for (var i = 0; i < ul.length; i++) {
          if (ul[i].getAttribute("data-key")) {
            var li = ul[i].getElementsByTagName("li"), fst = li[0].innerHTML;
            // 第一个判断
            if (fst.indexOf("不限") > -1 || fst.indexOf("经济舱") > -1) {
              li[0].className = 'cur';
            } else {
              li[0].className = '';
            }
            // 后续循环
            for (var j = 1; j < li.length; j++) {
              li[j].className == 'cur' ? li[j].className = '' : null;
            }
          }
        }
      },
      showItems: function (n, t) {
        var that = this;
        if (t == 0) {
          that.request("void");
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
    menu: menu,
    filters: filters,
    results: results
  };
})();

