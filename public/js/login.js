define(['jquery', 'cookie', 'state'], function ($) {
    $("#loginBtn").on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $("#loginForm").serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    //登录信息存储到cookie中
                    $.cookie('logInfo', JSON.stringify(data.result), {
                        path: '/'
                    });
                    location.href = '/main/index';
                }
            }
        });

        return false;
    });
})