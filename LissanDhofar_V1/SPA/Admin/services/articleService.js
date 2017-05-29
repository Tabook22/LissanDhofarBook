myApp.service("articleService", ["$http", function ($http) {
    //get all post, which will be used inside the articles 
    this.getAllPosts = function () {
        return $http.get("/article/getAllPosts");
    };

    //get all articles, which will previously added 
    this.getAllArticles = function () {
        return $http.get("/article/getAllArtciles");
    };


    //all new article
    this.addNewArticle = function (article) {
        var response = $http({
            method: "post",
            url: "/article/addNewArticle",
            data: JSON.stringify(article),
            dataType: "json"
        });
        return response
    };

    //edit article
    this.editArticle = function (article) {
        var response = $http({
            method: "post",
            url: "/article/editArticle",
            data: JSON.stringify(article),
            dataType: "json"
        });
        return response
    };


    //Get Post by ID
    this.getPostById = function (PostId) {
        var response = $http({
            method: "get",
            url: "/article/getPostById",
            params: {
                id: JSON.stringify(PostId)
            }
        });
        return response;
    }

    //Get article by ID
    this.getArticleById = function (ArtId) {

        var response = $http({
            method: "get",
            url: "/article/getArticleById",
            params: {
                id: JSON.stringify(ArtId)
            }
        });
        return response;
    }

    // Update Article
    this.updateEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "Home/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }

    // Add Article
    this.AddArt = function (article) {
        var response = $http({
            method: "post",
            url: "/article/AddArticle",
            data: JSON.stringify(article),
            dataType: "json"
        });
        return response;
    }

    //Delete Article
    this.delArticle = function (artId) {
        var response = $http({
            method: "get",
            url: "/article/delArticle",
            params: {
                id: JSON.stringify(artId)
            }
        });
        return response;
    }
}]);