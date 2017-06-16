myApp.controller("confController", ["$scope", "$uibModal", "$http", "confService", "imgService", "fileService", "holder", function ($scope, $uibModal, $http, confService, imgService, fileService, holder) {
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

    $scope.confr = {};
    //----------------------------------------------------------------------------------------------------
    //select image for the post, the value of the images comes for the facotry function
    //holder, becasue when we choosed the image and click ok button then holder.get()
    //get called and filled with required image
    $scope.selImg = holder.get();


    //confService.getConHome().then(function (response) {
    //    $scope.conHome = response.data.
    //    }, function () {
    //        alert('error please check your code')
    //    });
   
    $scope.Action = 'Add';

    getAllConToDisply()
    // get all conferences with total no. to be used in the  conference admin page, for udating conferences
    function getAllConToDisply() {
        confService.getAllCon().then(function (response) {
            $scope.conferences = response.data.cnfLst; //here we are getting the list of all conferences,
            $scope.tCon = response.data.totalcn;//here we are getting the total number of conferences,
        }, function () {
            alert('error please check your code')
        });
    }


    // Update selected conference, and add it to the database
    $scope.AddOrUpdateCon = function () {
        if ($scope.Action == 'Update') {
            $scope.confr.cimg = $scope.selImg.post_img
            var getData = confService.updateCon($scope.confr);
            getData.then(function (msg) {
                getAllConToDisply();
                cleanFields();
                alert(msg.data);
            }, function () {
                alert('Error in updating record');
            });
        } else {
            $scope.confr.cimg = $scope.selImg.post_img
            var getData = confService.addCon($scope.confr);
            getData.then(function (msg) {
                $scope.Action = 'Add';
                getAllConToDisply();
                alert(msg.data);
                cleanFields();
            }, function () {
                alert('Error in adding record');
            });
        }
    }


    //Delete conference
    $scope.delCon = function (lstconfr) {
        if (window.confirm('هل تريد حذف المؤتمر الذي عنوانه  ' + lstconfr.cTitle + '?'))//Popup window will open to confirm
            //here am getting the selected post for delete
            var getData = confService.delCon(lstconfr.confId);
        getData.then(function (con) {
            getAllConToDisply();
            alert(con.data);
            cleanFields();
     
        }, function () {
            alert(con.data);
            });
    };

    // Get selected conference for edit
    $scope.editCon = function (lstconf) {
        //here am getting the selected con for editing
        var getData = confService.getConById(lstconf.confId);
        getData.then(function (res) {
            $scope.selImg.post_img = $scope.confr.cimg; //passing conference image to be displayed 
            $scope.confr = res.data;
            $scope.Action = "Update";
        },
            function () {
                alert('Error in getting records');
            });
    };

    //clear form for new conference
    $scope.clearForNewCon = function () {
        $scope.confr.cTitle = "";
        $scope.confr.cdetails = "";
        $scope.confr.cmessage = "";
        $scope.confr.cvision = "";
        $scope.confr.cimg = "";
        $scope.confr.cstatus = false;
        $scope.Action = 'Add';
        holder.set();
        $scope.selImg = holder.get();
    }

    //Clean Fields
    function cleanFields() {
        $scope.confr.cTitle = "";
        $scope.confr.cdetails = "";
        $scope.confr.cmessage = "";
        $scope.confr.cvision = "";
        $scope.confr.cimg = "";
        $scope.confr.cstatus = false;
        $scope.Action = 'Add';
    }
    holder.set();
    $scope.selImg = holder.get(); 
    //this function is used to prevent html tags from showing up
    $scope.trustAsHtml = function (html) {
        return $sce.trustAsHtml(html);
    }


    //******************************************************************************************************
    //modal----------------------------------------------------------------------------------------------- *
    //******************************************************************************************************

    // this functin is used to get all the images which will be used inside the modal
    showAllImages();
    function showAllImages() {
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


    //Get all the uploaded files for conference
    DisplayConfFiles();
    function DisplayConfFiles() {
        var getData = fileService.getAllConFls();
        getData.then(function (pst) {
            $scope.selectConfFiles = pst.data;
        }, function () {
            alert('Error in getting records');
        });

    }
    
    $scope.checkselection = function (item) {
        $scope.confr.crfile = item.filename;
    }
    $scope.checkselection2 = function (item) {
        $scope.confr.cfile = item.filename;
    }
    $scope.checkselection3 = function (item) {
        $scope.confr.crfileEn = item.filename;
    }
    $scope.checkselection4 = function (item) {
        $scope.confr.cfileEn = item.filename;
    }
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

        holder.set($scope.selected.item); // here the image comes from the modal template (which found inside views/modal/myModalContent.html
        $uibModalInstance.close($scope.selected.item);

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//this is upload controller used to upload the conference files
myApp.controller('uploadFileCtrl', ['$scope', 'Upload', '$timeout', 'fileService', function ($scope, Upload, $timeout, fileService) {
    $scope.uploadPic = function (file) {
        file.upload = Upload.upload({
            url: '/uploadFiles/getSelectedFile',
            data: { username: $scope.username, file: file },
        });
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                DisplayAllConFiles();
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
       
    }
    //Display all uploaded files
    DisplayAllConFiles();
        function DisplayAllConFiles() {
           var getData = fileService.getAllConFls();
            getData.then(function (pst) {
                $scope.allFiles = pst.data;
            }, function () {
                alert('Error in getting records');
            });

        }
    //Delete upload file
        $scope.delFile = function (fId) {
            var confirm = window.confirm('هل تريد حذف الصورة التي عنوانها ' + '?');
            if (!confirm) {
                return false;
            }
            var getData = fileService.delFiles(fId);
            getData.then(function (res) {
                alert(res.data);
                DisplayAllConFiles();
            }, function () { alert("No file deleted!")});
        }
}]);

//******************************************************************************************************
// services
//******************************************************************************************************

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

//service to get all the uploaded conference files and display them on addFileUplad.html page
myApp.service("fileService", function ($http) {
    //get all files from database
    this.getAllConFls = function () {
        var response = $http({
            method: "Get",
            url: "/uploadFiles/getAllconFiles",
            dataType: "Json"
        });
        return response;
    };

    //del file
    this.delFiles = function (fid) {
        var response = $http({
            method: "Get",
            url: "/uploadFiles/delFiles",
            dataType: "Json",
            params: { id: JSON.stringify(fid) }
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
        get: get
    }
});

//filter for date becasue of json datetime issue
myApp.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});