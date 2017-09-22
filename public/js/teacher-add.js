define(['jquery', 'template', 'util'], function ($, template, util) {
    var tcId = util.qs('tc_id');
    if (tcId) {
        //编辑功能的实现
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            dataType: 'json',
            data: {
                'tc_id': tcId
            },
            success: function (data) {
                //console.log(data.result);
                data.result.operate = '编辑讲师';

                var html = template('teacherAddTpl', data.result);

                $("#teacherAddInfo").html(html);
                submitForm('/api/teacher/update');

            }
        })
    } else {
        //添加功能的实现
        var html = template('teacherAddTpl', {
            operate: '添加讲师'
        });
        $("#teacherAddInfo").html(html);
        submitForm('/api/teacher/add');
    }

    function submitForm(url) {
        $("#teacherInfoBtn").on('click', function () {

            $.ajax({
                url: url,
                data: $("#teacherInfoForm").serialize(),
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        window.location.href = '/teacher/teacher_list';
                    }
                }
            })
        })
    }

});