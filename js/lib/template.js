/*
 * template.js
 * param:idstring,objdata
 * auth:wusongbo
 * 2016-2-2
 * ver:1.0.0
 * example:
   tpl:<a href="#here" class="name1{% if(is_sel) { %}selected{% } %}" value="{%=value%}">{%=text%}</a>
   dat:{is_sel:true,value:'zh',text:'my test word'}
 	//getdata
 	var data = $.ajax();
 	//view
 	var str = template("#id",data);
 	$("#id").html(str);
 * */
function template(){
	var args = [].slice.call(arguments), len = args.length;
	if(len<2)return;
	var _TplEngine = function(str,data){
		if(data instanceof Array){
			var html='',
			i=0,
			len=data.length;
			for(;i<len;i++){
				html+=_getTpl(str)(data[i]);
			}
			return html;
		}else{
			return _getTpl(str)(data);
		}
	},
	_getTpl = function(str){
		var ele = document.getElementById(str);
		if(ele){
			var html = /^(textarea|input)$/i.test(ele.nodeName)?ele.value:ele.innerHTML;
			return _compileTpl(html);
		}else{
			return _compileTpl(str);
		}
	},
	_compileTpl = function(str){
		var fnBody = "var template_array=[];\nvar fn=(function(data){\nvar template_key='';\nfor(key in data){\ntemplate_key+=('var '+key+'=data[\"'+key+'\"];');\n}\neval(template_key);\ntemplate_array.push('"+_dealTpl(str)+"');\ntemplate_key=null;\n})(templateData);\nfn=null;\nconsole.log(template_array);return template_array.join('');";
		return new Function("templateData",fnBody);
	},
	_dealTpl = function(str){
		var _left='{%',_right='%}';
		return String(str)
		.replace(/&lt;/g,'<')
		.replace(/&gt;/g,'>')
		.replace(/[\r\t\n]/g,'')
		.replace(new RegExp(_left+'=(.*?)'+_right,'g'),"',typeof($1)==='undefined'?'':$1,'")
		.replace(new RegExp(_left,'g'),"');")
		.replace(new RegExp(_right,'g'),"template_array.push('");
	};
	return _TplEngine(arguments[0],arguments[1]);
};
