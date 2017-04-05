(function () {
    var _b, _d, _t, _json, box, instance, input, masker, suggest,
    config = {
        data_req : {'Parameters':{},'ForeEndType':3,'Code':''},
        para : {
            b:['inter','domes'],/*国际，国内*/
            d:['dep','des'],/*出发，目的*/
            f: [0,30100005],/*机票从js文件获取*/
            fh: [50100008,50100010],
            fht: [60100001,60100014],
            h: [10100014,10100012,10100013],/*全部，国际，国内*/
            ht: [40100010,40100011],
            t: [20100014,20100013]
        }
    }, tips = {
        GEO_UNKNOWN_DATA:"尚无旅行产品,请切换其他城市。",
        GEO_UNKNOWN_ERROR:"由于未知原因，无法获取地理定位信息，请重新尝试。",
        GEO_PERMISSION_DENIED:"您的当前位置不可用,请开启设备上的\"定位服务\"。",
        GEO_TIMEOUT:"获取信息超时，请重新尝试。",
        GEO_POSITION_UNAVAILABLE:"由于网络或信号等问题，地理定位失败，请检查网络或信号。"
    }, Citylist_H = function (a,b) {
        return a.pingYin.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0) - b.pingYin.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0);
    }, _init = function () {
      _json = [].slice.call(arguments,0)[0];
      var arg = _json.data.split('_');
        /*开始初始化，默认国际+目的地*/
        if(arg.length<1){
        	alert('参数不足');
        	return true;
        }else if(arg.length==1){
        	_t = arg[0];
        	_b = config.para.b[0];
        	_d = config.para.d[1];
        }else if(arg.length==2){
        	_t = arg[0];
        	_d = arg[1];
        	_b = config.para.b[0];
        }else{
        	_t = arg[0];
        	_d = arg[1];
        	_b = arg[2];
        }
        if (!instance) {
            createContainer();
        }
        var len = config.para[_t].length;
        for(var i=0;i<len;i++){
            if (localStorage.getItem('At-CC-'+_t+i)) {
                var json = (_t=="fh"&&i==0)?JSON.parse(localStorage.getItem('At-CC-'+_t+'-'+_d)):JSON.parse(localStorage.getItem('At-CC-'+_t+i));
            		DrawCity(json,i);
            } else {
                _getpara(i);
            }
        }
        showInstance();
        showItems(_b);
        Adapter.Location();
    },
    bindEvent=function() {
        var that = this;
        $('.citybox_search_input').bind('keyup',debounce(function(){
          var str = '', key = $(this).val(),
          list = document.getElementById('citybox_'+_d).querySelectorAll('.citybox_content_item'),
          pattern = new RegExp("[\\u4E00-\\u9FFF]+","g");
          if(key.length==0||key==''){
            suggest.innerHTML = '';
          }else{
            if (pattern.test(key)) {
              str = '';
              for(var i=0;i<list.length;i++){
                if(list[i].getAttribute('data-name').indexOf(key)>-1){
                  str += '<li class="citybox_content_item" data-code="' + list[i].getAttribute('data-code') + '" data-name="' + list[i].getAttribute('data-name') + '" data-countrycode="' + list[i].getAttribute('data-countryCode') + '"><i class="icon"></i>' + list[i].getAttribute('data-name') + '</li>';
                }
              }
            } else {
              str = '';
              for(var i=0;i<list.length;i++){
                if(list[i].getAttribute('data-py').indexOf(key)>-1||list[i].getAttribute('data-code').indexOf(key)>-1||list[i].getAttribute('data-countrycode').indexOf(key)>-1){
                  str += '<li class="citybox_content_item" data-code="' + list[i].getAttribute('data-code') + '" data-name="' + list[i].getAttribute('data-name') + '" data-countrycode="' + list[i].getAttribute('data-countryCode') + '"><i class="icon"></i>' + list[i].getAttribute('data-name') + '</li>';
                }
              }
            }
            suggest.innerHTML = str;
          }
          suggest.style.display = 'block';
          }, 300, false));
        //代理
        $("#instance").bind('click.plugins', function(event) {
        //on(instance, 'click.my_event', function(event) {
			event = event || window.event;
			var returnVal, index = 0, target = event.target || event.srcElement,str = '',
			src = target.parentNode, grand = src.parentNode;
			if (target.className.indexOf("header_back") > -1 || src.className.indexOf("header_back") > -1) {
				if (masker.style.display == "none" && suggest.style.display != "none") {
					showSuggest(0);
					/*阻止默认链接跳转*/
					if (event && event.preventDefault) {
						event.preventDefault();
					} else {
						window.event.returnValue = false;
					}
					return false;
				}else{
					showInstance();
				}
			}
			/*头部输入*/
			if (target.className.indexOf("citybox_search_relative")>-1 || src.className.indexOf("citybox_search_relative")>-1){
				if(masker.style.display!="block"){showSuggest(1);}
        input.focus();
			}
			/*头部输入消除*/
			if (target.className.indexOf("citybox_searchactive_return")>-1 || src.className.indexOf("citybox_searchactive_return")>-1){
				input.value = '';
				showSuggest(1);
			}
			if (target==masker){
				input.value = '';
				showSuggest(0);
			}
			//tag标签
    	if(target.id.indexOf("citybox_tag_") > -1){
    		if(target.className.indexOf('on')>-1){
    			//alert('on');
    		}else{
    			showItems(target.id.substr(-5));
    		}
    	}
    	/*城市*/
			if(target.className.indexOf('citybox_content_item')>-1){
				closure(target);
			}
			if(src.className.indexOf("citybox_content_item")>-1){
				closure(src);
			}
			if(src==suggest){
				closure(target);
			}
			/*右侧索引*/
			if(target.className.indexOf('citybox_summary_item')>-1){
				var key = target.getAttribute("data-key"), div = grand.getElementsByTagName('div'), dom;
				if(key.length>1){
					dom = '#js_'+key;
				}else{
					for(var j=0;j<div.length;j++){
						if(div.item(j).getAttribute("data-key")=='js_'+key){
							dom = div.item(j);
							break;
						}
					}
				}
				if(dom){
					switch(key){
		            	case 'loc':
		            	str = '当前';
		            	break;
		            	case 'his':
		            	str = '历史';
		            	break;
		            	case 'hot':
		            	str = '热门';
		            	break;
		            	default:
		            	str = key;
		            }
					letter.innerHTML = str;
          // letter.className = "citybox_letter show";
					$(letter).addClass("show");
          letter.addEventListener('animationend', function () {
              this.className = 'citybox_letter';
          });
					i = $(dom).offset().top - ($("html").css("font-size").replace("px", "") * 0.88) + $(".citybox_container").scrollTop();
					$(".citybox_container").scrollTop(i);
				}
			}

        });
	},
	/*页面的按钮点击，包括输入框*/
	bindDoc = function(){
        $("body").children().click(function () {});  //解决iPhone safari中Document事件不触发
        $("body").bind('click.box_event', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement, src = target.parentNode;
			/*来源*/
			if (target.getAttribute('data-bind')){
				var json = getBindData(target);
				if(json.type=='setCityBox'){
					_init(json);
				}
			}
		});
	},
	/* 容器添加 */
	createContainer = function() {
		if (!instance) {
			instance = document.createElement('div');
			instance.id = 'instance';
			instance.className = 'citybox_wrapper';
      instance.style.display = "none";
			box = document.createElement('div');
			box.className = 'citybox_container';
			instance.appendChild(box);
			/*查询遮罩*/
			masker = document.createElement('div');
			masker.className = 'citybox_masker';
			masker.id = 'citybox_masker';
			instance.appendChild(masker);
			/*查询结果*/
			suggest = document.createElement('ul');
			suggest.className = 'citybox_search_suggest';
			suggest.id = 'citybox_suggest';
			instance.appendChild(suggest);
			/*头部查询*/
			var header = document.createElement('div');
			header.className = 'citybox_header';
			header.innerHTML = '<a href="javascript:;" class="header_back"><i class="icon_back"></i></a><div class="citybox_search_bg"></div><div class="citybox_search_relative"><span class="citybox_search_icon"></span><input type="search" class="citybox_search_input" placeholder="中文/英文"></div>';
			box.appendChild(header);
			var top = document.createElement('div');
			top.style.display = "block";
			top.style.width = '100%';
			top.style.height = '0.88rem';
			box.appendChild(top);
			/*国外内标签*/
			var tag = document.createElement('div');
			tag.className = 'citybox_tag';
			tag.id = 'citybox_tag';
			tag.innerHTML = '<a id="citybox_tag_inter" class="">国际</a><a id="citybox_tag_domes" class="">国内</a>';
			box.appendChild(tag);
			/*当前*/
			var loccity = document.createElement('div');
			loccity.className = 'citybox_relative';
			loccity.innerHTML = '<div class="citybox_content_title" id="js_loc">当前</div><ul class="citybox_content_container" id="citybox_location"></ul>';
			box.appendChild(loccity);
			/*历史*/
			var history = document.createElement('div');
			history.className = 'citybox_relative';
			history.id = 'citybox_history';
      if(localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d)){
        history.style.display = 'block';
      }else{
        history.style.display = 'none';
      }
			history.innerHTML = '<div class="citybox_content_title" id="js_his">历史选择</div><ul class="citybox_content_container" id="citybox_his_inter"></ul><ul class="citybox_content_container" id="citybox_his_domes"></ul>';
			box.appendChild(history);
			/*热门*/
			var hotcity = document.createElement('div');
			hotcity.className = 'citybox_relative';
			hotcity.id = 'citybox_hot';
			hotcity.innerHTML = '<div class="citybox_content_title" id="js_hot">热门城市</div><ul class="citybox_content_container" id="citybox_hot_inter"></ul><ul class="citybox_content_container" id="citybox_hot_domes"></ul>';
			box.appendChild(hotcity);
			/*出发，目的容器*/
			var dep = document.createElement('div');
			dep.className = 'citybox_boxer';
			dep.id = 'citybox_dep';
			dep.innerHTML = '<div class="citybox_relative" id="citybox_dep_list_inter"></div><div class="citybox_relative" id="citybox_dep_list_domes"></div>';
			box.appendChild(dep);
			var des = document.createElement('div');
			des.className = 'citybox_boxer';
			des.id = 'citybox_des';
			des.innerHTML = '<div class="citybox_relative" id="citybox_des_list_inter"></div><div class="citybox_relative" id="citybox_des_list_domes"></div>';
			box.appendChild(des);
			/*索引*/
			letter = document.createElement('div');
			letter.className = 'citybox_letter';
			letter.id = 'citybox_letter';
			box.appendChild(letter);
			/*索引列表，国外内各一个*/
			document.body.appendChild(instance);
			input = document.querySelector('.citybox_search_input');
			bindEvent();
		}
	},
	/*完成操作*/
	closure = function(dom) {
		var res = {
			cityCode : dom.getAttribute('data-code'),
			cityName : dom.getAttribute('data-name'),
			countryCode : dom.getAttribute('data-countrycode')
		}, d = [];
		//prefix+type+inter|domes+dep|des
    if(localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d)){
      d = JSON.parse(localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d));
    }
    if(!findInObj(d,res.cityCode)){
      d[d.length] = res;
    }
    localStorage.setItem('At-CH-'+_t+'-'+_b+'-'+_d,JSON.stringify(d));
    if(_json.returnAttr=="value"&&_json.returnId){
      $(_json.returnId).html(res.cityName);
      $(_json.returnId).attr("data-code",res.cityCode);
    }else{
      // 暂时随便搞
      var cac = {ht:'tour',t:'scenic'};
      window.location.href ='../../'+ cac[_t]+'/scenic_list.html?DestCityCode='+res.cityCode;
    }
    showInstance();
	},
	/* 绘制城市内容
	 * 组件类型
	 */
	DrawCity = function(data, s) {
        /* _t,_b,_d */
        var css = "item",d,
        // 出发地和目的地
        cache = (localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d))?['loc','his','hot']:['loc','hot'],
        // 左侧索引定位
        leftindex = ['<div class="citybox_content_title" data-key="js_','">', '</div>'],
        // 左侧容器citybox_content_lettercitylist
        leftul = ['<ul class="citybox_content_lettercitylist">', '</ul>'];
        /* 全部国际国内 */
        switch(_t){
        case 'f':
        	if(s==0){
		        for(var j=0;j<2;j++){
		        	var left = '', cnstr = '', enstr = '', index = '', ci = cache,
		        	dt = j==0?data.internationalCities:data.domesticCities;
		        	for(var k in dt) {
		        		ci[ci.length] = k;
		        		d = dt[k];//[String.fromCharCode(65+i)];
		        		left += leftindex[0] + k + leftindex[1] + k + leftindex[2] + leftul[0];
			        	for (var i=0; i < d.length; i++) {
			        		left += '<li class="citybox_content_'+css+'" data-py="'+d[i].pingYin+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityNameCn + '" data-countrycode="' + d[i].countryId + '">' + d[i].cityNameCn + '</li>';
			        	}
			        	left += leftul[1];
		        	}
	        		document.getElementById('citybox_'+_d+'_list_'+config.para.b[j]).innerHTML = left
	        		DrawIndex(ci,config.para.b[j]);
		        }
	        }else{
		        /*
				cityChineseName:"上海"
				cityCode:"SHA"
				cityEnglishName:"Shanghai"
				countryChineseName:"中国"
				countryCode:"CN"
				countryEnglishName:"China"
				fullSpellingName:"ShangHai"*/
				var enstr = '', cnstr = '';
				d = data.cities;
				for (var i=0; i < d.length; i++) {
					if(d[i].countryCode=='CN'){
						cnstr += '<li class="citybox_content_'+css+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityChineseName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityChineseName + '</li>';
					}else{
						enstr += '<li class="citybox_content_'+css+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityChineseName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityChineseName + '</li>';
					}
				}
	    		document.getElementById('citybox_hot_inter').innerHTML = enstr;
	        	document.getElementById('citybox_hot_domes').innerHTML = cnstr;
	        }
	    break;
	    case 'fh':
			var  cstr = '', enstr = '', cnstr = '', cn='' ,en = '',
			i=0, ci = cache,ei = cache, cstr = '';console.log(data);
	    	if(s==0){
	    		/*fullSpellingName*/
	    		d = data.citys;
	    		for (; i < d.length; i++) {
        			cstr = '<li class="citybox_content_'+css+'" data-py="'+d[i].fullSpellingName+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityNormalName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityNormalName + '</li>';
	    			if(d[i].countryCode=='CN'){
						if(cn != d[i].fullSpellingName.substr(0,1).toUpperCase()){
							if(cn==''){
								cn = d[i].fullSpellingName.substr(0,1).toUpperCase();
								cnstr += leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
							}else{
								cn = d[i].fullSpellingName.substr(0,1).toUpperCase();
								cnstr += leftul[1] + leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
							}
							ci[ci.length] = cn;//ci.push(cn);
						}else{
							cnstr += cstr;
						}
					}else{
						if(en != d[i].fullSpellingName.substr(0,1).toUpperCase()){
							if(en==''){
							en = d[i].fullSpellingName.substr(0,1).toUpperCase();
								enstr += leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
							}else{
							en = d[i].fullSpellingName.substr(0,1).toUpperCase();
								enstr += leftul[1] + leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
							}
							ei.push(en);
						}else{
							enstr += cstr;
						}
        			}
	    		}
	    		var my = data.cityType==1 ? "dep":"des";
    			if(en!=''){
    				document.getElementById('citybox_'+my+'_list_inter').innerHTML = enstr+leftul[1];
    				DrawIndex(ei,'inter');
    			}
    			if(cn!=''){
    				document.getElementById('citybox_'+my+'_list_domes').innerHTML = cnstr+leftul[1];
    				DrawIndex(ci,'domes');
    			}
				/*CityType: 1:出发，2：目的*/
	    	}else{
	    		var dc = data.hotCitysCN,de = data.hotCitysInternational;
	    		for (; i < dc.length; i++) {
					cnstr += '<li class="citybox_content_'+css+'" data-code="' + dc[i].cityCode + '" data-name="' + dc[i].cityName + '" data-countrycode="' + dc[i].countryCode + '">' + dc[i].cityNormalName + '</li>';
				}
				for (i=0; i < de.length; i++) {
					enstr += '<li class="citybox_content_'+css+'" data-code="' + de[i].cityCode + '" data-name="' + de[i].cityName + '" data-countrycode="' + de[i].countryCode + '">' + de[i].cityNormalName + '</li>';
				}
				document.getElementById('citybox_hot_inter').innerHTML = enstr;
	        	document.getElementById('citybox_hot_domes').innerHTML = cnstr;
	    	}
	    break;
	    case 'fht':
	    	if(s==0){
	    		/*FullSpellingName*/
	    		for(var j=0;j<2;j++){
	    		var enstr = '', cnstr = '', cn = '', en = '', listr = '',ei = cache,ci = cache,cstr = '';
	    			d = j==0?data.departCities:data.destCities;
		    		for (var i=0; i < d.length; i++) {
	        			cstr = '<li class="citybox_content_'+css+'" data-py="'+d[i].fullSpellingName+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityNormalName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityNormalName + '</li>';
		    			if(d[i].countryCode=='CN'){
							if(cn != d[i].fullSpellingName.substr(0,1).toUpperCase()){
								if(cn==''){
									cn = d[i].fullSpellingName.substr(0,1).toUpperCase();
									cnstr += leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
								}else{
									cn = d[i].fullSpellingName.substr(0,1).toUpperCase();
									cnstr += leftul[1] + leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
								}
								ci[ci.length] = cn;//ci.push(cn);
							}else{
								cnstr += cstr;
							}
						}else{
							if(en != d[i].fullSpellingName.substr(0,1).toUpperCase()){
								if(en==''){
								en = d[i].fullSpellingName.substr(0,1).toUpperCase();
									enstr += leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
								}else{
								en = d[i].fullSpellingName.substr(0,1).toUpperCase();
									enstr += leftul[1] + leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
								}
								ei.push(en);
							}else{
								enstr += cstr;
							}
	        			}
		    		}
		    		//console.log(j+','+en+','+cn+','+config.para.d[j]);
					if(en!=''){document.getElementById('citybox_'+config.para.d[j]+'_list_inter').innerHTML = enstr+leftul[1];
		    			DrawIndex(ei,'inter');
		    		}
	    			if(cn!=''){
	    				document.getElementById('citybox_'+config.para.d[j]+'_list_domes').innerHTML = cnstr+leftul[1];
		    			DrawIndex(ci,'domes');
		    		}
		    	}
	    	}else{
	    		var enstr = '', cnstr = '', dc = data.hotCitysCN,de = data.hotCitysInternational;
	    		for (; i < dc.length; i++) {
					cnstr += '<li class="citybox_content_'+css+'" data-code="' + dc[i].cityCode + '" data-name="' + dc[i].cityName + '" data-countrycode="' + dc[i].countryCode + '">' + dc[i].cityName + '</li>';
				}
				for (i=0; i < de.length; i++) {
					enstr += '<li class="citybox_content_'+css+'" data-code="' + de[i].cityCode + '" data-name="' + de[i].cityName + '" data-countrycode="' + de[i].countryCode + '">' + de[i].cityName + '</li>';
				}
				document.getElementById('citybox_hot_inter').innerHTML = enstr;
	        	document.getElementById('citybox_hot_domes').innerHTML = cnstr;

	    	}
	    break;
	    case 'h':
/*国际国内数据不分
cityChineseName:"首尔"
cityCode:"SEL"
cityEnglishName:"Seoul"
countryChineseName:"韩国"
countryCode:"KR"
countryEnglishName:"Korea"
fullSpellingName:"*/
			var enstr = '', cnstr = '', cn = '', en = '', listr = '', i=0,ei = cache,ci = cache,cstr = '';
        	/*默认内容添加*/
			if(s==0){
        		d = data.sort(Citylist_H);
        		for (; i < d.length; i++) {
        			cstr = '<li class="citybox_content_'+css+'" data-py="'+d[i].pingYin+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityNameCN + '" data-countrycode="' + d[i].countryISOCode + '">' + d[i].cityNameCN + '</li>';
        			if(d[i].countryISOCode=='CN'){
						if(cn != d[i].pingYin.substr(0,1).toUpperCase()){
							if(cn==''){
								cn = d[i].pingYin.substr(0,1).toUpperCase();
								cnstr += leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
							}else{
								cn = d[i].pingYin.substr(0,1).toUpperCase();
								cnstr += leftul[1] + leftindex[0] + cn + leftindex[1] + cn + leftindex[2] + leftul[0] + cstr;
							}
							ci[ci.length] = cn;//ci.push(cn);
						}else{
							cnstr += cstr;
						}
					}else{
						if(en != d[i].pingYin.substr(0,1).toUpperCase()){
							if(en==''){
							en = d[i].pingYin.substr(0,1).toUpperCase();
								enstr += leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
							}else{
							en = d[i].pingYin.substr(0,1).toUpperCase();
								enstr += leftul[1] + leftindex[0] + en + leftindex[1] + en + leftindex[2] + leftul[0]+cstr;
							}
							ei.push(en);
						}else{
							enstr += cstr;
						}
        			}
        		}
    			document.getElementById('citybox_des_list_inter').innerHTML = enstr+leftul[1];
    			DrawIndex(ei,'inter');
    			document.getElementById('citybox_des_list_domes').innerHTML = cnstr+leftul[1];
    			DrawIndex(ci,'domes');
        	}else{
        		d = data;
				for (; i < d.length; i++) {
					listr += '<li class="citybox_content_'+css+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityChineseName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityChineseName + '</li>';
				}
	    		if(s==1){
	        		document.getElementById('citybox_hot_inter').innerHTML = listr;
	        	}else{
	        		document.getElementById('citybox_hot_domes').innerHTML = listr;
	        	}
	        }
	    break;
	    default:/*t||ht*/
	        for(var j=0;j<2;j++){
	        	var left = '', index = '', listr = '', i = 0, ci = cache;
	        	d = j==0?data.internationalCities:data.domesticCities
	        	/*数组是否需要排序？*/
	        	//d.sort(FtCitylist);
	        	for (; i < d.length; i++) {
	        		/*默认内容添加*/
	        		var cstr = '<li class="citybox_content_'+css+'" data-py="'+d[i].cityNameInitial+'" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityName + '</li>';
	        		listr += cstr;
	        		if(s==0){
						if(index != d[i].cityNamePY.substr(0,1).toUpperCase()){
							if(index==''){
								index = d[i].cityNamePY.substr(0,1).toUpperCase();
								left += leftindex[0] + index + leftindex[1] + index + leftindex[2] + leftul[0] + cstr;
							}else{
								index = d[i].cityNamePY.substr(0,1).toUpperCase();
								left += leftul[1] + leftindex[0] + index + leftindex[1] + index + leftindex[2] + leftul[0] + cstr;
							}
							ci.push(index);
						}else{
							left += cstr;
						}
	        		}
	        	}
        		if(s==0){
        			document.getElementById('citybox_'+_d+'_list_'+config.para.b[j]).innerHTML = left+leftul[1];
        			DrawIndex(ci,config.para.b[j]);
	        	}else{
	        		document.getElementById('citybox_hot_'+config.para.b[j]).innerHTML = listr;
	        	}
	        }
        break;
        }
	},
    /*
     * 根据type判断显示类型，酒店分为国际国内，其它栏目都是在组件内选择
     * fh&fht:departCities,destCities 出发，目的
     * ht&t:InternationalCities,DomesticCities 目的
     * h
     */
	DrawIndex = function(d,b){
        var sec = document.getElementById('citybox_'+_d+'_list_'+b),
        rightul = sec.querySelector('.citybox_index')?sec.querySelector('.citybox_index'):document.createElement('ul'),
        str='',s,rli = ['<li class="citybox_summary_item" data-key="','">', '</li>'];
        for(var i=0;i<d.length;i++) {
            switch(d[i]){
            	case 'loc':
            	s = '当前';
            	break;
            	case 'his':
            	s = '历史';
            	break;
            	case 'hot':
            	s = '热门';
            	break;
            	default:
            	s = d[i];
            }

            str += rli[0]+d[i]+rli[1]+s+rli[2];
        }
        rightul.className = 'citybox_index';
        rightul.innerHTML = str;
        if (sec) {
          sec.appendChild(rightul);
        } else {
          createContainer();
          sec.appendChild(rightul);
        }
        /*while ( target = target.previousSibling) {
            if (target.nodeType == 1) {
              index++;
            }
		}*/
  }, getBindData = function(dom) {
      if(!dom)return;
      var data = dom.getAttribute("data-bind");
      return !!data && (new Function("return ({" + data + "})"))();
    },
    Adapter = {
      Location:function(){
        $("#citybox_location").html('<li class="citybox_content_word">正在定位...</li>');
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(e) {
            Adapter.LocationSuccess({
            lat: e.coords.latitude,
            lng: e.coords.longitude
            });
          }, function(e) {
            Adapter.LocationError(e);
          },{
            enableHighAccuracy: true, // 是否获取高精度结果
            timeout: 6000, //超时,毫秒
            maximumAge: 0 //可以接受多少毫秒的缓存位置
          });
        }else{
          $("#citybox_location").html('<li class="citybox_content_word">抱歉！您的浏览器无法使用地位功能</li>');
        }
      },
      LocationSuccess:function(param){
        var latlon = param.lat+','+param.lng;
        var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN';
        $.ajax({
            type: "GET",
            url: url,
            beforeSend: function(){
                $("#citybox_location").html('<li class="citybox_content_word">正在定位...</li>');
            },
            success: function (json) {
                if(json.status=='OK'){
                    var results = json.results;
                    $.each(results,function(index,array){
                        if(index==0){
                          console.log(array);//$("#citybox_location").html(array['formatted_address']);
                          $("#citybox_location").html('<li class="citybox_content_word">'+array['formatted_address']+'<li>');
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#citybox_location").html('<li class="citybox_content_word">'+latlon+"地址位置获取失败</li>");
            }
        });
      },
      LocationError:function(e){
        //var josn = _t=="fh"?JSON.parse(localStorage.getItem('At-CC-'+_t+'-'+_d)):JSON.parse(localStorage.getItem('At-CC-'+_t+'0'));
        //console.log(josn);
        seriesLoadScripts('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
          var city = remote_ip_info['city'];
          /*var newArr = josn.filter(function(item){
            return item.cityName == city||cityNameCn==city||cityNameCn==city;
          });
          console.log(newArr);*/
          $("#citybox_location").html('<li class="citybox_content_local">'+city+"</li>");
          // return true;
        });
        /*switch(e.code) {
          case 1://用户拒绝
            alert(tips.GEO_PERMISSION_DENIED);
            break;
          case 2://地理位置获取失败（可能是用户没网或卫星搜不到等原因）
            alert(tips.GEO_POSITION_UNAVAILABLE);
            break;
          case 3://地理位置获取超时
            if(!Adapter.CurrentNetLocation) alert(tips.GEO_TIMEOUT);
            break;
          default://其他出错原因
            alert(tips.GEO_UNKNOWN_ERROR);
            break;
        }*/
      }
    },/* 重置历史 */
	resetHR = function(b) {
		if(localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d)){
			document.getElementById('citybox_history').style.display = 'block';
      var i=0,str='',d = JSON.parse(localStorage.getItem('At-CH-'+_t+'-'+_b+'-'+_d)),
      history = $('#citybox_his_'+b);
      for (; i < d.length; i++) {
        str += '<li class="citybox_content_item" data-code="' + d[i].cityCode + '" data-name="' + d[i].cityName + '" data-countrycode="' + d[i].countryCode + '">' + d[i].cityName + '</li>';
      }
      for(i=0;i<2;i++){
  			var l = config.para.b[i];
        $('#citybox_his_'+l).hide();
      }
      history.show();
      history.html(str);
		}else{
			if (document.getElementById('citybox_history')) {
				document.getElementById('citybox_history').style.display = 'none';
			}
		}
	},
	/* 容器显示隐藏 */
	showInstance = function() {
		if (instance.style.display == "none") {
			instance.style.display = "block";
      instance.classList.add('lfi');
      instance.addEventListener('animationend', function () {
          // this.className = 'citybox_wrapper';
          instance.classList.remove('lfi');
      });
      var tag = document.getElementById('citybox_tag');
      tag.style.display = _t=='h'?"none":"block";
      //$("body").unbind(".box_event");
		} else {
      instance.classList.add('lfo');
      instance.addEventListener('animationend', function lfo() {
          instance.classList.remove('lfo');
          instance.removeEventListener("animationend", lfo);
          instance.style.display = "none";
      });
      //instance.style.display = "none";
		}
	},
	/*出发或目的地打开组件就固定，只做国际，国内切换*/
	showItems = function() {
    if(arguments.length){
      b = arguments[0];
    }else{
      b = _b;
    }
    var tag = $('#citybox_tag_'+b);
    tag.addClass("on");
    tag.siblings().removeClass('on');
    resetHR(b);
		for(var i=0;i<2;i++){
			var l = config.para.b[i],d = config.para.d[i];
			if(b==l){
				document.getElementById('citybox_hot_'+b).style.display = 'block';
				document.getElementById('citybox_'+_d+'_list_'+b).style.display = 'block';
			}else{
				document.getElementById('citybox_hot_'+l).style.display = 'none';
				document.getElementById('citybox_'+_d+'_list_'+l).style.display = 'none';
			}
      document.getElementById('citybox_'+d).style.display = 'none';
		}
    document.getElementById('citybox_'+_d).style.display = 'block';
    _b = b;
	},
	/*搜索容器显示控制*/
	showSuggest = function(i) {
		var dom = $('.citybox_search_relative');
		if (i==0) {
			dom.css('left','3rem');
      input.value = '';
			masker.style.display = 'none';
			suggest.style.display = 'none';
		}else if(i==1){
			dom.css('left','1rem');
			masker.style.display = 'block';
			suggest.style.display = 'none';
		}else{
			masker.style.display = 'none';
			suggest.style.display = 'block';
		}
	},
    _getpara = function () {
        /*type:全部，热门*/
        if(arguments.length>1){
        	_t = arguments[0];
        	var i = arguments[1];
        }else{
        	var i = arguments[0];
        }
        _t = _t.toLowerCase();
        var req = config.data_req;
        switch (_t) {
          case "f":
            req.Parameters = {"top":40};
            break;
          case "fh":
          	/*CityType:1,2 出发，目的*/
          	var CityType = _d=="dep"?1:2;
            req.Parameters = i==0?{"CityType":CityType,"LastTime":"2016-04-15"}:{};
            break;
          case "fht":
            //parameters = {};
            break;
          case "h":
            //parameters = {};
            break;
          case "ht":
            //parameters = {};
            break;
          default:/*t*/
            req.Parameters = {"subProduct":0};
            break;
        }

        /*机票城市直接从js文件获取*/
        if(_t=='f'&&i==0){
        	if(typeof internationalCities=="undefined"){
	        	seriesLoadScripts('/js/plugins/citybox/cityData.js',function(){
	        		var data = {internationalCities:internationalCities,domesticCities:domesticCities};
	        		localStorage.setItem('At-CC-f0',JSON.stringify(data));
	        		DrawCity(data,i);
	        	});
			    }
        }else{
          req.Code = config.para[_t][i];
          vlm.loadJson("",JSON.stringify(req),function(json){
    				if(json.success){
    					var data = json.data;
              if(_t=="fh"&&i==0){
                localStorage.setItem('At-CC-'+_t+'-'+_d,JSON.stringify(json.data));
              }else{
    					  localStorage.setItem('At-CC-'+_t+i,JSON.stringify(json.data));
              }
    					DrawCity(data,i);
    				}else{
    					console.log(json.message);
    				}
    			});
    		}
    },
    seriesLoadScripts = function(scripts,callback) {
		if(typeof(scripts) != "object") var scripts = [scripts];
		var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
		var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {  //递归
		   s[i] = document.createElement("script");
		   s[i].setAttribute("type","text/javascript");
		   s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
		       if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
		           this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
		           if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
		       }
		   }
		   s[i].setAttribute("src",scripts[i]);
		   HEAD.appendChild(s[i]);
		};
		recursiveLoad(0);
  }, findInObj = function(d,code){
    var s = false;
    for(var i=0;i<d.length;i++){
      if(d[i].cityCode==code){
        s = true;
        break;
      }
    }
    return s;
  }, Filter = function (a,b) {
      // ary.sort();
      // return function(){
        return a.cityNameInitial.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0) - b.cityNameInitial.replace(/(^\s*)|(\s*$)/g,'').substr(0,1).toLowerCase().charCodeAt(0);
    };
    //out api
    /*return {
    	bindDoc:bindDoc
    };*/
    bindDoc();
}).call(this, window, document);
