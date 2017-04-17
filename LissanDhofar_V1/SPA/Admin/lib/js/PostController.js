angular.module("DhofarBookApp.controllers", [])
.controller("PostController", function ($scope,PostService, $routeParams) {
    $scope.message = "لا حول و لا قوة إلا بالله";

    $scope.rowToDisplay = 10;
    $scope.sortColumn1 = "Date";
    $scope.reverseSort = false;
    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn1 == column) ? !$scope.reverseSort : false;
        $scope.sortColumn1 = column;
    }

    $scope.getSortClass = function (column) {
        if ($scope.sortColumn1 == column) {
            return $scope.reverseSort ? 'arrowDown' : 'arrowUp';
        }
        return '';
    }
    $scope.removeText = function () {

    }

    //Data processing with server side  
    //This is the way of fetching data from post factory  
   PostService.getPostFromDB().then(function (d) {
        $scope.listOfPosts = d.data.list;
    })

    $scope.addPostToDB = function () {
       PostService.addPostToDB($scope.Post);   //This is why, we usedPost.title and so on in AddQuestion.html  
    }

    $scope.deletePost = function (id) {
       PostService.deleteQuestionFromDB(id);
    }
})
.controller("PostEditController", function ($scope,PostService, $routeParams) {
    $scope.message1 = "Edit page";
   PostService.getPostByID($routeParams.id).then(function (d) {  //$routeParams.id is the id in the url  
        $scope.Post = d.data.question;
    })

    $scope.updatePlayer = function () {
       PostService.updatePostToDB($scope.Post);
    }
})
.factory("PostService", ["$http", function ($http, $route) {
    var fac = {};

    fac.getPostFromDB = function () {
        return $http.get("/Admin/GetPosts");
    }

    fac.addPostToDB = function (question) {
        return $http.post("/Admin/AddPost",Post).success(function (response) {
            alert(response.status);
            document.getElementById("title").value = "";
            document.getElementById("question").value = "";
        });
    }

    fac.getPostByID = function (id) {
        return $http.get("/Admin/GetPostByID", { params: { id: id } });
    }

    fac.updatePostToDB = function (question) {
        return $http.post("/Admin/UpdatePost",Post).success(function (response) {
            alert(response.status);
        })
    }
    fac.deletePostFromDB = function (id) {
        return $http.post("/Admin/DeletePost", { id: id }).success(function (response) {
            alert(response.status);
            // $route.reload();  
        })
    }

    return fac;
}])