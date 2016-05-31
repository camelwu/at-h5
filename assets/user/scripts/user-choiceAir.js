/**
 * Created by zhouwei on 2016/5/25.
 */
(function(){
  var urlobj = vlm.parseUrlPara(window.location.href),isMulSelect=vlm.getpara("isMulSelect").toLowerCase()=="true"?true:false//是否多选
    ,isNeedPassport=vlm.getpara("isNeedPassport").toLowerCase()=="true"?true:false//是否需要护照
    ,titleType=vlm.getpara("title").substr(2)//是否多选title;
    ,travId=vlm.getpara("Id")//id,
    ,elementId=vlm.getpara("elementId").replace(/(^\s*)|(\s*$)/g, "")//id
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

    ,isShowChinaName=vlm.getpara("isShowChinaName").toLowerCase()=="false"?false:true
    ,isShowContact=vlm.getpara("isShowContact").toLowerCase()=="false"?false:true

     //页面Dom对象
     var saveDbBtn=$(".addFinish");
     var selectPassagerBtn=$("#toper .header_finish");
     var closeWindowBtn=$("#toper .closedWin");
     var addPassagerBtn=$(".add_passager");
     var nameDescriptBtn=$(".user_must");
     var nameDescriptPager=$(".fillName_page ");
     var submitBtn=$("#toper .header_finish");

     var uc_cnName=$(".addAir_page .cnNameUL");
     var ul_contect=$(".addAir_page .ul_contect");


     var titleTip=$("#toper h3");
     /*页面*/
     var passagerListPage=$(".passageListPage");
     var addOrEditPassagePage=$(".addAir_page");
     var addPassagerOkBtn=$(".addAir_page .addFinish");
     var addPassagerBackBtn=$(".addAir_page .header_quit");


  //常旅列表
  var tpl_traveler = ['{%  for(var i=0,len=data.length;i<len;i++){', 'var dd=data[i];%}',
    '{% var age=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate")); if (dd.listTravellerIdInfo.length>0) %}'+
    '<li class="eve_traveler"  index={%=i%}>', '<b class="icon_common user_choice" data-id="{%=dd.traveller.travellerId%}"  data-age="{%=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate"))%}"></b>',
    '<b class="icon user_edit" data-id="{%=dd.traveller.travellerId%}" ></b>',
    '<ul class="often_user">',
    '<input type="hidden" class="travellerId" value="{%=dd.traveller.travellerId%}"> </input>',
    '<input type="hidden" class="sexName" value="{%=dd.traveller.sexName%}"> </input>',
    '<li data-card="{%=dd.listTravellerIdInfo[0].idType%}"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">{%=dd.traveller.lastName%}</span>/<span class="firstName">' +
    '{%=dd.traveller.firstName%}</span>',
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
        currentOperationType="new";
        _setTitleTip();
         _clearDate();
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
        passagerArray[key].PagerType=from;
        selectedPassagerArray[key]=passagerArray[key];
      }
      _replacePagerAttri();
      _saveLocalStorge();
      closeWindowBtn.click();
    });

    //保存事件
    saveDbBtn.on("click",function(){
      var flag=_saveDb();
      if(flag) {
        _getPassagerList();
      }
    })

    $(".sex_cho_wrap span").on("click",function(){
      $(".sex_cho_wrap b").removeClass("traveler_sex1");
      $(".sex_cho_wrap b").addClass("traveler_sex2");
      $(this).find("b").removeClass("traveler_sex2").addClass("traveler_sex1");
    })
  };
  var _validate=function(){

    if(uc_cnName.is(':visible')){
      if(!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".cnName").eq(0).val())){
        jAlert("中文姓名不能为空！","",null,"确认");
        return false;
      }
      if(!vlm.Utils.validate["chiName"]($(addOrEditPassagePage).find(".cnName").eq(0).val())){
        jAlert("请输入有效的中文名！","",null,"确认");
        return false;
      }
    };

    if(ul_contect.is(':visible')){
        if(!vlm.Utils.validate["mobileNo"]($(addOrEditPassagePage).find(".telephone").eq(0).val())){
          jAlert("请输入有效的电话号码！","",null,"确认");
          return false;
        }

        if(!vlm.Utils.validate["email"]($(addOrEditPassagePage).find(".email").eq(0).val())){
          jAlert("请输入有效的邮箱！","",null,"确认");
          return false;
        }
    }
    if(!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".lastName").eq(0).val())){
      jAlert("姓（英文）不能为空！","",null,"确认");
      return false;
    }
    if(!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".firstName").eq(0).val())){
      jAlert("名（英文）不能为空！","",null,"确认");
      return false;
    }
    if(!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".cardNumber").eq(0).val())){
      jAlert("证件号不能为空！","",null,"确认");
      return false;
    }

    if(!vlm.Utils.validate["engName"]($(addOrEditPassagePage).find(".lastName").eq(0).val())){
      jAlert("姓必须为英文！","",null,"确认");
      return false;
    }
    if(!vlm.Utils.validate["engName"]($(addOrEditPassagePage).find(".firstName").eq(0).val())){
      jAlert("名必须为英文！","",null,"确认");
      return false;
    }
    return true;
  }

  var _ui2Modle=function(type){
    if(type=="new") {
        var model= {
        "traveller": {
          "idName": $(".addAir_page .cnName").val(),
          "lastName": $(".addAir_page .lastName").val(),
          "firstName": $(".addAir_page .firstName").val(),
          "countryCode": $(".addAir_page .country").attr("data-code"),
          "countryName": $(".addAir_page .country").html(),
          "sexCode": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-code"),
          "sexName": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-name"),
          "dateOfBirth": $(".addAir_page .birthDay").eq(0).val().replace('年', '-').replace('月', '-').replace('号', '').replace('日', ''),
          "email": $(".addAir_page .email").val(),
          //"createTime":"2016-05-25T18:53:09",
          "memberId": memberId,
          "isDelete": false,
          "mobilePhone": $(".addAir_page .telephone").val(),
          "mobilePhoneAreaCode": $(".addAir_page .phone_pre").html()
        },
        "listTravellerIdInfo": [
          {
            "id": 0,
            "idType": $(".addAir_page .postCard").attr("data-code"),
            "idNumber": $(".addAir_page .cardNumber").val(),
            "idCountry": $(".addAir_page .cardCountry").attr("data-code"),
            "idCountryName": $(".addAir_page .cardCountry").html(),
            "idActivatedDate": $(".addAir_page .cardDateLimit").eq(0).val().replace('年', '-').replace('月', '-').replace('号', '').replace('日', ''),
            "nationalityCode": $(".addAir_page .cardCountry").attr("data-code")
          }
        ]
      }

      return model;
    }
    else{

       var modle= {
        "traveller": {
          "travellerId": memberId==null? new Date().getTime():editIDKey,
          "idName": $(".addAir_page .cnName").val(),
          "lastName": $(".addAir_page .lastName").val(),
          "firstName": $(".addAir_page .firstName").val(),
          "countryCode": $(".addAir_page .country").attr("data-code"),
          "countryName": $(".addAir_page .country").html(),
          "sexCode": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-code"),
          "sexName": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-name"),
          "dateOfBirth": $(".addAir_page .birthDay").eq(0).val().replace('年', '-').replace('月', '-').replace('号', '').replace('日', ''),
          "email": $(".addAir_page .email").val(),
          //"createTime":"2016-05-25T18:53:09",
          "memberId": memberId,
          "isDelete": false,
          "mobilePhone": $(".addAir_page .telephone").val(),
          "mobilePhoneAreaCode": $(".addAir_page .phone_pre").html()
        },
        "listTravellerIdInfo": [
          {
            "id": editIDKey == null ? 0 : editIDKey,
            "travellerId": editIDKey,
            "idType": $(".addAir_page .postCard").attr("data-code"),
            "idNumber": $(".addAir_page .cardNumber").val(),
            "idCountry": $(".addAir_page .cardCountry").attr("data-code"),
            "idCountryName": $(".addAir_page .cardCountry").html(),
            "idActivatedDate": $(".addAir_page .cardDateLimit").eq(0).val().replace('年', '-').replace('月', '-').replace('号', '').replace('日', ''),
            "nationalityCode": $(".addAir_page .cardCountry").attr("data-code")
          }
        ]
      }

      return modle;
    }
  }
  var _model2UI=function(model){
    $(".addAir_page .cnName").val(model.traveller.idName);
    $(".addAir_page .lastName").val(model.traveller.lastName);
    $(".addAir_page .firstName").val(model.traveller.firstName);
    $(".addAir_page .postCard").attr("data-code",model.listTravellerIdInfo[0].idType);
    $(".addAir_page .postCard").html(vlm.arr_t[model.listTravellerIdInfo[0].idType]);
    $(".addAir_page .cardNumber").val(model.listTravellerIdInfo[0].idNumber);
    $(".addAir_page .cardDateLimit").val(model.listTravellerIdInfo[0].idActivatedDate.substring(0,10).replace('-','年').replace('-','月')+'号');
    $(".addAir_page .cardCountry").attr("data-code",model.listTravellerIdInfo[0].idCountry);
    $(".addAir_page .cardCountry").html(model.listTravellerIdInfo[0].idCountryName);
    $(".addAir_page .country").attr("data-code",model.traveller.countryCode);
    $(".addAir_page .country").html(model.traveller.countryName);
    $(".addAir_page .telephone").val(model.traveller.mobilePhone);
    $(".addAir_page .email").val(model.traveller.email);
    $(".addAir_page .birthDay").val(model.traveller.dateOfBirth.substring(0,10).replace('-','年').replace('-','月')+'号');
    $(".addAir_page .phone_pre").html(model.traveller.mobilePhoneAreaCode);

  }

  var _clearDate=function(){
    currentOperationType="new";
    addOrEditPassagePage.find("input").val("");

    $(".addAir_page .cardDateLimit").attr("data-cache","1990年-1月-1日");
    $(".addAir_page .cardDateLimit").val("1990年1月9号");

    $(".addAir_page .birthDay").attr("data-cache","1990年-1月-1日");
    $(".addAir_page .birthDay").val("1990年1月9号");

    $(".addAir_page .postCard").attr("data-cache","1");
    $(".addAir_page .postCard").val("护照");


    $(".addAir_page .cardCountry").attr("data-code","CN");
    $(".addAir_page .cardCountry").html("中国");

    $(".addAir_page .country").attr("data-code","CN");
    $(".addAir_page .country").html("中国");

  }

  //数据保存
  var _saveDb=function(){
      if(!_validate()){
        return false;
      }
      var modle=_ui2Modle(currentOperationType);
      //登陆
      if(memberId !=undefined) {
        var  Parameters={
          Parameters:modle,
          ForeEndType:3,
          Code:operationType[currentOperationType].code
        }
        vlm.loadJson("", JSON.stringify(Parameters), function (data) {
          if (data.success) {
            _getPassagerList();
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

        if(currentOperationType=="new"){
          modle.traveller.travellerId=new Date().getTime();
        }
        choiceAir_AddPassagerArray.push(modle);
        sessionStorage.setItem('choiceAir_AddPassagerArray',JSON.stringify(choiceAir_AddPassagerArray));
        passagerListPage.show();
        addOrEditPassagePage.hide();
        _getPassagerList();
      }
       _clearDate();
       return true;
  }

  //缓存数据
  var _saveLocalStorge=function(){
    var param;
    if(isMulSelect){
      param=[]
      for(var key in selectedPassagerArray) {
        var o= {
          "Id":selectedPassagerArray[key].traveller.travellerId,
          "SexCode":selectedPassagerArray[key].traveller.sexCode,
          "FirstName":selectedPassagerArray[key].traveller.firstName,
          "LastName":selectedPassagerArray[key].traveller.lastName,
          "DateOfBirth":selectedPassagerArray[key].traveller.dateOfBirth,
          "email":selectedPassagerArray[key].traveller.email,
          "mobile":selectedPassagerArray[key].traveller.mobilePhone,
          "CertificateInfo":{
              "IdType":selectedPassagerArray[key].listTravellerIdInfo[0].idType,
              "IdCountry":selectedPassagerArray[key].listTravellerIdInfo[0].idCountry,
              "IdNumber":selectedPassagerArray[key].listTravellerIdInfo[0].idNumber,
              "IdActivatedDate":selectedPassagerArray[key].listTravellerIdInfo[0].idActivatedDate
          },
          "BaggageCode":"",
          "CountryCode":selectedPassagerArray[key].traveller.countryCode
        }

        if(vlm.Utils.getAge(o.DateOfBirth,departDate)<12){
          o.PassengerType= "CHILD";  //乘客类型
        }
        else{
          o.PassengerType= "ADULT";  //乘客类型
        }
        param.push(o);
      }
      localStorage.setItem('travellerInfo_selected',JSON.stringify(param));
      sessionStorage.setItem('choiceAir_select_'+elementId,JSON.stringify(selectedPassagerArray));
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
      sessionStorage.setItem('choiceAir_select_'+elementId,JSON.stringify(selectedPassagerArray));
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
      _clearDate();
      $(".user_choice").on("click",function(){

        if(isMulSelect){
          var age=$(this).attr("data-age"),step=1
          if(age<2){
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
          if(age>=12){
            if(selectAdultNum+step>numofAdult || selectChildNum>numofChlid ){
              jAlert("只能选择"+numofAdult+"成人,"+numofChlid+"儿童");
              return;
            }
            else if(selectAdultNum+step>numofAdult){
              jAlert("只能选择"+numofAdult+"成人");
              return;
            }
          }
          else
          {
            if(selectAdultNum>numofAdult || selectChildNum+step>numofChlid ){
              jAlert("只能选择"+numofAdult+"成人,"+numofChlid+"儿童");
              return;
            }
            else if(selectChildNum+step>numofChlid){
              jAlert("只能选择"+numofAdult+"儿童");
              return;
            }

          }

          if (age >= 2 && age < 12) {
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

      //编辑按钮
      $(".user_edit").on("click",function(){
        currentOperationType="edit";
        editIDKey=$(this).attr('data-id');
        _model2UI(passagerArray[editIDKey]);

        _setTitleTip();
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

    $(".addAir_page .oprationType").html(operationType[currentOperationType].name);

    $(".addAir_page .bussinessTitle").html(titleType);
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

           for (var i = 0; i <= json.data.length - 1; i++) {
             json.data[i].selected = false;//默认未选择
             passagerArray[json.data[i].traveller.travellerId] = json.data[i];
           }
           console.log(passagerArray)
           var html = template(tpl_traveler, json);
           document.getElementById("allList").innerHTML = html;
           _bindSelectChoice();

           var selectPassagerList=JSON.parse(sessionStorage.getItem('choiceAir_select_'+elementId));
           if(selectPassagerList !=null){
             for(var key in selectPassagerList){
               if(selectPassagerList[key].PagerType==from) {
                 $(".list-traveler .user_choice[data-id=" + key + "]").click();
               }

             }
           }
            vlm.init();
         }
       });
       passagerListPage.show();
       addOrEditPassagePage.hide();
     }

     //如果免登陆，查询LocalStorge数据
    else{

       var html = template(tpl_traveler, {data:choiceAir_AddPassagerArray});
       choiceAir_AddPassagerArray.forEach(function(info){
           passagerArray[info.traveller.travellerId] = info;
       })
       var selectPassagerList=JSON.parse(sessionStorage.getItem('choiceAir_select_'+elementId));
       if(selectPassagerList !=null){
         for(var key in selectPassagerList){
           if(selectPassagerList[key].PagerType==from) {
             $(".list-traveler .user_choice[data-id=" + key + "]").click();
           }

         }
       }

       document.getElementById("allList").innerHTML = html;
       _bindSelectChoice();
     }
  };

  /*页面初始化方法*/
  var _initPage=function(){

    //免登陆，如果缓存没有数据，自己显示添加页面
    if(memberId==undefined){
      var data=JSON.parse(sessionStorage.getItem("choiceAir_AddPassagerArray"));
      if( data==null) {
        passagerListPage.hide();
        addOrEditPassagePage.show();
      }
      else{
        for (var key in data) {
          choiceAir_AddPassagerArray.push(data[key])
        }
        passagerListPage.show();
        addOrEditPassagePage.hide();
      }
    }
    if(!isShowChinaName){
      uc_cnName.hide();
    }
    if(!isShowContact){
      ul_contect.hide();
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

