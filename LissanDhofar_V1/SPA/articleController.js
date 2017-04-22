myApp.controller("articleController", ["$scope", "articleService", function ($scope, articleService) {
    //elements to fill the dropdownlist
    $scope.artGroups = ["العنوان الرئيسي", "الشريط المتحرك", "الصور المتحركة", "قائمة الأخبار", "الخبر الرئيسي"];

    //article object used to get data from the article from
    $scope.postById = {};

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

    // get select post 
    $scope.getSelectedPost = function (post) {
        var getData = articleService.getPostById(post.PostId);
        debugger;
        getData.then(function (pst) {
            $scope.postById = pst.data;
        }, function () {
            alert("Error In getting records");
        });
    }

    // add new artcile
    $scope.addArticle = function () {
        var getData = articleService.addNewArticle($scope.postById);
        getData.then(function (pst) {
            alert(pst.data);
            getAllPosts();
           cleanFields();
        }, function () {
            alert('Error in adding record');
        });
    }
    //Clean Fields
    function cleanFields() {
        //$postById.Location = "";
        $scope.postById.post_title = "";
        $scope.postById.PostId = "";
        $scope.postById.post_img = "";
        $scope.postById.order = "";
    }
}]);
//filter for date becasue of json datetime issue
myApp.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});