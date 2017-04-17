//This service is used to create, retrive, update and delete records from post table 
myApp.factory('getDataService', ['$http', function ($http) {
    var myDataService = {};

    //create new posts
    myDataService.addPosts = function (post) {
        return $http({
            method: "post",
            url: "/post/addNewPost",
            data: JSON.stringify(post),
            dataType: "json"
        });
        //return $http.post('/post/addNewPost', post).then(function (data) {
    };
    //retrive posts
    myDataService.getAllPosts = function () {
        return $http.get('/post/getPostsLst');
    };

    //update posts
    myDataService.updatePosts = function (Post) {
        return $http({
            method: "post",
            url: "/post/updatePost",
            data: JSON.stringify(Post),
            dataType: "json"
        });
    }

    //Get Post By ID
    myDataService.getPostById = function (PostId) {
        return $http({
            method: "post",
            url: "/post/getPostById",
            params: {
                id: JSON.stringify(PostId)
            }
        });
    }

    //Delete Post

    myDataService.delPost = function (PostId) {
        return $http({
            url: '/post/delPost',
            params: { id: JSON.stringify(PostId) },
            method: 'POST'
        });
    };
    return myDataService;
}]);