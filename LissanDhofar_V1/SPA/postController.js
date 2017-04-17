myApp.controller("postController", ["$scope", "$http", "$sce", "getDataService", function ($scope, $http, $sce, getDataService) {
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

    //Check the status of the form

    //test calling asp.net mvc controller and action---------------------------------------------------------------
    getAllPostsToDisply();
    $scope.posts = {};
    function getAllPostsToDisply() {
        getDataService.getAllPosts().then(function (response) {

            $scope.posts = response.data;
        }, function () {
            alert('error please check your code')
        });
    }

    $scope.Action = 'Add';
    // Get selected post for edit
    $scope.editPost = function (post) {
        debugger;
        //here am getting the selected post for editing
        var getData = getDataService.getPostById(post.PostId);
        getData.then(function (pst) {
            $scope.post = pst.data;
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
            var getData = getDataService.updatePosts($scope.post);
            getData.then(function (msg) {
                getAllPostsToDisply();
                cleanFields();
                alert(msg.data);
            }, function () {
                alert('Error in updating record');
            });
        } else {
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
    
            $scope.post.post_title = "";
            $scope.post.post_data = "";
            $scope.post.post_img = "";
            $scope.post.post_img_title = "";
            $scope.Action = 'Add';
       
    }

    //Clean Fields
    function cleanFields() {
        $scope.post.post_title = "";
        $scope.post.post_data = "";
        $scope.post.post_img = "";
        $scope.post.post_img_title = "";
        $scope.Action = 'Add';
    }
}]);
