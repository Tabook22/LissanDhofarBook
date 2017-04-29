var myApp; //this is important because if we put it inside the (function(){ var myApp=......})(); the other object or files which use myApp will not see it, that is 
// why we declare it outside
// the id of (function(){})(); is the prevent any variable declaration from beign seen outside on the globale scale, that is good because it will prevent any varialbe conflict
// because in javascript if we declare any varialbe it will be seen globly, and name conflict can occure, this can be considered a negative thing in javascript 
(function () {
    myApp = angular.module("myApp", ['ngRoute', 'ui.bootstrap', 'ui.tinymce', 'ngMessages', 'angularUtils.directives.dirPagination', 'thatisuday.dropzone']);
    myApp.config(function ($locationProvider) {

        //$routeProvider
        //    .when('/', {
        //        templateUrl: 'partials/home.html',
        //        controller: mainController
        //    })
        //    .when('/about', {
        //        templateUrl: 'partials/about.html',
        //        controller: mainController
        //    })
        //    .when('/contact', {
        //        templateUrl: 'partials/contact.html',
        //        controller: mainController
        //    });

        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
})();