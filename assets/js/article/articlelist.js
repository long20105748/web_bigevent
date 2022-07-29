$(function() {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;

    //定义美化事件的过滤器
    template.defaults.imports.dateFormat = function(date) {
        const dt = new Date(date);
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }


    //定义一个请求参数
    let param = {
        pagenum: 1, //默认页面
        pagesize: 2, //每页数量
        cate_id: '',
        state: ''
    }

    //获取列表
    function getList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: param,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                let htmlStr = template('articlelist', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    getList();

    //初始化文章分类

    function initCategories() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                let htmlStr = template('tpl_cate', res);
                $('#catelist').html(htmlStr);
                form.render();
            }
        })
    }
    initCategories();

    //筛选
    $('#form_search').on('submit', function(e) {
        e.preventDefault();
        let cate_id = $('[name="cate_id"]').val();
        let state = $('[name="state"]').val();
        param.cate_id = cate_id;
        param.state = state;
        param.pagenum = 1;
        getList();
    })

    //定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //盒子ID
            count: total, //总数
            limit: param.pagesize, //一页几条
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义
            curr: param.pagenum, //当前页码
            //分页发生切换回调函数
            jump: function(obj, first) {
                param.pagenum = obj.curr;
                //把最新的条数赋值到param;
                param.pagesize = obj.limit;
                if (!first) {
                    getList();
                }
            }
        });
    }

    //通过代理的方式点击删除
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id');
        //获取删除按钮的个数
        let len = $('.btn-delete').length;

        layer.confirm('确定删除?', { icon: 2, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg(res.message);
                    //如果删除的个数为1，删除后页面值-1
                    if (len === 1) {
                        //判断当前页面是否为1
                        param.pagenum = param.pagenum === 1 ? param.pagenum : param.pagenum - 1;
                    }
                    getList();
                }
            })

            layer.close(index);
        });
    })
})