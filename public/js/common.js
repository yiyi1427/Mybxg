define([
	'jquery',
	'template',
	'cookie'
], function ($, template) {
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
	if (!flag && location.pathname != '/main/login') {
		location.href = '/main/login';
	}
	//填充头像信息(arttemplate实现)
	/* 	var loginInfo = $.cookie('logInfo');
		//console.log(loginInfo);
		loginInfo = loginInfo && JSON.parse(loginInfo);
		//console.log(loginInfo.tc_name);
		var tep = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
		console.log(tc_name);
		var html = template.render(tep, loginInfo);
		$(".aside .profile").html(html); */
	//$(".aside .profile img").attr('src', loginInfo.tc_avatar);
	//$(".aside .profile h4").html(loginInfo.tc_name);

	var loginInfo = $.cookie('logInfo');
	loginInfo = loginInfo && JSON.parse(loginInfo);
	var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
	var html = template.render(tpl, loginInfo);
	$('.aside .profile').html(html);

});