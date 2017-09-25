define([
    'jquery',
    'template',
    'util',
    'form'
], function ($, template, util) {
    util.setMenu(location.pathname);
    $("#courseBtn").on('click', function () {
        $("#courseForm").ajaxSubmit({
            url: '/api/course/create',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.code == 200) {
                    window.location.href = '/course/basic?cs_id=' + data.result.cs_id;
                }
            }
        })
    })

});