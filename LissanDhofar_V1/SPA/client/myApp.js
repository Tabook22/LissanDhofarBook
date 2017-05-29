//**********Client**********************//
var myApp; //this is important because if we put it inside the (function(){ var myApp=......})(); the other object or files which use myApp will not see it, that is 
// why we declare it outside
// the id of (function(){})(); is the prevent any variable declaration from beign seen outside on the globale scale, that is good because it will prevent any varialbe conflict
// because in javascript if we declare any varialbe it will be seen globly, and name conflict can occure, this can be considered a negative thing in javascript 
(function () {
    myApp = angular.module("mainApp", ['ui.router', 'ui.bootstrap']);
    myApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
        
        // default route
        $urlRouterProvider.otherwise('/'); //this is the default route

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/SPA/client/public/views/home.html',
                controller: 'homeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/SPA/client/public/views/partials/about.html',
                controller: 'homeCtrl'
            })
            .state('page1', {
                url: '/page1/:PstId',
                templateUrl: '/SPA/client/public/views/partials/page1.html',
                controller: 'conDetails',
                resolve: {
                    artDetail: ['$http', '$stateParams', function ($http, $stateParams) {
                        return $http({
                            url: "/article/getAllArtGuide",
                            method: "GET",
                            params: { PstId: $stateParams.PstId }
                        }).then(function (res) {
                            return res.data;
                        });
                    }]
                }
            })
            .state('confDetails', {
                url: '/confDetails',
                templateUrl: '/SPA/client/public/views/partials/confDetails.html',
                controller: 'conferenceCtrl',
                resolve: {
                    confDetail: ['$http', function ($http,) {
                        return $http({
                            url: "/Conference/getConHome",
                            method: "GET",
                        }).then(function (res) {
                            return res.data;
                        });
                    }]
                }
            })
            .state('coninfo', {
                url: '/coninfo/:confId',
                templateUrl: '/SPA/client/public/views/partials/coninfo.html',
                controller: 'conInfoCtrl',
                resolve: {
                    conInfoDetails: ['$http', '$stateParams', function ($http, $stateParams) {
                        return $http({
                            url: "/Conference/getConfInfo",
                            method: "GET",
                            params: { confId: $stateParams.confId }
                        }).then(function (res) {
                            return res.data;
                        });
                    }]
                }
            })
            .state('dic', {
                url: '/dic',
                templateUrl: '/SPA/client/public/views/partials/dic.html',
                controller: 'homeCtrl'
            })
            .state('letters', {
                url: '/letters',
                templateUrl: '/SPA/client/public/views/partials/letter.html',
                controller: 'homeCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'home/contact',
                controller: 'homeCtrl'
            })
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('');
        
    }]);
})();