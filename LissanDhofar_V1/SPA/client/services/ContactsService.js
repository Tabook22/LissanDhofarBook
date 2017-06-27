(function () {
    'use strict'

    //Create the service
    myApp.factory("contactService", contactService);

    //DI for the service
    contactService.$inject = ['$http'];

    //contact Service
    function contactService($http) {
        var service = {
            getContacts: getContacts,
            AddContacts: AddContacts
        };

        //Get all contacts
        function getContacts() {
            return $http({
                method: "get",
                url: "/Contacts/getAllContacts"
            });
        };

        //add new contacts
        function AddContacts(contact) {
            debugger;
            return $http({
                method: "post",
                url: "/Contacts/addContacts",
                data: JSON.stringify(contact),
                dataType: "json"
            });
        };
        return service;
    }

})();