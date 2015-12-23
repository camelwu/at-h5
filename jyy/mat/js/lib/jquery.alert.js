(function($) {

	$.alerts = {

		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time

		verticalOffset : -75, // vertical offset of the dialog from center screen, in pixels
		horizontalOffset : 0, // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize : true, // re-centers the dialog on window resize
		overlayOpacity : 0.5, // transparency level of overlay
		overlayColor : '#000', // base color of overlay
		draggable : true, // make the dialogs draggable (requires UI Draggables plugin)
		okButton : '确　　定', // text for the OK button
		cancelButton : '取　　消', // text for the Cancel button
		resetButton : '重新输入', // text for the esc button
		dialogClass : null, // if specified, this class will be applied to all dialogs

		// Public methods

		alert : function(message, title, callback, okstr) {
			if (title == null)
				title = 'Alert';
			$.alerts.okButton = okstr == null?$.alerts.okButton:okstr;
			$.alerts._show(title, message, null, 'alert', function(result) {
				if (callback)
					callback(result);
			});
		},
		confirm : function(message, title, callback, okstr, escstr) {
			if (title == null)
				title = 'Confirm';
			$.alerts.okButton = okstr == null?$.alerts.okButton:okstr;
			$.alerts.cancelButton = escstr == null?$.alerts.cancelButton:escstr;

			$.alerts._show(title, message, null, 'confirm', function(result) {
				if (callback)
					callback(result);
			});
		},
		prompt : function(message, value, title, callback) {
			if (title == null)
				title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if (callback)
					callback(result);
			});
		},
		code : function(message, value, title, callback) {
			if (title == null)
				title = '输入验证码';
			$.alerts._show(title, message, value, 'code', function(result) {
				if (callback)
					callback(result);
			});
		},
		layer : function(message, value, title, result, callback,moreMsg){
			if (title == null)
				title = '1';
			$.alerts._show(title, message, value, 'layer', function(result) {
				if (callback)
					callback(result);
			}, result,moreMsg);
		},

		// Private methods

		_show : function(title, msg, value, type, callback, result,moreMsg) {
			if(typeof(moreMsg) == "undefined")
				moreMsg="";
			if(type=="layer"){
				$.alerts._remove();
				$("BODY").append('<div id="popup-overlay" class="all-elements"><div id="popup-container" class="snap-content"></div></div>');
				$("#popup-container").append('<div class="popup-'+result+'">' + '<a href="javascript:;" id="popup_cancel" class="popup-close"></a>' 
						                   + '<div id="popup-content"></div>' 
						                   + '<div class="popup-more">'+moreMsg+'</div>' 
						                   + '<div id="popup-tips"></div><a href="javascript:;" class="popup-btns" id="popup_ok"></a>' + '</div>');
				$("#popup-tips").append('<div id="popup-message"></div>');
				//alert(moreMsg)
				//$("#popup-more").html(moreMsg);//更多
				$("#popup_ok").text(title);//按钮文字
				$("#popup-message").html(msg);//框内文字
				$("#popup-content").html(value);//红包区域文字
			}else if(type!="error"){
				$.alerts._hide();
				$.alerts._overlay('show');
				$("BODY").append('<div id="popup_container">' + '<div id="popup_title"></div>' 
								+ '<div id="popup_content">'
								+ '<div class="popup-more">'+moreMsg+'</div>' 
								+ '<div id="popup_message"></div>' + '</div>' + '</div>');
				if ($.alerts.dialogClass) $("#popup_container").addClass($.alerts.dialogClass);

				// IE6 Fix var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';
				var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';
				$("#popup_container").css({
					position : pos,
					zIndex : 99999,
					padding : 0,
					margin : 0
				});
				//$("#popup-more").text(moreMsg);//更多
				$("#popup_title").text(title);
				$("#popup_content").addClass(type);
				$("#popup_message").text(msg);
				$("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));
				$("#popup_container").css({
					minWidth : $("#popup_container").outerWidth(),
					maxWidth : $("#popup_container").outerWidth()
				});

				$.alerts._reposition();
				$.alerts._maintainPosition(true);
			}
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_error"></div> <div id="popup_panel"><input type="button" class="button button-blue" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click(function() {
						$.alerts._hide();
						callback(true);
					});
					break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_error"></div><div id="popup_panel"> <input type="button" class="button button-light mgr20" value="' + $.alerts.cancelButton + '" id="popup_cancel" /> <input type="button" class="button button-blue" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click(function() {
						$.alerts._hide();
						if (callback)
							callback(true);
					});
					$("#popup_cancel").click(function() {
						$.alerts._hide();
						if (callback)
							callback(false);
					});
					$("#popup_ok").focus();
					break;
				case 'code':
					var imgsrc = basePath+"/validate/getImage?rnd="+Math.random();
					$("#popup_message").append('<input type="text" id="popup_prompt" maxlength="4" placeholder="请输入图片中的验证码" /><a id="reset-a" href="javascript:;"><div class="reset-ball"></div></a><div style="display:inline-block;width:160px;margin-top:10px;"><img id="getImg" src="'+imgsrc+'" width="90" height="30" style="display:inline"> <a href="javascript:;" id="change" style="display:inline;margin-left:10px;">换一张</a></div><div id="popup_error"></div>').after('<div id="popup_panel"> <input type="button" class="button button-light mgr20" value="' + $.alerts.cancelButton + '" id="popup_cancel" /> <input type="button" class="button button-blue" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					//$("#popup_prompt").css("width","");
					$("#change").click(function(){
				         $("#getImg").attr("src",basePath+"/validate/getImage?rnd="+Math.random())
				    })
					$("#popup_prompt").keyup(function(e){
						if($(this).val().length>0){
							$("#reset-a").show();
							$("#popup_error").html("");
							if($(this).val().length==4){
								$('#popup_ok').attr('disabled',"disabled");
								$("#popup_error").html('校验中，请稍候……');
								$.getJSON(basePath + '/validate/check_vcode1?vcode='+$(this).val(), function(jsondata) {
									if(jsondata.code==1){$("#popup_ok").removeAttr('disabled');$("#popup_error").html(jsondata.msg);}else{$("#popup_error").html(jsondata.msg);}
								});
							}
						}else{
							$("#reset-a").hide();
						}
					});
					$("#reset-a").click(function(){
						$("#popup_prompt").val('');
						$("#reset-a").hide();
					});
					$("#popup_ok").click(function() {
						var val = $("#popup_prompt").val();
						if(val!=""){
							if(val.length!=4){
								$("#popup_error").html('<div class="user-circle border-yellow">!</div>验证码是4个字符，请正确输入！');
			                }else{
			                	$.alerts._hide();
			                	if (callback) callback(val);
			                }
						}else{
							$("#popup_error").html('<div class="user-circle border-yellow">!</div>请输入验证码！');$("#popup_prompt").focus();
						}
					});
					$("#popup_cancel").click(function() {
						$.alerts._hide();
					});
					
					if (value)
						$("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
					break;

				case 'prompt':
					$("#popup_message").append('<input type="password" id="popup_prompt" /><a id="reset-a" href="javascript:;"><div class="reset-ball"></div></a><div id="popup_error"></div>').after('<div id="popup_panel"> <input type="button" class="button button-light mgr20" value="' + $.alerts.cancelButton + '" id="popup_cancel" /> <input type="button" class="button button-blue" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_prompt").width($("#popup_message").width());
					$("#popup_prompt").keyup(function(e){
						if($(this).val().length>0){
							$("#reset-a").show();
							$("#popup_error").html("");
						}else{
							$("#reset-a").hide();
						}
					});
					$("#reset-a").click(function(){
						$("#popup_prompt").val('');
						$("#reset-a").hide();
					});
					$("#popup_ok").click(function() {
						var val = $("#popup_prompt").val();
						if(val!=""){
							if(val.length<6 || val.length>16){
								$("#popup_error").html('<div class="user-circle border-yellow">!</div>密码为6-16个字符');
			                }else{
			                	$.alerts._hide();
			                	if (callback) callback(val);
			                }
						}else{
							$("#popup_error").html('<div class="user-circle border-yellow">!</div>密码不能为空，请输入！');$("#popup_prompt").focus();
						}
					});
					$("#popup_cancel").click(function() {
						$.alerts._hide();
					});
					
					if (value)
						$("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
					break;
				case 'layer':
					var h = Math.max($(window).height(),$(document).height());
					//$("#popup-overlay").css("height",h);
					$("#popup_ok").click(function() {
						$.alerts._remove();
						if (callback)
							callback(true);
					});
					$("#popup_cancel").click(function() {
						$.alerts._remove();
						
					});
					break;
			}

			// Make draggable
			if ($.alerts.draggable) {
				try {
					$("#popup_container").draggable({
						handle : $("#popup_title")
					});
					$("#popup_title").css({
						cursor : 'move'
					});
				} catch(e) {/* requires jQuery UI draggables */
				}
			}
		},

		_remove : function() {
			$("#popup-overlay").remove();
			//$.alerts._overlay('hide');
			//$.alerts._maintainPosition(false);
		},
		_hide : function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		_overlay : function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position : 'absolute',
						zIndex : 99998,
						top : '0',
						left : '0',
						width : '100%',
						height : '100%',
						background : $.alerts.overlayColor,
						opacity : $.alerts.overlayOpacity
					});
					break;
				case 'hide':
					$("#popup_overlay").remove();
					break;
			}
		},

		_reposition : function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if (top < 0)
				top = 0;
			if (left < 0)
				left = 0;

			// IE6 fix
			if ('undefined' == typeof (document.body.style.maxHeight))
				top = top + $(window).scrollTop();

			$("#popup_container").css({
				top : top + 'px',
				left : left + 'px'
			});
			//$("#popup_overlay").height($(document).height());
		},

		_maintainPosition : function(status) {
			if ($.alerts.repositionOnResize) {
				switch(status) {
					case true:
						$(window).bind('resize', function() {
							$.alerts._reposition();
						});
						break;
					case false:
						$(window).unbind('resize');
						break;
				}
			}
		}
	}

	// Shortuct functions
	jAlert = function(message, title, callback, okstr) {
		$.alerts.alert(message, title, callback, okstr);
	}
	jConfirm = function(message, title, callback, okstr, escstr) {
		$.alerts.confirm(message, title, callback, okstr, escstr);
	};

	jPrompt = function(message, value, title, callback, okstr, escstr) {
		$.alerts.prompt(message, value, title, callback, okstr, escstr);
	};
	jCode = function(message, value, title, callback, okstr, escstr) {
		$.alerts.code(message, value, title, callback, okstr, escstr);
	};
	jLayer = function(message, value, title, result, callback,moreMsg) {
		$.alerts.layer(message, value, title, result, callback,moreMsg);
	};
	
})(jQuery); 

