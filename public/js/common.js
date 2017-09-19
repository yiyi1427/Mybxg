define([
	'jquery',
	'cookie'
], function ($) {
	//NProgress.start();

	//NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	//退出功能的实现
	$("#logoutBtn").on('click', function () {
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					location.href = '/main/login';
				}
			}
		})
		//console.log(location.href);
		console.log(123);
	})
	//验证是否登录了
	var flag = $.cookie('PHPSESSID');
	if (!flag) {
		location.href = '/main/login';
	}
	//填充头像信息
	var loginInfo = $.cookie('logInfo');
	console.log(loginInfo);
	loginInfo = loginInfo && JSON.parse(loginInfo);
	//console.log(loginInfo);
	$(".aside .profile img").attr('src', loginInfo.tc_avatar);
	$(".aside .profile h4").html(loginInfo.tc_name);

});