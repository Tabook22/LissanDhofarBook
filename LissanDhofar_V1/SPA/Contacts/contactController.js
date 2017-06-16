(function (app) {
    'use strict'
    //controller Creation
    myApp.controller("contactCtrl", conCtrl);

    //DI for controller
    contactCtrl.$inject = ['$scope', 'contactService'];

    //contacts Controller
    function contactCtrl($scope, contactService) {
        $scope.contacts = contactService.getContacts();
    }
})(angular.module('contactModule'));