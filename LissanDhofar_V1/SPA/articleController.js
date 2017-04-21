myApp.controller("articleController",["$scope","articleService", function ($scope,articleService) {
    //elements to fill the dropdownlist
    $scope.artGroups = ["العنوان الرئيسي", "الشريط المتحرك", "الصور المتحركة", "قائمة الأخبار", "الخبر الرئيسي"];

    //To Get All Posts
    getAllPosts();
    function getAllPosts() {
        debugger;
        var getData = articleService.getAllPosts();
        debugger;
        getData.then(function (pst) {
            $scope.post = pst.data;
        }, function () {
            alert('Error in getting records');
        });
    }


    
}]);
myApp.filter("dateFilter", function () {
        return function (item) {
            if (item != null) {
                return new Date(parseInt(item.substr(6)));
            }
            return "";
        };
    });