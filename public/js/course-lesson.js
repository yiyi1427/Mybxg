define([
    'jquery',
    'template',
    'util'
], function ($, template, util) {
    // 设置导航菜单选中
    util.setMenu('/course/course_add');
    //获取id
    var csId = util.qs('cs_id');

    $.ajax({
        url: '/api/course/lesson',
        type: 'get',
        dataType: 'json',
        data: {
            cs_id: csId
        },
        success: function (data) {
            console.log(data);
            var html = template('lessonTpl', data.result);
            $("#lessonInfo").html(html);
        }

    })

});