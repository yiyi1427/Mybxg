require.config({
    baseUrl: '/public/assets',
    paths: {
        common: '../js/common',
        jquery: 'jquery/jquery.min',
        template: 'artTemplate/template-web',
        cookie: 'jquery-cookie/jquery.cookie',
        datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',
        language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        form: 'jquery-form/jquery.form',
        validate: 'validate/jquery-validate',
        uploadify: 'uploadify/jquery.uploadify.min',
        region: 'jquery-region/jquery.region',
        ckeditor: 'ckeditor/ckeditor',
        login: '../js/login',
        teacherlist: '../js/teacher-list',
        teacheradd: '../js/teacher-add',
        bootstrap: 'bootstrap/js/bootstrap',
        util: '../js/util',
        settings: '../js/settings'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        language: {
            deps: ['jquery']
        },
        validate: {
            deps: ['jquery']
        },
        uploadify: {
            deps: ['jquery']
        },
        ckeditor: {
            exports: 'CKEDITOR'
        }
    }
})