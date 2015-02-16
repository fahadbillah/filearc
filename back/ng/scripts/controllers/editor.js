'use strict';

/**
 * @ngdoc function
 * @name fileUploaderApp.controller:EditorCtrl
 * @description
 * # EditorCtrl
 * Controller of the fileUploaderApp
 */
 angular.module('fileUploaderApp')
 .controller('EditorCtrl', ['$scope', '$http', 'FileUploader', function ($scope, $http, FileUploader) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	// console.log($routeParams.fileId);	

 	// $scope.file = [];

 	// var getFileDetails = function() {
 	// 	$http.get('api/upload/get_single_file/'+$routeParams.fileId)
 	// 	.success(function(data) {
 	// 		$scope.file = data;
 	// 		console.log($scope.file);
 	// 	})
 	// 	.error(function(data) {
 	// 		console.log(data);
 	// 	});
 	// };

 	// getFileDetails();

 	$scope.myImage='';
 	$scope.myCroppedImage='';
    $scope.alert = {
        'className': '',
        'show': false,
        'title': '',
        'body': '',
    };

    var handleFileSelect=function(evt) {
     var file=evt.currentTarget.files[0];
     var reader = new FileReader();
     reader.onload = function (evt) {
        $scope.$apply(function($scope){
           $scope.myImage=evt.target.result;
       });
    };
    reader.readAsDataURL(file);
};
angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
 	// handleFileSelect(document.querySelector('#fileInput'));


 	var uploader = $scope.uploader = new FileUploader({
 		url: 'api/upload/do_upload',
 		alias: 'upload'
 	});

 	// var fileExt = '';

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
    	// console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
    	fileItem.formData.push({name: fileItem.file.name});
    	// fileExt = fileItem.file.name.split('.');
    	// fileExt = fileExt[fileExt.length-1];
    	// console.log(fileExt);
    	// console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
    	// console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
    	// var blob = dataURItoBlob($scope.myCroppedImage+'.'+fileExt);
    	var blob = dataURItoBlob($scope.myCroppedImage);
    	// append("blob",blob, filename);
    	// console.log(blob);
    	item._file = blob;
    	item._file.name = item.file.name;
    	// console.log(item._file);
    	// console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
    	// console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
    	// console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.log(response);
        showAlert(response);
        fileList();
        // console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
    	// console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
    	// console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
    	// console.info('onCompleteItem', fileItem, response, status, headers);
        // console.log(response);
    	// fileList();
    };
    uploader.onCompleteAll = function() {
    	// console.info('onCompleteAll');
    };

    // console.info('uploader', uploader);


    function dataURItoBlob(dataURI) {
    	var byteString;
    	if (dataURI.split(',')[0].indexOf('base64') >= 0)
    		byteString = atob(dataURI.split(',')[1]);
    	else
    		byteString = unescape(dataURI.split(',')[1]);

    	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    	var ia = new Uint8Array(byteString.length);
    	for (var i = 0; i < byteString.length; i++) {
    		ia[i] = byteString.charCodeAt(i);
    	}
    	return new Blob([ia], {type:mimeString});
    }


    $scope.files = [];

    var fileList = function() {
    	$http.get('api/upload/file_list')
    	.success(function(data) {
    		$scope.files = data;
    		console.log($scope.files);
    	})
    	.error(function(data) {
    		console.log(data);
    	});
    };

    fileList();

    $scope.deleteFile = function(fileId) {
        $http.get('api/upload/delete_file/'+fileId)
        .success(function(data) {
            console.log(data);
            showAlert(data);
            fileList();
        })
        .error(function(data) {
            console.log(data);
            showAlert(data);
        });
    }

    var showAlert = function(data) {
        $scope.alert.show = true;
        $scope.alert.className = data.success ? 'alert-success' : 'alert-danger' ;
        $scope.alert.title = data.message.title;
        $scope.alert.body = data.message.body;
        setTimeout(function() {
            $scope.alert.show = false;
            $scope.alert.className = '' ;
            $scope.alert.title = '';
            $scope.alert.body = '';
        },2000);
    }
}]);
