var myApp = angular.module("myApp", ['ngYoutubeEmbed']);
myApp.controller("videoLstAddCtrl", ["$http", function ($http) {
    var vm = this;
    vm.sss = "https://www.youtube.com/watch?v=OPmOXJtxxoo";
    GetVds();
    function GetVds() {
        return $http({
            method: "get",
            url: "/home/getVideos",
            dataType: "Json"
        }).then(function (res) {
            vm.getVideos = res.data;
        });
    };
    vm.addVideo = function (video) {
        console.log(JSON.stringify(video));
        return $http({
            method: "post",
            url: "/home/addVideos",
            data: JSON.stringify(video),
            dataType: "Json"
        }).then(function (res) {
            alert(res.data);
            });
    };

}]);