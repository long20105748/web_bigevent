//每次使用ajax的时候会先调用这个函数
$.ajaxPrefilter(function(option) {
    //拼接请求地址
    option.url = 'http://www.liulongbin.top:3007' + option.url;
})