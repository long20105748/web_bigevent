//每次使用ajax的时候会先调用这个函数
$.ajaxPrefilter(function(option) {
    //拼接请求地址
    option.url = 'http://www.liulongbin.top:3007' + option.url;

    //统一为有权限的接口设置headers请求头
    if (option.url.indexOf('/my/' !== -1)) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局挂载complete回调函数
    option.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空localStorage
            localStorage.removeItem('token');
            //强制跳转至login。html
            location.href = './login.html';
        }
    }
})