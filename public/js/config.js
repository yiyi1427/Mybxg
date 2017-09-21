require.config({
    baseUrl: '/public/assets',
    paths: {
        common: '../js/common',
        jquery: 'jquery/jquery.min',
        template: 'artTemplate/template-web',
        cookie: 'jquery-cookie/jquery.cookie',
        login: '../js/login',
        teacherlist: '../js/teacher-list',
        bootstrap: 'bootstrap/js/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
})