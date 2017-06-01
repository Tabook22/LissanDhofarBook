myApp.config(function (dropzoneOpsProvider) {
    dropzoneOpsProvider.setOptions({
        url: '/uploadFiles/SaveUploadedFile',
        acceptedFiles: 'image/jpeg, images/jpg, image/png',
        addRemoveLinks: true,
        dictDefaultMessage: 'Click to add or drop photos',
        dictRemoveFile: 'Remove photo',
        dictResponseError: 'Could not upload this photo'
    });
});


myApp.controller("uploadImgController", ["$scope", "uploadImgService", "$timeout", function ($scope, uploadImgService, $timeout) {


    //modal

    $scope.open = function () {
        $scope.showModal = true;
    };

    $scope.ok = function () {
        $scope.showModal = false;
    };

    $scope.cancel = function () {
        $scope.showModal = false;
    };


    //Get all images from database
    //To Get All Posts
    getAllImgs();
    function getAllImgs() {
        debugger;
        var getData = uploadImgService.allImgs();
        debugger;
        getData.then(function (pst) {
            $scope.allImgs = pst.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    //delete image
    $scope.dImg = function (img) {
        var confirm = window.confirm('هل تريد حذف الصورة التي عنوانها '+ '?');
        if (!confirm) {
            return false;
        }
        debugger;
        var getData = uploadImgService.delImgs(img.FileId);
        getData.then(function (res) {
            alert(res.data);
            getAllImgs();
        }, function () {
        alert("حصل خطاء أثناء حذف الصورة")});
    }

    $scope.dzOptions = {
        paramName: 'photo',
        maxFilesize: '10', //the file size is 10 mega byte
        maxFiles: '12' //this means the max no of files to upload at one time
    };

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            console.info('File added from dropzone 1.', file);
        }
    };

    //Handle events for dropzone
    //Visit http://www.dropzonejs.com/#events for more events
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'success': function (file, xhr) {
            //console.log(file, xhr);
            //this list images when dropzone starts and after each addition 
            getAllImgs();
        }

    };

}]);

myApp.service("uploadImgService", ["$http", function ($http) {
    //Get all images 
    this.allImgs = function () {
        return $http.get("/uploadFiles/getAllImg");
    }

    //delet images
    this.delImgs = function (imgid) {
        return $http({
            method: "GET",
            url: "/uploadFiles/delImgs",
            params:{id: JSON.stringify(imgid)}
        });
    };

}]);