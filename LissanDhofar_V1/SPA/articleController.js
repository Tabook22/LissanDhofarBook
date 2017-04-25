myApp.controller("articleController", ["$scope", "articleService", function ($scope, articleService) {
    //elements to fill the dropdownlist
    $scope.artGroups = ["العنوان الرئيسي", "الشريط المتحرك", "الصور المتحركة", "قائمة الأخبار", "الخبر الرئيسي"];
    //post object used to get data from the article from
    $scope.divArticleAdd = true;
    $scope.divArticleEdit = false;

    //paginnation




    $scope.postById = {};
    //article object used to get data from the article from
    $scope.showaArticleById = {};

    //To Get All Posts
    getAllPosts();
    function getAllPosts() {
        debugger;
        var getData = articleService.getAllPosts();
        debugger;
        getData.then(function (pst) {
            $scope.postForArt = pst.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    // Get all articles which was previously added
    //To Get All Posts
    getallArticles();
    function getallArticles() {
        debugger;
        var getData = articleService.getAllArticles();
        debugger;
        getData.then(function (art) {
            $scope.artPstGroups = art.data;
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
        $scope.divArticleAdd = true;
        $scope.divArticleEdit = false;
    }

    // add new artcile
    $scope.addArticle = function () {
        var getData = articleService.addNewArticle($scope.postById);
        getData.then(function (pst) {
            alert(pst.data);
            getAllPosts();
            getallArticles();
           cleanFields();
        }, function () {
            alert('Error in adding record');
        });
    }

    // Edit article
    $scope.editArticle = function () {
        var getData = articleService.editArticle($scope.showaArticleById);
        getData.then(function (art) {
            alert(art.data);
            getAllPosts();
            getallArticles();
            cleanFields();
        }, function () {
            alert('Error in adding record');
        });
    }


// get selected article for editing
    $scope.getSelectedArt = function (agr) {
        var getData = articleService.getArticleById(agr.ArticleId);
        debugger;
        getData.then(function (response) {
            $scope.showaArticleById = response.data; 
        }, function () {
            alert("Error In getting records");
            });
        $scope.divArticleAdd = false;
        $scope.divArticleEdit = true;
    }

    //Delete articles
    $scope.delSelectedArt = function (agr) {
        if (window.confirm('هل تريد حذف المقاله التي عنوانها  ' + agr.post_title + '?'))//Popup window will open to confirm
            var getData = articleService.delArticle(agr.ArticleId);
        getData.then(function (response) {
            alert(response.data);
            getallArticles();
            cleanFields();
        }, function () {
            alert("Error In getting records");
        });
    }
    //Clean Fields
    function cleanFields() {
        //$postById.Location = "";
        $scope.postById.post_title = "";
        $scope.postById.PostId = "";
        $scope.postById.post_img = "";
        $scope.postById.order = "";

        //clear edit articles fields
        $scope.showaArticleById.post_title = "";
        $scope.showaArticleById.PostId = "";
        $scope.showaArticleById.post_img = "";
        $scope.showaArticleById.order = "";
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