(function () {
    'use strict'
    //Create Controller
    myApp.controller("contactCtrl", contactCtrl);

    //DI for Controller
    contactCtrl.$inject = ['$scope', 'contactService'];

    //Contacts Controller
    function contactCtrl($scope, contactService) {
        //get all contacts
        $scope.contact = {};
        $scope.contacts = contactService.getContacts().then(function (res) {
            return res.data;
        });

        //add contacts
        $scope.addContact = function(){
            debugger;
            contactService.AddContacts($scope.contact).then(function (res) {
                alert(res.data);
            });
        };
    }
})();