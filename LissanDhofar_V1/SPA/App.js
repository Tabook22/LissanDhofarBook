var myApp; //this is important because if we put it inside the (function(){ var myApp=......})(); the other object or files which use myApp will not see it, that is 
// why we declare it outside
// the id of (function(){})(); is the prevent any variable declaration from beign seen outside on the globale scale, that is good because it will prevent any varialbe conflict
// because in javascript if we declare any varialbe it will be seen globly, and name conflict can occure, this can be considered a negative thing in javascript 
(function () {
    myApp = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'ui.tinymce', 'ngMessages', 'angularUtils.directives.dirPagination', 'thatisuday.dropzone','ui.bootstrap.modal']);
    myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/Home',
                controller: 'MainController'
            })
            .when('/about', {
                templateUrl: '/Home/about',
                controller: 'postController'
            })
            .when('/addPost', {
                templateUrl: '/post/postLst',
                controller: 'postController'
            });
                //.otherwise({ redirectTo: '/' });
        // use the HTML5 History API

        //this will remove hash
        $locationProvider.html5Mode(true); //activate HTML5 Mode

        //$locationProvider.html5Mode(false).hashPrefix('!'); // This is for Hashbang Mode
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
       
    }]);
})();