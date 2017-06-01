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

//--------------------------------------------Conference  controller ---------------------------------------------------------

myApp.controller("conCtrl", ["$scope", "$sce", "conLstService", function ($scope, $sce, conLstService) {
    //get conference to display on the homepage
    //$scope.conHome = {};
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;


    getConferenceHome();

    function getConferenceHome() {
        var getData = conLstService.getConHome();
        getData.then(function (response) {
            count=response.data.length;
            $scope.conHome = response.data;
        });

       

    }
    //this function will be used to remove html tags from the details
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

    ////carusole
    //$scope.myInterval = 5000;
    //var slides = $scope.conHome;// $scope.slides = [];

    $scope.addSlide = function () {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/43/4f/83/salalah.jpg',
            text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
            id: currIndex++
        });
    };

    //$scope.addSlide = function () {
    //    var newWidth = 600 + slides.length + 1;
    //    slides.push({
    //        image: getImg[i].cimg, /*'https://media-cdn.tripadvisor.com/media/photo-s/01/43/4f/83/salalah.jpg',*/
    //        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
    //        id: currIndex++
    //    });
    //};

    $scope.randomize = function () {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }


}]);

//--------------------------------------------Conference information and reigstration ---------------------------------------------------------
myApp.controller("conInfoCtrl", ["$scope", "$sce", "conLstService", "conInfoDetails", "$location", "$anchorScroll", function ($scope, $sce, conLstService, conInfoDetails,$location,$anchorScroll) {
    
    $scope.conInfo = conInfoDetails;

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
