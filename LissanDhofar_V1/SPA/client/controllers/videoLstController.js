myApp.controller("videoCtrl",["$http", function ($http) {
    var vm = this;

    getVideos();
    function getVideos() {
        return $http.get("/home/getvideos")
            .then(function (res) {
                vm.vls = res.data;
            }).error(function () {
                alert("Sorry There is no Video to preview");
            });
    }

}]);