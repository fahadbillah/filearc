'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('FavoritesCtrl', ['$scope', '$http', '$location', function ($scope,$http,$location) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	$scope.files = [];

 	$scope.getFavoriteFiles = function() {
 		$scope.loading = true;
 		var limit = 5;
 		var offset = $scope.files.length;
 		$http.get('api/file/get_favorite_files/'+limit+'/'+offset)
 		.success(function(data) {
 			console.log(data.data);
 			if (data.success === true) {
 				angular.forEach(data.data, function(elm, idx) {
 					$scope.files.push(elm);
 				})
 				$scope.loading = false;
 			}
 		})
 		.error(function(data) {
 			console.log(data);
 		});
 	};

 	$scope.getFavoriteFiles();


 	$scope.goToDetails = function(fileId) {
 		$location.path('filedetails/' + fileId);
 	}
 }]);
