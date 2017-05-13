myApp.controller("conferenceCtrl", ["$scope", "$http", "conService", function ($scope, $http, conService) {
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


    $scope.Action = 'Add';

    //object to hold the conference data for addition
    //$scope.confr = {};
    //display conference list
    //getAllConferences();
    //function getAllConferences() {
    //    var conLst = conService.getAllCon();
    //    debugger;
    //    conLst.then(function (con) {
    //        $scope.cLst = con.data.cnfLst; //here we are getting the list of all conferences, because the ajax call will return two parameters, one contains the list of conference, and the other the total number of conferences
    //    }, function () {
    //        alert('Error in getting records');
    //    });
    //}
    getAllConToDisply()
    // get all conferences with total no. to be used in the  conference admin page, for udating conferences
    function getAllConToDisply() {
        conService.getAllCon().then(function (response) {
            $scope.conferences = response.data.cnfLst; //here we are getting the list of all conferences,
            $scope.tCon = response.data.totalcn;//here we are getting the total number of conferences,
        }, function () {
            alert('error please check your code')
        });
    }


    // Update selected conference, and add it to the database
    $scope.AddOrUpdateCon = function () {
        debugger;
        if ($scope.Action == 'Update') {
            var getData = conService.updateCon($scope.confr);
            getData.then(function (msg) {
                getAllConToDisply();
                cleanFields();
                alert(msg.data);
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getData = conService.addCon($scope.confr);
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
    $scope.delCon = function (conf) {
        if (window.confirm('هل تريد حذف المؤتمر الذي عنوانه  ' + conf.cTitle + '?'))//Popup window will open to confirm
            //here am getting the selected post for delete
            var getData = conService.delCon(conf.confId);
        getData.then(function (con) {
            getAllConToDisply();
            alert(con.data);
            cleanFields();
     
        }, function () {
            alert(con.data);
            });
    };

    // Get selected conference for edit
    $scope.editCon = function (conf) {
        //here am getting the selected con for editing
        var getData = conService.getConById(conf.confId);
        getData.then(function (res) {
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
        $scope.confr.cimg = "";
        $scope.confr.cstatus = false;
        $scope.Action = 'Add';

    }

    //Clean Fields
    function cleanFields() {
        $scope.confr.cTitle = "";
        $scope.confr.cdetails = "";
        $scope.confr.cimg = "";
        $scope.confr.cstatus = false;
        $scope.Action = 'Add';
    }
}]);

//filter for date becasue of json datetime issue
myApp.filter("dateFilter", function () {
    return function (item) {
        if (item != null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});