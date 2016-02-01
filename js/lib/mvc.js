/**                                                                                                                                     
 * @name MVC                                                                                                                          
 * 简单MVC控件                                                                                                                              
 * */                                                                                                                                   
$(function(){                                                                                                                           
	// 初始化MVC对象                                                                                                                         
	var MVC = MVC || {};                                                                                                                
	// 初始化MVC数据模型                                                                                                                       
	MVC.model = function(){                                                                                                             
		//内部对象                                                                                                                          
		var M = {};                                                                                                                     
		//服务器端获取数据，通常Ajax方式并存储，直接作为同步数据并写在页面中，减少服务器端异步请求操作                                                                              
		M.data = {};                                                                                                                    
		//配置数据，页面加载时即提供                                                                                                                 
		M.conf = {};                                                                                                                    
		//返回操作方法                                                                                                                        
		return {                                                                                                                        
			getData:function(m){                                                                                                        
				return M.data[m];                                                                                                       
			},                                                                                                                          
			getConf:function(c){                                                                                                        
				return M.conf[c];                                                                                                       
			},                                                                                                                          
			setData:function(m,v){                                                                                                      
				M.data[m]=v;                                                                                                            
				return this;                                                                                                            
			},                                                                                                                          
			setConf:function(c,v){                                                                                                      
				M.conf[c]=v;                                                                                                            
				return this;                                                                                                            
			}                                                                                                                           
		};                                                                                                                              
	}();                                                                                                                                
	// 初始化MVC视图层                                                                                                                        
	MVC.view = function(){                                                                                                              
		//模型数据层对象操作方法引用                                                                                                                 
		var M = MVC.model;                                                                                                              
		//内部视图创建方法对象                                                                                                                    
		var V = {};                                                                                                                     
		//获取视图接口方法                                                                                                                      
		return function(v){                                                                                                             
			//根据视图名称返回视图，                                                                                                               
			V[v]();                                                                                                                     
		};                                                                                                                              
	}();                                                                                                                                
	// 初始化MVC控制器                                                                                                                        
	MVC.ctrl = function(){                                                                                                              
		//模型数据层对象操作方法引用                                                                                                                 
		var M = MVC.model;                                                                                                              
		//视图数据层对象操作方法引用                                                                                                                 
		var V = MVC.view;                                                                                                               
		//控制器创建方法对象                                                                                                                     
		var C = {};                                                                                                                     
	}();                                                                                                                                
	                                                                                                                                    
});                                                                                                                                     