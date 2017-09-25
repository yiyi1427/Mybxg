define(['jquery'], function ($) {
    return {
        qs: function (key) {
            var url = window.location.search.substr(1);
            var tcId = null;
            if (url) {
                var arr = url.split("&");
                $.each(arr, function (i, item) {
                    var kv = item.split("=");
                    if (kv[0] == key) {
                        tcId = kv[1];
                        return false;
                    }

                })
            }
            return tcId;
        },
        setMenu: function (path) {
            $('.aside .navs a[href="' + path + '"]').addClass('active').closest('ul').show();
        }
    }
})