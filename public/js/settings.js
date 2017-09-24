define(['jquery', 'template', 'ckeditor', 'region', 'datepicker', 'language', 'validate', 'form', 'uploadify'], function ($, template, CKEDITOR) {
    //调用接口获取个人信息
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/teacher/profile',
        success: function (data) {
            //console.log(data);
            var html = template('settingsTpl', data.result);
            $("#settingsInfo").html(html);
            //头像上传
            $("#upfile").uploadify({
                width: 120,
                height: 120,
                itemTemplate: '<span></span>',
                buttonText: '',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                onUploadSuccess: function (a, b) {
                    var obj = JSON.parse(b);
                    console.log(obj);
                    $('.preview img').attr('src', obj.result.path);
                }
            });
            //处理省市县三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json'
            });
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
            //处理表单提交
            $("#settingsForm").validate({
                sendForm: false,
                valid: function () {
                    //拼接籍贯信息
                    var p = $("#p").find('option:selected').text();
                    var c = $("#c").find('option:selected').text();
                    var d = $("#d").find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d;
                    //更新富文本（ckeditor在iframe标签内，form表单提交不上）
                    for (var instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }
                    // 提交表单
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/teacher/modify',
                        data: {
                            tc_hometown: hometown
                        },
                        dataType: 'json',
                        success: function (data) {
                            //console.log(data);
                            if (data.code == 200) {
                                window.location.reload();
                            }
                        }
                    })
                }
            })
        }
    })

});