define(['jquery', 'template', 'util', 'ckeditor', 'validate', 'form'], function ($, template, util, CKEDITOR) {
    util.setMenu('/course/course_add');
    //获取标志位
    var flag = util.qs('flag');
    //获取cs_id
    var csId = util.qs('cs_id');
    //根据课程id查询详细信息
    $.ajax({
        url: '/api/course/basic',
        type: 'get',
        dataType: 'json',
        data: {
            cs_id: csId
        },
        success: function (data) {
            //console.log(data);
            if (flag) {
                data.result.operate = '编辑课程'
            } else {
                data.result.operate = '添加课程'
            }
            var html = template('basicTpl', data.result);
            $("#basicInfo").html(html);
            //处理富文本
            CKEDITOR.replace('editor', {
                toolbarGroups: [{
                        name: 'clipboard',
                        groups: ['clipboard', 'undo']
                    },
                    {
                        name: 'editing',
                        groups: ['find', 'selection', 'spellchecker', 'editing']
                    }
                ]
            });
            //处理课程分类二级联动
            $("#firstType").on('change', function () {
                //获取一级分类id
                var pid = $(this).val();
                // 根据一级分类id获取二级分类
                $.ajax({
                    url: '/api/category/child',
                    type: 'get',
                    data: {
                        cg_id: pid
                    },
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        var tpl = ' <option value="">请选择二级餐单</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}'
                        var html = template.render(tpl, {
                            list: data.result
                        });
                        $("#secondType").html(html);
                    }
                })
            })
            //保存提交
            $("#basicForm").validate({
                sendForm: false,
                valid: function () {
                    $(this).ajaxSubmit({
                        url: '/api/course/update/basic',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            cs_id: csId
                        },
                        success: function (data) {

                            window.location.href = '/course/picture?cs_id=' + data.result.cs_id;
                        }
                    })
                }
            })
        }
    })
})