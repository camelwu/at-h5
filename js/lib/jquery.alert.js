(function($) {

	$.alerts = {
		verticalOffset : -75, // vertical offset of the dialog from center screen, in pixels
		horizontalOffset : 0, // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize : true, // re-centers the dialog on window resize
		overlayOpacity : 0.5, // transparency level of overlay
		overlayColor : '#000', // base color of overlay
		draggable : true, // make the dialogs draggable (requires UI Draggables plugin)
		okButton : '确定', // text for the OK button
		cancelButton : '取消', // text for the Cancel button
		resetButton : '重新输入', // text for the esc button
		dialogClass : null, // if specified, this class will be applied to all dialogs
		// Public methods
		alert : function(message, title, callback, okstr) {
			if (title == null)
				title = 'Alert';
			$.alerts.okButton = okstr == null ? $.alerts.okButton : okstr;
			$.alerts._show(title, message, null, 'alert', function(result) {
				if (callback)
					callback(result);
			});
		},
		confirm : function(message, title, callback, okstr, escstr) {
			if (title == null)
				title = 'Confirm';
			$.alerts.okButton = okstr == null ? $.alerts.okButton : okstr;
			$.alerts.cancelButton = escstr == null ? $.alerts.cancelButton : escstr;

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
		layer : function(message, title) {
			if (title == null)
				title = '1';
			$.alerts._show(title, message, null, 'layer', function(result) {
				//if (callback) callback(result);
			});
		},
		// Private methods
		_show : function(title, msg, value, type, callback) {

			$.alerts._hide();
			$.alerts._overlay('show');
			if (type == "layer") {
				$("BODY").append('<div id="popup_container">' + '<div id="popup_title">' + title + '</div>' + '<div id="popup_content">' + '<div id="popup_more">' + msg + '</div>' + '</div>' + '</div>');
				console.log(title);
				//$("#popup_title").text(title);$("#popup-more").text(moreMsg);
			} else {
				$("BODY").append('<div id="popup_container"><div id="popup_content"><div id="popup_message"></div></div></div>');
				$("#popup_message").text(msg);
				$("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));
			}
			if ($.alerts.dialogClass)
				$("#popup_container").addClass($.alerts.dialogClass);

			// IE6 Fix var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';
			var pos = ('undefined' == typeof (document.body.style.maxHeight)) ? 'absolute' : 'fixed';
			$("#popup_container").css({
				position : pos,
				zIndex : 999,
				padding : 0,
				margin : 0
			});
			//
			$("#popup_content").addClass(type);
			if (type == "layer") {
				$("#popup_container").css({
					//minHeight : $("#popup_container").outerHeight(true),
					maxWidth : $("#popup_container").outerWidth() - 24
				});
				$.alerts._reposition();
			} else {
				$.alerts._reposition();
				$.alerts._maintainPosition(true);
			}
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_error"></div> <div id="popup_panel"><input type="button" class="d-ok" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click(function() {
						$.alerts._hide();
						callback(true);
					});
					break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_error"></div><div id="popup_panel"><div class="half"> <input type="button" class="d-esc" style="cursor: pointer" value="' + $.alerts.cancelButton + '" id="popup_cancel"></div><div class="half"><input type="button" style="cursor: pointer" class="d-ok" value="' + $.alerts.okButton + '" id="popup_ok" /></div></div>');
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
					var imgsrc = basePath + "/validate/getImage?rnd=" + Math.random();
					$("#popup_message").append('<input type="text" id="popup_prompt" maxlength="4" placeholder="请输入图片中的验证码" /><a id="reset-a" href="javascript:;"><div class="reset-ball"></div></a><div style="display:inline-block;width:160px;margin-top:10px;"><img id="getImg" src="' + imgsrc + '" width="90" height="30" style="display:inline"> <a href="javascript:;" id="change" style="display:inline;margin-left:10px;">换一张</a></div><div id="popup_error"></div>').after('<div id="popup_panel"><div class="half"><input type="button" class="d-esc" value="' + $.alerts.cancelButton + '" id="popup_cancel"</div><div class="half"><input type="button" class="d-ok" value="' + $.alerts.okButton + '" id="popup_ok"></div></div>');
					$("#change").click(function() {
						$("#getImg").attr("src", basePath + "/validate/getImage?rnd=" + Math.random());
					});
					$("#popup_prompt").keyup(function(e) {
						if ($(this).val().length > 0) {
							$("#reset-a").show();
							$("#popup_error").html("");
							if ($(this).val().length == 4) {
								$('#popup_ok').attr('disabled', "disabled");
								$("#popup_error").html('校验中，请稍候……');
								$.getJSON(basePath + '/validate/check_vcode1?vcode=' + $(this).val(), function(jsondata) {
									if (jsondata.code == 1) {
										$("#popup_ok").removeAttr('disabled');
										$("#popup_error").html(jsondata.msg);
									} else {
										$("#popup_error").html(jsondata.msg);
									}
								});
							}
						} else {
							$("#reset-a").hide();
						}
					});
					$("#reset-a").click(function() {
						$("#popup_prompt").val('');
						$("#reset-a").hide();
					});
					$("#popup_ok").click(function() {
						var val = $("#popup_prompt").val();
						if (val != "") {
							if (val.length != 4) {
								$("#popup_error").html('<div class="user-circle border-yellow">!</div>验证码是4个字符，请正确输入！');
							} else {
								$.alerts._hide();
								if (callback)
									callback(val);
							}
						} else {
							$("#popup_error").html('<div class="user-circle border-yellow">!</div>请输入验证码！');
							$("#popup_prompt").focus();
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
					$("#popup_message").append('<input type="password" id="popup_prompt" /><a id="reset-a" href="javascript:;"><div class="reset-ball"></div></a><div id="popup_error"></div>').after('<div id="popup_panel"><div class="half"><input type="button" class="d-esc" value="' + $.alerts.cancelButton + '" id="popup_cancel"></div><div class="half"><input type="button" class="d-ok" value="' + $.alerts.okButton + '" id="popup_ok"></div></div>');
					$("#popup_prompt").width($("#popup_message").width());
					$("#popup_prompt").keyup(function(e) {
						if ($(this).val().length > 0) {
							$("#reset-a").show();
							$("#popup_error").html("");
						} else {
							$("#reset-a").hide();
						}
					});
					$("#reset-a").click(function() {
						$("#popup_prompt").val('');
						$("#reset-a").hide();
					});
					$("#popup_ok").click(function() {
						var val = $("#popup_prompt").val();
						if (val != "") {
							if (val.length < 6 || val.length > 16) {
								$("#popup_error").html('<div class="user-circle border-yellow">!</div>密码为6-16个字符');
							} else {
								$.alerts._hide();
								if (callback)
									callback(val);
							}
						} else {
							$("#popup_error").html('<div class="user-circle border-yellow">!</div>密码不能为空，请输入！');
							$("#popup_prompt").focus();
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
					$("#popup_title").append('<a class="d-close" id="popup_cancel"> </a>');
					$("#popup_overlay").click(function() {
						$.alerts._hide();
					});
					$("#popup_cancel").click(function() {
						$.alerts._hide();
						if (callback)
							callback(false);
					});
					setTimeout("$.alerts._reposition()", "80");
					break;
			}
			if ($(".snap-content")) {
				$(".snap-content").css("overflow", "hidden")
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
			$(".snap-content").css("overflow", "auto");
			//$.alerts._overlay('hide');
			//$.alerts._maintainPosition(false);
		},
		_hide : function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
			$(".snap-content").css("overflow", "auto");
		},
		_overlay : function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position : 'absolute',
						zIndex : 998,
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
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight(true) / 2)) + $.alerts.verticalOffset, left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset, h = $(document).height() - 200;
			console.log(top);
			if (top < 0)
				top = 0;
			if (left < 0)
				left = 0;

			// IE6 fix
			if ('undefined' == typeof (document.body.style.maxHeight))
				top = top + $(window).scrollTop();

			if ($("#popup_more")) {
				top = ($(window).height() - $("#popup_container").outerHeight(true)) / 2;
				$("#popup_container").css({
					top : top + 'px',
					left : left + 'px'
				});
			} else {
				$("#popup_container").css({
					top : top + 'px',
					left : left + 'px'
				});
			}
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
	};
	// Shortuct functions
	jAlert = function(message, title, callback, okstr) {
		$.alerts.alert(message, title, callback, okstr);
	};
	jConfirm = function(message, title, callback, okstr, escstr) {
		$.alerts.confirm(message, title, callback, okstr, escstr);
	};

	jPrompt = function(message, value, title, callback, okstr, escstr) {
		$.alerts.prompt(message, value, title, callback, okstr, escstr);
	};
	jCode = function(message, value, title, callback, okstr, escstr) {
		$.alerts.code(message, value, title, callback, okstr, escstr);
	};
	jLayer = function(message, title) {
		$.alerts.layer(message, title);
	};

})(jQuery);

