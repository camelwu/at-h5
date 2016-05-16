# LazyLoad #

调用方法：new LazyLoad(id);
 * namespace:extend
 * 单继承
 * 简单属性复制，非IE下可用
 * IE下valueOf toString的属性名不能被识别
 * 用于节流器中extend(属性对象，要操作的对象)
 
 
 * namespace:throttle
 * 单继承
 * 节流器
 * 节流器要做两件事：1、清除要执行的函数，2、延迟执行，为函数判断留下时间
 * 第1种情况：是否清，执行函数；第2种情况：执行函数，相关参数
 
 
 * namespace:Lazyload
 * param id 加载图片的容器
 