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
    getAllConferences();
    function getAllConferences() {
        var getData = conLstService.getConList();
        getData.then(function (res) {
            $scope.allConf = res.data;
        });
    }
}]);
//--------------------------------------------Introduction controller ---------------------------------------------------------
myApp.controller("introCtrl", ["$scope", "$sce", "conLstService", function ($scope, $sce, conLstService) {
    //get article which is used as introduciton
    getIntroduction();
    function getIntroduction() {

        var getData = conLstService.getIntro();
        getData.then(function (res) {
            $scope.siteIntro = res.data;
        });
    }
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

}]);
//--------------------------------------------News controller ---------------------------------------------------------
myApp.controller("newsCtrl", ["$scope", "$sce", "conLstService", function ($scope, $sce, conLstService) {
    //get article which is used as introduciton
    getNewsLst();
    function getNewsLst() {
        var getData = conLstService.getNews();
        getData.then(function (res) {
            $scope.sNews = res.data;
        });
    }
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

}]);

//--------------------------------------------Conference controller ---------------------------------------------------------
myApp.controller("conferenceCtrl", ["$scope", "$sce", "conLstService", function ($scope, $sce, conLstService) {
    //get conference to display on the homepage
    getConferenceHome();
    function getConferenceHome() {
        conLstService.getConHome().then(function (response) {
            $scope.conHome = response.data;
           
        }, function () {
                alert('error please check your code')
            });
    }

    //this function is used to animate the conference images in homepage

    var myIndex = 0;
    carousel();

    function carousel() {
        var i;
        var x = document.getElementsByClassName("conImages");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) { myIndex = 1 }
        x[myIndex - 1].style.display = "block";
        setTimeout(carousel, 9000);
    }


    //this function will be used to remove html tags from the details
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

}]);

//Another way to check for our code wither it safe or not, is to define a filter which works in exactly the same way as the trustAsHtml function above:
//And use it like this:
//<div ng-bind-html="myHtmlVar | trustAsHtml"></div>
//myApp.filter('trustAsHtml', function ($sce) {
//    return function (html) {
//        return $sce.trustAsHtml(html);
//    };
//});

//******************************** Services **************************************************************
//********************************************************************************************************

myApp.service("conLstService", ["$http", function ($http) {
    //get all articles which will be used inside the conference list
    this.getConList = function () {
        var response = $http({
            method: "get",
            url: "/article/getAllConArtciles",
        });
        return response
    }

    //get the introduction which will be used inside the main page
    this.getIntro = function () {
        var response = $http({
            method: "get",
            url: "/article/getIntro",
        });
        return response
    }
    this.getNews = function () {
        var response = $http({
            method: "get",
            url: "/article/getNews",
        });
        return response
    }

    //Display conference on the homepage
    this.getConHome = function () {
        var response = $http({
            method: "get",
            url: "/Conference/getConHome"
        });
        return response;
    }
}]);


//******************************** Filters ***************************************************************
//********************************************************************************************************
//filter for date becasue of json datetime issue
myApp.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});
