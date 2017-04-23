myApp.service("articleService", ["$http", function ($http) {
    //get all post, which will be used inside the articles 
    this.getAllPosts = function () {
        return $http.get("/article/getAllPosts");
    };

    //get all articles, which will previously added 
    this.getAllArticles = function () {
        return $http.get("/article/getAllartciles");
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
    this.DeleteEmp = function (employeeId) {
        var response = $http({
            method: "post",
            url: "Home/DeleteEmployee",
            params: {
                employeeId: JSON.stringify(employeeId)
            }
        });
        return response;
    }
}]);