define(['jquery', 'template', 'util', 'datepicker', 'language', 'validate', 'form', 'state'], function ($, template, util) {
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
    //表单功能的验证
    function submitForm(url) {
        $('#teacherForm').validate({
            sendForm: false,
            valid: function () {
                // 提交表单
                $(this).ajaxSubmit({
                    url: url,
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            window.location.href = '/teacher/teacher_list';
                        }
                    }
                });
            },
            description: {
                tcName: {
                    required: '用户名不能为空'
                },
                tcPass: {
                    required: '密码不能为空',
                    pattern: '必须是6位数字'
                },
                tcJoinDate: {
                    required: '日期不能为空'
                }
            }
        });
    }
    //提交功能
    /*     function submitForm(url) {
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
        } */

});