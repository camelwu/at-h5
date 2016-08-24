/**
 * Created by zhouwei on 2016/5/25.
 */
(function () {
  /**
   * 当前页面在iframe中打开
   * location.href接收iframe.parent传递的参数
   *
   * @param {String} elementId
   * @param {String} flight
   * @param {String} tour
   * @param {String} travellerId
   * @param {Boolean} isInternationalTrip 是否国际航班
   * @param {Boolean} isMulSelect 是否多选
   * @param {Number} numofAdult 成人数
   * @param {Number} numofChild 儿童数
   * @param {String} id
   * @param {Date} departDate 出发日期
   * @param {Boolean} isShowChinaName 是否显示中文名
   * @param {Boolean} isShowContact 是否显示联系人
   * @param {String} callbackName 勾选乘机人后，回调iframe.parent.window[callbackName](arguments)，即传递参数arguments给callback
   */
  var urlobj = vlm.parseUrlPara(window.location.href);


  var isMulSelect = vlm.getpara("isMulSelect").toLowerCase() === "true" ? true : false; //是否多选
  var isInternationalTrip = vlm.getpara("isNeedPassport").toLowerCase() === "true" ? true : false; // 是否国际航班，true国际航班，false国内航班
  var titleType = vlm.getpara("title").substr(2); //是否多选title;
  var travId = vlm.getpara("Id"); //id,
  var elementId = vlm.getpara("elementId").replace(/(^\s*)|(\s*$)/g, ""); //id
  var from = vlm.getpara("from");
  var ifrCilent = window.parent.document.getElementById("choiceAir");
  var numofAdult = vlm.getpara("numofAdult"); //id
  var numofChild = vlm.getpara("numofChild"); //id;
  var selectAdultNum = 0;
  var selectChildNum = 0;
  var departDate = vlm.getpara("departDate"); //departDate;

  /**
   * @param {String} memberId 用户id
   * @param {Boolean} isLogin 判断登录状态：true登录 false未登录
   */
  var memberId = localStorage.getItem('memberid') || sessionStorage.getItem('memberid');
  var isLogin = memberId !== null && memberId !== undefined ? true : false;


  /**
   * @param {Object} passengerArray
   *   用途：登录状态下，全部用户数据；未登录状态下，全部用户数据
   *   来源：登录状态下，根据travellerId遍历“服务器返回data”；未登录状态下，根据travellerId遍历“choiceAir_AddPassengerArray”生成
   *
   * @param {Object} selectedPassengerArray 选中用户数据
   *
   * @param {Array} choiceAir_AddPassengerArray
   *   用途：未登录状态下，全部用户数据
   *   来源：sessionStorage.getItem('choiceAir_AddPassengerArray')中取出
   */
  var passengerArray = {};
  var selectedPassengerArray = {};
  var choiceAir_AddPassengerArray = [];
  var editIDKey = null;

  /**
   * @param {String} currentOperationType 当前操作类型：1.new(新增) & 2.edit(编辑)
   * @param {String} operationType 操作类型对应id&code
   */
  var currentOperationType = vlm.getpara("operationType") == null ? "new" : vlm.getpara("operationType");
  var operationType = {
    new: {id: 1, name: "新增", code: "70100012"},
    edit: {id: 2, name: "编辑", code: "70100013"},
  };


  var isShowChinaName = vlm.getpara("isShowChinaName").toLowerCase() == "false" ? false : true;
  var isShowContact = vlm.getpara("isShowContact").toLowerCase() == "false" ? false : true;
  var callbackName = vlm.getpara("callback");
  //页面Dom对象
  var closeWindowBtn = $("#toper .closedWin");
  var nameDescriptPager = $(".fillName_page");
  var finishBtn = $("#toper .addPassenger_finish");
  var idName = $(".addAir_page .cnNameUL");
  var enName = $(".addAir_page .enNameUL");
  var ul_contect = $(".addAir_page .ul_contect");

  var titleTip = $("#toper h3");
  /*页面*/
  var passengerListPage = $(".passageListPage");
  var addOrEditPassagePage = $(".addAir_page");
  var addPassengerBackBtn = $(".addAir_page .header_quit");
  var addPassengerTitle = $(".add_passenger .newTitle");

  //var tpl_traveler = ['{% var defaultShowCardType=vlm.getpara("isInternationalTrip").toLowerCase()=="true"? 1:2;  for(var i=0,len=data.length;i<len;i++){ alert(data.length); var dd=data[i];%}',
  //  '{% var age=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate")); if (dd.listTravellerIdInfo.length>0) %}'+
  //  '<li class="eve_traveler"  index={%=i%}>', '<b class="icon_common user_choice" data-id="{%=dd.traveller.travellerId%}"  data-age="{%=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate"))%}"></b>',
  //  '<b class="icon user_edit" data-id="{%=dd.traveller.travellerId%}" ></b>',
  //  '<ul class="often_user">',
  //  '<input type="hidden" class="travellerId" value="{%=dd.traveller.travellerId%}"> </input>',
  //  '<input type="hidden" class="sexName" value="{%=dd.traveller.sexName%}"> </input>',
  //  '<li data-card="{%=dd.listTravellerIdInfo[0].idType%}"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">{%=dd.traveller.lastName%}</span>/<span class="firstName">' +
  //  '{%=dd.traveller.firstName%}</span>',
  //  '{%  if(age<2){ %}'+
  //  '<i class="per_type" data-id="0">婴儿</i></li>'+
  //  '{% } else if(age>=2 && age<12){ %}'+
  //  '<i class="per_type" data-id="1">儿童</i></li>'+
  //  '{% } else if(age>=12){ %}'+
  //  '<i class="per_type" data-id="2">成人</i></li>',
  //  '{% } for(var i=0; i<=dd.listTravellerIdInfo.length-1;i++){  %}',
  //  '<li class="passport-num"><span class="passport-card-type">{%=vlm.arr_t[dd.listTravellerIdInfo[i].idType]%}</span> <span class="passport-card-number">{%=dd.listTravellerIdInfo[i].idNumber%}</span></li>',
  //  '{% } else{ %}' +
  //  '<li class="passport-num"><span class="passport-card-type">请补全{%=vlm.arr_t[dd.listTravellerIdInfo[i].idType]%}信息</span></li>',
  //  '{% }} %}',
  //  '</ul>',
  //  '</li>',
  //  '{% } %}'].join('');

  //常旅列表
  var tpl_traveler = $('#tpl_traveler').text();


  ////常旅列表
  //var tpl_traveler = ['{%  for(var i=0,len=data.length;i<len;i++){', 'var dd=data[i];%}',
  //  '{% var age=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate")); if (dd.listTravellerIdInfo.length>0) %}'+
  //  '<li class="eve_traveler"  index={%=i%}>', '<b class="icon_common user_choice" data-id="{%=dd.traveller.travellerId%}"  data-age="{%=vlm.Utils.getAge(dd.traveller.dateOfBirth,vlm.getpara("departDate"))%}"></b>',
  //  '<b class="icon user_edit" data-id="{%=dd.traveller.travellerId%}" ></b>',
  //  '<ul class="often_user">',
  //  '<input type="hidden" class="travellerId" value="{%=dd.traveller.travellerId%}"> </input>',
  //  '<input type="hidden" class="sexName" value="{%=dd.traveller.sexName%}"> </input>',
  //  '<li data-card="{%=dd.listTravellerIdInfo[0].idType%}"><spn>姓 / 名</spn><span class="lastName" style="padding-left: 6px">{%=dd.traveller.lastName%}</span>/<span class="firstName">' +
  //  '{%=dd.traveller.firstName%}</span>',
  //  '{%  if(age<2){ %}'+
  //  '<i class="per_type" data-id="0">婴儿</i></li>'+
  //  '{% } else if(age>=2 && age<12){ %}'+
  //  '<i class="per_type" data-id="1">儿童</i></li>'+
  //  '{% } else if(age>=12){ %}'+
  //  '<i class="per_type" data-id="2">成人</i></li>',
  //  '{% } if(dd.listTravellerIdInfo.length>0){ %}',
  //  '<li class="passport-num"><span class="passport-card-type">{%=vlm.arr_t[dd.listTravellerIdInfo[0].idType]%}</span> <span class="passport-card-number">{%=dd.listTravellerIdInfo[0].idNumber%}</span></li>',
  //  '{%  } %}',
  //  '</ul>',
  //  '</li>',
  //  '{% } %}'].join('');


  var getAdultAndChildNum = function (json) {
    var selectAdultNum = 0;
    var selectChildNum = 0;

    if (!validate(json)) {
      return;
    }
    calculate(json)

    function validate (json) {
      return !json.length;
    }
    function calculate(json) {
      Object.keys(json).forEach(function (key) {
        var PassengerType = this[key].traveller.PassengerType.toLowerCase()
        if (PassengerType === 'adult') {
          selectAdultNum++
        } else if (PassengerType === 'child') {
          selectChildNum++
        }
      }, json);
    }

    return {
      selectAdultNum: selectAdultNum,
      selectChildNum: selectChildNum
    }
  };


  //页面事件绑定
  var _bindEvent = function () {

    /**
     * 个人中心选择乘机人（出行人等）-乘机人（出行人等）列表-选择按钮
     * 选中对应乘机人
     */
    $("#allList").on("click", '.user_choice', function () {
      // item对应的id
      editIDKey = $(this).attr('data-id');

      // 取出对应乘机人信息
      var passengerInfo = passengerArray[editIDKey];
      // 传入当前航班类型：true国际，false国内
      passengerInfo.isInternationalTrip = isInternationalTrip;
      if (passengerInfo.isInternationalTrip) {
        if (!passengerInfo.traveller.lastName) {
          jAlert('请补全信息')
          return;
        }
      } else {
        if (!passengerInfo.traveller.idName) {
          jAlert('请补全信息')
          return;
        }
      }
      if (isMulSelect) {
        var age = $(this).attr("data-age");
        var step = 0;
        if (age < 2) {
          jAlert("该乘机人为婴儿，如需购买婴儿票,请联系客服！");
          return;
        }

        //选择操作 choiced 选择下个操作取消
        if ($(this).hasClass("choiced")) {
          step = -1 //选择加1个
        } else {
          step = 1; //取消减一个
        }
        if (age >= 12) {
          if (selectAdultNum + step > numofAdult || selectChildNum > numofChild) {
            jAlert("只能选择" + numofAdult + "成人," + numofChild + "儿童");
            return;
          } else if (selectAdultNum + step > numofAdult) {
            jAlert("只能选择" + numofAdult + "成人");
            return;
          }
        } else {
          if (selectAdultNum > numofAdult || selectChildNum + step > numofChild) {
            jAlert("只能选择" + numofAdult + "成人," + numofChild + "儿童");
            return;
          } else if (selectChildNum + step > numofChild) {
            jAlert("只能选择" + numofAdult + "儿童");
            return;
          }
        }

        if (age >= 2 && age < 12) {
          selectChildNum = selectChildNum + step;
        } else if (age >= 12) {
          selectAdultNum = selectAdultNum + step;
        }

        $(this).toggleClass("choiced");
        choicedArray()

        _setSelectPessageTip();

      } else {
        var len = $(".list-traveler .choiced").length;
        if (len >= 1 && !$(this).hasClass("choiced")) {
          $(this).removeClass("choiced");
          jAlert("对不起，只能单选！");
        } else {
          choicedArray()
          $(this).toggleClass("choiced");
        }
      }


      function choicedArray() {
        var selectPassengerList = $(".list-traveler .choiced")
        for (var i = 0; i <= selectPassengerList.length - 1; i++) {
          var key = $(selectPassengerList[i]).attr("data-id")
          passengerArray[key].PagerType = from;
          selectedPassengerArray[key] = passengerArray[key];
        }
      }
    })

    /**
     * 个人中心选择乘机人（出行人等）-乘机人（出行人等）列表-编辑按钮
     * 编辑对应乘机人
     */
    $("#allList").on("click", '.user_edit', function () {
      // 当前操作类型为编辑
      currentOperationType = "edit";
      // item对应的id
      editIDKey = $(this).attr('data-id');

      // 取出对应乘机人信息
      var passengerInfo = passengerArray[editIDKey];
      // 传入当前航班类型：true国际，false国内
      passengerInfo.isInternationalTrip = isInternationalTrip;

      // 编辑乘机人面板的数据回显
      _model2UI(passengerInfo);

      _setTitleTip();

      // 用户列表隐藏，添加编辑页面展示
      passengerListPage.hide();
      addOrEditPassagePage.show();
    })

    /**
     * 个人中心选择乘机人（出行人等）-新增按钮
     * 点击后弹出新增乘机人（出行人等）表单
     */
    $(".add_passenger").on("click", function () {
      currentOperationType = "new";
      editIDKey = null;
      _setTitleTip();
      _clearDate();
      passengerListPage.hide();
      addOrEditPassagePage.show();
    });

    $("#name_state").on("click", function () {
      nameDescriptPager.show();
    });
    $("#closeName").on("click", function () {
      nameDescriptPager.hide();
    });

    $("#toper .closedWin").on("click", function () {
      if (window.opener) {
        window.close();
      } else {
        ifrCilent.style.visibility = 'hidden';
        if ($(ifrCilent.parentNode).find('#showHide')) {
          $(ifrCilent.parentNode).find('#showHide').css('visibility', 'visible');
        }
        setTimeout(function () {
          ifrCilent.parentNode.removeChild(ifrCilent);
        }, 300);

      }
      ;
    });
    addPassengerBackBtn.on("click", function () {
      if (travId == "null") {
        passengerListPage.show();
        addOrEditPassagePage.hide();
      } else {
        closeWindowBtn.click();
      }
    });

    /**
     * 个人中心选择乘机人（出行人等）-完成按钮
     * 点击后_replacePagerAttri操作parent页面的节点
     */
    // FIXME: 此处直接操作parent页面的节点，待修复为：只为parent页面提供数据，回调location.href传递的callbackName，即执行parent[callbackName](data)
    finishBtn.on("click", function () {
      var selectPassengerList = $(".list-traveler .choiced");

      // 清空selectedPassengerArray
      selectedPassengerArray = {};
      for (var i = 0; i <= selectPassengerList.length - 1; i++) {
        var key = $(selectPassengerList[i]).attr("data-id")
        passengerArray[key].PagerType = from;
        var o = passengerArray[key].traveller;
        if (vlm.Utils.getAge(o.dateOfBirth, departDate) < 12) {
          o.PassengerType = "CHILD"; //乘客类型
        } else {
          o.PassengerType = "ADULT"; //乘客类型
        }
        selectedPassengerArray[key] = passengerArray[key];
      }
      _replacePagerAttri();
      _saveLocalStorge();

      if (callbackName !== undefined && callbackName !== "undefined" && callbackName !== null && callbackName !== "null") {
        //parent.callbackName();
        eval("parent." + callbackName + '(' + JSON.stringify(selectedPassengerArray[key]) + ')');
      }
      closeWindowBtn.click();
    });

    /**
     * 个人中心选择乘机人（出行人等）-新增按钮点击-新增乘机人（出行人等）页面-完成按钮
     * 点击后校验新增是否成功，成功后travId是否存在，存在点击“个人中心选择乘机人（出行人等）-完成按钮”
     */
    $(".addFinish").on("click", function () {
      // 校验单条数据合法性
      if (!_validate()) {
        return false;
      }

      // 存储到storage
      var flag = _saveDb();
      if (flag) {
        _getPassengerList();
        if (travId != "null") {
          finishBtn.click();
        }
      }

      function _saveDb() {
        /**
         * 新增乘机人是否成功
         *
         * @return {Boolean} true成功 false失败
         */

        // 根据操作类型，返回不同的数据
        var model = _ui2Model(currentOperationType);
        // selectedPassengerArray[editIDKey]存在的话，同步passengerArray[editIDKey]到selectedPassengerArray[editIDKey]
        selectedPassengerArray[editIDKey] ? selectedPassengerArray[editIDKey] = clone(model) : null;

        // isLogin判断登录状态
        if (isLogin) {
          //登录
          var Parameters = {
            Parameters: model,
            ForeEndType: 3,
            Code: operationType[currentOperationType].code
          }
          vlm.loadJson("", JSON.stringify(Parameters), function (data) {
            if (data.success) {
              _getPassengerList();
            } else {
              alert("接口错误！");
              return;
            }
          })
        } else {
          //未登录

          //编辑状态，移除数组元素，为了更数据
          if (currentOperationType === "new") {
            model.traveller.travellerId = new Date().getTime();
            model.isInternationalTrip = isInternationalTrip;
            choiceAir_AddPassengerArray.push(model);
          } else if (currentOperationType === 'edit') {
            /**
             * 成人变更为儿童
             *   如果已选中的儿童数，等于可选儿童数，则“成人变更为儿童”的那条取消选中
             * 儿童变更为成人
             *   如果已选中的成人数，等于可选成人数，则“儿童变更为成人”的那条取消选中
             *
             * @return {Boolean} true成功 false失败
             */
            var num = getAdultAndChildNum(selectedPassengerArray);
            if (num.selectAdultNum > numofAdult || num.selectChildNum > numofChild) {
              delete selectedPassengerArray[editIDKey];
            }
          }

          sessionStorage.setItem('choiceAir_AddPassengerArray', JSON.stringify(choiceAir_AddPassengerArray));
          passengerListPage.show();
          addOrEditPassagePage.hide();
        }
        _clearDate();
        return true;
      }

      /**
       * _validate()校验单条数据合法性
       *
       * @return {Boolean} true通过 false未通过
       */
      function _validate () {

        if (idName.is(':visible')) {
          if (!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".cnName").eq(0).val())) {
            jAlert("中文姓名不能为空！", "", null, "确认");
            return false;
          }
          if (!vlm.Utils.validate["chiName"]($(addOrEditPassagePage).find(".cnName").eq(0).val())) {
            jAlert("请输入有效的中文名！", "", null, "确认");
            return false;
          }
        }

        if (enName.is(':visible')) {
          if (!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".lastName").eq(0).val())) {
            jAlert("英文姓不能为空！", "", null, "确认");
            return false;
          }
          if (!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".firstName").eq(0).val())) {
            jAlert("英文名不能为空！", "", null, "确认");
            return false;
          }

          if (!vlm.Utils.validate["engName"]($(addOrEditPassagePage).find(".lastName").eq(0).val())) {
            jAlert("姓必须为英文！", "", null, "确认");
            return false;
          }
          if (!vlm.Utils.validate["engName"]($(addOrEditPassagePage).find(".firstName").eq(0).val())) {
            jAlert("名必须为英文！", "", null, "确认");
            return false;
          }
        }

        if (!vlm.Utils.validate["isNoEmpty"]($(addOrEditPassagePage).find(".cardNumber").eq(0).val())) {
          jAlert("证件号不能为空！", "", null, "确认");
          return false;
        }
        if ($(addOrEditPassagePage).find(".traveler_sex1").length == 0) {
          jAlert("请选择性别！", "", null, "确认");
          return false;
        }

        //证件有效期验证
        var card_validity = $('#time-cont').html();
        if (!$(addOrEditPassagePage).find("#time-cont").html()) {
          jAlert("请选择证件有效期！", "", null, "确认");
          return false;
        } else if (!vlm.Utils.compareTime(card_validity)) {
          jAlert('证件有效期无效，请重新选择!');
          return;
        }

        if (!$(addOrEditPassagePage).find("#birth-cont").html()) {
          jAlert("请选择出生日期！", "", null, "确认");
          return false;
        }

        return true;
      }
    })

    /**
     * 个人中心选择乘机人（出行人等）-新增按钮点击-新增乘机人（出行人等）页面-性别选择
     * 男女切换
     */
    $(".sex_cho_wrap span").on("click", function () {
      $(".sex_cho_wrap b").removeClass("traveler_sex1");
      $(".sex_cho_wrap b").addClass("traveler_sex2");
      $(this).find("b").removeClass("traveler_sex2").addClass("traveler_sex1");
    })
  };

  // 获取dom节点上的数据
  var _ui2Model = function (type) {
    var model;
    if (type == "new") {
      model = {
        "traveller": {
          "idName": $(".addAir_page .cnName").val(),
          "lastName": $(".addAir_page .lastName").val(),
          "firstName": $(".addAir_page .firstName").val(),
          "countryCode": $(".addAir_page .country").attr("data-code"),
          "countryName": $(".addAir_page .country").html(),
          "sexCode": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-code"),
          "sexName": $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-name"),
          "dateOfBirth": $(".addAir_page .birthDay").eq(0).html().replace('年', '/').replace('月', '/').replace('号', '').replace('日', ''),
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
            "idActivatedDate": $(".addAir_page .cardDateLimit").eq(0).html().replace('年', '/').replace('月', '/').replace('号', '').replace('日', ''),
            "nationalityCode": $(".addAir_page .cardCountry").attr("data-code")
          }
        ]
      }
    } else if (type === 'edit') {
      for (var key in passengerArray) {
        if (key == editIDKey) {
          model = passengerArray[key];
          break;
        }
      }
      model.traveller.idName = $(".addAir_page .cnName").val();
      model.traveller.lastName = $(".addAir_page .lastName").val();
      model.traveller.firstName = $(".addAir_page .firstName").val();
      model.traveller.countryCode = $(".addAir_page .country").attr("data-code");
      model.traveller.countryName = $(".addAir_page .country").html();
      model.traveller.sexCode = $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-code");
      model.traveller.sexName = $(".addAir_page .sex_cho_wrap .traveler_sex1").attr("data-name");
      model.traveller.dateOfBirth = $(".addAir_page .birthDay").eq(0).html().replace('年', '/').replace('月', '/').replace('号', '').replace('日', '');
      if (vlm.Utils.getAge(model.traveller.dateOfBirth, departDate) < 12) {
        model.traveller.PassengerType = "CHILD"; //乘客类型
      } else {
        model.traveller.PassengerType = "ADULT"; //乘客类型
      }

      model.traveller.email = $(".addAir_page .email").val();
      model.traveller.mobilePhone = $(".addAir_page .telephone").val();
      model.traveller.mobilePhoneAreaCode = $(".addAir_page .phone_pre").html();
      model.listTravellerIdInfo[0].idType = $(".addAir_page .postCard").attr("data-code");
      model.listTravellerIdInfo[0].idNumber = $(".addAir_page .cardNumber").val();
      model.listTravellerIdInfo[0].idCountry = $(".addAir_page .cardCountry").attr("data-code");
      model.listTravellerIdInfo[0].idCountryName = $(".addAir_page .cardCountry").html();
      model.listTravellerIdInfo[0].idActivatedDate = $(".addAir_page .cardDateLimit").eq(0).html().replace('年', '/').replace('月', '/').replace('号', '').replace('日', '');
      model.listTravellerIdInfo[0].nationalityCode = $(".addAir_page .cardCountry").attr("data-code");
    }
    return model;
  }

  var _model2UI = function (model) {
    // 取出当前航班类型
    // 如果是国际航班。回显英文姓和英文名
    // 如果是国内航班。回显中文名
    if (model.isInternationalTrip) {
      $(".addAir_page .lastName").val(model.traveller.lastName);
      $(".addAir_page .firstName").val(model.traveller.firstName);
    } else {
      $(".addAir_page .cnName").val(model.traveller.idName);
    }

    $(".addAir_page .postCard").attr("data-code", model.listTravellerIdInfo[0].idType);
    $(".addAir_page .postCard").attr("data-selected", model.listTravellerIdInfo[0].idType);
    $(".addAir_page .postCard").html(vlm.arr_t[model.listTravellerIdInfo[0].idType]);
    $(".addAir_page .cardNumber").val(model.listTravellerIdInfo[0].idNumber);
    $(".addAir_page .cardDateLimit").html(model.listTravellerIdInfo[0].idActivatedDate.substring(0, 10).replace('/', '-').replace('/', '-') + '');

    $(".addAir_page .cardDateLimit").html(model.listTravellerIdInfo[0].idActivatedDate.substring(0, 10).replace('/', '-').replace('/', '-') + '');

    var dateCacheEditDateLimit = model.listTravellerIdInfo[0].idActivatedDate.substring(0, 10);
    $(".addAir_page .cardDateLimit").attr('data-cache', dueCache(dateCacheEditDateLimit));
    $(".addAir_page .cardDateLimit").attr('data-selected', dueCache(dateCacheEditDateLimit).split("-"));

    $(".addAir_page .cardCountry").attr("data-code", model.listTravellerIdInfo[0].idCountry);
    $(".addAir_page .cardCountry").html(model.listTravellerIdInfo[0].idCountryName);
    $(".addAir_page .country").attr("data-code", model.traveller.countryCode);
    $(".addAir_page .country").html(model.traveller.countryName);
    $(".addAir_page .telephone").val(model.traveller.mobilePhone);
    $(".addAir_page .email").val(model.traveller.email);
    $(".addAir_page .birthDay").html(model.traveller.dateOfBirth.substring(0, 10).replace('/', '-').replace('/', '-') + '');

    var dateCacheEdit = model.traveller.dateOfBirth.substring(0, 10)
    $(".addAir_page .birthDay").attr('data-cache', dueCache(dateCacheEdit));
    $(".addAir_page .birthDay").attr('data-selected', dueCache(dateCacheEdit).split("-"));

    $(".addAir_page .phone_pre").html(model.traveller.mobilePhoneAreaCode);
    $(".addAir_page .sex_cho_wrap .icon_h").removeClass("traveler_sex1").addClass("traveler_sex2");
    $(".addAir_page .sex_cho_wrap .icon_h[data-code='" + model.traveller.sexCode + "']").removeClass("traveler_sex2").addClass("traveler_sex1")


  }

  //缓存数据
  var _saveLocalStorge = function () {
    var param;
    if (isMulSelect) {
      param = []
      for (var key in selectedPassengerArray) {
        var o = {
          "Id": selectedPassengerArray[key].traveller.travellerId,
          "SexCode": selectedPassengerArray[key].traveller.sexCode,
          "FirstName": isInternationalTrip ? selectedPassengerArray[key].traveller.firstName : selectedPassengerArray[key].traveller.idName,//如果是国内机票 将中文名通过first name传递
          "LastName": isInternationalTrip ? selectedPassengerArray[key].traveller.lastName : selectedPassengerArray[key].traveller.idName, //如果是国内机票 将中文名通过lastname传递
          "idName": selectedPassengerArray[key].traveller.idName,
          "DateOfBirth": selectedPassengerArray[key].traveller.dateOfBirth,
          "email": selectedPassengerArray[key].traveller.email,
          "mobile": selectedPassengerArray[key].traveller.mobilePhone,
          "CertificateInfo": {
            "IdType": selectedPassengerArray[key].listTravellerIdInfo[0].idType,
            "IdCountry": selectedPassengerArray[key].listTravellerIdInfo[0].idCountry,
            "IdNumber": selectedPassengerArray[key].listTravellerIdInfo[0].idNumber,
            "IdActivatedDate": selectedPassengerArray[key].listTravellerIdInfo[0].idActivatedDate
          },
          "BaggageCode": "",
          "CountryCode": selectedPassengerArray[key].traveller.countryCode
        }

        if (vlm.Utils.getAge(o.DateOfBirth, departDate) < 12) {
          o.PassengerType = "CHILD"; //乘客类型
        } else {
          o.PassengerType = "ADULT"; //乘客类型
        }
        param.push(o);
      }

      localStorage.setItem('travellerInfo_selected', JSON.stringify(param));
      sessionStorage.setItem('choiceAir_select_' + elementId, JSON.stringify(selectedPassengerArray));
    } else {
      for (var key in selectedPassengerArray) {
        param = {
          "SexCode": selectedPassengerArray[key].traveller.sexCode,
          "FirstName": isInternationalTrip ? selectedPassengerArray[key].traveller.firstName : selectedPassengerArray[key].traveller.idName,//如果是国内机票 将中文名通过first name传递
          "LastName": isInternationalTrip ? selectedPassengerArray[key].traveller.lastName : selectedPassengerArray[key].traveller.idName, //如果是国内机票 将中文名通过lastname传递
          "Email": selectedPassengerArray[key].traveller.email,
          "CountryNumber": selectedPassengerArray[key].traveller.countryCode,
          "ContactNumber": selectedPassengerArray[key].traveller.mobilePhone,
          "MobilePhone": selectedPassengerArray[key].traveller.mobilePhone,
        }
      }
      localStorage.setItem('contact_selected', JSON.stringify(param));
      sessionStorage.setItem('choiceAir_select_' + elementId, JSON.stringify(selectedPassengerArray));
    }
  };

  //替换页面元素
  var _replacePagerAttri = function () {

    var htmlObj = $(ifrCilent.parentNode).find("#" + elementId);
    if (isMulSelect) {
      //除了隐藏模板，remove所以子节点
      htmlObj.children(":visible").remove()
      var children = htmlObj.children().eq(0);

      for (var key in selectedPassengerArray) {
        for (var i = 0; i <= selectedPassengerArray[key].listTravellerIdInfo.length - 1; i++) {
          selectedPassengerArray[key].listTravellerIdInfo[i].idName = vlm.arr_t[selectedPassengerArray[key].listTravellerIdInfo[i].idType];
        }
        var cloneObj = children.clone(true);
        cloneObj.show();
        elementList = $(cloneObj).find("[data-elementname]");
        htmlObj.append(cloneObj);
        for (var i = 0; i <= elementList.length - 1; i++) {
          var obj = elementList[i],
            attribute = elementList[i].attributes["data-elementname"].value,
            val = passengerArray[key].traveller[attribute];
          if (val == undefined || val == "") {
            val = passengerArray[key].listTravellerIdInfo[0][attribute];
          }
          if (obj.tagName == "INPUT") {
            $(elementList[i]).val(val);
          } else {
            $(elementList[i]).html(val);
          }
        }
      }
    } else {
      var elementList = htmlObj.find("[data-elementname]");
      for (var key in selectedPassengerArray) {
        for (var i = 0; i <= elementList.length - 1; i++) {
          var obj = elementList[i],
            attribute = elementList[i].attributes["data-elementname"].value,
            val = passengerArray[key].traveller[attribute];
          if (val == undefined) {
            passengerArray[key].listTravellerIdInfo[0][attribute];
          }
          if (obj.tagName == "INPUT") {
            $(elementList[i]).val(val);
          } else if (obj.className == "country-btn") {
            val = getCountryName(val).chineseName;
            $(elementList[i]).html(val);
          } else {
            $(elementList[i]).html(val);
          }
        }
      }
    }
  };

  //设置标题头信息
  var _setTitleTip = function () {
    if (numofAdult == null || numofAdult == "null") {
      titleTip.html("选择" + titleType);
    } else {
      _setSelectPessageTip();
    }
    $(".add_passenger .newTitle").html("新增" + titleType)

    $(".addAir_page .oprationType").html(operationType[currentOperationType].name);

    $(".addAir_page .bussinessTitle").html(titleType);
  };

  var _setSelectPessageTip = function () {
    var num = getAdultAndChildNum(selectedPassengerArray);
    if (numofChild > 0) {
      titleTip.html("已选：成人" + num.selectAdultNum + "/" + numofAdult + "  儿童" + num.selectChildNum + "/" + numofChild + "")
    } else {
      titleTip.html("已选：成人" + num.selectAdultNum + "/" + numofAdult)
    }
  };

  /**
   * 获取常旅客数据，拼接数据+模板，存入常旅客列表
   */
  var _getPassengerList = function () {
    // 注意这里操作的全局下的selectAdultNum
    // 成人和儿童数清零
    selectAdultNum = 0, selectChildNum = 0;

    //如果正常登录，查询数据库常旅接口
    if (isLogin) {
      var Parameters = {
        "Parameters": {"memberId": memberId},
        "ForeEndType": 3,
        "Code": "0074"
      };
      vlm.loadJson("", JSON.stringify(Parameters), function (json) {
        if (json.success) {
          for (var i = 0; i <= json.data.length - 1; i++) {
            json.data[i].selected = false; //默认未选择
            passengerArray[json.data[i].traveller.travellerId] = json.data[i];
            var o = passengerArray[json.data[i].traveller.travellerId].traveller;
            if (vlm.Utils.getAge(o.dateOfBirth, departDate) < 12) {
              o.PassengerType = "CHILD"; //乘客类型
            } else {
              o.PassengerType = "ADULT"; //乘客类型
            }
          }
          var html = template(tpl_traveler, json);
          document.getElementById("allList").innerHTML = html;
          selectedPassengerArray = JSON.parse(sessionStorage.getItem('choiceAir_select_' + elementId)) || {};
          if (selectedPassengerArray != null) {
            // 遍历选中对象，选中并计算成人数和儿童数
            Object.keys(selectedPassengerArray).forEach(function (key) {
              if (selectedPassengerArray[key].PagerType == from) {
                // 切换元素选中状态
                var li = $(".list-traveler .user_choice[data-id=" + key + "]");
                selectUser(li);

                // 成人和儿童数添加
                calculatePersonNum(selectedPassengerArray[key].traveller.PassengerType);
              }
            });
          }
          if (travId != "null") {
            currentOperationType = "edit";
            editIDKey = travId;
            _model2UI(passengerArray[editIDKey]);
            passengerListPage.hide();
            addOrEditPassagePage.show();
            _setTitleTip();
          } else {
            passengerListPage.show();
            addOrEditPassagePage.hide();
          }
          vlm.init();
        }
      });

    } else {
      //如果未登录

      // isInternational传true或false，为了防止template报错。后面改为ejs解析
      var json = {
        data: choiceAir_AddPassengerArray
      };


      var html = template(tpl_traveler, json);
      document.getElementById("allList").innerHTML = html;
      vlm.init();


      choiceAir_AddPassengerArray.forEach(function (info) {
        passengerArray[info.traveller.travellerId] = info;
        var o = passengerArray[info.traveller.travellerId].traveller;
        if (vlm.Utils.getAge(o.dateOfBirth, departDate) < 12) {
          o.PassengerType = "CHILD"; //乘客类型
        } else {
          o.PassengerType = "ADULT"; //乘客类型
        }
      })

      if (currentOperationType == "new" && selectedPassengerArray != null) {
        // 遍历选中对象，选中并计算成人数和儿童数
        Object.keys(selectedPassengerArray).forEach(function (key) {
          if (selectedPassengerArray[key].PagerType == from) {
            // 切换元素选中状态
            var li = $(".list-traveler .user_choice[data-id=" + key + "]");
            selectUser(li);

            // 成人和儿童数添加
            calculatePersonNum(selectedPassengerArray[key].traveller.PassengerType);
          }
        });
      }
      _setTitleTip();

    }


    // 切换元素选中状态
    function selectUser(li) {
      li.toggleClass("choiced");
    }
    // 成人和儿童数添加
    // 注意这里操作的全局下的selectAdultNum
    function calculatePersonNum(PassengerType) {
      if (PassengerType === 'ADULT') {
        selectAdultNum++
      } else if (PassengerType === 'CHILD') {
        selectChildNum++
      }
    }
  };

  var truncateCardInfo = function () {
    var cardId = $(".postCard").attr("data-code");
    if (editIDKey != null) {
      var model = passengerArray[editIDKey];
      var cardList = model.listTravellerIdInfo;
      addOrEditPassagePage.find(".cardNumber").val("");
      addOrEditPassagePage.find(".cardDateLimit").val("");
      addOrEditPassagePage.find(".cardCountry").html("中国");
      addOrEditPassagePage.find(".cardCountry").attr("data-code", "CN")

      for (var index in cardList) {
        if (cardList[index].idType == cardId) {
          addOrEditPassagePage.find(".cardNumber").val(cardList[index].idNumber);
          addOrEditPassagePage.find(".cardDateLimit").val(cardList[index].idActivatedDate);
          addOrEditPassagePage.find(".cardCountry").html(cardList[index].idCountryName);
          addOrEditPassagePage.find(".cardCountry").attr("data-code", cardList[index].idCountry);
          return;
        } else {
          var newDate, year, month, day
          if (departDate == null || departDate == "null") {
            newDate = new Date();
          } else {
            newDate = new Date(departDate.replace('-', "/").replace('-', "/").replace('T', " "));
          }

          newDate.setMonth(newDate.getMonth() + 6);
          year = newDate.getFullYear();
          month = newDate.getMonth() + 1;
          day = newDate.getDate();

          $(".addAir_page .cardDateLimit").attr("data-cache", year + "-" + month + "-" + day + "");
          $(".addAir_page .cardDateLimit").val(year + "-" + month + "-" + day + "");
        }
      }
    }
  }

  /*页面初始化方法*/
  var _initPage = function () {

    /**
     * picker1
     * picker2
     * picker3
     */
    var picker1 = new ATplugins.Picker({
      input: "#time-cont",
      type: "validate",
      cont: "uuun2"
    });
    var picker2 = new ATplugins.Picker({
      input: "#birth-cont",
      type: "date",
      value: ['1987年', '6月', '15日'], // 初始化选中数据
      cont: "uuun1"
    });
    var cardType = isInternationalTrip == true ? "cardInte" : "card"
    var picker3 = new ATplugins.Picker({
      input: "#postCard",
      type: cardType,
      cont: "uuu",
      callback: truncateCardInfo
    });

    _clearDate();
    //未登录，如果缓存没有数据，自己显示添加页面
    if (!isLogin) {
      var data = sessionStorage.getItem("choiceAir_AddPassengerArray") ? JSON.parse(sessionStorage.getItem("choiceAir_AddPassengerArray")) : null;
      if (data === null) {
        passengerListPage.show();
        addOrEditPassagePage.hide();
      } else {
        for (var i = 0; i <= data.length - 1; i++) {
          data[i].PagerType = from;
          choiceAir_AddPassengerArray.push(data[i])
        }
        passengerListPage.show();
        addOrEditPassagePage.hide();
      }
    }
    // 如果是国际航班，展示中文名
    if (isInternationalTrip) {
      idName.hide();
      enName.show();
    } else {
      idName.show();
      enName.hide();
    }
    if (!isShowContact) {
      ul_contect.hide();
    } else {
      ul_contect.show();
    }

    // 初始化页面时，sessionStorage取出选中数据
    selectedPassengerArray = sessionStorage.getItem('choiceAir_select_' + elementId) ? JSON.parse(sessionStorage.getItem('choiceAir_select_' + elementId)) : {};

    _getPassengerList();
    _bindEvent();

    if (!isLogin && travId != "null") {
      currentOperationType = "edit";
      editIDKey = travId;
      _model2UI(passengerArray[editIDKey]);
      passengerListPage.hide();
      addOrEditPassagePage.show();
      _setTitleTip();
      return;
    }

    addPassengerTitle.html("新增" + titleType);
    var dataCache = JSON.parse(sessionStorage.getItem("choiceAir_AddPassengerArray"));
    _setTitleTip();
    if (dataCache == null) {
      titleTip.html("选择" + titleType);
    }
  };


  //证件生日有效期缓存函数
  function dueCache(str1) {

    if (str1 == "") {
      return;
    }
    var str = str1.split('-');
    if (str[1].charAt(0) == 0 && str[2].charAt(0) == 0) {

      str = str[0] + '年-' + str[1].charAt(1) + '月-' + str[2].charAt(1) + '日';
    } else if (str[1].charAt(0) == 0 && str[2].charAt(0) != 0) {

      str = str[0] + '年-' + str[1].charAt(1) + '月-' + str[2] + '日';
    } else if (str[1].charAt(0) != 0 && str[2].charAt(0) == 0) {

      str = str[0] + '年-' + str[1] + '月-' + str[2].charAt(1) + '日';
    } else {
      str = str[0] + '年-' + str[1] + '月-' + str[2] + '日';
    }
    return str;
  }

  var _clearDate = function () {
    selectAdultNum = 0;
    selectChildNum = 0;
    currentOperationType = "new";
    editIDKey = null;
    addOrEditPassagePage.find("input").val("");

    var newDate, year, month, day
    if (departDate == null || departDate == "null") {
      newDate = new Date();
    } else {
      newDate = new Date(departDate.replace('-', "/").replace('-', "/").replace('T', " "));
    }


    newDate.setMonth(newDate.getMonth() + 6);
    year = newDate.getFullYear();
    month = newDate.getMonth() + 1;
    day = newDate.getDate();

    $(".addAir_page .cardDateLimit").attr("data-cache", year + "-" + month + "-" + day + "");
    $(".addAir_page .cardDateLimit").html();

    $(".addAir_page .birthDay").attr("data-cache", dueCache("1990-01-01"));
    $(".addAir_page .birthDay").html("1990-01-01");


    $(".addAir_page .postCard").attr("data-cache", "1");
    $(".addAir_page .postCard").val("护照");


    $(".addAir_page .cardCountry").attr("data-code", "CN");
    $(".addAir_page .cardCountry").html("中国");

    $(".addAir_page .country").attr("data-code", "CN");
    $(".addAir_page .country").html("中国");

    $(".addAir_page .sex_cho_wrap .icon_h").removeClass("traveler_sex1").addClass("traveler_sex2")

  }

  /**
   * clone() 用于克隆引用类型的JSON
   *
   * @param {JSON Object} jsonObj
   * @return {JSON Object} cloned jsonObj
   */
  function clone(jsonObj) {
    return JSON.parse(JSON.stringify(jsonObj));
  }

  _initPage()
})();
