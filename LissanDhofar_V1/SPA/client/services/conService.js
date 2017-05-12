myApp.service("conService", ["$http", function ($http) {
    //get all conferences
    this.getAllCon = function () {
        return $http.get("/Conference/getAllcnf");
    };

    // Add New conference 
    this.addCon = function (conf) {
        var response = $http({
            method: "POST",
            url: "/Conference/addNewConf",
            data: JSON.stringify(conf),
            dataType:"Json"
        });
        return response;
    };

    //Get conference by ID
    this.getConById = function (conId) {

        var response = $http({
            method: "get",
            url: "/Conference/getConById",
            params: {
                id: JSON.stringify(conId)
            }
        });
        return response;
    }


    //update conference
    this.updateCon = function (conf) {
        alert("الحمد لله رب العالمين");
        var response = $http({
            method: "post",
            url: "/Conference/updateCon",
            data: JSON.stringify(conf),
            dataType: "json"
        });
        return response
    };

    //Delete conference
    this.delCon = function (contId) {
        var response = $http({
            method: "get",
            url: "/Conference/delCon",
            params: {
                id: JSON.stringify(conId)
            }
        });
        return response;
    }
}]);