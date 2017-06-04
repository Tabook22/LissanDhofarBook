//**********Admin**********************//
var myApp; //this is important because if we put it inside the (function(){ var myApp=......})(); the other object or files which use myApp will not see it, that is 
// why we declare it outside
// the id of (function(){})(); is the prevent any variable declaration from beign seen outside on the globale scale, that is good because it will prevent any varialbe conflict
// because in javascript if we declare any varialbe it will be seen globly, and name conflict can occure, this can be considered a negative thing in javascript 
(function () {
    //myApp = angular.module("adminApp", ['ui.router', 'ui.bootstrap']);
    myApp = angular.module("adminApp", [
        'ui.router',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ui.tinymce',
        'ngMessages',
        'angularUtils.directives.dirPagination',
        'thatisuday.dropzone',
        'ui.bootstrap.modal',
        'ngFileUpload'
    ]);
    myApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
        // default route
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/SPA/admin/views/home.html',
                controller: 'homeCtrl'
            })
            .state('AddConf', {
                url: '/AddConf',
                templateUrl: '/SPA/Admin/views/partials/AddConf.html',
                controller: 'confController'
            })
            .state('uploadImg', {
                url: '/uploadImages',
                templateUrl: '/SPA/Admin/views/partials/uploadImages.html',
                controller: 'confController'
            })
            .state('uploadfile', {
                url: '/uploadfile',
                templateUrl: '/SPA/Admin/views/partials/uploadFiles.html',
                controller: 'confController'
            })
            .state('addPost', {
                url: '/addPost',
                templateUrl: '/SPA/Admin/views/partials/addPost.html',
                controller: 'confController'
            })
            .state('addArticle', {
                url: '/addArticle',
                templateUrl: '/SPA/Admin/views/partials/addArticles.html',
                controller: 'confController'
            })
            //.state('page1', {
            //    url: '/page1/:PstId',
            //    templateUrl: '/SPA/client/public/views/partials/page1.html',
            //    controller: 'conDetails',
            //    resolve: {
            //        artDetail: ['$http', '$stateParams', function ($http, $stateParams) {
            //            return $http({
            //                url: "/article/getAllArtGuide",
            //                method: "GET",
            //                params: { PstId: $stateParams.PstId }
            //            }).then(function (res) {
            //                return res.data;
            //            });
            //        }]
            //    }
            //})
            //.state('confDetails', {
            //    url: '/confDetails',
            //    templateUrl: '/SPA/client/public/views/partials/confDetails.html',
            //    controller: 'conferenceCtrl',
            //    resolve: {
            //        confDetail: ['$http', function ($http,) {
            //            return $http({
            //                url: "/Conference/getConHome",
            //                method: "GET",
            //            }).then(function (res) {
            //                return res.data;
            //            });
            //        }]
            //    }
            //})
            //.state('coninfo', {
            //    url: '/coninfo/:confId',
            //    templateUrl: '/SPA/client/public/views/partials/coninfo.html',
            //    controller: 'conInfoCtrl',
            //    resolve: {
            //        conInfoDetails: ['$http', '$stateParams', function ($http, $stateParams) {
            //            return $http({
            //                url: "/Conference/getConfInfo",
            //                method: "GET",
            //                params: { confId: $stateParams.confId }
            //            }).then(function (res) {
            //                return res.data;
            //            });
            //        }]
            //    }
            //})
            //.state('dic', {
            //    url: '/dic',
            //    templateUrl: '/SPA/client/public/views/partials/dic.html',
            //    controller: 'homeCtrl'
            //})
            //.state('letters', {
            //    url: '/letters',
            //    templateUrl: '/SPA/client/public/views/partials/letter.html',
            //    controller: 'homeCtrl'
            //})
            //.state('contact', {
            //    url: '/contact',
            //    templateUrl: 'home/contact',
            //    controller: 'homeCtrl'
            //})
    }]);
})();