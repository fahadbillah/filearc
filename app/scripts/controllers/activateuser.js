'use strict';

/**
 * @ngdoc function
 * @name ngApp.controller:ActivateuserCtrl
 * @description
 * # ActivateuserCtrl
 * Controller of the ngApp
 */
 angular.module('ngApp')
 .controller('ActivateuserCtrl', ['$scope','$http','$routeParams', function ($scope,$http,$routeParams) {
 	$scope.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	$scope.message = {
 		title: '',
 		body: '',
 		style: ''
 	};

 	$http.get('api/index.php/auth/activate_account/'+$routeParams.activationCode)
 	.success(function(data) {
 		console.log(data);
 		$scope.message = data.message;
 		if (data.success === true) {
 			$scope.message.style = 'alert-success';
 		}else{
 			$scope.message.style = 'alert-danger';
 		}
 	})
 	.error(function(data) {
 		$scope.message = {
 			title: 'Activation failed!',
 			body: 'Server error occure.',
 			style: 'alert-danger'
 		};
 	});
 }]);
