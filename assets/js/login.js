const loginGo = document.querySelector('#login_go'); //去登录
const registerGo = document.querySelector('#register_go'); //去注册
const loginBox = document.querySelector('.login_box'); //登录模块
const registerBox = document.querySelector('.register_box'); //注册模块
const regUsername = document.querySelector('.reg_username'); //注册账号
const regPassword = document.querySelector('.reg_password'); //注册密码
const logUsername = document.querySelector('#log_username'); //登录账号
const logPassword = document.querySelector('#log_password'); //登录密码
loginGo.addEventListener('click', function() {
    loginBox.style.display = 'block';
    registerBox.style.display = 'none';
});
registerGo.addEventListener('click', function() {
    registerBox.style.display = 'block';
    loginBox.style.display = 'none';
});

//定义自定义规则
// 从layui中获取form对象
var form = layui.form;
form.verify({
    password: [
        /^[\S]{6,12}$/,
        '密码必须6-12位，且不能出现空格'
    ],
    // 校验密码是否一致
    repwd: function(value) {
        const password = regPassword.value;
        if (password !== value) {
            return '密码不一致' + password;
        }
    }
});

//监听注册表单提交事件
const reg_form = document.querySelector('#reg_form');
reg_form.addEventListener('submit', function(e) {
    e.preventDefault();
    $.post('/api/reguser', {
        username: regUsername.value,
        password: regPassword.value
    }, function(res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        loginGo.click();
    });
});

//监听登录表单提交事件
$('#login_form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            localStorage.setItem('token', res.token);
            location.href = './index.html';
        }
    })
})



// const login_form = document.querySelector('#login_form');
// login_form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     let paramsObj = {
//         username: logUsername.value,
//         password: logPassword.value
//     }
//     console.log(paramsObj, 22222);
//     axios.post('http://www.liulongbin.top:3007/api/login', paramsObj).then(function(res) {
//         console.log(res)
//         if (res.data.status !== 0) return layer.msg(res.data.message);
//         layer.msg(res.data.message);

//     })
// })