var mainApp; //this is important because if we put it inside the (function(){ var myApp=......})(); the other object or files which use myApp will not see it, that is 
// why we declare it outside
// the id of (function(){})(); is the prevent any variable declaration from beign seen outside on the globale scale, that is good because it will prevent any varialbe conflict
// because in javascript if we declare any varialbe it will be seen globly, and name conflict can occure, this can be considered a negative thing in javascript 
(function () {
    mainApp = angular.module("mainApp", ['ui.router', 'ui.bootstrap']);
    mainApp.config(['$stateProvider', function ($stateProvider) {
        //a state is crosponding to a place in the application
        $stateProvider
            .state('/', {
               templateUrl: '/',
                controller: 'mainController'
            })
            .state('/about', {
                templateUrl: '/Home/About',
                controller: 'mainController'
            })
            .state('/contact', {
                templateUrl: '/Home/contact',
                controller: 'mainController'
            });

    }]);

    mainApp.controller("mainController", ["$scope", function ($scope) {
        $scope.index = "this is index page";
        $scope.about = "this is about page";
    }]);
})();