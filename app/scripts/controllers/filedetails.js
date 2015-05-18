'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:FiledetailsCtrl
 * @description
 * # FiledetailsCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('FiledetailsCtrl', ['$scope', '$http', '$routeParams', '$timeout', function ($scope,$http,$routeParams,$timeout) {
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
 	$scope.alerm = {
 		show: false,
 		className: '',
 		title: '',
 		body: ''
 	}
 	$scope.allComments = [];

 	$scope.getAllComments = function() {
 		$http.get('api/index.php/file/get_all_comments/'+$routeParams.fileId)
 		.success(function(data) {
 			$scope.allComments = data;
 		})
 		.error(function(data,error) {
 			alert('Please login first!');
 		})
 	};

 	$scope.getAllComments();

 	$scope.submitComment = function(comment) {
 		var postData = {
 			'comment': comment,
 			'id_files': $routeParams.fileId
 		};
 		$http.post('api/index.php/file/comment_submit',postData)
 		.success(function(data) {
 			$scope.comment = '';
 			$scope.getAllComments();
 			$scope.alerm.show = true;
 			$scope.alerm.className = data.success ? 'alert-success' : 'alert-danger';
 			$scope.alerm.title = data.message.title;
 			$scope.alerm.body = data.message.body;
 			$timeout(function() {
 				$scope.alerm.show = false;
 			},3000);
 			console.log(data);
 		})
 		.error(function(data,error) {
 			console.log(data);
 			return false;
 			$scope.alerm.show = true;
 			$scope.alerm.className = 'alert-danger';
 			$scope.alerm.title = data.message.title;
 			$scope.alerm.body = data.message.body;
 			$timeout(function() {
 				$scope.alerm.show = false;
 			},3000);
 			console.log(data);
 		})
 	};

 }]);
