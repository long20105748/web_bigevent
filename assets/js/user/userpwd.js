$(function() {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        same: function(value) {
            const newpass = $('.layui-input[name="oldPwd"]').val();
            if (value === newpass) {
                return '不能与原密码相同';
            }
        },
        repwd: function(value) {
            const password = $('.layui-input[name="newPwd"]').val();
            if (value !== password) {
                return '密码不一致';
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('.layui-form')[0].reset();
            }
        })
    })

})