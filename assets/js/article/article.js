$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //获取文章分类列表
    function getCategories() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                let htmlStr = template('tpl_categories', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    getCategories();

    //添加类别
    var indexAdd = null;
    $('#addCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#tpl_add').html()
        });

    });

    //通过代理的形式为表单绑定submit事件
    $('body').on('submit', '#addForm', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                getCategories();
                layer.msg(res.message);
                layer.close(indexAdd);
            }
        })
    });

    //点击编辑
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function(e) {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#tpl_edit').html()
        })

        let id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                form.val('edit', res.data);
            }
        })
    });


    //通过代理的形式为表单绑定submit事件
    $('body').on('submit', '#editForm', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                getCategories();
                layer.msg(res.message);
                layer.close(indexEdit);
            }
        })
    });

    $('tbody').on('click', '.btn-delete', function(e) {
        let id = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    getCategories();
                    layer.msg(res.message);
                }
            })
            layer.close(index);
        });

    });

})