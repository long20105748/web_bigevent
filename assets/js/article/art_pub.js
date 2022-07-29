$(function() {
    const layer = layui.layer;
    const form = layui.form;
    initEditor();

    //获取分类列表
    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                let htmlStr = template('tpl_cate', res);
                $('#cate_box').html(htmlStr);
                form.render();
            }
        })
    }
    getCates();

    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    };

    // 3. 初始化裁剪区域
    $image.cropper(options);


    //上传图片
    $('#upload_img').on('click', function() {
        $('.hidden_file').click();
    });

    $('.hidden_file').on('change', function(e) {
        let file = e.target.files;
        if (file.length === 0) {
            return layer.msg('请选择文件');
        }
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        let newImgUrl = URL.createObjectURL(file[0]);
        $image.cropper('destroy').attr('src', newImgUrl).cropper(options);
    })

    //定义状态
    let art_state = '已发布';
    //发布
    $('#release').on('click', function() {
        art_state = '已发布';
    })
    $('#draft').on('click', function() {
        art_state = '草稿';
    })

    function release(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //如果是向服务器提交的是formData格式的数据
            //必须添加以下两项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                //发布文章成功后跳转到文章列表页面
                location.href = './articlelist.html'
            }
        })
    }

    $('#pub_form').on('submit', function(e) {
        e.preventDefault();
        //基于form表达快速创建一个formData对象
        let fd = new FormData(document.querySelector('#pub_form'));
        //将文章的发布状态添加到fd中
        fd.append('state', art_state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                release(fd);
            })
    });

})