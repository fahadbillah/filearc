'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:FiledetailsCtrl
 * @description
 * # FiledetailsCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('FiledetailsCtrl', ['$scope', '$http', '$routeParams', function ($scope,$http,$routeParams) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];
 	console.log($routeParams.fileId);

 	$scope.loading = true;

 	$scope.favoriteClass = 'not-favorite';

 	$http.get('api/index.php/file/get_file_details/'+$routeParams.fileId )
 	.success(function(data) {
 		console.log(data);
 		if (data.success === true) {
 			$scope.file = data;
 			$scope.loading = false;
 			console.log($scope.file);

 			if (data.is_favorite === true)
 				$scope.favoriteClass = 'favorite';
 			else
 				$scope.favoriteClass = 'not-favorite';

 			if (data.is_liked === true)
 				$scope.likeClass = 'like';
 			else
 				$scope.likeClass = 'unlike';
 		}
 	})
 	.error(function(data) {
 		console.log(data);
 	});

 	$scope.createFileName = function(file) {
 		var ext = file.file_url.split('/');
 		ext = ext[ext.length-1];
 		return ext;
 	};

 	$scope.toggleFavorite = function() {
 		$http.get('api/index.php/file/toggle_favorite/'+$routeParams.fileId )
 		.success(function(data) {
 			console.log(data);
 			if (data.success === true) {
 				if (data.action.actionName == 'toggleFavorite' && data.action.value == true) {
 					$scope.favoriteClass = 'favorite';
 				}else{
 					$scope.favoriteClass = 'not-favorite';
 				}
 				$scope.file.total_favorite = data.total_favorite;
 			}
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	}

 }]);
