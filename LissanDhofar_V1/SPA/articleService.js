myApp.service("articleService",["$http", function ($http) {
    //get all articles 
    this.getAllPosts = function () {
        return $http.get("/article/getAllPosts");
    };

    //all new article
    this.addNewArticle= function (article) {
        var response = $http({
            method: "post",
            url: "/article/addNewArticle",
            data: JSON.stringify(article),
            dataType: "json"
        });
        return response
    };
}]);