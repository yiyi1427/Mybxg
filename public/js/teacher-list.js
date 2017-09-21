define(['jquery', 'template', 'bootstrap'], function ($, template) {
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            //console.log(data.result);
            var teacherInfoHtml = template('teacherTpl', {
                list: data.result
            });
            $("#teacherInfo").html(teacherInfoHtml)
            // 注销和启用功能
            $(".eou").on('click', function () {
                //closest 找最近的父元素
                var self = this;
                var td = $(this).closest('td');
                var tcId = $(this).parent('td').attr('data-tc-id');
                var tcStatus = $(this).parent('td').attr('data-tc-status');
                $.ajax({
                    url: '/api/teacher/handle',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        tc_id: tcId,
                        tc_status: tcStatus
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            td.attr('data-tc-status', data.result.tc_status);
                            if (data.result.tc_status == 0) {
                                $(self).text('注 销')
                            } else {
                                $(self).text('启 用')
                            }
                        }
                    }
                })

            })
            // 查看功能
            $(".preview").on('click', function () {
                var td = $(this).closest('td');
                var tcId = $(this).parent('td').attr('data-tc-id');
                $.ajax({
                    url: '/api/teacher/view',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        tc_id: tcId
                    },
                    success: function (data) {
                        console.log(data);
                        var previewHtml = template('modalTpl', data.result);
                        $("#modalInfo").html(previewHtml);
                        $("#teacherModal").modal();
                    }
                })
            })
        }

    })
})