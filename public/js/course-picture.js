define([
    'jquery',
    'template',
    'util',
    'uploadify',
    'form',
    'jcrop',
    'state'
], function ($, template, util) {
    util.setMenu('/course/course_add');
    var csId = util.qs('cs_id');
    $.ajax({
        url: '/api/course/picture',
        type: 'get',
        data: {
            cs_id: csId
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            var html = template('pictureTpl', data.result);
            $("#pictureInfo").html(html);
            //获取封面
            var img = $(".preview img");
            var nowCrop = null; //保证裁剪实例的唯一性
            //上传封面
            $("#myfile").uploadify({
                width: 80,
                height: 'auto',
                buttonText: '选择图片',
                itemTemplate: '<span></span>',
                buttonClass: 'btn btn-success btn-sm',
                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',
                formData: {
                    cs_id: csId
                },
                onUploadSuccess: function (a, b) {
                    var obj = JSON.parse(b);
                    $(".preview img").attr('src', obj.result.path);
                    cropImg();
                    $("#cropBtn").text('保存图片').attr('data-flag', true);
                }
            });
            //图片裁剪功能
            $("#cropBtn").click(function () {
                var flag = $(this).attr('data-flag');
                if (flag) {
                    //第二次点击
                    //提交
                    $("#cropForm").ajaxSubmit({
                        type: 'post',
                        url: '/api/course/update/picture',
                        data: {
                            cs_id: csId
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.code = 200) {
                                window.location.href = '/course/lesson?cs_id=' + data.result.cs_id;
                            }
                        }
                    })

                } else {
                    //第一次点击
                    $(this).text('保存图片').attr('data-flag', true);
                    cropImg();
                }
            });
            //封装图片裁剪的方法
            function cropImg() {
                img.Jcrop({
                        aspectRatio: 2,
                        boxWidth: 400

                    },
                    function () {
                        //销毁当前实例
                        nowCrop && nowCrop.destroy();
                        nowCrop = this;
                        console.log(this);
                        //显示缩略图
                        this.initComponent('Thumbnailer', {
                            width: 240,
                            height: 120,
                            mythumb: '.thumb'
                        });
                        //获取图片的高度和宽度
                        var width = this.ui.stage.width;
                        var height = this.ui.stage.height;
                        //计算选区的数据
                        var x = 0;
                        var y = (height - width / 2) / 2;
                        var w = width;
                        var h = width / 2;
                        //创建一个选区
                        this.newSelection();
                        this.setSelect([x, y, w, h]);
                        $(".jcrop-thumb").css({
                            left: 0,
                            top: 0
                        });
                    });
                //监控选区的变化
                img.parent().on('cropstart cropmove cropend', function (a, b, c) {
                    var aInput = $("#cropForm").find('input');
                    aInput.eq(0).val(c.x);
                    aInput.eq(1).val(c.y);
                    aInput.eq(2).val(c.w);
                    aInput.eq(3).val(c.h);
                })
            }
        }

    })


});