myApp.controller("conDetails", ["$scope", "$sce", "artDetail", function ($scope, $sce, artDetail) {
    //var vm = this;
 
    //$sce.trustAsHtml used to make our code safe to us in our page, because if you are going to dsiply data which is previously entered 
    //it is worth to check it to make sure it is safe for any javascript injections to distory your website

    //here we used function to check for our code then that function will be called from our website
    //we can use also the following code to do the same job as the funciton $scope.myHtmlVar= "<a href='http://benohead.com'>benohead.com</a>";, and we can call it directy like <div ng-bind-html="trustAsHtml"></div>
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    }
    $scope.showArts = artDetail;

}]);

myApp.controller("conLst", ["$scope", "$sce", "conLstService", function ($scope, $sce,conLstService) {
    getAllConferences()
    function getAllConferences() {
        var getData = conLstService.getConList();
        getData.then(function (res) {
            $scope.allConf = res.data;
        });
    }

    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    }
}]);

//Another way to check for our code wither it safe or not, is to define a filter which works in exactly the same way as the trustAsHtml function above:
//And use it like this:
//<div ng-bind-html="myHtmlVar | trustAsHtml"></div>
//myApp.filter('trustAsHtml', function ($sce) {
//    return function (html) {
//        return $sce.trustAsHtml(html);
//    };
//});
myApp.service("conLstService", ["$http", function ($http) {
    //get all articles which will be used inside the conference list
    this.getConList = function () {
        var response = $http({
            method: "post",
            url: "/article/getAllConArtciles",
        });
        return response
    }

}]);