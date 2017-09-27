define([
    'jquery'
], function ($) {
    $(document).ajaxStart(function () {
        $(".overlay").show();

    });
    $(document).ajaxStop(function () {
        window.setTimeout(function () {
            $(".overlay").hide();
        }, 500)
    })
});