//var MainController = function ($scope) {
//    $scope.names = ["سبحان الله", "الحمد لله", "الله أكبر"];
//}

//MainController.$inject = ['$scope'];

myApp.controller("mainController", ["$scope", function ($scope) {
   $scope.names = ['سبحان الله', 'الحمد لله', 'الله أكبر'];
    $scope.message = "أستغفر الله و أتوب إلية";
}]);