define(['jquery', 'template'], function ($, template) {
    //调用接口获取个人信息
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/api/teacher/profile',
        success: function (data) {
            //console.log(data);
            var html = template('settingsTpl', data.result);
            $("#settingsInfo").html(html);
        }
    })

});