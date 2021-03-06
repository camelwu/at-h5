/**
 * Created by Asiatravel on 2016/2/4.
 */

;(function(){
    var hotelCityList=function(api,data){
        this.api=api;
        this.mydata=data;
        this.init();
        console.log(this.data);
    }
    hotelCityList.prototype={
        init:function(){
            this.container();
            //热门城市交互
            this.ajax(this.api,this.mydata);
            //普通城市交互
            //this.ajax();
        },
        container:function(){
            var self=this;
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
                '                <div>历史选择</div>'+
                '                <ul class="cl_citysHis" id="cl_citysHis">'+
                '                </ul>'+
                '            </div>'+
                '            <div class="cl_con ">'+
                '                <a name="cl_hot" class="cl_on">&nbsp;</a>'+
                '                <div>热门城市</div>'+
                '                <ul class="cl_citysHot" id="cl_citysHot">'+
                '                </ul>'+
                '            </div>'+
                '            <div class="cityWordBox" id="cityWordBox">'+
                '                <div class="cityWord">'+
                '                <div>当前热门</div>'+
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
                '                </div>'+
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
            oDiv.setAttribute('id','cl_box_box');
            oDiv.innerHTML=str;
            document.body.appendChild(oDiv);
            var cl_back=document.getElementById('cl_back');
            self.bind(cl_back,'click',function(){
                oDiv.style.display='none';
            });
        },
        ajax:function(api,data){
            var self=this;
            vlm.loadJson(api,JSON.stringify(data), mycallback);
            function mycallback(d){
                var json=eval('('+d+')');
                if(json.success){
                    self.data.domHotCity=json.data;
                    self.control("domHotCity");
                }
            }
        },
        data:{
            "domHotCity":[],
            "domAllCity":[],
            "interHotCity":[],
            "interAllCity":[]
        },
        control:function(mydata){
            var self=this;
            if(mydata=='domHotCity'){
                var hotCityList=this.data[mydata];
                self.view("cl_citysHot",hotCityList);
            }
        },
        view:function(id,mydata){
            var self=this;
            var oBox=document.getElementById(id);
            var hotCityList=mydata;
            var str='';
            for(var i=0;i<hotCityList.length;i++){
                str+='<li>'+hotCityList[i].cityChineseName+'</li>';
            }
            oBox.innerHTML=str;
            self.bind(oBox,'click',function(ev){
                var oEvent=ev||event;
                var oSrc=oEvent.srcElement||oEvent.target;
                if(oSrc.tagName=='LI'){
                    alert(oSrc.innerHTML);

                }
            });
        },
        bind:function(obj,sEv,fn){
            return obj.addEventListener?obj.addEventListener(sEv,fn,false):obj.attachEvent('on'+sEv,fn);
        }
    };
    window.hotelCityList=hotelCityList;
}
)(window,document);
