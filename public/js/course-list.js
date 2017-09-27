define(['jquery', 'template', 'util', 'state'], function ($, template, util) {
    util.setMenu(location.pathname);
    //获取数据渲染页面
    $.ajax({
        url: '/api/course',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var html = template('courseTpl', {
                list: data.result
            });
            $("#courseInfo").html(html);
        }
    })
})