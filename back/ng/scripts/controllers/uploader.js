'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:UploaderCtrl
 * @description
 * # UploaderCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('UploaderCtrl',['$scope','$http','$route', '$location', 'FileUploader', function ($scope,$http,$route,$location,FileUploader) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	// $http.get('api/auth/is_logged_in')
 	// .success(function(data) {
 	// 	console.log(data);
 	// 	if (data.success === false) {
 	// 		if (data.action.actionName === 'redirect') {
 	// 			window.location.replace(data.action.url);
 	// 		}
 	// 	}
 	// })
 	// .error(function(data) {
 	// 	console.log(data);
 	// });

$scope.baseUrl = window.location.origin+window.location.pathname;

$scope.file = {
   'title': '',
   'category': '',
   'details': '',
};

var uploader = $scope.uploader = new FileUploader({
   url: 'api/file/do_upload',
   alias: 'upload',
   formData: {
    'data':'',
}
});

        // FILTERS

        uploader.filters.push({
        	name: 'customFilter',
        	fn: function() {
        		return this.queue.length < 10;
        	}
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        	console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
        	console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
        	console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {

        	$scope.uploader.formData.data = item.formData.data = JSON.stringify({
        		'title': $scope.file.title,
        		'category': $scope.file.category,
        		'details': $scope.file.details,
        		'tags': $scope.tags
        	});
        	console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
        	console.info('onProgressItem', fileItem, progress);
        	console.log(progress);
        };
        uploader.onProgressAll = function(progress) {
        	console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
        	console.log(response);
        	console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
        	console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
        	console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
        	console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
        	console.info('onCompleteAll');
        	$scope.file.title = '';
        	$scope.file.category = '';
        	$scope.file.details = '';
        	$scope.tags = [];
        	$scope.fileField = '';

        	$route.reload();

            // getMyFiles();
        };

        console.info('uploader', uploader);

        $scope.categories = [];

        $http.get('api/file/get_categories')
        .success(function(data) {
        	console.log(data.data);
        	if (data.success === true) {
        		$scope.categories = data.data;
        	}else{
        		$scope.categories = [{
        			'id_categories' : '',
        			'category_name' : 'No category found'
        		}];
        	}
        })
        .error(function(data) {
        	console.log(data);
        });

        $scope.files = [];

        var getMyFiles = function() {
        	$http.get('api/file/get_my_files')
        	.success(function(data) {
        		console.log(data.data);
        		if (data.success === true) {
        			$scope.files = data.data;
        		}
        	})
        	.error(function(data) {
        		console.log(data);
        	});
        };

        getMyFiles();

        $scope.tag = '';
        $scope.tags = [];

        $scope.addTag = function() {
        	var aTag = checkIfTagExists($scope.tag);
            // console.log(aTag);
            $scope.tags.push(aTag);
            $scope.tag = '';
            console.log($scope.tags);
        };


        var checkIfTagExists = function(t) {
        	var aTag = {};
        	angular.forEach($scope.allTags, function(elm/*, idx*/) {
        		if (angular.lowercase(elm.tag_name) === angular.lowercase(t) ) {
        			aTag = elm;
        			return false;
        		}
        	});

        	if (aTag.hasOwnProperty('id_tags')) {
        		return aTag;
        	}else{
        		return {
        			id_tags: null,
        			tag_name: t
        		};
        	}
        };

        $scope.allTags = [];

        var getAllTags = function() {
            $http.get('api/file/get_all_tags')
            .success(function(data){
                if(data.success === true){
                    $scope.allTags = data.data;
                }
                console.log($scope.allTags);
            })
            .error(function(data) {
                console.log(data);
            });
        };

        getAllTags();

        $scope.deleteFile = function(id) {
            $http.get('api/file/delete_file/'+id)
            .success(function(data){
                if(data.success === true){
                    getMyFiles();
                }
            })
            .error(function(data) {
                console.log(data);
            });
        };


        $scope.createFileName = function(file) {
            var ext = file.file_url.split('/');
            ext = ext[ext.length-1];
            return ext;
        };


        $scope.goToDetails = function(fileId) {
            $location.path('filedetails/' + fileId);
        }
    }]);
