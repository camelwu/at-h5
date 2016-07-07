# at-h5-nodejs

a [Sails](http://sailsjs.org) application


#使用说明 提前安装好nodejs
#cd at-h5-nodejs
#npm install
#sails lift / node app.js
#http://127.0.0.1:1337


#1.0.0版本没有路由和模板渲染


#分支说明：
master 线上分支 ，
functional 目前用于F+H+T功能开发，首页  免登录，埋点等，
user分支 用于fix bug;
rem分支用于非F+H+T模块rem替换；
大家一定注意在对应的分支开发功能

因bugH5-1872 H5-1873 H5-1875修改foot.js思路：     //jyy   06/20
修改之前，控件存在问题：修改筛选后点击取消按钮或遮罩层，再点开筛选，显示的不是操作前的状态。
思路：筛选层弹出后记录初始选择状态，筛选的每次点击操作class = 'cur choose'呈现勾选状态，之前的筛选class = 'cur'的
更改为class = 'chose'呈现不勾选状态，更改class = 'cur choose'为不勾选，则class = ''，但是之前的筛选class = 'cur'取消
勾选后再次被勾选，则class = 'cur chose'，为也就是以类名区分筛选条件是否被选择或是否被选择过。
点击“确定”，此刻类名为'cur'、'cur choose'、'cur chose'的更改为class = 'cur'即为当前筛选条件。
点击“取消”或遮罩层，此刻类名为'cur choose'的更改为class = ''清除勾选。类名为'cur chose'、'chose'的
更改为class = 'cur'即为当前筛选条件。



#组件目录说明
assets/plugins/*为组件的源文件目录，组件的开发，更新都在此目录下进行，修正测试完整后，需要grunt拷贝到js/plugins/* css/plugins/*对应的目录。
项目中实际使用的文件是引用js/plugins/*; css/plugins/*
**特别注意：修改组件相关的文件 不要去修改js/plugins/* 和css/plugins/*目录下的问题，grunt执行后会被源码文件覆盖。