$(function() {
    const layer = layui.layer;

    getUserInfo();

    //点击退出
    $('#loginout').on('click', function() {
        //退出提示框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //清除本地localStorage
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = './login.html';
            layer.close(index);
        });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        //header是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            //获取用户头像
            renderAvatar(res.data);
        },
        //不论成功还是失败都会调用
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空localStorage
        //         localStorage.removeItem('token');
        //         //强制跳转至login。html
        //         location.href = './login.html';
        //     }
        // }
    })
}

//渲染头像
function renderAvatar(data) {
    let name = data.nickname || data.username;
    $('#nikename').html('欢迎你&nbsp;' + name);
    if (data.user_pic) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').text(name[0].toUpperCase()).show();
    }
}