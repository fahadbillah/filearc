'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('ProfileCtrl', ['$scope','$http','$route','FileUploader', function ($scope,$http,$route,FileUploader) {
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
	url: 'api/file/upload_profile_pic',
	alias: 'upload'
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

        	// $scope.uploader.formData.data = item.formData.data = JSON.stringify({
        	// 	'title': $scope.file.title,
        	// 	'category': $scope.file.category,
        	// 	'details': $scope.file.details,
        	// 	'tags': $scope.tags
        	// });
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

	$route.reload();

};

console.info('uploader', uploader);

$scope.files = [];
$scope.user;
$scope.count = 0;

var getMyProfileInfo = function() {
	$http.get('api/file/get_my_profile_info')
	.success(function(data) {
		$scope.user = data.info[0];
		$scope.count =  data.file_count;
		console.log($scope.user);
	})
	.error(function(data) {
		console.log(data);
	});
};

getMyProfileInfo();

}]);
