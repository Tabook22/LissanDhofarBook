myApp.controller("postController", ["$scope", "$http", "$uibModal", "$sce", "getDataService", "imgService","holder", function ($scope, $http, $uibModal, $sce, getDataService, imgService,holder) {
    var $ctrl = this;
    //Setting Tinymce editor --------------------------------------------------------------------------------------
    $scope.updateHtml = function () {
        $scope.tinymceHtml = $sce.trustAsHtml(ctrl.tinymce);
    };
    $scope.tinymceOptions = {
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | ltr | rtl",
        statusbar: false,
        menubar: false,
        resize: false,
        height: 350,
        forced_root_block: false,
        skin: 'lightgray',
        theme: 'modern'
    };


    //sorting
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

    //select image for the post, the value of the images comes for the facotry function
    //holder, becasue when we choosed the image and click ok button then holder.get()
    //get called and filled with required image
    $scope.selImg = holder.get();


    //test calling asp.net mvc controller and action---------------------------------------------------------------
    getAllPostsToDisply();
    $scope.posts = {};
    function getAllPostsToDisply() {
        getDataService.getAllPosts().then(function (response) {

            $scope.posts = response.data.pstLst;
            $scope.tPst = response.data.totalPst;
        }, function () {
            alert('error please check your code')
        });
    }

    $scope.Action = 'Add';
    // Get selected post for edit
    $scope.editPost = function (post) {
        //here am getting the selected post for editing
        var getData = getDataService.getPostById(post.PostId);
        getData.then(function (pst) {
            $scope.post = pst.data;
            $scope.selImg.post_img = $scope.post.post_img;
            //$scope.PostId = pst.PostId;
            //$scope.post_title = pst.post_title;
            //$scope.post_data = pst.post_data;
            //$scope.post_img = pst.post.im;
            //$scope.post_img_title = pst.post.post_title
            $scope.Action = "Update";
            //$scope.divEmployee = true;
        },
            function () {
                alert('Error in getting records');
            });
    };

    // Update selected post, and add it to the database
    $scope.AddOrUpdatePost = function () {
        debugger;
        if ($scope.Action == 'Update') {
            //the problem is here in this part Post.PostId = $scope.PostId;
            $scope.post.post_img = $scope.selImg.post_img
            var getData = getDataService.updatePosts($scope.post);
            getData.then(function (msg) {
                getAllPostsToDisply();
                cleanFields();
                alert(msg.data);
            }, function () {
                alert('Error in updating record');
            });
        } else {
            $scope.post.post_img=$scope.selImg.post_img;
            var getData = getDataService.addPosts($scope.post);
            getData.then(function (msg) {
                $scope.Action = 'Add';
                getAllPostsToDisply();
                alert(msg.data);
                cleanFields();
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    //Delete post
    $scope.delPost = function (post) {
        if (window.confirm('هل تريد حذف المقاله التي عنوانها  ' + post.post_title + '?'))//Popup window will open to confirm
            //here am getting the selected post for delete
            var getData = getDataService.delPost(post.PostId);
        getData.then(function (pst) {
            cleanFields();
            alert(pst.data);
            getAllPostsToDisply();
        });
    };

    //clear form for new post
    $scope.clearForNewPost = function () {
        $scope.post_title = "";
        $scope.post_data = "";
        $scope.post_img = "";
        $scope.post_img_title = "";
        $scope.post_status = false;
        $scope.Action = 'Add';
        //this used to clean the factory holder
        holder.set();
        $scope.selImg = holder.get();
        alert(JSON.stringify($scope.selImg));
    }

    //Clean Fields
    function cleanFields() {
        $scope.post.post_title = "";
        $scope.post.post_data = "";
        $scope.post.post_img = "";
        $scope.post.post_img_title = "";
        $scope.post.post_status = false;
        $scope.Action = 'Add';
        $scope.post.post_img = '';
    }

    //******************************************************************************************************
    //modal----------------------------------------------------------------------------------------------- *
    //******************************************************************************************************

    // this functin is used to get all the images which will be used inside the modal
    showAllImages();
    function showAllImages () {
        var getData = imgService.getAllImages();
        getData.then(function (res) {
            $scope.items = res.data;
        });
    };


    $scope.animationsEnabled = true;

    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/SPA/Admin/views/modal/myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
   
}]);

//The ModalInstanceCtrl controller will be called when the modal is initiated in the $scope.open = function (...controller: 'ModalInstanceCtrl',..) in postController.
myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, holder) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    }; 
    $scope.ok = function () {
        //$uibModalInstance.close($scope.selected.item);
        //$postController.post.post_img = $scope.selected.item
      
        holder.set($scope.selected.item);  
        $uibModalInstance.close($scope.selected.item);

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//service to get all the images and put them inside the ui modal for selection
myApp.service("imgService", function ($http) {
    this.getAllImages = function () {
        var response = $http({
            method: "Get",
            url: "/uploadFiles/getAllImg",
            dataType: "Json"
        });
        return response;
    };
});

//factory service to hold the selected images from modal and then display those image.
//facotry is one of the best moethod used to share data between controllers, here the images selected in ModalInstanceCtrl and used in postController
myApp.factory("holder", function () {
    var saveImg = {};
    function set(data) {
        saveImg.post_img = data;//'UploadedFiles/images/' + data;
    }
    function get() {
        return saveImg;
    }
    return {
        set: set,
        get:get
    }
});