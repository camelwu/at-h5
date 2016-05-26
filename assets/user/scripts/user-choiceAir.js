/**
 * Created by zhouwei on 2016/5/25.
 */
(function(){
  var urlobj = vlm.parseUrlPara(window.location.href),isMulSelect=vlm.getpara("isMulSelect").toLowerCase()=="true"?true:false//是否多选
    ,isNeedPassport=vlm.getpara("isNeedPassport").toLowerCase()=="true"?true:false//是否需要护照
    ,titleType=vlm.getpara("title").substr(2)//是否多选title;
    ,travId=vlm.getpara("Id")//id,
    ,elementId=vlm.getpara("elementId")//id
    ,from=vlm.getpara("from")

    ,ifrCilent=window.parent.document.getElementById("choiceAir")
    ,numofAdult=vlm.getpara("numofAdult")//id
    ,numofChlid=vlm.getpara("numofChlid")//id;
    ,selectAdultNum= 0
    ,selectChildNum=0
    ,departDate=vlm.getpara("departDate")//departDate;
    ,memberId = localStorage.memberid || sessionStorage.memberid
    ,passagerArray={}
    ,choiceAir_AddPassagerArray=[]
    ,editIDKey=null
    ,currentOperationType=vlm.getpara("operationType")==null?"new":vlm.getpara("operationType")
    ,operationType={
      new:{id:1,name:"新增",code:"70100012"},
      edit:{id:2,name:"编辑",code:"70100013"},
    }

     //页面Dom对象
     var saveDbBtn=$(".addFinish");
     var selectPassagerBtn=$("#toper .header_finish");
     var closeWindowBtn=$("#toper .closedWin");
     var addPassagerBtn=$(".add_passager");
     var nameDescriptBtn=$(".user_must");
     var nameDescriptPager=$(".fillName_page ");
     var submitBtn=$("#toper .header_finish")

     var titleTip=$("#toper h3");
     /*页面*/
     var passagerListPage=$(".passageListPage");
     var addOrEditPassagePage=$(".addAir_page");
     var addPassagerOkBtn=$(".addAir_page .addFinish");
     var addPassagerBackBtn=$(".addAir_page .header_quit");


  //常旅列表
  var tpl_traveler = ['{% for(var i=0,len=data.length;i<len;i++){', 'var dd=data[i];%}',
    '{% if (dd.listTravellerIdInfo.length>0) %}'+
    '<li class="eve_traveler"  index={%=i%}>', '<b class="icon_common user_choice" data-id={%=dd.traveller.travellerId%} data-age="{%=dd.traveller.travellerAge%}"></b>',
    '<b class="icon user_edit" data-id="{%=dd.traveller.travellerId%}" ></b>',
    '<ul class="often_user">',
    '<input type="hidden" class="travellerId" value="{%=dd.traveller.travellerId%}"> </input>',
    '<input type="hidden" class="sexName" value="{%=dd.traveller.sexName%}"> </input>',
    '<li data-card="{%=dd.listTravellerIdInfo[0].idType%}"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">{%=dd.traveller.lastName%}</span>/<span class="firstName">{%=dd.traveller.firstName%}</span>',
    '{% if (dd.traveller.travellerAge<2){ %}'+
    '<i class="per_type">婴儿</i></li>'+'{% } %}'+
    '{% if (dd.traveller.travellerAge<12 && dd.traveller.travellerAge>=2 ){ %}'+
    '<i class="per_type">儿童</i></li>'+'{% } %}'+
    '{% if (dd.traveller.travellerAge>=12){ %}'+
    '<i class="per_type">成人</i></li>',
    '{% } for(var j=0;j<=dd.listTravellerIdInfo.length-1;j++){ %}',
    '<li class="passport-num"><span class="passport-card-type">{%=vlm.arr_t[dd.listTravellerIdInfo[j].idType]%}</span> <span class="passport-card-number">{%=dd.listTravellerIdInfo[j].idNumber%}</span></li>',
    '{% } %}',
    '</ul>',
    '</li>',
    '{% } %}'].join('');

  //页面事件绑定
  var _bindEvent=function(){
     addPassagerBtn.on("click",function(){
         passagerListPage.hide();
         addOrEditPassagePage.show();
    });
    addPassagerBackBtn.on("click",function(){
        passagerListPage.show();
        addOrEditPassagePage.hide();
    });
    nameDescriptBtn.on("click",function(){
        nameDescriptPager.show();
    });
    closeWindowBtn.on("click",function(){
      if (window.opener) {
        window.close();
      } else {
        ifrCilent.parentNode.removeChild(ifrCilent);
      };
    });

    submitBtn.on("click",function(){
      _replacePagerAttri();
      closeWindowBtn.click();

    });

    //保存事件
    saveDbBtn.on("click",function(){
        _saveDb()
    })
  };

  var _ui2Modle=function(){
    return {
       "traveller":{
         "travellerId":new Date().getTime(),
         "idName":$(".addAir_page .cnName").val(),
         "lastName":$(".addAir_page .lastName").val(),
         "firstName":$(".addAir_page .firstName").val(),
         "countryCode":$(".addAir_page .country").attr("data-code"),
         "countryName":$(".addAir_page .country").html(),
         "sexCode":"Mr",
         "sexName":"男",
         "dateOfBirth":$(".addAir_page .birthDay").eq(0).val().replace('年','-').replace('月','-').replace('号','').replace('日',''),
         "email":"zhouwei163mail@163.com",
         "createTime":"2016-05-25T18:53:09",
         "memberId":84587,
         "isDelete":false,
         "mobilePhone":"15810216534",
         "mobilePhoneAreaCode":""
       },
       "listTravellerIdInfo":[
         {
           "id":658,
           "travellerId":530,
           "idType":$(".addAir_page .postCard").attr("data-code"),
           "idNumber":$(".addAir_page .cardNumber").val(),
           "idCountry":"CN",
           "idActivatedDate":$(".addAir_page .cardDateLimit").eq(0).val().replace('年','-').replace('月','-').replace('号','').replace('日',''),
           "nationalityCode":"",
           "idCountryName":""
         }
       ]
     }
  }
  var _model2UI=function(model){
    $(".addAir_page .cnName").val(model.traveller.idName);
    $(".addAir_page .lastName").val(model.traveller.lastName);

  }

  //数据保存
  var _saveDb=function(){
      var modle=_ui2Modle();
      if(memberId !=undefined) {
        var  Parameters={
          Parameters:modle,
          ForeEndType:3,
          Code:operationType[currentOperationType].code
        }
        vlm.loadJson("", JSON.stringify(Parameters), function (data) {
          if (data.success) {
            closeWindowBtn.click();
          }
          else {
            alert("接口错误！");
          }
        })
      }
    else{
        if(editIDKey !=null) {
          choiceAir_AddPassagerArray.forEach(function (info) {
            if (info.traveller.travellerId == editIDKey) {
              choiceAir_AddPassagerArray.pop() //移除当前编辑记录
            }
          })
        }
        choiceAir_AddPassagerArray.push(modle);
        passagerListPage.show();
        addOrEditPassagePage.hide();
        _getPassagerList();
      }
  }

  //缓存数据
  var _saveLocalStorge=function(){


  };

  var _replacePagerAttri=function(){
    var htmlObj =$(ifrCilent.parentNode).find("#"+elementId);
    var elementList=htmlObj.find("[data-elementname]");
    for(var key in passagerArray)
    {
        for(var i=0;i<=elementList.length-1;i++){
          var obj=elementList[i];
          var attribute=elementList[i].attributes["data-elementname"].value;
          var val="";
          for(var k in passagerArray[key]){
             val=passagerArray[key][k][attribute];
             if(val==undefined){
               passagerArray[key][k][0][attribute]
             }
            else{
               break;
             }
          }

          if(obj.tagName=="INPUT"){
            $(elementList[i]).val(val);
          }
          else{
            $(elementList[i]).html(val);
          }


        }
    }


  };

  //绑定选择事件
  var _bindSelectChoice=function(){
      $(".user_choice").on("click",function(){
        $(this).toggleClass("choiced");
      })

      $(".user_edit").on("click",function(){
        currentOperationType="edit";
        editIDKey=$(this).attr('data-id');
        _model2UI(passagerArray[editIDKey]);

        passagerListPage.hide();
        addOrEditPassagePage.show();
      })
  };

  //设置标题头信息
  var _setTitleTip=function(){
    if(numofAdult==null || numofAdult=="null"){
      titleTip.html("选择"+titleType);
    }
    else{
        _setSelectPessageTip();
    }
    $(".add_passager .newTitle").html("新增"+titleType)
  };

  var _setSelectPessageTip=function(){
    if(numofChlid>0) {
      titleTip.html("已选：成人" + selectAdultNum + "/" + numofAdult + "  儿童" + selectChildNum + "/" + numofChlid + "")
    }
    else{
      titleTip.html("已选：成人" + selectAdultNum + "/" + numofAdult)
    }
  };

  //获取常旅列表数据源
  var _getPassagerList=function(){
     //如果正常登陆，查询数据库常旅接口
     if(memberId != null) {
       var Parameters = {
         "Parameters": {"memberId": memberId},
         "ForeEndType": 3,
         "Code": "0074"
       };
       vlm.loadJson("", JSON.stringify(Parameters), function (json) {
         if (json.success) {
           vlm.init()
           var html = template(tpl_traveler, json);
           for (var i = 0; i <= json.data.length - 1; i++) {
             json.data[i].selected = false;//默认未选择
             passagerArray[json.data[i].traveller.travellerId] = json.data[i];
           }
           console.log(passagerArray)
           document.getElementById("allList").innerHTML = html;
           _bindSelectChoice();
         }
       });
     }

     //如果免登陆，查询LocalStorge数据
    else{
       var html = template(tpl_traveler, {data:choiceAir_AddPassagerArray});

       choiceAir_AddPassagerArray.forEach(function(info){
           passagerArray[info.traveller.travellerId] = info;
       })

       document.getElementById("allList").innerHTML = html;
       _bindSelectChoice();

     }
  };

  /*页面初始化方法*/
  var _initPage=function(){

    if(memberId==undefined){
      passagerListPage.hide();
      addOrEditPassagePage.show();
    }

    _getPassagerList();
    _bindEvent();
    _setTitleTip();
  };

  /*接口*/
  return{
    InitPage:_initPage()
  }

})()

