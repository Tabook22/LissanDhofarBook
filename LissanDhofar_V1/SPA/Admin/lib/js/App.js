(function () {
    'use strict';
    var app = angular.module("DhofarBookApp", ["DhofarBookApp.controllers", "ngRoute"]);

    app.config(["$routeProvider", function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/admin",{templateUrl:"SPA/Admin/index.html",controller:"AdminController"})
            .when("/admin/post", { templateUrl: "SPA/Admin/PostPartials/Posts.html", controller: "PostController" })
            .when("/admin/addpost", { templateUrl: "SPA/Admin/PostPartials/AddPost.html", controller: "QuestionController" })
            .when("/admin/editpost/:id", { templateUrl: "SPA/Admin/PostPartials/EditPost.html", controller: "QuestionEditController" })
            .when("/admin/delpost", { templateUrl: "SPA/Admin/PostPartials/editPost.html", controller: "QuestionController" })
            .otherwise({ redirectTo: "/" });
    }]);
})();