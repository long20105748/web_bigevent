$(function() {

    layui.form.verify({
        nickname: [
            /^[\S]{1,6}$/,
            '昵称必须1~6个字符之间'
        ],
    })

    //获取用户的基本信息
    function getUser_Info() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                //调用form.val()给表单快速赋值
                layui.form.val('form-user', res.data);
            }
        })
    }
    getUser_Info();

    //重置
    $('#reset').on('click', function(e) {
            e.preventDefault();
            getUser_Info();
        })
        //提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) layer.msg(res.message);
                //调用父页面方法
                window.parent.getUserInfo();
                console.log(window.parent);
            }
        })
    })


});