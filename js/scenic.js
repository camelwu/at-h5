(function(){
    var el = function(Doms){var domArray = new Array();var oFrag=document.createDocumentFragment();if(typeof Doms != "string"){domArray.push(Doms);}else{var dd = document.createElement("div");dd.innerHTML = Doms;for(var ds=0;ds<dd.childNodes.length;ds++){domArray.push(dd.childNodes[ds]);}}for(var d=0;d<domArray.length;d++){oFrag.appendChild(domArray[d]);}return oFrag;}
    /*****
        景点 js
    ******/
    var _screen_tagBox = document.getElementById("screen_tagBox"),tagBox_ul=[],_tagList=[],_listCon=[];
    if(_screen_tagBox){
        _tagList=_screen_tagBox.getElementsByTagName("li");
        tagBox_ul=_screen_tagBox.parentNode.getElementsByTagName("ul");
    }
    for(var i=0;i<tagBox_ul.length;i++){
        if(tagBox_ul[i].className=="tagList"){_listCon.push(tagBox_ul[i]);}
    }
    for(var i=0;i<_tagList.length;i++){changeTagList(i);}
    function changeTagList(n){
        _tagList[n].onclick = function(){
            for(var i=0;i<_listCon.length;i++){_listCon[i].style.display="none";}
            for(var i=0;i<_tagList.length;i++){_tagList[i].className="";}
            _listCon[n].style.display="block";
            _tagList[n].className="current";
        }
    }

    /*筛选按钮*/
    var _fo_sc = document.getElementById("fo_sc"),
    _fo_ra = document.getElementById("fo_ra"),
    _show_de = document.getElementById("show_de"), _mask = document.getElementById("r-mb");
    _fo_sc&&(_fo_sc.onclick=show_sc_ra);
    _fo_ra&&(_fo_ra.onclick=show_sc_ra);
    _show_de&&(_show_de.onclick=show_detail_expenses);
    function show_sc_ra(){
        var _id = this.id , showDom;
        if(_id=="fo_sc"){
            showDom = document.getElementById("screen");
        }else if(_id=="fo_ra"){
            showDom = document.getElementById("rank");
        }
        isShow(showDom,'0%');
    }

    function show_detail_expenses(){
        var showDom = document.getElementById("detail_expenses"),_t=this;
        function showChangeClass(){_t.className='itemized';}
        this.className=="itemized"?(isShow(showDom,'42px',showChangeClass),_t.className='itemized_d'):isHide(showDom,showChangeClass);
    }
    function isShow(showDom,value,cb){
        _mask.style.display="block";
        showDom.style.bottom = value;
        _mask.onclick = function(){isHide(showDom,cb);}
    }
    function isHide(showDom,cb){
        _mask.style.display="none";
        showDom.style.bottom = "-100%";
        cb&&cb();
        _mask.onclick = null;
    }

    /*套餐tag标签*/
    var _pageTag = document.getElementById('pageTag');
    _pageTag&&(tc_pageTagShow());
    function tc_pageTagShow(){
        var _tagL = _pageTag.getElementsByTagName("span");
        for(var i=0;i<_tagL.length;i++){
            _tagL[i].getAttribute("data-c-id")!=""&&tagClick(_tagL[i]);
        }        
    }
    function tagClick(dom){
        dom.onclick = function(){
            var conId = this.getAttribute("data-c-id"),_tagL = this.parentNode.getElementsByTagName("span");
            if(this.className!="current"){
                for(var i=0;i<_tagL.length;i++){
                    _tagL[i].className = "";
                    var _isConId = _tagL[i].getAttribute("data-c-id"),_isCon = document.getElementById(_isConId);
                    _isCon.style.display="none";
                }
                this.className="current";
                document.getElementById(conId).style.display="block";
            }
        }
    }

    /**/
    function toUp(m,n,n_1){
        var _type = n.parentNode.getAttribute("data-type");
        n.onclick=function(){
            var str=m.innerHTML;
            str=Number(str);
            str=str+1;
            m.innerHTML=str;
            str==0?n_1.style.backgroundPosition = '-26px 2px':n_1.style.backgroundPosition = '-51px 2px';
            _type=="extraBed"&&extraBed(n.parentNode.parentNode,str);
        };
    }
    function toDown(m,n){
        var _type = n.parentNode.getAttribute("data-type");
        n.onclick=function(){
            var str=m.innerHTML;
            str=Number(str);
            if(str<=0){m.innerHTML=0;}else{str=str-1;m.innerHTML=str;}
            str==0?n.style.backgroundPosition = '-26px 2px':n.style.backgroundPosition = '-51px 2px';
            _type=="extraBed"&&extraBed(n.parentNode.parentNode,str);
        };
    }
    function extraBed(dom,numb){
        var _bedBox = dom.parentNode.getElementsByClassName('extraBed') , _html='';
        if(numb==0&&_bedBox.length==1){_bedBox[0].parentNode.removeChild(_bedBox[0]);}else{
            var _listHtml = '';
            for(var i=1;i<=numb;i++){_listHtml+=extraBedTemp(i);}
            if(_bedBox.length==0){
                _html='<div class="extraBed">';                
                domAfter(dom,_html+_listHtml+'</div>');
            }else{
                _bedBox[0].innerHTML = _listHtml;
            }
        }
        
    }
    function extraBedTemp(i){
        return '<span class="bedList"><i>儿童加床'+i+'</i><b class="ico_select"></b></span>';
    }
    var oNum=document.getElementsByClassName('cut-up-cont'),
        _plus_btn=document.getElementsByClassName('plus-btn'),
        _cut_down_btn=document.getElementsByClassName('cut-down-btn');
    for(var i=0;i<oNum.length;i++){
        toUp(oNum[i],_plus_btn[i],_cut_down_btn[i]);
        toDown(oNum[i],_cut_down_btn[i]);
        var str=parseInt(oNum[i].innerHTML);
        str==0?_cut_down_btn[i].style.backgroundPosition = '-26px 2px':_cut_down_btn[i].style.backgroundPosition = '-51px 2px';
    }
    function domAfter(dom,html){
        var next = dom.nextSibling;
        if(next!=null){
            while(next.tagName==undefined){
                if(next.nextSibling!=null){
                    next = next.nextSibling;
                }else{
                    next = null;break;
                }
            }
        }
        next!=null?next.parentNode.insertBefore(el(html),next):dom.parentNode.appendChild(el(html));
    }

})()