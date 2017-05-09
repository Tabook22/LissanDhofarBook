
myApp.controller("articleController", ["$scope", "newsLstService", function ($scope, newsLstService) {
    new WOW().init();
    //========================================================================================================================//
    //getting the news article to display on the home page
    //========================================================================================================================//
    getAllNewsForHomePage();
    function getAllNewsForHomePage() {
        debugger;
        var getData = newsLstService.allNews();
        debugger;
        getData.then(function (nws) {
            $scope.lstNewsHome = nws.data;
        }, function () {
            alert('Error in getting records');
        });

    }
}]);

//News Service for displaying the article on the home page 
myApp.service("newsLstService", ['$http', function ($http) {

    //list all the news
    this.allNews = function () {
        return $http.get("/article/allNewsForHome");
    }
}]);