myApp.controller("uploadImgController", ["$scope", "uploadImgService", function ($scope, uploadImgService) {
    //Get all images from database
    //To Get All Posts
    getAllImgs();
    function getAllImgs() {
        alert("أستغفر الله و أتوب إلية");
        debugger;
        var getData = uploadImgService.allImgs();
        debugger;
        getData.then(function (pst) {
            $scope.allImgs= pst.data;
        }, function () {
            alert('Error in getting records');
        });
    }


}]);

myApp.service("uploadImgService", ["$http", function ($http) {
    //Get all images 
    this.allImgs = function () {
        return $http.get("/uploadFiles/getAllImg");
    }

    this.getAllPosts = function () {
    };


}]);