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
    ,selectedPassagerArray={}
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
  var tpl_traveler = ['{%  for(var i=0,len=data.length;i<len;i++){', 'var dd=data[i];%}',
    '{% var age=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate")); if (dd.listTravellerIdInfo.length>0) %}'+
    '<li class="eve_traveler"  index={%=i%}>', '<b class="icon_common user_choice" data-id={%=dd.traveller.travellerId%} data-age="{%=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate"))%}"></b>',
    '<b class="icon user_edit" data-id="{%=dd.traveller.travellerId%}" ></b>',
    '<ul class="often_user">',
    '<input type="hidden" class="travellerId" value="{%=dd.traveller.travellerId%}"> </input>',
    '<input type="hidden" class="sexName" value="{%=dd.traveller.sexName%}"> </input>',
    '<li data-card="{%=dd.listTravellerIdInfo[0].idType%}"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">{%=dd.traveller.lastName%}</span>/<span class="firstName">{%=dd.traveller.firstName%}</span>',
    '{%  if(age<2){ %}'+
    '<i class="per_type" data-id="0">婴儿</i></li>'+
    '{% } else if(age>=2 && age<12){ %}'+
    '<i class="per_type" data-id="1">儿童</i></li>'+
    '{% } else if(age>=12){ %}'+
    '<i class="per_type" data-id="2">成人</i></li>',
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

      var selectPassagerList= $(".list-traveler .choiced")
      for(var i=0;i<=selectPassagerList.length-1;i++){
        var key=$(selectPassagerList[i]).attr("data-id")
        selectedPassagerArray[key]=passagerArray[key];
      }
      _replacePagerAttri();
      _saveLocalStorge();
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
         "email":$(".addAir_page .email").val(),
         "createTime":"2016-05-25T18:53:09",
         "memberId":memberId,
         "isDelete":false,
         "mobilePhone":$(".addAir_page .telephone").val(),
         "mobilePhoneAreaCode":$(".addAir_page .phone_pre").html()
       },
       "listTravellerIdInfo": [
         {
           "id":658,
           "travellerId":530,
           "idType":$(".addAir_page .postCard").attr("data-code"),
           "idNumber":$(".addAir_page .cardNumber").val(),
           "idCountry":$(".addAir_page .cardCountry").attr("data-code"),
           "idCountryName":$(".addAir_page .cardCountry").html(),
           "idActivatedDate":$(".addAir_page .cardDateLimit").eq(0).val().replace('年','-').replace('月','-').replace('号','').replace('日',''),
           "nationalityCode":$(".addAir_page .cardCountry").attr("data-code")
         }
       ]
     }
  }
  var _model2UI=function(model){
    $(".addAir_page .cnName").val(model.traveller.idName);
    $(".addAir_page .lastName").val(model.traveller.lastName);
    $(".addAir_page .firstName").val(model.traveller.firstName);

    $(".addAir_page .postCard").attr("data-code",model.listTravellerIdInfo[0].idType);
    $(".addAir_page .postCard").html(vlm.arr_t[model.listTravellerIdInfo[0].idType]);
    $(".addAir_page .cardNumber").val(model.listTravellerIdInfo[0].idNumber);
    $(".addAir_page .cardDateLimit").val(model.listTravellerIdInfo[0].idActivatedDate.replace('-','年').replace('-','月')+'号');

    $(".addAir_page .cardCountry").attr("data-code",model.listTravellerIdInfo[0].idCountry);
    $(".addAir_page .cardCountry").html(model.listTravellerIdInfo[0].idCountryName);
    $(".addAir_page .country").attr("data-code",model.traveller.countryCode);
    $(".addAir_page .country").html(model.traveller.countryName);


  }

  var _clearDate=function(){
    addOrEditPassagePage.find("input").val("");
  }

  //数据保存
  var _saveDb=function(){
      var modle=_ui2Modle();
      //登陆
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
            return;
          }
        })
      }
      //免登陆
      else{
           //编辑状态，移除数组元素，为了更数据
          if(editIDKey !=null) {
            choiceAir_AddPassagerArray.forEach(function (info) {
              if (info.traveller.travellerId == editIDKey) {
                choiceAir_AddPassagerArray.pop()
              }
            })
          }
          choiceAir_AddPassagerArray.push(modle);
          localStorage.setItem('choiceAir_AddPassagerArray',JSON.stringify(choiceAir_AddPassagerArray));
          passagerListPage.show();
          addOrEditPassagePage.hide();
          _getPassagerList();
      }
    _clearDate();
  }

  //缓存数据
  var _saveLocalStorge=function(){
    var param;
    if(isMulSelect){
      param=[]
      for(var key in selectedPassagerArray) {
        var o= {
          "PassengerType":"ADULT",
          "Id":selectedPassagerArray[key].traveller.travellerId,
          "SexCode":selectedPassagerArray[key].traveller.sexCode,
          "FirstName":selectedPassagerArray[key].traveller.firstName,
          "LastName":selectedPassagerArray[key].traveller.lastName,
          "DateOfBirth":selectedPassagerArray[key].traveller.dateOfBirth,
          "email":selectedPassagerArray[key].traveller.email,
          "mobile":selectedPassagerArray[key].traveller.mobilePhone,
          "CertificateInfo":{
              "IdType":selectedPassagerArray[key].listTravellerIdInfo[0].id,
              "IdCountry":selectedPassagerArray[key].listTravellerIdInfo[0].idCountry,
              "IdNumber":selectedPassagerArray[key].listTravellerIdInfo[0].idNumber,
              "IdActivatedDate":selectedPassagerArray[key].listTravellerIdInfo[0].idActivatedDate
          },
          "BaggageCode":"",
          "CountryCode":selectedPassagerArray[key].traveller.countryCode
        }
        param.push(o);
      }
      localStorage.setItem('travellerInfo_selected',JSON.stringify(param));
    }
    else{
      for(var key in selectedPassagerArray) {
          param = {
            "SexCode": selectedPassagerArray[key].traveller.sexCode,
            "FirstName": selectedPassagerArray[key].traveller.firstName,
            "LastName": selectedPassagerArray[key].traveller.lastName,
            "Email": selectedPassagerArray[key].traveller.email,
            "CountryNumber": selectedPassagerArray[key].traveller.countryCode,
            "ContactNumber":  selectedPassagerArray[key].traveller.mobilePhone,
            "MobilePhone":  selectedPassagerArray[key].traveller.mobilePhone,
          }
        }
      localStorage.setItem('contact_selected',JSON.stringify(param));
      localStorage.setItem('selectedPassagerArray',JSON.stringify(selectedPassagerArray));
    }
  };

  //替换页面元素
  var _replacePagerAttri=function(){
    var htmlObj =$(ifrCilent.parentNode).find("#"+elementId);
    if(isMulSelect){
      //除了隐藏模板，remove所以子节点
      htmlObj.children(":visible").remove()
      var children=htmlObj.children().eq(0);

      for (var key in selectedPassagerArray) {
        var cloneObj=children.clone(true);
        cloneObj.show();
        elementList=$(cloneObj).find("[data-elementname]");
        htmlObj.append(cloneObj);
        for (var i = 0; i <= elementList.length - 1; i++) {
          var obj = elementList[i],
            attribute = elementList[i].attributes["data-elementname"].value,
            val = passagerArray[key].traveller[attribute];
            if (val == undefined) {
              val=passagerArray[key].listTravellerIdInfo[0][attribute];
            }
            if (obj.tagName == "INPUT") {
              $(elementList[i]).val(val);
            }
            else {
              $(elementList[i]).html(val);
            }
        }
      }
    }
    else {
      var elementList=htmlObj.find("[data-elementname]");
      for (var key in selectedPassagerArray) {
        for (var i = 0; i <= elementList.length - 1; i++) {
          var obj = elementList[i],
            attribute = elementList[i].attributes["data-elementname"].value,
            val = passagerArray[key].traveller[attribute];
            if (val == undefined) {
              passagerArray[key].listTravellerIdInfo[0][attribute];
            }
            if (obj.tagName == "INPUT") {
              $(elementList[i]).val(val);
            }
            else {
              $(elementList[i]).html(val);
            }
        }
      }
    }
  };

  //绑定选择事件
  var _bindSelectChoice=function(){
      $(".user_choice").on("click",function(){

        if(isMulSelect){
          var age=$(this).attr("data-age"),step=1
          if(age<=2){
            jAlert("该乘机人为婴儿，如需购买婴儿票,请联系客服！");
            return;
          }

          //选择操作 choiced 选择下个操作取消
          if($(this).hasClass("choiced")) {
            step=-1 //选择加1个
          }
          else{
            step=1;//取消减一个
          }

          if(selectAdultNum+step>numofAdult && numofChlid>0 ){
              jAlert("只能选择"+numofAdult+"成人,"+numofChlid+"小孩");
              return;
          }
          else if(selectAdultNum+step>numofAdult){
              jAlert("只能选择"+numofAdult+"成人");
              return;
          }

          if (age > 2 && age < 12) {
            selectChildNum=selectChildNum+step;
          }
          else if (age >= 12) {
            selectAdultNum=selectAdultNum+step;
          }
          _setSelectPessageTip();
        }
        else{
            var len= $(".list-traveler .choiced").length;
            if(len>=1 && !$(this).hasClass("choiced")){
              $(this).removeClass("choiced");
              jAlert("对不起，只能单选！");
              return;
            }
        }
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

           var html = template(tpl_traveler, json);
           for (var i = 0; i <= json.data.length - 1; i++) {
             json.data[i].selected = false;//默认未选择
             passagerArray[json.data[i].traveller.travellerId] = json.data[i];
           }
           console.log(passagerArray)
           document.getElementById("allList").innerHTML = html;
           _bindSelectChoice();
            vlm.init();
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
      var data=JSON.parse(localStorage.getItem("choiceAir_AddPassagerArray"));
      if( choiceAir_AddPassagerArray.length==0) {
        for (var key in data) {
          choiceAir_AddPassagerArray.push(data[key])
        }
      }

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

