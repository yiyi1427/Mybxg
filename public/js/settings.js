define(['jquery', 'template', 'region', 'uploadify'], function ($, template) {
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
            })
        }
    })

});